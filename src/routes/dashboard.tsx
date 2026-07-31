import { Component, ReactNode, useState, useEffect } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class DashboardErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Dashboard caught render error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070707] text-white flex items-center justify-center p-6 font-mono">
          <div className="bg-[#0b0b0b] border border-volt/50 p-8 rounded-sm max-w-xl w-full text-left space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-volt font-bold uppercase text-xs">
              <span className="h-2.5 w-2.5 bg-volt rounded-full animate-ping" />
              // CLIENT WORKSPACE HANDSHAKE
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Workspace Session Handshake</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Your client profile has been registered. You can enter your workspace dashboard or sign in again.
            </p>
            {this.state.error && (
              <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-sm text-[10px] text-red-400 font-mono overflow-x-auto">
                {this.state.error.toString()}
              </div>
            )}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.href = "/dashboard";
                }}
                className="bg-volt text-black font-extrabold text-xs px-5 py-3 uppercase rounded-sm hover:bg-white transition cursor-pointer"
              >
                ↻ Enter Portal Dashboard
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("t2_session");
                  localStorage.removeItem("t2_client_id");
                  window.location.href = "/login";
                }}
                className="border border-neutral-800 text-neutral-400 font-bold text-xs px-4 py-3 uppercase rounded-sm hover:text-white hover:border-volt transition cursor-pointer"
              >
                Reset Session & Sign In
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function DashboardPageWrapper() {
  return (
    <DashboardErrorBoundary>
      <DashboardPage />
    </DashboardErrorBoundary>
  );
}

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Client Workspace — Typtwo" },
      { name: "description", content: "Client Operations Center and Secure Deliverables Vault" }
    ]
  }),
  component: DashboardPageWrapper
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

interface AgreementDoc {
  name: string;
  date: string;
}

interface Invoice {
  id: string;
  title: string;
  amount: string;
  issueDate: string;
  dueDate: string;
  status: "Paid" | "Pending" | "Processing";
  paidDate?: string;
  invoiceFile?: {
    name: string;
    url: string;
  };
  receiptFile?: {
    name: string;
    url: string;
  };
  notes?: string;
}

interface ProjectProgress {
  percentage: number;
  phase: string;
  statusText: string;
}

const DEFAULT_AGREEMENTS: AgreementDoc[] = [
  { name: "Master Services Agreement (MSA) - Signed.pdf", date: "Initial Onboarding" },
  { name: "Non-Disclosure Agreement (NDA) - Executed.pdf", date: "Initial Onboarding" }
];

