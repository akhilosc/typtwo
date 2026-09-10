import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  language: string;
  code: string;
}

interface TerminalBlockProps {
  title?: string;
  tabs?: TabItem[];
  code?: string;
  language?: string;
  className?: string;
}

export const TerminalBlock: React.FC<TerminalBlockProps> = ({
  title = 'TERMINAL // LOCAL COMMAND BUS',
  tabs,
  code,
  language = 'bash',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const defaultTabs: TabItem[] = [
    {
      id: 'cli',
      label: 'TYPHER CLI',
      language: 'bash',
      code: `# Install Typher CLI & daemon binary
curl -fsSL https://typher.typtwo.com/install.sh | bash

# Pull and start local 14B frontier model
typher pull typher-14b

# Launch interactive zero-latency chat
typher run typher-14b --ctx 32768 --temp 0.2`
    },
    {
      id: 'python',
      label: 'PYTHON SDK',
      language: 'python',
      code: `from typher import TypherClient

client = TypherClient(base_url="http://127.0.0.1:11434")

# Stream tokens directly from local hardware
stream = client.chat.create(
    model="typher-14b",
    messages=[{"role": "user", "content": "Optimize Rust async mutex."}],
    stream=True,
    temperature=0.3
)

for chunk in stream:
    print(chunk.delta, end="", flush=True)`
    },
    {
      id: 'typescript',
      label: 'TYPESCRIPT',
      language: 'typescript',
      code: `import { Typher } from '@typtwo/typher';

const client = new Typher({ host: 'http://localhost:11434' });

const response = await client.generate({
  model: 'typher-14b',
  prompt: 'Generate an ultra-fast HNSW vector index in C++20.',
  temperature: 0.2,
  stream: true,
});

for await (const token of response) {
  process.stdout.write(token.text);
}`
    },
    {
      id: 'curl',
      label: 'cURL REST',
      language: 'bash',
      code: `curl http://127.0.0.1:11434/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "typher-14b",
    "messages": [
      {"role": "system", "content": "You are Typher local intelligence."},
      {"role": "user", "content": "Explain unified memory bandwidth."}
    ],
    "stream": true,
    "temperature": 0.2
  }'`
    }
  ];

  const currentTabs = tabs || defaultTabs;
  const currentCode = code || currentTabs[activeTab]?.code || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`machine-panel rounded-xl border border-machine-700/80 overflow-hidden font-mono text-xs ${className}`}>
      {/* Header Bar */}
      <div className="bg-machine-900 px-4 py-2.5 border-b border-machine-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] text-machine-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            {title}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="px-2.5 py-1 rounded bg-machine-800 hover:bg-machine-750 border border-machine-700 text-machine-300 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">COPIED</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs Navigation (if multiple tabs exist) */}
      {!code && currentTabs.length > 1 && (
        <div className="bg-machine-950 px-4 pt-2 border-b border-machine-800/80 flex gap-2 overflow-x-auto">
          {currentTabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-1.5 border-b-2 font-mono text-[11px] tracking-wider uppercase transition-all whitespace-nowrap ${
                activeTab === idx
                  ? 'border-cyan-400 text-cyan-300 font-semibold bg-machine-900/60 rounded-t'
                  : 'border-transparent text-machine-500 hover:text-machine-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Code Body */}
      <div className="p-4 bg-machine-950/95 overflow-x-auto text-machine-200 leading-relaxed font-mono">
        <pre className="text-xs sm:text-sm">
          <code>{currentCode}</code>
        </pre>
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 bg-machine-900/60 border-t border-machine-800/80 flex items-center justify-between text-[11px] text-machine-500">
        <span>RUNTIME: TYPHER DAEMON v2.4</span>
        <span className="text-emerald-400">● OFFLINE VERIFIED</span>
      </div>
    </div>
  );
};
