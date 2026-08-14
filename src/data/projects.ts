import type { Project } from "@/types";

export const PROJECTS_DATA: Project[] = [
  {
    id: "devscope",
    name: "DEVSCOPE",
    category: "SYSTEMS // AI INTELLIGENCE",
    year: "2026",
    tagline: "AUTONOMOUS CODEBASE ARCHITECTURE & INTELLIGENCE ENGINE",
    description:
      "A developer intelligence platform that converts complex code repositories into interactive dependency graphs with automated architectural insight.",
    problem:
      "Navigating unfamiliar, multi-million-line codebases creates high cognitive load and slows onboarding for engineering teams.",
    solution:
      "Built an AST-based parsing pipeline using Rust/WASM that maps modular dependency topologies in real-time, coupled with localized LLM context indexing.",
    technology: ["Next.js 15", "TypeScript", "WebAssembly", "Rust", "Tailwind CSS", "Three.js"],
    result:
      "Reduced developer code comprehension time by over 60% with instant interactive topological navigation.",
    liveUrl: "https://github.com/agent-47-cyber",
    githubUrl: "https://github.com/agent-47-cyber/devscope",
    objectType: "computational",
    accentColor: "#00e5ff",
  },
  {
    id: "network-analyzer",
    name: "INTRUSION SHIELD",
    category: "CYBERSECURITY // ML TELEMETRY",
    year: "2025",
    tagline: "REAL-TIME NETWORK PACKET ANOMALY DETECTION ENGINE",
    description:
      "A high-throughput packet analysis pipeline that intercepts and classifies suspicious network telemetry using unsupervised clustering.",
    problem:
      "Traditional rule-based intrusion detection systems fail against zero-day attack patterns and high-volume polymorphic payloads.",
    solution:
      "Engineered an event-driven packet listener with streaming anomaly detection in Python/C++, visualizing threat vectors on a real-time spatial graph.",
    technology: ["Python", "C++", "FastAPI", "React", "Scikit-Learn", "Tailwind CSS"],
    result:
      "Achieved 98.4% detection accuracy on standard intrusion benchmarks with sub-15ms classification latency.",
    liveUrl: "https://github.com/agent-47-cyber",
    githubUrl: "https://github.com/agent-47-cyber/network-analyzer",
    objectType: "neural",
    accentColor: "#ff9f43",
  },
  {
    id: "sih-ballot",
    name: "SIH ZERO-BALLOT",
    category: "DISTRIBUTED // CRYPTOGRAPHY",
    year: "2024",
    tagline: "DECENTRALIZED CRYPTOGRAPHIC VOTING ARCHITECTURE",
    description:
      "A tamper-proof, auditable electronic voting protocol designed for collegiate governance and collegiate hackathons.",
    problem:
      "Centralized electronic voting systems lack public verifiability without compromising voter ballot secrecy.",
    solution:
      "Implemented a zero-knowledge commitment scheme on an Ethereum testnet with blind cryptographic signatures and IPFS audit trails.",
    technology: ["Solidity", "TypeScript", "Ethers.js", "Next.js", "IPFS", "ZKP"],
    result:
      "National finalist prototype at Smart India Hackathon (SIH), guaranteeing end-to-end voter anonymity and instant ledger auditability.",
    liveUrl: "https://github.com/agent-47-cyber",
    githubUrl: "https://github.com/agent-47-cyber/sih-voting",
    objectType: "topology",
    accentColor: "#00e5ff",
  },
  {
    id: "orbit-engine",
    name: "ORBIT ENGINE",
    category: "CREATIVE // GRAPHICS & 3D",
    year: "2026",
    tagline: "HIGH-PERFORMANCE SPATIAL 3D WEB PLATFORM",
    description:
      "A cinematic, 60 FPS orbital observation station experience built without compromises in performance or architecture.",
    problem:
      "Most 3D web experiences suffer from bloated bundles, low frame rates, and excessive CPU garbage collection.",
    solution:
      "Architected with Next.js 15, React Compiler, zero-allocation useFrame loops, modular GSAP motion engines, and adaptive quality tiering.",
    technology: ["Next.js 15", "React 19", "Three.js", "R3F", "GSAP", "Tailwind CSS v4"],
    result:
      "Maintains locked 60 FPS across desktop devices with under 190 KB first-load JavaScript.",
    liveUrl: "https://github.com/agent-47-cyber/yatin_portfolio",
    githubUrl: "https://github.com/agent-47-cyber/yatin_portfolio",
    objectType: "architectural",
    accentColor: "#70a1ff",
  },
];
