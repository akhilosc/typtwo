import { createFileRoute, Link } from "@tanstack/react-router";
import { Cpu, ArrowRight } from "lucide-react";
import { TechFeaturesV9 } from "@/components/v9/TechFeaturesV9";

export const Route = createFileRoute("/tech")({
  head: () => ({
    meta: [
      { title: "Typtwo Tech — Sovereign Private AI & Enterprise Operations" },
      { name: "description", content: "Modernise your organisation through intelligent systems, secure automation and connected technology." },
    ],
  }),
  component: TechPage,
});

function TechPage() {
  return (
    <div style={{ backgroundColor: "#040404", minHeight: "100vh", color: "#FFFFFF" }}>
      {/* 3D Sovereign Tech Hero Section */}
      <section style={{ position: "relative", minHeight: "85vh", display: "flex", alignItems: "center", paddingTop: "140px", paddingBottom: "80px", borderBottom: "1px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 70% 30%, rgba(0,229,255,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "48px", alignItems: "center" }}>
            
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "9999px", backgroundColor: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.4)", fontSize: "11px", fontWeight: 800, letterSpacing: "0.15em", color: "#00E5FF", textTransform: "uppercase", marginBottom: "24px" }}>
                <Cpu size={16} /> ENGINE 01 • TYPTWO TECH
              </div>
              <h1 style={{ fontSize: "clamp(44px, 5.5vw, 76px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "24px" }}>
                Engineering<br />
                <span style={{ color: "#00E5FF" }}>Intelligent Operations.</span>
              </h1>
              <p style={{ fontSize: "18px", color: "#908F9D", lineHeight: 1.6, maxWidth: "560px", marginBottom: "40px" }}>
                Imagine if your business could remember everything. Every document. Every conversation. Every process. Every customer. Every decision. We build on-prem, 0-egress private AI systems that make it happen.
              </p>
              <Link
                to="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 32px",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(0,229,255,0.15)",
                  border: "1px solid #00E5FF",
                  color: "#00E5FF",
                  fontWeight: 700,
                  fontSize: "15px",
                  textDecoration: "none",
                  boxShadow: "0 0 30px rgba(0,229,255,0.3)"
                }}
              >
                <span>Back to Flagship Experience</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* 3D Tech Monolith Hero Render */}
            <div style={{ borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(0,229,255,0.4)", boxShadow: "0 0 60px rgba(0,229,255,0.2)", height: "480px" }}>
              <img 
                src="/images/tech_hero_3d.png" 
                alt="Typtwo Tech Sovereign 3D Monolith"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Tech Features Component with 3D Image Cards */}
      <TechFeaturesV9 />
    </div>
  );
}
