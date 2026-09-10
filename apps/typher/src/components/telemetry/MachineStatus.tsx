import React, { useEffect, useRef } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { SystemStatus } from './SystemStatus';

interface MachineStatusProps {
  className?: string;
}

export const MachineStatus: React.FC<MachineStatusProps> = ({ className = '' }) => {
  const { telemetry, coreState } = useTelemetry();
  const waveCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render continuous live seismograph/frequency wave line matching mockup
  useEffect(() => {
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const dpr = window.devicePixelRatio || 1;
    const width = 240;
    const height = 44;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const render = () => {
      time += 0.04;
      ctx.clearRect(0, 0, width, height);

      const isInferring = coreState === 'inferring';
      const amp = isInferring ? 14 : 7;
      const freq = isInferring ? 0.08 : 0.04;

      // Draw faint baseline
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Draw waveform
      ctx.strokeStyle = isInferring ? '#38bdf8' : 'rgba(56, 189, 248, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = isInferring ? 8 : 4;

      ctx.beginPath();
      for (let x = 0; x < width; x += 2) {
        // Multi-frequency wave synthesis with organic spikes
        const y =
          height / 2 +
          Math.sin(x * freq + time) * amp * 0.6 +
          Math.sin(x * (freq * 2.3) - time * 1.5) * amp * 0.35 +
          (Math.random() - 0.5) * (isInferring ? 3 : 1);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [coreState]);

  return (
    <div className={`machine-panel p-5 rounded-xl border border-machine-700/90 font-mono text-xs corner-brackets ${className}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-machine-800 pb-3 mb-4">
        <span className="font-display font-bold text-xs tracking-wider text-machine-100">
          TYPHER CORE
        </span>
        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ONLINE
        </span>
      </div>

      {/* Structured Metrics Rows matching mockup */}
      <div className="space-y-2 text-[11px]">
        
        <div className="flex items-center justify-between">
          <span className="text-machine-500 font-bold uppercase">MODEL</span>
          <span className="font-semibold text-machine-100">TYPHER 14B</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-machine-500 font-bold uppercase">TOKENS / S</span>
          <span className="font-bold text-cyan-300 text-glow-cyan">{telemetry.tokensPerSec || 48.2}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-machine-500 font-bold uppercase">CONTEXT</span>
          <span className="text-machine-200">2,184 / 8,192</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-machine-500 font-bold uppercase">GPU</span>
          <span className="text-machine-200">67%</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-machine-500 font-bold uppercase">VRAM</span>
          <span className="text-machine-200">8.4 GB</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-machine-500 font-bold uppercase">TEMP</span>
          <span className="text-machine-200">42°C</span>
        </div>

      </div>

      {/* Seismograph Oscilloscope Waveform Canvas */}
      <div className="mt-4 pt-3 border-t border-machine-800 flex flex-col items-center">
        <canvas
          ref={waveCanvasRef}
          style={{ width: '100%', height: 44 }}
          className="w-full h-11 block"
        />
      </div>

    </div>
  );
};
