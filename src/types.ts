export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface CVData {
  fullname: string;
  title: string;
  email: string;
  phone: string;
  website?: string;
  location: string;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  languages?: string[];
  interests?: string[];
}

export type TemplateType = "traditional" | "minimalist" | "tech_mono" | "editorial";

export interface ColorPalette {
  id: string;
  name: string;
  bg: string;          // Page wrapper background
  paperBg: string;     // Resume body background
  textPrimary: string; // Primary headings
  textSecondary: string; // Body text
  accent: string;      // Accent triggers, borders, badges
  badgeBg: string;     // Tag background
}

export interface TypographyOption {
  id: string;
  name: string;
  bodyFont: string;
  headingFont: string;
  headingClass: string;
  bodyClass: string;
}
