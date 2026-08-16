"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { EXPERIENCE_DATA } from "@/data/experience";

export function OrbitalHistoryContent() {
  const currentState = useAppStore((state) => state.currentState);
  const selectedMilestoneYear = useAppStore(
    (state) => state.selectedMilestoneYear
  );
  const selectMilestone = useAppStore((state) => state.selectMilestone);

  const isVisible = currentState === "EXPERIENCE";
  const activeExp =
    EXPERIENCE_DATA.find((e) => e.year === selectedMilestoneYear) ||
    EXPERIENCE_DATA[0];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-30 pointer-events-none p-6 sm:p-10 md:p-12 flex flex-col justify-between select-none"
        >
          {/* Top Bar: Sector Metadata */}
          <div className="flex justify-between items-start w-full h-8">
            <div className="flex items-center gap-3 pointer-events-auto">
              <span className="font-mono-system text-[10px] tracking-[0.3em] text-[#e0aaff] uppercase font-semibold">
                DESTINATION 03
              </span>
              <span className="w-6 h-[1px] bg-[#e0aaff]/30" />
              <span className="font-mono-system text-[9px] tracking-[0.2em] text-[#8a8a8e] uppercase">
                CAREER FLIGHT DECK
              </span>
            </div>
          </div>

          {/* 3-Column Spatial Layout: Left (28%) | Center (44% Clean 3D Ring Space) | Right (28%) */}
          <div className="w-full flex-1 flex flex-col lg:flex-row justify-between items-center gap-8 py-2">
            {/* ------------------------------------------------------------ */}
            {/* 1. LEFT EDITORIAL COLUMN (Left 28% Viewport)                 */}
            {/* ------------------------------------------------------------ */}
            <div className="w-full lg:max-w-[340px] pointer-events-auto space-y-4">
              <div className="space-y-1">
                <h1 className="font-display text-2xl sm:text-3xl text-[#f0ece4] tracking-tight leading-none">
                  TRAJECTORY LOG
                </h1>
                <p className="font-mono-system text-[10px] text-[#e0aaff] tracking-widest uppercase font-medium">
                  ENGINEERING FLIGHT VECTOR
                </p>
              </div>

              {/* Thin Divider */}
              <div className="w-16 h-[1px] bg-gradient-to-r from-[#e0aaff]/60 to-transparent" />

              {/* Overview Narrative */}
              <p className="font-sans text-xs text-[#8a8a8e] leading-relaxed">
                Every experience represents another stage in my growth as an
                engineer. From academic foundations to AI systems, full-stack
                development, and interactive 3D experiences, each milestone
                contributed to how I design software today.
              </p>

              {/* Vertical Milestone Selector Tabs (2024 - 2028) */}
              <div className="space-y-1.5 pt-1">
                <span className="font-mono-system text-[8.5px] tracking-[0.2em] text-[#8a8a8e] uppercase block font-semibold">
                  CHRONOLOGICAL CHECKPOINTS
                </span>
                <div className="flex flex-col gap-1">
                  {EXPERIENCE_DATA.map((milestone) => {
                    const isSelected =
                      milestone.year === selectedMilestoneYear;
                    return (
                      <button
                        key={milestone.id}
                        onClick={() => selectMilestone(milestone.year)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-sm font-mono-system text-left transition-all duration-200 focus:outline-none ${isSelected
                            ? "bg-[#e0aaff]/15 border border-[#e0aaff]/50 text-[#f0ece4] shadow-[0_0_12px_rgba(224,170,255,0.2)]"
                            : "border border-[hsla(0,0%,100%,0.05)] hover:border-[hsla(0,0%,100%,0.15)] text-[#8a8a8e] hover:text-[#f0ece4] bg-[#12141c]/40"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-[#e0aaff]" : "bg-[#8a8a8e]/40"
                              }`}
                          />
                          <span className="text-[11px] font-bold">
                            {milestone.year}
                          </span>
                        </div>
                        <span className="text-[9px] uppercase tracking-wider text-[#8a8a8e] truncate max-w-[130px]">
                          {milestone.role.split("•")[0].split("&")[0].trim()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Center Area (Empty DOM) — Dedicated to 3D Chronology Ring Machine */}
            <div className="hidden lg:block flex-1 pointer-events-none" />

            {/* ------------------------------------------------------------ */}
            {/* 2. RIGHT AEROSPACE BRIEFING PANEL (Right 28% Viewport)       */}
            {/* Clean compact card with zero scrollbar & zero HUD overlap     */}
            {/* ------------------------------------------------------------ */}
            <div className="w-full lg:max-w-[360px] pointer-events-auto mt-14 sm:mt-18 lg:mt-20">
              <div className="p-4 sm:p-5 rounded-sm border border-[hsla(0,0%,100%,0.08)] bg-[#12141c]/90 backdrop-blur-md space-y-3 shadow-lg">
                {/* Header: Mission Log & Year */}
                <div className="space-y-0.5 pb-2 border-b border-[hsla(0,0%,100%,0.08)]">
                  <div className="flex justify-between items-center text-[9px] font-mono-system">
                    <span className="tracking-[0.2em] text-[#e0aaff] uppercase font-semibold">
                      MISSION LOG // {activeExp.year}
                    </span>
                    <span className="text-[#8a8a8e]">{activeExp.period}</span>
                  </div>
                  <h2 className="font-display text-base text-[#f0ece4] tracking-tight leading-tight">
                    {activeExp.role}
                  </h2>
                  <p className="font-mono-system text-[9px] text-[#8a8a8e] tracking-wider uppercase">
                    {activeExp.organization}
                  </p>
                </div>

                {/* Summary */}
                <div className="space-y-0.5">
                  <span className="font-mono-system text-[8.5px] tracking-[0.2em] text-[#8a8a8e] uppercase block font-semibold">
                    SUMMARY
                  </span>
                  <p className="font-sans text-xs text-[#f0ece4] leading-relaxed">
                    {activeExp.description}
                  </p>
                </div>

                {/* Key Accomplishments (3 compact items) */}
                <div className="space-y-1 pt-0.5">
                  <span className="font-mono-system text-[8.5px] tracking-[0.2em] text-[#e0aaff] uppercase block font-semibold">
                    KEY MILESTONES
                  </span>
                  <ul className="space-y-1 font-mono-system text-[9.5px] text-[#f0ece4]">
                    {activeExp.accomplishments.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 leading-tight">
                        <span className="text-[#e0aaff] mt-0.5">•</span>
                        <span className="text-[#8a8a8e]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                {activeExp.technologies && (
                  <div className="pt-1.5 border-t border-[hsla(0,0%,100%,0.06)] space-y-1">
                    <span className="font-mono-system text-[8.5px] tracking-[0.2em] text-[#8a8a8e] uppercase block font-semibold">
                      TECHNOLOGIES & FOCUS
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {activeExp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-xs bg-[#e0aaff]/10 border border-[#e0aaff]/20 font-mono-system text-[8.5px] text-[#f0ece4]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Flight Telemetry Footer */}
          <div className="flex justify-between items-end text-[8px] font-mono-system text-[#8a8a8e] opacity-40 h-6">
            <div>CHRONOLOGY FLIGHT DECK // SECTOR 03</div>
            <div>STATUS // ACTIVE VECTOR [{selectedMilestoneYear}]</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default OrbitalHistoryContent;
