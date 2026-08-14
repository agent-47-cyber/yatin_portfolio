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
          className="fixed inset-0 z-30 pointer-events-none flex flex-col justify-between p-8 md:p-16 max-w-6xl mx-auto w-full select-none"
        >
          {/* Top Header */}
          <div className="flex justify-between items-start pt-12">
            <div className="space-y-1">
              <span className="font-mono-system text-[10px] tracking-[0.3em] text-[#00e5ff] uppercase">
                DESTINATION 03 // ORBITAL HISTORY
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[#f0ece4] tracking-tight">
                ENGINEERING JOURNEY
              </h2>
            </div>

            {/* Return Button */}
            <button
              onClick={() => transition("MISSION_CONTROL")}
              className="pointer-events-auto font-mono-system text-[10px] tracking-[0.2em] text-[#8a8a8e] hover:text-[#00e5ff] px-4 py-2 rounded border border-[hsla(0,0%,100%,0.08)] glass-panel transition-all"
            >
              [ RETURN TO OVERVIEW ]
            </button>
          </div>

          {/* Center Checkpoint Presentation */}
          <div className="my-auto py-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Waypoint Selector Tabs */}
            <div className="md:col-span-4 space-y-3 pointer-events-auto">
              <span className="font-mono-system text-[9px] tracking-[0.25em] text-[#8a8a8e] uppercase block mb-2">
                TRAJECTORY WAYPOINTS
              </span>
              {EXPERIENCE_DATA.map((exp, index) => {
                const isSelected = activeIndex === index;
                return (
                  <button
                    key={exp.id}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full text-left p-4 rounded transition-all duration-300 border ${
                      isSelected
                        ? "glass-panel border-[#00e5ff]/60 bg-[#00e5ff]/5"
                        : "border-[hsla(0,0%,100%,0.05)] hover:border-[hsla(0,0%,100%,0.15)] opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-display text-lg sm:text-xl text-[#f0ece4]">
                        {exp.year}
                      </span>
                      <span
                        className={`font-mono-system text-[9px] tracking-wider ${
                          isSelected ? "text-[#00e5ff]" : "text-[#8a8a8e]"
                        }`}
                      >
                        {exp.period}
                      </span>
                    </div>
                    <p className="font-mono-system text-[10px] text-[#8a8a8e] tracking-tight mt-1 truncate">
                      {exp.organization}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Milestone Card */}
            <div className="md:col-span-8 glass-panel p-8 rounded border border-[hsla(0,0%,100%,0.08)] space-y-6">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-mono-system text-[10px] tracking-[0.2em] text-[#00e5ff] uppercase">
                    {activeExp.organization}
                  </span>
                  <span className="font-mono-system text-[10px] text-[#8a8a8e]">
                    {activeExp.period}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-[#f0ece4] tracking-tight">
                  {activeExp.role}
                </h3>
              </div>

              <p className="font-sans text-xs md:text-sm text-[#8a8a8e] leading-relaxed">
                {activeExp.description}
              </p>

              {/* Accomplishments */}
              <div className="space-y-2 pt-2 border-t border-[hsla(0,0%,100%,0.06)]">
                <span className="font-mono-system text-[9px] tracking-[0.25em] text-[#8a8a8e] uppercase block">
                  KEY CONTRIBUTIONS
                </span>
                <ul className="space-y-2 text-xs text-[#f0ece4]">
                  {activeExp.accomplishments.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-[1px] bg-[#00e5ff] mt-2 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Footer */}
          <div className="flex justify-between items-end pb-8 border-t border-[hsla(0,0%,100%,0.08)] pt-4 text-[9px] font-mono-system text-[#8a8a8e] opacity-60">
            <div>CHRONOLOGICAL WAYPOINT MATRIX</div>
            <div>COORDINATES // [8.5, 0, 0]</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default OrbitalHistoryContent;
