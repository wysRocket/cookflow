import { createHash } from 'node:crypto';
import { connect } from 'cloudflare:sockets';

export interface Env {
  INVOICES: KVNamespace;
  MERCHANT_ID: string;
  MERCHANT_SECRET: string;
  ALLOWED_ORIGIN: string;
  SMTP_USER: string;
  SMTP_PASS: string;
}

const GATEWAY_URL = 'https://www.safepayto.me/new/gateway/';
const SMTP_HOST = 'smtp.hostinger.com';
const SMTP_PORT = 465;
const SUPPORT_EMAIL = 'contact@eurocookflow.com';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function md5(data: string): string {
  return createHash('md5').update(data).digest('hex');
}

function corsHeaders(env: Env): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function jsonResp(data: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...extra },
  });
}

interface InvoiceRecord {
  userId: string;
  userEmail: string;
  credits: number;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: number;
}

function b64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function buildMimeMessage(params: {
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): string {
  return [
    `From: <${params.from}>`,
    `To: <${params.to}>`,
    `Subject: =?UTF-8?B?${b64(params.subject.replace(/[\r\n]+/g, ' '))}?=`,
    ...(params.replyTo ? [`Reply-To: <${params.replyTo.replace(/[\r\n<>]+/g, '')}>`] : []),
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    'Content-Transfer-Encoding: base64',
    '',
    b64(params.html),
  ].join('\r\n');
}

function assertSmtpCode(code: number, expected: number | number[], label: string): void {
  const allowed = Array.isArray(expected) ? expected : [expected];
  if (!allowed.includes(code)) throw new Error(`SMTP ${label} failed (${code})`);
}

async function sendSmtpEmail(params: {
  smtpUser: string;
  smtpPass: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  const socket = connect(
    { hostname: SMTP_HOST, port: SMTP_PORT },
    { secureTransport: 'on', allowHalfOpen: false },
  );

  const writer = socket.writable.getWriter();
  const reader = socket.readable.getReader();
  const enc = new TextEncoder();
  const dec = new TextDecoder();
  let buf = '';

  async function fillBuf(): Promise<void> {
    const { value, done } = await reader.read();
    if (done) throw new Error('SMTP connection closed unexpectedly');
    buf += dec.decode(value);
  }

  async function readResponse(): Promise<number> {
    while (true) {
      const lines = buf.split('\r\n');
      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i];
        if (line.length >= 4 && line[3] === ' ') {
          buf = lines.slice(i + 1).join('\r\n');
          return parseInt(line.slice(0, 3), 10);
        }
      }
      await fillBuf();
    }
  }

  async function cmd(line: string): Promise<number> {
    await writer.write(enc.encode(line + '\r\n'));
    return readResponse();
  }

  const msg = buildMimeMessage({
    from: params.smtpUser,
    to: params.to,
    subject: params.subject,
    html: params.html,
    replyTo: params.replyTo,
  });

  try {
    assertSmtpCode(await readResponse(), 220, 'greeting');
    assertSmtpCode(await cmd('EHLO eurocookflow.com'), 250, 'EHLO');
    assertSmtpCode(await cmd('AUTH LOGIN'), 334, 'AUTH LOGIN');
    assertSmtpCode(await cmd(b64(params.smtpUser)), 334, 'username');
    assertSmtpCode(await cmd(b64(params.smtpPass)), 235, 'auth');
    assertSmtpCode(await cmd(`MAIL FROM:<${params.smtpUser}>`), 250, 'MAIL FROM');
    assertSmtpCode(await cmd(`RCPT TO:<${params.to}>`), [250, 251], 'RCPT TO');
    assertSmtpCode(await cmd('DATA'), 354, 'DATA');
    await writer.write(enc.encode(msg + '\r\n.\r\n'));
    assertSmtpCode(await readResponse(), 250, 'message send');
    await cmd('QUIT');
  } finally {
    try { writer.releaseLock(); } catch { /* ignore */ }
    try { reader.releaseLock(); } catch { /* ignore */ }
    await socket.close().catch(() => {});
  }
}

function buildPaymentEmailHtml(record: InvoiceRecord, invoiceId: string): string {
  const amountFormatted = (record.amount / 100).toFixed(2);
  return `
    <h2>New Payment - ${escapeHtml(invoiceId)}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td><strong>User ID</strong></td><td>${escapeHtml(record.userId)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(record.userEmail)}</td></tr>
      <tr><td><strong>Amount</strong></td><td>${amountFormatted} ${escapeHtml(record.currency)}</td></tr>
      <tr><td><strong>Credits</strong></td><td>${record.credits}</td></tr>
      <tr><td><strong>Invoice</strong></td><td>${escapeHtml(invoiceId)}</td></tr>
      <tr><td><strong>Completed at</strong></td><td>${new Date().toISOString()}</td></tr>
    </table>
  `;
}

