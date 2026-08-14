"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { ABOUT_DATA } from "@/data/about";
import { TextReveal } from "@/components/ui/TextReveal";

export function ObservatoryContent() {
  const currentState = useAppStore((state) => state.currentState);
  const transition = useAppStore((state) => state.transition);

  const isVisible = currentState === "ABOUT";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-30 pointer-events-none flex flex-col justify-between p-8 md:p-16 max-w-6xl mx-auto w-full select-none"
        >
          {/* Top Section Header */}
          <div className="flex justify-between items-start pt-16 md:pt-12">
            <div className="space-y-1">
              <span className="font-mono-system text-[10px] tracking-[0.3em] text-[#00e5ff] uppercase">
                DESTINATION 01 // OBSERVATORY
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[#f0ece4] tracking-tight">
                IDENTITY & SYSTEMS
              </h2>
            </div>

            {/* Close Button */}
            <button
              onClick={() => transition("MISSION_CONTROL")}
              className="pointer-events-auto font-mono-system text-[10px] tracking-[0.2em] text-[#8a8a8e] hover:text-[#00e5ff] px-4 py-2 rounded border border-[hsla(0,0%,100%,0.08)] glass-panel transition-all"
            >
              [ RETURN TO OVERVIEW ]
            </button>
          </div>

          {/* Center Philosophy Statement (Magazine Style) */}
          <div className="my-auto py-6 max-w-3xl">
            <p className="font-mono-system text-[10px] tracking-[0.25em] text-[#8a8a8e] uppercase mb-3">
              PRIMARY PHILOSOPHY
            </p>
            <TextReveal
              text={ABOUT_DATA.statement}
              mode="words"
              stagger={0.03}
              as="h3"
              className="font-display text-xl sm:text-3xl md:text-4xl text-[#f0ece4] leading-snug tracking-tight"
            />
            <p className="font-sans text-xs md:text-sm text-[#8a8a8e] mt-4 leading-relaxed max-w-2xl">
              {ABOUT_DATA.bio}
            </p>
          </div>

          {/* Bottom Editorial Data Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 md:pb-8 border-t border-[hsla(0,0%,100%,0.08)] pt-6">
            {/* Focus Areas */}
            <div className="space-y-2">
              <span className="font-mono-system text-[9px] tracking-[0.25em] text-[#00e5ff] uppercase">
                ENGINEERING DOMAINS
              </span>
              <ul className="space-y-1 text-xs text-[#f0ece4]">
                {ABOUT_DATA.focusAreas.map((area, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#00e5ff] rounded-full" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Academic Background */}
            <div className="space-y-2">
              <span className="font-mono-system text-[9px] tracking-[0.25em] text-[#00e5ff] uppercase">
                ACADEMIC BACKGROUND
              </span>
              <div className="text-xs text-[#f0ece4] space-y-0.5">
                <p className="font-medium">{ABOUT_DATA.education.degree}</p>
                <p className="text-[#8a8a8e]">{ABOUT_DATA.education.institution}</p>
                <p className="font-mono-system text-[10px] text-[#00e5ff]">
                  {ABOUT_DATA.education.year}
                </p>
              </div>
            </div>

            {/* Station Metrics */}
            <div className="space-y-2">
              <span className="font-mono-system text-[9px] tracking-[0.25em] text-[#00e5ff] uppercase">
                TELEMETRY METRICS
              </span>
              <div className="grid grid-cols-2 gap-3">
                {ABOUT_DATA.metrics.map((metric, i) => (
                  <div key={i} className="space-y-0.5">
                    <p className="font-display text-sm md:text-base text-[#f0ece4]">
                      {metric.value}
                    </p>
                    <p className="font-mono-system text-[8px] tracking-wider text-[#8a8a8e]">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ObservatoryContent;
