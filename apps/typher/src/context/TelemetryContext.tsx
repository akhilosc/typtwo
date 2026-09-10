import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TelemetryData, CoreState } from '../types';

interface TelemetryContextType {
  telemetry: TelemetryData;
  coreState: CoreState;
  setCoreState: (state: CoreState) => void;
  triggerInferenceBurst: (durationMs?: number, tokenCount?: number) => void;
  setModel: (modelId: string) => void;
  updateParameters: (temp: number, topP: number) => void;
}

const defaultTelemetry: TelemetryData = {
  modelName: 'TYPHER 14B Q4_K_M',
  parameters: '14.77B',
  tokensPerSec: 64.2,
  totalTokensGenerated: 148920,
  contextUsage: 8192,
  contextMax: 65536,
  gpuUtilization: 42,
  vramUsageGb: 8.98,
  vramMaxGb: 16.0,
  latencyMs: 18.2,
  temperature: 0.3,
  topP: 0.9,
  systemStatus: 'ONLINE',
};

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export const TelemetryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [telemetry, setTelemetry] = useState<TelemetryData>(defaultTelemetry);
  const [coreState, setCoreState] = useState<CoreState>('idle');

  // Subtle real-time telemetry fluctuations to simulate a living computational machine
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const isInferring = coreState === 'inferring';
        const isProcessing = coreState === 'processing';

        const jitter = (Math.random() - 0.5) * 2;
        const targetGpu = isInferring ? 88 + jitter * 4 : isProcessing ? 65 + jitter * 5 : 28 + jitter * 3;
        const targetToks = isInferring ? (prev.modelName.includes('7B') ? 112 : prev.modelName.includes('14B') ? 64 : 38) + jitter * 3 : 0;
        const targetLatency = isInferring ? 16.4 + jitter : 18.2 + jitter * 0.5;

        return {
          ...prev,
          gpuUtilization: Math.max(10, Math.min(99, Math.round(targetGpu))),
          tokensPerSec: isInferring ? Math.max(10, parseFloat(targetToks.toFixed(1))) : 0,
          latencyMs: parseFloat(targetLatency.toFixed(1)),
          systemStatus: isInferring ? 'ACTIVE' : isProcessing ? 'PROCESSING' : 'ONLINE',
          totalTokensGenerated: isInferring ? prev.totalTokensGenerated + Math.round(targetToks * 0.5) : prev.totalTokensGenerated,
        };
      });
    }, 500);

    return () => clearInterval(interval);
  }, [coreState]);

  const triggerInferenceBurst = (durationMs: number = 3000, tokenCount: number = 180) => {
    setCoreState('processing');
    setTimeout(() => {
      setCoreState('inferring');
      setTimeout(() => {
        setCoreState('idle');
        setTelemetry((prev) => ({
          ...prev,
          totalTokensGenerated: prev.totalTokensGenerated + tokenCount,
          systemStatus: 'ONLINE',
        }));
      }, durationMs);
    }, 400);
  };

  const setModel = (modelId: string) => {
    if (modelId === 'typher-7b') {
      setTelemetry((prev) => ({
        ...prev,
        modelName: 'TYPHER 7B Q4_K_M',
        parameters: '7.24B',
        vramUsageGb: 4.37,
        vramMaxGb: 8.0,
        tokensPerSec: 112.4,
        contextMax: 32768,
      }));
    } else if (modelId === 'typher-32b') {
      setTelemetry((prev) => ({
        ...prev,
        modelName: 'TYPHER 32B Q4_K_M',
        parameters: '32.50B',
        vramUsageGb: 19.40,
        vramMaxGb: 32.0,
        tokensPerSec: 38.6,
        contextMax: 131072,
      }));
    } else {
      setTelemetry((prev) => ({
        ...prev,
        modelName: 'TYPHER 14B Q4_K_M',
        parameters: '14.77B',
        vramUsageGb: 8.98,
        vramMaxGb: 16.0,
        tokensPerSec: 64.2,
        contextMax: 65536,
      }));
    }
  };

  const updateParameters = (temp: number, topP: number) => {
    setTelemetry((prev) => ({
      ...prev,
      temperature: temp,
      topP: topP,
    }));
  };

  return (
    <TelemetryContext.Provider
      value={{
        telemetry,
        coreState,
        setCoreState,
        triggerInferenceBurst,
        setModel,
        updateParameters,
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = () => {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
};
