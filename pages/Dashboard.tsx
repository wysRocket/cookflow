import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Cloud, Beaker, Scissors } from "lucide-react";

const academyCourses = [
  {
    id: 1,
    title: "Modern Pastry",
    instructor: "PARIS",
    timeAgo: "2 days ago",
    details: "27 details",
    image:
      "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Artisan Pasta",
    instructor: "ROME",
    timeAgo: "4 days ago",
    details: "15 details",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Molecular Tapas",
    instructor: "SAN SEBASTIAN",
    timeAgo: "1 week ago",
    details: "15 details",
    image:
      "https://images.unsplash.com/photo-1773333155314-cbfb5f6d4dba?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "New Nordic Fermentation",
    instructor: "COPENHAGEN",
    timeAgo: "1 week ago",
    details: "27 details",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Seafood Butchery",
    instructor: "MARSEILLE",
    timeAgo: "2 weeks ago",
    details: "14 lessons",
    image:
      "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Oenology & Pairing",
    instructor: "BORDEAUX",
    timeAgo: "2 weeks ago",
    details: "6 lessons",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "Plant-Based Molecular",
    instructor: "BERLIN",
    timeAgo: "3 weeks ago",
    details: "11 lessons",
    image:
      "https://images.unsplash.com/photo-1671437361711-1d78e0546583?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "The New Mother Sauces",
    instructor: "LYON",
    timeAgo: "3 weeks ago",
    details: "18 lessons",
    image:
      "https://images.unsplash.com/photo-1551437424-8d2ccf214a19?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "Architectural Desserts",
    instructor: "VIENNA",
    timeAgo: "4 weeks ago",
    details: "9 lessons",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    title: "Japanese Knife Mastery",
    instructor: "TOKYO",
    timeAgo: "1 month ago",
    details: "16 lessons",
    image:
      "https://images.unsplash.com/photo-1591831616711-bcc70b017abb?q=80&w=774&auto=format&fit=crop",
  },
  {
    id: 11,
    title: "Meze & Live-Fire Cooking",
    instructor: "ISTANBUL",
    timeAgo: "1 month ago",
    details: "10 lessons",
    image:
      "https://images.unsplash.com/photo-1664463761167-ad704d263da6?q=80&w=774&auto=format&fit=crop",
  },
  {
    id: 12,
    title: "Spice Alchemy",
    instructor: "MARRAKECH",
    timeAgo: "1 month ago",
    details: "8 lessons",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 13,
    title: "Mole & Masa",
    instructor: "MEXICO CITY",
    timeAgo: "1.5 months ago",
    details: "14 lessons",
    image:
      "https://images.unsplash.com/photo-1625167473766-a0cda0257d9c?q=80&w=774&auto=format&fit=crop",
  },
  {
    id: 14,
    title: "Dim Sum Architecture",
    instructor: "SHANGHAI",
    timeAgo: "1.5 months ago",
    details: "12 lessons",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 15,
    title: "Ceviche & Citrus Chemistry",
    instructor: "LIMA",
    timeAgo: "2 months ago",
    details: "11 lessons",
    image:
      "https://images.unsplash.com/photo-1619221881833-5e5aeff458fd?q=80&w=774&auto=format&fit=crop",
  },
  {
    id: 16,
    title: "Thai Curry Science",
    instructor: "BANGKOK",
    timeAgo: "2 months ago",
    details: "9 lessons",
    image:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 17,
    title: "Smoke & Char Mastery",
    instructor: "OAXACA",
    timeAgo: "2 months ago",
    details: "13 lessons",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
  },
];

