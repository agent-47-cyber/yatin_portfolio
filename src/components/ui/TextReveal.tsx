"use client";

import { useEffect, useRef } from "react";
import { revealTextWords, revealTextLines } from "@/motion/ui/text";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TextRevealProps {
  text: string;
  mode?: "words" | "lines";
  className?: string;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export function TextReveal({
  text,
  mode = "words",
  className = "",
  stagger = 0.05,
  as: Component = "div",
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const spanElements = containerRef.current.querySelectorAll<HTMLSpanElement>(
      ".reveal-item"
    );

    if (mode === "lines") {
      revealTextLines(spanElements, stagger);
    } else {
      revealTextWords(spanElements, stagger);
    }
  }, [text, mode, stagger, prefersReducedMotion]);

  if (mode === "words") {
    const words = text.split(" ");

    return (
      <Component ref={containerRef as never} className={className}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
            <span className="reveal-item inline-block will-change-transform">
              {word}
            </span>
          </span>
        ))}
      </Component>
    );
  }

  return (
    <Component ref={containerRef as never} className={className}>
      <span className="reveal-item inline-block will-change-transform">
        {text}
      </span>
    </Component>
  );
}

export default TextReveal;
