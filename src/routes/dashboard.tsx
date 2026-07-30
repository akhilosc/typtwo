import { useState, useEffect } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Client Workspace — Typtwo" },
      { name: "description", content: "Client Operations Center and Secure Deliverables Vault" }
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
  const [activeTab, setActiveTab] = useState<"requirements" | "vault" | "feed">("requirements");
  
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
    <div className="flex min-h-screen bg-[#0a0a0a] text-neutral-100 font-mono">
      {/* Left Navigation Sidebar */}
      <aside className="w-64 border-r border-neutral-800 bg-[#0e0e0e] flex flex-col justify-between p-6 shrink-0 text-left">
        <div>
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 pb-6 border-b border-neutral-800 mb-8">
            <span className="h-2 w-2 bg-volt rounded-full blink" />
            <span className="font-bold text-sm tracking-widest text-white uppercase">TYPTWO // OPS</span>
          </Link>

          {/* User Organization context card */}
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-sm mb-8">
            <span className="text-[9px] text-volt uppercase font-bold tracking-wider">// Account Space</span>
            <div className="text-white text-xs font-bold truncate mt-1">{company}</div>
            <div className="text-[10px] text-neutral-400 truncate mt-0.5">{email}</div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab("requirements")}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wider rounded-sm transition cursor-pointer font-bold ${
                activeTab === "requirements" 
                  ? "bg-volt text-black" 
                  : "text-neutral-400 hover:bg-neutral-950 hover:text-white"
              }`}
            >
              <span>01 / Action Items</span>
              <span className="text-[9px] opacity-75">[{activeInputReqs.length}]</span>
            </button>

            {isVaultActive && (
              <button
                onClick={() => setActiveTab("vault")}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wider rounded-sm transition cursor-pointer font-bold ${
                  activeTab === "vault" 
                    ? "bg-volt text-black" 
                    : "text-neutral-400 hover:bg-neutral-950 hover:text-white"
                }`}
              >
                <span>02 / Vault Docs</span>
                <span className="text-[9px] opacity-75">[{files.length}]</span>
              </button>
            )}

            {isStatusActive && (
              <button
                onClick={() => setActiveTab("feed")}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wider rounded-sm transition cursor-pointer font-bold ${
                  activeTab === "feed" 
                    ? "bg-volt text-black" 
                    : "text-neutral-400 hover:bg-neutral-950 hover:text-white"
                }`}
              >
                <span>03 / Operations Feed</span>
                <span className="text-[9px] opacity-75">● Live</span>
              </button>
            )}
          </nav>
        </div>

        {/* Logout bottom area */}
        <div className="pt-6 border-t border-neutral-800">
          <button
            onClick={handleLogout}
            className="w-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-950 hover:border-volt text-neutral-300 text-xs py-2 text-center transition cursor-pointer uppercase font-bold"
          >
            ← Exit Workspace
          </button>
        </div>
      </aside>

      {/* Main Mainframe Workspace */}
      <main className="flex-grow flex flex-col min-w-0 bg-[#070707] text-left">
        {/* Work top header bar */}
        <header className="h-14 border-b border-neutral-800 px-8 flex items-center justify-between bg-[#0b0b0b] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-neutral-400">// Active Node:</span>
            <span className="text-xs text-white uppercase font-bold bg-neutral-900 px-2 py-0.5 border border-neutral-800 rounded-sm">
              UAE_EDGE_T2_{clientId.toUpperCase()}
            </span>
          </div>
          <div className="text-[10px] text-neutral-400">
            SYSTEM_SECURE // TLS_1.3_ACTIVE
          </div>
        </header>

        {/* Content area */}
        <div className="flex-grow p-8 overflow-y-auto max-w-5xl w-full">
          {activeTab === "requirements" && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-white uppercase tracking-wider">// Outstanding Operational Assets</h2>
                <p className="text-xs text-neutral-400 mt-1">Please fill out and submit the requested assets below. Submitted links will be verified by the admin team.</p>
              </div>

              <div className="space-y-4">
                {activeInputReqs.map((r) => (
                  <div 
                    key={r.id}
                    className={`p-5 rounded-sm border transition-colors ${
                      r.submitted 
                        ? "bg-[#09150f] border-emerald-900/60" 
                        : "bg-[#0c0c0c] border-neutral-800 hover:border-neutral-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-bold">
                        Type: {r.type.replace('_', ' ')}
                      </span>
                      {r.submitted ? (
                        <span className="text-[9px] bg-emerald-950/80 text-emerald-400 border border-emerald-900 px-2.5 py-0.5 font-bold rounded-sm uppercase">
                          ✓ Submitted OK
                        </span>
                      ) : (
                        <span className="text-[9px] bg-volt/10 text-volt border border-volt/30 px-2.5 py-0.5 font-bold rounded-sm uppercase">
                          Action Required
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-white mt-2 uppercase tracking-wide">{r.label}</h3>

                    {r.type === "drive_link" && (
                      <p className="text-[9px] text-amber-500 mt-1 font-bold">
                        ⚠️ NOTICE: All links should be private; access will be requested by the Typtwo team.
                      </p>
                    )}

                    <div className="mt-4 flex gap-2">
                      <input
                        type="text"
                        value={inputVals[r.id] || ""}
                        onChange={(e) => handleInputChange(r.id, e.target.value)}
                        placeholder={r.type === "drive_link" ? "Paste secure private drive link..." : "Enter handle link / details..."}
                        className="flex-grow bg-neutral-950 border border-neutral-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none focus:border-volt text-white"
                      />
                      <button
                        onClick={() => submitRequirement(r.id)}
                        className="bg-volt text-black hover:bg-white text-xs px-5 py-2 uppercase font-bold rounded-sm transition cursor-pointer"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                ))}

                {activeInputReqs.length === 0 && (
                  <div className="border border-dashed border-neutral-800 rounded-sm p-10 text-center text-xs text-neutral-400">
                    No active assets collection requests currently active for your profile.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "vault" && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-white uppercase tracking-wider">// Shared Deliverables Vault</h2>
                <p className="text-xs text-neutral-400 mt-1">Access documents and design blueprints compiled specifically for your business team.</p>
              </div>

              {isVaultActive ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {files.map((f) => (
                    <div 
                      key={f.name}
                      className="bg-[#0c0c0c] border border-neutral-800 p-4 rounded-sm hover:border-neutral-700 flex items-center justify-between transition-all"
                    >
                      <div className="min-w-0 pr-4">
                        <div className="text-xs font-bold text-white truncate uppercase tracking-wide">{f.name}</div>
                        <div className="text-[10px] text-neutral-500 mt-0.5">{f.size}</div>
                      </div>
                      <button
                        onClick={() => alert(`Downloading deliverable: ${f.name}`)}
                        className="bg-neutral-900 border border-neutral-800 hover:border-volt text-neutral-300 hover:text-white text-[10px] px-3 py-1.5 rounded-sm uppercase tracking-widest font-bold transition cursor-pointer"
                      >
                        Get
                      </button>
                    </div>
                  ))}

                  {files.length === 0 && (
                    <div className="col-span-2 border border-dashed border-neutral-800 rounded-sm p-10 text-center text-xs text-neutral-400">
                      No files posted to your workspace by the ops team yet.
                    </div>
                  )}
                </div>
              ) : (
                <div className="border border-dashed border-neutral-800 rounded-sm p-10 text-center text-xs text-neutral-400">
                  Deliverables vault has been disabled for this client workspace.
                </div>
              )}
            </div>
          )}

          {activeTab === "feed" && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-white uppercase tracking-wider">// Operational Timeline Feed</h2>
                <p className="text-xs text-neutral-400 mt-1">Real-time developer status and deployment checkpoints logged by the engineering team.</p>
              </div>

              {isStatusActive ? (
                <div className="border border-neutral-800 bg-[#0c0c0c] rounded-sm p-6 space-y-6">
                  {statuses.map((s, idx) => (
                    <div key={idx} className="relative pl-6 border-l border-neutral-800 last:border-l-0 pb-2">
                      <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-volt" />
                      <div className="text-[9px] text-neutral-500 font-bold mb-1 uppercase tracking-wider">{s.timestamp}</div>
                      <p className="text-xs text-neutral-200 uppercase tracking-wide leading-relaxed font-bold">{s.text}</p>
                    </div>
                  ))}

                  {statuses.length === 0 && (
                    <div className="text-center text-xs text-neutral-500 py-6">
                      No updates logged on the timeline yet.
                    </div>
                  )}
                </div>
              ) : (
                <div className="border border-dashed border-neutral-800 rounded-sm p-10 text-center text-xs text-neutral-400">
                  Operational timeline log access has been disabled by the operations panel.
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
