import React, { useState } from 'react';
import { Layers, Cpu, Terminal, Database, Server, Workflow, Shield, ArrowDown, ChevronRight, Activity } from 'lucide-react';

export const SystemArchitecture: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const layers = [
    {
      id: 0,
      title: 'LAYER 07: APPLICATIONS',
      subtitle: 'Native Developer Interfaces & Autonomous Agents',
      icon: Terminal,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/40',
      details: 'Direct integrations with IDE copilots, terminal sessions, local desktop applications, and private corporate web clients. Zero dependency on cloud routing.',
      subsystems: ['VSCode / JetBrains Extension', 'Local CLI (\`typher run\`)', 'Autonomous Tool Sandbox', 'Private Web UI Console'],
      telemetry: 'LATENCY: <1ms (LOCAL SOCKET)'
    },
    {
      id: 1,
      title: 'LAYER 06: TYPHER API GATEWAY',
      subtitle: 'OpenAI-Compatible & High-Throughput gRPC Protocols',
      icon: Workflow,
      color: 'text-sky-400',
      borderColor: 'border-sky-500/40',
      details: 'Drop-in HTTP REST endpoints (\`/v1/chat/completions\`, \`/v1/embeddings\`, \`/v1/models\`) with Server-Sent Events (SSE) streaming and microsecond IPC sockets.',
      subsystems: ['SSE Streaming Engine', 'JSON Schema Enforcement', 'API Key & RBAC Guard', 'UNIX Domain Socket Bridge'],
      telemetry: 'PORT: 127.0.0.1:11434'
    },
    {
      id: 2,
      title: 'LAYER 05: ORCHESTRATION & SCHEDULING',
      subtitle: 'Dynamic KV-Cache Paging & Concurrency Router',
      icon: Layers,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/40',
      details: 'Manages prompt chunking, concurrent multi-turn user sessions, speculative draft model coordination, and intelligent model offload/swapping.',
      subsystems: ['Paged KV-Cache Allocator', 'Speculative Draft Coordinator', 'Continuous Batching Queue', 'Context Shifting Engine'],
      telemetry: 'CONCURRENCY: 16 STREAMS'
    },
    {
      id: 3,
      title: 'LAYER 04: KNOWLEDGE & VECTOR ENGINE',
      subtitle: 'Embedded Zero-Network Semantic Retrieval',
      icon: Database,
      color: 'text-indigo-400',
      borderColor: 'border-indigo-500/40',
      details: 'High-speed HNSW vector indexing, on-the-fly document chunking, BM25 hybrid ranking, and local embedding generation with zero external APIs.',
      subsystems: ['HNSW Vector Indexer', 'Hybrid BM25 Ranker', 'Local Embedder (typher-embed)', 'AST Codebase Chunker'],
      telemetry: 'INDEX SPEED: 12,000 DOCS/S'
    },
    {
      id: 4,
      title: 'LAYER 03: INFERENCE ENGINE',
      subtitle: 'Quantized Tensor Math & Attention Optimization',
      icon: Activity,
      color: 'text-cyan-300',
      borderColor: 'border-cyan-400/50',
      details: 'Custom FlashInfer 2.0 attention kernels, Grouped-Query Attention (GQA), RoPE positional encoding, and low-bit matrix multiplication routines.',
      subsystems: ['FlashInfer Attention Kernels', 'Q4_K / Q5_K Dequantizers', 'RoPE Vector Rotators', 'Softmax Vectorized ALU'],
      telemetry: 'ATTENTION: FLASHINFER 2.0'
    },
    {
      id: 5,
      title: 'LAYER 02: MODEL RUNTIME',
      subtitle: 'Virtual Memory Mapping & Weight Management',
      icon: Server,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      details: 'Memory-maps raw GGUF and safetensors files directly into host virtual memory (\`mmap\`). Bypasses heap duplication for sub-400ms model loading.',
      subsystems: ['Zero-Copy Disk MMapper', 'Tensor Lock & Pinning', 'KV Cache Unified Buffers', 'Dynamic Layer Sharding'],
      telemetry: 'COLD START: <380ms'
    },
    {
      id: 6,
      title: 'LAYER 01: YOUR PHYSICAL HARDWARE',
      subtitle: 'Direct Silicon Compute Acceleration',
      icon: Cpu,
      color: 'text-emerald-300',
      borderColor: 'border-emerald-400/60',
      details: 'Native compute drivers compiled directly for Apple Silicon Metal 3 (Unified Memory), NVIDIA CUDA with Tensor Cores, AMD ROCm, and AVX-512 vector CPUs.',
      subsystems: ['Apple Silicon Metal 3 (UMA)', 'NVIDIA CUDA 12+ Tensor Cores', 'AMD ROCm / HIP Engine', 'Intel/AMD AVX-512 Vector Unit'],
      telemetry: 'BANDWIDTH: UP TO 800 GB/S'
    }
  ];

  return (
    <div className="w-full font-mono space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Stack Navigation */}
        <div className="lg:col-span-6 space-y-2">
          {layers.map((layer) => {
            const Icon = layer.icon;
            const isSelected = activeLayer === layer.id;

            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`w-full p-3.5 rounded-lg border text-left transition-all duration-200 flex items-center justify-between ${
                  isSelected
                    ? `bg-machine-850 ${layer.borderColor} shadow-glow-cyan`
                    : 'bg-machine-900/60 border-machine-800/80 hover:border-machine-700 hover:bg-machine-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded bg-machine-950 border border-machine-800 ${layer.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold tracking-wider ${isSelected ? 'text-machine-100' : 'text-machine-300'}`}>
                      {layer.title}
                    </div>
                    <div className="text-[11px] text-machine-500 font-sans">{layer.subtitle}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-machine-500 hidden sm:inline">{layer.telemetry}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-cyan-400' : 'text-machine-600'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Deep Inspector Panel */}
        <div className="lg:col-span-6">
          <div className="machine-panel p-6 rounded-xl border border-machine-700/80 corner-brackets h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-machine-800 pb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span className="tech-label">LAYER INSPECTOR // REAL-TIME TOPOLOGY</span>
                </div>
                <span className="text-xs font-bold text-emerald-400">● STACK READY</span>
              </div>

              <div>
                <h3 className="text-lg font-display font-bold text-machine-100 tracking-wider">
                  {layers[activeLayer].title}
                </h3>
                <p className="text-xs font-mono text-cyan-400 mt-0.5">
                  {layers[activeLayer].subtitle}
                </p>
              </div>

              <p className="text-sm font-sans text-machine-300 leading-relaxed pt-1">
                {layers[activeLayer].details}
              </p>

              <div className="pt-3">
                <div className="text-xs text-machine-500 uppercase tracking-widest font-semibold mb-2">
                  ACTIVE SUBMODULES & PIPELINES:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {layers[activeLayer].subsystems.map((sub, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded bg-machine-950 border border-machine-800/90 text-xs text-machine-200 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span className="truncate">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-machine-800 flex items-center justify-between text-xs text-machine-500">
              <span>ACTIVE TELEMETRY:</span>
              <span className="text-cyan-300 font-bold">{layers[activeLayer].telemetry}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
