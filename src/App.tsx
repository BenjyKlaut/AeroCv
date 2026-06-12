import { useState, useEffect, ChangeEvent } from "react";
import { CVData, TemplateType } from "./types";
import { INITIAL_CV_DATA, PALETTES, TYPOGRAPHIES } from "./constants";
import AnimatedLanding from "./components/AnimatedLanding";
import ControlsPanel from "./components/ControlsPanel";
import ResumeLiveEditor from "./components/ResumeLiveEditor";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, AlertCircle, RefreshCw, X, Heart, Github, Star } from "lucide-react";

export default function App() {
  const [currentCVData, setCurrentCVData] = useState<CVData>(() => {
    const saved = localStorage.getItem("aerocv_data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_CV_DATA;
      }
    }
    return INITIAL_CV_DATA;
  });

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(() => {
    return (localStorage.getItem("aerocv_template") as TemplateType) || "minimalist";
  });
  
  const [selectedPaletteId, setSelectedPaletteId] = useState<string>(() => {
    return localStorage.getItem("aerocv_palette") || "classic_charcoal";
  });

  const [selectedTypographyId, setSelectedTypographyId] = useState<string>(() => {
    return localStorage.getItem("aerocv_typography") || "space_minimal";
  });
  
  // Alert/Feedback state for Gemini fallback warnings
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Synchronize layout selections to localStorage for ultimate session restoration
  useEffect(() => {
    localStorage.setItem("aerocv_data", JSON.stringify(currentCVData));
  }, [currentCVData]);

  useEffect(() => {
    localStorage.setItem("aerocv_template", selectedTemplate);
  }, [selectedTemplate]);

  useEffect(() => {
    localStorage.setItem("aerocv_palette", selectedPaletteId);
  }, [selectedPaletteId]);

  useEffect(() => {
    localStorage.setItem("aerocv_typography", selectedTypographyId);
  }, [selectedTypographyId]);

  // Active palette configuration object
  const activePalette = PALETTES.find(p => p.id === selectedPaletteId) || PALETTES[0];
  const activeTypography = TYPOGRAPHIES.find(t => t.id === selectedTypographyId) || TYPOGRAPHIES[0];

  // Auto-scroll down when clicking start
  const handleStartEditing = () => {
    const workspaceElement = document.getElementById("cv-workspace");
    if (workspaceElement) {
      workspaceElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Launch browser native print interface configured with custom print CSS stylesheet
  const handlePrint = () => {
    window.print();
  };

  // Clear CV details back to the default original template
  const handleReset = () => {
    if (window.confirm("Voulez-vous vraiment réinitialiser toutes les données de votre CV ? Cette action remplacera vos modifications locales par l'exemple par défaut.")) {
      setCurrentCVData(INITIAL_CV_DATA);
      setAlertMessage(null);
    }
  };

  // Export CV Data in JSON file format
  const handleExportJSON = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentCVData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `AeroCV_${currentCVData.fullname.replace(/\s+/g, "_")}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      alert("Erreur lors de l'exportation.");
    }
  };

  // Load CV Data from external JSON file upload
  const handleImportJSON = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && parsed.fullname && parsed.experience) {
            setCurrentCVData(parsed);
            alert("Félicitations ! Les données de votre CV ont été importées avec succès.");
          } else {
            alert("Le fichier JSON n'est pas au bon format AeroCV standard.");
          }
        } catch (error) {
          alert("Erreur lors du décodage du fichier JSON.");
        }
      };
    }
  };

  // Handle generative delivery
  const handleCVGenerated = (generatedData: CVData, alertMsg: string | null) => {
    setCurrentCVData(generatedData);
    setAlertMessage(alertMsg);
    
    // Auto scroll down directly to the paper once parsed
    setTimeout(() => {
      const paperElement = document.getElementById("cv-paper-section");
      if (paperElement) {
        paperElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 bg-[#07090e] text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-slate-900`}>
      
      {/* 1. HERO LANDING VIEW */}
      <AnimatedLanding onStart={handleStartEditing} />

      {/* 2. ATELIER GENERATOR WORKSPACE */}
      <section 
        id="cv-workspace" 
        className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10"
      >
        
        {/* Workspace decorative title block */}
        <div className="col-span-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-950/40 p-6 rounded-2xl border border-zinc-900 shadow-sm backdrop-blur-md mb-4 print-hidden">
          <div className="space-y-1">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
              Atelier de Modélisation
            </span>
            <h2 className="font-space font-bold text-xl sm:text-2xl tracking-tight text-white">Consolidez votre profil et exportez-le</h2>
            <p className="text-zinc-500 text-xs sm:text-sm">Parcourez les styles ci-dessous, modifiez les polices ou éditez les rubriques directement sur la page.</p>
          </div>
          
          <button 
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-space font-bold text-xs hover:bg-emerald-400 cursor-pointer shadow-lg shadow-emerald-500/5 transition flex items-center gap-2"
          >
            <span>Télécharger mon PDF</span>
          </button>
        </div>

        {/* Dynamic Fallback Warnings banner if server falls back to locally generated parser */}
        <AnimatePresence>
          {alertMessage && (
            <motion.div
              id="alert-banner"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="col-span-12 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-300 text-xs flex items-start gap-3 shadow-inner relative print-hidden"
            >
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-bounce" />
              <div className="space-y-1 flex-1 leading-relaxed">
                <span className="font-bold">Information de l'Atelier :</span>
                <p className="whitespace-pre-line">
                  {alertMessage}
                </p>
              </div>
              <button onClick={() => setAlertMessage(null)} className="p-1 rounded hover:bg-white/10 text-amber-400/80 hover:text-white cursor-pointer select-none">
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action controllers (Left Sidebar) - width: 4 cols */}
        <div id="controls-section" className="col-span-12 lg:col-span-4 sticky top-6 z-10 print-hidden">
          <ControlsPanel
            onCVGenerated={handleCVGenerated}
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
            selectedPaletteId={selectedPaletteId}
            onPaletteChange={setSelectedPaletteId}
            selectedTypographyId={selectedTypographyId}
            onTypographyChange={setSelectedTypographyId}
            onPrint={handlePrint}
            onReset={handleReset}
            onExportJSON={handleExportJSON}
            onImportJSON={handleImportJSON}
          />
        </div>

        {/* WYSIWYG Paper Previewer (Right Interactive sheet) - width: 8 cols */}
        <div id="cv-paper-section" className="col-span-12 lg:col-span-8 flex justify-center">
          <motion.div 
            className="w-full relative group"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Soft backdrop paper gradient glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-emerald-500/10 via-amber-500/5 to-indigo-500/10 opacity-30 blur-2xl group-hover:opacity-45 transition duration-1000 select-none pointer-events-none print:hidden" />
            
            <div className="relative z-10 w-full">
              <ResumeLiveEditor
                data={currentCVData}
                onChange={setCurrentCVData}
                palette={activePalette}
                typography={activeTypography}
                template={selectedTemplate}
              />
            </div>
          </motion.div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-zinc-900 bg-zinc-950/60 backdrop-blur-sm py-10 px-6 mt-auto text-zinc-500 text-xs text-center print-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-space font-bold tracking-tight text-white">Aero<span className="text-emerald-400">CV</span></span>
            <span>— Créateur de CV minimaliste hautement animé et intelligent.</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Propulsé par la plateforme d'applications web</span>
            <span className="text-emerald-400 font-bold">Google AI Studio Build</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
