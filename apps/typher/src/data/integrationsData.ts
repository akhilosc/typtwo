export interface IntegrationItem {
  id: string;
  name: string;
  category: 'CRM' | 'ERP' | 'EMAIL' | 'DOCUMENTS' | 'DATABASES' | 'COMMUNICATION' | 'DEVELOPMENT' | 'ANALYTICS';
  status: 'AVAILABLE' | 'COMING SOON' | 'API / CUSTOM';
  description: string;
  iconType: string;
  angle: number; // for circular network layout (degrees)
  distance: number; // radius from center
}

export const INTEGRATIONS_DATA: IntegrationItem[] = [
  {
    id: 'slack',
    name: 'Slack',
    category: 'COMMUNICATION',
    status: 'AVAILABLE',
    description: 'Autonomous copilot bots, channel summarization, and private alert routing inside your workspace.',
    iconType: 'slack',
    angle: 200,
    distance: 190,
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'CRM',
    status: 'COMING SOON',
    description: 'Automated CRM deal stage synchronization, lead enrichment, and customer interaction synthesis.',
    iconType: 'salesforce',
    angle: 120,
    distance: 210,
  },
  {
    id: 'm365',
    name: 'Microsoft 365',
    category: 'COMMUNICATION',
    status: 'AVAILABLE',
    description: 'Offline email synthesis, Outlook calendar scheduling, and Word document AST parsing.',
    iconType: 'microsoft',
    angle: 60,
    distance: 200,
  },
  {
    id: 'sap',
    name: 'SAP',
    category: 'ERP',
    status: 'API / CUSTOM',
    description: 'Enterprise resource data querying, inventory forecasting, and financial supply chain analytics.',
    iconType: 'sap',
    angle: 25,
    distance: 220,
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'CRM',
    status: 'COMING SOON',
    description: 'Marketing campaign generation, contact record deduplication, and inbound ticket triage.',
    iconType: 'hubspot',
    angle: 340,
    distance: 190,
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'DEVELOPMENT',
    status: 'AVAILABLE',
    description: 'Automated local pull request reviews, AST vulnerability auditing, and commit message synthesis.',
    iconType: 'github',
    angle: 300,
    distance: 210,
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'DATABASES',
    status: 'AVAILABLE',
    description: 'Natural language Text-to-SQL query generation, schema introspections, and vector embeddings storage.',
    iconType: 'database',
    angle: 250,
    distance: 200,
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'DOCUMENTS',
    status: 'AVAILABLE',
    description: 'Semantic vector retrieval across private team knowledge bases, project specs, and meeting notes.',
    iconType: 'notion',
    angle: 225,
    distance: 140,
  },
  {
    id: 'gdrive',
    name: 'Google Drive',
    category: 'DOCUMENTS',
    status: 'AVAILABLE',
    description: 'Local memory ingestion of PDF contracts, slide decks, and confidential enterprise spreadsheets.',
    iconType: 'google',
    angle: 160,
    distance: 190,
  },
];