function buildContactEmailHtml(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return `
    <h2>New Contact Form - CookFlow</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(params.name)}</td></tr>
      <tr><td><strong>Email</strong></td><td><a href="mailto:${escapeHtml(params.email)}">${escapeHtml(params.email)}</a></td></tr>
      ${params.subject ? `<tr><td><strong>Subject</strong></td><td>${escapeHtml(params.subject)}</td></tr>` : ''}
      <tr><td><strong>Submitted</strong></td><td>${new Date().toISOString()}</td></tr>
    </table>
    <h3>Message</h3>
    <p style="white-space:pre-wrap;font-family:sans-serif;font-size:14px">${escapeHtml(params.message)}</p>
  `;
}

function notifyPayment(env: Env, record: InvoiceRecord, invoiceId: string): Promise<void> {
  return sendSmtpEmail({
    smtpUser: env.SMTP_USER,
    smtpPass: env.SMTP_PASS,
    to: SUPPORT_EMAIL,
    subject: `New Payment - ${invoiceId}`,
    html: buildPaymentEmailHtml(record, invoiceId),
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const cors = corsHeaders(env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname === '/payment/create' && request.method === 'POST') {
      return handleCreate(request, env, cors);
    }
    if (url.pathname === '/payment/verify' && request.method === 'GET') {
      return handleVerify(url, env, cors, ctx);
    }
    if (url.pathname === '/payment/ipn' && request.method === 'POST') {
      return handleIpn(request, env, ctx);
    }
    if (url.pathname === '/contact' && request.method === 'POST') {
      return handleContact(request, env, cors);
    }

    return new Response('Not found', { status: 404 });
  },
};

async function handleCreate(
  request: Request,
  env: Env,
  cors: Record<string, string>,
): Promise<Response> {
  let body: {
    amount: number;
    currency: string;
    credits: number;
    userId: string;
    userEmail: string;
    userName?: string;
  };
  try {
    body = await request.json();
  } catch {
    return jsonResp({ error: 'Invalid JSON' }, 400, cors);
  }

  const { amount, currency, credits, userId, userEmail, userName } = body;
  if (!amount || !currency || !credits || !userId || !userEmail) {
    return jsonResp({ error: 'Missing required fields' }, 400, cors);
  }
  if (amount < 1 || amount > 200) {
    return jsonResp({ error: 'Amount out of range' }, 400, cors);
  }

  const amountMinor = Math.round(amount * 100);
  const invoiceId = `cf_${userId.slice(0, 8)}_${Date.now()}`;
  const hash = md5(`${amountMinor}${currency}${env.MERCHANT_ID}${env.MERCHANT_SECRET}`);

  const nameParts = (userName ?? '').trim().split(/\s+/);
  const firstName = nameParts[0] || 'Customer';
  const lastName = nameParts.slice(1).join(' ') || 'User';

  const formBody = new URLSearchParams({
    _cmd: 'payment',
    merchant_id: env.MERCHANT_ID,
    amount: String(amountMinor),
    currency,
    invoice: invoiceId,
    language: 'ENG',
    cl_fname: firstName,
    cl_lname: lastName,
    cl_email: userEmail,
    cl_phone: '',
    cl_country: 'CY',
    cl_city: 'Nicosia',
    description: `CookFlow top-up: ${credits} credits`,
    psys: '',
    get_trans: '1',
    success_url: `${env.ALLOWED_ORIGIN}/app/payment/success`,
    cancel_url: `${env.ALLOWED_ORIGIN}/app/payment/cancel`,
    hash,
  });

  let gwResponse: Response;
  try {
    gwResponse = await fetch(GATEWAY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody.toString(),
    });
  } catch {
    return jsonResp({ error: 'Gateway unreachable' }, 502, cors);
  }

  const gwText = (await gwResponse.text()).trim();
  if (!gwText.startsWith('OK')) {
    return jsonResp({ error: 'Gateway rejected request', detail: gwText }, 502, cors);
  }

  const paymentUrl = gwText.replace(/^OK\s+/, '').trim();

  const record: InvoiceRecord = {
    userId,
    userEmail,
    credits,
    amount: amountMinor,
    currency,
    status: 'pending',
    createdAt: Date.now(),
  };
  await env.INVOICES.put(`invoice:${invoiceId}`, JSON.stringify(record), { expirationTtl: 7200 });

  return jsonResp({ invoiceId, paymentUrl }, 200, cors);
}

