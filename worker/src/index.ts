import { createHash } from 'node:crypto';

export interface Env {
  INVOICES: KVNamespace;
  MERCHANT_ID: string;
  MERCHANT_SECRET: string;
  ALLOWED_ORIGIN: string;
}

const GATEWAY_URL = 'https://www.safepayto.me/new/gateway/';

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
  credits: number;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: number;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const cors = corsHeaders(env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname === '/payment/create' && request.method === 'POST') {
      return handleCreate(request, env, cors);
    }
    if (url.pathname === '/payment/verify' && request.method === 'GET') {
      return handleVerify(url, env, cors);
    }
    if (url.pathname === '/payment/ipn' && request.method === 'POST') {
      return handleIpn(request, env);
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

async function handleIpn(request: Request, env: Env): Promise<Response> {
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
  } else if (sid < 0) {
    await env.INVOICES.put(kvKey, JSON.stringify({ ...record, status: 'failed' }), {
      expirationTtl: 3600,
    });
  }

  return new Response('OK', { status: 200 });
}
