import React from 'react';
import { CHANGELOG_DATA } from '../data/changelogData';
import { History, Sparkles, CheckCircle2, Wrench, Bug } from 'lucide-react';

export const Changelog: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
          <History className="w-4 h-4" />
          <span>RELEASE TIMELINE // ENGINE ARTIFACTS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
          THE MACHINE KEEPS EVOLVING.
        </h1>
        <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
          Historical log of architectural upgrades, kernel optimizations, quantization matrices, and stability patches across the Typher local engine.
        </p>
      </div>

      {/* Timeline Releases */}
      <div className="space-y-12 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-machine-800">
        {CHANGELOG_DATA.map((release) => (
          <div key={release.version} className="relative pl-10 space-y-4">
            
            {/* Timeline node */}
            <div className="absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full bg-machine-950 border-2 border-cyan-400 shadow-glow-cyan" />

            <div className="machine-panel p-6 sm:p-8 rounded-xl border border-machine-750 corner-brackets space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-machine-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-display font-bold text-xl text-machine-100">
                    {release.version}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-[10px] font-bold">
                    CODENAME: {release.codename}
                  </span>
                </div>
                <span className="text-[11px] text-machine-500">{release.date}</span>
              </div>

              {/* Highlights */}
              <div className="p-4 rounded-lg bg-cyan-950/20 border border-cyan-800/40 space-y-2">
                <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  KEY ARCHITECTURAL HIGHLIGHTS
                </div>
                <ul className="space-y-1 text-xs text-machine-200 font-sans">
                  {release.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* New Features */}
              <div className="space-y-2">
                <div className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  NEW CAPABILITIES
                </div>
                <ul className="space-y-1.5 text-xs text-machine-300 font-sans">
                  {release.newFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="space-y-2">
                <div className="text-[10px] text-sky-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  PERFORMANCE OPTIMIZATIONS
                </div>
                <ul className="space-y-1.5 text-xs text-machine-300 font-sans">
                  {release.improvements.map((imp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fixes */}
              <div className="space-y-2">
                <div className="text-[10px] text-amber-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Bug className="w-3.5 h-3.5" />
                  STABILITY FIXES
                </div>
                <ul className="space-y-1.5 text-xs text-machine-400 font-sans">
                  {release.fixes.map((fix, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{fix}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
