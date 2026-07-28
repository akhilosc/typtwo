import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/tech", label: "Tech" },
  { to: "/studios", label: "Studios" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/70 backdrop-blur-xl hairline-b">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-baseline gap-2.5">
          <span className="font-display text-[26px] leading-none tracking-tight">
            Typ<span className="gold-text">two</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-2 text-sm text-foreground/60 transition-colors hover:text-foreground"
              activeProps={{ className: "px-3 py-2 text-sm text-gold" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/contact"
          className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2 text-xs font-medium text-background transition-transform hover:-translate-y-0.5 md:inline-flex"
        >
          Get in touch
          <span aria-hidden>→</span>
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="hairline-t mt-24 bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-display text-5xl tracking-tight">
              Typ<span className="gold-text">two</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Two divisions. One purpose. Building the intelligent enterprise through technology and creativity.
            </p>
          </div>
          <FooterCol title="Divisions" items={[["Tech", "/tech"], ["Studios", "/studios"]]} />
          <FooterCol title="Company" items={[["About", "/about"], ["Contact", "/contact"]]} />
          <FooterCol title="Connect" items={[["LinkedIn", "#"], ["Instagram", "#"], ["Email", "mailto:hello@typtwo.com"]]} external />
        </div>
        <div className="hairline-t mt-14 flex flex-col items-start justify-between gap-3 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Typtwo — The Intelligent Enterprise.</div>
          <div className="font-mono text-gold/70">hello@typtwo.com</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
  external,
}: {
  title: string;
  items: readonly (readonly [string, string])[];
  external?: boolean;
}) {
  return (
    <div className="md:col-span-2">
      <div className="eyebrow mb-3">{title}</div>
      <ul className="space-y-2 text-sm">
        {items.map(([label, href]) =>
          external ? (
            <li key={label}>
              <a href={href} className="text-foreground/80 hover:text-gold">{label}</a>
            </li>
          ) : (
            <li key={label}>
              <Link to={href} className="text-foreground/80 hover:text-gold">{label}</Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-[1400px] px-6 lg:px-10 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow flex items-center gap-2">
      <span className="h-px w-6 bg-gold/60" />
      {children}
    </div>
  );
}
