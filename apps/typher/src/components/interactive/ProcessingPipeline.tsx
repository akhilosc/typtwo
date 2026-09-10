import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { Play, Sparkles, Binary, Cpu, ArrowDown, CheckCircle2, RotateCw } from 'lucide-react';

export const ProcessingPipeline: React.FC = () => {
  const { triggerInferenceBurst, coreState } = useTelemetry();
  const [inputText, setInputText] = useState('Explain zero-copy tensor memory mapping on Apple Silicon.');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [streamedOutput, setStreamedOutput] = useState('');

  const sampleTokens = [
    { text: 'Explain', id: 18239, color: 'bg-cyan-950/80 border-cyan-700/60 text-cyan-300' },
    { text: 'zero', id: 4920, color: 'bg-sky-950/80 border-sky-700/60 text-sky-300' },
    { text: '-copy', id: 1290, color: 'bg-blue-950/80 border-blue-700/60 text-blue-300' },
    { text: 'tensor', id: 32014, color: 'bg-indigo-950/80 border-indigo-700/60 text-indigo-300' },
    { text: 'memory', id: 8941, color: 'bg-cyan-950/80 border-cyan-700/60 text-cyan-300' },
    { text: 'mapping', id: 24190, color: 'bg-sky-950/80 border-sky-700/60 text-sky-300' },
    { text: 'on', id: 389, color: 'bg-slate-900 border-slate-700 text-slate-300' },
    { text: 'Apple', id: 11048, color: 'bg-indigo-950/80 border-indigo-700/60 text-indigo-300' },
    { text: 'Silicon', id: 34102, color: 'bg-cyan-950/80 border-cyan-700/60 text-cyan-300' },
  ];

  const fullResponse = `Zero-copy tensor memory mapping on Apple Silicon utilizes macOS virtual memory primitives (mmap) alongside Metal 3 Unified Memory Architecture (UMA). 

1. Unified Address Space: The CPU and GPU share the same physical LPDDR5X DRAM bus (up to 800 GB/s bandwidth).
2. Direct Page Mapping: Model weight files on NVMe SSD are memory-mapped directly into the virtual address space without allocation buffers.
3. Zero PCIe Serialization: Unlike discrete GPUs where data must traverse PCIe lanes, Metal 3 compute shaders execute directly against mmap'd pages with zero intermediate copying.`;

  const runPipeline = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setActiveStep(1); // Tokenize
    setStreamedOutput('');
    triggerInferenceBurst(4000, 140);

    setTimeout(() => {
      setActiveStep(2); // Embed
    }, 800);

    setTimeout(() => {
      setActiveStep(3); // Transform
    }, 1600);

    setTimeout(() => {
      setActiveStep(4); // Infer
      let currentIdx = 0;
      const interval = setInterval(() => {
        if (currentIdx < fullResponse.length) {
          setStreamedOutput(fullResponse.slice(0, currentIdx + 4));
          currentIdx += 4;
        } else {
          clearInterval(interval);
          setActiveStep(5); // Generate / Done
          setIsProcessing(false);
        }
      }, 25);
    }, 2400);
  };

  const steps = [
    { num: '01', title: 'TOKENIZE', desc: 'BPE Decomposition into discrete token IDs' },
    { num: '02', title: 'EMBED', desc: 'High-dimensional vector space projection (4,096-dim)' },
    { num: '03', title: 'TRANSFORM', desc: 'Multi-head Grouped Query Attention (GQA) matrix passes' },
    { num: '04', title: 'INFER', desc: 'Autoregressive next-token probability distribution calculation' },
    { num: '05', title: 'GENERATE', desc: 'Deterministic token stream emission to local client' },
  ];

  return (
    <div className="w-full space-y-6 font-mono">
      {/* Interactive Input Bar */}
      <div className="machine-panel p-4 rounded-xl border border-machine-700">
        <div className="flex items-center justify-between text-xs text-machine-500 mb-2">
          <span className="tech-label">INPUT PROMPT CHANNEL // LOCAL INGEST</span>
          <span>LATENCY: 0.00ms (OFFLINE)</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isProcessing}
            className="flex-1 bg-machine-950 border border-machine-800 rounded px-4 py-2.5 text-sm text-machine-100 focus:outline-none focus:border-cyan-500 transition-colors font-sans"
            placeholder="Type a computational prompt..."
          />
          <button
            onClick={runPipeline}
            disabled={isProcessing}
            className="px-6 py-2.5 rounded bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/80 hover:border-cyan-400 text-cyan-300 font-mono text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-glow-cyan disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin text-cyan-400" />
                PROCESSING...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                EXECUTE PIPELINE
              </>
            )}
          </button>
        </div>
      </div>

      {/* 5-Stage Stepper Tracker */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {steps.map((step, idx) => {
          const stepIndex = idx + 1;
          const isCurrent = activeStep === stepIndex;
          const isDone = activeStep > stepIndex;

          return (
            <div
              key={step.num}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                isCurrent
                  ? 'bg-machine-850 border-cyan-500/80 shadow-glow-cyan text-machine-100'
                  : isDone
                  ? 'bg-machine-900/90 border-emerald-700/50 text-machine-300'
                  : 'bg-machine-900/40 border-machine-800 text-machine-500'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={`font-bold ${isCurrent ? 'text-cyan-400' : isDone ? 'text-emerald-400' : 'text-machine-500'}`}>
                  {step.num}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : isCurrent ? (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                ) : null}
              </div>
              <div className="font-bold text-xs tracking-wider">{step.title}</div>
              <div className="text-[10px] text-machine-500 mt-1 line-clamp-2">{step.desc}</div>
            </div>
          );
        })}
      </div>

      {/* Visual Execution Arena */}
      <div className="machine-panel p-6 rounded-xl border border-machine-750 corner-brackets space-y-6">
        
        {/* Stage 1: Tokenizer Preview */}
        {activeStep >= 1 && (
          <div className="space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-machine-400 border-b border-machine-800 pb-2">
              <span className="flex items-center gap-1.5">
                <Binary className="w-3.5 h-3.5 text-cyan-400" />
                STAGE 01: TOKEN DECOMPOSITION ({sampleTokens.length} TOKENS)
              </span>
              <span className="text-[11px] text-cyan-400">VOCAB_SIZE: 152,064</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {sampleTokens.map((tok, i) => (
                <div
                  key={i}
                  className={`px-2.5 py-1 rounded border text-xs flex items-center gap-1.5 font-mono shadow-sm ${tok.color}`}
                >
                  <span className="font-semibold font-sans">{tok.text}</span>
                  <span className="text-[10px] opacity-60">[{tok.id}]</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stage 2 & 3: Embedding & Attention Heatmap preview */}
        {activeStep >= 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-3 rounded bg-machine-900 border border-machine-800 space-y-2">
              <div className="text-xs text-machine-400 flex items-center justify-between">
                <span>STAGE 02: DENSE EMBEDDING VECTORS</span>
                <span className="text-cyan-400 text-[10px]">FP16 / 4096-DIM</span>
              </div>
              <div className="grid grid-cols-8 gap-1 py-1">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-3 rounded-sm transition-colors duration-200"
                    style={{
                      backgroundColor: `rgba(56, 189, 248, ${0.15 + (Math.sin(i * 1.5 + activeStep) * 0.5 + 0.5) * 0.7})`
                    }}
                  />
                ))}
              </div>
              <div className="text-[10px] text-machine-500 truncate">
                VEC_SAMPLE: [+0.0842, -0.2194, +0.9412, +0.0031, -0.4819, ...]
              </div>
            </div>

            <div className="p-3 rounded bg-machine-900 border border-machine-800 space-y-2">
              <div className="text-xs text-machine-400 flex items-center justify-between">
                <span>STAGE 03: GQA ATTENTION MATRIX (32 HEADS)</span>
                <span className="text-emerald-400 text-[10px]">FLASHINFER 2.0</span>
              </div>
              <div className="grid grid-cols-8 gap-1 py-1">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-3 rounded-sm transition-colors duration-200"
                    style={{
                      backgroundColor: `rgba(16, 185, 129, ${0.15 + (Math.cos(i * 1.2 + activeStep) * 0.5 + 0.5) * 0.7})`
                    }}
                  />
                ))}
              </div>
              <div className="text-[10px] text-machine-500 truncate">
                ATTN_WEIGHT: SOFTMAX(Q·K^T / √d_k) · V (CACHE PINNED)
              </div>
            </div>
          </div>
        )}

        {/* Stage 4 & 5: Streamed Output Window */}
        <div className="space-y-2 pt-2 border-t border-machine-800">
          <div className="flex items-center justify-between text-xs text-machine-400">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              STAGE 04 & 05: INFERENCE STREAM OUTPUT
            </span>
            {activeStep >= 4 && (
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                64.2 TOK/S STREAMING
              </span>
            )}
          </div>
          
          <div className="min-h-[140px] p-4 rounded-lg bg-machine-950 border border-machine-800/80 font-mono text-xs sm:text-sm text-machine-200 leading-relaxed whitespace-pre-wrap">
            {streamedOutput || (
              <span className="text-machine-600 italic">
                Press "EXECUTE PIPELINE" above to initiate the computational transformation sequence...
              </span>
            )}
            {activeStep === 4 && <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse" />}
          </div>
        </div>

      </div>
    </div>
  );
};
