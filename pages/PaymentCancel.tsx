import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-[#334155]/50 flex items-center justify-center">
        <span className="material-symbols-outlined text-[#64748B] text-4xl">
          cancel
        </span>
      </div>
      <div>
        <h2 className="text-2xl font-serif text-[#F1F5F9] mb-2">
          Payment cancelled
        </h2>
        <p className="text-[#94A3B8] text-sm">
          No charges were made. You can top up whenever you're ready.
        </p>
      </div>
      <button
        onClick={() => navigate("/app/settings")}
        className="mt-2 px-6 py-2.5 rounded-xl bg-[#14b8a6] text-[#0F172A] font-semibold text-sm hover:bg-[#2dd4bf] transition-colors"
      >
        Back to Settings
      </button>
    </div>
  );
};

export default PaymentCancel;
