import React from 'react';
import { Link } from '@tanstack/react-router';
import { Cpu, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const HeroV9 = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#040404] text-white">
      {/* Dynamic Background Radial Glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,rgba(0,229,255,0.08)_40%,transparent_70%)] pointer-events-none blur-[70px]" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        {/* Flagship Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111115]/90 border border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.2)] mb-8">
          <div className="w-5 h-5 rounded overflow-hidden border border-[#D4AF37]">
            <img src="/images/logo_roman.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#D4AF37] uppercase">
            VERSION 9 • MASTERPIECE FLAGSHIP EDITION
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-[1.05] max-w-5xl mb-6">
          Creating The<br />
          <span className="bg-gradient-to-b from-white via-[#F5D77F] to-[#D4AF37] bg-clip-text text-transparent">
            Intelligent Enterprise.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl text-slate-400 max-w-3xl leading-relaxed mb-10">
          Every business has two sides. One is how it works. The other is how the world sees it. Typtwo exists to transform both.
        </p>

        {/* Dual Engine CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-5 mb-16">
          <Link
            to="/tech"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-500/10 border border-cyan-400 text-cyan-300 font-bold hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(0,229,255,0.25)] hover:shadow-[0_0_40px_rgba(0,229,255,0.6)]"
          >
            <Cpu className="w-5 h-5" />
            <span>Typtwo Tech (Operations)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/studios"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37] text-[#F5D77F] font-bold hover:bg-gradient-to-r hover:from-[#F5D77F] hover:to-[#D4AF37] hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.25)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]"
          >
            <Sparkles className="w-5 h-5" />
            <span>Typtwo Studios (Growth)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Floating Metric Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl p-6 rounded-2xl bg-[#111115]/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col items-center gap-1.5 p-4 rounded-xl hover:bg-white/5 transition-colors">
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">ENGINE 01 • TECH</span>
            <span className="text-xl font-extrabold text-white">Sovereign Private AI</span>
            <span className="text-xs text-slate-400">On-Prem, 0-Egress VPC & Secure RAG</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 p-4 rounded-xl border-y md:border-y-0 md:border-x border-white/10 hover:bg-white/5 transition-colors">
            <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">SHARED PURPOSE</span>
            <span className="text-xl font-extrabold text-[#F5D77F]">Type 2 Operating System</span>
            <span className="text-xs text-slate-400">Quiet Background Automation & Unforgettable Storytelling</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 p-4 rounded-xl hover:bg-white/5 transition-colors">
            <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">ENGINE 02 • STUDIOS</span>
            <span className="text-xl font-extrabold text-white">Creative Intelligence</span>
            <span className="text-xs text-slate-400">AI CMO Core, Micro Dramas & Voice Cloning</span>
          </div>
        </div>
      </div>
    </section>
  );
};
