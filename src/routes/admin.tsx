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

const DEFAULT_CLIENTS: Client[] = [
  { id: "startuptalky", name: "Startup Talky", email: "founder@startuptalky.com" },
  { id: "acme", name: "Acme Corp", email: "client@company.com" },
  { id: "bitbns", name: "BitBNS", email: "team@bitbns.com" }
];

const DEFAULT_REQUIREMENTS = [
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
  { id: "req-vault", type: "boolean", label: "Enable Shared Deliverables Vault", active: true, submitted: false, value: "" },
  { id: "req-status-feed", type: "boolean", label: "Enable Real-Time Status Feed", active: true, submitted: false, value: "" }
];

function AdminPage() {
  const [clients] = useState<Client[]>(DEFAULT_CLIENTS);
  const [selectedClientId, setSelectedClientId] = useState<string>("acme");
  const [reqs, setReqs] = useState<Requirement[]>([]);
  const [socialLabel, setSocialLabel] = useState("");
  const [newStatusText, setNewStatusText] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [notifyMsg, setNotifyMsg] = useState("");

  // Load client configurations
  useEffect(() => {
    const key = `t2_reqs_${selectedClientId}`;
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
      localStorage.setItem(key, JSON.stringify(merged));
    } else {
      const initial = JSON.parse(JSON.stringify(DEFAULT_REQUIREMENTS));
      setReqs(initial);
      localStorage.setItem(key, JSON.stringify(initial));
    }
  }, [selectedClientId]);

  // Save configurations
  const saveConfig = (updatedReqs: Requirement[]) => {
    localStorage.setItem(`t2_reqs_${selectedClientId}`, JSON.stringify(updatedReqs));
    window.dispatchEvent(new Event("storage"));
    setNotifyMsg("SAVED");
    setTimeout(() => setNotifyMsg(""), 2000);
  };

  const toggleReqActive = (id: string) => {
    const updated = reqs.map((r) => r.id === id ? { ...r, active: !r.active } : r);
    setReqs(updated);
    saveConfig(updated);
  };

  // Add social handle item
  const addSocialRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialLabel.trim()) return;

    const newReq: Requirement = {
      id: `req-social-${Date.now()}`,
      type: "social_handle",
      label: socialLabel,
      active: true,
      submitted: false,
      value: ""
    };

    const updated = [...reqs, newReq];
    setReqs(updated);
    saveConfig(updated);
    setSocialLabel("");
  };

  // Delete social requirement
  const deleteRequirement = (id: string) => {
    const updated = reqs.filter((r) => r.id !== id);
    setReqs(updated);
    saveConfig(updated);
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
      const initial = JSON.parse(JSON.stringify(DEFAULT_REQUIREMENTS));
      setReqs(initial);
      saveConfig(initial);
    }
  };

  const selectedClient = clients.find(c => c.id === selectedClientId) || clients[0];

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-neutral-100 font-mono">
      {/* Sidebar: Client Selector */}
      <aside className="w-64 border-r border-neutral-800 bg-[#0e0e0e] flex flex-col justify-between p-6 shrink-0 text-left">
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
          Ops Desk v2.0
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#070707] text-left">
        <header className="h-14 border-b border-neutral-800 px-8 flex items-center justify-between bg-[#0b0b0b] shrink-0">
          <div className="text-xs uppercase tracking-widest text-white font-bold">
            Configuring: {selectedClient.name} ({selectedClient.email})
          </div>
          {notifyMsg && (
            <span className="text-[10px] text-volt uppercase font-bold animate-pulse">● {notifyMsg}</span>
          )}
        </header>

        {/* Content layout */}
        <div className="flex-grow p-8 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1: Dashboard Requirements configuration */}
          <div className="space-y-6">
            <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
                1. Enable Inputs on Dashboard
              </h3>

              <div className="space-y-3">
                {reqs.map((r) => (
                  <div key={r.id} className="flex items-center justify-between py-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
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
                    {r.type === "social_handle" && (
                      <button
                        onClick={() => deleteRequirement(r.id)}
                        className="text-[9px] text-flame underline hover:text-white cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add dynamic social handle form */}
              <form onSubmit={addSocialRequirement} className="flex gap-2 mt-4 pt-4 border-t border-neutral-800">
                <input
                  type="text"
                  value={socialLabel}
                  onChange={(e) => setSocialLabel(e.target.value)}
                  placeholder="Request extra social handle (e.g. Founder 2 LinkedIn)"
                  className="flex-grow bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-1.5 text-xs text-white focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-neutral-800 border border-neutral-700 hover:border-volt text-white text-xs px-3 py-1.5 rounded-sm uppercase tracking-wider font-bold transition cursor-pointer"
                >
                  + Add Request
                </button>
              </form>
            </div>

            <div className="pt-4">
              <button
                onClick={resetClientData}
                className="w-full bg-[#120707] border border-red-950 text-red-500 hover:bg-red-950 hover:text-white text-xs py-2 text-center rounded-sm uppercase font-bold transition cursor-pointer"
              >
                ☠ Wipe Client Workspace
              </button>
            </div>
          </div>

          {/* Column 2: Status Feed and Vault uploads */}
          <div className="space-y-6">
            {/* Post timeline update */}
            <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
                2. Post Operations Timeline Update
              </h3>

              <form onSubmit={addStatusUpdate} className="space-y-3">
                <textarea
                  value={newStatusText}
                  onChange={(e) => setNewStatusText(e.target.value)}
                  placeholder="e.g. Completed initial short-form content layout sprint."
                  rows={3}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3.5 py-2 text-xs focus:outline-none text-white"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-volt text-black hover:bg-white text-xs py-2 uppercase font-bold rounded-sm transition cursor-pointer text-center"
                >
                  Log Update →
                </button>
              </form>
            </div>

            {/* Post document */}
            <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
                3. Share File in Client Vault
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
                  className="w-full bg-neutral-900 border border-neutral-800 hover:border-volt text-neutral-300 hover:text-white text-xs py-2 uppercase font-bold rounded-sm transition cursor-pointer text-center"
                >
                  Post File Vault Index →
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
