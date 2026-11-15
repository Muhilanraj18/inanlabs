import { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  {
    id: "aura-flow",
    name: "Aura Flow",
    slug: "aura-flow",
    tagline: "Context-aware adaptive workflow orchestration layer",
    shortDescription:
      "A deterministic execution engine designed to coordinate heterogeneous agentic workflows, resolve conflicting task states, and optimize sub-second latency.",
    fullDescription:
      "Aura Flow bridges the gap between chaotic non-deterministic AI outputs and resilient production backends. By enforcing formal acyclic directed graph constraints, predictive speculative execution, and strict state boundaries, Aura Flow enables software teams to build mission-critical autonomous agents that operate with unwavering stability.",
    category: "AI Applications",
    status: "Beta",
    version: "v0.9.4",
    features: [
      "Dynamic DAG pipeline compilation with topological error recovery",
      "Sub-millisecond state gossip across distributed agent worker pools",
      "Pluggable verification validators with deterministic rollback guarantees",
      "Real-time visual telemetry and execution flow inspection",
    ],
    metrics: [
      { label: "State Latency", value: "< 1.4ms" },
      { label: "DAG Throughput", value: "85K ops/sec" },
      { label: "Recovery Rate", value: "99.998%" },
    ],
    architectureOverview:
      "Engineered on a multi-threaded Rust kernel with zero-copy shared memory queues, wrapped in a TypeScript and Python SDK for rapid deployment across edge runtimes.",
    techStack: ["Rust", "TypeScript", "WebAssembly", "gRPC", "eBPF"],
    links: {
      demo: "#",
      docs: "/products/aura-flow",
    },
    accentColor: "#FF0000",
  },
  {
    id: "kubematrix",
    name: "KubeMatrix",
    slug: "kubematrix",
    tagline: "Declarative infrastructure synthesis and state topology engine",
    shortDescription:
      "Translates high-level structural application blueprints into self-configuring, ephemeral, and cryptographic edge compute topologies.",
    fullDescription:
      "Modern cloud infrastructure suffers from sprawling configuration drift and brittle orchestration. KubeMatrix replaces thousands of lines of boilerplate manifests with declarative structural geometry. Clusters continuously verify their runtime invariants, healing architectural degradation before it impacts production uptime.",
    category: "Developer Tools",
    status: "In Development",
    version: "Active Alpha",
    features: [
      "Zero-drift continuous structural reconciliation loop",
      "Cryptographically isolated micro-virtual execution enclaves",
      "Automated cost & resource topology optimizer",
      "Declarative multi-cloud migration with one command",
    ],
    metrics: [
      { label: "Reconciliation", value: "450ms cycle" },
      { label: "Footprint", value: "14MB binary" },
      { label: "Drift Tolerance", value: "0% absolute" },
    ],
    architectureOverview:
      "Built upon lightweight hypervisor primitives with integrated Raft consensus and automated mutual TLS micro-segmentation across arbitrary networks.",
    techStack: ["Go", "Firecracker", "Raft", "WireGuard", "OpenTelemetry"],
    links: {
      docs: "/products/kubematrix",
    },
    accentColor: "#FF0000",
  },
  {
    id: "synapse-studio",
    name: "Synapse Studio",
    slug: "synapse-studio",
    tagline: "Spatial design and real-time algorithmic simulation environment",
    shortDescription:
      "An experimental GPU-driven workbench for exploring procedural geometry, real-time spatial physics, and mathematical architectural forms.",
    fullDescription:
      "Synapse Studio serves as the internal testing ground where INAN LABS investigates complex geometrical computing. Designed for creative developers, computational architects, and simulation engineers, Synapse exposes low-level GPU pipelines through a modern visual node interface.",
    category: "Spatial & Simulation",
    status: "Experiment",
    version: "Lab 0.4",
    features: [
      "Node-based procedural geometry generator with real-time shader compilation",
      "WebGPU compute shader acceleration for millions of particle interactions",
      "Deterministic timeline playback with frame-perfect vector recording",
      "Direct export to production Three.js, WGSL, and USDZ formats",
    ],
    metrics: [
      { label: "FPS Target", value: "120 FPS native" },
      { label: "Compute Engine", value: "WebGPU / WGSL" },
      { label: "Node Latency", value: "0-alloc frame loop" },
    ],
    architectureOverview:
      "Leverages hardware-accelerated compute shaders, custom GLSL/WGSL transpilers, and memory-mapped vertex caches for instantaneous visual computation in browser environments.",
    techStack: ["WebGPU", "WGSL", "Three.js", "C++ WASM", "GLSL"],
    links: {
      demo: "#",
      docs: "/products/synapse-studio",
    },
    accentColor: "#FF0000",
  },
  {
    id: "vortex-core",
    name: "Vortex Core",
    slug: "vortex-core",
    tagline: "Ultra-low latency state synchronization primitive",
    shortDescription:
      "A high-throughput conflict-free replicated data engine engineered for collaborative software, edge databases, and peer-to-peer data synchronization.",
    fullDescription:
      "Engineered for systems where milliseconds determine success, Vortex Core provides state synchronization across decentralized edge nodes. Utilizing state-of-the-art state-based CRDT algorithms, Vortex Core guarantees eventual consistency across unreliable networks without central coordinating locks.",
    category: "Software Systems",
    status: "Launched",
    version: "v1.2.0",
    features: [
      "Conflict-free replicated data types (CRDTs) optimized for zero-overhead writes",
      "Peer-to-peer encrypted delta gossip with automatic NAT traversal",
      "Compact memory footprint suitable for embedded and browser runtimes",
      "Formal mathematical verification of all state convergence invariants",
    ],
    metrics: [
      { label: "Sync Latency", value: "Sub-5ms edge" },
      { label: "State Size", value: "60% delta reduction" },
      { label: "Verified Invariants", value: "100% formal proof" },
    ],
    architectureOverview:
      "Implemented in pure C and compiled to native binaries and WebAssembly, Vortex Core operates without runtime garbage collection pauses.",
    techStack: ["C23", "WebAssembly", "ZeroMQ", "Sodium Cryptography"],
    links: {
      docs: "/products/vortex-core",
      github: "https://github.com/inan-labs",
    },
    accentColor: "#FF0000",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
