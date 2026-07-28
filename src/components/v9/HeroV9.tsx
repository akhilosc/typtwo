import React from 'react';
import { Link } from '@tanstack/react-router';
import { Cpu, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const HeroV9 = () => {
  return (
    <section style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', paddingTop: '140px', paddingBottom: '80px', backgroundColor: '#040404', color: '#FFFFFF', overflow: 'hidden' }}>
      {/* Background Radial Glow */}
      <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(0,229,255,0.08) 40%, transparent 70%)', pointerEvents: 'none', filter: 'blur(70px)' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'center' }}>
          
          {/* Left Column: Headline & Value Proposition */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '6px 16px', borderRadius: '9999px', backgroundColor: 'rgba(17,17,21,0.9)', border: '1px solid rgba(212,175,55,0.5)', boxShadow: '0 0 20px rgba(212,175,55,0.2)', marginBottom: '32px' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #D4AF37' }}>
                <img src="/images/logo_roman.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em', color: '#D4AF37', textTransform: 'uppercase' }}>
                TYPTWO FLAGSHIP DIGITAL EXPERIENCE
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(44px, 5.5vw, 76px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '24px' }}>
              Creating The<br />
              <span style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F5D77F 60%, #D4AF37 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Intelligent Enterprise.
              </span>
            </h1>

            <p style={{ fontSize: '18px', color: '#908F9D', lineHeight: 1.6, maxWidth: '560px', marginBottom: '40px' }}>
              Every business has two sides. One is how it works. The other is how the world sees it. Typtwo exists to transform both.
            </p>

            {/* Dual CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>
              <Link
                to="/tech"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 32px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(0,229,255,0.1)',
                  border: '1px solid #00E5FF',
                  color: '#00E5FF',
                  fontWeight: 700,
                  fontSize: '15px',
                  textDecoration: 'none',
                  boxShadow: '0 0 30px rgba(0,229,255,0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                <Cpu size={18} />
                <span>Typtwo Tech (Operations)</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/studios"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 32px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(212,175,55,0.1)',
                  border: '1px solid #D4AF37',
                  color: '#F5D77F',
                  fontWeight: 700,
                  fontSize: '15px',
                  textDecoration: 'none',
                  boxShadow: '0 0 30px rgba(212,175,55,0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                <Sparkles size={18} />
                <span>Typtwo Studios (Growth)</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: High-Res 3D Neural Sphere Hero Render */}
          <div style={{ position: 'relative', width: '100%', minHeight: '440px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', height: '480px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(212,175,55,0.4)', boxShadow: '0 0 60px rgba(212,175,55,0.2)' }}>
              <img 
                src="/images/flagship_hero_3d.png" 
                alt="Typtwo Enterprise Neural Intelligence Sphere" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, #040404 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', padding: '16px 20px', borderRadius: '16px', backgroundColor: 'rgba(17,17,21,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#D4AF37', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block' }}>TYPE 2 CIVILIZATION OPERATING SYSTEM</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>Neural Intelligence Engine</span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#00E5FF', backgroundColor: 'rgba(0,229,255,0.1)', padding: '4px 10px', borderRadius: '9999px', border: '1px solid rgba(0,229,255,0.4)' }}>ACTIVE</span>
              </div>
            </div>
          </div>

        </div>

        {/* Floating Metric Pillars */}
        <div style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', padding: '24px', borderRadius: '20px', backgroundColor: 'rgba(17,17,21,0.8)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', color: '#00E5FF', textTransform: 'uppercase' }}>ENGINE 01 • TECH</span>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>Sovereign Private AI</span>
            <span style={{ fontSize: '12px', color: '#908F9D' }}>On-Prem, 0-Egress VPC & Secure RAG</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', color: '#D4AF37', textTransform: 'uppercase' }}>SHARED PURPOSE</span>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#F5D77F' }}>Type 2 Operating System</span>
            <span style={{ fontSize: '12px', color: '#908F9D' }}>Quiet Background Automation & Unforgettable Storytelling</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', color: '#D4AF37', textTransform: 'uppercase' }}>ENGINE 02 • STUDIOS</span>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>Creative Intelligence</span>
            <span style={{ fontSize: '12px', color: '#908F9D' }}>AI CMO Core, Micro Dramas & Voice Cloning</span>
          </div>
        </div>

      </div>
    </section>
  );
};
