import React, { useState } from 'react';
import { TerminalBlock } from '../components/interactive/TerminalBlock';
import { Download as DownloadIcon, Apple, Cpu, Terminal, Server, Check, Copy } from 'lucide-react';

export const Download: React.FC = () => {
  const [copiedOs, setCopiedOs] = useState<string | null>(null);

  const platforms = [
    {
      id: 'macos',
      name: 'macOS',
      arch: 'Apple Silicon (M1/M2/M3/M4) & Intel',
      installCommand: 'curl -fsSL https://typher.typtwo.com/install.sh | bash',
      binaryUrl: '#',
      fileSize: '42.8 MB',
      driver: 'Metal 3 Native UMA Engine',
      minOs: 'macOS 13.0 (Ventura) or later'
    },
    {
      id: 'linux',
      name: 'Linux',
      arch: 'x86_64 & aarch64 (CUDA / ROCm / CPU)',
      installCommand: 'curl -fsSL https://typher.typtwo.com/install.sh | sh',
      binaryUrl: '#',
      fileSize: '58.1 MB',
      driver: 'CUDA 12+ / ROCm 6+ / AVX-512',
      minOs: 'glibc 2.31+ (Ubuntu 20.04+, Debian 11+)'
    },
    {
      id: 'windows',
      name: 'Windows',
      arch: 'x64 & ARM64 (DirectX 12 / CUDA / CPU)',
      installCommand: 'irm https://typher.typtwo.com/install.ps1 | iex',
      binaryUrl: '#',
      fileSize: '61.4 MB',
      driver: 'DirectML / NVIDIA CUDA WSL2',
      minOs: 'Windows 10 / 11 (64-bit)'
    },
    {
      id: 'docker',
      name: 'Docker',
      arch: 'Container Image (Multi-Arch)',
      installCommand: 'docker run -d --gpus all -v typher:/root/.typher -p 11434:11434 typtwo/typher:latest',
      binaryUrl: '#',
      fileSize: '180 MB',
      driver: 'NVIDIA Container Toolkit Ready',
      minOs: 'Docker 24.0+ Engine'
    }
  ];

  const handleCopy = (id: string, cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedOs(id);
    setTimeout(() => setCopiedOs(null), 2000);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
          <DownloadIcon className="w-4 h-4" />
          <span>BINARY DISTRIBUTIONS // CROSS-PLATFORM COMPUTE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
          PUT TYPHER ON YOUR MACHINE.
        </h1>
        <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
          Single standalone binary runtime. Zero external Python virtual environment dependencies. Installs in seconds and starts the local daemon.
        </p>
      </div>

      {/* 4 Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platforms.map((p) => (
          <div
            key={p.id}
            className="machine-panel p-6 rounded-xl border border-machine-750 corner-brackets space-y-4 hover:border-cyan-500/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-machine-800 pb-2">
                <div>
                  <h3 className="font-display font-bold text-lg text-machine-100">{p.name}</h3>
                  <div className="text-[10px] text-cyan-400">{p.arch}</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-machine-950 border border-machine-800 text-machine-300">
                  {p.fileSize}
                </span>
              </div>

              <div className="space-y-1 text-xs text-machine-300 font-sans">
                <div><strong className="font-mono text-machine-400">Driver Engine:</strong> {p.driver}</div>
                <div><strong className="font-mono text-machine-400">Requirements:</strong> {p.minOs}</div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-machine-800">
              <div className="text-[10px] text-machine-500 uppercase tracking-widest font-semibold">
                ONE-LINE INSTALL SCRIPT:
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-2.5 rounded bg-machine-950 border border-machine-800 text-[11px] text-cyan-300 font-mono truncate select-all">
                  {p.installCommand}
                </div>
                <button
                  onClick={() => handleCopy(p.id, p.installCommand)}
                  className="p-2.5 rounded bg-machine-850 hover:bg-machine-750 border border-machine-700 text-machine-300 hover:text-cyan-300 transition-colors"
                  title="Copy installation command"
                >
                  {copiedOs === p.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* First Run Guide */}
      <section className="space-y-4">
        <div className="border-b border-machine-800 pb-2">
          <span className="tech-label text-cyan-400">POST-INSTALLATION INITIALIZATION</span>
          <h2 className="text-xl font-display font-bold text-machine-100 mt-1">
            FIRST RUN EXECUTION SEQUENCE
          </h2>
        </div>
        <TerminalBlock
          title="FIRST RUN COMMANDS"
          code={`# 1. Pull the 7B parameter local model (takes ~30s on high speed network)
typher pull typher-7b

# 2. Start local streaming terminal session
typher run typher-7b

# 3. (Optional) Run daemon as system service
sudo typherd service install`}
          language="bash"
        />
      </section>

    </div>
  );
};
