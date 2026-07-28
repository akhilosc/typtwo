import React, { useState } from 'react';
import { Globe, Play, Pause, Sparkles } from 'lucide-react';

export const VoiceCloningV9 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English (Global Founder Replica)');

  const languages = [
    { name: 'English (Global Founder Replica)', accent: 'Authentic Keynote Replica' },
    { name: 'Japanese (Tokyo Summit)', accent: 'Native Cadence & Tone' },
    { name: 'German (Frankfurt Executive)', accent: 'High Precision Synthesis' },
    { name: 'Spanish (Madrid Forum)', accent: 'Natural Vocal Inflection' },
  ];

  return (
    <section style={{ padding: '100px 0', backgroundColor: '#09090C', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ backgroundColor: '#111115', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '24px', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', boxShadow: '0 0 50px rgba(212,175,55,0.15)' }}>
          
          {/* Left Column: Visual Replica Image */}
          <div style={{ position: 'relative', minHeight: '440px', display: 'flex', alignItems: 'flex-end', padding: '32px' }}>
            <img 
              src="/images/voice_cloning.jpg" 
              alt="Multilingual Voice Replica Keynote"
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7) contrast(1.1)' }}
            />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, #111115 0%, rgba(17,17,21,0.4) 60%, transparent 100%)' }} />
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', backgroundColor: 'rgba(17,17,21,0.9)', border: '1px solid #D4AF37', color: '#D4AF37', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>
                <Sparkles size={14} /> FOUNDER SPEECH REPLICA
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>Global Keynote Synthesis</h3>
              <p style={{ fontSize: '12px', color: '#CBD5E1' }}>Record once. Broadcast in 100+ languages with full founder accent retention.</p>
            </div>
          </div>

          {/* Right Column: Controls & Player */}
          <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
              MULTILINGUAL VOICE ENGINE
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>Interactive Voice Visualizer</h2>
            <p style={{ fontSize: '14px', color: '#908F9D', lineHeight: 1.6, marginBottom: '24px' }}>
              Synthesise high-fidelity founder voice replicas across global markets with zero re-recording.
            </p>

            {/* Language Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {languages.map((l) => (
                <button
                  key={l.name}
                  onClick={() => setSelectedLang(l.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid',
                    textAlign: 'left',
                    cursor: 'pointer',
                    backgroundColor: selectedLang === l.name ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.03)',
                    borderColor: selectedLang === l.name ? '#D4AF37' : 'rgba(255,255,255,0.1)',
                    color: selectedLang === l.name ? '#F5D77F' : '#908F9D',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Globe size={16} color="#D4AF37" />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700 }}>{l.name}</div>
                    <div style={{ fontSize: '11px', opacity: 0.7 }}>{l.accent}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Player Controls */}
            <div style={{ padding: '16px 20px', borderRadius: '9999px', backgroundColor: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F5D77F 0%, #D4AF37 100%)',
                  border: 'none',
                  color: '#040404',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(212,175,55,0.4)'
                }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
              </button>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '20px', marginBottom: '4px' }}>
                  {[...Array(16)].map((_, i) => (
                    <span 
                      key={i} 
                      style={{
                        width: '4px',
                        borderRadius: '2px',
                        backgroundColor: '#D4AF37',
                        height: isPlaying ? (i % 2 === 0 ? '16px' : '8px') : '4px',
                        opacity: isPlaying ? 1 : 0.4,
                        transition: 'height 0.3s ease'
                      }} 
                    />
                  ))}
                </div>
                <span style={{ fontSize: '11px', color: '#908F9D' }}>
                  {isPlaying ? `Playing ${selectedLang}...` : 'Click play to test audio replica'}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
