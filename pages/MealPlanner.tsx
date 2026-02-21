import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Calendar,
  Flame,
  ShoppingBag,
} from "lucide-react";

interface PlanEntry {
  readonly name: string;
  readonly image: string;
  readonly kcal: number;
}

type PlanData = Record<string, Record<string, PlanEntry | null>>;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MEALS = ["Breakfast", "Lunch", "Dinner"] as const;

const RECIPE_BANK: PlanEntry[] = [
  {
    name: "Overnight Oats",
    image:
      "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=200&q=60",
    kcal: 320,
  },
  {
    name: "Berry Acai Bowl",
    image:
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=200&q=60",
    kcal: 310,
  },
  {
    name: "Avocado Toast",
    image:
      "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=200&q=60",
    kcal: 450,
  },
  {
    name: "Greek Salad",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=200&q=60",
    kcal: 280,
  },
  {
    name: "Chicken Tacos",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=200&q=60",
    kcal: 540,
  },
  {
    name: "Honey Glazed Salmon",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=200&q=60",
    kcal: 520,
  },
  {
    name: "Spicy Ramen",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=200&q=60",
    kcal: 620,
  },
  {
    name: "Mushroom Risotto",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=200&q=60",
    kcal: 580,
  },
  {
    name: "Banana Pancakes",
    image:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=200&q=60",
    kcal: 380,
  },
  {
    name: "Tiramisu",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=200&q=60",
    kcal: 520,
  },
];

const INITIAL_PLAN: PlanData = {
  Mon: { Breakfast: RECIPE_BANK[0], Lunch: null, Dinner: RECIPE_BANK[5] },
  Tue: { Breakfast: null, Lunch: RECIPE_BANK[3], Dinner: null },
  Wed: { Breakfast: RECIPE_BANK[1], Lunch: null, Dinner: RECIPE_BANK[6] },
  Thu: { Breakfast: null, Lunch: null, Dinner: null },
  Fri: { Breakfast: null, Lunch: RECIPE_BANK[4], Dinner: null },
  Sat: { Breakfast: null, Lunch: null, Dinner: RECIPE_BANK[7] },
  Sun: { Breakfast: null, Lunch: null, Dinner: null },
};

