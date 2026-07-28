import React, { useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const StudiosFeaturesV9 = () => {
  const [activeTab, setActiveTab] = useState<'features' | 'creatives' | 'impact'>('creatives');

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
    <section style={{ padding: '100px 0', backgroundColor: '#040404', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.4)', fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '16px' }}>
            <Sparkles size={16} /> TYPTWO STUDIOS • CREATIVE INTELLIGENCE
          </div>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', marginBottom: '16px' }}>
            Engineering Intelligent Growth
          </h2>
          <p style={{ fontSize: '16px', color: '#908F9D', lineHeight: 1.6 }}>
            All 6 core creative modules built for unforgettable brand momentum.
          </p>

          {/* Mode Switcher */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '32px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('creatives')}
              style={{
                padding: '10px 20px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                backgroundColor: activeTab === 'creatives' ? '#D4AF37' : 'rgba(255,255,255,0.05)',
                color: activeTab === 'creatives' ? '#040404' : '#908F9D',
                boxShadow: activeTab === 'creatives' ? '0 0 20px rgba(212,175,55,0.5)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              High-Res Visual Renders Showcase
            </button>

            <button
              onClick={() => setActiveTab('features')}
              style={{
                padding: '10px 20px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                backgroundColor: activeTab === 'features' ? '#D4AF37' : 'rgba(255,255,255,0.05)',
                color: activeTab === 'features' ? '#040404' : '#908F9D',
                boxShadow: activeTab === 'features' ? '0 0 20px rgba(212,175,55,0.5)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              All 6 Studios Services (S-01..S-06)
            </button>

            <button
              onClick={() => setActiveTab('impact')}
              style={{
                padding: '10px 20px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                backgroundColor: activeTab === 'impact' ? '#D4AF37' : 'rgba(255,255,255,0.05)',
                color: activeTab === 'impact' ? '#040404' : '#908F9D',
                boxShadow: activeTab === 'impact' ? '0 0 20px rgba(212,175,55,0.5)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              Proven Growth Impact
            </button>
          </div>
        </div>

        {/* TAB: VISUAL RENDERS SHOWCASE */}
        {activeTab === 'creatives' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', maxWidth: '1100px', margin: '0 auto' }}>
            
            {/* Card 1: AI CMO */}
            <div style={{ backgroundColor: '#111115', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                <img 
                  src="/images/ai_cmo.png" 
                  alt="AI CMO Growth Matrix Render" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, #111115 0%, transparent 60%)' }} />
              </div>
              <div style={{ padding: '24px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  AUTONOMOUS AI CMO ENGINE
                </span>
                <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                  Growth Strategy & Positioning Engine
                </h4>
                <p style={{ fontSize: '14px', color: '#908F9D', lineHeight: 1.6 }}>
                  Always-on market sentiment analysis, channel alignment, and creative testing feedback loops.
                </p>
              </div>
            </div>

            {/* Card 2: 4K Video AI */}
            <div style={{ backgroundColor: '#111115', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                <img 
                  src="/images/video_ai.png" 
                  alt="4K Generative Video AI Engine Render" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, #111115 0%, transparent 60%)' }} />
              </div>
              <div style={{ padding: '24px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  4K GENERATIVE VIDEO AI ENGINE
                </span>
                <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                  High-Res Brand Films & Micro Dramas
                </h4>
                <p style={{ fontSize: '14px', color: '#908F9D', lineHeight: 1.6 }}>
                  Generating 4K video assets and episodic short-form creative series at infinite production scale.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* TAB: ALL 6 SERVICES */}
        {activeTab === 'features' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {studioServices.map((s) => (
              <div key={s.code} style={{ backgroundColor: '#111115', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#D4AF37', letterSpacing: '0.15em', display: 'block', marginBottom: '12px' }}>{s.code}</span>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>{s.title}</h3>
                  <p style={{ fontSize: '14px', color: '#908F9D', lineHeight: 1.6, marginBottom: '20px' }}>{s.summary}</p>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                  {s.points.map((pt, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#FFFFFF' }}>
                      <CheckCircle2 size={14} color="#D4AF37" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* TAB: PROVEN IMPACT */}
        {activeTab === 'impact' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>
            {caseStudies.map((cs, idx) => (
              <div key={idx} style={{ backgroundColor: '#111115', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '32px 24px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#D4AF37', letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }}>{cs.client}</span>
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>{cs.result}</h4>
                <p style={{ fontSize: '14px', color: '#908F9D', lineHeight: 1.6 }}>{cs.detail}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
