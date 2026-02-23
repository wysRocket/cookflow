import { AcademyModule, Ritual, Testimonial } from './types';

export const academyModules: AcademyModule[] = [
  {
    id: '1',
    city: 'Paris',
    focus: 'Modern Pastry',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?q=80&w=1200',
    level: 'Elite',
    lessons: 12,
    price: 49,
    technique: 'Lamination & Tempering',
    scientificPrinciple: 'Fat crystals in butter create steam pockets during baking, physically lifting the dough layers.'
  },
  {
    id: '2',
    city: 'Rome',
    focus: 'Artisan Pasta',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200',
    level: 'Advanced',
    lessons: 10,
    price: 55,
    technique: 'Hydration Control',
    scientificPrinciple: 'Protein networks in flour (gluten) align to trap starch granules, creating the perfect al dente bite.'
  },
  {
    id: '3',
    city: 'San Sebastián',
    focus: 'Molecular Tapas',
    image: 'https://images.unsplash.com/photo-1502301103665-0b95cc738daf?q=80&w=1200',
    level: 'Elite',
    lessons: 15,
    price: 79,
    technique: 'Spherification',
    scientificPrinciple: 'Sodium alginate cross-links with calcium ions to form a gel membrane around liquid centers.'
  },
  {
    id: '4',
    city: 'Copenhagen',
    focus: 'New Nordic Fermentation',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
    level: 'Advanced',
    lessons: 8,
    price: 45,
    technique: 'Koji Cultivation',
    scientificPrinciple: 'Microbial enzymes break down complex starches into sugars and lactic acid, creating umami depth.'
  },
  {
    id: '5',
    city: 'Marseille',
    focus: 'Seafood Butchery',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?q=80&w=1200',
    level: 'Elite',
    lessons: 14,
    price: 65,
    technique: 'Dry Aging Fish',
    scientificPrinciple: 'Controlled enzymatic breakdown of proteins improves texture and concentrates flavor compounds.'
  },
  {
    id: '6',
    city: 'Bordeaux',
    focus: 'Oenology & Pairing',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1200',
    level: 'Advanced',
    lessons: 6,
    price: 39,
    technique: 'Sensory Analysis',
    scientificPrinciple: 'Tannins bind to salivary proteins, creating astringency that cuts through rich fats.'
  },
  {
    id: '7',
    city: 'Berlin',
    focus: 'Plant-Based Molecular',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200',
    level: 'Advanced',
    lessons: 11,
    price: 44,
    technique: 'Vegetable Charcuterie',
    scientificPrinciple: 'Hydrocolloids mimic the binding properties of animal gelatin to create elastic vegetable textures.'
  },
  {
    id: '8',
    city: 'Lyon',
    focus: 'The New Mother Sauces',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200',
    level: 'Elite',
    lessons: 18,
    price: 89,
    technique: 'Cryo-Concentration',
    scientificPrinciple: 'Freezing removes water as ice crystals, leaving a hyper-concentrated, non-reduced flavor essence.'
  },
  {
    id: '9',
    city: 'Vienna',
    focus: 'Architectural Desserts',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?q=80&w=1200',
    level: 'Advanced',
    lessons: 9,
    price: 52,
    technique: 'Sugar Blowing',
    scientificPrinciple: 'Isomalt stays stable at high temperatures, allowing sugar structures to defy gravity without crystallizing.'
  }
];

export const signatureRituals: Ritual[] = [
  {
    id: 'r1',
    title: 'The 72-Hour Sourdough',
    duration: '3 Days',
    description: 'Master the biology of wild yeast. Create the perfect open crumb structure using ancient grains.',
    tags: ['Baking', 'Science']
  },
  {
    id: 'r2',
    title: 'The Molecular Bistro',
    duration: '4 Hours',
    description: 'Deconstruct classic French mother sauces into foams, gels, and soils for modern plating.',
    tags: ['Modernist', 'Texture']
  },
  {
    id: 'r3',
    title: 'Nose-to-Tail Workshop',
    duration: '1 Week',
    description: 'A respect-driven course on utilizing every part of the animal. From pâté to bone broth.',
    tags: ['Sustainability', 'Butchery']
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Elena Rossi',
    role: 'Sous Chef',
    location: 'Milan',
    quote: 'CookFlow bridged the gap between my home kitchen and the professional line. The science tips are invaluable.'
  },
  {
    id: 't2',
    name: 'Marcus Thorne',
    role: 'Restaurateur',
    location: 'London',
    quote: 'Visually stunning and technically rigorous. The fermentation module alone changed our menu.'
  },
  {
    id: 't3',
    name: 'Sophie Dubois',
    role: 'Food Stylist',
    location: 'Lyon',
    quote: 'It’s not just recipes; it’s an aesthetic education. My plating improved overnight.'
  }
];