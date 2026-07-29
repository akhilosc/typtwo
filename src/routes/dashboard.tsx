import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader, SectionLabel, Eyebrow } from "../components/site-chrome";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Client Portal — Typtwo" },
      { name: "description", content: "Active project logs and shared deliverables." }
    ]
  }),
  component: DashboardPage
});

interface Message {
  sender: string;
  text: string;
  timestamp: string;
}

function DashboardPage() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [msgText, setMsgText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "Typtwo Desk",
      text: "Welcome to the portal. Your private local LLM configuration is active on GCP and under load-testing.",
      timestamp: "2 Hours Ago"
    }
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem("t2_session");
    if (!session) {
      navigate({ to: "/login" });
      return;
    }
    setEmail(localStorage.getItem("t2_user_email") || "client@company.com");
    setCompany(localStorage.getItem("t2_user_company") || "Corporate Partner");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("t2_session");
    window.dispatchEvent(new Event("storage"));
    navigate({ to: "/login" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgText.trim()) return;

    const newMsg: Message = {
      sender: "You",
      text: msgText,
      timestamp: "Just Now"
    };

    setMessages([...messages, newMsg]);
    setMsgText("");

    // Simulate Typtwo Desk automatic response for brutalist dashboard feedback
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "Typtwo Desk",
          text: "Acknowledged. Routing this brief directly to Division leads. Expect a node reply within 2 hours.",
          timestamp: "Just Now"
        }
      ]);
    }, 1200);
  };

  return (
    <>
      <div className="border-b-2 border-ink bg-paper flex items-center justify-between p-6">
        <div>
          <Eyebrow color="flame">Authenticated Session</Eyebrow>
          <div className="display text-2xl font-bold mt-1 uppercase tracking-tight">
            {company}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="brute bg-flame text-paper px-4 py-2 mono text-xs uppercase tracking-widest hover:bg-ink transition cursor-pointer"
        >
          Logout / Exit →
        </button>
      </div>

      <PageHeader
        n="D1"
        kicker="Ops Room"
        title={
          <>
            Control<br />
            <span className="italic">dashboard.</span>
          </>
        }
        lead={`Authorized client interface for ${email}. Manage active operational timelines and access network credentials.`}
        accent="volt"
      />

      {/* Grid: Timelines & Deliverables */}
      <section className="grid md:grid-cols-12 border-b-2 border-ink">
        {/* Timelines Tracker */}
        <div className="md:col-span-8 p-6 md:p-10 border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-ink">
          <SectionLabel n="01" label="Active Sprints" />

          <div className="space-y-12 mt-8">
            {/* Tech Sprint */}
            <div className="border-2 border-ink p-6 bg-paper relative">
              <div className="mono text-[10px] text-muted-foreground uppercase mb-2">// Division 01 / TECH</div>
              <h4 className="display text-2xl font-bold">Sovereign LLM Pipeline Integration</h4>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed max-w-[55ch]">
                Migrating corporate vector database indexing clusters inside GCP sandbox environment. Active security scan pending validation.
              </p>
              
              {/* Progress bar */}
              <div className="mt-6">
                <div className="flex justify-between items-center mono text-[10px] mb-2 font-bold">
                  <span>STAGE: 03/04 (TESTING)</span>
                  <span className="text-volt">75% COMPLETE</span>
                </div>
                <div className="h-4 bg-ink/10 border border-ink overflow-hidden">
                  <div className="h-full bg-volt" style={{ width: "75%" }} />
                </div>
              </div>
            </div>

            {/* Studios Sprint */}
            <div className="border-2 border-ink p-6 bg-paper relative">
              <div className="mono text-[10px] text-muted-foreground uppercase mb-2">// Division 02 / STUDIOS</div>
              <h4 className="display text-2xl font-bold">High-Traction Short-form Reels GTM</h4>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed max-w-[55ch]">
                Production phase of primary narrative series. Scriptwriting validation completed. Shooting timeline is currently underway.
              </p>
              
              {/* Progress bar */}
              <div className="mt-6">
                <div className="flex justify-between items-center mono text-[10px] mb-2 font-bold">
                  <span>STAGE: 02/03 (PRODUCTION)</span>
                  <span className="text-flame">50% COMPLETE</span>
                </div>
                <div className="h-4 bg-ink/10 border border-ink overflow-hidden">
                  <div className="h-full bg-flame" style={{ width: "50%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deliverables Vault */}
        <div className="md:col-span-4 p-6 md:p-10 flex flex-col justify-between">
          <div>
            <SectionLabel n="02" label="Shared Vault" />
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
              Export keys, schemas, and blueprint assets delivered by Division squads.
            </p>

            <div className="space-y-3 mt-8">
              {[
                { name: "typtwo_ops_blueprint_v2.pdf", size: "4.8 MB" },
                { name: "traction_metrics_q2.csv", size: "1.2 MB" },
                { name: "cloud_deployment_schema.json", size: "320 KB" }
              ].map((f) => (
                <div key={f.name} className="p-4 border border-ink/40 flex items-center justify-between hover:bg-volt/10 transition-colors">
                  <div>
                    <div className="display text-sm font-bold truncate max-w-[18ch]">{f.name}</div>
                    <span className="mono text-[9px] text-muted-foreground">{f.size}</span>
                  </div>
                  <button
                    onClick={() => alert(`Downloading mock asset: ${f.name}`)}
                    className="mono text-[10px] underline hover:text-flame cursor-pointer"
                  >
                    GET
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="brute bg-ink text-paper p-6 mt-8">
            <div className="mono text-[10px] uppercase text-flame mb-2">Notice</div>
            <p className="text-[11px] leading-relaxed opacity-85">
              Vault storage tokens regenerate every 24 hours. Ensure keys are stored on local vaults.
            </p>
          </div>
        </div>
      </section>

      {/* Support Message Board Thread */}
      <section className="grid md:grid-cols-12 border-b-2 border-ink">
        <div className="md:col-span-4 p-6 md:p-10 border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-ink">
          <SectionLabel n="03" label="Direct Channel" />
          <h3 className="display text-3xl mt-4 leading-tight">Instruct the Desk</h3>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            Submit task alterations, priority revisions, or query credentials directly. Your thread triggers immediate channel routing.
          </p>
        </div>

        <div className="md:col-span-8 p-6 md:p-10 flex flex-col justify-between min-h-[400px]">
          {/* Thread messages logs */}
          <div className="space-y-4 max-h-72 overflow-y-auto mb-8 pr-2">
            {messages.map((m, idx) => (
              <div 
                key={idx}
                className={`p-4 border max-w-[80%] ${
                  m.sender === "You" 
                    ? "bg-volt/10 border-volt ml-auto text-right" 
                    : "bg-paper border-ink/40 mr-auto text-left"
                }`}
              >
                <div className="mono text-[9px] text-muted-foreground mb-1">
                  {m.sender} // {m.timestamp}
                </div>
                <p className="text-xs leading-relaxed font-mono">{m.text}</p>
              </div>
            ))}
          </div>

          {/* Form input messaging */}
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
              placeholder="Submit instruction to Operations Desk..."
              className="flex-grow bg-paper border-2 border-ink px-4 py-3 focus:outline-none focus:bg-volt/10 mono text-sm"
              required
            />
            <button
              type="submit"
              className="brute bg-ink text-paper px-6 hover:bg-volt hover:text-ink font-bold mono text-xs uppercase tracking-widest cursor-pointer"
            >
              SEND
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
