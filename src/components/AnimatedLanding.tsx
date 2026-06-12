import { motion } from "motion/react";
import { Sparkles, Linkedin, FileText, ArrowDown, Activity, Layers, Palette, Eye } from "lucide-react";

interface AnimatedLandingProps {
  onStart: () => void;
}

export default function AnimatedLanding({ onStart }: AnimatedLandingProps) {
  // Smoothly scroll down to the app workspace
  const handleScrollToWorkspace = () => {
    const workspaceElement = document.getElementById("cv-workspace");
    if (workspaceElement) {
      workspaceElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const marqueeTemplates = [
    { name: "Néo Minimaliste", tag: "Tech & Design", style: "border-[#b27d42] text-amber-500" },
    { name: "Éditorial Élégant", tag: "Créatifs & Art", style: "border-blue-500 text-blue-400" },
    { name: "High-Tech Mono", tag: "Devs & SysOps", style: "border-purple-500 text-purple-400" },
    { name: "Noir Classique", tag: "Finance & Droit", style: "border-emerald-500 text-emerald-400" },
  ];

  return (
    <div id="landing-hero" className="relative w-full min-h-screen flex flex-col items-center justify-between overflow-hidden bg-[#0a0c10] py-12 px-6">
      
      {/* Hyper-Animated Background blobs using motion for continuous rotation/float */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Soft emerald floating orb */}
        <motion.div 
          className="absolute w-[450px] h-[450px] rounded-full bg-emerald-500/10 blur-[130px]"
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 90, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: "10%", left: "5%" }}
        />

        {/* Deep amber interactive orb */}
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[140px]"
          animate={{
            x: [0, -90, 60, 0],
            y: [0, 90, -70, 0],
            scale: [1, 1.1, 1.2, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ bottom: "10%", right: "8%" }}
        />

        {/* Monospace digital grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Top bar with elegant title */}
      <motion.header 
        className="relative z-10 w-full max-w-7xl flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <span className="font-space font-bold tracking-tight text-xl bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Aero<span className="text-emerald-400">CV</span>
          </span>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-[#12161f]/80 backdrop-blur text-xs font-mono text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Studio Actif</span>
        </div>
      </motion.header>

      {/* Main creative pitch */}
      <main className="relative z-10 flex flex-col items-center text-center max-w-4xl mt-12 mb-8">
        
        {/* Sparkle badge with floating animation */}
        <motion.div 
          className="mb-6 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-mono flex items-center gap-2 shadow-inner"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>L'excellence d'un CV en 1 clic grâce à l'IA</span>
        </motion.div>

        {/* Split display heading with staggered word transitions */}
        <h1 className="font-space font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tighter leading-none text-white my-4">
          <motion.span 
            className="block"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Le design <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-300 bg-clip-text text-transparent">minimaliste</span>
          </motion.span>
          <motion.span 
            className="block mt-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            propulsé par l'IA de pointe
          </motion.span>
        </h1>

        {/* Descriptive sentence */}
        <motion.p 
          className="text-zinc-400 text-base sm:text-lg max-w-2xl mt-6 leading-relaxed font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Entrez un simple texte ou fournissez votre lien LinkedIn. Notre IA génère instantanément un CV structuré de niveau mondial, prêt à être édité en temps réel et exporté en PDF.
        </motion.p>

        {/* Elegant Action Buttons with Hover/Tap Gestures */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full justify-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Main button pointing towards builder */}
          <motion.button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 font-bold font-space flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/10 cursor-pointer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText className="w-5 h-5" />
            <span>Créer mon CV maintenant</span>
          </motion.button>

          {/* Secondary demo button scrolling to preview templates */}
          <motion.button
            onClick={handleScrollToWorkspace}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-zinc-800 bg-zinc-900/50 text-white font-medium font-space flex items-center justify-center gap-2 text-sm backdrop-blur inline-flex cursor-pointer"
            whileHover={{ scale: 1.02, bg: "bg-zinc-800" }}
            whileTap={{ scale: 0.98 }}
          >
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>Découvrir les Modèles</span>
          </motion.button>
        </motion.div>
      </main>

      {/* Infinite loop showcase displaying customizable templates */}
      <div className="relative z-10 w-full max-w-6xl overflow-hidden mt-8 py-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-sm shadow-2xl">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0c10] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0c10] to-transparent z-10" />
        
        {/* Sliding row inside container */}
        <div className="flex gap-4 animate-[marquee_25s_linear_infinite] whitespace-nowrap min-w-full">
          {[...marqueeTemplates, ...marqueeTemplates].map((tmpl, idx) => (
            <motion.div
              key={idx}
              className={`inline-flex flex-col min-w-[240px] p-4.5 rounded-xl border bg-[#11141c]/90 text-left`}
              whileHover={{ y: -8, scale: 1.02, borderColor: "#34d399", duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-[10px] uppercase text-zinc-500">{tmpl.tag}</span>
              </div>
              <h3 className="font-space font-semibold text-white tracking-tight">{tmpl.name}</h3>
              <p className="text-zinc-500 text-xs mt-1">Design épuré et ultra-précis pour valoriser vos compétences.</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Visual core values section with subtle micro-interactions */}
      <section className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl mt-16 px-4">
        {[
          {
            icon: <Linkedin className="w-5 h-5 text-emerald-400" />,
            title: "Import LinkedIn Intelligent",
            desc: "Donnez un simple lien de profil et notre IA s'occupe de structurer un parcours brillant."
          },
          {
            icon: <Palette className="w-5 h-5 text-amber-400" />,
            title: "Personnalisation Esthétique",
            desc: "Modifiez couleurs, polices de caractères et marges à la volée d'un simple geste."
          },
          {
            icon: <Layers className="w-5 h-5 text-blue-400" />,
            title: "Format Prêt Pour Impression",
            desc: "Le design respecte rigoureusement la norme A4. Exportez en PDF en parfaite fidélité."
          }
        ].map((feat, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-2xl border border-zinc-900 bg-gradient-to-b from-[#0f121a]/80 to-[#0c0f16]/90 flex flex-col gap-3 shadow-inner group cursor-pointer"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4, borderColor: "#27272a" }}
          >
            <div className="p-2.5 rounded-xl bg-zinc-950 w-fit border border-zinc-800 group-hover:border-zinc-700 transition-all">
              {feat.icon}
            </div>
            <h4 className="font-space font-semibold text-white text-base mt-1">{feat.title}</h4>
            <p className="text-zinc-400 text-xs leading-relaxed">{feat.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Animated scroll down indicator */}
      <motion.div 
        onClick={handleScrollToWorkspace}
        className="relative z-10 flex flex-col items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-xs font-mono cursor-pointer mt-16"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span>Faire défiler pour l'Atelier</span>
        <ArrowDown className="w-4 h-4 text-emerald-400" />
      </motion.div>

      {/* Embedded CSS for custom marquee effect */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
