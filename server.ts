import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini Client
let googleGenAI: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!googleGenAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY_MISSING");
    }
    googleGenAI = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return googleGenAI;
}

// Highly stylized fallback CV templates inside the server for robust key-less demo
const generateFallbackCV = (inputText: string, urlText: string): any => {
  const isLinkedIn = !!urlText;
  let cleanName = "Jean Dupont";
  let cleanTitle = "Développeur Fullstack React & Node.js";
  let targetIndustry = "tech";

  if (isLinkedIn) {
    const parts = urlText.replace(/\/$/, "").split("/");
    const handle = parts[parts.length - 1] || "jean-dupont";
    cleanName = handle
      .split("-")
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .filter(part => isNaN(Number(part)))
      .join(" ");
    if (!cleanName) cleanName = "Marie Laurent";
  }

  const combined = (inputText + " " + urlText).toLowerCase();
  
  if (combined.includes("ux") || combined.includes("design") || combined.includes("graphiste") || combined.includes("créatif")) {
    cleanTitle = "Product Designer & UI/UX specialist";
    targetIndustry = "design";
  } else if (combined.includes("marketing") || combined.includes("growth") || combined.includes("vente") || combined.includes("business")) {
    cleanTitle = "Consultant Growth Marketing";
    targetIndustry = "marketing";
  } else if (combined.includes("data") || combined.includes("python") || combined.includes("analyst")) {
    cleanTitle = "Data Analyst & Engineer";
    targetIndustry = "data";
  } else if (combined.includes("finance") || combined.includes("compta")) {
    cleanTitle = "Analyste Financier Senior";
    targetIndustry = "finance";
  }

  // Generate highly realistic mock data based on the guessed industry
  if (targetIndustry === "design") {
    return {
      fullname: cleanName,
      title: cleanTitle,
      email: `${cleanName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      phone: "+33 6 12 34 56 78",
      website: "https://portfolio.design",
      location: "Paris, France",
      summary: `Designer passionné de produits numériques, résolvant des problèmes complexes à travers des interfaces épurées et des expériences intuitives pour l'utilisateur. Plus de 5 ans d'expérience à collaborer avec des équipes produit engagées.`,
      experience: [
        {
          company: "Creative Studio",
          role: "Senior UX Designer",
          period: "2023 - Présent",
          description: [
            "Conception complète de l'architecture d'information d'applications SaaS.",
            "Animation d'ateliers de design thinking et recherche utilisateur pour identifier les points de friction.",
            "Amélioration de 35% du taux de conversion utilisateur grâce à la refonte du tunnel d'inscription."
          ]
        },
        {
          company: "AeroWeb",
          role: "UI Specialist",
          period: "2020 - 2023",
          description: [
            "Création et maintenance d'un Design System complet sur Figma.",
            "Prototypage haute fidélité pour accélérer l'intégration par l'équipe d'ingénieurs.",
            "Collaboration rapprochée avec les analystes de données pour optimiser l'engagement des pages."
          ]
        }
      ],
      education: [
        {
          institution: "École Supérieure du Digital",
          degree: "Master en Design d'Interaction",
          period: "2018 - 2020"
        },
        {
          institution: "Université de Lyon",
          degree: "Licence en Arts Numériques",
          period: "2015 - 2018"
        }
      ],
      skills: [
        {
          category: "Design",
          items: ["UI & UX", "Design Systems", "Prototypage", "Figma", "Adobe CC", "Recherche utilisateur"]
        },
        {
          category: "Soft Skills",
          items: ["Communication", "Empathie", "Design Thinking", "Gestion de projet", "Agile"]
        }
      ],
      languages: ["Français (Natif)", "Anglais (Courant)"],
      interests: ["Illustration vectorielle", "Photographie argentique", "Randonnée alpine"]
    };
  }

  if (targetIndustry === "marketing") {
    return {
      fullname: cleanName,
      title: cleanTitle,
      email: `${cleanName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      phone: "+33 6 88 44 22 11",
      website: "https://growthmindset.io",
      location: "Lyon, France",
      summary: `Consultant en Marketing Digital passionné par l'acquisition client et la croissance numérique. Spécialisé en SEO technique, campagnes payantes (SEA/SMA) et analytique avancée pour générer des leads qualifiés.`,
      experience: [
        {
          company: "HyperGrowth Agency",
          role: "Senior Growth Marketer",
          period: "2022 - Présent",
          description: [
            "Définition de stratégies d'acquisition multicanales pour 15+ startups.",
            "Optimisation du netlinking et du SEO on-page ayant conduit à une hausse de 120% du trafic organique.",
            "Optimisation d'un budget publicitaire de 50k€/mois avec un ROAS moyen de 4.2."
          ]
        },
        {
          company: "E-Commerce Corp",
          role: "Responsable Trafic & Acquisition",
          period: "2019 - 2022",
          description: [
            "Pilotage des campagnes SEA (Google Ads, Bing Ads) et SMA (Meta, LinkedIn).",
            "Mise en place de tableaux de bord de suivi de performance via Google Looker Studio.",
            "Réalisation de tests A/B continus sur les landing pages clé, augmentant la conversion de 18%."
          ]
        }
      ],
      education: [
        {
          institution: "Kedge Business School",
          degree: "Master en Marketing Digital & Data Science",
          period: "2017 - 2019"
        }
      ],
      skills: [
        {
          category: "Acquisition",
          items: ["SEO", "Google Ads", "Meta Ads", "LinkedIn Ads", "Copywriting", "A/B Testing"]
        },
        {
          category: "Analytics",
          items: ["Google Analytics 4", "GTM", "Looker Studio", "Excel", "SQL"]
        }
      ],
      languages: ["Français (Natif)", "Anglais (Négociateur)"],
      interests: ["Sailing", "Podcasts d'entrepreneuriat", "Échecs"]
    };
  }

  if (targetIndustry === "data") {
    return {
      fullname: cleanName,
      title: cleanTitle,
      email: `${cleanName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      phone: "+33 6 44 55 66 77",
      website: "https://datastudio.net",
      location: "Nantes, France",
      summary: `Ingénieur de données spécialisé dans l'extraction de connaissances à partir de structures complexes. Passionné par l'automatisation des pipelines ETL, le machine learning pratique et la datavisualisation rigoureuse.`,
      experience: [
        {
          company: "DataMetrics SAS",
          role: "Data Analyst Senior",
          period: "2021 - Présent",
          description: [
            "Création et optimisation de pipelines de données volumineux avec Python, Spark et dbt.",
            "Construction de rapports de veille décisionnelle pour les directeurs de division (Tableau, PowerBI).",
            "Amélioration des modèles d'analyse prédictive réduisant le taux d'attrition clients de 12%."
          ]
        },
        {
          company: "CloudTech",
          role: "Data Analyst Junior",
          period: "2018 - 2021",
          description: [
            "Conception de requêtes complexes sur PostgreSQL et BigQuery pour auditer la qualité de données.",
            "Automatisation de scripts de reporting quotidien en Bash et Python.",
            "Création de documentation technique pour démocratiser l'usage du SQL auprès des équipes métiers."
          ]
        }
      ],
      education: [
        {
          institution: "Télécom Paris",
          degree: "Master Spécialisé Big Data & Machine Learning",
          period: "2016 - 2018"
        }
      ],
      skills: [
        {
          category: "Technologies",
          items: ["Python", "SQL", "Pandas", "PostgreSQL", "dbt", "Airflow", "BigQuery"]
        },
        {
          category: "Visualisation",
          items: ["Tableau", "PowerBI", "Seaborn", "Looker Studio"]
        }
      ],
      languages: ["Français (Natif)", "Anglais (Technique)"],
      interests: ["Open-Source contribution", "Astronomie", "Musique de synthèse"]
    };
  }

  // Default Fullstack React Developer template
  return {
    fullname: cleanName,
    title: cleanTitle,
    email: `${cleanName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
    phone: "+33 6 99 00 11 22",
    website: "https://github.com/developer",
    location: "Paris, France",
    summary: `Ingénieur d'application passionné par les technologies du Web moderne, spécialisé dans l'écosystème React, TypeScript et Node.js. Adepte des architectures orientées performance et de l'intégration continue.`,
    experience: [
      {
        company: "InnovTech Solution",
        role: "Développeur React Senior",
        period: "2022 - Présent",
        description: [
          "Architecture et développement d'une application de gestion financière hautement interactive en React 18 et Zustand.",
          "Optimisation du bundle d'application et mise en place du Lazy Loading, réduisant le temps de chargement de 40%.",
          "Encadrement technique de 3 développeurs juniors et animation de revues de code hebdomadaires."
        ]
      },
      {
        company: "WebCraft Studio",
        role: "Développeur FullStack Junior",
        period: "2019 - 2022",
        description: [
          "Développement d'APIs REST résilientes avec Express.js et PostgreSQL.",
          "Création de maquettes administratives réactives avec Tailwind CSS et TypeScript.",
          "Mise en place de tests unitaires et d'intégration avec Jest permettant de couvrir 85% de la base de code."
        ]
      }
    ],
    education: [
      {
        institution: "Epitech Lyon",
        degree: "Expert en Technologies de l'Information (Bac+5)",
        period: "2014 - 2019"
      }
    ],
    skills: [
      {
        category: "Frontend",
        items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Zustand / Redux", "Vite"]
      },
      {
        category: "Backend & Devops",
        items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Docker", "CI/CD / GitHub Actions"]
      }
    ],
    languages: ["Français (Natif)", "Anglais (Professionnel)"],
    interests: ["Drones FPV", "Piano Jazz", "Jeux de plateau Coopératifs"]
  };
};

app.post("/api/generate-cv", async (req, res) => {
  const { inputText, linkedinUrl } = req.body;

  if (!inputText && !linkedinUrl) {
    return res.status(400).json({ error: "Veuillez fournir une description ou un lien LinkedIn." });
  }

  try {
    const ai = getGeminiClient();

    const systemPrompt = `Tu es un expert en recrutement et en rédaction de CV professionnels de haut niveau. 
Ta tâche est de prendre les données d'entrée fournies (une description textuelle de soi ou un lien de profil LinkedIn) et de les transformer en un CV complet, ultra-professionnel, moderne, impeccable, structuré et rédigé en Français.

Consignes spéciales:
- Si le profil LinkedIn est fourni, analyse la structure de l'URL pour formuler un magnifique CV extrêmement réaliste et personnalisé pour son profil. Sois créatif pour formuler une bio, un titre, des expériences et des compétences correspondant parfaitement au rôle de la personne.
- Structure parfaitement les retours d'expériences en listant les accomplissements chiffrés et formuels sous forme de liste de puces textuelles percutantes.
- Retourne uniquement le fichier JSON brut correspondant au format attendu, sans aucun bloc de code markdown.`;

    const userPrompt = `Génère les données de CV basées sur les informations suivantes:
Description textuelle: "${inputText || 'Aucune fournie, s\'inspirer du profil linkedin'}"
Lien LinkedIn: "${linkedinUrl || 'Aucun fourni'}"`;

    let response;
    let attempts = 0;
    while (true) {
      try {
        response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                fullname: { type: Type.STRING, description: "Nom et prénom" },
                title: { type: Type.STRING, description: "Titre de poste professionnel, moderne et précis" },
                email: { type: Type.STRING, description: "Adresse email professionnelle" },
                phone: { type: Type.STRING, description: "Numéro de téléphone portable" },
                website: { type: Type.STRING, description: "Lien de site web ou portfolio personnel (optionnel)" },
                location: { type: Type.STRING, description: "Ville et Pays (ex: Paris, France)" },
                summary: { type: Type.STRING, description: "Un résumé exécutif percutant, inspirant, décrivant la proposition de valeur unique et la passion créative (environ 3-4 lignes)" },
                experience: {
                  type: Type.ARRAY,
                  description: "Liste des expériences professionnelles (2 à 3 éléments)",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      company: { type: Type.STRING, description: "Nom de l'entreprise" },
                      role: { type: Type.STRING, description: "Rôle exact occupé" },
                      period: { type: Type.STRING, description: "Période (ex: 2021 - Présent ou 2019 - 2021)" },
                      description: {
                        type: Type.ARRAY,
                        description: "3 à 4 puces décrivant des accomplissements précis, responsabilités et impacts chiffrés réalistes",
                        items: { type: Type.STRING }
                      }
                    },
                    required: ["company", "role", "period", "description"]
                  }
                },
                education: {
                  type: Type.ARRAY,
                  description: "Diplômes et parcours académique (1 à 2 éléments)",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      institution: { type: Type.STRING, description: "Nom de l'école ou université" },
                      degree: { type: Type.STRING, description: "Intitulé du diplôme ou certification" },
                      period: { type: Type.STRING, description: "Période (ex: 2017 - 2020)" }
                    },
                    required: ["institution", "degree", "period"]
                  }
                },
                skills: {
                  type: Type.ARRAY,
                  description: "Catégories de compétences (ex: Hard Skills, Methodologies)",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      category: { type: Type.STRING, description: "Nom de la catégorie" },
                      items: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                      }
                    },
                    required: ["category", "items"]
                  }
                },
                languages: {
                  type: Type.ARRAY,
                  description: "Langues parlées avec niveau",
                  items: { type: Type.STRING }
                },
                interests: {
                  type: Type.ARRAY,
                  description: "Intérêts ou passions",
                  items: { type: Type.STRING }
                }
              },
              required: ["fullname", "title", "email", "phone", "location", "summary", "experience", "education", "skills"]
            }
          }
        });
        break;
      } catch (err: any) {
        attempts++;
        const errStr = String(err?.message || err || "");
        const isTemporary = errStr.includes("503") || 
                            errStr.toLowerCase().includes("unavailable") || 
                            errStr.toLowerCase().includes("overload") || 
                            errStr.toLowerCase().includes("high demand") || 
                            errStr.toLowerCase().includes("rate limit") || 
                            errStr.toLowerCase().includes("429");
        
        if (isTemporary && attempts < 3) {
          console.warn(`[GEMINI RETRY] Attempt ${attempts}/3 failed with temporary error: ${errStr}. Retrying in 1s...`);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } else {
          throw err;
        }
      }
    }

    const parsedData = JSON.parse(response.text || "{}");
    return res.json({ 
      data: parsedData,
      isMock: false
    });

  } catch (error: any) {
    const errorMsg = String(error?.message || error || "");
    console.warn("Gemini Error or API key missing, loading local super mock generator as fallback:", errorMsg);
    
    let feedbackMessage = "Votre CV a été synthétisé à l'aide de notre modèle de génération locale heuristique.\nPour utiliser le modèle de reformulation avancée en temps réel Gemini 3.5 Flash, veuillez ajouter simplement votre clé GEMINI_API_KEY dans le tiroir d'environnement Secrets de l'application !";
    
    const is503 = errorMsg.includes("503") || 
                  errorMsg.toLowerCase().includes("unavailable") || 
                  errorMsg.toLowerCase().includes("overload") || 
                  errorMsg.toLowerCase().includes("high demand");
                  
    const isMissingKey = errorMsg.includes("GEMINI_API_KEY_MISSING") || 
                          errorMsg.toLowerCase().includes("credentials") || 
                          errorMsg.toLowerCase().includes("api key") || 
                          errorMsg.toLowerCase().includes("key not found");
    
    if (is503) {
      feedbackMessage = "L'API Gemini subit actuellement une forte demande temporaire (Erreur 503 / Service Indisponible).\nAeroCV a activé instantanément son moteur heuristique local ultra-réaliste pour maintenir votre productivité sans interruption.\nN'hésitez pas à ré-essayer dans quelques instants !";
    } else if (!isMissingKey) {
      feedbackMessage = `Le serveur a activé son moteur de secours heuristique local en raison d'une indisponibilité technique de l'API Gemini : "${errorMsg.substring(0, 120)}..."\nN'hésitez pas à réessayer votre demande plus tard.`;
    }

    const fallbackData = generateFallbackCV(inputText || "", linkedinUrl || "");
    return res.json({
      data: fallbackData,
      isMock: true,
      message: feedbackMessage
    });
  }
});

// Serve frontend assets
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server loaded and listening on port ${PORT}`);
  });
}

setupServer();
