import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, Eyebrow } from "../components/site-chrome";
import aboutAsset from "../assets/about.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Typtwo" },
      { name: "description", content: "Typtwo is a technology and creative company building the intelligent enterprise." },
      { property: "og:title", content: "About — Typtwo" },
      { property: "og:description", content: "Two divisions. One purpose. Building the intelligent enterprise." },
      { property: "og:image", content: aboutAsset.url },
      { name: "twitter:image", content: aboutAsset.url },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  { title: "Clarity first.", body: "We name the problem before we solve it. Sharp thinking beats fancy decks." },
  { title: "Craft, not clutter.", body: "Every pixel, every line of code, every frame — considered, then shipped." },
  { title: "Intelligence, applied.", body: "AI and automation are tools, not stories. We use them where they matter." },
  { title: "Long-term by default.", body: "We build for the next decade, not the next quarter." },
];

function AboutPage() {
  return (
    <>
      {/* Cinematic hero */}
      <section className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">
        <img src={aboutAsset.url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/60 to-background" />
        <div className="absolute inset-0 grain" />
        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-20 lg:px-10 lg:pb-28">
          <Eyebrow>About</Eyebrow>
          <h1 className="rise-in mt-6 max-w-5xl font-display text-5xl leading-[0.98] tracking-tight sm:text-7xl lg:text-[120px]">
            Not just another
            <br />
            <span className="gold-text italic">technology company.</span>
          </h1>
        </div>
      </section>

      {/* Monolith manifesto */}
      <section className="relative flex min-h-[80vh] items-center py-32 lg:py-48">
        <div
          className="pointer-events-none absolute right-[-10%] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
          aria-hidden
        />
        <Section>
          <div className="max-w-6xl">
            <Eyebrow>Manifesto</Eyebrow>
            <p className="mt-10 font-display text-[38px] leading-[1.08] tracking-tight sm:text-[60px] lg:text-[88px]">
              We help businesses become <span className="text-foreground/40">smarter, faster, more connected —</span>
              <br />
              and <span className="gold-text italic">ready for what's next.</span>
            </p>
          </div>
        </Section>
      </section>

      {/* Principles as editorial rows */}
      <section className="hairline-t">
        <Section className="py-24">
          <div className="mb-16 max-w-3xl">
            <Eyebrow>Principles</Eyebrow>
            <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-6xl">
              How we <span className="gold-text italic">work.</span>
            </h2>
          </div>
          <div className="divide-y divide-hairline">
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.title}
                className="grid grid-cols-12 items-baseline gap-6 py-10 lg:py-14"
              >
                <div className="col-span-2 font-mono text-xs text-gold lg:col-span-1">0{i + 1}</div>
                <div className="col-span-10 lg:col-span-5">
                  <h3 className="font-display text-2xl tracking-tight sm:text-4xl lg:text-5xl">{p.title}</h3>
                </div>
                <div className="col-span-12 text-base leading-relaxed text-foreground/70 lg:col-span-6">
                  {p.body}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <section className="relative min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-card" />
        <div className="relative mx-auto flex max-w-[1400px] flex-col items-start px-6 py-32 lg:px-10 lg:py-40">
          <Eyebrow>Next</Eyebrow>
          <h2 className="mt-8 max-w-4xl font-display text-4xl leading-[1.02] tracking-tight sm:text-6xl lg:text-[88px]">
            Let's build something
            <br />
            that <span className="gold-text italic">lasts.</span>
          </h2>
          <Link
            to="/contact"
            className="mt-12 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Get in touch <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
