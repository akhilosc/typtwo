import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Section, Eyebrow } from "../components/site-chrome";
import heroAsset from "../assets/hero.jpg.asset.json";
import techAsset from "../assets/tech.jpg.asset.json";
import studiosAsset from "../assets/studios.jpg.asset.json";
import aboutAsset from "../assets/about.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Typtwo — Creating the Intelligent Enterprise" },
      {
        name: "description",
        content:
          "Typtwo brings technology and creativity together. Two divisions, one purpose — building the intelligent enterprise.",
      },
      { property: "og:title", content: "Typtwo — Creating the Intelligent Enterprise" },
      { property: "og:description", content: "Two divisions. One purpose. The intelligent enterprise." },
      { property: "og:image", content: heroAsset.url },
      { name: "twitter:image", content: heroAsset.url },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <KineticHero />
      <MonolithStatement />
      <DualityBand />
      <BeliefsMonolith />
      <ClosingCTA />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Kinetic split-screen hero                                        */
/* ------------------------------------------------------------------ */
function KineticHero() {
  const [hover, setHover] = useState<"tech" | "studios" | null>(null);

  return (
    <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
      {/* Top overlay title */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto max-w-[1400px] px-6 pt-10 lg:px-10 lg:pt-16">
        <div className="rise-in">
          <Eyebrow>The Intelligent Enterprise</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-[42px] leading-[0.98] tracking-tight sm:text-[64px] lg:text-[92px]">
            Every business has two sides.
            <br />
            <span className="gold-text italic">We transform both.</span>
          </h1>
        </div>
      </div>

      {/* Split panels */}
      <div
        className="flex h-full w-full"
        onMouseLeave={() => setHover(null)}
      >
        <KineticPanel
          side="tech"
          image={techAsset.url}
          label="Typtwo Tech"
          tagline="Intelligent Operations"
          expanded={hover === "tech"}
          dimmed={hover === "studios"}
          onEnter={() => setHover("tech")}
        />
        <div className="relative z-10 w-px bg-gold/40" />
        <KineticPanel
          side="studios"
          image={studiosAsset.url}
          label="Typtwo Studios"
          tagline="Intelligent Growth"
          expanded={hover === "studios"}
          dimmed={hover === "tech"}
          onEnter={() => setHover("studios")}
        />
      </div>

      {/* Bottom hairline meta */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 mx-auto flex max-w-[1400px] items-end justify-between px-6 pb-8 lg:px-10 lg:pb-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
          Hover — choose a side
        </div>
        <div className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50 md:block">
          MMXXVI · Est. Typtwo
        </div>
      </div>
    </section>
  );
}

function KineticPanel({
  side,
  image,
  label,
  tagline,
  expanded,
  dimmed,
  onEnter,
}: {
  side: "tech" | "studios";
  image: string;
  label: string;
  tagline: string;
  expanded: boolean;
  dimmed: boolean;
  onEnter: () => void;
}) {
  const grow = expanded ? 1.4 : dimmed ? 0.6 : 1;
  const to = side === "tech" ? "/tech" : "/studios";

  return (
    <Link
      to={to}
      onMouseEnter={onEnter}
      style={{ flexGrow: grow }}
      className="group relative block h-full basis-0 overflow-hidden transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
    >
      <img
        src={image}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ${
          expanded ? "scale-105 opacity-70" : dimmed ? "scale-100 opacity-25" : "opacity-45"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      <div className="absolute inset-0 grain" />

      {/* Side ticker */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between p-6 lg:p-10">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
            {side === "tech" ? "Division 01" : "Division 02"}
          </div>
          <div className="mt-4 font-display text-4xl leading-none tracking-tight sm:text-6xl">
            {label.split(" ")[0]}
            <br />
            <span className="gold-text italic">{label.split(" ")[1]}</span>
          </div>
          <div className="mt-4 text-sm text-foreground/70">{tagline}</div>
        </div>
        <div
          className={`hidden font-mono text-[10px] uppercase tracking-[0.28em] transition-opacity md:block ${
            expanded ? "text-gold opacity-100" : "text-foreground/50 opacity-70"
          }`}
        >
          Enter →
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Monolith statement — full-screen editorial                       */
/* ------------------------------------------------------------------ */
function MonolithStatement() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden py-32 lg:py-48">
      <div
        className="pointer-events-none absolute -left-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />
      <Section>
        <div className="max-w-6xl">
          <Eyebrow>Manifesto · 001</Eyebrow>
          <p className="mt-10 font-display text-[40px] leading-[1.08] tracking-tight sm:text-[64px] lg:text-[88px]">
            One is <span className="text-foreground/40">how it works.</span>
            <br />
            The other is <span className="text-foreground/40">how the world sees it.</span>
            <br />
            <span className="gold-text italic">Typtwo transforms both.</span>
          </p>
        </div>
      </Section>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Duality band — kinetic mirror row                                */
/* ------------------------------------------------------------------ */
function DualityBand() {
  return (
    <section className="hairline-t hairline-b relative overflow-hidden bg-card">
      <div className="grid divide-x divide-hairline md:grid-cols-2">
        {[
          {
            side: "tech",
            num: "01",
            label: "Tech",
            title: "Systems that think.",
            image: techAsset.url,
            to: "/tech",
            items: ["Automation", "Cloud & AI", "Cybersecurity", "Data"],
          },
          {
            side: "studios",
            num: "02",
            label: "Studios",
            title: "Brands that feel.",
            image: studiosAsset.url,
            to: "/studios",
            items: ["Branding", "Content", "Campaigns", "Film"],
          },
        ].map((d) => (
          <Link
            key={d.side}
            to={d.to}
            className="group relative flex min-h-[70vh] flex-col justify-between overflow-hidden p-8 lg:p-16"
          >
            <img
              src={d.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-15 transition-all duration-[1200ms] group-hover:scale-105 group-hover:opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/70 to-background/90" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
                  Division {d.num}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
                  Typtwo {d.label}
                </div>
              </div>
            </div>
            <div className="relative">
              <h3 className="font-display text-5xl leading-[1] tracking-tight sm:text-7xl lg:text-[96px]">
                {d.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="gold-text italic">{d.title.split(" ").slice(-1)[0]}</span>
              </h3>
              <div className="mt-10 flex flex-wrap gap-2">
                {d.items.map((i) => (
                  <span
                    key={i}
                    className="rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground/70"
                  >
                    {i}
                  </span>
                ))}
              </div>
              <div className="mt-10 inline-flex items-center gap-2 text-sm text-gold">
                Enter division
                <span className="transition-transform group-hover:translate-x-2" aria-hidden>
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Beliefs — editorial one-per-screen rhythm                        */
/* ------------------------------------------------------------------ */
function BeliefsMonolith() {
  return (
    <section className="relative py-32 lg:py-48">
      <Section>
        <div className="mb-24 max-w-3xl">
          <Eyebrow>Beliefs</Eyebrow>
          <h2 className="mt-6 font-display text-4xl tracking-tight sm:text-6xl">
            Built for what's <span className="gold-text italic">next.</span>
          </h2>
        </div>

        <div className="space-y-24 lg:space-y-40">
          {BELIEFS.map((b, i) => (
            <div key={b.title} className="grid items-start gap-8 lg:grid-cols-12">
              <div className="lg:col-span-2">
                <div className="font-mono text-sm text-gold">{b.num}</div>
              </div>
              <div className="lg:col-span-10">
                <p className="font-display text-3xl leading-[1.1] tracking-tight sm:text-5xl lg:text-[64px]">
                  {b.title}
                </p>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/60 lg:text-lg">
                  {b.body}
                </p>
                {i < BELIEFS.length - 1 && <div className="hairline-b mt-16 lg:mt-24" />}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </section>
  );
}

const BELIEFS = [
  {
    num: "01",
    title: "Two sides. One force.",
    body: "Operations and brand are one story. We build both to move in the same direction.",
  },
  {
    num: "02",
    title: "Intelligence is the edge.",
    body: "Systems that think. Brands that feel. Both compound over time.",
  },
  {
    num: "03",
    title: "Precision over noise.",
    body: "We ship considered work — clear, useful, enduring.",
  },
];

/* ------------------------------------------------------------------ */
/* 5. Closing CTA — cinematic monolith                                 */
/* ------------------------------------------------------------------ */
function ClosingCTA() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      <img src={aboutAsset.url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
      <div className="absolute inset-0 grain" />
      <div className="relative mx-auto flex max-w-[1400px] flex-col justify-center px-6 py-32 lg:px-10 lg:py-48">
        <Eyebrow>Let's talk</Eyebrow>
        <h2 className="mt-8 max-w-5xl font-display text-5xl leading-[1] tracking-tight sm:text-7xl lg:text-[112px]">
          Build the
          <br />
          <span className="gold-text italic">intelligent enterprise.</span>
        </h2>
        <div className="mt-14">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Start a conversation
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
