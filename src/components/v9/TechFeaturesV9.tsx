import React, { useState } from 'react';
import { Cpu, ShieldCheck, Lock, Terminal, Database, FileText, CheckCircle2, Play, Search } from 'lucide-react';

export const TechFeaturesV9 = () => {
  const [activeTab, setActiveTab] = useState<'features' | 'rag' | 'security'>('features');
  const [ragQuery, setRagQuery] = useState('What are our Q3 sovereign insurance claim SOPs?');
  const [isQuerying, setIsQuerying] = useState(false);
  const [ragResult, setRagResult] = useState<string | null>(null);

  const techServices = [
    {
      code: "T-01",
      title: "AI Implementation",
      summary: "We take AI from slide deck to production — scoping the use case, choosing the model, and wiring it into the systems your teams already live in.",
      points: ["Use-case discovery and ROI modelling", "Model selection & benchmarking", "Retrieval pipelines over internal data", "Human-in-the-loop guardrails"]
    },
    {
      code: "T-02",
      title: "Private AI & On-Prem VPC",
      summary: "Open-weight models deployed inside your perimeter. Your data never leaves the building, and no third party trains on it.",
      points: ["On-premise & VPC model hosting", "Private inference gateways with audit logs", "Role-scoped access & data residency", "Fine-tuning on proprietary corpora"]
    },
    {
      code: "T-03",
      title: "Process Automation",
      summary: "The unglamorous work that pays for itself. We find repetitive loops across your operations and remove the manual step.",
      points: ["Document and invoice processing", "Back-office workflow orchestration", "Support triage & routing agents", "System-to-system integration"]
    },
    {
      code: "T-04",
      title: "Technology Maintenance",
      summary: "Long-term ownership of the stack we build — and often the stack you inherited from someone else.",
      points: ["Monitoring & incident response", "Model drift & regression tracking", "Security patching & hygiene", "Quarterly architecture reviews"]
    },
    {
      code: "T-05",
      title: "Data Engineering",
      summary: "AI is only as good as the pipes feeding it. We build the ingestion, cleaning and storage layer underneath.",
      points: ["Warehouse & lakehouse design", "ETL / streaming pipelines", "Vector store architecture", "Data quality contracts"]
    },
    {
      code: "T-06",
      title: "AI Advisory & Governance",
      summary: "For leadership teams who need a straight answer about what is real, what is hype, and what it will cost.",
      points: ["Capability audits & readiness scoring", "Build-vs-buy assessments", "Internal AI policy & governance", "Team enablement & training"]
    }
  ];

  const handleRunQuery = () => {
    setIsQuerying(true);
    setRagResult(null);
    setTimeout(() => {
      setIsQuerying(false);
      setRagResult(`[ACL Check PASSED: Role=Senior_Claims_Officer]
Grounded retrieval context fetched from 4,200 indexed claims documents:
- SOP #8841: Claims under $50,000 auto-triage via Private LLM.
- Result: Processing time reduced from 4 days to 6 hours. Zero patient/customer egress.`);
    }, 800);
  };

  return (
    <section className="py-28 bg-[#09090C] border-t border-white/10 text-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/50 text-cyan-300 text-xs font-extrabold tracking-widest uppercase mb-4">
            <Cpu className="w-4 h-4" /> TYPTWO TECH • COMPLETE FEATURE MATRIX
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
            Engineering Intelligent Operations
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            All 6 core technology modules built for sovereign enterprise scale.
          </p>

          {/* Interactive Mode Switcher */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab('features')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'features' ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              All 6 Tech Services (T-01..T-06)
            </button>

            <button
              onClick={() => setActiveTab('rag')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'rag' ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              Live Vector RAG Simulator
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'security' ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              Zero-Trust Security Matrix
            </button>
          </div>
        </div>

        {/* TAB 1: ALL 6 TECH SERVICES */}
        {activeTab === 'features' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techServices.map((s) => (
              <div key={s.code} className="p-8 rounded-2xl bg-[#111115] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1">
                <div>
                  <span className="text-xs font-extrabold tracking-widest text-cyan-400 block mb-3">{s.code}</span>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{s.summary}</p>
                </div>
                <ul className="space-y-2.5 border-t border-white/5 pt-4">
                  {s.points.map((pt, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: LIVE VECTOR RAG SIMULATOR */}
        {activeTab === 'rag' && (
          <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-[#111115] border border-cyan-400/40 shadow-[0_0_40px_rgba(0,229,255,0.15)]">
            <div className="flex items-center gap-3 text-cyan-400 text-sm font-bold mb-6">
              <Search className="w-5 h-5" />
              <span>INTERACTIVE PRIVATE VECTOR RAG SIMULATOR</span>
            </div>

            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={ragQuery}
                onChange={(e) => setRagQuery(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-black border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={handleRunQuery}
                disabled={isQuerying}
                className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 transition-all flex items-center gap-2"
              >
                {isQuerying ? 'Querying Vector Engine...' : 'Run Query'}
              </button>
            </div>

            {ragResult && (
              <div className="p-6 rounded-xl bg-black/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 leading-relaxed whitespace-pre-line animate-fade-in">
                {ragResult}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ZERO-TRUST SECURITY */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-[#111115] border border-white/10 text-center flex flex-col items-center">
              <Lock className="w-10 h-10 text-cyan-400 mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Air-Gapped VPC</h4>
              <p className="text-slate-400 text-sm">0 KB data egress. Open-weight models running inside your cloud perimeter.</p>
            </div>

            <div className="p-8 rounded-2xl bg-[#111115] border border-white/10 text-center flex flex-col items-center">
              <ShieldCheck className="w-10 h-10 text-cyan-400 mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">ACL Permission Inheritance</h4>
              <p className="text-slate-400 text-sm">Role-scoped vector search inherited directly from your identity provider.</p>
            </div>

            <div className="p-8 rounded-2xl bg-[#111115] border border-white/10 text-center flex flex-col items-center">
              <Terminal className="w-10 h-10 text-cyan-400 mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Token Audit Logging</h4>
              <p className="text-slate-400 text-sm">Every inference step logged and auditable for strict compliance standards.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
