import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/30 z-10" />
        <img
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2400"
          alt="Chef plating"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Northern Lights Gradient Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#14b8a6]/20 rounded-full blur-[120px] mix-blend-screen animate-pulse z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-saffron text-xs font-sans font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
            Europe's Premier Culinary Platform
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-6 leading-tight">
            Master the Art. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage to-emerald-400">
              Control the Flow.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300 font-sans font-light leading-relaxed">
            Transition from inspiration to mastery with the most advanced recipe-to-lesson ecosystem.
            Precision metrics. Molecular insights. Elite mentorship.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/app/courses"
              className="group relative px-8 py-4 bg-[#14b8a6] text-obsidian font-bold font-sans rounded-none hover:bg-emerald-300 transition-all duration-300 overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start a Masterclass
                <Play className="w-4 h-4 fill-current" />
              </span>
            </Link>
            <Link
              to="/app/recipes"
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-sans font-medium hover:bg-white/5 hover:border-sage/50 hover:text-[#14b8a6] transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Explore Recipes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-gray-500">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-sage to-transparent" />
      </motion.div>
    </div>
  );
};

export default Hero;
