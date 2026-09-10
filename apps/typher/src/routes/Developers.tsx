import React from 'react';
import { TerminalBlock } from '../components/interactive/TerminalBlock';
import { Terminal, Code, Cpu, Workflow, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export const Developers: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
          <Code className="w-4 h-4" />
          <span>DEVELOPER PROTOCOL // SDKs, CLI & APIS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
          BUILD ON THE MACHINE.
        </h1>
        <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
          Embed local machine intelligence directly into your software. Use our native CLI, official Python/TypeScript SDKs, or standard OpenAI-compatible REST endpoints.
        </p>
      </div>

      {/* Main Terminal Block */}
      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs text-machine-400 border-b border-machine-800 pb-2">
          <span className="tech-label text-cyan-300">INTERACTIVE MULTI-LANGUAGE SDK MATRIX</span>
          <span>COMPATIBLE WITH OPENAI LIBRARIES</span>
        </div>
        <TerminalBlock />
      </section>

      {/* 3 Developer Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="machine-panel p-6 rounded-xl border border-machine-800 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <Terminal className="w-4 h-4" />
            <span>01 // NATIVE CLI</span>
          </div>
          <h3 className="font-display font-bold text-base text-machine-100">
            Rapid Command-Line Orchestration
          </h3>
          <p className="text-xs font-sans text-machine-300 leading-relaxed">
            Manage weights, inspect GPU memory maps, launch zero-latency chat streams, and benchmark hardware performance directly from your terminal.
          </p>
          <div className="pt-2 text-[11px] text-cyan-400">
            \`typher run typher-14b\`
          </div>
        </div>

        <div className="machine-panel p-6 rounded-xl border border-machine-800 space-y-3">
          <div className="flex items-center gap-2 text-sky-400 font-bold">
            <Workflow className="w-4 h-4" />
            <span>02 // REST & gRPC API</span>
          </div>
          <h3 className="font-display font-bold text-base text-machine-100">
            Drop-In OpenAI Compatibility
          </h3>
          <p className="text-xs font-sans text-machine-300 leading-relaxed">
            Change only the \`baseURL\` in your existing OpenAI SDK client to \`http://127.0.0.1:11434/v1\` to switch instantly from cloud billing to free local compute.
          </p>
          <div className="pt-2 text-[11px] text-sky-400">
            POST /v1/chat/completions
          </div>
        </div>

        <div className="machine-panel p-6 rounded-xl border border-machine-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <Cpu className="w-4 h-4" />
            <span>03 // TYPE-SAFE SDKs</span>
          </div>
          <h3 className="font-display font-bold text-base text-machine-100">
            Python, TypeScript & Go
          </h3>
          <p className="text-xs font-sans text-machine-300 leading-relaxed">
            Official asynchronous SDKs with full streaming support, automatic JSON grammar validation, and embedded vector store bindings.
          </p>
          <div className="pt-2 text-[11px] text-emerald-400">
            npm install @typtwo/typher
          </div>
        </div>
      </section>

      {/* Structured Tool Calling / Agent Example */}
      <section className="space-y-4">
        <div className="border-b border-machine-800 pb-2">
          <span className="tech-label text-cyan-400">JSON GRAMMAR SCHEMA ENFORCEMENT</span>
          <h2 className="text-xl font-display font-bold text-machine-100 mt-1">
            STRUCTURED TOOL CALLING EXAMPLE
          </h2>
        </div>
        <TerminalBlock
          title="AGENT TOOL INVOCATION SPECIFICATION"
          code={`import { Typher } from '@typtwo/typher';

const client = new Typher();

const response = await client.chat({
  model: 'typher-14b',
  messages: [{ role: 'user', content: 'Scan the repository for memory leaks.' }],
  tools: [
    {
      type: 'function',
      function: {
        name: 'scan_workspace',
        description: 'Runs AST memory profiling tool on specified path',
        parameters: {
          type: 'object',
          properties: {
            target_directory: { type: 'string' },
            deep_heap_analysis: { type: 'boolean' }
          },
          required: ['target_directory']
        }
      }
    }
  ],
  tool_choice: 'auto'
});

console.log(response.message.tool_calls[0]);
// Output guaranteed 100% compliant with JSON schema via logit masking.`}
          language="typescript"
        />
      </section>

    </div>
  );
};
