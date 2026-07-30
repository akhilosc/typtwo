import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

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
  const [clients, setClients] = useState<Client[]>([]);
  const [allDbClients, setAllDbClients] = useState<any[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>("acme");

  const [adminPasscode, setAdminPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcodeError, setPasscodeError] = useState("");

  // Check sessionStorage on mount
  useEffect(() => {
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

  // Onboard new client form states
  const [onboardId, setOnboardId] = useState("");
  const [onboardName, setOnboardName] = useState("");
  const [onboardDomain, setOnboardDomain] = useState("");
  const [reqs, setReqs] = useState<Requirement[]>([]);
  
  // Tab selector for forms panel (on the right)
  const [activeFormTab, setActiveFormTab] = useState<"requirements" | "progress" | "agreements" | "approvals">("progress");

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
            
            // Only map approved clients to selection list
            const approvedRows = data.filter((d: any) => d.approved === true);
            const mapped: Client[] = approvedRows.map((d: any) => ({
              id: d.id,
              name: d.name,
              email: `@${d.email_domain}`
            }));
            setClients(mapped);
            
            // Set first approved client as default if selected client does not exist in approved list
            if (mapped.length > 0 && !mapped.some(c => c.id === selectedClientId)) {
              setSelectedClientId(mapped[0].id);
            }
            return;
          }
        } catch (err) {
          console.error("Failed to load clients list from Supabase", err);
        }
      }

      // Local storage fallback list
      const storedList = localStorage.getItem("t2_local_clients_list");
      if (storedList) {
        const parsed = JSON.parse(storedList);
        setClients(parsed);
      } else {
        setClients(DEFAULT_CLIENTS);
        localStorage.setItem("t2_local_clients_list", JSON.stringify(DEFAULT_CLIENTS));
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
    const currentClients: Client[] = JSON.parse(localStorage.getItem(localClientsKey) || JSON.stringify(DEFAULT_CLIENTS));
    if (currentClients.some(c => c.id === cleanId)) {
      alert("A client workspace with this ID already exists.");
      return;
    }

    const nextClientsList = [...currentClients, { id: cleanId, name: onboardName.trim(), email: `@${cleanDomain}` }];
    localStorage.setItem(localClientsKey, JSON.stringify(nextClientsList));
    localStorage.setItem(`t2_reqs_${cleanId}`, JSON.stringify([]));
    localStorage.setItem(`t2_milestones_${cleanId}`, JSON.stringify(DEFAULT_MILESTONES));
    
    setNotifyMsg("CLIENT CREATED");
    setTimeout(() => setNotifyMsg(""), 2000);
    setSelectedClientId(cleanId);
    setOnboardId("");
    setOnboardName("");
    setOnboardDomain("");
  };

  // Load client configurations
  useEffect(() => {
    const key = `t2_reqs_${selectedClientId}`;
    const milestonesKey = `t2_milestones_${selectedClientId}`;
    const auditLogsKey = `t2_milestones_audit_${selectedClientId}`;
    
    const loadData = async () => {
      if (isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase
            .from("clients")
            .select("*")
            .eq("id", selectedClientId)
            .single();

          if (data && !error) {
            // Load requirements
            let merged = [...(data.reqs || [])];
            DEFAULT_REQUIREMENTS.forEach((def) => {
              if (!merged.some((m) => m.id === def.id)) {
                merged.push(JSON.parse(JSON.stringify(def)));
              }
            });
            setReqs(merged);

            // Load milestones
            setMilestones(data.milestones && data.milestones.length > 0 ? data.milestones : DEFAULT_MILESTONES);

            // Load audit logs
            setAuditLogs(data.audit_logs || []);
            return;
          }
        } catch (err) {
          console.error("Failed to load client data from Supabase, falling back to localStorage", err);
        }
      }

      // 1. Requirements
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

      // 2. Milestones
      const storedMilestones = localStorage.getItem(milestonesKey);
      if (storedMilestones) {
        setMilestones(JSON.parse(storedMilestones));
      } else {
        setMilestones(DEFAULT_MILESTONES);
        localStorage.setItem(milestonesKey, JSON.stringify(DEFAULT_MILESTONES));
      }

      // 3. Audit Logs
      const storedAudits = localStorage.getItem(auditLogsKey);
      if (storedAudits) {
        setAuditLogs(JSON.parse(storedAudits));
      } else {
        const initialAudit = [{ id: "aud-0", message: "Client milestones database initialized.", timestamp: new Date().toLocaleString() }];
        setAuditLogs(initialAudit);
        localStorage.setItem(auditLogsKey, JSON.stringify(initialAudit));
      }
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

  // Approve a pending workspace registration
  const handleApproveWorkspace = async (clientIdToApprove: string) => {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from("clients")
          .update({ approved: true })
          .eq("id", clientIdToApprove);
        
        if (!error) {
          setNotifyMsg("WORKSPACE APPROVED");
          setTimeout(() => setNotifyMsg(""), 2000);
          return;
        }
        console.error("Supabase approve error", error);
      } catch (err) {
        console.error(err);
      }
    }

    // Local storage fallback
    localStorage.setItem(`t2_approved_${clientIdToApprove}`, "true");
    
    // Auto approve in local list
    const localClientsKey = "t2_local_clients_list";
    const currentList = JSON.parse(localStorage.getItem(localClientsKey) || "[]");
    const updatedList = currentList.map((c: any) => 
      c.id === clientIdToApprove ? { ...c, approved: true } : c
    );
    localStorage.setItem(localClientsKey, JSON.stringify(updatedList));

    setNotifyMsg("WORKSPACE APPROVED");
    setTimeout(() => setNotifyMsg(""), 2000);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
  };

  // Deny/Delete pending workspace registration
  const handleDenyWorkspace = async (clientIdToDeny: string) => {
    if (!window.confirm(`Are you sure you want to reject and delete client workspace "${clientIdToDeny}"?`)) return;

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from("clients")
          .delete()
          .eq("id", clientIdToDeny);
        
        if (!error) {
          setNotifyMsg("WORKSPACE REJECTED");
          setTimeout(() => setNotifyMsg(""), 2000);
          return;
        }
        console.error("Supabase delete error", error);
      } catch (err) {
        console.error(err);
      }
    }

    // Local storage fallback
    const localClientsKey = "t2_local_clients_list";
    const currentList = JSON.parse(localStorage.getItem(localClientsKey) || "[]");
    const updatedList = currentList.filter((c: any) => c.id !== clientIdToDeny);
    localStorage.setItem(localClientsKey, JSON.stringify(updatedList));
    
    localStorage.removeItem(`t2_reqs_${clientIdToDeny}`);
    localStorage.removeItem(`t2_milestones_${clientIdToDeny}`);
    localStorage.removeItem(`t2_milestones_audit_${clientIdToDeny}`);
    localStorage.removeItem(`t2_approved_${clientIdToDeny}`);

    setNotifyMsg("WORKSPACE REJECTED");
    setTimeout(() => setNotifyMsg(""), 2000);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
  };

  // Approve coworker access request
  const handleApproveMember = async (targetClientId: string, memberEmail: string) => {
    if (isSupabaseConfigured()) {
      try {
        const { data } = await supabase
          .from("clients")
          .select("members")
          .eq("id", targetClientId)
          .single();

        const current = data?.members || [];
        const updated = current.map((m: any) => 
          m.email === memberEmail ? { ...m, approved: true } : m
        );

        const { error } = await supabase
          .from("clients")
          .update({ members: updated })
          .eq("id", targetClientId);

        if (!error) {
          setNotifyMsg("MEMBER GRANTED ACCESS");
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
      m.email === memberEmail ? { ...m, approved: true } : m
    );
    localStorage.setItem(key, JSON.stringify(updated));

    setNotifyMsg("MEMBER APPROVED");
    setTimeout(() => setNotifyMsg(""), 2000);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
  };

  // Deny access/Delete coworker request
  const handleDenyMember = async (targetClientId: string, memberEmail: string) => {
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
          setNotifyMsg("MEMBER REJECTED");
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

    setNotifyMsg("MEMBER REJECTED");
    setTimeout(() => setNotifyMsg(""), 2000);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
  };

  const getPendingWorkspaces = () => {
    if (isSupabaseConfigured()) {
      return allDbClients.filter(c => !c.approved);
    }
    // Local storage
    const storedList = localStorage.getItem("t2_local_clients_list");
    if (!storedList) return [];
    const parsed = JSON.parse(storedList);
    return parsed.filter((c: any) => localStorage.getItem(`t2_approved_${c.id}`) !== "true" && c.id !== "acme" && c.id !== "startuptalky" && c.id !== "bitbns");
  };

  const getPendingMembers = () => {
    if (isSupabaseConfigured()) {
      return allDbClients.flatMap(c => (c.members || []).map((m: any) => ({ ...m, clientId: c.id, clientName: c.name })).filter((m: any) => !m.approved));
    }
    // Local storage keys
    const storedList = localStorage.getItem("t2_local_clients_list");
    if (!storedList) return [];
    const parsed = JSON.parse(storedList);
    return parsed.flatMap((c: any) => {
      const key = `t2_members_${c.id}`;
      const list = JSON.parse(localStorage.getItem(key) || "[]");
      return list.filter((m: any) => !m.approved).map((m: any) => ({ ...m, clientId: c.id, clientName: c.name }));
    });
  };

  const pendingWorkspacesList = getPendingWorkspaces();
  const pendingMembersList = getPendingMembers();
  const totalPending = pendingWorkspacesList.length + pendingMembersList.length;

  const selectedClient = clients.find(c => c.id === selectedClientId) || clients[0] || { id: "loading", name: "Loading Workspace...", email: "" };
  const activeCustomsCount = reqs.filter(r => r.id.startsWith("req-custom-")).length;

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
      {/* Sidebar: Client Selector */}
      <aside className="w-64 border-r border-neutral-800 bg-[#0e0e0e] flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-6">
          <div>
            <Link to="/" className="flex items-center gap-2 pb-5 border-b border-neutral-800 mb-8">
              <span className="h-2 w-2 bg-flame rounded-full blink" />
              <span className="font-bold text-sm tracking-wider text-white uppercase">TYPTWO CONSOLE</span>
            </Link>

            <span className="text-[9px] text-neutral-500 uppercase tracking-widest block mb-4 font-bold">// Select Client Workspace</span>
            <nav className="space-y-1 max-h-[180px] overflow-y-auto pr-1">
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
              {clients.length === 0 && (
                <div className="text-[10px] text-neutral-500 italic py-2">No active clients found.</div>
              )}
            </nav>
          </div>

          {/* Onboard New Client Form */}
          <div className="pt-6 border-t border-neutral-800">
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

        <div className="text-[9px] text-neutral-500 uppercase">
          Ops Desk v2.5
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
          
          {/* Column 1: Config Toggles & Checklist (Left Side) */}
          <div className="lg:col-span-5 space-y-6">
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
                        <span className={`text-[10px] uppercase tracking-wide font-bold ${r.active ? "text-white" : "text-neutral-500"}`}>
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
          <div className="lg:col-span-7 space-y-4">
            
            {/* Header Tabs Navigation */}
            <div className="flex border-b border-neutral-800 bg-[#0e0e0e] p-1 rounded-t-sm gap-1">
              <button
                onClick={() => setActiveFormTab("progress")}
                className={`flex-1 text-center py-2 text-[10px] uppercase font-bold tracking-wider rounded-sm transition cursor-pointer ${
                  activeFormTab === "progress" ? "bg-volt text-black font-extrabold" : "text-neutral-400 hover:text-white"
                }`}
              >
                Milestones Engine
              </button>

              <button
                onClick={() => setActiveFormTab("requirements")}
                className={`flex-1 text-center py-2 text-[10px] uppercase font-bold tracking-wider rounded-sm transition cursor-pointer ${
                  activeFormTab === "requirements" ? "bg-volt text-black font-extrabold" : "text-neutral-400 hover:text-white"
                }`}
              >
                Asset Req Builder
              </button>
              
              <button
                onClick={() => setActiveFormTab("agreements")}
                className={`flex-1 text-center py-2 text-[10px] uppercase font-bold tracking-wider rounded-sm transition cursor-pointer ${
                  activeFormTab === "agreements" ? "bg-volt text-black font-extrabold" : "text-neutral-400 hover:text-white"
                }`}
              >
                Contracts & Vault
              </button>

              <button
                onClick={() => setActiveFormTab("approvals")}
                className={`flex-1 text-center py-2 text-[10px] uppercase font-bold tracking-wider rounded-sm transition cursor-pointer relative ${
                  activeFormTab === "approvals" ? "bg-volt text-black font-extrabold" : "text-neutral-400 hover:text-white"
                }`}
              >
                Approvals Center
                {totalPending > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-flame rounded-full animate-ping" />
                )}
              </button>
            </div>

            {/* TAB 1: Milestones Engine */}
            {activeFormTab === "progress" && (
              <div className="space-y-6">
                
                {/* 1. Add New Milestone Form */}
                <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-neutral-800 pb-2">
                    + Create New Project Milestone
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
                          placeholder="Progress %"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-1.5 text-xs text-white focus:outline-none focus:border-volt font-bold"
                        />
                      </div>
                    </div>

                    <input
                      type="text"
                      value={newMilestoneStatus}
                      onChange={(e) => setNewMilestoneStatus(e.target.value)}
                      placeholder="Status Description (e.g. Configuring campaign assets)"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-1.5 text-xs text-white focus:outline-none focus:border-volt"
                    />

                    <button
                      type="submit"
                      className="w-full bg-volt text-black hover:bg-white text-xs py-2 uppercase font-bold rounded-sm transition cursor-pointer"
                    >
                      Publish New Milestone →
                    </button>
                  </form>
                </div>

                {/* 2. Manage & Edit Existing Milestones */}
                <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-2">
                    Active Milestones & Deliverables Panel
                  </h3>

                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                    {milestones.map((m) => (
                      <div key={m.id} className="p-4 bg-neutral-950 border border-neutral-800 rounded-sm space-y-3">
                        <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                          <span className="text-xs text-white font-bold uppercase truncate">{m.title}</span>
                          <button
                            onClick={() => handleDeleteMilestone(m.id)}
                            className="text-[9px] text-flame underline hover:text-white cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>

                        {/* Inline editor inputs */}
                        <div className="grid grid-cols-12 gap-3 items-center">
                          <div className="col-span-8 flex items-center gap-2">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={m.percentage}
                              onChange={(e) => handleUpdateMilestone(m.id, Number(e.target.value), m.statusText)}
                              className="w-full accent-volt h-1 bg-neutral-900 rounded-sm cursor-pointer"
                            />
                            <span className="text-xs text-volt font-bold w-8 text-right">{m.percentage}%</span>
                          </div>
                          
                          <div className="col-span-4 text-right text-[8px] text-neutral-500 font-bold uppercase truncate">
                            Update: {m.updatedAt.split(',')[0]}
                          </div>
                        </div>

                        <div>
                          <input
                            type="text"
                            value={m.statusText}
                            onChange={(e) => handleUpdateMilestone(m.id, m.percentage, e.target.value)}
                            placeholder="Milestone description updates..."
                            className="w-full bg-[#0a0a0a] border border-neutral-900 text-xs px-2 py-1 text-neutral-300 rounded-sm focus:outline-none focus:border-volt"
                          />
                        </div>

                        {/* Deliverables posted to this milestone */}
                        <div className="space-y-1 bg-neutral-900/60 p-2.5 rounded-sm border border-neutral-900">
                          <span className="text-[8px] text-neutral-500 font-bold uppercase block mb-1">Attached Milestone Deliverables:</span>
                          {m.deliverables.map((del, delIdx) => (
                            <div key={delIdx} className="flex justify-between items-center text-[10px] text-neutral-300">
                              <span className="truncate pr-4">📄 {del.name} ({del.url.substring(0, 20)}...)</span>
                              <button
                                onClick={() => handleDeleteMilestoneDeliverable(m.id, delIdx)}
                                className="text-[8px] text-red-500 hover:text-white cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          
                          {m.deliverables.length === 0 && (
                            <span className="text-[9px] text-neutral-600 block italic">No deliverables linked yet.</span>
                          )}

                          {/* Deliverable posting trigger inline */}
                          <div className="pt-2 border-t border-neutral-900 mt-2">
                            {activeMilestoneAttachmentId === m.id ? (
                              <form onSubmit={handleAddMilestoneDeliverable} className="space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                  <input
                                    type="text"
                                    placeholder="Doc Name"
                                    value={attachedDocName}
                                    onChange={(e) => setAttachedDocName(e.target.value)}
                                    className="bg-neutral-950 border border-neutral-850 px-2 py-1 text-[10px] text-white rounded-sm focus:outline-none"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Doc Access URL / Link"
                                    value={attachedDocUrl}
                                    onChange={(e) => setAttachedDocUrl(e.target.value)}
                                    className="bg-neutral-950 border border-neutral-850 px-2 py-1 text-[10px] text-white rounded-sm focus:outline-none"
                                  />
                                </div>
                                <div className="space-y-1 bg-[#0a0a0a] p-1.5 rounded-sm border border-neutral-900">
                                  <label className="text-[8px] text-neutral-500 uppercase font-bold block">
                                    OR Upload Local File from Device
                                  </label>
                                  <input
                                    type="file"
                                    onChange={(e) => handleLocalFileUpload(e, setAttachedDocName, setAttachedDocUrl)}
                                    className="text-[9px] text-neutral-400 file:mr-2 file:py-1 file:px-2 file:rounded-sm file:border-0 file:text-[9px] file:font-bold file:bg-neutral-900 file:text-neutral-350 hover:file:bg-neutral-800 cursor-pointer"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    type="submit"
                                    className="flex-1 bg-volt text-black text-[9px] py-1 font-bold rounded-sm cursor-pointer hover:bg-white"
                                  >
                                    Attach Link
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setActiveMilestoneAttachmentId(null)}
                                    className="bg-neutral-800 text-neutral-400 text-[9px] py-1 px-2.5 rounded-sm cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </form>
                            ) : (
                              <button
                                onClick={() => {
                                  setActiveMilestoneAttachmentId(m.id);
                                  setAttachedDocName("");
                                  setAttachedDocUrl("");
                                }}
                                className="text-[9px] text-volt hover:text-white underline font-bold cursor-pointer"
                              >
                                + Post Deliverable / URL Link directly to this Milestone
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Terminal Audit log feed trail */}
                <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-b border-neutral-800 pb-2">
                    Milestones History & Audit trail
                  </h3>
                  <div className="bg-neutral-950 border border-neutral-900 p-4 rounded-sm max-h-[150px] overflow-y-auto space-y-1.5">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="text-[10px] font-mono text-neutral-400 leading-normal">
                        <span className="text-neutral-600 font-bold">[{log.timestamp.split(',')[1]?.trim() || log.timestamp}]</span>{" "}
                        <span className="text-volt font-bold">&gt;&gt;</span> {log.message}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: Asset Requirements Builder */}
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
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={newAgreementUrl}
                        onChange={(e) => setNewAgreementUrl(e.target.value)}
                        placeholder="Secure Agreement Link / Access URL"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3.5 py-2 text-xs text-white focus:outline-none focus:border-volt"
                      />
                    </div>
                    <div className="space-y-1.5 bg-[#0a0a0a] p-2.5 rounded-sm border border-neutral-900">
                      <label className="text-[9px] text-neutral-500 uppercase font-bold block">
                        OR Upload Local File from Device
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleLocalFileUpload(e, setNewAgreementName, setNewAgreementUrl)}
                        className="text-[10px] text-neutral-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-sm file:border-0 file:text-[9px] file:font-bold file:bg-neutral-900 file:text-neutral-300 hover:file:bg-neutral-800 cursor-pointer"
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
                        className="w-full bg-neutral-950 border border-neutral-805 px-3.5 py-2 text-xs focus:outline-none text-white focus:border-volt"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={newFileUrl}
                        onChange={(e) => setNewFileUrl(e.target.value)}
                        placeholder="File Access Link / Access URL"
                        className="w-full bg-neutral-950 border border-neutral-805 px-3.5 py-2 text-xs focus:outline-none text-white focus:border-volt"
                      />
                    </div>
                    <div className="space-y-1.5 bg-[#0a0a0a] p-2.5 rounded-sm border border-neutral-900">
                      <label className="text-[9px] text-neutral-500 uppercase font-bold block">
                        OR Upload Local File from Device
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleLocalFileUpload(e, setNewFileName, setNewFileUrl)}
                        className="text-[10px] text-neutral-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-sm file:border-0 file:text-[9px] file:font-bold file:bg-neutral-900 file:text-neutral-300 hover:file:bg-neutral-800 cursor-pointer"
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

            {/* TAB 4: Approvals Center */}
            {activeFormTab === "approvals" && (
              <div className="space-y-6">
                {/* 1. Pending Workspace Registrations */}
                <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
                  <h3 className="text-xs font-bold text-volt uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2 flex items-center justify-between">
                    <span>// Pending Workspace Approvals</span>
                    <span className="bg-volt/10 text-volt px-2 py-0.5 rounded-sm text-[9px] font-bold">
                      {pendingWorkspacesList.length} PENDING
                    </span>
                  </h3>

                  <div className="space-y-3">
                    {pendingWorkspacesList.map((clientRow: any) => (
                      <div key={clientRow.id} className="bg-neutral-950 border border-neutral-900 p-4 rounded-sm flex items-center justify-between">
                        <div className="space-y-1 text-left">
                          <h4 className="text-xs font-bold text-white uppercase">{clientRow.name}</h4>
                          <div className="text-[9px] text-neutral-500 uppercase tracking-wider">
                            Workspace: <span className="text-neutral-350">{clientRow.id}</span> | Domain: <span className="text-neutral-350">{clientRow.email_domain}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproveWorkspace(clientRow.id)}
                            className="bg-volt text-black hover:bg-white text-[10px] py-1.5 px-3 uppercase font-bold rounded-sm transition cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleDenyWorkspace(clientRow.id)}
                            className="bg-neutral-900 border border-neutral-800 hover:border-red-500 hover:text-white text-neutral-400 text-[10px] py-1.5 px-3 uppercase font-bold rounded-sm transition cursor-pointer"
                          >
                            Deny
                          </button>
                        </div>
                      </div>
                    ))}

                    {pendingWorkspacesList.length === 0 && (
                      <div className="text-xs text-neutral-500 italic py-3 text-center">
                        No pending client workspace registrations.
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Pending Member Invitations */}
                <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm">
                  <h3 className="text-xs font-bold text-volt uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2 flex items-center justify-between">
                    <span>// Pending Team Member Invites</span>
                    <span className="bg-volt/10 text-volt px-2 py-0.5 rounded-sm text-[9px] font-bold">
                      {pendingMembersList.length} PENDING
                    </span>
                  </h3>

                  <div className="space-y-3">
                    {pendingMembersList.map((m: any) => (
                      <div key={`${m.clientId}-${m.email}`} className="bg-neutral-950 border border-neutral-900 p-4 rounded-sm flex items-center justify-between">
                        <div className="space-y-1 text-left">
                          <h4 className="text-xs font-bold text-white">{m.email}</h4>
                          <div className="text-[9px] text-neutral-500 uppercase tracking-wider">
                            Company: <span className="text-neutral-350">{m.clientName}</span> ({m.clientId})
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproveMember(m.clientId, m.email)}
                            className="bg-volt text-black hover:bg-white text-[10px] py-1.5 px-3 uppercase font-bold rounded-sm transition cursor-pointer"
                          >
                            Grant Access
                          </button>
                          <button
                            onClick={() => handleDenyMember(m.clientId, m.email)}
                            className="bg-neutral-900 border border-neutral-800 hover:border-red-500 hover:text-white text-neutral-400 text-[10px] py-1.5 px-3 uppercase font-bold rounded-sm transition cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}

                    {pendingMembersList.length === 0 && (
                      <div className="text-xs text-neutral-500 italic py-3 text-center">
                        No pending coworker access requests.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </main>
    </div>
  );
}
