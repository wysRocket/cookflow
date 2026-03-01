import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChefHat } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Journeys", sectionId: "journeys" },
  { label: "Academy", sectionId: "academy" },
  { label: "CookFlows", sectionId: "rituals" },
  { label: "Members", sectionId: "members" },
];

const scrollToSection = (sectionId: string) => {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    setTimeout(() => scrollToSection(sectionId), 100);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex-shrink-0 flex items-center gap-2"
          >
            <ChefHat className="h-8 w-8 text-[#14b8a6]" />
            <span className="font-serif text-2xl font-bold tracking-wider text-white">
              COOK<span className="text-[#14b8a6]">FLOW</span>
            </span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {NAV_ITEMS.map(({ label, sectionId }) => (
                <Link
                  key={label}
                  to={`/#${sectionId}`}
                  onClick={() => handleNavClick(sectionId)}
                  className="text-gray-300 hover:text-[#14b8a6] transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium font-sans uppercase tracking-widest"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Link
              to="/app/courses"
              className="bg-[#14b8a6]/10 hover:bg-[#14b8a6]/20 text-[#14b8a6] border border-sage/50 px-6 py-2 rounded-full font-sans text-sm font-semibold transition-all duration-300 neon-glow"
            >
              Access the Kitchen
            </Link>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NAV_ITEMS.map(({ label, sectionId }) => (
                <Link
                  key={label}
                  to={`/#${sectionId}`}
                  onClick={() => handleNavClick(sectionId)}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium font-sans"
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/app/courses"
                onClick={() => setIsOpen(false)}
                className="block w-full text-left mt-4 bg-[#14b8a6]/10 text-[#14b8a6] border border-sage/50 px-4 py-3 rounded-md font-sans text-sm font-semibold"
              >
                Access the Kitchen
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
