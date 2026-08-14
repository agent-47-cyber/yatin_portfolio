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
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-30 pointer-events-none flex flex-col justify-between p-8 md:p-16 max-w-7xl mx-auto w-full select-none"
        >
          {/* Top Section Header */}
          <div className="flex justify-between items-start pt-12">
            <div className="space-y-1">
              <span className="font-mono-system text-[10px] tracking-[0.3em] text-[#ffd166] uppercase">
                DESTINATION 01 // OBSERVATORY
              </span>
              <h2 className="font-display text-4xl sm:text-6xl text-[#f0ece4] tracking-tight">
                IDENTITY & SYSTEMS
              </h2>
            </div>

            {/* Return Button */}
            <button
              onClick={() => transition("MISSION_CONTROL")}
              className="pointer-events-auto font-mono-system text-[10px] tracking-[0.2em] text-[#8a8a8e] hover:text-[#ffd166] px-5 py-2.5 rounded border border-[hsla(0,0%,100%,0.08)] glass-panel transition-all"
            >
              [ RETURN TO MISSION CONTROL ]
            </button>
          </div>

          {/* Center Editorial Manifesto */}
          <div className="my-auto py-8 max-w-3xl">
            <p className="font-mono-system text-[10px] tracking-[0.25em] text-[#8a8a8e] uppercase mb-4">
              PRIMARY MANIFESTO
            </p>
            <TextReveal
              text={ABOUT_DATA.statement}
              mode="words"
              stagger={0.03}
              as="h3"
              className="font-display text-2xl sm:text-4xl md:text-5xl text-[#f0ece4] leading-tight tracking-tight"
            />
            <p className="font-sans text-xs md:text-sm text-[#8a8a8e] mt-6 leading-relaxed max-w-2xl">
              {ABOUT_DATA.bio}
            </p>
          </div>

          {/* Bottom Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-8 border-t border-[hsla(0,0%,100%,0.08)] pt-6">
            {/* Engineering Domains */}
            <div className="space-y-2.5">
              <span className="font-mono-system text-[9px] tracking-[0.25em] text-[#ffd166] uppercase">
                ENGINEERING DOMAINS
              </span>
              <ul className="space-y-1.5 font-mono-system text-xs text-[#f0ece4]">
                {ABOUT_DATA.focusAreas.map((area, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-[1px] bg-[#ffd166]" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Academic Background */}
            <div className="space-y-2.5">
              <span className="font-mono-system text-[9px] tracking-[0.25em] text-[#ffd166] uppercase">
                ACADEMIC FOUNDATION
              </span>
              <div className="font-mono-system text-xs text-[#f0ece4] space-y-1">
                <p className="font-medium text-[#f0ece4]">{ABOUT_DATA.education.degree}</p>
                <p className="text-[#8a8a8e]">{ABOUT_DATA.education.institution}</p>
                <p className="text-[10px] text-[#ffd166]">
                  {ABOUT_DATA.education.year}
                </p>
              </div>
            </div>

            {/* Factual Attributes */}
            <div className="space-y-2.5">
              <span className="font-mono-system text-[9px] tracking-[0.25em] text-[#ffd166] uppercase">
                FACTUAL ATTRIBUTES
              </span>
              <div className="grid grid-cols-2 gap-4 font-mono-system">
                {ABOUT_DATA.metrics.map((metric, i) => (
                  <div key={i} className="space-y-0.5">
                    <p className="font-display text-sm md:text-base text-[#f0ece4]">
                      {metric.value}
                    </p>
                    <p className="text-[9px] tracking-wider text-[#8a8a8e]">
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
