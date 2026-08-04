/**
 * Central mock domain model for the AI Command Center.
 * Deterministic (seeded) so SSR and client render identically.
 */

export type Status = "active" | "paused" | "draft" | "error";
export type Health = "healthy" | "degraded" | "critical";

function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}
const rnd = seeded(20260803);
const at = <T,>(arr: readonly T[], i: number): T => arr[((i % arr.length) + arr.length) % arr.length] as T;
const pick = <T,>(arr: readonly T[], r = rnd()): T => at(arr, Math.floor(r * arr.length));
const between = (min: number, max: number, r = rnd()) => min + (max - min) * r;

// ==================== EXTENDED MOCK DATASETS ====================

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  type: string;
  task: string;
  latency: string;
  accuracy: number;
  costPer1kTokens: string;
  status: "Active" | "Testing" | "Deprecated";
}

export const MODELS: AIModel[] = [
  { id: "mod-1", name: "Claude 3.5 Sonnet", provider: "Anthropic", type: "LLM", task: "Reasoning & SOP Synthesis", latency: "240 ms", accuracy: 99.4, costPer1kTokens: "$0.003", status: "Active" },
  { id: "mod-2", name: "GPT-4o", provider: "OpenAI", type: "LLM", task: "Complex Code & Workflow Logic", latency: "310 ms", accuracy: 99.1, costPer1kTokens: "$0.005", status: "Active" },
  { id: "mod-3", name: "Gemini 1.5 Pro", provider: "Google", type: "Multimodal LLM", task: "Large Document & Schematic Analysis", latency: "280 ms", accuracy: 98.9, costPer1kTokens: "$0.0025", status: "Active" },
  { id: "mod-4", name: "Llama 3.1 70B", provider: "Meta / On-Prem", type: "Open LLM", task: "Plant Safety & Data Privacy Guardrails", latency: "95 ms", accuracy: 99.6, costPer1kTokens: "$0.0005", status: "Active" },
  { id: "mod-5", name: "ChemBERTa-v2", provider: "HuggingFace / In-House", type: "Domain Embedder", task: "Molecular Structure & Material Search", latency: "42 ms", accuracy: 99.8, costPer1kTokens: "$0.0001", status: "Active" },
  { id: "mod-6", name: "Fine-Tuned Llama-3-SOP", provider: "Custom ChemCorp", type: "Fine-Tuned", task: "Batch Record & Regulatory Compliance", latency: "110 ms", accuracy: 99.3, costPer1kTokens: "$0.0008", status: "Active" },
];

export interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  version: string;
  author: string;
  successRate: number;
  usageCount: number;
  lastUpdated: string;
}

export const PROMPTS: PromptTemplate[] = [
  { id: "pr-1", name: "MSDS Hazard Class Extraction", category: "Regulatory", version: "v2.4", author: "Dr. Ananya Sharma", successRate: 99.6, usageCount: 4280, lastUpdated: "2d ago" },
  { id: "pr-2", name: "Supplier RFQ Generator", category: "Procurement", version: "v3.1", author: "R. Venkatesan", successRate: 98.9, usageCount: 1850, lastUpdated: "1d ago" },
  { id: "pr-3", name: "Quality Control Deviation Summarizer", category: "Quality Assurance", version: "v1.8", author: "Marcus Chen", successRate: 99.2, usageCount: 3120, lastUpdated: "4h ago" },
  { id: "pr-4", name: "Batch Yield Variance Diagnostic", category: "Production Planning", version: "v2.0", author: "Dr. Ananya Sharma", successRate: 98.7, usageCount: 940, lastUpdated: "3d ago" },
  { id: "pr-5", name: "Commercial Contract Clause Reviewer", category: "Legal", version: "v1.5", author: "Sarah Jenkins", successRate: 99.4, usageCount: 650, lastUpdated: "5d ago" },
  { id: "pr-6", name: "Preventive Maintenance Scheduling Prompt", category: "Engineering", version: "v2.2", author: "Marcus Chen", successRate: 99.0, usageCount: 2410, lastUpdated: "12h ago" },
];

export interface WorkflowExecution {
  id: string;
  workflowName: string;
  trigger: string;
  duration: string;
  nodesExecuted: number;
  status: "Completed" | "Running" | "Failed" | "Retrying";
  timestamp: string;
}

export const WORKFLOW_EXECUTIONS: WorkflowExecution[] = [
  { id: "wf-8910", workflowName: "Invoice Exception Auto-Reconciliation", trigger: "SAP Webhook", duration: "1.4s", nodesExecuted: 8, status: "Completed", timestamp: "2 mins ago" },
  { id: "wf-8911", workflowName: "Plant Reactor Overheat Risk Alert", trigger: "IoT Sensor Event", duration: "0.4s", nodesExecuted: 6, status: "Completed", timestamp: "5 mins ago" },
  { id: "wf-8912", workflowName: "Batch Quality Certificate Release", trigger: "LIMS Approval", duration: "2.1s", nodesExecuted: 12, status: "Completed", timestamp: "12 mins ago" },
  { id: "wf-8913", workflowName: "Hazardous Solvent Reorder Dispatch", trigger: "Inventory Threshold", duration: "3.5s", nodesExecuted: 9, status: "Running", timestamp: "Just now" },
  { id: "wf-8914", workflowName: "Quarterly Environmental Audit Compilation", trigger: "Scheduled Cron", duration: "8.2s", nodesExecuted: 15, status: "Completed", timestamp: "1 hour ago" },
];

