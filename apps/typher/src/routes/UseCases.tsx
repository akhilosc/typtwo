import React from 'react';
import { Terminal, Shield, Scale, Search, Database, Lock, Cpu, Server, CheckCircle2 } from 'lucide-react';

export const UseCases: React.FC = () => {
  const cases = [
    {
      title: 'DEVELOPERS & SOFTWARE ENGINEERS',
      icon: Terminal,
      headline: 'Sub-30ms offline coding intelligence and repository refactoring.',
      desc: 'Integrate Typher with VSCode, JetBrains, or NeoVim. Autocomplete code, generate unit tests, and diagnose complex compiler errors completely offline with zero latency and zero risk of leaking private repositories.',
      specs: ['Local AST Repository Indexing', 'Continuous Code Autocomplete', 'Git Diff Commit Synthesizer', 'Deterministic Test Generation']
    },
    {
      title: 'ENTERPRISE & SOVEREIGN VPCs',
      icon: Server,
      headline: 'Zero-cloud AI gateways for multi-user internal engineering teams.',
      desc: 'Deploy high-throughput Typher daemons across private Kubernetes clusters. Provide your entire organization with unified, rate-limit-free LLM endpoints with centralized audit logging and zero token fees.',
      specs: ['OpenAI-Compatible REST Gateway', 'Role-Based Access Control (RBAC)', 'Immutable Audit Logging', 'Fixed Infrastructure Cost']
    },
    {
      title: 'LEGAL, M&A & FINANCIAL DUE DILIGENCE',
      icon: Scale,
      headline: 'Analyze 500-page confidential deal archives without cloud exposure.',
      desc: 'Process merger agreements, patent filings, and proprietary balance sheets on air-gapped workstations. Typher’s 64k/128k context windows synthesize entire contracts with zero third-party data retention.',
      specs: ['Confidential PDF / DOCX Ingestion', 'Clause Risk Scoring Matrix', 'Zero Retention Guarantee', 'Strict Factuality Mode (Temp 0.0)']
    },
    {
      title: 'DEFENSE & AIR-GAPPED RESEARCH',
      icon: Lock,
      headline: 'Sovereign intelligence for physically isolated high-security enclaves.',
      desc: 'Engineered for environments with zero outbound internet connections. Typher operates with all network sockets bound strictly to localhost or private UNIX sockets with cryptographic integrity verification.',
      specs: ['100% Outbound Network Isolation', 'Binary SHA-256 Signatures', 'Cryptographic Model Integrity', 'Self-Contained Dependency Graph']
    },
    {
      title: 'HEALTHCARE & LIFE SCIENCES',
      icon: Search,
      headline: 'HIPAA-compliant processing of patient histories and trial data.',
      desc: 'Clinical researchers and hospitals analyze electronic health records (EHR) and genomic sequence annotations on local GPU workstations without violating HIPAA or patient confidentiality mandates.',
      specs: ['Zero PHI Data Exfiltration', 'Local Medical Terminology Matching', 'Private Note Summarization', 'Offline Clinical RAG']
    },
    {
      title: 'PRIVATE PERSONAL KNOWLEDGE VAULTS',
      icon: Database,
      headline: 'A living private assistant that indexes your life and notes.',
      desc: 'Connect Typher to Obsidian, Notion markdown dumps, Apple Notes, and personal archives. Query your entire intellectual history instantaneously from your laptop.',
      specs: ['Local HNSW Vector Database', 'Sub-Millisecond Semantic Querying', 'Runs In-Memory on 16GB Laptops', 'Battery-Optimized Metal 3 Engine']
    }
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
          <Shield className="w-4 h-4" />
          <span>MISSION DEPLOYMENTS // OPERATIONAL TOPOLOGIES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
          INTELLIGENCE WHERE YOU NEED IT.
        </h1>
        <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
          From individual developer laptops to air-gapped sovereign defense installations, Typher provides high-performance deterministic intelligence tailored to your physical environment.
        </p>
      </div>

      {/* 6 Use Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((c, idx) => {
          const Icon = c.icon;
          return (
            <div
              key={idx}
              className="machine-panel p-6 rounded-xl border border-machine-750 corner-brackets space-y-4 hover:border-cyan-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded bg-machine-950 border border-machine-800 flex items-center justify-center text-cyan-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-machine-100">
                  {c.title}
                </h3>
                <div className="text-xs font-semibold text-cyan-300">
                  {c.headline}
                </div>
                <p className="text-xs font-sans text-machine-300 leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-machine-800 space-y-1.5">
                <div className="text-[10px] text-machine-500 uppercase tracking-widest font-semibold">
                  TOPOLOGY CAPABILITIES:
                </div>
                {c.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-machine-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
