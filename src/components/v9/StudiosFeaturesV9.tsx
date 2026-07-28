import React, { useState } from 'react';
import { Sparkles, Video, Globe, Award, TrendingUp, CheckCircle2, Play } from 'lucide-react';

export const StudiosFeaturesV9 = () => {
  const [activeTab, setActiveTab] = useState<'features' | 'creatives' | 'impact'>('features');

  const studioServices = [
    {
      code: "S-01",
      title: "Micro Dramas & Short Fiction",
      summary: "Vertical, episodic, built for the thumb. Short-form serialised fiction that carries a brand without reading like an ad.",
      points: ["Concept, writing & episode arcs", "Casting, direction & production", "Vertical-first edit & sound design", "Multi-episode release strategy"]
    },
    {
      code: "S-02",
      title: "Social Campaigns & Content Engines",
      summary: "Always-on content engines. Calendars, formats and hooks designed around how each platform actually distributes.",
      points: ["Channel strategy & content pillars", "Monthly production slates", "Community management", "Performance reporting"]
    },
    {
      code: "S-03",
      title: "Brand Promotion & Messaging",
      summary: "Identity work with legs — how the brand sounds, moves and shows up long after the launch post.",
      points: ["Positioning & messaging systems", "Visual identity & motion language", "Launch films & brand anthems", "Brand guideline documentation"]
    },
    {
      code: "S-04",
      title: "Performance Marketing",
      summary: "Paid media run against real numbers. Creative and media buying under one roof so the feedback loop stays short.",
      points: ["Meta, Google & YouTube buying", "Creative testing frameworks (40 variants/mo)", "Landing page & funnel work", "Attribution & reporting dashboards"]
    },
    {
      code: "S-05",
      title: "Influencer & Creator Sourcing",
      summary: "Creator partnerships matched on audience fit rather than follower count, managed end to end.",
      points: ["Creator sourcing & vetting", "Briefing & rights negotiation", "Co-produced content", "Whitelisting & paid amplification"]
    },
    {
      code: "S-06",
      title: "Traditional Media & Launch Events",
      summary: "Print, outdoor, radio and events — still effective when the audience is actually there.",
      points: ["Media planning & buying", "Print & outdoor creative", "Event & activation design", "PR & press coordination"]
    }
  ];

  const caseStudies = [
    { client: "Beverage Challenger Brand", result: "8-episode micro drama, 22M organic views", detail: "A vertical serialised romance built around the product's ritual rather than the product itself. Released twice weekly." },
    { client: "Fintech App", result: "Cost per install down 61% in one quarter", detail: "Creative testing system producing 40 variants a month, with media buying reallocated weekly against real-time results." },
    { client: "Heritage Retailer", result: "Full rebrand across 140 stores", detail: "Positioning, identity, motion language and a launch film, followed by a six-month always-on social programme." }
  ];

  return (
    <section className="py-28 bg-[#040404] border-t border-white/10 text-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/50 text-[#F5D77F] text-xs font-extrabold tracking-widest uppercase mb-4">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" /> TYPTWO STUDIOS • CREATIVE INTELLIGENCE
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
            Engineering Intelligent Growth
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            All 6 core creative modules built for unforgettable brand momentum.
          </p>

          {/* Mode Switcher */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab('features')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'features' ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              All 6 Studios Services (S-01..S-06)
            </button>

            <button
              onClick={() => setActiveTab('creatives')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'creatives' ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              High-Res Visual Renders
            </button>

            <button
              onClick={() => setActiveTab('impact')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'impact' ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              Proven Growth Impact
            </button>
          </div>
        </div>

        {/* TAB 1: ALL 6 STUDIOS SERVICES */}
        {activeTab === 'features' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studioServices.map((s) => (
              <div key={s.code} className="p-8 rounded-2xl bg-[#111115] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1">
                <div>
                  <span className="text-xs font-extrabold tracking-widest text-[#D4AF37] block mb-3">{s.code}</span>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#F5D77F] transition-colors">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{s.summary}</p>
                </div>
                <ul className="space-y-2.5 border-t border-white/5 pt-4">
                  {s.points.map((pt, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: VISUAL RENDERS SHOWCASE */}
        {activeTab === 'creatives' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="rounded-2xl bg-[#111115] border border-white/10 overflow-hidden group">
              <div className="relative h-72">
                <img src="/images/ai_cmo.png" alt="AI CMO Matrix" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-[#D4AF37] tracking-wider uppercase block mb-1">AUTONOMOUS AI CMO ENGINE</span>
                <h4 className="text-xl font-bold text-white mb-2">Growth Strategy & Channel Optimization</h4>
                <p className="text-slate-400 text-sm">Always-on market sentiment analysis, messaging alignment, and creative testing feedback loops.</p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#111115] border border-white/10 overflow-hidden group">
              <div className="relative h-72">
                <img src="/images/video_ai.png" alt="4K Generative Video AI" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-[#D4AF37] tracking-wider uppercase block mb-1">4K GENERATIVE VIDEO AI</span>
                <h4 className="text-xl font-bold text-white mb-2">High-Res Brand Films & Creative Campaigns</h4>
                <p className="text-slate-400 text-sm">Generating 4K video assets and episodic short-form creative series at infinite production scale.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROVEN IMPACT */}
        {activeTab === 'impact' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {caseStudies.map((cs, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-[#111115] border border-white/10 text-left">
                <span className="text-xs font-extrabold text-[#D4AF37] tracking-widest block mb-2">{cs.client}</span>
                <h4 className="text-xl font-bold text-white mb-3">{cs.result}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{cs.detail}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
