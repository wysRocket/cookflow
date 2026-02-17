import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AcademyGrid from './components/AcademyGrid';
import RitualList from './components/RitualList';
import Membership from './components/Membership';
import Testimonials from './components/Testimonials';
import ConsultantForm from './components/ConsultantForm';
import Footer from './components/Footer';
import { ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Intro Animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          className="flex flex-col items-center gap-4"
        >
          <ChefHat className="w-16 h-16 text-sage" />
          <p className="text-white font-serif tracking-[0.3em] text-sm animate-pulse">INITIALIZING KITCHEN</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-gray-200 selection:bg-sage selection:text-obsidian">
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

      {/* Floating Mobile CTA */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden w-11/12 max-w-sm"
      >
        <button className="w-full bg-sage text-obsidian font-bold py-4 rounded-full shadow-[0_0_20px_rgba(94,234,212,0.4)] border border-white/20 uppercase tracking-widest text-sm">
          Start Cooking
        </button>
      </motion.div>
    </div>
  );
};

export default App;