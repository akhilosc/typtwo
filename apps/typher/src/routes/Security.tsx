import React from 'react';
import { ShieldCheck, Lock, XCircle, HardDrive, EyeOff, CheckCircle2 } from 'lucide-react';

export const Security: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
          <Lock className="w-4 h-4" />
          <span>SECURITY PROTOCOL // ZERO-EXFILTRATION ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
          YOUR DATA STAYS IN YOUR ENVIRONMENT.
        </h1>
        <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
          Typher is architected from the bare silicon upward to eliminate all third-party data transmission risks. When you run inference, compute is strictly bound to local memory.
        </p>
      </div>

      {/* Visual Security Boundary Model */}
      <section className="machine-panel p-8 rounded-xl border border-cyan-700/60 corner-brackets space-y-6 shadow-glow-cyan">
        <div className="text-xs text-machine-400 uppercase tracking-widest font-semibold border-b border-machine-800 pb-3 flex items-center justify-between">
          <span>PHYSICAL SECURITY BOUNDARY MODEL</span>
          <span className="text-emerald-400 font-bold">● HARD ISOLATION ENFORCED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Blocked Public Internet */}
          <div className="p-6 rounded-lg bg-red-950/20 border border-red-800/60 space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <XCircle className="w-5 h-5" />
              <span>PUBLIC CLOUD / INTERNET (BLOCKED)</span>
            </div>
            <p className="text-xs font-sans text-machine-300 leading-relaxed">
              Typher runtimes make zero outbound API calls, telemetry pings, or license checks. Network sockets are hard-disabled or locked to loopback (<code className="text-red-300">127.0.0.1</code>).
            </p>
            <div className="text-[10px] font-mono text-red-400 pt-2 border-t border-red-900/50">
              OUTBOUND EGRESS: 0 BYTES
            </div>
          </div>

          {/* Secure Local Environment */}
          <div className="p-6 rounded-lg bg-emerald-950/20 border border-emerald-700/60 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>YOUR LOCAL ENVIRONMENT (TRUSTED)</span>
            </div>
            <p className="text-xs font-sans text-machine-200 leading-relaxed">
              Weights, inputs, vector indexes, and output tokens reside entirely inside your physical device's DRAM. Direct GPU memory mapping with zero intermediate swap persistence.
            </p>
            <div className="text-[10px] font-mono text-emerald-400 pt-2 border-t border-emerald-900/50">
              PHYSICAL SILICON ENCLAVE: ACTIVE
            </div>
          </div>
        </div>
      </section>

      {/* 4 Security Guarantees */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="machine-panel p-6 rounded-xl border border-machine-800 space-y-3">
          <div className="w-9 h-9 rounded bg-machine-950 border border-machine-800 flex items-center justify-center text-cyan-400">
            <HardDrive className="w-4 h-4" />
          </div>
          <h3 className="font-display font-bold text-base text-machine-100">01 // ZERO DATA EXFILTRATION</h3>
          <p className="text-xs font-sans text-machine-300 leading-relaxed">
            Unlike cloud APIs where prompts are processed on remote multi-tenant clusters, Typher executes 100% locally.
          </p>
        </div>

        <div className="machine-panel p-6 rounded-xl border border-machine-800 space-y-3">
          <div className="w-9 h-9 rounded bg-machine-950 border border-machine-800 flex items-center justify-center text-sky-400">
            <EyeOff className="w-4 h-4" />
          </div>
          <h3 className="font-display font-bold text-base text-machine-100">02 // NO TRAINING ON DATA</h3>
          <p className="text-xs font-sans text-machine-300 leading-relaxed">
            Your proprietary codebase, documents, and interactions are never harvested for foundation model fine-tuning.
          </p>
        </div>

        <div className="machine-panel p-6 rounded-xl border border-machine-800 space-y-3">
          <div className="w-9 h-9 rounded bg-machine-950 border border-machine-800 flex items-center justify-center text-blue-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-display font-bold text-base text-machine-100">03 // AIR-GAP VERIFIED</h3>
          <p className="text-xs font-sans text-machine-300 leading-relaxed">
            Tested on physically disconnected workstations with unplugged ethernet and disabled Wi-Fi modules.
          </p>
        </div>

        <div className="machine-panel p-6 rounded-xl border border-machine-800 space-y-3">
          <div className="w-9 h-9 rounded bg-machine-950 border border-machine-800 flex items-center justify-center text-indigo-400">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="font-display font-bold text-base text-machine-100">04 // BINARY CRYPTO SIGNING</h3>
          <p className="text-xs font-sans text-machine-300 leading-relaxed">
            All release binaries and model tensor files are cryptographically signed with SHA-256 checksums to prevent supply chain tampering.
          </p>
        </div>
      </section>

    </div>
  );
};
