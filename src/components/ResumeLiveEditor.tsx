import { CVData, TemplateType, ColorPalette, TypographyOption } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Code, Plus, Trash2, HelpCircle } from "lucide-react";

interface ResumeLiveEditorProps {
  data: CVData;
  onChange: (updatedData: CVData) => void;
  palette: ColorPalette;
  typography: TypographyOption;
  template: TemplateType;
}

export default function ResumeLiveEditor({
  data,
  onChange,
  palette,
  typography,
  template
}: ResumeLiveEditorProps) {

  // Update a top-level string field inside CVData
  const updateField = (field: keyof CVData, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  // Update nested experience lists
  const updateExperience = (index: number, key: string, value: string | string[]) => {
    const updatedExp = [...data.experience];
    updatedExp[index] = {
      ...updatedExp[index],
      [key]: value
    };
    onChange({ ...data, experience: updatedExp });
  };

  // Add dummy experience
  const addExperience = () => {
    const newExp = {
      company: "Nouvelle Entreprise",
      role: "Poste Occupé",
      period: "2024 - Présent",
      description: ["Réalisation clé numéro 1", "Accomplissement majeur numéro 2"]
    };
    onChange({
      ...data,
      experience: [...data.experience, newExp]
    });
  };

  // Delete experience
  const deleteExperience = (index: number) => {
    const updatedExp = data.experience.filter((_, i) => i !== index);
    onChange({ ...data, experience: updatedExp });
  };

  // Update nested education lists
  const updateEducation = (index: number, key: string, value: string) => {
    const updatedEdu = [...data.education];
    updatedEdu[index] = {
      ...updatedEdu[index],
      [key]: value
    };
    onChange({ ...data, education: updatedEdu });
  };

  // Add dummy education
  const addEducation = () => {
    const newEdu = {
      institution: "Nom de l'Université",
      degree: "Intitulé du Diplôme",
      period: "Année"
    };
    onChange({
      ...data,
      education: [...data.education, newEdu]
    });
  };

  // Delete education
  const deleteEducation = (index: number) => {
    const updatedEdu = data.education.filter((_, i) => i !== index);
    onChange({ ...data, education: updatedEdu });
  };

  // Update skills categories & items
  const updateSkillCategory = (index: number, key: 'category' | 'items', value: any) => {
    const updatedSkills = [...data.skills];
    if (key === 'items') {
      updatedSkills[index] = {
        ...updatedSkills[index],
        items: value
      };
    } else {
      updatedSkills[index] = {
        ...updatedSkills[index],
        category: value
      };
    }
    onChange({ ...data, skills: updatedSkills });
  };

  // Add skill category
  const addSkillCategory = () => {
    const newSkill = {
      category: "Nouvelle Catégorie",
      items: ["Compétence A", "Compétence B"]
    };
    onChange({
      ...data,
      skills: [...data.skills, newSkill]
    });
  };

  // Delete skill category
  const deleteSkillCategory = (index: number) => {
    const updatedSkills = data.skills.filter((_, i) => i !== index);
    onChange({ ...data, skills: updatedSkills });
  };

  // Update languages (comma separated or raw click)
  const updateLanguagesText = (text: string) => {
    const items = text.split(",").map(s => s.trim()).filter(Boolean);
    onChange({ ...data, languages: items });
  };

  // Update interests
  const updateInterestsText = (text: string) => {
    const items = text.split(",").map(s => s.trim()).filter(Boolean);
    onChange({ ...data, interests: items });
  };

  // Render the editable helper label
  const clickToEditBadge = (
    <div className="absolute right-2 -top-5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-[9px] font-mono bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded shadow z-10 print-hidden">
      Éditer direct
    </div>
  );

  return (
    <div className="relative w-full flex flex-col items-center">
      
      {/* Notice info banner */}
      <div className="w-full max-w-4xl text-center mb-4 px-4 print-hidden">
        <p className="text-xs text-zinc-400 inline-flex items-center gap-1.5 bg-zinc-900/60 px-4 py-2 rounded-full border border-zinc-800 shadow-sm leading-relaxed">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span><b>Astuce :</b> Vous pouvez cliquer et modifier absolument tous les textes directement sur le papier ci-dessous.</span>
        </p>
      </div>

      {/* CV Paper Container with subtle responsive shadow & borders */}
      <motion.div
        layout
        className={`print-container relative w-full h-auto min-h-[297mm] max-w-[210mm] shadow-2xl p-8 sm:p-12 md:p-14 transition-all duration-500 rounded-lg sm:rounded-xl md:rounded-2xl border border-zinc-200/50 overflow-hidden ${palette.paperBg} ${palette.textSecondary} ${typography.bodyFont} ${typography.bodyClass}`}
        style={{ contentVisibility: 'auto' }}
      >
        
        {/* Style-specific Accent vertical bar when using Minimalist Template */}
        {template === "minimalist" && (
          <div className={`absolute top-0 left-0 w-3 h-full bg-linear-to-b from-emerald-500 via-teal-500 to-indigo-500 print:hidden`} />
        )}

        {/* 1. MODEL: NEO MINIMALIST */}
        {template === "minimalist" && (
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="border-b pb-6 border-zinc-150">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div className="space-y-1 w-full md:max-w-2xl group relative">
                  {clickToEditBadge}
                  <h1
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateField("fullname", e.currentTarget.innerText)}
                    className={`text-3xl sm:text-4xl ${typography.headingClass} ${palette.textPrimary}`}
                  >
                    {data.fullname}
                  </h1>
                  <h2
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateField("title", e.currentTarget.innerText)}
                    className={`text-base sm:text-lg font-medium ${palette.accent}`}
                  >
                    {data.title}
                  </h2>
                </div>
                
                {/* Contacts in nice grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs font-mono text-zinc-500 w-full md:w-auto print:flex print:flex-wrap print:gap-4">
                  <div className="flex items-center gap-1.5 group relative">
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField("email", e.currentTarget.innerText)}>{data.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5 group relative">
                    <Phone className="w-3.5 h-3.5 text-zinc-400" />
                    <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField("phone", e.currentTarget.innerText)}>{data.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 group relative">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField("location", e.currentTarget.innerText)}>{data.location}</span>
                  </div>
                  {data.website && (
                    <div className="flex items-center gap-1.5 group relative">
                      <Globe className="w-3.5 h-3.5 text-zinc-400" />
                      <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField("website", e.currentTarget.innerText)}>{data.website}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Resume Summary */}
            <div className="space-y-2 group relative">
              {clickToEditBadge}
              <h3 className={`text-xs uppercase font-mono tracking-widest font-semibold ${palette.accent}`}>Profil</h3>
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateField("summary", e.currentTarget.innerText)}
                className="text-sm leading-relaxed"
              >
                {data.summary}
              </p>
            </div>

            {/* Experiences block */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-1.5 border-zinc-150">
                <h3 className={`text-xs uppercase font-mono tracking-widest font-semibold ${palette.accent} flex items-center gap-2`}>
                  <Briefcase className="w-4 h-4" />
                  <span>Expériences Professionnelles</span>
                </h3>
                <button onClick={addExperience} className="print-hidden p-1 rounded hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer" title="Ajouter une expérience">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-8">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="group relative space-y-2">
                    {/* Delete entry trigger on overlay */}
                    <button
                      onClick={() => deleteExperience(idx)}
                      className="print-hidden absolute -left-8 top-1 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 text-red-500 hover:text-red-700 transition"
                      title="Supprimer cette expérience"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {clickToEditBadge}

                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                      <h4 className="font-semibold text-zinc-900 flex items-center gap-2">
                        <span contentEditable suppressContentEditableWarning onBlur={(e) => updateExperience(idx, "company", e.currentTarget.innerText)} className={`font-bold ${palette.textPrimary}`}>{exp.company}</span>
                        <span className="text-zinc-300 font-normal">|</span>
                        <span contentEditable suppressContentEditableWarning onBlur={(e) => updateExperience(idx, "role", e.currentTarget.innerText)} className="text-zinc-600 font-medium text-sm">{exp.role}</span>
                      </h4>
                      <span contentEditable suppressContentEditableWarning onBlur={(e) => updateExperience(idx, "period", e.currentTarget.innerText)} className="text-xs font-mono text-zinc-400 sm:text-right">{exp.period}</span>
                    </div>

                    <ul className="list-disc pl-5 space-y-1 text-sm leading-normal">
                      {exp.description.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="relative group/bullet">
                          <span
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const updatedBullets = [...exp.description];
                              updatedBullets[bulletIdx] = e.currentTarget.innerText;
                              updateExperience(idx, "description", updatedBullets);
                            }}
                            className="block focus:outline-hidden"
                          >
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom side structured rows: Education + Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              
              {/* Left Column: Education */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-1.5 border-zinc-150">
                  <h3 className={`text-xs uppercase font-mono tracking-widest font-semibold ${palette.accent} flex items-center gap-2`}>
                    <GraduationCap className="w-4 h-4" />
                    <span>Formation</span>
                  </h3>
                  <button onClick={addEducation} className="print-hidden p-1 rounded hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {data.education.map((edu, idx) => (
                    <div key={idx} className="group relative space-y-1">
                      <button onClick={() => deleteEducation(idx)} className="print-hidden absolute -left-8 top-1 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 text-red-500 hover:text-red-700 transition">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      {clickToEditBadge}
                      <div className="flex justify-between items-baseline">
                        <h4 contentEditable suppressContentEditableWarning onBlur={(e) => updateEducation(idx, "degree", e.currentTarget.innerText)} className={`font-semibold text-sm ${palette.textPrimary}`}>{edu.degree}</h4>
                        <span contentEditable suppressContentEditableWarning onBlur={(e) => updateEducation(idx, "period", e.currentTarget.innerText)} className="text-[10px] font-mono text-zinc-400">{edu.period}</span>
                      </div>
                      <p contentEditable suppressContentEditableWarning onBlur={(e) => updateEducation(idx, "institution", e.currentTarget.innerText)} className="text-xs text-zinc-500">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Skills */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-1.5 border-zinc-150">
                  <h3 className={`text-xs uppercase font-mono tracking-widest font-semibold ${palette.accent} flex items-center gap-2`}>
                    <Code className="w-4 h-4" />
                    <span>Compétences</span>
                  </h3>
                  <button onClick={addSkillCategory} className="print-hidden p-1 rounded hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {data.skills.map((category, idx) => (
                    <div key={idx} className="group relative space-y-1">
                      <button onClick={() => deleteSkillCategory(idx)} className="print-hidden absolute -left-8 top-1 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 text-red-500 hover:text-red-700 transition">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      {clickToEditBadge}
                      
                      <h4 contentEditable suppressContentEditableWarning onBlur={(e) => updateSkillCategory(idx, "category", e.currentTarget.innerText)} className="font-mono text-xs uppercase font-semibold text-zinc-600">{category.category}</h4>
                      
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const newItems = e.currentTarget.innerText.split(",").map(t => t.trim()).filter(Boolean);
                            updateSkillCategory(idx, "items", newItems);
                          }}
                          className={`text-xs px-2.5 py-1 rounded border ${palette.badgeBg} cursor-text focus:outline-hidden`}
                        >
                          {category.items.join(", ")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Optional Languages + Interests */}
            {(data.languages || data.interests) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-6 border-zinc-150">
                {data.languages && (
                  <div className="space-y-2 group relative">
                    {clickToEditBadge}
                    <h4 className={`text-xs uppercase font-mono tracking-widest font-semibold ${palette.accent}`}>Langues</h4>
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateLanguagesText(e.currentTarget.innerText)}
                      className="text-xs text-zinc-600 leading-normal focus:outline-hidden"
                    >
                      {data.languages.join(", ")}
                    </p>
                  </div>
                )}
                {data.interests && (
                  <div className="space-y-2 group relative">
                    {clickToEditBadge}
                    <h4 className={`text-xs uppercase font-mono tracking-widest font-semibold ${palette.accent}`}>Intérêts</h4>
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => updateInterestsText(e.currentTarget.innerText)}
                      className="text-xs text-zinc-600 leading-normal focus:outline-hidden"
                    >
                      {data.interests.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 2. MODEL: TRADITIONAL CLASSIC (Centered, timeless) */}
        {template === "traditional" && (
          <div className="flex flex-col gap-6 text-center">
            {/* Centered traditional header */}
            <div className="space-y-2 border-b-2 pb-6 border-double border-zinc-300">
              <h1
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateField("fullname", e.currentTarget.innerText)}
                className={`text-4xl ${typography.headingClass} ${palette.textPrimary} tracking-tight font-serif`}
              >
                {data.fullname}
              </h1>
              <h2
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateField("title", e.currentTarget.innerText)}
                className={`text-base font-semibold leading-relaxed tracking-wider uppercase ${palette.accent}`}
              >
                {data.title}
              </h2>
              
              {/* Compact contact rows */}
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-xs text-zinc-500 font-sans mt-3">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField("email", e.currentTarget.innerText)}>{data.email}</span></span>
                <span className="text-zinc-300">•</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField("phone", e.currentTarget.innerText)}>{data.phone}</span></span>
                <span className="text-zinc-300">•</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField("location", e.currentTarget.innerText)}>{data.location}</span></span>
                {data.website && (
                  <>
                    <span className="text-zinc-300">•</span>
                    <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField("website", e.currentTarget.innerText)}>{data.website}</span></span>
                  </>
                )}
              </div>
            </div>

            {/* Profile */}
            <div className="text-left py-2 space-y-1">
              <h3 className={`text-sm uppercase tracking-wider font-bold border-b border-zinc-200 pb-1 ${palette.accent}`}>Résumé Professionnel</h3>
              <p contentEditable suppressContentEditableWarning onBlur={(e) => updateField("summary", e.currentTarget.innerText)} className="text-sm leading-relaxed pt-2 italic text-zinc-750">
                {data.summary}
              </p>
            </div>

            {/* Experiences */}
            <div className="text-left space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-200 pb-1">
                <h3 className={`text-sm uppercase tracking-wider font-bold ${palette.accent}`}>Expérience</h3>
                <button onClick={addExperience} className="print-hidden p-1 rounded hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 transition cursor-pointer">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-6">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="group relative space-y-1">
                    <button onClick={() => deleteExperience(idx)} className="print-hidden absolute -left-8 top-1 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 text-red-500 hover:text-red-700 transition">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-sm text-zinc-900">
                        <span contentEditable suppressContentEditableWarning onBlur={(e) => updateExperience(idx, "company", e.currentTarget.innerText)} className={`text-zinc-900 ${palette.textPrimary}`}>{exp.company}</span>
                        <span className="font-normal text-zinc-400 mx-2">—</span>
                        <span contentEditable suppressContentEditableWarning onBlur={(e) => updateExperience(idx, "role", e.currentTarget.innerText)} className="text-zinc-600 font-semibold italic">{exp.role}</span>
                      </h4>
                      <span contentEditable suppressContentEditableWarning onBlur={(e) => updateExperience(idx, "period", e.currentTarget.innerText)} className="text-xs text-zinc-500 italic">{exp.period}</span>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-zinc-600">
                      {exp.description.map((bullet, bIdx) => (
                        <li key={bIdx}>
                          <span contentEditable suppressContentEditableWarning onBlur={(e) => {
                            const updated = [...exp.description];
                            updated[bIdx] = e.currentTarget.innerText;
                            updateExperience(idx, "description", updated);
                          }}>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid Education & Skills for traditional layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {/* Education */}
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-zinc-200 pb-1">
                  <h3 className={`text-sm uppercase tracking-wider font-bold ${palette.accent}`}>Formation</h3>
                  <button onClick={addEducation} className="print-hidden p-1 rounded hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 transition cursor-pointer">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {data.education.map((edu, idx) => (
                    <div key={idx} className="group relative">
                      <button onClick={() => deleteEducation(idx)} className="print-hidden absolute -left-8 top-1 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 text-red-500 hover:text-red-700 transition">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex justify-between items-baseline">
                        <h4 contentEditable suppressContentEditableWarning onBlur={(e) => updateEducation(idx, "degree", e.currentTarget.innerText)} className="font-semibold text-xs text-zinc-800">{edu.degree}</h4>
                        <span contentEditable suppressContentEditableWarning onBlur={(e) => updateEducation(idx, "period", e.currentTarget.innerText)} className="text-[10px] text-zinc-400 italic">{edu.period}</span>
                      </div>
                      <p contentEditable suppressContentEditableWarning onBlur={(e) => updateEducation(idx, "institution", e.currentTarget.innerText)} className="text-xs text-zinc-500">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-zinc-200 pb-1">
                  <h3 className={`text-sm uppercase tracking-wider font-bold ${palette.accent}`}>Compétences</h3>
                  <button onClick={addSkillCategory} className="print-hidden p-1 rounded hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 transition cursor-pointer">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {data.skills.map((cat, idx) => (
                    <div key={idx} className="group relative">
                      <button onClick={() => deleteSkillCategory(idx)} className="print-hidden absolute -left-8 top-1 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 text-red-500 hover:text-red-700 transition">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <h4 contentEditable suppressContentEditableWarning onBlur={(e) => updateSkillCategory(idx, "category", e.currentTarget.innerText)} className="text-xs font-bold text-zinc-700 uppercase">{cat.category}</h4>
                      <p
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const list = e.currentTarget.innerText.split(",").map(t => t.trim()).filter(Boolean);
                          updateSkillCategory(idx, "items", list);
                        }}
                        className="text-xs text-zinc-500 italic pb-1"
                      >
                        {cat.items.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. MODEL: TECH MONO (Wireframe hacker terminal look) */}
        {template === "tech_mono" && (
          <div className="flex flex-col gap-6 font-mono text-xs">
            {/* Terminal Top bar decoration */}
            <div className="flex justify-between border border-zinc-300 p-3 bg-zinc-50 rounded-md mb-2 print:border-none print:bg-transparent print:p-0">
              <div className="flex items-center gap-1.5 print:hidden">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-[10px] text-zinc-400">[SYSTEM: INITIALIZE_PROFILE]</span>
            </div>

            {/* Profile Header */}
            <div className="border-b-2 border-dashed pb-4 border-zinc-300">
              <h1
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateField("fullname", e.currentTarget.innerText)}
                className={`text-2xl ${typography.headingClass} ${palette.textPrimary} tracking-wider font-mono`}
              >
                &gt; {data.fullname}
              </h1>
              <h2
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateField("title", e.currentTarget.innerText)}
                className={`text-xs uppercase font-mono tracking-widest mt-1 ${palette.accent}`}
              >
                // {data.title}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-[10px] text-zinc-400">
                <div className="flex items-center gap-2"><span>[EMAIL]</span><span contentEditable suppressContentEditableWarning onBlur={(e) => updateField("email", e.currentTarget.innerText)}>{data.email}</span></div>
                <div className="flex items-center gap-2"><span>[PHONE]</span><span contentEditable suppressContentEditableWarning onBlur={(e) => updateField("phone", e.currentTarget.innerText)}>{data.phone}</span></div>
                <div className="flex items-center gap-2"><span>[LOC]</span><span contentEditable suppressContentEditableWarning onBlur={(e) => updateField("location", e.currentTarget.innerText)}>{data.location}</span></div>
                {data.website && (
                  <div className="flex items-center gap-2"><span>[PORTFOLIO]</span><span contentEditable suppressContentEditableWarning onBlur={(e) => updateField("website", e.currentTarget.innerText)}>{data.website}</span></div>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1.5">
              <h3 className={`text-xs uppercase font-bold text-zinc-800 ${palette.accent}`}># BRIEF_RECON</h3>
              <p contentEditable suppressContentEditableWarning onBlur={(e) => updateField("summary", e.currentTarget.innerText)} className="leading-relaxed border-l-2 pl-3 border-zinc-300">
                {data.summary}
              </p>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-200 pb-1">
                <h3 className={`text-xs uppercase font-bold ${palette.accent}`}># EXP_JOURNAL</h3>
                <button onClick={addExperience} className="print-hidden p-1 rounded hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 cursor-pointer">
                  + [Nouveau]
                </button>
              </div>

              <div className="space-y-4">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="group relative space-y-1 bg-zinc-50/50 p-2.5 rounded border border-zinc-200">
                    <button onClick={() => deleteExperience(idx)} className="print-hidden absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 p-1 bg-white border rounded shadow hover:bg-red-50 text-red-500">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex justify-between items-baseline">
                      <div className="font-bold">
                        <span contentEditable suppressContentEditableWarning onBlur={(e) => updateExperience(idx, "company", e.currentTarget.innerText)} className="text-zinc-900">{exp.company}</span>
                        <span> :: </span>
                        <span contentEditable suppressContentEditableWarning onBlur={(e) => updateExperience(idx, "role", e.currentTarget.innerText)} className="text-zinc-600">{exp.role}</span>
                      </div>
                      <span contentEditable suppressContentEditableWarning onBlur={(e) => updateExperience(idx, "period", e.currentTarget.innerText)} className="text-[10px] text-zinc-400">{exp.period}</span>
                    </div>
                    
                    <div className="pl-4 space-y-1 mt-1 text-[11px] list-none">
                      {exp.description.map((bullet, bulletIdx) => (
                        <div key={bulletIdx} className="flex gap-2">
                          <span className="text-emerald-500 font-bold">-</span>
                          <span contentEditable suppressContentEditableWarning onBlur={(e) => {
                            const updated = [...exp.description];
                            updated[bulletIdx] = e.currentTarget.innerText;
                            updateExperience(idx, "description", updated);
                          }} className="flex-1">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Struct Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Education */}
              <div className="space-y-2 border border-zinc-200 p-3 rounded">
                <div className="flex justify-between items-center pb-1">
                  <h3 className={`text-xs uppercase font-bold ${palette.accent}`}># ACADEMICS</h3>
                  <button onClick={addEducation} className="print-hidden p-0.5 rounded hover:bg-zinc-200 text-zinc-500">
                    +
                  </button>
                </div>
                <div className="space-y-3">
                  {data.education.map((edu, idx) => (
                    <div key={idx} className="group relative">
                      <button onClick={() => deleteEducation(idx)} className="print-hidden absolute -left-6 top-0 opacity-0 group-hover:opacity-100 p-0.5 rounded text-red-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex justify-between text-[11px]">
                        <span contentEditable suppressContentEditableWarning onBlur={(e) => updateEducation(idx, "degree", e.currentTarget.innerText)} className="font-bold text-zinc-800">{edu.degree}</span>
                        <span contentEditable suppressContentEditableWarning onBlur={(e) => updateEducation(idx, "period", e.currentTarget.innerText)} className="text-zinc-400 text-[9px]">{edu.period}</span>
                      </div>
                      <span contentEditable suppressContentEditableWarning onBlur={(e) => updateEducation(idx, "institution", e.currentTarget.innerText)} className="block text-[10px] text-zinc-500">{edu.institution}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2 border border-zinc-200 p-3 rounded">
                <div className="flex justify-between items-center pb-1">
                  <h3 className={`text-xs uppercase font-bold ${palette.accent}`}># PERKS_LIST</h3>
                  <button onClick={addSkillCategory} className="print-hidden p-0.5 rounded text-zinc-500">
                    +
                  </button>
                </div>
                <div className="space-y-3">
                  {data.skills.map((category, idx) => (
                    <div key={idx} className="group relative">
                      <button onClick={() => deleteSkillCategory(idx)} className="print-hidden absolute -left-6 top-0 opacity-0 group-hover:opacity-100 p-0.5 rounded text-red-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <span contentEditable suppressContentEditableWarning onBlur={(e) => updateSkillCategory(idx, "category", e.currentTarget.innerText)} className="font-bold uppercase block text-zinc-650">{category.category}</span>
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const customItems = e.currentTarget.innerText.split(",").map(t => t.trim()).filter(Boolean);
                          updateSkillCategory(idx, "items", customItems);
                        }}
                        className="text-zinc-500 text-[11px] block italic mt-0.5 cursor-text focus:outline-hidden"
                      >
                        {category.items.join(", ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. MODEL: ASYMMETRIC EDITORIAL (Three Columns / Magazine Look) */}
        {template === "editorial" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left leading-relaxed">
            
            {/* 1/3 Side bar panel (Bio, info, education, skills, language) */}
            <div className="space-y-6 md:border-r md:pr-6 border-zinc-150">
              
              {/* Styled Circular initial placeholder instead of real profile pic */}
              <div className="flex flex-col items-center text-center p-4 bg-zinc-50 rounded-xl border border-zinc-150/80">
                <div className="relative w-16 h-16 rounded-full bg-linear-to-tr from-emerald-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold font-space shadow-inner">
                  {data.fullname.charAt(0)}
                </div>
                <h4 className="font-space mt-3 font-semibold text-xs text-zinc-700 tracking-tight uppercase">{data.fullname}</h4>
                <span className="text-[10px] text-zinc-400 font-mono italic">Studio Membre</span>
              </div>

              {/* Classic Contacts list */}
              <div className="space-y-3 text-xs">
                <h5 className={`text-[10px] uppercase font-bold tracking-wider ${palette.accent}`}>Contacts</h5>
                <div className="space-y-2 text-zinc-600">
                  <div className="flex flex-col"><span className="text-[9px] uppercase font-mono text-zinc-400">E-mail</span><span contentEditable suppressContentEditableWarning onBlur={(e) => updateField("email", e.currentTarget.innerText)}>{data.email}</span></div>
                  <div className="flex flex-col"><span className="text-[9px] uppercase font-mono text-zinc-400">Téléphone</span><span contentEditable suppressContentEditableWarning onBlur={(e) => updateField("phone", e.currentTarget.innerText)}>{data.phone}</span></div>
                  <div className="flex flex-col"><span className="text-[9px] uppercase font-mono text-zinc-400">Localité</span><span contentEditable suppressContentEditableWarning onBlur={(e) => updateField("location", e.currentTarget.innerText)}>{data.location}</span></div>
                  {data.website && (
                    <div className="flex flex-col"><span className="text-[9px] uppercase font-mono text-zinc-400">Portfolio</span><span contentEditable suppressContentEditableWarning onBlur={(e) => updateField("website", e.currentTarget.innerText)}>{data.website}</span></div>
                  )}
                </div>
              </div>

              {/* Skills for Editorial */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className={`text-[10px] uppercase font-bold tracking-wider ${palette.accent}`}>Compétences</h5>
                  <button onClick={addSkillCategory} className="print-hidden p-0.5 text-zinc-400 hover:text-zinc-700">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-3 text-xs">
                  {data.skills.map((category, idx) => (
                    <div key={idx} className="group relative space-y-0.5">
                      <button onClick={() => deleteSkillCategory(idx)} className="print-hidden absolute -right-4 top-0 opacity-0 group-hover:opacity-100 p-0.5 text-red-500">
                        <Trash2 className="w-3 h-3" />
                      </button>
                      <span contentEditable suppressContentEditableWarning onBlur={(e) => updateSkillCategory(idx, "category", e.currentTarget.innerText)} className="font-semibold block text-zinc-700 text-[11px]">{category.category}</span>
                      <p
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const list = e.currentTarget.innerText.split(",").map(t => t.trim()).filter(Boolean);
                          updateSkillCategory(idx, "items", list);
                        }}
                        className="text-zinc-500 text-[10px] leading-relaxed cursor-text focus:outline-hidden"
                      >
                        {category.items.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages / Interests */}
              {data.languages && (
                <div className="space-y-2 text-xs">
                  <h5 className={`text-[10px] uppercase font-bold tracking-wider ${palette.accent}`}>Langues</h5>
                  <p contentEditable suppressContentEditableWarning onBlur={(e) => updateLanguagesText(e.currentTarget.innerText)} className="text-zinc-600 leading-normal focus:outline-hidden">
                    {data.languages.join(", ")}
                  </p>
                </div>
              )}
            </div>

            {/* 2/3 Main Body panel (Name, Title, Summary, Work Experience, Education) */}
            <div className="col-span-1 md:col-span-2 space-y-6">
              {/* Brand Statement */}
              <div className="space-y-1.5 group relative">
                {clickToEditBadge}
                <h1
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => updateField("fullname", e.currentTarget.innerText)}
                  className={`text-3xl font-space font-extrabold tracking-tight ${palette.textPrimary}`}
                >
                  {data.fullname}
                </h1>
                <h2
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => updateField("title", e.currentTarget.innerText)}
                  className={`text-sm italic font-medium tracking-wide ${palette.accent}`}
                >
                  {data.title}
                </h2>
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => updateField("summary", e.currentTarget.innerText)}
                  className="text-sm border-l-2 pl-4 py-1 mt-4 italic text-zinc-600 leading-relaxed border-zinc-200"
                >
                  {data.summary}
                </p>
              </div>

              {/* Work experiences Editorial */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-1.5 border-zinc-150">
                  <h3 className={`text-xs uppercase font-mono tracking-widest font-semibold ${palette.accent}`}>Expérience Principale</h3>
                  <button onClick={addExperience} className="print-hidden p-1 rounded hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 transition cursor-pointer">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {data.experience.map((exp, idx) => (
                    <div key={idx} className="group relative space-y-1">
                      <button onClick={() => deleteExperience(idx)} className="print-hidden absolute -left-8 top-1 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 text-red-500 hover:text-red-700 transition">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-sm text-zinc-900">
                          <span contentEditable suppressContentEditableWarning onBlur={(e) => updateExperience(idx, "company", e.currentTarget.innerText)} className={`text-zinc-900 ${palette.textPrimary}`}>{exp.company}</span>
                          <span className="font-light text-zinc-300 mx-2">/</span>
                          <span contentEditable suppressContentEditableWarning onBlur={(e) => updateExperience(idx, "role", e.currentTarget.innerText)} className="text-zinc-600 font-medium italic text-xs">{exp.role}</span>
                        </h4>
                        <span contentEditable suppressContentEditableWarning onBlur={(e) => updateExperience(idx, "period", e.currentTarget.innerText)} className="text-[10px] font-mono text-zinc-400">{exp.period}</span>
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-xs text-zinc-600 leading-normal">
                        {exp.description.map((bullet, bulletIdx) => (
                          <li key={bulletIdx}>
                            <span contentEditable suppressContentEditableWarning onBlur={(e) => {
                              const updated = [...exp.description];
                              updated[bulletIdx] = e.currentTarget.innerText;
                              updateExperience(idx, "description", updated);
                            }}>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education section */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center border-b pb-1.5 border-zinc-150">
                  <h3 className={`text-xs uppercase font-mono tracking-widest font-semibold ${palette.accent}`}>Formation & Cursus</h3>
                  <button onClick={addEducation} className="print-hidden p-1 rounded hover:bg-zinc-100 text-zinc-500 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {data.education.map((edu, idx) => (
                    <div key={idx} className="group relative space-y-0.5">
                      <button onClick={() => deleteEducation(idx)} className="print-hidden absolute -left-8 top-1 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 text-red-500 hover:text-red-700 transition">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex justify-between items-baseline">
                        <span contentEditable suppressContentEditableWarning onBlur={(e) => updateEducation(idx, "degree", e.currentTarget.innerText)} className="font-bold text-xs text-zinc-800">{edu.degree}</span>
                        <span contentEditable suppressContentEditableWarning onBlur={(e) => updateEducation(idx, "period", e.currentTarget.innerText)} className="text-[9px] text-zinc-400 font-mono">{edu.period}</span>
                      </div>
                      <span contentEditable suppressContentEditableWarning onBlur={(e) => updateEducation(idx, "institution", e.currentTarget.innerText)} className="block text-[10px] text-zinc-500 leading-normal">{edu.institution}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
