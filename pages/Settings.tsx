import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";

// ── Types ──────────────────────────────────────────────────────────────────────
type AuthClientWithSignOut = {
  signOut: () => Promise<{ error?: { message?: string } | null }>;
};

// ── Toggle Component ────────────────────────────────────────────────────────────
interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({
  enabled,
  onToggle,
  disabled = false,
}) => (
  <button
    type="button"
    onClick={onToggle}
    disabled={disabled}
    className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0ff0f0] focus:ring-offset-2 focus:ring-offset-[#102222] ${
      disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
    } ${enabled ? "bg-[#0ff0f0]/30 border border-[#0ff0f0]/40" : "bg-[#234848]"}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full transition shadow-md ${
        enabled ? "translate-x-6 bg-[#0ff0f0]" : "translate-x-1 bg-slate-400"
      }`}
    />
  </button>
);

// ── Main Component ──────────────────────────────────────────────────────────────
const Settings: React.FC = () => {
  const navigate = useNavigate();
  const shouldEnforceAuth =
    (import.meta as any).env.VITE_REQUIRE_AUTH === "true";
  const { data: session } = authClient.useSession();

  const sessionUser = useMemo(
    () =>
      session?.user as
        | { name?: string; email?: string; image?: string }
        | undefined,
    [session],
  );

  // Profile state
  const [firstName, setFirstName] = useState(
    sessionUser?.name?.split(" ")[0] ?? "Julian",
  );
  const [lastName, setLastName] = useState(
    sessionUser?.name?.split(" ").slice(1).join(" ") ?? "Vandermerwe",
  );
  const [bio, setBio] = useState(
    "Aspiring home cook specializing in French pastry. Love experimenting with sous-vide techniques.",
  );
  const [interests, setInterests] = useState([
    "Pastry",
    "Sous-vide",
    "Italian",
  ]);

  // Preferences state
  const [voiceControl, setVoiceControl] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  // UI state
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [saved, setSaved] = useState(false);
  const [addingTag, setAddingTag] = useState(false);
  const [newTagInput, setNewTagInput] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [credits, setCredits] = useState(250);

  const handleDarkModeToggle = () => {
    showToast("CookFlow is currently only available in Dark Mode");
    setDarkMode(true);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === "string") {
        setAvatarUrl(ev.target.result);
        showToast("Profile photo updated!");
      }
    };
    reader.readAsDataURL(file);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Load saved profile from localStorage on mount
  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("cookflow_profile") || "{}",
      );
      if (stored.firstName) setFirstName(stored.firstName);
      if (stored.lastName) setLastName(stored.lastName);
      if (stored.bio) setBio(stored.bio);
      if (stored.interests) setInterests(stored.interests);
    } catch {
      /* ignore */
    }
  }, []);

  const displayEmail = sessionUser?.email ?? "chef.alex@cookflow.app";

  const handleSave = () => {
    try {
      localStorage.setItem(
        "cookflow_profile",
        JSON.stringify({ firstName, lastName, bio, interests }),
      );
    } catch {
      /* quota exceeded or private mode */
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const commitNewTag = () => {
    const t = newTagInput.trim();
    if (t && !interests.includes(t)) setInterests((prev) => [...prev, t]);
    setNewTagInput("");
    setAddingTag(false);
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const client = authClient as unknown as AuthClientWithSignOut;
      await client.signOut();
    } finally {
      setIsSigningOut(false);
      navigate("/auth/sign-in", { replace: true });
    }
  };

  const removeInterest = (tag: string) =>
    setInterests((prev) => prev.filter((t) => t !== tag));

  return (
    <>
      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-[200] px-5 py-3 rounded-xl text-sm font-semibold text-white shadow-2xl animate-fade-in"
          style={{
            background: "#1E293B",
            border: "1px solid #0ff0f0",
            boxShadow: "0 0 20px rgba(15,240,240,0.2)",
          }}
        >
          ✓ {toast}
        </div>
      )}

      {/* Credit Modal */}
      {showCreditModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowCreditModal(false)}
        >
          <div
            className="w-full max-w-md bg-[#0F172A] border border-[#234848] rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0ff0f0]">
                  toll
                </span>
                Purchase Credits
              </h2>
              <button
                onClick={() => setShowCreditModal(false)}
                className="text-slate-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              Credits are used to generate custom recipes, interact with VIP
              chefs, and unlock exclusive content.
            </p>
            <div className="grid grid-cols-1 gap-4">
              {[
                { amount: 50, price: "€4.99" },
                { amount: 200, price: "€14.99", popular: true },
                { amount: 500, price: "€29.99" },
              ].map((pack) => (
                <button
                  key={pack.amount}
                  onClick={() => {
                    setCredits((c) => c + pack.amount);
                    setShowCreditModal(false);
                    showToast(`Successfully purchased ${pack.amount} credits!`);
                  }}
                  className={`relative flex items-center justify-between p-4 rounded-xl transition-all ${
                    pack.popular
                      ? "bg-[#152a2a] border border-[#0ff0f0]"
                      : "bg-[#102222] border border-[#234848] hover:border-[#4a6a6a]"
                  }`}
                >
                  {pack.popular && (
                    <span className="absolute -top-3 left-4 bg-[#0ff0f0] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                      BEST VALUE
                    </span>
                  )}
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#0ff0f0]">
                      toll
                    </span>
                    <span className="text-white font-bold text-lg">
                      {pack.amount} Credits
                    </span>
                  </div>
                  <span className="text-slate-300 font-medium">
                    {pack.price}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowUpgradeModal(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#0F172A] border border-[#234848] rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif font-bold text-white">
                Upgrade Your Plan
              </h2>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-slate-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  name: "Patissier",
                  price: "€79",
                  color: "#38bdf8",
                  features: [
                    "Business Features",
                    "Editable Consumer",
                    "Molecular Textures",
                    "Chef Certificate",
                  ],
                },
                {
                  name: "Chef de Partie",
                  price: "€199",
                  color: "#d4af37",
                  popular: true,
                  features: [
                    "All Patissier features",
                    "Molecular Features",
                    "Fermentation Suite",
                    "Water-shield Features",
                  ],
                },
                {
                  name: "Executive Chef",
                  price: "€299",
                  color: "#0ff0f0",
                  features: [
                    "Everything included",
                    "Advanced techniques",
                    "Priority support",
                    "Sourdough browning",
                  ],
                },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-xl p-5 flex flex-col gap-3 relative ${plan.popular ? "border-2" : "border"}`}
                  style={{
                    background: "#152a2a",
                    borderColor: plan.popular ? plan.color : "#234848",
                  }}
                >
                  {plan.popular && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-black"
                      style={{ background: plan.color }}
                    >
                      Popular
                    </span>
                  )}
                  <p className="font-serif font-bold text-white text-center">
                    {plan.name}
                  </p>
                  <p
                    className="text-center text-2xl font-bold"
                    style={{ color: plan.color }}
                  >
                    {plan.price}
                    <span className="text-sm font-normal text-slate-400">
                      /mo
                    </span>
                  </p>
                  <ul className="space-y-1.5 flex-1">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="text-xs text-slate-400 flex items-center gap-2"
                      >
                        <span style={{ color: plan.color }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      setShowUpgradeModal(false);
                      showToast(`Switched to ${plan.name} plan`);
                    }}
                    className="mt-2 w-full py-2 rounded-lg text-sm font-bold text-black transition-all"
                    style={{ background: plan.color }}
                  >
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Load Material Symbols font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap"
        rel="stylesheet"
      />

      <style>{`
                .ms-icon { font-family: 'Material Symbols Outlined'; font-style: normal; font-weight: 400; font-display: swap; }
                .glass-panel {
                    background: rgba(21, 42, 42, 0.6);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(15, 240, 240, 0.1);
                }
                .gold-glow {
                    box-shadow: 0 0 15px rgba(212, 175, 55, 0.15);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                }
                .cf-input {
                    width: 100%;
                    background: #152a2a;
                    border: 1px solid #234848;
                    border-radius: 0.5rem;
                    padding: 0.75rem 1rem;
                    color: #f1f5f9;
                    outline: none;
                    font-size: 0.875rem;
                    transition: border-color 0.15s, box-shadow 0.15s;
                    font-family: inherit;
                }
                .cf-input:focus { border-color: #0ff0f0; box-shadow: 0 0 0 1px #0ff0f0; }
                .cf-input::placeholder { color: #4a6a6a; }
            `}</style>

      <div className="relative font-['Noto_Sans',sans-serif]">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-10">
          {/* ── Header ──────────────────────────────────────────────── */}
          <header
            className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6"
            style={{ borderColor: "#234848" }}
          >
            <div>
              <h1
                className="text-3xl md:text-4xl font-bold tracking-tight mb-1 font-serif"
                style={{ color: "#d4af37" }}
              >
                Settings
              </h1>
              <p className="text-sm text-slate-400">
                Manage your profile, billing, and cooking preferences.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white transition-all"
                style={{ border: "1px solid #234848" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(15,240,240,0.5)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#234848")
                }
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 rounded-lg text-sm font-bold transition-all"
                style={{
                  background: "#0ff0f0",
                  color: "#102222",
                  boxShadow: "0 0 15px rgba(15,240,240,0.3)",
                }}
              >
                {saved ? "✓ Saved!" : "Save Changes"}
              </button>
            </div>
          </header>

          {/* ── Grid ────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {/* ── Left Column ────────────────────────────────────── */}
            <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
              {/* Profile Card */}
              <section className="glass-panel rounded-xl p-6 md:p-8">
                <div
                  className="flex items-center gap-2 mb-6"
                  style={{ color: "#0ff0f0" }}
                >
                  <span className="ms-icon text-xl material-symbols-outlined">
                    person
                  </span>
                  <h2 className="text-lg font-bold text-white tracking-wide font-serif">
                    Profile Settings
                  </h2>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Avatar */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <label
                      htmlFor="avatar-upload"
                      className="relative group cursor-pointer block"
                    >
                      <div
                        className="w-24 h-24 md:w-28 md:h-28 rounded-full p-1"
                        style={{ border: "2px solid #0ff0f0" }}
                      >
                        {avatarUrl || sessionUser?.image ? (
                          <img
                            src={avatarUrl ?? sessionUser?.image ?? ""}
                            alt="Profile"
                            loading="lazy"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-full rounded-full flex items-center justify-center text-3xl"
                            style={{
                              background:
                                "linear-gradient(135deg, #234848, #102222)",
                            }}
                          >
                            {"\u{1F468}\u200D\u{1F373}"}
                          </div>
                        )}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-white text-xl">
                          edit
                        </span>
                      </div>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </label>
                    <span
                      className="text-xs font-bold tracking-wider"
                      style={{ color: "#0ff0f0" }}
                    >
                      CHANGE PHOTO
                    </span>
                  </div>

                  {/* Inputs */}
                  <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                    <label className="flex flex-col gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        First Name
                      </span>
                      <input
                        className="cf-input"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Last Name
                      </span>
                      <input
                        className="cf-input"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Email
                      </span>
                      <input
                        className="cf-input"
                        type="email"
                        value={displayEmail}
                        readOnly
                        style={{ opacity: 0.7, cursor: "not-allowed" }}
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Status
                      </span>
                      <div
                        className="cf-input flex items-center gap-2 cursor-default"
                        style={{ opacity: 0.8 }}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#0ff0f0] animate-pulse" />
                        <span>
                          {shouldEnforceAuth ? "Authenticated" : "Dev Mode"}
                        </span>
                      </div>
                    </label>
                    <label className="flex flex-col gap-2 md:col-span-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Bio
                      </span>
                      <textarea
                        className="cf-input resize-y"
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </label>

                    {/* Culinary Interests */}
                    <div className="md:col-span-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Culinary Interests
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {interests.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-sm flex items-center gap-1"
                            style={{
                              background: "#234848",
                              color: "#0ff0f0",
                              border: "1px solid rgba(15,240,240,0.2)",
                            }}
                          >
                            {tag}
                            <button
                              onClick={() => removeInterest(tag)}
                              className="hover:text-white ml-0.5 transition-colors leading-none"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                        {addingTag ? (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              commitNewTag();
                            }}
                            className="flex items-center gap-2"
                          >
                            <input
                              autoFocus
                              type="text"
                              value={newTagInput}
                              onChange={(e) => setNewTagInput(e.target.value)}
                              onBlur={commitNewTag}
                              onKeyDown={(e) => {
                                if (e.key === "Escape") {
                                  setAddingTag(false);
                                  setNewTagInput("");
                                }
                              }}
                              placeholder="e.g. Grilling"
                              className="px-3 py-1 rounded-full text-sm text-[#0ff0f0] bg-[#234848] outline-none w-32"
                              style={{
                                border: "1px solid rgba(15,240,240,0.4)",
                              }}
                            />
                          </form>
                        ) : (
                          <button
                            onClick={() => setAddingTag(true)}
                            className="px-3 py-1 rounded-full border border-dashed text-sm text-slate-400 hover:text-white hover:border-slate-300 transition-colors"
                            style={{ borderColor: "#4a6a6a" }}
                          >
                            + Add Tag
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Account & Plan */}
              <section className="glass-panel rounded-xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <span
                    className="material-symbols-outlined text-white"
                    style={{ fontSize: "8rem", lineHeight: 1 }}
                  >
                    verified
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 mb-6 relative z-10"
                  style={{ color: "#0ff0f0" }}
                >
                  <span className="material-symbols-outlined text-xl">
                    badge
                  </span>
                  <h2 className="text-lg font-bold text-white tracking-wide font-serif">
                    Account &amp; Plan
                  </h2>
                </div>
                <div
                  className="flex flex-col md:flex-row items-center justify-between gap-6 p-5 md:p-6 rounded-lg relative z-10"
                  style={{ background: "#112222", border: "1px solid #234848" }}
                >
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                      Current Tier
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-white flex flex-wrap items-center gap-3 font-serif">
                      Chef de Partie
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide text-black"
                        style={{ background: "#d4af37" }}
                      >
                        Premium
                      </span>
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                      €12.00 / month • Billed annually
                    </p>
                  </div>
                  <button
                    onClick={() => setShowUpgradeModal(true)}
                    className="flex items-center gap-2 py-3 px-6 rounded-lg font-bold text-sm text-black transition-all whitespace-nowrap flex-shrink-0"
                    style={{
                      background: "#d4af37",
                      boxShadow: "0 0 20px rgba(212,175,55,0.4)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#bfa030")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#d4af37")
                    }
                  >
                    <span className="material-symbols-outlined text-xl">
                      star
                    </span>
                    Upgrade to Executive Chef
                  </button>
                </div>
              </section>

              {/* Preferences */}
              <section className="glass-panel rounded-xl p-6 md:p-8">
                <div
                  className="flex items-center gap-2 mb-6"
                  style={{ color: "#0ff0f0" }}
                >
                  <span className="material-symbols-outlined text-xl">
                    tune
                  </span>
                  <h2 className="text-lg font-bold text-white tracking-wide font-serif">
                    Preferences
                  </h2>
                </div>
                <div
                  className="flex flex-col divide-y"
                  style={{ borderColor: "#234848" }}
                >
                  {/* Dark Mode */}
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-white font-medium">Dark Mode</p>
                      <p className="text-slate-500 text-sm">
                        Easier on the eyes in low-light kitchens.
                      </p>
                    </div>
                    <Toggle
                      enabled={darkMode}
                      onToggle={handleDarkModeToggle}
                    />
                  </div>
                  {/* Voice Control */}
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-white font-medium">Voice Control</p>
                      <p className="text-slate-500 text-sm">
                        Enable "Hey Chef" commands for hands-free cooking.
                      </p>
                    </div>
                    <Toggle
                      enabled={voiceControl}
                      onToggle={() => setVoiceControl((v) => !v)}
                    />
                  </div>
                  {/* Weekly Digest */}
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-white font-medium">Weekly Digest</p>
                      <p className="text-slate-500 text-sm">
                        Receive curated recipes and tips every Monday.
                      </p>
                    </div>
                    <Toggle
                      enabled={weeklyDigest}
                      onToggle={() => setWeeklyDigest((v) => !v)}
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* ── Right Column ────────────────────────────────────── */}
            <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8">
              {/* Subscription Card */}
              <div
                className="rounded-xl p-6 relative gold-glow"
                style={{ background: "#102222" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="text-lg font-bold font-serif"
                    style={{ color: "#d4af37" }}
                  >
                    Subscription
                  </h3>
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "#d4af37" }}
                  >
                    credit_card
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <div
                    className="p-4 rounded-lg"
                    style={{
                      background: "#152a2a",
                      border: "1px solid #234848",
                    }}
                  >
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">
                      Next Billing Date
                    </p>
                    <p className="text-white font-mono text-lg">Apr 24, 2026</p>
                    <p className="text-[#0ff0f0] text-xs mt-1">
                      Auto-renewal active
                    </p>
                  </div>
                  <div
                    className="p-4 rounded-lg"
                    style={{
                      background: "#152a2a",
                      border: "1px solid #234848",
                    }}
                  >
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-3">
                      Payment Method
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 rounded flex items-center justify-center text-[8px] text-white font-bold tracking-tighter bg-slate-700">
                        VISA
                      </div>
                      <div className="flex flex-col">
                        <p className="text-white text-sm font-medium">
                          Visa ending in 4242
                        </p>
                        <p className="text-slate-500 text-xs">Expires 12/25</p>
                      </div>
                      <button
                        onClick={() =>
                          alert(
                            "Payment Method editor will be available in the next release.",
                          )
                        }
                        className="ml-auto text-sm hover:text-white transition-colors"
                        style={{ color: "#0ff0f0" }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    alert(
                      "Billing history will be available once your account is live during checkout.",
                    )
                  }
                  className="w-full mt-6 py-2 rounded text-sm text-slate-400 hover:text-white transition-colors"
                  style={{ border: "1px solid #234848" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "#4a6a6a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "#234848")
                  }
                >
                  View Billing History
                </button>
              </div>

              {/* Credits Card */}
              <div
                className="rounded-xl p-6 relative border"
                style={{ background: "#102222", borderColor: "#234848" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="text-lg font-bold font-serif"
                    style={{ color: "#0ff0f0" }}
                  >
                    CookFlow Credits
                  </h3>
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "#0ff0f0" }}
                  >
                    toll
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-bold text-white mb-1">
                      {credits}
                    </p>
                    <p className="text-xs text-slate-400">Available Credits</p>
                  </div>
                  <button
                    onClick={() => setShowCreditModal(true)}
                    className="px-4 py-2 rounded-lg text-sm font-bold text-black transition-all"
                    style={{ background: "#0ff0f0" }}
                  >
                    Buy Credits
                  </button>
                </div>
              </div>

              {/* Help & Support */}
              <div className="glass-panel rounded-xl p-6">
                <h3 className="text-base font-bold text-white mb-4 font-serif">
                  Need Help?
                </h3>
                <ul className="space-y-3">
                  {[
                    { icon: "help", label: "Support Center" },
                    { icon: "chat", label: "Chat with a Chef" },
                    { icon: "policy", label: "Privacy Policy" },
                  ].map(({ icon, label }) => (
                    <li key={label}>
                      <a
                        href="#"
                        className="flex items-center gap-3 text-slate-400 hover:text-[#0ff0f0] transition-colors text-sm group"
                      >
                        <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">
                          {icon}
                        </span>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Danger Zone / Sign Out */}
              <div
                className="pt-4 border-t mt-auto"
                style={{ borderColor: "#234848" }}
              >
                <button
                  onClick={handleSignOut}
                  disabled={isSigningOut || !session}
                  className="flex items-center gap-2 text-sm font-medium transition-colors text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-lg">
                    logout
                  </span>
                  {isSigningOut ? "Signing out…" : "Sign Out"}
                </button>

                {/* Delete Account */}
                <div
                  className="mt-4 pt-4 border-t"
                  style={{ borderColor: "rgba(220,38,38,0.2)" }}
                >
                  {!showDeleteConfirm ? (
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex items-center gap-2 text-sm font-medium text-red-600/60 hover:text-red-400 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">
                        delete_forever
                      </span>
                      Delete Account
                    </button>
                  ) : (
                    <div
                      className="p-4 rounded-lg"
                      style={{
                        background: "rgba(220,38,38,0.08)",
                        border: "1px solid rgba(220,38,38,0.3)",
                      }}
                    >
                      <p className="text-sm text-red-300 font-semibold mb-3">
                        This cannot be undone. All your data will be permanently
                        deleted.
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowDeleteConfirm(false)}
                          className="px-3 py-1.5 rounded text-xs text-slate-400 transition-colors"
                          style={{ border: "1px solid #234848" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.borderColor = "#4a6a6a")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.borderColor = "#234848")
                          }
                        >
                          Cancel
                        </button>
                        <button
                          className="px-3 py-1.5 rounded text-xs font-bold text-white transition-colors"
                          style={{ background: "rgb(220,38,38)" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                              "rgb(185,28,28)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background =
                              "rgb(220,38,38)")
                          }
                          onClick={() => {
                            alert(
                              "Account deletion request submitted. Our team will process it within 48 hours.",
                            );
                            setShowDeleteConfirm(false);
                          }}
                        >
                          Delete My Account
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