const MealPlanner: React.FC = () => {
  const navigate = useNavigate();
  const [weekOffset, setWeekOffset] = useState(0);
  const [plan, setPlan] = useState<PlanData>(INITIAL_PLAN);
  const [dragging, setDragging] = useState<PlanEntry | null>(null);
  const [hoverCell, setHoverCell] = useState<string | null>(null);
  const [pickerCell, setPickerCell] = useState<string | null>(null);

  const getWeekLabel = () => {
    const now = new Date();
    now.setDate(now.getDate() + weekOffset * 7);
    const start = new Date(now);
    start.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  };

  const getDateForDay = (dayIdx: number) => {
    const now = new Date();
    now.setDate(now.getDate() + weekOffset * 7);
    const start = new Date(now);
    start.setDate(now.getDate() - ((now.getDay() + 6) % 7) + dayIdx);
    return start.getDate();
  };

  const isToday = (dayIdx: number) => {
    if (weekOffset !== 0) return false;
    const now = new Date();
    const todayIdx = (now.getDay() + 6) % 7;
    return todayIdx === dayIdx;
  };

  const dropOnCell = (day: string, meal: string) => {
    if (!dragging) return;
    setPlan((prev) => ({ ...prev, [day]: { ...prev[day], [meal]: dragging } }));
    setDragging(null);
    setHoverCell(null);
  };

  const removeEntry = (e: React.MouseEvent, day: string, meal: string) => {
    e.stopPropagation();
    setPlan((prev) => ({ ...prev, [day]: { ...prev[day], [meal]: null } }));
  };

  const pickRecipe = (recipe: PlanEntry) => {
    if (!pickerCell) return;
    const [day, meal] = pickerCell.split("|");
    setPlan((prev) => ({ ...prev, [day]: { ...prev[day], [meal]: recipe } }));
    setPickerCell(null);
  };

  const totalMeals = Object.values(plan).reduce(
    (sum, day) => sum + Object.values(day).filter(Boolean).length,
    0,
  );
  const totalKcal = Object.values(plan).reduce(
    (sum, day) =>
      sum + Object.values(day).reduce((s, e) => s + (e?.kcal ?? 0), 0),
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#F1F5F9] tracking-tight">
            Meal Planner
          </h1>
          <p className="text-[#94A3B8] mt-1">
            Plan your week, simplify your shopping
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Week nav */}
          <div className="flex items-center gap-1 bg-[#1E293B] border border-[#334155] rounded-xl px-2 py-1.5">
            <button
              onClick={() => setWeekOffset((o) => o - 1)}
              className="p-1.5 rounded-lg hover:bg-[#334155] text-[#94A3B8] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-[#F1F5F9] min-w-[140px] text-center">
              {getWeekLabel()}
            </span>
            <button
              onClick={() => setWeekOffset((o) => o + 1)}
              className="p-1.5 rounded-lg hover:bg-[#334155] text-[#94A3B8] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          {/* Generate CTA */}
          <button
            onClick={() => navigate("/app/shopping-list")}
            className="flex items-center gap-2 bg-[#D4AF37] text-[#0F172A] text-sm font-bold px-4 py-2.5 rounded-full hover:bg-lime-400 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Generate Shopping List
          </button>
        </div>
      </div>

      {/* Calendar + Sidebar */}
      <div className="flex gap-5">
        {/* Calendar */}
        <div className="flex-1 bg-[#1E293B] rounded-2xl border border-[#334155] overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-[#334155]">
            {DAYS.map((day, i) => (
              <div
                key={day}
                className={`p-3 text-center ${i < 6 ? "border-r border-[#334155]" : ""}`}
              >
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">
                  {day}
                </p>
                <div
                  className={`w-8 h-8 mx-auto mt-1 flex items-center justify-center rounded-full ${isToday(i) ? "bg-[#14b8a6]" : ""}`}
                >
                  <p
                    className={`text-lg font-bold ${isToday(i) ? "text-white" : "text-[#F1F5F9]"}`}
                  >
                    {getDateForDay(i)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Meal rows */}
          {MEALS.map((meal, mealIdx) => (
            <div
              key={meal}
              className={`grid grid-cols-7 ${mealIdx < MEALS.length - 1 ? "border-b border-[#334155]" : ""}`}
            >
              {DAYS.map((day, i) => {
                const entry = plan[day]?.[meal] ?? null;
                const cellKey = `${day}-${meal}`;
                const isHovered = hoverCell === cellKey && dragging;
                return (
                  <div
                    key={day}
                    className={`p-2 min-h-[100px] ${i < 6 ? "border-r border-[#334155]" : ""} ${isHovered ? "bg-[#14b8a6]/5" : ""} transition-colors`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setHoverCell(cellKey);
                    }}
                    onDragLeave={() => setHoverCell(null)}
                    onDrop={() => dropOnCell(day, meal)}
                  >
                    <p className="text-[8px] font-bold text-[#475569] uppercase tracking-widest mb-1.5">
                      {meal}
                    </p>
                    {entry ? (
                      <div className="relative group rounded-xl overflow-hidden border border-[#334155]">
                        <img
                          src={entry.image}
                          alt={entry.name}
                          className="w-full h-14 object-cover"
                        />
                        <div className="px-2 py-1.5 bg-[#0F172A]">
                          <p className="text-[10px] font-medium text-[#F1F5F9] leading-tight truncate">
                            {entry.name}
                          </p>
                        </div>
                        <button
                          onClick={(e) => removeEntry(e, day, meal)}
                          className="absolute top-1 right-1 w-5 h-5 bg-[#0F172A]/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setPickerCell(`${day}|${meal}`)}
                        className={`w-full h-16 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-0.5 transition-all ${isHovered ? "border-[#14b8a6] text-[#14b8a6]" : "border-[#334155] text-[#475569] hover:border-[#14b8a6]/50 hover:text-[#14b8a6]/70"}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span className="text-[9px]">Add meal</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Recipe bank sidebar */}
        <div className="hidden xl:flex flex-col w-52 bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden flex-shrink-0">
          <div className="px-4 py-3 border-b border-[#334155]">
            <p className="text-xs font-bold text-[#F1F5F9]">Recipes</p>
            <p className="text-[10px] text-[#64748B] mt-0.5">
              Drag to calendar
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {RECIPE_BANK.map((recipe) => (
              <div
                key={recipe.name}
                draggable
                onDragStart={() => setDragging(recipe)}
                onDragEnd={() => {
                  setDragging(null);
                  setHoverCell(null);
                }}
                className="flex items-center gap-2.5 p-2 bg-[#0F172A] border border-[#334155] rounded-xl cursor-grab active:cursor-grabbing hover:border-[#14b8a6]/40 transition-colors"
              >
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-[#F1F5F9] truncate">
                    {recipe.name}
                  </p>
                  <p className="text-[10px] text-[#64748B]">
                    {recipe.kcal} kcal
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: Calendar,
            label: "Meals planned",
            value: `${totalMeals}`,
            color: "text-[#14b8a6]",
          },
          {
            icon: Flame,
            label: "Avg daily kcal",
            value: `~${totalMeals > 0 ? Math.round(totalKcal / 7) : 0}`,
            color: "text-[#D4AF37]",
          },
          {
            icon: ShoppingBag,
            label: "Ingredients needed",
            value: `${totalMeals * 4}`,
            color: "text-[#94A3B8]",
          },
        ].map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="bg-[#1E293B] border border-[#334155] rounded-2xl p-4 flex items-center gap-4"
          >
            <div
              className={`w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center ${color}`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className={`text-xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-[#64748B] mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe picker modal */}
      {pickerCell && (
        <div
          className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setPickerCell(null)}
        >
          <div
            className="bg-[#1E293B] border border-[#334155] rounded-2xl w-full max-w-sm p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#F1F5F9]">
                Pick a recipe
              </h3>
              <button
                onClick={() => setPickerCell(null)}
                className="text-[#64748B] hover:text-[#F1F5F9]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {RECIPE_BANK.map((recipe) => (
                <button
                  key={recipe.name}
                  onClick={() => pickRecipe(recipe)}
                  className="w-full flex items-center gap-3 p-2.5 bg-[#0F172A] border border-[#334155] rounded-xl hover:border-[#14b8a6]/50 hover:bg-[#14b8a6]/5 transition-all text-left"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm font-medium text-[#F1F5F9]">
                      {recipe.name}
                    </p>
                    <p className="text-xs text-[#64748B]">{recipe.kcal} kcal</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
