import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "./AuthContext";

const LS_ACCESS_V2 = "cookflow_access_v2";
const LS_CREDITS = "cookflow_credits";
const LS_UNLOCKED_RECIPES = "cookflow_unlocked_recipes";
const LS_UNLOCKED_CHEFS = "cookflow_unlocked_chefs";
const LS_PLANNER_UNTIL = "cookflow_planner_until";
const LS_PLAN = "cookflow_plan";

const RECIPE_UNLOCK_COST = 15;
const CHEF_UNLOCK_COST = 25;
const PLANNER_MONTH_COST = 100;

type AccessState = {
  credits: number;
  unlockedRecipes: number[];
  unlockedChefs: number[];
  plannerUntil: number | null;
};

const DEFAULT_STATE: AccessState = {
  credits: 250,
  unlockedRecipes: [],
  unlockedChefs: [],
  plannerUntil: null,
};

function uniqueNumericList(value: unknown): number[] {
  if (!Array.isArray(value)) return [];
  const cleaned = value
    .map((item) => Number(item))
    .filter((item) => Number.isFinite(item) && item > 0);
  return Array.from(new Set(cleaned));
}

function normalizeAccessState(value: unknown): AccessState {
  if (!value || typeof value !== "object") return DEFAULT_STATE;
  const raw = value as Partial<AccessState>;
  const creditsNum = Number(raw.credits);
  const plannerUntilNum =
    raw.plannerUntil == null ? null : Number(raw.plannerUntil);
  return {
    credits:
      Number.isFinite(creditsNum) && creditsNum >= 0
        ? Math.floor(creditsNum)
        : DEFAULT_STATE.credits,
    unlockedRecipes: uniqueNumericList(raw.unlockedRecipes),
    unlockedChefs: uniqueNumericList(raw.unlockedChefs),
    plannerUntil:
      plannerUntilNum !== null &&
      Number.isFinite(plannerUntilNum) &&
      plannerUntilNum > 0
        ? Math.floor(plannerUntilNum)
        : null,
  };
}

function readV2LocalState(): AccessState {
  try {
    const raw = localStorage.getItem(LS_ACCESS_V2);
    return raw ? normalizeAccessState(JSON.parse(raw)) : DEFAULT_STATE;
  } catch {
    return DEFAULT_STATE;
  }
}

function readLegacyLocalState(): AccessState | null {
  try {
    const hasAnyLegacyKey =
      localStorage.getItem(LS_CREDITS) !== null ||
      localStorage.getItem(LS_UNLOCKED_RECIPES) !== null ||
      localStorage.getItem(LS_UNLOCKED_CHEFS) !== null ||
      localStorage.getItem(LS_PLANNER_UNTIL) !== null ||
      localStorage.getItem(LS_PLAN) !== null;
    if (!hasAnyLegacyKey) return null;
    return normalizeAccessState({
      credits: localStorage.getItem(LS_CREDITS),
      unlockedRecipes: JSON.parse(localStorage.getItem(LS_UNLOCKED_RECIPES) ?? "[]"),
      unlockedChefs: JSON.parse(localStorage.getItem(LS_UNLOCKED_CHEFS) ?? "[]"),
      plannerUntil: localStorage.getItem(LS_PLANNER_UNTIL),
    });
  } catch {
    return null;
  }
}

function clearLegacyLocalState() {
  try {
    localStorage.removeItem(LS_PLAN);
    localStorage.removeItem(LS_CREDITS);
    localStorage.removeItem(LS_UNLOCKED_RECIPES);
    localStorage.removeItem(LS_UNLOCKED_CHEFS);
    localStorage.removeItem(LS_PLANNER_UNTIL);
  } catch {
    // ignore
  }
}

function saveV2LocalState(state: AccessState) {
  try {
    localStorage.setItem(LS_ACCESS_V2, JSON.stringify(state));
  } catch {
    // ignore quota errors
  }
}

interface AccessContextValue {
  loading: boolean;
  credits: number;
  unlockedRecipes: number[];
  unlockedChefs: number[];
  plannerUntil: number | null;
  canAccessRecipes: boolean;
  canAccessChefs: boolean;
  canAccessPlanner: boolean;
  canUseAiRecipe: boolean;
  canBookChef: boolean;
  canAccessRecipe: (id: number) => boolean;
  canAccessChef: (id: number) => boolean;
  addCredits: (amount: number) => boolean;
  spendCredits: (amount: number) => boolean;
  unlockRecipe: (id: number) => boolean;
  unlockChef: (id: number) => boolean;
  unlockPlannerMonth: () => boolean;
}

const AccessContext = createContext<AccessContextValue | null>(null);

