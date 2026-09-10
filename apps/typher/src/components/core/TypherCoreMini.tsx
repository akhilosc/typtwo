import React, { useEffect, useRef } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';

interface TypherCoreMiniProps {
  size?: number;
  className?: string;
}

export const TypherCoreMini: React.FC<TypherCoreMiniProps> = ({
  size = 48,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { coreState } = useTelemetry();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const render = () => {
      time += 0.03;
      const isInferring = coreState === 'inferring';
      const speed = isInferring ? 3 : 1;

      ctx.clearRect(0, 0, size, size);
      const c = size / 2;

      // Outer ring
      ctx.save();
      ctx.translate(c, c);
      ctx.rotate(time * 0.4 * speed);
      ctx.strokeStyle = isInferring ? '#38bdf8' : 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(0, 0, c * 0.78, 0, Math.PI * 2);
      ctx.stroke();

      // Hexagon
      ctx.rotate(-time * 0.8 * speed);
      ctx.fillStyle = '#080c12';
      ctx.strokeStyle = isInferring ? '#ffffff' : 'rgba(56, 189, 248, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const hx = Math.cos(a) * (c * 0.48);
        const hy = Math.sin(a) * (c * 0.48);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Center core point
      ctx.fillStyle = isInferring ? '#ffffff' : '#38bdf8';
      ctx.beginPath();
      ctx.arc(0, 0, isInferring ? 4 : 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [size, coreState]);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} style={{ width: size, height: size }} />
    </div>
  );
};
