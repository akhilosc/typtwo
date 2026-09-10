import React, { useState } from 'react';
import { SectionLabel } from '../components/ui/SectionLabel';
import { TerminalBlock } from '../components/interactive/TerminalBlock';
import { Bot, Layers, Database, Wrench, Clock, ShieldCheck, Play, CheckCircle2, ArrowRight } from 'lucide-react';

export const Agents: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string>('fs');

  const agentPillars = [
    { title: 'FOUNDATION MODEL', icon: Layers, desc: 'Typher 7B, 14B, or 32B with grammar-guided logit masking for 100% valid JSON function outputs.' },
    { title: 'LOCAL KNOWLEDGE', icon: Database, desc: 'Real-time HNSW vector memory and BM25 hybrid semantic retrieval over private local databases.' },
    { title: 'SANDBOXED TOOLS', icon: Wrench, desc: 'Native executable functions for file inspection, shell execution, AST refactoring, and database queries.' },
    { title: 'PERSISTENT MEMORY', icon: Clock, desc: 'Long-term session state preservation and episodic memory stores across multi-turn autonomous loops.' },
    { title: 'SECURITY POLICIES', icon: ShieldCheck, desc: 'Strict path sandboxing, human-in-the-loop approvals, and hard permission barriers.' },
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6">
        <SectionLabel label="AUTONOMOUS AGENTS // COMPOSABLE INTELLIGENCE" />
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
          INTELLIGENCE THAT CAN ACT.
        </h1>
        <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
          Typher transforms static language models into autonomous sovereign agents capable of executing tools, modifying code, and verifying outputs locally.
        </p>
      </div>

      {/* Agent Composition Architecture: Model + Knowledge + Tools + Memory + Policies -> Agent */}
      <section className="machine-panel p-8 rounded-2xl border border-machine-750 corner-brackets space-y-6">
        <div className="text-xs text-machine-400 uppercase tracking-widest font-semibold border-b border-machine-800 pb-3 flex items-center justify-between">
          <span>5-PILLAR AGENTIC COMPOSITION BLUEPRINT</span>
          <span className="text-cyan-400 font-bold">● ZERO EGRESS RUNTIME</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {agentPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="p-4 rounded-xl bg-machine-900 border border-machine-800 space-y-2 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded bg-machine-950 border border-machine-750 flex items-center justify-center text-cyan-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="font-display font-bold text-xs text-machine-100">{p.title}</div>
                  <p className="text-[11px] font-sans text-machine-400 leading-relaxed">{p.desc}</p>
                </div>
                <div className="text-[9px] text-cyan-400 font-mono pt-2 border-t border-machine-850">
                  PILLAR 0{idx + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Synthesis Result */}
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/70 shadow-glow-cyan text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6 text-cyan-300" />
            <div className="text-left">
              <div className="font-display font-bold text-sm text-machine-100">
                RESULT: AUTONOMOUS DETERMINISTIC LOCAL AGENT
              </div>
              <div className="text-[11px] text-cyan-300 font-sans">
                Full reasoning, tool calling, and self-correction running at sub-20ms latency on local silicon.
              </div>
            </div>
          </div>
          <span className="text-[10px] px-3 py-1 rounded bg-machine-900 border border-cyan-700/50 text-emerald-400 font-bold shrink-0">
            ● 100% AIR-GAP SAFE
          </span>
        </div>
      </section>

      {/* Interactive Tool Calling Sandbox */}
      <section className="space-y-4">
        <SectionLabel label="AGENT TOOL CALLING PROTOCOL" />
        <TerminalBlock
          title="AUTONOMOUS AGENT TOOL CALLING SESSION"
          code={`// 1. Agent receives objective:
"Inspect the current git workspace for memory leaks and generate a fix."

// 2. Typher 14B emits deterministic tool call:
{
  "name": "execute_ast_linter",
  "arguments": {
    "directory": "./src/runtime",
    "check_patterns": ["heap_alloc_in_hot_loop", "unbounded_channel"]
  }
}

// 3. Local sandbox executes in isolated process:
[LINTER] Found 1 issue in src/runtime/cache.rs:142 (Unbounded KV-cache channel buffer)

// 4. Agent inspects result and self-corrects:
"Refactoring cache.rs to use bounded RingBuffer with virtual memory paging."`}
          language="json"
        />
      </section>

    </div>
  );
};
