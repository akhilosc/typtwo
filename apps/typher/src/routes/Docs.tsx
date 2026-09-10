import React, { useState } from 'react';
import { DOCS_DATA } from '../data/docsData';
import { TerminalBlock } from '../components/interactive/TerminalBlock';
import { BookOpen, Search, ChevronRight, Hash, Copy, Check, Terminal, ExternalLink } from 'lucide-react';

export const Docs: React.FC = () => {
  const [activeDocId, setActiveDocId] = useState('intro');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = Array.from(new Set(DOCS_DATA.map((d) => d.category)));

  const filteredDocs = DOCS_DATA.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentDoc = DOCS_DATA.find((d) => d.id === activeDocId) || DOCS_DATA[0];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
            <BookOpen className="w-4 h-4" />
            <span>DOCUMENTATION // TECHNICAL REFERENCE MANUAL</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
            TYPHER DOCUMENTATION.
          </h1>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-machine-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documentation..."
            className="w-full bg-machine-900 border border-machine-800 rounded-lg pl-9 pr-3 py-2 text-xs text-machine-100 focus:outline-none focus:border-cyan-500 font-sans"
          />
        </div>
      </div>

      {/* 2-Column Docs Layout: Sidebar & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Multi-Category Sidebar */}
        <div className="lg:col-span-4 space-y-6 machine-panel p-4 rounded-xl border border-machine-800 max-h-[800px] overflow-y-auto">
          {categories.map((cat) => {
            const docsInCat = filteredDocs.filter((d) => d.category === cat);
            if (docsInCat.length === 0) return null;

            return (
              <div key={cat} className="space-y-1.5">
                <div className="text-[10px] tracking-widest text-machine-500 uppercase font-semibold pb-1 border-b border-machine-850">
                  {cat}
                </div>
                <div className="space-y-0.5 pt-1">
                  {docsInCat.map((doc) => {
                    const isActive = doc.id === currentDoc.id;
                    return (
                      <button
                        key={doc.id}
                        onClick={() => {
                          setActiveDocId(doc.id);
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className={`w-full p-2 rounded text-left transition-all flex items-center justify-between font-mono text-xs ${
                          isActive
                            ? 'bg-cyan-950 border border-cyan-500/80 text-cyan-300 font-bold shadow-sm'
                            : 'text-machine-400 hover:text-machine-200 hover:bg-machine-900'
                        }`}
                      >
                        <span className="truncate">{doc.title}</span>
                        {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Article Viewer */}
        <div className="lg:col-span-8 machine-panel p-6 sm:p-10 rounded-xl border border-machine-750 corner-brackets space-y-6">
          <div className="border-b border-machine-800 pb-4">
            <span className="tech-label text-cyan-400">{currentDoc.category}</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-machine-100 mt-1">
              {currentDoc.title}
            </h2>
            <p className="text-sm font-sans text-machine-300 mt-1">
              {currentDoc.description}
            </p>
          </div>

          <div className="prose prose-invert max-w-none text-machine-300 font-sans text-sm leading-relaxed whitespace-pre-wrap">
            {currentDoc.content}
          </div>

          {currentDoc.codeSnippet && (
            <div className="pt-4 space-y-2 font-mono">
              <span className="tech-label text-machine-400">EXECUTABLE COMMAND / SNIPPET:</span>
              <TerminalBlock
                title="VERIFIED CODE BLOCK"
                code={currentDoc.codeSnippet}
                language={currentDoc.language || 'bash'}
              />
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-machine-800 flex items-center justify-between text-[11px] text-machine-500 font-mono">
            <span>DOC ID: {currentDoc.id.toUpperCase()} // v2.4</span>
            <a
              href="https://github.com/akhilosc/typher-Fronend"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 flex items-center gap-1 transition-colors"
            >
              EDIT THIS PAGE ON GITHUB <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};
