import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, BookOpen, Users, Search } from "lucide-react";

interface Chef {
  id: number;
  name: string;
  title: string;
  city: string;
  focus: string;
  image: string;
  rating: number;
  students: number;
  courses: number;
  tags: string[];
}

const chefs: Chef[] = [
  {
    id: 1,
    name: "Chef Julian Vane",
    title: "Chef de Partie",
    city: "San Francisco, CA",
    focus: "Molecular Gastronomy",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    students: 3240,
    courses: 12,
    tags: ["Molecular", "Modern"],
  },
  {
    id: 2,
    name: "Chef Marco Pellegrini",
    title: "Sous Chef",
    city: "Milan, IT",
    focus: "Northern Italian Cuisine",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    students: 2890,
    courses: 9,
    tags: ["Italian", "Pasta"],
  },
  {
    id: 3,
    name: "Chef Amina Bensalem",
    title: "Pastry Specialist",
    city: "Paris, FR",
    focus: "Modern Pastry & Plated Desserts",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    students: 4110,
    courses: 14,
    tags: ["Pastry", "Desserts"],
  },
  {
    id: 1,
    name: "Chef Kenji Nakamura",
    title: "Executive Chef",
    city: "Tokyo, JP",
    focus: "Japanese Kaiseki & Ramen",
    image:
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    students: 5620,
    courses: 18,
    tags: ["Japanese", "Ramen"],
  },
  {
    id: 2,
    name: "Chef Sofia Reyes",
    title: "Head Chef",
    city: "Mexico City, MX",
    focus: "Modern Mexican & Street Food",
    image:
      "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    students: 2150,
    courses: 7,
    tags: ["Mexican", "Street Food"],
  },
  {
    id: 3,
    name: "Chef Luca Ferrara",
    title: "Grill Master",
    city: "Florence, IT",
    focus: "Fire Cooking & Whole Animal",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    students: 1780,
    courses: 6,
    tags: ["Grill", "Butchery"],
  },
];

const ChefList: React.FC = () => {
  const [search, setSearch] = useState("");

  const filtered = chefs.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.focus.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#F1F5F9] tracking-tight">
            Our Chefs
          </h1>
          <p className="text-[#94A3B8] mt-1">
            Learn from world-class culinary experts
          </p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search chefs or cuisine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 pl-9 pr-4 py-2.5 bg-[#1E293B] border border-[#334155] rounded-full text-sm text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#14b8a6] transition-colors"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[#64748B]">
          <p className="text-4xl mb-3">👨‍🍳</p>
          <p className="font-medium text-[#94A3B8]">No chefs found</p>
          <p className="text-sm mt-1">Try a different search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((chef, idx) => (
            <Link
              key={`${chef.id}-${idx}`}
              to={`/app/chef/${chef.id}`}
              className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden group hover:border-[#D4AF37]/40 transition-all"
            >
              {/* Photo */}
              <div className="h-56 overflow-hidden relative">
                <img
                  src={chef.image}
                  alt={chef.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {chef.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#0F172A]/70 backdrop-blur-sm border border-[#334155] text-[#94A3B8] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="p-5 space-y-3">
                <div>
                  <p className="text-[10px] font-bold text-[#14b8a6] uppercase tracking-widest">
                    {chef.title}
                  </p>
                  <h2 className="text-base font-bold text-[#F1F5F9] mt-0.5 group-hover:text-[#D4AF37] transition-colors">
                    {chef.name}
                  </h2>
                  <p className="text-xs text-[#64748B] flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> {chef.city}
                  </p>
                  <p className="text-sm text-[#94A3B8] mt-1">{chef.focus}</p>
                </div>

                <div className="flex items-center gap-4 pt-2 border-t border-[#334155] text-xs text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-[#F1F5F9] font-semibold">
                      {chef.rating}
                    </span>
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {chef.courses} courses
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {chef.students.toLocaleString()} students
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChefList;
