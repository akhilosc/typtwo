# TYPHER — Subdomain Project (`typher.typtwo.com`)

Standalone local AI / LLM machine platform website developed by Typtwo.

## Directory Structure
```
typtwo-website/
├── src/               # typtwo.com corporate site
└── apps/
    └── typher/        # typher.typtwo.com independent product site
```

## Running Locally

### Option 1: From the Root Directory
```bash
# Run Typtwo main site (port 3000)
npm run dev

# Run Typher subdomain site (port 3001)
npm run dev:typher

# Build Typher for production
npm run build:typher
```

### Option 2: Directly inside `apps/typher`
```bash
cd apps/typher
npm install
npm run dev
npm run build
```

## Deployment / Subdomain DNS Configuration
To deploy `typher.typtwo.com` independently on Vercel or Cloudflare:
- **Root Directory**: `apps/typher`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Domain Mapping**: Add custom domain `typher.typtwo.com` (CNAME pointing to your hosting provider).
