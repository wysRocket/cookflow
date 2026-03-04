import React, { useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAccess } from "../contexts/AccessContext";

// ── Types ─────────────────────────────────────────────────────────────────────

type GateSection = "recipes" | "recipe" | "chefs" | "chef" | "planner";

interface PremiumGateProps {
  /** Whether the current user is allowed through */
  allowed: boolean;
  /** Which section is being gated — controls copy and unlock options */
  section: GateSection;
  /** For recipe/chef detail pages: the numeric ID so we can offer per-item unlock */
  itemId?: number;
  children: ReactNode;
}

// ── Section metadata ──────────────────────────────────────────────────────────

const SECTION_META: Record<
  GateSection,
  {
    icon: string;
    headline: string;
    sub: string;
    features: string[];
    bg: string;
    accent: string;
  }
> = {
  recipes: {
    icon: "menu_book",
    headline: "30 Curated Chef Recipes",
    sub: "Step-by-step guides from Paris to Tokyo, with techniques used in Michelin-starred kitchens.",
    features: [
      "Detailed step-by-step cooking mode",
      "Ingredient lists & servings scaler",
      "Add any recipe to your Meal Planner",
      "Filter by cuisine, difficulty & time",
    ],
    bg: "from-[#0c1f1f] to-[#061212]",
    accent: "#14b8a6",
  },
  recipe: {
    icon: "menu_book",
    headline: "Premium Recipe",
    sub: "This recipe is part of the CookFlow premium library — detailed techniques, exact timings, and chef-level precision.",
    features: [
      "Full step-by-step cooking mode",
      "Exact timings & temperatures",
      "Professional chef techniques",
    ],
    bg: "from-[#0c1f1f] to-[#061212]",
    accent: "#14b8a6",
  },
  chefs: {
    icon: "person_book",
    headline: "Meet 6 World-Class Chefs",
    sub: "Explore the profiles, recipes, and philosophies of CookFlow's resident chefs from Rome to Osaka.",
    features: [
      "Full chef biographies & backgrounds",
      "Browse every chef's recipe portfolio",
      "Chef-specific techniques & insights",
      "Filter by cuisine and specialty",
    ],
    bg: "from-[#1a0f0a] to-[#0d0604]",
    accent: "#f97316",
  },
  chef: {
    icon: "person_book",
    headline: "Chef Profile",
    sub: "Complete biography, culinary philosophy, and the full recipe portfolio of this master chef.",
    features: [
      "Full biography & training history",
      "All chef recipes in one place",
      "Signature techniques explained",
    ],
    bg: "from-[#1a0f0a] to-[#0d0604]",
    accent: "#f97316",
  },
  planner: {
    icon: "calendar_month",
    headline: "Weekly Meal Planner",
    sub: "Plan your entire week, drag recipes into any slot, and generate a shopping list in one tap.",
    features: [
      "7-day drag-and-drop meal grid",
      "Auto-generated shopping lists",
      "Nutritional overview per day",
      "Save & reuse favourite week plans",
    ],
    bg: "from-[#0f1a0f] to-[#060d06]",
    accent: "#4ade80",
  },
};

// ── Unlock options per section ────────────────────────────────────────────────

interface UnlockOption {
  label: string;
  description: string;
  cost: number;
  action: "unlockRecipe" | "unlockChef" | "unlockPlannerMonth";
}

function getUnlockOptions(
  section: GateSection,
  itemId?: number,
): UnlockOption[] {
  if (section === "recipe" && itemId !== undefined) {
    return [
      {
        label: "Unlock this recipe",
        description: "Permanent, no expiry",
        cost: 15,
        action: "unlockRecipe",
      },
    ];
  }
  if (section === "chef" && itemId !== undefined) {
    return [
      {
        label: "Unlock this chef profile",
        description: "Permanent, no expiry",
        cost: 25,
        action: "unlockChef",
      },
    ];
  }
  if (section === "planner") {
    return [
      {
        label: "Unlock Meal Planner",
        description: "Full access for 30 days",
        cost: 100,
        action: "unlockPlannerMonth",
      },
    ];
  }
  return [];
}

// ── Plan tiers shown in the upgrade CTA ──────────────────────────────────────

