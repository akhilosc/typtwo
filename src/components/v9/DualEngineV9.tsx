import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Cpu, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const DualEngineV9 = () => {
  const [hoveredPanel, setHoveredPanel] = useState<'tech' | 'studios' | null>(null);

  return (
    <section id="gateway" className="py-28 bg-[#040404] border-t border-white/10 overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center max-w-3xl">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-xs font-extrabold tracking-widest text-[#D4AF37] mb-4 uppercase">
          TWO WORLDS • ONE VISION
        </span>
        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
          The Dual Engine Architecture
        </h2>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Every business has two engines. One keeps the business running. The other keeps it growing. We build both.
        </p>
      </div>

      {/* Kinetic Split Canvas */}
      <div className="flex flex-col lg:flex-row min-h-[780px] w-full relative border-y border-white/10">
        {/* Left Side: Typtwo Tech */}
        <div 
          className={`relative flex-1 flex items-end p-8 sm:p-16 transition-all duration-700 ease-out bg-[#09090C] overflow-hidden group ${
            hoveredPanel === 'tech' ? 'lg:flex-[1.5]' : ''
          } ${hoveredPanel === 'studios' ? 'lg:flex-[0.6]' : ''}`}
          onMouseEnter={() => setHoveredPanel('tech')}
          onMouseLeave={() => setHoveredPanel(null)}
        >
          {/* 3D Monolith Background Render */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/tech_infra.png" 
              alt="Typtwo Tech 3D Monolith"
              className="w-full h-full object-cover brightness-[0.35] contrast-125 transition-all duration-1000 group-hover:scale-105 group-hover:brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040404] via-[#040404]/60 to-cyan-500/20" />
          </div>

          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/50 text-cyan-300 text-xs font-extrabold tracking-wider uppercase mb-5">
              <Cpu className="w-4 h-4" /> ENGINE 01 • TYPTWO TECH
            </div>

            <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Engineering Intelligent Operations
            </h3>

            <p className="text-slate-300 italic text-base sm:text-lg leading-relaxed mb-4">
              "Imagine if your business could remember everything. Every document. Every conversation. Every process. Every customer. Every decision."
            </p>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Typtwo Tech helps organisations modernise the way they operate through intelligent systems, secure automation, and connected technology.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Simplify complexity and organize institutional memory</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Automate repetitive work silently in the background</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Zero-trust sovereign data & air-gapped protection</span>
              </li>
            </ul>

            <Link
              to="/tech"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-200 font-bold hover:bg-cyan-400 hover:text-black transition-all duration-300"
            >
              <span>Explore Typtwo Tech</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Center Node Badge */}
        <div className="hidden lg:flex absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-20 items-center justify-center pointer-events-none">
          <div className="w-px h-full bg-white/20" />
          <div className={`absolute w-12 h-12 rounded-full bg-[#111115] border flex items-center justify-center text-xs font-black transition-all duration-300 shadow-2xl ${
            hoveredPanel === 'tech' ? 'border-cyan-400 text-cyan-400 shadow-cyan-500/50' :
            hoveredPanel === 'studios' ? 'border-[#D4AF37] text-[#D4AF37] shadow-[#D4AF37]/50' :
            'border-white/20 text-slate-400'
          }`}>
            VS
          </div>
        </div>

        {/* Right Side: Typtwo Studios */}
        <div 
          className={`relative flex-1 flex items-end p-8 sm:p-16 transition-all duration-700 ease-out bg-[#09090C] overflow-hidden group ${
            hoveredPanel === 'studios' ? 'lg:flex-[1.5]' : ''
          } ${hoveredPanel === 'tech' ? 'lg:flex-[0.6]' : ''}`}
          onMouseEnter={() => setHoveredPanel('studios')}
          onMouseLeave={() => setHoveredPanel(null)}
        >
          {/* 3D Monolith Background Render */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/studios_creative.png" 
              alt="Typtwo Studios 3D Monolith"
              className="w-full h-full object-cover brightness-[0.35] contrast-125 transition-all duration-1000 group-hover:scale-105 group-hover:brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040404] via-[#040404]/60 to-[#D4AF37]/20" />
          </div>

          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/50 text-[#F5D77F] text-xs font-extrabold tracking-wider uppercase mb-5">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> ENGINE 02 • TYPTWO STUDIOS
            </div>

            <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Engineering Intelligent Growth
            </h3>

            <p className="text-slate-300 italic text-base sm:text-lg leading-relaxed mb-4">
              "Great businesses deserve great stories. People don't remember advertisements. They remember moments, ideas, experiences, and conversations."
            </p>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Typtwo Studios helps businesses create brands people trust, campaigns people remember, and content people actually want to watch.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Autonomous AI CMO & brand positioning strategy</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Multilingual Voice Cloning for global founder keynotes</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>4K Generative video production & creative campaigns</span>
              </li>
            </ul>

            <Link
              to="/studios"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F5D77F] font-bold hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
            >
              <span>Explore Typtwo Studios</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
