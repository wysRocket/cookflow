import React, { useEffect, useState } from "react";
import { ChefHat } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AcademyGrid from "../components/AcademyGrid";
import RitualList from "../components/RitualList";
import Membership from "../components/Membership";
import Testimonials from "../components/Testimonials";
import ConsultantForm from "../components/ConsultantForm";
import Footer from "../components/Footer";

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

export default LandingPage;