export interface PolicyOrDocument {
  id: string;
  title: string;
  code: string;
  category: "Policy" | "SOP" | "Contract" | "MSDS" | "TDS" | "Certificate";
  department: string;
  complianceStandard: string;
  effectiveDate: string;
  status: "Active" | "Under Review" | "Archived";
}

export const POLICIES_AND_GRAPH: PolicyOrDocument[] = [
  { id: "pol-101", title: "ISO 9001:2015 Chemical Quality Standard", code: "SOP-QUAL-001", category: "SOP", department: "Quality Assurance", complianceStandard: "ISO 9001", effectiveDate: "2025-01-15", status: "Active" },
  { id: "pol-102", title: "REACH Hazardous Substance Handling Policy", code: "POL-EHS-042", category: "Policy", department: "Regulatory", complianceStandard: "REACH / ECHA", effectiveDate: "2024-11-01", status: "Active" },
  { id: "pol-103", title: "OSHA Chemical Plant Hazard Containment Protocol", code: "SOP-ENG-089", category: "SOP", department: "Engineering", complianceStandard: "OSHA 1910", effectiveDate: "2025-02-10", status: "Active" },
  { id: "pol-104", title: "Ethylene Glycol Material Safety Data Sheet (MSDS)", code: "MSDS-CHEM-772", category: "MSDS", department: "Regulatory", complianceStandard: "GHS / OSHA", effectiveDate: "2026-01-20", status: "Active" },
  { id: "pol-105", title: "High-Purity Solvents Technical Data Sheet (TDS)", code: "TDS-PROD-304", category: "TDS", department: "Laboratory", complianceStandard: "ASTM E300", effectiveDate: "2025-10-05", status: "Active" },
  { id: "pol-106", title: "Global Logistics & Hazardous Transport Contract", code: "CON-LOG-910", category: "Contract", department: "Logistics", complianceStandard: "DOT / ADR", effectiveDate: "2025-04-12", status: "Active" },
];

export interface MISPack {
  id: string;
  title: string;
  department: string;
  frequency: "Daily" | "Weekly" | "Monthly" | "Quarterly";
  format: "PDF & XLSX" | "Executive Dashboard" | "PDF";
  lastGenerated: string;
  recipients: number;
}

export const MIS_PACKS: MISPack[] = [
  { id: "mis-01", title: "Executive AI ROI & Financial Cost Savings Pack", department: "Executive Office", frequency: "Monthly", format: "Executive Dashboard", lastGenerated: "Today 08:00", recipients: 14 },
  { id: "mis-02", title: "Plant Reactor Efficiency & Downtime Summary", department: "Engineering", frequency: "Weekly", format: "PDF & XLSX", lastGenerated: "Yesterday", recipients: 28 },
  { id: "mis-03", title: "Quality Control Yield & Batch Variance Log", department: "Quality Control", frequency: "Daily", format: "PDF & XLSX", lastGenerated: "2 hours ago", recipients: 42 },
  { id: "mis-04", title: "REACH & GHS Regulatory Audit Clearance Pack", department: "Regulatory", frequency: "Monthly", format: "PDF", lastGenerated: "3 days ago", recipients: 9 },
  { id: "mis-05", title: "Global Supply Chain Reorder & Vendor Spend MIS", department: "Procurement", frequency: "Weekly", format: "PDF & XLSX", lastGenerated: "Yesterday", recipients: 35 },
];

export interface AuditLog {
  id: string;
  event: string;
  actor: string;
  role: string;
  ip: string;
  result: "Success" | "Intercepted" | "Denied";
  timestamp: string;
}

export const AUDIT_LOGS: AuditLog[] = [
  { id: "log-4901", event: "Single Sign-On (SSO) Authentication", actor: "r.venkatesan@chemcorp.com", role: "Chief Digital Officer", ip: "10.14.20.101", result: "Success", timestamp: "Just now" },
  { id: "log-4902", event: "High-Value Capex Approval Sign-Off", actor: "a.sharma@chemcorp.com", role: "VP of Plant Operations", ip: "10.14.22.45", result: "Success", timestamp: "4 mins ago" },
  { id: "log-4903", event: "Llama 3.1 Plant Guardrail Evaluation", actor: "AI Agent Engine", role: "System Agent", ip: "127.0.0.1", result: "Success", timestamp: "8 mins ago" },
  { id: "log-4904", event: "API Key Rotation — SAP S/4HANA Connector", actor: "m.chen@chemcorp.com", role: "Lead Process Engineer", ip: "10.14.20.108", result: "Success", timestamp: "24 mins ago" },
  { id: "log-4905", event: "Unauthorized Prompt Alteration Attempt", actor: "guest_contractor@external.com", role: "Auditor", ip: "192.168.1.44", result: "Intercepted", timestamp: "1 hour ago" },
];

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  mfaEnabled: boolean;
  status: "Active" | "Pending" | "Disabled";
  lastLogin: string;
}

