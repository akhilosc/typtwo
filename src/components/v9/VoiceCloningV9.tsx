import React, { useState } from 'react';
import { Globe, Play, Pause, Volume2, Sparkles } from 'lucide-react';

export const VoiceCloningV9 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English (Global Founder Replica)');

  const languages = [
    { name: 'English (Global Founder Replica)', accent: 'Authentic Keynote Replica' },
    { name: 'Japanese (Tokyo Summit)', accent: 'Native Cadence & Tone' },
    { name: 'German (Frankfurt Executive)', accent: 'High Precision Synthesis' },
    { name: 'Spanish (Madrid Forum)', accent: 'Natural Vocal Inflection' },
  ];

  return (
    <section className="py-28 bg-[#09090C] border-t border-white/10 text-white relative">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#111115] border border-[#D4AF37]/40 overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-[0_0_50px_rgba(212,175,55,0.15)]">
          {/* Left Column: Visual Replica Image */}
          <div className="relative min-h-[440px] flex items-end p-8">
            <img 
              src="/images/voice_cloning.jpg" 
              alt="Multilingual Voice Replica"
              className="absolute inset-0 w-full h-full object-cover brightness-75 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-[#111115]/40 to-transparent" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111115]/90 border border-[#D4AF37] text-[#D4AF37] text-xs font-bold uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" /> FOUNDER SPEECH REPLICA
              </div>
              <h3 className="text-2xl font-extrabold text-white">Global Keynote Synthesis</h3>
              <p className="text-slate-300 text-xs mt-1">Record once. Broadcast in 100+ languages with full founder accent retention.</p>
            </div>
          </div>

          {/* Right Column: Controls & Player */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <span className="text-xs font-extrabold tracking-widest text-[#D4AF37] block mb-2 uppercase">MULTILINGUAL VOICE ENGINE</span>
            <h2 className="text-3xl font-extrabold text-white mb-3">Interactive Voice Visualizer</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Synthesise high-fidelity founder voice replicas across global markets with zero re-recording.
            </p>

            {/* Language Selector */}
            <div className="space-y-2 mb-6">
              {languages.map((l) => (
                <button
                  key={l.name}
                  onClick={() => setSelectedLang(l.name)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    selectedLang === l.name 
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#F5D77F]' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <Globe className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <div>
                    <div className="text-xs font-bold">{l.name}</div>
                    <div className="text-[10px] opacity-70">{l.accent}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Player Controls */}
            <div className="p-4 rounded-full bg-black/70 border border-white/10 flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-[#F5D77F] to-[#D4AF37] text-black flex items-center justify-center font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              <div className="flex-1">
                <div className="flex items-end gap-1 h-5 mb-1">
                  {[...Array(16)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`w-1 rounded-full bg-[#D4AF37] transition-all duration-300 ${
                        isPlaying ? (i % 2 === 0 ? 'h-4 animate-pulse' : 'h-2') : 'h-1.5 opacity-40'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400">
                  {isPlaying ? `Playing ${selectedLang}...` : 'Click play to test audio replica'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
