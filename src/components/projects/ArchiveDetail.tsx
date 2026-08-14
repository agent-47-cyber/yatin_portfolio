"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { PROJECTS_DATA } from "@/data/projects";

export function ArchiveDetail() {
  const currentState = useAppStore((state) => state.currentState);
  const selectedProjectId = useAppStore((state) => state.selectedProjectId);
  const selectProject = useAppStore((state) => state.selectProject);

  const isVisible = currentState === "PROJECT_DETAIL" && selectedProjectId !== null;
  const project = PROJECTS_DATA.find((p) => p.id === selectedProjectId);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-30 pointer-events-none flex flex-col justify-between p-8 md:p-16 max-w-7xl mx-auto w-full select-none"
        >
          {/* Top Header */}
          <div className="flex justify-between items-start pt-12">
            <div className="space-y-1">
              <span className="font-mono-system text-[10px] tracking-[0.3em] text-[#00e5ff] uppercase">
                {project.category} // {project.year}
              </span>
              <h2 className="font-display text-4xl sm:text-6xl text-[#f0ece4] tracking-tight">
                {project.name}
              </h2>
              <p className="font-mono-system text-xs text-[#8a8a8e] tracking-wider">
                {project.tagline}
              </p>
            </div>

            {/* Return Button */}
            <button
              onClick={() => selectProject(null)}
              className="pointer-events-auto font-mono-system text-[10px] tracking-[0.2em] text-[#8a8a8e] hover:text-[#00e5ff] px-5 py-2.5 rounded border border-[hsla(0,0%,100%,0.1)] glass-panel transition-all"
            >
              [ RETURN TO ARCHIVE ]
            </button>
          </div>

          {/* Center 2-Column Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-auto py-8">
            {/* Left Column: Problem & Solution Architecture */}
            <div className="space-y-6 max-w-xl">
              {/* Problem */}
              <div className="space-y-2">
                <span className="font-mono-system text-[9px] tracking-[0.25em] text-[#8a8a8e] uppercase">
                  THE CHALLENGE
                </span>
                <p className="font-sans text-xs md:text-sm text-[#f0ece4] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Solution */}
              <div className="space-y-2">
                <span className="font-mono-system text-[9px] tracking-[0.25em] text-[#00e5ff] uppercase">
                  ENGINEERED SOLUTION
                </span>
                <p className="font-sans text-xs md:text-sm text-[#f0ece4] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Right Column: Floating Glass Telemetry & Result */}
            <div className="space-y-6 max-w-md md:ml-auto w-full">
              {/* Technology Stack */}
              <div className="glass-panel p-6 rounded border border-[hsla(0,0%,100%,0.08)] space-y-4">
                <span className="font-mono-system text-[9px] tracking-[0.25em] text-[#8a8a8e] uppercase block">
                  SYSTEM ARCHITECTURE & TECH
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technology.map((tech, i) => (
                    <span
                      key={i}
                      className="font-mono-system text-[10px] text-[#f0ece4] bg-[hsla(0,0%,100%,0.05)] border border-[hsla(0,0%,100%,0.08)] px-2.5 py-1 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Result */}
                <div className="pt-4 border-t border-[hsla(0,0%,100%,0.08)] space-y-1">
                  <span className="font-mono-system text-[9px] tracking-[0.25em] text-[#00e5ff] uppercase block">
                    MEASURED OUTCOME
                  </span>
                  <p className="font-sans text-xs text-[#8a8a8e] leading-normal">
                    {project.result}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Links */}
          <div className="flex justify-between items-end pb-8 border-t border-[hsla(0,0%,100%,0.08)] pt-6">
            <div className="flex items-center gap-4 pointer-events-auto">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-system text-[10px] tracking-[0.2em] text-[#0a0a0c] bg-[#00e5ff] font-semibold px-6 py-2.5 rounded-sm hover:shadow-[0_0_20px_#00e5ff] transition-all"
                >
                  LIVE ENVIRONMENT ↗
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-system text-[10px] tracking-[0.2em] text-[#f0ece4] glass-panel border border-[hsla(0,0%,100%,0.12)] px-6 py-2.5 rounded-sm hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all"
                >
                  SOURCE CODE ↗
                </a>
              )}
            </div>

            <div className="font-mono-system text-[9px] text-[#8a8a8e] tracking-wider opacity-60">
              ORBITAL ARCHIVE // REPOSITORY 02
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ArchiveDetail;
