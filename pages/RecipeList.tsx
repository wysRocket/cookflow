import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Clock,
  Flame,
  Star,
  Bookmark,
  ChevronRight,
} from "lucide-react";
import { recipes } from '../data';

interface Recipe {
  readonly id: number;
  readonly name: string;
  readonly category: string;
  readonly time: string;
  readonly kcal: number;
  readonly rating: number;
  readonly difficulty: "Easy" | "Medium" | "Hard";
  readonly tags: string[];
  readonly image: string;
  readonly badge?: string;
  readonly badgeColor?: string;
}

const filters = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack"];

const difficultyColor: Record<Recipe["difficulty"], string> = {
  Easy: "text-[#D4AF37] bg-[#D4AF37]/10",
  Medium: "text-[#14b8a6] bg-[#14b8a6]/10",
  Hard: "text-red-400 bg-red-400/10",
};

const RecipeList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());

  // Sync search when URL param changes
  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null) setSearch(q);
  }, [searchParams]);

  const filtered = recipes.filter((r) => {
    const matchesFilter = activeFilter === "All" || r.category === activeFilter;
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleBookmark = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setBookmarked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F1F5F9] tracking-tight">
            Recipes
          </h1>
          <p className="text-[#94A3B8] mt-1">
            Discover and save your favourite dishes
          </p>
        </div>
        <span className="text-sm text-[#64748B]">
          {filtered.length} recipes
        </span>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-[#1E293B] border border-[#334155] rounded-full text-[#F1F5F9] placeholder-[#64748B] text-sm focus:outline-none focus:border-[#14b8a6] transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {/* mobile-friendly filter wrap */}
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === f
                  ? "bg-[#14b8a6] text-white"
                  : "bg-[#1E293B] text-[#94A3B8] border border-[#334155] hover:border-[#14b8a6]/50 hover:text-[#F1F5F9]"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[#64748B]">
          <p className="text-4xl mb-3">🍽️</p>
          <p className="font-medium text-[#94A3B8]">No recipes found</p>
          <p className="text-sm mt-1">Try a different search or filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((recipe) => (
            <Link
              key={recipe.id}
              to={`/app/recipes/${recipe.id}`}
              className="bg-[#1E293B] rounded-2xl border border-[#334155] hover:border-[#D4AF37]/40 transition-all group overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/80 via-transparent to-transparent" />
                {recipe.badge && (
                  <span
                    className={`absolute top-3 left-3 ${recipe.badgeColor} text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full`}
                  >
                    {recipe.badge}
                  </span>
                )}
                <button
                  onClick={(e) => toggleBookmark(e, recipe.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0F172A]/60 backdrop-blur-sm flex items-center justify-center hover:bg-[#14b8a6] transition-colors"
                >
                  <Bookmark
                    className={`w-4 h-4 ${bookmarked.has(recipe.id) ? "fill-white text-white" : "text-white"}`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-[10px] font-bold text-[#14b8a6] uppercase tracking-widest mb-1">
                  {recipe.category}
                </p>
                <h3 className="font-semibold text-[#F1F5F9] text-sm leading-snug group-hover:text-[#D4AF37] transition-colors truncate">
                  {recipe.name}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {recipe.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#14b8a6]" />{" "}
                    {recipe.kcal} kcal
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs text-[#94A3B8]">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />{" "}
                      {recipe.rating}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${difficultyColor[recipe.difficulty]}`}
                    >
                      {recipe.difficulty}
                    </span>
                  </div>
                  <span className="text-xs text-[#D4AF37] flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    Cook <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="flex gap-1.5 mt-3 flex-wrap">
                  {recipe.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 bg-[#0F172A] border border-[#334155] text-[#64748B] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
