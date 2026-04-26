import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccess } from "../contexts/AccessContext";

const WORKER_URL = import.meta.env.VITE_PAYMENTS_WORKER_URL;
const MAX_POLLS = 12;
const POLL_INTERVAL_MS = 5000;

type Status = "checking" | "completed" | "failed" | "timeout";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { addCredits } = useAccess();
  const [status, setStatus] = useState<Status>("checking");
  const [credits, setCredits] = useState(0);
  const pollCount = useRef(0);
  const credited = useRef(false);

  useEffect(() => {
    const invoiceId = sessionStorage.getItem("cookflow_pending_invoice");
    if (!invoiceId) {
      navigate("/app/settings", { replace: true });
      return;
    }

    let cancelled = false;

    const poll = async () => {
      if (cancelled) return;
      if (pollCount.current >= MAX_POLLS) {
        setStatus("timeout");
        return;
      }
      pollCount.current++;

      try {
        const res = await fetch(
          `${WORKER_URL}/payment/verify?invoice=${encodeURIComponent(invoiceId)}`,
        );
        const data: { status: string; credits?: number } = await res.json();

        if (cancelled) return;

        if (data.status === "completed" && !credited.current) {
          credited.current = true;
          sessionStorage.removeItem("cookflow_pending_invoice");
          addCredits(data.credits ?? 0);
          setCredits(data.credits ?? 0);
          setStatus("completed");
        } else if (data.status === "failed") {
          sessionStorage.removeItem("cookflow_pending_invoice");
          setStatus("failed");
        } else {
          setTimeout(poll, POLL_INTERVAL_MS);
        }
      } catch {
        if (!cancelled) setTimeout(poll, POLL_INTERVAL_MS);
      }
    };

    poll();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
      {status === "checking" && (
        <>
          <div className="w-12 h-12 rounded-full border-2 border-[#14b8a6] border-t-transparent animate-spin" />
          <p className="text-[#94A3B8] text-sm">Confirming your payment…</p>
        </>
      )}

      {status === "completed" && (
        <>
          <div className="w-16 h-16 rounded-full bg-[#14b8a6]/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#14b8a6] text-4xl">
              check_circle
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-serif text-[#F1F5F9] mb-2">
              Payment successful
            </h2>
            <p className="text-[#94A3B8] text-sm">
              {credits} credits have been added to your account.
            </p>
          </div>
          <button
            onClick={() => navigate("/app/settings")}
            className="mt-2 px-6 py-2.5 rounded-xl bg-[#14b8a6] text-[#0F172A] font-semibold text-sm hover:bg-[#2dd4bf] transition-colors"
          >
            Back to Settings
          </button>
        </>
      )}

      {(status === "failed" || status === "timeout") && (
        <>
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-red-400 text-4xl">
              {status === "timeout" ? "schedule" : "error"}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-serif text-[#F1F5F9] mb-2">
              {status === "timeout" ? "Still processing" : "Payment failed"}
            </h2>
            <p className="text-[#94A3B8] text-sm max-w-sm">
              {status === "timeout"
                ? "Your payment is taking longer than expected. Credits will appear once confirmed — check your email for a receipt."
                : "Your payment was not completed. No charges were made."}
            </p>
          </div>
          <button
            onClick={() => navigate("/app/settings")}
            className="mt-2 px-6 py-2.5 rounded-xl border border-[#334155] text-[#F1F5F9] font-semibold text-sm hover:border-[#14b8a6] transition-colors"
          >
            Back to Settings
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
