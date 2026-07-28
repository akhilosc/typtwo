import { createFileRoute } from "@tanstack/react-router";
import {
  BruteButton,
  PageHeader,
  Eyebrow,
} from "../components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Typtwo" },
      {
        name: "description",
        content: "Two divisions. One vision.",
      },
      { property: "og:title", content: "About Typtwo" },
      { property: "og:description", content: "Two worlds. One force." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        n="03"
        kicker="About"
        title={
          <>
            A new kind of<br />
            <span className="italic">company.</span>
          </>
        }
        lead="Tech and Studios. One team. One vision."
        accent="flame"
      />

      <section className="border-b-2 border-ink p-6 md:p-14">
        <div className="display text-4xl md:text-7xl leading-[1.05] max-w-5xl space-y-2">
          <div>Every business has <span className="bg-volt px-2 italic">two sides</span>.</div>
          <div className="text-muted-foreground">How it works.</div>
          <div className="text-muted-foreground">How the world sees it.</div>
          <div>
            We transform <span className="bg-flame text-paper px-2">both</span>.
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 border-b-2 border-ink">
        <div className="p-8 md:p-14 border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-ink">
          <div className="mono text-xs uppercase tracking-widest text-flame">
            [ 01 / Tech ]
          </div>
          <h3 className="display text-4xl md:text-6xl mt-3 leading-[0.9]">
            Makes you<br /><span className="italic">smart.</span>
          </h3>
        </div>
        <div className="p-8 md:p-14 bg-ink text-paper">
          <div className="mono text-xs uppercase tracking-widest text-flame">
            [ 02 / Studios ]
          </div>
          <h3 className="display text-4xl md:text-6xl mt-3 leading-[0.9]">
            Makes you<br /><span className="italic">matter.</span>
          </h3>
        </div>
      </section>

      <section className="p-6 md:p-14">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <Eyebrow>Work with us</Eyebrow>
            <h2 className="display text-5xl md:text-7xl mt-4 leading-[0.9]">
              Two divisions.<br />
              <span className="italic text-flame">One conversation.</span>
            </h2>
          </div>
          <div className="md:col-span-4 flex flex-wrap gap-3">
            <BruteButton to="/contact" variant="ink">Start</BruteButton>
          </div>
        </div>
      </section>
    </>
  );
}
