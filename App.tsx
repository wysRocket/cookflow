import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { ChefHat } from "lucide-react";
import { motion } from "framer-motion";

// Landing page components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AcademyGrid from "./components/AcademyGrid";
import RitualList from "./components/RitualList";
import Membership from "./components/Membership";
import Testimonials from "./components/Testimonials";
import ConsultantForm from "./components/ConsultantForm";
import Footer from "./components/Footer";

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
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const PublicOnlyRoute = lazy(() => import("./components/PublicOnlyRoute"));

const LandingPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.2, opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="flex flex-col items-center gap-4"
        >
          <ChefHat className="w-16 h-16 text-[#14b8a6]" />
          <p className="text-white font-serif tracking-[0.3em] text-sm animate-pulse">
            INITIALIZING KITCHEN
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-gray-200 selection:bg-[#14b8a6] selection:text-obsidian">
      <Navbar />
      <main>
        <Hero />
        <AcademyGrid />
        <RitualList />
        <Testimonials />
        <Membership />
        <ConsultantForm />
      </main>
      <Footer />
    </div>
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
              <Route path="chefs" element={<ChefList />} />
              <Route path="chef/:id" element={<ChefProfile />} />
              <Route path="community" element={<Community />} />
              <Route path="recipes" element={<RecipeList />} />
              <Route path="recipes/:id" element={<RecipeDetail />} />
              <Route path="meal-planner" element={<MealPlanner />} />
              <Route path="shopping-list" element={<ShoppingList />} />
              <Route path="settings" element={<Settings />} />
              <Route
                path="masterclass"
                element={<Navigate to="/app/courses" replace />}
              />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
