import React from 'react';

interface SectionLabelProps {
  label: string;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ label, className = '' }) => {
  return (
    <div className={`text-[11px] font-mono tracking-widest text-cyan-400 font-semibold uppercase flex items-center gap-2 mb-2 ${className}`}>
      <span className="opacity-80">//</span>
      <span>{label}</span>
    </div>
  );
};
