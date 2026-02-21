import React, { FormEvent, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { authClient } from "../lib/auth-client";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get("next") ?? "/app/courses";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });
      if (error) {
        setError(error.message ?? "Unable to create account");
        return;
      }

      navigate(next, { replace: true });
    } catch {
      setError("Unable to sign up. Make sure Better Auth server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1E293B] border border-[#334155] rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-serif mb-2">Create Account</h1>
        <p className="text-[#94A3B8] text-sm mb-6">
          Start your CookFlow journey.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#94A3B8] mb-2">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#14b8a6]"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#94A3B8] mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#14b8a6]"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#94A3B8] mb-2">
              Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#14b8a6]"
            />
          </div>

          {error && <p className="text-sm text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#14b8a6] hover:bg-[#0d9488] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-[#94A3B8] mt-6">
          Already have an account?{" "}
          <Link
            to={`/auth/sign-in?next=${encodeURIComponent(next)}`}
            className="text-[#14b8a6] hover:text-[#2dd4bf]"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
