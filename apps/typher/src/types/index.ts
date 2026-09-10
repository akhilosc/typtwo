export type CoreState = 'idle' | 'processing' | 'inferring';

export interface TelemetryData {
  modelName: string;
  parameters: string;
  tokensPerSec: number;
  totalTokensGenerated: number;
  contextUsage: number;
  contextMax: number;
  gpuUtilization: number;
  vramUsageGb: number;
  vramMaxGb: number;
  latencyMs: number;
  temperature: number;
  topP: number;
  systemStatus: 'ONLINE' | 'ACTIVE' | 'PROCESSING' | 'READY';
}

export interface ModelSpec {
  id: string;
  name: string;
  parameters: string;
  contextLength: string;
  minVram: string;
  recommendedVram: string;
  quantizations: {
    format: string;
    size: string;
    ramReq: string;
    speedRating: string;
    accuracyRating: string;
  }[];
  architecture: string;
  targetHardware: string[];
  capabilities: string[];
  description: string;
  pullCommand: string;
  idealFor: string;
}

export interface DocArticle {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  codeSnippet?: string;
  language?: string;
}

export interface ChangelogRelease {
  version: string;
  date: string;
  codename: string;
  highlights: string[];
  newFeatures: string[];
  improvements: string[];
  fixes: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'AI' | 'LOCAL LLMS' | 'ENGINEERING' | 'MODELS' | 'RESEARCH';
  date: string;
  readTime: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
  };
  content: string;
}
