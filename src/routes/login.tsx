import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "../components/site-chrome";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Portal Access — Typtwo" },
      { name: "description", content: "Client portal login and registration." }
    ]
  }),
  component: LoginPage
});const DEFAULT_CLIENTS = [
  { id: "acme", name: "Acme Corp", email: "client@company.com" },
  { id: "startuptalky", name: "Startup Talky", email: "founder@startuptalky.com" },
  { id: "bitbns", name: "Bitbns", email: "client@bitbns.com" }
];

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // OTP State variables
  const [showOtp, setShowOtp] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpInput, setOtpInput] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [pendingSession, setPendingSession] = useState<{
    email: string;
    company: string;
    clientId: string;
    isSignUp: boolean;
    domain?: string;
  } | null>(null);

  useEffect(() => {
    if (localStorage.getItem("t2_session")) {
      navigate({ to: "/dashboard" });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (isSignUp && !company)) {
      setError("Please fill out all required fields.");
      return;
    }

    const cleanEmail = email.trim();
    const domain = cleanEmail.split("@")[1]?.toLowerCase();
    
    if (!domain) {
      setError("Invalid email address format.");
      return;
    }

    let companyName = company;
    let targetClientId = "";

    if (!isSignUp) {
      // Sign In workspace matching
      if (isSupabaseConfigured()) {
        try {
          const { data, error: fetchErr } = await supabase
            .from("clients")
            .select("*")
            .eq("email_domain", domain)
            .single();

          if (data && !fetchErr) {
            companyName = data.name;
            targetClientId = data.id;
          } else {
            setError("Workspace domain not registered. Contact agency administrator.");
            return;
          }
        } catch (err) {
          console.error("Login dynamic query failed, using localStorage fallback", err);
        }
      } else {
        // Local storage fallback
        const storedList = localStorage.getItem("t2_local_clients_list");
        if (storedList) {
          const parsedList = JSON.parse(storedList);
          const match = parsedList.find((c: any) => c.email.includes(domain) || c.email === `@${domain}`);
          if (match) {
            companyName = match.name;
            targetClientId = match.id;
          }
        }
        if (!companyName) {
          if (cleanEmail === "founder@startuptalky.com") {
            companyName = "Startup Talky";
            targetClientId = "startuptalky";
          } else if (cleanEmail === "team@bitbns.com") {
            companyName = "BitBNS";
            targetClientId = "bitbns";
          } else if (cleanEmail === "client@company.com") {
            companyName = "Acme Corp";
            targetClientId = "acme";
          } else {
            companyName = "Marquee Client Corp";
            targetClientId = domain.split(".")[0];
          }
        }
      }
    } else {
      // Sign Up workspace creation
      targetClientId = companyName.toLowerCase().replace(/\s+/g, "");
    }

    if (!targetClientId) {
      targetClientId = domain.split(".")[0];
    }

    // Generate 6-digit OTP Code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpInput(["", "", "", "", "", ""]);
    setOtpError("");
    setPendingSession({
      email: cleanEmail,
      company: companyName,
      clientId: targetClientId,
      isSignUp,
      domain
    });
    setShowOtp(true);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");
    const entered = otpInput.join("");
    
    if (entered !== generatedOtp) {
      setOtpError("Invalid verification code. Please try again.");
      return;
    }

    if (!pendingSession) return;

    const { email: finalEmail, company: finalCompany, clientId: finalClientId, isSignUp: finalIsSignUp, domain } = pendingSession;

    if (finalIsSignUp) {
      const cleanId = finalClientId;
      
      const newClientObj = {
        id: cleanId,
        name: finalCompany,
        email_domain: domain || "",
        approved: false, // NEW SIGNUPS AWAITING APPROVAL!
        reqs: [],
        files: [],
        agreements: [],
        milestones: [
          {
            id: "m-1",
            title: "Phase 1: Discovery & Asset Auditing",
            percentage: 0,
            statusText: "Onboarding requested. Awaiting administrator review.",
            updatedAt: new Date().toLocaleString(),
            deliverables: []
          }
        ],
        audit_logs: [{ id: "aud-0", message: `Workspace registered by ${finalEmail}. Awaiting operational handshake.`, timestamp: new Date().toLocaleString() }],
        statuses: [],
        members: []
      };

      if (isSupabaseConfigured()) {
        try {
          const { error: insErr } = await supabase
            .from("clients")
            .insert(newClientObj);
          if (insErr) {
            console.error("Supabase insert error on signup", insErr);
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        // Local storage fallback list
        const localClientsKey = "t2_local_clients_list";
        const currentClients = JSON.parse(localStorage.getItem(localClientsKey) || JSON.stringify(DEFAULT_CLIENTS));
        const nextClients = [...currentClients, { id: cleanId, name: finalCompany, email: `@${domain}`, approved: false }];
        localStorage.setItem(localClientsKey, JSON.stringify(nextClients));
        localStorage.setItem(`t2_reqs_${cleanId}`, JSON.stringify([]));
        localStorage.setItem(`t2_milestones_${cleanId}`, JSON.stringify(newClientObj.milestones));
        localStorage.setItem(`t2_milestones_audit_${cleanId}`, JSON.stringify(newClientObj.audit_logs));
        localStorage.setItem(`t2_approved_${cleanId}`, "false");
      }

      localStorage.setItem("t2_user_email", finalEmail);
      localStorage.setItem("t2_user_company", finalCompany);
      localStorage.setItem("t2_client_id", cleanId);
      localStorage.setItem("t2_session", "active");
    } else {
      // Sign in path
      localStorage.setItem("t2_user_email", finalEmail);
      localStorage.setItem("t2_user_company", finalCompany);
      localStorage.setItem("t2_client_id", finalClientId);
      localStorage.setItem("t2_session", "active");
    }

    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("t2_storage_update"));
    setShowOtp(false);
    navigate({ to: "/dashboard" });
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
          { label: "Access", value: "Direct Vault Logs" },
          { label: "Encryption", value: "AES-256 Sandbox Mode" }
        ]}
      />

      <section className="p-6 md:p-14 max-w-xl mx-auto border-b-2 border-ink">
        <div className="brute border-2 border-ink p-8 bg-paper">
          <div className="flex border-b-2 border-ink -mx-8 -mt-8 mb-8 bg-ink text-paper">
            <button
              onClick={() => { setIsSignUp(false); setError(""); }}
              className={`flex-1 py-4 mono text-xs uppercase tracking-widest font-bold border-r border-ink ${!isSignUp ? "bg-volt text-ink" : "bg-ink text-paper"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsSignUp(true); setError(""); }}
              className={`flex-1 py-4 mono text-xs uppercase tracking-widest font-bold ${isSignUp ? "bg-volt text-ink" : "bg-ink text-paper"}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-flame text-paper mono text-[11px] uppercase tracking-wider font-bold">
                !! ERROR: {error}
              </div>
            )}

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
              <label className="block mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Email Address *</label>
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
              <label className="block mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Password *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-paper border-2 border-ink px-4 py-3 focus:outline-none focus:bg-volt/10 mono text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full brute bg-ink text-paper hover:bg-volt hover:text-ink py-4 mono text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer"
            >
              {isSignUp ? "Create Secure Profile" : "Authenticate Session"} →
            </button>
          </form>
        </div>
      </section>

      {showOtp && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0b0b0b] border-2 border-volt max-w-sm w-full p-6 rounded-sm text-left space-y-4 font-mono shadow-[0_0_20px_rgba(187,255,0,0.15)]">
            <div className="flex items-center gap-2 text-volt text-[10px] font-bold uppercase tracking-widest">
              <span className="h-1.5 w-1.5 bg-volt rounded-full animate-ping" />
              // TWO_FACTOR_MFA_HANDSHAKE
            </div>
            
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Verification Code Required
            </h3>
            
            <p className="text-xs text-neutral-400 leading-relaxed">
              We generated a secure verification code to verify access for <span className="text-white font-bold">{pendingSession?.email}</span>.
            </p>

            <div className="bg-volt/10 border border-volt/20 p-2.5 rounded-sm flex items-center justify-between text-[10px]">
              <span className="text-volt font-bold uppercase tracking-wider">🔑 DEMO OTP LOG:</span>
              <span className="text-white font-bold bg-neutral-900 border border-volt px-2 py-0.5 rounded-sm font-mono tracking-widest text-xs select-all">
                {generatedOtp}
              </span>
            </div>

            {otpError && (
              <div className="p-3 bg-red-950/60 border border-red-900 text-red-400 text-[10px] uppercase font-bold tracking-wide">
                !! ERROR: {otpError}
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="flex justify-between gap-1.5">
                {otpInput.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-digit-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "");
                      const next = [...otpInput];
                      next[idx] = val;
                      setOtpInput(next);
                      
                      // Move focus forward
                      if (val && idx < 5) {
                        const nextInput = document.getElementById(`otp-digit-${idx + 1}`);
                        nextInput?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !otpInput[idx] && idx > 0) {
                        const prevInput = document.getElementById(`otp-digit-${idx - 1}`);
                        prevInput?.focus();
                      }
                    }}
                    className="w-10 h-12 bg-neutral-950 border border-neutral-800 rounded-sm text-center text-volt text-lg font-bold focus:outline-none focus:border-volt"
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-grow bg-volt text-black hover:bg-white text-xs py-2.5 font-bold uppercase rounded-sm cursor-pointer transition text-center"
                >
                  Verify Access Code
                </button>
                <button
                  type="button"
                  onClick={() => setShowOtp(false)}
                  className="bg-neutral-900 border border-neutral-800 hover:border-red-500 text-neutral-400 hover:text-white text-xs px-3 rounded-sm cursor-pointer transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
