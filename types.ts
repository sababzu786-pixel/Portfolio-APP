
export enum AppView {
  PORTFOLIO = 'PORTFOLIO',
  SEO_WRITER = 'SEO_WRITER',
  DIGITAL_CREATION = 'DIGITAL_CREATION'
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface SEOAnalysis {
  title: string;
  metaDescription: string;
  content: string;
  keywords: string[];
  score: number;
}

export interface CreationResult {
  type: 'image' | 'video';
  url: string;
  prompt: string;
}
