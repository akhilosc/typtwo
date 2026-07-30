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
