import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionLabel } from "../components/site-chrome";
import { ClientGrid } from "../components/ClientSection";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients — Typtwo" },
      {
        name: "description",
        content:
          "Explore the networks and brands built with Typtwo. Startups, enterprises, and state IP organizations.",
      },
      { property: "og:site_name", content: "Typtwo" },
      { property: "og:url", content: "https://www.typtwo.com/clients" },
      { property: "og:title", content: "Clients — Typtwo" },
      { property: "og:description", content: "Explore the networks and brands built with Typtwo." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.typtwo.com/og-image.png" },
      { property: "og:image:secure_url", content: "https://www.typtwo.com/og-image.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1024" },
      { property: "og:image:height", content: "1024" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Clients — Typtwo" },
      { name: "twitter:description", content: "Explore the networks and brands built with Typtwo." },
      { name: "twitter:image", content: "https://www.typtwo.com/og-image.png" },
    ],
  }),
  component: ClientsPage,
});

function ClientsPage() {
  return (
    <>
      <PageHeader
        n="03"
        kicker="Client Showcase"
        title={
          <>
            Our <span className="italic">Partners.</span>
          </>
        }
        lead="The brains behind disruptive technologies and the institutions scaling national structures. We build in tandem."
        accent="volt"
        meta={[
          { label: "Directory", value: "Enterprise Network" },
          { label: "Roster", value: "14 Key Partners" },
          { label: "Coverage", value: "Startups & State IP" }
        ]}
      />
      <section>
        <SectionLabel n="★" label="Client Network Directory" />
        <ClientGrid />
      </section>
    </>
  );
}
