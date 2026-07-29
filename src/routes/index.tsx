import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BruteButton,
  Eyebrow,
  SectionLabel,
} from "../components/site-chrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Typtwo — Two worlds. One force." },
      {
        name: "description",
        content:
          "Typtwo unites intelligent operations and intelligent growth. Two divisions. One vision.",
      },
      { property: "og:title", content: "Typtwo — Two worlds. One force." },
      {
        property: "og:description",
        content: "Two divisions. One vision.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Desktop Viewport */}
      <div className="hidden md:block">
        <Hero />
        <CoreFocusBar />
        <Philosophy />
        <Duality />
        <Numbers />
        <HomepageClientele />
        <Closer />
      </div>

      {/* Mobile Viewport Revamp */}
      <div className="block md:hidden">
        <MobileHero />
        <MobileMarquee />
        <MobileTabs />
        <MobileStats />
        <MobileClientele />
        <MobileCloser />
      </div>
    </>
  );
}

/* ==================== SCROLL REVEAL UTILITY ==================== */

function ScrollReveal({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

/* ==================== DESKTOP COMPONENTS ==================== */

function Hero() {
  return (
    <section className="border-b-2 border-ink relative overflow-hidden">
      <div className="p-6 md:p-14 relative flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-16 border-b-2 border-ink pb-6">
          <Eyebrow>Typtwo / 2026</Eyebrow>
          <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 bg-flame blink" /> Online
          </div>
        </div>

        <div className="max-w-5xl text-center flex flex-col items-center relative z-10 my-8">
          <h1 className="display leading-[0.82] tracking-tighter text-[3.2rem] sm:text-[5rem] md:text-[8rem] lg:text-[10rem] rise">
            <span className="block">Two worlds.</span>
            <span className="block mt-2">
              One{" "}
              <span className="relative inline-block">
                <span className="bg-flame text-paper px-4">force</span>
                <span className="absolute -top-2 -right-3 h-3 w-3 bg-volt border-2 border-ink" />
              </span>
              .
            </span>
          </h1>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <BruteButton to="/tech" variant="ink">Tech</BruteButton>
            <BruteButton to="/studios" variant="flame">Studios</BruteButton>
          </div>
        </div>

        <div className="hidden lg:block absolute right-12 bottom-12 z-0">
          <RotatingSeal />
        </div>
      </div>
    </section>
  );
}

function RotatingSeal() {
  return (
    <div className="relative h-40 w-40">
      <svg viewBox="0 0 200 200" className="h-full w-full spin-slow">
        <defs>
          <path
            id="circle"
            d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
          />
        </defs>
        <text className="mono uppercase" fontSize="14" letterSpacing="4" fill="currentColor">
          <textPath href="#circle">
            ✱ TYPTWO ✱ BUILT FOR WHAT'S NEXT ✱ SINCE 2026
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-14 w-14 bg-flame border-2 border-ink flex items-center justify-center display text-3xl text-paper">
          T2
        </div>
      </div>
    </div>
  );
}

function CoreFocusBar() {
  return (
    <section className="bg-ink text-paper border-b-2 border-ink px-6 py-5 flex flex-wrap justify-around items-center gap-6 mono text-[11px] uppercase tracking-widest font-bold">
      <div className="flex items-center gap-2">
        <span className="text-flame">✱</span>
        <span>Intelligent Operations</span>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        <span className="text-volt">✱</span>
        <span>Sovereign AI Infrastructure</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-flame">✱</span>
        <span>Intelligent Growth</span>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="border-b-2 border-ink bg-paper">
      <SectionLabel n="02" label="Core Philosophy" />
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="p-8 md:p-12 border-b-2 md:border-b-0 md:border-r-2 border-ink hover:bg-volt hover:text-ink transition-all duration-300 flex flex-col justify-between min-h-[260px] group cursor-pointer">
          <div>
            <div className="mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6">[ Pillar 01 ]</div>
            <h3 className="display text-3xl font-extrabold mb-4 group-hover:translate-x-1 transition-transform">Precision Infrastructure</h3>
            <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-ink transition-colors">
              Sovereign AI orchestration, local large language models, and private cloud automations built securely inside your compliance perimeter.
            </p>
          </div>
          <span className="mono text-[10px] uppercase tracking-widest mt-6 opacity-0 group-hover:opacity-100 transition-opacity">→ Operational Integrity</span>
        </div>

        <div className="p-8 md:p-12 border-b-2 md:border-b-0 md:border-r-2 border-ink hover:bg-volt hover:text-ink transition-all duration-300 flex flex-col justify-between min-h-[260px] group cursor-pointer">
          <div>
            <div className="mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6">[ Pillar 02 ]</div>
            <h3 className="display text-3xl font-extrabold mb-4 group-hover:translate-x-1 transition-transform">Narrative Supremacy</h3>
            <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-ink transition-colors">
              Capturing attention equity via high-production short-form video IPs, content distributions, and strategic corporate narrative positioning.
            </p>
          </div>
          <span className="mono text-[10px] uppercase tracking-widest mt-6 opacity-0 group-hover:opacity-100 transition-opacity">→ Market Share</span>
        </div>

        <div className="p-8 md:p-12 hover:bg-volt hover:text-ink transition-all duration-300 flex flex-col justify-between min-h-[260px] group cursor-pointer">
          <div>
            <div className="mono text-[10px] text-muted-foreground uppercase tracking-widest mb-6">[ Pillar 03 ]</div>
            <h3 className="display text-3xl font-extrabold mb-4 group-hover:translate-x-1 transition-transform">Velocity of Execution</h3>
            <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-ink transition-colors">
              Deploying lightweight, high-impact growth sprints and custom operational pipelines to build validation pipelines at scale.
            </p>
          </div>
          <span className="mono text-[10px] uppercase tracking-widest mt-6 opacity-0 group-hover:opacity-100 transition-opacity">→ Rapid Validation</span>
        </div>
      </div>
    </section>
  );
}

function Duality() {
  return (
    <section className="border-b-2 border-ink">
      <SectionLabel n="03" label="Two divisions" />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative p-8 md:p-14 border-b-2 md:border-b-0 md:border-r-2 border-ink bg-paper overflow-hidden group">
          <div className="absolute -right-10 -top-10 h-40 w-40 stripes opacity-10" />
          <div className="mono text-xs uppercase tracking-widest mb-6">
            [ 01 / Tech ]
          </div>
          <ScrollReveal>
            <h2 className="display text-6xl md:text-8xl leading-[0.85]">
              Intelligent<br />
              <span className="italic">Operations.</span>
            </h2>
          </ScrollReveal>
          <div className="mt-10">
            <BruteButton to="/tech" variant="ink">Enter Tech</BruteButton>
          </div>

          {/* Interactive schematic line art graphic (Tech) */}
          <div className="absolute right-6 bottom-6 w-32 h-32 opacity-20 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none hidden md:block">
            <svg viewBox="0 0 100 100" className="w-full h-full text-ink dark:text-paper">
              <line x1="10" y1="10" x2="90" y2="10" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="90" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="90" y1="90" x2="10" y2="90" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="10" y1="90" x2="10" y2="10" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="10" cy="10" r="4" fill="currentColor" />
              <circle cx="90" cy="10" r="4" fill="currentColor" />
              <circle cx="90" cy="90" r="4" fill="currentColor" />
              <circle cx="10" cy="90" r="4" fill="currentColor" />
              <circle cx="50" cy="50" r="6" fill="#f84f31" className="blink" />
            </svg>
          </div>
        </div>

        <div className="relative p-8 md:p-14 bg-flame text-paper overflow-hidden group">
          <div className="absolute -left-10 -bottom-10 h-40 w-40 border-2 border-paper" />
          <div className="mono text-xs uppercase tracking-widest mb-6 opacity-90">
            [ 02 / Studios ]
          </div>
          <ScrollReveal>
            <h2 className="display text-6xl md:text-8xl leading-[0.85]">
              Intelligent<br />
              <span className="italic">Growth.</span>
            </h2>
          </ScrollReveal>
          <div className="mt-10">
            <BruteButton to="/studios" variant="paper">Enter Studios</BruteButton>
          </div>

          {/* Interactive trajectory graph graphic (Studios) */}
          <div className="absolute right-6 bottom-6 w-32 h-32 opacity-20 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none hidden md:block">
            <svg viewBox="0 0 100 100" className="w-full h-full text-paper">
              <path d="M 10 90 L 30 70 L 50 80 L 70 40 L 90 20" fill="none" stroke="currentColor" strokeWidth="3" />
              <circle cx="90" cy="20" r="5" fill="#fcf600" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  const stats = [
    { n: "02", l: "Divisions" },
    { n: "01", l: "Vision" },
    { n: "∞", l: "Ambition" },
    { n: "24/7", l: "Momentum" },
  ];
  return (
    <section className="border-b-2 border-ink grid grid-cols-2 md:grid-cols-4">
      {stats.map((s, i) => (
        <div
          key={s.l}
          className={`p-8 md:p-12 ${i < 3 ? "border-r-0 md:border-r-2" : ""} ${
            i < 2 ? "border-b-2 md:border-b-0" : ""
          } border-ink hover:bg-volt transition-colors`}
        >
          <div className="display text-6xl md:text-8xl leading-none">{s.n}</div>
          <div className="mt-4 mono text-xs uppercase tracking-widest">{s.l}</div>
        </div>
      ))}
    </section>
  );
}

function HomepageClientele() {
  const brands = [
    { name: "Startup Talky", tag: "Founder Media" },
    { name: "Merino Industries", tag: "Industrial" },
    { name: "BitBNS", tag: "Digital Assets" },
    { name: "Somany Ceramics", tag: "Manufacturing" },
    { name: "BuyHatke!", tag: "E-Commerce" },
    { name: "Abhay Prabhavana", tag: "Museum IP" },
    { name: "SBI", tag: "Fintech" },
    { name: "Rehau", tag: "Engineering" },
    { name: "OKX", tag: "Web3 Network" },
    { name: "Bluehost", tag: "Infrastructure" }
  ];

  return (
    <section className="border-b-2 border-ink">
      <SectionLabel n="04" label="Clientele Network" />
      <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
        <div className="col-span-12 md:col-span-4 p-8 md:p-14 border-r-0 md:border-r-2 border-ink flex flex-col justify-between gap-8">
          <div>
            <Eyebrow color="flame">TRUSTED NETWORK</Eyebrow>
            <h2 className="display text-5xl md:text-7xl leading-none mt-4">
              The Brains & Brands Behind.
            </h2>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              We partner with industry-leading conglomerates, high-growth startups, and state departments to engineer intelligent operations and narrative growth.
            </p>
          </div>
          <div>
            <Link
              to="/clients"
              className="inline-flex items-center gap-3 brute bg-ink text-paper px-6 py-4 mono uppercase tracking-widest text-sm"
            >
              View Client Roster
              <span>→</span>
            </Link>
          </div>
        </div>
        
        {/* Static 5x2 Interactive Partner Grid */}
        <div className="col-span-12 md:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 bg-paper">
          {brands.map((b, idx) => (
            <div 
              key={b.name} 
              className="p-6 border-b border-r border-ink/30 hover:bg-volt hover:text-ink transition-all duration-300 flex flex-col justify-between min-h-[140px] group cursor-pointer"
            >
              <span className="mono text-[9px] text-muted-foreground group-hover:text-ink/80">[ 0{idx + 1} ]</span>
              <h4 className="display text-xl font-bold leading-tight mt-4">{b.name}</h4>
              <span className="mono text-[9px] opacity-0 group-hover:opacity-100 transition-opacity mt-2 text-ink uppercase tracking-wider">
                {b.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closer() {
  return (
    <section className="bg-ink text-paper py-24 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 stripes opacity-[0.08]" />
      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <Eyebrow color="flame">Ready</Eyebrow>
        <ScrollReveal>
          <h2 className="display text-6xl md:text-9xl mt-6 leading-[0.85]">
            Built for<br />
            <span className="italic text-flame">what's next.</span>
          </h2>
        </ScrollReveal>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <BruteButton to="/contact" variant="flame">Start a project</BruteButton>
        </div>
      </div>
    </section>
  );
}

/* ==================== MOBILE REVAMP COMPONENTS ==================== */

function MobileHero() {
  return (
    <section className="border-b-2 border-ink bg-paper p-6 relative overflow-hidden">
      {/* Mobile Top Status Grid */}
      <div className="grid grid-cols-3 gap-2 border-2 border-ink p-3 mb-8 bg-paper font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
        <div className="flex items-center gap-1.5 border-r border-ink/30">
          <span className="h-1.5 w-1.5 bg-flame rounded-full blink" />
          <span>T2_LIVE</span>
        </div>
        <div className="flex items-center justify-center border-r border-ink/30">SYS_V2.0</div>
        <div className="text-right">ONLINE</div>
      </div>

      {/* Mobile Title */}
      <div className="my-6">
        <Eyebrow color="flame">Typtwo / Core</Eyebrow>
        <h1 className="display text-5xl leading-[0.85] font-extrabold tracking-tighter mt-4 text-ink">
          Two worlds.<br />One <span className="bg-flame text-paper px-2 py-0.5 inline-block mt-1">force</span>.
        </h1>
      </div>

      {/* Quick Dashboard Tiles */}
      <div className="grid grid-cols-2 gap-3 mt-8">
        <Link to="/tech" className="p-4 border-2 border-ink bg-ink text-paper hover:bg-volt hover:text-ink transition flex flex-col justify-between h-28">
          <span className="mono text-[9px] opacity-70">[ 01 ]</span>
          <span className="display text-lg font-bold">TECH →</span>
        </Link>
        <Link to="/studios" className="p-4 border-2 border-ink bg-flame text-paper hover:bg-volt hover:text-ink transition flex flex-col justify-between h-28">
          <span className="mono text-[9px] opacity-70">[ 02 ]</span>
          <span className="display text-lg font-bold">STUDIOS →</span>
        </Link>
        <Link to="/clients" className="p-4 border-2 border-ink bg-paper text-ink hover:bg-volt hover:text-ink transition flex flex-col justify-between h-28">
          <span className="mono text-[9px] opacity-70">[ 03 ]</span>
          <span className="display text-lg font-bold">CLIENTS →</span>
        </Link>
        <Link to="/about" className="p-4 border-2 border-ink bg-paper text-ink hover:bg-volt hover:text-ink transition flex flex-col justify-between h-28">
          <span className="mono text-[9px] opacity-70">[ 04 ]</span>
          <span className="display text-lg font-bold">ABOUT →</span>
        </Link>
      </div>
    </section>
  );
}

function MobileMarquee() {
  return (
    <section className="bg-ink text-paper border-b-2 border-ink overflow-hidden py-3">
      <div className="ticker flex w-max whitespace-nowrap display text-xs uppercase tracking-wider">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="mx-4 flex items-center gap-2">
            <span>OPERATIONS</span>
            <span className="text-flame">◆</span>
            <span>GROWTH</span>
            <span className="text-volt">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function MobileTabs() {
  const [activeTab, setActiveTab] = React.useState<'tech' | 'studios'>('tech');

  return (
    <section className="border-b-2 border-ink bg-paper">
      <div className="flex border-b-2 border-ink">
        <button
          onClick={() => setActiveTab('tech')}
          className={`flex-1 py-4 mono text-[10px] uppercase tracking-widest font-bold border-r-2 border-ink ${
            activeTab === 'tech' ? 'bg-ink text-paper' : 'bg-paper text-ink'
          }`}
        >
          01 / Tech
        </button>
        <button
          onClick={() => setActiveTab('studios')}
          className={`flex-1 py-4 mono text-[10px] uppercase tracking-widest font-bold ${
            activeTab === 'studios' ? 'bg-flame text-paper' : 'bg-paper text-ink'
          }`}
        >
          02 / Studios
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'tech' ? (
          <div className="space-y-4">
            <span className="mono text-[9px] text-muted-foreground">// DIVISION_01</span>
            <h3 className="display text-3xl leading-none">Intelligent Operations.</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We build and deploy private AI infrastructure, local LLMs, and custom workflow automation systems inside your corporate perimeter.
            </p>
            <div className="pt-2">
              <Link to="/tech" className="inline-block brute bg-ink text-paper px-6 py-3 mono text-[10px] uppercase tracking-widest">
                Explore Tech →
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <span className="mono text-[9px] text-muted-foreground">// DIVISION_02</span>
            <h3 className="display text-3xl leading-none">Intelligent Growth.</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We scale media channels, vertical short-form drama IPs, performance marketing pipelines, and exclusive PR relations to capture market share.
            </p>
            <div className="pt-2">
              <Link to="/studios" className="inline-block brute bg-flame text-paper px-6 py-3 mono text-[10px] uppercase tracking-widest">
                Explore Studios →
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function MobileStats() {
  const stats = [
    { n: "02", l: "Divisions" },
    { n: "01", l: "Vision" },
    { n: "∞", l: "Ambition" },
    { n: "24/7", l: "Momentum" },
  ];
  return (
    <section className="border-b-2 border-ink grid grid-cols-2 bg-paper">
      {stats.map((s, idx) => (
        <div 
          key={s.l} 
          className={`p-6 border-ink flex flex-col justify-center ${
            idx % 2 === 0 ? 'border-r-2' : ''
          } ${idx < 2 ? 'border-b-2' : ''}`}
        >
          <span className="display text-4xl font-extrabold">{s.n}</span>
          <span className="mono text-[9px] uppercase tracking-widest text-muted-foreground mt-1">{s.l}</span>
        </div>
      ))}
    </section>
  );
}

function MobileClientele() {
  const brands = [
    "Startup Talky", "Merino Industries", "BitBNS",
    "Somany Ceramics", "BuyHatke", "SBI", "Rehau", "OKX"
  ];
  return (
    <section className="border-b-2 border-ink bg-paper p-6">
      <Eyebrow color="flame">Partners</Eyebrow>
      <h3 className="display text-3xl mt-2 tracking-tight">Our Network</h3>
      
      <div className="grid grid-cols-2 gap-2 mt-6">
        {brands.map((b) => (
          <div key={b} className="p-3 border border-ink/40 text-center font-bold display text-sm bg-paper hover:bg-volt hover:text-ink transition">
            {b}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Link to="/clients" className="w-full text-center brute bg-ink text-paper py-3 mono text-[10px] uppercase tracking-widest block">
          View Full Client Index →
        </Link>
      </div>
    </section>
  );
}

function MobileCloser() {
  return (
    <section className="bg-ink text-paper py-16 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 stripes opacity-[0.05]" />
      <div className="relative">
        <Eyebrow color="flame">Ready</Eyebrow>
        <h3 className="display text-4xl mt-4 leading-tight">
          Built for<br />
          <span className="italic text-flame">what's next.</span>
        </h3>
        <div className="mt-8">
          <Link 
            to="/contact" 
            className="brute bg-flame text-paper px-8 py-4 mono uppercase tracking-wider text-xs inline-block"
          >
            Start a project →
          </Link>
        </div>
      </div>
    </section>
  );
}