export const USERS_LIST: UserAccount[] = [
  { id: "usr-1", name: "R. Venkatesan", email: "r.venkatesan@chemcorp.com", role: "Chief Digital Officer", department: "Executive Office", mfaEnabled: true, status: "Active", lastLogin: "Active Now" },
  { id: "usr-2", name: "Dr. Ananya Sharma", email: "a.sharma@chemcorp.com", role: "VP of Plant Operations", department: "Engineering", mfaEnabled: true, status: "Active", lastLogin: "10 mins ago" },
  { id: "usr-3", name: "Marcus Chen", email: "m.chen@chemcorp.com", role: "Lead Process Automation Engineer", department: "Production Planning", mfaEnabled: true, status: "Active", lastLogin: "30 mins ago" },
  { id: "usr-4", name: "Sarah Jenkins", email: "s.jenkins@chemcorp.com", role: "Regulatory Compliance Director", department: "Regulatory", mfaEnabled: true, status: "Active", lastLogin: "1 hour ago" },
  { id: "usr-5", name: "Rajesh Kumar", email: "r.kumar@chemcorp.com", role: "Head of Procurement", department: "Procurement", mfaEnabled: true, status: "Active", lastLogin: "2 hours ago" },
  { id: "usr-6", name: "Elena Rostova", email: "e.rostova@chemcorp.com", role: "QC Laboratory Manager", department: "Quality Control", mfaEnabled: true, status: "Active", lastLogin: "Yesterday" },
];

export const DEPARTMENTS = [
  "Executive Office",
  "Sales",
  "Marketing",
  "Customer Service",
  "Supply Chain",
  "Procurement",
  "Purchase",
  "Planning",
  "Production Planning",
  "Quality Assurance",
  "Quality Control",
  "Regulatory Affairs",
  "Finance",
  "Accounts",
  "HR",
  "Administration",
  "IT",
  "Engineering Documentation",
  "Maintenance Documentation",
  "Laboratory Documentation",
  "Warehouse",
  "Logistics",
  "Import",
  "Export",
  "Legal",
  "Internal Audit",
  "Project Management",
  "Training",
  "Vendor Management",
  "Business Development",
  "Corporate Strategy",
  "Knowledge Management",
  "Document Control",
  "Technical Services",
  "Compliance",
  "R&D",
  "ISO",
  "Board & Governance",
  "Shared Services",
] as const;

export type Department = (typeof DEPARTMENTS)[number];

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const OWNERS = [
  "R. Venkatesan",
  "A. Khurana",
  "M. Fernandes",
  "S. Iyer",
  "P. Deshmukh",
  "N. Bhatt",
  "K. Raghavan",
  "L. Mathew",
  "T. Sharma",
  "D. Chatterjee",
];

