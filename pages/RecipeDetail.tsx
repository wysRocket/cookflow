import React, { useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Clock,
  Flame,
  Users,
  Play,
  CalendarPlus,
  CheckCircle2,
  Circle,
  BarChart2,
} from "lucide-react";
import { recipes } from "../data";
import { Recipe } from "../types";

const difficultyColor: Record<Recipe["difficulty"], string> = {
  Easy: "text-[#D4AF37] bg-[#D4AF37]/10",
  Medium: "text-[#14b8a6] bg-[#14b8a6]/10",
  Hard: "text-red-400 bg-red-400/10",
};

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // Find the requested recipe or default to the first one if invalid ID is passed
  const recipe = recipes.find((r) => r.id === Number(id)) || recipes[0];
  const [checked, setChecked] = useState<Set<number>>(new Set());

  React.useEffect(() => {
    setChecked(new Set());
  }, [id]);

  const toggleIngredient = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <Link
        to="/app/recipes"
        className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#14b8a6] transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Recipes
      </Link>

      {/* Hero — two column */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Image */}
        <div className="lg:col-span-3 relative h-64 lg:h-auto rounded-2xl overflow-hidden">
          <img
            src={recipe.detailImage ?? recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/50 to-transparent" />
        </div>

        {/* Meta */}
        <div className="lg:col-span-2 flex flex-col justify-center space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-[#F1F5F9] tracking-tight">
              {recipe.name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(recipe.rating) ? "text-amber-400 fill-amber-400" : "text-gray-600"}`}
                />
              ))}
              <span className="text-[#14b8a6] font-semibold text-sm">
                {recipe.rating}
              </span>
              <span className="text-[#64748B] text-sm">
                ({recipe.reviews} reviews)
              </span>
            </div>
            <p className="text-[#94A3B8] text-sm leading-relaxed mt-3">
              {recipe.description}
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Clock, label: "Cook Time", value: recipe.time },
              { icon: Flame, label: "Calories", value: `${recipe.kcal} kcal` },
              {
                icon: Users,
                label: "Servings",
                value: `${recipe.servings} person${recipe.servings > 1 ? "s" : ""}`,
              },
              {
                icon: BarChart2,
                label: "Difficulty",
                value: recipe.difficulty,
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-[#1E293B] border border-[#334155] rounded-xl p-3"
              >
                <Icon className="w-4 h-4 text-[#64748B] mb-1" />
                <p className="text-[10px] text-[#64748B] uppercase tracking-wider">
                  {label}
                </p>
                <p
                  className={`text-sm font-semibold mt-0.5 ${label === "Difficulty" ? difficultyColor[recipe.difficulty].split(" ")[0] : "text-[#F1F5F9]"}`}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 bg-[#1E293B] border border-[#334155] text-[#94A3B8] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={() => navigate(`/app/courses/${id ?? "1"}`)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#14b8a6] text-white py-3 rounded-full font-bold hover:bg-[#0d9488] transition-colors shadow-lg shadow-teal-900/30"
            >
              <Play className="w-4 h-4" /> Start Cooking
            </button>
            <button
              onClick={() =>
                navigate("/app/meal-planner", {
                  state: {
                    addedRecipe: {
                      name: recipe.name,
                      image: recipe.image,
                      kcal: recipe.kcal,
                    },
                  },
                })
              }
              className="flex items-center justify-center gap-2 bg-[#1E293B] border border-[#334155] text-[#94A3B8] px-4 py-3 rounded-full font-medium hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
            >
              <CalendarPlus className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Add to Plan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content — ingredients + steps */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Ingredients */}
        <div className="md:col-span-2 bg-[#1E293B] rounded-2xl border border-[#334155] p-6">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-base font-bold text-[#F1F5F9]">
              Ingredients
              <span className="ml-2 text-xs font-normal text-[#64748B]">
                {recipe.servings} serving{recipe.servings > 1 ? "s" : ""}
              </span>
            </h2>
            <span className="text-[10px] text-[#64748B] uppercase tracking-wider">
              Click to mark purchased
            </span>
          </div>
          <ul className="space-y-3">
            {recipe.ingredients.map((ing, i) => (
              <li
                key={i}
                className="flex items-start gap-3 cursor-pointer group"
                onClick={() => toggleIngredient(i)}
              >
                {checked.has(i) ? (
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-[#334155] flex-shrink-0 mt-0.5 group-hover:text-[#D4AF37] transition-colors" />
                )}
                <span
                  className={`text-sm leading-snug transition-all ${checked.has(i) ? "line-through text-[#475569]" : "text-[#CBD5E1]"}`}
                >
                  {ing}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="md:col-span-3 bg-[#1E293B] rounded-2xl border border-[#334155] p-6">
          <h2 className="text-base font-bold text-[#F1F5F9] mb-4">
            Instructions
          </h2>
          <ol className="space-y-3">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-4 bg-[#0F172A] rounded-xl p-4">
                <span className="flex-shrink-0 w-7 h-7 bg-[#14b8a6] text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#CBD5E1] leading-relaxed">
                    {step.text}
                  </p>
                  {step.duration && (
                    <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-semibold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" /> {step.duration}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
