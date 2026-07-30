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
  url: string;
}

interface AgreementDoc {
  name: string;
  date: string;
  url: string;
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

const PRESET_PHASES = [
  { phase: "Phase 1: Discovery & Asset Auditing", percentage: 25, status: "Auditing submitted client files, assets checklists, and social platform configurations." },
  { phase: "Phase 2: Operational Strategy & Setup", percentage: 50, status: "Drafting campaign blueprints, keyword targeting matrixes, and setting up ad spaces." },
  { phase: "Phase 3: Campaign Setup & Targeting", percentage: 75, status: "Creating and launching active newsletters, cold campaigns, and short-form video sequences." },
  { phase: "Phase 4: Scaling & Active Optimization", percentage: 100, status: "Reviewing analytics metrics, refining content pipelines, and generating deliverable reports." }
];

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
  
  // Tab selector for forms panel (on the right)
  const [activeFormTab, setActiveFormTab] = useState<"requirements" | "progress" | "agreements">("requirements");

  // Custom requirement form state
  const [customLabel, setCustomLabel] = useState("");
  
  // Social Platform builder form state
  const [selPlatform, setSelPlatform] = useState("LinkedIn");
  const [selSubOption, setSelSubOption] = useState("Personal Profile URL");
  const [socialContext, setSocialContext] = useState("");

  // Live feeds forms state
  const [newStatusText, setNewStatusText] = useState("");
  
  // Deliverables Vault Doc share form state
  const [newFileName, setNewFileName] = useState("");
  const [newFileUrl, setNewFileUrl] = useState("");
  
  // Progress tracker state
  const [progPercent, setProgPercent] = useState<number>(25);
  const [progPhase, setProgPhase] = useState("Phase 1: Discovery & Asset Auditing");
  const [progStatusText, setProgStatusText] = useState("Auditing submitted client files, assets checklists, and social platform configurations.");

  // Agreement share form state
  const [newAgreementName, setNewAgreementName] = useState("");
  const [newAgreementUrl, setNewAgreementUrl] = useState("");

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
        setProgPercent(PRESET_PHASES[0].percentage);
        setProgPhase(PRESET_PHASES[0].phase);
        setProgStatusText(PRESET_PHASES[0].status);
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

  // Pre-load phase preset details
  const handlePhasePresetChange = (phaseName: string) => {
    const found = PRESET_PHASES.find(p => p.phase === phaseName);
    if (found) {
      setProgPhase(found.phase);
      setProgPercent(found.percentage);
      setProgStatusText(found.status);
    }
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

  // Share Agreement / Corporate Contract with URL
  const addCorporateAgreement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgreementName.trim()) return;

    const key = `t2_agreements_${selectedClientId}`;
    const current: AgreementDoc[] = JSON.parse(localStorage.getItem(key) || "[]");
    const now = new Date();
    const updated = [
      { name: newAgreementName, date: now.toLocaleDateString(), url: newAgreementUrl.trim() || "#" },
      ...current
    ];

    localStorage.setItem(key, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
    setNewAgreementName("");
    setNewAgreementUrl("");
    setNotifyMsg("CONTRACT ADDED");
    setTimeout(() => setNotifyMsg(""), 2000);
  };

  // Log feed status updates
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

  // Add vault document with URL
  const addVaultDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    const key = `t2_files_${selectedClientId}`;
    const current: VaultFile[] = JSON.parse(localStorage.getItem(key) || "[]");
    const updated = [
      { name: newFileName, size: "Download link shared", url: newFileUrl.trim() || "#" },
      ...current
    ];

