export interface AcademyModule {
  id: string;
  city: string;
  focus: string;
  image: string;
  level: 'Beginner' | 'Advanced' | 'Elite';
  lessons: number;
  price: number;
  technique: string;
  scientificPrinciple: string;
}

export interface Ritual {
  id: string;
  title: string;
  duration: string;
  description: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  location: string;
}

export interface Recipe {
  readonly id: number;
  readonly name: string;
  readonly category: string;
  readonly time: string;
  readonly kcal: number;
  readonly rating: number;
  readonly difficulty: "Easy" | "Medium" | "Hard";
  readonly tags: string[];
  readonly image: string;
  readonly detailImage?: string;
  readonly badge?: string;
  readonly badgeColor?: string;
  readonly servings: number;
  readonly description: string;
  readonly ingredients: string[];
  readonly steps: { readonly text: string; readonly duration?: string }[];
  readonly reviews: number;
}

export interface Chef {
  readonly id: number;
  readonly name: string;
  readonly title: string;
  readonly city: string;
  readonly focus: string;
  readonly image: string;
  readonly rating: number;
  readonly students: number;
  readonly courses: number;
  readonly tags: string[];
  readonly cuisine: string;
  readonly bio: string;
  readonly banner: string;
  readonly avatar: string;
  readonly featuredRecipeId: number;
  readonly creations: number[];
}
