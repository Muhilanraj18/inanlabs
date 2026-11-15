export type ProductStatus =
  | "Concept"
  | "Experiment"
  | "In Development"
  | "Beta"
  | "Launched";

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  category: "AI Applications" | "Developer Tools" | "Software Systems" | "Spatial & Simulation";
  status: ProductStatus;
  version?: string;
  features: string[];
  metrics?: { label: string; value: string }[];
  architectureOverview: string;
  techStack: string[];
  links: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  accentColor: string;
}
