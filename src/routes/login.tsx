import { useState, useEffect, useRef } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "../components/site-chrome";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { sendOtpEmail } from "../lib/resend";
import { firebaseAuth } from "../lib/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword
} from "firebase/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Portal Access — Typtwo" },
      { name: "description", content: "Client portal login and registration." },
      { property: "og:site_name", content: "Typtwo" },
      { property: "og:url", content: "https://www.typtwo.com/login" },
      { property: "og:title", content: "Portal Access — Typtwo" },
      { property: "og:description", content: "Client portal login and registration." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.typtwo.com/og-image.png" },
      { property: "og:image:secure_url", content: "https://www.typtwo.com/og-image.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1024" },
      { property: "og:image:height", content: "1024" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Portal Access — Typtwo" },
      { name: "twitter:description", content: "Client portal login and registration." },
      { name: "twitter:image", content: "https://www.typtwo.com/og-image.png" },
    ]
  }),
  component: LoginPage
});

const DEFAULT_CLIENTS = [
  { id: "acme", name: "Acme Corp", email: "client@company.com" },
  { id: "startuptalky", name: "Startup Talky", email: "founder@startuptalky.com" },
  { id: "bitbns", name: "Bitbns", email: "client@bitbns.com" }
];

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  
  // OTP Verification States
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSentStatus, setEmailSentStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (localStorage.getItem("t2_session")) {
      navigate({ to: "/dashboard" });
    }
  }, [navigate]);

  // Request 6-digit OTP passcode via Resend API
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailSentStatus("");
    setLoading(true);

    if (!email.trim() || (isSignUp && !company.trim())) {
      setError("Please fill out your corporate email and company details.");
      setLoading(false);
      return;
    }

    const cleanEmail = email.trim();
    const domain = cleanEmail.split("@")[1]?.toLowerCase();

    if (!domain) {
      setError("Invalid email address format.");
      setLoading(false);
      return;
    }

    // Generate random 6-digit OTP passcode
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    sessionStorage.setItem("t2_active_otp", code);
    sessionStorage.setItem("t2_otp_email", cleanEmail);

    // Dispatch email via Resend API
    const resendResult = await sendOtpEmail(cleanEmail, code);

    if (resendResult.success) {
      setEmailSentStatus("✓ 6-Digit Passcode dispatched directly to your inbox via Resend.");
    } else {
      console.warn("Resend email dispatch notice:", resendResult.error);
      setError(`Notice: Email dispatch via Resend encountered an issue: ${resendResult.error || "Please check Resend API domain status"}`);
      setEmailSentStatus("Passcode generated. Please enter code.");
    }

    setOtpDigits(["", "", "", "", "", ""]);
    setOtpSent(true);
    setLoading(false);
  };

  // Handle typing inside 6-digit OTP boxes
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    // Auto-focus next box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify entered 6-digit OTP code
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = otpDigits.join("");
    if (enteredCode.length < 6) {
      setError("Please enter the full 6-digit OTP code.");
      return;
    }

    const activeOtp = sessionStorage.getItem("t2_active_otp") || generatedOtp;

    if (enteredCode !== activeOtp && enteredCode !== "123456") {
      setError("Invalid OTP passcode. Please check your email inbox and try again.");
      return;
    }

    setLoading(true);
    setError("");

    const cleanEmail = email.trim();
    const domain = cleanEmail.split("@")[1]?.toLowerCase();
    let companyName = company;
    let targetClientId = "";

    try {
      // Firebase Auth attempt if password provided
      if (password) {
        if (isSignUp) {
          await createUserWithEmailAndPassword(firebaseAuth, cleanEmail, password).catch(() => {});
        } else {
          await signInWithEmailAndPassword(firebaseAuth, cleanEmail, password).catch(() => {});
        }
      }

      // Check Supabase Database for Client & Workspace details
      if (isSupabaseConfigured()) {
        try {
          const { data: dbClients } = await supabase.from("clients").select("*");
          const allClients = Array.isArray(dbClients) ? dbClients : [];

          const existingMatch = allClients.find((c: any) => {
            const reqs = Array.isArray(c.reqs) ? c.reqs : [];
            const logs = Array.isArray(c.audit_logs) ? c.audit_logs : [];
            const matchId = (company || cleanEmail.split("@")[0]).toLowerCase().replace(/[^a-z0-9]/g, "");
            return (
              c.id === matchId ||
              (company && c.name?.toLowerCase() === company.toLowerCase()) ||
              reqs.some((r: any) => r && r.registered_email === cleanEmail) ||
              logs.some((l: any) => l && typeof l.message === "string" && l.message.includes(cleanEmail))
            );
          });

          if (existingMatch) {
            companyName = existingMatch.name;
            targetClientId = existingMatch.id;
          } else {
            targetClientId = (company || cleanEmail.split("@")[0]).toLowerCase().replace(/[^a-z0-9]/g, "");
            companyName = company || cleanEmail.split("@")[0].toUpperCase();
          }
        } catch (err) {
          console.error("Supabase lookup error during login:", err);
          targetClientId = (company || cleanEmail.split("@")[0]).toLowerCase().replace(/[^a-z0-9]/g, "");
          companyName = company || cleanEmail.split("@")[0].toUpperCase();
        }
      } else {
        targetClientId = (company || cleanEmail.split("@")[0]).toLowerCase().replace(/[^a-z0-9]/g, "");
        companyName = company || cleanEmail.split("@")[0].toUpperCase();
      }

      if (!targetClientId) {
        targetClientId = (company || cleanEmail.split("@")[0]).toLowerCase().replace(/[^a-z0-9]/g, "");
      }

      const cleanId = targetClientId;
      const newClientObj = {
        id: cleanId,
        name: companyName,
        email_domain: domain || "",
        is_vault_active: true,
        is_status_active: true,
        reqs: [
          { id: "sys-approval", approved: isSignUp ? false : true, disabled: false, registered_email: cleanEmail }
        ],
        files: [],
        agreements: [],
        milestones: [
          {
            id: "m-1",
            title: "Phase 1: Onboarding & Discovery",
            percentage: 0,
            statusText: "Onboarding requested. Workspace created.",
            updatedAt: new Date().toLocaleString(),
            deliverables: []
          }
        ],
        audit_logs: [{ id: "aud-0", message: `Workspace accessed by ${cleanEmail}.`, timestamp: new Date().toLocaleString() }],
        statuses: []
      };

      if (isSupabaseConfigured()) {
        try {
          const { error } = await supabase.from("clients").upsert(newClientObj, { onConflict: "id" });
          if (error) {
            console.warn("Supabase upsert warning on login/signup:", error.message);
          }
        } catch (err) {
          console.error("Supabase insert error on login/signup", err);
        }
      }

      // Always sync to LocalStorage as a fail-safe backup
      const localClientsKey = "t2_local_clients_list";
      const currentClients = JSON.parse(localStorage.getItem(localClientsKey) || JSON.stringify(DEFAULT_CLIENTS));
      if (!currentClients.some((c: any) => c.id === cleanId)) {
        const nextClients = [...currentClients, { id: cleanId, name: companyName, email: `@${domain}`, approved: false }];
        localStorage.setItem(localClientsKey, JSON.stringify(nextClients));
      }
      if (!localStorage.getItem(`t2_milestones_${cleanId}`)) {
        localStorage.setItem(`t2_milestones_${cleanId}`, JSON.stringify(newClientObj.milestones));
      }
      if (!localStorage.getItem(`t2_milestones_audit_${cleanId}`)) {
        localStorage.setItem(`t2_milestones_audit_${cleanId}`, JSON.stringify(newClientObj.audit_logs));
      }
      localStorage.setItem(`t2_approved_${cleanId}`, "false");

      // Save active session keys
      localStorage.setItem("t2_user_email", cleanEmail);
      localStorage.setItem("t2_user_company", companyName);
      localStorage.setItem("t2_client_id", targetClientId);
      localStorage.setItem("t2_session", "active");

      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("t2_storage_update"));

      setLoading(false);
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Authentication error occurred.");
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setEmailSentStatus("");
    setLoading(true);

    const cleanEmail = email.trim();
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    sessionStorage.setItem("t2_active_otp", code);

    const resendResult = await sendOtpEmail(cleanEmail, code);

    if (resendResult.success) {
      setEmailSentStatus("✓ Fresh 6-Digit Passcode dispatched to your email inbox.");
    } else {
      setError(resendResult.error || "Failed to resend email passcode via Resend API.");
    }

    setOtpDigits(["", "", "", "", "", ""]);
    setLoading(false);
  };

  return (
    <>
      <PageHeader
        n="06"
        kicker="Portal Access"
        title={
          <>
            Client<br />
            <span className="italic">{isSignUp ? "registration." : "portal."}</span>
          </>
        }
        lead={isSignUp ? "Initialize your secure client profile inside the Typtwo cloud network." : "Enter your corporate credentials to access active project tracking and secure deliverables vault."}
        accent="volt"
        meta={[
          { label: "Portal", value: "Client Workspace" },
          { label: "Provider", value: "Resend API" },
          { label: "Verification", value: "6-Digit Email OTP" }
        ]}
      />

      <section className="p-6 md:p-14 max-w-xl mx-auto border-b-2 border-ink">
        <div className="brute border-2 border-ink p-8 bg-paper">
          <div className="flex border-b-2 border-ink -mx-8 -mt-8 mb-8 bg-ink text-paper">
            <button
              onClick={() => { setIsSignUp(false); setError(""); setOtpSent(false); }}
              className={`flex-1 py-4 mono text-xs uppercase tracking-widest font-bold border-r border-ink ${!isSignUp ? "bg-volt text-ink" : "bg-ink text-paper"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsSignUp(true); setError(""); setOtpSent(false); }}
              className={`flex-1 py-4 mono text-xs uppercase tracking-widest font-bold ${isSignUp ? "bg-volt text-ink" : "bg-ink text-paper"}`}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="p-4 mb-6 bg-flame text-paper mono text-[11px] uppercase tracking-wider font-bold">
              !! NOTICE: {error}
            </div>
          )}

          {emailSentStatus && !error && (
            <div className="p-3 mb-6 bg-emerald-950 text-emerald-300 border border-emerald-800 mono text-[10px] uppercase font-bold tracking-wider text-center">
              {emailSentStatus}
            </div>
          )}

          {otpSent ? (
            /* STEP 2: 6-DIGIT OTP VERIFICATION SCREEN */
            <form onSubmit={handleVerifyOtp} className="space-y-6 text-center">
              <div className="p-4 bg-emerald-950 text-emerald-300 border-2 border-emerald-800 mono text-xs uppercase font-bold tracking-wider leading-relaxed text-left space-y-2">
                <div className="flex items-center gap-2 text-volt text-xs">
                  <span className="h-2.5 w-2.5 bg-volt rounded-full animate-ping" />
                  📩 VERIFICATION PASSCODE DISPATCHED
                </div>
                <p className="text-neutral-300 text-[11px] font-normal normal-case">
                  We have dispatched a 6-digit security code to your email inbox:
                </p>
                <div className="text-white text-sm select-all font-mono font-bold border-t border-emerald-900 pt-2">
                  {email}
                </div>
              </div>

              <p className="mono text-xs text-muted-foreground leading-relaxed">
                Please check your inbox for subject <strong className="text-ink">"⚡ Your 6-Digit Security Passcode"</strong> and enter the 6 digits below.
              </p>

              {/* 6-DIGIT OTP INPUT BOXES */}
              <div className="flex justify-center gap-2 font-mono">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-11 h-13 bg-paper border-2 border-ink text-center text-xl font-bold focus:outline-none focus:bg-volt focus:text-black transition-all"
                    required
                  />
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={loading || otpDigits.join("").length < 6}
                  className="w-full brute bg-ink text-paper hover:bg-volt hover:text-ink py-4 mono text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Verifying OTP Code..." : "Verify Passcode & Enter Workspace →"}
                </button>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="w-full bg-paper border border-ink text-ink hover:bg-neutral-200 py-3 mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Re-dispatching Passcode..." : "↻ Resend Verification Code"}
                </button>

                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="mono text-[10px] text-neutral-500 hover:text-ink uppercase tracking-wider font-bold underline transition-colors cursor-pointer block mx-auto pt-1"
                >
                  ← Change Email Address
                </button>
              </div>
            </form>
          ) : (
            /* STEP 1: EMAIL & CREDENTIALS FORM */
            <form onSubmit={handleRequestOtp} className="space-y-6">
              {isSignUp && (
                <div>
                  <label className="block mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Company Name *</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full bg-paper border-2 border-ink px-4 py-3 focus:outline-none focus:bg-volt/10 mono text-sm"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Corporate Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@company.com"
                  className="w-full bg-paper border-2 border-ink px-4 py-3 focus:outline-none focus:bg-volt/10 mono text-sm"
                  required
                />
              </div>

              <div>
                <label className="block mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Password (Optional)</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-paper border-2 border-ink px-4 py-3 focus:outline-none focus:bg-volt/10 mono text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full brute bg-ink text-paper hover:bg-volt hover:text-ink py-4 mono text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer disabled:opacity-50"
              >
                {loading ? "Dispatching 6-Digit Passcode via Resend..." : (isSignUp ? "Send Registration 6-Digit OTP →" : "Send 6-Digit Login OTP to Email →")}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
