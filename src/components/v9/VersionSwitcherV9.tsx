import React from 'react';
import { Link } from '@tanstack/react-router';

export const VersionSwitcherV9 = () => {
  const versions = [
    { id: 'v1', label: 'V1', path: '/' },
    { id: 'v2', label: 'V2', path: '/' },
    { id: 'v3', label: 'V3', path: '/' },
    { id: 'v4', label: 'V4', path: '/' },
    { id: 'v9', label: 'V9 (Masterpiece)', path: '/v9' },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#111115]/90 backdrop-blur-xl border border-[#D4AF37]/50 shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
        <span className="text-[10px] font-extrabold tracking-widest text-[#D4AF37] uppercase">VERSION SELECTOR:</span>
        <div className="flex gap-2">
          {versions.map((v) => (
            <Link
              key={v.id}
              to={v.path}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                v.id === 'v9' 
                  ? 'bg-gradient-to-r from-[#F5D77F] to-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.5)]' 
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {v.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
