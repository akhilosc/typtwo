import React, { useState } from 'react';
import { ModelSpec } from '../../types';
import { Layers, HardDrive, Cpu, Zap, Copy, Check, Play, CheckCircle2 } from 'lucide-react';

interface ModelCardProps {
  model: ModelSpec;
  onLaunchPlayground?: (modelId: string) => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model, onLaunchPlayground }) => {
  const [selectedQuant, setSelectedQuant] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(model.pullCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeQuant = model.quantizations[selectedQuant];

  return (
    <div className="machine-panel p-6 rounded-xl border border-machine-700/80 corner-brackets font-mono flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300">
      <div className="space-y-4">
        {/* Model Header */}
        <div className="flex items-start justify-between border-b border-machine-800 pb-3">
          <div>
            <div className="text-[10px] text-machine-500 tracking-widest uppercase">
              TRANSFORMER ARCHITECTURE
            </div>
            <h3 className="text-xl font-display font-bold text-machine-100 tracking-wider mt-0.5">
              {model.name}
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs font-bold">
            {model.parameters}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs font-sans text-machine-300 leading-relaxed">
          {model.description}
        </p>

        {/* Quick Specs Matrix */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded bg-machine-900 border border-machine-800">
            <div className="flex items-center gap-1.5 text-machine-500 mb-1">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span className="tech-label">CONTEXT</span>
            </div>
            <div className="text-sm font-semibold text-machine-100">{model.contextLength}</div>
          </div>

          <div className="p-2.5 rounded bg-machine-900 border border-machine-800">
            <div className="flex items-center gap-1.5 text-machine-500 mb-1">
              <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
              <span className="tech-label">MIN VRAM</span>
            </div>
            <div className="text-sm font-semibold text-machine-100">{model.minVram}</div>
          </div>
        </div>

        {/* Quantization Selector Matrix */}
        <div className="pt-2">
          <div className="text-[10px] text-machine-500 uppercase tracking-widest font-semibold mb-2">
            QUANTIZATION MATRIX // DISK & SPEED:
          </div>
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {model.quantizations.map((q, idx) => (
              <button
                key={q.format}
                onClick={() => setSelectedQuant(idx)}
                className={`py-1.5 px-2 rounded border text-[11px] font-mono transition-all text-center ${
                  selectedQuant === idx
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold shadow-sm'
                    : 'bg-machine-900/60 border-machine-800 text-machine-400 hover:text-machine-200'
                }`}
              >
                {q.format}
              </button>
            ))}
          </div>

          {/* Active Quantization Stats Readout */}
          <div className="p-3 rounded bg-machine-950 border border-machine-800 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-machine-500">FILE SIZE:</span>
              <span className="text-machine-200 font-semibold">{activeQuant.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-machine-500">RUNTIME RAM:</span>
              <span className="text-cyan-300 font-semibold">{activeQuant.ramReq}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-machine-500">SPEED ESTIMATE:</span>
              <span className="text-emerald-400 font-bold">{activeQuant.speedRating}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-machine-500">ACCURACY RETENTION:</span>
              <span className="text-machine-300">{activeQuant.accuracyRating}</span>
            </div>
          </div>
        </div>

        {/* Key Capabilities */}
        <div className="pt-2">
          <div className="text-[10px] text-machine-500 uppercase tracking-widest font-semibold mb-2">
            CORE CAPABILITIES:
          </div>
          <ul className="space-y-1.5 text-xs text-machine-300 font-sans">
            {model.capabilities.map((cap, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Actions */}
      <div className="mt-6 pt-4 border-t border-machine-800 space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 px-3 py-2 rounded bg-machine-950 border border-machine-800 text-[11px] text-cyan-300 font-mono truncate select-all">
            {model.pullCommand}
          </div>
          <button
            onClick={handleCopyCommand}
            className="p-2 rounded bg-machine-850 hover:bg-machine-750 border border-machine-700 text-machine-300 hover:text-cyan-300 transition-colors"
            title="Copy pull command"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {onLaunchPlayground && (
          <button
            onClick={() => onLaunchPlayground(model.id)}
            className="w-full py-2.5 rounded bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-600/60 hover:border-cyan-400 text-cyan-300 font-mono text-xs tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
            OPEN IN PLAYGROUND CONSOLE
          </button>
        )}
      </div>
    </div>
  );
};