const PLANS = [
  {
    key: "patissier" as const,
    name: "Patissier",
    price: "€79",
    color: "#38bdf8",
    perks: ["Recipes library", "Chef profiles", "Academy courses"],
  },
  {
    key: "chef_de_partie" as const,
    name: "Chef de Partie",
    price: "€199",
    color: "#d4af37",
    popular: true,
    perks: ["Everything in Patissier", "Meal Planner", "AI Recipe generation"],
  },
  {
    key: "executive_chef" as const,
    name: "Executive Chef",
    price: "€299",
    color: "#0ff0f0",
    perks: ["Everything included", "1-on-1 chef sessions", "Priority support"],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

const PremiumGate: React.FC<PremiumGateProps> = ({
  allowed,
  section,
  itemId,
  children,
}) => {
  const navigate = useNavigate();
  const {
    credits,
    unlockRecipe,
    unlockChef,
    unlockPlannerMonth,
    activatePlan,
  } = useAccess();

  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  if (allowed) return <>{children}</>;

  const meta = SECTION_META[section];
  const options = getUnlockOptions(section, itemId);
  const hasUnlockOption = options.length > 0;

  const fireToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleUnlock = (opt: UnlockOption) => {
    if (credits < opt.cost) {
      fireToast("Not enough credits — buy more in Settings.");
      return;
    }
    if (opt.action === "unlockRecipe" && itemId !== undefined) {
      unlockRecipe(itemId);
      fireToast("Recipe unlocked! Enjoy.");
    } else if (opt.action === "unlockChef" && itemId !== undefined) {
      unlockChef(itemId);
      fireToast("Chef profile unlocked!");
    } else if (opt.action === "unlockPlannerMonth") {
      unlockPlannerMonth();
      fireToast("Meal Planner unlocked for 30 days!");
    }
    setShowUnlockModal(false);
    // Access state updates are enough to re-render gate checks.
  };

  return (
    <>
      {/* Toast ──────────────────────────────────────────────────────────── */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-[300] px-5 py-3 rounded-xl text-sm font-semibold text-white shadow-2xl"
          style={{
            background: "#1E293B",
            border: `1px solid ${meta.accent}`,
            boxShadow: `0 0 20px ${meta.accent}40`,
          }}
        >
          ✓ {toast}
        </div>
      )}

      {/* Plans Modal ────────────────────────────────────────────────────── */}
      {showPlansModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowPlansModal(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#0F172A] border border-[#234848] rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif font-bold text-white">
                Choose a Plan
              </h2>
              <button
                onClick={() => setShowPlansModal(false)}
                className="text-slate-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PLANS.map((plan) => (
                <div
                  key={plan.key}
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
                    {plan.perks.map((f) => (
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
                      activatePlan(plan.key);
                      setShowPlansModal(false);
                      fireToast(`${plan.name} plan activated!`);
                    }}
                    className="mt-2 w-full py-2 rounded-lg text-sm font-bold text-black transition-all"
                    style={{ background: plan.color }}
                  >
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-500 mt-4">
              Demo mode — no payment required. Plans activate instantly.
            </p>
          </div>
        </div>
      )}

      {/* Unlock with Credits Modal ──────────────────────────────────────── */}
      {showUnlockModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowUnlockModal(false)}
        >
          <div
            className="w-full max-w-sm bg-[#0F172A] border border-[#234848] rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                <span
                  className="material-symbols-outlined"
                  style={{ color: meta.accent }}
                >
                  toll
                </span>
                Unlock with Credits
              </h2>
              <button
                onClick={() => setShowUnlockModal(false)}
                className="text-slate-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Balance:{" "}
              <span className="font-bold text-white">{credits} credits</span>
            </p>
            <div className="flex flex-col gap-3">
              {options.map((opt) => {
                const canAfford = credits >= opt.cost;
                return (
                  <button
                    key={opt.action}
                    disabled={!canAfford}
                    onClick={() => handleUnlock(opt)}
                    className={`flex items-center justify-between gap-4 p-4 rounded-xl text-left transition-all ${
                      canAfford
                        ? "bg-[#102222] border border-[#234848] hover:border-[#0ff0f0]/50"
                        : "bg-[#0a1a1a] border border-[#1a2e2e] opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {opt.label}
                      </p>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {opt.description}
                      </p>
                    </div>
                    <span
                      className="text-sm font-bold flex-shrink-0"
                      style={{ color: canAfford ? meta.accent : "#4a6a6a" }}
                    >
                      {opt.cost} cr
                    </span>
                  </button>
                );
              })}
            </div>
            {credits < (options[0]?.cost ?? 0) && (
              <p className="text-xs text-amber-500/80 mt-4 text-center">
                Not enough credits.{" "}
                <button
                  onClick={() => {
                    setShowUnlockModal(false);
                    navigate("/app/settings");
                  }}
                  className="underline hover:text-amber-400"
                >
                  Buy more in Settings
                </button>
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Paywall Screen ────────────────────────────────────────────── */}
      <div
        className={`min-h-[80vh] flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b ${meta.bg} relative overflow-hidden`}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${meta.accent}33 1px, transparent 1px), linear-gradient(90deg, ${meta.accent}33 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow orb */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 pointer-events-none blur-3xl"
          style={{ background: meta.accent }}
        />

        {/* Lock badge */}
        <div
          className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{
            background: `${meta.accent}14`,
            border: `1.5px solid ${meta.accent}40`,
            boxShadow: `0 0 40px ${meta.accent}25`,
          }}
        >
          <span
            className="material-symbols-outlined text-4xl"
            style={{ color: meta.accent }}
          >
            lock
          </span>
        </div>

        {/* Copy */}
        <div className="relative z-10 text-center max-w-md mb-8">
          <p
            className="text-xs font-bold uppercase tracking-[0.3em] mb-3"
            style={{ color: meta.accent }}
          >
            Premium Content
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">
            {meta.headline}
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">{meta.sub}</p>
        </div>

        {/* Feature pills */}
        <ul className="relative z-10 flex flex-col gap-2 mb-10 w-full max-w-xs">
          {meta.features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-3 text-slate-300 text-sm"
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                style={{ background: `${meta.accent}20`, color: meta.accent }}
              >
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-none justify-center">
          <button
            onClick={() => setShowPlansModal(true)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold text-black transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{
              background: meta.accent,
              boxShadow: `0 0 24px ${meta.accent}50`,
            }}
          >
            Upgrade Plan
          </button>

          {hasUnlockOption && (
            <button
              onClick={() => setShowUnlockModal(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-medium border transition-all hover:bg-white/5"
              style={{ borderColor: `${meta.accent}50`, color: meta.accent }}
            >
              Unlock with Credits
            </button>
          )}

          <button
            onClick={() => navigate("/app/courses")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            Back to Courses
          </button>
        </div>

        {/* Sub-copy */}
        <p className="relative z-10 text-slate-600 text-xs mt-8 text-center">
          Demo mode · Plans activate instantly · No real payment required
        </p>
      </div>
      {/* Material Icons font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap"
        rel="stylesheet"
      />
    </>
  );
};

export default PremiumGate;
