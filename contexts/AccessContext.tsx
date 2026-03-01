import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export type Plan = "patissier" | "chef_de_partie" | "executive_chef" | null;

export const PLAN_LABELS: Record<NonNullable<Plan>, string> = {
  patissier: "Patissier",
  chef_de_partie: "Chef de Partie",
  executive_chef: "Executive Chef",
};

export const PLAN_COLORS: Record<NonNullable<Plan>, string> = {
  patissier: "#38bdf8",
  chef_de_partie: "#d4af37",
  executive_chef: "#0ff0f0",
};

// Which features each plan unlocks
const PLAN_FEATURES: Record<
  NonNullable<Plan>,
  {
    recipes: boolean;
    chefs: boolean;
    planner: boolean;
    aiRecipe: boolean;
    bookChef: boolean;
  }
> = {
  patissier: {
    recipes: true,
    chefs: true,
    planner: false,
    aiRecipe: false,
    bookChef: false,
  },
  chef_de_partie: {
    recipes: true,
    chefs: true,
    planner: true,
    aiRecipe: true,
    bookChef: false,
  },
  executive_chef: {
    recipes: true,
    chefs: true,
    planner: true,
    aiRecipe: true,
    bookChef: true,
  },
};

// ── localStorage keys ────────────────────────────────────────────────────────

const LS_PLAN = "cookflow_plan";
const LS_CREDITS = "cookflow_credits";
const LS_UNLOCKED_RECIPES = "cookflow_unlocked_recipes";
const LS_UNLOCKED_CHEFS = "cookflow_unlocked_chefs";
const LS_PLANNER_UNTIL = "cookflow_planner_until";

// ── Helpers ───────────────────────────────────────────────────────────────────

function readPlan(): Plan {
  try {
    return (localStorage.getItem(LS_PLAN) as Plan) ?? null;
  } catch {
    return null;
  }
}
function readCredits(): number {
  try {
    const v = localStorage.getItem(LS_CREDITS);
    return v ? parseInt(v, 10) : 250;
  } catch {
    return 250;
  }
}
function readList(key: string): number[] {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]");
  } catch {
    return [];
  }
}
function readPlannerUntil(): number | null {
  try {
    const v = localStorage.getItem(LS_PLANNER_UNTIL);
    return v ? parseInt(v, 10) : null;
  } catch {
    return null;
  }
}

function saveStr(key: string, val: string) {
  try {
    localStorage.setItem(key, val);
  } catch {
    /* quota */
  }
}
function saveList(key: string, val: number[]) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    /* quota */
  }
}

// ── Context interface ─────────────────────────────────────────────────────────

interface AccessContextValue {
  // State
  plan: Plan;
  credits: number;
  unlockedRecipes: number[];
  unlockedChefs: number[];
  plannerUntil: number | null;

  // Derived access checks
  canAccessRecipes: boolean;
  canAccessChefs: boolean;
  canAccessPlanner: boolean;
  canUseAiRecipe: boolean;
  canBookChef: boolean;
  canAccessRecipe: (id: number) => boolean;
  canAccessChef: (id: number) => boolean;

  // Actions
  activatePlan: (p: Plan) => void;
  addCredits: (amount: number) => void;
  unlockRecipe: (id: number) => boolean;
  unlockChef: (id: number) => boolean;
  unlockPlannerMonth: () => boolean;
}

// ── Context ───────────────────────────────────────────────────────────────────

const AccessContext = createContext<AccessContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export const AccessProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [plan, setPlan] = useState<Plan>(readPlan);
  const [credits, setCredits] = useState<number>(readCredits);
  const [unlockedRecipes, setUnlockedRecipes] = useState<number[]>(() =>
    readList(LS_UNLOCKED_RECIPES),
  );
  const [unlockedChefs, setUnlockedChefs] = useState<number[]>(() =>
    readList(LS_UNLOCKED_CHEFS),
  );
  const [plannerUntil, setPlannerUntil] = useState<number | null>(
    readPlannerUntil,
  );

  // ── Derived ----------------------------------------------------------------

  const features = plan ? PLAN_FEATURES[plan] : null;
  const plannerActive = plannerUntil !== null && plannerUntil > Date.now();

  const canAccessRecipes = !!features?.recipes || unlockedRecipes.length > 0;
  const canAccessChefs = !!features?.chefs || unlockedChefs.length > 0;
  const canAccessPlanner = !!features?.planner || plannerActive;
  const canUseAiRecipe = !!features?.aiRecipe;
  const canBookChef = !!features?.bookChef;

  const canAccessRecipe = useCallback(
    (id: number) => !!features?.recipes || unlockedRecipes.includes(id),
    [features, unlockedRecipes],
  );
  const canAccessChef = useCallback(
    (id: number) => !!features?.chefs || unlockedChefs.includes(id),
    [features, unlockedChefs],
  );

  // ── Actions ----------------------------------------------------------------

  const activatePlan = useCallback((p: Plan) => {
    if (p === null) {
      try {
        localStorage.removeItem(LS_PLAN);
      } catch {
        /* ignore */
      }
    } else {
      saveStr(LS_PLAN, p);
    }
    setPlan(p);
  }, []);

  const addCredits = useCallback((amount: number) => {
    setCredits((c) => {
      const next = c + amount;
      saveStr(LS_CREDITS, String(next));
      return next;
    });
  }, []);

  const unlockRecipe = useCallback((id: number): boolean => {
    setCredits((c) => {
      const n = c - 15;
      saveStr(LS_CREDITS, String(n));
      return n;
    });
    setUnlockedRecipes((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      saveList(LS_UNLOCKED_RECIPES, next);
      return next;
    });
    return true;
  }, []);

  const unlockChef = useCallback((id: number): boolean => {
    setCredits((c) => {
      const next = c - 25;
      saveStr(LS_CREDITS, String(next));
      return next;
    });
    setUnlockedChefs((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      saveList(LS_UNLOCKED_CHEFS, next);
      return next;
    });
    return true;
  }, []);

  const unlockPlannerMonth = useCallback((): boolean => {
    setCredits((c) => {
      const next = c - 100;
      saveStr(LS_CREDITS, String(next));
      return next;
    });
    const until = Date.now() + 30 * 24 * 60 * 60 * 1000;
    saveStr(LS_PLANNER_UNTIL, String(until));
    setPlannerUntil(until);
    return true;
  }, []);

  return (
    <AccessContext.Provider
      value={{
        plan,
        credits,
        unlockedRecipes,
        unlockedChefs,
        plannerUntil,
        canAccessRecipes,
        canAccessChefs,
        canAccessPlanner,
        canUseAiRecipe,
        canBookChef,
        canAccessRecipe,
        canAccessChef,
        activatePlan,
        addCredits,
        unlockRecipe,
        unlockChef,
        unlockPlannerMonth,
      }}
    >
      {children}
    </AccessContext.Provider>
  );
};

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAccess(): AccessContextValue {
  const ctx = useContext(AccessContext);
  if (!ctx) throw new Error("useAccess must be used within AccessProvider");
  return ctx;
}
