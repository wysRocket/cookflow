import { AcademyModule, Ritual, Testimonial, Recipe, Chef } from "./types";

export const academyModules: AcademyModule[] = [
  {
    id: "1",
    city: "Paris",
    focus: "Modern Pastry",
    image:
      "https://images.unsplash.com/photo-1579372786545-d24232daf58c?q=80&w=1200",
    level: "Elite",
    lessons: 12,
    price: 49,
    technique: "Lamination & Tempering",
    scientificPrinciple:
      "Fat crystals in butter create steam pockets during baking, physically lifting the dough layers.",
  },
  {
    id: "2",
    city: "Rome",
    focus: "Artisan Pasta",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200",
    level: "Advanced",
    lessons: 10,
    price: 55,
    technique: "Hydration Control",
    scientificPrinciple:
      "Protein networks in flour (gluten) align to trap starch granules, creating the perfect al dente bite.",
  },
  {
    id: "3",
    city: "San Sebastián",
    focus: "Molecular Tapas",
    image:
      "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?q=80&w=1200",
    level: "Elite",
    lessons: 15,
    price: 79,
    technique: "Spherification",
    scientificPrinciple:
      "Sodium alginate cross-links with calcium ions to form a gel membrane around liquid centers.",
  },
  {
    id: "4",
    city: "Copenhagen",
    focus: "New Nordic Fermentation",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    level: "Advanced",
    lessons: 8,
    price: 45,
    technique: "Koji Cultivation",
    scientificPrinciple:
      "Microbial enzymes break down complex starches into sugars and lactic acid, creating umami depth.",
  },
  {
    id: "5",
    city: "Marseille",
    focus: "Seafood Butchery",
    image:
      "https://images.unsplash.com/photo-1534080564583-6be75777b70a?q=80&w=1200",
    level: "Elite",
    lessons: 14,
    price: 65,
    technique: "Dry Aging Fish",
    scientificPrinciple:
      "Controlled enzymatic breakdown of proteins improves texture and concentrates flavor compounds.",
  },
  {
    id: "6",
    city: "Bordeaux",
    focus: "Oenology & Pairing",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1200",
    level: "Advanced",
    lessons: 6,
    price: 39,
    technique: "Sensory Analysis",
    scientificPrinciple:
      "Tannins bind to salivary proteins, creating astringency that cuts through rich fats.",
  },
  {
    id: "7",
    city: "Berlin",
    focus: "Plant-Based Molecular",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200",
    level: "Advanced",
    lessons: 11,
    price: 44,
    technique: "Vegetable Charcuterie",
    scientificPrinciple:
      "Hydrocolloids mimic the binding properties of animal gelatin to create elastic vegetable textures.",
  },
  {
    id: "8",
    city: "Lyon",
    focus: "The New Mother Sauces",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200",
    level: "Elite",
    lessons: 18,
    price: 89,
    technique: "Cryo-Concentration",
    scientificPrinciple:
      "Freezing removes water as ice crystals, leaving a hyper-concentrated, non-reduced flavor essence.",
  },
  {
    id: "9",
    city: "Vienna",
    focus: "Architectural Desserts",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200",
    level: "Advanced",
    lessons: 9,
    price: 52,
    technique: "Sugar Blowing",
    scientificPrinciple:
      "Isomalt stays stable at high temperatures, allowing sugar structures to defy gravity without crystallizing.",
  },
  {
    id: "10",
    city: "Tokyo",
    focus: "Japanese Knife Mastery",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1200",
    level: "Elite",
    lessons: 16,
    price: 95,
    technique: "Katsuramuki & Hiki-giri",
    scientificPrinciple:
      "A scalpel-thin blade edge reduces cell rupture on the cut surface, preserving volatile aromatics and delaying oxidation.",
  },
  {
    id: "11",
    city: "Istanbul",
    focus: "Meze & Live-Fire Cooking",
    image:
      "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?q=80&w=1200",
    level: "Advanced",
    lessons: 10,
    price: 48,
    technique: "Mangal Grilling",
    scientificPrinciple:
      "Radiant heat from charcoal generates Maillard compounds 3× faster than convection, creating complex crust flavors without steaming.",
  },
  {
    id: "12",
    city: "Marrakech",
    focus: "Spice Alchemy",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200",
    level: "Advanced",
    lessons: 8,
    price: 42,
    technique: "Bloom & Layering",
    scientificPrinciple:
      "Fat-soluble aromatic compounds in whole spices release up to 70% more flavor when briefly heated in oil before any liquid is added.",
  },
  {
    id: "13",
    city: "Mexico City",
    focus: "Mole & Masa",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1200",
    level: "Elite",
    lessons: 14,
    price: 72,
    technique: "Nixtamalization",
    scientificPrinciple:
      "Alkaline treatment with calcium hydroxide cleaves the pericarp and unlocks niacin, transforming corn from staple to nutritionally complete flour.",
  },
  {
    id: "14",
    city: "Shanghai",
    focus: "Dim Sum Architecture",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1200",
    level: "Advanced",
    lessons: 12,
    price: 58,
    technique: "Pleating & Steam Pressure",
    scientificPrinciple:
      "Closed pleats seal broth inside the dumpling; steam pressure forces gelatinized stock to liquefy mid-bite, creating the xiaolongbao 'soup' effect.",
  },
  {
    id: "15",
    city: "Lima",
    focus: "Ceviche & Citrus Chemistry",
    image:
      "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?q=80&w=1200",
    level: "Elite",
    lessons: 11,
    price: 67,
    technique: "Leche de Tigre Emulsion",
    scientificPrinciple:
      "Citric acid denatures proteins at room temperature (cold cook), while protease enzymes in the fish continue to tenderize the flesh.",
  },
  {
    id: "16",
    city: "Bangkok",
    focus: "Thai Curry Science",
    image:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=1200",
    level: "Advanced",
    lessons: 9,
    price: 46,
    technique: "Paste Frying & Coconut Cracking",
    scientificPrinciple:
      "Simmering coconut cream until the oil separates creates a frying medium that reaches 180 °C — impossible in whole coconut milk — for true paste caramelization.",
  },
  {
    id: "17",
    city: "Oaxaca",
    focus: "Smoke & Char Mastery",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200",
    level: "Elite",
    lessons: 13,
    price: 81,
    technique: "Palenque Mezcal Smoking",
    scientificPrinciple:
      "Phenolic compounds from burning agave fibres coat the protein surface, inhibiting bacterial growth while depositing guaiacol — the chemical signature of authentic smoke flavor.",
  },
];

