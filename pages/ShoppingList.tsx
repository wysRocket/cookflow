import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  Plus,
  CheckCircle2,
  Circle,
  ArrowLeft,
} from "lucide-react";

interface ShoppingItem {
  id: number;
  name: string;
  qty: string;
  checked: boolean;
}

interface Category {
  label: string;
  emoji: string;
  items: ShoppingItem[];
}

const INITIAL_CATEGORIES: Category[] = [
  {
    label: "Produce",
    emoji: "🥦",
    items: [
      { id: 1, name: "Avocados", qty: "2", checked: false },
      { id: 2, name: "Fresh Basil", qty: "1 bunch", checked: false },
      { id: 3, name: "Cherry Tomatoes", qty: "1 punnet", checked: true },
      { id: 4, name: "Lemon", qty: "3", checked: false },
      { id: 5, name: "Baby Spinach", qty: "200g", checked: false },
    ],
  },
  {
    label: "Dairy & Eggs",
    emoji: "🥛",
    items: [
      { id: 6, name: "Greek Yogurt", qty: "500g", checked: false },
      { id: 7, name: "Free-range Eggs", qty: "12", checked: true },
      { id: 8, name: "Parmesan", qty: "100g", checked: false },
      { id: 9, name: "Milk", qty: "1L", checked: false },
    ],
  },
  {
    label: "Pantry",
    emoji: "🫙",
    items: [
      { id: 10, name: "Olive Oil", qty: "1 bottle", checked: false },
      { id: 11, name: "Soy Sauce", qty: "200ml", checked: false },
      { id: 12, name: "Honey", qty: "1 jar", checked: true },
      { id: 13, name: "Ramen Noodles", qty: "2 packs", checked: false },
      { id: 14, name: "Miso Paste", qty: "100g", checked: false },
    ],
  },
  {
    label: "Protein",
    emoji: "🥩",
    items: [
      { id: 15, name: "Salmon Fillets", qty: "4 × 150g", checked: false },
      { id: 16, name: "Chicken Breast", qty: "500g", checked: false },
      { id: 17, name: "Chashu Pork", qty: "200g", checked: false },
    ],
  },
];

let nextId = 100;

const ShoppingList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [newItem, setNewItem] = useState("");
  const [newQty, setNewQty] = useState("");
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const totalItems = categories.reduce((s, c) => s + c.items.length, 0);
  const checkedItems = categories.reduce(
    (s, c) => s + c.items.filter((i) => i.checked).length,
    0,
  );
  const pct =
    totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  const toggle = (catLabel: string, id: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.label !== catLabel
          ? cat
          : {
            ...cat,
            items: cat.items.map((it) =>
              it.id === id ? { ...it, checked: !it.checked } : it,
            ),
          },
      ),
    );
  };

  const clearChecked = () => {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        items: cat.items.filter((it) => !it.checked),
      })),
    );
  };

  const addItem = (catLabel: string) => {
    if (!newItem.trim()) return;
    setCategories((prev) =>
      prev.map((cat) =>
        cat.label !== catLabel
          ? cat
          : {
            ...cat,
            items: [
              ...cat.items,
              {
                id: nextId++,
                name: newItem.trim(),
                qty: newQty.trim() || "1",
                checked: false,
              },
            ],
          },
      ),
    );
    setNewItem("");
    setNewQty("");
    setAddingTo(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link
              to="/app/meal-planner"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#1E293B] border-2 border-[#14b8a6]/60 text-[#14b8a6] hover:bg-[#14b8a6]/10 hover:border-[#14b8a6] transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-3xl font-bold text-[#F1F5F9] tracking-tight">
              Shopping List
            </h1>
          </div>
          <p className="text-[#94A3B8] text-sm ml-7">
            {checkedItems} of {totalItems} items checked
          </p>
        </div>
        {checkedItems > 0 && (
          <button
            onClick={clearChecked}
            className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 font-medium px-3 py-2 rounded-xl hover:bg-red-400/10 transition-all flex-shrink-0"
          >
            <Trash2 className="w-4 h-4" /> Clear checked
          </button>
        )}
      </div>

      {/* Progress */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#14b8a6]" />
            <span className="text-sm font-semibold text-[#F1F5F9]">
              Progress
            </span>
          </div>
          <span className="text-sm font-bold text-[#14b8a6]">{pct}%</span>
        </div>
        <div className="h-2 bg-[#0F172A] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#14b8a6] to-[#D4AF37] rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        {pct === 100 && (
          <p className="text-xs text-[#D4AF37] font-medium mt-2">
            All done! Ready to cook 🎉
          </p>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {categories.map(
          (cat) =>
            (cat.items.length > 0 || addingTo === cat.label) && (
              <div
                key={cat.label}
                className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden"
              >
                {/* Category header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-[#334155] bg-[#1E293B]">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{cat.emoji}</span>
                    <h2 className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">
                      {cat.label}
                    </h2>
                    <span className="text-xs text-[#475569]">
                      {cat.items.filter((i) => i.checked).length}/
                      {cat.items.length}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setAddingTo(addingTo === cat.label ? null : cat.label);
                      setTimeout(() => inputRef.current?.focus(), 50);
                    }}
                    className="text-[#64748B] hover:text-[#D4AF37] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Items */}
                <ul>
                  {cat.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-4 px-5 py-3.5 border-b border-[#334155]/60 last:border-0 cursor-pointer hover:bg-[#0F172A]/40 transition-colors"
                      onClick={() => toggle(cat.label, item.id)}
                    >
                      {item.checked ? (
                        <CheckCircle2 className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#334155] flex-shrink-0 hover:text-[#D4AF37] transition-colors" />
                      )}
                      <span
                        className={`flex-1 text-sm transition-all ${item.checked ? "line-through text-[#475569]" : "text-[#CBD5E1]"}`}
                      >
                        {item.name}
                      </span>
                      <span className="text-xs text-[#475569] font-medium">
                        {item.qty}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Add item inline form */}
                {addingTo === cat.label && (
                  <div className="flex gap-2 px-5 py-3 bg-[#0F172A]/40 border-t border-[#334155]">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Item name..."
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addItem(cat.label)}
                      className="flex-1 bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2 text-sm text-[#F1F5F9] placeholder-[#475569] focus:outline-none focus:border-[#14b8a6] transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Qty"
                      value={newQty}
                      onChange={(e) => setNewQty(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addItem(cat.label)}
                      className="w-20 bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2 text-sm text-[#F1F5F9] placeholder-[#475569] focus:outline-none focus:border-[#14b8a6] transition-colors"
                    />
                    <button
                      onClick={() => addItem(cat.label)}
                      className="px-3 py-2 bg-[#D4AF37] text-[#0F172A] font-bold text-sm rounded-lg hover:bg-lime-400 transition-colors flex-shrink-0"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
