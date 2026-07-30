import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Operations Console — Typtwo" },
      { name: "description", content: "Master requirements controls and client configuration." }
    ]
  }),
  component: AdminPage
});

interface Client {
  id: string;
  name: string;
  email: string;
}

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

interface AgreementDoc {
  name: string;
  date: string;
}

interface ProjectProgress {
  percentage: number;
  phase: string;
  statusText: string;
}

const DEFAULT_CLIENTS: Client[] = [
  { id: "startuptalky", name: "Startup Talky", email: "founder@startuptalky.com" },
  { id: "acme", name: "Acme Corp", email: "client@company.com" },
  { id: "bitbns", name: "BitBNS", email: "team@bitbns.com" }
];

const DEFAULT_REQUIREMENTS = [
  // Core Branding Assets
  { id: "req-brand-kit", type: "drive_link", label: "Brand Kit (Logos, Fonts, Colors) Drive Link", active: true, submitted: false, value: "" },
  { id: "req-brand-assets", type: "drive_link", label: "Creative Assets (Raw Footage, Testimonials) Drive Link", active: true, submitted: false, value: "" },
  { id: "req-icp-profile", type: "drive_link", label: "Ideal Customer Profile (ICP) & Target Audience Doc", active: false, submitted: false, value: "" },
  { id: "req-competitor-list", type: "drive_link", label: "Competitor Accounts & Inspiration References", active: false, submitted: false, value: "" },
  { id: "req-ad-account-access", type: "drive_link", label: "Ad Account Access (Meta, LinkedIn Campaign Manager)", active: false, submitted: false, value: "" },
  { id: "req-newsletter-access", type: "drive_link", label: "Newsletter Access (Beehiiv / Substack / Mailchimp)", active: false, submitted: false, value: "" },
  { id: "req-seo-keywords", type: "drive_link", label: "Target SEO Keywords & Search Focus List", active: false, submitted: false, value: "" },
  { id: "req-founder-tone", type: "drive_link", label: "Founder Tone of Voice & Bio Document Link", active: false, submitted: false, value: "" },
  { id: "req-product-deck", type: "drive_link", label: "Product Demo & Core Sales Deck Link", active: false, submitted: false, value: "" },
  { id: "req-credentials", type: "drive_link", label: "Credentials & API Tokens Secure File Link", active: false, submitted: false, value: "" },

  // Default Social Channels Links
  { id: "req-social-linkedin-personal", type: "social_handle", label: "LinkedIn - Personal Profile URL", active: false, submitted: false, value: "" },
  { id: "req-social-linkedin-business", type: "social_handle", label: "LinkedIn - Business Page URL", active: false, submitted: false, value: "" },
  { id: "req-social-x-personal", type: "social_handle", label: "X (Twitter) - Personal Profile URL", active: false, submitted: false, value: "" },
  { id: "req-social-x-business", type: "social_handle", label: "X (Twitter) - Business Page URL", active: false, submitted: false, value: "" },
  { id: "req-social-instagram", type: "social_handle", label: "Instagram - Profile Link", active: false, submitted: false, value: "" },
  { id: "req-social-youtube", type: "social_handle", label: "YouTube - Channel Link", active: false, submitted: false, value: "" },
  { id: "req-social-tiktok", type: "social_handle", label: "TikTok - Profile Link", active: false, submitted: false, value: "" },
  { id: "req-social-facebook", type: "social_handle", label: "Facebook - Page Link", active: false, submitted: false, value: "" },

  // System Toggles
  { id: "req-vault", type: "boolean", label: "Enable Shared Deliverables Vault", active: true, submitted: false, value: "" },
  { id: "req-status-feed", type: "boolean", label: "Enable Real-Time Status Feed", active: true, submitted: false, value: "" }
];

const DEFAULT_PROGRESS: ProjectProgress = {
  percentage: 65,
  phase: "Phase 2: Strategy Development",
  statusText: "Auditing current assets and configuring targeted growth pipelines."
};

const SOCIAL_PLATFORMS = ["LinkedIn", "X (Twitter)", "Instagram", "YouTube", "TikTok", "Facebook"];
const SOCIAL_SUB_OPTIONS = [
  "Personal Profile URL",
  "Business Page URL",
  "Analytics Admin Invite",
  "Platform Credentials"
];

