import { ChangelogRelease, BlogPost } from '../types';

export const CHANGELOG_DATA: ChangelogRelease[] = [
  {
    version: 'v2.4.0',
    date: 'August 28, 2026',
    codename: 'IONIC REACTOR',
    highlights: [
      'Native Apple Silicon Metal 3 unified memory pipeline with zero-copy tensor loading',
      'FlashInfer 2.0 kernel integration for 40% faster attention decoding on NVIDIA ADA GPUs',
      'Integrated speculative decoding engine with mini-draft heads'
    ],
    newFeatures: [
      'Added `typher inspect --vram-matrix` for precise allocation forecasting',
      'Introduced real-time `/v1/telemetry` SSE stream endpoint for external observability',
      'Support for 128k context windows on Typher-32B without quality degradation'
    ],
    improvements: [
      'Reduced First-Token Latency (TTFT) by 35% on Apple Silicon M3 Max',
      'Optimized disk mmap cold start times to <400ms for 14B models',
      'Enhanced CLI interactive terminal with syntax-highlighted code output'
    ],
    fixes: [
      'Fixed memory fragmentation during extended 10,000+ token multi-turn sessions',
      'Resolved CUDA out-of-memory edge case when allocating large KV-caches with context shift'
    ]
  },
  {
    version: 'v2.3.1',
    date: 'July 14, 2026',
    codename: 'TENSOR FORGE',
    highlights: [
      'Support for customized Q5_K_M quantization format across all architectures',
      'Embedded HNSW vector engine for instant local file indexing'
    ],
    newFeatures: [
      '`typher knowledge ingest` CLI command with auto-chunking for markdown & codebases',
      'Structured JSON schema enforcement via grammar-guided sampling'
    ],
    improvements: [
      'Unified daemon startup time under 150ms',
      'Enhanced Windows WSL2 CUDA acceleration stability'
    ],
    fixes: [
      'Fixed edge case where trailing newline caused premature token termination in streaming'
    ]
  },
  {
    version: 'v2.2.0',
    date: 'May 30, 2026',
    codename: 'GENESIS CORE',
    highlights: [
      'Initial release of Typher 7B, 14B, and 32B model weights',
      'Cross-platform daemon runtime for macOS, Linux, and Windows'
    ],
    newFeatures: [
      'Full OpenAI-compatible `/v1/chat/completions` REST API',
      'Native multi-threaded CPU inference engine with AVX-512 acceleration'
    ],
    improvements: [
      'Initial CLI tool suite release (`typher run`, `typher pull`, `typher list`)'
    ],
    fixes: [
      'Initial public stabilization fixes'
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Architecture of Zero-Latency Local Inference',
    slug: 'architecture-zero-latency-local-inference',
    category: 'ENGINEERING',
    date: 'September 2, 2026',
    readTime: '6 min read',
    excerpt: 'How custom Metal 3 and FlashInfer compute kernels bypass operating system overhead to saturate memory bandwidth on modern workstations.',
    author: {
      name: 'Dr. Ethan Vance',
      role: 'Principal Systems Architect, Typtwo'
    },
    content: `Running frontier intelligence locally requires solving a fundamental physics problem: **memory bandwidth saturation**. Unlike classical CPU computing where compute instructions dominate latency, autoregressive transformer token generation is strictly bound by how fast weight tensors can be streamed from RAM into compute registers.

### The Memory Bandwidth Bottleneck
During generation, every newly predicted token requires a full pass through every parameter in the model. For a 14B Q4_K_M model (~9 GB), generating 60 tokens per second necessitates reading **540 GB of data every single second**.

On Apple Silicon with Unified Memory Architecture (UMA) delivering 400 GB/s to 800 GB/s bandwidth, and on NVIDIA RTX 4090 delivering 1,008 GB/s, this throughput is entirely within reach—if the runtime eliminates CPU-GPU copy bottlenecks.

### Zero-Copy Metal & CUDA Memory Mapping (\`mmap\`)
Typher operates by direct virtual memory mapping. Rather than reading weights from disk into heap memory and subsequently copying buffers to GPU VRAM, Typher maps raw model tensors directly into the unified address space. The GPU computes directly upon mapped memory pages, yielding instantaneous start times and zero double-buffering.`
  },
  {
    id: '2',
    title: 'Why Enterprise AI Must Live on Local Infrastructure',
    slug: 'why-enterprise-ai-must-live-on-local-infrastructure',
    category: 'LOCAL LLMS',
    date: 'August 19, 2026',
    readTime: '8 min read',
    excerpt: 'Examining the regulatory, economic, and strategic imperativeness of sovereign offline LLM execution in confidential industries.',
    author: {
      name: 'Maya Lin',
      role: 'Head of Infrastructure Security, Typtwo'
    },
    content: `When proprietary codebases, confidential customer transcripts, or patent filings leave your corporate firewall to third-party API providers, they enter a shared cloud security perimeter. 

### The Triad of Local Execution:
1. **Zero Data Exfiltration Risk**: No corporate data ever traverses public internet switches.
2. **Deterministic Economics**: Cloud API providers bill linearly per token. Heavy agentic loops with 100,000+ context passes create runaway operational expenses. Local infrastructure has fixed hardware costs with zero marginal token pricing.
3. **True Offline Resilience**: Unaffected by third-party cloud outages, rate limits, or sudden model deprecations.`
  },
  {
    id: '3',
    title: 'Speculative Decoding: Predicting Tokens at 100+ Tok/s',
    slug: 'speculative-decoding-100-tokens-per-sec',
    category: 'MODELS',
    date: 'July 25, 2026',
    readTime: '5 min read',
    excerpt: 'Inside Typher’s multi-draft speculation engine that accelerates large parameter models without losing precision.',
    author: {
      name: 'Alexei Rostova',
      role: 'Lead ML Researcher, Typtwo'
    },
    content: `Speculative decoding pairs a lightweight "draft" model (or small speculative heads) with the primary large model. The draft engine rapidly guesses the next 4 to 8 tokens. In a single forward pass, the large model verifies all draft tokens simultaneously. 

Because verification takes the exact same compute as generating a single token, any correct draft guess provides free acceleration, boosting effective generation throughput by 2.2x to 3.1x on consumer hardware.`
  }
];
