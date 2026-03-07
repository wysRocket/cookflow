import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../contexts/AuthContext";

type AuthControlsProps = {
  mobile?: boolean;
};

const AuthControls: React.FC<AuthControlsProps> = ({ mobile = false }) => {
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);
  const { user, loading } = useAuth();
  const shouldEnforceAuth = import.meta.env.VITE_REQUIRE_AUTH === "true";

  if (!shouldEnforceAuth) {
    return null;
  }

  const displayName = user?.displayName ?? user?.email ?? "Account";

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut(auth);
    } finally {
      setSigningOut(false);
      navigate("/auth/sign-in", { replace: true });
    }
  };

  if (loading) {
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

  if (!user) {
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
          <Link to="/app/settings" className="w-8 h-8 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#D4AF37] flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-[#14b8a6] transition-all">
            {user.photoURL ? (
              <img src={user.photoURL} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4 text-white" />
            )}
          </Link>
          <span className="text-sm font-medium text-[#F1F5F9] truncate">
            {displayName}
          </span>
        </div>
        <button
          type="button"
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
      <Link to="/app/settings" className="w-9 h-9 rounded-full overflow-hidden border border-[#334155] hover:border-[#14b8a6] hover:ring-2 hover:ring-[#14b8a6]/50 transition-all cursor-pointer block">
        {user.photoURL ? (
          <img src={user.photoURL} alt={displayName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#14b8a6] to-[#D4AF37] flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
      </Link>
      <div className="leading-tight">
        <p className="text-xs font-semibold text-[#F1F5F9] truncate max-w-[160px]">
          {displayName}
        </p>
        <button
          type="button"
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
