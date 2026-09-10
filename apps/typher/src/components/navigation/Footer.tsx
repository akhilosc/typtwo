import React from 'react';
import { ArrowUpRight, Terminal, Shield, Cpu, Activity } from 'lucide-react';
import { TypherCoreMini } from '../core/TypherCoreMini';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-machine-950 border-t border-machine-800 text-machine-400 font-mono text-xs relative overflow-hidden">
      {/* Top Technical Telemetry Rail */}
      <div className="border-b border-machine-900 bg-machine-900/40 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[11px] text-machine-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-machine-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SOVEREIGN RUNTIME ACTIVE
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">HARDWARE BOUND: METAL 3 / CUDA 12.4</span>
          </div>
          <div className="flex items-center gap-6">
            <span>SOCKET: 127.0.0.1:11434</span>
            <span>MEMORY MAP: MMAP ZERO-COPY</span>
            <span>AIR-GAP: VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <TypherCoreMini size={32} />
              <div>
                <span className="font-display font-bold text-xl tracking-wider text-machine-100">
                  TYPHER
                </span>
                <div className="text-[10px] tracking-widest text-cyan-400">
                  LOCAL COMPUTATIONAL PLATFORM
                </div>
              </div>
            </div>

            <p className="text-sm font-sans text-machine-400 max-w-sm leading-relaxed">
              High-performance local language model execution engine. Run, connect, and orchestrate frontier machine intelligence on your own physical silicon with zero cloud exfiltration.
            </p>

            <div className="pt-2">
              <div className="text-[11px] text-machine-500 uppercase tracking-widest font-semibold mb-1">
                BRAND LINEAGE
              </div>
              <div className="text-sm font-display text-machine-200 flex items-center gap-2">
                TYPHER
                <span className="text-machine-500 font-mono text-xs">//</span>
                <span className="text-machine-400 text-xs font-mono">A PRODUCT OF</span>
                <a
                  href="https://typtwo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 underline decoration-cyan-700/50 underline-offset-4"
                >
                  TYPTWO
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 1: ARCHITECTURE */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-machine-200 font-semibold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              SYSTEM
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('/system')} className="hover:text-cyan-300 transition-colors">
                  System Architecture
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/models')} className="hover:text-cyan-300 transition-colors">
                  Model Explorer
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/runtime')} className="hover:text-cyan-300 transition-colors">
                  Runtime & Execution
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/features')} className="hover:text-cyan-300 transition-colors">
                  Machine Components
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/playground')} className="hover:text-cyan-300 transition-colors">
                  Interactive Console
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: DEVELOPERS & DOCS */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-machine-200 font-semibold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              DEVELOPERS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('/docs')} className="hover:text-cyan-300 transition-colors">
                  Documentation
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/developers')} className="hover:text-cyan-300 transition-colors">
                  CLI & REST API
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/download')} className="hover:text-cyan-300 transition-colors">
                  Download Binaries
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/changelog')} className="hover:text-cyan-300 transition-colors">
                  Release Changelog
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/blog')} className="hover:text-cyan-300 transition-colors">
                  Engineering Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: ENTERPRISE & SECURITY */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-machine-200 font-semibold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              ASSURANCE
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('/enterprise')} className="hover:text-cyan-300 transition-colors">
                  Private Enterprise
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/security')} className="hover:text-cyan-300 transition-colors">
                  Zero-Exfil Security
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/use-cases')} className="hover:text-cyan-300 transition-colors">
                  Workflows & Cases
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/pricing')} className="hover:text-cyan-300 transition-colors">
                  Deployment Tiers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/status')} className="hover:text-cyan-300 transition-colors">
                  Infrastructure Status
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/contact')} className="hover:text-cyan-300 transition-colors">
                  Secure Channels
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-machine-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-machine-500">
          <div>
            © {new Date().getFullYear()} TYPHER. All rights reserved. A technology product of Typtwo.
          </div>
          <div className="flex items-center gap-6">
            <span>DOMAIN: typher.typtwo.com</span>
            <span className="text-emerald-400">● AIR-GAP READY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
