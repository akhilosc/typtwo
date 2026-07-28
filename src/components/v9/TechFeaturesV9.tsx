import React, { useState } from 'react';
import { Cpu, ShieldCheck, Lock, Terminal, Search, CheckCircle2 } from 'lucide-react';

export const TechFeaturesV9 = () => {
  const [activeTab, setActiveTab] = useState<'features' | 'rag' | 'security'>('features');
  const [ragQuery, setRagQuery] = useState('What are our Q3 sovereign insurance claim SOPs?');
  const [isQuerying, setIsQuerying] = useState(false);
  const [ragResult, setRagResult] = useState<string | null>(null);

  const techServices = [
    {
      code: "T-01",
      title: "AI Implementation & Strategy",
      img: "/images/ai_implementation_model.png",
      summary: "We take AI from slide deck to production — scoping the use case, choosing the model, and wiring it into the systems your teams live in.",
      points: ["Use-case discovery and ROI modelling", "Model selection & benchmarking", "Retrieval pipelines over internal data", "Human-in-the-loop guardrails"]
    },
    {
      code: "T-02",
      title: "Private AI & On-Prem VPC",
      img: "/images/private_ai_vpc.png",
      summary: "Open-weight models deployed inside your perimeter. Your data never leaves the building, and no third party trains on it.",
      points: ["On-premise & VPC model hosting", "Private inference gateways with audit logs", "Role-scoped access & data residency", "Fine-tuning on proprietary corpora"]
    },
    {
      code: "T-03",
      title: "Process & Workflow Automation",
      img: "/images/process_automation_flow.png",
      summary: "Automated back-office robotic loops. We find repetitive tasks across your operations and remove the manual step.",
      points: ["Document and invoice auto-triage", "Departmental workflow orchestration", "Support triage & routing agents", "System-to-system integration"]
    },
    {
      code: "T-04",
      title: "Technology Maintenance & Telemetry",
      img: "/images/tech_infra.png",
      summary: "Long-term ownership of the stack we build — and often the stack you inherited from someone else.",
      points: ["Monitoring & incident response", "Model drift & regression tracking", "Security patching & hygiene", "Quarterly architecture reviews"]
    },
    {
      code: "T-05",
      title: "Data & Knowledge Base Engineering",
      img: "/images/data_engineering_pipeline.png",
      summary: "Every document, contract, catalogue and brochure indexed into a unified vector store and knowledge graph.",
      points: ["Warehouse & lakehouse design", "ETL & streaming pipelines", "Vector store knowledge graph", "Data quality contracts"]
    },
    {
      code: "T-06",
      title: "AI Governance & Department Agents",
      img: "/images/ai_governance_matrix.png",
      summary: "Dedicated departmental AI agents (Marketing, PR, Sales, HR, Finance) and Founder AI context engines.",
      points: ["Department-wise AI agent suite", "Executive Founder AI assistant", "Internal AI policy & governance", "Capability audits & readiness scoring"]
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
    <section style={{ padding: '100px 0', backgroundColor: '#09090C', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', backgroundColor: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.4)', fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', color: '#00E5FF', textTransform: 'uppercase', marginBottom: '16px' }}>
            <Cpu size={16} /> TYPTWO TECH • COMPLETE FEATURE MATRIX
          </div>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', marginBottom: '16px' }}>
            Engineering Intelligent Operations
          </h2>
          <p style={{ fontSize: '16px', color: '#908F9D', lineHeight: 1.6 }}>
            All 6 core technology modules with 100% unique 3D visual representations & Local LLM architecture.
          </p>

          {/* Interactive Mode Switcher */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '32px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('features')}
              style={{
                padding: '10px 20px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                backgroundColor: activeTab === 'features' ? '#00E5FF' : 'rgba(255,255,255,0.05)',
                color: activeTab === 'features' ? '#040404' : '#908F9D',
                boxShadow: activeTab === 'features' ? '0 0 20px rgba(0,229,255,0.5)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              All 6 Tech Services (Unique 3D Renders)
            </button>

            <button
              onClick={() => setActiveTab('rag')}
              style={{
                padding: '10px 20px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                backgroundColor: activeTab === 'rag' ? '#00E5FF' : 'rgba(255,255,255,0.05)',
                color: activeTab === 'rag' ? '#040404' : '#908F9D',
                boxShadow: activeTab === 'rag' ? '0 0 20px rgba(0,229,255,0.5)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              Live Vector RAG Simulator
            </button>

            <button
              onClick={() => setActiveTab('security')}
              style={{
                padding: '10px 20px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                backgroundColor: activeTab === 'security' ? '#00E5FF' : 'rgba(255,255,255,0.05)',
                color: activeTab === 'security' ? '#040404' : '#908F9D',
                boxShadow: activeTab === 'security' ? '0 0 20px rgba(0,229,255,0.5)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              Zero-Trust Security Matrix
            </button>
          </div>
        </div>

        {/* TAB 1: ALL 6 TECH SERVICES WITH UNIQUE 3D RENDERS */}
        {activeTab === 'features' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            {techServices.map((s) => (
              <div key={s.code} style={{ backgroundColor: '#111115', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '18px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                  <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8) contrast(1.1)' }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, #111115 0%, transparent 60%)' }} />
                  <span style={{ position: 'absolute', top: '16px', left: '16px', fontSize: '11px', fontWeight: 800, color: '#00E5FF', backgroundColor: 'rgba(17,17,21,0.85)', border: '1px solid rgba(0,229,255,0.4)', padding: '4px 12px', borderRadius: '9999px' }}>
                    {s.code}
                  </span>
                </div>

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>{s.title}</h3>
                    <p style={{ fontSize: '14px', color: '#908F9D', lineHeight: 1.6, marginBottom: '20px' }}>{s.summary}</p>
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                    {s.points.map((pt, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#FFFFFF' }}>
                        <CheckCircle2 size={14} color="#00E5FF" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: LIVE VECTOR RAG SIMULATOR */}
        {activeTab === 'rag' && (
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px', backgroundColor: '#111115', border: '1px solid rgba(0,229,255,0.4)', borderRadius: '24px', boxShadow: '0 0 40px rgba(0,229,255,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00E5FF', fontSize: '14px', fontWeight: 700, marginBottom: '24px' }}>
              <Search size={20} />
              <span>INTERACTIVE PRIVATE VECTOR RAG SIMULATOR</span>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={ragQuery}
                onChange={(e) => setRagQuery(e.target.value)}
                style={{ flex: 1, minWidth: '240px', padding: '12px 16px', borderRadius: '12px', backgroundColor: '#000000', border: '1px solid rgba(255,255,255,0.15)', color: '#FFFFFF', fontSize: '14px', outline: 'none' }}
              />
              <button
                onClick={handleRunQuery}
                disabled={isQuerying}
                style={{ padding: '12px 24px', borderRadius: '12px', backgroundColor: '#00E5FF', color: '#040404', fontWeight: 800, fontSize: '14px', border: 'none', cursor: 'pointer' }}
              >
                {isQuerying ? 'Querying Vector Engine...' : 'Run Query'}
              </button>
            </div>

            {ragResult && (
              <div style={{ padding: '24px', borderRadius: '12px', backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(0,229,255,0.3)', fontSize: '13px', fontFamily: 'monospace', color: '#00E5FF', lineHeight: 1.6, whitespace: 'pre-line' }}>
                {ragResult}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ZERO-TRUST SECURITY */}
        {activeTab === 'security' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ padding: '32px', backgroundColor: '#111115', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Lock size={36} color="#00E5FF" style={{ marginBottom: '16px' }} />
              <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>Air-Gapped VPC</h4>
              <p style={{ fontSize: '14px', color: '#908F9D', lineHeight: 1.6 }}>0 KB data egress. Open-weight models running inside your cloud perimeter.</p>
            </div>

            <div style={{ padding: '32px', backgroundColor: '#111115', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ShieldCheck size={36} color="#00E5FF" style={{ marginBottom: '16px' }} />
              <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>ACL Permission Inheritance</h4>
              <p style={{ fontSize: '14px', color: '#908F9D', lineHeight: 1.6 }}>Role-scoped vector search inherited directly from your identity provider.</p>
            </div>

            <div style={{ padding: '32px', backgroundColor: '#111115', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Terminal size={36} color="#00E5FF" style={{ marginBottom: '16px' }} />
              <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>Token Audit Logging</h4>
              <p style={{ fontSize: '14px', color: '#908F9D', lineHeight: 1.6 }}>Every inference step logged and auditable for strict compliance standards.</p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
