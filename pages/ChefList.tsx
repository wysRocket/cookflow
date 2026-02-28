import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, BookOpen, Users, Search } from "lucide-react";
import { chefs } from "../data";

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
