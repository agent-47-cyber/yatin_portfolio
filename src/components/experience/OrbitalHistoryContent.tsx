"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { EXPERIENCE_DATA } from "@/data/experience";

export function OrbitalHistoryContent() {
  const currentState = useAppStore((state) => state.currentState);
  const transition = useAppStore((state) => state.transition);

  const [activeIndex, setActiveIndex] = useState(0);
  const isVisible = currentState === "EXPERIENCE";
  const activeExp = EXPERIENCE_DATA[activeIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-30 pointer-events-none flex flex-col justify-between p-8 md:p-16 max-w-7xl mx-auto w-full select-none"
        >
          {/* Top Header */}
          <div className="flex justify-between items-start pt-12">
            <div className="space-y-1">
              <span className="font-mono-system text-[10px] tracking-[0.3em] text-[#e0aaff] uppercase">
                DESTINATION 03 // CAREER FLIGHT LOG
              </span>
              <h2 className="font-display text-4xl sm:text-6xl text-[#f0ece4] tracking-tight">
                FLIGHT TRAJECTORY
              </h2>
            </div>

            {/* Return Button */}
            <button
              onClick={() => transition("MISSION_CONTROL")}
              className="pointer-events-auto font-mono-system text-[10px] tracking-[0.2em] text-[#8a8a8e] hover:text-[#e0aaff] px-5 py-2.5 rounded border border-[hsla(0,0%,100%,0.08)] glass-panel transition-all"
            >
              [ RETURN TO MISSION CONTROL ]
            </button>
          </div>

          {/* Center Spacecraft Flight Log Grid */}
          <div className="my-auto py-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Left Column: Interactive Waypoint Log Selector */}
            <div className="md:col-span-4 space-y-3 pointer-events-auto">
              <span className="font-mono-system text-[9px] tracking-[0.25em] text-[#8a8a8e] uppercase block mb-3">
                CHRONOLOGICAL CHECKPOINTS
              </span>
              {EXPERIENCE_DATA.map((exp, index) => {
                const isSelected = activeIndex === index;
                return (
                  <button
                    key={exp.id}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full text-left p-5 rounded-sm transition-all duration-300 border ${
                      isSelected
                        ? "glass-panel border-[#e0aaff]/60 bg-[#e0aaff]/5 shadow-[0_0_20px_rgba(224,170,255,0.15)]"
                        : "border-[hsla(0,0%,100%,0.05)] hover:border-[hsla(0,0%,100%,0.15)] opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-display text-xl sm:text-2xl text-[#f0ece4]">
                        {exp.year}
                      </span>
                      <span
                        className={`font-mono-system text-[9px] tracking-wider ${
                          isSelected ? "text-[#e0aaff] font-semibold" : "text-[#8a8a8e]"
                        }`}
                      >
                        {exp.period}
                      </span>
                    </div>
                    <p className="font-mono-system text-[11px] text-[#8a8a8e] tracking-tight mt-1.5 truncate">
                      {exp.organization}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Editorial Mission Milestone Narrative */}
            <div className="md:col-span-8 glass-panel p-8 md:p-10 rounded border border-[hsla(0,0%,100%,0.08)] space-y-6">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-mono-system text-[10px] tracking-[0.2em] text-[#e0aaff] uppercase">
                    {activeExp.organization}
                  </span>
                  <span className="font-mono-system text-[10px] text-[#8a8a8e]">
                    {activeExp.period}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-4xl text-[#f0ece4] tracking-tight">
                  {activeExp.role}
                </h3>
              </div>

              <p className="font-sans text-xs md:text-sm text-[#8a8a8e] leading-relaxed max-w-2xl">
                {activeExp.description}
              </p>

              {/* Accomplishments */}
              <div className="space-y-2.5 pt-4 border-t border-[hsla(0,0%,100%,0.06)]">
                <span className="font-mono-system text-[9px] tracking-[0.25em] text-[#8a8a8e] uppercase block">
                  SYSTEM CONTRIBUTIONS
                </span>
                <ul className="space-y-2 font-mono-system text-xs text-[#f0ece4]">
                  {activeExp.accomplishments.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-[1px] bg-[#e0aaff] mt-2 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Flight Telemetry Footer */}
          <div className="flex justify-between items-end pb-8 border-t border-[hsla(0,0%,100%,0.08)] pt-4 text-[9px] font-mono-system text-[#8a8a8e] opacity-60">
            <div>SPACE-TIME FLIGHT VECTOR // 2022 — 2026</div>
            <div>COORDINATES // [16.0, 0.0, -2.0]</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default OrbitalHistoryContent;