const AGENT_DEFS: Array<[string, Department, string]> = [
  ["Executive AI Assistant", "Executive Office", "Briefs leadership with cross-plant performance digests"],
  ["MIS Generator", "Executive Office", "Compiles daily/monthly MIS packs from ERP + LIMS"],
  ["Board Reporting Agent", "Board & Governance", "Drafts board decks with variance commentary"],
  ["Executive Dashboard Agent", "Executive Office", "Keeps KPI cubes refreshed and anomaly-flagged"],
  ["Corporate Strategy Agent", "Corporate Strategy", "Market, capacity and margin scenario modelling"],
  ["Sales Copilot", "Sales", "Account intelligence, pricing history, next-best-action"],
  ["RFQ Generator", "Sales", "Turns customer enquiries into structured RFQs"],
  ["Quotation Generator", "Sales", "Builds costed quotations with grade specifications"],
  ["Procurement Copilot", "Procurement", "Sourcing strategy and negotiation preparation"],
  ["Vendor Intelligence Agent", "Vendor Management", "Vendor risk, capacity and compliance scoring"],
  ["Purchase Agent", "Purchase", "Auto-creates POs from approved indents"],
  ["Finance Agent", "Finance", "Cashflow, ageing and cost-centre analytics"],
  ["Invoice Processing Agent", "Accounts", "Extracts, matches and posts supplier invoices"],
  ["Accounts Payable Agent", "Accounts", "3-way match, exceptions and payment runs"],
  ["Accounts Receivable Agent", "Accounts", "Collections prioritisation and dunning drafts"],
  ["HR Assistant", "HR", "Policy Q&A, leave and letter generation"],
  ["Recruitment Agent", "HR", "JD drafting, screening and interview summaries"],
  ["Payroll Assistant", "HR", "Payroll input validation and query resolution"],
  ["Compliance Agent", "Compliance", "Statutory calendar tracking and evidence packs"],
  ["Regulatory Agent", "Regulatory Affairs", "REACH / GHS / CLP dossier preparation"],
  ["Quality Agent", "Quality Assurance", "Deviation triage and QMS record drafting"],
  ["CAPA Agent", "Quality Assurance", "Root-cause drafting and CAPA closure tracking"],
  ["Customer Service Agent", "Customer Service", "Order status, docs and technical responses"],
  ["Complaint Agent", "Customer Service", "Complaint intake, classification and 8D drafts"],
  ["Supply Chain Copilot", "Supply Chain", "End-to-end plan visibility and exception handling"],
  ["Planning Agent", "Planning", "Demand-supply balancing proposals"],
  ["Inventory Agent", "Warehouse", "Slow-mover, expiry and reorder intelligence"],
  ["Warehouse Agent", "Warehouse", "Bin allocation, GRN and stock reconciliation"],
  ["Logistics Agent", "Logistics", "Carrier selection, freight audit and tracking"],
  ["Export Documentation Agent", "Export", "Invoice, packing list, COO and DG papers"],
  ["Import Documentation Agent", "Import", "BOE preparation and customs document checks"],
  ["Legal Assistant", "Legal", "Clause search, obligation extraction and drafting"],
  ["Contract Review Agent", "Legal", "Risk redlines against playbook clauses"],
  ["Internal Audit Agent", "Internal Audit", "Sampling, testing and audit workpaper drafts"],
  ["Marketing Content Agent", "Marketing", "Product literature and campaign copy"],
  ["Technical Documentation Agent", "Technical Services", "TDS, application notes and handling guides"],
  ["Translation Agent", "Shared Services", "Multi-language SDS and label translation"],
  ["Knowledge Agent", "Knowledge Management", "Answers grounded in the enterprise corpus"],
  ["Company Brain Agent", "Knowledge Management", "Maintains the enterprise knowledge graph"],
  ["Document Intelligence Agent", "Document Control", "Classifies, extracts and routes documents"],
  ["Approval Agent", "Shared Services", "Prepares approval packets with recommendations"],
  ["Workflow Agent", "IT", "Orchestrates multi-system automations"],
  ["Email Agent", "Shared Services", "Triage, summarise and draft replies"],
  ["Meeting Agent", "Shared Services", "Notes, decisions and action tracking"],
  ["Training Agent", "Training", "Builds role-based learning paths and quizzes"],
  ["Policy Agent", "Compliance", "Policy drafting, versioning and attestation"],
  ["R&D Assistant", "R&D", "Literature scan, formulation and trial design"],
  ["Laboratory Documentation Agent", "Laboratory Documentation", "COA, method and raw-data documentation"],
  ["Engineering Documentation Agent", "Engineering Documentation", "P&ID, datasheet and drawing control"],
  ["Maintenance Documentation Agent", "Maintenance Documentation", "Work orders, permits and history logs"],
  ["ISO Documentation Agent", "ISO", "9001 / 14001 / 45001 evidence readiness"],
  ["Project Management Agent", "Project Management", "Schedule, risk and status reporting"],
  ["Administration Agent", "Administration", "Facilities, travel and vendor admin requests"],
  ["Quality Control Agent", "Quality Control", "Sample scheduling and result review"],
  ["Production Planning Agent", "Production Planning", "Campaign sequencing and changeover cost"],
  ["IT Service Agent", "IT", "Ticket triage, access requests and runbooks"],
  ["Business Development Agent", "Business Development", "Lead qualification and market mapping"],
];

export interface Agent {
  id: string;
  name: string;
  purpose: string;
  department: Department;
  owner: string;
  status: Status;
  health: Health;
  version: string;
  successRate: number;
  avgRuntime: number;
  runs30d: number;
  hoursSaved: number;
  connections: string[];
  permissions: string[];
  lastRun: string;
}

const SYSTEMS = [
  "SAP S/4HANA",
  "Salesforce",
  "SharePoint",
  "Microsoft 365",
  "LIMS",
  "Oracle EBS",
  "Zoho",
  "PostgreSQL",
  "Power BI",
  "Outlook",
  "Teams",
  "REST API",
];

export const AGENTS: Agent[] = AGENT_DEFS.map(([name, department, purpose], i) => {
  const r = rnd();
  const status: Status = r > 0.88 ? "draft" : r > 0.82 ? "paused" : r > 0.79 ? "error" : "active";
  return {
    id: slugify(name),
    name,
    purpose,
    department,
    owner: at(OWNERS, i % OWNERS.length),
    status,
    health: status === "error" ? "critical" : rnd() > 0.85 ? "degraded" : "healthy",
    version: `v${1 + (i % 3)}.${i % 9}.${i % 5}`,
    successRate: Math.round(between(88, 99.6) * 10) / 10,
    avgRuntime: Math.round(between(1.2, 46) * 10) / 10,
    runs30d: Math.round(between(120, 24000)),
    hoursSaved: Math.round(between(60, 1900)),
    connections: [pick(SYSTEMS), pick(SYSTEMS), pick(SYSTEMS)].filter(
      (v, idx, a) => a.indexOf(v) === idx,
    ),
    permissions: ["read:documents", "write:records", "invoke:llm"].slice(0, 2 + (i % 2)),
    lastRun: `${Math.round(between(1, 58))} min ago`,
  };
});

export interface Copilot {
  id: string;
  name: string;
  department: Department;
  description: string;
  conversations: number;
  adoption: number;
  suggestedTasks: string[];
  connectedData: string[];
}

