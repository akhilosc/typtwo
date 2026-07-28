import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section, Eyebrow } from "../components/site-chrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Typtwo" },
      { name: "description", content: "Start a conversation with Typtwo." },
      { property: "og:title", content: "Contact — Typtwo" },
      { property: "og:description", content: "Start a conversation with Typtwo." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <Section className="pt-16 pb-32 lg:pt-24">
      <div className="max-w-4xl">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="rise-in mt-6 font-display text-5xl leading-[1.02] tracking-tight sm:text-7xl lg:text-[96px]">
          Let's <span className="gold-text italic">talk.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/70">
          Tell us about your business and what you're trying to do next. We reply within one working day.
        </p>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ContactRow label="General" value="hello@typtwo.com" />
          <ContactRow label="Tech" value="tech@typtwo.com" />
          <ContactRow label="Studios" value="studios@typtwo.com" />
          <ContactRow label="Press" value="press@typtwo.com" />
        </div>

        <div className="lg:col-span-7">
          {sent ? (
            <div className="rounded-2xl gold-border bg-card p-10 text-center">
              <div className="eyebrow">Message received</div>
              <h3 className="mt-3 font-display text-2xl tracking-tight">Thanks — we'll be in touch <span className="gold-text italic">shortly.</span></h3>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="rounded-2xl gold-border bg-card p-8 space-y-6 lg:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Name" name="name" required />
                <Field label="Company" name="company" />
                <Field label="Email" name="email" type="email" required />
                <Field label="Division" name="division" as="select">
                  <option>Not sure yet</option>
                  <option>Typtwo Tech</option>
                  <option>Typtwo Studios</option>
                  <option>Both</option>
                </Field>
              </div>
              <Field label="Project" name="project" as="textarea" required />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                Send message <span aria-hidden>→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="hairline-b flex items-center justify-between py-5">
      <div className="eyebrow">{label}</div>
      <a href={`mailto:${value}`} className="font-display text-lg tracking-tight hover:text-gold">
        {value}
      </a>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  as = "input",
  children,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: "input" | "textarea" | "select";
  children?: React.ReactNode;
}) {
  const baseCls =
    "mt-2 w-full border-0 border-b border-hairline bg-transparent px-0 py-2 text-base text-foreground outline-none placeholder:text-muted-foreground focus:border-gold";
  return (
    <label className="block">
      <span className="eyebrow">{label}{required && " *"}</span>
      {as === "textarea" ? (
        <textarea name={name} required={required} rows={4} className={baseCls} />
      ) : as === "select" ? (
        <select name={name} required={required} className={`${baseCls} bg-card`}>{children}</select>
      ) : (
        <input name={name} type={type} required={required} className={baseCls} />
      )}
    </label>
  );
}
