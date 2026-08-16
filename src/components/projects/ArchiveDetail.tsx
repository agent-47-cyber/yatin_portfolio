"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { PROJECTS_DATA } from "@/data/projects";

export function ArchiveDetail() {
  const currentState = useAppStore((state) => state.currentState);
  const selectedProjectId = useAppStore((state) => state.selectedProjectId);
  const selectProject = useAppStore((state) => state.selectProject);

  const isVaultActive =
    currentState === "PROJECTS" || currentState === "PROJECT_DETAIL";

  // Default to first project (DevScope)
  const activeProjectId = selectedProjectId || PROJECTS_DATA[0].id;
  const project =
    PROJECTS_DATA.find((p) => p.id === activeProjectId) || PROJECTS_DATA[0];

  return (
    <AnimatePresence>
      {isVaultActive && (
        <motion.div
          key="classified-vault-terminal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-30 pointer-events-none p-6 sm:p-10 md:p-12 flex flex-col justify-between select-none"
        >
          {/* Top Bar: Sector Metadata */}
          <div className="flex justify-between items-start w-full">
            <div className="flex items-center gap-3 pointer-events-auto">
              <span className="font-mono-system text-[10px] tracking-[0.3em] text-[#00e5ff] uppercase font-semibold">
                RESEARCH VAULT // 02
              </span>
              <span className="w-6 h-[1px] bg-[#00e5ff]/30" />
              <span className="font-mono-system text-[9px] tracking-[0.2em] text-[#8a8a8e] uppercase">
                QUANTUM ARCHIVE TERMINAL
              </span>
            </div>
          </div>

          {/* Center Left Editorial Panel (Restricted to Left 38% Viewport — 0% Model Overlap) */}
          <div className="my-auto w-full max-w-md lg:max-w-[460px] pointer-events-auto overflow-y-auto max-h-[82vh] pr-4 space-y-4 scrollbar-thin scrollbar-thumb-[#00e5ff]/20">
            {/* Horizontal Project Selector Tabs (PROJECT 01 + STANDBY 02-04) */}
            <div className="flex items-center gap-2 pb-1 border-b border-[hsla(0,0%,100%,0.08)]">
              {PROJECTS_DATA.map((p, index) => {
                const isSelected = p.id === activeProjectId;
                const isStandby = p.isStandby;

                return (
                  <button
                    key={p.id}
                    onClick={() => selectProject(p.id)}
                    className={`font-mono-system text-[9px] tracking-[0.15em] px-2.5 py-1 rounded-sm transition-all duration-200 focus:outline-none ${isSelected
                        ? isStandby
                          ? "bg-[#8a8a8e]/30 text-[#f0ece4] font-bold border border-[#8a8a8e]/60"
                          : "bg-[#00e5ff] text-[#0a0a0c] font-bold shadow-[0_0_12px_rgba(0,229,255,0.4)]"
                        : "text-[#8a8a8e] hover:text-[#f0ece4] hover:bg-[#12141c]/60 border border-[hsla(0,0%,100%,0.06)]"
                      }`}
                  >
                    {isStandby ? `0${index + 1} [STANDBY]` : `PROJECT 0${index + 1}`}
                  </button>
                );
              })}
            </div>

            {/* Project Designation & Clean Name */}
            <div className="space-y-1 pt-1">
              <span className={`font-mono-system text-[9px] tracking-[0.25em] uppercase font-semibold block ${project.isStandby ? "text-[#8a8a8e]" : "text-[#00e5ff]"
                }`}>
                {project.category} // {project.year}
              </span>
              <h1 className="font-display text-2xl sm:text-3xl text-[#f0ece4] tracking-tight leading-none">
                {project.name}
              </h1>
              <p className="font-mono-system text-[10px] text-[#8a8a8e] tracking-wider uppercase mt-1">
                {project.tagline}
              </p>
            </div>

            {/* Thin Divider */}
            <div className="w-16 h-[1px] bg-gradient-to-r from-[#00e5ff]/60 to-transparent" />

            {/* Challenge & Engineered Solution */}
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="font-mono-system text-[8.5px] tracking-[0.2em] text-[#8a8a8e] uppercase block font-semibold">
                  {project.isStandby ? "STATUS DIRECTIVE" : "THE CHALLENGE"}
                </span>
                <p className="font-sans text-xs text-[#f0ece4] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="space-y-1">
                <span className={`font-mono-system text-[8.5px] tracking-[0.2em] uppercase block font-semibold ${project.isStandby ? "text-[#8a8a8e]" : "text-[#00e5ff]"
                  }`}>
                  {project.isStandby ? "COMPARTMENT TELEMETRY" : "ENGINEERED ARCHITECTURE"}
                </span>
                <p className="font-sans text-xs text-[#8a8a8e] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Aerospace Specification Modules: System Stack & Measured Outcome */}
            <div className="p-3 rounded-sm border border-[hsla(0,0%,100%,0.08)] bg-[#12141c]/80 backdrop-blur-md space-y-2.5">
              <div>
                <span className={`font-mono-system text-[8.5px] tracking-[0.2em] uppercase block font-semibold border-b border-[hsla(0,0%,100%,0.08)] pb-1 mb-1.5 ${project.isStandby ? "text-[#8a8a8e]" : "text-[#00e5ff]"
                  }`}>
                  {project.isStandby ? "CHAMBER STATUS" : "SYSTEM STACK"}
                </span>
                <ul className="grid grid-cols-2 gap-1 font-mono-system text-[9.5px] text-[#f0ece4]">
                  {project.technology.map((tech, i) => (
                    <li key={i} className="flex items-center gap-1.5 truncate">
                      <span className={project.isStandby ? "text-[#8a8a8e]" : "text-[#00e5ff]"}>•</span>
                      <span className="truncate">{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-[hsla(0,0%,100%,0.06)]">
                <span className="font-mono-system text-[8.5px] tracking-[0.2em] text-[#ffd166] uppercase block font-semibold mb-0.5">
                  {project.isStandby ? "DIAGNOSTIC OUTCOME" : "MEASURED OUTCOME"}
                </span>
                <p className="font-sans text-[11px] text-[#8a8a8e] leading-normal">
                  {project.result}
                </p>
              </div>
            </div>

            {/* Action Triggers */}
            <div className="flex items-center gap-3 pt-1">
              {!project.isStandby && project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-system text-[9px] tracking-[0.2em] text-[#0a0a0c] bg-[#00e5ff] font-semibold px-4 py-2 rounded-sm hover:shadow-[0_0_16px_#00e5ff] transition-all"
                >
                  LIVE DEMO ↗
                </a>
              )}
              {!project.isStandby && project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-system text-[9px] tracking-[0.2em] text-[#f0ece4] bg-[#12141c]/80 border border-[hsla(0,0%,100%,0.12)] px-4 py-2 rounded-sm hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all"
                >
                  SOURCE CODE ↗
                </a>
              )}
              {project.isStandby && (
                <span className="font-mono-system text-[9px] tracking-[0.2em] text-[#8a8a8e] bg-[#12141c]/60 border border-[hsla(0,0%,100%,0.08)] px-4 py-2 rounded-sm opacity-60">
                  [ COMPARTMENT SEALED // STANDBY ]
                </span>
              )}
            </div>
          </div>

          {/* Bottom Telemetry Breadcrumb */}
          <div className="flex justify-between items-end text-[8px] font-mono-system text-[#8a8a8e] opacity-40">
            <div>QUANTUM ARCHIVE // SECTOR 02</div>
            <div>STATUS // {project.isStandby ? "STANDBY COMPARTMENT" : `ACTIVE MODULE [${activeProjectId.toUpperCase()}]`}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ArchiveDetail;
