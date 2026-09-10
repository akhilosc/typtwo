import React, { useState, useEffect } from 'react';
import { INTEGRATIONS_DATA, IntegrationItem } from '../../data/integrationsData';
import { TypherCoreMini } from '../core/TypherCoreMini';
import { 
  Workflow, 
  CheckCircle2, 
  Clock, 
  Code, 
  MessageSquare, 
  Database, 
  FileText, 
  Layers, 
  ExternalLink 
} from 'lucide-react';

interface SystemNetworkProps {
  className?: string;
  showFilters?: boolean;
}

export const SystemNetwork: React.FC<SystemNetworkProps> = ({
  className = '',
  showFilters = true,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedNode, setSelectedNode] = useState<IntegrationItem | null>(null);

  const categories = ['ALL', 'COMMUNICATION', 'CRM', 'DOCUMENTS', 'DATABASES', 'DEVELOPMENT', 'ERP'];

  const filteredIntegrations = activeCategory === 'ALL'
    ? INTEGRATIONS_DATA
    : INTEGRATIONS_DATA.filter((i) => i.category === activeCategory);

  return (
    <div className={`machine-panel p-6 sm:p-10 rounded-2xl border border-machine-750 corner-brackets font-mono ${className}`}>
      
      {/* Category Filter Pills & Status Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-machine-800 pb-4 mb-8 text-xs">
        {showFilters && (
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded text-[11px] transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-950 border border-cyan-500 text-cyan-300 font-bold shadow-sm'
                    : 'bg-machine-900 border border-machine-800 text-machine-400 hover:text-machine-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center gap-4 text-[10px]">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            AVAILABLE
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            COMING SOON
          </span>
          <span className="flex items-center gap-1 text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            API / CUSTOM
          </span>
        </div>
      </div>

      {/* Interactive Orbital Network Canvas Arena */}
      <div className="relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center overflow-hidden radar-grid rounded-xl border border-machine-800/80 p-4">
        
        {/* Orbiting Concentric Reference Lines */}
        <div className="absolute w-[280px] h-[280px] rounded-full border border-cyan-500/10 pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-cyan-500/5 pointer-events-none" />

        {/* Central TYPHER Core Node */}
        <div className="relative z-20 flex flex-col items-center justify-center p-5 rounded-2xl bg-machine-950 border-2 border-cyan-500 shadow-glow-cyan">
          <TypherCoreMini size={48} />
          <span className="font-display font-bold text-sm tracking-widest text-machine-100 mt-2">
            TYPHER
          </span>
          <span className="text-[9px] text-cyan-400 font-mono tracking-wider">
            INTELLIGENCE LAYER
          </span>
        </div>

        {/* Surrounding Connected Service Nodes */}
        {filteredIntegrations.map((item) => {
          const rad = (item.angle * Math.PI) / 180;
          // Responsive radius scaling
          const distance = typeof window !== 'undefined' && window.innerWidth < 640 ? item.distance * 0.72 : item.distance;
          const x = Math.cos(rad) * distance;
          const y = Math.sin(rad) * distance;
          const isSelected = selectedNode?.id === item.id;

          const isAvailable = item.status === 'AVAILABLE';
          const isComingSoon = item.status === 'COMING SOON';

          return (
            <React.Fragment key={item.id}>
              {/* Connecting Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <line
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${x}px)`}
                  y2={`calc(50% + ${y}px)`}
                  stroke={isSelected ? '#38bdf8' : 'rgba(56, 189, 248, 0.18)'}
                  strokeWidth={isSelected ? '2' : '1'}
                  strokeDasharray={isAvailable ? 'none' : '4,4'}
                />
              </svg>

              {/* Node Button */}
              <button
                onClick={() => setSelectedNode(item)}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                className={`absolute z-20 p-2.5 sm:p-3 rounded-xl border text-left font-mono transition-all duration-300 shadow-md ${
                  isSelected
                    ? 'bg-machine-850 border-cyan-400 shadow-glow-cyan scale-110'
                    : 'bg-machine-950/90 border-machine-750 hover:border-cyan-500/60 hover:bg-machine-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    isAvailable ? 'bg-emerald-400' : isComingSoon ? 'bg-amber-400' : 'bg-cyan-400'
                  }`} />
                  <span className="font-semibold text-xs text-machine-100">{item.name}</span>
                </div>
                <div className="text-[9px] text-machine-500 mt-0.5">{item.category}</div>
              </button>
            </React.Fragment>
          );
        })}

      </div>

      {/* Selected Integration Inspector Footer */}
      {selectedNode && (
        <div className="mt-6 p-4 rounded-xl bg-machine-900/90 border border-cyan-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm text-machine-100">
                {selectedNode.name} Integration
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                selectedNode.status === 'AVAILABLE'
                  ? 'bg-emerald-950 border border-emerald-700 text-emerald-300'
                  : selectedNode.status === 'COMING SOON'
                  ? 'bg-amber-950 border border-amber-700 text-amber-300'
                  : 'bg-cyan-950 border border-cyan-700 text-cyan-300'
              }`}>
                {selectedNode.status}
              </span>
            </div>
            <p className="text-xs font-sans text-machine-300 mt-1">
              {selectedNode.description}
            </p>
          </div>

          <button
            onClick={() => setSelectedNode(null)}
            className="text-[11px] text-machine-400 hover:text-cyan-300 underline underline-offset-4 self-start sm:self-auto shrink-0"
          >
            CLOSE INSPECTOR
          </button>
        </div>
      )}

    </div>
  );
};
