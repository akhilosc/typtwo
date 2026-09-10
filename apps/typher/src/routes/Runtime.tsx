import React from 'react';
import { TerminalBlock } from '../components/interactive/TerminalBlock';
import { Terminal, Cpu, Server, HardDrive, Layers, Zap, ArrowDown, Activity, ShieldCheck, Check } from 'lucide-react';

export const Runtime: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
          <Terminal className="w-4 h-4" />
          <span>EXECUTION ENGINE // HARDWARE-TO-WEIGHT BUS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
          WHERE INTELLIGENCE RUNS.
        </h1>
        <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
          Typher compiles directly into machine code for Apple Silicon Metal 3 and NVIDIA CUDA, bypassing standard operating system layers for deterministic hardware performance.
        </p>
      </div>

      {/* Hardware to Model Animated Flow Diagram */}
      <section className="machine-panel p-8 rounded-xl border border-machine-750 corner-brackets space-y-6">
        <div className="text-xs text-machine-400 uppercase tracking-widest font-semibold border-b border-machine-800 pb-3 flex items-center justify-between">
          <span>HARDWARE-TO-MODEL COMPUTE PIPELINE</span>
          <span className="text-emerald-400">● DIRECT SILICON LINK ACTIVE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Stage 1: Physical Hardware */}
          <div className="p-6 rounded-lg bg-machine-900 border border-machine-750 space-y-3 relative group hover:border-cyan-500/60 transition-all">
            <div className="w-10 h-10 rounded bg-machine-950 border border-machine-800 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="font-display font-bold text-base text-machine-100">
              01 // PHYSICAL SILICON
            </div>
            <div className="text-[11px] text-cyan-400 font-bold">
              Apple M3 / NVIDIA RTX 4090 / AMD ROCm
            </div>
            <p className="text-xs font-sans text-machine-300 leading-relaxed">
              Unified LPDDR5X DRAM bus providing up to 800 GB/s bandwidth. Dedicated Neural Engine and Tensor Core ALUs.
            </p>
            <div className="pt-2 border-t border-machine-800 text-[10px] text-machine-500">
              DIRECT MEMORY BUS (ZERO-PCIE BOTTLENECK)
            </div>
          </div>

          {/* Stage 2: Typher Local Runtime */}
          <div className="p-6 rounded-lg bg-machine-850 border border-cyan-500/60 shadow-glow-cyan space-y-3 relative group">
            <div className="w-10 h-10 rounded bg-machine-950 border border-cyan-700 flex items-center justify-center text-cyan-300">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div className="font-display font-bold text-base text-machine-100">
              02 // TYPHER RUNTIME
            </div>
            <div className="text-[11px] text-cyan-300 font-bold">
              Paged KV-Cache / FlashInfer 2.0 / Speculative ALU
            </div>
            <p className="text-xs font-sans text-machine-200 leading-relaxed">
              Virtual memory address mapping (\`mmap\`), non-fragmented token paging, and quantized integer matrix calculation.
            </p>
            <div className="pt-2 border-t border-machine-700 text-[10px] text-cyan-400">
              LATENCY: &lt;18ms TTFT // 100% OFFLINE
            </div>
          </div>

          {/* Stage 3: Neural Model Weights */}
          <div className="p-6 rounded-lg bg-machine-900 border border-machine-750 space-y-3 relative group hover:border-cyan-500/60 transition-all">
            <div className="w-10 h-10 rounded bg-machine-950 border border-machine-800 flex items-center justify-center text-sky-400">
              <Layers className="w-5 h-5" />
            </div>
            <div className="font-display font-bold text-base text-machine-100">
              03 // NEURAL WEIGHTS
            </div>
            <div className="text-[11px] text-sky-400 font-bold">
              TYPHER 7B / 14B / 32B (Q4_K_M & FP16)
            </div>
            <p className="text-xs font-sans text-machine-300 leading-relaxed">
              Pre-quantized GGUF and safetensors weights pinned directly in unified address space for multi-turn conversational reasoning.
            </p>
            <div className="pt-2 border-t border-machine-800 text-[10px] text-machine-500">
              128K EXTENDED CONTEXT COMPATIBLE
            </div>
          </div>

        </div>
      </section>

      {/* Deep Dives into Core Runtime Subsystems */}
      <section className="space-y-6">
        <div className="border-b border-machine-800 pb-4">
          <span className="tech-label text-cyan-400">CORE RUNTIME SUBSYSTEMS</span>
          <h2 className="text-2xl font-display font-bold text-machine-100 mt-1">
            HOW TYPHER ACHIEVES RECORD EFFICIENCY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="machine-panel p-6 rounded-xl border border-machine-800 space-y-3">
            <h3 className="font-display font-bold text-base text-cyan-300">
              01. Dynamic Tensor MMapping
            </h3>
            <p className="text-xs font-sans text-machine-300 leading-relaxed">
              Instead of reading 10GB–30GB of weights into RAM buffer by buffer at boot, Typher issues memory-map system calls. The OS maps file pages directly into physical memory upon demand, dropping cold-start latency from 20 seconds to sub-400 milliseconds.
            </p>
          </div>

          <div className="machine-panel p-6 rounded-xl border border-machine-800 space-y-3">
            <h3 className="font-display font-bold text-base text-cyan-300">
              02. Speculative Multi-Draft Acceleration
            </h3>
            <p className="text-xs font-sans text-machine-300 leading-relaxed">
              Typher features an embedded micro-speculation head that projects draft tokens 4–8 steps in advance. The primary model verifies all candidates in a single parallel GPU forward pass, doubling generation speed without losing a single bit of precision.
            </p>
          </div>

          <div className="machine-panel p-6 rounded-xl border border-machine-800 space-y-3">
            <h3 className="font-display font-bold text-base text-cyan-300">
              03. Paged KV Attention Block Allocator
            </h3>
            <p className="text-xs font-sans text-machine-300 leading-relaxed">
              Inspired by OS virtual memory paging, Typher divides attention Key-Value memory into non-contiguous 16-token memory blocks. This virtually eliminates memory fragmentation, allowing 3.5x more concurrent user threads in private servers.
            </p>
          </div>

          <div className="machine-panel p-6 rounded-xl border border-machine-800 space-y-3">
            <h3 className="font-display font-bold text-base text-cyan-300">
              04. Grammar-Guided Constrained Sampling
            </h3>
            <p className="text-xs font-sans text-machine-300 leading-relaxed">
              When tool-calling or generating structured JSON schemas, Typher prunes invalid vocabulary logits in real time before softmax sampling. Guaranteed 100% valid JSON parse rate on every single generation.
            </p>
          </div>
        </div>
      </section>

      {/* Runtime Config Example */}
      <section className="space-y-4">
        <div className="border-b border-machine-800 pb-2">
          <span className="tech-label text-cyan-400">DAEMON CONFIGURATION SPECIFICATION</span>
          <h2 className="text-xl font-display font-bold text-machine-100 mt-1">
            TYPHER.TOML HARDWARE PROFILE
          </h2>
        </div>
        <TerminalBlock
          title="/etc/typher/config.toml"
          code={`[runtime]
engine = "metal3"             # "metal3" | "cuda" | "rocm" | "cpu"
threads = 12                  # CPU worker threads
gpu_layers = 99               # 99 = 100% GPU offloading
flash_infer = true            # FlashInfer 2.0 kernel acceleration
paged_kv_cache = true         # Non-contiguous virtual memory block paging

[memory]
mmap_weights = true           # Direct virtual memory file mapping
kv_cache_budget_gb = 16.0     # Max DRAM reserved for attention context
pinned_memory = true          # Lock pages in physical DRAM (no swap paging)

[network]
listen = "127.0.0.1:11434"    # Local UNIX / HTTP socket only
airgap_mode = true            # Disable outbound network sockets entirely`}
          language="toml"
        />
      </section>

    </div>
  );
};