export const COPILOTS: Copilot[] = [
  ["Executive Copilot", "Executive Office", "Board-level Q&A over consolidated performance"],
  ["Sales Copilot", "Sales", "Pricing, availability and customer history at hand"],
  ["Procurement Copilot", "Procurement", "Sourcing, vendor and price-trend intelligence"],
  ["Finance Copilot", "Finance", "Ledger, cashflow and variance interrogation"],
  ["Quality Copilot", "Quality Assurance", "QMS records, deviations and CAPA guidance"],
  ["HR Copilot", "HR", "Policies, payroll and employee lifecycle support"],
  ["Supply Chain Copilot", "Supply Chain", "Plan-to-deliver exception resolution"],
  ["Regulatory Copilot", "Regulatory Affairs", "Substance, SDS and registration guidance"],
  ["Legal Copilot", "Legal", "Contract clauses, obligations and precedent"],
  ["Plant Copilot", "Production Planning", "Campaign, yield and changeover insight"],
  ["Knowledge Copilot", "Knowledge Management", "Grounded answers across the Company Brain"],
  ["Customer Service Copilot", "Customer Service", "Order, document and complaint assistance"],
].map(([name, department, description]) => ({
  id: slugify(name as string),
  name: name as string,
  department: department as Department,
  description: description as string,
  conversations: Math.round(between(320, 18400)),
  adoption: Math.round(between(38, 94)),
  suggestedTasks: [
    "Summarise this week's exceptions",
    "Draft the response pack",
    "Compare against last quarter",
    "Flag compliance risks",
  ],
  connectedData: [pick(SYSTEMS), pick(SYSTEMS), "Company Brain"],
}));

export interface Automation {
  id: string;
  code: string;
  title: string;
  department: Department;
  priority: "P1" | "P2" | "P3";
  roi: number;
  hoursSaved: number;
  difficulty: "Low" | "Medium" | "High";
  status: "Live" | "In Build" | "Piloting" | "Backlog";
  phase: "Phase 1" | "Phase 2" | "Phase 3";
  owner: string;
  value: string;
}

const AUTOMATION_VERBS = [
  "Automated intake & extraction for",
  "AI drafting of",
  "Straight-through processing of",
  "Exception-only review for",
  "Auto-classification & routing of",
  "Continuous reconciliation of",
  "AI summarisation of",
  "Policy-checked approval of",
];
const AUTOMATION_OBJECTS = [
  "supplier invoices",
  "customer RFQs",
  "purchase indents",
  "batch records",
  "certificates of analysis",
  "shipping documents",
  "audit evidence",
  "MSDS updates",
  "contract renewals",
  "deviation reports",
  "monthly MIS packs",
  "vendor onboarding files",
  "customer complaints",
  "inventory reconciliations",
  "regulatory submissions",
  "training records",
  "maintenance work orders",
  "expense claims",
];

export const AUTOMATIONS: Automation[] = Array.from({ length: 208 }, (_, i) => {
  const department = at(DEPARTMENTS, i % DEPARTMENTS.length);
  const title = `${at(AUTOMATION_VERBS, i % AUTOMATION_VERBS.length)} ${
    at(AUTOMATION_OBJECTS, (i * 7) % AUTOMATION_OBJECTS.length)
  }`;
  const r = rnd();
  return {
    id: `A-${String(i + 1).padStart(3, "0")}`,
    code: `AO-${String(i + 1).padStart(3, "0")}`,
    title,
    department,
    priority: r > 0.66 ? "P1" : r > 0.33 ? "P2" : "P3",
    roi: Math.round(between(90, 940)),
    hoursSaved: Math.round(between(120, 6200)),
    difficulty: rnd() > 0.66 ? "High" : rnd() > 0.4 ? "Medium" : "Low",
    status: r > 0.72 ? "Live" : r > 0.5 ? "In Build" : r > 0.3 ? "Piloting" : "Backlog",
    phase: r > 0.66 ? "Phase 1" : r > 0.33 ? "Phase 2" : "Phase 3",
    owner: at(OWNERS, i % OWNERS.length),
    value: pick([
      "Cycle-time reduction",
      "Headcount redeployment",
      "Audit readiness",
      "Working-capital release",
      "Revenue acceleration",
      "Risk reduction",
    ]),
  };
});

export interface DeptProfile {
  name: Department;
  slug: string;
  functions: number;
  automations: number;
  agents: number;
  hoursSaved: number;
  adoption: number;
  maturity: number;
  savings: number;
}

export const DEPT_PROFILES: DeptProfile[] = DEPARTMENTS.map((name) => {
  const agents = AGENTS.filter((a) => a.department === name).length;
  const autos = AUTOMATIONS.filter((a) => a.department === name);
  return {
    name,
    slug: slugify(name),
    functions: 1 + Math.round(between(0, 3)),
    automations: autos.length,
    agents,
    hoursSaved: autos.reduce((s, a) => s + a.hoursSaved, 0),
    adoption: Math.round(between(32, 96)),
    maturity: Math.round(between(1, 5)),
    savings: Math.round(autos.reduce((s, a) => s + a.hoursSaved, 0) * 21),
  };
});

export interface ActivityEvent {
  id: string;
  title: string;
  agent: string;
  department: Department;
  detail: string;
  kind: "success" | "info" | "warning";
  minutesAgo: number;
}

