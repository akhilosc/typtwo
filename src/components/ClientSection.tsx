import React from "react";
import { Link } from "@tanstack/react-router";
import { Eyebrow, SectionLabel } from "./site-chrome";

export const CLIENT_DATA = {
  brainsBehind: [
    { name: "Startup Talky", desc: "Founder Ecosystem & Media", tag: "Ecosystem" },
    { name: "BitBNS", desc: "Fintech & Digital Assets", tag: "Crypto" },
    { name: "BuyHatke!", desc: "E-commerce & Price Analytics", tag: "Consumer Tech" },
    { name: "MONEY MINDS8", desc: "Wealth Management Platform", tag: "Finance" }
  ],
  workedWith: [
    { name: "Merino Industries", desc: "Global Polymer & Architectural Surfaces", tag: "Industrial" },
    { name: "Somany Ceramics", desc: "Tiles, Bathware & Building Materials", tag: "Manufacturing" },
    { name: "Clove Dental", desc: "Healthcare & Dental Clinic Network", tag: "Health" },
    { name: "Sugs Lloyd", desc: "Industrial Inspection & QA Compliance", tag: "Sovereign Systems" },
    { name: "Spinny", desc: "Automotive Retail & Car Platform", tag: "Consumer Market" },
    { name: "Abhay Prabhavana", desc: "Cultural Museum IP & Heritage Digitalization", tag: "Museum IP" },
    { name: "Percept Limited", desc: "Media, Entertainment & Communications", tag: "PR & Media" },
    { name: "Government of Maharashtra", desc: "State Public Infrastructure Digitalization", tag: "Government" }
  ]
};

export function ClientGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b-2 border-ink">
      {/* Brains Behind Group */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 p-8 border-b-2 border-ink bg-ink text-paper">
        <Eyebrow color="flame">Group A</Eyebrow>
        <h3 className="display text-4xl md:text-5xl mt-2 tracking-tight">The Brains Behind</h3>
        <p className="mono text-xs text-muted-foreground mt-1">// Elite founders and core engineering collaborations</p>
      </div>
      
      {CLIENT_DATA.brainsBehind.map((c, i) => (
        <div 
          key={c.name}
          className="p-8 border-b-2 md:border-b-0 border-r-2 border-ink hover:bg-volt hover:text-ink transition-colors flex flex-col justify-between min-h-[200px]"
        >
          <div>
            <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
              [ {c.tag} ]
            </div>
            <h4 className="display text-3xl leading-tight font-extrabold">{c.name}</h4>
          </div>
          <p className="text-sm mt-4 leading-relaxed opacity-95">{c.desc}</p>
        </div>
      ))}

      {/* Worked With Group */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 p-8 border-t-2 border-b-2 border-ink bg-ink text-paper">
        <Eyebrow color="flame">Group B</Eyebrow>
        <h3 className="display text-4xl md:text-5xl mt-2 tracking-tight">The Team Has Worked With</h3>
        <p className="mono text-xs text-muted-foreground mt-1">// Marquee commercial enterprises, IP projects & state departments</p>
      </div>

      {CLIENT_DATA.workedWith.map((c, i) => (
        <div 
          key={c.name}
          className="p-8 border-b-2 border-r-2 border-ink hover:bg-volt hover:text-ink transition-colors flex flex-col justify-between min-h-[220px]"
        >
          <div>
            <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
              [ {c.tag} ]
            </div>
            <h4 className="display text-3xl leading-tight font-extrabold">{c.name}</h4>
          </div>
          <p className="text-sm mt-4 leading-relaxed opacity-95">{c.desc}</p>
        </div>
      ))}

      {/* Massive Callout Block */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 p-12 bg-flame text-paper flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h4 className="display text-4xl md:text-6xl">& HUNDREDS OF OTHER CLIENTS</h4>
          <p className="mono text-sm mt-2 opacity-90">// Scaling tech operations & global narratives worldwide.</p>
        </div>
        <Link 
          to="/contact" 
          className="brute bg-ink text-paper hover:bg-paper hover:text-ink px-8 py-4 mono uppercase tracking-wider text-sm whitespace-nowrap"
        >
          Join the Network →
        </Link>
      </div>
    </div>
  );
}
