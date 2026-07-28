import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  PageHeader,
  SectionLabel,
  Eyebrow,
} from "../components/site-chrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Typtwo. Start a project." },
      {
        name: "description",
        content:
          "Talk to Typtwo. One thread reaches both divisions — Tech and Studios — from the same team.",
      },
      { property: "og:title", content: "Contact Typtwo" },
      {
        property: "og:description",
        content: "One thread. Two worlds. Start a conversation with Typtwo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const INTERESTS = [
  "Tech · Systems",
  "Tech · AI & Automation",
  "Studios · Brand",
  "Studios · Film",
  "Both divisions",
  "Just exploring",
] as const;

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [interest, setInterest] = useState<string>("Both divisions");

  return (
    <>
      <PageHeader
        n="04"
        kicker="Contact / One thread"
        title={
          <>
            Say <span className="italic">hello</span>.<br />
            We answer fast.
          </>
        }
        lead="One email reaches both divisions. Tell us what you're building — or what's stuck — and we'll come back with people, not a form response."
        accent="volt"
      />

      <section className="grid md:grid-cols-12 border-b-2 border-ink">
        {/* Left column — info */}
        <aside className="md:col-span-4 border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-ink p-6 md:p-10 space-y-8">
          <div>
            <Eyebrow>Direct</Eyebrow>
            <a
              href="mailto:hello@typtwo.com"
              className="mt-3 block display text-3xl md:text-4xl hover:bg-volt"
            >
              hello@typtwo.com
            </a>
          </div>
          <div>
            <div className="mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
              // Response time
            </div>
            <div>Within one working day.</div>
          </div>
          <div>
            <div className="mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
              // Where
            </div>
            <div>Everywhere. Headquartered in Dubai.</div>
          </div>
          <div className="brute bg-volt text-ink p-6">
            <div className="mono text-xs uppercase tracking-widest mb-2">
              Fast track
            </div>
            <p className="text-sm leading-relaxed">
              Founders and heads of teams — mention "fast track" and you'll
              land on a call within 48 hours.
            </p>
          </div>
        </aside>

        {/* Form */}
        <div className="md:col-span-8 p-6 md:p-10">
          {sent ? (
            <div className="brute p-10 bg-flame text-paper">
              <Eyebrow color="paper">Message sent</Eyebrow>
              <h3 className="display text-4xl md:text-5xl mt-4 leading-[0.9]">
                Thanks.<br />
                <span className="italic">We're on it.</span>
              </h3>
              <p className="mt-4 text-sm max-w-[42ch]">
                You'll hear back from a real person at Typtwo within one
                working day. Meanwhile: two worlds, one force.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-8 mono text-xs uppercase tracking-widest underline underline-offset-4"
              >
                ← Send another
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-8"
            >
              <SectionLabel n="01" label="Who's writing" />
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Name" name="name" required />
                <Field label="Company" name="company" />
                <Field label="Email" name="email" type="email" required />
                <Field label="Role" name="role" placeholder="Founder, CTO, CMO…" />
              </div>

              <SectionLabel n="02" label="What you need" />
              <div>
                <div className="mono text-xs uppercase tracking-widest mb-3">
                  Interest
                </div>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setInterest(i)}
                      className={`brute px-4 py-2 mono text-xs uppercase tracking-widest ${
                        interest === i ? "bg-ink text-paper" : "bg-paper"
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mono text-xs uppercase tracking-widest mb-2">
                  Project brief
                </div>
                <textarea
                  required
                  name="message"
                  rows={6}
                  placeholder="Tell us what you're building, what's stuck, or what you want the world to see…"
                  className="w-full bg-paper border-2 border-ink px-4 py-3 focus:outline-none focus:bg-volt/30 mono text-sm"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                <div className="mono text-xs uppercase tracking-widest text-muted-foreground">
                  ↳ One thread reaches both divisions
                </div>
                <button
                  type="submit"
                  className="brute bg-flame text-paper px-8 py-4 mono uppercase tracking-widest text-sm inline-flex items-center gap-3"
                >
                  Send message <span>→</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="mono text-xs uppercase tracking-widest mb-2">
        {label}
        {required && <span className="text-flame"> *</span>}
      </div>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-paper border-2 border-ink px-4 py-3 focus:outline-none focus:bg-volt/30 mono text-sm"
      />
    </label>
  );
}
