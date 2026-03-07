import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { academyModules } from "../data";

const TAG_MODULE_MAP: Record<string, string[]> = {
  Modernist: ["Molecular Tapas", "Plant-Based Molecular"],
  Pastry: ["Modern Pastry", "Architectural Desserts"],
  Fermentation: ["New Nordic Fermentation"],
  Butchery: ["Seafood Butchery"],
  Vegan: ["Plant-Based Molecular", "New Nordic Fermentation"],
  Sourcing: ["New Nordic Fermentation", "Oenology & Pairing"],
};

const ConsultantForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [skillLevel, setSkillLevel] = useState("Home Cook");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [goals, setGoals] = useState("");

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const getRecommendations = () => {
    const matchedFocuses = new Set<string>();
    selectedTags.forEach((tag) => {
      (TAG_MODULE_MAP[tag] || []).forEach((f) => matchedFocuses.add(f));
    });
    const matched = academyModules.filter((m) => matchedFocuses.has(m.focus));
    // Fall back to top 2 modules if no tags selected
    return matched.length > 0
      ? matched.slice(0, 3)
      : academyModules.slice(0, 2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    
    // Save to localStorage for SignUp to pick up and store in Firestore
    const profileData = {
      firstName: name.split(" ")[0] || "",
      lastName: name.split(" ").slice(1).join(" ") || "",
      name,
      skillLevel,
      interests: Array.from(selectedTags),
      bio: goals,
    };
    localStorage.setItem("cookflow_profile", JSON.stringify(profileData));
  };

  return (
    <section className="py-24 bg-obsidian relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#14b8a6]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-saffron/5 rounded-full blur-[100px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10"
            >
              <div className="text-center mb-10">
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">
                  Refine Your Palate
                </h2>
                <p className="text-gray-400 text-sm">
                  Complete your profile for a personalised curriculum
                  recommendation.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                      Skill Level
                    </label>
                    <select
                      value={skillLevel}
                      onChange={(e) => setSkillLevel(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage transition-all appearance-none"
                    >
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
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
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
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-[#14b8a6] flex-shrink-0" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#14b8a6]">
                  Profile Generated
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-1">
                Welcome, {name || "Chef"}
              </h2>
              <p className="text-gray-400 text-sm mb-8">
                {skillLevel} ·{" "}
                {selectedTags.size > 0
                  ? Array.from(selectedTags).join(", ")
                  : "All disciplines"}
              </p>

              {/* Recommended modules */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-saffron" />
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Your Recommended Curriculum
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getRecommendations().map((module) => (
                    <div
                      key={module.id}
                      className="relative rounded-xl overflow-hidden h-36 group"
                    >
                      <img
                        src={module.image}
                        alt={module.focus}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#14b8a6]">
                          {module.city}
                        </p>
                        <p className="text-sm font-semibold text-white leading-tight">
                          {module.focus}
                        </p>
                        <p className="text-xs text-gray-300 mt-0.5">
                          {module.lessons} lessons · €{module.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/auth/sign-up"
                  className="flex-1 py-4 bg-gradient-to-r from-sage to-teal-600 text-obsidian font-bold uppercase tracking-widest rounded-lg hover:shadow-[0_0_20px_rgba(94,234,212,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Start Learning <ChevronRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => {
                    setStep(1);
                    setName("");
                    setGoals("");
                    setSelectedTags(new Set());
                  }}
                  className="px-6 py-4 border border-white/10 text-gray-300 hover:text-white hover:border-white/20 rounded-lg text-sm font-medium transition-all"
                >
                  Edit Profile
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ConsultantForm;
