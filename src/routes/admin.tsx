import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionLabel, Eyebrow } from "../components/site-chrome";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Operations Desk — Typtwo" },
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
  { id: "req-brand-kit", type: "drive_link", label: "Brand Kit Drive Link", active: true, submitted: false, value: "" },
  { id: "req-brand-assets", type: "drive_link", label: "Brand Assets Drive Link", active: true, submitted: false, value: "" },
  { id: "req-credentials", type: "drive_link", label: "Credentials Drive Link", active: false, submitted: false, value: "" },
  { id: "req-vault", type: "boolean", label: "Enable Shared Deliverables Vault", active: true, submitted: false, value: "" },
  { id: "req-status-feed", type: "boolean", label: "Enable Real-Time Status Feed", active: true, submitted: false, value: "" }
];

function AdminPage() {
  const [clients] = useState<Client[]>(DEFAULT_CLIENTS);
  const [selectedClientId, setSelectedClientId] = useState<string>("acme");
  
  // Requirements config state
  const [reqs, setReqs] = useState<Requirement[]>([]);
  
  // Form values for adding new social requirements
  const [socialLabel, setSocialLabel] = useState("");
  
  // Form values for status and files
  const [newStatusText, setNewStatusText] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [newFileSize, setNewFileSize] = useState("1.5 MB");

  // Notifications
  const [notifyMsg, setNotifyMsg] = useState("");

  // Load client-specific data whenever selectedClientId changes
  useEffect(() => {
    const key = `t2_reqs_${selectedClientId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      setReqs(JSON.parse(stored));
    } else {
      // Deep copy defaults
      const initial = JSON.parse(JSON.stringify(DEFAULT_REQUIREMENTS));
      setReqs(initial);
      localStorage.setItem(key, JSON.stringify(initial));
    }
  }, [selectedClientId]);

  // Save requirements config
  const saveConfig = (updatedReqs: Requirement[]) => {
    localStorage.setItem(`t2_reqs_${selectedClientId}`, JSON.stringify(updatedReqs));
    window.dispatchEvent(new Event("storage"));
    setNotifyMsg("Configuration saved successfully.");
    setTimeout(() => setNotifyMsg(""), 3000);
  };

  const toggleReqActive = (id: string) => {
    const updated = reqs.map((r) => r.id === id ? { ...r, active: !r.active } : r);
    setReqs(updated);
    saveConfig(updated);
  };

  // Add dynamic social handle requirement
  const addSocialRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialLabel.trim()) return;

    const newId = `req-social-${Date.now()}`;
    const newReq: Requirement = {
      id: newId,
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

  // Delete requirement
  const deleteRequirement = (id: string) => {
    const updated = reqs.filter((r) => r.id !== id);
    setReqs(updated);
    saveConfig(updated);
  };

  // Post Real-time Status Update
  const addStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatusText.trim()) return;

    const key = `t2_statuses_${selectedClientId}`;
    const current: StatusUpdate[] = JSON.parse(localStorage.getItem(key) || "[]");
    
    // Add to start of list
    const now = new Date();
    const updated = [
      { text: newStatusText, timestamp: now.toLocaleTimeString() + " - Today" },
      ...current
    ];

    localStorage.setItem(key, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    setNewStatusText("");
    setNotifyMsg("Status update posted to client feed.");
    setTimeout(() => setNotifyMsg(""), 3000);
  };

  // Post Vault Document
  const addVaultDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    const key = `t2_files_${selectedClientId}`;
    const current: VaultFile[] = JSON.parse(localStorage.getItem(key) || "[]");
    
    const updated = [
      { name: newFileName, size: newFileSize },
      ...current
    ];

    localStorage.setItem(key, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    setNewFileName("");
    setNotifyMsg("Document added to client vault.");
    setTimeout(() => setNotifyMsg(""), 3000);
  };

  // Reset client data to default
  const resetClientData = () => {
    if (window.confirm("Are you sure you want to clear all requirements and inputs for this client?")) {
      localStorage.removeItem(`t2_reqs_${selectedClientId}`);
      localStorage.removeItem(`t2_statuses_${selectedClientId}`);
      localStorage.removeItem(`t2_files_${selectedClientId}`);
      const initial = JSON.parse(JSON.stringify(DEFAULT_REQUIREMENTS));
      setReqs(initial);
      saveConfig(initial);
    }
  };

  return (
    <>
      <div className="border-b-2 border-ink bg-paper flex items-center justify-between p-6">
        <div>
          <Eyebrow color="flame">Master Controls</Eyebrow>
          <div className="display text-2xl font-bold mt-1 uppercase tracking-tight">
            Operations Admin Panel
          </div>
        </div>
        {notifyMsg && (
          <div className="mono text-xs bg-volt text-ink px-4 py-2 border-2 border-ink font-bold animate-pulse">
            {notifyMsg}
          </div>
        )}
      </div>

      <PageHeader
        n="A1"
        kicker="Ops Center"
        title={
          <>
            Client Portal<br />
            <span className="italic">configuration.</span>
          </>
        }
        lead="Select a client organization, toggle asset requirement forms, duplicate social handle collection boxes, and post status feeds."
        accent="flame"
        meta={[
          { label: "Console", value: "Master Admin Desk" },
          { label: "Client Space", value: selectedClientId.toUpperCase() },
          { label: "Hub Link", value: "Dubai Ops Edge Node" }
        ]}
      />

      {/* Select Client Section */}
      <section className="p-6 md:p-10 border-b-2 border-ink bg-paper flex flex-wrap items-center gap-4">
        <span className="mono text-xs uppercase tracking-widest font-bold text-muted-foreground">Select Active Client:</span>
        <div className="flex flex-wrap gap-2">
          {clients.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedClientId(c.id)}
              className={`brute px-5 py-3 mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                selectedClientId === c.id 
                  ? "bg-ink text-paper border-ink" 
                  : "bg-paper text-ink border-ink/40 hover:border-ink"
              }`}
            >
              {c.name} ({c.id})
            </button>
          ))}
        </div>
      </section>

      {/* Grid: Activations & Feeds management */}
      <section className="grid grid-cols-1 lg:grid-cols-12 items-stretch border-b-2 border-ink">
        {/* Left: Requirements Toggle & Social Multiplier */}
        <div className="lg:col-span-7 p-6 md:p-10 border-r-0 lg:border-r-2 border-b-2 lg:border-b-0 border-ink">
          <SectionLabel n="01" label="Activation Controls" />

          {/* Standard Requirements Grid */}
          <div className="space-y-4 mt-8">
            <h4 className="mono text-[10px] text-muted-foreground uppercase">// Master Toggles</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {reqs.filter(r => r.type === "drive_link" || r.type === "boolean").map((r) => (
                <div 
                  key={r.id}
                  onClick={() => toggleReqActive(r.id)}
                  className={`p-4 border-2 border-ink flex items-center justify-between cursor-pointer transition-colors ${
                    r.active ? "bg-volt/15 border-ink" : "bg-paper border-ink/30 opacity-70"
                  }`}
                >
                  <div>
                    <div className="display text-sm font-bold">{r.label}</div>
                    <span className="mono text-[9px] text-muted-foreground uppercase">[{r.type.replace('_', ' ')}]</span>
                  </div>
                  <div className={`h-5 w-5 border-2 border-ink flex items-center justify-center ${r.active ? "bg-ink text-paper" : "bg-paper text-ink"}`}>
                    {r.active && "✓"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Profiles Multiplier list */}
          <div className="space-y-4 mt-12">
            <h4 className="mono text-[10px] text-muted-foreground uppercase">// Custom Social Handles Collection Toggles</h4>
            
            <div className="space-y-3">
              {reqs.filter(r => r.type === "social_handle").map((r) => (
                <div 
                  key={r.id}
                  className="p-4 border-2 border-ink bg-paper flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleReqActive(r.id)}
                      className={`h-5 w-5 border-2 border-ink flex items-center justify-center cursor-pointer ${
                        r.active ? "bg-ink text-paper" : "bg-paper text-ink"
                      }`}
                    >
                      {r.active && "✓"}
                    </button>
                    <div>
                      <span className={`display text-sm font-bold ${!r.active ? "line-through text-muted-foreground" : ""}`}>
                        {r.label}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteRequirement(r.id)}
                    className="mono text-[10px] text-flame underline hover:text-ink cursor-pointer"
                  >
                    DELETE
                  </button>
                </div>
              ))}

              {reqs.filter(r => r.type === "social_handle").length === 0 && (
                <p className="text-xs text-muted-foreground italic">No custom social handles activated yet.</p>
              )}
            </div>

            {/* Form to dynamically add new social handles requirement */}
            <form onSubmit={addSocialRequirement} className="flex gap-2 mt-4 pt-4 border-t border-ink/20">
              <input
                type="text"
                value={socialLabel}
                onChange={(e) => setSocialLabel(e.target.value)}
                placeholder="e.g. Founder 2 Twitter, CEO LinkedIn..."
                className="flex-grow bg-paper border-2 border-ink px-4 py-3 focus:outline-none focus:bg-volt/10 mono text-xs"
                required
              />
              <button
                type="submit"
                className="brute bg-ink text-paper px-4 hover:bg-volt hover:text-ink font-bold mono text-xs uppercase tracking-widest cursor-pointer"
              >
                + ADD HANDLE REQUIREMENT
              </button>
            </form>
          </div>
        </div>

        {/* Right: Status Log poster & Document Vault Manager */}
        <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between gap-8">
          <div>
            <SectionLabel n="02" label="Live Feeds & Deliverables" />

            {/* Post Status Update */}
            <form onSubmit={addStatusUpdate} className="space-y-4 mt-8 p-4 border border-ink/40 bg-paper">
              <h4 className="mono text-[10px] text-muted-foreground uppercase">// POST REAL-TIME STATUS MESSAGE</h4>
              <div>
                <textarea
                  value={newStatusText}
                  onChange={(e) => setNewStatusText(e.target.value)}
                  placeholder="Describe status (e.g. 'Deploying vector index on AWS cluster...')"
                  rows={3}
                  className="w-full bg-paper border-2 border-ink px-3 py-2 focus:outline-none focus:bg-volt/10 mono text-xs"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full brute bg-ink text-paper hover:bg-volt hover:text-ink py-2.5 mono text-[10px] uppercase tracking-widest font-bold cursor-pointer"
              >
                Post Status Update →
              </button>
            </form>

            {/* Post Vault File */}
            <form onSubmit={addVaultDocument} className="space-y-4 mt-8 p-4 border border-ink/40 bg-paper">
              <h4 className="mono text-[10px] text-muted-foreground uppercase">// UPLOAD DELIVERABLE DOCUMENT</h4>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="Filename (e.g. schema.json)"
                  className="bg-paper border-2 border-ink px-3 py-2 focus:outline-none focus:bg-volt/10 mono text-xs"
                  required
                />
                <input
                  type="text"
                  value={newFileSize}
                  onChange={(e) => setNewFileSize(e.target.value)}
                  placeholder="Size (e.g. 1.2 MB)"
                  className="bg-paper border-2 border-ink px-3 py-2 focus:outline-none focus:bg-volt/10 mono text-xs"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full brute bg-flame text-paper hover:bg-ink py-2.5 mono text-[10px] uppercase tracking-widest font-bold cursor-pointer"
              >
                Post Deliverable Document →
              </button>
            </form>
          </div>

          <div className="pt-8 border-t border-ink/20">
            <button
              onClick={resetClientData}
              className="w-full brute border-2 border-flame text-flame hover:bg-flame hover:text-paper py-3 mono text-xs uppercase tracking-widest font-bold cursor-pointer"
            >
              ☢ WIPE CLIENT WORKSPACE
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
