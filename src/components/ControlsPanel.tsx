import { useState, ChangeEvent } from "react";
import { CVData, TemplateType } from "../types";
import { PALETTES, TYPOGRAPHIES } from "../constants";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Linkedin, Keyboard, Check, Printer, Settings, Feather, RefreshCw, AlertTriangle, Layers, Download, Upload } from "lucide-react";

interface ControlsPanelProps {
  onCVGenerated: (data: CVData, alertMsg: string | null) => void;
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
  selectedPaletteId: string;
  onPaletteChange: (paletteId: string) => void;
  selectedTypographyId: string;
  onTypographyChange: (typoId: string) => void;
  onPrint: () => void;
  onReset: () => void;
  onExportJSON: () => void;
  onImportJSON: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ControlsPanel({
  onCVGenerated,
  selectedTemplate,
  onTemplateChange,
  selectedPaletteId,
  onPaletteChange,
  selectedTypographyId,
  onTypographyChange,
  onPrint,
  onReset,
  onExportJSON,
  onImportJSON
}: ControlsPanelProps) {
  const [activeTab, setActiveTab] = useState<"text" | "linkedin">("text");
  const [inputText, setInputText] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const templates: { id: TemplateType; label: string; desc: string }[] = [
    { id: "minimalist", label: "Néo Minimaliste", desc: "Design aéré, moderne et épuré" },
    { id: "traditional", label: "Noir Classique", desc: "Sérieux, centré et académique" },
    { id: "tech_mono", label: "Terminal Mono", desc: "Inspiré du code, précis et ordonné" },
    { id: "editorial", label: "Asymmetric Book", desc: "Mise en page éditoriale de magazine" }
  ];

  // List of progressive loading status messages for beautiful UX
  const loadingStages = [
    "Connexion au serveur de traitement...",
    "Analyse des données d'entrée par l'IA...",
    "Extraction de l'expérience et des réalisations...",
    "Génération des compétences avec Gemini 3.5...",
    "Optimisation de la mise en page sous forme de données...",
    "Finalisation du modèle minimaliste..."
  ];

  const handleGenerate = async () => {
    if (activeTab === "text" && !inputText.trim()) return;
    if (activeTab === "linkedin" && !linkedinUrl.trim()) return;

    setLoading(true);
    let stageIdx = 0;
    setLoadingMessage(loadingStages[0]);

    // Stagger loading messages for ultimate high-tech animated immersion
    const interval = setInterval(() => {
      if (stageIdx < loadingStages.length - 1) {
        stageIdx++;
        setLoadingMessage(loadingStages[stageIdx]);
      }
    }, 1800);

    try {
      const response = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputText: activeTab === "text" ? inputText : "",
          linkedinUrl: activeTab === "linkedin" ? linkedinUrl : ""
        })
      });

      const result = await response.json();
      clearInterval(interval);

      if (response.ok && result.data) {
        onCVGenerated(
          result.data,
          result.isMock ? (result.message || "Généré en mode démonstration locale") : null
        );
      } else {
        alert(result.error || "Une erreur est survenue lors de la génération.");
      }
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      alert("Impossible de contacter le serveur de génération.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-fit flex flex-col gap-6 bg-zinc-950 p-6 rounded-2xl border border-zinc-900 shadow-xl print-hidden">
      
      {/* 1. SECTION IA GENERATOR */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
          <h3 className="font-space font-bold text-lg tracking-tight">Générer avec l'IA</h3>
        </div>

        {/* Tab switcher */}
        <div className="flex p-0.5 rounded-lg bg-zinc-900 border border-zinc-800">
          <button
            onClick={() => setActiveTab("text")}
            className={`flex-1 py-2 text-xs font-medium rounded-md flex items-center justify-center gap-2 transition-all cursor-pointer ${activeTab === "text" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-white"}`}
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>Texte libre</span>
          </button>
          <button
            onClick={() => setActiveTab("linkedin")}
            className={`flex-1 py-2 text-xs font-medium rounded-md flex items-center justify-center gap-2 transition-all cursor-pointer ${activeTab === "linkedin" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-white"}`}
          >
            <Linkedin className="w-3.5 h-3.5 text-blue-400" />
            <span>Profil LinkedIn</span>
          </button>
        </div>

        {/* Inputs */}
        <div className="relative">
          {activeTab === "text" ? (
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ex: Je suis développeur React lyonnais avec 4 ans d'expérience chez InnovLab, diplômé d'Epitech. J'adore l'UI/UX et le Cloud SRE..."
              className="w-full min-h-[90px] bg-[#12141c] border border-zinc-850 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none font-sans"
            />
          ) : (
            <div className="space-y-2">
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://www.linkedin.com/in/jean-dupont"
                className="w-full bg-[#12141c] border border-zinc-850 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-mono"
              />
              <p className="text-[10px] text-zinc-500 px-1 leading-normal italic">
                Saisissez un lien LinkedIn réel ou fictif. L'IA concevra instantanément la modélisation correspondante au profil.
              </p>
            </div>
          )}
        </div>

        {/* Trigger generator button */}
        <motion.button
          onClick={handleGenerate}
          disabled={loading || (activeTab === "text" && !inputText) || (activeTab === "linkedin" && !linkedinUrl)}
          className={`w-full py-3 px-4 rounded-xl font-space font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${loading ? "bg-zinc-800 text-zinc-500" : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 shadow-emerald-500/5"}`}
          whileHover={loading ? {} : { scale: 1.02 }}
          whileTap={loading ? {} : { scale: 0.98 }}
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
              <span>Génération en cours...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 fill-zinc-950" />
              <span>Générer mon CV</span>
            </>
          )}
        </motion.button>

        {/* Loading details display */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 rounded-lg border border-zinc-900 bg-[#0d0f15] text-[10px] font-mono text-emerald-400 flex items-center gap-2"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span className="truncate">{loadingMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <hr className="border-zinc-900" />

      {/* 2. SECTION DESIGN TEMPLATES */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-white">
          <Layers className="w-4 h-4 text-emerald-400" />
          <h3 className="font-space font-bold text-xs uppercase tracking-wider text-zinc-400">Modèles Visuels</h3>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {templates.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => onTemplateChange(tmpl.id)}
              className={`w-full p-3 rounded-xl border text-left transition-all relative flex flex-col cursor-pointer ${selectedTemplate === tmpl.id ? "bg-[#111622] border-emerald-500 shadow-inner" : "bg-zinc-900/40 border-zinc-900 hover:border-zinc-800"}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-space font-semibold text-xs text-white">{tmpl.label}</span>
                {selectedTemplate === tmpl.id && (
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-zinc-950 p-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
              <span className="text-[10px] text-zinc-500 mt-1">{tmpl.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <hr className="border-zinc-900" />

      {/* 3. SECTION COLOR PALETTE AND FONTS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-white">
          <Settings className="w-4 h-4 text-emerald-400" />
          <h3 className="font-space font-bold text-xs uppercase tracking-wider text-zinc-400">Nuances & Polices</h3>
        </div>

        {/* Color pickers */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-zinc-500 block">Thème de couleur :</span>
          <div className="flex flex-wrap gap-2.5">
            {PALETTES.map((pal) => {
              // Extract preview colors
              let colorDot = "bg-white";
              if (pal.id === "warm_cream") colorDot = "bg-[#b27d42]";
              else if (pal.id === "nordic_frost") colorDot = "bg-blue-500";
              else if (pal.id === "royal_sapphire") colorDot = "bg-indigo-600";
              else if (pal.id === "forest_sage") colorDot = "bg-teal-700";
              else if (pal.id === "future_mono") colorDot = "bg-green-400";
              else colorDot = "bg-emerald-600";

              return (
                <button
                  key={pal.id}
                  onClick={() => onPaletteChange(pal.id)}
                  title={pal.name}
                  className={`w-8 h-8 rounded-full flex items-center justify-center relative cursor-pointer border hover:scale-110 transition ${selectedPaletteId === pal.id ? "border-white" : "border-transparent"}`}
                >
                  <div className={`w-5 h-5 rounded-full ${colorDot}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Typography buttons */}
        <div className="space-y-2 pt-1">
          <span className="text-[10px] font-mono text-zinc-500 block">Style Typographique :</span>
          <div className="grid grid-cols-2 gap-1.5">
            {TYPOGRAPHIES.map((typo) => (
              <button
                key={typo.id}
                onClick={() => onTypographyChange(typo.id)}
                className={`py-2 px-2.5 rounded-lg text-[10px] font-medium text-center transition cursor-pointer border ${selectedTypographyId === typo.id ? "bg-zinc-800 text-white border-zinc-700" : "bg-zinc-900/20 text-zinc-400 border-transparent hover:bg-zinc-900"}`}
              >
                {typo.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-zinc-900" />

      {/* 4. ACTIONS: DOWNLOAD / PRINT / RESET & BACKUPS */}
      <div className="space-y-3 pt-2">
        <motion.button
          onClick={onPrint}
          className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-space font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <Printer className="w-4 h-4 text-emerald-600" />
          <span>Imprimer / Exporter PDF</span>
        </motion.button>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={onExportJSON}
            title="Exporter vos données de CV sous format JSON pour les sauvegarder"
            className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 text-zinc-300 hover:text-white transition text-[10px] font-mono flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sauvegarder JSON</span>
          </button>

          <label
            title="Importer un fichier JSON de sauvegarde AeroCV existant"
            className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 text-zinc-300 hover:text-white transition text-[10px] font-mono flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-blue-400" />
            <span>Importer JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={onImportJSON}
              className="hidden"
            />
          </label>
        </div>

        <button
          onClick={onReset}
          className="w-full py-2 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-850 text-zinc-500 hover:text-zinc-300 transition text-[9px] font-mono flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Réinitialiser les données d'origine</span>
        </button>
      </div>

    </div>
  );
}
