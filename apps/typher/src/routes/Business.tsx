import React from 'react';
import { SectionLabel } from '../components/ui/SectionLabel';
import { BUSINESS_METRICS } from '../data/businessMetricsData';
import { RoiCalculator } from '../components/interactive/RoiCalculator';
import { TrendingUp, DollarSign, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const Business: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <SectionLabel label="BUSINESS VALUE // OPERATING LEVERAGE" />
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
            TURN AI INTO <br />
            OPERATING LEVERAGE.
          </h1>
          <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
            Reduce cost. Increase engineering throughput. Keep deterministic control of your private intellectual property.
          </p>
        </div>

        <div className="text-[10px] px-3 py-1.5 rounded bg-machine-900 border border-machine-800 text-machine-400 font-mono">
          ILLUSTRATIVE SCENARIOS // RESULTS VARY BY WORKFLOW
        </div>
      </div>

      {/* 4 Illustrative Metric Cards from mockup panel 5 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BUSINESS_METRICS.map((m) => (
          <div
            key={m.id}
            className="machine-panel p-6 rounded-xl border border-machine-750 corner-brackets space-y-3"
          >
            <div className="text-3xl sm:text-4xl font-display font-extrabold text-cyan-300 text-glow-cyan">
              {m.valueRange}
            </div>
            <div className="text-xs font-bold text-machine-100 uppercase tracking-wide">
              {m.label}
            </div>
            <p className="text-xs font-sans text-machine-400 leading-relaxed">
              {m.sublabel}
            </p>
            <div className="text-[9px] text-machine-500 pt-2 border-t border-machine-850">
              {m.caveat}
            </div>
          </div>
        ))}
      </div>

      {/* Main Interactive ROI Calculator */}
      <section className="space-y-4">
        <RoiCalculator />
      </section>

      {/* 4 Business Leverage Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="machine-panel p-6 rounded-xl border border-machine-800 space-y-3">
          <div className="w-8 h-8 rounded bg-machine-950 border border-machine-750 flex items-center justify-center text-cyan-400">
            <DollarSign className="w-4 h-4" />
          </div>
          <h3 className="font-display font-bold text-base text-machine-100">
            Eliminate Marginal Token Costs
          </h3>
          <p className="text-xs font-sans text-machine-300 leading-relaxed">
            Replace linear cloud API token billing with fixed local hardware amortization. Run millions of background agent iterations with zero billing surprises.
          </p>
        </div>

        <div className="machine-panel p-6 rounded-xl border border-machine-800 space-y-3">
          <div className="w-8 h-8 rounded bg-machine-950 border border-machine-750 flex items-center justify-center text-sky-400">
            <Clock className="w-4 h-4" />
          </div>
          <h3 className="font-display font-bold text-base text-machine-100">
            Recover Core Engineering Time
          </h3>
          <p className="text-xs font-sans text-machine-300 leading-relaxed">
            Automate code documentation, unit test writing, PR reviews, and contract cross-referencing so your senior staff focuses on high-leverage innovation.
          </p>
        </div>

        <div className="machine-panel p-6 rounded-xl border border-machine-800 space-y-3">
          <div className="w-8 h-8 rounded bg-machine-950 border border-machine-750 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-display font-bold text-base text-machine-100">
            Zero Compliance Risk
          </h3>
          <p className="text-xs font-sans text-machine-300 leading-relaxed">
            Avoid costly regulatory penalties (GDPR, HIPAA, SOC2) by guaranteeing that client data and proprietary algorithms never leave your company firewall.
          </p>
        </div>
      </section>

    </div>
  );
};