export const AccessProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [state, setState] = useState<AccessState>(DEFAULT_STATE);
  const [loading, setLoading] = useState(true);
  const hydratedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      setLoading(true);
      hydratedRef.current = false;

      const localGuestState = readV2LocalState();
      const localLegacy = readLegacyLocalState();

      if (!user) {
        if (!cancelled) {
          setState(localLegacy ?? localGuestState);
          hydratedRef.current = true;
          setLoading(false);
        }
        return;
      }

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        const remote = normalizeAccessState(snap.data()?.access);

        const merged = localLegacy
          ? normalizeAccessState({
              credits: Math.max(remote.credits, localLegacy.credits),
              unlockedRecipes: [...remote.unlockedRecipes, ...localLegacy.unlockedRecipes],
              unlockedChefs: [...remote.unlockedChefs, ...localLegacy.unlockedChefs],
              plannerUntil:
                Math.max(remote.plannerUntil ?? 0, localLegacy.plannerUntil ?? 0) ||
                null,
            })
          : remote;

        if (!cancelled) {
          setState(merged);
          hydratedRef.current = true;
          setLoading(false);
        }

        await setDoc(ref, { access: merged }, { merge: true });
        clearLegacyLocalState();
      } catch (error) {
        console.error("Failed to load access state, falling back to local", error);
        if (!cancelled) {
          setState(localLegacy ?? localGuestState);
          hydratedRef.current = true;
          setLoading(false);
        }
      }
    };

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    if (!hydratedRef.current) return;
    if (!user) {
      saveV2LocalState(state);
      return;
    }
    const ref = doc(db, "users", user.uid);
    void setDoc(ref, { access: state }, { merge: true }).catch((error) => {
      console.error("Failed to persist access state", error);
    });
  }, [state, user]);

  const applySpend = useCallback((amount: number): boolean => {
    if (!Number.isFinite(amount) || amount <= 0) return false;
    let success = false;
    setState((prev) => {
      if (prev.credits < amount) return prev;
      success = true;
      return { ...prev, credits: prev.credits - amount };
    });
    return success;
  }, []);

  const addCredits = useCallback((amount: number): boolean => {
    if (!Number.isFinite(amount) || amount === 0) return false;
    if (amount < 0) return applySpend(Math.abs(amount));
    setState((prev) => ({ ...prev, credits: prev.credits + Math.floor(amount) }));
    return true;
  }, [applySpend]);

  const spendCredits = useCallback(
    (amount: number): boolean => applySpend(amount),
    [applySpend],
  );

  const unlockRecipe = useCallback(
    (id: number): boolean => {
      if (!Number.isFinite(id) || id <= 0) return false;
      let unlocked = false;
      setState((prev) => {
        if (prev.unlockedRecipes.includes(id)) return prev;
        if (prev.credits < RECIPE_UNLOCK_COST) return prev;
        unlocked = true;
        return {
          ...prev,
          credits: prev.credits - RECIPE_UNLOCK_COST,
          unlockedRecipes: [...prev.unlockedRecipes, id],
        };
      });
      return unlocked;
    },
    [],
  );

  const unlockChef = useCallback(
    (id: number): boolean => {
      if (!Number.isFinite(id) || id <= 0) return false;
      let unlocked = false;
      setState((prev) => {
        if (prev.unlockedChefs.includes(id)) return prev;
        if (prev.credits < CHEF_UNLOCK_COST) return prev;
        unlocked = true;
        return {
          ...prev,
          credits: prev.credits - CHEF_UNLOCK_COST,
          unlockedChefs: [...prev.unlockedChefs, id],
        };
      });
      return unlocked;
    },
    [],
  );

  const unlockPlannerMonth = useCallback((): boolean => {
    let unlocked = false;
    setState((prev) => {
      if (prev.credits < PLANNER_MONTH_COST) return prev;
      const currentPlannerUntil = prev.plannerUntil ?? Date.now();
      const base = Math.max(currentPlannerUntil, Date.now());
      unlocked = true;
      return {
        ...prev,
        credits: prev.credits - PLANNER_MONTH_COST,
        plannerUntil: base + 30 * 24 * 60 * 60 * 1000,
      };
    });
    return unlocked;
  }, []);

  const plannerActive = state.plannerUntil !== null && state.plannerUntil > Date.now();

  const value = useMemo<AccessContextValue>(
    () => ({
      loading,
      credits: state.credits,
      unlockedRecipes: state.unlockedRecipes,
      unlockedChefs: state.unlockedChefs,
      plannerUntil: state.plannerUntil,
      canAccessRecipes: true,
      canAccessChefs: true,
      canAccessPlanner: plannerActive,
      canUseAiRecipe: state.credits > 0,
      canBookChef: state.credits >= 150,
      canAccessRecipe: (id: number) => state.unlockedRecipes.includes(id),
      canAccessChef: (id: number) => state.unlockedChefs.includes(id),
      addCredits,
      spendCredits,
      unlockRecipe,
      unlockChef,
      unlockPlannerMonth,
    }),
    [
      addCredits,
      loading,
      plannerActive,
      spendCredits,
      state.credits,
      state.plannerUntil,
      state.unlockedChefs,
      state.unlockedRecipes,
      unlockChef,
      unlockPlannerMonth,
      unlockRecipe,
    ],
  );

  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>;
};

export function useAccess(): AccessContextValue {
  const ctx = useContext(AccessContext);
  if (!ctx) throw new Error("useAccess must be used within AccessProvider");
  return ctx;
}
