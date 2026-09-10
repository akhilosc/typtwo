import { DocArticle } from '../types';

export const DOCS_DATA: DocArticle[] = [
  // GETTING STARTED
  {
    id: 'intro',
    category: 'GETTING STARTED',
    title: 'Introduction to Typher',
    description: 'The philosophy, architecture, and computational execution model of Typher local runtime.',
    content: `Typher is a high-performance, deterministic local language model runtime and developer platform designed to run state-of-the-art transformer architectures directly on personal hardware, workstations, and private servers.

### Architectural Tenets
1. **Zero Cloud Telemetry**: Prompt inputs, model weights, KV-caches, and token outputs never exit your local machine's memory boundaries.
2. **Native Hardware Optimization**: Direct compute bindings for Apple Silicon Metal 3, NVIDIA CUDA with FlashInfer, and AMD ROCm.
3. **Deterministic Memory Management**: Exact unified memory allocation with zero garbage collection spikes during inference.
4. **Standardized API Interface**: Fully compatible with OpenAI-compatible REST endpoints (\`/v1/chat/completions\`) and high-speed native gRPC streams.`,
    codeSnippet: `# Quick launch daemon
curl -fsSL https://typher.typtwo.com/install.sh | bash
typher run typher-14b`,
    language: 'bash'
  },
  {
    id: 'installation',
    category: 'GETTING STARTED',
    title: 'Installation & Setup',
    description: 'Installing the Typher CLI, daemon binary, and runtime drivers across operating systems.',
    content: `Install Typher using our verified installation script or direct standalone package managers.

### macOS (Apple Silicon & Intel)
\`\`\`bash
# Homebrew
brew tap typtwo/typher
brew install typher

# Direct Shell Script
curl -fsSL https://typher.typtwo.com/install.sh | sh
\`\`\`

### Linux (Ubuntu, Debian, Fedora, Arch)
\`\`\`bash
curl -fsSL https://typher.typtwo.com/install.sh | sh
sudo systemctl enable --now typherd
\`\`\`

### Windows (WSL2 & Native PowerShell)
\`\`\`powershell
irm https://typher.typtwo.com/install.ps1 | iex
\`\`\``,
    codeSnippet: `# Verify system readiness
typher doctor`,
    language: 'bash'
  },
  {
    id: 'requirements',
    category: 'GETTING STARTED',
    title: 'System Requirements',
    description: 'Hardware tier specifications for running 7B, 14B, and 32B model weights locally.',
    content: `### Minimum Specifications (7B Model)
* **CPU**: Apple Silicon M1 (8-core) or Intel/AMD x86_64 with AVX2 support
* **RAM / Unified Memory**: 8 GB minimum (16 GB recommended)
* **Storage**: 10 GB high-speed NVMe SSD
* **OS**: macOS 13+, Ubuntu 22.04+, Windows 11 (64-bit)

### Recommended Specifications (14B / 32B Frontier)
* **Apple Silicon**: M2/M3 Pro, Max, or Ultra with 36GB+ Unified Memory
* **NVIDIA Workstation**: RTX 3090, 4080, 4090 (16GB - 24GB VRAM) or RTX 6000 Ada
* **Storage**: 50 GB PCIe Gen4 NVMe for rapid model weight memory-mapping (\`mmap\`)`,
  },
  {
    id: 'first-run',
    category: 'GETTING STARTED',
    title: 'First Run & Daemon Activation',
    description: 'Pulling your first model and launching the interactive console.',
    content: `After installation, start the local Typher engine daemon.

\`\`\`bash
# Start background daemon
typherd start

# Pull the lightweight 7B model
typher pull typher-7b

# Launch interactive terminal session
typher run typher-7b
\`\`\`

You can now interactively stream tokens or query the model via HTTP \`http://127.0.0.1:11434/v1\`.`,
    codeSnippet: `typher run typher-7b --temp 0.2 --ctx 8192`,
    language: 'bash'
  },

  // MODELS
  {
    id: 'model-management',
    category: 'MODELS',
    title: 'Model Management & Registry',
    description: 'Listing, inspecting, pinning, and pruning local GGUF and safetensors weights.',
    content: `Manage locally stored neural network weights with sub-second CLI operations.

### Key CLI Commands
* \`typher list\` — Displays all downloaded models, sizes, quantizations, and memory footprints.
* \`typher inspect <model>\` — Shows architecture layers, tensor precision, and context limits.
* \`typher rm <model>\` — Safely cleans weight tensors from disk.`,
    codeSnippet: `# List local models
$ typher list
NAME          ID          SIZE      QUANT    VRAM REQ   STATUS
typher-7b     8f92a1      4.37 GB   Q4_K_M   5.8 GB     READY
typher-14b    3c41b8      8.98 GB   Q4_K_M   10.5 GB    READY
typher-32b    d90e22     19.40 GB   Q4_K_M   22.5 GB    READY`,
    language: 'bash'
  },
  {
    id: 'quantization',
    category: 'MODELS',
    title: 'Quantization Formats & Matrix',
    description: 'Understanding Q4_K_M, Q5_K_M, Q8_0, and unquantized FP16 memory tradeoffs.',
    content: `Typher incorporates customized low-bit integer quantization kernels optimized for memory bandwidth saturation.

* **Q4_K_M (4-bit Medium K-Quant)**: The industry standard. Delivers 98.5%+ FP16 perplexity with a ~70% reduction in VRAM.
* **Q5_K_M (5-bit Medium K-Quant)**: Near zero loss in complex math reasoning tasks.
* **Q8_0 (8-bit Quantization)**: Exact reproduction of original 16-bit weight distribution for precision-critical outputs.
* **FP16 (Half Precision 16-bit)**: Native unquantized weights requiring full uncompressed VRAM.`,
  },

  // INFERENCE
  {
    id: 'streaming-chat',
    category: 'INFERENCE',
    title: 'Streaming Inference & Tokenization',
    description: 'Low-latency token generation lifecycle and Server-Sent Events (SSE) streaming.',
    content: `Typher uses speculative decoding and FlashInfer kernels to achieve instant First-Token-Latency (<20ms).

### Streaming Over REST
The daemon exposes standard SSE streams:`,
    codeSnippet: `curl http://localhost:11434/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "typher-14b",
    "messages": [{"role": "user", "content": "Explain KV-cache optimization."}],
    "stream": true,
    "temperature": 0.3
  }'`,
    language: 'bash'
  },
  {
    id: 'parameters',
    category: 'INFERENCE',
    title: 'Sampling Parameters & Hyperparameters',
    description: 'Fine-tuning temperature, top_p, min_p, repeat_penalty, and context window lengths.',
    content: `| Parameter | Type | Default | Description |
|---|---|---|---|
| \`temperature\` | float | \`0.7\` | Controls stochastic randomness. \`0.0\` is strictly deterministic. |
| \`top_p\` | float | \`0.9\` | Nucleus sampling probability cutoff. |
| \`min_p\` | float | \`0.05\` | Dynamic probability threshold relative to the top token. |
| \`repeat_penalty\` | float | \`1.1\` | Penalizes repetition of recently generated tokens. |
| \`max_tokens\` | int | \`4096\` | Maximum generation cap. |
| \`stop\` | array | \`["<|im_end|>"]\` | Custom stop sequences. |`,
  },

  // KNOWLEDGE & RAG
  {
    id: 'local-rag',
    category: 'KNOWLEDGE',
    title: 'Local RAG & Vector Embeddings',
    description: 'Offline vector store ingestion, local embeddings, and chunk retrieval without external APIs.',
    content: `Typher includes a native embedded vector database and embedding model runtime (\`typher-embed-base\`).

1. **Document Parsing**: Local extraction of \`.pdf\`, \`.docx\`, \`.md\`, \`.ts\`, \`.py\`, and raw text files.
2. **Dense Vector Indexing**: High-dimensional semantic vectors stored locally in memory-mapped HNSW indexes.
3. **Hybrid Search**: BM25 keyword search blended with cosine vector similarity.`,
    codeSnippet: `# Ingest local folder into private knowledge base
typher knowledge ingest ./docs --collection "engineering-specs"

# Query with knowledge context attached
typher query --collection "engineering-specs" "What is our deployment topology?"`,
    language: 'bash'
  },

  // AGENTS & TOOLS
  {
    id: 'agents',
    category: 'AGENTS',
    title: 'Autonomous Local Agents & Tool Calling',
    description: 'Executing JSON function calling, local shell sandboxes, and file manipulation agents.',
    content: `Typher models are pre-trained on strict JSON function calling protocols. When an agent requests a tool execution, Typher outputs structured schema objects that your application safely executes in your controlled sandbox.`,
    codeSnippet: `{
  "tool_calls": [{
    "id": "call_98x1",
    "type": "function",
    "function": {
      "name": "read_local_file",
      "arguments": "{\\"path\\": \\"src/engine.rs\\"}"
    }
  }]
}`,
    language: 'json'
  },

  // API
  {
    id: 'rest-api',
    category: 'API',
    title: 'REST API & OpenAPI Specification',
    description: 'Drop-in replacement for standard LLM APIs. Run locally at localhost:11434.',
    content: `### Endpoints
* \`POST /v1/chat/completions\` — Chat completion & token streaming.
* \`POST /v1/embeddings\` — Generate high-dimensional dense vector embeddings.
* \`GET /v1/models\` — List currently running and cached model instances.
* \`GET /v1/telemetry\` — Real-time GPU, VRAM, and tokens/sec telemetry feed.`,
    codeSnippet: `import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'typher-local', // Not required locally
});

const response = await client.chat.completions.create({
  model: 'typher-14b',
  messages: [{ role: 'user', content: 'Generate a high-performance Rust hashmap.' }],
});

console.log(response.choices[0].message.content);`,
    language: 'typescript'
  },

  // DEPLOYMENT
  {
    id: 'airgap-enterprise',
    category: 'DEPLOYMENT',
    title: 'Air-Gapped & Sovereign Enterprise Deployment',
    description: 'Deploying Typher within isolated VPCs, physical defense networks, and healthcare servers.',
    content: `Typher binaries are completely self-contained with zero runtime phone-home telemetry.

### Enterprise Features
* **Zero Outbound Sockets**: Hardened networking configurations disable all external DNS/HTTP lookups.
* **Role-Based Access Control (RBAC)**: Token-based authentication gateway for engineering teams.
* **Audit Logging**: Immutable local write-ahead log of all prompt transactions and compute utilization.`,
    codeSnippet: `# Launch daemon in strict air-gap mode
typherd --airgap --listen 0.0.0.0:11434 --auth-token $TYPHER_ENTERPRISE_KEY`,
    language: 'bash'
  }
];
