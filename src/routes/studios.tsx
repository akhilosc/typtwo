import { createFileRoute } from "@tanstack/react-router";
import {
  BruteButton,
  PageHeader,
  SectionLabel,
  Eyebrow,
} from "../components/site-chrome";

export const Route = createFileRoute("/studios")({
  head: () => ({
    meta: [
      { title: "Typtwo Studios — Intelligent Growth" },
      {
        name: "description",
        content:
          "Brand, campaigns, film, and content people actually want to watch.",
      },
      { property: "og:title", content: "Typtwo Studios — Intelligent Growth" },
      { property: "og:description", content: "Brands that grow." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/studios" }],
  }),
  component: StudiosPage,
});

const SERVICES = [
  { n: "01", t: "Brand" },
  { n: "02", t: "Campaigns" },
  { n: "03", t: "Film" },
  { n: "04", t: "Content" },
  { n: "05", t: "Digital" },
  { n: "06", t: "Social" },
];

function StudiosPage() {
  return (
    <>
      <PageHeader
        n="02"
        kicker="Division 02 · Studios"
        title={
          <>
            Intelligent<br />
            <span className="italic">growth.</span>
          </>
        }
        lead="Brands people trust. Stories they remember."
        accent="volt"
        meta={[
          { label: "Focus", value: "Brand & Short-form IP" },
          { label: "Media Engine", value: "Vertical Video Launch" },
          { label: "Execution", value: "10-14 Day Campaigns" }
        ]}
      />

      <section className="border-b-2 border-ink">
        <SectionLabel n="02" label="Services" />
        <div className="grid grid-cols-2 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <div
              key={s.n}
              className={`p-8 md:p-12 border-ink group hover:bg-flame hover:text-paper transition-colors ${
                (i + 1) % 3 !== 0 ? "md:border-r-2" : ""
              } ${i % 2 === 0 ? "border-r-2 md:border-r-2" : ""} ${
                i < SERVICES.length - 3 ? "border-b-2" : "border-b-2 md:border-b-0"
              }`}
            >
              <div className="mono text-xs uppercase tracking-widest">
                [{s.n}]
              </div>
              <div className="display text-3xl md:text-5xl mt-4">{s.t}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b-2 border-ink bg-paper overflow-hidden">
        <div className="ticker-reverse flex w-max whitespace-nowrap py-8 display text-3xl md:text-5xl italic">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="mx-6 flex items-center gap-6">
              <span>Strategy</span><span className="text-flame not-italic">◆</span>
              <span>Story</span><span className="text-flame not-italic">◆</span>
              <span>Craft</span><span className="text-flame not-italic">◆</span>
              <span>Momentum</span><span className="text-flame not-italic">◆</span>
            </span>
          ))}
        </div>
      </section>

      <section className="p-6 md:p-14 bg-ink text-paper">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <Eyebrow color="flame">Next</Eyebrow>
            <h2 className="display text-5xl md:text-7xl mt-4 leading-[0.9]">
              Build a brand<br />
              <span className="italic text-flame">worth remembering.</span>
            </h2>
          </div>
          <div className="md:col-span-4 flex flex-wrap gap-3">
            <BruteButton to="/contact" variant="flame">Start</BruteButton>
          </div>
        </div>
      </section>
    </>
  );
}
