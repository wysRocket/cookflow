import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  MapPin,
  Utensils,
  Award,
  MessageSquare,
  Star,
  ArrowRight,
  Grid,
  List,
  Droplets,
  Scissors,
  Cake,
  Flame,
  FlaskConical,
  Bell,
  UserPlus,
  Users,
} from "lucide-react";

const showcaseSkills = [
  { icon: <Droplets className="w-4 h-4" />, name: "Saucier Level 3" },
  { icon: <Scissors className="w-4 h-4" />, name: "Knife Skills Master" },
  { icon: <Cake className="w-4 h-4" />, name: "Pastry Arts" },
  { icon: <Flame className="w-4 h-4" />, name: "Sous Vide" },
  { icon: <FlaskConical className="w-4 h-4" />, name: "Fermentation" },
];

const creations = [
  {
    id: 1,
    title: "Wild Truffle Risotto",
    desc: "A creamy arborio rice dish finished with aged parmesan...",
    time: "45m",
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Pan-Seared Duck Breast",
    desc: "Crispy skin duck breast served with a red wine reduction an...",
    time: "1h 20m",
    rating: 4.9,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1627582236894-6d9bfe65d064?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Deconstructed Lemon Tart",
    desc: "A modern take on the classic, featuring yuzu curd, meringu...",
    time: "2h",
    rating: 4.7,
    reviews: 56,
    image:
      "https://images.unsplash.com/photo-1514309401768-45eacdeec7ce?auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "A5 Wagyu & Chimichurri",
    desc: "Simple preparation letting the premium beef shine,...",
    time: "15m",
    rating: 4.9,
    reviews: 210,
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80",
  },
];

const connections = [
  {
    name: "Chef Marco P.",
    status: "Following",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Julia Childers",
    status: "Follow Back",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Gordon R.",
    status: "Following",
    avatar: "https://i.pravatar.cc/150?img=68",
  },
];

type ChefData = {
  name: string;
  title: string;
  city: string;
  cuisine: string;
  bio: string;
  banner: string;
  avatar: string;
  featuredRecipeId: number;
};

const chefProfiles: Record<string, ChefData> = {
  "1": {
    name: "Chef Julian Vane",
    title: "CHEF DE PARTIE",
    city: "San Francisco, CA",
    cuisine: "Molecular Gastronomy & Comfort Food",
    bio: '"Exploring the intersection of molecular gastronomy and comfort food. Obsessed with sustainable sourcing and perfect plating."',
    banner:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80",
    avatar:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80",
    featuredRecipeId: 1,
  },
  "2": {
    name: "Chef Marco Pellegrini",
    title: "SOUS CHEF",
    city: "Milan, IT",
    cuisine: "Northern Italian Cuisine",
    bio: '"Focused on balancing rustic traditions with contemporary plating and ingredient seasonality."',
    banner:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80",
    avatar:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80",
    featuredRecipeId: 4,
  },
  "3": {
    name: "Chef Amina Bensalem",
    title: "PASTRY SPECIALIST",
    city: "Paris, FR",
    cuisine: "Modern Pastry & Plated Desserts",
    bio: '"I break down advanced pastry science into repeatable kitchen rituals for ambitious home cooks."',
    banner:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    featuredRecipeId: 6,
  },
};

const ChefProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const profile = id ? chefProfiles[id] : undefined;

  if (!profile) {
    return <Navigate to="/app/chefs" replace />;
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="h-48 md:h-64 rounded-xl overflow-hidden relative">
        <img
          src={profile.banner}
          alt="Kitchen Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent" />
      </div>

      {/* Profile Info block */}
      <div className="relative px-4 sm:px-8 -mt-20 md:-mt-24 mb-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#0F172A] overflow-hidden flex-shrink-0 relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-[#D4AF37] border-2 border-[#0F172A] rounded-full" />
          </div>

          <div className="flex-1 pt-2 md:pt-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-serif text-[#F1F5F9]">
                  {profile.name}
                </h1>
                <span className="flex items-center gap-1 bg-[#14b8a6]/20 text-[#14b8a6] border border-[#14b8a6]/50 px-2 py-0.5 rounded text-xs font-bold tracking-wider">
                  <Star className="w-3 h-3 fill-current" /> {profile.title}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-[#94A3B8] mb-4 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> {profile.city}
                </span>
                <span className="flex items-center gap-1.5">
                  <Utensils className="w-4 h-4" /> {profile.cuisine}
                </span>
              </div>

              <p className="text-[#94A3B8] italic text-sm leading-relaxed max-w-2xl">
                {profile.bio}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-[#14b8a6] hover:bg-[#0d9488] text-white font-bold rounded-full transition-colors shadow-lg shadow-teal-900/30">
                <UserPlus className="w-4 h-4 hidden sm:block" /> Follow
              </button>
              <Link
                to="/app/community"
                className="flex items-center gap-2 px-6 py-2.5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-bold rounded-full transition-colors"
              >
                <MessageSquare className="w-4 h-4" /> Message
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Culinary Showcase */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2 text-[#F1F5F9]">
                <Award className="w-5 h-5 text-[#14b8a6]" /> Culinary Showcase
              </h2>
              <button className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest hover:text-[#c9a227] transition-colors">
                View All Skills
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {showcaseSkills.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0F172A] border border-[#334155] rounded-full text-sm text-[#F1F5F9]"
                >
                  <span className="text-[#14b8a6]">{skill.icon}</span>
                  {skill.name}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Culinary Creations */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif text-[#F1F5F9]">
                Recent Culinary Creations
              </h2>
              <div className="flex items-center gap-2 bg-[#1E293B] border border-[#334155] rounded-lg p-1">
                <button className="p-1.5 bg-[#334155] text-white rounded shadow text-[#F1F5F9]">
                  <Grid className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-[#64748B] hover:text-[#F1F5F9]">
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {creations.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden group shadow-lg"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-[#1E293B]/80 backdrop-blur text-[#14b8a6] text-xs font-bold px-2.5 py-1 rounded flex items-center gap-1 border border-[#334155]">
                      <Flame className="w-3 h-3" /> {item.time}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#F1F5F9] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#94A3B8] line-clamp-2 mb-4">
                      {item.desc}
                    </p>
                    <div className="flex items-center justify-between border-t border-[#334155] pt-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-[#64748B] text-xs ml-1">
                          ({item.reviews})
                        </span>
                      </div>
                      <Link
                        to={`/app/recipes/${profile.featuredRecipeId}`}
                        className="text-xs font-bold text-[#D4AF37] hover:text-[#c9a227] flex items-center gap-1 transition-colors uppercase tracking-widest"
                      >
                        Recipe <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">
          {/* Chef Stats */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-serif text-[#F1F5F9] mb-6">
              Chef Stats
            </h2>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#0F172A] border border-[#334155] flex items-center justify-center text-[#14b8a6]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#64748B] font-bold">
                    Courses Completed
                  </p>
                  <p className="text-xl font-bold text-[#F1F5F9]">42</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#0F172A] border border-[#334155] flex items-center justify-center text-[#D4AF37]">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#64748B] font-bold">
                    Active Streak
                  </p>
                  <p className="text-xl font-bold text-[#F1F5F9]">15 Days</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#0F172A] border border-[#334155] flex items-center justify-center text-[#3B82F6]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#64748B] font-bold">
                    Community Rank
                  </p>
                  <p className="text-xl font-bold text-[#F1F5F9]">Top 5%</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#F1F5F9] font-medium">
                  Next Level: Sous Chef
                </span>
                <span className="text-[#14b8a6] font-bold">
                  2,450 / 3,000 XP
                </span>
              </div>
              <div className="h-2 w-full bg-[#0F172A] rounded-full overflow-hidden border border-[#334155]">
                <div
                  className="h-full bg-gradient-to-r from-[#14b8a6] to-[#D4AF37] rounded-full"
                  style={{ width: "82%" }}
                />
              </div>
            </div>
          </div>

          {/* Coming Soon Teaser */}
          <div className="relative rounded-xl overflow-hidden border border-[#334155] group cursor-pointer shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80"
              alt="Mastering Modern Sauces"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-5 flex flex-col justify-end">
              <span className="w-fit bg-[#14b8a6] text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded mb-2">
                Coming Soon
              </span>
              <h3 className="font-bold text-[#F1F5F9] text-base mb-1 leading-tight">
                Mastering Modern Sauces
              </h3>
              <p className="text-xs text-[#94A3B8] mb-3 line-clamp-2">
                Join Chef Julian for an exclusive 4-week deep dive.
              </p>
              <Link
                to="/app/courses"
                className="flex items-center gap-2 text-xs font-bold text-[#F1F5F9] hover:text-[#D4AF37] transition-colors"
              >
                Notify Me <Bell className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Connections */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 shadow-lg">
            <h2 className="text-sm font-bold text-[#94A3B8] uppercase tracking-widest mb-6 border-b border-[#334155] pb-2">
              Connections
            </h2>
            <div className="space-y-4">
              {connections.map((person, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-8 h-8 rounded-full border border-[#334155]"
                    />
                    <span className="text-sm font-medium text-[#F1F5F9]">
                      {person.name}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-widest font-bold ${person.status === "Following" ? "text-[#64748B]" : "text-[#D4AF37]"}`}
                  >
                    {person.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 border border-[#334155] hover:bg-[#334155] text-xs font-bold text-[#94A3B8] hover:text-[#F1F5F9] rounded transition-colors">
              View All Connections
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefProfile;