    localStorage.setItem(key, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
    setNewFileName("");
    setNewFileUrl("");
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
          Ops Desk v2.4
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
          
          {/* Column 1: Config Toggles & Dynamic lists (Left Side) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm h-full flex flex-col">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
                1. Configure Dashboard Checklist
              </h3>

              <div className="space-y-3 overflow-y-auto pr-2 flex-grow max-h-[600px]">
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
                        <span className={`text-[11px] uppercase tracking-wide font-bold ${r.active ? "text-white" : "text-neutral-500"}`}>
                          {r.label}
                        </span>
                      </label>
                      
                      {(r.id.startsWith("req-social-") || r.id.startsWith("req-custom-")) && (
                        <button
                          onClick={() => deleteRequirement(r.id)}
                          className="text-[9px] text-flame underline hover:text-white cursor-pointer shrink-0 ml-2"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {r.submitted && r.value && (
                      <div className="pl-6 mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="text-[8px] bg-emerald-950/80 text-emerald-400 border border-emerald-900 px-1.5 py-0.5 rounded-sm font-bold uppercase w-fit shrink-0">
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
              
              <div className="pt-5 border-t border-neutral-900 mt-4">
                <button
                  onClick={resetClientData}
                  className="w-full bg-[#120707] border border-red-950 text-red-500 hover:bg-red-950 hover:text-white text-xs py-2 text-center rounded-sm uppercase font-bold transition cursor-pointer"
                >
                  ☠ Wipe Client Workspace
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Tabbed configuration sections (Right Side) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Header Tabs Navigation */}
            <div className="flex border-b border-neutral-800 bg-[#0e0e0e] p-1 rounded-t-sm gap-1">
              <button
                onClick={() => setActiveFormTab("requirements")}
                className={`flex-1 text-center py-2 text-[10px] uppercase font-bold tracking-wider rounded-sm transition cursor-pointer ${
                  activeFormTab === "requirements" ? "bg-volt text-black font-extrabold" : "text-neutral-400 hover:text-white"
                }`}
              >
                Req Builder
              </button>
              
              <button
                onClick={() => setActiveFormTab("progress")}
                className={`flex-1 text-center py-2 text-[10px] uppercase font-bold tracking-wider rounded-sm transition cursor-pointer ${
                  activeFormTab === "progress" ? "bg-volt text-black font-extrabold" : "text-neutral-400 hover:text-white"
                }`}
              >
                Milestones
              </button>

              <button
                onClick={() => setActiveFormTab("agreements")}
                className={`flex-1 text-center py-2 text-[10px] uppercase font-bold tracking-wider rounded-sm transition cursor-pointer ${
                  activeFormTab === "agreements" ? "bg-volt text-black font-extrabold" : "text-neutral-400 hover:text-white"
                }`}
              >
                Docs & Vault
              </button>
            </div>

            {/* TAB 1: Requirements Builder */}
            {activeFormTab === "requirements" && (
              <div className="space-y-6">
                {/* Social Platform Option Creator */}
                <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 border-b border-neutral-800 pb-2">
                    + Add Custom Social Handle Request
                  </h3>
                  <p className="text-[10px] text-neutral-400 mb-3">Add supplementary handles (e.g. for multiple founders).</p>

                  <form onSubmit={addSocialPlatformReq} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={selPlatform}
                        onChange={(e) => setSelPlatform(e.target.value)}
                        className="bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-volt cursor-pointer"
                      >
                        {SOCIAL_PLATFORMS.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>

                      <select
                        value={selSubOption}
                        onChange={(e) => setSelSubOption(e.target.value)}
                        className="bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-volt cursor-pointer"
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
                        placeholder="Context: e.g. Founder 2, Brand Page"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-volt text-black hover:bg-white text-xs py-2 uppercase font-bold rounded-sm transition cursor-pointer"
                    >
                      + Add Platform Requirement
                    </button>
                  </form>
                </div>

                {/* Custom URL Collector form (max 3) */}
                <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 border-b border-neutral-800 pb-2 flex justify-between items-center">
                    <span>+ Add Custom URL Request</span>
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
                      className="w-full bg-neutral-900 border border-neutral-805 hover:border-volt text-neutral-300 hover:text-white text-xs py-2 uppercase font-bold rounded-sm transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {activeCustomsCount >= 3 ? "Custom Limits Reached (Max 3)" : "+ Add Custom URL Request"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* TAB 2: Milestones & Progress Updates */}
            {activeFormTab === "progress" && (
              <div className="space-y-6">
                {/* Project Progress Setting Panel */}
                <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-neutral-800 pb-2">
                    Project Completion Status & Phase Presets
                  </h3>
                  
                  <form onSubmit={updateProgressTracker} className="space-y-4">
                    <div>
                      <label className="text-[9px] text-neutral-500 uppercase font-bold block mb-1">Select Preset Phase</label>
                      <select
                        onChange={(e) => handlePhasePresetChange(e.target.value)}
                        value={progPhase}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-volt cursor-pointer"
                      >
                        {PRESET_PHASES.map((p, idx) => (
                          <option key={idx} value={p.phase}>{p.phase} ({p.percentage}%)</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-8">
                        <label className="text-[9px] text-neutral-500 uppercase font-bold block mb-1">Phase Title</label>
                        <input
                          type="text"
                          value={progPhase}
                          onChange={(e) => setProgPhase(e.target.value)}
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

                    {/* Progress Slider */}
                    <div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={progPercent}
                        onChange={(e) => setProgPercent(Number(e.target.value))}
                        className="w-full accent-volt bg-neutral-900 rounded-sm h-1 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] text-neutral-500 uppercase font-bold block mb-1">Phase Activity Status Text</label>
                      <textarea
                        value={progStatusText}
                        onChange={(e) => setProgStatusText(e.target.value)}
                        rows={2}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-1.5 text-xs text-white focus:outline-none focus:border-volt"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-volt text-black hover:bg-white text-xs py-2 uppercase font-bold rounded-sm transition cursor-pointer"
                    >
                      Update Milestone Status →
                    </button>
                  </form>
                </div>

                {/* Operations timeline status log */}
                <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-neutral-800 pb-2">
                    + Log Feed Checkpoint Check-in
                  </h3>

                  <form onSubmit={addStatusUpdate} className="space-y-3">
                    <textarea
                      value={newStatusText}
                      onChange={(e) => setNewStatusText(e.target.value)}
                      placeholder="e.g. Set up target newsletter lists and launched custom templates."
                      rows={2}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none text-white focus:border-volt"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-neutral-900 border border-neutral-800 hover:border-volt text-neutral-350 hover:text-white text-xs py-2 uppercase font-bold rounded-sm transition cursor-pointer text-center"
                    >
                      Publish Timeline Checkpoint
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* TAB 3: Contracts, Agreements & Vault Docs */}
            {activeFormTab === "agreements" && (
              <div className="space-y-6">
                {/* Share Corporate Agreement/Contract Form */}
                <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 border-b border-neutral-800 pb-2">
                    + Share Corporate Contract/Agreement Link
                  </h3>

                  <form onSubmit={addCorporateAgreement} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        value={newAgreementName}
                        onChange={(e) => setNewAgreementName(e.target.value)}
                        placeholder="Agreement Name: e.g. Master Services Agreement (MSA)"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="url"
                        value={newAgreementUrl}
                        onChange={(e) => setNewAgreementUrl(e.target.value)}
                        placeholder="Secure Agreement Link: e.g. https://drive.google.com/..."
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-volt text-black hover:bg-white text-xs py-2 uppercase font-bold rounded-sm transition cursor-pointer"
                    >
                      Publish Agreement Link
                    </button>
                  </form>
                </div>

                {/* Share Deliverables File in Vault */}
                <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 border-b border-neutral-800 pb-2">
                    + Share Deliverables Link in Vault
                  </h3>

                  <form onSubmit={addVaultDocument} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        placeholder="File Name: e.g. Campaign_Assets_Blueprint.pdf"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none text-white focus:border-volt"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="url"
                        value={newFileUrl}
                        onChange={(e) => setNewFileUrl(e.target.value)}
                        placeholder="File Access Link: e.g. https://drive.google.com/..."
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none text-white focus:border-volt"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-neutral-900 border border-neutral-800 hover:border-volt text-neutral-300 hover:text-white text-xs py-2 uppercase font-bold rounded-sm transition cursor-pointer text-center"
                    >
                      Publish Vault File Link
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>

        </div>
      </main>
    </div>
  );
}
