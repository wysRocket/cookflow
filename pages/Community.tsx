import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Plus,
  TrendingUp,
  Users,
  Star,
  X,
  Image,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { loadUserAppData, saveUserAppData } from "../lib/user-app-data";

interface Post {
  id: number;
  author: string;
  avatar: string;
  role: string;
  time: string;
  content: string;
  image?: string;
  tags: string[];
  likes: number;
  comments: number;
  liked: boolean;
  bookmarked: boolean;
}

const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    author: "Chef Julian Vane",
    avatar:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=100&q=80",
    role: "Chef de Partie",
    time: "2h ago",
    content:
      "Just finished a 3-hour session on spherification. The key insight most people miss: the ratio of sodium alginate to liquid matters more than the calcium bath concentration. Getting it right changes everything about mouthfeel.",
    tags: ["Molecular", "Technique"],
    likes: 142,
    comments: 34,
    liked: false,
    bookmarked: false,
  },
  {
    id: 2,
    author: "Marco P.",
    avatar: "https://i.pravatar.cc/150?img=11",
    role: "Student · Level 4",
    time: "4h ago",
    content:
      "Made the Honey Glazed Salmon from the CookFlow library for the third time this week. Finally nailed the sear — the trick is getting the pan MUCH hotter than you think you need. The skin crackles like a potato chip now.",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    tags: ["Seafood", "Win"],
    likes: 89,
    comments: 17,
    liked: true,
    bookmarked: false,
  },
  {
    id: 3,
    author: "Chef Amina Bensalem",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    role: "Pastry Specialist",
    time: "6h ago",
    content:
      "A question I get constantly: why does my choux pastry collapse? Nine times out of ten it's opened too early. Wait until the shells are completely set and dry before you open the oven. Patience is the real ingredient.",
    tags: ["Pastry", "Tips"],
    likes: 215,
    comments: 52,
    liked: false,
    bookmarked: true,
  },
  {
    id: 4,
    author: "Sarah M.",
    avatar: "https://i.pravatar.cc/150?img=5",
    role: "Student · Level 2",
    time: "Yesterday",
    content:
      "Completed my first week of the Knife Skills course. My julienne went from embarrassing to actually presentable. Still slow, but consistent. Anyone have tips for building speed without sacrificing accuracy?",
    tags: ["Knife Skills", "Question"],
    likes: 43,
    comments: 28,
    liked: false,
    bookmarked: false,
  },
  {
    id: 5,
    author: "Chef Kenji N.",
    avatar:
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=100&q=80",
    role: "Executive Chef",
    time: "Yesterday",
    content:
      "The secret to a great tonkotsu broth is 18 hours minimum, constant rolling boil. Most recipes lie about this. The collagen won't break down properly at a gentle simmer and you'll get watery broth. Commit to the boil.",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    tags: ["Japanese", "Ramen"],
    likes: 318,
    comments: 76,
    liked: false,
    bookmarked: false,
  },
];

const TABS = ["All", "Following", "Trending", "Questions"] as const;
type Tab = (typeof TABS)[number];

const TRENDING_TAGS = [
  "Knife Skills",
  "Pastry",
  "Japanese",
  "Molecular",
  "Fermentation",
];

const FEATURED_CHEFS = [
  {
    id: 1,
    name: "Chef Julian Vane",
    role: "Molecular Gastronomy",
    avatar:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=100&q=80",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Chef Amina B.",
    role: "Modern Pastry",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Chef Kenji N.",
    role: "Japanese Kaiseki",
    avatar:
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=100&q=80",
    rating: 4.8,
  },
];

function normalizePost(value: unknown): Post | null {
  if (!value || typeof value !== "object") return null;
  const post = value as Partial<Post>;
  const id = Number(post.id);
  const likes = Number(post.likes);
  const comments = Number(post.comments);
  if (
    !Number.isFinite(id) ||
    typeof post.author !== "string" ||
    typeof post.avatar !== "string" ||
    typeof post.role !== "string" ||
    typeof post.time !== "string" ||
    typeof post.content !== "string"
  ) {
    return null;
  }
  const tags = Array.isArray(post.tags)
    ? post.tags
        .map((tag) => String(tag).trim())
        .filter((tag) => tag.length > 0)
    : [];
  return {
    id: Math.round(id),
    author: post.author,
    avatar: post.avatar,
    role: post.role,
    time: post.time,
    content: post.content,
    image: typeof post.image === "string" ? post.image : undefined,
    tags,
    likes: Number.isFinite(likes) ? Math.max(0, Math.round(likes)) : 0,
    comments: Number.isFinite(comments) ? Math.max(0, Math.round(comments)) : 0,
    liked: Boolean(post.liked),
    bookmarked: Boolean(post.bookmarked),
  };
}

