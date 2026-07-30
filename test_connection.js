import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://evomrjbbedgpxdwinzyt.supabase.co';
const supabaseAnonKey = 'sb_publishable_uWnW6VyQQY6Nb4xBL8Mv8w_EOARB_1f';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  console.log("Seeding initial client accounts...");
  const initialClients = [
    {
      id: 'acme',
      name: 'Acme Corp',
      email_domain: 'company.com',
      reqs: [],
      files: [],
      agreements: [],
      milestones: [
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
      ],
      audit_logs: [{ id: "aud-0", message: "Client milestones database initialized.", timestamp: new Date().toLocaleString() }],
      statuses: []
    },
    {
      id: 'startuptalky',
      name: 'Startup Talky',
      email_domain: 'startuptalky.com',
      reqs: [],
      files: [],
      agreements: [],
      milestones: [
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
      ],
      audit_logs: [{ id: "aud-0", message: "Client milestones database initialized.", timestamp: new Date().toLocaleString() }],
      statuses: []
    },
    {
      id: 'bitbns',
      name: 'Bitbns',
      email_domain: 'bitbns.com',
      reqs: [],
      files: [],
      agreements: [],
      milestones: [
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
      ],
      audit_logs: [{ id: "aud-0", message: "Client milestones database initialized.", timestamp: new Date().toLocaleString() }],
      statuses: []
    }
  ];

  for (const c of initialClients) {
    const { error } = await supabase
      .from('clients')
      .upsert(c);
    
    if (error) {
      console.error(`❌ Failed to upsert ${c.name}:`, error);
    } else {
      console.log(`✅ Upserted ${c.name}`);
    }
  }

  // Double check
  const { data } = await supabase.from('clients').select('*');
  console.log("Database seeded successfully. Client count now:", data.length);
  process.exit(0);
}

run();
