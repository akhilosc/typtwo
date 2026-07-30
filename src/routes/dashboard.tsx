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

interface Requirement {
  id: string;
  type: "drive_link" | "social_handle" | "boolean";
  label: string;
  active: boolean;
  submitted: boolean;
  value: string;
}

interface StatusUpdate {
  text: string;
  timestamp: string;
}

interface VaultFile {
  name: string;
  size: string;
}

const DEFAULT_REQUIREMENTS = [
  { id: "req-brand-kit", type: "drive_link", label: "Brand Kit Drive Link", active: true, submitted: false, value: "" },
  { id: "req-brand-assets", type: "drive_link", label: "Brand Assets Drive Link", active: true, submitted: false, value: "" },
  { id: "req-credentials", type: "drive_link", label: "Credentials Drive Link", active: false, submitted: false, value: "" },
  { id: "req-vault", type: "boolean", label: "Enable Shared Deliverables Vault", active: true, submitted: false, value: "" },
  { id: "req-status-feed", type: "boolean", label: "Enable Real-Time Status Feed", active: true, submitted: false, value: "" }
];

const DEFAULT_STATUSES: StatusUpdate[] = [
  {
    text: "Private local LLM configuration is active on GCP sandbox environment and undergoing load-testing.",
    timestamp: "10:30 AM - Today"
  },
  {
    text: "Initial brand positioning and short-form video draft schedules sent to Division leads.",
    timestamp: "Yesterday"
  }
];

const DEFAULT_FILES: VaultFile[] = [
  { name: "typtwo_ops_blueprint_v2.pdf", size: "4.8 MB" },
  { name: "cloud_deployment_schema.json", size: "320 KB" }
];

