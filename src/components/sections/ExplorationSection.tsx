"use client";

import React, { useState } from "react";
import { GlassSurface } from "@/components/ui/GlassSurface";

export interface ExplorationNode {
  id: string;
  code: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  hypothesis: string;
  methodology: string;
  status: string;
  specs: { label: string; value: string }[];
  tags: string[];
}

const photo = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=80&auto=format&fit=max`;

const EXPLORATION_NODES: ExplorationNode[] = [
  {
    id: "exp-01",
    code: "EXP-881",
    src: photo("photo-1618005182384-a83a8bd57fbe"),
    alt: "Quantum tensor fluid topology with chromatic diffusion",
    title: "Quantum Tensor Waves",
    subtitle: "Acyclic Agent Topologies",
    hypothesis:
      "Autonomous agent swarms self-organize into acyclic topological order with deterministic cycle detection under 1.8ms.",
    methodology:
      "Formal Kahn verification combined with speculative eBPF branch prediction across distributed memory nodes.",
    status: "ACTIVE RESEARCH",
    specs: [
      { label: "Cycle Resolution", value: "< 1.8ms" },
      { label: "Graph Invariants", value: "100% Proved" },
      { label: "Worker Swarm", value: "256 Nodes" },
    ],
    tags: ["Rust", "eBPF", "DAG", "Formal Methods"],
  },
  {
    id: "exp-02",
    code: "EXP-904",
    src: photo("photo-1634017839464-5c339ebe3cb4"),
    alt: "Prismatic optical crystalline lattice refraction",
    title: "Zero-Overhead Memory Gossip",
    subtitle: "Ring Buffer Peer Sync",
    hypothesis:
      "Peer-to-peer state propagation without serialization overhead through memory-mapped ring buffers and zero-copy semantics.",
    methodology:
      "Direct ring indexing with cryptographic epoch signatures over UDP multicast and kernel bypass sockets.",
    status: "BENCHMARKING",
    specs: [
      { label: "Serialization Tax", value: "0.00 ns" },
      { label: "Sync Throughput", value: "1.2M msg/s" },
      { label: "Bandwidth Cut", value: "68% Delta" },
    ],
    tags: ["Ring Buffer", "Zero-Copy", "UDP Multicast"],
  },
  {
    id: "exp-03",
    code: "EXP-932",
    src: photo("photo-1635070041078-e363dbe005cb"),
    alt: "Neural synapse computational matrix with luminous nodes",
    title: "Procedural GPU Spatial Synthesis",
    subtitle: "Volumetric WebGPU Shaders",
    hypothesis:
      "Real-time synthesis of multi-dimensional volumetric topologies calculated directly inside browser compute stages.",
    methodology:
      "Compute shader raymarching paired with hierarchical sparse voxel octree compression and spatial temporal caching.",
    status: "PROTOTYPE VALIDATED",
    specs: [
      { label: "Compute Target", value: "120 FPS" },
      { label: "Octree Depth", value: "9 Levels" },
      { label: "Raymarch Step", value: "128 Samples" },
    ],
    tags: ["WebGPU", "WGSL", "SVO", "Raymarching"],
  },
  {
    id: "exp-04",
    code: "EXP-965",
    src: photo("photo-1620641788421-7a1c342ea42e"),
    alt: "Obsidian titanium topological curvature suspended in void",
    title: "Declarative Cluster Morphing",
    subtitle: "Micro-Virtual Enclaves",
    hypothesis:
      "Compiling high-level geometric structural constraints into self-healing, cryptographically isolated micro-virtual execution enclaves.",
    methodology:
      "Minimal Linux guest kernels managed through continuous reconciliation loops with sub-second boot guarantees.",
    status: "INTEGRATION TEST",
    specs: [
      { label: "Enclave Boot", value: "32ms Cold" },
      { label: "Memory Footprint", value: "14MB" },
      { label: "Drift Tolerance", value: "0% Strict" },
    ],
    tags: ["Firecracker", "Enclaves", "K8s Primitive"],
  },
  {
    id: "exp-05",
    code: "EXP-988",
    src: photo("photo-1550751827-4bd374c3f58b"),
    alt: "High-security hardware micro-enclave motherboard architecture",
    title: "Quantum CRDT Convergence",
    subtitle: "Conflict-Free Mesh Sync",
    hypothesis:
      "State-based conflict-free replicated data types converge monotonically under arbitrary network partitions without coordinator locks.",
    methodology:
      "Pure delta-state gossip with lattice join semilattices and cryptographically stamped vector clocks.",
    status: "LAUNCH CANDIDATE",
    specs: [
      { label: "Convergence Rate", value: "Sub-5ms" },
      { label: "State Overhead", value: "-62%" },
      { label: "Lock Contention", value: "Zero" },
    ],
    tags: ["CRDT", "Lattice", "Distributed", "C23"],
  },
  {
    id: "exp-06",
    code: "EXP-992",
    src: photo("photo-1614741118887-7a4ee193a5fa"),
    alt: "Monolithic dark cybernetic architecture with laser matrix lines",
    title: "Autonomous Agent Synthesizer",
    subtitle: "Contextual Reflex Loops",
    hypothesis:
      "Heterogeneous LLM pipelines achieve superhuman reliability through deterministic supervisor loops and recursive rollback trees.",
    methodology:
      "Hierarchical state machines with bounded entropy monitors and instant speculative branch re-evaluation.",
    status: "ALPHA PILOT",
    specs: [
      { label: "Reflex Loop", value: "24ms" },
      { label: "Entropy Bound", value: "< 0.04" },
      { label: "Hallucination Trap", value: "99.9%" },
    ],
    tags: ["AI Orchestration", "Supervisors", "Wasm"],
  },
  {
    id: "exp-07",
    code: "EXP-997",
    src: photo("photo-1509228468518-180dd4864904"),
    alt: "Photonic laser waveguide optical interconnect",
    title: "Obsidian Kernel Security",
    subtitle: "Hardware Memory Enclaves",
    hypothesis:
      "Zero-trust enclave isolation with hardware memory encryption and deterministic memory scrubbing upon context swap.",
    methodology:
      "Integration with AMD SEV-SNP and Intel TDX extensions via custom low-overhead micro-hypervisor bindings.",
    status: "PROTOTYPE VALIDATED",
    specs: [
      { label: "Context Swap", value: "1.1 μs" },
      { label: "Attestation", value: "Hardware" },
      { label: "Overhead", value: "< 2.1%" },
    ],
    tags: ["Hardware Security", "Confidential Compute"],
  },
  {
    id: "exp-08",
    code: "EXP-1004",
    src: photo("photo-1526374965328-7f61d4dc18c5"),
    alt: "High-density real-time kernel telemetry data stream",
    title: "Poise Telemetry Bus",
    subtitle: "Sub-Millisecond Flight Recorder",
    hypothesis:
      "Lossless telemetry flight recording of all microsecond system events with near-zero observer effect on production kernels.",
    methodology:
      "Ring-buffer eBPF probes writing compressed columnar event batches directly to non-volatile flash storage.",
    status: "ACTIVE RESEARCH",
    specs: [
      { label: "Probe Overhead", value: "< 0.4%" },
      { label: "Event Ingestion", value: "4.8M evt/s" },
      { label: "Compression", value: "11:1 Zstd" },
    ],
    tags: ["eBPF", "Telemetry", "Kernel Probes"],
  },
];

export function ExplorationSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const activeNode = EXPLORATION_NODES[activeIdx] || EXPLORATION_NODES[0];

  return (
    <section
      id="exploration"
      className="relative min-h-screen flex flex-col justify-center py-24 sm:py-28 overflow-hidden select-none bg-transparent text-white"
      aria-label="Section — Exploration"
    >
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col gap-10">
        {/* ── SIMPLE SECTION HEADER ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs tracking-widest text-brand-red uppercase font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-ping" />
                Exploration
              </span>
              <span className="h-px w-8 bg-brand-red/50" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Research & Spatial Synthesis
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.08] mb-3 text-white">
              Explore beyond the obvious.
            </h2>

            <p className="text-base sm:text-lg text-white/60 font-light leading-relaxed max-w-2xl">
              Traverse our active research nodes and prototypes. Select any node below to inspect its telemetry.
            </p>
          </div>

          <div className="font-mono text-xs text-white/50">
            <span>
              ACTIVE NODE // {String(activeIdx + 1).padStart(2, "0")} OF{" "}
              {String(EXPLORATION_NODES.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── 2D INTERACTIVE RESEARCH NODE GRID ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {EXPLORATION_NODES.map((node, index) => {
            const isSelected = index === activeIdx;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveIdx(index)}
                className="text-left cursor-pointer group focus-visible:outline-none"
                aria-pressed={isSelected}
                aria-label={`Select ${node.title}`}
              >
                <GlassSurface
                  borderRadius={12}
                  borderWidth={0.06}
                  blur={isSelected ? 14 : 8}
                  backgroundOpacity={isSelected ? 0.25 : 0.06}
                  brightness={isSelected ? 45 : 18}
                  className={`overflow-hidden transition-all duration-200 ${
                    isSelected
                      ? "border-brand-red/80 shadow-lg shadow-brand-red/15"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="w-full flex flex-col">
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-transparent">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={node.src}
                        alt={node.alt}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        loading="lazy"
                      />
                      <span
                        className={`absolute top-2 left-2 px-2 py-0.5 rounded font-mono text-[10px] font-semibold tracking-wider ${
                          isSelected
                            ? "bg-brand-red text-white"
                            : "bg-black/60 text-white/80"
                        }`}
                      >
                        {node.code}
                      </span>
                    </div>
                    <div className="p-3 flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-white truncate">
                        {node.title}
                      </span>
                      <span className="font-mono text-[10px] text-white/50 truncate">
                        {node.subtitle}
                      </span>
                    </div>
                  </div>
                </GlassSurface>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── LIVE ACTIVE RESEARCH DOSSIER (CLEAN & INTEGRATED DIRECTLY IN WEBSITE) ── */}
      <div className="relative z-10 mt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="border-t border-white/10 pt-8 flex flex-col lg:flex-row items-start justify-between gap-10">
          {/* Left: Active Exploration Node Info */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded bg-brand-red text-white font-bold tracking-wider">
                {activeNode.code}
              </span>
              <span className="text-white/60">
                NODE {String(activeIdx + 1).padStart(2, "0")} / {String(EXPLORATION_NODES.length).padStart(2, "0")}
              </span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-mono tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {activeNode.status}
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-medium tracking-tight text-white">
              {activeNode.title}
            </h3>
            <p className="font-mono text-xs text-brand-red uppercase tracking-wider -mt-1">
              {activeNode.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 text-sm">
              <div className="border-l-2 border-brand-red/60 pl-4">
                <span className="font-mono text-[11px] uppercase text-brand-red tracking-wider block mb-1 font-semibold">
                  CORE HYPOTHESIS
                </span>
                <p className="text-white/80 leading-relaxed font-light">
                  {activeNode.hypothesis}
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-4">
                <span className="font-mono text-[11px] uppercase text-white/50 tracking-wider block mb-1 font-semibold">
                  EXPERIMENTAL METHODOLOGY
                </span>
                <p className="text-white/60 leading-relaxed font-light">
                  {activeNode.methodology}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {activeNode.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/5 text-white/60 border border-white/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Telemetry Specs Column */}
          <div className="w-full lg:w-80 flex flex-col gap-3 shrink-0">
            <span className="font-mono text-xs uppercase tracking-wider text-white/50 block mb-1">
              LIVE TELEMETRY
            </span>
            {activeNode.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between py-2 border-b border-white/10 font-mono text-xs"
              >
                <span className="text-white/50 uppercase">{spec.label}</span>
                <span className="text-white font-semibold">{spec.value}</span>
              </div>
            ))}

            <a
              href="#products"
              className="mt-4 w-full py-2.5 px-4 rounded-lg font-mono text-xs tracking-wider uppercase text-center font-semibold text-white bg-brand-red hover:bg-brand-red/90 transition-all duration-200 shadow-md shadow-brand-red/30 cursor-pointer block"
            >
              Explore Products ›
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExplorationSection;
