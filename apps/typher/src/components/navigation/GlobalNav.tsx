import React, { useState } from 'react';
import { SystemStatus } from '../telemetry/SystemStatus';
import { TypherCoreMini } from '../core/TypherCoreMini';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  Terminal, 
  Cpu, 
  Layers, 
  BookOpen, 
  Play, 
  Download, 
  ShieldCheck, 
  Database, 
  Workflow, 
  Bot, 
  Network, 
  TrendingUp 
} from 'lucide-react';

interface GlobalNavProps {
  currentRoute: string;
  navigate: (route: string) => void;
}

export const GlobalNav: React.FC<GlobalNavProps> = ({ currentRoute, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'SYSTEM', path: '/system' },
    { label: 'MODELS', path: '/models' },
    { label: 'RUNTIME', path: '/runtime' },
    { label: 'KNOWLEDGE', path: '/knowledge' },
    { label: 'AUTOMATION', path: '/automation' },
    { label: 'PLAYGROUND', path: '/playground' },
    { label: 'DEVELOPERS', path: '/developers' },
    { label: 'DOCS', path: '/docs' },
    { label: 'ENTERPRISE', path: '/enterprise' },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-machine-950/90 backdrop-blur-md border-b border-machine-800/80 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Computational Core */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav('/')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <TypherCoreMini size={26} />
            <span className="font-display font-bold text-lg tracking-widest text-machine-100 group-hover:text-cyan-300 transition-colors">
              TYPHER
            </span>
          </button>
        </div>

        {/* Desktop Technical Navigation Links */}
        <nav className="hidden 2xl:flex items-center gap-1 text-[11px] font-mono tracking-wider">
          {navItems.map((item) => {
            const isActive = currentRoute === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`px-2.5 py-1.5 rounded transition-all duration-150 uppercase flex items-center gap-1 ${
                  isActive
                    ? 'bg-machine-850 text-cyan-300 border border-cyan-700/60 shadow-sm font-semibold'
                    : 'text-machine-400 hover:text-machine-100 hover:bg-machine-900 border border-transparent'
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Condensed Nav for Intermediate XL screens */}
        <nav className="hidden lg:flex 2xl:hidden items-center gap-1 text-[11px] font-mono tracking-wider">
          {navItems.slice(0, 7).map((item) => {
            const isActive = currentRoute === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`px-2 py-1 rounded transition-all uppercase ${
                  isActive
                    ? 'bg-machine-850 text-cyan-300 border border-cyan-700/60 font-semibold'
                    : 'text-machine-400 hover:text-machine-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions / System Status / Download */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNav('/download')}
            className="px-3.5 py-1.5 rounded bg-machine-900 hover:bg-machine-850 border border-machine-750 hover:border-cyan-500/80 text-cyan-300 font-mono text-xs tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            DOWNLOAD
          </button>

          <SystemStatus />
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          <SystemStatus showText={false} />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="px-2.5 py-1.5 rounded bg-machine-900 border border-machine-800 text-machine-300 hover:text-cyan-300 font-mono text-xs tracking-wider flex items-center gap-1.5"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <span className="text-[11px]">[ MENU ]</span>}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-machine-950/98 backdrop-blur-xl border-t border-machine-800 p-6 flex flex-col justify-between overflow-y-auto z-40 tech-grid">
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono tracking-widest text-machine-500 uppercase pb-2 border-b border-machine-800/80">
              TYPHER // SYSTEM ACCESS
            </div>
            
            {/* Expanded mobile route list */}
            {[
              ...navItems,
              { label: 'FEATURES', path: '/features' },
              { label: 'INTEGRATIONS', path: '/integrations' },
              { label: 'AGENTS', path: '/agents' },
              { label: 'BUSINESS & ROI', path: '/business' },
              { label: 'EFFICIENCY', path: '/efficiency' },
              { label: 'OBSERVABILITY', path: '/observability' },
              { label: 'SECURITY', path: '/security' },
              { label: 'PRICING', path: '/pricing' },
              { label: 'CHANGELOG', path: '/changelog' },
              { label: 'BLOG', path: '/blog' },
              { label: 'STATUS', path: '/status' },
              { label: 'CONTACT', path: '/contact' },
            ].map((item) => {
              const isActive = currentRoute === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`w-full p-2.5 rounded-lg border font-mono text-xs tracking-wider flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-machine-850 text-cyan-300 border-cyan-700/60'
                      : 'bg-machine-900/60 text-machine-300 border-machine-850 hover:border-machine-750'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-[10px] text-cyan-400">● ACTIVE</span>}
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-machine-800 space-y-3">
            <button
              onClick={() => handleNav('/download')}
              className="w-full py-3 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500 text-cyan-300 font-mono text-xs tracking-wider flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              DOWNLOAD LOCAL RUNTIME
            </button>

            <div className="flex items-center justify-between text-[11px] font-mono text-machine-500 pt-2">
              <span>TYPHER // A PRODUCT OF TYPTWO</span>
              <a
                href="https://typtwo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-machine-400 hover:text-cyan-300"
              >
                TYPTWO.COM <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
