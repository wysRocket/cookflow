import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import { AccessProvider, useAccess } from "./contexts/AccessContext";
import PremiumGate from "./components/PremiumGate";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const DashboardLayout = lazy(() => import("./pages/DashboardLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CookingMode = lazy(() => import("./pages/CookingMode"));
const ChefProfile = lazy(() => import("./pages/ChefProfile"));
const ChefList = lazy(() => import("./pages/ChefList"));
const Community = lazy(() => import("./pages/Community"));
const RecipeList = lazy(() => import("./pages/RecipeList"));
const RecipeDetail = lazy(() => import("./pages/RecipeDetail"));
const MealPlanner = lazy(() => import("./pages/MealPlanner"));
const ShoppingList = lazy(() => import("./pages/ShoppingList"));
const Settings = lazy(() => import("./pages/Settings"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const PublicOnlyRoute = lazy(() => import("./components/PublicOnlyRoute"));

const NotFoundPage: React.FC = () => (
  <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] px-6 flex flex-col items-center justify-center gap-4 text-center">
    <p className="text-xs tracking-[0.2em] uppercase text-[#64748B]">404</p>
    <h1 className="text-3xl font-serif">Page not found</h1>
    <p className="text-sm text-[#94A3B8] max-w-md">
      This route does not exist. Use one of the primary entry points below.
    </p>
    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
      <Link
        to="/"
        className="px-4 py-2 rounded-lg border border-[#334155] hover:border-[#14b8a6] transition-colors"
      >
        Home
      </Link>
      <Link
        to="/app/courses"
        className="px-4 py-2 rounded-lg bg-[#14b8a6] text-[#0F172A] font-semibold hover:bg-[#2dd4bf] transition-colors"
      >
        App
      </Link>
    </div>
  </div>
);

// ── Gated route wrappers ──────────────────────────────────────────────────────

const RecipeListGated: React.FC = () => {
  const { canAccessRecipes } = useAccess();
  return (
    <PremiumGate allowed={canAccessRecipes} section="recipes">
      <RecipeList />
    </PremiumGate>
  );
};

const RecipeDetailGated: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { canAccessRecipe } = useAccess();
  const numId = Number(id);
  return (
    <PremiumGate allowed={canAccessRecipe(numId)} section="recipe" itemId={numId}>
      <RecipeDetail />
    </PremiumGate>
  );
};

const ChefListGated: React.FC = () => {
  const { canAccessChefs } = useAccess();
  return (
    <PremiumGate allowed={canAccessChefs} section="chefs">
      <ChefList />
    </PremiumGate>
  );
};

const ChefProfileGated: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { canAccessChef } = useAccess();
  const numId = Number(id);
  return (
    <PremiumGate allowed={canAccessChef(numId)} section="chef" itemId={numId}>
      <ChefProfile />
    </PremiumGate>
  );
};

const MealPlannerGated: React.FC = () => {
  const { canAccessPlanner } = useAccess();
  return (
    <PremiumGate allowed={canAccessPlanner} section="planner">
      <MealPlanner />
    </PremiumGate>
  );
};

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <AccessProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense
          fallback={
            <div className="min-h-screen bg-obsidian text-[#F1F5F9] flex items-center justify-center">
              <p className="text-sm tracking-widest uppercase text-[#94A3B8]">
                Loading...
              </p>
            </div>
          }
        >
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<LandingPage />} />
            {/* Legal pages — no auth required */}
            <Route path="/legal/:page" element={<LegalPage />} />
            <Route element={<PublicOnlyRoute />}>
              <Route path="/auth/sign-in" element={<SignIn />} />
              <Route path="/auth/sign-up" element={<SignUp />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              {/* App dashboard */}
              <Route path="/app" element={<DashboardLayout />}>
                <Route index element={<Navigate to="/app/courses" replace />} />
                <Route path="courses" element={<Dashboard />} />
                <Route path="courses/:id" element={<CookingMode />} />
                <Route path="chefs" element={<ChefListGated />} />
                <Route path="chef/:id" element={<ChefProfileGated />} />
                <Route path="community" element={<Community />} />
                <Route path="recipes" element={<RecipeListGated />} />
                <Route path="recipes/:id" element={<RecipeDetailGated />} />
                <Route path="meal-planner" element={<MealPlannerGated />} />
                <Route path="shopping-list" element={<ShoppingList />} />
                <Route path="settings" element={<Settings />} />
                <Route
                  path="masterclass"
                  element={<Navigate to="/app/courses" replace />}
                />
              </Route>
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AccessProvider>
  );
};

export default App;
