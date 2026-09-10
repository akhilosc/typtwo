import React, { useState } from 'react';
import { SectionLabel } from '../components/ui/SectionLabel';
import { TerminalBlock } from '../components/interactive/TerminalBlock';
import { Database, Search, FileText, Binary, ArrowRight, Sparkles, Layers, Cpu } from 'lucide-react';

export const Knowledge: React.FC = () => {
  const [hoveredDoc, setHoveredDoc] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('metal 3 unified memory');

  const sampleDocuments = [
    { id: 0, name: 'Apple_Silicon_Metal3_Arch.pdf', chunks: 14, tokens: '8,410', score: '0.942', preview: 'Unified memory architecture bridges CPU and GPU registers via direct LPDDR5X DRAM bus.' },
    { id: 1, name: 'FlashInfer_Attention_Spec.md', chunks: 8, tokens: '4,200', score: '0.887', preview: 'Paged KV-cache elimination of virtual memory fragmentation in autoregressive transformer models.' },
    { id: 2, name: 'Corporate_Security_Protocol_2026.docx', chunks: 22, tokens: '12,940', score: '0.764', preview: 'Zero-exfiltration air-gap constraints require all inference tokens to remain within local DRAM address spaces.' },
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6">
        <SectionLabel label="KNOWLEDGE ENGINE // EMBEDDED RETRIEVAL" />
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
          GIVE THE MACHINE CONTEXT.
        </h1>
        <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
          Ingest confidential engineering codebases, legal archives, and enterprise documents into local HNSW vector stores with zero third-party cloud exfiltration.
        </p>
      </div>

      {/* 7-Stage Vector Pipeline Visual */}
      <section className="machine-panel p-6 sm:p-8 rounded-2xl border border-machine-750 corner-brackets space-y-6">
        <div className="text-xs text-machine-400 uppercase tracking-widest font-semibold border-b border-machine-800 pb-3 flex items-center justify-between">
          <span>LOCAL RAG TRANSFORMATION PIPELINE</span>
          <span className="text-emerald-400 font-bold">● IN-PROCESS HNSW RETRIEVAL</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center">
          {[
            { step: '01', title: 'DOCUMENT', sub: 'PDF / Code / Text' },
            { step: '02', title: 'CHUNK', sub: 'AST Semantic Split' },
            { step: '03', title: 'EMBED', sub: 'typher-embed-base' },
            { step: '04', title: 'VECTOR STORE', sub: 'HNSW Index MMap' },
            { step: '05', title: 'RETRIEVE', sub: 'Cosine Similarity' },
            { step: '06', title: 'CONTEXT', sub: 'Pinned Token Buffer' },
            { step: '07', title: 'MODEL', sub: 'Typher 14B Attention' },
          ].map((s) => (
            <div key={s.step} className="p-3 rounded-lg bg-machine-900 border border-machine-800 space-y-1">
              <div className="text-[10px] text-cyan-400 font-bold">{s.step}</div>
              <div className="font-display font-bold text-xs text-machine-100">{s.title}</div>
              <div className="text-[10px] text-machine-500 font-sans">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Vector Field Simulation */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Document List */}
        <div className="lg:col-span-5 space-y-4">
          <span className="tech-label text-machine-400">INGESTED ARCHIVES (IN-MEMORY)</span>
          <div className="space-y-2">
            {sampleDocuments.map((doc) => (
              <div
                key={doc.id}
                onMouseEnter={() => setHoveredDoc(doc.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  hoveredDoc === doc.id
                    ? 'bg-machine-850 border-cyan-500 shadow-glow-cyan'
                    : 'bg-machine-900/80 border-machine-800 hover:border-machine-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-machine-100 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    {doc.name}
                  </span>
                  <span className="text-cyan-400 font-bold">SIM: {doc.score}</span>
                </div>
                <div className="text-[11px] text-machine-400 font-sans mt-1 line-clamp-2">
                  {doc.preview}
                </div>
                <div className="mt-2 pt-2 border-t border-machine-850 flex justify-between text-[10px] text-machine-500">
                  <span>{doc.chunks} CHUNKS</span>
                  <span>{doc.tokens} TOKENS</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: High-Dimensional Semantic Vector Representation */}
        <div className="lg:col-span-7 machine-panel p-6 rounded-xl border border-machine-750 corner-brackets space-y-4">
          <div className="flex items-center justify-between border-b border-machine-800 pb-3">
            <span className="tech-label text-cyan-400">4,096-DIMENSIONAL EMBEDDING SPACE</span>
            <span className="text-[10px] text-emerald-400">● COSINE DISTANCE &lt;0.05</span>
          </div>

          {/* Dynamic Vector Matrix Points */}
          <div className="p-4 rounded-lg bg-machine-950 border border-machine-850 space-y-3">
            <div className="text-[11px] text-machine-400">
              ACTIVE EMBEDDING PROJECTION: <span className="text-cyan-300 font-bold">{sampleDocuments[hoveredDoc ?? 0].name}</span>
            </div>

            <div className="grid grid-cols-12 gap-1.5 py-2">
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className="h-3 rounded-xs transition-all duration-300"
                  style={{
                    backgroundColor: `rgba(56, 189, 248, ${0.15 + (Math.sin(i * 1.8 + (hoveredDoc ?? 0)) * 0.5 + 0.5) * 0.8})`
                  }}
                />
              ))}
            </div>

            <div className="text-[10px] text-machine-500 truncate">
              TENSOR DUMP: [+0.1984, -0.4012, +0.8812, +0.0241, -0.1942, +0.6612, ...]
            </div>
          </div>

          <div className="p-3 rounded bg-machine-900 border border-machine-800 text-[11px] text-machine-300 font-sans leading-relaxed">
            Typher automatically computes vector embeddings locally using its lightweight embedding model, storing dense indexes directly in memory-mapped physical storage for instant sub-millisecond similarity queries.
          </div>
        </div>

      </section>

      {/* CLI Ingestion Command */}
      <section className="space-y-4">
        <SectionLabel label="KNOWLEDGE INGESTION COMMANDS" />
        <TerminalBlock
          title="CLI KNOWLEDGE INGESTION"
          code={`# Ingest local engineering folder into private memory index
typher knowledge ingest ./src/engine --collection "engine-core" --chunk-size 512

# Run semantic query with attached knowledge retrieval
typher run typher-14b --rag "engine-core" --prompt "Explain the paged KV cache allocation algorithm."`}
          language="bash"
        />
      </section>

    </div>
  );
};
