import React from 'react';
import { TypherCore } from '../components/core/TypherCore';
import { MachineTelemetry } from '../components/telemetry/MachineTelemetry';
import { ProcessingPipeline } from '../components/interactive/ProcessingPipeline';
import { SystemArchitecture } from '../components/interactive/SystemArchitecture';
import { ModelCard } from '../components/interactive/ModelCard';
import { TerminalBlock } from '../components/interactive/TerminalBlock';
import { TYPHER_MODELS } from '../data/modelsData';
import { 
  ShieldCheck, 
  Cpu, 
  Sliders, 
  Server, 
  ArrowRight, 
  Zap, 
  Layers, 
  Terminal, 
  Code, 
  Search, 
  Bot, 
  FileText, 
  Database,
  ArrowDown,
  Sparkles
} from 'lucide-react';

interface HomeProps {
  navigate: (route: string) => void;
}

export const Home: React.FC<HomeProps> = ({ navigate }) => {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden tech-grid">
      
      {/* HERO SECTION */}
      <section className="relative pt-28 sm:pt-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Top Technical Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-machine-500 border-b border-machine-800 pb-3 mb-10">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">TYPHER //</span>
            <span className="tracking-widest uppercase text-machine-300">LOCAL INTELLIGENCE SYSTEM</span>
          </div>
          <div className="flex items-center gap-4">
            <span>METAL 3 / CUDA 12.4</span>
            <span className="text-emerald-400">● 0.00% CLOUD EXFILTRATION</span>
          </div>
        </div>

        {/* Hero 3-Column Machine Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Product Manifesto */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold block mb-2">
                SOVEREIGN PHYSICAL SILICON RUNTIME
              </span>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-display font-extrabold tracking-tight text-machine-100 leading-[1.05]">
                INTELLIGENCE. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-machine-100">
                  ON YOUR MACHINE.
                </span>
              </h1>
            </div>

            <p className="text-sm sm:text-base font-sans text-machine-300 leading-relaxed">
              Typher is a local AI platform for running, connecting and deploying state-of-the-art language models directly on your own hardware.
            </p>

            <div className="font-mono text-xs text-machine-400 space-y-1 py-1 border-l-2 border-cyan-500/60 pl-3">
              <div>YOUR DATA.</div>
              <div>YOUR INFRASTRUCTURE.</div>
              <div className="text-cyan-300 font-bold">YOUR CONTROL.</div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/download')}
                className="px-6 py-3 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/80 hover:border-cyan-400 text-cyan-200 font-mono text-xs tracking-wider transition-all flex items-center gap-2 shadow-glow-cyan"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                RUN TYPHER
              </button>

              <button
                onClick={() => navigate('/system')}
                className="px-6 py-3 rounded-lg bg-machine-900 hover:bg-machine-850 border border-machine-750 text-machine-300 hover:text-cyan-300 font-mono text-xs tracking-wider transition-all flex items-center gap-2"
              >
                EXPLORE THE SYSTEM
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center: Large Computational Reactor */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative py-4">
            
            {/* Input Data Stream Tag */}
            <div className="text-[10px] font-mono text-machine-400 bg-machine-900/90 border border-machine-800 px-3 py-1 rounded mb-2 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              INPUT // TEXT • CODE • DOCS • DATA
            </div>

            <ArrowDown className="w-4 h-4 text-cyan-400 mb-1 animate-bounce" />

            {/* Reactor Canvas */}
            <div className="relative">
              <TypherCore size={380} />
            </div>

            <ArrowDown className="w-4 h-4 text-cyan-400 mt-1 animate-bounce" />

            {/* Output Stream Tag */}
            <div className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-700/60 px-3 py-1 rounded mt-2 flex items-center gap-1.5 shadow-glow-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              OUTPUT // REASONING • AGENTS • AUTOMATION
            </div>
          </div>

          {/* Right: Live Hardware Telemetry HUD */}
          <div className="lg:col-span-4">
            <MachineTelemetry />
          </div>

        </div>

        {/* 5-Stage Architectural Rail Below Hero */}
        <div className="mt-16 pt-8 border-t border-machine-800/80 grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
          {[
            { num: '01', title: 'TOKENIZE', sub: 'BPE Tensor Map' },
            { num: '02', title: 'EMBED', sub: 'Dense Vector Matrix' },
            { num: '03', title: 'TRANSFORM', sub: 'FlashInfer GQA Passes' },
            { num: '04', title: 'INFER', sub: 'Logit Prob Distribution' },
            { num: '05', title: 'GENERATE', sub: 'Zero-Latency Token Stream' },
          ].map((s) => (
            <div key={s.num} className="p-3 rounded bg-machine-900/70 border border-machine-800 flex items-center gap-3">
              <span className="text-cyan-400 font-bold">{s.num}</span>
              <div>
                <div className="text-machine-200 font-semibold">{s.title}</div>
                <div className="text-[10px] text-machine-500">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: WHY TYPHER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-machine-800 pb-6 mb-12">
          <span className="tech-label text-cyan-400">CORE VALUE ARCHITECTURE</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-machine-100 tracking-tight mt-1">
            AI SHOULDN'T ALWAYS <br className="hidden sm:inline" />
            LEAVE YOUR MACHINE.
          </h2>
          <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
            Typher delivers frontier language intelligence with the deterministic privacy, physical control, and zero-marginal cost of local hardware infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Module 1: PRIVATE */}
          <div className="machine-panel p-6 rounded-xl border border-machine-800 corner-brackets font-mono space-y-3 hover:border-cyan-500/50 transition-all">
            <div className="w-10 h-10 rounded bg-machine-950 border border-machine-800 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="font-display font-bold text-lg text-machine-100">01 // PRIVATE</div>
            <p className="text-xs font-sans text-machine-300 leading-relaxed">
              Your prompt inputs, proprietary code, customer records, and model weights never traverse the public internet. Zero egress by design.
            </p>
            <div className="text-[10px] text-emerald-400 pt-2 border-t border-machine-850">
              ● AIR-GAP COMPATIBLE
            </div>
          </div>

          {/* Module 2: LOCAL */}
          <div className="machine-panel p-6 rounded-xl border border-machine-800 corner-brackets font-mono space-y-3 hover:border-cyan-500/50 transition-all">
            <div className="w-10 h-10 rounded bg-machine-950 border border-machine-800 flex items-center justify-center text-sky-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="font-display font-bold text-lg text-machine-100">02 // LOCAL</div>
            <p className="text-xs font-sans text-machine-300 leading-relaxed">
              Execute directly on Apple Silicon Metal 3, NVIDIA CUDA Tensor Cores, and unified memory buses with sub-20ms First Token Latency.
            </p>
            <div className="text-[10px] text-cyan-400 pt-2 border-t border-machine-850">
              ● ZERO CLOUD OVERHEAD
            </div>
          </div>

          {/* Module 3: CONTROLLED */}
          <div className="machine-panel p-6 rounded-xl border border-machine-800 corner-brackets font-mono space-y-3 hover:border-cyan-500/50 transition-all">
            <div className="w-10 h-10 rounded bg-machine-950 border border-machine-800 flex items-center justify-center text-blue-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div className="font-display font-bold text-lg text-machine-100">03 // CONTROLLED</div>
            <p className="text-xs font-sans text-machine-300 leading-relaxed">
              Choose your exact quantization formats (Q4_K_M, Q8_0, FP16), fine-tune custom weights, and freeze versions without forced API deprecations.
            </p>
            <div className="text-[10px] text-blue-400 pt-2 border-t border-machine-850">
              ● DETERMINISTIC SAMPLING
            </div>
          </div>

          {/* Module 4: FLEXIBLE */}
          <div className="machine-panel p-6 rounded-xl border border-machine-800 corner-brackets font-mono space-y-3 hover:border-cyan-500/50 transition-all">
            <div className="w-10 h-10 rounded bg-machine-950 border border-machine-800 flex items-center justify-center text-indigo-400">
              <Server className="w-5 h-5" />
            </div>
            <div className="font-display font-bold text-lg text-machine-100">04 // FLEXIBLE</div>
            <p className="text-xs font-sans text-machine-300 leading-relaxed">
              Scales seamlessly from developer MacBook Pros to multi-GPU workstations, on-prem server racks, and isolated private enterprise VPCs.
            </p>
            <div className="text-[10px] text-indigo-400 pt-2 border-t border-machine-850">
              ● LAPTOP TO SERVER
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: THE SYSTEM (Interactive 7-layer architecture) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-machine-800 pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="tech-label text-cyan-400">ARCHITECTURE // 7-LAYER STACK</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-machine-100 tracking-tight mt-1">
              A MACHINE BUILT <br className="hidden sm:inline" />
              FOR INTELLIGENCE.
            </h2>
          </div>
          <button
            onClick={() => navigate('/system')}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
          >
            VIEW FULL SYSTEM SPEC <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <SystemArchitecture />
      </section>

      {/* SECTION: MODELS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-machine-800 pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="tech-label text-cyan-400">FRONTIER LOCAL WEIGHTS</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-machine-100 tracking-tight mt-1">
              CHOOSE THE INTELLIGENCE.
            </h2>
          </div>
          <button
            onClick={() => navigate('/models')}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
          >
            EXPLORE QUANTIZATION MATRIX <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TYPHER_MODELS.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              onLaunchPlayground={(id) => navigate('/playground')}
            />
          ))}
        </div>
      </section>

      {/* SECTION: INFERENCE IN MOTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-machine-800 pb-6 mb-10">
          <span className="tech-label text-cyan-400">LIVE COMPUTATIONAL SEQUENCE</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-machine-100 tracking-tight mt-1">
            INFERENCE IN MOTION.
          </h2>
          <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
            Watch the internal autoregressive lifecycle operate: from prompt token decomposition to dense vector projections and token stream emission.
          </p>
        </div>

        <ProcessingPipeline />
      </section>

      {/* SECTION: APPLICATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-machine-800 pb-6 mb-10">
          <span className="tech-label text-cyan-400">ECOSYSTEM // LOCAL CAPABILITIES</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-machine-100 tracking-tight mt-1">
            INTELLIGENCE THAT CAN GO ANYWHERE.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
          {[
            {
              title: 'DEVELOPMENT & COPILOTS',
              icon: Code,
              desc: 'Sub-30ms code generation, autocomplete, and AST repo refactoring inside VSCode, NeoVim, and JetBrains IDEs without sending code to third parties.',
            },
            {
              title: 'PRIVATE KNOWLEDGE & RAG',
              icon: Database,
              desc: 'Ingest confidential internal PDF archives, Jira tickets, and Confluence databases into local HNSW vector stores with zero data exfiltration.',
            },
            {
              title: 'AUTONOMOUS LOCAL AGENTS',
              icon: Bot,
              desc: 'Execute multi-step JSON tool-calling loops with local sandboxed file access, automated git commits, and shell script execution.',
            },
            {
              title: 'ENTERPRISE AI GATEWAYS',
              icon: Server,
              desc: 'Deploy high-throughput multi-model inference servers on private Kubernetes clusters with standardized OpenAI-compatible REST endpoints.',
            },
            {
              title: 'AIR-GAPPED & DEFENSE',
              icon: ShieldCheck,
              desc: 'Run completely offline on isolated physical hardware in healthcare, defense, and sovereign government security enclaves.',
            },
            {
              title: 'CONFIDENTIAL RESEARCH',
              icon: Search,
              desc: 'Execute mathematical modeling, proprietary chemical formulations, and quantitative trading simulations in complete privacy.',
            },
          ].map((app, idx) => {
            const Icon = app.icon;
            return (
              <div
                key={idx}
                className="machine-panel p-6 rounded-xl border border-machine-800 space-y-3 hover:border-cyan-500/40 transition-all"
              >
                <div className="w-9 h-9 rounded bg-machine-950 border border-machine-800 flex items-center justify-center text-cyan-400">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-base text-machine-100">
                  {app.title}
                </h3>
                <p className="text-xs font-sans text-machine-300 leading-relaxed">
                  {app.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* DEVELOPER TERMINAL DEMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-machine-800 pb-6 mb-10">
          <span className="tech-label text-cyan-400">DEVELOPER API & CLI</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-machine-100 tracking-tight mt-1">
            BUILD ON THE MACHINE.
          </h2>
        </div>

        <TerminalBlock />
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="machine-panel p-8 sm:p-14 rounded-2xl border border-cyan-700/50 text-center relative overflow-hidden shadow-glow-cyan-lg space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/90 border border-cyan-600/60 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            STANDALONE SOVEREIGN RUNTIME
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight max-w-2xl mx-auto leading-tight">
            BUILD INTELLIGENCE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-machine-100">
              THAT STAYS YOURS.
            </span>
          </h2>

          <p className="text-sm sm:text-base font-sans text-machine-300 max-w-xl mx-auto leading-relaxed">
            Install the Typher engine binary on macOS, Linux, or Windows and start executing local language models in under 60 seconds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/download')}
              className="px-8 py-3.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-400 text-cyan-200 font-mono text-xs tracking-wider transition-all shadow-glow-cyan flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              START WITH TYPHER
            </button>

            <button
              onClick={() => navigate('/docs')}
              className="px-8 py-3.5 rounded-lg bg-machine-900 hover:bg-machine-850 border border-machine-700 text-machine-200 hover:text-cyan-300 font-mono text-xs tracking-wider transition-all"
            >
              READ DOCUMENTATION
            </button>
          </div>

          <div className="pt-6 text-xs font-mono text-machine-500">
            TYPHER // A PRODUCT OF <span className="text-machine-300 font-semibold">TYPTWO</span>
          </div>
        </div>
      </section>

    </div>
  );
};
