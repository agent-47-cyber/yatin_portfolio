import type { Project } from "@/types";

export const PROJECTS_DATA: Project[] = [
  {
    id: "devscope",
    name: "DEVSCOPE",
    category: "AI / FULL STACK",
    year: "2026",
    tagline: "Autonomous Codebase Intelligence Engine",
    description:
      "A spatial developer intelligence platform analyzing multi-repository ASTs and automating architectural migrations in real time.",
    problem:
      "Modern monolithic architectures introduce severe cognitive load and silent dependency drift across distributed engineering teams.",
    solution:
      "Constructed a high-throughput computational graph engine indexing source files and generating deterministic AST transformations.",
    technology: ["TypeScript", "Next.js", "Three.js", "WebAssembly", "Rust", "Tailwind CSS"],
    result:
      "Reduced code comprehension overhead by 68% and automated over 14,000 legacy module migrations across 25 production codebases.",
    liveUrl: "https://example.com/devscope",
    githubUrl: "https://github.com/example/devscope",
    objectType: "computational",
    accentColor: "#00e5ff",
  },
  {
    id: "synapse-neural",
    name: "SYNAPSE AI",
    category: "DEEP LEARNING / GRAPH VIZ",
    year: "2025",
    tagline: "High-Dimensional Latent Space Visualizer",
    description:
      "Interactive 3D neural projection visualizing tensor activations and latent manifold geometries at 60 FPS.",
    problem:
      "Black-box transformer models obfuscate intermediate reasoning tokens, making interpretability research slow and fragmented.",
    solution:
      "Built a WebGL tensor projection pipeline utilizing UMAP dimensionality reduction and GPU compute shaders for instantaneous model introspection.",
    technology: ["Python", "PyTorch", "WebGL", "React Three Fiber", "GLSL", "FastAPI"],
    result:
      "Accelerated attention-head analysis cycles from hours to seconds with zero CPU pipeline stalls.",
    liveUrl: "https://example.com/synapse",
    githubUrl: "https://github.com/example/synapse",
    objectType: "neural",
    accentColor: "#ff6b2b",
  },
  {
    id: "sentinel-mesh",
    name: "SENTINEL MESH",
    category: "CYBERSECURITY / TOPOLOGY",
    year: "2025",
    tagline: "Zero-Trust Spatial Telemetry Grid",
    description:
      "Real-time packet inspection and attack-surface visualization engine mapping global distributed microservice traffic.",
    problem:
      "High-volume security telemetry dashboards overwhelm operators with tabular noise during active penetration incidents.",
    solution:
      "Designed a real-time 3D node topology clustering anomalies via volumetric force-directed graphs and heuristic threat scoring.",
    technology: ["Go", "Kafka", "Three.js", "WebSockets", "Docker", "eBPF"],
    result:
      "Sub-second incident triage latency and automated containment execution across 1,200+ Kubernetes pods.",
    liveUrl: "https://example.com/sentinel",
    githubUrl: "https://github.com/example/sentinel",
    objectType: "topology",
    accentColor: "#00e5ff",
  },
  {
    id: "strata-cloud",
    name: "STRATA CLOUD",
    category: "DISTRIBUTED SYSTEMS / ARCHITECTURE",
    year: "2024",
    tagline: "Edge Compute Orchestration Fabric",
    description:
      "Decentralized serverless compute scheduler deploying micro-kernels to nearest edge nodes with microsecond cold starts.",
    problem:
      "Traditional centralized cloud runtimes suffer from geographic egress latency and rigid container instantiation penalties.",
    solution:
      "Engineered an autonomous routing protocol utilizing geo-distributed consensus and lightweight WASM isolation sandboxes.",
    technology: ["Rust", "WASM", "Cloudflare Workers", "TypeScript", "gRPC"],
    result:
      "Achieved 4.2ms global p99 response times and zero cold-start latency across 280+ worldwide edge locations.",
    liveUrl: "https://example.com/strata",
    githubUrl: "https://github.com/example/strata",
    objectType: "architectural",
    accentColor: "#f0ece4",
  },
];