const DEFAULT_PROGRESS: ProjectProgress = {
  percentage: 65,
  phase: "Phase 2: Strategy Development",
  statusText: "Auditing current assets and configuring targeted growth pipelines."
};

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
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [clientId, setClientId] = useState("");
  const [activeTab, setActiveTab] = useState<"requirements" | "vault" | "agreements" | "feed" | "billing">("requirements");
  
  // Dynamic client states loaded from localStorage
  const [reqs, setReqs] = useState<Requirement[]>([]);
  const [statuses, setStatuses] = useState<StatusUpdate[]>([]);
  const [files, setFiles] = useState<VaultFile[]>([]);
  const [agreements, setAgreements] = useState<AgreementDoc[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [auditLogs, setAuditLogs] = useState<MilestoneAuditLog[]>([]);
  const [approved, setApproved] = useState<boolean>(true);
  const [members, setMembers] = useState<any[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [notifyMsg, setNotifyMsg] = useState("");

  // Input states for each requirement
  const [inputVals, setInputVals] = useState<Record<string, string>>({});
  
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined") return;

    const session = localStorage.getItem("t2_session");
    if (!session) {
      navigate({ to: "/login" });
      return;
    }

    const userEmail = localStorage.getItem("t2_user_email") || "client@company.com";
    const userCompany = localStorage.getItem("t2_user_company") || "Corporate Partner";
    
    // Determine dynamic client identification key
    const id = localStorage.getItem("t2_client_id") || "acme";

    setEmail(userEmail);
    setCompany(userCompany);
    setClientId(id);

    const reqKey = `t2_reqs_${id}`;
    const statusKey = `t2_statuses_${id}`;
    const filesKey = `t2_files_${id}`;
    const agreementsKey = `t2_agreements_${id}`;
    const milestonesKey = `t2_milestones_${id}`;
    const auditLogsKey = `t2_milestones_audit_${id}`;

    const parseJsonArray = (input: any): any[] => {
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

    const loadData = async () => {
      if (isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase
            .from("clients")
            .select("*")
            .eq("id", id)
            .single();

          if (data && !error) {
            const rawReqs = parseJsonArray(data.reqs);
            let merged = rawReqs.filter((m: any) => typeof m === "object" && m !== null);
            
            DEFAULT_REQUIREMENTS.forEach((def) => {
              if (!merged.some((m: any) => m.id === def.id)) {
                merged.push(JSON.parse(JSON.stringify(def)));
              }
            });
            setReqs(merged);

            const vals: Record<string, string> = {};
            merged.forEach((r: any) => {
              if (r && r.id) {
                vals[r.id] = r.value || "";
              }
            });
            setInputVals(vals);

            // Load statuses, files, agreements, milestones, approvals
            const rawStatuses = parseJsonArray(data.statuses);
            setStatuses(rawStatuses.length > 0 ? rawStatuses : DEFAULT_STATUSES);

            const rawFiles = parseJsonArray(data.files);
            setFiles(rawFiles.length > 0 ? rawFiles : DEFAULT_FILES);

            const rawAgreements = parseJsonArray(data.agreements);
            setAgreements(rawAgreements.length > 0 ? rawAgreements : DEFAULT_AGREEMENTS);

            const sysApproval = rawReqs.find((r: any) => r && r.id === "sys-approval");
            const rawAudits = parseJsonArray(data.audit_logs);
            const isApprovedInDb = sysApproval ? sysApproval.approved === true : rawAudits.some((a: any) => a && typeof a.message === "string" && a.message.includes("Master Approved"));
            setApproved(isApprovedInDb);

            setMembers(parseJsonArray(data.members));

            const rawMilestones = parseJsonArray(data.milestones);
            setMilestones(rawMilestones.length > 0 ? rawMilestones : [
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
            ]);

            setAuditLogs(rawAudits.length > 0 ? rawAudits : [{ id: "aud-0", message: "Client milestones database initialized.", timestamp: new Date().toLocaleString() }]);
            setInvoices(parseJsonArray(data.invoices));
            return;
          }
        } catch (err) {
          console.error("Failed to load client data from Supabase, falling back to localStorage", err);
        }
      }

      // 1. Load requirements
      const storedReqs = localStorage.getItem(reqKey);
      let currentReqs: Requirement[] = [];
      if (storedReqs) {
        const parsed: Requirement[] = JSON.parse(storedReqs);
        const merged = [...parsed];
        DEFAULT_REQUIREMENTS.forEach((def) => {
          if (!merged.some((m) => m.id === def.id)) {
            merged.push(JSON.parse(JSON.stringify(def)));
          }
        });
        currentReqs = merged;
        localStorage.setItem(reqKey, JSON.stringify(merged));
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
      const storedStatuses = localStorage.getItem(statusKey);
      if (storedStatuses) {
        setStatuses(JSON.parse(storedStatuses));
      } else {
        setStatuses(DEFAULT_STATUSES);
        localStorage.setItem(statusKey, JSON.stringify(DEFAULT_STATUSES));
      }

      // 3. Load files
      const storedFiles = localStorage.getItem(filesKey);
      if (storedFiles) {
        setFiles(JSON.parse(storedFiles));
      } else {
        setFiles(DEFAULT_FILES);
        localStorage.setItem(filesKey, JSON.stringify(DEFAULT_FILES));
      }

      // 4. Load Agreements
      const storedAgreements = localStorage.getItem(agreementsKey);
      if (storedAgreements) {
        setAgreements(JSON.parse(storedAgreements));
      } else {
        setAgreements(DEFAULT_AGREEMENTS);
        localStorage.setItem(agreementsKey, JSON.stringify(DEFAULT_AGREEMENTS));
      }

      // 5. Load Project Milestones & Audit logs
      const storedMilestones = localStorage.getItem(milestonesKey);
      if (storedMilestones) {
        setMilestones(JSON.parse(storedMilestones));
      } else {
        const defaultM: Milestone[] = [
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
        setMilestones(defaultM);
        localStorage.setItem(milestonesKey, JSON.stringify(defaultM));
      }

      const storedAudits = localStorage.getItem(auditLogsKey);
      if (storedAudits) {
        setAuditLogs(JSON.parse(storedAudits));
      } else {
        const initialAudit = [{ id: "aud-0", message: "Client milestones database initialized.", timestamp: new Date().toLocaleString() }];
        setAuditLogs(initialAudit);
        localStorage.setItem(auditLogsKey, JSON.stringify(initialAudit));
      }

      // 6. Load local approvals and coworker members list
      const isApproved = localStorage.getItem(`t2_approved_${id}`) !== "false";
      setApproved(isApproved);

      const storedMembers = localStorage.getItem(`t2_members_${id}`);
      if (storedMembers) {
        setMembers(JSON.parse(storedMembers));
      } else {
        setMembers([]);
        localStorage.setItem(`t2_members_${id}`, JSON.stringify([]));
      }

      // 7. Load local invoices
      const storedInvoices = localStorage.getItem(`t2_invoices_${id}`);
      if (storedInvoices) {
        setInvoices(JSON.parse(storedInvoices));
      } else {
        setInvoices([]);
      }
    };

    loadData();

    // Subscribe to realtime database updates
    let channel: any;
    if (isSupabaseConfigured()) {
      channel = supabase
        .channel(`dashboard_clients_${id}`)
        .on("postgres_changes", { event: "*", schema: "public", table: "clients", filter: `id=eq.${id}` }, () => {
          loadData();
        })
        .subscribe();
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

      const freshAgreements = localStorage.getItem(agreementsKey);
      if (freshAgreements) setAgreements(JSON.parse(freshAgreements));

      const freshMilestones = localStorage.getItem(milestonesKey);
      if (freshMilestones) setMilestones(JSON.parse(freshMilestones));

      const freshAudits = localStorage.getItem(auditLogsKey);
      if (freshAudits) setAuditLogs(JSON.parse(freshAudits));
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("t2_storage_update", handleStorageChange);
    
    return () => {
      if (channel) supabase.removeChannel(channel);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("t2_storage_update", handleStorageChange);
    };
  }, [navigate, clientId]);

  const handleLogout = () => {
    localStorage.removeItem("t2_session");
    localStorage.removeItem("t2_user_email");
    localStorage.removeItem("t2_user_company");
    localStorage.removeItem("t2_client_id");
    sessionStorage.clear();
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
    navigate({ to: "/login" });
  };

  const handleInputChange = (id: string, val: string) => {
    setInputVals((prev) => ({ ...prev, [id]: val }));
  };

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember = {
      email: inviteEmail.trim(),
      role: "Member",
      invitedAt: new Date().toLocaleDateString(),
      status: "Pending Verification"
    };

    const updatedMembers = [...members, newMember];
    setMembers(updatedMembers);
    setInviteEmail("");
    setNotifyMsg("INVITATION SENT FOR REVIEW");
    setTimeout(() => setNotifyMsg(""), 3000);

    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from("clients")
          .update({ members: updatedMembers })
          .eq("id", clientId);
      } catch (err) {
        console.error(err);
      }
    }

    localStorage.setItem(`t2_members_${clientId}`, JSON.stringify(updatedMembers));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
  };

  // Submit individual requirement
  const submitRequirement = async (id: string) => {
    const value = inputVals[id] || "";
    if (!value.trim()) {
      alert("Please fill in the input box before submitting.");
      return;
    }

    const updated = reqs.map((r) => 
      r.id === id ? { ...r, submitted: true, value } : r
    );

    setReqs(updated);

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from("clients")
          .update({ reqs: updated })
          .eq("id", clientId);
        
        if (!error) {
          alert("Requirement submitted to the Typtwo Operations Desk.");
          return;
        }
        console.error("Supabase requirement submit error", error);
      } catch (err) {
        console.error(err);
      }
    }

    localStorage.setItem(`t2_reqs_${clientId}`, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
    alert("Requirement submitted to the Typtwo Operations Desk.");
  };

  const safeReqs = (Array.isArray(reqs) ? reqs : []).filter(r => r && typeof r === "object");
  const safeFiles = (Array.isArray(files) ? files : []).filter(f => f && typeof f === "object");
  const safeAgreements = (Array.isArray(agreements) ? agreements : []).filter(a => a && typeof a === "object");
  const safeStatuses = (Array.isArray(statuses) ? statuses : []).filter(s => s && typeof s === "object");
  const safeInvoices = (Array.isArray(invoices) ? invoices : []).filter(i => i && typeof i === "object");
  const safeMilestones = (Array.isArray(milestones) ? milestones : []).filter(m => m && typeof m === "object");
  const safeAuditLogs = (Array.isArray(auditLogs) ? auditLogs : []).filter(a => a && typeof a === "object");

  const isVaultActive = safeReqs.find(r => r.id === "req-vault")?.active ?? true;
  const isStatusActive = safeReqs.find(r => r.id === "req-status-feed")?.active ?? true;
  const activeInputReqs = safeReqs.filter(r => r.active === true && r.type && r.type !== "boolean");

  if (!isMounted) {
    return (
      <div className="flex min-h-screen bg-[#070707] text-neutral-100 font-mono items-center justify-center p-4">
        <div className="flex items-center gap-3 bg-[#0b0b0b] border border-neutral-800 p-6 rounded-sm">
          <span className="h-2 w-2 bg-volt rounded-full animate-ping" />
          <span className="text-xs uppercase tracking-widest text-neutral-300 font-bold">
            Initializing Typtwo Workspace Node...
          </span>
        </div>
      </div>
    );
  }

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

            <button
              onClick={() => setActiveTab("agreements")}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wider rounded-sm transition cursor-pointer font-bold ${
                activeTab === "agreements" 
                  ? "bg-volt text-black" 
                  : "text-neutral-400 hover:bg-neutral-950 hover:text-white"
              }`}
            >
              <span>03 / Agreements</span>
              <span className="text-[9px] opacity-75">[{agreements.length}]</span>
            </button>

            {isStatusActive && (
              <button
                onClick={() => setActiveTab("feed")}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wider rounded-sm transition cursor-pointer font-bold ${
                  activeTab === "feed" 
                    ? "bg-volt text-black" 
                    : "text-neutral-400 hover:bg-neutral-950 hover:text-white"
                }`}
              >
                <span>04 / Operations Feed</span>
                <span className="text-[9px] opacity-75">● Live</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab("billing")}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wider rounded-sm transition cursor-pointer font-bold ${
                activeTab === "billing" 
                  ? "bg-volt text-black" 
                  : "text-neutral-400 hover:bg-neutral-950 hover:text-white"
              }`}
            >
              <span>05 / Billing & Invoices</span>
              <span className="text-[9px] opacity-75">[{invoices.length}]</span>
            </button>
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
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-[10px] text-neutral-400">
              SYSTEM_SECURE // TLS_1.3_ACTIVE
            </div>
            <button
              onClick={handleLogout}
              className="bg-neutral-900 border border-neutral-800 hover:border-red-500/80 hover:text-red-400 text-neutral-300 text-xs px-3 py-1.5 text-center transition cursor-pointer uppercase font-bold rounded-sm"
            >
              ← Exit / Logout
            </button>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-grow p-8 overflow-y-auto max-w-5xl w-full space-y-8">
          
          {!approved ? (
            <div className="max-w-2xl mx-auto py-12 space-y-8 text-left">
              {/* Glowing Clearance Banner */}
              <div className="bg-[#0b0b0b] border-2 border-flame/40 p-6 rounded-sm text-left space-y-4 shadow-[0_0_15px_rgba(255,100,0,0.05)] relative overflow-hidden">
                <div className="absolute top-0 right-0 h-16 w-16 bg-flame/5 rounded-full blur-xl translate-x-4 -translate-y-4" />
                
                <div className="flex items-center gap-2 text-flame text-[10px] font-bold uppercase tracking-widest font-mono">
                  <span className="h-2 w-2 bg-flame rounded-full animate-ping" />
                  // STATUS: AWAITING_OPERATIONAL_HANDSHAKE
                </div>

                <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                  Operational Access Restricted
                </h2>

                <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                  Your custom client workspace registration has been successfully created. However, full dashboard modules and campaign operations are restricted pending verification and contract alignment by the Typtwo Administration desk.
                </p>

                <div className="border-t border-neutral-900 pt-4 flex flex-col sm:flex-row justify-between text-[9px] text-neutral-500 gap-2">
                  <span>CLEARENCE ID: T2_PENDING_GATEWAY_{clientId.toUpperCase()}</span>
                  <span>REGISTRATION DATE: {new Date().toLocaleDateString()}</span>
                </div>
              </div>

              {/* Status checklist grid */}
              <div className="bg-[#0c0c0c] border border-neutral-800 p-5 rounded-sm space-y-4 font-mono">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-neutral-850 pb-2">
                  // Compliance Handshake Progress
                </h3>

                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold shrink-0 text-xs">✓ [100%]</span>
                    <div className="space-y-1">
                      <h4 className="text-xs text-white uppercase font-bold">Profile Identity Verification</h4>
                      <p className="text-[10px] text-neutral-550 font-bold uppercase">Corporate domains parsed and registered into Typtwo node vault.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-emerald-500 font-bold shrink-0 text-xs">✓ [100%]</span>
                    <div className="space-y-1">
                      <h4 className="text-xs text-white uppercase font-bold">Secure Credentials Verification</h4>
                      <p className="text-[10px] text-neutral-550 font-bold uppercase">Corporate account and password credentials verified for workspace access.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-flame font-bold shrink-0 text-xs font-mono">○ [05%]</span>
                    <div className="space-y-1">
                      <h4 className="text-xs text-white uppercase font-bold">Typtwo Admin Handshake</h4>
                      <p className="text-[10px] text-neutral-550 font-bold uppercase">Admin audit is scheduled. An onboarding lead will contact you to align project scopes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Project Progress Tracker Banner */}
              {(() => {
                const avgPercentage = safeMilestones.length > 0
                  ? Math.round(safeMilestones.reduce((acc, curr) => acc + (Number(curr?.percentage) || 0), 0) / safeMilestones.length)
                  : 0;
                const activeMilestone = safeMilestones.length > 0
                  ? (safeMilestones.find(m => m && typeof m.percentage === "number" && m.percentage < 100) || safeMilestones[safeMilestones.length - 1])
                  : null;

                return (
                  <div className="bg-[#0b0b0b] border border-neutral-800 p-5 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 bg-volt rounded-full animate-pulse" />
                        <span className="text-[10px] text-volt uppercase font-bold tracking-widest font-mono">// SYSTEM CAMPAIGN PROGRESS</span>
                      </div>
                      <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                        {activeMilestone ? activeMilestone.title : "Workspace Initialized"}
                      </h2>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {activeMilestone ? activeMilestone.statusText : "All onboarding requirements and active setups tracked."}
                      </p>
                    </div>
                    
                    <div className="shrink-0 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-neutral-800 pt-4 md:pt-0 pl-0 md:pl-6">
                      <div className="text-2xl font-bold text-volt tracking-tight">{avgPercentage}%</div>
                      <span className="text-[8px] text-neutral-500 uppercase tracking-widest font-bold mt-1">OVERALL COMPLETION</span>
                      <div className="w-32 bg-neutral-900 border border-neutral-800 h-1.5 rounded-full overflow-hidden mt-2.5">
                        <div className="bg-volt h-full transition-all duration-500" style={{ width: `${avgPercentage}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Onboarding & Campaign Roadmap Grid */}
              {activeTab === "requirements" && (
                <div className="bg-[#0b0b0b] border border-neutral-800 p-5 rounded-sm space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-neutral-850 pb-2 flex justify-between items-center">
                    <span>// Client Milestones & Onboarding Roadmap</span>
                    <span className="text-[9px] text-neutral-500 font-bold font-mono">TRACKED CHECKS: {safeMilestones.length}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {safeMilestones.map((m) => (
                  <div key={m.id} className="p-4 bg-[#0c0c0c] border border-neutral-800 rounded-sm space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-xs text-white font-bold uppercase tracking-wide truncate max-w-[200px]">{m.title}</span>
                        <span className="text-[10px] text-volt font-bold shrink-0">{m.percentage}%</span>
                      </div>
                      <div className="w-full bg-neutral-950 h-1 rounded-full overflow-hidden">
                        <div className="bg-volt h-full transition-all duration-300" style={{ width: `${m.percentage}%` }} />
                      </div>
                      <p className="text-[11px] text-neutral-450 leading-relaxed font-bold uppercase">{m.statusText}</p>
                    </div>

                    {m.deliverables && m.deliverables.length > 0 && (
                      <div className="pt-2.5 border-t border-neutral-900 mt-2 space-y-1.5">
                        <span className="text-[8px] text-neutral-500 font-bold uppercase block tracking-wider">Milestone Deliverables:</span>
                        {m.deliverables.map((del, delIdx) => (
                          <a
                            key={delIdx}
                            href={del.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] text-volt hover:text-white underline flex items-center gap-1.5 truncate decoration-transparent font-bold"
                          >
                            <span className="text-neutral-500">📄</span> {del.name} ↗
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

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
                        Type: {String(r.type || "custom").replace('_', ' ')}
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
                      {f.url && f.url !== "#" ? (
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-volt text-black hover:bg-white text-[10px] px-3.5 py-1.5 rounded-sm uppercase tracking-widest font-bold transition cursor-pointer text-center decoration-transparent"
                        >
                          Get ↗
                        </a>
                      ) : (
                        <button
                          onClick={() => alert(`Downloading deliverable: ${f.name}`)}
                          className="bg-neutral-900 border border-neutral-800 hover:border-volt text-neutral-300 hover:text-white text-[10px] px-3 py-1.5 rounded-sm uppercase tracking-widest font-bold transition cursor-pointer"
                        >
                          Get
                        </button>
                      )}
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

          {activeTab === "agreements" && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-white uppercase tracking-wider">// Corporate Agreements & Contracts</h2>
                <p className="text-xs text-neutral-400 mt-1">Mandatory contracts, NDAs, and Master Services Agreements signed between companies.</p>
              </div>

              {agreements.length === 0 ? (
                <div className="border border-dashed border-neutral-800 rounded-sm p-10 text-center text-xs text-neutral-400">
                  No active agreements posted for this workspace yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {agreements.map((doc, idx) => (
                    <div 
                      key={idx}
                      className="bg-[#0c0c0c] border border-neutral-800 p-4 rounded-sm hover:border-neutral-700 flex items-center justify-between transition-all"
                    >
                      <div className="min-w-0 pr-4">
                        <div className="text-xs font-bold text-white truncate uppercase tracking-wide">{doc.name}</div>
                        <div className="text-[10px] text-neutral-500 mt-0.5">Shared: {doc.date}</div>
                      </div>
                      {doc.url && doc.url !== "#" ? (
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-volt text-black hover:bg-white text-[10px] px-3.5 py-1.5 rounded-sm uppercase tracking-widest font-bold transition cursor-pointer text-center decoration-transparent"
                        >
                          Review ↗
                        </a>
                      ) : (
                        <button
                          onClick={() => alert(`Reviewing signed contract: ${doc.name}`)}
                          className="bg-neutral-900 border border-neutral-800 hover:border-volt text-neutral-300 hover:text-white text-[10px] px-3 py-1.5 rounded-sm uppercase tracking-widest font-bold transition cursor-pointer"
                        >
                          Review
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "feed" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Operations feed logs */}
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider">// Operations Logs</h2>
                  <p className="text-xs text-neutral-400 mt-1">Real-time checkpoint entries logged by the engineering team.</p>
                </div>

                {isStatusActive ? (
                  <div className="border border-neutral-800 bg-[#0c0c0c] rounded-sm p-6 space-y-6">
                    {statuses.map((s, idx) => (
                      <div key={idx} className="relative pl-6 border-l border-neutral-850 last:border-l-0 pb-2">
                        <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-volt" />
                        <div className="text-[9px] text-neutral-500 font-bold mb-1 uppercase tracking-wider">{s.timestamp}</div>
                        <p className="text-xs text-neutral-200 uppercase tracking-wide leading-relaxed font-bold">{s.text}</p>
                      </div>
                    ))}

                    {statuses.length === 0 && (
                      <div className="text-center text-xs text-neutral-500 py-6">
                        No operations logs recorded yet.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="border border-dashed border-neutral-800 rounded-sm p-10 text-center text-xs text-neutral-400">
                    Operations feed access has been disabled by the admin workspace.
                  </div>
                )}
              </div>

              {/* Right Column: Milestones Audit logs */}
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider">// Milestone Audit Logs</h2>
                  <p className="text-xs text-neutral-400 mt-1">Automated timeline history of milestone changes and deliverable attachment events.</p>
                </div>

                <div className="border border-neutral-800 bg-neutral-950 p-6 rounded-sm space-y-4 max-h-[450px] overflow-y-auto font-mono">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="text-[10px] text-neutral-400 leading-normal border-b border-neutral-900 pb-2 last:border-b-0">
                      <span className="text-neutral-500 font-bold">[{typeof log.timestamp === "string" ? (log.timestamp.split(',')[1]?.trim() || log.timestamp) : "LOG"}]</span>{" "}
                      <span className="text-volt font-bold">&gt;&gt;</span> {log.message}
                    </div>
                  ))}

                  {auditLogs.length === 0 && (
                    <div className="text-center text-xs text-neutral-500 py-6">
                      No milestone activities logged.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Billing & Invoices Tab */}
          {activeTab === "billing" && (
            <div className="space-y-6 text-left">
              {/* Executive Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Active Outstanding */}
                <div className="bg-[#0b0b0b] border border-neutral-800 p-5 rounded-sm space-y-1 text-left">
                  <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest block font-mono">
                    // TOTAL OUTSTANDING DUES
                  </span>
                  <div className="text-xl font-bold text-volt font-mono">
                    {(() => {
                      const pendingInvoices = invoices.filter(i => i.status !== "Paid");
                      if (pendingInvoices.length === 0) return "$0.00";
                      return pendingInvoices.map(i => i.amount).join(" + ");
                    })()}
                  </div>
                  <span className="text-[10px] text-neutral-400 block font-mono">
                    {invoices.filter(i => i.status !== "Paid").length} Unpaid / Pending Invoice(s)
                  </span>
                </div>

                {/* Next Due Date Banner */}
                <div className="bg-[#0b0b0b] border border-neutral-800 p-5 rounded-sm space-y-1 text-left">
                  <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest block font-mono">
                    // NEXT PAYMENT DUE DATE
                  </span>
                  {(() => {
                    const todayStr = new Date().toISOString().split("T")[0];
                    const unpaidInvoices = invoices.filter(i => i.status !== "Paid");
                    const overdueCount = unpaidInvoices.filter(i => i.dueDate && todayStr > i.dueDate).length;

                    if (overdueCount > 0) {
                      return (
                        <>
                          <div className="text-xl font-bold text-flame font-mono animate-pulse">
                            ⚠️ PAYMENT OVERDUE
                          </div>
                          <span className="text-[10px] text-red-400 font-bold block font-mono uppercase">
                            {overdueCount} Invoice(s) past payment deadline
                          </span>
                        </>
                      );
                    }

                    const nextDue = unpaidInvoices[0]?.dueDate || "No Active Dues";
                    return (
                      <>
                        <div className="text-xl font-bold text-white font-mono">
                          {nextDue}
                        </div>
                        <span className="text-[10px] text-emerald-400 font-bold block font-mono uppercase">
                          {unpaidInvoices.length === 0 ? "All Invoices Settled" : "Scheduled Payment"}
                        </span>
                      </>
                    );
                  })()}
                </div>

                {/* Total Paid to Date */}
                <div className="bg-[#0b0b0b] border border-neutral-800 p-5 rounded-sm space-y-1 text-left">
                  <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest block font-mono">
                    // TOTAL INVESTED TO DATE
                  </span>
                  <div className="text-xl font-bold text-emerald-400 font-mono">
                    {(() => {
                      const paidInvoices = invoices.filter(i => i.status === "Paid");
                      if (paidInvoices.length === 0) return "$0.00";
                      return paidInvoices.map(i => i.amount).join(" + ");
                    })()}
                  </div>
                  <span className="text-[10px] text-neutral-400 block font-mono">
                    {invoices.filter(i => i.status === "Paid").length} Settled Invoice(s)
                  </span>
                </div>
              </div>

              {/* Overdue Warning Alert Banner */}
              {(() => {
                const todayStr = new Date().toISOString().split("T")[0];
                const overdueList = invoices.filter(i => i.status !== "Paid" && i.dueDate && todayStr > i.dueDate);

                if (overdueList.length > 0) {
                  return (
                    <div className="bg-flame/10 border-2 border-flame/80 p-5 rounded-sm text-left space-y-2">
                      <div className="flex items-center gap-2 text-flame text-xs font-bold uppercase tracking-widest font-mono">
                        <span className="h-2.5 w-2.5 bg-flame rounded-full animate-ping" />
                        ⚠️ CRITICAL PAYMENT NOTICE: ACCOUNT OVERDUE
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                        You have {overdueList.length} invoice(s) that have crossed their payment due date ({overdueList.map(i => `${i.id}: ${i.amount} (Due ${i.dueDate})`).join(", ")}). Please review the invoice details below and settle payment or attach receipt proof to prevent campaign pause.
                      </p>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Invoices List Table */}
              <div className="bg-[#0b0b0b] border border-neutral-800 p-6 rounded-sm space-y-4 text-left">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    // Official Invoices & Billing Records ({invoices.length})
                  </h3>
                  <span className="text-[9px] text-neutral-500 font-bold uppercase font-mono">
                    SSL ENCRYPTED BILLING DESK
                  </span>
                </div>

                <div className="space-y-4">
                  {invoices.map((inv) => {
                    const todayStr = new Date().toISOString().split("T")[0];
                    const isOverdue = inv.status !== "Paid" && inv.dueDate && todayStr > inv.dueDate;

                    return (
                      <div
                        key={inv.id}
                        className={`p-5 bg-[#0c0c0c] border rounded-sm space-y-4 transition ${
                          isOverdue
                            ? "border-flame/80 bg-flame/5"
                            : inv.status === "Paid"
                            ? "border-emerald-900/60"
                            : "border-neutral-800"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-900 pb-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-neutral-500 font-mono font-bold">{inv.id}</span>
                              {inv.status === "Paid" ? (
                                <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] px-2.5 py-0.5 font-bold uppercase rounded-sm">
                                  ✓ PAID {inv.paidDate ? `on ${inv.paidDate}` : ""}
                                </span>
                              ) : isOverdue ? (
                                <span className="bg-flame/20 text-flame border border-flame text-[9px] px-2.5 py-0.5 font-bold uppercase rounded-sm animate-pulse">
                                  ⚠️ OVERDUE (DUE {inv.dueDate})
                                </span>
                              ) : (
                                <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[9px] px-2.5 py-0.5 font-bold uppercase rounded-sm">
                                  ⏱ PENDING PAYMENT
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-bold text-white uppercase">{inv.title}</h4>
                          </div>

                          <div className="text-right">
                            <span className="text-xs text-neutral-500 font-mono block uppercase">Invoice Amount</span>
                            <span className="text-lg font-bold text-volt font-mono">{inv.amount}</span>
                          </div>
                        </div>

                        {/* Dates & File Links Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                          <div>
                            <span className="text-[9px] text-neutral-500 uppercase block font-bold">Issue Date:</span>
                            <span className="text-neutral-300">{inv.issueDate}</span>
                          </div>

                          <div>
                            <span className="text-[9px] text-neutral-500 uppercase block font-bold">Payment Due Date:</span>
                            <span className={isOverdue ? "text-flame font-bold" : "text-volt font-bold"}>
                              {inv.dueDate}
                            </span>
                          </div>

                          <div>
                            <span className="text-[9px] text-neutral-500 uppercase block font-bold">Official Invoice File:</span>
                            {inv.invoiceFile?.url ? (
                              <a
                                href={inv.invoiceFile.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 hover:border-volt text-volt hover:text-white px-2.5 py-1 rounded-sm text-[10px] uppercase font-bold transition mt-1"
                              >
                                📄 Download Invoice ({inv.invoiceFile.name || "PDF"})
                              </a>
                            ) : (
                              <span className="text-neutral-600 italic">No Document Attached</span>
                            )}
                          </div>
                        </div>

                        {/* Attached Receipt File if Paid */}
                        {inv.receiptFile?.url && (
                          <div className="p-3 bg-emerald-950/30 border border-emerald-900/60 rounded-sm text-xs font-mono flex items-center justify-between">
                            <span className="text-emerald-300">✓ Official Payment Receipt: {inv.receiptFile.name}</span>
                            <a
                              href={inv.receiptFile.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-400 hover:underline font-bold"
                            >
                              View / Download Receipt →
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {invoices.length === 0 && (
                    <div className="text-xs text-neutral-500 italic py-10 text-center border border-dashed border-neutral-850 rounded-sm font-mono">
                      No invoices published for your workspace desk yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
            </>
          )}

          {/* Team Members Invite Widget (Visible when approved) */}
          {approved && (
            <div className="bg-[#0b0b0b] border border-neutral-800 p-5 rounded-sm grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-8">
              {/* Left Column: Invite Teammate */}
              <div className="space-y-4 font-mono">
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span>// Team Vault Access</span>
                    {notifyMsg && (
                      <span className="text-[9px] text-volt uppercase font-bold animate-pulse">● {notifyMsg}</span>
                    )}
                  </h3>
                  <p className="text-[10px] text-neutral-450 font-bold uppercase">
                    Invite colleagues from your corporate domain to view this campaign board. All invitations require manual verification by Typtwo Operations.
                  </p>
                </div>

                <form onSubmit={handleInviteMember} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="coworker@company.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="flex-grow bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-1.5 text-xs text-white focus:outline-none focus:border-volt"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-volt text-black hover:bg-white text-xs px-4 py-1.5 font-bold uppercase rounded-sm cursor-pointer transition"
                  >
                    Invite
                  </button>
                </form>
              </div>

              {/* Right Column: Teammates list */}
              <div className="space-y-3 font-mono">
                <h4 className="text-[9px] text-neutral-500 uppercase tracking-widest font-bold">// Active Team Access</h4>
                <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                  {members.map((m: any, idx: number) => (
                    <div key={idx} className="bg-neutral-950 border border-neutral-900 px-3 py-2 rounded-sm flex items-center justify-between text-[11px]">
                      <span className="text-white truncate pr-2">{m.email}</span>
                      <span className={`text-[9px] font-bold uppercase ${m.approved ? "text-volt" : "text-flame animate-pulse"}`}>
                        {m.approved ? "Approved ●" : "Awaiting Verification ○"}
                      </span>
                    </div>
                  ))}

                  {members.length === 0 && (
                    <div className="text-[10px] text-neutral-500 italic py-2">
                      No other team members have requested access to this workspace.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
