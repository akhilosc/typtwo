import React from 'react';

export const MethodologyV9 = () => {
  const steps = [
    { step: "01", title: "Diagnose", body: "We start with the problem, not the tool. Two weeks of interviews, system access and honest scoping before anyone writes code or a script." },
    { step: "02", title: "Prototype", body: "A narrow, working slice in front of real users fast. It either earns the next phase or it tells us something cheaply." },
    { step: "03", title: "Build", body: "Full production delivery with your team embedded, so knowledge stays in the building after we hand over." },
    { step: "04", title: "Operate", body: "Ongoing ownership — maintenance, iteration and reporting. Most of our work is measured in years, not sprints." }
  ];

  return (
    <section className="py-28 bg-[#040404] border-t border-white/10 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-xs font-extrabold tracking-widest text-[#D4AF37] mb-4 uppercase">
            OUR METHODOLOGY
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
            How The Two Wings Operate
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Structured 4-stage execution for both operational intelligence and brand storytelling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="p-8 rounded-2xl bg-[#111115] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group">
              <span className="text-3xl font-black text-[#D4AF37] block mb-4">{s.step}</span>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F5D77F] transition-colors">{s.title}</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