function AdminPage() {
  const [clients] = useState<Client[]>(DEFAULT_CLIENTS);
  const [selectedClientId, setSelectedClientId] = useState<string>("acme");
  const [reqs, setReqs] = useState<Requirement[]>([]);
  
  // Custom requirement form state
  const [customLabel, setCustomLabel] = useState("");
  
  // Social Platform builder form state
  const [selPlatform, setSelPlatform] = useState("LinkedIn");
  const [selSubOption, setSelSubOption] = useState("Personal Profile URL");
  const [socialContext, setSocialContext] = useState("");

  // Live feeds forms state
  const [newStatusText, setNewStatusText] = useState("");
  const [newFileName, setNewFileName] = useState("");
  
  // Progress tracker state
  const [progPercent, setProgPercent] = useState<number>(65);
  const [progPhase, setProgPhase] = useState("");
  const [progStatusText, setProgStatusText] = useState("");

  // Agreement share form state
  const [newAgreementName, setNewAgreementName] = useState("");

  const [notifyMsg, setNotifyMsg] = useState("");

  // Load client configurations
  useEffect(() => {
    const key = `t2_reqs_${selectedClientId}`;
    const progressKey = `t2_progress_${selectedClientId}`;
    
    const loadData = () => {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed: Requirement[] = JSON.parse(stored);
        const merged = [...parsed];
        DEFAULT_REQUIREMENTS.forEach((def) => {
          if (!merged.some((m) => m.id === def.id)) {
            merged.push(JSON.parse(JSON.stringify(def)));
          }
        });
        setReqs(merged);
      } else {
        const initial = JSON.parse(JSON.stringify(DEFAULT_REQUIREMENTS));
        setReqs(initial);
        localStorage.setItem(key, JSON.stringify(initial));
      }

      // Load progress
      const storedProgress = localStorage.getItem(progressKey);
      if (storedProgress) {
        const parsedProg: ProjectProgress = JSON.parse(storedProgress);
        setProgPercent(parsedProg.percentage);
        setProgPhase(parsedProg.phase);
        setProgStatusText(parsedProg.statusText);
      } else {
        setProgPercent(DEFAULT_PROGRESS.percentage);
        setProgPhase(DEFAULT_PROGRESS.phase);
        setProgStatusText(DEFAULT_PROGRESS.statusText);
      }
    };

    loadData();
    window.addEventListener("storage", loadData);
    window.addEventListener("t2_storage_update", loadData);

    return () => {
      window.removeEventListener("storage", loadData);
      window.removeEventListener("t2_storage_update", loadData);
    };
  }, [selectedClientId]);

  // Save configurations
  const saveConfig = (updatedReqs: Requirement[]) => {
    localStorage.setItem(`t2_reqs_${selectedClientId}`, JSON.stringify(updatedReqs));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
    setNotifyMsg("SAVED");
    setTimeout(() => setNotifyMsg(""), 2000);
  };

  const toggleReqActive = (id: string) => {
    const updated = reqs.map((r) => r.id === id ? { ...r, active: !r.active } : r);
    setReqs(updated);
    saveConfig(updated);
  };

  // Add structured social platform requirement
  const addSocialPlatformReq = (e: React.FormEvent) => {
    e.preventDefault();
    const contextSuffix = socialContext.trim() ? ` (${socialContext.trim()})` : "";
    const fullLabel = `${selPlatform} - ${selSubOption}${contextSuffix}`;

    const newReq: Requirement = {
      id: `req-social-${Date.now()}`,
      type: "social_handle",
      label: fullLabel,
      active: true,
      submitted: false,
      value: ""
    };

    const updated = [...reqs, newReq];
    setReqs(updated);
    saveConfig(updated);
    setSocialContext("");
  };

  // Add custom URL requirement (Max 3)
  const addCustomRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customLabel.trim()) return;

    const activeCustomsCount = reqs.filter(r => r.id.startsWith("req-custom-")).length;
    if (activeCustomsCount >= 3) {
      alert("Maximum of 3 custom requirements has been reached. Please delete one to add another.");
      return;
    }

    const newReq: Requirement = {
      id: `req-custom-${Date.now()}`,
      type: "drive_link",
      label: `Custom: ${customLabel}`,
      active: true,
      submitted: false,
      value: ""
    };

    const updated = [...reqs, newReq];
    setReqs(updated);
    saveConfig(updated);
    setCustomLabel("");
  };

  // Delete dynamic requirement
  const deleteRequirement = (id: string) => {
    const updated = reqs.filter((r) => r.id !== id);
    setReqs(updated);
    saveConfig(updated);
  };

  // Update Project Progress Tracker
  const updateProgressTracker = (e: React.FormEvent) => {
    e.preventDefault();
    const key = `t2_progress_${selectedClientId}`;
    const payload: ProjectProgress = {
      percentage: Number(progPercent),
      phase: progPhase || "Phase 1: Discovery",
      statusText: progStatusText || "System updates in progress."
    };

    localStorage.setItem(key, JSON.stringify(payload));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
    setNotifyMsg("PROGRESS UPDATED");
    setTimeout(() => setNotifyMsg(""), 2000);
  };

  // Share Agreement / Corporate Contract
  const addCorporateAgreement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgreementName.trim()) return;

    const key = `t2_agreements_${selectedClientId}`;
    const current: AgreementDoc[] = JSON.parse(localStorage.getItem(key) || "[]");
    const now = new Date();
    const updated = [
      { name: newAgreementName, date: now.toLocaleDateString() },
      ...current
    ];

    localStorage.setItem(key, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
    setNewAgreementName("");
    setNotifyMsg("CONTRACT ADDED");
    setTimeout(() => setNotifyMsg(""), 2000);
  };

  // Log status update
  const addStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatusText.trim()) return;

    const key = `t2_statuses_${selectedClientId}`;
    const current: StatusUpdate[] = JSON.parse(localStorage.getItem(key) || "[]");
    const now = new Date();
    const updated = [
      { text: newStatusText, timestamp: now.toLocaleTimeString() + " - Today" },
      ...current
    ];

    localStorage.setItem(key, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
    setNewStatusText("");
    setNotifyMsg("STATUS ADDED");
    setTimeout(() => setNotifyMsg(""), 2000);
  };

  // Add vault document
  const addVaultDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    const key = `t2_files_${selectedClientId}`;
    const current: VaultFile[] = JSON.parse(localStorage.getItem(key) || "[]");
    const updated = [
      { name: newFileName, size: "Download" },
      ...current
    ];

    localStorage.setItem(key, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
    setNewFileName("");
    setNotifyMsg("FILE ADDED");
    setTimeout(() => setNotifyMsg(""), 2000);
  };

  // Reset database
  const resetClientData = () => {
    if (window.confirm("Wipe all configurations for this client?")) {
      localStorage.removeItem(`t2_reqs_${selectedClientId}`);
      localStorage.removeItem(`t2_statuses_${selectedClientId}`);
      localStorage.removeItem(`t2_files_${selectedClientId}`);
      localStorage.removeItem(`t2_progress_${selectedClientId}`);
      localStorage.removeItem(`t2_agreements_${selectedClientId}`);
      const initial = JSON.parse(JSON.stringify(DEFAULT_REQUIREMENTS));
      setReqs(initial);
      saveConfig(initial);
    }
  };

  const selectedClient = clients.find(c => c.id === selectedClientId) || clients[0];
  const activeCustomsCount = reqs.filter(r => r.id.startsWith("req-custom-")).length;

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-neutral-100 font-mono text-left">
      {/* Sidebar: Client Selector */}
      <aside className="w-64 border-r border-neutral-800 bg-[#0e0e0e] flex flex-col justify-between p-6 shrink-0">
        <div>
          <Link to="/" className="flex items-center gap-2 pb-5 border-b border-neutral-800 mb-8">
            <span className="h-2 w-2 bg-flame rounded-full blink" />
            <span className="font-bold text-sm tracking-wider text-white uppercase">TYPTWO CONSOLE</span>
          </Link>

          <span className="text-[9px] text-neutral-500 uppercase tracking-widest block mb-4 font-bold">// Select Client Workspace</span>
          <nav className="space-y-1">
            {clients.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedClientId(c.id)}
                className={`w-full text-left px-3 py-2 text-xs uppercase tracking-wide rounded-sm transition cursor-pointer font-bold ${
                  selectedClientId === c.id
                    ? "bg-volt text-black"
                    : "bg-neutral-900 text-neutral-400 hover:text-white"
                }`}
              >
                {c.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="text-[9px] text-neutral-500 uppercase">
          Ops Desk v2.3
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-grow flex flex-col min-w-0 bg-[#070707]">
        <header className="h-14 border-b border-neutral-800 px-8 flex items-center justify-between bg-[#0b0b0b] shrink-0">
          <div className="text-xs uppercase tracking-widest text-white font-bold">
            Configuring: {selectedClient.name} ({selectedClient.email})
          </div>
          {notifyMsg && (
            <span className="text-[10px] text-volt uppercase font-bold animate-pulse">● {notifyMsg}</span>
          )}
        </header>

        {/* Content layout */}
        <div className="flex-grow p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          
          {/* Column 1: Config Toggles & Dynamic lists */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
                1. Configured Requirements Checklist
              </h3>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2">
                {reqs.map((r) => (
                  <div key={r.id} className="py-2.5 border-b border-neutral-900 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={r.active}
                          onChange={() => toggleReqActive(r.id)}
                          className="h-4 w-4 bg-neutral-950 border border-neutral-800 text-volt rounded-sm focus:ring-0 cursor-pointer"
                        />
                        <span className={`text-xs uppercase tracking-wide font-bold ${r.active ? "text-white" : "text-neutral-500"}`}>
                          {r.label}
                        </span>
                      </label>
                      
                      {(r.id.startsWith("req-social-") || r.id.startsWith("req-custom-")) && (
                        <button
                          onClick={() => deleteRequirement(r.id)}
                          className="text-[9px] text-flame underline hover:text-white cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {r.submitted && r.value && (
                      <div className="pl-6 mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="text-[8px] bg-emerald-950/80 text-emerald-400 border border-emerald-900 px-1.5 py-0.5 rounded-sm font-bold uppercase w-fit">
                          SUBMITTED DATA:
                        </span>
                        <span className="text-[10px] text-neutral-300 font-mono break-all select-all">
                          {r.value.startsWith("http") ? (
                            <a href={r.value} target="_blank" rel="noreferrer" className="text-volt underline hover:text-white">
                              {r.value} ↗
                            </a>
                          ) : (
                            r.value
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Project Progress Setting Panel */}
            <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-neutral-800 pb-2">
                2. Project Completion Status & Milestones
              </h3>
              
              <form onSubmit={updateProgressTracker} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-8">
                    <label className="text-[9px] text-neutral-500 uppercase font-bold block mb-1">Active Phase Name</label>
                    <input
                      type="text"
                      value={progPhase}
                      onChange={(e) => setProgPhase(e.target.value)}
                      placeholder="e.g. Phase 2: Content Strategy Development"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-1.5 text-xs text-white focus:outline-none focus:border-volt"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <label className="text-[9px] text-neutral-500 uppercase font-bold block mb-1">Progress (%)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={progPercent}
                      onChange={(e) => setProgPercent(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-1.5 text-xs text-white focus:outline-none focus:border-volt font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-neutral-500 uppercase font-bold block mb-1">Operational Milestone Description</label>
                  <textarea
                    value={progStatusText}
                    onChange={(e) => setProgStatusText(e.target.value)}
                    placeholder="e.g. Auditing raw founder videos and setting up scheduling engines."
                    rows={2}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-1.5 text-xs text-white focus:outline-none focus:border-volt"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-volt text-black hover:bg-white text-xs py-2 uppercase font-bold rounded-sm transition cursor-pointer"
                >
                  Save Workspace Progress →
                </button>
              </form>
            </div>

            <div className="pt-2">
              <button
                onClick={resetClientData}
                className="w-full bg-[#120707] border border-red-950 text-red-500 hover:bg-red-950 hover:text-white text-xs py-2 text-center rounded-sm uppercase font-bold transition cursor-pointer"
              >
                ☠ Wipe Client Workspace
              </button>
            </div>
          </div>

          {/* Column 2: Platform Builder / Custom Fields / Agreements / Timeline updates */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Share Corporate Agreement/Contract Form */}
            <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 border-b border-neutral-800 pb-2">
                3. Share Corporate Agreement / Contract
              </h3>
              <p className="text-[10px] text-neutral-400 mb-3">Upload signed corporate documents (e.g. MSA, NDA, Scope of Work).</p>

              <form onSubmit={addCorporateAgreement} className="space-y-3">
                <input
                  type="text"
                  value={newAgreementName}
                  onChange={(e) => setNewAgreementName(e.target.value)}
                  placeholder="e.g. Master Services Agreement (MSA) - Signed.pdf"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-volt text-black hover:bg-white text-xs py-2 uppercase font-bold rounded-sm transition cursor-pointer"
                >
                  Post Secure Agreement Document
                </button>
              </form>
            </div>

            {/* Social Platform Option Creator */}
            <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 border-b border-neutral-800 pb-2">
                4. Add Social Platform Request
              </h3>

              <form onSubmit={addSocialPlatformReq} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={selPlatform}
                    onChange={(e) => setSelPlatform(e.target.value)}
                    className="bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-volt"
                  >
                    {SOCIAL_PLATFORMS.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>

                  <select
                    value={selSubOption}
                    onChange={(e) => setSelSubOption(e.target.value)}
                    className="bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-volt"
                  >
                    {SOCIAL_SUB_OPTIONS.map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <input
                    type="text"
                    value={socialContext}
                    onChange={(e) => setSocialContext(e.target.value)}
                    placeholder="Context label: e.g. Founder 1, Brand Page"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#161616] border border-neutral-800 hover:border-volt text-neutral-300 hover:text-white text-xs py-2 uppercase font-bold rounded-sm transition cursor-pointer"
                >
                  + Add Platform Requirement
                </button>
              </form>
            </div>

            {/* Custom URL Collector form (max 3) */}
            <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 border-b border-neutral-800 pb-2 flex justify-between items-center">
                <span>5. Add Custom URL Request</span>
                <span className="text-[9px] text-neutral-400 font-normal">Active: {activeCustomsCount}/3</span>
              </h3>
              
              <form onSubmit={addCustomRequirement} className="space-y-3">
                <input
                  type="text"
                  value={customLabel}
                  onChange={(e) => setCustomLabel(e.target.value)}
                  placeholder="e.g. Pitch Video Link, Figma Deck..."
                  disabled={activeCustomsCount >= 3}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
                
                <button
                  type="submit"
                  disabled={activeCustomsCount >= 3}
                  className="w-full bg-neutral-900 border border-neutral-800 hover:border-volt text-neutral-300 hover:text-white text-xs py-2 uppercase font-bold rounded-sm transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {activeCustomsCount >= 3 ? "Custom Limits Reached (Max 3)" : "+ Add Custom URL Request"}
                </button>
              </form>
            </div>

            {/* Post timeline update */}
            <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-neutral-800 pb-2">
                6. Log Feed Status Checkpoint
              </h3>

              <form onSubmit={addStatusUpdate} className="space-y-3">
                <textarea
                  value={newStatusText}
                  onChange={(e) => setNewStatusText(e.target.value)}
                  placeholder="e.g. Completed initial short-form campaign layouts..."
                  rows={2}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none text-white"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-neutral-900 border border-neutral-800 hover:border-volt text-neutral-300 hover:text-white text-xs py-1.5 uppercase font-bold rounded-sm transition cursor-pointer text-center"
                >
                  Log Update
                </button>
              </form>
            </div>

            {/* Post document */}
            <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-neutral-800 pb-2">
                7. Share File in Client Vault
              </h3>

              <form onSubmit={addVaultDocument} className="space-y-3">
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="e.g. brand_assets_blueprint.pdf"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2 text-xs focus:outline-none text-white"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-neutral-900 border border-neutral-800 hover:border-volt text-neutral-300 hover:text-white text-xs py-1.5 uppercase font-bold rounded-sm transition cursor-pointer text-center"
                >
                  Post File Vault Index
                </button>
              </form>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
