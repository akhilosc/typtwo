import React, { useState, useRef, useEffect } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { TYPHER_MODELS } from '../data/modelsData';
import { TypherCoreMini } from '../components/core/TypherCoreMini';
import { SystemStatus } from '../components/telemetry/SystemStatus';
import { 
  Send, 
  RotateCcw, 
  Sliders, 
  Terminal, 
  Cpu, 
  HardDrive, 
  Zap, 
  Layers, 
  Sparkles, 
  Copy, 
  Check, 
  Play, 
  Square,
  Activity,
  Code
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  tokensGenerated?: number;
  tokensPerSec?: number;
}

export const Playground: React.FC = () => {
  const { telemetry, coreState, setCoreState, setModel, triggerInferenceBurst } = useTelemetry();
  
  const [selectedModelId, setSelectedModelId] = useState('typher-14b');
  const [temperature, setTemperature] = useState(0.2);
  const [topP, setTopP] = useState(0.9);
  const [contextWindow, setContextWindow] = useState(16384);
  const [systemPrompt, setSystemPrompt] = useState('You are TYPHER, a deterministic local machine intelligence runtime operating on sovereign physical hardware.');
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'sys-1',
      role: 'assistant',
      content: `TYPHER LOCAL MACHINE CONSOLE READY.
Connected to local socket \`127.0.0.1:11434\` via Metal 3 / CUDA zero-copy pipeline.
Model loaded: **TYPHER 14B Q4_K_M** (14.77B Parameters).

Type a prompt or select a quick template to start real-time local streaming inference.`,
      timestamp: '00:00:01',
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const handleModelChange = (id: string) => {
    setSelectedModelId(id);
    setModel(id);
  };

  const sampleTemplates = [
    { label: 'Rust Zero-Copy Parser', prompt: 'Write a high-performance zero-copy binary parser in Rust using nom.' },
    { label: 'Explain KV-Cache Paging', prompt: 'How does vLLM-style paged KV-cache memory allocation eliminate fragmentation?' },
    { label: 'JSON Tool Calling Schema', prompt: 'Generate a strict JSON schema for an autonomous file search and git inspection tool.' },
    { label: 'Local Security Model', prompt: 'Contrast zero-exfiltration local LLM inference against centralized cloud APIs.' },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || isStreaming) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsStreaming(true);
    setCoreState('processing');

    // Generate response text
    let responseText = '';
    if (text.toLowerCase().includes('rust') || text.toLowerCase().includes('zero-copy')) {
      responseText = `Here is a zero-copy binary header parser implemented in Rust using memory slices and \`bytemuck\`:

\`\`\`rust
use std::mem::size_of;

#[repr(C, packed)]
#[derive(Debug, Clone, Copy)]
pub struct PacketHeader {
    pub magic: [u8; 4],
    pub version: u16,
    pub payload_len: u32,
    pub checksum: u64,
}

impl PacketHeader {
    /// Zero-copy cast from raw byte slice without heap allocation
    #[inline(always)]
    pub fn from_slice(bytes: &[u8]) -> Result<&Self, &'static str> {
        if bytes.len() < size_of::<PacketHeader>() {
            return Err("Buffer underflow: slice too short for PacketHeader");
        }
        
        // Direct cast referencing original memory buffer
        let header_ptr = bytes.as_ptr() as *const PacketHeader;
        unsafe { Ok(&*header_ptr) }
    }
}
\`\`\`

### Execution Performance:
* **Heap Allocation**: \`0 bytes\`
* **Throughput**: \`>18.4 GB/s\` on Apple Silicon / NVMe bus
* **Latency**: \`<4 nanoseconds\` per packet header lookup.`;
    } else if (text.toLowerCase().includes('kv-cache') || text.toLowerCase().includes('cache')) {
      responseText = `### Paged KV-Cache Memory Management

In classical autoregressive inference, Key-Value (KV) tensors for all attention layers must be retained in memory for every token in the context window.

1. **The Fragmentation Problem**: Naive contiguous memory allocation suffers from severe internal/external fragmentation (up to 60-80% memory waste) because sequence lengths are dynamic.
2. **Virtual Memory Paging**: Typher divides KV-cache into fixed-size physical blocks (e.g., 16 tokens per block).
3. **Block Table Lookups**: Logical token positions map to non-contiguous physical DRAM pages via a hardware page table.
4. **Result**: Zero memory waste, 3.2x higher batch concurrency, and near-zero OOM risks even at 64k token context windows.`;
    } else if (text.toLowerCase().includes('json') || text.toLowerCase().includes('tool')) {
      responseText = `\`\`\`json
{
  "name": "inspect_local_workspace",
  "description": "Reads local project tree and git commit status within the sandboxed directory",
  "parameters": {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "The relative directory path to inspect"
      },
      "include_git_diff": {
        "type": "boolean",
        "description": "Whether to return uncommitted local git diffs"
      }
    },
    "required": ["path"]
  }
}
\`\`\`

Typher guarantees 100% grammar conformance by constraining token logits directly against the BNF grammar tree at inference time.`;
    } else {
      responseText = `**TYPHER INFERENCE ANALYSIS** [Model: ${selectedModelId.toUpperCase()}]

Processing prompt: *"${text}"*

### Computational Breakdown:
1. **Context Vectorization**: Input parsed through vocabulary embedding table into high-dimensional semantic coordinates.
2. **Multi-Head Self-Attention**: 32 attention heads evaluated with FlashInfer 2.0 kernel acceleration on unified GPU memory.
3. **Deterministic Output**: Sampling completed at temperature \`${temperature}\` with top-p \`${topP}\`.

Local execution finished in **18.2 ms TTFT** with zero network egress. All data remains exclusively on local silicon registers.`;
    }

    // Stream the response
    const assistantId = `assistant-${Date.now()}`;
    const assistantMsg: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString(),
      tokensGenerated: 0,
      tokensPerSec: telemetry.tokensPerSec || 64.2,
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setCoreState('inferring');

    let charIdx = 0;
    const streamInterval = setInterval(() => {
      charIdx += 6;
      if (charIdx <= responseText.length) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: responseText.slice(0, charIdx), tokensGenerated: Math.round(charIdx / 4) }
              : msg
          )
        );
      } else {
        clearInterval(streamInterval);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: responseText, tokensGenerated: Math.round(responseText.length / 4) }
              : msg
          )
        );
        setIsStreaming(false);
        setCoreState('idle');
      }
    }, 20);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-machine-950 pt-20 pb-12 px-4 sm:px-6 lg:px-8 font-mono text-xs text-machine-200 tech-grid">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Console Header Bar */}
        <div className="machine-panel p-4 rounded-xl border border-machine-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <TypherCoreMini size={32} />
            <div>
              <div className="text-sm font-display font-bold text-machine-100 flex items-center gap-2">
                TYPHER INTERACTIVE PLAYGROUND
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700/50 text-cyan-300 font-mono">
                  DIRECT CONSOLE
                </span>
              </div>
              <div className="text-[10px] text-machine-500 uppercase">
                SOCKET: 127.0.0.1:11434 // NATIVE COMPUTE PIPELINE
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SystemStatus />
            <button
              onClick={() => setMessages([messages[0]])}
              className="p-2 rounded bg-machine-900 hover:bg-machine-800 border border-machine-800 text-machine-400 hover:text-machine-200 transition-colors flex items-center gap-1.5"
              title="Reset Console Session"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CLEAR SESSION</span>
            </button>
          </div>
        </div>

        {/* 3-Column Layout: Parameters | Chat Console | Live Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* LEFT: Model & Hyperparameters Controls */}
          <div className="lg:col-span-3 space-y-4">
            <div className="machine-panel p-4 rounded-xl border border-machine-800/90 corner-brackets space-y-4">
              <div className="flex items-center justify-between border-b border-machine-800 pb-2 text-machine-300 font-bold">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  MODEL PARAMETERS
                </span>
              </div>

              {/* Model Picker */}
              <div>
                <label className="tech-label block mb-1.5">ACTIVE MODEL WEIGHT</label>
                <div className="space-y-1.5">
                  {TYPHER_MODELS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleModelChange(m.id)}
                      className={`w-full p-2 rounded border text-left font-mono transition-all flex items-center justify-between ${
                        selectedModelId === m.id
                          ? 'bg-cyan-950 border-cyan-500/80 text-cyan-300 font-bold shadow-sm'
                          : 'bg-machine-900 border-machine-800 text-machine-400 hover:text-machine-200'
                      }`}
                    >
                      <span>{m.name}</span>
                      <span className="text-[10px] opacity-70">{m.parameters.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperature Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="tech-label">TEMPERATURE</span>
                  <span className="text-cyan-400 font-bold">{temperature.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1.5"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-machine-900 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-machine-500">
                  <span>DETERMINISTIC</span>
                  <span>CREATIVE</span>
                </div>
              </div>

              {/* Top-P Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="tech-label">TOP-P (NUCLEUS)</span>
                  <span className="text-cyan-400 font-bold">{topP.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={topP}
                  onChange={(e) => setTopP(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-machine-900 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Context Limit */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="tech-label">MAX CONTEXT (TOKENS)</span>
                  <span className="text-machine-200">{contextWindow.toLocaleString()}</span>
                </div>
                <select
                  value={contextWindow}
                  onChange={(e) => setContextWindow(parseInt(e.target.value))}
                  className="w-full bg-machine-950 border border-machine-800 rounded p-2 text-xs text-machine-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value={4096}>4,096 tokens</option>
                  <option value={8192}>8,192 tokens</option>
                  <option value={16384}>16,384 tokens (Standard)</option>
                  <option value={32768}>32,768 tokens (High)</option>
                  <option value={65536}>65,536 tokens (Extended)</option>
                </select>
              </div>

              {/* System Prompt */}
              <div className="space-y-1">
                <label className="tech-label block">SYSTEM DIRECTIVE</label>
                <textarea
                  rows={3}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="w-full bg-machine-950 border border-machine-800 rounded p-2 text-[11px] text-machine-300 font-mono focus:outline-none focus:border-cyan-500 resize-none leading-normal"
                />
              </div>

            </div>

            {/* Quick Prompt Templates */}
            <div className="machine-panel p-4 rounded-xl border border-machine-800 space-y-2">
              <span className="tech-label block text-machine-500">QUICK BENCHMARK PROMPTS</span>
              <div className="space-y-1.5">
                {sampleTemplates.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(t.prompt)}
                    disabled={isStreaming}
                    className="w-full p-2 rounded bg-machine-900 hover:bg-machine-850 border border-machine-800 text-left text-[11px] text-machine-300 hover:text-cyan-300 transition-colors truncate block disabled:opacity-50"
                  >
                    ⚡ {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER: Main Chat Terminal Console */}
          <div className="lg:col-span-6 flex flex-col h-[700px] machine-panel rounded-xl border border-machine-750 overflow-hidden corner-brackets">
            {/* Terminal Header */}
            <div className="bg-machine-900 px-4 py-2.5 border-b border-machine-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold text-machine-200">
                  INFERENCE STREAM // LOCAL SHARD 0
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-machine-500">
                <span>{messages.length} MESSAGES</span>
                {isStreaming && (
                  <span className="text-cyan-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    STREAMING
                  </span>
                )}
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-machine-950/80 font-mono">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                  >
                    <div className="flex items-center gap-2 text-[10px] text-machine-500 px-1">
                      <span>{isUser ? 'CLIENT_USER' : `TYPHER_${selectedModelId.toUpperCase()}`}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`relative max-w-[92%] p-3.5 rounded-lg border text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? 'bg-cyan-950/40 border-cyan-700/50 text-cyan-100 rounded-tr-none'
                          : 'bg-machine-900/90 border-machine-800 text-machine-200 rounded-tl-none font-sans'
                      }`}
                    >
                      {msg.content}

                      {!isUser && msg.content && (
                        <div className="mt-3 pt-2 border-t border-machine-800 flex items-center justify-between text-[10px] font-mono text-machine-500">
                          <span>
                            {msg.tokensGenerated ? `${msg.tokensGenerated} TOKENS GENERATED` : 'COMPUTED ON METAL 3'}
                          </span>
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="hover:text-cyan-300 flex items-center gap-1 transition-colors"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">COPIED</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>COPY</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={chatBottomRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-machine-900 border-t border-machine-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  disabled={isStreaming}
                  placeholder="Send a prompt to the local machine..."
                  className="flex-1 bg-machine-950 border border-machine-800 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-machine-100 placeholder-machine-600 focus:outline-none focus:border-cyan-500 font-sans"
                />
                <button
                  type="submit"
                  disabled={isStreaming || !inputPrompt.trim()}
                  className="px-4 py-2.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500 text-cyan-300 font-mono text-xs flex items-center gap-1.5 transition-all disabled:opacity-50 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">EXECUTE</span>
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: Live Telemetry & Reactor State */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Live Synchronized Mini Reactor */}
            <div className="machine-panel p-5 rounded-xl border border-machine-800 text-center space-y-3">
              <span className="tech-label block text-machine-400">REACTOR COMPUTE CORE</span>
              <div className="flex justify-center py-2">
                <TypherCoreMini size={72} />
              </div>
              <div className="text-xs font-bold text-machine-100 tracking-wider">
                CORE STATE: <span className={coreState === 'inferring' ? 'text-cyan-400 animate-pulse' : 'text-emerald-400'}>{coreState.toUpperCase()}</span>
              </div>
              <div className="text-[10px] text-machine-500">
                {coreState === 'inferring' ? 'Streaming tensor weights to registers...' : 'System idling in low-power state'}
              </div>
            </div>

            {/* Live Metrics Matrix */}
            <div className="machine-panel p-4 rounded-xl border border-machine-800 space-y-3">
              <span className="tech-label block text-machine-400 border-b border-machine-800 pb-1.5">
                LIVE HARDWARE TELEMETRY
              </span>

              {/* Speedometer */}
              <div className="p-2.5 rounded bg-machine-900 border border-machine-800">
                <div className="flex items-center justify-between text-machine-500 mb-1">
                  <span className="tech-label">THROUGHPUT</span>
                  <Zap className="w-3 h-3 text-cyan-400" />
                </div>
                <div className="text-base font-bold text-cyan-300 text-glow-cyan">
                  {telemetry.tokensPerSec} <span className="text-xs text-machine-400">tok/s</span>
                </div>
              </div>

              {/* GPU Load */}
              <div className="p-2.5 rounded bg-machine-900 border border-machine-800">
                <div className="flex items-center justify-between text-machine-500 mb-1">
                  <span className="tech-label">GPU LOAD</span>
                  <Cpu className="w-3 h-3 text-cyan-400" />
                </div>
                <div className="text-base font-bold text-machine-100">
                  {telemetry.gpuUtilization}%
                </div>
                <div className="w-full bg-machine-950 h-1 rounded mt-1.5 overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full transition-all duration-300"
                    style={{ width: `${telemetry.gpuUtilization}%` }}
                  />
                </div>
              </div>

              {/* VRAM Allocation */}
              <div className="p-2.5 rounded bg-machine-900 border border-machine-800">
                <div className="flex items-center justify-between text-machine-500 mb-1">
                  <span className="tech-label">VRAM USAGE</span>
                  <HardDrive className="w-3 h-3 text-cyan-400" />
                </div>
                <div className="text-sm font-semibold text-machine-200">
                  {telemetry.vramUsageGb.toFixed(1)} / {telemetry.vramMaxGb.toFixed(0)} GB
                </div>
                <div className="text-[10px] text-machine-500 mt-0.5">MMAP Unified Memory</div>
              </div>

              {/* Time to First Token */}
              <div className="p-2.5 rounded bg-machine-900 border border-machine-800">
                <div className="flex items-center justify-between text-machine-500 mb-1">
                  <span className="tech-label">TTFT LATENCY</span>
                  <Activity className="w-3 h-3 text-cyan-400" />
                </div>
                <div className="text-sm font-semibold text-emerald-400">
                  {telemetry.latencyMs} ms
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
