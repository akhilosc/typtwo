import React from 'react';
import { ShieldCheck, Server, Lock, Users, Activity, Layers, ArrowDown, CheckCircle2 } from 'lucide-react';

export const Enterprise: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>ENTERPRISE GRADE // PRIVATE AI INFRASTRUCTURE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
          PRIVATE AI INFRASTRUCTURE.
        </h1>
        <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
          Deploy sovereign machine intelligence across your private Kubernetes clusters, on-prem bare metal servers, or air-gapped security enclaves with centralized governance.
        </p>
      </div>

      {/* Enterprise Dataflow Visual */}
      <section className="machine-panel p-8 rounded-xl border border-cyan-700/60 corner-brackets space-y-6 shadow-glow-cyan">
        <div className="text-xs text-machine-400 uppercase tracking-widest font-semibold border-b border-machine-800 pb-3 flex items-center justify-between">
          <span>SOVEREIGN ENTERPRISE AI GATEWAY TOPOLOGY</span>
          <span className="text-emerald-400 font-bold">● 100% INTERNAL INGRESS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
          {[
            { step: '01', title: 'INTERNAL USERS', sub: 'Engineers, Analysts & Apps', color: 'text-machine-100' },
            { step: '02', title: 'TYPHER GATEWAY', sub: 'Auth, RBAC & Rate Limiter', color: 'text-cyan-400' },
            { step: '03', title: 'ROUTING ENGINE', sub: 'Multi-GPU Cluster Scheduler', color: 'text-sky-400' },
            { step: '04', title: 'MODEL INSTANCES', sub: 'Typher 14B & 32B Weights', color: 'text-blue-400' },
            { step: '05', title: 'PRIVATE DATA', sub: 'Local DBs & Vector Stores', color: 'text-emerald-400' },
          ].map((s) => (
            <div key={s.step} className="p-4 rounded-lg bg-machine-900 border border-machine-800 space-y-1">
              <div className="text-[10px] text-machine-500 font-bold">{s.step}</div>
              <div className={`font-display font-bold text-xs ${s.color}`}>{s.title}</div>
              <div className="text-[10px] text-machine-400 font-sans">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Deployment Modes */}
      <section className="space-y-6">
        <div className="border-b border-machine-800 pb-4">
          <span className="tech-label text-cyan-400">DEPLOYMENT ENVIRONMENTS</span>
          <h2 className="text-2xl font-display font-bold text-machine-100 mt-1">
            DEPLOY WHEREVER SILICON LIVES
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'LOCAL WORKSTATIONS', desc: 'Installed on engineering team MacBooks and RTX workstations for instant zero-latency copilots.' },
            { title: 'PRIVATE SERVERS', desc: 'Single-node Linux boxes with NVIDIA GPUs providing shared departmental inference endpoints.' },
            { title: 'ON-PREMISE CLUSTERS', desc: 'High-density multi-node Kubernetes clusters with automated GPU load balancing and paged KV caching.' },
            { title: 'PRIVATE CLOUD (VPC)', desc: 'Deployed inside your isolated AWS, GCP, or Azure VPCs with zero external peering connections.' },
          ].map((d, i) => (
            <div key={i} className="machine-panel p-5 rounded-xl border border-machine-800 space-y-2">
              <div className="text-[10px] text-cyan-400 font-bold">MODE 0{i + 1}</div>
              <h3 className="font-display font-bold text-base text-machine-100">{d.title}</h3>
              <p className="text-xs font-sans text-machine-300 leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise Governance Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="machine-panel p-6 rounded-xl border border-machine-800 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <Lock className="w-4 h-4" />
            <span>ROLE-BASED ACCESS (RBAC)</span>
          </div>
          <p className="text-xs font-sans text-machine-300 leading-relaxed">
            Manage granular API tokens per department or project. Control which teams have access to specific parameter weights (7B vs 32B) with hard usage caps.
          </p>
        </div>

        <div className="machine-panel p-6 rounded-xl border border-machine-800 space-y-3">
          <div className="flex items-center gap-2 text-sky-400 font-bold">
            <Activity className="w-4 h-4" />
            <span>CENTRALIZED OBSERVABILITY</span>
          </div>
          <p className="text-xs font-sans text-machine-300 leading-relaxed">
            Stream real-time GPU compute saturation, memory maps, and token throughput into existing Datadog, Prometheus, or Grafana dashboards.
          </p>
        </div>

        <div className="machine-panel p-6 rounded-xl border border-machine-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>IMMUTABLE AUDIT TRAIL</span>
          </div>
          <p className="text-xs font-sans text-machine-300 leading-relaxed">
            Every prompt transaction and tool invocation is recorded to an encrypted, tamper-evident local write-ahead log for full SOC2 / ISO compliance.
          </p>
        </div>
      </section>

    </div>
  );
};
