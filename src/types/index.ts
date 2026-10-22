export type Language = 'bn' | 'en';

export interface Project {
  id: string;
  title: { bn: string; en: string };
  category: 'commercial' | 'documentary' | 'motion' | 'grading';
  categoryLabel: { bn: string; en: string };
  client: string;
  year: string;
  duration: string;
  image: string;
  description: { bn: string; en: string };
  challenge: { bn: string; en: string };
  solution: { bn: string; en: string };
  tools: string[];
  metrics: { label: { bn: string; en: string }; value: string };
  aspectRatio?: string;
  hasGradeComparison?: boolean;
}

export interface Service {
  id: string;
  number: string;
  title: { bn: string; en: string };
  tagline: { bn: string; en: string };
  description: { bn: string; en: string };
  deliverables: { bn: string[]; en: string[] };
  software: string[];
  turnaround: { bn: string; en: string };
}

export interface Testimonial {
  id: string;
  quote: { bn: string; en: string };
  author: string;
  role: { bn: string; en: string };
  company: string;
  impact: { bn: string; en: string };
}
