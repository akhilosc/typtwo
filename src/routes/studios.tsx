import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, Eyebrow } from "../components/site-chrome";
import studiosAsset from "../assets/studios.jpg.asset.json";

export const Route = createFileRoute("/studios")({
  head: () => ({
    meta: [
      { title: "Typtwo Studios — Engineering Intelligent Growth" },
      { name: "description", content: "Brands people trust, campaigns people remember and content people actually want to watch." },
      { property: "og:title", content: "Typtwo Studios — Engineering Intelligent Growth" },
      { property: "og:description", content: "Brand. Content. Campaigns. Growth." },
      { property: "og:image", content: studiosAsset.url },
      { name: "twitter:image", content: studiosAsset.url },
    ],
  }),
  component: StudiosPage,
});

const CAPABILITIES = [
  { title: "Branding", body: "Identities that hold up under scrutiny and scale." },
  { title: "Content", body: "Films, series and shortform that pull people in." },
  { title: "Campaigns", body: "Ideas that land — measurable, memorable, moveable." },
  { title: "Digital", body: "Sites and products that feel as good as they perform." },
  { title: "Strategy", body: "Positioning built on evidence, not opinion." },
  { title: "Production", body: "End-to-end delivery across every format." },
];

function StudiosPage() {
  return (
    <>
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
        <img src={studiosAsset.url} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0 grain" />
        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-20 lg:px-10 lg:pb-28">
          <div className="rise-in">
            <Eyebrow>Division 02 · Typtwo Studios</Eyebrow>
            <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.98] tracking-tight sm:text-7xl lg:text-[128px]">
              Intelligent <span className="gold-text italic">growth.</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[70vh] items-center py-32 lg:py-40">
        <Section>
          <div className="max-w-5xl">
            <Eyebrow>Manifesto · Studios</Eyebrow>
            <p className="mt-10 font-display text-[36px] leading-[1.08] tracking-tight sm:text-[56px] lg:text-[80px]">
              We build brands, films and campaigns that
              <span className="text-foreground/40"> earn attention</span> and
              <span className="gold-text italic"> keep it.</span>
            </p>
          </div>
        </Section>
      </section>

      <section className="hairline-t">
        <Section className="py-24">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <Eyebrow>Capabilities</Eyebrow>
              <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-6xl">
                What we <span className="gold-text italic">create.</span>
              </h2>
            </div>
            <div className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50 md:block">
              06 disciplines
            </div>
          </div>
          <div className="divide-y divide-hairline">
            {CAPABILITIES.map((c, i) => (
              <div
                key={c.title}
                className="group grid grid-cols-12 items-baseline gap-6 py-8 transition-colors hover:bg-card/40 lg:py-12"
              >
                <div className="col-span-2 font-mono text-xs text-gold lg:col-span-1">
                  0{i + 1}
                </div>
                <div className="col-span-10 lg:col-span-5">
                  <h3 className="font-display text-2xl tracking-tight sm:text-4xl lg:text-5xl">
                    {c.title}
                  </h3>
                </div>
                <div className="col-span-12 text-base leading-relaxed text-foreground/70 lg:col-span-6">
                  {c.body}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <Section className="py-32 lg:py-40">
        <div className="hairline-t pt-16">
          <Eyebrow>The other half</Eyebrow>
          <Link to="/tech" className="mt-8 block group">
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl lg:text-[88px]">
              Meet the engineered side —
              <br />
              <span className="gold-text italic underline decoration-gold/30 underline-offset-8 group-hover:decoration-gold">Typtwo Tech →</span>
            </h2>
          </Link>
        </div>
      </Section>
    </>
  );
}
