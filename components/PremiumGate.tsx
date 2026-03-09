import React, { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAccess } from "../contexts/AccessContext";

type GateSection = "recipes" | "recipe" | "chefs" | "chef" | "planner";

interface PremiumGateProps {
  allowed: boolean;
  section: GateSection;
  itemId?: number;
  children: ReactNode;
}

type UnlockOption = {
  label: string;
  description: string;
  cost: number;
  action: "unlockRecipe" | "unlockChef" | "unlockPlannerMonth";
};

const SECTION_META: Record<
  GateSection,
  {
    icon: string;
    headline: string;
    sub: string;
    accent: string;
    features: string[];
  }
> = {
  recipes: {
    icon: "menu_book",
    headline: "Recipe Library",
    sub: "Browse the recipe catalog and unlock any recipe using credits.",
    accent: "#14b8a6",
    features: [
      "Browse recipe categories",
      "Preview recipe metadata",
      "Unlock individual recipes with credits",
    ],
  },
  recipe: {
    icon: "menu_book",
    headline: "Recipe Locked",
    sub: "Unlock this recipe to access ingredients, steps, and cooking mode.",
    accent: "#14b8a6",
    features: [
      "Detailed ingredients and prep",
      "Step-by-step instructions",
      "Instant access after unlock",
    ],
  },
  chefs: {
    icon: "person_book",
    headline: "Chef Directory",
    sub: "Browse chefs and unlock any profile with credits.",
    accent: "#f97316",
    features: [
      "Browse chef cards",
      "Unlock specific chef profiles",
      "View creations and stats after unlock",
    ],
  },
  chef: {
    icon: "person_book",
    headline: "Chef Profile Locked",
    sub: "Unlock this chef profile to view their full portfolio and insights.",
    accent: "#f97316",
    features: [
      "Biography and specialties",
      "Chef creations and linked recipes",
      "Progress and community highlights",
    ],
  },
  planner: {
    icon: "calendar_month",
    headline: "Meal Planner Locked",
    sub: "Unlock planner access for 30 days using credits.",
    accent: "#4ade80",
    features: [
      "7-day planning board",
      "Meal-slot recipe planning",
      "Shopping list generation",
    ],
  },
};

function getUnlockOptions(section: GateSection, itemId?: number): UnlockOption[] {
  if (section === "recipe" && itemId !== undefined) {
    return [
      {
        label: "Unlock this recipe",
        description: "Permanent access for this recipe",
        cost: 15,
        action: "unlockRecipe",
      },
    ];
  }
  if (section === "chef" && itemId !== undefined) {
    return [
      {
        label: "Unlock this chef",
        description: "Permanent access for this chef profile",
        cost: 25,
        action: "unlockChef",
      },
    ];
  }
  if (section === "planner") {
    return [
      {
        label: "Unlock planner",
        description: "30 days of planner access",
        cost: 100,
        action: "unlockPlannerMonth",
      },
    ];
  }
  return [];
}

const PremiumGate: React.FC<PremiumGateProps> = ({
  allowed,
  section,
  itemId,
  children,
}) => {
  const navigate = useNavigate();
  const { credits, unlockRecipe, unlockChef, unlockPlannerMonth } = useAccess();
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  if (allowed) return <>{children}</>;

  const meta = SECTION_META[section];
  const options = getUnlockOptions(section, itemId);

  const fireToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleUnlock = (opt: UnlockOption) => {
    let success = false;
    if (opt.action === "unlockRecipe" && itemId !== undefined) {
      success = unlockRecipe(itemId);
    } else if (opt.action === "unlockChef" && itemId !== undefined) {
      success = unlockChef(itemId);
    } else if (opt.action === "unlockPlannerMonth") {
      success = unlockPlannerMonth();
    }
    if (!success) {
      fireToast("Not enough credits. Add more credits in Settings.");
      return;
    }
    setShowUnlockModal(false);
    fireToast("Unlocked successfully.");
  };

  return (
    <>
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-[300] px-5 py-3 rounded-xl text-sm font-semibold text-white shadow-2xl"
          style={{
            background: "#1E293B",
            border: `1px solid ${meta.accent}`,
          }}
        >
          {toast}
        </div>
      )}

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
            <button
              onClick={() => {
                setShowUnlockModal(false);
                navigate("/app/settings");
              }}
              className="w-full mt-4 py-2.5 rounded-lg text-sm font-semibold border border-[#334155] text-slate-300 hover:text-white hover:border-[#0ff0f0]/50 transition-colors"
            >
              Manage Credits in Settings
            </button>
          </div>
        </div>
      )}

      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-[#0d1d1d] to-[#061212] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${meta.accent}33 1px, transparent 1px), linear-gradient(90deg, ${meta.accent}33 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{
            background: `${meta.accent}14`,
            border: `1.5px solid ${meta.accent}40`,
          }}
        >
          <span
            className="material-symbols-outlined text-4xl"
            style={{ color: meta.accent }}
          >
            lock
          </span>
        </div>
        <div className="relative z-10 text-center max-w-md mb-8">
          <p
            className="text-xs font-bold uppercase tracking-[0.3em] mb-3"
            style={{ color: meta.accent }}
          >
            Credit Unlock
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">
            {meta.headline}
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">{meta.sub}</p>
        </div>
        <ul className="relative z-10 flex flex-col gap-2 mb-10 w-full max-w-xs">
          {meta.features.map((f) => (
            <li key={f} className="flex items-center gap-3 text-slate-300 text-sm">
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
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-none justify-center">
          {options.length > 0 && (
            <button
              onClick={() => setShowUnlockModal(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold text-black transition-all hover:opacity-90"
              style={{ background: meta.accent }}
            >
              Unlock with Credits
            </button>
          )}
          <button
            onClick={() => navigate("/app/settings")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm text-slate-300 border border-[#334155] hover:border-[#14b8a6]/60 hover:text-white transition-colors"
          >
            Add Credits
          </button>
          <button
            onClick={() => navigate("/app/courses")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap"
        rel="stylesheet"
      />
    </>
  );
};

export default PremiumGate;
