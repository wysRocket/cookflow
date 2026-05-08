import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile, signOut } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { useAuth } from "../contexts/AuthContext";
import { useAccess } from "../contexts/AccessContext";
import { companyDisplayAddress, companyInfo } from "../lib/companyInfo";

const QUICK_TOPUP_CREDITS = [100, 500, 1000, 2500, 5000] as const;
const MIN_TOPUP_CREDITS = 1;
const MAX_TOPUP_CREDITS = 20000;
const DEFAULT_TOPUP_CREDITS = 1000;

const CREDIT_ACTIONS = [
  {
    key: "planner",
    title: "Unlock Meal Planner",
    subtitle: "30-day access",
    cost: 100,
    icon: "calendar_month",
  },
] as const;

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const shouldEnforceAuth = import.meta.env.VITE_REQUIRE_AUTH === "true";
  const { user } = useAuth();
  const {
    loading: accessLoading,
    credits,
    unlockedRecipes,
    unlockedChefs,
    plannerUntil,
    addCredits,
    spendCredits,
    unlockPlannerMonth,
  } = useAccess();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState(
    "Passionate home cook looking to explore advanced techniques.",
  );
  const [city, setCity] = useState("San Francisco, CA");
  const [interests, setInterests] = useState<string[]>([
    "Modernist",
    "Fermentation",
  ]);

  const [voiceControl, setVoiceControl] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [darkMode] = useState(true);

  const [newTagInput, setNewTagInput] = useState("");
  const [addingTag, setAddingTag] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showSpendModal, setShowSpendModal] = useState(false);
  const [topUpCurrency, setTopUpCurrency] = useState<"EUR" | "GBP">("EUR");
  const [topUpCredits, setTopUpCredits] = useState(DEFAULT_TOPUP_CREDITS);
  const [topUpInput, setTopUpInput] = useState(String(DEFAULT_TOPUP_CREDITS));
  const [toast, setToast] = useState<string | null>(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [tosAccepted, setTosAccepted] = useState(false);

  useEffect(() => {
    if (!showTopUpModal) setTosAccepted(false);
  }, [showTopUpModal]);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return;
        const data = docSnap.data();
        if (typeof data.firstName === "string") setFirstName(data.firstName);
        if (typeof data.lastName === "string") setLastName(data.lastName);
        if (typeof data.bio === "string") setBio(data.bio);
        if (typeof data.city === "string") setCity(data.city);
        if (Array.isArray(data.interests)) {
          setInterests(
            data.interests
              .map((item: unknown) => String(item).trim())
              .filter(Boolean),
          );
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };
    void fetchProfile();
  }, [user]);

  const plannerStatus = useMemo(() => {
    if (!plannerUntil || plannerUntil < Date.now()) return "Locked";
    return new Date(plannerUntil).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [plannerUntil]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === "string") {
        setAvatarUrl(ev.target.result);
        showToast("Profile photo updated.");
      }
    };
    reader.readAsDataURL(file);
  };

  const commitNewTag = () => {
    const tag = newTagInput.trim();
    if (tag && !interests.includes(tag)) {
      setInterests((prev) => [...prev, tag]);
    }
    setNewTagInput("");
    setAddingTag(false);
  };

  const removeInterest = (tag: string) => {
    setInterests((prev) => prev.filter((item) => item !== tag));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (user) {
        const fullName = `${firstName} ${lastName}`.trim();
        await updateProfile(user, { displayName: fullName || null });
        await setDoc(
          doc(db, "users", user.uid),
          { firstName, lastName, bio, city, interests },
          { merge: true },
        );
      }
      showToast("Profile settings saved.");
    } catch (error) {
      console.error("Failed to save profile settings", error);
      showToast("Could not save profile settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const normalizeTopUpCredits = (credits: number) =>
    Math.min(MAX_TOPUP_CREDITS, Math.max(MIN_TOPUP_CREDITS, Math.round(credits)));

  const setTopUpCreditsSafe = (credits: number, syncInput = true) => {
    const normalized = normalizeTopUpCredits(credits);
    setTopUpCredits(normalized);
    if (syncInput) setTopUpInput(String(normalized));
  };

  const exchangeRate = topUpCurrency === "EUR" ? 100 : 120;
  const currencySymbol = topUpCurrency === "EUR" ? "€" : "£";
  const amountInCurrency = topUpCredits / exchangeRate;
  const formattedAmount = amountInCurrency.toFixed(2);

  const handleTopUpProceed = async () => {
    if (!user || isPaymentLoading) return;
    setIsPaymentLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PAYMENTS_WORKER_URL}/payment/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: amountInCurrency,
            currency: topUpCurrency,
            credits: topUpCredits,
            userId: user.uid,
            userEmail: user.email ?? "",
            userName: user.displayName ?? "",
          }),
        },
      );
      if (!res.ok) {
        const err: { error?: string } = await res.json();
        showToast(err.error ?? "Payment request failed. Please try again.");
        return;
      }
      const { invoiceId, paymentUrl }: { invoiceId: string; paymentUrl: string } =
        await res.json();
      sessionStorage.setItem("cookflow_pending_invoice", invoiceId);
      setShowTopUpModal(false);
      window.location.href = paymentUrl;
    } catch {
      showToast("Could not reach payment gateway. Please try again.");
    } finally {
      setIsPaymentLoading(false);
    }
  };

  const handleSpendAction = (actionKey: string, cost: number) => {
    if (actionKey === "planner") {
      const ok = unlockPlannerMonth();
      if (!ok) {
        showToast("Not enough credits for planner unlock.");
        return;
      }
      setShowSpendModal(false);
      showToast("Meal Planner unlocked for 30 days.");
      navigate("/app/meal-planner");
      return;
    }

    const ok = spendCredits(cost);
    if (!ok) {
      showToast("Not enough credits.");
      return;
    }
    setShowSpendModal(false);
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut(auth);
    } finally {
      setIsSigningOut(false);
      navigate("/auth/sign-in", { replace: true });
    }
  };

  return (
    <>
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-[200] px-5 py-3 rounded-xl text-sm font-semibold text-white shadow-2xl"
          style={{
            background: "#1E293B",
            border: "1px solid #0ff0f0",
            boxShadow: "0 0 20px rgba(15,240,240,0.2)",
          }}
        >
          {toast}
        </div>
      )}

      {showTopUpModal && (
        <div
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/70 px-3 py-4 backdrop-blur-sm sm:flex sm:items-center sm:justify-center sm:p-4"
          onClick={() => setShowTopUpModal(false)}
        >
          <div
            className="mx-auto max-h-[calc(100dvh-2rem)] w-full max-w-[460px] overflow-y-auto rounded-2xl border border-[#1B2A4F] bg-[#09132D] p-4 shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold text-white sm:text-3xl">
                Top Up Credits
              </h2>
              <button
                onClick={() => setShowTopUpModal(false)}
                className="text-slate-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-[#8AA0C5] mb-3">Select Currency</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTopUpCurrency("EUR")}
                    className={`py-3 rounded-xl text-lg font-semibold transition-colors ${
                      topUpCurrency === "EUR"
                        ? "bg-[#0EA5C6] text-white"
                        : "bg-[#1A2745] text-[#8AA0C5] hover:text-white"
                    }`}
                  >
                    € EUR
                  </button>
                  <button
                    onClick={() => setTopUpCurrency("GBP")}
                    className={`py-3 rounded-xl text-lg font-semibold transition-colors ${
                      topUpCurrency === "GBP"
                        ? "bg-[#0EA5C6] text-white"
                        : "bg-[#1A2745] text-[#8AA0C5] hover:text-white"
                    }`}
                  >
                    £ GBP
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-[#8AA0C5] mb-3">Quick Select</p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {QUICK_TOPUP_CREDITS.map((cr) => (
                    <button
                      key={cr}
                      onClick={() => setTopUpCreditsSafe(cr)}
                      className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
                        topUpCredits === cr
                          ? "bg-[#0EA5C6] text-white"
                          : "bg-[#1A2745] text-[#8AA0C5] hover:text-white"
                      }`}
                    >
                      {cr.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-[#8AA0C5] mb-3">Custom Amount</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-[auto_auto_minmax(0,1fr)_auto_auto] sm:items-center">
                  <input
                    type="range"
                    min={MIN_TOPUP_CREDITS}
                    max={MAX_TOPUP_CREDITS}
                    step={10}
                    value={topUpCredits}
                    onChange={(e) => setTopUpCreditsSafe(Number(e.target.value))}
                    className="order-first col-span-2 w-full accent-[#0EA5C6] sm:order-none sm:col-span-1"
                  />
                  {[-100, -10].map((delta) => (
                    <button
                      key={delta}
                      onClick={() => setTopUpCreditsSafe(topUpCredits + delta)}
                      className="min-h-11 rounded-lg bg-[#1A2745] px-3 py-2 text-sm font-semibold text-white"
                    >
                      {delta}
                    </button>
                  ))}
                  {[10, 100].map((delta) => (
                    <button
                      key={delta}
                      onClick={() => setTopUpCreditsSafe(topUpCredits + delta)}
                      className="min-h-11 rounded-lg bg-[#1A2745] px-3 py-2 text-sm font-semibold text-white"
                    >
                      +{delta}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-[#7C92B8] mt-2">
                  <span>{MIN_TOPUP_CREDITS} cr</span>
                  <span>{MAX_TOPUP_CREDITS.toLocaleString()} cr</span>
                </div>
                <p className="text-xs text-[#62789E] mt-2 text-center">
                  Buttons adjust by ±10 or ±100 credits
                </p>
              </div>

              <div>
                <p className="text-sm text-[#8AA0C5] mb-3">Or Enter Credits</p>
                <div className="relative">
                  <input
                    value={topUpInput}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "");
                      setTopUpInput(raw);
                      if (!raw) return;
                      const parsed = parseInt(raw, 10);
                      if (Number.isFinite(parsed)) {
                        setTopUpCreditsSafe(parsed, false);
                      }
                    }}
                    onBlur={() => {
                      if (!topUpInput.trim()) {
                        setTopUpCreditsSafe(DEFAULT_TOPUP_CREDITS);
                        return;
                      }
                      setTopUpCreditsSafe(topUpCredits);
                    }}
                    className="w-full rounded-xl border border-[#2A3A63] bg-[#1A2745] py-3 pl-4 pr-12 text-xl font-semibold text-white focus:border-[#0EA5C6] focus:outline-none sm:text-2xl"
                    inputMode="numeric"
                    placeholder="Enter credits"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8AA0C5] text-sm">
                    cr
                  </span>
                </div>
              </div>

              <div className="bg-[#1A2745] border border-[#26375D] rounded-xl p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <span className="text-[#8AA0C5]">Credits</span>
                  <span className="text-right text-xl font-bold text-[#35D2F1] sm:text-2xl">
                    {topUpCredits.toLocaleString()}
                  </span>
                </div>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <span className="text-[#8AA0C5]">Amount</span>
                  <span className="text-right text-xl font-bold text-white sm:text-2xl">
                    {currencySymbol}{formattedAmount}
                  </span>
                </div>
                <p className="text-xs text-[#62789E]">
                  {exchangeRate} credits = 1 {topUpCurrency}
                </p>
              </div>

              <div className="rounded-xl border border-[#26375D] bg-[#111d38] p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#35D2F1]">
                  Payment Requisites
                </p>
                <div className="mt-2 text-sm leading-6 text-[#C3D1EC]">
                  <p className="font-semibold text-white">{companyInfo.legalName}</p>
                  <p>
                    {companyInfo.registrationLabel} {companyInfo.registrationNumber}
                  </p>
                  <p>{companyDisplayAddress}</p>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={tosAccepted}
                  onChange={(e) => setTosAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded accent-[#0EA5C6] flex-shrink-0 cursor-pointer"
                />
                <span className="text-xs text-[#8AA0C5] leading-5">
                  I have read and agree to the{" "}
                  <a
                    href="/legal/terms"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#35D2F1] underline hover:text-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/legal/refund"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#35D2F1] underline hover:text-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Refund Policy
                  </a>
                  .
                </span>
              </label>

              <button
                onClick={handleTopUpProceed}
                disabled={!tosAccepted || isPaymentLoading}
                className="w-full py-3 rounded-xl bg-[#0EA5C6] hover:bg-[#0b93b1] disabled:opacity-60 disabled:cursor-not-allowed text-white text-lg font-bold transition-colors flex items-center justify-center gap-2"
              >
                {isPaymentLoading ? (
                  <>
                    <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Redirecting…
                  </>
                ) : (
                  "Proceed to Checkout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSpendModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowSpendModal(false)}
        >
          <div
            className="w-full max-w-md bg-[#0F172A] border border-[#234848] rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-serif font-bold text-white">
                Spend Credits
              </h2>
              <button
                onClick={() => setShowSpendModal(false)}
                className="text-slate-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Available balance:{" "}
              <span className="text-white font-bold">{credits} credits</span>
            </p>
            <div className="grid grid-cols-1 gap-3">
              {CREDIT_ACTIONS.map((item) => {
                const canAfford = credits >= item.cost;
                return (
                  <button
                    key={item.key}
                    disabled={!canAfford}
                    onClick={() => handleSpendAction(item.key, item.cost)}
                    className={`flex items-start gap-4 p-4 rounded-xl text-left transition-all ${
                      canAfford
                        ? "bg-[#102222] border border-[#234848] hover:border-[#0ff0f0]/50"
                        : "bg-[#0a1a1a] border border-[#1a2e2e] opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-2xl mt-0.5 flex-shrink-0"
                      style={{ color: canAfford ? "#0ff0f0" : "#4a6a6a" }}
                    >
                      {item.icon}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-white font-semibold text-sm">
                          {item.title}
                        </span>
                        <span
                          className="text-xs font-bold"
                          style={{ color: canAfford ? "#0ff0f0" : "#4a6a6a" }}
                        >
                          {item.cost} cr
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap"
        rel="stylesheet"
      />

      <style>{`
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
        }
        .cf-input:focus { border-color: #0ff0f0; box-shadow: 0 0 0 1px #0ff0f0; }
        .cf-input::placeholder { color: #4a6a6a; }
        .glass-panel {
          background: rgba(21, 42, 42, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(15, 240, 240, 0.1);
        }
      `}</style>

      <div className="relative font-['Noto_Sans',sans-serif]">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-10">
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
                Manage your profile, credits, and cooking preferences.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 border border-[#234848] hover:border-[#0ff0f0]/50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 rounded-lg text-sm font-bold transition-all bg-[#0ff0f0] text-[#0F172A]"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
              <section className="glass-panel rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6 text-[#0ff0f0]">
                  <span className="material-symbols-outlined text-xl">
                    person
                  </span>
                  <h2 className="text-lg font-bold text-white tracking-wide font-serif">
                    Profile Settings
                  </h2>
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <label
                      htmlFor="avatar-upload"
                      className="relative group cursor-pointer block"
                    >
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full p-1 border-2 border-[#0ff0f0]">
                        {avatarUrl || user?.photoURL ? (
                          <img
                            src={avatarUrl ?? user?.photoURL ?? ""}
                            alt="Profile"
                            loading="lazy"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full flex items-center justify-center text-3xl bg-gradient-to-br from-[#234848] to-[#102222]">
                            {"\u{1F468}\u200D\u{1F373}"}
                          </div>
                        )}
                      </div>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>

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
                        value={user?.email || ""}
                        disabled
                        style={{ opacity: 0.7, cursor: "not-allowed" }}
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Status
                      </span>
                      <div className="cf-input flex items-center gap-2 cursor-default">
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
                    <label className="flex flex-col gap-2 md:col-span-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        City
                      </span>
                      <input
                        className="cf-input"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </label>
                    <div className="md:col-span-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Culinary Interests
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {interests.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-[#234848] text-[#0ff0f0] border border-[#0ff0f0]/20"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeInterest(tag)}
                              className="hover:text-white ml-0.5 transition-colors"
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
                          >
                            <input
                              autoFocus
                              type="text"
                              value={newTagInput}
                              onChange={(e) => setNewTagInput(e.target.value)}
                              onBlur={commitNewTag}
                              placeholder="Add tag"
                              className="px-3 py-1 rounded-full text-sm text-[#0ff0f0] bg-[#234848] outline-none w-32 border border-[#0ff0f0]/40"
                            />
                          </form>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setAddingTag(true)}
                            className="px-3 py-1 rounded-full border border-dashed text-sm text-slate-400 hover:text-white"
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

              <section className="glass-panel rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6 text-[#0ff0f0]">
                  <span className="material-symbols-outlined text-xl">tune</span>
                  <h2 className="text-lg font-bold text-white tracking-wide font-serif">
                    Preferences
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Dark Mode</p>
                      <p className="text-slate-500 text-sm">
                        Optimized for low-light kitchen use.
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-[#234848] text-[#0ff0f0]">
                      {darkMode ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Voice Control</p>
                      <p className="text-slate-500 text-sm">
                        Hands-free controls during cooking mode.
                      </p>
                    </div>
                    <button
                      onClick={() => setVoiceControl((v) => !v)}
                      className="px-3 py-1.5 text-xs rounded border border-[#334155] text-slate-300 hover:text-white"
                    >
                      {voiceControl ? "On" : "Off"}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Weekly Digest</p>
                      <p className="text-slate-500 text-sm">
                        Recipe and learning highlights every Monday.
                      </p>
                    </div>
                    <button
                      onClick={() => setWeeklyDigest((v) => !v)}
                      className="px-3 py-1.5 text-xs rounded border border-[#334155] text-slate-300 hover:text-white"
                    >
                      {weeklyDigest ? "On" : "Off"}
                    </button>
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8">
              <div
                className="rounded-xl p-6 border"
                style={{ background: "#102222", borderColor: "#234848" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold font-serif text-[#0ff0f0]">
                    Credit Wallet
                  </h3>
                  <span className="material-symbols-outlined text-[#0ff0f0]">
                    toll
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-bold text-white mb-1">
                      {accessLoading ? "..." : credits}
                    </p>
                    <p className="text-xs text-slate-400">Available Credits</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setShowTopUpModal(true)}
                      className="px-4 py-2 rounded-lg text-sm font-bold text-black bg-[#0ff0f0]"
                    >
                      Add Credits
                    </button>
                    <button
                      onClick={() => setShowSpendModal(true)}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-[#0ff0f0] border border-[#0ff0f0]/30 hover:bg-[#0ff0f0]/10"
                    >
                      Spend Credits
                    </button>
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <h3 className="text-base font-bold text-white mb-4 font-serif">
                  Entitlement Status
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Unlocked Recipes</span>
                    <span className="text-white font-semibold">
                      {unlockedRecipes.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Unlocked Chefs</span>
                    <span className="text-white font-semibold">
                      {unlockedChefs.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Planner Access Until</span>
                    <span className="text-white font-semibold">
                      {plannerStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <h3 className="text-base font-bold text-white mb-4 font-serif">
                  Need Help?
                </h3>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li>
                    <button
                      onClick={() => navigate("/legal/about")}
                      className="hover:text-[#0ff0f0] transition-colors"
                    >
                      About & Billing Details
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/legal/privacy")}
                      className="hover:text-[#0ff0f0] transition-colors"
                    >
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/legal/terms")}
                      className="hover:text-[#0ff0f0] transition-colors"
                    >
                      Terms of Service
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/legal/vat")}
                      className="hover:text-[#0ff0f0] transition-colors"
                    >
                      VAT & Tax Info
                    </button>
                  </li>
                </ul>
              </div>

              <div
                className="pt-4 border-t mt-auto"
                style={{ borderColor: "#234848" }}
              >
                <button
                  onClick={handleSignOut}
                  disabled={isSigningOut || !user}
                  className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-lg">
                    logout
                  </span>
                  {isSigningOut ? "Signing out..." : "Sign Out"}
                </button>

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
                        This cannot be undone. Your profile and access data will
                        be removed.
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowDeleteConfirm(false)}
                          className="px-3 py-1.5 rounded text-xs text-slate-400 border border-[#234848]"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            setShowDeleteConfirm(false);
                            showToast(
                              "Account deletion request submitted. Processing within 48 hours.",
                            );
                          }}
                          className="px-3 py-1.5 rounded text-xs font-bold text-white bg-red-600 hover:bg-red-700"
                        >
                          Confirm Delete
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
