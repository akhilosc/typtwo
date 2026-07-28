import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight } from "lucide-react";
import { StudiosFeaturesV9 } from "@/components/v9/StudiosFeaturesV9";

export const Route = createFileRoute("/studios")({
  head: () => ({
    meta: [
      { title: "Typtwo Studios — Creative Intelligence & Brand Growth" },
      { name: "description", content: "Create brands people trust, campaigns people remember, and content people actually want to watch." },
    ],
  }),
  component: StudiosPage,
});

function StudiosPage() {
  return (
    <div style={{ backgroundColor: "#040404", minHeight: "100vh", color: "#FFFFFF" }}>
      {/* 3D Creative Studios Hero Section */}
      <section style={{ position: "relative", minHeight: "85vh", display: "flex", alignItems: "center", paddingTop: "140px", paddingBottom: "80px", borderBottom: "1px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 70% 30%, rgba(212,175,55,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "48px", alignItems: "center" }}>
            
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "9999px", backgroundColor: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.4)", fontSize: "11px", fontWeight: 800, letterSpacing: "0.15em", color: "#D4AF37", textTransform: "uppercase", marginBottom: "24px" }}>
                <Sparkles size={16} /> ENGINE 02 • TYPTWO STUDIOS
              </div>
              <h1 style={{ fontSize: "clamp(44px, 5.5vw, 76px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "24px" }}>
                Engineering<br />
                <span style={{ color: "#F5D77F" }}>Intelligent Growth.</span>
              </h1>
              <p style={{ fontSize: "18px", color: "#908F9D", lineHeight: 1.6, maxWidth: "560px", marginBottom: "40px" }}>
                Great businesses deserve great stories. People don't remember advertisements. They remember moments, ideas, experiences, and conversations. We engineer brands people trust and short fiction people watch.
              </p>
              <Link
                to="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 32px",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(212,175,55,0.15)",
                  border: "1px solid #D4AF37",
                  color: "#F5D77F",
                  fontWeight: 700,
                  fontSize: "15px",
                  textDecoration: "none",
                  boxShadow: "0 0 30px rgba(212,175,55,0.3)"
                }}
              >
                <span>Back to Flagship Experience</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* 3D Studios Hero Render */}
            <div style={{ borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(212,175,55,0.4)", boxShadow: "0 0 60px rgba(212,175,55,0.2)", height: "480px" }}>
              <img 
                src="/images/studios_hero_3d.png" 
                alt="Typtwo Studios Creative Intelligence 3D Prism"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Studios Features Component with 3D Image Cards */}
      <StudiosFeaturesV9 />
    </div>
  );
}
