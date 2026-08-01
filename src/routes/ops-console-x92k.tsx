import { useState, useEffect, Component, ReactNode } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { sendOtpEmail } from "../lib/resend";

function safeDownloadOrOpenDoc(url?: string, fileName?: string) {
  const name = fileName || "Document";
  if (!url || url === "#") {
    alert(`No file document attached for ${name}`);
    return;
  }

  if (url.startsWith("data:")) {
    try {
      const arr = url.split(",");
      const mimeMatch = arr[0].match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const blob = new Blob([u8arr], { type: mime });
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
      return;
    } catch (e) {
      console.error("Data URL conversion error:", e);
    }
  }

  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

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

export interface Invoice {
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

  // 5-MINUTE INACTIVITY AUTO-LOGOUT FOR ADMIN CONSOLE
  useEffect(() => {
    if (typeof window === "undefined" || !isAuthorized) return;

    let inactivityTimer: NodeJS.Timeout;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        sessionStorage.removeItem("t2_admin_authorized");
        setIsAuthorized(false);
        alert("Admin session automatically logged out due to 5 minutes of inactivity.");
      }, 5 * 60 * 1000); // 5 MINUTES (300,000 ms)
    };

    const userEvents = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "click"];
    userEvents.forEach((evt) => window.addEventListener(evt, resetInactivityTimer, { passive: true }));

    resetInactivityTimer();

    return () => {
      clearTimeout(inactivityTimer);
      userEvents.forEach((evt) => window.removeEventListener(evt, resetInactivityTimer));
    };
  }, [isAuthorized]);

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
  const [onboardEmail, setOnboardEmail] = useState("");
  const [onboardPassword, setOnboardPassword] = useState("");
  const [onboardAutoApprove, setOnboardAutoApprove] = useState(true);
  const [onboardOtpBypass, setOnboardOtpBypass] = useState(true);
  const [reqs, setReqs] = useState<Requirement[]>([]);

  // Set Account Password for a company
  const handleSetCompanyPassword = async (targetClientId: string) => {
    const pwd = prompt(`Set Account Password for company workspace (${targetClientId}):`);
    if (pwd === null) return;

    if (isSupabaseConfigured()) {
      try {
        const { data } = await supabase
          .from("clients")
          .select("reqs")
          .eq("id", targetClientId)
          .single();

        const currentReqs = parseArray(data?.reqs);
        const existingApproval = currentReqs.find((r: any) => r && r.id === "sys-approval") || {};
        const updatedReqs = currentReqs.filter((r: any) => r && r.id !== "sys-approval");

        updatedReqs.push({
          ...existingApproval,
          id: "sys-approval",
          approved: existingApproval.approved ?? true,
          disabled: existingApproval.disabled ?? false,
          password: pwd.trim() || undefined,
          must_change_password: true,
          otp_bypass: true
        });

        const { error } = await supabase
          .from("clients")
          .update({ reqs: updatedReqs })
          .eq("id", targetClientId);

        if (!error) {
          setAllDbClients((prev) => prev.map((c) => c.id === targetClientId ? { ...c, reqs: updatedReqs } : c));
          setNotifyMsg("PASSWORD UPDATED & BYPASS ENABLED");
          setTimeout(() => setNotifyMsg(""), 2000);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    setSafeLocalStorage(`t2_password_${targetClientId}`, pwd.trim());
    setNotifyMsg("PASSWORD UPDATED");
    setTimeout(() => setNotifyMsg(""), 2000);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
  };

  // Toggle OTP Bypass for a company
  const handleToggleOtpBypass = async (targetClientId: string, currentBypass: boolean) => {
    const newBypass = !currentBypass;
    if (isSupabaseConfigured()) {
      try {
        const { data } = await supabase
          .from("clients")
          .select("reqs")
          .eq("id", targetClientId)
          .single();

        const currentReqs = parseArray(data?.reqs);
        const existingApproval = currentReqs.find((r: any) => r && r.id === "sys-approval") || {};
        const updatedReqs = currentReqs.filter((r: any) => r && r.id !== "sys-approval");

        updatedReqs.push({
          ...existingApproval,
          id: "sys-approval",
          approved: existingApproval.approved ?? true,
          disabled: existingApproval.disabled ?? false,
          otp_bypass: newBypass
        });

        const { error } = await supabase
          .from("clients")
          .update({ reqs: updatedReqs })
          .eq("id", targetClientId);

        if (!error) {
          setAllDbClients((prev) => prev.map((c) => c.id === targetClientId ? { ...c, reqs: updatedReqs } : c));
          setNotifyMsg(newBypass ? "OTP BYPASS ENABLED" : "OTP BYPASS DISABLED");
          setTimeout(() => setNotifyMsg(""), 2000);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    setSafeLocalStorage(`t2_otp_bypass_${targetClientId}`, newBypass ? "true" : "false");
    setNotifyMsg(newBypass ? "OTP BYPASS ENABLED" : "OTP BYPASS DISABLED");
    setTimeout(() => setNotifyMsg(""), 2000);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
  };
  
  // Master Overview vs Selected Company Workspace Mode
  const [viewMode, setViewMode] = useState<"master" | "company">("master");

  // Tab selector for company management desk
  const [activeFormTab, setActiveFormTab] = useState<"requirements" | "progress" | "agreements" | "members" | "invoices">("requirements");

  // Invoices & Billing states
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [invId, setInvId] = useState("");
  const [invTitle, setInvTitle] = useState("");
  const [invAmount, setInvAmount] = useState("");
  const [invIssueDate, setInvIssueDate] = useState(new Date().toISOString().split("T")[0]);
  const [invDueDate, setInvDueDate] = useState("");
  const [invStatus, setInvStatus] = useState<"Pending" | "Paid">("Pending");
  const [invFileName, setInvFileName] = useState("");
  const [invFileUrl, setInvFileUrl] = useState("");
  const [invNotes, setInvNotes] = useState("");

  const [receiptInvId, setReceiptInvId] = useState<string | null>(null);
  const [receiptName, setReceiptName] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");

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
  const [otpLogs, setOtpLogs] = useState<any[]>([]);

  // Live Resend Email Tester States
  const [testEmail, setTestEmail] = useState("");
  const [testResult, setTestResult] = useState("");
  const [testLoading, setTestLoading] = useState(false);

  const handleTestEmailDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail.trim()) return;
    setTestLoading(true);
    setTestResult("");
    const testCode = Math.floor(100000 + Math.random() * 900000).toString();
    const res = await sendOtpEmail(testEmail.trim(), testCode);
    if (res.success) {
      setTestResult(`✓ SUCCESS: 6-Digit Test OTP (${testCode}) dispatched to ${testEmail.trim()} via Resend API.`);
    } else {
      setTestResult(`❌ DISPATCH FAILED: ${res.error || "Unknown Resend API error"}`);
    }
    setTestLoading(false);
  };

  // Load clients list dynamically & real-time OTP tracking
  useEffect(() => {
    const fetchClients = async () => {
      let combinedClients: Client[] = [];
      let dbDataList: any[] = [];

      if (isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase
            .from("clients")
            .select("*");
          if (data && !error) {
            dbDataList = data;
            setAllDbClients(data);

            const otpTracker = data.find((d: any) => d.id === "sys-otp-tracker");
            if (otpTracker) {
              setOtpLogs(parseArray(otpTracker.reqs));
            }
            
            combinedClients = data.filter((d: any) => d.id !== "sys-otp-tracker").map((d: any) => ({
              id: d.id,
              name: d.name,
              email: `@${d.email_domain || d.email || d.id}`
            }));
          }
        } catch (err) {
          console.error("Failed to load clients list from Supabase", err);
        }
      }

      // Merge Local storage registered companies
      const storedList = getSafeLocalStorage("t2_local_clients_list");
      if (storedList !== null) {
        const parsed = parseArray(storedList);
        parsed.forEach((localClient: any) => {
          if (!combinedClients.some((c) => c.id === localClient.id)) {
            combinedClients.push({
              id: localClient.id,
              name: localClient.name,
              email: localClient.email || `@${localClient.id}`
            });
          }
        });
      }

      setClients(combinedClients);
    };
    fetchClients();

    let channel: any;
    if (isSupabaseConfigured()) {
      channel = supabase
        .channel("ops_console_otp_realtime")
        .on("postgres_changes", { event: "*", schema: "public", table: "clients" }, () => {
          fetchClients();
        })
        .subscribe();
    }

    const handleStorageUpdate = () => fetchClients();
    window.addEventListener("t2_storage_update", handleStorageUpdate);
    window.addEventListener("storage", handleStorageUpdate);

    return () => {
      if (channel) supabase.removeChannel(channel);
      window.removeEventListener("t2_storage_update", handleStorageUpdate);
      window.removeEventListener("storage", handleStorageUpdate);
    };
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
    const cleanEmail = onboardEmail.trim().toLowerCase();
    const cleanPassword = onboardPassword.trim();

    const newClientObj = {
      id: cleanId,
      name: onboardName.trim(),
      email_domain: cleanDomain,
      reqs: [
        {
          id: "sys-approval",
          approved: onboardAutoApprove,
          disabled: false,
          registered_email: cleanEmail || undefined,
          password: cleanPassword || undefined,
          must_change_password: !!cleanPassword,
          otp_bypass: onboardOtpBypass
        }
      ],
      files: [],
      agreements: [],
      milestones: DEFAULT_MILESTONES,
      audit_logs: [{ id: "aud-0", message: `Workspace created by administrator${cleanEmail ? ` for ${cleanEmail}` : ""}.`, timestamp: new Date().toLocaleString() }],
      statuses: []
    };

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from("clients")
          .insert(newClientObj);

        if (!error) {
          setNotifyMsg("CLIENT & WORKSPACE CREATED");
          setTimeout(() => setNotifyMsg(""), 2000);
          setSelectedClientId(cleanId);
          setOnboardId("");
          setOnboardName("");
          setOnboardDomain("");
          setOnboardEmail("");
          setOnboardPassword("");
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

            const sysInvoices = parseArray(data.reqs).find((r: any) => r && r.id === "sys-invoices");
            const dbInvoices = sysInvoices ? parseArray(sysInvoices.invoices) : parseArray(data.invoices);
            const localInvoices = parseArray(getSafeLocalStorage(`t2_invoices_${selectedClientId}`));
            setInvoices(dbInvoices.length > 0 ? dbInvoices : localInvoices);
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

      // 4. Invoices Local Fallback
      const localInvoices = parseArray(getSafeLocalStorage(`t2_invoices_${selectedClientId}`));
      setInvoices(localInvoices);
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

  // Save invoices to Supabase database & local storage
  const saveInvoices = async (updatedInvoices: Invoice[]) => {
    setInvoices(updatedInvoices);
    if (isSupabaseConfigured() && selectedClientId) {
      try {
        const { data: dbData } = await supabase
          .from("clients")
          .select("reqs")
          .eq("id", selectedClientId)
          .single();

        const currentReqs = parseArray(dbData?.reqs);
        const nextReqs = currentReqs.filter((r: any) => r && r.id !== "sys-invoices");
        nextReqs.push({ id: "sys-invoices", invoices: updatedInvoices });

        const { error } = await supabase
          .from("clients")
          .update({ reqs: nextReqs })
          .eq("id", selectedClientId);

        if (!error) {
          setNotifyMsg("INVOICES SYNCED");
          setTimeout(() => setNotifyMsg(""), 2000);
          return;
        }
        console.error("Supabase invoices update error", error);
      } catch (err) {
        console.error(err);
      }
    }

    setSafeLocalStorage(`t2_invoices_${selectedClientId}`, JSON.stringify(updatedInvoices));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
    setNotifyMsg("SAVED");
    setTimeout(() => setNotifyMsg(""), 2000);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invTitle.trim() || !invAmount.trim() || !invDueDate) {
      alert("Please fill out Invoice Title, Amount, and Payment Due Date.");
      return;
    }

    const generatedId = invId.trim() || `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const newInv: Invoice = {
      id: generatedId,
      title: invTitle.trim(),
      amount: invAmount.trim(),
      issueDate: invIssueDate || new Date().toISOString().split("T")[0],
      dueDate: invDueDate,
      status: invStatus,
      paidDate: invStatus === "Paid" ? new Date().toISOString().split("T")[0] : undefined,
      invoiceFile: invFileUrl ? { name: invFileName || "Invoice Document", url: invFileUrl } : undefined,
      notes: invNotes.trim() || undefined
    };

    const next = [newInv, ...invoices];
    saveInvoices(next);

    // Reset form
    setInvId("");
    setInvTitle("");
    setInvAmount("");
    setInvDueDate("");
    setInvFileName("");
    setInvFileUrl("");
    setInvNotes("");
  };

  const handleMarkInvoicePaid = (id: string) => {
    const updated = invoices.map(inv => {
      if (inv.id === id) {
        return { ...inv, status: "Paid" as const, paidDate: new Date().toISOString().split("T")[0] };
      }
      return inv;
    });
    saveInvoices(updated);
  };

  const handleDeleteInvoice = (id: string) => {
    if (window.confirm(`Delete Invoice ${id}?`)) {
      const updated = invoices.filter(inv => inv.id !== id);
      saveInvoices(updated);
    }
  };

  const handleAttachReceipt = (invTargetId: string) => {
    if (!receiptUrl) {
      alert("Please provide a receipt URL or upload a local file.");
      return;
    }
    const updated = invoices.map(inv => {
      if (inv.id === invTargetId) {
        return {
          ...inv,
          receiptFile: { name: receiptName || "Payment Receipt", url: receiptUrl }
        };
      }
      return inv;
    });
    saveInvoices(updated);
    setReceiptInvId(null);
    setReceiptName("");
    setReceiptUrl("");
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
    const docUrl = attachedDocUrl.trim();
    if (!activeMilestoneAttachmentId || !docUrl) {
      alert("Please upload a local file OR paste a URL link before attaching.");
      return;
    }

    const docName = attachedDocName.trim() || "Milestone Attachment";

    const updated = milestones.map((m) => {
      if (m.id === activeMilestoneAttachmentId) {
        return {
          ...m,
          deliverables: [
            ...m.deliverables,
            { name: docName, url: docUrl }
          ],
          updatedAt: new Date().toLocaleString()
        };
      }
      return m;
    });

    const target = milestones.find(m => m.id === activeMilestoneAttachmentId);
    saveMilestones(updated, `Added deliverable "${docName}" to Milestone: "${target?.title}"`);
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
    const docUrl = newAgreementUrl.trim();
    if (!docUrl) {
      alert("Please upload a local file OR paste a URL link before publishing.");
      return;
    }

    const docName = newAgreementName.trim() || "Corporate Agreement Document";
    const newDoc = { name: docName, date: new Date().toLocaleDateString(), url: docUrl };

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
    const fileUrl = newFileUrl.trim();
    if (!fileUrl) {
      alert("Please upload a local file OR paste a URL link before publishing.");
      return;
    }

    const fileName = newFileName.trim() || "Vault Deliverable Document";
    const newFile = { name: fileName, size: "Downloadable File", url: fileUrl };

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
        const { data } = await supabase
          .from("clients")
          .select("reqs, audit_logs")
          .eq("id", clientIdToApprove)
          .single();

        const currentReqs = parseArray(data?.reqs);
        const currentAudits = parseArray(data?.audit_logs);

        const updatedReqs = currentReqs.filter((r: any) => r && r.id !== "sys-approval");
        updatedReqs.push({ id: "sys-approval", approved: true, disabled: false });

        const updatedAudits = [...currentAudits, { id: `aud-${Date.now()}`, message: "Master Approved by Administrator.", timestamp: new Date().toLocaleString() }];

        const { error } = await supabase
          .from("clients")
          .update({ reqs: updatedReqs, audit_logs: updatedAudits })
          .eq("id", clientIdToApprove);

        if (!error) {
          setAllDbClients((prev) => prev.map((c) => c.id === clientIdToApprove ? { ...c, reqs: updatedReqs, audit_logs: updatedAudits } : c));
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
        const { data } = await supabase
          .from("clients")
          .select("reqs")
          .eq("id", clientIdToReject)
          .single();

        const currentReqs = parseArray(data?.reqs);
        const updatedReqs = currentReqs.filter((r: any) => r && r.id !== "sys-approval");
        updatedReqs.push({ id: "sys-approval", approved: false, disabled: false });

        const { error } = await supabase
          .from("clients")
          .update({ reqs: updatedReqs })
          .eq("id", clientIdToReject);

        if (!error) {
          setAllDbClients((prev) => prev.map((c) => c.id === clientIdToReject ? { ...c, reqs: updatedReqs } : c));
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
        const { data } = await supabase
          .from("clients")
          .select("reqs")
          .eq("id", clientIdToDisable)
          .single();

        const currentReqs = parseArray(data?.reqs);
        const updatedReqs = currentReqs.filter((r: any) => r && r.id !== "sys-approval");
        updatedReqs.push({ id: "sys-approval", approved: false, disabled: true });

        const { error } = await supabase
          .from("clients")
          .update({ reqs: updatedReqs })
          .eq("id", clientIdToDisable);

        if (!error) {
          setAllDbClients((prev) => prev.map((c) => c.id === clientIdToDisable ? { ...c, reqs: updatedReqs } : c));
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
        
        if (error) {
          console.warn("Supabase delete warning:", error.message);
        }
      } catch (err) {
        console.error(err);
      }
    }

    // Set force logout signals for any active client sessions
    localStorage.setItem(`t2_force_logout_${clientIdToDelete}`, "true");
    localStorage.setItem(`t2_deleted_${clientIdToDelete}`, "true");

    // Always clean up LocalStorage fallback
    const localClientsKey = "t2_local_clients_list";
    const currentList = JSON.parse(localStorage.getItem(localClientsKey) || "[]");
    const updatedList = currentList.filter((c: any) => c.id !== clientIdToDelete);
    localStorage.setItem(localClientsKey, JSON.stringify(updatedList));

    // Update React state immediately
    setClients((prev) => prev.filter((c) => c.id !== clientIdToDelete));
    setAllDbClients((prev) => prev.filter((c) => c.id !== clientIdToDelete));

    setNotifyMsg("COMPANY DELETED & FORCE LOGOUT BROADCASTED");
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

  const getCompanyApprovalStatus = (c: any) => {
    if (!c) return { approved: false, disabled: false, otpBypass: false, registeredEmail: "", password: "" };
    const reqs = parseArray(c.reqs);
    const sysApproval = reqs.find((r: any) => r && r.id === "sys-approval");
    if (sysApproval) {
      return {
        approved: sysApproval.approved === true,
        disabled: sysApproval.disabled === true,
        otpBypass: sysApproval.otp_bypass === true,
        registeredEmail: sysApproval.registered_email || "",
        password: sysApproval.password || ""
      };
    }
    const auditLogs = parseArray(c.audit_logs);
    const isMasterApproved = auditLogs.some((a: any) => a && typeof a.message === "string" && a.message.includes("Master Approved"));
    const localApproved = getSafeLocalStorage(`t2_approved_${c.id}`) === "true";
    const localDisabled = getSafeLocalStorage(`t2_disabled_${c.id}`) === "true";
    const localBypass = getSafeLocalStorage(`t2_otp_bypass_${c.id}`) === "true";
    const localPassword = getSafeLocalStorage(`t2_password_${c.id}`) || "";

    return {
      approved: isMasterApproved || localApproved,
      disabled: localDisabled,
      otpBypass: localBypass,
      registeredEmail: "",
      password: localPassword
    };
  };

  const getPendingWorkspaces = () => {
    const list = isSupabaseConfigured() && Array.isArray(allDbClients) && allDbClients.length > 0 ? allDbClients : clients;
    return list.filter(c => !getCompanyApprovalStatus(c).approved);
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
              <div>
                <input
                  type="email"
                  placeholder="Client Email: user@domain.com (Optional)"
                  value={onboardEmail}
                  onChange={(e) => setOnboardEmail(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-sm px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-volt"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Set Password: e.g. Pass123! (Optional)"
                  value={onboardPassword}
                  onChange={(e) => setOnboardPassword(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-850 rounded-sm px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-volt"
                />
              </div>

              <div className="pt-1 space-y-1 text-left">
                <label className="flex items-center gap-2 text-[9px] text-neutral-300 font-bold uppercase cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onboardAutoApprove}
                    onChange={(e) => setOnboardAutoApprove(e.target.checked)}
                    className="accent-volt"
                  />
                  Auto-Approve Company Access
                </label>
                <label className="flex items-center gap-2 text-[9px] text-volt font-bold uppercase cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onboardOtpBypass}
                    onChange={(e) => setOnboardOtpBypass(e.target.checked)}
                    className="accent-volt"
                  />
                  ⚡ Enable OTP Bypass Mode
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-volt text-black hover:bg-white text-[10px] py-1.5 font-bold uppercase rounded-sm cursor-pointer transition text-center mt-1"
              >
                + Create Workspace & Account
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

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#070707]">
        {/* Top Control Bar */}
        <header className="h-14 border-b border-neutral-800 bg-[#0a0a0a] px-8 flex items-center justify-between font-mono shrink-0">
          <div className="flex items-center gap-4">
            {viewMode === "company" ? (
              <>
                <button
                  onClick={() => setViewMode("master")}
                  className="bg-neutral-900 border border-neutral-800 hover:border-volt text-neutral-300 hover:text-white text-xs px-3 py-1 uppercase font-bold rounded-sm transition cursor-pointer"
                >
                  ← Back to Master Overview
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
              className="text-xs text-neutral-400 hover:text-white uppercase tracking-wider font-bold transition"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Dynamic Content Views */}
        {viewMode === "master" ? (
          /* MASTER OVERVIEW VIEW MODE */
          <div className="flex-grow p-8 space-y-8 w-full font-mono text-left overflow-y-auto">
            {/* Master Stats Summary Banner */}
            {(() => {
              const realCompanies = (allDbClients.length > 0 ? allDbClients : clients).filter((c: any) => c && c.id !== "sys-otp-tracker" && !c.id.startsWith("sys-"));
              const pendingWorkspacesList = realCompanies.filter((c: any) => {
                const { approved } = getCompanyApprovalStatus(c);
                return !approved;
              });

              return (
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
                      <div className="text-xl font-bold text-volt">{realCompanies.length}</div>
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
              );
            })()}

            {/* Live OTP Dispatch Monitor Section & Resend Tester */}
            <div className="bg-[#0c0c0c] border border-neutral-800 p-6 rounded-sm space-y-5 font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-3 gap-2">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 bg-emerald-400 rounded-full animate-ping" />
                  <h3 className="text-xs font-bold text-volt uppercase tracking-wider">// Live Email Delivery & OTP Audit Logs ({otpLogs.length})</h3>
                </div>
                <span className="text-[9px] text-neutral-400 uppercase font-bold">Real-time authentication log feed & 6-digit access codes</span>
              </div>

              {/* Live Email Delivery Diagnostic Tester */}
              <div className="bg-neutral-950 border border-neutral-850 p-4 rounded-sm space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span>🚀 Live Resend Email Delivery Diagnostic Tester</span>
                  </h4>
                  <span className="text-[9px] text-neutral-500 uppercase font-semibold">Verify email delivery to any inbox</span>
                </div>

                <form onSubmit={handleTestEmailDispatch} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter email address to test delivery (e.g. test@company.com)..."
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    className="flex-grow bg-black border border-neutral-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-volt rounded-sm font-mono"
                    required
                  />
                  <button
                    type="submit"
                    disabled={testLoading}
                    className="bg-volt text-black hover:bg-white text-xs px-5 py-2 font-black uppercase rounded-sm cursor-pointer transition disabled:opacity-50 flex-shrink-0"
                  >
                    {testLoading ? "Dispatching Test Email..." : "Test Dispatch →"}
                  </button>
                </form>

                {testResult && (
                  <div className={`p-3 text-[10px] uppercase font-bold rounded-sm border ${testResult.startsWith("✓") ? "bg-emerald-950/60 border-emerald-800 text-emerald-300" : "bg-red-950/60 border-red-800 text-red-300"}`}>
                    {testResult}
                  </div>
                )}
              </div>

              {/* Live Log Stream Cards */}
              {otpLogs.length === 0 ? (
                <div className="p-6 text-center text-xs text-neutral-500 italic border border-dashed border-neutral-850 rounded-sm">
                  No active OTP dispatches recorded yet. Any new login code requested anywhere in the world will stream here live.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-72 overflow-y-auto pr-1">
                  {otpLogs.slice(0, 15).map((log: any) => {
                    const isFailed = log.status === "FAILED" || log.error_reason;
                    return (
                      <div key={log.id} className={`bg-neutral-950 border p-3 rounded-sm space-y-2 text-left ${isFailed ? "border-red-900/80 bg-red-950/10" : "border-neutral-800"}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-neutral-500 font-mono">{log.timestamp}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 font-bold uppercase rounded-sm border ${isFailed ? "bg-red-950 text-red-400 border-red-800" : "bg-emerald-950 text-emerald-400 border-emerald-900"}`}>
                            {isFailed ? "❌ FAILED" : "✓ DELIVERED"}
                          </span>
                        </div>

                        <div>
                          <div className="text-xs font-bold text-white truncate">{log.recipient || log.email}</div>
                          <div className="text-[10px] text-neutral-400 uppercase truncate">Domain / Co: {log.company || (log.recipient || log.email || "").split("@")[1]}</div>
                        </div>

                        {log.error_reason && (
                          <div className="p-2 bg-red-950/80 border border-red-800 text-red-200 text-[9px] uppercase font-mono font-bold rounded-xs leading-relaxed break-words">
                            !! ERROR: {log.error_reason}
                          </div>
                        )}

                        <div className="flex items-center justify-between bg-black border border-neutral-800 p-2 rounded-sm mt-1">
                          <span className="text-[9px] text-neutral-500 font-bold uppercase">Passcode:</span>
                          <span className="text-sm font-black text-volt tracking-widest font-mono select-all">{log.otp_code || log.code}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Section 1: All Companies Master Table */}
            <div className="bg-[#0c0c0c] border border-neutral-800 p-6 rounded-sm space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="text-xs font-bold text-volt uppercase tracking-wider">// Company Workspaces Directory</h3>
                <span className="text-[9px] text-neutral-400 uppercase font-bold">Click "Manage Workspace →" to configure company-specific do's & don'ts</span>
              </div>

              <div className="space-y-3">
                {(allDbClients.length > 0 ? allDbClients : clients)
                  .filter((c: any) => c && c.id !== "sys-otp-tracker" && !c.id.startsWith("sys-"))
                  .map((c: any) => {
                  const { approved: isAppr, disabled: isDis, otpBypass: isBypass, registeredEmail: regEmail, password: compPwd } = getCompanyApprovalStatus(c);

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
                          {isBypass && (
                            <span className="bg-volt/20 text-volt border border-volt/40 text-[9px] px-2 py-0.5 font-bold uppercase rounded-sm">
                              ⚡ OTP BYPASS ACTIVE
                            </span>
                          )}
                        </div>
                        <div className="text-[9px] text-neutral-500 uppercase tracking-wider">
                          Workspace ID: <span className="text-neutral-350">{c.id}</span> | Domain: <span className="text-neutral-350">{c.email_domain || c.email || "N/A"}</span>
                          {regEmail && <span className="text-neutral-400 ml-2">| Account Email: <span className="text-volt font-bold">{regEmail}</span></span>}
                          {compPwd && <span className="text-emerald-400 ml-2 font-bold">| Password: {compPwd}</span>}
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

                        <button
                          onClick={() => handleSetCompanyPassword(c.id)}
                          className="bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-volt hover:text-white text-[9px] py-1.5 px-2.5 uppercase font-bold rounded-sm transition cursor-pointer"
                        >
                          🔑 {compPwd ? "Change Password" : "+ Set Password"}
                        </button>

                        <button
                          onClick={() => handleToggleOtpBypass(c.id, isBypass)}
                          className={`text-[9px] py-1.5 px-2.5 uppercase font-bold rounded-sm border transition cursor-pointer ${
                            isBypass 
                              ? "bg-volt text-black border-volt font-black" 
                              : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                          }`}
                        >
                          {isBypass ? "⚡ OTP Bypass: ON" : "⚡ OTP Bypass: OFF"}
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

              <button
                onClick={() => setActiveFormTab("invoices")}
                className={`flex-1 text-center py-2.5 text-xs uppercase font-bold tracking-wider rounded-sm transition cursor-pointer ${
                  activeFormTab === "invoices" ? "bg-volt text-black font-extrabold" : "text-neutral-400 hover:text-white"
                }`}
              >
                05 / Billing & Invoices ({invoices.length})
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

            {/* SUB-TAB 5: BILLING & INVOICES */}
            {activeFormTab === "invoices" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
                {/* Left Column: Create / Publish New Invoice Form */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-[#0c0c0c] border border-neutral-800 p-6 rounded-sm space-y-4 text-left">
                    <div className="border-b border-neutral-800 pb-3">
                      <h3 className="text-xs font-bold text-volt uppercase tracking-wider">
                        // Publish New Invoice for {selectedClient.name}
                      </h3>
                      <p className="text-[10px] text-neutral-400 mt-1">
                        Set invoice details, payment due date, and attach document files.
                      </p>
                    </div>

                    <form onSubmit={handleCreateInvoice} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">
                          Invoice ID / Reference #
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. INV-2026-001 (Leave empty for auto-id)"
                          value={invId}
                          onChange={(e) => setInvId(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-volt"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">
                          Invoice Title / Description *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Phase 1 Retainer & Strategy Setup"
                          value={invTitle}
                          onChange={(e) => setInvTitle(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-volt"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">
                            Amount ($ / ₹) *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. $5,000"
                            value={invAmount}
                            onChange={(e) => setInvAmount(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-volt"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">
                            Status *
                          </label>
                          <select
                            value={invStatus}
                            onChange={(e) => setInvStatus(e.target.value as "Pending" | "Paid")}
                            className="w-full bg-neutral-950 border border-neutral-800 text-xs text-white px-3 py-2 rounded-sm focus:outline-none focus:border-volt uppercase font-bold cursor-pointer"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">
                            Issue Date *
                          </label>
                          <input
                            type="date"
                            value={invIssueDate}
                            onChange={(e) => setInvIssueDate(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 text-xs text-white px-3 py-2 rounded-sm focus:outline-none focus:border-volt"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1 text-volt">
                            Payment Due Date *
                          </label>
                          <input
                            type="date"
                            value={invDueDate}
                            onChange={(e) => setInvDueDate(e.target.value)}
                            className="w-full bg-neutral-950 border border-volt/80 text-xs text-white px-3 py-2 rounded-sm focus:outline-none focus:border-volt font-bold"
                            required
                          />
                        </div>
                      </div>

                      {/* Invoice File Attachment */}
                      <div className="space-y-2 pt-2 border-t border-neutral-900">
                        <label className="block text-[10px] font-bold text-neutral-400 uppercase">
                          Invoice PDF / File Document
                        </label>
                        <input
                          type="text"
                          placeholder="Option 1: Paste PDF / Drive Link"
                          value={invFileUrl}
                          onChange={(e) => setInvFileUrl(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-1.5 text-[11px] text-white focus:outline-none focus:border-volt"
                        />

                        <div className="flex items-center gap-2 pt-1">
                          <label className="bg-neutral-900 border border-neutral-800 hover:border-volt text-neutral-300 hover:text-white text-[10px] py-1.5 px-3 uppercase font-bold rounded-sm cursor-pointer transition">
                            Option 2: Pick Local File From Device
                            <input
                              type="file"
                              onChange={(e) => handleLocalFileUpload(e, setInvFileName, setInvFileUrl)}
                              className="hidden"
                            />
                          </label>
                          {invFileName && (
                            <span className="text-[10px] text-volt truncate font-mono">
                              {invFileName}
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">
                          Internal Notes / Reminders (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Wired via SWIFT bank transfer"
                          value={invNotes}
                          onChange={(e) => setInvNotes(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-sm px-3 py-1.5 text-xs text-white focus:outline-none focus:border-volt"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-volt text-black hover:bg-white text-xs py-2.5 uppercase font-bold rounded-sm transition cursor-pointer"
                      >
                        Publish Invoice to Client Desk →
                      </button>
                    </form>
                  </div>
                </div>

                {/* Right Column: Published Invoices Directory */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-[#0c0c0c] border border-neutral-800 p-6 rounded-sm space-y-4 text-left">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                      <h3 className="text-xs font-bold text-volt uppercase tracking-wider">
                        // Published Invoices for {selectedClient.name} ({invoices.length})
                      </h3>
                      <span className="text-[9px] text-neutral-500 font-bold uppercase">
                        Auto-calculates OVERDUE if current date exceeds due date
                      </span>
                    </div>

                    <div className="space-y-4">
                      {invoices.map((inv) => {
                        const todayStr = new Date().toISOString().split("T")[0];
                        const isOverdue = inv.status !== "Paid" && inv.dueDate && todayStr > inv.dueDate;

                        return (
                          <div
                            key={inv.id}
                            className={`bg-neutral-950 border p-4 rounded-sm space-y-3 ${
                              isOverdue
                                ? "border-red-900/80 bg-red-950/10"
                                : inv.status === "Paid"
                                ? "border-emerald-900/60"
                                : "border-neutral-800"
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-900 pb-2">
                              <div>
                                <span className="text-[10px] text-neutral-500 font-mono block font-bold">{inv.id}</span>
                                <h4 className="text-xs font-bold text-white uppercase">{inv.title}</h4>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-volt font-mono">{inv.amount}</span>
                                {inv.status === "Paid" ? (
                                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] px-2.5 py-0.5 font-bold uppercase rounded-sm">
                                    ✓ PAID {inv.paidDate ? `(${inv.paidDate})` : ""}
                                  </span>
                                ) : isOverdue ? (
                                  <span className="bg-red-950 text-red-400 border border-red-900 text-[9px] px-2.5 py-0.5 font-bold uppercase rounded-sm animate-pulse">
                                    ⚠️ OVERDUE
                                  </span>
                                ) : (
                                  <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[9px] px-2.5 py-0.5 font-bold uppercase rounded-sm">
                                    ⏱ PENDING
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] font-mono text-neutral-400">
                              <div>
                                <span className="text-neutral-500 block">ISSUE DATE:</span>
                                <span className="text-white">{inv.issueDate}</span>
                              </div>
                              <div>
                                <span className="text-neutral-500 block">PAYMENT DUE DATE:</span>
                                <span className={isOverdue ? "text-red-400 font-bold" : "text-volt font-bold"}>
                                  {inv.dueDate}
                                </span>
                              </div>
                              <div>
                                <span className="text-neutral-500 block">INVOICE FILE:</span>
                                {inv.invoiceFile?.url ? (
                                  <button
                                    onClick={() => safeDownloadOrOpenDoc(inv.invoiceFile?.url, inv.invoiceFile?.name)}
                                    className="text-volt hover:underline font-bold truncate block bg-transparent border-0 p-0 text-left cursor-pointer"
                                  >
                                    📄 {inv.invoiceFile.name || "Download PDF"}
                                  </button>
                                ) : (
                                  <span className="text-neutral-600">None</span>
                                )}
                              </div>
                            </div>

                            {inv.receiptFile?.url && (
                              <div className="p-2 bg-emerald-950/40 border border-emerald-900/60 rounded-sm text-[10px] font-mono flex items-center justify-between">
                                <span className="text-emerald-300">Receipt Attached: {inv.receiptFile.name}</span>
                                <button
                                  onClick={() => safeDownloadOrOpenDoc(inv.receiptFile?.url, inv.receiptFile?.name)}
                                  className="text-emerald-400 hover:underline font-bold bg-transparent border-0 p-0 cursor-pointer"
                                >
                                  View / Download Receipt →
                                </button>
                              </div>
                            )}

                            {/* Actions Bar */}
                            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-900">
                              <div className="flex items-center gap-2">
                                {inv.status !== "Paid" && (
                                  <button
                                    onClick={() => handleMarkInvoicePaid(inv.id)}
                                    className="bg-emerald-900/80 border border-emerald-700 hover:bg-emerald-700 text-emerald-200 text-[9px] py-1 px-3 uppercase font-bold rounded-sm transition cursor-pointer"
                                  >
                                    ✓ Mark Paid
                                  </button>
                                )}

                                <label className="bg-neutral-900 border border-neutral-800 hover:border-volt text-neutral-300 text-[9px] py-1 px-2.5 uppercase font-bold rounded-sm cursor-pointer transition">
                                  + Attach Receipt File
                                  <input
                                    type="file"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;
                                      const reader = new FileReader();
                                      reader.onload = (ev) => {
                                        if (ev.target?.result) {
                                          const updated = invoices.map(i => i.id === inv.id ? { ...i, receiptFile: { name: file.name, url: ev.target!.result as string } } : i);
                                          saveInvoices(updated);
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    }}
                                    className="hidden"
                                  />
                                </label>
                              </div>

                              <button
                                onClick={() => handleDeleteInvoice(inv.id)}
                                className="bg-neutral-900 border border-neutral-800 hover:border-red-500 hover:text-red-400 text-neutral-400 text-[9px] py-1 px-2.5 uppercase font-bold rounded-sm transition cursor-pointer"
                              >
                                Delete Invoice
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      {invoices.length === 0 && (
                        <div className="text-xs text-neutral-500 italic py-8 text-center border border-dashed border-neutral-850 rounded-sm">
                          No invoices published for {selectedClient.name} yet. Use the form on the left to publish an invoice with a payment due date.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
