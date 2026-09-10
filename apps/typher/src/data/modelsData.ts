import { ModelSpec } from '../types';

export const TYPHER_MODELS: ModelSpec[] = [
  {
    id: 'typher-7b',
    name: 'TYPHER 7B',
    parameters: '7.24 Billion',
    contextLength: '32,768 tokens',
    minVram: '5.2 GB',
    recommendedVram: '8.0 GB',
    architecture: 'Dense Transformer / RoPE / GQA / SwiGLU',
    targetHardware: ['Apple Silicon M1/M2/M3 (8GB+)', 'NVIDIA RTX 3060+ (6GB+)', 'AMD Radeon RX 6700+', 'Intel Core Ultra NPU'],
    capabilities: [
      'High-throughput code completion & generation',
      'Low-latency interactive chat (<25ms TTFT)',
      'Structured JSON & function calling schema outputs',
      'Embedded on-device agent execution'
    ],
    quantizations: [
      { format: 'Q4_K_M', size: '4.37 GB', ramReq: '5.8 GB', speedRating: '112 tok/s', accuracyRating: '98.4%' },
      { format: 'Q5_K_M', size: '5.13 GB', ramReq: '6.7 GB', speedRating: '94 tok/s', accuracyRating: '99.1%' },
      { format: 'Q8_0', size: '7.70 GB', ramReq: '9.4 GB', speedRating: '68 tok/s', accuracyRating: '99.8%' },
      { format: 'FP16', size: '14.48 GB', ramReq: '16.8 GB', speedRating: '42 tok/s', accuracyRating: '100.0%' },
    ],
    description: 'Ultra-efficient local reasoning model engineered for developer laptops, embedded edge nodes, and rapid zero-latency automation loops.',
    pullCommand: 'typher pull typher-7b:latest',
    idealFor: 'Software engineers, coding copilots, local autonomous agents, and low-power portable workstations.'
  },
  {
    id: 'typher-14b',
    name: 'TYPHER 14B',
    parameters: '14.77 Billion',
    contextLength: '65,536 tokens',
    minVram: '9.4 GB',
    recommendedVram: '16.0 GB',
    architecture: 'Grouped-Query Attention Transformer / FlashInfer Native',
    targetHardware: ['Apple Silicon M1/M2/M3 Pro/Max (18GB+)', 'NVIDIA RTX 4070 Ti / 3090 (12GB+)', 'Dual GPU Workstations'],
    capabilities: [
      'Complex multi-step algorithmic reasoning',
      'Deep document synthesis & 64k RAG analysis',
      'Multi-turn tool orchestration & memory state tracking',
      'Domain-specific technical & mathematical proofing'
    ],
    quantizations: [
      { format: 'Q4_K_M', size: '8.98 GB', ramReq: '10.5 GB', speedRating: '64 tok/s', accuracyRating: '98.7%' },
      { format: 'Q5_K_M', size: '10.82 GB', ramReq: '12.8 GB', speedRating: '52 tok/s', accuracyRating: '99.4%' },
      { format: 'Q8_0', size: '15.91 GB', ramReq: '18.2 GB', speedRating: '38 tok/s', accuracyRating: '99.9%' },
      { format: 'FP16', size: '29.54 GB', ramReq: '32.0 GB', speedRating: '24 tok/s', accuracyRating: '100.0%' },
    ],
    description: 'The optimal balance of deep frontier-class reasoning and local hardware efficiency. The flagship workhorse for privacy-critical enterprise teams.',
    pullCommand: 'typher pull typher-14b:latest',
    idealFor: 'Legal document analysis, confidential financial modeling, internal knowledge bases, and enterprise agent pipelines.'
  },
  {
    id: 'typher-32b',
    name: 'TYPHER 32B',
    parameters: '32.50 Billion',
    contextLength: '131,072 tokens',
    minVram: '19.8 GB',
    recommendedVram: '32.0 GB',
    architecture: 'High-Capacity Deep Attention Stack / Speculative Decoding Runtime',
    targetHardware: ['Apple Silicon M-Series Studio (36GB+ / 64GB+)', 'NVIDIA RTX 4090 / RTX 6000 Ada (24GB+ / 48GB+)', 'Dedicated On-Prem Server Racks'],
    capabilities: [
      'Frontier-grade reasoning comparable to closed cloud models',
      'Massive 128k context window comprehension without truncation',
      'Advanced multi-lingual translation & polyglot code refactoring',
      'Autonomous multi-agent swarms with local persistent state'
    ],
    quantizations: [
      { format: 'Q4_K_M', size: '19.40 GB', ramReq: '22.5 GB', speedRating: '38 tok/s', accuracyRating: '99.1%' },
      { format: 'Q5_K_M', size: '23.60 GB', ramReq: '27.0 GB', speedRating: '31 tok/s', accuracyRating: '99.6%' },
      { format: 'Q8_0', size: '34.80 GB', ramReq: '39.0 GB', speedRating: '22 tok/s', accuracyRating: '99.9%' },
      { format: 'FP16', size: '65.00 GB', ramReq: '72.0 GB', speedRating: '14 tok/s', accuracyRating: '100.0%' },
    ],
    description: 'Heavyweight enterprise machine intelligence. Runs entirely offline on high-end local workstations or dedicated private data centers.',
    pullCommand: 'typher pull typher-32b:latest',
    idealFor: 'Deep research labs, classified defense computing, sovereign data centers, and multi-user corporate LLM servers.'
  }
];
