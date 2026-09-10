import React from 'react';
import { useTelemetry } from '../../context/TelemetryContext';

interface SystemStatusProps {
  className?: string;
  showText?: boolean;
}

export const SystemStatus: React.FC<SystemStatusProps> = ({
  className = '',
  showText = true,
}) => {
  const { telemetry, coreState } = useTelemetry();

  const isGreen = telemetry.systemStatus === 'ONLINE' || telemetry.systemStatus === 'READY';
  const isCyan = telemetry.systemStatus === 'ACTIVE';
  const isAmber = telemetry.systemStatus === 'PROCESSING';

  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded bg-machine-900/90 border border-machine-800 text-xs font-mono tracking-wider ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            isCyan ? 'bg-cyan-400' : isAmber ? 'bg-amber-400' : 'bg-emerald-400'
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isCyan ? 'bg-cyan-400' : isAmber ? 'bg-amber-400' : 'bg-emerald-500'
          }`}
        />
      </span>
      {showText && (
        <span
          className={`font-medium ${
            isCyan ? 'text-cyan-300' : isAmber ? 'text-amber-300' : 'text-emerald-400'
          }`}
        >
          {telemetry.systemStatus}
        </span>
      )}
    </div>
  );
};
