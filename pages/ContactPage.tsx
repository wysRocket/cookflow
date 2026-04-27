import React, { useState } from "react";
import { ChefHat } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { companyInfo, companyDisplayAddress } from "../lib/companyInfo";

const WORKER_URL = import.meta.env.VITE_PAYMENTS_WORKER_URL as string;

type FormState = "idle" | "submitting" | "success" | "error";

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");
    try {
      const res = await fetch(`${WORKER_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Request failed");
      }
      setState("success");
      setName(""); setEmail(""); setSubject(""); setMessage("");
    } catch (err) {
      setState("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : `Something went wrong. Email us at ${companyInfo.contactEmail}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-[#F1F5F9]">
      <Seo
        title="Contact — CookFlow"
        description="Get in touch with the CookFlow team for support, billing questions, or general enquiries."
      />

      {/* Nav */}
      <header className="border-b border-white/5 px-6 py-4">
        <Link to="/" className="inline-flex items-center gap-2">
          <ChefHat className="h-5 w-5 text-[#14b8a6]" />
          <span className="font-serif text-lg font-bold tracking-wider text-white">
            COOK<span className="text-[#14b8a6]">FLOW</span>
          </span>
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#14b8a6] mb-3">
          Support
        </p>
        <h1 className="font-serif text-4xl text-white mb-4">Contact CookFlow</h1>
        <p className="text-[#94A3B8] mb-12 max-w-xl">
          Reach out for billing questions, credit purchases, technical support, or
          general enquiries. We respond within one business day.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company details */}
          <div className="md:col-span-1 space-y-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#64748B] mb-1">
                Email
              </p>
              <a
                href={`mailto:${companyInfo.contactEmail}`}
                className="text-[#14b8a6] hover:text-[#2dd4bf] transition-colors text-sm"
              >
                {companyInfo.contactEmail}
              </a>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#64748B] mb-1">
                Company
              </p>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                {companyInfo.legalName}
                <br />
                {companyInfo.registrationLabel} {companyInfo.registrationNumber}
                <br />
                {companyDisplayAddress}
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            {state === "success" ? (
              <div className="flex flex-col items-start gap-3">
                <p className="text-[#14b8a6] font-semibold">Message sent.</p>
                <p className="text-sm text-[#94A3B8]">
                  We'll get back to you at{" "}
                  <span className="text-white">{companyInfo.contactEmail}</span>{" "}
                  within one business day.
                </p>
                <button
                  onClick={() => setState("idle")}
                  className="mt-2 text-sm text-[#64748B] hover:text-white transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6] transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6] transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6] transition-all"
                    placeholder="Billing, credits, technical support…"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#14b8a6] focus:ring-1 focus:ring-[#14b8a6] transition-all resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                {state === "error" && (
                  <p className="text-sm text-red-400">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="w-full py-3 bg-[#14b8a6] text-obsidian font-bold uppercase tracking-widest rounded-lg hover:bg-[#2dd4bf] transition-colors disabled:opacity-50 text-sm"
                >
                  {state === "submitting" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
