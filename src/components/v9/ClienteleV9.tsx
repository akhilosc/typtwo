import React from 'react';
import { ShieldCheck, Award, ExternalLink, Sparkles } from 'lucide-react';

export const ClienteleV9 = () => {
  const clients = [
    {
      name: "Percept Profile",
      category: "Marquee PR Partner",
      description: "Exclusive strategic PR alliance extending dedicated media relations, crisis communications, and spokesperson profiling for enterprise leadership.",
      highlight: "Exclusive PR Partner"
    },
    {
      name: "Rehau",
      category: "Global Polymer & Industrial",
      description: "Spokesperson profiling, executive thought leadership, and strategic brand positioning for industrial polymer systems.",
      highlight: "Global Enterprise"
    },
    {
      name: "Merino",
      category: "Architectural Surfaces",
      description: "Brand storytelling, product launch campaigns, and digital ecosystem positioning for premium surface solutions.",
      highlight: "Industry Leader"
    },
    {
      name: "Somany Ceramics",
      category: "Ceramic & Building Materials",
      description: "National brand campaigns, spokesperson management, and strategic marketing activations across 100+ markets.",
      highlight: "Heritage Brand"
    },
    {
      name: "Force Motors",
      category: "Automotive & Engineering",
      description: "Commercial brand positioning, executive communication, and media outreach for commercial transport vehicles.",
      highlight: "Automotive Marquee"
    },
    {
      name: "Abhay Prabhavana",
      category: "Heritage & Cultural IP",
      description: "Museum IP scaling, media buzz generation, and cultural campaign design reaching millions of visitors.",
      highlight: "Cultural IP"
    },
    {
      name: "TheRoots",
      category: "Enterprise Interiors & Materials",
      description: "End-to-end GTM strategy, Local LLM Private AI assistant, department AI agents, and national expansion roadmap.",
      highlight: "Enterprise AI & GTM"
    }
  ];

  return (
    <section style={{ padding: '90px 0', backgroundColor: '#060608', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.4)', fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '16px' }}>
            <Award size={16} /> ENTERPRISE CLIENTELE & STRATEGIC ALLIANCES
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', marginBottom: '16px' }}>
            Trusted by Industry Pioneers
          </h2>
          <p style={{ fontSize: '16px', color: '#908F9D', lineHeight: 1.6 }}>
            From global manufacturing giants and automotive leaders to exclusive PR networks and cultural IPs.
          </p>
        </div>

        {/* Ticker / Marquee Band */}
        <div style={{ padding: '24px 32px', borderRadius: '20px', backgroundColor: 'rgba(17,17,21,0.6)', border: '1px solid rgba(212,175,55,0.2)', marginBottom: '56px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', gap: '24px' }}>
          {clients.map((c) => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#D4AF37', boxShadow: '0 0 10px #D4AF37' }} />
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.05em' }}>{c.name}</span>
            </div>
          ))}
        </div>

        {/* Detailed Client Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {clients.map((c) => (
            <div 
              key={c.name} 
              style={{ 
                backgroundColor: '#111115', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '18px', 
                padding: '32px 24px', 
                display: 'flex', 
                flexDirection: 'column', 
                justify: 'space-between',
                transition: 'all 0.3s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#D4AF37', backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', padding: '4px 12px', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {c.highlight}
                  </span>
                  <span style={{ fontSize: '11px', color: '#908F9D' }}>{c.category}</span>
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>{c.name}</h3>
                <p style={{ fontSize: '14px', color: '#908F9D', lineHeight: 1.6, marginBottom: '20px' }}>{c.description}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#D4AF37', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', fontWeight: 700 }}>
                <ShieldCheck size={14} color="#D4AF37" />
                <span>Verified Strategic Engagement</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
