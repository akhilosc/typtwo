import React, { useState } from 'react';
import { TYPHER_MODELS } from '../data/modelsData';
import { ModelCard } from '../components/interactive/ModelCard';
import { TerminalBlock } from '../components/interactive/TerminalBlock';
import { Layers, HardDrive, Cpu, Zap, Calculator, CheckCircle2, ChevronRight } from 'lucide-react';

interface ModelsProps {
  navigate: (route: string) => void;
}

export const Models: React.FC<ModelsProps> = ({ navigate }) => {
  const [activeModelId, setActiveModelId] = useState('typher-14b');
  const [calcModel, setCalcModel] = useState('14b');
  const [calcContext, setCalcContext] = useState(32768);
  const [calcQuant, setCalcQuant] = useState('Q4_K_M');

  // Interactive VRAM requirement calculator
  const calculateVram = () => {
    let baseWeightGb = calcModel === '7b' ? 4.37 : calcModel === '14b' ? 8.98 : 19.4;
    if (calcQuant === 'Q5_K_M') baseWeightGb *= 1.18;
    if (calcQuant === 'Q8_0') baseWeightGb *= 1.76;
    if (calcQuant === 'FP16') baseWeightGb *= 3.3;

    // KV cache formula: 2 * num_layers * hidden_size * num_tokens * 2 bytes (FP16)
    const kvCachePer1kTokens = calcModel === '7b' ? 0.08 : calcModel === '14b' ? 0.14 : 0.28;
    const kvCacheGb = (calcContext / 1024) * kvCachePer1kTokens;

    const totalVram = baseWeightGb + kvCacheGb + 0.6; // 600MB activation buffer
    return {
      weightGb: baseWeightGb.toFixed(1),
      kvCacheGb: kvCacheGb.toFixed(1),
      totalGb: totalVram.toFixed(1),
    };
  };

  const vramResult = calculateVram();

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
          <Layers className="w-4 h-4" />
          <span>MODEL REGISTRY // LOCAL WEIGHT MATRIX</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
          MODELS FOR YOUR MACHINE.
        </h1>
        <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
          Sovereign transformer architectures tuned for high-throughput zero-latency execution on local silicon. Choose the optimal parameter weight for your hardware tier.
        </p>
      </div>

      {/* Model Cards Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between text-xs text-machine-400 border-b border-machine-800 pb-2">
          <span className="tech-label text-cyan-300">AVAILABLE PARAMETER TIERS (7B, 14B, 32B)</span>
          <span>FORMAT: GGUF & SAFETENSORS</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TYPHER_MODELS.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              onLaunchPlayground={() => navigate('/playground')}
            />
          ))}
        </div>
      </section>

      {/* Interactive VRAM & Hardware Sizing Calculator */}
      <section className="machine-panel p-6 sm:p-8 rounded-xl border border-machine-700 corner-brackets space-y-6">
        <div className="border-b border-machine-800 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-lg font-display font-bold text-machine-100">
                HARDWARE SIZING & VRAM CALCULATOR
              </h2>
              <div className="text-[10px] text-machine-500 uppercase">
                COMPUTE EXACT UNIFIED MEMORY ALLOCATION FOR YOUR DEPLOYMENT
              </div>
            </div>
          </div>
          <span className="text-xs text-emerald-400 font-bold">● REAL-TIME ESTIMATOR</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-4">
            {/* Model Tier Selector */}
            <div>
              <label className="tech-label block mb-1.5">MODEL PARAMETER WEIGHT</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '7b', label: 'TYPHER 7B', sub: '7.24B Params' },
                  { id: '14b', label: 'TYPHER 14B', sub: '14.77B Params' },
                  { id: '32b', label: 'TYPHER 32B', sub: '32.50B Params' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setCalcModel(m.id)}
                    className={`p-2.5 rounded border text-left transition-all ${
                      calcModel === m.id
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                        : 'bg-machine-900 border-machine-800 text-machine-400 hover:text-machine-200'
                    }`}
                  >
                    <div>{m.label}</div>
                    <div className="text-[10px] text-machine-500">{m.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantization Selector */}
            <div>
              <label className="tech-label block mb-1.5">QUANTIZATION PRECISION</label>
              <div className="grid grid-cols-4 gap-2">
                {['Q4_K_M', 'Q5_K_M', 'Q8_0', 'FP16'].map((q) => (
                  <button
                    key={q}
                    onClick={() => setCalcQuant(q)}
                    className={`p-2 rounded border text-center transition-all ${
                      calcQuant === q
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                        : 'bg-machine-900 border-machine-800 text-machine-400 hover:text-machine-200'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Context Window Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="tech-label">CONTEXT WINDOW LENGTH</span>
                <span className="text-cyan-400 font-bold">{(calcContext / 1024).toFixed(0)}k tokens</span>
              </div>
              <input
                type="range"
                min={4096}
                max={131072}
                step={4096}
                value={calcContext}
                onChange={(e) => setCalcContext(parseInt(e.target.value))}
                className="w-full accent-cyan-400 bg-machine-900 h-2 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-machine-500 mt-1">
                <span>4,096 (Chat)</span>
                <span>32,768 (Standard)</span>
                <span>65,536 (Deep RAG)</span>
                <span>131,072 (Full Codebase)</span>
              </div>
            </div>
          </div>

          {/* Sizing Output Gauge Card */}
          <div className="lg:col-span-5 machine-panel p-5 rounded-xl border border-cyan-700/60 shadow-glow-cyan space-y-4">
            <div className="text-xs text-machine-400 uppercase tracking-widest font-semibold border-b border-machine-800 pb-2">
              ESTIMATED HARDWARE ALLOCATION
            </div>

            <div className="text-center py-2">
              <div className="text-4xl font-display font-extrabold text-cyan-300 text-glow-cyan">
                {vramResult.totalGb} <span className="text-lg text-machine-400 font-mono">GB VRAM</span>
              </div>
              <div className="text-[11px] text-machine-400 mt-1">
                TOTAL UNIFIED MEMORY REQUIRED
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-machine-800 text-xs">
              <div className="flex justify-between">
                <span className="text-machine-500">MODEL TENSORS:</span>
                <span className="text-machine-200">{vramResult.weightGb} GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-machine-500">PAGED KV-CACHE:</span>
                <span className="text-machine-200">{vramResult.kvCacheGb} GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-machine-500">CUDA / METAL OVERHEAD:</span>
                <span className="text-machine-200">0.6 GB</span>
              </div>
            </div>

            <div className="p-3 rounded bg-machine-950 border border-machine-800 text-[11px] text-machine-300">
              <span className="text-cyan-400 font-bold">RECOMMENDED SILICON: </span>
              {parseFloat(vramResult.totalGb) <= 8
                ? 'Apple Silicon M1/M2/M3 (8GB+ / 16GB) or NVIDIA RTX 3060/4060'
                : parseFloat(vramResult.totalGb) <= 18
                ? 'Apple Silicon M2/M3 Pro/Max (18GB / 36GB) or RTX 4070 Ti / 3090'
                : 'Apple Silicon Studio (36GB+ / 64GB+) or RTX 4090 / RTX 6000 Ada'}
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Architecture Matrix Table */}
      <section className="space-y-4">
        <div className="border-b border-machine-800 pb-2">
          <span className="tech-label text-cyan-400">ENGINEERING COMPARISON MATRIX</span>
          <h2 className="text-xl font-display font-bold text-machine-100 mt-1">
            SPECIFICATION OVERVIEW
          </h2>
        </div>

        <div className="overflow-x-auto machine-panel rounded-xl border border-machine-800">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-machine-900 text-machine-400 uppercase text-[11px] border-b border-machine-800">
              <tr>
                <th className="p-3.5">MODEL</th>
                <th className="p-3.5">PARAMETERS</th>
                <th className="p-3.5">ATTENTION HEADS</th>
                <th className="p-3.5">CONTEXT LIMIT</th>
                <th className="p-3.5">Q4_K_M SIZE</th>
                <th className="p-3.5">THROUGHPUT (M3 MAX)</th>
                <th className="p-3.5">IDEAL DEPLOYMENT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-machine-850 text-machine-200">
              <tr className="hover:bg-machine-900/50 transition-colors">
                <td className="p-3.5 font-bold text-cyan-300">TYPHER 7B</td>
                <td className="p-3.5">7.24 Billion</td>
                <td className="p-3.5">32 (GQA 8)</td>
                <td className="p-3.5">32,768</td>
                <td className="p-3.5">4.37 GB</td>
                <td className="p-3.5 text-emerald-400">112 tok/s</td>
                <td className="p-3.5 text-machine-400">Laptops, Edge Nodes, Copilots</td>
              </tr>
              <tr className="hover:bg-machine-900/50 transition-colors">
                <td className="p-3.5 font-bold text-cyan-300">TYPHER 14B</td>
                <td className="p-3.5">14.77 Billion</td>
                <td className="p-3.5">40 (GQA 8)</td>
                <td className="p-3.5">65,536</td>
                <td className="p-3.5">8.98 GB</td>
                <td className="p-3.5 text-emerald-400">64 tok/s</td>
                <td className="p-3.5 text-machine-400">Enterprise Workstations, RAG, Legal</td>
              </tr>
              <tr className="hover:bg-machine-900/50 transition-colors">
                <td className="p-3.5 font-bold text-cyan-300">TYPHER 32B</td>
                <td className="p-3.5">32.50 Billion</td>
                <td className="p-3.5">64 (GQA 8)</td>
                <td className="p-3.5">131,072</td>
                <td className="p-3.5">19.40 GB</td>
                <td className="p-3.5 text-emerald-400">38 tok/s</td>
                <td className="p-3.5 text-machine-400">On-Prem Server Racks, Deep Research</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};
