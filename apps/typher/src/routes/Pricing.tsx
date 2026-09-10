import React from 'react';
import { Terminal, Shield, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface PricingProps {
  navigate: (route: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ navigate }) => {
  const plans = [
    {
      id: 'community',
      name: 'COMMUNITY RUNTIME',
      price: '$0',
      period: 'FOREVER OPEN SOURCE',
      desc: 'For software engineers, researchers, and local autonomous agents running on personal hardware.',
      features: [
        'Unrestricted local execution on Apple Silicon, CUDA & ROCm',
        'Access to Typher 7B, 14B & 32B model weights',
        'Full OpenAI-compatible REST API (/v1/chat/completions)',
        'Zero telemetry & 100% offline air-gap compatibility',
        'Community Discord & GitHub support',
      ],
      cta: 'DOWNLOAD BINARY',
      highlighted: false,
    },
    {
      id: 'pro',
      name: 'PRO WORKSTATION',
      price: '$29',
      period: 'PER SEAT / MONTH',
      desc: 'For senior developers and quantitative analysts needing advanced fine-tuning tools and speculative engines.',
      features: [
        'Everything in Community Runtime',
        'Automated local LoRA / QLoRA fine-tuning suite',
        'Multi-draft speculative decoding acceleration',
        'Embedded HNSW vector database with AST codebase parser',
        'Priority technical issue routing',
      ],
      cta: 'START PRO TRIAL',
      highlighted: true,
    },
    {
      id: 'enterprise',
      name: 'SOVEREIGN ENTERPRISE',
      price: 'CUSTOM',
      period: 'FIXED INFRASTRUCTURE TIER',
      desc: 'For defense, healthcare, and finance organizations deploying private multi-node clusters with strict governance.',
      features: [
        'Everything in Pro Workstation',
        'Multi-GPU cluster scheduler with paged KV-cache',
        'Granular RBAC token management and usage caps',
        'Immutable cryptographic audit logging',
        'Custom domain fine-tuning and weight watermarking',
        'Dedicated 24/7 engineering SLA & custom deployment support',
      ],
      cta: 'CONTACT ARCHITECTS',
      highlighted: false,
    },
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-cyan-400 font-bold mb-1">
          <Sparkles className="w-4 h-4" />
          <span>DEPLOYMENT TIERS // DETERMINISTIC ECONOMICS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
          START LOCAL. SCALE WHEN READY.
        </h1>
        <p className="text-sm sm:text-base font-sans text-machine-300 mt-2 leading-relaxed">
          Zero token meter anxiety. Run unlimited local inferences with predictable fixed infrastructure costs.
        </p>
      </div>

      {/* 3 Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`machine-panel p-8 rounded-xl border corner-brackets font-mono flex flex-col justify-between transition-all duration-300 ${
              plan.highlighted
                ? 'border-cyan-500/80 shadow-glow-cyan bg-machine-850'
                : 'border-machine-800 hover:border-machine-700'
            }`}
          >
            <div className="space-y-6">
              <div className="border-b border-machine-800 pb-4">
                <div className="text-[10px] text-machine-500 uppercase tracking-widest font-semibold">
                  TIER
                </div>
                <h3 className="font-display font-bold text-xl text-machine-100 mt-1">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-display font-extrabold text-cyan-300">
                    {plan.price}
                  </span>
                  <span className="text-[11px] text-machine-500">{plan.period}</span>
                </div>
                <p className="text-xs font-sans text-machine-300 mt-3 leading-relaxed">
                  {plan.desc}
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-[10px] text-machine-500 uppercase tracking-widest font-semibold">
                  INCLUDED CAPABILITIES:
                </div>
                <ul className="space-y-2 text-xs font-sans text-machine-300">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-machine-800">
              <button
                onClick={() => navigate(plan.id === 'enterprise' ? '/contact' : '/download')}
                className={`w-full py-3 rounded-lg font-mono text-xs tracking-wider transition-all flex items-center justify-center gap-2 ${
                  plan.highlighted
                    ? 'bg-cyan-950 hover:bg-cyan-900 border border-cyan-400 text-cyan-200 shadow-glow-cyan'
                    : 'bg-machine-900 hover:bg-machine-850 border border-machine-750 text-machine-200 hover:text-cyan-300'
                }`}
              >
                {plan.cta} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
