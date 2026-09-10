import React from 'react';
import { SectionLabel } from '../components/ui/SectionLabel';
import { SystemNetwork } from '../components/interactive/SystemNetwork';
import { Network, ArrowRight } from 'lucide-react';

export const Integrations: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6">
        <SectionLabel label="INTEGRATIONS // CONNECTED ENTERPRISE ECOSYSTEM" />
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
          CONNECT THE SYSTEMS <br />
          YOU ALREADY USE.
        </h1>
        <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
          Bring your communication channels, CRM databases, ERP systems, and code repositories into one unified, sovereign local intelligence layer.
        </p>
      </div>

      {/* Main Interactive Network Map from mockup panel 6 */}
      <section className="space-y-4">
        <SystemNetwork />
      </section>

    </div>
  );
};