export const signatureRituals: Ritual[] = [
  {
    id: "r1",
    title: "The 72-Hour Sourdough",
    duration: "3 Days",
    description:
      "Master the biology of wild yeast. Create the perfect open crumb structure using ancient grains.",
    tags: ["Baking", "Science"],
  },
  {
    id: "r2",
    title: "The Molecular Bistro",
    duration: "4 Hours",
    description:
      "Deconstruct classic French mother sauces into foams, gels, and soils for modern plating.",
    tags: ["Modernist", "Texture"],
  },
  {
    id: "r3",
    title: "Nose-to-Tail Workshop",
    duration: "1 Week",
    description:
      "A respect-driven course on utilizing every part of the animal. From pâté to bone broth.",
    tags: ["Sustainability", "Butchery"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Elena Rossi",
    role: "Sous Chef",
    location: "Milan",
    quote:
      "CookFlow bridged the gap between my home kitchen and the professional line. The science tips are invaluable.",
  },
  {
    id: "t2",
    name: "Marcus Thorne",
    role: "Restaurateur",
    location: "London",
    quote:
      "Visually stunning and technically rigorous. The fermentation module alone changed our menu.",
  },
  {
    id: "t3",
    name: "Sophie Dubois",
    role: "Food Stylist",
    location: "Lyon",
    quote:
      "It’s not just recipes; it’s an aesthetic education. My plating improved overnight.",
  },
];

export const chefs: Chef[] = [
  {
    id: 1,
    name: "Chef Julian Vane",
    title: "CHEF DE PARTIE",
    city: "San Francisco, CA",
    focus: "Molecular Gastronomy",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    students: 3240,
    courses: 12,
    tags: ["Molecular", "Modern"],
    cuisine: "Molecular Gastronomy & Comfort Food",
    bio: '"Exploring the intersection of molecular gastronomy and comfort food. Obsessed with sustainable sourcing and perfect plating."',
    banner:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80",
    avatar:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80",
    featuredRecipeId: 1,
    creations: [1, 2, 13, 14, 25],
  },
  {
    id: 2,
    name: "Chef Marco Pellegrini",
    title: "SOUS CHEF",
    city: "Milan, IT",
    focus: "Northern Italian Cuisine",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    students: 2890,
    courses: 9,
    tags: ["Italian", "Pasta"],
    cuisine: "Northern Italian Cuisine",
    bio: '"Focused on balancing rustic traditions with contemporary plating and ingredient seasonality."',
    banner:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80",
    avatar:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80",
    featuredRecipeId: 9,
    creations: [5, 9, 12, 15, 26],
  },
  {
    id: 3,
    name: "Chef Amina Bensalem",
    title: "PASTRY SPECIALIST",
    city: "Paris, FR",
    focus: "Modern Pastry & Plated Desserts",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    students: 4110,
    courses: 14,
    tags: ["Pastry", "Desserts"],
    cuisine: "Modern Pastry & Plated Desserts",
    bio: '"I break down advanced pastry science into repeatable kitchen rituals for ambitious home cooks."',
    banner:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    featuredRecipeId: 6,
    creations: [6, 7, 10, 16, 27],
  },
  {
    id: 4,
    name: "Chef Kenji Nakamura",
    title: "EXECUTIVE CHEF",
    city: "Tokyo, JP",
    focus: "Japanese Kaiseki & Ramen",
    image:
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    students: 5620,
    courses: 18,
    tags: ["Japanese", "Ramen"],
    cuisine: "Japanese Kaiseki & Traditional Noodles",
    bio: '"Decades of precision and respect for ingredients goes into every single bowl. Simplicity is the ultimate sophistication."',
    banner:
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80",
    featuredRecipeId: 4,
    creations: [4, 11, 17, 18, 28],
  },
  {
    id: 5,
    name: "Chef Sofia Reyes",
    title: "HEAD CHEF",
    city: "Mexico City, MX",
    focus: "Modern Mexican & Street Food",
    image:
      "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    students: 2150,
    courses: 7,
    tags: ["Mexican", "Street Food"],
    cuisine: "Modern Mexican & Street Food",
    bio: '"Taking the vibrant, bold flavors of my grandmother\'s kitchen and elevating them for the modern palate."',
    banner:
      "https://images.unsplash.com/photo-1546069901-ec46c77ba130?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80",
    featuredRecipeId: 8,
    creations: [3, 8, 19, 20, 29],
  },
  {
    id: 6,
    name: "Chef Luca Ferrara",
    title: "GRILL MASTER",
    city: "Florence, IT",
    focus: "Fire Cooking & Whole Animal",
    image:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    students: 1780,
    courses: 6,
    tags: ["Grill", "Butchery"],
    cuisine: "Fire Cooking & Whole Animal Butchery",
    bio: '"Reconnecting with the primal origins of cooking. If it involves smoke, char, and high heat, I want to teach it to you."',
    banner:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&q=80",
    featuredRecipeId: 21,
    creations: [21, 22, 23, 24, 30],
  },
  {
    id: 7,
    name: "Chef Eleni Stavros",
    title: "CULINARY INSTRUCTOR",
    city: "Athens, GR",
    focus: "Modern Greek Home Cooking",
    image:
      "https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    students: 1980,
    courses: 8,
    tags: ["Greek", "One Pot"],
    cuisine: "Modern Greek Home Cooking",
    bio: '"I teach bright Mediterranean cooking with practical methods for everyday kitchens and family tables."',
    banner:
      "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&q=80",
    featuredRecipeId: 47,
    creations: [31, 34, 39, 43, 47],
  },
  {
    id: 8,
    name: "Chef Noura Haddad",
    title: "SOUS CHEF",
    city: "Beirut, LB",
    focus: "Levantine Street Classics",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    students: 2435,
    courses: 9,
    tags: ["Levantine", "Street Food"],
    cuisine: "Levantine Street Classics",
    bio: '"From shawarma to mezze, I focus on bold seasoning, balance, and techniques that scale from weeknight to feast."',
    banner:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80",
    featuredRecipeId: 33,
    creations: [8, 20, 29, 33, 45],
  },
  {
    id: 9,
    name: "Chef Min-Jae Park",
    title: "EXECUTIVE CHEF",
    city: "Seoul, KR",
    focus: "Korean Comfort Bowls",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    students: 3870,
    courses: 13,
    tags: ["Korean", "Bowls"],
    cuisine: "Korean Comfort & Fermentation",
    bio: '"Great Korean food is about contrast: spice, sweetness, umami, and texture in the same bite."',
    banner:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
    featuredRecipeId: 42,
    creations: [11, 18, 32, 40, 42],
  },
  {
    id: 10,
    name: "Chef Priya Raman",
    title: "HEAD CHEF",
    city: "Bengaluru, IN",
    focus: "Vegetarian Indian Regional",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    students: 3320,
    courses: 11,
    tags: ["Indian", "Vegetarian"],
    cuisine: "Vegetarian Indian Regional",
    bio: '"I build layered flavor with spices and timing, proving vegetarian cooking can be deeply satisfying and technical."',
    banner:
      "https://images.unsplash.com/photo-1596797038530-2c107aa6b0c5?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80",
    featuredRecipeId: 48,
    creations: [7, 16, 27, 45, 48],
  },
  {
    id: 11,
    name: "Chef Mateo Alvarez",
    title: "GRILL SPECIALIST",
    city: "Barcelona, ES",
    focus: "Seafood Fire Cooking",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    students: 2140,
    courses: 7,
    tags: ["Seafood", "Grill"],
    cuisine: "Iberian Seafood Fire Cooking",
    bio: '"Open flame, clean marinades, and precise timing are my foundations for unforgettable seafood."',
    banner:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    featuredRecipeId: 38,
    creations: [1, 17, 28, 38, 49],
  },
  {
    id: 12,
    name: "Chef Amelia Hart",
    title: "PASTRY SPECIALIST",
    city: "London, UK",
    focus: "Modern Bakery Classics",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    students: 4595,
    courses: 15,
    tags: ["Pastry", "Baking"],
    cuisine: "Modern Bakery & Brunch Pastry",
    bio: '"I translate bakery-level pastry into clear systems so home bakers can get reliable, repeatable results."',
    banner:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    featuredRecipeId: 50,
    creations: [6, 10, 31, 36, 50],
  },
  {
    id: 13,
    name: "Chef Theo Brennan",
    title: "SOUS CHEF",
    city: "Dublin, IE",
    focus: "Comfort Food Reinvented",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    students: 1760,
    courses: 6,
    tags: ["Comfort", "Meal Prep"],
    cuisine: "Contemporary Comfort Food",
    bio: '"I modernize comfort staples with cleaner prep, smarter batch cooking, and big flavor."',
    banner:
      "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    featuredRecipeId: 40,
    creations: [14, 22, 30, 37, 40],
  },
  {
    id: 14,
    name: "Chef Claire Dubreuil",
    title: "CHEF DE PARTIE",
    city: "Lyon, FR",
    focus: "French Bistro Classics",
    image:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    students: 2680,
    courses: 10,
    tags: ["French", "Bistro"],
    cuisine: "French Bistro & Seasonal Cooking",
    bio: '"Technique first, but never at the expense of generosity. I teach classic foundations that hold up in real kitchens."',
    banner:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&q=80",
    featuredRecipeId: 49,
    creations: [9, 12, 26, 43, 49],
  },
  {
    id: 15,
    name: "Chef Diego Morales",
    title: "HEAD CHEF",
    city: "Austin, TX",
    focus: "Tex-Mex Brunch & Bowls",
    image:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    students: 2230,
    courses: 8,
    tags: ["Tex-Mex", "Brunch"],
    cuisine: "Tex-Mex Brunch & Street Bowls",
    bio: '"I blend smoke, citrus, and heat into approachable dishes that are fast, social, and full of character."',
    banner:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80",
    featuredRecipeId: 46,
    creations: [3, 19, 29, 44, 46],
  },
  {
    id: 16,
    name: "Chef Hana Idrissi",
    title: "CHEF DE PARTIE",
    city: "Marrakesh, MA",
    focus: "North African Weeknight Cooking",
    image:
      "https://i.pravatar.cc/600?img=47",
    rating: 4.8,
    students: 2410,
    courses: 9,
    tags: ["Moroccan", "Spice"],
    cuisine: "North African Home Cooking",
    bio: '"I teach fast, aromatic cooking with pantry spices, preserved citrus, and practical one-pan methods."',
    banner:
      "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://i.pravatar.cc/300?img=47",
    featuredRecipeId: 66,
    creations: [39, 45, 53, 66, 68],
  },
  {
    id: 17,
    name: "Chef Owen Caldwell",
    title: "HEAD CHEF",
    city: "Portland, OR",
    focus: "Pacific Northwest Seasonal",
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    students: 1895,
    courses: 7,
    tags: ["Seasonal", "Farm-to-Table"],
    cuisine: "Pacific Northwest Seasonal Cooking",
    bio: '"Great food starts in the market. I focus on ingredient-led dishes with clean technique and low waste."',
    banner:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&q=80",
    featuredRecipeId: 58,
    creations: [34, 43, 58, 63, 70],
  },
  {
    id: 18,
    name: "Chef Lucia Benitez",
    title: "SOUS CHEF",
    city: "Buenos Aires, AR",
    focus: "Latin Grilling & Bowls",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    students: 2765,
    courses: 10,
    tags: ["Grill", "Latin"],
    cuisine: "Latin Grilling & Bowl Meals",
    bio: '"I blend bright acids, char, and fresh herbs to make bold dishes that still feel balanced and light."',
    banner:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80",
    featuredRecipeId: 56,
    creations: [33, 38, 56, 67, 69],
  },
  {
    id: 19,
    name: "Chef Robin Keller",
    title: "EXECUTIVE CHEF",
    city: "Berlin, DE",
    focus: "Plant-Forward Modern Cooking",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    students: 3180,
    courses: 12,
    tags: ["Vegan", "Modern"],
    cuisine: "Plant-Forward Modern Cooking",
    bio: '"My classes are about texture, umami, and high-protein plant meals that satisfy without compromise."',
    banner:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80",
    featuredRecipeId: 69,
    creations: [35, 39, 57, 61, 69],
  },
  {
    id: 20,
    name: "Chef Naomi Carter",
    title: "PASTRY SPECIALIST",
    city: "Toronto, CA",
    focus: "Healthy Desserts & Brunch",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    students: 2950,
    courses: 11,
    tags: ["Dessert", "Brunch"],
    cuisine: "Healthy Desserts & Brunch Pastry",
    bio: '"I create lower-sugar pastries and brunch recipes that keep indulgence while improving nutritional balance."',
    banner:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80",
    featuredRecipeId: 70,
    creations: [36, 50, 55, 60, 70],
  },
];

export const recipes: Recipe[] = [
  {
    id: 1,
    name: "Honey Glazed Salmon",
    category: "Dinner",
    time: "30 min",
    kcal: 520,
    rating: 4.9,
    reviews: 218,
    servings: 2,
    difficulty: "Easy",
    tags: ["Seafood", "Healthy", "Gluten-Free"],
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
    badge: "Popular",
    badgeColor: "bg-[#14b8a6]",
    description:
      "A beautifully caramelised salmon fillet with a sticky honey and soy glaze. Rich in omega-3s and packed with flavour, this dish comes together effortlessly.",
    ingredients: [
      "2 salmon fillets (6 oz each)",
      "3 tbsp honey",
      "2 tbsp soy sauce",
      "1 tbsp olive oil",
      "2 cloves garlic, minced",
      "1 tsp ginger, grated",
      "Salt & pepper to taste",
      "Fresh lemon, for serving",
      "Fresh dill, to garnish",
    ],
    steps: [
      {
        text: "Preheat oven to 400°F (200°C) and line a baking sheet with foil.",
        duration: "5 min",
      },
      {
        text: "In a small bowl, whisk together honey, soy sauce, garlic, and ginger until combined.",
      },
      {
        text: "Pat salmon dry and season generously with salt and pepper on both sides.",
      },
      {
        text: "Heat olive oil in an oven-safe skillet over medium-high heat until shimmering.",
      },
      {
        text: "Sear salmon skin-side up for 2-3 minutes until golden brown on the surface.",
        duration: "3 min",
      },
      {
        text: "Flip salmon and brush generously with the honey glaze, coating all surfaces.",
      },
      {
        text: "Transfer to oven and bake for 8-10 minutes until cooked through and glaze is caramelised.",
        duration: "10 min",
      },
      {
        text: "Serve immediately with lemon wedges, fresh dill, and your choice of sides.",
      },
    ],
  },
  {
    id: 2,
    name: "Berry Acai Bowl",
    category: "Breakfast",
    time: "10 min",
    kcal: 310,
    rating: 4.7,
    reviews: 145,
    servings: 1,
    difficulty: "Easy",
    tags: ["Vegan", "Quick", "Raw"],
    image:
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=1200&q=80",
    badge: "Quick",
    badgeColor: "bg-[#D4AF37]",
    description:
      "A vibrant, antioxidant-rich smoothie bowl topped with fresh berries, coconut flakes, and crunchy granola to kickstart your morning.",
    ingredients: [
      "2 frozen acai puree packets",
      "1 frozen banana",
      "½ cup almond milk",
      "¼ cup mixed berries (fresh)",
      "¼ cup granola",
      "1 tbsp chia seeds",
      "1 tbsp coconut flakes",
    ],
    steps: [
      {
        text: "Run acai packets under warm water for 5 seconds to slightly thaw before opening.",
        duration: "1 min",
      },
      {
        text: "Add acai, frozen banana, and almond milk to a high-speed blender.",
      },
      {
        text: "Blend on medium until a thick, smooth consistency is reached. Do not over-blend.",
      },
      {
        text: "Pour the thick smoothie base into a chilled bowl.",
        duration: "1 min",
      },
      {
        text: "Artfully arrange fresh berries, granola, chia seeds, and coconut flakes in stripes on top.",
      },
    ],
  },
  {
    id: 3,
    name: "Avocado Toast",
    category: "Breakfast",
    time: "15 min",
    kcal: 450,
    rating: 4.8,
    reviews: 312,
    servings: 1,
    difficulty: "Easy",
    tags: ["Vegetarian", "Quick"],
    image:
      "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=1200&q=80",
    description:
      "The ultimate avocado toast — creamy, perfectly seasoned avocado on golden toasted sourdough, topped with a jammy egg and a kick of chili flakes.",
    ingredients: [
      "2 slices sourdough bread",
      "1 ripe avocado",
      "Juice of ½ lemon",
      "¼ tsp red pepper flakes",
      "Everything bagel seasoning",
      "Salt & black pepper",
      "2 eggs (optional)",
      "Microgreens, to garnish",
    ],
    steps: [
      {
        text: "Toast the sourdough bread until deep golden and crispy throughout.",
        duration: "3 min",
      },
      {
        text: "Halve the avocado, remove the pit, and scoop the flesh into a bowl.",
      },
      {
        text: "Mash avocado with lemon juice, a pinch of salt, and black pepper to your preferred texture.",
      },
      {
        text: "If adding eggs, fry in a little butter or poach for 3 minutes in simmering water.",
        duration: "3 min",
      },
      {
        text: "Spread the avocado mixture generously and evenly over each slice of toast.",
      },
      { text: "Top with red pepper flakes and everything bagel seasoning." },
      { text: "Place egg on top if using, season with a pinch of salt." },
      {
        text: "Garnish with microgreens and serve immediately while toast is still warm.",
      },
    ],
  },
  {
    id: 4,
    name: "Spicy Ramen",
    category: "Dinner",
    time: "45 min",
    kcal: 620,
    rating: 4.6,
    reviews: 134,
    servings: 2,
    difficulty: "Medium",
    tags: ["Japanese", "Spicy", "Comfort Food"],
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
    description:
      "A rich, soul-warming ramen bowl with a deeply flavoured miso-chili broth, tender chashu pork, and a perfectly jammy soft-boiled egg.",
    ingredients: [
      "2 packs ramen noodles",
      "4 cups chicken broth",
      "2 tbsp miso paste",
      "1 tbsp chili oil",
      "1 soft-boiled egg",
      "100g chashu pork",
      "Green onions, sliced",
      "2 sheets nori",
      "Sesame seeds to garnish",
    ],
    steps: [
      {
        text: "Bring chicken broth to a gentle simmer in a large pot over medium heat.",
        duration: "5 min",
      },
      {
        text: "Whisk in miso paste and chili oil until fully dissolved and broth is fragrant.",
      },
      {
        text: "Cook ramen noodles in a separate pot according to package instructions.",
        duration: "3 min",
      },
      {
        text: "Prepare soft-boiled eggs: boil for exactly 6 minutes, then transfer to an ice bath.",
        duration: "6 min",
      },
      { text: "Peel eggs and slice chashu pork into thin, even rounds." },
      { text: "Divide cooked noodles between two deep bowls." },
      { text: "Ladle hot broth over noodles until just covered." },
      {
        text: "Top with egg (halved), pork slices, green onions, nori, and sesame seeds.",
      },
    ],
  },
  {
    id: 5,
    name: "Greek Salad",
    category: "Lunch",
    time: "10 min",
    kcal: 280,
    rating: 4.5,
    reviews: 89,
    servings: 2,
    difficulty: "Easy",
    tags: ["Mediterranean", "Healthy"],
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
    badge: "Quick",
    badgeColor: "bg-[#D4AF37]",
    description:
      "A crisp, refreshing Mediterranean classic featuring ripe tomatoes, crisp cucumbers, sharp red onion, Kalamata olives, and a block of creamy feta cheese dressed in oregano-infused olive oil.",
    ingredients: [
      "4 ripe tomatoes, cut into wedges",
      "1 large cucumber, sliced into half-moons",
      "½ red onion, thinly sliced",
      "½ cup Kalamata olives, pitted",
      "200g Greek feta cheese block",
      "3 tbsp extra virgin olive oil",
      "1 tbsp red wine vinegar",
      "1 tsp dried oregano",
      "Sea salt to taste",
    ],
    steps: [
      {
        text: "In a large shallow bowl, combine the tomatoes, cucumber, and red onion slices.",
      },
      { text: "Scatter the Kalamata olives evenly over the vegetables." },
      {
        text: "In a small jar, shake together olive oil, red wine vinegar, and oregano.",
      },
      { text: "Drizzle the dressing over the salad and toss lightly." },
      {
        text: "Place the intact block of feta cheese right on top of the salad.",
        duration: "1 min",
      },
      {
        text: "Sprinkle with a pinch of extra oregano, a final drizzle of olive oil, and serve immediately.",
      },
    ],
  },
  {
    id: 6,
    name: "Chocolate Lava Cake",
    category: "Dessert",
    time: "25 min",
    kcal: 480,
    rating: 4.9,
    reviews: 512,
    servings: 2,
    difficulty: "Medium",
    tags: ["Dessert", "Chocolate", "Baking"],
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80",
    badge: "Popular",
    badgeColor: "bg-[#14b8a6]",
    description:
      "A decadent, restaurant-quality dessert with a perfectly baked cake exterior holding a molten, flowing chocolate ganache center.",
    ingredients: [
      "100g high-quality dark chocolate (70%)",
      "100g unsalted butter",
      "100g caster sugar",
      "2 large eggs",
      "2 egg yolks",
      "50g plain flour",
      "1 pinch of sea salt",
      "Butter and cocoa powder for dusting ramekins",
    ],
    steps: [
      {
        text: "Preheat oven to 200°C (400°F). Generously butter two ramekins and dust the insides with cocoa powder.",
        duration: "5 min",
      },
      {
        text: "Melt the dark chocolate and butter together in a heatproof bowl over simmering water.",
      },
      {
        text: "In a separate bowl, whisk eggs, yolks, and sugar until pale and slightly thickened.",
      },
      {
        text: "Gently fold the melted chocolate mixture into the egg mixture until just combined.",
      },
      {
        text: "Sift the flour over the batter and gently fold it in along with a pinch of sea salt.",
      },
      {
        text: "Divide the batter between the prepared ramekins and place on a baking tray.",
      },
      {
        text: "Bake for exactly 10-12 minutes. The edges should be set, but the center must be soft.",
        duration: "12 min",
      },
      {
        text: "Let rest for 1 minute, run a knife around the edge, and invert onto plates to serve immediately.",
      },
    ],
  },
  {
    id: 7,
    name: "Overnight Oats",
    category: "Breakfast",
    time: "5 min",
    kcal: 320,
    rating: 4.7,
    reviews: 201,
    servings: 1,
    difficulty: "Easy",
    tags: ["Meal Prep", "Healthy", "Vegan Option"],
    image:
      "https://images.unsplash.com/photo-1588346230942-413569272957?auto=format&fit=crop&w=1200&q=80",
    description:
      "The perfect make-ahead breakfast. Creamy oats steeped in milk, naturally sweetened with maple syrup, and ready to grab-and-go in the morning.",
    ingredients: [
      "½ cup rolled oats (not instant)",
      "½ cup milk (dairy or plant-based)",
      "¼ cup plain yogurt",
      "1 tbsp maple syrup",
      "1 tsp chia seeds",
      "½ tsp vanilla extract",
      "Pinch of cinnamon",
      "Fresh fruit and nuts for topping",
    ],
    steps: [
      {
        text: "In a mason jar or sealable container, combine oats, milk, yogurt, maple syrup, chia seeds, vanilla, and cinnamon.",
      },
      {
        text: "Stir thoroughly until completely combined and there are no dry pockets of oats.",
        duration: "1 min",
      },
      {
        text: "Seal the container and place it in the refrigerator overnight (or for at least 4 hours).",
        duration: "4 hours",
      },
      {
        text: "In the morning, give it a stir. Add a splash of milk if the consistency is too thick.",
      },
      {
        text: "Top with fresh berries, sliced bananas, or chopped nuts before eating.",
      },
    ],
  },
  {
    id: 8,
    name: "Chicken Tacos",
    category: "Lunch",
    time: "20 min",
    kcal: 540,
    rating: 4.8,
    reviews: 178,
    servings: 3,
    difficulty: "Easy",
    tags: ["Mexican", "Quick", "Protein"],
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80",
    description:
      "Zesty, deeply spiced grilled chicken folded tightly into warm corn tortillas with a vibrant fresh pico de gallo and a squeeze of lime.",
    ingredients: [
      "500g chicken thighs, boneless/skinless",
      "2 tbsp olive oil",
      "1 tbsp taco seasoning (chili, cumin, oregano)",
      "1 clove garlic, minced",
      "8 small corn tortillas",
      "½ cup fresh cilantro, chopped",
      "1 small white onion, finely diced",
      "Lime wedges for serving",
    ],
    steps: [
      {
        text: "In a bowl, toss the chicken thighs with olive oil, taco seasoning, and minced garlic to coat evenly.",
      },
      {
        text: "Heat a heavy skillet or grill pan over medium-high heat until very hot.",
        duration: "2 min",
      },
      {
        text: "Cook the chicken for 4-5 minutes per side until charred and cooked through.",
        duration: "10 min",
      },
      {
        text: "Remove chicken from heat, let rest for 3 minutes, then chop into bite-sized pieces.",
      },
      {
        text: "Warm the corn tortillas slightly in a dry pan or microwave so they don't break.",
        duration: "2 min",
      },
      {
        text: "Assemble tacos by spooning chicken onto tortillas, topping with raw onion and cilantro.",
      },
      { text: "Serve hot with a squeeze of fresh lime juice over the top." },
    ],
  },
  {
    id: 9,
    name: "Mushroom Risotto",
    category: "Dinner",
    time: "40 min",
    kcal: 580,
    rating: 4.6,
    reviews: 112,
    servings: 4,
    difficulty: "Hard",
    tags: ["Italian", "Vegetarian", "Slow Cook"],
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1200&q=80",
    description:
      "A labor of love resulting in a luxuriously creamy, velvety rice dish packed with the earthy, deep umami flavor of roasted wild mushrooms and parmesan.",
    ingredients: [
      "300g Arborio or Carnaroli rice",
      "400g mixed mushrooms (cremini, shiitake, porcini)",
      "1 large shallot, finely diced",
      "2 cloves garlic, minced",
      "150ml dry white wine",
      "1 liter hot chicken or vegetable stock",
      "50g unsalted butter",
      "50g freshly grated Parmigiano-Reggiano",
      "Fresh thyme leaves",
    ],
    steps: [
      {
        text: "Keep the stock simmering gently in a saucepan on a separate burner.",
      },
      {
        text: "In a wide, heavy-bottomed pan, sauté the mushrooms in a little butter until deeply browned. Remove and set aside.",
        duration: "8 min",
      },
      {
        text: "In the same pan, sauté the shallot in remaining butter until translucent, then add garlic.",
        duration: "3 min",
      },
      {
        text: "Add the rice and toast it, stirring constantly, until the edges turn slightly translucent.",
        duration: "2 min",
      },
      {
        text: "Pour in the white wine and stir until completely absorbed by the rice.",
      },
      {
        text: "Begin adding the hot stock one ladleful at a time, stirring constantly and allowing each addition to be absorbed before adding the next.",
        duration: "20 min",
      },
      {
        text: "When rice is al dente and creamy, remove from heat. Stir in the cooked mushrooms, parmesan, and a knob of cold butter.",
      },
      {
        text: "Cover and let rest for 2 minutes before serving garnished with fresh thyme.",
        duration: "2 min",
      },
    ],
  },
  {
    id: 10,
    name: "Banana Pancakes",
    category: "Breakfast",
    time: "20 min",
    kcal: 380,
    rating: 4.8,
    reviews: 267,
    servings: 2,
    difficulty: "Easy",
    tags: ["Sweet", "Quick", "Weekend"],
    image:
      "https://images.unsplash.com/photo-1613333400161-e2d821410244?auto=format&fit=crop&w=1200&q=80",
    description:
      "Fluffy, tender, edge-crispy pancakes with a gorgeous natural sweetness from overripe bananas. Perfect for a cozy weekend morning.",
    ingredients: [
      "1 large overripe banana",
      "1 cup all-purpose flour",
      "1 tbsp sugar",
      "1 tsp baking powder",
      "½ tsp baking soda",
      "1 large egg",
      "¾ cup buttermilk",
      "2 tbsp melted butter",
      "Butter or oil for frying",
      "Maple syrup to serve",
    ],
    steps: [
      {
        text: "In a large bowl, mash the overripe banana until very smooth.",
        duration: "1 min",
      },
      {
        text: "Whisk in the egg, buttermilk, and melted butter into the mashed banana.",
      },
      {
        text: "In a separate bowl, whisk together the flour, sugar, baking powder, and baking soda.",
      },
      {
        text: "Pour the wet ingredients into the dry ingredients. Fold gently until just combined. Lumps are okay!",
        duration: "2 min",
      },
      {
        text: "Heat a non-stick skillet or griddle over medium heat and lightly coat with butter.",
      },
      {
        text: "Pour ¼ cup of batter for each pancake. Cook until bubbles form on the surface and edges look dry.",
        duration: "3 min",
      },
      {
        text: "Flip and cook until the underside is golden brown. Repeat with remaining batter.",
        duration: "2 min",
      },
      {
        text: "Serve immediately while warm, heavily drenched in maple syrup.",
      },
    ],
  },
  {
    id: 11,
    name: "Tom Yum Soup",
    category: "Dinner",
    time: "35 min",
    kcal: 290,
    rating: 4.7,
    reviews: 156,
    servings: 4,
    difficulty: "Medium",
    tags: ["Thai", "Spicy", "Soup"],
    image:
      "https://images.unsplash.com/photo-1628430043175-0e8820df47c3?auto=format&fit=crop&w=1200&q=80",
    description:
      "Thailand's famous hot and sour soup. A complex, aromatic broth layered with lemongrass, galangal, lime leaves, and explosive chili heat, swimming with plump shrimp.",
    ingredients: [
      "1 liter chicken or shrimp stock",
      "2 stalks lemongrass, bruised and chopped",
      "1 inch piece galangal, sliced",
      "5 kaffir lime leaves, torn",
      "3-5 bird's eye chilies, bruised",
      "300g large shrimp, peeled and deveined",
      "200g straw mushrooms, halved",
      "3 tbsp fish sauce",
      "3 tbsp fresh lime juice",
      "1 tbsp Thai chili paste (Nam Prik Pao)",
      "Fresh cilantro for garnish",
    ],
    steps: [
      { text: "Bring the stock to a boil in a medium pot.", duration: "5 min" },
      {
        text: "Add lemongrass, galangal, kaffir lime leaves, and chilies. Simmer vigorously to release the aromatics.",
        duration: "10 min",
      },
      {
        text: "Add the mushrooms and simmer for another 3 minutes until softened.",
      },
      {
        text: "Add the shrimp and cook until just pink and opaque. Do not overcook.",
        duration: "3 min",
      },
      {
        text: "Stir in the Thai chili paste, fish sauce, and remove from heat.",
      },
      {
        text: "Stir in the fresh lime juice. Taste and adjust seasoning—it should be equally sour, salty, and spicy.",
      },
      {
        text: "Ladle into bowls, discarding the woody aromatics if preferred.",
        duration: "2 min",
      },
      { text: "Garnish generously with fresh cilantro leaves." },
    ],
  },
  {
    id: 12,
    name: "Tiramisu",
    category: "Dessert",
    time: "30 min",
    kcal: 520,
    rating: 4.9,
    reviews: 634,
    servings: 8,
    difficulty: "Medium",
    tags: ["Italian", "No-Bake", "Coffee"],
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80",
    badge: "Popular",
    badgeColor: "bg-[#14b8a6]",
    description:
      "The classic 'pick-me-up'. Layers of espresso-soaked ladyfingers enveloped in a cloud-like mascarpone zabaglione, heavily dusted with bitter cocoa.",
    ingredients: [
      "4 large egg yolks",
      "½ cup granulated sugar",
      "225g Mascarpone cheese, room temperature",
      "1 cup heavy whipping cream",
      "1 ½ cups strong brewed espresso, cooled",
      "2 tbsp coffee liqueur (Kahlua/Tia Maria)",
      "1 package (24) Savoiardi ladyfingers",
      "Unsweetened cocoa powder for dusting",
    ],
    steps: [
      {
        text: "In a heatproof bowl set over simmering water, whisk yolks and sugar constantly until pale and thick (sabayon).",
        duration: "8 min",
      },
      {
        text: "Remove from heat and gently whisk in the mascarpone until completely smooth.",
      },
      {
        text: "In a separate bowl, whip the heavy cream to stiff peaks. Gently fold it into the mascarpone mixture.",
        duration: "5 min",
      },
      {
        text: "Combine the cooled espresso and coffee liqueur in a shallow bowl.",
      },
      {
        text: "One by one, quickly dip the ladyfingers into the espresso (about 1 second per side) and arrange in a single layer in a 9x9 inch dish.",
        duration: "4 min",
      },
      {
        text: "Spread half of the mascarpone cream evenly over the soaked ladyfingers.",
      },
      {
        text: "Repeat with a second layer of soaked ladyfingers, then top with the remaining mascarpone cream.",
      },
      {
        text: "Refrigerate for at least 6 hours, preferably overnight. Dust heavily with cocoa powder just before serving.",
        duration: "6 hours",
      },
    ],
  },
  {
    id: 13,
    name: "Sous Vide Duck Breast",
    category: "Dinner",
    time: "1 hr 20 min",
    kcal: 560,
    rating: 4.8,
    reviews: 94,
    servings: 2,
    difficulty: "Hard",
    tags: ["Duck", "Modernist", "Precision"],
    image:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80",
    description:
      "Duck breast cooked with millimetre-perfect precision in a temperature-controlled water bath, then finished in a blazing hot pan for a shatteringly crisp lacquered skin.",
    ingredients: [
      "2 duck breasts (200g each)",
      "4 sprigs fresh thyme",
      "2 cloves garlic, crushed",
      "1 tbsp duck fat or neutral oil",
      "Sea salt & cracked black pepper",
      "½ cup orange juice, reduced by half",
      "1 tbsp honey",
      "1 tsp soy sauce",
    ],
    steps: [
      {
        text: "Score the duck skin in a crosshatch pattern, cutting only through the fat layer.",
      },
      {
        text: "Season generously with salt and pepper, then seal in a vacuum bag with thyme and garlic.",
        duration: "5 min",
      },
      {
        text: "Cook sous vide at 57°C (135°F) for 1 hour.",
        duration: "60 min",
      },
      {
        text: "Remove duck from bag. Pat skin completely dry with paper towels.",
      },
      {
        text: "Heat a heavy skillet until smoking. Sear skin-side down, pressing firmly, for 3–4 minutes until deep mahogany.",
        duration: "4 min",
      },
      {
        text: "Meanwhile, reduce orange juice with honey and soy to a glossy glaze.",
      },
      {
        text: "Rest duck 3 minutes, slice on the bias, and spoon the citrus glaze over before serving.",
      },
    ],
  },
  {
    id: 14,
    name: "Charred Cucumber Gazpacho",
    category: "Lunch",
    time: "25 min",
    kcal: 160,
    rating: 4.6,
    reviews: 67,
    servings: 4,
    difficulty: "Medium",
    tags: ["Vegan", "Modernist", "Cold Soup"],
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    description:
      "A chilled, silky green soup where cucumber is first charred on a screaming-hot grill to introduce deep smokiness before being blended with green herbs and bright yogurt.",
    ingredients: [
      "2 large cucumbers, halved lengthwise",
      "1 cup Greek yogurt",
      "½ cup fresh basil",
      "½ cup flat-leaf parsley",
      "1 small clove garlic",
      "3 tbsp extra virgin olive oil",
      "2 tbsp white wine vinegar",
      "Ice cubes, for blending",
    ],
    steps: [
      {
        text: "Heat a grill pan or open flame to very high. Char cucumber halves, cut-side down, for 4 minutes.",
        duration: "4 min",
      },
      { text: "Reserve ¼ of the cucumber for garnish; roughly chop the rest." },
      {
        text: "Add cucumber, yogurt, herbs, garlic, oil, and vinegar to a blender.",
      },
      {
        text: "Add a handful of ice and blend on high until completely smooth.",
        duration: "2 min",
      },
      {
        text: "Strain through a fine sieve. Season well and chill for at least 10 minutes.",
        duration: "10 min",
      },
      {
        text: "Serve in chilled bowls topped with diced reserved cucumber and a swirl of olive oil.",
      },
    ],
  },
  {
    id: 15,
    name: "Tagliatelle al Ragù Bolognese",
    category: "Dinner",
    time: "2 hr 30 min",
    kcal: 720,
    rating: 4.9,
    reviews: 341,
    servings: 4,
    difficulty: "Medium",
    tags: ["Italian", "Pasta", "Slow Cook"],
    image:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=1200&q=80",
    badge: "Popular",
    badgeColor: "bg-[#14b8a6]",
    description:
      "The real Bolognese — a slow-cooked meat sauce from the home kitchens of Emilia-Romagna, enriched with wine and milk, served only on fresh egg tagliatelle.",
    ingredients: [
      "400g fresh egg tagliatelle",
      "300g coarsely ground beef (20% fat)",
      "150g coarsely ground pork",
      "100g pancetta, finely diced",
      "1 medium white onion, finely diced",
      "2 celery stalks, finely diced",
      "1 medium carrot, finely diced",
      "200ml dry white wine",
      "200ml whole milk",
      "400ml beef stock",
      "2 tbsp tomato paste",
    ],
    steps: [
      {
        text: "Render pancetta in a heavy pot until the fat is clear. Add onion, celery, and carrot; cook over low heat for 12 minutes.",
        duration: "12 min",
      },
      {
        text: "Increase heat to high. Add beef and pork; break into tiny pieces and brown deeply.",
        duration: "8 min",
      },
      {
        text: "Pour in white wine and simmer until completely evaporated.",
        duration: "5 min",
      },
      {
        text: "Stir in tomato paste. Add milk and cook until absorbed, then add beef stock.",
      },
      {
        text: "Cover partially and simmer on the lowest possible heat for 2 hours, stirring occasionally.",
        duration: "2 hours",
      },
      {
        text: "Cook tagliatelle in heavily salted boiling water for 2 minutes. Reserve ½ cup pasta water.",
        duration: "2 min",
      },
      {
        text: "Toss pasta in the ragù with a splash of pasta water until sauce clings to every strand.",
      },
    ],
  },
  {
    id: 16,
    name: "Tarte au Citron",
    category: "Dessert",
    time: "1 hr 30 min",
    kcal: 440,
    rating: 4.9,
    reviews: 278,
    servings: 8,
    difficulty: "Hard",
    tags: ["French", "Pastry", "Citrus"],
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
    description:
      "The definitive French lemon tart — a buttery pâte sablée shell filled with a brilliantly sharp, silk-smooth lemon curd that sets like liquid sunshine.",
    ingredients: [
      "200g plain flour, 100g cold butter, 50g icing sugar, 1 egg yolk (pastry)",
      "4 large eggs",
      "150g caster sugar",
      "Zest and juice of 3 large unwaxed lemons",
      "125g cold unsalted butter, cubed",
      "Pinch of sea salt",
      "Icing sugar for dusting",
    ],
    steps: [
      {
        text: "Rub cold butter into flour and icing sugar until fine crumbs. Add egg yolk; bring together and chill 30 min.",
        duration: "30 min",
      },
      {
        text: "Roll to 3mm. Line a 23cm tart tin, prick, and blind bake at 180°C for 15 minutes. Remove weights and bake 8 more minutes.",
        duration: "23 min",
      },
      { text: "Whisk eggs, sugar, lemon zest, and juice in a heatproof bowl." },
      {
        text: "Set over barely simmering water and stir constantly until thickened and coating the spoon.",
        duration: "12 min",
      },
      {
        text: "Off heat, whisk in cold butter cubes one at a time until glossy.",
      },
      {
        text: "Pour curd into warm shell and bake at 130°C for 8 minutes until barely set.",
        duration: "8 min",
      },
      {
        text: "Cool completely. Dust with icing sugar and serve at room temperature.",
      },
    ],
  },
  {
    id: 17,
    name: "Miso-Glazed Black Cod",
    category: "Dinner",
    time: "30 min",
    kcal: 490,
    rating: 4.9,
    reviews: 203,
    servings: 2,
    difficulty: "Medium",
    tags: ["Japanese", "Seafood", "Umami"],
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80",
    badge: "Popular",
    badgeColor: "bg-[#14b8a6]",
    description:
      "Inspired by the legendary Nobu Black Cod. Marinated for 48 hours in a sweet miso glaze that caramelises to a burnished, lacquered finish under the grill.",
    ingredients: [
      "2 black cod fillets (175g each)",
      "3 tbsp white miso paste",
      "3 tbsp mirin",
      "3 tbsp sake",
      "1 tbsp caster sugar",
      "Sliced green onions to garnish",
      "Pickled ginger to serve",
    ],
    steps: [
      {
        text: "In a small saucepan, combine miso, mirin, sake, and sugar. Heat gently until sugar dissolves. Cool completely.",
        duration: "5 min",
      },
      {
        text: "Pat cod dry. Coat fillets generously in the cooled miso marinade. Refrigerate for 2–48 hours.",
        duration: "2 hours",
      },
      { text: "Bring fish to room temperature 20 minutes before cooking." },
      {
        text: "Preheat grill/broiler to maximum. Place cod on a foil-lined tray.",
      },
      {
        text: "Grill for 5–7 minutes, watching carefully until the glaze caramelises to deep amber.",
        duration: "7 min",
      },
      {
        text: "Rest 2 minutes. Garnish with green onions and serve with pickled ginger.",
      },
    ],
  },
  {
    id: 18,
    name: "Matcha Panna Cotta",
    category: "Dessert",
    time: "20 min",
    kcal: 310,
    rating: 4.7,
    reviews: 118,
    servings: 4,
    difficulty: "Easy",
    tags: ["Japanese", "Dessert", "No-Bake"],
    image:
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=1200&q=80",
    description:
      "A Japanese-Italian fusion: trembling, barely-set cream infused with ceremonial-grade matcha and sweetened with honey, served with red bean paste.",
    ingredients: [
      "500ml heavy cream",
      "2 tbsp ceremonial-grade matcha powder",
      "3 tbsp honey",
      "2.5 tsp powdered gelatin",
      "3 tbsp cold water",
      "Pinch of salt",
      "Red bean paste and sesame brittle to serve",
    ],
    steps: [
      {
        text: "Whisk matcha into ¼ cup warm cream until completely smooth with no lumps.",
      },
      {
        text: "Heat remaining cream with honey and a pinch of salt until steaming — do not boil.",
      },
      { text: "Whisk in the matcha cream mixture thoroughly." },
      {
        text: "Bloom gelatin in cold water for 5 minutes, then dissolve into the hot cream.",
        duration: "5 min",
      },
      { text: "Strain through a fine sieve and pour into 4 glasses." },
      {
        text: "Refrigerate for minimum 4 hours until set.",
        duration: "4 hours",
      },
      {
        text: "Serve topped with a spoonful of red bean paste and shards of sesame brittle.",
      },
    ],
  },
  {
    id: 19,
    name: "Mole Negro with Chicken",
    category: "Dinner",
    time: "2 hours",
    kcal: 680,
    rating: 4.8,
    reviews: 156,
    servings: 4,
    difficulty: "Hard",
    tags: ["Mexican", "Spicy", "Slow Cook"],
    image:
      "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&w=1200&q=80",
    description:
      "Mexico's most complex and revered sauce — a slow-toasted symphony of dried chilies, dark chocolate, charred aromatics, and spices that defies any single description.",
    ingredients: [
      "4 bone-in chicken thighs",
      "3 dried mulato chilies, deseeded and toasted",
      "3 dried pasilla chilies, deseeded and toasted",
      "2 dried ancho chilies, deseeded and toasted",
      "30g dark chocolate (90%)",
      "1 white onion, halved and charred over flame",
      "4 garlic cloves, charred",
      "1 tsp cumin, 1 tsp black pepper, 3 whole cloves",
      "2 tbsp sesame seeds, toasted",
      "500ml chicken stock",
      "1 corn tortilla, torn and toasted",
    ],
    steps: [
      {
        text: "Toast dried chilies in a dry pan until fragrant. Soak in boiling water for 20 minutes.",
        duration: "20 min",
      },
      {
        text: "Char onion and garlic directly over a flame until deeply blackened.",
        duration: "8 min",
      },
      {
        text: "Blend chilies, charred aromatics, spices, tortilla, and sesame seeds with soaking liquid to a smooth paste.",
      },
      {
        text: "Fry the paste in a large pot with oil, stirring constantly, for 10 minutes.",
        duration: "10 min",
      },
      {
        text: "Add stock, chocolate, and stir until melted. Simmer 30 minutes.",
        duration: "30 min",
      },
      {
        text: "Brown seasoned chicken in a separate pan and add to the mole. Simmer 25 more minutes.",
        duration: "25 min",
      },
      {
        text: "Serve over chicken with rice, sesame seeds, and warm corn tortillas.",
      },
    ],
  },
  {
    id: 20,
    name: "Elote — Mexican Street Corn",
    category: "Lunch",
    time: "20 min",
    kcal: 350,
    rating: 4.8,
    reviews: 189,
    servings: 4,
    difficulty: "Easy",
    tags: ["Mexican", "Street Food", "Quick"],
    image:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=1200&q=80",
    badge: "Quick",
    badgeColor: "bg-[#D4AF37]",
    description:
      "The king of Mexican street food. Corn grilled until the kernels char and sweeten, then slathered in crema, cotija, lime, and chili powder.",
    ingredients: [
      "4 ears of corn (husks on)",
      "4 tbsp Mexican crema or sour cream",
      "4 tbsp mayonnaise",
      "100g cotija cheese (or feta), crumbled",
      "1 tsp ancho chili powder",
      "½ tsp smoked paprika",
      "2 limes, quartered",
      "Fresh cilantro, roughly chopped",
    ],
    steps: [
      {
        text: "Peel back the outer husks without removing, remove the silk, then fold husks back.",
      },
      { text: "Soak corn in cold water for 15 minutes.", duration: "15 min" },
      {
        text: "Grill over high heat, turning every 3 minutes, for 12–15 minutes.",
        duration: "15 min",
      },
      {
        text: "Peel back husks and char naked kernels directly on the grill for 2 more minutes.",
        duration: "2 min",
      },
      {
        text: "Mix crema and mayo together. Brush generously over the hot corn.",
      },
      {
        text: "Roll in cotija cheese. Sprinkle with chili powder and smoked paprika.",
      },
      {
        text: "Squeeze lime over the top, shower with cilantro, and serve immediately.",
      },
    ],
  },
  {
    id: 21,
    name: "Tomahawk Ribeye with Chimichurri",
    category: "Dinner",
    time: "35 min",
    kcal: 980,
    rating: 4.9,
    reviews: 167,
    servings: 2,
    difficulty: "Medium",
    tags: ["Beef", "Grill", "Fire Cooking"],
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80",
    badge: "Popular",
    badgeColor: "bg-[#14b8a6]",
    description:
      "A 1.2kg bone-in ribeye with a dramatic frenched rib handle, reverse-seared over live fire for maximum smoke penetration and a crust that crackles at the table.",
    ingredients: [
      "1 tomahawk ribeye steak (approx. 1.2kg), 2 inches thick",
      "Coarse sea salt and cracked black pepper",
      "2 tbsp beef tallow or clarified butter",
      "1 cup flat-leaf parsley, finely chopped",
      "¼ cup fresh oregano leaves",
      "4 garlic cloves, minced",
      "½ cup extra virgin olive oil",
      "3 tbsp red wine vinegar",
      "1 tsp red chili flakes",
    ],
    steps: [
      {
        text: "Season steak aggressively with salt and pepper 1 hour before cooking. Leave at room temperature.",
        duration: "60 min",
      },
      {
        text: "Set up your grill with two zones: cooler indirect and blazing direct.",
      },
      {
        text: "Cook over indirect zone until internal temperature reads 47°C (117°F).",
        duration: "20 min",
      },
      {
        text: "Make chimichurri: combine parsley, oregano, garlic, oil, vinegar, and chili flakes. Season and rest.",
      },
      {
        text: "Move steak directly over fire. Sear hard for 90 seconds per side, basting with tallow.",
        duration: "3 min",
      },
      {
        text: "Rest the steak vertically, bone up, for 8–10 minutes.",
        duration: "10 min",
      },
      {
        text: "Carve thick slices against the grain and serve flooded with chimichurri.",
      },
    ],
  },
  {
    id: 22,
    name: "Char-Grilled Lamb Chops with Za'atar",
    category: "Dinner",
    time: "25 min",
    kcal: 620,
    rating: 4.7,
    reviews: 113,
    servings: 2,
    difficulty: "Easy",
    tags: ["Lamb", "Grill", "Mediterranean"],
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=80",
    description:
      "Thick-cut loin chops marinated in za'atar, garlic, and olive oil, then grilled over charcoal until the fat renders to crispness and the edges caramelise with smoke.",
    ingredients: [
      "4 thick lamb loin chops",
      "3 tbsp za'atar spice blend",
      "3 cloves garlic, minced",
      "4 tbsp extra virgin olive oil",
      "Juice of 1 lemon",
      "½ cup labneh or thick Greek yogurt",
      "Fresh mint leaves and pomegranate seeds to serve",
      "Coarse sea salt",
    ],
    steps: [
      {
        text: "Combine za'atar, garlic, olive oil, and lemon juice. Coat chops and marinate 30 minutes.",
        duration: "30 min",
      },
      {
        text: "Prepare charcoal grill to screaming hot. Season chops with salt just before cooking.",
      },
      {
        text: "Grill 3 minutes per side for medium-rare, pressing the fat cap directly onto the coals.",
        duration: "6 min",
      },
      { text: "Rest chops on a warm plate for 5 minutes.", duration: "5 min" },
      { text: "Smear labneh across the serving plate. Arrange chops on top." },
      {
        text: "Scatter pomegranate seeds, fresh mint, and a final drizzle of olive oil to finish.",
      },
    ],
  },
  {
    id: 23,
    name: "Smoked Beef Short Ribs",
    category: "Dinner",
    time: "6 hours",
    kcal: 880,
    rating: 4.8,
    reviews: 145,
    servings: 4,
    difficulty: "Hard",
    tags: ["Beef", "Smoked", "Fire Cooking"],
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1200&q=80",
    description:
      "A slab of bone-in beef short ribs smoked low and slow over oak until the collagen fully converts, yielding a bark-encrusted exterior and beef-butter interior.",
    ingredients: [
      "1 full slab bone-in beef short ribs (approx. 2kg)",
      "2 tbsp coarse salt",
      "2 tbsp cracked black pepper",
      "1 tsp garlic powder",
      "Oak or hickory wood chunks",
      "Yellow mustard (binder)",
      "Apple cider vinegar in a spray bottle",
    ],
    steps: [
      {
        text: "Remove membrane from underside of ribs. Apply a thin layer of mustard as a binder.",
      },
      {
        text: "Mix salt, pepper, and garlic. Apply rub heavily on all surfaces. Rest 1 hour at room temperature.",
        duration: "60 min",
      },
      {
        text: "Set smoker to 110–120°C (225–250°F) with oak or hickory. Add ribs bone-side down.",
      },
      {
        text: "Smoke for 3 hours, spraying with apple cider vinegar every 90 minutes.",
        duration: "3 hours",
      },
      {
        text: "Wrap tightly in butcher paper. Return to smoker 2–3 more hours until internal temp reads 98°C.",
        duration: "3 hours",
      },
      {
        text: "Rest, still wrapped, for 45 minutes before unwrapping.",
        duration: "45 min",
      },
      {
        text: "Carve between the bones and serve immediately with pickles and white bread.",
      },
    ],
  },
  {
    id: 24,
    name: "Wood-Fired Whole Sea Bass",
    category: "Dinner",
    time: "45 min",
    kcal: 410,
    rating: 4.7,
    reviews: 98,
    servings: 2,
    difficulty: "Medium",
    tags: ["Seafood", "Fire Cooking", "Italian"],
    image:
      "https://images.unsplash.com/photo-1519984388953-d2406bc725e1?auto=format&fit=crop&w=1200&q=80",
    description:
      "A whole sea bass stuffed with lemon, fennel, and herbs, cooked directly over wood coals until the skin blisters and peels away in crisp, smoky sheets.",
    ingredients: [
      "1 whole sea bass (800g–1kg), scaled and gutted",
      "1 lemon, thinly sliced",
      "1 small fennel bulb, fronds only",
      "4 sprigs fresh rosemary",
      "4 sprigs fresh thyme",
      "3 tbsp extra virgin olive oil",
      "Sea salt and white pepper",
      "Salsa verde and lemon wedges to serve",
    ],
    steps: [
      {
        text: "Score bass 3 times deeply on each side. Season aggressively inside and out with salt and pepper.",
      },
      {
        text: "Stuff the cavity with lemon slices, fennel fronds, rosemary, and thyme. Tie with kitchen string.",
      },
      {
        text: "Rub outside generously with olive oil. Rest 15 minutes.",
        duration: "15 min",
      },
      {
        text: "Build a medium-high wood or charcoal fire. Oil grill grates well.",
      },
      {
        text: "Place bass on grill. Cook without moving for 7 minutes until it releases naturally.",
        duration: "7 min",
      },
      {
        text: "Flip carefully with two wide spatulas. Cook 6–8 more minutes until flesh flakes easily.",
        duration: "8 min",
      },
      {
        text: "Rest 3 minutes. Serve whole at the table with lemon wedges and salsa verde.",
      },
    ],
  },
  {
    id: 25,
    name: "Confit Duck Leg with Puy Lentils",
    category: "Dinner",
    time: "2 hrs",
    kcal: 640,
    rating: 4.8,
    reviews: 152,
    servings: 2,
    difficulty: "Medium",
    tags: ["Duck", "French", "Slow Cooking"],
    image:
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1200&q=80",
    description:
      "Duck legs slow-cooked in their own fat until fall-apart tender, served over earthy Puy lentils with a sharp red wine vinegar dressing.",
    ingredients: [
      "2 duck legs",
      "1 tbsp coarse sea salt",
      "1 tsp black pepper",
      "4 sprigs fresh thyme",
      "2 bay leaves",
      "4 cloves garlic",
      "300g Puy lentils",
      "1 small carrot, finely diced",
      "1 celery stalk, finely diced",
      "1 shallot, finely diced",
      "2 tbsp red wine vinegar",
      "2 tbsp Dijon mustard",
      "3 tbsp extra virgin olive oil",
      "Fresh parsley to finish",
    ],
    steps: [
      {
        text: "Rub duck legs with salt, pepper, and thyme. Cover and refrigerate overnight.",
        duration: "12 hrs",
      },
      {
        text: "Preheat oven to 150°C (300°F). Place duck legs skin-side up in a deep baking dish with bay leaves and garlic.",
      },
      {
        text: "Cover tightly with foil and cook for 1 hour 45 minutes until the meat pulls from the bone.",
        duration: "1 hr 45 min",
      },
      {
        text: "While duck cooks, simmer lentils in salted water with carrot, celery, and shallot for 25 minutes.",
        duration: "25 min",
      },
      {
        text: "Drain lentils and dress while warm with red wine vinegar, Dijon, and olive oil. Season well.",
      },
      {
        text: "Remove duck from oven, uncover, and crank heat to 220°C. Roast uncovered 15 minutes to crisp the skin.",
        duration: "15 min",
      },
      {
        text: "Serve duck legs over the warm lentils, garnished with fresh parsley.",
      },
    ],
  },
  {
    id: 26,
    name: "Beef Carpaccio with Truffle & Parmesan",
    category: "Starter",
    time: "20 min",
    kcal: 310,
    rating: 4.7,
    reviews: 118,
    servings: 2,
    difficulty: "Easy",
    tags: ["Beef", "Italian", "Raw"],
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    description:
      "Paper-thin slices of premium beef fillet draped across the plate, finished with truffle oil, shaved Parmesan, capers, and a bright lemon dressing.",
    ingredients: [
      "300g beef fillet, centre-cut",
      "30g Parmesan, shaved",
      "2 tbsp capers, rinsed",
      "1 tbsp truffle oil",
      "2 tbsp extra virgin olive oil",
      "Juice of 1 lemon",
      "1 tsp Dijon mustard",
      "Handful of wild rocket",
      "Flaky sea salt and cracked black pepper",
    ],
    steps: [
      {
        text: "Wrap beef tightly in cling film. Freeze for 45 minutes until very firm but not frozen solid.",
        duration: "45 min",
      },
      {
        text: "Using a very sharp knife, slice the beef as thinly as possible — near-translucent sheets.",
      },
      {
        text: "Lay slices between sheets of baking paper and gently pound with a rolling pin until paper-thin.",
      },
      {
        text: "Whisk together lemon juice, Dijon, and olive oil. Season with salt and pepper.",
      },
      {
        text: "Arrange carpaccio slices across chilled plates, slightly overlapping.",
      },
      {
        text: "Drizzle with dressing and truffle oil. Scatter capers, Parmesan shavings, and rocket.",
      },
      {
        text: "Finish with flaky salt and a twist of black pepper. Serve immediately.",
      },
    ],
  },
  {
    id: 27,
    name: "Chicken Bastilla",
    category: "Dinner",
    time: "2 hrs",
    kcal: 720,
    rating: 4.9,
    reviews: 203,
    servings: 4,
    difficulty: "Hard",
    tags: ["Chicken", "Moroccan", "Pastry"],
    image:
      "https://images.unsplash.com/photo-1649067936791-1b8a3177ea78?auto=format&fit=crop&w=1200&q=80",
    description:
      "Morocco's legendary sweet-savoury pie of spiced chicken, toasted almonds, and egg custard wrapped in layers of crispy warqa pastry and dusted with cinnamon sugar.",
    ingredients: [
      "1 whole chicken (1.5kg), cut into pieces",
      "2 large onions, grated",
      "1 tsp ground ginger",
      "1 tsp ground cinnamon",
      "½ tsp turmeric",
      "½ tsp black pepper",
      "Large pinch saffron",
      "Large bunch fresh coriander",
      "Large bunch fresh parsley",
      "6 eggs",
      "200g blanched almonds, toasted and roughly chopped",
      "3 tbsp icing sugar, plus extra to dust",
      "1 tsp cinnamon, plus extra to dust",
      "10 sheets filo pastry",
      "100g clarified butter, melted",
    ],
    steps: [
      {
        text: "In a wide pot, cook chicken with onions, all spices, coriander, and parsley in 200ml water over medium heat until tender, about 45 minutes.",
        duration: "45 min",
      },
      {
        text: "Remove chicken, shred meat from bones. Reduce the cooking juices to a thick sauce.",
      },
      {
        text: "Beat eggs into the hot sauce, stirring constantly, to form a thick egg custard. Cool completely.",
      },
      { text: "Mix toasted almonds with icing sugar and 1 tsp cinnamon." },
      {
        text: "Preheat oven to 180°C (350°F). Butter a 28cm round pan. Layer 5 filo sheets, brushing each with butter, letting edges overhang.",
      },
      {
        text: "Layer in: almond mixture, then egg custard, then shredded chicken. Fold in the overhanging pastry, then top with remaining buttered filo sheets tucked underneath.",
        duration: "20 min",
      },
      {
        text: "Bake 35–40 minutes until deeply golden. Dust generously with icing sugar and draw cinnamon lines across the top. Serve hot.",
        duration: "40 min",
      },
    ],
  },
  {
    id: 28,
    name: "Tonkotsu Ramen from Scratch",
    category: "Dinner",
    time: "4 hrs",
    kcal: 780,
    rating: 4.9,
    reviews: 345,
    servings: 2,
    difficulty: "Hard",
    tags: ["Pork", "Japanese", "Noodles"],
    image:
      "https://images.unsplash.com/photo-1635379511574-bc167ca085c8?auto=format&fit=crop&w=1200&q=80",
    description:
      "A milky, cloud-white pork bone broth simmered at a rolling boil for hours, served with fresh ramen noodles, chashu pork, and a perfectly soft-boiled marinated egg.",
    ingredients: [
      "1.5kg pork trotters and neck bones",
      "500g pork belly",
      "Fresh ramen noodles, 2 portions",
      "4 eggs",
      "100ml soy sauce",
      "50ml mirin",
      "50ml sake",
      "2 tbsp sugar",
      "5 cloves garlic",
      "30g fresh ginger, sliced",
      "4 spring onions",
      "2 tbsp white sesame paste (tahini)",
      "1 tbsp miso paste",
      "Sesame oil, nori, bamboo shoots, corn to garnish",
    ],
    steps: [
      {
        text: "Blanch pork bones in boiling water for 10 minutes, drain and rinse under cold water until clean.",
        duration: "10 min",
      },
      {
        text: "Return bones to a large pot with 3L of cold water. Bring to a vigorous boil and keep at a rolling boil for 3 hours, topping up water as needed.",
        duration: "3 hrs",
      },
      {
        text: "Meanwhile, simmer pork belly in soy, mirin, sake, sugar, garlic, and ginger for 90 minutes until lacquered. Cool in the braising liquid.",
        duration: "90 min",
      },
      {
        text: "Soft-boil eggs for 6 minutes, ice-bath for 2 minutes, peel, and marinate in remaining chashu liquid for 1 hour.",
        duration: "60 min",
      },
      {
        text: "Strain broth through a fine sieve. Whisk in sesame paste and miso until dissolved. Season with salt.",
      },
      {
        text: "Cook noodles in boiling water for 1–2 minutes until just tender. Drain well.",
        duration: "2 min",
      },
      {
        text: "Ladle hot broth into deep bowls. Add noodles, sliced chashu, halved egg, bamboo shoots, corn, nori, and spring onions. Finish with a few drops of sesame oil.",
      },
    ],
  },
  {
    id: 29,
    name: "Tamales de Rajas con Crema",
    category: "Dinner",
    time: "2 hrs",
    kcal: 560,
    rating: 4.8,
    reviews: 167,
    servings: 4,
    difficulty: "Hard",
    tags: ["Corn", "Mexican", "Vegetarian"],
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
    description:
      "Corn masa dough filled with roasted poblano strips, melted cheese, and crema, wrapped in corn husks and steamed until soft, yielding a deeply satisfying vegetarian classic.",
    ingredients: [
      "500g masa harina",
      "400ml warm chicken or vegetable stock",
      "150g lard or vegetable shortening",
      "1 tsp baking powder",
      "1 tsp salt",
      "4 poblano chillies",
      "200g Oaxacan cheese or mozzarella, shredded",
      "150ml Mexican crema or soured cream",
      "20 dried corn husks, soaked in warm water 1 hour",
      "Salsa verde and extra crema to serve",
    ],
    steps: [
      {
        text: "Soak corn husks in warm water for at least 1 hour until pliable. Pat dry before using.",
        duration: "1 hr",
      },
      {
        text: "Roast poblanos directly over a gas flame until completely charred. Place in a bag for 10 minutes, then peel, seed, and cut into strips (rajas).",
      },
      {
        text: "Beat lard and baking powder with an electric mixer until fluffy. Gradually add masa harina alternating with warm stock. The dough should float in water when ready — season with salt.",
      },
      {
        text: "Spread 2 tbsp masa onto the wide end of a corn husk, leaving a border. Top with poblano strips, cheese, and a drizzle of crema.",
      },
      {
        text: "Fold husk sides inward, then fold up the pointed end. Tie with a torn strip of husk. Repeat with remaining ingredients.",
      },
      {
        text: "Stand tamales upright in a steamer basket, open-end up. Steam over medium heat for 1 hour 15 minutes, keeping water topped up.",
        duration: "1 hr 15 min",
      },
      {
        text: "Tamales are ready when the masa pulls cleanly from the husk. Rest 5 minutes. Serve with salsa verde and crema.",
      },
    ],
  },
  {
    id: 30,
    name: "Bistecca alla Fiorentina",
    category: "Dinner",
    time: "40 min",
    kcal: 890,
    rating: 5.0,
    reviews: 279,
    servings: 2,
    difficulty: "Medium",
    tags: ["Beef", "Italian", "Fire Cooking"],
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    description:
      "A thick-cut Florentine T-bone from Chianina cattle, grilled over wood embers until charred outside and blood-rare inside — Florence's most revered dish, served with nothing but lemon and oil.",
    ingredients: [
      "1 Fiorentina T-bone steak, 1kg minimum, at least 4cm thick (Chianina or dry-aged beef)",
      "Coarse sea salt",
      "Cracked black pepper",
      "Extra virgin olive oil (Tuscan, if possible)",
      "1 lemon, cut in wedges",
      "Fresh rosemary for resting",
      "White cannellini beans, warm, to serve",
    ],
    steps: [
      {
        text: "Remove steak from refrigerator at least 1 hour before cooking. Season generously with coarse salt on all sides only at the very last moment.",
        duration: "60 min",
      },
      {
        text: "Build a very hot wood or charcoal fire. Allow to burn down to white-hot embers — no flames.",
      },
      {
        text: "Place steak on the grill. Do not move it. Cook 5–6 minutes until deeply charred. The rule: never press, never pierce.",
        duration: "6 min",
      },
      {
        text: "Flip once with tongs only. Cook the second side another 5 minutes.",
        duration: "5 min",
      },
      {
        text: "Stand the steak on its edge (the bone side) for 3–4 minutes to cook the thickest part.",
        duration: "4 min",
      },
      {
        text: "Rest on a board over fresh rosemary for 5 minutes. It must be served rare — any more is considered a sin in Florence.",
        duration: "5 min",
      },
      {
        text: "Slice from the bone and drizzle with best olive oil. Serve with only lemon wedges and warm cannellini beans — no sauce.",
      },
    ],
  },
  {
    id: 31,
    name: "Shakshuka Verde",
    category: "Breakfast",
    time: "35 min",
    kcal: 410,
    rating: 4.8,
    reviews: 142,
    servings: 2,
    difficulty: "Easy",
    tags: ["Eggs", "Vegetarian", "One Pan"],
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80",
    description:
      "Poached eggs nestled in a bright green sauce of spinach, herbs, and peppers, finished with feta and warm flatbread.",
    ingredients: [
      "2 tbsp olive oil",
      "1 small onion, diced",
      "1 green bell pepper, sliced",
      "2 cloves garlic, minced",
      "120g baby spinach",
      "1 cup chopped parsley and cilantro",
      "4 eggs",
      "60g feta, crumbled",
      "Salt and black pepper",
      "Flatbread to serve",
    ],
    steps: [
      {
        text: "Heat oil in a skillet. Saute onion and pepper until softened.",
        duration: "8 min",
      },
      {
        text: "Add garlic and spinach. Cook until spinach wilts, then blend with herbs and a splash of water until smooth.",
      },
      {
        text: "Return sauce to skillet, season well, and simmer gently.",
        duration: "5 min",
      },
      {
        text: "Make four wells and crack eggs in. Cover and cook until whites set and yolks stay runny.",
        duration: "6 min",
      },
      {
        text: "Top with feta and black pepper. Serve immediately with warm flatbread.",
      },
    ],
  },
  {
    id: 32,
    name: "Miso Salmon Rice Bowl",
    category: "Lunch",
    time: "30 min",
    kcal: 560,
    rating: 4.9,
    reviews: 201,
    servings: 2,
    difficulty: "Easy",
    tags: ["Salmon", "Japanese", "High Protein"],
    image:
      "https://images.unsplash.com/photo-1638502182261-7be714a565ce?auto=format&fit=crop&w=1200&q=80",
    description:
      "Oven-baked miso-glazed salmon over rice with cucumber, edamame, and sesame-lime dressing.",
    ingredients: [
      "2 salmon fillets",
      "1 tbsp white miso paste",
      "1 tbsp soy sauce",
      "1 tsp honey",
      "2 cups cooked jasmine rice",
      "1 cup shelled edamame",
      "1 cucumber, sliced",
      "1 spring onion, sliced",
      "1 tbsp sesame seeds",
      "1 lime",
    ],
    steps: [
      {
        text: "Mix miso, soy, and honey. Brush over salmon and bake at 220C until flaky.",
        duration: "12 min",
      },
      {
        text: "Warm rice and edamame. Divide between two bowls.",
      },
      {
        text: "Top with cucumber and baked salmon.",
      },
      {
        text: "Finish with lime juice, sesame seeds, and spring onion.",
      },
    ],
  },
  {
    id: 33,
    name: "Chicken Shawarma Sheet Pan",
    category: "Dinner",
    time: "45 min",
    kcal: 640,
    rating: 4.8,
    reviews: 176,
    servings: 4,
    difficulty: "Easy",
    tags: ["Chicken", "Middle Eastern", "Meal Prep"],
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1200&q=80",
    description:
      "Spiced chicken thighs roasted with onions and peppers, served with garlic yogurt and warm pita.",
    ingredients: [
      "700g boneless chicken thighs",
      "2 tbsp olive oil",
      "2 tsp ground cumin",
      "2 tsp paprika",
      "1 tsp coriander",
      "1/2 tsp cinnamon",
      "1 red onion, sliced",
      "1 red bell pepper, sliced",
      "200g Greek yogurt",
      "2 garlic cloves, grated",
      "Pita bread and lemon wedges",
    ],
    steps: [
      {
        text: "Toss chicken with oil and spices. Spread on a tray with onion and pepper.",
      },
      {
        text: "Roast at 220C until chicken is charred at edges and cooked through.",
        duration: "25 min",
      },
      {
        text: "Mix yogurt with garlic, lemon juice, and salt for sauce.",
      },
      {
        text: "Slice chicken and serve in pita with roasted vegetables and garlic yogurt.",
      },
    ],
  },
  {
    id: 34,
    name: "Mushroom Barley Soup",
    category: "Lunch",
    time: "55 min",
    kcal: 390,
    rating: 4.7,
    reviews: 118,
    servings: 4,
    difficulty: "Easy",
    tags: ["Soup", "Vegetarian", "Comfort"],
    image:
      "https://images.unsplash.com/photo-1726880789083-1291c6b38e9e?auto=format&fit=crop&w=1200&q=80",
    description:
      "A hearty soup with mixed mushrooms, pearl barley, herbs, and a rich vegetable broth.",
    ingredients: [
      "2 tbsp butter",
      "1 onion, chopped",
      "2 carrots, diced",
      "300g mixed mushrooms, sliced",
      "3 cloves garlic, minced",
      "150g pearl barley",
      "1.3L vegetable stock",
      "1 bay leaf",
      "2 tsp thyme leaves",
      "Parsley, salt, black pepper",
    ],
    steps: [
      {
        text: "Saute onion and carrots in butter until softened.",
        duration: "8 min",
      },
      {
        text: "Add mushrooms and cook until they release moisture and brown.",
        duration: "10 min",
      },
      {
        text: "Stir in garlic and barley, then add stock, bay, and thyme.",
      },
      {
        text: "Simmer gently until barley is tender. Adjust seasoning.",
        duration: "30 min",
      },
      {
        text: "Serve hot with parsley and crusty bread.",
      },
    ],
  },
  {
    id: 35,
    name: "Thai Basil Tofu Stir-Fry",
    category: "Dinner",
    time: "25 min",
    kcal: 480,
    rating: 4.8,
    reviews: 164,
    servings: 2,
    difficulty: "Medium",
    tags: ["Tofu", "Thai", "Quick"],
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    description:
      "Crispy tofu stir-fried in a savory chili-garlic sauce with green beans and lots of Thai basil.",
    ingredients: [
      "400g firm tofu, pressed",
      "2 tbsp cornstarch",
      "2 tbsp neutral oil",
      "150g green beans",
      "3 cloves garlic, minced",
      "2 red chilies, sliced",
      "1 tbsp soy sauce",
      "1 tbsp oyster sauce or mushroom sauce",
      "1 tsp sugar",
      "1 big handful Thai basil",
      "Steamed rice to serve",
    ],
    steps: [
      {
        text: "Cube tofu, coat in cornstarch, and pan-fry until crisp on all sides.",
        duration: "10 min",
      },
      {
        text: "Stir-fry green beans until bright and slightly blistered.",
        duration: "4 min",
      },
      {
        text: "Add garlic and chilies, then soy, oyster sauce, and sugar.",
      },
      {
        text: "Return tofu to pan and toss to coat. Fold in basil off heat.",
      },
      {
        text: "Serve immediately over steamed rice.",
      },
    ],
  },
  {
    id: 36,
    name: "Lemon Ricotta Pancakes",
    category: "Breakfast",
    time: "20 min",
    kcal: 450,
    rating: 4.9,
    reviews: 222,
    servings: 3,
    difficulty: "Easy",
    tags: ["Brunch", "Sweet", "Italian"],
    image:
      "https://images.unsplash.com/photo-1671527281209-7b3a8dff51ce?auto=format&fit=crop&w=1200&q=80",
    description:
      "Cloud-like pancakes with ricotta and lemon zest, served with berries and maple syrup.",
    ingredients: [
      "180g ricotta",
      "2 eggs, separated",
      "120ml milk",
      "120g flour",
      "1 tbsp sugar",
      "1 tsp baking powder",
      "Zest of 1 lemon",
      "Pinch of salt",
      "Butter for the pan",
      "Berries and maple syrup to serve",
    ],
    steps: [
      {
        text: "Whisk yolks, ricotta, milk, and lemon zest in a bowl.",
      },
      {
        text: "Fold in flour, sugar, baking powder, and salt.",
      },
      {
        text: "Whisk egg whites to soft peaks and fold gently into batter.",
      },
      {
        text: "Cook small pancakes in a buttered skillet until golden on both sides.",
        duration: "8 min",
      },
      {
        text: "Serve warm with berries and syrup.",
      },
    ],
  },
  {
    id: 37,
    name: "Pesto Gnocchi with Green Beans",
    category: "Dinner",
    time: "20 min",
    kcal: 590,
    rating: 4.7,
    reviews: 133,
    servings: 2,
    difficulty: "Easy",
    tags: ["Pasta", "Italian", "Vegetarian"],
    image:
      "https://images.unsplash.com/photo-1712762311448-8077937f0ee2?auto=format&fit=crop&w=1200&q=80",
    description:
      "Potato gnocchi tossed in basil pesto with green beans and toasted pine nuts.",
    ingredients: [
      "500g potato gnocchi",
      "150g green beans, trimmed",
      "4 tbsp basil pesto",
      "2 tbsp pasta water",
      "2 tbsp pine nuts, toasted",
      "30g parmesan, grated",
      "1 tbsp olive oil",
      "Salt and black pepper",
    ],
    steps: [
      {
        text: "Boil gnocchi until they float. Add green beans for the last 2 minutes.",
      },
      {
        text: "Reserve some cooking water and drain.",
      },
      {
        text: "Toss gnocchi and beans with pesto, olive oil, and a splash of pasta water.",
      },
      {
        text: "Top with parmesan, pine nuts, and black pepper.",
      },
    ],
  },
  {
    id: 38,
    name: "Cajun Shrimp Tacos",
    category: "Dinner",
    time: "25 min",
    kcal: 520,
    rating: 4.8,
    reviews: 189,
    servings: 3,
    difficulty: "Easy",
    tags: ["Seafood", "Tacos", "Spicy"],
    image:
      "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1200&q=80",
    description:
      "Juicy Cajun shrimp in warm tortillas with crunchy slaw and lime crema.",
    ingredients: [
      "500g peeled shrimp",
      "2 tsp Cajun seasoning",
      "1 tbsp olive oil",
      "6 corn tortillas",
      "2 cups shredded cabbage",
      "1 carrot, grated",
      "120g sour cream",
      "1 lime",
      "Coriander leaves",
      "Salt",
    ],
    steps: [
      {
        text: "Toss shrimp with Cajun seasoning, oil, and a pinch of salt.",
      },
      {
        text: "Sear shrimp in a hot pan until pink and lightly charred.",
        duration: "4 min",
      },
      {
        text: "Mix cabbage and carrot with lime juice and salt for slaw.",
      },
      {
        text: "Stir sour cream with lime zest and a little juice.",
      },
      {
        text: "Warm tortillas and assemble with shrimp, slaw, crema, and coriander.",
      },
    ],
  },
  {
    id: 39,
    name: "Harissa Chickpea Stew",
    category: "Dinner",
    time: "35 min",
    kcal: 470,
    rating: 4.7,
    reviews: 121,
    servings: 4,
    difficulty: "Easy",
    tags: ["Vegan", "North African", "One Pot"],
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    description:
      "Slow-simmered chickpeas in a spicy tomato-harissa sauce with spinach and lemon.",
    ingredients: [
      "2 tbsp olive oil",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "2 tbsp harissa paste",
      "2 x 400g cans chickpeas, drained",
      "1 x 400g can crushed tomatoes",
      "350ml vegetable stock",
      "120g spinach",
      "1 lemon",
      "Parsley and yogurt to serve (optional)",
    ],
    steps: [
      {
        text: "Saute onion in oil until soft. Add garlic and harissa and cook briefly.",
      },
      {
        text: "Add chickpeas, tomatoes, and stock. Simmer until thickened.",
        duration: "20 min",
      },
      {
        text: "Fold in spinach to wilt and finish with lemon juice.",
      },
      {
        text: "Serve with parsley and a spoon of yogurt if desired.",
      },
    ],
  },
  {
    id: 40,
    name: "Teriyaki Chicken Meatballs",
    category: "Lunch",
    time: "40 min",
    kcal: 610,
    rating: 4.8,
    reviews: 147,
    servings: 4,
    difficulty: "Medium",
    tags: ["Chicken", "Japanese", "Meal Prep"],
    image:
      "https://images.unsplash.com/photo-1757845081931-e19a586c2311?auto=format&fit=crop&w=1200&q=80",
    description:
      "Tender chicken meatballs glazed in sticky homemade teriyaki, served with rice and steamed broccoli.",
    ingredients: [
      "600g chicken mince",
      "1 egg",
      "50g panko breadcrumbs",
      "2 spring onions, sliced",
      "2 tbsp soy sauce",
      "2 tbsp mirin",
      "1 tbsp brown sugar",
      "1 tsp grated ginger",
      "1 tsp cornstarch",
      "Steamed rice and broccoli to serve",
    ],
    steps: [
      {
        text: "Mix chicken, egg, panko, and half the spring onion. Shape into meatballs.",
      },
      {
        text: "Bake at 210C until cooked through and lightly golden.",
        duration: "16 min",
      },
      {
        text: "Simmer soy, mirin, sugar, ginger, and 60ml water in a pan.",
      },
      {
        text: "Thicken with cornstarch slurry, then coat meatballs in the glaze.",
      },
      {
        text: "Serve with rice, broccoli, and remaining spring onion.",
      },
    ],
  },
  {
    id: 41,
    name: "Spinach Feta Borek",
    category: "Breakfast",
    time: "50 min",
    kcal: 530,
    rating: 4.7,
    reviews: 98,
    servings: 4,
    difficulty: "Medium",
    tags: ["Baking", "Mediterranean", "Vegetarian"],
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    description:
      "Crisp filo pastry spirals filled with spinach, feta, dill, and a touch of nutmeg.",
    ingredients: [
      "8 filo pastry sheets",
      "300g spinach, chopped",
      "200g feta, crumbled",
      "1 small onion, finely chopped",
      "1 egg",
      "2 tbsp chopped dill",
      "Pinch nutmeg",
      "4 tbsp olive oil or melted butter",
      "Sesame seeds",
      "Salt and pepper",
    ],
    steps: [
      {
        text: "Saute onion and spinach until dry. Cool, then mix with feta, egg, dill, nutmeg, and pepper.",
      },
      {
        text: "Brush filo sheets with oil. Add filling along one edge and roll into logs.",
      },
      {
        text: "Coil logs into a spiral in a greased baking dish. Brush top with oil and add sesame seeds.",
      },
      {
        text: "Bake at 190C until deep golden and crisp.",
        duration: "30 min",
      },
      {
        text: "Rest 10 minutes, then slice and serve warm.",
      },
    ],
  },
  {
    id: 42,
    name: "Korean Beef Bibimbap",
    category: "Dinner",
    time: "45 min",
    kcal: 690,
    rating: 4.9,
    reviews: 214,
    servings: 3,
    difficulty: "Medium",
    tags: ["Beef", "Korean", "Rice Bowl"],
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Rice bowls layered with gochujang beef, sauteed vegetables, and fried eggs.",
    ingredients: [
      "450g beef mince",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "1 tbsp gochujang",
      "1 tsp sugar",
      "3 cups cooked short-grain rice",
      "1 carrot, julienned",
      "150g spinach",
      "200g mushrooms, sliced",
      "3 eggs",
      "Sesame seeds and spring onion",
    ],
    steps: [
      {
        text: "Cook beef in a hot pan. Add soy, sesame oil, gochujang, and sugar; reduce until glossy.",
      },
      {
        text: "Quick-saute carrot, spinach, and mushrooms separately with a pinch of salt.",
      },
      {
        text: "Fry eggs sunny-side up.",
      },
      {
        text: "Assemble bowls with rice, beef, vegetables, and egg. Top with sesame seeds and spring onion.",
      },
    ],
  },
  {
    id: 43,
    name: "Butternut Squash Risotto",
    category: "Dinner",
    time: "50 min",
    kcal: 580,
    rating: 4.8,
    reviews: 171,
    servings: 4,
    difficulty: "Medium",
    tags: ["Italian", "Vegetarian", "Comfort"],
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80",
    description:
      "Creamy arborio risotto with roasted butternut squash, sage butter, and parmesan.",
    ingredients: [
      "1 small butternut squash, diced",
      "2 tbsp olive oil",
      "1.2L vegetable stock, warm",
      "1 onion, finely chopped",
      "2 garlic cloves, minced",
      "300g arborio rice",
      "120ml dry white wine",
      "40g butter",
      "60g parmesan, grated",
      "6 sage leaves",
      "Salt and pepper",
    ],
    steps: [
      {
        text: "Roast squash with olive oil and salt until caramelized.",
        duration: "25 min",
      },
      {
        text: "Cook onion and garlic in a saucepan until translucent.",
      },
      {
        text: "Add rice and toast 2 minutes. Deglaze with wine.",
      },
      {
        text: "Add warm stock one ladle at a time, stirring until absorbed, until rice is creamy and al dente.",
        duration: "22 min",
      },
      {
        text: "Fold in squash, butter, and parmesan. Fry sage in a little butter and spoon over to finish.",
      },
    ],
  },
  {
    id: 44,
    name: "Turkey Avocado Club Sandwich",
    category: "Lunch",
    time: "15 min",
    kcal: 540,
    rating: 4.6,
    reviews: 86,
    servings: 2,
    difficulty: "Easy",
    tags: ["Sandwich", "Quick", "High Protein"],
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80",
    description:
      "Toasted layered sandwich with turkey, bacon, avocado, tomato, and mustard mayo.",
    ingredients: [
      "6 slices wholegrain bread",
      "180g roast turkey slices",
      "4 bacon rashers, cooked",
      "1 avocado, sliced",
      "1 tomato, sliced",
      "2 lettuce leaves",
      "2 tbsp mayo",
      "1 tsp Dijon mustard",
      "Salt and black pepper",
    ],
    steps: [
      {
        text: "Toast bread slices until golden.",
      },
      {
        text: "Mix mayo with Dijon and spread on all slices.",
      },
      {
        text: "Layer turkey, tomato, lettuce, bacon, and avocado across two stacked layers.",
      },
      {
        text: "Season lightly, cap with final toast slice, and cut into triangles.",
      },
    ],
  },
  {
    id: 45,
    name: "Coconut Lentil Dahl",
    category: "Dinner",
    time: "35 min",
    kcal: 490,
    rating: 4.9,
    reviews: 205,
    servings: 4,
    difficulty: "Easy",
    tags: ["Indian", "Vegan", "One Pot"],
    image:
      "https://images.unsplash.com/photo-1767114915989-c6ab3c8fc42e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Red lentils simmered with coconut milk, ginger, and warming spices for a silky, nourishing dahl.",
    ingredients: [
      "1 tbsp coconut oil",
      "1 onion, diced",
      "3 cloves garlic, minced",
      "1 tbsp grated ginger",
      "1 tsp turmeric",
      "1 tsp cumin",
      "250g red lentils, rinsed",
      "400ml coconut milk",
      "650ml vegetable stock",
      "100g spinach",
      "Lime wedges and coriander",
    ],
    steps: [
      {
        text: "Cook onion in coconut oil until soft. Add garlic, ginger, and spices.",
      },
      {
        text: "Stir in lentils, coconut milk, and stock. Bring to a simmer.",
      },
      {
        text: "Cook until lentils break down and become creamy, stirring often.",
        duration: "25 min",
      },
      {
        text: "Fold in spinach and adjust seasoning.",
      },
      {
        text: "Serve with rice or naan, plus lime and coriander.",
      },
    ],
  },
  {
    id: 46,
    name: "Huevos Rancheros",
    category: "Breakfast",
    time: "25 min",
    kcal: 470,
    rating: 4.8,
    reviews: 154,
    servings: 2,
    difficulty: "Easy",
    tags: ["Mexican", "Eggs", "Spicy"],
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80",
    description:
      "Crisp tortillas topped with black beans, fried eggs, warm salsa, and avocado.",
    ingredients: [
      "4 corn tortillas",
      "1 tbsp olive oil",
      "1 cup black beans, drained",
      "4 eggs",
      "1 cup salsa roja",
      "1 avocado, sliced",
      "40g feta or queso fresco",
      "Coriander and lime wedges",
      "Salt and pepper",
    ],
    steps: [
      {
        text: "Toast tortillas in a skillet until lightly crisp.",
      },
      {
        text: "Warm beans and salsa separately.",
      },
      {
        text: "Fry eggs to your preferred doneness.",
      },
      {
        text: "Layer tortillas with beans, eggs, salsa, avocado, and cheese.",
      },
      {
        text: "Finish with coriander and lime juice.",
      },
    ],
  },
  {
    id: 47,
    name: "Greek Lemon Chicken Orzo",
    category: "Dinner",
    time: "40 min",
    kcal: 620,
    rating: 4.8,
    reviews: 132,
    servings: 4,
    difficulty: "Medium",
    tags: ["Chicken", "Greek", "One Pot"],
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Seared chicken thighs baked with orzo, lemon, spinach, and feta in one pan.",
    ingredients: [
      "6 boneless chicken thighs",
      "2 tbsp olive oil",
      "1 tsp dried oregano",
      "1 onion, chopped",
      "3 cloves garlic, minced",
      "250g orzo",
      "700ml chicken stock",
      "Zest and juice of 1 lemon",
      "100g spinach",
      "80g feta, crumbled",
      "Dill or parsley",
    ],
    steps: [
      {
        text: "Season chicken with oregano, salt, and pepper. Sear in a large ovenproof pan.",
        duration: "6 min",
      },
      {
        text: "Saute onion and garlic in the same pan, then stir in orzo.",
      },
      {
        text: "Add stock, lemon zest, and juice. Return chicken to pan.",
      },
      {
        text: "Bake at 200C until orzo is tender and chicken cooked through.",
        duration: "20 min",
      },
      {
        text: "Stir in spinach to wilt, top with feta and herbs, and serve.",
      },
    ],
  },
  {
    id: 48,
    name: "Paneer Tikka Skewers",
    category: "Dinner",
    time: "35 min",
    kcal: 510,
    rating: 4.7,
    reviews: 109,
    servings: 3,
    difficulty: "Medium",
    tags: ["Indian", "Vegetarian", "Grill"],
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=80",
    description:
      "Charred paneer and vegetables marinated in spiced yogurt, served with mint chutney.",
    ingredients: [
      "400g paneer, cubed",
      "1 red onion, chunks",
      "1 bell pepper, chunks",
      "150g Greek yogurt",
      "1 tbsp ginger-garlic paste",
      "1 tsp garam masala",
      "1 tsp turmeric",
      "1 tsp paprika",
      "1 tbsp lemon juice",
      "1 tbsp oil",
      "Mint chutney to serve",
    ],
    steps: [
      {
        text: "Mix yogurt, ginger-garlic, spices, lemon, and oil. Coat paneer and vegetables.",
      },
      {
        text: "Marinate at least 20 minutes.",
        duration: "20 min",
      },
      {
        text: "Thread onto skewers and grill or broil until charred at edges.",
        duration: "10 min",
      },
      {
        text: "Serve hot with mint chutney and flatbread.",
      },
    ],
  },
  {
    id: 49,
    name: "Salmon Nicoise Salad",
    category: "Lunch",
    time: "30 min",
    kcal: 560,
    rating: 4.8,
    reviews: 127,
    servings: 2,
    difficulty: "Medium",
    tags: ["Salad", "French", "Seafood"],
    image:
      "https://images.unsplash.com/photo-1621150270679-476ea643bf8b?auto=format&fit=crop&w=1200&q=80",
    description:
      "A modern Nicoise with seared salmon, baby potatoes, beans, olives, and mustard vinaigrette.",
    ingredients: [
      "2 salmon fillets",
      "300g baby potatoes",
      "150g green beans",
      "2 eggs",
      "80g cherry tomatoes",
      "50g black olives",
      "2 tbsp olive oil",
      "1 tsp Dijon mustard",
      "1 tbsp red wine vinegar",
      "Mixed leaves, salt, pepper",
    ],
    steps: [
      {
        text: "Boil potatoes until tender. Blanch green beans. Boil eggs for 7 minutes and halve.",
      },
      {
        text: "Sear salmon skin-side down until crisp, then flip briefly.",
        duration: "6 min",
      },
      {
        text: "Whisk olive oil, mustard, vinegar, salt, and pepper into a dressing.",
      },
      {
        text: "Assemble leaves, potatoes, beans, tomatoes, olives, eggs, and salmon. Drizzle dressing on top.",
      },
    ],
  },
  {
    id: 50,
    name: "Chocolate Oat Banana Muffins",
    category: "Breakfast",
    time: "35 min",
    kcal: 320,
    rating: 4.9,
    reviews: 238,
    servings: 12,
    difficulty: "Easy",
    tags: ["Baking", "Snack", "Kid Friendly"],
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1200&q=80",
    badge: "Popular",
    badgeColor: "#F59E0B",
    description:
      "Moist banana-oat muffins with cocoa and dark chocolate chips, perfect for make-ahead breakfasts.",
    ingredients: [
      "3 ripe bananas, mashed",
      "2 eggs",
      "80ml maple syrup",
      "60ml neutral oil",
      "180g rolled oats",
      "120g flour",
      "35g cocoa powder",
      "1 tsp baking powder",
      "1/2 tsp baking soda",
      "100g dark chocolate chips",
      "Pinch salt",
    ],
    steps: [
      {
        text: "Whisk mashed bananas, eggs, maple syrup, and oil.",
      },
      {
        text: "Stir in oats, flour, cocoa, baking powder, baking soda, and salt.",
      },
      {
        text: "Fold in chocolate chips and divide batter into a lined muffin tin.",
      },
      {
        text: "Bake at 180C until risen and set in the center.",
        duration: "22 min",
      },
      {
        text: "Cool on a rack and store in an airtight container.",
      },
    ],
  },
  {
    id: 51,
    name: "Smoky Tomato Lentil Pasta",
    category: "Dinner",
    time: "30 min",
    kcal: 540,
    rating: 4.8,
    reviews: 146,
    servings: 3,
    difficulty: "Easy",
    tags: ["Pasta", "Vegetarian", "High Protein"],
    image:
      "https://images.unsplash.com/photo-1741026079032-7cb660e44bad?auto=format&fit=crop&w=1200&q=80",
    description:
      "Whole-wheat pasta in a smoky tomato sauce with red lentils and basil for a protein-rich weeknight meal.",
    ingredients: [
      "250g whole-wheat pasta",
      "1 tbsp olive oil",
      "1 onion, diced",
      "2 garlic cloves, minced",
      "120g red lentils, rinsed",
      "1 x 400g can crushed tomatoes",
      "500ml vegetable stock",
      "1 tsp smoked paprika",
      "30g parmesan or vegan alternative",
      "Fresh basil, salt, black pepper",
    ],
    steps: [
      {
        text: "Cook pasta until al dente. Reserve 100ml pasta water.",
      },
      {
        text: "Saute onion and garlic in olive oil. Add lentils, paprika, tomatoes, and stock.",
        duration: "15 min",
      },
      {
        text: "Simmer until lentils are tender and sauce thickens.",
      },
      {
        text: "Toss pasta with sauce and a splash of pasta water. Finish with basil and parmesan.",
      },
    ],
  },
  {
    id: 52,
    name: "Ginger Scallion Chicken Noodles",
    category: "Lunch",
    time: "25 min",
    kcal: 570,
    rating: 4.7,
    reviews: 118,
    servings: 2,
    difficulty: "Easy",
    tags: ["Chicken", "Noodles", "Quick"],
    image:
      "https://images.unsplash.com/photo-1635685296916-95acaf58471f?auto=format&fit=crop&w=1200&q=80",
    description:
      "Silky noodles tossed with shredded chicken in a punchy ginger-scallion soy dressing.",
    ingredients: [
      "200g wheat noodles",
      "250g cooked chicken, shredded",
      "4 spring onions, finely sliced",
      "1 tbsp grated ginger",
      "2 tbsp soy sauce",
      "1 tbsp rice vinegar",
      "1 tsp sesame oil",
      "1 tsp honey",
      "1 tbsp neutral oil",
      "Sesame seeds and chili flakes",
    ],
    steps: [
      {
        text: "Cook noodles, rinse briefly, and drain well.",
      },
      {
        text: "Mix soy, rice vinegar, sesame oil, and honey in a large bowl.",
      },
      {
        text: "Heat neutral oil and pour over ginger and spring onion to release aroma.",
      },
      {
        text: "Combine noodles and chicken with dressing. Top with sesame and chili flakes.",
      },
    ],
  },
  {
    id: 53,
    name: "Baked Feta Veg Traybake",
    category: "Dinner",
    time: "40 min",
    kcal: 500,
    rating: 4.8,
    reviews: 173,
    servings: 4,
    difficulty: "Easy",
    tags: ["Vegetarian", "Traybake", "Mediterranean"],
    image:
      "https://images.unsplash.com/photo-1546069901-ec46c77ba130?auto=format&fit=crop&w=1200&q=80",
    description:
      "Roasted peppers, zucchini, and tomatoes baked with feta and herbs, served with warm pita.",
    ingredients: [
      "200g feta block",
      "1 zucchini, sliced",
      "1 red bell pepper, chunks",
      "1 yellow bell pepper, chunks",
      "250g cherry tomatoes",
      "1 red onion, wedges",
      "3 tbsp olive oil",
      "1 tsp dried oregano",
      "1 lemon",
      "Pita bread to serve",
    ],
    steps: [
      {
        text: "Arrange vegetables in a roasting dish and toss with olive oil, oregano, salt, and pepper.",
      },
      {
        text: "Nestle feta in the center and roast at 210C.",
        duration: "28 min",
      },
      {
        text: "Squeeze lemon over the tray and gently toss to combine.",
      },
      {
        text: "Serve hot with warm pita.",
      },
    ],
  },
  {
    id: 54,
    name: "Tuna Kimchi Fried Rice",
    category: "Lunch",
    time: "20 min",
    kcal: 560,
    rating: 4.7,
    reviews: 97,
    servings: 2,
    difficulty: "Easy",
    tags: ["Korean", "Rice", "Quick"],
    image:
      "https://images.unsplash.com/photo-1600688654899-379ec76aca42?auto=format&fit=crop&w=1200&q=80",
    description:
      "Savory fried rice with canned tuna, kimchi, and gochujang, finished with a jammy egg.",
    ingredients: [
      "2 cups cold cooked rice",
      "1 can tuna in olive oil, drained",
      "3/4 cup kimchi, chopped",
      "1 tbsp kimchi juice",
      "1 tsp gochujang",
      "2 spring onions, sliced",
      "1 tbsp soy sauce",
      "1 tsp sesame oil",
      "2 eggs",
      "Sesame seeds",
    ],
    steps: [
      {
        text: "Scramble eggs softly and set aside.",
      },
      {
        text: "Stir-fry kimchi and white spring onion parts. Add tuna and gochujang.",
      },
      {
        text: "Add rice, kimchi juice, and soy sauce. Fry until hot and slightly crisp.",
      },
      {
        text: "Fold in eggs, finish with sesame oil and spring onion greens.",
      },
    ],
  },
  {
    id: 55,
    name: "Apple Cinnamon Overnight Oats",
    category: "Breakfast",
    time: "10 min",
    kcal: 360,
    rating: 4.8,
    reviews: 164,
    servings: 2,
    difficulty: "Easy",
    tags: ["Meal Prep", "Healthy", "Vegetarian"],
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",
    description:
      "Creamy overnight oats with grated apple, cinnamon, chia, and toasted walnuts.",
    ingredients: [
      "100g rolled oats",
      "250ml milk of choice",
      "120g Greek yogurt",
      "1 apple, grated",
      "1 tbsp chia seeds",
      "1 tsp cinnamon",
      "1 tbsp maple syrup",
      "Pinch salt",
      "2 tbsp chopped walnuts",
    ],
    steps: [
      {
        text: "Mix oats, milk, yogurt, chia, cinnamon, maple syrup, and salt.",
      },
      {
        text: "Fold in half the grated apple and refrigerate overnight.",
        duration: "8 hr",
      },
      {
        text: "Top with remaining apple and walnuts before serving.",
      },
    ],
  },
  {
    id: 56,
    name: "Peri Peri Chicken Skewers",
    category: "Dinner",
    time: "35 min",
    kcal: 610,
    rating: 4.8,
    reviews: 139,
    servings: 4,
    difficulty: "Medium",
    tags: ["Chicken", "Grill", "Spicy"],
    image:
      "https://images.unsplash.com/photo-1677354469663-dc918927fd93?auto=format&fit=crop&w=1200&q=80",
    description:
      "Juicy chicken skewers marinated in lemony peri peri paste and charred until smoky.",
    ingredients: [
      "700g chicken thigh, chunks",
      "2 tbsp peri peri paste",
      "2 tbsp olive oil",
      "2 garlic cloves, minced",
      "1 lemon, juice and zest",
      "1 tsp smoked paprika",
      "1 tsp honey",
      "Salt and black pepper",
      "Skewers",
    ],
    steps: [
      {
        text: "Marinate chicken with peri peri paste, oil, garlic, lemon, paprika, honey, salt, and pepper.",
        duration: "20 min",
      },
      {
        text: "Thread onto skewers and grill or broil on high heat.",
        duration: "12 min",
      },
      {
        text: "Turn halfway until charred and cooked through.",
      },
      {
        text: "Rest briefly and serve with salad or rice.",
      },
    ],
  },
  {
    id: 57,
    name: "Herby Quinoa Falafel Bowl",
    category: "Lunch",
    time: "35 min",
    kcal: 520,
    rating: 4.7,
    reviews: 101,
    servings: 3,
    difficulty: "Medium",
    tags: ["Vegetarian", "Bowl", "Meal Prep"],
    image:
      "https://images.unsplash.com/photo-1616005944283-486e2bc22990?auto=format&fit=crop&w=1200&q=80",
    description:
      "Crisp baked falafel over lemon quinoa with cucumber salad and tahini drizzle.",
    ingredients: [
      "1 can chickpeas, drained",
      "1 small onion, chopped",
      "2 garlic cloves",
      "1 cup parsley and cilantro",
      "1 tsp cumin",
      "1 tbsp flour",
      "1 cup cooked quinoa",
      "1 cucumber, diced",
      "2 tbsp tahini",
      "1 lemon",
    ],
    steps: [
      {
        text: "Pulse chickpeas, onion, garlic, herbs, cumin, and flour to a coarse mixture.",
      },
      {
        text: "Shape into small patties and bake at 210C until crisp.",
        duration: "18 min",
      },
      {
        text: "Toss quinoa with lemon juice, olive oil, and salt.",
      },
      {
        text: "Serve bowls with quinoa, falafel, cucumber, and tahini-lemon sauce.",
      },
    ],
  },
  {
    id: 58,
    name: "Creamy Corn Chowder",
    category: "Dinner",
    time: "40 min",
    kcal: 470,
    rating: 4.8,
    reviews: 122,
    servings: 4,
    difficulty: "Easy",
    tags: ["Soup", "Comfort", "Vegetarian"],
    image:
      "https://images.unsplash.com/photo-1660899227222-b9fd7fe2e060?auto=format&fit=crop&w=1200&q=80",
    description:
      "Sweet corn chowder with potatoes, thyme, and a silky finish of cream and chives.",
    ingredients: [
      "2 tbsp butter",
      "1 onion, diced",
      "2 celery stalks, diced",
      "2 potatoes, diced",
      "500g corn kernels",
      "800ml vegetable stock",
      "150ml cream",
      "1 tsp thyme",
      "Chives, salt, black pepper",
    ],
    steps: [
      {
        text: "Saute onion and celery in butter until soft.",
      },
      {
        text: "Add potatoes, corn, thyme, and stock. Simmer until potatoes are tender.",
        duration: "20 min",
      },
      {
        text: "Blend one-third of the soup and return to pot for a creamy texture.",
      },
      {
        text: "Stir in cream, season, and serve with chives.",
      },
    ],
  },
  {
    id: 59,
    name: "Beef Bulgogi Lettuce Wraps",
    category: "Dinner",
    time: "30 min",
    kcal: 590,
    rating: 4.9,
    reviews: 158,
    servings: 3,
    difficulty: "Medium",
    tags: ["Beef", "Korean", "Low Carb"],
    image:
      "https://images.unsplash.com/photo-1580442151529-343f2f6e0e27?auto=format&fit=crop&w=1200&q=80",
    description:
      "Sweet-savory bulgogi beef served in crisp lettuce cups with quick pickled cucumbers.",
    ingredients: [
      "500g beef sirloin, thin sliced",
      "2 tbsp soy sauce",
      "1 tbsp brown sugar",
      "1 tbsp sesame oil",
      "2 garlic cloves, minced",
      "1 pear, grated",
      "1 cucumber, sliced",
      "1 tbsp rice vinegar",
      "Lettuce leaves",
      "Sesame seeds and spring onion",
    ],
    steps: [
      {
        text: "Marinate beef with soy, sugar, sesame oil, garlic, and grated pear.",
        duration: "15 min",
      },
      {
        text: "Quick-pickle cucumber with rice vinegar and salt.",
      },
      {
        text: "Sear beef in a very hot pan until caramelized.",
        duration: "5 min",
      },
      {
        text: "Serve in lettuce cups with cucumber, sesame seeds, and spring onion.",
      },
    ],
  },
  {
    id: 60,
    name: "Coconut Mango Chia Parfait",
    category: "Breakfast",
    time: "15 min",
    kcal: 340,
    rating: 4.8,
    reviews: 110,
    servings: 2,
    difficulty: "Easy",
    tags: ["No Cook", "Tropical", "Healthy"],
    image:
      "https://images.unsplash.com/photo-1511690743081-d916d700da58?auto=format&fit=crop&w=1200&q=80",
    description:
      "Layered chia pudding with coconut yogurt, fresh mango, and toasted coconut flakes.",
    ingredients: [
      "3 tbsp chia seeds",
      "250ml coconut milk",
      "150g coconut yogurt",
      "1 ripe mango, diced",
      "1 tbsp maple syrup",
      "1 tsp lime zest",
      "2 tbsp toasted coconut flakes",
    ],
    steps: [
      {
        text: "Mix chia seeds, coconut milk, maple syrup, and lime zest.",
      },
      {
        text: "Chill until thickened, stirring once after 10 minutes.",
        duration: "2 hr",
      },
      {
        text: "Layer chia pudding with coconut yogurt and mango.",
      },
      {
        text: "Top with toasted coconut and serve cold.",
      },
    ],
  },
  {
    id: 61,
    name: "Roasted Cauliflower Tacos",
    category: "Dinner",
    time: "30 min",
    kcal: 490,
    rating: 4.7,
    reviews: 116,
    servings: 3,
    difficulty: "Easy",
    tags: ["Vegetarian", "Tacos", "Spicy"],
    image:
      "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1200&q=80",
    description:
      "Spiced roasted cauliflower tacos with chipotle crema, cabbage slaw, and lime.",
    ingredients: [
      "1 cauliflower, florets",
      "2 tbsp olive oil",
      "1 tsp chili powder",
      "1 tsp cumin",
      "6 corn tortillas",
      "2 cups shredded cabbage",
      "100g sour cream",
      "1 tsp chipotle paste",
      "1 lime",
      "Coriander leaves",
    ],
    steps: [
      {
        text: "Toss cauliflower with oil and spices. Roast until crisp edges form.",
        duration: "20 min",
      },
      {
        text: "Mix sour cream with chipotle paste and lime juice.",
      },
      {
        text: "Warm tortillas and fill with cauliflower and cabbage.",
      },
      {
        text: "Drizzle chipotle crema and finish with coriander.",
      },
    ],
  },
  {
    id: 62,
    name: "Spinach Artichoke Stuffed Chicken",
    category: "Dinner",
    time: "45 min",
    kcal: 630,
    rating: 4.8,
    reviews: 132,
    servings: 4,
    difficulty: "Medium",
    tags: ["Chicken", "High Protein", "Baked"],
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Chicken breasts filled with creamy spinach-artichoke mixture and baked until golden.",
    ingredients: [
      "4 chicken breasts",
      "120g cream cheese",
      "100g spinach, chopped",
      "120g artichoke hearts, chopped",
      "2 garlic cloves, minced",
      "40g parmesan, grated",
      "1 tbsp olive oil",
      "1 tsp paprika",
      "Salt and black pepper",
    ],
    steps: [
      {
        text: "Cut a pocket into each chicken breast.",
      },
      {
        text: "Mix cream cheese, spinach, artichoke, garlic, and parmesan. Stuff chicken pockets.",
      },
      {
        text: "Season chicken with paprika, salt, and pepper, then sear briefly.",
      },
      {
        text: "Bake at 200C until chicken is cooked through.",
        duration: "22 min",
      },
    ],
  },
  {
    id: 63,
    name: "Soba Noodle Sesame Salad",
    category: "Lunch",
    time: "20 min",
    kcal: 450,
    rating: 4.6,
    reviews: 84,
    servings: 2,
    difficulty: "Easy",
    tags: ["Japanese", "Salad", "Vegetarian"],
    image:
      "https://images.unsplash.com/photo-1569720020116-b5ab6e71d98a?auto=format&fit=crop&w=1200&q=80",
    description:
      "Cold soba noodles tossed with crunchy vegetables in a toasted sesame dressing.",
    ingredients: [
      "180g soba noodles",
      "1 carrot, julienned",
      "1 cucumber, julienned",
      "1 red pepper, thin sliced",
      "2 spring onions, sliced",
      "1 tbsp soy sauce",
      "1 tbsp rice vinegar",
      "1 tsp honey",
      "1 tbsp tahini",
      "1 tsp sesame oil",
      "Sesame seeds",
    ],
    steps: [
      {
        text: "Cook soba, rinse under cold water, and drain.",
      },
      {
        text: "Whisk soy, vinegar, honey, tahini, sesame oil, and a splash of water.",
      },
      {
        text: "Toss noodles with vegetables and dressing.",
      },
      {
        text: "Top with sesame seeds and serve chilled.",
      },
    ],
  },
  {
    id: 64,
    name: "Turkish Menemen",
    category: "Breakfast",
    time: "18 min",
    kcal: 420,
    rating: 4.8,
    reviews: 141,
    servings: 2,
    difficulty: "Easy",
    tags: ["Eggs", "Turkish", "One Pan"],
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80",
    description:
      "Soft scrambled eggs in a buttery tomato and pepper base with Aleppo chili and parsley.",
    ingredients: [
      "1 tbsp butter",
      "1 tbsp olive oil",
      "1 green pepper, diced",
      "2 ripe tomatoes, grated",
      "4 eggs",
      "1 tsp Aleppo chili",
      "Salt and black pepper",
      "Parsley and bread to serve",
    ],
    steps: [
      {
        text: "Saute pepper in butter and olive oil until soft.",
      },
      {
        text: "Add tomatoes and chili, then reduce until thick.",
        duration: "6 min",
      },
      {
        text: "Lightly beat eggs and pour in. Stir gently for soft curds.",
      },
      {
        text: "Season and serve immediately with parsley and bread.",
      },
    ],
  },
  {
    id: 65,
    name: "Garlic Butter Shrimp Orzo",
    category: "Dinner",
    time: "25 min",
    kcal: 600,
    rating: 4.9,
    reviews: 167,
    servings: 3,
    difficulty: "Easy",
    tags: ["Seafood", "One Pot", "Quick"],
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
    description:
      "Creamy one-pot orzo with juicy shrimp, garlic butter, lemon, and parsley.",
    ingredients: [
      "400g shrimp, peeled",
      "2 tbsp butter",
      "3 garlic cloves, minced",
      "250g orzo",
      "700ml seafood or chicken stock",
      "40g parmesan",
      "1 lemon, zest and juice",
      "2 tbsp parsley, chopped",
      "Salt and black pepper",
    ],
    steps: [
      {
        text: "Sear shrimp in 1 tbsp butter until just pink, then remove.",
      },
      {
        text: "Cook garlic and orzo in remaining butter for 1 minute.",
      },
      {
        text: "Add stock and simmer, stirring occasionally, until orzo is tender.",
        duration: "12 min",
      },
      {
        text: "Return shrimp, add parmesan and lemon, then finish with parsley.",
      },
    ],
  },
  {
    id: 66,
    name: "Pumpkin Sage Pasta Bake",
    category: "Dinner",
    time: "45 min",
    kcal: 610,
    rating: 4.7,
    reviews: 94,
    servings: 4,
    difficulty: "Medium",
    tags: ["Pasta", "Vegetarian", "Baked"],
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80",
    description:
      "Baked pasta coated in creamy pumpkin sauce with mozzarella and crispy sage.",
    ingredients: [
      "300g short pasta",
      "2 tbsp olive oil",
      "1 onion, diced",
      "2 garlic cloves, minced",
      "350g pumpkin puree",
      "250ml milk",
      "80g parmesan",
      "120g mozzarella, shredded",
      "8 sage leaves",
      "Nutmeg, salt, black pepper",
    ],
    steps: [
      {
        text: "Cook pasta 2 minutes less than package instructions.",
      },
      {
        text: "Cook onion and garlic in olive oil. Add pumpkin puree, milk, nutmeg, and parmesan.",
      },
      {
        text: "Combine pasta and sauce in a baking dish. Top with mozzarella.",
      },
      {
        text: "Bake at 200C until bubbling and golden. Fry sage leaves in oil and scatter on top.",
        duration: "18 min",
      },
    ],
  },
  {
    id: 67,
    name: "Vietnamese Lemongrass Pork Bowls",
    category: "Lunch",
    time: "30 min",
    kcal: 620,
    rating: 4.8,
    reviews: 128,
    servings: 3,
    difficulty: "Medium",
    tags: ["Vietnamese", "Pork", "Rice Bowl"],
    image:
      "https://images.unsplash.com/photo-1484723045748-07d5c2e37e09?auto=format&fit=crop&w=1200&q=80",
    description:
      "Fragrant lemongrass pork served over jasmine rice with pickled carrot and cucumber.",
    ingredients: [
      "500g pork shoulder, thin sliced",
      "2 tbsp fish sauce",
      "1 tbsp soy sauce",
      "1 tbsp brown sugar",
      "1 stalk lemongrass, minced",
      "2 garlic cloves, minced",
      "3 cups cooked jasmine rice",
      "1 carrot, julienned",
      "1 cucumber, sliced",
      "Lime wedges and coriander",
    ],
    steps: [
      {
        text: "Marinate pork with fish sauce, soy, sugar, lemongrass, and garlic.",
        duration: "15 min",
      },
      {
        text: "Stir-fry pork in a hot pan until caramelized.",
      },
      {
        text: "Quick-pickle carrot and cucumber with lime juice and salt.",
      },
      {
        text: "Build bowls with rice, pork, pickles, and coriander.",
      },
    ],
  },
  {
    id: 68,
    name: "Mediterranean Chickpea Salad",
    category: "Lunch",
    time: "15 min",
    kcal: 410,
    rating: 4.7,
    reviews: 105,
    servings: 3,
    difficulty: "Easy",
    tags: ["Salad", "Vegan", "No Cook"],
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
    description:
      "Chickpeas tossed with cucumber, tomato, olives, herbs, and lemon-oregano dressing.",
    ingredients: [
      "2 cans chickpeas, drained",
      "1 cucumber, diced",
      "200g cherry tomatoes, halved",
      "1/2 red onion, minced",
      "50g olives, sliced",
      "2 tbsp parsley, chopped",
      "3 tbsp olive oil",
      "1 lemon, juiced",
      "1 tsp dried oregano",
      "Salt and black pepper",
    ],
    steps: [
      {
        text: "Combine chickpeas, cucumber, tomatoes, onion, olives, and parsley.",
      },
      {
        text: "Whisk olive oil, lemon juice, oregano, salt, and pepper.",
      },
      {
        text: "Dress salad, toss well, and rest 5 minutes before serving.",
      },
    ],
  },
  {
    id: 69,
    name: "Sticky Tofu Rice Bowl",
    category: "Dinner",
    time: "28 min",
    kcal: 530,
    rating: 4.8,
    reviews: 134,
    servings: 2,
    difficulty: "Easy",
    tags: ["Tofu", "Vegan", "High Protein"],
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    description:
      "Crispy tofu glazed in sticky soy-ginger sauce with steamed rice and broccoli.",
    ingredients: [
      "400g firm tofu",
      "2 tbsp cornstarch",
      "1 tbsp neutral oil",
      "2 tbsp soy sauce",
      "1 tbsp maple syrup",
      "1 tsp rice vinegar",
      "1 tsp grated ginger",
      "2 cups cooked rice",
      "200g broccoli florets",
      "Sesame seeds and spring onion",
    ],
    steps: [
      {
        text: "Cube tofu, coat with cornstarch, and pan-fry until golden.",
      },
      {
        text: "Mix soy, maple syrup, vinegar, and ginger. Pour into pan and reduce to a glaze.",
      },
      {
        text: "Steam broccoli until crisp-tender.",
      },
      {
        text: "Serve tofu with rice and broccoli, topped with sesame and spring onion.",
      },
    ],
  },
  {
    id: 70,
    name: "Berry Yogurt Crumble Cups",
    category: "Breakfast",
    time: "12 min",
    kcal: 330,
    rating: 4.9,
    reviews: 180,
    servings: 2,
    difficulty: "Easy",
    tags: ["Brunch", "No Cook", "Sweet"],
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1200&q=80",
    badge: "New",
    badgeColor: "#22C55E",
    description:
      "Layered Greek yogurt cups with mixed berries, honey, and quick oat-almond crumble.",
    ingredients: [
      "300g Greek yogurt",
      "200g mixed berries",
      "2 tbsp honey",
      "50g rolled oats",
      "20g sliced almonds",
      "1 tbsp coconut oil",
      "1 tsp cinnamon",
      "Pinch salt",
    ],
    steps: [
      {
        text: "Toast oats and almonds in coconut oil with cinnamon and salt until fragrant.",
        duration: "4 min",
      },
      {
        text: "Layer yogurt, berries, and crumble into glasses.",
      },
      {
        text: "Drizzle honey on top and serve immediately.",
      },
    ],
  },
];