const ACTIVITY_TEMPLATES: Array<[string, string, ActivityEvent["kind"]]> = [
  ["Invoice processed", "3-way matched INV-", "success"],
  ["RFQ generated", "Enquiry converted to RFQ-", "info"],
  ["Purchase order created", "PO-", "success"],
  ["Compliance check passed", "REACH dossier ", "success"],
  ["CAPA closed", "CAPA-", "success"],
  ["Customer complaint resolved", "Complaint CMP-", "success"],
  ["Shipment documents generated", "Export set for SO-", "info"],
  ["Vendor approved", "Vendor risk cleared for V-", "success"],
  ["Knowledge retrieved", "12 sources cited for query Q-", "info"],
  ["Agent completed task", "Batch job ", "info"],
  ["Approval escalated", "Threshold breached on REQ-", "warning"],
  ["Anomaly detected", "Price variance on PO-", "warning"],
];

export const ACTIVITY: ActivityEvent[] = Array.from({ length: 28 }, (_, i) => {
  const [title, detail, kind] = at(ACTIVITY_TEMPLATES, i % ACTIVITY_TEMPLATES.length);
  const agent = at(AGENTS, (i * 5) % AGENTS.length);
  return {
    id: `EV-${i}`,
    title,
    agent: agent.name,
    department: agent.department,
    detail: `${detail}${10000 + i * 137}`,
    kind,
    minutesAgo: i * 3 + 1,
  };
});

export const KPIS = [
  { label: "Total AI Agents", value: AGENTS.length, suffix: "", delta: 12.4, spark: [18, 24, 29, 35, 41, 48, 57] },
  { label: "Active Automations", value: AUTOMATIONS.filter((a) => a.status === "Live").length, suffix: "", delta: 8.1, spark: [22, 28, 34, 39, 44, 51, 58] },
  { label: "Hours Saved (YTD)", value: 482400, suffix: "h", delta: 21.7, spark: [120, 180, 240, 300, 360, 430, 482] },
  { label: "FTE Redeployed", value: 246, suffix: "", delta: 15.2, spark: [90, 120, 150, 180, 205, 228, 246] },
  { label: "Programme ROI", value: 412, suffix: "%", delta: 34.5, spark: [110, 165, 210, 265, 320, 370, 412] },
  { label: "Monthly Savings", value: 3.9, suffix: "M", prefix: "$", delta: 6.8, spark: [1.9, 2.3, 2.6, 3.0, 3.3, 3.6, 3.9] },
  { label: "Annualised Savings", value: 46.8, suffix: "M", prefix: "$", delta: 19.3, spark: [22, 27, 31, 36, 40, 44, 47] },
  { label: "Departments Automated", value: 39, suffix: "/39", delta: 4.2, spark: [12, 18, 24, 29, 33, 37, 39] },
  { label: "Documents Processed", value: 1284900, suffix: "", delta: 11.9, spark: [420, 560, 700, 860, 1000, 1150, 1285] },
  { label: "Approvals Completed", value: 92840, suffix: "", delta: 7.4, spark: [30, 42, 54, 65, 76, 85, 93] },
  { label: "AI Accuracy", value: 97.4, suffix: "%", delta: 1.6, spark: [92, 93, 94, 95, 96, 97, 97.4] },
  { label: "Employee Adoption", value: 78, suffix: "%", delta: 9.5, spark: [28, 38, 47, 56, 64, 72, 78] },
] as const;

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const automationGrowth = MONTHS.map((m, i) => ({
  month: m,
  live: Math.round(8 + i * 6.4 + between(0, 4)),
  piloting: Math.round(4 + i * 2.1 + between(0, 3)),
  backlog: Math.round(92 - i * 5.2),
}));

export const savingsTrend = MONTHS.map((m, i) => ({
  month: m,
  savings: Math.round((1.2 + i * 0.24) * 100) / 100,
  target: Math.round((1.4 + i * 0.21) * 100) / 100,
}));

export const roiTrend = MONTHS.map((m, i) => ({
  month: m,
  roi: Math.round(60 + i * 30 + between(0, 20)),
}));

export const cycleTime = MONTHS.slice(0, 8).map((m, i) => ({
  month: m,
  before: Math.round(72 - i * 1.4),
  after: Math.round(26 - i * 1.8),
}));

export const usageByModality = [
  { name: "Document Intelligence", value: 34 },
  { name: "Copilot Chat", value: 26 },
  { name: "Autonomous Agents", value: 22 },
  { name: "Workflow Automation", value: 12 },
  { name: "Analytics & MIS", value: 6 },
];

export const deptEfficiency = DEPT_PROFILES.slice(0, 12).map((d) => ({
  name: d.name.length > 14 ? `${d.name.slice(0, 13)}…` : d.name,
  efficiency: d.adoption,
  hours: Math.round(d.hoursSaved / 100),
}));

export interface Approval {
  id: string;
  subject: string;
  type: string;
  department: Department;
  amount: string;
  requester: string;
  aiRecommendation: "Approve" | "Review" | "Reject";
  confidence: number;
  status: "Pending" | "Approved" | "Rejected" | "Escalated";
  age: string;
}

