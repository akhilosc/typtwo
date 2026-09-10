import React from 'react';
import { SystemArchitecture } from '../components/interactive/SystemArchitecture';
import { TerminalBlock } from '../components/interactive/TerminalBlock';
import { Cpu, Server, HardDrive, Layers, Workflow, Activity, ShieldCheck, ArrowDown } from 'lucide-react';

export const System: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
          <Cpu className="w-4 h-4" />
          <span>SYSTEM TOPOLOGY // ARCHITECTURAL BLUEPRINT</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
          INSIDE THE MACHINE.
        </h1>
        <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
          Typher is structured as an end-to-end deterministic computing stack. Explore how physical silicon connects directly to vector engines, paged KV-caches, and developer applications.
        </p>
      </div>

      {/* Interactive 7-Layer Architecture */}
      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs text-machine-400 border-b border-machine-800 pb-2">
          <span className="tech-label text-cyan-300">INTERACTIVE 7-LAYER SYSTEM MAP</span>
          <span>SELECT A LAYER TO INSPECT SUBMODULES</span>
        </div>
        <SystemArchitecture />
      </section>

      {/* Memory & Execution Lifecycle */}
      <section className="space-y-6 pt-6">
        <div className="border-b border-machine-800 pb-4">
          <span className="tech-label text-cyan-400">UNIFIED MEMORY ORCHESTRATION</span>
          <h2 className="text-2xl font-display font-bold text-machine-100 mt-1">
            HOW WEIGHTS STREAM INTO SILICON
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="machine-panel p-5 rounded-xl border border-machine-800 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <HardDrive className="w-4 h-4" />
              <span>01. ZERO-COPY MMAP</span>
            </div>
            <p className="text-xs font-sans text-machine-300 leading-relaxed">
              Model weight files on high-speed NVMe storage are mapped directly into virtual memory pages. Eliminates OS-level duplicate memory buffers and cold start stalls.
            </p>
            <div className="text-[10px] text-machine-500 pt-2 border-t border-machine-850">
              COLD LOAD: &lt;380ms
            </div>
          </div>

          <div className="machine-panel p-5 rounded-xl border border-machine-800 space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-bold">
              <Layers className="w-4 h-4" />
              <span>02. PAGED KV-CACHE</span>
            </div>
            <p className="text-xs font-sans text-machine-300 leading-relaxed">
              Key and Value attention tensors are split into virtual memory blocks (16 tokens/block). Eliminates memory fragmentation and prevents Out-Of-Memory exceptions during extended multi-turn dialogs.
            </p>
            <div className="text-[10px] text-machine-500 pt-2 border-t border-machine-850">
              MEMORY EFFICIENCY: 96.8%
            </div>
          </div>

          <div className="machine-panel p-5 rounded-xl border border-machine-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Activity className="w-4 h-4" />
              <span>03. FLASHINFER KERNELS</span>
            </div>
            <p className="text-xs font-sans text-machine-300 leading-relaxed">
              Native Metal 3 and CUDA 12 compute shaders saturate physical memory bandwidth (up to 800 GB/s on Apple Silicon / 1,008 GB/s on RTX 4090) for ultra-dense matrix multiplication.
            </p>
            <div className="text-[10px] text-machine-500 pt-2 border-t border-machine-850">
              BANDWIDTH: SATURATED
            </div>
          </div>
        </div>
      </section>

      {/* Low-Level Daemon Architecture */}
      <section className="space-y-4 pt-6">
        <div className="border-b border-machine-800 pb-2">
          <span className="tech-label text-cyan-400">DAEMON SERVICE SPECIFICATION</span>
          <h2 className="text-xl font-display font-bold text-machine-100 mt-1">
            TYPHERD PROCESS TOPOLOGY
          </h2>
        </div>
        <TerminalBlock
          title="DAEMON SYSTEMD & LAUNCHD RUNTIME"
          code={`# Inspect local daemon service metrics
$ typherd status --detailed

TYPHER RUNTIME DAEMON (PID: 81924)
─────────────────────────────────────────────────────────────
STATUS:           ACTIVE (SOVEREIGN)
UPTIME:           48h 12m 04s
SOCKET:           /var/run/typher.sock & 127.0.0.1:11434
HARDWARE ENGINE:  Apple Silicon Metal 3 (UMA 36GB)
LOADED MODELS:    typher-14b:latest (Q4_K_M) [ACTIVE]
KV-CACHE POOL:    16.0 GB ALLOCATED / 2.4 GB IN USE
CONCURRENCY:      4 ACTIVE WORKER THREADS
AIR-GAP INTEGRITY: 100% (ZERO OUTBOUND CONNECTIONS)`}
          language="bash"
        />
      </section>

    </div>
  );
};
