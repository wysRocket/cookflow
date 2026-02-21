import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { authClient } from "../lib/auth-client";

type AuthControlsProps = {
  mobile?: boolean;
};

const AuthControls: React.FC<AuthControlsProps> = ({ mobile = false }) => {
  const shouldEnforceAuth = import.meta.env.VITE_REQUIRE_AUTH === "true";
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  if (!shouldEnforceAuth) {
    return null;
  }

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as { name?: string; email?: string } | undefined;
  const displayName = user?.name ?? user?.email ?? "Account";

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await authClient.signOut();
    } finally {
      setSigningOut(false);
      navigate("/auth/sign-in", { replace: true });
    }
  };

  if (isPending) {
    return (
      <span
        className={
          mobile
            ? "text-xs text-[#94A3B8]"
            : "text-xs text-[#94A3B8] uppercase tracking-widest"
        }
      >
        Loading...
      </span>
    );
  }

  if (!session) {
    return (
      <Link
        to="/auth/sign-in"
        className="text-sm font-medium text-[#14b8a6] hover:text-[#2dd4bf] transition-colors"
      >
        Sign In
      </Link>
    );
  }

  if (mobile) {
    return (
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#D4AF37] flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-[#F1F5F9] truncate">
            {displayName}
          </span>
        </div>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="text-xs font-semibold text-[#14b8a6] disabled:opacity-60"
        >
          {signingOut ? "Signing out..." : "Sign out"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full overflow-hidden border border-[#334155]">
        <div className="w-full h-full bg-gradient-to-br from-[#14b8a6] to-[#D4AF37] flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="leading-tight">
        <p className="text-xs font-semibold text-[#F1F5F9] truncate max-w-[160px]">
          {displayName}
        </p>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="text-[11px] text-[#14b8a6] hover:text-[#2dd4bf] disabled:opacity-60 transition-colors"
        >
          {signingOut ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </div>
  );
};

export default AuthControls;
