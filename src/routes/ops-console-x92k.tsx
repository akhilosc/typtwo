import { useState, useEffect, Component, ReactNode } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class OpsConsoleErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("OpsConsole caught render error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070707] text-white flex items-center justify-center p-6 font-mono">
          <div className="bg-[#0b0b0b] border border-red-900/80 p-8 rounded-sm max-w-xl w-full text-left space-y-4 shadow-xl">
            <div className="flex items-center gap-3 text-red-500 font-bold uppercase text-xs">
              <span className="h-2.5 w-2.5 bg-red-500 rounded-full animate-ping" />
              // Ops Workspace State Recovery
            </div>
            <h3 className="text-sm font-bold text-white uppercase">Workspace Interface Temporarily Interrupted</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              An unexpected render notice occurred ({this.state.error?.message || "State mismatch"}). You can safely return to the Master Directory or re-initialize.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className="bg-volt text-black font-extrabold text-xs px-4 py-2 uppercase rounded-sm hover:bg-white transition cursor-pointer"
              >
                ↻ Refresh Master Workspace
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AdminPageWrapper() {
  return (
    <OpsConsoleErrorBoundary>
      <AdminPage />
    </OpsConsoleErrorBoundary>
  );
}

export const Route = createFileRoute("/ops-console-x92k")({
  head: () => ({
    meta: [
      { title: "Operations Console — Typtwo" },
      { name: "description", content: "Master requirements controls and client configuration." }
    ]
  }),
  component: AdminPageWrapper
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

interface MilestoneDeliverable {
  name: string;
  url: string;
}

interface Milestone {
  id: string;
  title: string;
  percentage: number;
  statusText: string;
  updatedAt: string;
  deliverables: MilestoneDeliverable[];
}

interface MilestoneAuditLog {
  id: string;
  message: string;
  timestamp: string;
}

const DEFAULT_CLIENTS: Client[] = [];

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

const DEFAULT_MILESTONES: Milestone[] = [
  {
    id: "m-1",
    title: "Phase 1: Discovery & Asset Auditing",
    percentage: 100,
    statusText: "All core brand kit links, color systems, and media briefs reviewed and logged.",
    updatedAt: new Date().toLocaleString(),
    deliverables: [{ name: "Corporate Onboarding Audit Brief", url: "https://drive.google.com" }]
  },
  {
    id: "m-2",
    title: "Phase 2: Operational Strategy & Setup",
    percentage: 50,
    statusText: "Drafting active campaign setup scripts and custom target audience personas.",
    updatedAt: new Date().toLocaleString(),
    deliverables: []
  }
];

const SOCIAL_PLATFORMS = ["LinkedIn", "X (Twitter)", "Instagram", "YouTube", "TikTok", "Facebook"];
const SOCIAL_SUB_OPTIONS = [
  "Personal Profile URL",
  "Business Page URL",
  "Analytics Admin Invite",
  "Platform Credentials"
];

function AdminPage() {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [allDbClients, setAllDbClients] = useState<any[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>("acme");

  const [adminPasscode, setAdminPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcodeError, setPasscodeError] = useState("");

  const parseArray = (input: any): any[] => {
    if (Array.isArray(input)) return input;
    if (typeof input === "string") {
      try {
        const parsed = JSON.parse(input);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return [];
      }
    }
    return [];
  };

  const getSafeLocalStorage = (key: string): string | null => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const setSafeLocalStorage = (key: string, val: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, val);
    } catch {}
  };

  const removeSafeLocalStorage = (key: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch {}
  };

  // Check sessionStorage on mount
  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined") return;
    const auth = sessionStorage.getItem("t2_admin_authorized");
    if (auth === "true") {
      setIsAuthorized(true);
    }
  }, []);

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasscode === "T2-OPS-2026") {
      setIsAuthorized(true);
      sessionStorage.setItem("t2_admin_authorized", "true");
      setPasscodeError("");
    } else {
      setPasscodeError("Invalid Administrator Passcode. Access Denied.");
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem("t2_admin_authorized");
    setIsAuthorized(false);
    navigate({ to: "/" });
  };

  // Onboard new client form states
  const [onboardId, setOnboardId] = useState("");
  const [onboardName, setOnboardName] = useState("");
  const [onboardDomain, setOnboardDomain] = useState("");
  const [reqs, setReqs] = useState<Requirement[]>([]);
  
  // Master Overview vs Selected Company Workspace Mode
  const [viewMode, setViewMode] = useState<"master" | "company">("master");

  // Tab selector for company management desk
  const [activeFormTab, setActiveFormTab] = useState<"requirements" | "progress" | "agreements" | "members">("requirements");

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
  
  // Milestone state (Multiple Milestones list)
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [auditLogs, setAuditLogs] = useState<MilestoneAuditLog[]>([]);

  // Milestone builder states
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
  const [newMilestonePercent, setNewMilestonePercent] = useState<number>(0);
  const [newMilestoneStatus, setNewMilestoneStatus] = useState("");

  // Deliverable attachment form states (mapped per milestone ID)
  const [attachedDocName, setAttachedDocName] = useState("");
  const [attachedDocUrl, setAttachedDocUrl] = useState("");
  const [activeMilestoneAttachmentId, setActiveMilestoneAttachmentId] = useState<string | null>(null);

  // Agreement share form state
  const [newAgreementName, setNewAgreementName] = useState("");
  const [newAgreementUrl, setNewAgreementUrl] = useState("");

  const [notifyMsg, setNotifyMsg] = useState("");
  const [memberSearchQuery, setMemberSearchQuery] = useState("");

  // Load clients list dynamically
  useEffect(() => {
    const fetchClients = async () => {
      if (isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase
            .from("clients")
            .select("*");
          if (data && !error) {
            setAllDbClients(data);
            
            // Map all companies to selection list
            const mapped: Client[] = data.map((d: any) => ({
              id: d.id,
              name: d.name,
              email: `@${d.email_domain || d.email || d.id}`
            }));
            setClients(mapped);
            return;
          }
        } catch (err) {
          console.error("Failed to load clients list from Supabase", err);
        }
      }

      // Local storage fallback list
      const storedList = getSafeLocalStorage("t2_local_clients_list");
      if (storedList !== null) {
        const parsed = parseArray(storedList);
        setClients(parsed);
      } else {
        setClients([]);
      }
    };
    fetchClients();
  }, [notifyMsg, selectedClientId]);

  // Onboard new client workspace submit handler
  const handleOnboardClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onboardId.trim() || !onboardName.trim() || !onboardDomain.trim()) {
      alert("Please fill all onboarding fields.");
      return;
    }

    const cleanId = onboardId.trim().toLowerCase().replace(/\s+/g, "");
    const cleanDomain = onboardDomain.trim().toLowerCase().replace(/\s+/g, "");

    const newClientObj = {
      id: cleanId,
      name: onboardName.trim(),
      email_domain: cleanDomain,
      reqs: [],
      files: [],
      agreements: [],
      milestones: DEFAULT_MILESTONES,
      audit_logs: [{ id: "aud-0", message: "Client milestones database initialized.", timestamp: new Date().toLocaleString() }],
      statuses: []
    };

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from("clients")
          .insert(newClientObj);

        if (!error) {
          setNotifyMsg("CLIENT CREATED");
          setTimeout(() => setNotifyMsg(""), 2000);
          setSelectedClientId(cleanId);
          setOnboardId("");
          setOnboardName("");
          setOnboardDomain("");
          return;
        }
        alert(`Failed to create client in Supabase: ${error.message}`);
        return;
      } catch (err) {
        console.error(err);
        alert("Supabase integration error occurred.");
      }
    }

    // Local Storage Fallback
    const localClientsKey = "t2_local_clients_list";
    const currentClients: Client[] = parseArray(getSafeLocalStorage(localClientsKey) || JSON.stringify(DEFAULT_CLIENTS));
    if (currentClients.some(c => c.id === cleanId)) {
      alert("A client workspace with this ID already exists.");
      return;
    }

    const nextClientsList = [...currentClients, { id: cleanId, name: onboardName.trim(), email: `@${cleanDomain}` }];
    setSafeLocalStorage(localClientsKey, JSON.stringify(nextClientsList));
    setSafeLocalStorage(`t2_reqs_${cleanId}`, JSON.stringify([]));
    setSafeLocalStorage(`t2_milestones_${cleanId}`, JSON.stringify(DEFAULT_MILESTONES));
    
    setNotifyMsg("CLIENT CREATED");
    setTimeout(() => setNotifyMsg(""), 2000);
    setSelectedClientId(cleanId);
    setOnboardId("");
    setOnboardName("");
    setOnboardDomain("");
  };

  // Load client configurations per company
  useEffect(() => {
    if (!selectedClientId) return;

    const key = `t2_reqs_${selectedClientId}`;
    const milestonesKey = `t2_milestones_${selectedClientId}`;
    const auditLogsKey = `t2_milestones_audit_${selectedClientId}`;
    
    // Reset workspace states immediately to prevent state bleeding across companies
    setReqs([]);
    setMilestones([]);
    setAuditLogs([]);

    const loadData = async () => {
      const storedLocalReqs = getSafeLocalStorage(key);
      const storedLocalMilestones = getSafeLocalStorage(milestonesKey);
      const storedLocalAudits = getSafeLocalStorage(auditLogsKey);

      if (isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase
            .from("clients")
            .select("*")
            .eq("id", selectedClientId)
            .single();

          if (data && !error) {
            let companyReqs = parseArray(data.reqs);
            if (companyReqs.length > 0) {
              let merged = [...companyReqs];
              DEFAULT_REQUIREMENTS.forEach((def) => {
                if (!merged.some((m) => m.id === def.id)) {
                  merged.push(JSON.parse(JSON.stringify(def)));
                }
              });
              setReqs(merged);
              setSafeLocalStorage(key, JSON.stringify(merged));
            } else if (storedLocalReqs) {
              const parsed = parseArray(storedLocalReqs);
              setReqs(parsed.length > 0 ? parsed : JSON.parse(JSON.stringify(DEFAULT_REQUIREMENTS)));
            } else {
              const initial = JSON.parse(JSON.stringify(DEFAULT_REQUIREMENTS));
              setReqs(initial);
              setSafeLocalStorage(key, JSON.stringify(initial));
            }

            const dbMilestones = parseArray(data.milestones);
            const localMilestones = parseArray(storedLocalMilestones);
            setMilestones(dbMilestones.length > 0 ? dbMilestones : (localMilestones.length > 0 ? localMilestones : DEFAULT_MILESTONES));

            const dbAudits = parseArray(data.audit_logs);
            const localAudits = parseArray(storedLocalAudits);
            setAuditLogs(dbAudits.length > 0 ? dbAudits : (localAudits.length > 0 ? localAudits : [{ id: "aud-0", message: "Client workspace initialized.", timestamp: new Date().toLocaleString() }]));
            return;
          }
        } catch (err) {
          console.error("Failed to load client data from Supabase, falling back to localStorage", err);
        }
      }

      // 1. Requirements Local Fallback
      const localReqs = parseArray(storedLocalReqs);
      if (localReqs.length > 0) {
        let merged = [...localReqs];
        DEFAULT_REQUIREMENTS.forEach((def) => {
          if (!merged.some((m) => m.id === def.id)) {
            merged.push(JSON.parse(JSON.stringify(def)));
          }
        });
        setReqs(merged);
      } else {
        const initial = JSON.parse(JSON.stringify(DEFAULT_REQUIREMENTS));
        setReqs(initial);
        setSafeLocalStorage(key, JSON.stringify(initial));
      }

      // 2. Milestones Local Fallback
      const localMilestones = parseArray(storedLocalMilestones);
      setMilestones(localMilestones.length > 0 ? localMilestones : DEFAULT_MILESTONES);

      // 3. Audit Logs Local Fallback
      const localAudits = parseArray(storedLocalAudits);
      setAuditLogs(localAudits.length > 0 ? localAudits : [{ id: "aud-0", message: "Client workspace initialized.", timestamp: new Date().toLocaleString() }]);
    };

    loadData();

    // Subscribe to realtime database updates
    let channel: any;
    if (isSupabaseConfigured()) {
      channel = supabase
        .channel(`admin_clients_${selectedClientId}`)
        .on("postgres_changes", { event: "*", schema: "public", table: "clients", filter: `id=eq.${selectedClientId}` }, () => {
          loadData();
        })
        .subscribe();
    }

    window.addEventListener("storage", loadData);
    window.addEventListener("t2_storage_update", loadData);

    return () => {
      if (channel) supabase.removeChannel(channel);
      window.removeEventListener("storage", loadData);
      window.removeEventListener("t2_storage_update", loadData);
    };
  }, [selectedClientId]);

  // Save configurations
  const saveConfig = async (updatedReqs: Requirement[]) => {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from("clients")
          .update({ reqs: updatedReqs })
          .eq("id", selectedClientId);
        
        if (!error) {
          setNotifyMsg("SUPABASE SYNCED");
          setTimeout(() => setNotifyMsg(""), 2000);
          return;
        }
        console.error("Supabase update error", error);
      } catch (err) {
        console.error(err);
      }
    }

    localStorage.setItem(`t2_reqs_${selectedClientId}`, JSON.stringify(updatedReqs));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
    setNotifyMsg("SAVED");
    setTimeout(() => setNotifyMsg(""), 2000);
  };

  // Read local file from device and convert it to Base64 data URL
  const handleLocalFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setName: (name: string) => void,
    setUrl: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUrl(event.target.result as string);
        setNotifyMsg("FILE UPLOADED");
        setTimeout(() => setNotifyMsg(""), 2000);
      }
    };
    reader.readAsDataURL(file);
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

  // --- MILESTONES ACTIONS ---

  // Helper to save milestones state and dispatch sync events
  const saveMilestones = async (updatedMilestones: Milestone[], newAuditMessage?: string) => {
    let nextAudits = [...auditLogs];
    if (newAuditMessage) {
      const newLog: MilestoneAuditLog = {
        id: `aud-${Date.now()}`,
        message: newAuditMessage,
        timestamp: new Date().toLocaleString()
      };
      nextAudits = [newLog, ...nextAudits];
      setAuditLogs(nextAudits);
    }
    setMilestones(updatedMilestones);

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from("clients")
          .update({
            milestones: updatedMilestones,
            audit_logs: nextAudits
          })
          .eq("id", selectedClientId);

        if (!error) {
          setNotifyMsg("SUPABASE SYNCED");
          setTimeout(() => setNotifyMsg(""), 2000);
          return;
        }
        console.error("Supabase milestones save error", error);
      } catch (err) {
        console.error(err);
      }
    }

    const milestonesKey = `t2_milestones_${selectedClientId}`;
    const auditLogsKey = `t2_milestones_audit_${selectedClientId}`;
    localStorage.setItem(milestonesKey, JSON.stringify(updatedMilestones));
    if (newAuditMessage) {
      localStorage.setItem(auditLogsKey, JSON.stringify(nextAudits));
    }
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
    setNotifyMsg("MILESTONES SYNCED");
    setTimeout(() => setNotifyMsg(""), 2000);
  };

  // Create Milestone entry
  const handleCreateMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim()) return;

    const newM: Milestone = {
      id: `m-${Date.now()}`,
      title: newMilestoneTitle.trim(),
      percentage: Number(newMilestonePercent),
      statusText: newMilestoneStatus.trim() || "Milestone initiated.",
      updatedAt: new Date().toLocaleString(),
      deliverables: []
    };

    const updated = [...milestones, newM];
    saveMilestones(updated, `Created Milestone: "${newM.title}" at ${newM.percentage}%`);
    setNewMilestoneTitle("");
    setNewMilestonePercent(0);
    setNewMilestoneStatus("");
  };

  // Update milestone inline fields (Percentage, Description)
  const handleUpdateMilestone = (id: string, percentage: number, statusText: string) => {
    const updated = milestones.map((m) => {
      if (m.id === id) {
        return {
          ...m,
          percentage: Number(percentage),
          statusText,
          updatedAt: new Date().toLocaleString()
        };
      }
      return m;
    });

    const target = milestones.find(m => m.id === id);
    saveMilestones(updated, `Updated Milestone "${target?.title}" progress to ${percentage}%: "${statusText}"`);
  };

  // Add deliverable / upload item against milestone
  const handleAddMilestoneDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMilestoneAttachmentId || !attachedDocName.trim() || !attachedDocUrl.trim()) {
      alert("Please fill document name and paste URL OR upload a local file.");
      return;
    }

    const updated = milestones.map((m) => {
      if (m.id === activeMilestoneAttachmentId) {
        return {
          ...m,
          deliverables: [
            ...m.deliverables,
            { name: attachedDocName.trim(), url: attachedDocUrl.trim() || "#" }
          ],
          updatedAt: new Date().toLocaleString()
        };
      }
      return m;
    });

    const target = milestones.find(m => m.id === activeMilestoneAttachmentId);
    saveMilestones(updated, `Added deliverable "${attachedDocName.trim()}" to Milestone: "${target?.title}"`);
    setAttachedDocName("");
    setAttachedDocUrl("");
    setActiveMilestoneAttachmentId(null);
  };

  // Delete deliverable from milestone
  const handleDeleteMilestoneDeliverable = (milestoneId: string, delIdx: number) => {
    const updated = milestones.map((m) => {
      if (m.id === milestoneId) {
        const nextDels = [...m.deliverables];
        const removed = nextDels.splice(delIdx, 1)[0];
        return {
          ...m,
          deliverables: nextDels,
          updatedAt: new Date().toLocaleString()
        };
      }
      return m;
    });

    const target = milestones.find(m => m.id === milestoneId);
    saveMilestones(updated, `Deleted deliverable from Milestone: "${target?.title}"`);
  };

  // Delete milestone entry completely
  const handleDeleteMilestone = (id: string) => {
    const target = milestones.find(m => m.id === id);
    if (window.confirm(`Delete milestone "${target?.title}"?`)) {
      const updated = milestones.filter(m => m.id !== id);
      saveMilestones(updated, `Deleted Milestone: "${target?.title}"`);
    }
  };

  // Share Agreement / Corporate Contract
  const addCorporateAgreement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgreementName.trim() || !newAgreementUrl.trim()) {
      alert("Please fill name and paste URL OR upload a local file.");
      return;
    }

    const newDoc = { name: newAgreementName, date: new Date().toLocaleDateString(), url: newAgreementUrl.trim() };

    if (isSupabaseConfigured()) {
      try {
        const { data } = await supabase
          .from("clients")
          .select("agreements")
          .eq("id", selectedClientId)
          .single();

        const current = data?.agreements || [];
        const updated = [newDoc, ...current];

        const { error } = await supabase
          .from("clients")
          .update({ agreements: updated })
          .eq("id", selectedClientId);

        if (!error) {
          setNewAgreementName("");
          setNewAgreementUrl("");
          setNotifyMsg("CONTRACT SYNCED");
          setTimeout(() => setNotifyMsg(""), 2000);
          return;
        }
        console.error("Supabase contract sync error", error);
      } catch (err) {
        console.error(err);
      }
    }

    const key = `t2_agreements_${selectedClientId}`;
    const current: AgreementDoc[] = JSON.parse(localStorage.getItem(key) || "[]");
    const updated = [newDoc, ...current];
    localStorage.setItem(key, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
    setNewAgreementName("");
    setNewAgreementUrl("");
    setNotifyMsg("CONTRACT ADDED");
    setTimeout(() => setNotifyMsg(""), 2000);
  };

  // Log feed status updates
  const addStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatusText.trim()) return;

    const newLog = { text: newStatusText, timestamp: new Date().toLocaleTimeString() + " - Today" };

    if (isSupabaseConfigured()) {
      try {
        const { data } = await supabase
          .from("clients")
          .select("statuses")
          .eq("id", selectedClientId)
          .single();

        const current = data?.statuses || [];
        const updated = [newLog, ...current];

        const { error } = await supabase
          .from("clients")
          .update({ statuses: updated })
          .eq("id", selectedClientId);

        if (!error) {
          setNewStatusText("");
          setNotifyMsg("STATUS SYNCED");
          setTimeout(() => setNotifyMsg(""), 2000);
          return;
        }
        console.error("Supabase status sync error", error);
      } catch (err) {
        console.error(err);
      }
    }

    const key = `t2_statuses_${selectedClientId}`;
    const current: StatusUpdate[] = JSON.parse(localStorage.getItem(key) || "[]");
    const updated = [newLog, ...current];
    localStorage.setItem(key, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
    setNewStatusText("");
    setNotifyMsg("STATUS ADDED");
    setTimeout(() => setNotifyMsg(""), 2000);
  };

  // Add vault document
  const addVaultDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim() || !newFileUrl.trim()) {
      alert("Please fill file name and paste URL OR upload a local file.");
      return;
    }

    const newFile = { name: newFileName, size: "Download link shared", url: newFileUrl.trim() };

    if (isSupabaseConfigured()) {
      try {
        const { data } = await supabase
          .from("clients")
          .select("files")
          .eq("id", selectedClientId)
          .single();

        const current = data?.files || [];
        const updated = [newFile, ...current];

        const { error } = await supabase
          .from("clients")
          .update({ files: updated })
          .eq("id", selectedClientId);

        if (!error) {
          setNewFileName("");
          setNewFileUrl("");
          setNotifyMsg("VAULT FILE SYNCED");
          setTimeout(() => setNotifyMsg(""), 2000);
          return;
        }
        console.error("Supabase vault sync error", error);
      } catch (err) {
        console.error(err);
      }
    }

    const key = `t2_files_${selectedClientId}`;
    const current: VaultFile[] = JSON.parse(localStorage.getItem(key) || "[]");
    const updated = [newFile, ...current];
    localStorage.setItem(key, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
    setNewFileName("");
    setNewFileUrl("");
    setNotifyMsg("FILE ADDED");
    setTimeout(() => setNotifyMsg(""), 2000);
  };

  // Reset database
  const resetClientData = async () => {
    if (window.confirm("Wipe all configurations for this client?")) {
      const initial = JSON.parse(JSON.stringify(DEFAULT_REQUIREMENTS));

      if (isSupabaseConfigured()) {
        try {
          const { error } = await supabase
            .from("clients")
            .update({
              reqs: initial,
              files: [],
              agreements: [],
              milestones: DEFAULT_MILESTONES,
              audit_logs: [{ id: "aud-0", message: "Client milestones database initialized.", timestamp: new Date().toLocaleString() }],
              statuses: []
            })
            .eq("id", selectedClientId);

          if (!error) {
            setReqs(initial);
            setMilestones(DEFAULT_MILESTONES);
            setAuditLogs([{ id: "aud-0", message: "Client milestones database initialized.", timestamp: new Date().toLocaleString() }]);
            setNotifyMsg("SUPABASE RESET");
            setTimeout(() => setNotifyMsg(""), 2000);
            return;
          }
          console.error("Supabase reset error", error);
        } catch (err) {
          console.error(err);
        }
      }

      localStorage.removeItem(`t2_reqs_${selectedClientId}`);
      localStorage.removeItem(`t2_statuses_${selectedClientId}`);
      localStorage.removeItem(`t2_files_${selectedClientId}`);
      localStorage.removeItem(`t2_milestones_${selectedClientId}`);
      localStorage.removeItem(`t2_milestones_audit_${selectedClientId}`);
      localStorage.removeItem(`t2_agreements_${selectedClientId}`);
      setReqs(initial);
      saveConfig(initial);
    }
  };

    // 1. Approve company workspace
  const handleApproveWorkspace = async (clientIdToApprove: string) => {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from("clients")
          .update({ approved: true, disabled: false })
          .eq("id", clientIdToApprove);
        if (!error) {
          setNotifyMsg("COMPANY APPROVED");
          setTimeout(() => setNotifyMsg(""), 2000);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    localStorage.setItem(`t2_approved_${clientIdToApprove}`, "true");
    localStorage.setItem(`t2_disabled_${clientIdToApprove}`, "false");
    
    setNotifyMsg("COMPANY APPROVED");
    setTimeout(() => setNotifyMsg(""), 2000);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
  };

  // 2. Reject / Set Pending company workspace
  const handleRejectWorkspace = async (clientIdToReject: string) => {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from("clients")
          .update({ approved: false })
          .eq("id", clientIdToReject);
        if (!error) {
          setNotifyMsg("COMPANY REJECTED / PENDING");
          setTimeout(() => setNotifyMsg(""), 2000);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    localStorage.setItem(`t2_approved_${clientIdToReject}`, "false");
    setNotifyMsg("COMPANY REJECTED / PENDING");
    setTimeout(() => setNotifyMsg(""), 2000);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
  };

  // 3. Disable company login
  const handleDisableWorkspace = async (clientIdToDisable: string) => {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from("clients")
          .update({ disabled: true })
          .eq("id", clientIdToDisable);
        if (!error) {
          setNotifyMsg("COMPANY LOGIN DISABLED");
          setTimeout(() => setNotifyMsg(""), 2000);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    localStorage.setItem(`t2_disabled_${clientIdToDisable}`, "true");
    setNotifyMsg("COMPANY LOGIN DISABLED");
    setTimeout(() => setNotifyMsg(""), 2000);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
  };

  // 4. Enable company login
  const handleEnableWorkspace = async (clientIdToEnable: string) => {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from("clients")
          .update({ disabled: false, approved: true })
          .eq("id", clientIdToEnable);
        if (!error) {
          setNotifyMsg("COMPANY LOGIN ENABLED");
          setTimeout(() => setNotifyMsg(""), 2000);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    localStorage.setItem(`t2_disabled_${clientIdToEnable}`, "false");
    localStorage.setItem(`t2_approved_${clientIdToEnable}`, "true");
    setNotifyMsg("COMPANY LOGIN ENABLED");
    setTimeout(() => setNotifyMsg(""), 2000);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
  };

  // 5. Delete company permanently
  const handleDeleteWorkspace = async (clientIdToDelete: string) => {
    if (!window.confirm(`Are you sure you want to PERMANENTLY DELETE company workspace "${clientIdToDelete}"? This action cannot be undone.`)) return;

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from("clients")
          .delete()
          .eq("id", clientIdToDelete);
        
        if (!error) {
          setNotifyMsg("COMPANY DELETED");
          setTimeout(() => setNotifyMsg(""), 2000);
          return;
        }
        alert(`Failed to delete company: ${error.message}`);
      } catch (err) {
        console.error(err);
      }
    }

    // Local storage fallback
    const localClientsKey = "t2_local_clients_list";
    const currentList = JSON.parse(localStorage.getItem(localClientsKey) || "[]");
    const updatedList = currentList.filter((c: any) => c.id !== clientIdToDelete);
    localStorage.setItem(localClientsKey, JSON.stringify(updatedList));

    setNotifyMsg("COMPANY DELETED");
    setTimeout(() => setNotifyMsg(""), 2000);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
  };

  // 6. Master approve coworker / member email access request
  const handleMasterApproveMember = async (targetClientId: string, memberEmail: string) => {
    if (isSupabaseConfigured()) {
      try {
        const { data } = await supabase
          .from("clients")
          .select("members")
          .eq("id", targetClientId)
          .single();

        const current = data?.members || [];
        const updated = current.map((m: any) => 
          m.email === memberEmail ? { ...m, approved: true, disabled: false } : m
        );

        const { error } = await supabase
          .from("clients")
          .update({ members: updated })
          .eq("id", targetClientId);

        if (!error) {
          setNotifyMsg("EMAIL MASTER APPROVED");
          setTimeout(() => setNotifyMsg(""), 2000);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    // Local storage fallback
    const key = `t2_members_${targetClientId}`;
    const current = JSON.parse(localStorage.getItem(key) || "[]");
    const updated = current.map((m: any) => 
      m.email === memberEmail ? { ...m, approved: true, disabled: false } : m
    );
    localStorage.setItem(key, JSON.stringify(updated));

    setNotifyMsg("EMAIL MASTER APPROVED");
    setTimeout(() => setNotifyMsg(""), 2000);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
  };

  // 7. Disable member email
  const handleDisableMember = async (targetClientId: string, memberEmail: string) => {
    if (isSupabaseConfigured()) {
      try {
        const { data } = await supabase
          .from("clients")
          .select("members")
          .eq("id", targetClientId)
          .single();

        const current = data?.members || [];
        const updated = current.map((m: any) => 
          m.email === memberEmail ? { ...m, disabled: true } : m
        );

        const { error } = await supabase
          .from("clients")
          .update({ members: updated })
          .eq("id", targetClientId);

        if (!error) {
          setNotifyMsg("EMAIL DISABLED");
          setTimeout(() => setNotifyMsg(""), 2000);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // 8. Enable member email
  const handleEnableMember = async (targetClientId: string, memberEmail: string) => {
    if (isSupabaseConfigured()) {
      try {
        const { data } = await supabase
          .from("clients")
          .select("members")
          .eq("id", targetClientId)
          .single();

        const current = data?.members || [];
        const updated = current.map((m: any) => 
          m.email === memberEmail ? { ...m, disabled: false, approved: true } : m
        );

        const { error } = await supabase
          .from("clients")
          .update({ members: updated })
          .eq("id", targetClientId);

        if (!error) {
          setNotifyMsg("EMAIL ENABLED");
          setTimeout(() => setNotifyMsg(""), 2000);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // 9. Delete member email
  const handleDeleteMember = async (targetClientId: string, memberEmail: string) => {
    if (isSupabaseConfigured()) {
      try {
        const { data } = await supabase
          .from("clients")
          .select("members")
          .eq("id", targetClientId)
          .single();

        const current = data?.members || [];
        const updated = current.filter((m: any) => m.email !== memberEmail);

        const { error } = await supabase
          .from("clients")
          .update({ members: updated })
          .eq("id", targetClientId);

        if (!error) {
          setNotifyMsg("MEMBER REMOVED");
          setTimeout(() => setNotifyMsg(""), 2000);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    // Local storage fallback
    const key = `t2_members_${targetClientId}`;
    const current = JSON.parse(localStorage.getItem(key) || "[]");
    const updated = current.filter((m: any) => m.email !== memberEmail);
    localStorage.setItem(key, JSON.stringify(updated));

    setNotifyMsg("MEMBER REMOVED");
    setTimeout(() => setNotifyMsg(""), 2000);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
  };

  const getPendingWorkspaces = () => {
    if (isSupabaseConfigured() && Array.isArray(allDbClients) && allDbClients.length > 0) {
      return allDbClients.filter(c => !c.approved);
    }
    const storedList = getSafeLocalStorage("t2_local_clients_list");
    if (!storedList) return [];
    try {
      const parsed = parseArray(storedList);
      return parsed.filter((c: any) => getSafeLocalStorage(`t2_approved_${c.id}`) !== "true" && c.id !== "acme" && c.id !== "startuptalky" && c.id !== "bitbns");
    } catch {
      return [];
    }
  };

  const getPendingMembers = () => {
    if (isSupabaseConfigured() && Array.isArray(allDbClients) && allDbClients.length > 0) {
      return allDbClients.flatMap(c => parseArray(c.members).map((m: any) => ({ ...m, clientId: c.id, clientName: c.name })).filter((m: any) => !m.approved));
    }
    const storedList = getSafeLocalStorage("t2_local_clients_list");
    if (!storedList) return [];
    try {
      const parsed = parseArray(storedList);
      return parsed.flatMap((c: any) => {
        const key = `t2_members_${c.id}`;
        const list = parseArray(getSafeLocalStorage(key));
        return list.filter((m: any) => !m.approved).map((m: any) => ({ ...m, clientId: c.id, clientName: c.name }));
      });
    } catch {
      return [];
    }
  };

  const getAllMembersList = () => {
    let list: any[] = [];
    if (isSupabaseConfigured() && Array.isArray(allDbClients) && allDbClients.length > 0) {
      list = allDbClients.flatMap(c => parseArray(c.members).map((m: any) => ({ ...m, clientId: c.id, clientName: c.name })));
    } else {
      const storedList = getSafeLocalStorage("t2_local_clients_list");
      if (storedList) {
        try {
          const parsed = parseArray(storedList);
          list = parsed.flatMap((c: any) => {
            const key = `t2_members_${c.id}`;
            const mList = parseArray(getSafeLocalStorage(key));
            return mList.map((m: any) => ({ ...m, clientId: c.id, clientName: c.name }));
          });
        } catch {
          list = [];
        }
      }
    }

    if (memberSearchQuery.trim()) {
      const q = memberSearchQuery.toLowerCase().trim();
      return list.filter(m => (m.email || "").toLowerCase().includes(q) || (m.clientName || "").toLowerCase().includes(q) || (m.clientId || "").toLowerCase().includes(q));
    }

    return list;
  };

  const pendingWorkspacesList = getPendingWorkspaces();
  const pendingMembersList = getPendingMembers();
  const totalPending = pendingWorkspacesList.length + pendingMembersList.length;

  const selectedClient = (allDbClients && allDbClients.length > 0 ? allDbClients.find((c: any) => c && String(c.id).trim().toLowerCase() === String(selectedClientId).trim().toLowerCase()) : null)
    || clients.find((c: any) => c && String(c.id).trim().toLowerCase() === String(selectedClientId).trim().toLowerCase())
    || (allDbClients && allDbClients.length > 0 ? allDbClients[0] : null)
    || clients[0]
    || { id: selectedClientId || "workspace", name: selectedClientId ? String(selectedClientId).toUpperCase() : "Workspace", email: "" };

  const safeReqs = (Array.isArray(reqs) ? reqs : []).filter(r => r && typeof r === "object" && r.id);
  const safeMilestones = (Array.isArray(milestones) ? milestones : []).filter(m => m && typeof m === "object" && m.id);
  const safeAuditLogs = (Array.isArray(auditLogs) ? auditLogs : []).filter(a => a && typeof a === "object");
  const activeCustomsCount = safeReqs.filter(r => r.id && String(r.id).startsWith("req-custom-")).length;

  if (!isMounted) {
    return (
      <div className="flex min-h-screen bg-[#070707] text-neutral-100 font-mono items-center justify-center p-4">
        <div className="flex items-center gap-3 bg-[#0b0b0b] border border-neutral-800 p-6 rounded-sm">
          <span className="h-2 w-2 bg-volt rounded-full animate-ping" />
          <span className="text-xs uppercase tracking-widest text-neutral-300 font-bold">
            Establishing Secure Handshake...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen bg-[#070707] text-neutral-100 font-mono items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0b0b0b] border-2 border-flame/50 p-8 rounded-sm space-y-6 shadow-[0_0_30px_rgba(255,80,0,0.1)] text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 bg-flame/5 rounded-full blur-2xl translate-x-6 -translate-y-6" />
          
          <div className="flex items-center gap-2 text-flame text-[10px] font-bold uppercase tracking-widest">
            <span className="h-1.5 w-1.5 bg-flame rounded-full animate-ping" />
            // OPERATIONAL_CONTROL_GATEWAY
          </div>

          <div className="space-y-1.5">
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              Verification Required
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              This terminal controls client workspaces, operational milestones, and deliverables vaults. Enter the Administrator Authorization Passcode to establish session handshake.
            </p>
          </div>

          {passcodeError && (
            <div className="p-3 bg-red-950/60 border border-red-900 text-red-400 text-[10px] uppercase font-bold tracking-wide">
              !! ERROR: {passcodeError}
            </div>
          )}

          <form onSubmit={handleVerifyPasscode} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[9px] text-neutral-500 uppercase tracking-widest font-bold block">// Admin Access Key</label>
              <input
                type="password"
                placeholder="Enter passcode..."
                value={adminPasscode}
                onChange={(e) => setAdminPasscode(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:border-flame font-mono tracking-widest text-center"
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-900 border border-neutral-850 hover:border-flame hover:text-flame py-3 text-xs uppercase tracking-widest font-bold transition cursor-pointer text-neutral-350"
            >
              Verify Credentials →
            </button>
          </form>

          <div className="border-t border-neutral-900 pt-4 text-center">
            <Link to="/" className="text-[10px] text-neutral-500 hover:text-white uppercase tracking-wider transition underline decoration-transparent">
              ← Return to Public Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-neutral-100 font-mono text-left">
      {/* Sidebar: Navigation & Workspace Selector */}
      <aside className="w-64 border-r border-neutral-800 bg-[#0e0e0e] flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-6">
          <div>
            <Link to="/" className="flex items-center gap-2 pb-5 border-b border-neutral-800 mb-6">
              <span className="h-2 w-2 bg-flame rounded-full blink" />
              <span className="font-bold text-sm tracking-wider text-white uppercase">TYPTWO CONSOLE</span>
            </Link>

            {/* Navigation Mode Selector */}
            <div className="space-y-1 mb-6">
              <button
                onClick={() => setViewMode("master")}
                className={`w-full text-left px-3 py-2 text-xs uppercase tracking-wide rounded-sm transition cursor-pointer font-bold flex items-center justify-between ${
                  viewMode === "master"
                    ? "bg-volt text-black"
                    : "bg-neutral-900 text-neutral-400 hover:text-white"
                }`}
              >
                <span>🏛️ Master Overview</span>
                {pendingWorkspacesList.length > 0 && (
                  <span className="bg-flame text-white text-[8px] px-1.5 py-0.2 font-bold rounded-sm animate-pulse">
                    {pendingWorkspacesList.length}
                  </span>
                )}
              </button>
            </div>

            <span className="text-[9px] text-neutral-500 uppercase tracking-widest block mb-3 font-bold">// Select Company Workspace</span>
            <nav className="space-y-1 max-h-[160px] overflow-y-auto pr-1">
              {clients.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedClientId(c.id);
                    setViewMode("company");
                  }}
                  className={`w-full text-left px-3 py-2 text-xs uppercase tracking-wide rounded-sm transition cursor-pointer font-bold ${
                    viewMode === "company" && selectedClientId === c.id
                      ? "bg-volt text-black"
                      : "bg-neutral-900 text-neutral-400 hover:text-white"
                  }`}
                >
                  {c.name}
                </button>
              ))}
              {clients.length === 0 && (
                <div className="text-[10px] text-neutral-500 italic py-2">No active clients found.</div>
              )}
            </nav>
          </div>

          {/* Onboard New Client Form */}
          <div className="pt-5 border-t border-neutral-800">
            <h4 className="text-[9px] text-volt uppercase tracking-widest font-bold mb-3">
              // Onboard Client Workspace
            </h4>
            <form onSubmit={handleOnboardClient} className="space-y-2">
              <div>
                <input
                  type="text"
                  placeholder="ID: e.g. netflix"
                  value={onboardId}
                  onChange={(e) => setOnboardId(e.target.value.toLowerCase().replace(/\s+/g, ""))}
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-sm px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-volt"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Company Name: Netflix"
                  value={onboardName}
                  onChange={(e) => setOnboardName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-sm px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-volt"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Domain: netflix.com"
                  value={onboardDomain}
                  onChange={(e) => setOnboardDomain(e.target.value.toLowerCase().replace(/\s+/g, ""))}
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-sm px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-volt"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-neutral-900 border border-neutral-800 hover:border-volt text-neutral-350 hover:text-white text-[10px] py-1.5 font-bold uppercase rounded-sm cursor-pointer transition text-center"
              >
                Create Workspace
              </button>
            </form>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-800 space-y-2">
          <button
            onClick={handleAdminLogout}
            className="w-full bg-neutral-900 border border-neutral-800 hover:border-red-500/80 hover:text-red-400 text-neutral-300 text-xs py-2 text-center transition cursor-pointer uppercase font-bold rounded-sm"
          >
            🔒 Lock & Exit Console
          </button>
          <div className="text-[9px] text-neutral-500 uppercase text-center font-bold">
            Ops Desk v2.6
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-grow flex flex-col min-w-0 bg-[#070707]">
        {/* Header Bar */}
        <header className="h-14 border-b border-neutral-800 px-8 flex items-center justify-between bg-[#0b0b0b] shrink-0">
          <div className="flex items-center gap-3">
            {viewMode === "company" ? (
              <>
                <button
                  onClick={() => setViewMode("master")}
                  className="bg-neutral-900 border border-neutral-800 hover:border-volt text-neutral-300 hover:text-white text-[10px] px-2.5 py-1 uppercase font-bold rounded-sm transition cursor-pointer"
                >
                  ← Master Directory
                </button>
                <span className="text-neutral-600">|</span>
                <span className="text-xs uppercase tracking-wider text-white font-bold">
                  Managing: <span className="text-volt">{selectedClient.name}</span> ({selectedClient.id})
                </span>
              </>
            ) : (
              <span className="text-xs uppercase tracking-widest text-white font-bold flex items-center gap-2">
                <span className="h-2 w-2 bg-volt rounded-full blink" />
                // Master Enterprise Operations Directory
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Quick company switch dropdown */}
            {viewMode === "company" && (
              <select
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 text-xs text-white px-3 py-1 rounded-sm focus:outline-none focus:border-volt uppercase font-bold cursor-pointer"
              >
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    Company: {c.name} ({c.id})
                  </option>
                ))}
              </select>
            )}

            {notifyMsg && (
              <span className="text-[10px] text-volt uppercase font-bold animate-pulse">● {notifyMsg}</span>
            )}

            <button
              onClick={handleAdminLogout}
              className="bg-neutral-900 border border-neutral-800 hover:border-red-500/80 hover:text-red-400 text-neutral-300 text-xs px-3 py-1.5 transition cursor-pointer uppercase font-bold rounded-sm"
            >
              🔒 Lock Console
            </button>
          </div>
        </header>

        {/* Dynamic Content Views */}
        {viewMode === "master" ? (
          /* MASTER OVERVIEW VIEW MODE */
          <div className="flex-grow p-8 space-y-8 w-full font-mono text-left overflow-y-auto">
            {/* Master Stats Summary Banner */}
            <div className="bg-[#0b0b0b] border border-neutral-800 p-6 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-volt text-[10px] font-bold uppercase tracking-widest">
                  <span className="h-2 w-2 bg-volt rounded-full animate-ping" />
                  // MASTER OPERATIONS CONTROL
                </div>
                <h2 className="text-base font-bold text-white uppercase tracking-wider">
                  Enterprise Workspaces & Access Control Desk
                </h2>
                <p className="text-xs text-neutral-400">
                  Approve or reject client registrations, manage login access, or click "Manage Workspace" to configure company-specific checklists & instructions.
                </p>
              </div>

              <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-neutral-800 pt-4 md:pt-0 pl-0 md:pl-6 shrink-0">
                <div className="text-center">
                  <div className="text-xl font-bold text-volt">{allDbClients.length || clients.length}</div>
                  <div className="text-[9px] text-neutral-500 font-bold uppercase">Companies</div>
                </div>
                <div className="text-center border-l border-neutral-800 pl-4">
                  <div className="text-xl font-bold text-flame">{pendingWorkspacesList.length}</div>
                  <div className="text-[9px] text-neutral-500 font-bold uppercase">Pending</div>
                </div>
                <div className="text-center border-l border-neutral-800 pl-4">
                  <div className="text-xl font-bold text-white">{getAllMembersList().length}</div>
                  <div className="text-[9px] text-neutral-500 font-bold uppercase">Members</div>
                </div>
              </div>
            </div>

            {/* Section 1: All Companies Master Table */}
            <div className="bg-[#0c0c0c] border border-neutral-800 p-6 rounded-sm space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="text-xs font-bold text-volt uppercase tracking-wider">// Company Workspaces Directory</h3>
                <span className="text-[9px] text-neutral-400 uppercase font-bold">Click "Manage Workspace →" to configure company-specific do's & don'ts</span>
              </div>

              <div className="space-y-3">
                {(allDbClients.length > 0 ? allDbClients : clients).map((c: any) => {
                  const isAppr = c.approved ?? true;
                  const isDis = c.disabled ?? false;

                  return (
                    <div key={c.id} className="bg-neutral-950 border border-neutral-850 p-4 rounded-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-1 text-left">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-white uppercase">{c.name}</h4>
                          {isDis ? (
                            <span className="bg-red-950 text-red-400 border border-red-900 text-[9px] px-2 py-0.5 font-bold uppercase rounded-sm">
                              ● LOGIN DISABLED
                            </span>
                          ) : isAppr ? (
                            <span className="bg-emerald-950 text-emerald-400 border border-emerald-900 text-[9px] px-2 py-0.5 font-bold uppercase rounded-sm">
                              ✓ APPROVED
                            </span>
                          ) : (
                            <span className="bg-amber-950 text-amber-400 border border-amber-900 text-[9px] px-2 py-0.5 font-bold uppercase rounded-sm animate-pulse">
                              ⏱ AWAITING APPROVAL
                            </span>
                          )}
                        </div>
                        <div className="text-[9px] text-neutral-500 uppercase tracking-wider">
                          Workspace ID: <span className="text-neutral-350">{c.id}</span> | Domain: <span className="text-neutral-350">{c.email_domain || c.email || "N/A"}</span>
                        </div>
                      </div>

                      {/* Master Company Action Controls */}
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedClientId(c.id);
                            setViewMode("company");
                          }}
                          className="bg-volt text-black hover:bg-white text-[10px] py-1.5 px-3 uppercase font-extrabold rounded-sm transition cursor-pointer"
                        >
                          ⚡ Manage Workspace →
                        </button>

                        {!isAppr && (
                          <button
                            onClick={() => handleApproveWorkspace(c.id)}
                            className="bg-emerald-900/60 border border-emerald-800 text-emerald-300 hover:bg-emerald-800 text-[9px] py-1.5 px-2.5 uppercase font-bold rounded-sm transition cursor-pointer"
                          >
                            Approve
                          </button>
                        )}
                        {isAppr && (
                          <button
                            onClick={() => handleRejectWorkspace(c.id)}
                            className="bg-neutral-900 border border-amber-800/60 hover:border-amber-500 text-amber-400 text-[9px] py-1.5 px-2.5 uppercase font-bold rounded-sm transition cursor-pointer"
                          >
                            Reject
                          </button>
                        )}

                        {isDis ? (
                          <button
                            onClick={() => handleEnableWorkspace(c.id)}
                            className="bg-emerald-900/60 border border-emerald-800 text-emerald-300 hover:bg-emerald-800 text-[9px] py-1.5 px-2.5 uppercase font-bold rounded-sm transition cursor-pointer"
                          >
                            Enable Login
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDisableWorkspace(c.id)}
                            className="bg-neutral-900 border border-neutral-800 hover:border-amber-500 hover:text-amber-300 text-neutral-400 text-[9px] py-1.5 px-2.5 uppercase font-bold rounded-sm transition cursor-pointer"
                          >
                            Disable Login
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteWorkspace(c.id)}
                          className="bg-neutral-900 border border-neutral-800 hover:border-red-500 hover:text-red-400 text-neutral-400 text-[9px] py-1.5 px-2.5 uppercase font-bold rounded-sm transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Team Member Email Directory (Placed below) */}
            <div className="bg-[#0c0c0c] border border-neutral-800 p-6 rounded-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-3 gap-3">
                <div>
                  <h3 className="text-xs font-bold text-volt uppercase tracking-wider">// Team Member Email Accounts Directory</h3>
                  <p className="text-[10px] text-neutral-400 mt-0.5">Master approve invited team member emails or disable specific email logins across companies.</p>
                </div>
                <div className="w-full sm:w-64">
                  <input
                    type="text"
                    value={memberSearchQuery}
                    onChange={(e) => setMemberSearchQuery(e.target.value)}
                    placeholder="🔍 Search email or company..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-1.5 text-[10px] text-white focus:outline-none focus:border-volt"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {getAllMembersList().map((m: any) => {
                  const isAppr = m.approved ?? false;
                  const isDis = m.disabled ?? false;

                  return (
                    <div key={`${m.clientId}-${m.email}`} className="bg-neutral-950 border border-neutral-850 p-4 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1 text-left">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-white">{m.email}</h4>
                          {isDis ? (
                            <span className="bg-red-950 text-red-400 border border-red-900 text-[9px] px-2 py-0.5 font-bold uppercase rounded-sm">
                              ● EMAIL DISABLED
                            </span>
                          ) : isAppr ? (
                            <span className="bg-emerald-950 text-emerald-400 border border-emerald-900 text-[9px] px-2 py-0.5 font-bold uppercase rounded-sm">
                              ✓ MASTER APPROVED
                            </span>
                          ) : (
                            <span className="bg-amber-950 text-amber-400 border border-amber-900 text-[9px] px-2 py-0.5 font-bold uppercase rounded-sm animate-pulse">
                              ⏱ PENDING APPROVAL
                            </span>
                          )}
                        </div>
                        <div className="text-[9px] text-neutral-500 uppercase tracking-wider">
                          Workspace: <span className="text-neutral-350">{m.clientName}</span> ({m.clientId})
                        </div>
                      </div>

                      {/* Member Action Controls */}
                      <div className="flex flex-wrap items-center gap-2">
                        {!isAppr && (
                          <button
                            onClick={() => handleMasterApproveMember(m.clientId, m.email)}
                            className="bg-volt text-black hover:bg-white text-[9px] py-1.5 px-3 uppercase font-bold rounded-sm transition cursor-pointer"
                          >
                            Master Approve
                          </button>
                        )}

                        {isDis ? (
                          <button
                            onClick={() => handleEnableMember(m.clientId, m.email)}
                            className="bg-emerald-900/60 border border-emerald-800 text-emerald-300 hover:bg-emerald-800 text-[9px] py-1.5 px-2.5 uppercase font-bold rounded-sm transition cursor-pointer"
                          >
                            Enable Email
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDisableMember(m.clientId, m.email)}
                            className="bg-neutral-900 border border-neutral-800 hover:border-amber-500 hover:text-amber-300 text-neutral-400 text-[9px] py-1.5 px-2.5 uppercase font-bold rounded-sm transition cursor-pointer"
                          >
                            Disable Email
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteMember(m.clientId, m.email)}
                          className="bg-neutral-900 border border-neutral-800 hover:border-red-500 hover:text-red-400 text-neutral-400 text-[9px] py-1.5 px-2.5 uppercase font-bold rounded-sm transition cursor-pointer"
                        >
                          Delete Email
                        </button>
                      </div>
                    </div>
                  );
                })}

                {getAllMembersList().length === 0 && (
                  <div className="text-xs text-neutral-500 italic py-3 text-center">
                    No member email accounts registered yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* UNIFIED COMPANY WORKSPACE MANAGEMENT VIEW MODE */
          <div className="flex-grow p-8 space-y-6 w-full font-mono text-left overflow-y-auto">
            
            {/* Top Workspace Identity & Navigation Banner */}
            <div className="bg-[#0b0b0b] border border-neutral-800 p-6 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-volt text-[10px] font-bold uppercase tracking-widest">
                  <span className="h-2 w-2 bg-volt rounded-full animate-ping" />
                  // COMPANY WORKSPACE DESK
                </div>
                <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-3">
                  <span>{selectedClient.name}</span>
                  <span className="text-xs text-neutral-500 font-normal">({selectedClient.id})</span>
                </h2>
                <p className="text-xs text-neutral-400">
                  Configure checklist items, brand asset requests, milestones, contracts, and team member email approvals for {selectedClient.name}.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewMode("master")}
                  className="bg-neutral-900 border border-neutral-800 hover:border-volt text-neutral-300 hover:text-white text-xs px-3 py-2 uppercase font-bold rounded-sm transition cursor-pointer"
                >
                  ← Return to Master Directory
                </button>
              </div>
            </div>

            {/* Sub-Tabs Selector for Active Company */}
            <div className="flex border-b border-neutral-800 bg-[#0e0e0e] p-1 rounded-t-sm gap-1">
              <button
                onClick={() => setActiveFormTab("requirements")}
                className={`flex-1 text-center py-2.5 text-xs uppercase font-bold tracking-wider rounded-sm transition cursor-pointer ${
                  activeFormTab === "requirements" ? "bg-volt text-black font-extrabold" : "text-neutral-400 hover:text-white"
                }`}
              >
                01 / Checklist & Instructions (Do's & Don'ts)
              </button>

              <button
                onClick={() => setActiveFormTab("progress")}
                className={`flex-1 text-center py-2.5 text-xs uppercase font-bold tracking-wider rounded-sm transition cursor-pointer ${
                  activeFormTab === "progress" ? "bg-volt text-black font-extrabold" : "text-neutral-400 hover:text-white"
                }`}
              >
                02 / Progress & Milestones
              </button>

              <button
                onClick={() => setActiveFormTab("agreements")}
                className={`flex-1 text-center py-2.5 text-xs uppercase font-bold tracking-wider rounded-sm transition cursor-pointer ${
                  activeFormTab === "agreements" ? "bg-volt text-black font-extrabold" : "text-neutral-400 hover:text-white"
                }`}
              >
                03 / Contracts & Vault Docs
              </button>

              <button
                onClick={() => setActiveFormTab("members")}
                className={`flex-1 text-center py-2.5 text-xs uppercase font-bold tracking-wider rounded-sm transition cursor-pointer ${
                  activeFormTab === "members" ? "bg-volt text-black font-extrabold" : "text-neutral-400 hover:text-white"
                }`}
              >
                04 / Team Member Access ({getAllMembersList().filter(m => m && String(m.clientId || "").toLowerCase() === String(selectedClientId || "").toLowerCase()).length})
              </button>
            </div>

            {/* SUB-TAB 1: CHECKLIST & ASSET REQUIREMENTS */}
            {activeFormTab === "requirements" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
                
                {/* Left Column: Active Checklist Toggles */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="bg-[#0c0c0c] border border-neutral-800 p-6 rounded-sm space-y-4">
                    <div className="border-b border-neutral-800 pb-3">
                      <h3 className="text-xs font-bold text-volt uppercase tracking-wider">
                        // Active Checklist & Do's / Don'ts for {selectedClient.name}
                      </h3>
                      <p className="text-[10px] text-neutral-400 mt-0.5">
                        Toggle items to display on {selectedClient.name}'s client dashboard.
                      </p>
                    </div>

                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                      {safeReqs.map((r) => (
                        <div key={r.id} className="py-2.5 border-b border-neutral-900 last:border-b-0">
                          <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2.5 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={r.active}
                                onChange={() => toggleReqActive(r.id)}
                                className="h-4 w-4 bg-neutral-950 border border-neutral-800 text-volt rounded-sm focus:ring-0 cursor-pointer"
                              />
                              <span className={`text-[10px] uppercase tracking-wide font-bold ${r.active ? "text-white" : "text-neutral-500"}`}>
                                {r.label}
                              </span>
                            </label>
                            
                            {(r.id && (r.id.startsWith("req-social-") || r.id.startsWith("req-custom-"))) && (
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
                                SUBMITTED:
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

                    <div className="pt-4 border-t border-neutral-900">
                      <button
                        onClick={resetClientData}
                        className="w-full bg-[#120707] border border-red-950 text-red-500 hover:bg-red-950 hover:text-white text-xs py-2 text-center rounded-sm uppercase font-bold transition cursor-pointer"
                      >
                        ☠ Wipe Workspace Data for {selectedClient.name}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Custom Request Builders */}
                <div className="lg:col-span-6 space-y-6">
                  {/* Add Social Handle Form */}
                  <div className="bg-[#0c0c0c] border border-neutral-800 p-6 rounded-sm space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-3">
                      + Request Social Media Handle for {selectedClient.name}
                    </h3>

                    <form onSubmit={addSocialPlatformReq} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] text-neutral-500 uppercase font-bold block mb-1">
                            Platform
                          </label>
                          <select
                            value={selPlatform}
                            onChange={(e) => setSelPlatform(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-850 px-3 py-1.5 text-xs text-white rounded-sm focus:outline-none focus:border-volt"
                          >
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="X (Twitter)">X (Twitter)</option>
                            <option value="Instagram">Instagram</option>
                            <option value="YouTube">YouTube</option>
                            <option value="TikTok">TikTok</option>
                            <option value="Facebook">Facebook</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[9px] text-neutral-500 uppercase font-bold block mb-1">
                            Account Scope
                          </label>
                          <select
                            value={selSubOption}
                            onChange={(e) => setSelSubOption(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-850 px-3 py-1.5 text-xs text-white rounded-sm focus:outline-none focus:border-volt"
                          >
                            <option value="Personal Profile URL">Personal Profile URL</option>
                            <option value="Business Page URL">Business Page URL</option>
                            <option value="Founder Account URL">Founder Account URL</option>
                            <option value="Company Handle">Company Handle</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          value={socialContext}
                          onChange={(e) => setSocialContext(e.target.value)}
                          placeholder="Optional Notes: e.g. CEO Profile Link"
                          className="w-full bg-neutral-950 border border-neutral-850 px-3 py-1.5 text-xs text-white rounded-sm focus:outline-none focus:border-volt"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-volt text-black hover:bg-white text-xs py-2 uppercase font-bold rounded-sm transition cursor-pointer"
                      >
                        + Add Social Handle Checklist Requirement
                      </button>
                    </form>
                  </div>

                  {/* Add Custom Request Form */}
                  <div className="bg-[#0c0c0c] border border-neutral-800 p-6 rounded-sm space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-3">
                      + Add Custom URL Request (Max 3)
                    </h3>

                    <form onSubmit={addCustomRequirement} className="space-y-3">
                      <div>
                        <input
                          type="text"
                          value={customLabel}
                          onChange={(e) => setCustomLabel(e.target.value)}
                          placeholder="Requirement Label: e.g. Brand Design Deck"
                          disabled={activeCustomsCount >= 3}
                          className="w-full bg-neutral-950 border border-neutral-850 rounded-sm px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt disabled:opacity-50"
                        />
                      </div>
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
              </div>
            )}

            {/* SUB-TAB 2: PROGRESS & MILESTONES ENGINE */}
            {activeFormTab === "progress" && (
              <div className="space-y-6">
                <div className="bg-[#0c0c0c] border border-neutral-800 p-6 rounded-sm space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-3">
                    + Create New Project Milestone for {selectedClient.name}
                  </h3>
                  
                  <form onSubmit={handleCreateMilestone} className="space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={newMilestoneTitle}
                          onChange={(e) => setNewMilestoneTitle(e.target.value)}
                          placeholder="Milestone Title: e.g. Phase 3: Setup & Launch"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-1.5 text-xs text-white focus:outline-none focus:border-volt"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={newMilestonePercent}
                          onChange={(e) => setNewMilestonePercent(Number(e.target.value))}
                          placeholder="%"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-1.5 text-xs text-white focus:outline-none focus:border-volt"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={newMilestoneStatus}
                        onChange={(e) => setNewMilestoneStatus(e.target.value)}
                        placeholder="Description: e.g. Campaign setup underway."
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-1.5 text-xs text-white focus:outline-none focus:border-volt"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-volt text-black hover:bg-white text-xs py-2 uppercase font-bold rounded-sm transition cursor-pointer"
                    >
                      + Add Milestone Stage
                    </button>
                  </form>
                </div>

                {/* Active Milestones List */}
                <div className="bg-[#0c0c0c] border border-neutral-800 p-6 rounded-sm space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-3">
                    Active Milestone Pipeline ({safeMilestones.length})
                  </h3>

                  <div className="space-y-4">
                    {safeMilestones.map((m) => (
                      <div key={m.id} className="bg-neutral-950 border border-neutral-850 p-4 rounded-sm space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white uppercase">{m.title}</span>
                          <button
                            onClick={() => handleDeleteMilestone(m.id)}
                            className="text-[9px] text-flame underline hover:text-white cursor-pointer"
                          >
                            Delete Stage
                          </button>
                        </div>

                        <div className="grid grid-cols-3 gap-3 items-center">
                          <div>
                            <label className="text-[8px] text-neutral-500 uppercase block font-bold">Progress %</label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={m.percentage}
                              onChange={(e) => handleUpdateMilestone(m.id, Number(e.target.value), m.statusText)}
                              className="w-full bg-neutral-900 border border-neutral-800 text-xs text-volt font-bold px-2 py-1 rounded-sm focus:outline-none focus:border-volt"
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="text-[8px] text-neutral-500 uppercase block font-bold">Status Update</label>
                            <input
                              type="text"
                              value={m.statusText}
                              onChange={(e) => handleUpdateMilestone(m.id, m.percentage, e.target.value)}
                              className="w-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 px-2 py-1 rounded-sm focus:outline-none focus:border-volt"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 3: CONTRACTS & VAULT DOCUMENTS */}
            {activeFormTab === "agreements" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
                <div className="lg:col-span-6 space-y-6">
                  <div className="bg-[#0c0c0c] border border-neutral-800 p-6 rounded-sm space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-3">
                      + Share Contract / Agreement for {selectedClient.name}
                    </h3>

                    <form onSubmit={addCorporateAgreement} className="space-y-3">
                      <div>
                        <label className="text-[9px] text-neutral-500 uppercase font-bold block mb-1">
                          Document Title
                        </label>
                        <input
                          type="text"
                          value={newAgreementName}
                          onChange={(e) => setNewAgreementName(e.target.value)}
                          placeholder="Agreement Name: e.g. Master Services Agreement (MSA)"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] text-neutral-500 uppercase font-bold block mb-1">
                          Option 1: Paste Online Document / Drive Link
                        </label>
                        <input
                          type="text"
                          value={newAgreementUrl}
                          onChange={(e) => setNewAgreementUrl(e.target.value)}
                          placeholder="Secure Access URL / Drive Link"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                        />
                      </div>

                      <div className="border-t border-neutral-900 pt-3 space-y-1">
                        <label className="text-[9px] text-volt uppercase font-bold block">
                          Option 2: Upload Local File from Device
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleLocalFileUpload(e, setNewAgreementName, setNewAgreementUrl)}
                          className="w-full text-xs text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-[9px] file:font-bold file:uppercase file:bg-neutral-850 file:text-white hover:file:bg-volt hover:file:text-black cursor-pointer"
                        />
                        {newAgreementUrl.startsWith("data:") && (
                          <div className="text-[9px] text-emerald-400 font-mono mt-1">
                            ✓ Local File Loaded ({newAgreementName})
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-volt text-black hover:bg-white text-xs py-2 uppercase font-bold rounded-sm transition cursor-pointer mt-2"
                      >
                        Publish Agreement Link
                      </button>
                    </form>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-6">
                  <div className="bg-[#0c0c0c] border border-neutral-800 p-6 rounded-sm space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-3">
                      + Share Deliverables File in Vault for {selectedClient.name}
                    </h3>

                    <form onSubmit={addVaultDocument} className="space-y-3">
                      <div>
                        <label className="text-[9px] text-neutral-500 uppercase font-bold block mb-1">
                          File Display Name
                        </label>
                        <input
                          type="text"
                          value={newFileName}
                          onChange={(e) => setNewFileName(e.target.value)}
                          placeholder="File Name: e.g. Campaign_Assets_Blueprint.pdf"
                          className="w-full bg-neutral-950 border border-neutral-805 px-3.5 py-2 text-xs focus:outline-none text-white focus:border-volt"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] text-neutral-500 uppercase font-bold block mb-1">
                          Option 1: Paste Download Link / Cloud URL
                        </label>
                        <input
                          type="text"
                          value={newFileUrl}
                          onChange={(e) => setNewFileUrl(e.target.value)}
                          placeholder="File Access URL"
                          className="w-full bg-neutral-950 border border-neutral-805 px-3.5 py-2 text-xs focus:outline-none text-white focus:border-volt"
                        />
                      </div>

                      <div className="border-t border-neutral-900 pt-3 space-y-1">
                        <label className="text-[9px] text-volt uppercase font-bold block">
                          Option 2: Upload Local File from Device
                        </label>
                        <input
                          type="file"
                          onChange={(e) => handleLocalFileUpload(e, setNewFileName, setNewFileUrl)}
                          className="w-full text-xs text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-[9px] file:font-bold file:uppercase file:bg-neutral-850 file:text-white hover:file:bg-volt hover:file:text-black cursor-pointer"
                        />
                        {newFileUrl.startsWith("data:") && (
                          <div className="text-[9px] text-emerald-400 font-mono mt-1">
                            ✓ Local File Loaded ({newFileName})
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-neutral-900 border border-neutral-800 hover:border-volt text-neutral-300 hover:text-white text-xs py-2 uppercase font-bold rounded-sm transition cursor-pointer text-center mt-2"
                      >
                        Publish Vault File Link
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 4: TEAM MEMBER ACCESS */}
            {activeFormTab === "members" && (
              <div className="bg-[#0c0c0c] border border-neutral-800 p-6 rounded-sm space-y-4">
                <h3 className="text-xs font-bold text-volt uppercase tracking-wider border-b border-neutral-800 pb-3">
                  // Registered Coworkers & Team Members for {selectedClient.name} ({selectedClient.id})
                </h3>

                <div className="space-y-3">
                  {getAllMembersList().filter(m => m && String(m.clientId || "").toLowerCase() === String(selectedClientId || "").toLowerCase()).map((m: any) => {
                    const isAppr = m.approved ?? false;
                    const isDis = m.disabled ?? false;

                    return (
                      <div key={`${m.clientId}-${m.email}`} className="bg-neutral-950 border border-neutral-850 p-4 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1 text-left">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white">{m.email}</h4>
                            {isDis ? (
                              <span className="bg-red-950 text-red-400 border border-red-900 text-[9px] px-2 py-0.5 font-bold uppercase rounded-sm">
                                ● EMAIL DISABLED
                              </span>
                            ) : isAppr ? (
                              <span className="bg-emerald-950 text-emerald-400 border border-emerald-900 text-[9px] px-2 py-0.5 font-bold uppercase rounded-sm">
                                ✓ MASTER APPROVED
                              </span>
                            ) : (
                              <span className="bg-amber-950 text-amber-400 border border-amber-900 text-[9px] px-2 py-0.5 font-bold uppercase rounded-sm animate-pulse">
                                ⏱ PENDING APPROVAL
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {!isAppr && (
                            <button
                              onClick={() => handleMasterApproveMember(m.clientId, m.email)}
                              className="bg-volt text-black hover:bg-white text-[9px] py-1.5 px-3 uppercase font-bold rounded-sm transition cursor-pointer"
                            >
                              Master Approve
                            </button>
                          )}

                          {isDis ? (
                            <button
                              onClick={() => handleEnableMember(m.clientId, m.email)}
                              className="bg-emerald-900/60 border border-emerald-800 text-emerald-300 hover:bg-emerald-800 text-[9px] py-1.5 px-2.5 uppercase font-bold rounded-sm transition cursor-pointer"
                            >
                              Enable Email
                            </button>
                          ) : (
                            <button
                              onClick={() => handleDisableMember(m.clientId, m.email)}
                              className="bg-neutral-900 border border-neutral-800 hover:border-amber-500 hover:text-amber-300 text-neutral-400 text-[9px] py-1.5 px-2.5 uppercase font-bold rounded-sm transition cursor-pointer"
                            >
                              Disable Email
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteMember(m.clientId, m.email)}
                            className="bg-neutral-900 border border-neutral-800 hover:border-red-500 hover:text-red-400 text-neutral-400 text-[9px] py-1.5 px-2.5 uppercase font-bold rounded-sm transition cursor-pointer"
                          >
                            Delete Email
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {getAllMembersList().filter(m => m && String(m.clientId || "").toLowerCase() === String(selectedClientId || "").toLowerCase()).length === 0 && (
                    <div className="text-xs text-neutral-500 italic py-4 text-center">
                      No secondary team members registered under {selectedClient.name} yet.
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}
