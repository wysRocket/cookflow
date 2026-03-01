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
      "https://images.unsplash.com/photo-1559828552-6780c1ece029?q=80&w=1200",
    level: "Advanced",
    lessons: 9,
    price: 52,
    technique: "Sugar Blowing",
    scientificPrinciple:
      "Isomalt stays stable at high temperatures, allowing sugar structures to defy gravity without crystallizing.",
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
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80",
    featuredRecipeId: 1,
    creations: [1, 2, 8, 11],
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
    featuredRecipeId: 4,
    creations: [5, 9, 12, 3],
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
    creations: [6, 10, 12, 7],
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
    creations: [4, 11, 1, 9],
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
    creations: [8, 3, 5, 2],
  },
  {
    id: 6,
    name: "Chef Luca Ferrara",
    title: "GRILL MASTER",
    city: "Florence, IT",
    focus: "Fire Cooking & Whole Animal",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    students: 1780,
    courses: 6,
    tags: ["Grill", "Butchery"],
    cuisine: "Fire Cooking & Whole Animal Butchery",
    bio: '"Reconnecting with the primal origins of cooking. If it involves smoke, char, and high heat, I want to teach it to you."',
    banner:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    avatar:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80",
    featuredRecipeId: 1,
    creations: [1, 4, 8, 9],
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
      "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80",
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
];
