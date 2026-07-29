import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader } from "../components/site-chrome";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Portal Access — Typtwo" },
      { name: "description", content: "Client portal login and registration." }
    ]
  }),
  component: LoginPage
});

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("t2_session")) {
      navigate({ to: "/dashboard" });
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (isSignUp && !company)) {
      setError("Please fill out all required fields.");
      return;
    }

    if (isSignUp) {
      localStorage.setItem("t2_user_email", email);
      localStorage.setItem("t2_user_company", company);
      localStorage.setItem("t2_session", "active");
      
      // Dispatch storage event to notify SiteHeader
      window.dispatchEvent(new Event("storage"));
      navigate({ to: "/dashboard" });
    } else {
      localStorage.setItem("t2_user_email", email);
      if (!localStorage.getItem("t2_user_company")) {
        localStorage.setItem("t2_user_company", "Marquee Client Corp");
      }
      localStorage.setItem("t2_session", "active");
      
      // Dispatch storage event to notify SiteHeader
      window.dispatchEvent(new Event("storage"));
      navigate({ to: "/dashboard" });
    }
  };

  return (
    <>
      <PageHeader
        n="05"
        kicker="Portal Access"
        title={
          <>
            Client<br />
            <span className="italic">{isSignUp ? "registration." : "portal."}</span>
          </>
        }
        lead={isSignUp ? "Initialize your secure client profile inside the Typtwo cloud network." : "Enter your corporate credentials to access active project tracking and secure deliverables vault."}
        accent="volt"
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
    </>
  );
}
