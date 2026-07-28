import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Cpu, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const DualEngineV9 = () => {
  const [hoveredPanel, setHoveredPanel] = useState<'tech' | 'studios' | null>(null);

  return (
    <section id="gateway" style={{ padding: '100px 0', backgroundColor: '#040404', borderTop: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto 64px', textAlign: 'center', padding: '0 24px' }}>
        <span style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '9999px', backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.4)', fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '16px' }}>
          TWO WORLDS • ONE VISION
        </span>
        <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', marginBottom: '16px' }}>
          The Dual Engine Architecture
        </h2>
        <p style={{ fontSize: '16px', color: '#908F9D', lineHeight: 1.6 }}>
          Every business has two engines. One keeps the business running. The other keeps it growing. We build both.
        </p>
      </div>

      {/* Kinetic Split Canvas */}
      <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: '750px', width: '100%', position: 'relative', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        
        {/* Left Side: Typtwo Tech */}
        <div 
          style={{
            flex: hoveredPanel === 'tech' ? 1.5 : hoveredPanel === 'studios' ? 0.6 : 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '64px',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            backgroundColor: '#09090C',
            overflow: 'hidden',
            minWidth: '320px'
          }}
          onMouseEnter={() => setHoveredPanel('tech')}
          onMouseLeave={() => setHoveredPanel(null)}
        >
          {/* 3D Tech Monolith Image */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
            <img 
              src="/images/tech_infra.png" 
              alt="Typtwo Tech Sovereign 3D Monolith"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: hoveredPanel === 'tech' ? 'brightness(0.55) contrast(1.2)' : 'brightness(0.35) contrast(1.15)',
                transform: hoveredPanel === 'tech' ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(4,4,4,0.95) 0%, rgba(4,4,4,0.4) 50%, rgba(0,229,255,0.15) 100%)' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '520px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', backgroundColor: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.4)', fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', color: '#00E5FF', textTransform: 'uppercase', marginBottom: '20px' }}>
              <Cpu size={16} /> ENGINE 01 • TYPTWO TECH
            </div>

            <h3 style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>
              Engineering Intelligent Operations
            </h3>

            <p style={{ fontSize: '16px', color: '#FFFFFF', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '16px' }}>
              "Imagine if your business could remember everything. Every document. Every conversation. Every process. Every customer. Every decision."
            </p>

            <p style={{ fontSize: '14px', color: '#908F9D', lineHeight: 1.6, marginBottom: '24px' }}>
              Typtwo Tech helps organisations modernise the way they operate through intelligent systems, secure automation, and connected technology.
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#FFFFFF' }}>
                <CheckCircle2 size={16} color="#00E5FF" />
                <span>Simplify complexity and organize institutional memory</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#FFFFFF' }}>
                <CheckCircle2 size={16} color="#00E5FF" />
                <span>Automate repetitive work silently in the background</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#FFFFFF' }}>
                <CheckCircle2 size={16} color="#00E5FF" />
                <span>Zero-trust sovereign data & air-gapped protection</span>
              </li>
            </ul>

            <Link
              to="/tech"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(0,112,243,0.25)',
                border: '1px solid #00E5FF',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: hoveredPanel === 'tech' ? '0 0 30px rgba(0,229,255,0.6)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <span>Explore Typtwo Tech</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Right Side: Typtwo Studios */}
        <div 
          style={{
            flex: hoveredPanel === 'studios' ? 1.5 : hoveredPanel === 'tech' ? 0.6 : 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '64px',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            backgroundColor: '#09090C',
            overflow: 'hidden',
            minWidth: '320px'
          }}
          onMouseEnter={() => setHoveredPanel('studios')}
          onMouseLeave={() => setHoveredPanel(null)}
        >
          {/* 3D Studios Monolith Image */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
            <img 
              src="/images/studios_creative.png" 
              alt="Typtwo Studios Sovereign 3D Monolith"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: hoveredPanel === 'studios' ? 'brightness(0.55) contrast(1.2)' : 'brightness(0.35) contrast(1.15)',
                transform: hoveredPanel === 'studios' ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(4,4,4,0.95) 0%, rgba(4,4,4,0.4) 50%, rgba(212,175,55,0.15) 100%)' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '520px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.4)', fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '20px' }}>
              <Sparkles size={16} /> ENGINE 02 • TYPTWO STUDIOS
            </div>

            <h3 style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>
              Engineering Intelligent Growth
            </h3>

            <p style={{ fontSize: '16px', color: '#FFFFFF', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '16px' }}>
              "Great businesses deserve great stories. People don't remember advertisements. They remember moments, ideas, experiences, and conversations."
            </p>

            <p style={{ fontSize: '14px', color: '#908F9D', lineHeight: 1.6, marginBottom: '24px' }}>
              Typtwo Studios helps businesses create brands people trust, campaigns people remember, and content people actually want to watch.
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#FFFFFF' }}>
                <CheckCircle2 size={16} color="#D4AF37" />
                <span>Autonomous AI CMO & brand positioning strategy</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#FFFFFF' }}>
                <CheckCircle2 size={16} color="#D4AF37" />
                <span>Multilingual Voice Cloning for global founder keynotes</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#FFFFFF' }}>
                <CheckCircle2 size={16} color="#D4AF37" />
                <span>4K Generative video production & creative campaigns</span>
              </li>
            </ul>

            <Link
              to="/studios"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(212,175,55,0.25)',
                border: '1px solid #D4AF37',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: hoveredPanel === 'studios' ? '0 0 30px rgba(212,175,55,0.6)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <span>Explore Typtwo Studios</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
