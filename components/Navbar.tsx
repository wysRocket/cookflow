import React, { useState } from 'react';
import { Menu, X, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <ChefHat className="h-8 w-8 text-sage" />
            <span className="font-serif text-2xl font-bold tracking-wider text-white">
              COOK<span className="text-sage">FLOW</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {['Journeys', 'Academy', 'Rituals', 'Members'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-sage transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium font-sans uppercase tracking-widest"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <button className="bg-sage/10 hover:bg-sage/20 text-sage border border-sage/50 px-6 py-2 rounded-full font-sans text-sm font-semibold transition-all duration-300 neon-glow">
              Access the Kitchen
            </button>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['Journeys', 'Academy', 'Rituals', 'Members'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium font-sans"
                >
                  {item}
                </a>
              ))}
              <button className="w-full text-left mt-4 bg-sage/10 text-sage border border-sage/50 px-4 py-3 rounded-md font-sans text-sm font-semibold">
                Access the Kitchen
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;