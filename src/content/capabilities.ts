export interface Capability {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  details: string;
  technologies: string[];
  focus: string;
}

export const CAPABILITIES: Capability[] = [
  {
    id: "software-engineering",
    number: "01",
    title: "Software Engineering",
    shortDescription:
      "High-concurrency systems, distributed primitives, and resilient micro-architectures built for deterministic scale.",
    details:
      "We design backends and distributed protocols that withstand rigorous real-world workloads. From custom consensus pipelines to high-throughput data processors, our code is authored with strict testing, memory safety, and performance constraints.",
    technologies: ["Rust", "Go", "TypeScript", "Distributed Systems", "gRPC"],
    focus: "Low latency, high throughput, zero downtime",
  },
  {
    id: "ai-applications",
    number: "02",
    title: "AI-Powered Applications",
    shortDescription:
      "Context-aware agentic systems, deterministic workflow orchestration, and generative interface intelligence.",
    details:
      "Beyond basic API calls, we engineer intelligent architectures where language models and neural models interact predictably with external tools, structured databases, and formal state verification frameworks.",
    technologies: ["Autonomous Agents", "Vector Embeddings", "RAG Pipelines", "Local LLMs"],
    focus: "Reliable cognition, deterministic guardrails",
  },
  {
    id: "developer-tools",
    number: "03",
    title: "Developer Tools",
    shortDescription:
      "Command-line compilers, telemetry analyzers, and declarative automation tools that elevate engineering velocity.",
    details:
      "We build the tools we wish existed: intuitive CLI utilities, visual debugging inspectors, and automated verification suites that eliminate tedious toil and surface architectural insights.",
    technologies: ["CLI Architectures", "Language Servers", "Build Systems", "Tracing"],
    focus: "Developer ergonomics, instantaneous feedback",
  },
  {
    id: "product-design",
    number: "04",
    title: "Digital Product Design",
    shortDescription:
      "Architectural design systems, precision typography, and intuitive interfaces with purposeful motion.",
    details:
      "Our design philosophy rejects bloated decorative trends in favor of structural clarity, visual poise, and deep ergonomics. We craft user experiences that feel fast, responsive, and unmistakably engineered.",
    technologies: ["Design Tokens", "Interaction Modeling", "Typography Systems", "Accessibility"],
    focus: "Clarity, spatial rhythm, timeless elegance",
  },
  {
    id: "technical-experimentation",
    number: "05",
    title: "Technical Experimentation",
    shortDescription:
      "Algorithmic research, real-time spatial computing, and mathematical simulation prototypes.",
    details:
      "Innovation requires dedicated playgrounds. We allocate structured cycles to explore nascent technologies—from WebGPU rendering shaders and mathematical cellular automata to decentralized cryptographic protocols.",
    technologies: ["WebGPU", "Mathematical Physics", "Procedural Geometry", "WASM"],
    focus: "Frontier exploration, proof-of-concept synthesis",
  },
];
