import React from 'react';
import { Activity, CheckCircle2, ShieldCheck, Server, Zap, Database, Terminal } from 'lucide-react';

export const Status: React.FC = () => {
  const systems = [
    { name: 'REST & gRPC API (Port 11434)', status: 'OPERATIONAL', uptime: '99.99%', latency: '0.4ms' },
    { name: 'Metal 3 / CUDA Execution Runtime', status: 'OPERATIONAL', uptime: '100.00%', latency: '<18ms TTFT' },
    { name: 'Local Model Registry & Tensor MMapper', status: 'OPERATIONAL', uptime: '100.00%', latency: '380ms Cold' },
    { name: 'Embedded HNSW Vector Store', status: 'OPERATIONAL', uptime: '100.00%', latency: '0.8ms Query' },
    { name: 'Continuous Paged KV-Cache Allocator', status: 'OPERATIONAL', uptime: '100.00%', latency: 'Zero Fragmentation' },
    { name: 'Interactive Web Playground & WebSockets', status: 'OPERATIONAL', uptime: '99.98%', latency: '12ms IPC' },
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
          <Activity className="w-4 h-4" />
          <span>TELEMETRY FEED // RUNTIME SUBSYSTEM HEALTH</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
          SYSTEM STATUS.
        </h1>
        <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
          Real-time operational health metrics for local daemon services, vector indexers, and hardware acceleration pipelines.
        </p>
      </div>

      {/* Global Status Banner */}
      <div className="machine-panel p-6 rounded-xl border border-emerald-500/50 bg-emerald-950/20 flex items-center justify-between shadow-glow-green">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <div>
            <div className="font-display font-bold text-base text-machine-100">
              ALL TYPHER ENGINE SUBSYSTEMS OPERATIONAL
            </div>
            <div className="text-[11px] text-emerald-400 font-mono">
              ZERO ACTIVE FAULTS DETECTED ON LOCAL BUS
            </div>
          </div>
        </div>
        <span className="text-xs text-machine-400 hidden sm:inline">UPDATED: REAL-TIME</span>
      </div>

      {/* Subsystem List */}
      <div className="machine-panel rounded-xl border border-machine-800 divide-y divide-machine-850 overflow-hidden">
        {systems.map((s, idx) => (
          <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-machine-900/50 transition-colors">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-machine-100 text-xs sm:text-sm">{s.name}</span>
            </div>

            <div className="flex items-center gap-6 text-[11px] text-machine-400">
              <span>LATENCY: <strong className="text-cyan-400">{s.latency}</strong></span>
              <span>UPTIME: <strong className="text-machine-200">{s.uptime}</strong></span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 font-bold">
                {s.status}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