export const APPROVALS: Approval[] = Array.from({ length: 42 }, (_, i) => {
  const r = rnd();
  return {
    id: `APR-${4200 + i}`,
    subject: pick([
      "Capex release — reactor R-402 upgrade",
      "Supplier invoice above tolerance",
      "New vendor onboarding — solvent supplier",
      "Price deviation on export order",
      "CAPA closure sign-off",
      "SDS revision publication",
      "Contract renewal — logistics partner",
      "Overtime approval — QC laboratory",
      "Sample dispatch to key account",
      "Regulatory submission release",
    ]),
    type: pick(["Financial", "Quality", "Commercial", "Compliance", "HR"]),
    department: at(DEPARTMENTS, (i * 3) % DEPARTMENTS.length),
    amount: `$${Math.round(between(4, 940))}k`,
    requester: at(OWNERS, i % OWNERS.length),
    aiRecommendation: r > 0.72 ? "Approve" : r > 0.25 ? "Review" : "Reject",
    confidence: Math.round(between(72, 99)),
    status: r > 0.6 ? "Pending" : r > 0.4 ? "Approved" : r > 0.2 ? "Escalated" : "Rejected",
    age: `${Math.round(between(1, 72))}h`,
  };
});

export interface DocRecord {
  id: string;
  name: string;
  type: string;
  department: Department;
  pages: number;
  confidence: number;
  state: "Extracted" | "Validated" | "Routed" | "Needs review";
  updated: string;
}

export const DOCUMENTS: DocRecord[] = Array.from({ length: 48 }, (_, i) => {
  const type = pick([
    "Invoice",
    "Purchase Order",
    "RFQ",
    "COA",
    "MSDS",
    "TDS",
    "Batch Record",
    "Audit Report",
    "Contract",
    "Certificate",
    "Shipping Document",
  ]);
  return {
    id: `DOC-${9000 + i}`,
    name: `${type.replace(/\s/g, "-")}-${2026}-${String(i + 1).padStart(4, "0")}.pdf`,
    type,
    department: at(DEPARTMENTS, (i * 5) % DEPARTMENTS.length),
    pages: Math.round(between(1, 84)),
    confidence: Math.round(between(81, 99.6) * 10) / 10,
    state: pick(["Extracted", "Validated", "Routed", "Needs review"]),
    updated: `${Math.round(between(2, 300))} min ago`,
  };
});

export const KNOWLEDGE_SOURCES = [
  { name: "SOP Library", docs: 4820, vectors: "1.2M", status: "Synced" },
  { name: "Technical Manuals", docs: 1340, vectors: "612K", status: "Synced" },
  { name: "MSDS / SDS", docs: 2960, vectors: "480K", status: "Synced" },
  { name: "TDS & Specifications", docs: 3110, vectors: "521K", status: "Indexing" },
  { name: "Batch Records", docs: 18400, vectors: "3.4M", status: "Synced" },
  { name: "Contracts", docs: 1870, vectors: "298K", status: "Synced" },
  { name: "Invoices", docs: 96400, vectors: "5.8M", status: "Synced" },
  { name: "Email Archive", docs: 412000, vectors: "12.1M", status: "Streaming" },
  { name: "SAP Master Data", docs: 68200, vectors: "2.2M", status: "Synced" },
  { name: "SharePoint", docs: 154000, vectors: "6.9M", status: "Synced" },
  { name: "CRM Records", docs: 42800, vectors: "1.9M", status: "Synced" },
  { name: "Meeting Notes", docs: 12900, vectors: "740K", status: "Synced" },
];

export const INTEGRATIONS = [
  { name: "SAP S/4HANA", category: "ERP", status: "Connected", calls: "4.2M/mo" },
  { name: "Oracle EBS", category: "ERP", status: "Connected", calls: "820K/mo" },
  { name: "Microsoft Dynamics", category: "ERP", status: "Available", calls: "—" },
  { name: "Zoho", category: "Business Apps", status: "Connected", calls: "180K/mo" },
  { name: "Salesforce", category: "CRM", status: "Connected", calls: "1.1M/mo" },
  { name: "Microsoft 365", category: "Productivity", status: "Connected", calls: "9.4M/mo" },
  { name: "SharePoint", category: "Content", status: "Connected", calls: "3.8M/mo" },
  { name: "Google Workspace", category: "Productivity", status: "Available", calls: "—" },
  { name: "Microsoft Teams", category: "Collaboration", status: "Connected", calls: "2.6M/mo" },
  { name: "Outlook", category: "Email", status: "Connected", calls: "7.1M/mo" },
  { name: "Gmail", category: "Email", status: "Available", calls: "—" },
  { name: "Slack", category: "Collaboration", status: "Connected", calls: "410K/mo" },
  { name: "Power BI", category: "Analytics", status: "Connected", calls: "260K/mo" },
  { name: "Tableau", category: "Analytics", status: "Available", calls: "—" },
  { name: "REST APIs", category: "Platform", status: "Connected", calls: "12.4M/mo" },
  { name: "PostgreSQL", category: "Data", status: "Connected", calls: "22M/mo" },
  { name: "Supabase", category: "Data", status: "Connected", calls: "3.1M/mo" },
  { name: "Azure", category: "Cloud", status: "Connected", calls: "—" },
  { name: "AWS", category: "Cloud", status: "Connected", calls: "—" },
  { name: "Qdrant", category: "Vector DB", status: "Connected", calls: "6.7M/mo" },
];

