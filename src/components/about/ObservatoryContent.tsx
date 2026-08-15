"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { ABOUT_DATA } from "@/data/about";

export function ObservatoryContent() {
  const currentState = useAppStore((state) => state.currentState);
  const isVisible = currentState === "ABOUT";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="identity-dossier-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-30 pointer-events-none p-6 sm:p-10 md:p-12 flex flex-col justify-between select-none"
        >
          {/* Top Bar: Sector Metadata */}
          <div className="flex justify-between items-start w-full h-8">
            <div className="flex items-center gap-3 pointer-events-auto">
              <span className="font-mono-system text-[10px] tracking-[0.3em] text-[#00e5ff] uppercase font-semibold">
                {ABOUT_DATA.sectionLabel}
              </span>
              <span className="w-6 h-[1px] bg-[#00e5ff]/30" />
              <span className="font-mono-system text-[9px] tracking-[0.2em] text-[#8a8a8e] uppercase">
                ENGINEERING DOSSIER // SECTOR 01
              </span>
            </div>
          </div>

          {/* Left Asymmetric Editorial Dossier (Restricted to Left 40% Viewport — 0% 3D Core Overlap) */}
          <div className="my-auto w-full max-w-md lg:max-w-[490px] pointer-events-auto space-y-4">
            {/* 1. Header: Name & Unified Roles Row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="space-y-1"
            >
              <h1 className="font-display text-2xl sm:text-3xl md:text-3.5xl text-[#f0ece4] tracking-tight leading-none">
                {ABOUT_DATA.name}
              </h1>
              <p className="font-mono-system text-[10px] sm:text-[10.5px] text-[#00e5ff] tracking-[0.18em] uppercase font-medium">
                {ABOUT_DATA.roles.join(" // ")}
              </p>
            </motion.div>

            {/* Subtle Cyan Divider Line */}
            <div className="w-16 h-[1px] bg-gradient-to-r from-[#00e5ff]/60 to-transparent" />

            {/* 2. Mission Statement (Focal Editorial Element) */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
            >
              <h2 className="font-display text-sm sm:text-base md:text-lg text-[#f0ece4] leading-snug tracking-tight">
                &ldquo;{ABOUT_DATA.missionStatement}&rdquo;
              </h2>
            </motion.div>

            {/* 3. Concise Profile Summary */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
            >
              <p className="font-sans text-xs text-[#8a8a8e] leading-relaxed">
                {ABOUT_DATA.profile}
              </p>
            </motion.div>

            {/* 4. One Connected 3-Column Engineering Console Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="rounded-sm border border-[hsla(0,0%,100%,0.08)] bg-[#12141c]/85 backdrop-blur-md p-3.5 sm:p-4 shadow-xl"
            >
              <div className="grid grid-cols-3 gap-3 divide-x divide-[hsla(0,0%,100%,0.06)]">
                {/* Column 1: CURRENT FOCUS */}
                <div className="space-y-1.5 pr-1">
                  <span className="font-mono-system text-[8.5px] tracking-[0.2em] text-[#00e5ff] uppercase block font-semibold border-b border-[hsla(0,0%,100%,0.06)] pb-1">
                    CURRENT FOCUS
                  </span>
                  <ul className="space-y-1 font-mono-system text-[9px] text-[#f0ece4]">
                    {ABOUT_DATA.currentFocus.map((item, i) => (
                      <li key={i} className="flex items-start gap-1 leading-tight">
                        <span className="text-[#00e5ff]">•</span>
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: TECH STACK */}
                <div className="space-y-1.5 px-2">
                  <span className="font-mono-system text-[8.5px] tracking-[0.2em] text-[#f0ece4] uppercase block font-semibold border-b border-[hsla(0,0%,100%,0.06)] pb-1">
                    TECH STACK
                  </span>
                  <ul className="space-y-1 font-mono-system text-[9px] text-[#8a8a8e]">
                    {ABOUT_DATA.techStack.map((tech, i) => (
                      <li key={i} className="flex items-start gap-1 leading-tight">
                        <span className="text-[#8a8a8e]">•</span>
                        <span className="truncate">{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: CURRENTLY */}
                <div className="space-y-1.5 pl-2">
                  <span className="font-mono-system text-[8.5px] tracking-[0.2em] text-[#ffd166] uppercase block font-semibold border-b border-[hsla(0,0%,100%,0.06)] pb-1">
                    CURRENTLY
                  </span>
                  <ul className="space-y-1 font-mono-system text-[9px] text-[#f0ece4]">
                    {ABOUT_DATA.currently.map((status, i) => (
                      <li key={i} className="flex items-start gap-1 leading-tight">
                        <span className="text-[#ffd166]">•</span>
                        <span className="truncate">{status}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Telemetry Breadcrumb */}
          <div className="flex justify-between items-end text-[8px] font-mono-system text-[#8a8a8e] opacity-40 h-6">
            <div>IDENTITY CORE // OBSERVATION SECTOR 01</div>
            <div>DOSSIER ACCESS // VERIFIED</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ObservatoryContent;
