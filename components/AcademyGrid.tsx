import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Award, Info, FlaskConical } from 'lucide-react';
import { academyModules } from '../data';
import { AcademyModule } from '../types';

const AcademyCard: React.FC<{ module: AcademyModule; index: number }> = ({ module, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showTip, setShowTip] = useState(false);

  // Tilt configuration
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Refined springs for more fluid, less stiff movement
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  // Increased rotation range for more pronounced 3D effect
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["22deg", "-22deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-22deg", "22deg"]);

  // Parallax effect for content
  const contentZ = useTransform(mouseYSpring, [-0.5, 0.5], ["30px", "30px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setShowTip(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="h-[450px] w-full perspective-1000"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative h-full w-full rounded-xl cursor-pointer"
      >
        {/* Card Background Container */}
        <div className="absolute inset-0 rounded-xl overflow-hidden bg-obsidian border border-white/10 shadow-2xl">
          {/* Base Image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
          <img
            src={module.image}
            alt={module.focus}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Shimmer Effect */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-xl">
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]" />
            </div>
          </div>
        </div>

        {/* Floating Content */}
        <div
          className="absolute inset-0 z-30 p-6 flex flex-col justify-end"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="transform transition-transform duration-500 group-hover:-translate-y-6">
            <div className="flex items-center gap-2 text-saffron mb-2">
              <MapPin className="w-4 h-4 shadow-black drop-shadow-md" />
              <span className="text-xs font-bold tracking-widest uppercase shadow-black drop-shadow-md">{module.city}</span>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-serif text-white shadow-black drop-shadow-lg">{module.focus}</h3>
              <div className="relative">
                <button
                  onMouseEnter={() => setShowTip(true)}
                  onMouseLeave={() => setShowTip(false)}
                  onFocus={() => setShowTip(true)}
                  onBlur={() => setShowTip(false)}
                  className="p-1 rounded-full bg-white/10 hover:bg-[#14b8a6]/20 text-white/50 hover:text-[#14b8a6] transition-colors backdrop-blur-sm border border-white/5 hover:border-sage/50"
                  aria-label="Scientific Principle"
                >
                  <Info className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {showTip && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10, rotateX: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10, rotateX: 20 }}
                      transition={{ duration: 0.2 }}
                      style={{ transformStyle: "preserve-3d", transform: "translateZ(60px)" }}
                      className="absolute bottom-full left-0 mb-3 w-56 p-4 bg-obsidian/95 border border-sage/50 rounded-xl text-left shadow-2xl shadow-sage/10 backdrop-blur-xl z-50 pointer-events-none"
                    >
                      <div className="flex items-center gap-2 mb-2 text-[#14b8a6] border-b border-white/10 pb-2">
                        <FlaskConical className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Mentor Tip</span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed font-sans">
                        {module.scientificPrinciple}
                      </p>
                      <div className="absolute bottom-[-6px] left-3 w-3 h-3 bg-obsidian/95 border-b border-r border-sage/50 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="flex items-center gap-4 text-gray-200 text-sm font-sans mb-4 shadow-black drop-shadow-md">
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-[#14b8a6]" />
                <span>{module.level}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-[#14b8a6]" />
                <span>{module.lessons} Lessons</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/20 pt-4 backdrop-blur-sm bg-black/20 rounded px-2 -mx-2">
              <span className="text-xl font-bold text-white">€{module.price}</span>
              <span className="text-xs text-gray-300">Full Access</span>
            </div>
          </div>

          {/* Hidden Reveal on Hover */}
          <div
            className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out bg-obsidian/90 backdrop-blur-md border-t border-sage/30 rounded-b-xl translate-y-8 group-hover:translate-y-0"
          >
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#14b8a6] shrink-0 mt-1" />
              <div>
                <p className="text-xs font-bold text-[#14b8a6] uppercase tracking-wider mb-1">Key Technique</p>
                <p className="text-sm text-gray-200">{module.technique}</p>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest font-bold border border-white/10 rounded transition-colors">
              View Curriculum
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AcademyGrid: React.FC = () => {
  return (
    <section id="academy" className="py-24 bg-obsidian relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">The Academy</h2>
          <div className="w-24 h-1 bg-saffron" />
          <p className="mt-4 text-gray-400 font-sans max-w-xl">
            Curated curriculums from the culinary capitals of Europe. Deep dive into technique, chemistry, and history.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {academyModules.map((module, index) => (
            <AcademyCard key={module.id} module={module} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademyGrid;