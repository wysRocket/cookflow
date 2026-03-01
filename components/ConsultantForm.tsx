import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ConsultantForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  return (
    <section className="py-24 bg-obsidian relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#14b8a6]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-saffron/5 rounded-full blur-[100px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">
              Refine Your Palate
            </h2>
            <p className="text-gray-400 text-sm">
              Complete your profile for a personalized curriculum
              recommendation.
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/app/courses");
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Skill Level
                </label>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-all appearance-none">
                  <option className="bg-obsidian">Home Cook</option>
                  <option className="bg-obsidian">Enthusiast</option>
                  <option className="bg-obsidian">Professional</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Modernist",
                  "Pastry",
                  "Fermentation",
                  "Butchery",
                  "Vegan",
                  "Sourcing",
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full border text-sm transition-all ${
                      selectedTags.has(tag)
                        ? "border-sage bg-sage/10 text-[#14b8a6]"
                        : "border-white/10 bg-white/5 text-gray-300 hover:border-sage hover:text-[#14b8a6]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                Goals
              </label>
              <textarea
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-all h-32"
                placeholder="What do you hope to achieve in the kitchen?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-sage to-teal-600 text-obsidian font-bold uppercase tracking-widest rounded-lg hover:shadow-[0_0_20px_rgba(94,234,212,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Generate My Profile <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ConsultantForm;
