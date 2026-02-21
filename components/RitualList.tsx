import React from 'react';
import { motion } from 'framer-motion';
import { Timer, ArrowUpRight } from 'lucide-react';
import { signatureRituals } from '../data';

const RitualList: React.FC = () => {
  return (
    <section id="rituals" className="py-24 bg-obsidian-light relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-obsidian to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Header */}
          <div className="lg:col-span-4">
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
              Signature <br/>
              <span className="text-[#14b8a6] italic">CookFlows</span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              These are not just recipes. They are rituals. Multi-day processes designed to fundamentally alter your relationship with ingredients.
            </p>
            <button className="text-saffron flex items-center gap-2 hover:gap-4 transition-all duration-300 uppercase tracking-widest text-xs font-bold">
              View All Rituals <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="lg:col-span-8 space-y-6">
            {signatureRituals.map((ritual, index) => (
              <motion.div
                key={ritual.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-sage/30 hover:bg-white/10 transition-all duration-500 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex gap-2 mb-3">
                      {ritual.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-widest px-2 py-1 rounded bg-black/40 text-gray-400 border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-serif text-white group-hover:text-[#14b8a6] transition-colors duration-300">
                      {ritual.title}
                    </h3>
                    <p className="mt-2 text-gray-400 max-w-md text-sm">
                      {ritual.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6 shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                    <div className="text-center">
                      <Timer className="w-5 h-5 text-saffron mx-auto mb-1" />
                      <span className="text-sm text-gray-300 font-sans">{ritual.duration}</span>
                    </div>
                    <div className="h-10 w-[1px] bg-white/10 hidden md:block" />
                     <button className="p-3 rounded-full bg-white/5 text-white hover:bg-[#14b8a6] hover:text-obsidian transition-colors duration-300">
                        <ArrowUpRight className="w-5 h-5" />
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RitualList;