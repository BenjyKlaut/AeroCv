import { ColorPalette, TypographyOption, CVData } from "./types";

export const PALETTES: ColorPalette[] = [
  {
    id: "classic_charcoal",
    name: "Noir Classique",
    bg: "bg-slate-950",
    paperBg: "bg-white",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-600",
    accent: "text-emerald-600",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200"
  },
  {
    id: "warm_cream",
    name: "Sable Chaud",
    bg: "bg-stone-900",
    paperBg: "bg-[#faf8f5]",
    textPrimary: "text-stone-900",
    textSecondary: "text-stone-700",
    accent: "text-[#b27d42]",
    badgeBg: "bg-[#f5ece1] text-[#784e1b] border-[#e8dccb]"
  },
  {
    id: "nordic_frost",
    name: "Givre Arctique",
    bg: "bg-zinc-950",
    paperBg: "bg-slate-50",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-600",
    accent: "text-blue-600",
    badgeBg: "bg-blue-50 text-blue-800 border-blue-150"
  },
  {
    id: "royal_sapphire",
    name: "Bleu Royal",
    bg: "bg-slate-900",
    paperBg: "bg-white",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-600",
    accent: "text-indigo-600",
    badgeBg: "bg-indigo-50 text-indigo-800 border-indigo-150"
  },
  {
    id: "forest_sage",
    name: "Sauge Furtive",
    bg: "bg-emerald-950",
    paperBg: "bg-[#fcfefc]",
    textPrimary: "text-emerald-950",
    textSecondary: "text-emerald-850",
    accent: "text-teal-700",
    badgeBg: "bg-teal-50 text-teal-800 border-teal-150"
  },
  {
    id: "future_mono",
    name: "Terminal Dark",
    bg: "bg-neutral-950",
    paperBg: "bg-neutral-900",
    textPrimary: "text-green-400",
    textSecondary: "text-neutral-300",
    accent: "text-green-400",
    badgeBg: "bg-neutral-800 text-green-300 border-green-800/40"
  }
];

export const TYPOGRAPHIES: TypographyOption[] = [
  {
    id: "space_minimal",
    name: "Néo Minimaliste",
    bodyFont: "font-sans",
    headingFont: "font-space",
    headingClass: "font-space tracking-tight font-bold",
    bodyClass: "font-sans leading-relaxed text-sm"
  },
  {
    id: "editorial_serif",
    name: "Éditorial Élégant",
    bodyFont: "font-sans",
    headingFont: "font-serif",
    headingClass: "font-serif tracking-normal font-semibold italic",
    bodyClass: "font-sans leading-relaxed text-sm"
  },
  {
    id: "tech_mono",
    name: "High-Tech Mono",
    bodyFont: "font-mono",
    headingFont: "font-mono",
    headingClass: "font-mono tracking-wide font-bold uppercase",
    bodyClass: "font-mono leading-relaxed text-xs"
  },
  {
    id: "executive_sans",
    name: "Exécutif Inter",
    bodyFont: "font-sans",
    headingFont: "font-sans",
    headingClass: "font-sans tracking-tight font-bold uppercase",
    bodyClass: "font-sans leading-relaxed text-sm"
  }
];

export const INITIAL_CV_DATA: CVData = {
  fullname: "Alexandre Mercier",
  title: "Architecte Logiciel Cloud Senior & Lead React",
  email: "alexandre.mercier@creative.io",
  phone: "+33 6 45 92 10 33",
  website: "https://github.com/alex-mercier",
  location: "Paris, France",
  summary: "Architecte technique passionné avec 7 ans d'expérience dans la conception d'applications de gestion volumineuses et d'infrastructures hautement disponibles. Spécialisé en React, TypeScript et orchestration cloud moderne.",
  experience: [
    {
      company: "Kira Cloud SAS",
      role: "Lead Tech & Architecte Cloud",
      period: "2023 - Présent",
      description: [
        "Architecture d'une solution de streaming data temps-réel réduisant les temps d'indexation de 50%.",
        "Encadrement d'une équipe agile pluridisciplinaire de 8 ingénieurs frontend et SRE.",
        "Mise en place d'une infrastructure Kubernetes autonome sur GCP permettant d'optimiser les coûts d'hébergement de 30%."
      ]
    },
    {
      company: "InnovLab",
      role: "Développeur Fullstack React / Node.js",
      period: "2020 - 2023",
      description: [
        "Refonte complète de l'application SaaS d'acquisition clients, augmentant de 25% la conversion quotidienne.",
        "Gestion technique et déploiement d'APIs complexes intégrant des modèles prédictifs OpenAI.",
        "Création d'un ensemble de bibliothèques UI partagées sur l'ensemble de l'organisation."
      ]
    }
  ],
  education: [
    {
      institution: "Sorbonne Université",
      degree: "Master en Sciences Informatiques & Cloud Computing",
      period: "2018 - 2020"
    }
  ],
  skills: [
    {
      category: "Frontend & Web",
      items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Zustand", "Vite", "WebSockets"]
    },
    {
      category: "Backend & Orchestration",
      items: ["Node.js", "Express", "PostgreSQL", "Docker", "GCP", "Kubernetes", "Redis"]
    }
  ],
  languages: [
    "Français (Natif)",
    "Anglais (Professionnel - C1)"
  ],
  interests: [
    "Astronomie d'observation",
    "Synthèse modulaire audio",
    "Course de trail alpine"
  ]
};
