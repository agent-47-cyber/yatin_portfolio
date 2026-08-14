import type { Experience } from "@/types";

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "exp-2026",
    year: "2026",
    period: "2025 — PRESENT",
    organization: "NEURAL SYSTEMS LABS",
    role: "SENIOR SOFTWARE ENGINEER",
    description:
      "Leading core architecture for spatial computing interfaces and distributed GPU rendering pipelines.",
    accomplishments: [
      "Engineered real-time WebGL spatial graph visualizer handling 50k+ nodes at 60 FPS",
      "Architected deterministic state sync protocol reducing latency by 45%",
      "Mentored team of 6 engineers across high-concurrency frontend systems",
    ],
    coordinates: {
      orbitAngle: 0,
      orbitRadius: 10,
      height: 0,
    },
  },
  {
    id: "exp-2025",
    year: "2025",
    period: "2024 — 2025",
    organization: "QUANTUM INTERACTIVE",
    role: "FULL-STACK CREATIVE DEVELOPER",
    description:
      "Built immersive interactive web products and high-impact digital experiences for tier-one technology enterprises.",
    accomplishments: [
      "Delivered 4 Awwwards Site of the Day winning interactive web applications",
      "Pioneered procedural shader library reducing bundle size by 35%",
      "Implemented zero-layout-shift animation system with GSAP and WebGL",
    ],
    coordinates: {
      orbitAngle: (2 * Math.PI) / 3,
      orbitRadius: 10,
      height: 1.2,
    },
  },
  {
    id: "exp-2024",
    year: "2024",
    period: "2023 — 2024",
    organization: "ORBITAL COMPUTING CO.",
    role: "SOFTWARE ENGINEERING FELLOW",
    description:
      "Developed edge-native microservices and developer tooling infrastructure across cloud environments.",
    accomplishments: [
      "Optimized serverless cold starts from 320ms to 8ms using Rust WASM modules",
      "Authored automated CI/CD static analysis ruleset adopted company-wide",
      "Constructed internal performance benchmark telemetry suite",
    ],
    coordinates: {
      orbitAngle: (4 * Math.PI) / 3,
      orbitRadius: 10,
      height: -0.8,
    },
  },
];
