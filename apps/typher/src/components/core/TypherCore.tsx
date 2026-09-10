import React, { useEffect, useRef, useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';

interface TypherCoreProps {
  size?: number;
  className?: string;
  interactive?: boolean;
}

export const TypherCore: React.FC<TypherCoreProps> = ({
  size = 560,
  className = '',
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { coreState, telemetry } = useTelemetry();
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // High DPI scaling
    const dpr = window.devicePixelRatio || 1;
    const width = size;
    const height = size;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Particle system
    const numParticles = 80;
    const particles = Array.from({ length: numParticles }, (_, i) => ({
      angle: (i / numParticles) * Math.PI * 2,
      radius: 90 + Math.random() * 140,
      speed: (0.004 + Math.random() * 0.008) * (Math.random() > 0.5 ? 1 : -1),
      size: 1 + Math.random() * 2.5,
      alpha: 0.2 + Math.random() * 0.7,
      streamOffset: Math.random() * Math.PI * 2,
    }));

    // Data streams (inference particles)
    const streamRays = Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * Math.PI * 2,
      progress: Math.random(),
      speed: 0.01 + Math.random() * 0.015,
      length: 30 + Math.random() * 50,
    }));

    const render = () => {
      time += 0.016;

      // Mouse smoothing
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.06;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.06;

      const centerX = width / 2 + mousePos.current.x * 15;
      const centerY = height / 2 + mousePos.current.y * 15;

      ctx.clearRect(0, 0, width, height);

      // Activity Multipliers
      const isInferring = coreState === 'inferring';
      const isProcessing = coreState === 'processing';
      const speedMultiplier = isInferring ? 3.5 : isProcessing ? 2.0 : isHovered ? 1.4 : 1.0;
      const intensity = isInferring ? 1.0 : isProcessing ? 0.8 : 0.45;

      // 1. Ambient Volumetric Glow
      const glowGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 240);
      glowGrad.addColorStop(0, `rgba(56, 189, 248, ${0.35 * intensity})`);
      glowGrad.addColorStop(0.3, `rgba(14, 165, 233, ${0.15 * intensity})`);
      glowGrad.addColorStop(0.7, `rgba(8, 12, 18, ${0.05 * intensity})`);
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 240, 0, Math.PI * 2);
      ctx.fill();

      // 2. Outer Technical Measurement Rings
      ctx.save();
      ctx.translate(centerX, centerY);

      // Ring 1 - Outermost segmented tracking ring (slow clockwise)
      ctx.rotate(time * 0.1 * speedMultiplier);
      ctx.strokeStyle = `rgba(56, 189, 248, ${0.18 + 0.1 * intensity})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 14, 2, 14]);
      ctx.beginPath();
      ctx.arc(0, 0, 210, 0, Math.PI * 2);
      ctx.stroke();

      // Outer Nodes on Ring 1
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const nx = Math.cos(a) * 210;
        const ny = Math.sin(a) * 210;
        ctx.fillStyle = isInferring ? '#38bdf8' : 'rgba(56, 189, 248, 0.4)';
        ctx.beginPath();
        ctx.arc(nx, ny, isInferring ? 3.5 : 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ring 2 - Mechanical Containment Ring (counter-clockwise)
      ctx.restore();
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(-time * 0.14 * speedMultiplier);

      ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + 0.15 * intensity})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([40, 20, 10, 20]);
      ctx.beginPath();
      ctx.arc(0, 0, 175, 0, Math.PI * 2);
      ctx.stroke();

      // Ring 3 - High Precision Inner Stator
      ctx.restore();
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.22 * speedMultiplier);

      ctx.strokeStyle = `rgba(56, 189, 248, ${0.3 + 0.3 * intensity})`;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.arc(0, 0, 135, 0, Math.PI * 2);
      ctx.stroke();

      // Compass Crosshairs & Telemetry Ticks
      ctx.setLineDash([]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const x1 = Math.cos(a) * 125;
        const y1 = Math.sin(a) * 125;
        const x2 = Math.cos(a) * (i % 3 === 0 ? 145 : 135);
        const y2 = Math.sin(a) * (i % 3 === 0 ? 145 : 135);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      ctx.restore();

      // 3. Inference Data Channel Rays
      if (isInferring || isProcessing) {
        streamRays.forEach((ray) => {
          ray.progress += ray.speed * (isInferring ? 2.5 : 1.2);
          if (ray.progress > 1) ray.progress = 0;

          const r1 = 60 + ray.progress * 140;
          const r2 = r1 + ray.length * (1 - ray.progress * 0.5);
          const x1 = centerX + Math.cos(ray.angle) * r1;
          const y1 = centerY + Math.sin(ray.angle) * r1;
          const x2 = centerX + Math.cos(ray.angle) * r2;
          const y2 = centerY + Math.sin(ray.angle) * r2;

          const rayGrad = ctx.createLinearGradient(x1, y1, x2, y2);
          rayGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
          rayGrad.addColorStop(0.5, isInferring ? 'rgba(255, 255, 255, 0.9)' : 'rgba(56, 189, 248, 0.6)');
          rayGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

          ctx.strokeStyle = rayGrad;
          ctx.lineWidth = isInferring ? 2.5 : 1.5;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        });
      }

      // 4. Orbiting Quantum Processing Particles
      particles.forEach((p) => {
        p.angle += p.speed * speedMultiplier;
        const px = centerX + Math.cos(p.angle) * p.radius;
        const py = centerY + Math.sin(p.angle) * p.radius;

        ctx.fillStyle = isInferring ? '#ffffff' : `rgba(56, 189, 248, ${p.alpha * intensity + 0.2})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size * (isInferring ? 1.4 : 1), 0, Math.PI * 2);
        ctx.fill();

        // Particle trail during inference
        if (isInferring && Math.random() > 0.6) {
          const tx = centerX + Math.cos(p.angle - p.speed * 4) * p.radius;
          const ty = centerY + Math.sin(p.angle - p.speed * 4) * p.radius;
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(tx, ty);
          ctx.stroke();
        }
      });

      // 5. Central Hexagonal Computational Reactor
      ctx.save();
      ctx.translate(centerX, centerY);

      // Inner Hexagon rotation
      const hexPulse = 1 + Math.sin(time * 3 * speedMultiplier) * (isInferring ? 0.08 : 0.03);
      const hexRadius = 64 * hexPulse;

      // Hexagon Outer Chassis
      ctx.rotate(time * 0.08 * speedMultiplier);
      ctx.fillStyle = 'rgba(8, 12, 18, 0.92)';
      ctx.strokeStyle = isInferring ? 'rgba(255, 255, 255, 0.9)' : `rgba(56, 189, 248, ${0.4 + 0.4 * intensity})`;
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const hx = Math.cos(a) * hexRadius;
        const hy = Math.sin(a) * hexRadius;
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Hexagon Corner Nodes
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const hx = Math.cos(a) * hexRadius;
        const hy = Math.sin(a) * hexRadius;
        ctx.fillStyle = isInferring ? '#38bdf8' : '#10b981';
        ctx.beginPath();
        ctx.arc(hx, hy, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Inner Core Hexagon (Counter-Rotating)
      ctx.rotate(-time * 0.18 * speedMultiplier);
      const innerHexRadius = hexRadius * 0.58;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const hx = Math.cos(a) * innerHexRadius;
        const hy = Math.sin(a) * innerHexRadius;
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();

      // Central Plasma Core Singularity
      const coreGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 22 * hexPulse);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.3, isInferring ? '#e0f2fe' : '#38bdf8');
      coreGrad.addColorStop(0.8, isInferring ? 'rgba(56, 189, 248, 0.8)' : 'rgba(14, 165, 233, 0.4)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 22 * hexPulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // 6. Technical Overlay Text Readouts around Reactor
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(139, 162, 192, 0.6)';
      ctx.fillText(`REACTOR_ST: ${coreState.toUpperCase()}`, centerX - 210, centerY - 220);
      ctx.fillText(`SYS_HZ: ${(speedMultiplier * 60).toFixed(0)} FPS`, centerX + 110, centerY - 220);
      ctx.fillText(`CORE_TEMP: ${telemetry.temperature.toFixed(2)}`, centerX - 210, centerY + 230);
      ctx.fillText(`VRAM: ${telemetry.vramUsageGb.toFixed(1)}GB`, centerX + 120, centerY + 230);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mousePos.current.targetX = Math.max(-1, Math.min(1, x));
      mousePos.current.targetY = Math.max(-1, Math.min(1, y));
    };

    const handleMouseLeave = () => {
      mousePos.current.targetX = 0;
      mousePos.current.targetY = 0;
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [size, coreState, telemetry, isHovered, interactive]);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="cursor-crosshair max-w-full h-auto drop-shadow-2xl"
      />
    </div>
  );
};
