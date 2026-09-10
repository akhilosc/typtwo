import React from 'react';
import { 
  Zap, 
  Layers, 
  Database, 
  Search, 
  Bot, 
  Terminal, 
  Workflow, 
  Activity, 
  ShieldCheck,
  Cpu,
  HardDrive,
  Code
} from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      num: '01',
      title: 'LOCAL INFERENCE ENGINE',
      icon: Zap,
      tag: 'SUB-20MS TTFT',
      desc: 'Direct silicon execution on Apple Silicon Metal 3, NVIDIA CUDA, and AMD ROCm. Zero network calls, zero rate-limiting, zero subscription quotas.',
      specs: ['FlashInfer 2.0 Attention', 'Grouped-Query Attention (GQA)', 'Speculative Token Decoding', 'Zero-Copy Virtual MMAP']
    },
    {
      num: '02',
      title: 'MODEL LIFECYCLE MANAGEMENT',
      icon: Layers,
      tag: 'GGUF & SAFETENSORS',
      desc: 'Pull, inspect, quantize, and pin neural network weights with single-word CLI commands. Hot-swap models in memory in under 400ms.',
      specs: ['Quantization: Q4_K_M to FP16', 'Single-Command Pull & Run', 'Tensor Layer Sharding', 'Multi-Model Pinning']
    },
    {
      num: '03',
      title: 'LOCAL RAG & DOCUMENT PIPELINE',
      icon: Database,
      tag: 'CONFIDENTIAL ARCHIVES',
      desc: 'Ingest proprietary PDF documentation, engineering codebases, and meeting transcripts directly into local context without third-party exfiltration.',
      specs: ['AST-Aware Code Parser', 'Automatic Semantic Chunking', 'Hybrid BM25 + Vector Search', 'Metadata Filtering']
    },
    {
      num: '04',
      title: 'EMBEDDED VECTOR SEARCH',
      icon: Search,
      tag: 'HNSW MEMORY-MAPPED',
      desc: 'Embedded zero-overhead vector database running in-process with memory-mapped HNSW indexing for sub-millisecond similarity queries.',
      specs: ['12,000+ Queries / Sec', 'Cosine & Dot-Product Distance', 'Persistent On-Disk Storage', 'In-Process IPC Execution']
    },
    {
      num: '05',
      title: 'AUTONOMOUS AGENT SANDBOX',
      icon: Bot,
      tag: 'STRICT JSON CALLING',
      desc: 'Grammar-guided tool execution allowing Typher models to safely inspect files, run shell scripts, and refactor codebases within sandboxed boundaries.',
      specs: ['100% Valid JSON Schemas', 'Multi-Turn Tool Memory State', 'Sandboxed Local FS Access', 'Interactive Human-in-the-Loop']
    },
    {
      num: '06',
      title: 'OPENAI-COMPATIBLE REST API',
      icon: Terminal,
      tag: 'PORT 127.0.0.1:11434',
      desc: 'Drop-in replacement for OpenAI endpoints (/v1/chat/completions, /v1/embeddings, /v1/models). Integrate instantly with existing LLM tools and frameworks.',
      specs: ['SSE Server-Sent Events', 'gRPC High-Throughput Stream', 'UNIX Domain Socket Bridge', 'Compatible with LangChain & LlamaIndex']
    },
    {
      num: '07',
      title: 'KV-CACHE ORCHESTRATION',
      icon: Workflow,
      tag: 'PAGED MEMORY ALLOCATOR',
      desc: 'Virtual memory block allocation that eliminates internal memory fragmentation and enables extended 128k context windows on standard workstations.',
      specs: ['Non-Contiguous DRAM Blocks', 'Zero OOM Crash Guarantees', 'Continuous Dynamic Batching', 'Multi-Session Context Reuse']
    },
    {
      num: '08',
      title: 'REAL-TIME OBSERVABILITY',
      icon: Activity,
      tag: 'LIVE TELEMETRY STREAM',
      desc: 'Embedded `/v1/telemetry` endpoint streaming real-time tokens/sec throughput, GPU compute saturation, VRAM usage, and TTFT latency.',
      specs: ['Microsecond Metric Feeds', 'Prometheus Exporter Ready', 'Real-Time Hardware Gauge', 'Detailed Audit Logs']
    }
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
          <Layers className="w-4 h-4" />
          <span>SUBSYSTEMS // 8 CORE COMPUTATIONAL CAPABILITIES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
          THE COMPONENTS OF THE MACHINE.
        </h1>
        <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
          Every component in Typher is engineered for local execution, extreme memory efficiency, and sovereign data isolation.
        </p>
      </div>

      {/* 8 Feature Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.num}
              className="machine-panel p-6 rounded-xl border border-machine-750 corner-brackets space-y-4 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-machine-800 pb-2">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Icon className="w-4 h-4" />
                    <span className="font-bold tracking-wider">{f.num} // {f.title}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-machine-950 border border-machine-800 text-cyan-300 font-mono">
                    {f.tag}
                  </span>
                </div>

                <p className="text-xs font-sans text-machine-300 leading-relaxed">
                  {f.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-machine-800">
                <div className="text-[10px] text-machine-500 uppercase tracking-widest font-semibold mb-2">
                  SUBSYSTEM SPECIFICATIONS:
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[11px] text-machine-200">
                  {f.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-1.5 truncate">
                      <span className="w-1 h-1 rounded-full bg-cyan-400" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
