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

export enum MembershipTier {
  COMMIS = 'Commis',
  CHEF_DE_PARTIE = 'Chef de Partie',
  EXECUTIVE = 'Executive'
}