function DashboardPage() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [clientId, setClientId] = useState("");
  
  // Dynamic client states loaded from localStorage
  const [reqs, setReqs] = useState<Requirement[]>([]);
  const [statuses, setStatuses] = useState<StatusUpdate[]>([]);
  const [files, setFiles] = useState<VaultFile[]>([]);

  // Input states for each requirement
  const [inputVals, setInputVals] = useState<Record<string, string>>({});
  
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem("t2_session");
    if (!session) {
      navigate({ to: "/login" });
      return;
    }

    const userEmail = localStorage.getItem("t2_user_email") || "client@company.com";
    const userCompany = localStorage.getItem("t2_user_company") || "Corporate Partner";
    
    // Determine dynamic client identification key
    let id = "acme";
    if (userEmail.includes("startuptalky")) id = "startuptalky";
    else if (userEmail.includes("bitbns")) id = "bitbns";

    setEmail(userEmail);
    setCompany(userCompany);
    setClientId(id);

    // 1. Load requirements
    const reqKey = `t2_reqs_${id}`;
    const storedReqs = localStorage.getItem(reqKey);
    let currentReqs: Requirement[] = [];
    if (storedReqs) {
      currentReqs = JSON.parse(storedReqs);
    } else {
      currentReqs = JSON.parse(JSON.stringify(DEFAULT_REQUIREMENTS));
      localStorage.setItem(reqKey, JSON.stringify(currentReqs));
    }
    setReqs(currentReqs);

    // Initialise input values from stored requirements values
    const vals: Record<string, string> = {};
    currentReqs.forEach((r) => {
      vals[r.id] = r.value || "";
    });
    setInputVals(vals);

    // 2. Load status logs
    const statusKey = `t2_statuses_${id}`;
    const storedStatuses = localStorage.getItem(statusKey);
    if (storedStatuses) {
      setStatuses(JSON.parse(storedStatuses));
    } else {
      setStatuses(DEFAULT_STATUSES);
      localStorage.setItem(statusKey, JSON.stringify(DEFAULT_STATUSES));
    }

    // 3. Load files
    const filesKey = `t2_files_${id}`;
    const storedFiles = localStorage.getItem(filesKey);
    if (storedFiles) {
      setFiles(JSON.parse(storedFiles));
    } else {
      setFiles(DEFAULT_FILES);
      localStorage.setItem(filesKey, JSON.stringify(DEFAULT_FILES));
    }

    // Set up a storage listener so if the admin page changes settings, we reload instantly
    const handleStorageChange = () => {
      const freshReqs = localStorage.getItem(reqKey);
      if (freshReqs) {
        const parsed = JSON.parse(freshReqs);
        setReqs(parsed);
        const freshVals: Record<string, string> = {};
        parsed.forEach((r: Requirement) => {
          freshVals[r.id] = r.value || "";
        });
        setInputVals(freshVals);
      }
      const freshStatuses = localStorage.getItem(statusKey);
      if (freshStatuses) setStatuses(JSON.parse(freshStatuses));
      const freshFiles = localStorage.getItem(filesKey);
      if (freshFiles) setFiles(JSON.parse(freshFiles));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [navigate, clientId]);

  const handleLogout = () => {
    localStorage.removeItem("t2_session");
    window.dispatchEvent(new Event("storage"));
    navigate({ to: "/login" });
  };

  const handleInputChange = (id: string, val: string) => {
    setInputVals((prev) => ({ ...prev, [id]: val }));
  };

  // Submit individual requirement
  const submitRequirement = (id: string) => {
    const value = inputVals[id] || "";
    if (!value.trim()) {
      alert("Please fill in the input box before submitting.");
      return;
    }

    const updated = reqs.map((r) => 
      r.id === id ? { ...r, submitted: true, value } : r
    );

    setReqs(updated);
    localStorage.setItem(`t2_reqs_${clientId}`, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    alert("Requirement submitted to the Typtwo Operations Desk.");
  };

  const isVaultActive = reqs.find(r => r.id === "req-vault")?.active ?? true;
  const isStatusActive = reqs.find(r => r.id === "req-status-feed")?.active ?? true;
  const activeInputReqs = reqs.filter(r => r.active && r.type !== "boolean");

  return (
    <>
      <div className="border-b-2 border-ink bg-paper flex items-center justify-between p-6">
        <div>
          <Eyebrow color="flame">Client Portal</Eyebrow>
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
        n="C1"
        kicker="Ops Desk Interface"
        title={
          <>
            Client<br />
            <span className="italic">dashboard.</span>
          </>
        }
        lead={`Authorized dashboard for ${email}. Upload required brand resources, access deliverables, and review live operational status logs.`}
        accent="volt"
        meta={[
          { label: "Account", value: company || "Corporate Client" },
          { label: "Secure Key", value: `T2-${clientId.toUpperCase()}-SEC` },
          { label: "Network status", value: "Optimal Link active" }
        ]}
      />

      {/* Grid Layout of dynamic criteria */}
      <section className="grid grid-cols-1 lg:grid-cols-12 items-stretch border-b-2 border-ink">
        {/* Left: Input Requirements Form Cards */}
        <div className="lg:col-span-7 p-6 md:p-10 border-r-0 lg:border-r-2 border-b-2 lg:border-b-0 border-ink bg-paper">
          <SectionLabel n="01" label="Outstanding Deliverables" />
          
          <div className="space-y-6 mt-8">
            {activeInputReqs.map((r) => (
              <div 
                key={r.id} 
                className={`p-6 border-2 border-ink bg-paper relative ${
                  r.submitted ? "bg-volt/5 border-volt" : "bg-paper border-ink"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="mono text-[9px] text-muted-foreground uppercase">// TYPE: {r.type.replace('_', ' ')}</div>
                  {r.submitted && (
                    <span className="mono text-[9px] bg-volt text-ink px-2 py-0.5 font-bold">
                      ✓ SUBMITTED
                    </span>
                  )}
                </div>

                <h4 className="display text-xl font-bold mt-2">{r.label}</h4>

                {r.type === "drive_link" && (
                  <p className="mono text-[9px] text-flame mt-1 font-bold">
                    ⚠️ NOTICE: All links should be private and access request shall be generated by the Typtwo team.
                  </p>
                )}

                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={inputVals[r.id] || ""}
                    onChange={(e) => handleInputChange(r.id, e.target.value)}
                    placeholder={r.type === "drive_link" ? "Paste secure private drive link URL..." : "Enter @handle profile url..."}
                    className="flex-grow bg-paper border-2 border-ink px-4 py-2.5 focus:outline-none focus:bg-volt/10 mono text-xs"
                  />
                  <button
                    onClick={() => submitRequirement(r.id)}
                    className="brute bg-ink text-paper hover:bg-volt hover:text-ink px-5 mono text-xs uppercase tracking-widest font-bold cursor-pointer"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            ))}

            {activeInputReqs.length === 0 && (
              <p className="text-xs text-muted-foreground italic">No outstanding requirements requested by Typtwo operations at this time.</p>
            )}
          </div>
        </div>

        {/* Right: Files Vault */}
        <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between">
          <div>
            <SectionLabel n="02" label="Deliverables Vault" />
            
            {isVaultActive ? (
              <div className="space-y-3 mt-8">
                {files.map((f) => (
                  <div key={f.name} className="p-4 border border-ink/40 flex items-center justify-between hover:bg-volt/10 transition-colors">
                    <div>
                      <div className="display text-sm font-bold truncate max-w-[20ch]">{f.name}</div>
                      <span className="mono text-[9px] text-muted-foreground">{f.size}</span>
                    </div>
                    <button
                      onClick={() => alert(`Downloading document: ${f.name}`)}
                      className="mono text-[10px] underline hover:text-flame cursor-pointer font-bold"
                    >
                      GET
                    </button>
                  </div>
                ))}

                {files.length === 0 && (
                  <p className="text-xs text-muted-foreground italic">No documents posted by the team yet.</p>
                )}
              </div>
            ) : (
              <div className="brute border border-dashed border-ink/30 p-8 text-center text-xs text-muted-foreground mt-8">
                Deliverables vault has been disabled by operational desk.
              </div>
            )}
          </div>

          <div className="brute bg-ink text-paper p-6 mt-8">
            <div className="mono text-[10px] uppercase text-flame mb-2">Security Perimeter</div>
            <p className="text-[11px] leading-relaxed opacity-85">
              Access credentials generated on vector schemas are encrypted. Keep private keys stored locally on secure keyservers.
            </p>
          </div>
        </div>
      </section>

      {/* Real-time Status Feed */}
      <section className="p-6 md:p-10 border-b-2 border-ink bg-paper">
        <SectionLabel n="03" label="Real-Time Operation Feed" />
        
        {isStatusActive ? (
          <div className="mt-8 border-l-2 border-ink pl-6 space-y-8 max-w-4xl">
            {statuses.map((s, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-ink bg-volt" />
                <div className="mono text-[9px] text-muted-foreground mb-1">{s.timestamp}</div>
                <p className="text-sm font-mono leading-relaxed text-ink uppercase tracking-wide">{s.text}</p>
              </div>
            ))}

            {statuses.length === 0 && (
              <p className="text-xs text-muted-foreground italic">No status updates logged yet.</p>
            )}
          </div>
        ) : (
          <div className="brute border border-dashed border-ink/30 p-8 text-center text-xs text-muted-foreground mt-8">
            Real-time status feed logs has been disabled by operational desk.
          </div>
        )}
      </section>
    </>
  );
}
