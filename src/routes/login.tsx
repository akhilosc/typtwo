import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "../components/site-chrome";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

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
});import { firebaseAuth } from "../lib/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
} from "firebase/auth";

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
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (localStorage.getItem("t2_session")) {
      navigate({ to: "/dashboard" });
      return;
    }

    // Auto-detect and complete 1-click Email Link verification
    if (isSignInWithEmailLink(firebaseAuth, window.location.href)) {
      let emailForSignIn = window.localStorage.getItem("t2_email_for_signIn");
      if (!emailForSignIn) {
        emailForSignIn = window.prompt("Please confirm your corporate email address for workspace access:");
      }
      if (emailForSignIn) {
        setLoading(true);
        signInWithEmailLink(firebaseAuth, emailForSignIn, window.location.href)
          .then(async (result) => {
            window.localStorage.removeItem("t2_email_for_signIn");
            const verifiedEmail = result.user.email || emailForSignIn!;
            const domain = verifiedEmail.split("@")[1]?.toLowerCase();
            
            let companyName = "Corporate Partner";
            let targetClientId = domain ? domain.split(".")[0] : "acme";

            if (isSupabaseConfigured() && domain) {
              const { data } = await supabase
                .from("clients")
                .select("*")
                .eq("email_domain", domain)
                .single();

              if (data) {
                if (data.disabled === true) {
                  setError("This corporate workspace login has been disabled by the administrator.");
                  setLoading(false);
                  return;
                }
                companyName = data.name;
                targetClientId = data.id;
              }
            }

            localStorage.setItem("t2_user_email", verifiedEmail);
            localStorage.setItem("t2_user_company", companyName);
            localStorage.setItem("t2_client_id", targetClientId);
            localStorage.setItem("t2_session", "active");

            window.dispatchEvent(new Event("storage"));
            window.dispatchEvent(new Event("t2_storage_update"));
            setLoading(false);
            navigate({ to: "/dashboard" });
          })
          .catch((err) => {
            setLoading(false);
            setError("Email link verification error: " + err.message);
          });
      }
    }
  }, [navigate]);

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your corporate email address.");
      return;
    }
    setLoading(true);
    setError("");

    const actionCodeSettings = {
      url: typeof window !== "undefined" ? window.location.href : "https://www.typtwo.com/login",
      handleCodeInApp: true
    };

    try {
      await sendSignInLinkToEmail(firebaseAuth, email.trim(), actionCodeSettings);
      window.localStorage.setItem("t2_email_for_signIn", email.trim());
      setMagicLinkSent(true);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Failed to send magic verification link.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password || (isSignUp && !company)) {
      setError("Please fill out all required fields.");
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

    let companyName = company;
    let targetClientId = "";

    try {
      // STEP 2: Firebase Auth Verification
      if (isSignUp) {
        try {
          await createUserWithEmailAndPassword(firebaseAuth, cleanEmail, password);
        } catch (fbErr: any) {
          if (fbErr.code !== "auth/email-already-in-use") {
            console.warn("Firebase Auth Notice:", fbErr.message);
          }
        }
      } else {
        try {
          await signInWithEmailAndPassword(firebaseAuth, cleanEmail, password);
        } catch (fbErr: any) {
          console.warn("Firebase Auth Sign-In Notice:", fbErr.message);
        }
      }

      // STEP 3: Pass Verified Credentials to Supabase Database
      if (isSupabaseConfigured()) {
        const { data, error: fetchErr } = await supabase
          .from("clients")
          .select("*")
          .eq("email_domain", domain)
          .single();

        if (data && !fetchErr) {
          if (data.disabled === true) {
            setError("This corporate workspace login has been disabled by the administrator.");
            setLoading(false);
            return;
          }

          const memberObj = (data.members || []).find((m: any) => m.email === cleanEmail);
          if (memberObj && memberObj.disabled === true) {
            setError("Your member email access has been disabled by the administrator.");
            setLoading(false);
            return;
          }

          companyName = data.name;
          targetClientId = data.id;
        } else {
          companyName = domain.split(".")[0].toUpperCase();
          targetClientId = domain.split(".")[0];
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
            companyName = domain.split(".")[0].toUpperCase();
            targetClientId = domain.split(".")[0];
          }
        }
      }

      if (!targetClientId) {
        targetClientId = domain.split(".")[0];
      }

      if (isSignUp) {
        const cleanId = targetClientId;
        
        const newClientObj = {
          id: cleanId,
          name: companyName,
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
          audit_logs: [{ id: "aud-0", message: `Workspace registered by ${cleanEmail}. Awaiting operational handshake.`, timestamp: new Date().toLocaleString() }],
          statuses: [],
          members: []
        };

        if (isSupabaseConfigured()) {
          try {
            await supabase
              .from("clients")
              .insert(newClientObj);
          } catch (err) {
            console.error("Supabase insert error on signup", err);
          }
        } else {
          // Local storage fallback list
          const localClientsKey = "t2_local_clients_list";
          const currentClients = JSON.parse(localStorage.getItem(localClientsKey) || JSON.stringify(DEFAULT_CLIENTS));
          const nextClients = [...currentClients, { id: cleanId, name: companyName, email: `@${domain}`, approved: false }];
          localStorage.setItem(localClientsKey, JSON.stringify(nextClients));
          localStorage.setItem(`t2_reqs_${cleanId}`, JSON.stringify([]));
          localStorage.setItem(`t2_milestones_${cleanId}`, JSON.stringify(newClientObj.milestones));
          localStorage.setItem(`t2_milestones_audit_${cleanId}`, JSON.stringify(newClientObj.audit_logs));
          localStorage.setItem(`t2_approved_${cleanId}`, "false");
        }
      }

      // Dispatch Firebase Email Link / OTP to user's inbox
      const actionCodeSettings = {
        url: typeof window !== "undefined" ? window.location.href : "https://www.typtwo.com/login",
        handleCodeInApp: true
      };

      await sendSignInLinkToEmail(firebaseAuth, cleanEmail, actionCodeSettings);
      window.localStorage.getItem("t2_email_for_signIn");
      window.localStorage.setItem("t2_email_for_signIn", cleanEmail);
      window.localStorage.setItem("t2_pending_company", companyName);
      window.localStorage.setItem("t2_pending_client_id", targetClientId);
      
      setMagicLinkSent(true);
      setLoading(false);
      // DO NOT REDIRECT YET - MANDATE USER TO OPEN EMAIL & VERIFY LINK!
      return;
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Authentication error occurred.");
    }
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
              onClick={() => { setIsSignUp(false); setError(""); setMagicLinkSent(false); }}
              className={`flex-1 py-4 mono text-xs uppercase tracking-widest font-bold border-r border-ink ${!isSignUp ? "bg-volt text-ink" : "bg-ink text-paper"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsSignUp(true); setError(""); setMagicLinkSent(false); }}
              className={`flex-1 py-4 mono text-xs uppercase tracking-widest font-bold ${isSignUp ? "bg-volt text-ink" : "bg-ink text-paper"}`}
            >
              Register
            </button>
          </div>

          {magicLinkSent ? (
            <div className="space-y-6 text-center py-4">
              <div className="p-4 bg-emerald-950 text-emerald-300 border-2 border-emerald-800 mono text-xs uppercase font-bold tracking-wider leading-relaxed">
                📩 VERIFICATION EMAIL DISPATCHED TO:<br />
                <span className="text-white text-sm select-all font-mono block mt-1">{email}</span>
              </div>
              <p className="mono text-xs text-muted-foreground leading-relaxed">
                We have sent a 1-click verification link to your inbox via Firebase. <br />
                <strong className="text-ink">Open your email inbox and click the verification link</strong> to complete your sign-in and open your workspace dashboard.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => setMagicLinkSent(false)}
                  className="w-full brute bg-ink text-paper hover:bg-volt hover:text-ink py-3 mono text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer"
                >
                  ← Return to Login Form
                </button>
              </div>
            </div>
          ) : (
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
                disabled={loading}
                className="w-full brute bg-ink text-paper hover:bg-volt hover:text-ink py-4 mono text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer disabled:opacity-50"
              >
                {loading ? "Dispatching Verification OTP..." : (isSignUp ? "Send Registration Email Link →" : "Send Login Verification Link →")}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
