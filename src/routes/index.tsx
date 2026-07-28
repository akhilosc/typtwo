import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BruteButton,
  Eyebrow,
  SectionLabel,
  Ticker,
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
      <Hero />
      <Marquee />
      <Duality />
      <Numbers />
      <HomepageClientele />
      <Closer />
    </>
  );
}

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

function Marquee() {
  return (
    <section className="bg-ink text-paper border-b-2 border-ink">
      <Ticker
        className="py-6 display text-5xl md:text-7xl"
        items={[
          "OPERATIONS",
          "◆",
          "GROWTH",
          "◆",
          "ENTERPRISE",
          "◆",
        ]}
      />
    </section>
  );
}

function Duality() {
  return (
    <section className="border-b-2 border-ink">
      <SectionLabel n="01" label="Two divisions" />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative p-8 md:p-14 border-b-2 md:border-b-0 md:border-r-2 border-ink bg-paper overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 stripes opacity-10" />
          <div className="mono text-xs uppercase tracking-widest mb-6">
            [ 01 / Tech ]
          </div>
          <h2 className="display text-6xl md:text-8xl leading-[0.85]">
            Intelligent<br />
            <span className="italic">Operations.</span>
          </h2>
          <div className="mt-10">
            <BruteButton to="/tech" variant="ink">Enter Tech</BruteButton>
          </div>
        </div>

        <div className="relative p-8 md:p-14 bg-flame text-paper overflow-hidden">
          <div className="absolute -left-10 -bottom-10 h-40 w-40 border-2 border-paper" />
          <div className="mono text-xs uppercase tracking-widest mb-6 opacity-90">
            [ 02 / Studios ]
          </div>
          <h2 className="display text-6xl md:text-8xl leading-[0.85]">
            Intelligent<br />
            <span className="italic">Growth.</span>
          </h2>
          <div className="mt-10">
            <BruteButton to="/studios" variant="paper">Enter Studios</BruteButton>
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
  return (
    <section className="border-b-2 border-ink">
      <SectionLabel n="03" label="Clientele Network" />
      <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
        <div className="col-span-12 md:col-span-4 p-8 md:p-14 border-r-0 md:border-r-2 border-ink flex flex-col justify-between gap-8">
          <div>
            <Eyebrow color="flame">TRUSTED NETWORK</Eyebrow>
            <h2 className="display text-5xl md:text-7xl leading-none mt-4">
              The Brains & Brands Behind.
            </h2>
            <p className="text-md text-muted-foreground mt-6 leading-relaxed">
              We engineer intelligent systems and scale global narratives for pioneering startups, market-leading conglomerates, and state-level organizations.
            </p>
          </div>
          <div>
            <Link
              to="/clients"
              className="inline-flex items-center gap-3 brute bg-ink text-paper px-6 py-4 mono uppercase tracking-widest text-sm"
            >
              View Full Client Roster
              <span>→</span>
            </Link>
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 grid grid-cols-2">
          {[
            "Startup Talky", "Merino Industries",
            "BitBNS", "Somany Ceramics",
            "BuyHatke!", "Abhay Prabhavana",
            "SBI", "Rehau",
            "OKX", "Bluehost"
          ].map((client, idx) => (
            <div
              key={client}
              className={`p-8 border-b-2 ${idx % 2 === 0 ? "border-r-2" : ""} border-ink flex flex-col justify-between min-h-[160px] hover:bg-volt hover:text-ink transition-colors`}
            >
              <span className="mono text-[10px] text-muted-foreground">[ 0{idx + 1} // PARTNER ]</span>
              <span className="display text-2xl md:text-4xl font-extrabold leading-none">{client}</span>
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
        <h2 className="display text-6xl md:text-9xl mt-6 leading-[0.85]">
          Built for<br />
          <span className="italic text-flame">what's next.</span>
        </h2>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <BruteButton to="/contact" variant="flame">Start a project</BruteButton>
        </div>
      </div>
    </section>
  );
}
