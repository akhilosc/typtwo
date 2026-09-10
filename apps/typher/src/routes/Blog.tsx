import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/changelogData';
import { BookOpen, Calendar, Clock, User, ArrowRight, ChevronLeft } from 'lucide-react';

export const Blog: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const selectedPost = BLOG_POSTS.find((p) => p.id === selectedPostId);

  if (selectedPost) {
    return (
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 font-mono text-xs text-machine-200 tech-grid">
        <button
          onClick={() => setSelectedPostId(null)}
          className="px-3 py-1.5 rounded bg-machine-900 hover:bg-machine-850 border border-machine-800 text-machine-300 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          BACK TO ESSAYS
        </button>

        <article className="machine-panel p-6 sm:p-12 rounded-xl border border-machine-750 corner-brackets space-y-6">
          <div className="border-b border-machine-800 pb-4 space-y-2">
            <span className="tech-label text-cyan-400">{selectedPost.category}</span>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-machine-100 tracking-tight leading-tight">
              {selectedPost.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-machine-500 text-[11px] pt-1">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                {selectedPost.author.name} ({selectedPost.author.role})
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {selectedPost.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedPost.readTime}
              </span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-machine-300 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
            {selectedPost.content}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-mono text-xs text-machine-200 tech-grid">
      
      {/* Header */}
      <div className="border-b border-machine-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
          <BookOpen className="w-4 h-4" />
          <span>ENGINEERING DISPATCHES // RESEARCH & ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-machine-100 tracking-tight">
          INSIDE THE MACHINE.
        </h1>
        <p className="text-sm sm:text-base font-sans text-machine-300 max-w-2xl mt-2 leading-relaxed">
          Deep-dive technical essays on memory bandwidth saturation, speculative transformer decoding, FlashInfer attention kernels, and sovereign AI infrastructure.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <div
            key={post.id}
            onClick={() => {
              setSelectedPostId(post.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="machine-panel p-6 rounded-xl border border-machine-800 corner-brackets cursor-pointer hover:border-cyan-500/60 hover:bg-machine-850 transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] text-machine-500 border-b border-machine-850 pb-2">
                <span className="text-cyan-400 font-bold">{post.category}</span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="font-display font-bold text-lg text-machine-100 group-hover:text-cyan-300 transition-colors leading-snug">
                {post.title}
              </h3>

              <p className="text-xs font-sans text-machine-300 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-machine-850 flex items-center justify-between text-[11px] text-machine-500">
              <span>{post.author.name}</span>
              <span className="text-cyan-400 flex items-center gap-1">
                READ DISPATCH <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
