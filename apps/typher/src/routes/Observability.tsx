import React from 'react';
import { SectionLabel } from '../components/ui/SectionLabel';
import { MachineStatus } from '../components/telemetry/MachineStatus';
import { TerminalBlock } from '../components/interactive/TerminalBlock';
import { Activity, Cpu, Zap, HardDrive, Clock, Layers, Terminal, AlertCircle } from 'lucide-react';

export const Observability: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6">
        <SectionLabel label="OBSERVABILITY // REAL-TIME RUNTIME TELEMETRY" />
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
          SEE THE MACHINE THINK.
        </h1>
        <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
          Embedded microsecond telemetry endpoints. Monitor GPU register saturation, paged KV-cache allocations, token throughput, and tool execution logs.
        </p>
      </div>

      {/* Real-time Telemetry Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 2x2 Telemetry Grid */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Metric 1: Request Rate & Concurrency */}
            <div className="machine-panel p-5 rounded-xl border border-machine-750 space-y-2">
              <div className="flex items-center justify-between text-machine-500">
                <span className="tech-label">INFERENCE REQUESTS / MIN</span>
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-machine-100">142 <span className="text-xs text-machine-500 font-normal">req/m</span></div>
              <div className="text-[10px] text-emerald-400">● 100% SUCCESS RATE (0 ERRORS)</div>
            </div>

            {/* Metric 2: Tokens / Sec */}
            <div className="machine-panel p-5 rounded-xl border border-machine-750 space-y-2">
              <div className="flex items-center justify-between text-machine-500">
                <span className="tech-label">TOKEN THROUGHPUT (PEAK)</span>
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-cyan-300 text-glow-cyan">112.4 <span className="text-xs text-machine-500 font-normal">tok/s</span></div>
              <div className="text-[10px] text-machine-400">MODEL: TYPHER-7B (Q4_K_M)</div>
            </div>

            {/* Metric 3: GPU Utilization */}
            <div className="machine-panel p-5 rounded-xl border border-machine-750 space-y-2">
              <div className="flex items-center justify-between text-machine-500">
                <span className="tech-label">GPU COMPUTE SATURATION</span>
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-machine-100">67%</div>
              <div className="w-full bg-machine-900 h-1.5 rounded mt-1 overflow-hidden">
                <div className="bg-cyan-400 h-full w-[67%]" />
              </div>
            </div>

            {/* Metric 4: Paged KV-Cache */}
            <div className="machine-panel p-5 rounded-xl border border-machine-750 space-y-2">
              <div className="flex items-center justify-between text-machine-500">
                <span className="tech-label">PAGED KV-CACHE DRAM</span>
                <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-machine-100">2.4 / 16.0 <span className="text-xs text-machine-500 font-normal">GB</span></div>
              <div className="text-[10px] text-cyan-400">FRAGMENTATION: 0.02%</div>
            </div>

          </div>

          {/* Live Output Log Stream */}
          <div className="machine-panel p-5 rounded-xl border border-machine-750 space-y-3">
            <div className="flex items-center justify-between border-b border-machine-800 pb-2">
              <span className="tech-label text-cyan-400">REAL-TIME DAEMON LOG STREAM</span>
              <span className="text-[10px] text-emerald-400">● SSE STREAM CONNECTED</span>
            </div>
            <div className="space-y-1.5 font-mono text-[11px] text-machine-400 bg-machine-950 p-3 rounded border border-machine-850">
              <div className="text-machine-500">[00:00:14.920] <span className="text-cyan-400">POST /v1/chat/completions</span> - 200 OK (TTFT: 18.2ms, Tok/s: 64.2)</div>
              <div className="text-machine-500">[00:00:15.110] <span className="text-emerald-400">KV-CACHE:</span> Allocated 14 physical blocks (224 tokens)</div>
              <div className="text-machine-500">[00:00:15.842] <span className="text-sky-400">TOOL EXECUTION:</span> execute_ast_linter(path="./src/runtime") -&gt; SUCCESS</div>
              <div className="text-machine-500">[00:00:16.420] <span className="text-machine-300">STREAM COMPLETE:</span> Total 342 tokens generated</div>
            </div>
          </div>
        </div>

        {/* Right Side Status Panel */}
        <div className="lg:col-span-4 space-y-6">
          <MachineStatus />
        </div>

      </div>

      {/* Observability API */}
      <section className="space-y-4">
        <SectionLabel label="PROMETHEUS & METRICS EXPORTER" />
        <TerminalBlock
          title="METRICS STREAM OVER HTTP"
          code={`# Query real-time machine telemetry endpoint
$ curl http://127.0.0.1:11434/v1/telemetry

{
  "system_status": "ONLINE",
  "loaded_model": "typher-14b:latest",
  "engine": "metal3_unified",
  "tokens_per_sec": 64.2,
  "first_token_latency_ms": 18.2,
  "gpu_utilization_pct": 67.0,
  "vram_allocated_mb": 8980,
  "kv_cache_allocated_mb": 2400,
  "active_sessions": 3
}`}
          language="json"
        />
      </section>

    </div>
  );
};
