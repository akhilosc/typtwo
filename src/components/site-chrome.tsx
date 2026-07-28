import { Link } from "@tanstack/react-router";
import { type ReactNode, useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

const NAV = [
  { to: "/tech", label: "Tech", n: "01" },
  { to: "/studios", label: "Studios", n: "02" },
  { to: "/clients", label: "Clients", n: "03" },
  { to: "/about", label: "About", n: "04" },
  { to: "/contact", label: "Contact", n: "05" },
] as const;

export function Ticker({
  items,
  reverse = false,
  className = "",
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  const loop = [...items, ...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`flex w-max whitespace-nowrap ${
          reverse ? "ticker-reverse" : "ticker"
        }`}
      >
        {loop.map((t, i) => (
          <span key={i} className="mx-6 inline-flex items-center gap-6">
            <span>{t}</span>
            <span aria-hidden>✱</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function StatusBar() {
  return (
    <div className="hidden md:flex border-b-2 border-ink bg-paper text-ink mono text-[11px] uppercase tracking-widest">
      <div className="px-4 py-1.5 border-r-2 border-ink flex items-center gap-2">
        <span className="inline-block h-2 w-2 bg-flame" /> LIVE
      </div>
      <div className="px-4 py-1.5 border-r-2 border-ink">SYS/TYPTWO_v2.0</div>
      <div className="px-4 py-1.5 border-r-2 border-ink flex-1">
        <Ticker
          items={[
            "TWO WORLDS. ONE FORCE.",
            "ENGINEERING INTELLIGENT OPERATIONS",
            "ENGINEERING INTELLIGENT GROWTH",
            "BUILT FOR WHAT'S NEXT",
            "NOW ONBOARDING Q3 PARTNERS",
          ]}
        />
      </div>
      <div className="px-4 py-1.5 border-l-2 border-ink">
        <span className="blink">█</span> ONLINE
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  return (
    <>
      <StatusBar />
      <header className="sticky top-0 z-40 bg-paper border-b-2 border-ink">
        <div className="grid grid-cols-12 items-stretch">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="col-span-6 md:col-span-3 flex items-center gap-3 px-6 py-4 border-r-2 border-ink group"
          >
            <span
              aria-hidden
              className="inline-block h-3 w-3 bg-flame group-hover:bg-ink transition"
            />
            <span className="display text-3xl leading-none tracking-tight">
              TYP<span className="text-flame">TWO</span>
              <span className="text-flame">.</span>
            </span>
          </Link>

          <nav className="hidden md:flex col-span-6 items-stretch">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="group flex-1 flex items-center gap-3 px-5 border-r-2 border-ink mono text-xs uppercase tracking-widest hover:bg-ink hover:text-paper transition"
                activeProps={{ className: "bg-volt text-ink" }}
              >
                <span className="opacity-60">[{n.n}]</span>
                <span>{n.label}</span>
              </Link>
            ))}
          </nav>

          <div className="col-span-6 md:col-span-3 flex items-stretch justify-end">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center px-4 hover:bg-ink hover:text-paper border-r-2 border-ink transition cursor-pointer text-ink bg-paper"
              title="Toggle theme mode"
              style={{ minWidth: '48px' }}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden items-center justify-center px-4 hover:bg-ink hover:text-paper border-r-2 border-ink transition cursor-pointer text-ink bg-paper"
              title="Toggle Menu"
              style={{ minWidth: '48px' }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link
              to="/contact"
              className="hidden sm:flex flex-1 items-center justify-between gap-2 px-6 py-4 bg-ink text-paper hover:bg-flame transition group"
            >
              <span className="mono text-xs uppercase tracking-widest">
                Start a project
              </span>
              <span className="text-xl group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-ink bg-paper w-full">
            <nav className="flex flex-col items-stretch">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-6 py-4 border-b-2 border-ink mono text-sm uppercase tracking-widest text-ink hover:bg-ink hover:text-paper transition"
                  activeProps={{ className: "bg-volt text-ink" }}
                >
                  <span className="opacity-60 mr-2">[{n.n}]</span>
                  <span>{n.label}</span>
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-5 bg-ink text-paper text-center font-bold mono text-sm uppercase tracking-widest hover:bg-flame transition"
              >
                Start a project →
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-paper">
      <div className="border-b-2 border-ink bg-ink text-paper overflow-hidden">
        <div className="ticker-slow flex w-max whitespace-nowrap py-6 display text-6xl md:text-8xl">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-8 flex items-center gap-8">
              <span>TWO WORLDS</span>
              <span className="text-flame">✱</span>
              <span className="italic">One force.</span>
              <span className="text-volt">✱</span>
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 border-b-2 border-ink">
        <div className="col-span-12 md:col-span-6 p-8 md:p-14 border-r-0 md:border-r-2 border-ink">
          <div className="mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
            [ Let's build ]
          </div>
          <div className="display text-5xl md:text-7xl leading-[0.9]">
            Something the <span className="bg-volt px-2">world</span>
            <br /> hasn't seen yet.
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 mt-10 brute bg-flame text-paper px-6 py-4 mono uppercase tracking-widest text-sm"
          >
            Start a conversation
            <span>→</span>
          </Link>
        </div>

        <div className="col-span-12 md:col-span-6 grid grid-cols-2">
          <FooterCol title="Divisions">
            <FLink to="/tech">01 · Tech</FLink>
            <FLink to="/studios">02 · Studios</FLink>
          </FooterCol>
          <FooterCol title="Company">
            <FLink to="/clients">03 · Clients</FLink>
            <FLink to="/about">04 · About</FLink>
            <FLink to="/contact">05 · Contact</FLink>
          </FooterCol>
          <FooterCol title="Contact">
            <a href="mailto:hello@typtwo.com" className="hover:bg-volt inline-block">
              hello@typtwo.com
            </a>
            <span className="text-muted-foreground">One thread. Two worlds.</span>
          </FooterCol>
          <FooterCol title="Signal">
            <a href="#" className="hover:bg-volt inline-block">LinkedIn ↗</a>
            <a href="#" className="hover:bg-volt inline-block">Instagram ↗</a>
          </FooterCol>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 mono text-[11px] uppercase tracking-widest">
        <span>© {new Date().getFullYear()} TYPTWO / ALL RIGHTS RESERVED</span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 bg-flame blink" />
          BUILT FOR WHAT'S NEXT
        </span>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t-2 md:border-t-0 border-l-2 border-ink p-6">
      <div className="mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
        // {title}
      </div>
      <ul className="space-y-2 text-sm">{splitChildren(children)}</ul>
    </div>
  );
}
function splitChildren(children: ReactNode) {
  const arr = Array.isArray(children) ? children : [children];
  return arr.map((c, i) => <li key={i}>{c}</li>);
}
function FLink({ to, children }: { to: (typeof NAV)[number]["to"]; children: ReactNode }) {
  return (
    <Link to={to} className="hover:bg-volt inline-block">
      {children}
    </Link>
  );
}

/* ------- Reusable brutalist primitives ------- */

export function Eyebrow({
  children,
  color = "ink",
}: {
  children: ReactNode;
  color?: "ink" | "flame" | "paper";
}) {
  const cls =
    color === "flame"
      ? "text-flame"
      : color === "paper"
      ? "text-paper"
      : "text-ink";
  return (
    <div className={`mono text-xs uppercase tracking-[0.25em] ${cls} flex items-center gap-3`}>
      <span aria-hidden>[</span>
      {children}
      <span aria-hidden>]</span>
    </div>
  );
}

export function BruteButton({
  to,
  children,
  variant = "ink",
}: {
  to: "/tech" | "/studios" | "/about" | "/contact" | "/";
  children: ReactNode;
  variant?: "ink" | "flame" | "volt" | "paper";
}) {
  const styles: Record<string, string> = {
    ink: "bg-ink text-paper",
    flame: "bg-flame text-paper",
    volt: "bg-volt text-ink",
    paper: "bg-paper text-ink",
  };
  return (
    <Link
      to={to}
      className={`brute inline-flex items-center gap-3 px-6 py-4 mono uppercase tracking-widest text-sm ${styles[variant]}`}
    >
      {children}
      <span>→</span>
    </Link>
  );
}

export function SectionLabel({
  n,
  label,
}: {
  n: string;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between border-b-2 border-ink py-3 mono text-xs uppercase tracking-widest">
      <span className="flex items-center gap-3">
        <span className="bg-ink text-paper px-2 py-1">{n}</span>
        <span>{label}</span>
      </span>
      <span className="hidden md:inline text-muted-foreground">
        ────────────── ✱
      </span>
    </div>
  );
}

export function PageHeader({
  n,
  kicker,
  title,
  lead,
  accent = "flame",
}: {
  n: string;
  kicker: string;
  title: ReactNode;
  lead: string;
  accent?: "flame" | "volt";
}) {
  return (
    <section className="border-b-2 border-ink">
      <SectionLabel n={n} label={kicker} />
      <div className="grid grid-cols-12 gap-0">
        <div className="col-span-12 md:col-span-8 p-6 md:p-14 border-r-0 md:border-r-2 border-ink">
          <h1 className="display text-6xl md:text-[10rem] leading-[0.85] tracking-tighter rise">
            {title}
          </h1>
        </div>
        <div className="col-span-12 md:col-span-4 p-6 md:p-14 flex flex-col justify-between gap-8">
          <p className="text-lg leading-relaxed">{lead}</p>
          <div className={`h-24 ${accent === "flame" ? "bg-flame" : "bg-volt"} brute`} />
        </div>
      </div>
    </section>
  );
}