const Dashboard: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const q = searchParams.get("q");
    setSearch(q ?? "");
  }, [searchParams]);

  const filteredCourses = academyCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-24 pb-20">
      {/* The Academy Section */}
      <section className="text-center">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <h2 className="text-3xl md:text-4xl font-serif text-[#F1F5F9] tracking-tight mx-auto">
            The Academy
          </h2>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="py-12 border border-dashed border-[#334155] rounded-2xl">
            <p className="text-[#94A3B8]">
              No courses found matching "{search}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {filteredCourses.map((course) => (
              <Link
                key={course.id}
                to={`/app/courses/${course.id}`}
                state={{ courseName: course.title, city: course.instructor }}
                className="bg-[#1E293B] rounded-2xl overflow-hidden border border-[#334155] hover:border-[#D4AF37]/50 transition-colors group shadow-lg"
              >
                <div className="relative h-48 overflow-hidden p-3 pb-0">
                  <img
                    src={course.image}
                    alt={course.title}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-bold text-[#14b8a6] uppercase tracking-widest mb-1">
                    {course.instructor}
                  </p>
                  <h3 className="text-lg font-semibold text-[#F1F5F9] leading-tight mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {course.timeAgo} • {course.details}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Signature CookFlows Timeline */}
      <section className="text-center">
        <p className="text-sm font-bold text-[#38bdf8] uppercase tracking-widest mb-2">
          CookFlows
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-[#F1F5F9] mb-16 tracking-tight">
          Signature CookFlows
        </h2>

        <div className="relative flex flex-col md:flex-row items-start justify-center max-w-5xl mx-auto md:space-x-8 lg:space-x-12 px-6">
          {/* Horizontal connecting line on desktop */}
          <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-[#334155] to-transparent z-0" />

          {/* Item 1 */}
          <div className="relative z-10 flex flex-col items-center w-full md:w-1/3 mb-12 md:mb-0">
            <div className="w-14 h-14 rounded-full bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#38bdf8] mb-6 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Cloud className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#F1F5F9] mb-3">
              The 72-Hour Sourdough
            </h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-[250px]">
              Master the biology of wild yeast. Create the perfect open crumb
              structure using ancient grains.
            </p>
          </div>

          {/* Arrow 1 */}
          <div className="hidden md:flex absolute top-[20px] left-[31%] text-[#64748B]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Item 2 */}
          <div className="relative z-10 flex flex-col items-center w-full md:w-1/3 mb-12 md:mb-0">
            <div className="w-14 h-14 rounded-full bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#D4AF37] mb-6 shadow-[0_0_15px_rgba(132,204,22,0.2)]">
              <Beaker className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#F1F5F9] mb-3">
              The Molecular Bistro
            </h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-[250px]">
              Deconstruct classic French mother sauces into foams, gels, and
              soils for modern plating.
            </p>
          </div>

          {/* Arrow 2 */}
          <div className="hidden md:flex absolute top-[20px] left-[65%] text-[#64748B]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Item 3 */}
          <div className="relative z-10 flex flex-col items-center w-full md:w-1/3">
            <div className="w-14 h-14 rounded-full bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#F59E0B] mb-6 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Scissors className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#F1F5F9] mb-3">
              Nose-to-Tail Workshop
            </h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-[250px]">
              Workshop offers a Nose-to-Tail visioning concepts scentifictional
              value steam together.
            </p>
          </div>
        </div>
      </section>

      {/* Credit Wallet Packs */}
      <section className="text-center pt-8">
        <h2 className="text-3xl md:text-4xl font-serif text-[#F1F5F9] mb-12 tracking-tight">
          Credit Wallet Packs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-8 flex flex-col text-left">
            <h3 className="text-xl font-serif text-[#F1F5F9] text-center mb-2">
              Starter Pack
            </h3>
            <div className="text-center mb-8">
              <span className="text-[#D4AF37] text-4xl font-bold tracking-tight">
                €4.99
              </span>
              <span className="text-[#64748B]"> one-time</span>
            </div>
            <p className="text-sm text-[#94A3B8] mb-8">
              50 credits for unlocking recipes, chef profiles, and premium tools
              at your own pace.
            </p>
            <Link
              to="/app/settings"
              className="w-full py-3 rounded-full border border-[#475569] hover:bg-[#334155] text-[#F1F5F9] font-medium transition-colors text-center block"
            >
              Add Credits
            </Link>
          </div>

          <div className="bg-[#1E293B]/80 border border-[#F59E0B]/30 rounded-3xl p-8 flex flex-col text-left relative transform scale-105 shadow-[0_0_30px_rgba(245,158,11,0.1)] z-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F59E0B] text-[#fff] text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full">
              Most Popular
            </div>
            <h3 className="text-xl font-serif text-[#E2E8F0] text-center mb-2 mt-2">
              Pro Pack
            </h3>
            <div className="text-center mb-8">
              <span className="text-[#F1F5F9] text-5xl font-bold tracking-tight">
                €14.99
              </span>
              <span className="text-[#94A3B8]"> one-time</span>
            </div>
            <p className="text-sm text-[#F1F5F9] mb-8">
              200 credits. Ideal for active learners who unlock multiple
              recipes and planner access.
            </p>
            <Link
              to="/app/settings"
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#14b8a6] hover:from-[#d97706] hover:to-[#ea580c] text-white font-bold transition-colors text-center block"
            >
              Add Credits
            </Link>
          </div>

          <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-8 flex flex-col text-left">
            <h3 className="text-xl font-serif text-[#F1F5F9] text-center mb-2">
              Studio Pack
            </h3>
            <div className="text-center mb-8">
              <span className="text-[#38bdf8] text-4xl font-bold tracking-tight">
                €29.99
              </span>
              <span className="text-[#64748B]"> one-time</span>
            </div>
            <p className="text-sm text-[#94A3B8] mb-8">
              500 credits for heavy usage, experimentation, and long-term
              unlock flexibility.
            </p>
            <Link
              to="/app/settings"
              className="w-full py-3 rounded-full border border-[#475569] hover:bg-[#334155] text-[#F1F5F9] font-medium transition-colors text-center block"
            >
              Add Credits
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
