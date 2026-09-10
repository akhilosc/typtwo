import React from 'react';
import { SectionLabel } from '../components/ui/SectionLabel';
import { Clock, ArrowRight, Zap, CheckCircle2, XCircle } from 'lucide-react';

export const Efficiency: React.FC = () => {
  const comparisons = [
    {
      title: 'ENGINEERING: PULL REQUEST CODE REVIEW & SECURITY AUDIT',
      before: ['Developer submits 2,000-line PR', 'Senior engineer context-switches for 45 mins', 'Manual static AST audit and test run', 'Feedback cycle takes 4–6 hours'],
      after: ['Developer creates PR', 'Typher AST agent reviews in 1.2s locally', 'Validates memory bounds & generates unit tests', 'Instant merge readiness score'],
      timeSaved: '75% faster review cycle',
    },
    {
      title: 'LEGAL: 300-PAGE M&A CONTRACT DUE DILIGENCE',
      before: ['Associate attorney reads 300 pages for 8 hours', 'Manual redlining of non-standard indemnities', 'High risk of missed clause variations', 'Total cost: $4,500 in billable hours'],
      after: ['Typher 32B ingests contract into 128k context in 2.4s', 'Extracts 100% of risk deviations with exact citations', 'Drafts counter-redlines in 15 seconds locally', 'Total cost: $0 (Fixed hardware compute)'],
      timeSaved: '88% time reduction',
    },
    {
      title: 'OPERATIONS: CUSTOMER RFP SPECIFICATION COMPLIANCE',
      before: ['Sales engineer manually cross-checks 80 security questions', 'Queries 12 internal team leads for past responses', 'Takes 3–5 working days to draft proposal', 'Inconsistent technical answers'],
      after: ['Typher RAG queries internal knowledge base in 400ms', 'Auto-fills 100% of standard compliance questions', 'Flags 3 custom requirements for human review', 'Prepared in under 12 minutes'],
      timeSaved: '92% time reduction',
    },
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6">
        <SectionLabel label="OPERATIONAL EFFICIENCY // BEFORE & AFTER WORKFLOWS" />
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
          MAKE EVERY WORKFLOW LIGHTER.
        </h1>
        <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
          See how local deterministic AI transforms complex, labor-intensive organizational processes into sub-second automated pipelines.
        </p>
      </div>

      {/* Comparisons List */}
      <div className="space-y-8">
        {comparisons.map((comp, idx) => (
          <div
            key={idx}
            className="machine-panel p-6 sm:p-8 rounded-2xl border border-machine-750 corner-brackets space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-machine-800 pb-3">
              <span className="font-display font-bold text-sm sm:text-base text-machine-100">
                {comp.title}
              </span>
              <span className="px-3 py-1 rounded bg-cyan-950 border border-cyan-500/70 text-cyan-300 font-bold text-xs">
                ⚡ {comp.timeSaved}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              
              {/* BEFORE */}
              <div className="p-5 rounded-xl bg-red-950/10 border border-red-900/40 space-y-3">
                <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
                  <XCircle className="w-4 h-4" />
                  <span>LEGACY MANUAL WORKFLOW</span>
                </div>
                <div className="space-y-2 text-xs font-sans text-machine-400">
                  {comp.before.map((b, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-red-400/80 font-mono text-[11px] mt-0.5">0{i+1}.</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AFTER */}
              <div className="p-5 rounded-xl bg-emerald-950/10 border border-emerald-700/50 space-y-3 shadow-glow-green">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>TYPHER LOCAL AUTOMATION PIPELINE</span>
                </div>
                <div className="space-y-2 text-xs font-sans text-machine-200">
                  {comp.after.map((a, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-mono text-[11px] mt-0.5">0{i+1}.</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
