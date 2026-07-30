import { createFileRoute } from "@tanstack/react-router";
import {
  BruteButton,
  PageHeader,
  SectionLabel,
  Eyebrow,
} from "../components/site-chrome";

export const Route = createFileRoute("/tech")({
  head: () => ({
    meta: [
      { title: "Typtwo Tech — Intelligent Operations" },
      {
        name: "description",
        content:
          "Intelligent systems, automation, AI, cloud, and security — engineered to run your business.",
      },
      { property: "og:site_name", content: "Typtwo" },
      { property: "og:url", content: "https://www.typtwo.com/tech" },
      { property: "og:title", content: "Typtwo Tech — Intelligent Operations" },
      { property: "og:description", content: "Systems that run the business." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.typtwo.com/og-image.png" },
      { property: "og:image:secure_url", content: "https://www.typtwo.com/og-image.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1024" },
      { property: "og:image:height", content: "1024" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Typtwo Tech — Intelligent Operations" },
      { name: "twitter:description", content: "Intelligent systems, automation, AI, cloud, and security — engineered to run your business." },
      { name: "twitter:image", content: "https://www.typtwo.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/tech" }],
  }),
  component: TechPage,
});

const CAPABILITIES = [
  { n: "01", t: "AI & Automation" },
  { n: "02", t: "Cloud" },
  { n: "03", t: "Security" },
  { n: "04", t: "Data" },
  { n: "05", t: "Platforms" },
  { n: "06", t: "Managed Ops" },
];

function TechPage() {
  return (
    <>
      <PageHeader
        n="01"
        kicker="Division 01 · Tech"
        title={
          <>
            Intelligent<br />
            <span className="italic">operations.</span>
          </>
        }
        lead="Systems that run the business — quietly, securely, at scale."
        accent="flame"
        meta={[
          { label: "Focus", value: "AI & Cloud Ops" },
          { label: "SLA Status", value: "99.9% Uptime Ready" },
          { label: "Discovery", value: "7-Day Sprint Setup" }
        ]}
      />

      <section className="border-b-2 border-ink">
        <SectionLabel n="02" label="Capabilities" />
        <div className="grid grid-cols-2 md:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <div
              key={c.n}
              className={`p-8 md:p-12 border-ink group hover:bg-ink hover:text-paper transition-colors ${
                (i + 1) % 3 !== 0 ? "md:border-r-2" : ""
              } ${i % 2 === 0 ? "border-r-2 md:border-r-2" : ""} ${
                i < CAPABILITIES.length - 3 ? "border-b-2" : "border-b-2 md:border-b-0"
              }`}
            >
              <div className="mono text-xs uppercase tracking-widest text-flame">
                [{c.n}]
              </div>
              <div className="display text-3xl md:text-5xl mt-4">{c.t}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b-2 border-ink overflow-hidden bg-volt">
        <div className="ticker flex w-max whitespace-nowrap py-8 mono text-2xl md:text-3xl uppercase">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="mx-6 flex items-center gap-6">
              <span>AWS</span><span className="text-flame">✱</span>
              <span>OPENAI</span><span className="text-flame">✱</span>
              <span>ANTHROPIC</span><span className="text-flame">✱</span>
              <span>POSTGRES</span><span className="text-flame">✱</span>
              <span>K8S</span><span className="text-flame">✱</span>
            </span>
          ))}
        </div>
      </section>

      <section className="p-6 md:p-14 bg-ink text-paper">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <Eyebrow color="flame">Next</Eyebrow>
            <h2 className="display text-5xl md:text-7xl mt-4 leading-[0.9]">
              Modernise<br />
              <span className="italic text-flame">the engine.</span>
            </h2>
          </div>
          <div className="md:col-span-4 flex flex-wrap gap-3">
            <BruteButton to="/contact" variant="flame">Book a call</BruteButton>
          </div>
        </div>
      </section>
    </>
  );
}
