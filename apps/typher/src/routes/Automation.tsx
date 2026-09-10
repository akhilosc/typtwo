import React, { useState } from 'react';
import { SectionLabel } from '../components/ui/SectionLabel';
import { TerminalBlock } from '../components/interactive/TerminalBlock';
import { Workflow, Play, RotateCw, CheckCircle2, ArrowRight, Bot, Mail, Database, Bell, Cpu } from 'lucide-react';

export const Automation: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  const workflowSteps = [
    { num: '01', title: 'EMAIL RECEIVED', icon: Mail, desc: 'Inbound customer RFP inquiry detected in local mailbox', payload: 'Subject: Enterprise 50-node deployment RFP' },
    { num: '02', title: 'UNDERSTAND', icon: Cpu, desc: 'Typher 14B parses requirements, timeline, and seat count', payload: 'Parsed: 50 seats, On-prem Kubernetes, Air-gap required' },
    { num: '03', title: 'RETRIEVE', icon: Database, desc: 'Local vector search queries pricing & hardware requirements archive', payload: 'Matched: Tier 3 Enterprise Sovereign Profile' },
    { num: '04', title: 'DECIDE', icon: Bot, desc: 'Calculates VRAM requirements and drafts tailored architectural proposal', payload: 'Decision: Approved configuration (16x RTX 4090 cluster)' },
    { num: '05', title: 'CALL TOOL', icon: Workflow, desc: 'Executes sandboxed JSON function to generate formal PDF quote', payload: 'Tool: generate_enterprise_quote(quote_id="Q-8821")' },
    { num: '06', title: 'UPDATE CRM', icon: Database, desc: 'Synchronizes deal stage and attached proposal to local CRM database', payload: 'CRM record #14920 updated to "Proposal Sent"' },
    { num: '07', title: 'NOTIFY TEAM', icon: Bell, desc: 'Dispatches internal alert to engineering lead on local communication channel', payload: 'Notification: "Enterprise RFP Q-8821 prepared and staged."' },
  ];

  const handleRunWorkflow = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(1);

    let current = 1;
    const interval = setInterval(() => {
      current += 1;
      if (current <= workflowSteps.length) {
        setActiveStep(current);
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 700);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <SectionLabel label="AUTONOMOUS WORKFLOWS // AGENTIC EXECUTION" />
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
            DON'T JUST ASK AI. <br />
            LET IT ACT.
          </h1>
          <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
            Typher orchestrates end-to-end multi-step autonomous workflows with strict JSON grammar validation, sandboxed tool executions, and zero cloud latency.
          </p>
        </div>

        <button
          onClick={handleRunWorkflow}
          disabled={isRunning}
          className="px-6 py-3 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500 text-cyan-300 font-mono text-xs tracking-wider transition-all flex items-center gap-2 shadow-glow-cyan disabled:opacity-50 self-start sm:self-auto"
        >
          {isRunning ? (
            <>
              <RotateCw className="w-4 h-4 animate-spin text-cyan-400" />
              RUNNING WORKFLOW...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-cyan-400 text-cyan-400" />
              TRIGGER WORKFLOW ENGINE
            </>
          )}
        </button>
      </div>

      {/* Sequential Node Workflow Visualizer */}
      <section className="machine-panel p-6 sm:p-10 rounded-2xl border border-machine-750 corner-brackets space-y-6">
        <div className="text-xs text-machine-400 uppercase tracking-widest font-semibold border-b border-machine-800 pb-3 flex items-center justify-between">
          <span>7-STAGE DETERMINISTIC AGENTIC LOOP</span>
          <span className="text-emerald-400 font-bold">
            {isRunning ? `● EXECUTING STEP 0${activeStep}` : activeStep === 7 ? '● WORKFLOW COMPLETED' : '● IDLE'}
          </span>
        </div>

        <div className="space-y-3">
          {workflowSteps.map((step, idx) => {
            const stepNum = idx + 1;
            const isCurrent = activeStep === stepNum;
            const isCompleted = activeStep > stepNum || (!isRunning && activeStep === 7);
            const Icon = step.icon;

            return (
              <div
                key={step.num}
                className={`p-4 rounded-xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCurrent
                    ? 'bg-machine-850 border-cyan-400 shadow-glow-cyan text-machine-100 scale-[1.01]'
                    : isCompleted
                    ? 'bg-machine-900/90 border-emerald-700/60 text-machine-200'
                    : 'bg-machine-900/40 border-machine-850 text-machine-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg border ${
                    isCurrent ? 'bg-cyan-950 border-cyan-500 text-cyan-300' : isCompleted ? 'bg-emerald-950 border-emerald-700 text-emerald-400' : 'bg-machine-950 border-machine-800 text-machine-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs">{step.num} // {step.title}</span>
                      {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      {isCurrent && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
                    </div>
                    <div className="text-xs font-sans text-machine-400 mt-0.5">{step.desc}</div>
                  </div>
                </div>

                <div className="sm:text-right font-mono text-[11px] text-cyan-300 bg-machine-950 px-3 py-1.5 rounded border border-machine-800 shrink-0">
                  {step.payload}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Code Definition */}
      <section className="space-y-4">
        <SectionLabel label="DECLARATIVE WORKFLOW SPECIFICATION" />
        <TerminalBlock
          title="WORKFLOW YAML DEFINITION"
          code={`name: "enterprise_rfp_automation"
trigger:
  type: "inbound_email"
  filter: "subject contains 'RFP' or 'Enterprise Quote'"

steps:
  - id: "parse_requirements"
    model: "typher-14b"
    instruction: "Extract seat count, hosting model, and compliance mandates into JSON schema."

  - id: "query_pricing"
    action: "rag_retrieve"
    collection: "enterprise_pricing_matrix"
    query: "{{parse_requirements.output.summary}}"

  - id: "generate_proposal"
    model: "typher-14b"
    instruction: "Draft architectural topology and formal quote based on retrieved pricing."

  - id: "execute_tool"
    tool: "generate_pdf_contract"
    parameters:
      proposal_data: "{{generate_proposal.output}}"`}
          language="yaml"
        />
      </section>

    </div>
  );
};
