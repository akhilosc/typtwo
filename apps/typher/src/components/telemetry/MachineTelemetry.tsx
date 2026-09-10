import React from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { SystemStatus } from './SystemStatus';
import { Cpu, Zap, HardDrive, Clock, Activity, Database, Layers } from 'lucide-react';

interface MachineTelemetryProps {
  className?: string;
  variant?: 'compact' | 'full' | 'hero';
}

export const MachineTelemetry: React.FC<MachineTelemetryProps> = ({
  className = '',
  variant = 'full',
}) => {
  const { telemetry, triggerInferenceBurst, coreState } = useTelemetry();

  if (variant === 'compact') {
    return (
      <div className={`machine-panel p-3 rounded-lg border border-machine-750 font-mono text-xs ${className}`}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-machine-500 uppercase">MODEL</span>
            <span className="text-machine-100 font-semibold">{telemetry.modelName.split(' ')[1]}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-machine-500 uppercase">TOK/S</span>
            <span className="text-cyan-400 font-bold">{telemetry.tokensPerSec}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-machine-500 uppercase">GPU</span>
            <span className="text-machine-200">{telemetry.gpuUtilization}%</span>
          </div>
          <SystemStatus showText={false} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`machine-panel p-5 rounded-xl border border-machine-700/60 corner-brackets font-mono ${
        coreState === 'inferring' ? 'machine-panel-glow' : ''
      } ${className}`}
    >
      {/* HUD Header */}
      <div className="flex items-center justify-between pb-4 border-b border-machine-800 text-xs">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="tracking-widest text-machine-300 font-semibold uppercase">
            TYPHER TELEMETRY HUD
          </span>
        </div>
        <SystemStatus />
      </div>

      {/* Grid of Telemetry Readouts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4 text-xs">
        {/* MODEL */}
        <div className="p-2.5 rounded bg-machine-900/90 border border-machine-800/80">
          <div className="flex items-center gap-1.5 text-machine-500 mb-1">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tech-label">MODEL</span>
          </div>
          <div className="text-sm font-semibold text-machine-100 truncate">
            {telemetry.modelName}
          </div>
          <div className="text-[10px] text-machine-500 mt-0.5">{telemetry.parameters} Params</div>
        </div>

        {/* TOKENS/S */}
        <div className="p-2.5 rounded bg-machine-900/90 border border-machine-800/80">
          <div className="flex items-center gap-1.5 text-machine-500 mb-1">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tech-label">THROUGHPUT</span>
          </div>
          <div className="text-sm font-bold text-cyan-300 text-glow-cyan">
            {telemetry.tokensPerSec} <span className="text-[10px] font-normal text-machine-400">tok/s</span>
          </div>
          <div className="text-[10px] text-machine-500 mt-0.5">TTFT: {telemetry.latencyMs}ms</div>
        </div>

        {/* GPU LOAD */}
        <div className="p-2.5 rounded bg-machine-900/90 border border-machine-800/80">
          <div className="flex items-center gap-1.5 text-machine-500 mb-1">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tech-label">GPU COMPUTE</span>
          </div>
          <div className="text-sm font-semibold text-machine-100 flex items-center justify-between">
            <span>{telemetry.gpuUtilization}%</span>
            <div className="w-12 bg-machine-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-cyan-400 h-full transition-all duration-300"
                style={{ width: `${telemetry.gpuUtilization}%` }}
              />
            </div>
          </div>
          <div className="text-[10px] text-machine-500 mt-0.5">Metal 3 / CUDA Active</div>
        </div>

        {/* VRAM ALLOCATION */}
        <div className="p-2.5 rounded bg-machine-900/90 border border-machine-800/80">
          <div className="flex items-center gap-1.5 text-machine-500 mb-1">
            <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tech-label">VRAM / UMA</span>
          </div>
          <div className="text-sm font-semibold text-machine-100">
            {telemetry.vramUsageGb.toFixed(1)} <span className="text-machine-400 text-xs">/ {telemetry.vramMaxGb.toFixed(0)} GB</span>
          </div>
          <div className="text-[10px] text-machine-500 mt-0.5">Zero-Copy MMap</div>
        </div>

        {/* CONTEXT WINDOW */}
        <div className="p-2.5 rounded bg-machine-900/90 border border-machine-800/80">
          <div className="flex items-center gap-1.5 text-machine-500 mb-1">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tech-label">CONTEXT</span>
          </div>
          <div className="text-sm font-semibold text-machine-100">
            {(telemetry.contextUsage / 1024).toFixed(0)}k <span className="text-machine-400 text-xs">/ {(telemetry.contextMax / 1024).toFixed(0)}k</span>
          </div>
          <div className="text-[10px] text-machine-500 mt-0.5">KV-Cache Paged</div>
        </div>

        {/* TOTAL TOKENS */}
        <div className="p-2.5 rounded bg-machine-900/90 border border-machine-800/80">
          <div className="flex items-center gap-1.5 text-machine-500 mb-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tech-label">TOTAL TOKENS</span>
          </div>
          <div className="text-sm font-semibold text-machine-200">
            {telemetry.totalTokensGenerated.toLocaleString()}
          </div>
          <div className="text-[10px] text-machine-500 mt-0.5">Local Session Gen</div>
        </div>
      </div>

      {/* Simulation / Action Trigger */}
      <div className="pt-3 border-t border-machine-800 flex items-center justify-between text-xs">
        <div className="text-[11px] text-machine-500">
          SOCKET: <span className="text-emerald-400">127.0.0.1:11434</span>
        </div>
        <button
          onClick={() => triggerInferenceBurst(3000, 240)}
          disabled={coreState !== 'idle'}
          className="px-3 py-1.5 rounded bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-700/50 hover:border-cyan-400 text-cyan-300 font-mono text-[11px] transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          <Zap className="w-3 h-3 text-cyan-400" />
          {coreState === 'inferring' ? 'PROCESSING INFERENCE...' : 'TRIGGER COMPUTE BURST'}
        </button>
      </div>
    </div>
  );
};