export const MODEL_REGISTRY = [
  { model: "GPT-5.6 Sol", provider: "OpenAI", use: "Reasoning & drafting", requests: "2.4M", cost: "$41.2k", risk: "Low" },
  { model: "Claude Sonnet", provider: "Anthropic", use: "Long-document analysis", requests: "980k", cost: "$18.6k", risk: "Low" },
  { model: "Gemini Pro", provider: "Google", use: "Multimodal extraction", requests: "1.3M", cost: "$12.9k", risk: "Medium" },
  { model: "Azure OpenAI", provider: "Microsoft", use: "Regulated workloads", requests: "740k", cost: "$22.4k", risk: "Low" },
  { model: "Embedding-3-Large", provider: "OpenAI", use: "Company Brain indexing", requests: "48M", cost: "$9.8k", risk: "Low" },
];

export const USERS = OWNERS.map((name, i) => ({
  id: `U-${100 + i}`,
  name,
  email: `${slugify(name).replace(/-/g, ".")}@chemcorp.com`,
  role: pick(["Administrator", "Department Head", "Process Owner", "Analyst", "Auditor"]),
  department: at(DEPARTMENTS, (i * 4) % DEPARTMENTS.length),
  status: i % 7 === 0 ? "Invited" : "Active",
  lastActive: `${Math.round(between(1, 240))} min ago`,
}));

export const ROADMAP = [
  {
    phase: "Phase 1 — Foundation",
    window: "Q1–Q2 2026",
    focus: "Company Brain, document intelligence, finance & procurement automations",
    automations: 68,
    status: "In progress",
  },
  {
    phase: "Phase 2 — Scale",
    window: "Q3–Q4 2026",
    focus: "Department copilots, quality & regulatory agents, workflow orchestration",
    automations: 84,
    status: "Planned",
  },
  {
    phase: "Phase 3 — Autonomy",
    window: "2027",
    focus: "Straight-through processes, predictive operations, autonomous approvals",
    automations: 56,
    status: "Planned",
  },
];

export const TASKS = Array.from({ length: 26 }, (_, i) => ({
  id: `TSK-${3100 + i}`,
  title: pick([
    "Validate extracted invoice batch",
    "Review AI-drafted CAPA report",
    "Confirm vendor risk assessment",
    "Approve SDS revision",
    "Reconcile GRN mismatch",
    "Sign off monthly MIS pack",
    "Verify export document set",
    "Clear complaint response draft",
  ]),
  assignee: at(OWNERS, i % OWNERS.length),
  agent: at(AGENTS, (i * 3) % AGENTS.length).name,
  department: at(DEPARTMENTS, (i * 6) % DEPARTMENTS.length),
  priority: pick(["High", "Medium", "Low"]),
  due: `${Math.round(between(1, 14))}d`,
  status: pick(["In progress", "Waiting on human", "Blocked", "Ready"]),
}));

export const REPORTS = [
  "Daily Operations Digest",
  "Weekly Automation Performance",
  "Monthly MIS Pack",
  "Quarterly Business Review",
  "Annual AI Programme Report",
  "Board Report",
  "Compliance Evidence Report",
  "Quality & CAPA Report",
  "Finance & Cashflow Report",
  "Sales Performance Report",
  "Inventory & Ageing Report",
  "HR & Workforce Report",
].map((name, i) => ({
  id: `RPT-${200 + i}`,
  name,
  cadence: pick(["Daily", "Weekly", "Monthly", "Quarterly", "Annual"]),
  owner: at(OWNERS, i % OWNERS.length),
  lastRun: `${Math.round(between(1, 30))}d ago`,
  format: pick(["PDF", "XLSX", "PPTX", "Dashboard"]),
}));

export const SECURITY_EVENTS = Array.from({ length: 14 }, (_, i) => ({
  id: `SEC-${700 + i}`,
  event: pick([
    "Role permission changed",
    "API key rotated",
    "MFA challenge failed",
    "SSO login from new device",
    "Agent permission escalated",
    "Secret accessed by workflow",
    "Data export requested",
  ]),
  actor: at(OWNERS, i % OWNERS.length),
  severity: pick(["Low", "Medium", "High"]),
  time: `${Math.round(between(1, 720))} min ago`,
}));

export const GUARDRAILS = [
  { name: "PII redaction", coverage: 100, state: "Enforced" },
  { name: "Hallucination detection", coverage: 96, state: "Enforced" },
  { name: "Human-in-the-loop on financial actions", coverage: 100, state: "Enforced" },
  { name: "Prompt injection screening", coverage: 92, state: "Enforced" },
  { name: "Model output logging", coverage: 100, state: "Enforced" },
  { name: "Cost ceiling per department", coverage: 88, state: "Monitoring" },
];

export const formatNumber = (n: number) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(2)}M`
    : n >= 10_000
      ? `${(n / 1000).toFixed(1)}k`
      : n.toLocaleString("en-US");
