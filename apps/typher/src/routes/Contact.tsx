import React, { useState } from 'react';
import { Send, CheckCircle2, Terminal, Shield, MessageSquare, ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const [route, setRoute] = useState<'ENTERPRISE' | 'DEVELOPERS' | 'GENERAL'>('ENTERPRISE');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    hardwareSetup: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
          <MessageSquare className="w-4 h-4" />
          <span>TRANSMISSION LINE // DIRECT ARCHITECT ACCESS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
          CONNECT TO THE MACHINE.
        </h1>
        <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
          Open a direct transmission channel with our systems architecture team for sovereign private enterprise deployments or developer integrations.
        </p>
      </div>

      {/* 3 Transmission Routes Selector */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { id: 'ENTERPRISE', label: 'ENTERPRISE DEPLOY', icon: Shield },
          { id: 'DEVELOPERS', label: 'DEVELOPER INTEGRATION', icon: Terminal },
          { id: 'GENERAL', label: 'GENERAL INQUIRY', icon: MessageSquare },
        ].map((r) => {
          const Icon = r.icon;
          const isSelected = route === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                setRoute(r.id as any);
                setSubmitted(false);
              }}
              className={`p-4 rounded-xl border text-center font-mono transition-all space-y-1.5 ${
                isSelected
                  ? 'bg-cyan-950 border-cyan-500/80 text-cyan-300 font-bold shadow-glow-cyan'
                  : 'bg-machine-900/70 border-machine-800 text-machine-400 hover:text-machine-200'
              }`}
            >
              <div className="flex justify-center">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-machine-500'}`} />
              </div>
              <div className="text-xs">{r.label}</div>
            </button>
          );
        })}
      </div>

      {/* Form or Confirmation */}
      <div className="machine-panel p-6 sm:p-10 rounded-xl border border-machine-750 corner-brackets">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto shadow-glow-green">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-2xl text-machine-100">
              TRANSMISSION PACKET DISPATCHED
            </h3>
            <p className="text-sm font-sans text-machine-300 max-w-md mx-auto">
              Our lead systems engineers have received your transmission and will respond via encrypted channel within 12 operational hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 rounded bg-machine-900 border border-machine-750 text-machine-300 hover:text-cyan-300 text-xs font-mono"
            >
              DISPATCH ANOTHER PACKET
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-widest border-b border-machine-800 pb-2">
              DISPATCH ROUTE: {route}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="tech-label block mb-1.5">NAME // TRANSMITTER</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Alex Rivera"
                  className="w-full bg-machine-950 border border-machine-800 rounded p-2.5 text-xs text-machine-100 focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>

              <div>
                <label className="tech-label block mb-1.5">CORPORATE / WORK EMAIL</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@enterprise.com"
                  className="w-full bg-machine-950 border border-machine-800 rounded p-2.5 text-xs text-machine-100 focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="tech-label block mb-1.5">ORGANIZATION</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="Acme Aerospace & Defense"
                  className="w-full bg-machine-950 border border-machine-800 rounded p-2.5 text-xs text-machine-100 focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>

              <div>
                <label className="tech-label block mb-1.5">TARGET SILICON INFRASTRUCTURE</label>
                <input
                  type="text"
                  value={formData.hardwareSetup}
                  onChange={(e) => setFormData({ ...formData, hardwareSetup: e.target.value })}
                  placeholder="8x NVIDIA RTX 4090 Workstations / Apple M3 Max"
                  className="w-full bg-machine-950 border border-machine-800 rounded p-2.5 text-xs text-machine-100 focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="tech-label block mb-1.5">SYSTEM REQUIREMENTS // INQUIRY</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your intended air-gap deployment topology, concurrency requirements, or custom fine-tuning objectives..."
                className="w-full bg-machine-950 border border-machine-800 rounded p-2.5 text-xs text-machine-100 focus:outline-none focus:border-cyan-500 font-sans resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/80 hover:border-cyan-400 text-cyan-200 font-mono text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-glow-cyan"
            >
              <Send className="w-4 h-4 text-cyan-400" />
              TRANSMIT DISPATCH PACKET
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
