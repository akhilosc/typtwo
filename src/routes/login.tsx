import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "../components/site-chrome";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { firebaseAuth } from "../lib/firebase";
import { 
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
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
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  
  const [linkSent, setLinkSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Auto-detect and process 1-click email verification link click
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (localStorage.getItem("t2_session")) {
      navigate({ to: "/dashboard" });
      return;
    }

    if (isSignInWithEmailLink(firebaseAuth, window.location.href)) {
      const urlParams = new URLSearchParams(window.location.search);
      let emailForSignIn = urlParams.get("email") || window.localStorage.getItem("t2_email_for_signIn");

      if (emailForSignIn) {
        setLoading(true);
        signInWithEmailLink(firebaseAuth, emailForSignIn, window.location.href)
          .then(async (result) => {
            window.localStorage.removeItem("t2_email_for_signIn");
            const verifiedEmail = result.user?.email || emailForSignIn!;
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
            setError("Email link verification notice: " + (err.message || "Invalid or expired link. Please request a new link."));
          });
      }
    }
  }, [navigate]);

  // Dispatch 1-Click Verification Link
  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim() || (isSignUp && !company.trim())) {
      setError("Please fill out all required corporate credentials.");
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
    let targetClientId = domain.split(".")[0];

    try {
      // Optional Firebase Password Registration / Verification
      if (password) {
        if (isSignUp) {
          await createUserWithEmailAndPassword(firebaseAuth, cleanEmail, password).catch(() => {});
        } else {
          await signInWithEmailAndPassword(firebaseAuth, cleanEmail, password).catch(() => {});
        }
      }

      // Check / Create Client Record in Supabase
      if (isSupabaseConfigured()) {
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
        } else if (isSignUp) {
          const newClientObj = {
            id: targetClientId,
            name: companyName,
            email_domain: domain,
            approved: false,
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
          await supabase.from("clients").insert(newClientObj).catch(() => {});
        }
      }

      // Send 1-Click Firebase Auth Email Link
      const linkBaseUrl = typeof window !== "undefined" ? `${window.location.origin}/login` : "https://www.typtwo.com/login";
      const actionCodeSettings = {
        url: `${linkBaseUrl}?email=${encodeURIComponent(cleanEmail)}`,
        handleCodeInApp: true
      };

      await sendSignInLinkToEmail(firebaseAuth, cleanEmail, actionCodeSettings);
      window.localStorage.setItem("t2_email_for_signIn", cleanEmail);
      
      setLinkSent(true);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Failed to dispatch verification link to your email.");
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
          { label: "Verification", value: "1-Click Email Link" }
        ]}
      />

      <section className="p-6 md:p-14 max-w-xl mx-auto border-b-2 border-ink">
        <div className="brute border-2 border-ink p-8 bg-paper">
          <div className="flex border-b-2 border-ink -mx-8 -mt-8 mb-8 bg-ink text-paper">
            <button
              onClick={() => { setIsSignUp(false); setError(""); setLinkSent(false); }}
              className={`flex-1 py-4 mono text-xs uppercase tracking-widest font-bold border-r border-ink ${!isSignUp ? "bg-volt text-ink" : "bg-ink text-paper"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsSignUp(true); setError(""); setLinkSent(false); }}
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

          {linkSent ? (
            /* STEP 2: VERIFICATION LINK DISPATCHED CONFIRMATION SCREEN */
            <div className="space-y-6 text-center py-2 font-mono">
              <div className="p-5 bg-emerald-950 text-emerald-300 border-2 border-emerald-800 text-xs uppercase font-bold tracking-wider leading-relaxed text-left space-y-2">
                <div className="flex items-center gap-2 text-volt text-sm">
                  <span className="h-2.5 w-2.5 bg-volt rounded-full animate-ping" />
                  📩 VERIFICATION LINK DISPATCHED
                </div>
                <p className="text-neutral-300 text-[11px] font-normal normal-case">
                  We have sent an official 1-click sign-in link to:
                </p>
                <div className="text-white text-sm select-all font-mono font-bold border-t border-emerald-900 pt-2">
                  {email}
                </div>
              </div>

              <div className="p-4 bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs text-left leading-relaxed space-y-2">
                <strong className="text-white block uppercase">// WHAT TO DO NEXT:</strong>
                <ol className="list-decimal list-inside space-y-1.5 text-[11px]">
                  <li>Open your corporate email inbox (check Spam/Junk folder if not in primary inbox).</li>
                  <li>Click the <span className="text-volt font-bold">1-Click Sign-In Link</span> inside the email.</li>
                  <li>You will be instantly redirected to your workspace dashboard.</li>
                </ol>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setLinkSent(false)}
                  className="w-full brute bg-ink text-paper hover:bg-volt hover:text-ink py-3.5 mono text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer"
                >
                  ← Request New Link or Change Email
                </button>
              </div>
            </div>
          ) : (
            /* STEP 1: EMAIL & CREDENTIALS FORM */
            <form onSubmit={handleSendLink} className="space-y-6">
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
                {loading ? "Dispatching 1-Click Verification Link..." : (isSignUp ? "Send 1-Click Registration Link →" : "Send 1-Click Login Link →")}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