function normalizePosts(value: unknown): Post[] {
  if (!Array.isArray(value)) return INITIAL_POSTS;
  const normalized = value
    .map((item) => normalizePost(item))
    .filter((item): item is Post => item !== null);
  return normalized.length > 0 ? normalized : INITIAL_POSTS;
}

const Community: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [shareToast, setShareToast] = useState<number | null>(null);
  const hydratedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    hydratedRef.current = false;

    const loadCommunityState = async () => {
      if (!user) {
        hydratedRef.current = true;
        return;
      }
      try {
        const saved = await loadUserAppData<{ posts?: unknown }>(
          user.uid,
          "community",
        );
        if (cancelled) return;
        if (saved?.posts) setPosts(normalizePosts(saved.posts));
      } catch (error) {
        console.error("Failed to load community state", error);
      } finally {
        if (!cancelled) hydratedRef.current = true;
      }
    };

    void loadCommunityState();
    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    if (!user || !hydratedRef.current) return;
    const timer = window.setTimeout(() => {
      void saveUserAppData(user.uid, "community", { posts }).catch((error) => {
        console.error("Failed to save community state", error);
      });
    }, 400);
    return () => window.clearTimeout(timer);
  }, [posts, user]);

  const handleNewPostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;
    const tags = newTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const post: Post = {
      id: Date.now(),
      author: "You",
      avatar: "https://i.pravatar.cc/150?img=33",
      role: "Brigade Member",
      time: "Just now",
      content: newContent.trim(),
      tags: tags.length ? tags : ["General"],
      likes: 0,
      comments: 0,
      liked: false,
      bookmarked: false,
    };
    setPosts((prev) => [post, ...prev]);
    setNewContent("");
    setNewTags("");
    setShowNewPost(false);
  };

  const handleTagClick = (tag: string) => {
    setTagFilter((prev) => (prev === tag ? null : tag));
    setActiveTab("All");
  };

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id !== id
          ? p
          : {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            },
      ),
    );
  };

  const toggleBookmark = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id !== id ? p : { ...p, bookmarked: !p.bookmarked })),
    );
  };

  const trendingTopics = TRENDING_TAGS.map((tag) => ({
    tag,
    count: posts.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
    ).length,
  }));

  const displayed = (() => {
    let result =
      activeTab === "Questions"
        ? posts.filter((p) => p.tags.includes("Question"))
        : activeTab === "Trending"
          ? [...posts].sort((a, b) => b.likes - a.likes)
          : posts;
    if (tagFilter) {
      result = result.filter((p) =>
        p.tags.some((t) => t.toLowerCase() === tagFilter.toLowerCase()),
      );
    }
    return result;
  })();

  return (
    <div className="space-y-6">
      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#1E293B] border border-[#334155] rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-[#334155]">
              <h2 className="text-lg font-bold text-[#F1F5F9]">New Post</h2>
              <button
                onClick={() => setShowNewPost(false)}
                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#F1F5F9] hover:bg-[#334155] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleNewPostSubmit} className="p-5 space-y-4">
              <textarea
                autoFocus
                rows={5}
                placeholder="Share a technique, ask a question, or celebrate a kitchen win..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full bg-[#0F172A] border border-[#334155] rounded-xl p-3 text-sm text-[#CBD5E1] placeholder-[#475569] resize-none focus:outline-none focus:border-[#14b8a6] transition-colors"
              />
              <div>
                <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-1.5">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pastry, Tips, Question"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full bg-[#0F172A] border border-[#334155] rounded-xl px-3 py-2 text-sm text-[#CBD5E1] placeholder-[#475569] focus:outline-none focus:border-[#14b8a6] transition-colors"
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  className="flex items-center gap-2 text-[#64748B] hover:text-[#94A3B8] text-sm transition-colors"
                >
                  <Image className="w-4 h-4" /> Add Photo
                </button>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNewPost(false)}
                    className="px-4 py-2 rounded-full text-sm text-[#94A3B8] border border-[#334155] hover:border-[#94A3B8] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!newContent.trim()}
                    className="px-5 py-2 rounded-full text-sm font-bold bg-[#14b8a6] text-white hover:bg-[#0d9488] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#F1F5F9] tracking-tight">
            The Brigade
          </h1>
          <p className="text-[#94A3B8] mt-1">
            Share techniques, ask questions, celebrate wins
          </p>
        </div>
        <button
          onClick={() => setShowNewPost(true)}
          className="flex items-center gap-2 bg-[#14b8a6] text-white text-sm font-bold px-4 py-2.5 rounded-full hover:bg-[#0d9488] transition-colors shadow-lg shadow-teal-900/30 flex-shrink-0"
        >
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {/* Active tag filter pill */}
      {tagFilter && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#94A3B8]">Filtering by:</span>
          <button
            onClick={() => setTagFilter(null)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14b8a6]/20 border border-[#14b8a6]/40 text-[#14b8a6] text-xs font-semibold hover:bg-[#14b8a6]/30 transition-colors"
          >
            #{tagFilter} <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 pb-0.5">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setTagFilter(null);
            }}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-[#14b8a6] text-white"
                : "bg-[#1E293B] text-[#94A3B8] border border-[#334155] hover:border-[#14b8a6]/50 hover:text-[#F1F5F9]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6">
        {/* Feed */}
        <div className="flex-1 space-y-4 min-w-0">
          {displayed.map((post) => (
            <div
              key={post.id}
              className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 space-y-4"
            >
              {/* Author row */}
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  loading="lazy"
                  className="w-10 h-10 rounded-full border border-[#334155] object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#F1F5F9] truncate">
                    {post.author}
                  </p>
                  <p className="text-xs text-[#64748B]">
                    {post.role} · {post.time}
                  </p>
                </div>
              </div>

              {/* Content */}
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                {post.content}
              </p>

              {/* Image */}
              {post.image && (
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={post.image}
                    alt="Post"
                    loading="lazy"
                    className="w-full h-52 object-cover"
                  />
                </div>
              )}

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {post.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`text-[10px] font-semibold px-2.5 py-1 border rounded-full transition-colors ${
                      tagFilter === tag
                        ? "bg-[#14b8a6]/20 border-[#14b8a6]/60 text-[#14b8a6]"
                        : "bg-[#0F172A] border-[#334155] text-[#64748B] hover:border-[#14b8a6]/40 hover:text-[#94A3B8]"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 pt-1 border-t border-[#334155]">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-colors ${
                    post.liked
                      ? "text-red-400 bg-red-400/10"
                      : "text-[#64748B] hover:text-red-400 hover:bg-red-400/10"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${post.liked ? "fill-red-400" : ""}`}
                  />
                  {post.likes}
                </button>
                <button
                  onClick={() => alert("Comments section coming soon!")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-[#64748B] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  {post.comments}
                </button>
                <button
                  onClick={() => alert("Share feature coming soon!")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-[#64748B] hover:text-[#F1F5F9] hover:bg-[#334155] transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleBookmark(post.id)}
                  className={`ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-colors ${
                    post.bookmarked
                      ? "text-[#14b8a6] bg-[#14b8a6]/10"
                      : "text-[#64748B] hover:text-[#14b8a6] hover:bg-[#14b8a6]/10"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${post.bookmarked ? "fill-[#14b8a6]" : ""}`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="hidden lg:flex flex-col gap-4 w-64 flex-shrink-0">
          {/* Featured Chefs */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-[#14b8a6]" />
              <h3 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-widest">
                Featured Chefs
              </h3>
            </div>
            <div className="space-y-3">
              {FEATURED_CHEFS.map((chef, i) => (
                <Link
                  key={i}
                  to={`/app/chef/${chef.id}`}
                  className="flex items-center gap-3 group"
                >
                  <img
                    src={chef.avatar}
                    alt={chef.name}
                    loading="lazy"
                    className="w-9 h-9 rounded-full border border-[#334155] object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#F1F5F9] truncate group-hover:text-[#D4AF37] transition-colors">
                      {chef.name}
                    </p>
                    <p className="text-[10px] text-[#64748B] truncate">
                      {chef.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 text-[10px] text-amber-400 flex-shrink-0">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {chef.rating}
                  </div>
                </Link>
              ))}
            </div>
            <Link
              to="/app/chefs"
              className="block mt-3 pt-3 border-t border-[#334155] text-xs font-bold text-[#D4AF37] hover:text-[#c9a227] transition-colors text-center"
            >
              View all chefs
            </Link>
          </div>

          {/* Trending Topics */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="text-xs font-bold text-[#F1F5F9] uppercase tracking-widest">
                Trending
              </h3>
            </div>
            <div className="space-y-2">
              {trendingTopics.map((topic) => (
                <button
                  key={topic.tag}
                  onClick={() => handleTagClick(topic.tag)}
                  className={`w-full flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors ${
                    tagFilter === topic.tag
                      ? "bg-[#14b8a6]/10 text-[#14b8a6]"
                      : "hover:bg-[#334155]/50 text-[#CBD5E1]"
                  }`}
                >
                  <span className="text-sm font-medium">#{topic.tag}</span>
                  <span className="text-xs text-[#64748B]">
                    {topic.count} posts
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