async function handleVerify(
  url: URL,
  env: Env,
  cors: Record<string, string>,
  ctx: ExecutionContext,
): Promise<Response> {
  const invoiceId = url.searchParams.get('invoice');
  if (!invoiceId) return jsonResp({ error: 'Missing invoice' }, 400, cors);

  const kvKey = `invoice:${invoiceId}`;
  const stored = await env.INVOICES.get(kvKey);
  if (!stored) return jsonResp({ error: 'Invoice not found' }, 404, cors);

  const record: InvoiceRecord = JSON.parse(stored);

  if (record.status === 'completed') {
    return jsonResp({ status: 'completed', credits: record.credits }, 200, cors);
  }
  if (record.status === 'failed') {
    return jsonResp({ status: 'failed' }, 200, cors);
  }

  const hash = md5(`${invoiceId}${env.MERCHANT_ID}${env.MERCHANT_SECRET}`);
  const reqBody = new URLSearchParams({
    _cmd: 'request',
    merchant_id: env.MERCHANT_ID,
    invoice: invoiceId,
    hash,
    output: 'json',
  });

  let gwJson: { status_id?: number; error?: string };
  try {
    const gwResp = await fetch(GATEWAY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: reqBody.toString(),
    });
    gwJson = await gwResp.json();
  } catch {
    return jsonResp({ status: 'pending' }, 200, cors);
  }

  const sid = gwJson.status_id;
  if (sid === 10 || sid === 11) {
    await env.INVOICES.put(kvKey, JSON.stringify({ ...record, status: 'completed' }), {
      expirationTtl: 86400,
    });
    ctx.waitUntil(notifyPayment(env, record, invoiceId).catch(() => {}));
    return jsonResp({ status: 'completed', credits: record.credits }, 200, cors);
  }
  if (typeof sid === 'number' && sid < 0) {
    await env.INVOICES.put(kvKey, JSON.stringify({ ...record, status: 'failed' }), {
      expirationTtl: 3600,
    });
    return jsonResp({ status: 'failed' }, 200, cors);
  }

  return jsonResp({ status: 'pending' }, 200, cors);
}

async function handleIpn(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  let body: FormData;
  try {
    body = await request.formData();
  } catch {
    return new Response('Bad request', { status: 400 });
  }

  const invoice = body.get('invoice') as string | null;
  const statusId = body.get('status_id') as string | null;
  const receivedHash = body.get('hash') as string | null;

  if (!invoice || !statusId || !receivedHash) {
    return new Response('Missing fields', { status: 400 });
  }

  const expectedHash = md5(`${invoice}${env.MERCHANT_ID}${env.MERCHANT_SECRET}`);
  if (receivedHash !== expectedHash) {
    return new Response('Invalid hash', { status: 403 });
  }

  const kvKey = `invoice:${invoice}`;
  const stored = await env.INVOICES.get(kvKey);
  if (!stored) return new Response('OK', { status: 200 });

  const record: InvoiceRecord = JSON.parse(stored);
  if (record.status === 'completed') return new Response('OK', { status: 200 });

  const sid = parseInt(statusId, 10);
  if (sid === 10 || sid === 11) {
    await env.INVOICES.put(kvKey, JSON.stringify({ ...record, status: 'completed' }), {
      expirationTtl: 86400,
    });
    ctx.waitUntil(notifyPayment(env, record, invoice).catch(() => {}));
  } else if (sid < 0) {
    await env.INVOICES.put(kvKey, JSON.stringify({ ...record, status: 'failed' }), {
      expirationTtl: 3600,
    });
  }

  return new Response('OK', { status: 200 });
}

async function handleContact(
  request: Request,
  env: Env,
  cors: Record<string, string>,
): Promise<Response> {
  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return jsonResp({ error: 'Invalid JSON' }, 400, cors);
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const subject = (body.subject ?? '').trim();
  const message = (body.message ?? '').trim();

  if (!name || !email || !message) {
    return jsonResp({ error: 'Name, email, and message are required.' }, 400, cors);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResp({ error: 'Invalid email address.' }, 400, cors);
  }
  if (message.length > 5000) {
    return jsonResp({ error: 'Message too long.' }, 400, cors);
  }

  try {
    await sendSmtpEmail({
      smtpUser: env.SMTP_USER,
      smtpPass: env.SMTP_PASS,
      to: SUPPORT_EMAIL,
      subject: `Contact Form: ${subject || name}`,
      html: buildContactEmailHtml({ name, email, subject, message }),
      replyTo: email,
    });
  } catch {
    return jsonResp(
      { error: `Failed to send. Email us directly at ${SUPPORT_EMAIL}` },
      500,
      cors,
    );
  }

  return jsonResp({ ok: true }, 200, cors);
}
