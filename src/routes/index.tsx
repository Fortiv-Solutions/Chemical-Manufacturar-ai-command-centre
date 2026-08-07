import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Database,
  FileCheck2,
  FileText,
  Filter,
  Flame,
  Globe,
  Layers,
  Lock,
  PieChart as PieChartIcon,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  DollarSign,
  AlertTriangle,
  BarChart3,
  Factory,
  FlaskConical,
  HelpCircle,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  GlassCard,
  MeterBar,
  PageHeader,
  Pill,
  SectionTitle,
  StatCard,
  StatusDot,
  toneFor,
  ProcessComparisonCard,
  HorizontalRoadmap,
  TrustGovernanceSection,
} from "@/components/cc/primitives";
import {
  ACTIVITY,
  AGENTS,
  APPROVALS,
  AUTOMATIONS,
  DEPT_PROFILES,
  KPIS,
  ROADMAP,
  automationGrowth,
  deptEfficiency,
  formatNumber,
  roiTrend,
  savingsTrend,
  usageByModality,
} from "@/lib/command-center-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chemical AI OS — Enterprise Executive Platform" },
      {
        name: "description",
        content:
          "Executive AI Operating Platform for Chemical & Polymer Manufacturing. Drive compliance, procurement cycle reduction, quality documentation, and measurable value creation.",
      },
      { property: "og:title", content: "Chemical AI OS — Enterprise Executive Platform" },
      {
        property: "og:description",
        content: "Software-only enterprise AI operating system across specialty chemicals, polymers, pharma intermediates, and process manufacturing.",
      },
    ],
  }),
  component: Dashboard,
});

/* ─── Executive Color Palette & Chart Tooltips ─── */
const CHART_COLORS = {
  cobalt: "#2563EB",
  emerald: "#059669",
  slate: "#0F172A",
  amber: "#D97706",
  indigo: "#6366F1",
};

const chartTooltip = {
  contentStyle: {
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    borderRadius: 16,
    fontSize: 12,
    color: "#0F172A",
    boxShadow: "0 12px 32px rgba(15,23,42,0.12)",
    padding: "12px 16px",
    fontWeight: 700,
  },
  labelStyle: { color: "#64748B", fontWeight: 700, marginBottom: 4 },
  cursor: { stroke: "#CBD5E1", strokeWidth: 1, strokeDasharray: "3 3" },
} as const;

const axisStyle = {
  stroke: "#94A3B8",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
  fontWeight: 600,
} as const;

/* ─── 10 Core Executive KPIs ─── */
const CORE_EXECUTIVE_KPIS = [
  {
    id: "fulfillment",
    label: "Order Fulfillment Visibility",
    value: "98.4%",
    suffix: "On-Time",
    delta: 5.2,
    accent: "cobalt" as const,
    icon: Boxes,
    supporting: "Real-time dispatch tracking across all plant clusters",
    spark: [88, 90, 92, 94, 96, 98.4],
  },
  {
    id: "regulatory",
    label: "Regulatory & Compliance Readiness",
    value: "100%",
    suffix: "Audit Ready",
    delta: 2.5,
    accent: "emerald" as const,
    icon: ShieldCheck,
    supporting: "Instant SDS/MSDS & REACH certificate retrieval",
    spark: [94, 96, 98, 99, 99.5, 100],
  },
  {
    id: "procurement",
    label: "Procurement Cycle Reduction",
    value: "-64%",
    suffix: "Cycle Time",
    delta: 14.8,
    accent: "emerald" as const,
    icon: Zap,
    supporting: "Automated RFQ parsing & supplier price comparison",
    spark: [30, 40, 48, 55, 60, 64],
  },
  {
    id: "vendor_compliance",
    label: "Vendor Compliance Score",
    value: "99.2%",
    suffix: "Passes",
    delta: 3.8,
    accent: "cobalt" as const,
    icon: CheckCircle2,
    supporting: "Automated ISO & REACH supplier certification checks",
    spark: [90, 92, 94, 96, 98, 99.2],
  },
  {
    id: "inventory",
    label: "Inventory & Raw Material Intelligence",
    value: "₹14.8 Cr",
    suffix: "Optimised",
    delta: 8.2,
    accent: "emerald" as const,
    icon: Database,
    supporting: "Raw material & solvent stock prediction confidence",
    spark: [8.5, 9.8, 11.2, 12.6, 13.5, 14.8],
  },
  {
    id: "quality_turnaround",
    label: "Quality Documentation Turnaround",
    value: "1.2 Hrs",
    suffix: "vs 48h",
    delta: 32.4,
    accent: "cobalt" as const,
    icon: FileCheck2,
    supporting: "COA & Lab test certificate extraction speed",
    spark: [48, 32, 18, 8, 3, 1.2],
  },
  {
    id: "complaints",
    label: "Customer Complaint Resolution Time",
    value: "3.5 Hrs",
    suffix: "Avg SLA",
    delta: 24.5,
    accent: "emerald" as const,
    icon: Users,
    supporting: "Root-cause deviation analysis & response speed",
    spark: [24, 18, 12, 8, 5, 3.5],
  },
  {
    id: "finance_coverage",
    label: "Finance Automation Coverage",
    value: "88.6%",
    suffix: "Automated",
    delta: 11.2,
    accent: "cobalt" as const,
    icon: DollarSign,
    supporting: "Invoice 3-way matching & GRN auto-reconciliation",
    spark: [65, 72, 78, 82, 85, 88.6],
  },
  {
    id: "ai_adoption",
    label: "Enterprise AI Adoption Score",
    value: "78.4%",
    suffix: "Adoption",
    delta: 16.5,
    accent: "emerald" as const,
    icon: Activity,
    supporting: "Active weekly staff users across 43 departments",
    spark: [45, 54, 62, 70, 74, 78.4],
  },
  {
    id: "value_creation",
    label: "Estimated Annual Value Creation",
    value: "₹48.5 Cr",
    suffix: "yr EBITDA",
    delta: 21.4,
    accent: "emerald" as const,
    icon: TrendingUp,
    supporting: "Measured direct labor savings & procurement reductions",
    spark: [22, 28, 34, 40, 44, 48.5],
  },
];

/* ─── 14 Department AI Modules ─── */
const FOURTEEN_DEPARTMENTS = [
  {
    id: "sales",
    name: "Sales & Commercial",
    challenges: "Slow customer RFQ response times & manual chemical spec matching",
    opportunities: "AI Sales Copilot parses customer specs & drafts accurate chemical quotes instantly",
    kpis: "Quotation SLA: 4.2h → 12m (95% faster)",
    agents: ["AI Sales Copilot", "Lead Response Agent"],
    roi: "₹8.4 Cr Annual Growth",
    timeline: "30-Day Deployment",
  },
  {
    id: "procurement",
    name: "Procurement & Sourcing",
    challenges: "Volatile raw material pricing & manual supplier certificate verifications",
    opportunities: "Procurement Copilot monitors solvent prices & automates vendor risk scoring",
    kpis: "Procurement Cycle: -64% Reduction",
    agents: ["Procurement Copilot", "Vendor Intelligence Agent"],
    roi: "₹12.2 Cr Cost Savings",
    timeline: "30-Day Deployment",
  },
  {
    id: "supply_chain",
    name: "Supply Chain & Logistics",
    challenges: "Container shortage delays & export documentation bottlenecks",
    opportunities: "Logistics Agent parses shipping bills & automates customs paperwork",
    kpis: "Export Clearance: 3x Speed",
    agents: ["Export Documentation Agent", "Logistics Copilot"],
    roi: "₹4.1 Cr Demurrage Savings",
    timeline: "60-Day Deployment",
  },
  {
    id: "production",
    name: "Production Planning",
    challenges: "Sub-optimal reactor batch scheduling & raw material stockouts",
    opportunities: "Autonomous Batch Planner aligns production schedules with inventory telemetry",
    kpis: "Reactor Utilization: +18.4% Gain",
    agents: ["Batch Planning Copilot", "Inventory Agent"],
    roi: "₹6.8 Cr OEE Gain",
    timeline: "60-Day Deployment",
  },
  {
    id: "quality",
    name: "Quality Assurance & Documentation",
    challenges: "Laborious manual COA generation & lab test result validation",
    opportunities: "Quality Agent extracts lab values & auto-generates customer COA certificates",
    kpis: "COA SLA: 1.2 Hours vs 48h",
    agents: ["Quality Documentation Agent", "COA Assistant"],
    roi: "₹3.5 Cr Labor Efficiency",
    timeline: "30-Day Deployment",
  },
  {
    id: "regulatory",
    name: "Regulatory Affairs & Compliance",
    challenges: "Complex REACH, GHS & OSHA Safety Data Sheet (SDS/MSDS) compliance tracking",
    opportunities: "Regulatory Agent monitors global hazardous substance guidelines & updates SDS",
    kpis: "Audit Readiness: 100% Ready",
    agents: ["Regulatory Compliance Agent", "SDS Retrieval Agent"],
    roi: "100% Audit Protection",
    timeline: "30-Day Deployment",
  },
  {
    id: "customer_service",
    name: "Customer Service",
    challenges: "High volume of technical product inquiries & complaint tracking",
    opportunities: "Customer Response Agent drafts technical replies using Company Brain vector store",
    kpis: "Resolution Time: 3.5 Hours Avg",
    agents: ["Customer Complaint Analysis Agent"],
    roi: "₹2.2 Cr CSAT Value",
    timeline: "30-Day Deployment",
  },
  {
    id: "finance",
    name: "Finance & Accounts",
    challenges: "Manual invoice matching against GRNs and PO line items",
    opportunities: "Finance Copilot parses complex chemical invoices & automates 3-way reconciliation",
    kpis: "Finance Automation: 88.6%",
    agents: ["Finance Copilot", "Contract Intelligence Agent"],
    roi: "₹5.6 Cr Processing Savings",
    timeline: "45-Day Deployment",
  },
  {
    id: "hr",
    name: "Human Resources",
    challenges: "Plant operator safety training tracking & SOP onboarding delay",
    opportunities: "HR Copilot delivers automated plant safety quizzes & SOP verification",
    kpis: "Safety Onboarding: 65% Faster",
    agents: ["HR & Safety Training Copilot"],
    roi: "₹1.4 Cr Training Value",
    timeline: "60-Day Deployment",
  },
  {
    id: "maintenance",
    name: "Maintenance Documentation",
    challenges: "Unplanned pump failure downtime & manual equipment manual lookups",
    opportunities: "Maintenance Assistant provides instant RAG search over equipment manuals & SOPs",
    kpis: "MTTR Reduction: 38% Faster",
    agents: ["Maintenance RAG Agent"],
    roi: "₹3.9 Cr Downtime Saved",
    timeline: "45-Day Deployment",
  },
  {
    id: "projects",
    name: "Projects & Engineering",
    challenges: "CAPEX expansion delays & vendor quotation comparisons",
    opportunities: "Project Copilot tracks EPC milestone deliverables & vendor compliance",
    kpis: "Project On-Time: +24%",
    agents: ["Project Intelligence Agent"],
    roi: "₹2.8 Cr CAPEX Gain",
    timeline: "90-Day Deployment",
  },
  {
    id: "legal",
    name: "Legal & Contracts",
    challenges: "Vendor contract obligation monitoring & REACH indemnity tracking",
    opportunities: "Contract Intelligence Agent audits indemnity terms & auto-alerts renewal dates",
    kpis: "Contract Review: 15 Minutes",
    agents: ["Contract Intelligence Agent"],
    roi: "₹1.9 Cr Risk Protection",
    timeline: "45-Day Deployment",
  },
  {
    id: "executive_office",
    name: "Executive Office",
    challenges: "Siloed plant reporting & delayed monthly MIS pack generation",
    opportunities: "Executive Copilot aggregates multi-plant telemetry into instant board packs",
    kpis: "MIS Generation: Real-Time",
    agents: ["Executive Copilot", "Company Brain Assistant"],
    roi: "100% C-Suite Visibility",
    timeline: "Immediate Access",
  },
  {
    id: "plant_ops",
    name: "Plant Operations Control",
    challenges: "Shift handover log discrepancies & manual batch record compilation",
    opportunities: "Plant Ops Copilot auto-synthesizes digital shift logs and batch execution sheets",
    kpis: "Shift Log Accuracy: 99.8%",
    agents: ["Plant Operations Copilot"],
    roi: "₹2.5 Cr Shift Efficiency",
    timeline: "30-Day Deployment",
  },
];

/* ─── 11 Chemical Production AI Agents ─── */
const ELEVEN_AI_AGENTS = [
  {
    id: "agent_sales",
    name: "AI Sales Copilot",
    tagline: "Commercial Intelligence",
    purpose: "Parses complex chemical specs, checks inventory availability, and drafts accurate commercial quotes.",
    value: "Increases sales conversion by 28% and cuts quotation SLA from 4.2 hours to 12 minutes.",
    systems: "SAP SD, Salesforce, Material Spec DB",
    savings: "420 hrs/month",
    badge: "Commercial",
  },
  {
    id: "agent_lead",
    name: "AI Lead Response Agent",
    tagline: "24/7 Enquiry Handler",
    purpose: "Evaluates inbound customer enquiries, validates chemical grade requirements, and routes high-value leads.",
    value: "Ensures 100% lead response within 5 minutes across global buyer queries.",
    systems: "Email, Web Portal, CRM",
    savings: "310 hrs/month",
    badge: "Commercial",
  },
  {
    id: "agent_procurement",
    name: "Procurement Copilot",
    tagline: "Sourcing & Raw Material AI",
    purpose: "Monitors raw material market price trends, parses supplier quotes, and flags purchase order anomalies.",
    value: "Delivers 64% procurement cycle reduction and uncovers hidden vendor volume discounts.",
    systems: "SAP MM, Ariba, ICIS Market Feeds",
    savings: "680 hrs/month",
    badge: "Procurement",
  },
  {
    id: "agent_vendor",
    name: "Vendor Intelligence Agent",
    tagline: "Supplier Risk & Compliance",
    purpose: "Audits supplier ISO certificates, REACH filings, and delivery reliability metrics automatically.",
    value: "Eliminates non-compliant raw material shipments and maintains 99.2% vendor compliance score.",
    systems: "Vendor Portal, Compliance DB",
    savings: "290 hrs/month",
    badge: "Procurement",
  },
  {
    id: "agent_quality",
    name: "Quality Documentation Agent",
    tagline: "Lab & COA Automation",
    purpose: "Extracts laboratory LIMS test results and formats multi-lingual Certificates of Analysis (COAs).",
    value: "Reduces COA turnaround to 1.2 hours with zero manual spectro data entry errors.",
    systems: "LIMS, SAP QM, Batch Records",
    savings: "540 hrs/month",
    badge: "Quality",
  },
  {
    id: "agent_regulatory",
    name: "Regulatory Compliance Agent",
    tagline: "REACH & SDS Automation",
    purpose: "Maintains Safety Data Sheets (SDS/MSDS) and verifies global hazard classification updates.",
    value: "Ensures 100% audit readiness and seamless hazard documentation for export markets.",
    systems: "Global SDS Engine, ECHA Portal",
    savings: "480 hrs/month",
    badge: "Regulatory",
  },
  {
    id: "agent_complaints",
    name: "Customer Complaint Analysis Agent",
    tagline: "Root-Cause Intelligence",
    purpose: "Analyzes customer technical complaints against batch production logs to pinpoint quality deviations.",
    value: "Resolves customer complaints in 3.5 hours average and feeds corrective actions into CAPA.",
    systems: "QMS, LIMS, Customer Portal",
    savings: "260 hrs/month",
    badge: "Quality",
  },
  {
    id: "agent_finance",
    name: "Finance Copilot",
    tagline: "3-Way Invoice Reconciliation",
    purpose: "Parses complex chemical invoices, freight bills, and reconciles line items against POs and GRNs.",
    value: "Achieves 88.6% automated straight-through processing for finance operations.",
    systems: "SAP FI/CO, Bank Feeds, OCR",
    savings: "720 hrs/month",
    badge: "Finance",
  },
  {
    id: "agent_contract",
    name: "Contract Intelligence Agent",
    tagline: "Legal Obligation Tracker",
    purpose: "Scans raw material contracts for price escalation clauses, minimum volume commitments, and indemnity terms.",
    value: "Prevents contract penalties and flags cost savings opportunities prior to renewal.",
    systems: "SharePoint, Legal DB, SAP",
    savings: "380 hrs/month",
    badge: "Legal",
  },
  {
    id: "agent_executive",
    name: "Executive Copilot",
    tagline: "C-Suite Command Assistant",
    purpose: "Synthesizes cross-plant operational, financial, and compliance metrics into executive summaries.",
    value: "Provides real-time business visibility across multi-plant chemical clusters.",
    systems: "Enterprise Data Warehouse, ERP",
    savings: "210 hrs/month",
    badge: "Executive",
  },
  {
    id: "agent_brain",
    name: "Company Brain Assistant",
    tagline: "Enterprise Vector RAG",
    purpose: "Retrieves instant answers from 1.4M indexed SOPs, batch records, TDS documents, and contracts.",
    value: "Eliminates search delays for plant operators and technical staff.",
    systems: "Vector DB, SharePoint, SAP",
    savings: "890 hrs/month",
    badge: "Knowledge",
  },
];

/* ─── Chemical-Specific AI Opportunities ─── */
const CHEMICAL_AI_OPPORTUNITIES = [
  {
    title: "Customer Specification Parsing",
    desc: "AI extracts customer chemical purity & viscosity specs, automatically checking batch feasibility against reactor limits.",
    impact: "90% Faster Feasibility SLA",
    badge: "Commercial",
  },
  {
    title: "Specialty & Industrial Quotation Drafting",
    desc: "Generates tailored price quotes based on real-time raw material cost indexes & volume break margins.",
    impact: "12 min Quote Turnaround",
    badge: "Commercial",
  },
  {
    title: "COA / Test Certificate Generation",
    desc: "Parses LIMS lab analysis data & spectro values to populate customer-specific Certificate of Analysis templates.",
    impact: "1.2h Turnaround (vs 48h)",
    badge: "Quality",
  },
  {
    title: "SDS / MSDS Hazard Sheet Assistant",
    desc: "Semantic vector search retrieves hazardous chemical safety data sheets in seconds for shipping staff.",
    impact: "100% EHS Audit Ready",
    badge: "Regulatory",
  },
  {
    title: "Vendor Certificate & Expiry Monitoring",
    desc: "Tracks REACH, ISO & GMP certification expiry dates across 500+ global raw material suppliers.",
    impact: "99.2% Vendor Compliance",
    badge: "Procurement",
  },
  {
    title: "Export & REACH Documentation Support",
    desc: "Auto-populates dangerous goods manifests, bill of lading, and REACH compliance declarations for export.",
    impact: "3x Faster Customs Clearance",
    badge: "Logistics",
  },
];

export function Dashboard() {
  // Expansion states for sections with >5 cards
  const [showAllKpis, setShowAllKpis] = useState(false);
  const [showAllDepts, setShowAllDepts] = useState(false);
  const [showAllAgents, setShowAllAgents] = useState(false);
  const [showAllOpps, setShowAllOpps] = useState(false);

  const openReadiness = (type: "assessment" | "demo") => {
    window.dispatchEvent(new CustomEvent("open-readiness-modal", { detail: { type } }));
  };

  const openChat = () => {
    window.dispatchEvent(new CustomEvent("open-ai-chat"));
  };

  // Card slicing logic (5 items by default when collapsed)
  const displayedKpis = showAllKpis ? CORE_EXECUTIVE_KPIS : CORE_EXECUTIVE_KPIS.slice(0, 5);
  const displayedDepts = showAllDepts ? FOURTEEN_DEPARTMENTS : FOURTEEN_DEPARTMENTS.slice(0, 5);
  const displayedAgents = showAllAgents ? ELEVEN_AI_AGENTS : ELEVEN_AI_AGENTS.slice(0, 5);
  const displayedOpps = showAllOpps ? CHEMICAL_AI_OPPORTUNITIES : CHEMICAL_AI_OPPORTUNITIES.slice(0, 5);

  return (
    <div className="space-y-8 sm:space-y-10">

      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO BANNER SECTION (Mobile Responsive Layout & Typography)
          Headline, Sub-headline, Badges, Primary & Secondary CTAs
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] border border-[#E2E8F0] bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#1E40AF] p-6 sm:p-8 md:p-12 text-white shadow-2xl">
        <div className="relative z-10 grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-center">
          
          <div className="space-y-4 sm:space-y-6 lg:col-span-8">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/10 px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#60A5FA] backdrop-blur-md border border-white/10">
                <Sparkles className="size-3.5 sm:size-4 text-[#059669]" /> Fortiv Solutions · Chemical Manufacturing AI Command Center
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#059669]/20 px-3 sm:px-3.5 py-1 text-[10px] sm:text-xs font-extrabold text-[#34D399] backdrop-blur-md border border-[#059669]/30">
                <ShieldCheck className="size-3.5 text-[#34D399]" /> Software-Only · Zero Hardware Required
              </span>
            </div>

            {/* Responsive Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-white lg:leading-tight">
              Digitally Transform Your Chemical Enterprise with Autonomous AI
            </h1>

            {/* Sub-headline */}
            <p className="text-xs sm:text-sm font-medium leading-relaxed text-white/80 md:text-base max-w-3xl">
              Deploy <strong>231 proven AI automation opportunities</strong> across <strong>43 chemical business functions</strong> in 90 days. Software-only intelligence grounded on your plant data with zero physical hardware, IoT, sensor, or PLC/SCADA changes required.
            </p>

            {/* Mobile Responsive CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
              <button
                onClick={() => openReadiness("assessment")}
                className="flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 sm:px-7 py-3.5 sm:py-4 text-xs font-extrabold text-white shadow-lg shadow-[#2563EB]/30 hover:bg-[#1D4ED8] transition-all cursor-pointer w-full sm:w-auto"
              >
                <span>Book AI Readiness Assessment</span>
                <ArrowRight className="size-4 text-white" />
              </button>

              <button
                onClick={() => openReadiness("demo")}
                className="flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 sm:px-7 py-3.5 sm:py-4 text-xs font-extrabold text-white backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer w-full sm:w-auto"
              >
                <span>Schedule Executive Demo</span>
              </button>

              <button
                onClick={openChat}
                className="flex items-center justify-center gap-2 rounded-full bg-white px-5 sm:px-6 py-3.5 sm:py-4 text-xs font-extrabold text-[#0F172A] shadow-md hover:bg-[#F8FAFC] transition-all cursor-pointer w-full sm:w-auto"
              >
                <Sparkles className="size-4 text-[#2563EB]" />
                <span>Ask AI Assistant</span>
              </button>
            </div>
          </div>

          {/* Hero Telemetry Card */}
          <div className="lg:col-span-4">
            <div className="rounded-[24px] sm:rounded-[28px] border border-white/20 bg-white/10 p-5 sm:p-6 backdrop-blur-xl space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-extrabold text-white flex items-center gap-2">
                  <Activity className="size-4 text-[#34D399]" /> Chemical Platform Status
                </span>
                <span className="rounded-full bg-[#059669] px-2.5 py-0.5 text-[10px] sm:text-[10.5px] font-black text-white">
                  Operational 99.98%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <div className="rounded-2xl bg-white/10 p-3 sm:p-3.5 border border-white/10">
                  <p className="text-[10px] font-bold text-white/70">Annual Value Creation</p>
                  <p className="text-lg sm:text-xl font-black text-white mt-1 num">₹48.5 Cr</p>
                  <p className="text-[10px] text-[#34D399] font-bold mt-0.5">▲ EBITDA Gain</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-3 sm:p-3.5 border border-white/10">
                  <p className="text-[10px] font-bold text-white/70">Audit Readiness</p>
                  <p className="text-lg sm:text-xl font-black text-white mt-1 num">100%</p>
                  <p className="text-[10px] text-[#34D399] font-bold mt-0.5">REACH & SDS Ready</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-3 sm:p-3.5 border border-white/10">
                  <p className="text-[10px] font-bold text-white/70">Active AI Agents</p>
                  <p className="text-lg sm:text-xl font-black text-white mt-1 num">58 Agents</p>
                  <p className="text-[10px] text-[#60A5FA] font-bold mt-0.5">43 Departments</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-3 sm:p-3.5 border border-white/10">
                  <p className="text-[10px] font-bold text-white/70">Procurement SLA</p>
                  <p className="text-lg sm:text-xl font-black text-white mt-1 num">-64%</p>
                  <p className="text-[10px] text-[#34D399] font-bold mt-0.5">Cycle Reduction</p>
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 p-3 border border-white/10 flex items-center justify-between text-xs font-bold">
                <span className="text-white/80">Architecture:</span>
                <span className="text-[#34D399] font-extrabold flex items-center gap-1">
                  <ShieldCheck className="size-4 text-[#34D399]" /> 100% Software Layer
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. EXECUTIVE KPI DASHBOARD (5 Cards Displayed + View All Expansion)
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="space-y-4">
        <SectionTitle
          title="Executive Business KPIs"
          hint="Boardroom performance indicators driving compliance, procurement speed, quality, order fulfillment, and EBITDA value creation."
          action={
            CORE_EXECUTIVE_KPIS.length > 5 && (
              <button
                onClick={() => setShowAllKpis((v) => !v)}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#2563EB] hover:underline cursor-pointer bg-[#EFF6FF] px-3.5 py-1.5 rounded-full border border-[#2563EB]/20 transition-all shrink-0"
              >
                <span>{showAllKpis ? "Show Less" : `View All KPIs (${CORE_EXECUTIVE_KPIS.length})`}</span>
                <ChevronDown className={cn("size-3.5 transition-transform duration-200", showAllKpis && "rotate-180")} />
              </button>
            )
          }
        />

        <div className="grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {displayedKpis.map((kpi) => (
            <StatCard
              key={kpi.id}
              label={kpi.label}
              value={kpi.value}
              suffix={kpi.suffix}
              delta={kpi.delta}
              accent={kpi.accent}
              icon={kpi.icon}
              supporting={kpi.supporting}
              spark={kpi.spark}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. 14 DEPARTMENT AI MODULES (5 Cards Displayed + View All Expansion)
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2563EB]">
              Enterprise Functional Coverage
            </span>
            <h2 className="text-xl font-extrabold text-[#0F172A]">Department AI Modules</h2>
          </div>
          
          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2.5">
            <div className="flex items-center gap-2">
              <Pill tone="info">14 Executive Modules</Pill>
              <Pill tone="success">43 Chemical Functions</Pill>
            </div>

            {FOURTEEN_DEPARTMENTS.length > 5 && (
              <button
                onClick={() => setShowAllDepts((v) => !v)}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#2563EB] hover:underline cursor-pointer bg-[#EFF6FF] px-3.5 py-1.5 rounded-full border border-[#2563EB]/20 transition-all shrink-0"
              >
                <span>{showAllDepts ? "Show Less" : `View All Departments (${FOURTEEN_DEPARTMENTS.length})`}</span>
                <ChevronDown className={cn("size-3.5 transition-transform duration-200", showAllDepts && "rotate-180")} />
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {displayedDepts.map((dept) => (
            <GlassCard key={dept.id} className="p-5 sm:p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                  <h3 className="text-sm font-extrabold text-[#0F172A]">{dept.name}</h3>
                  <Pill tone="primary">{dept.timeline}</Pill>
                </div>

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#DC2626]">
                    Business Challenge
                  </p>
                  <p className="text-xs text-[#64748B] mt-0.5 font-medium">{dept.challenges}</p>
                </div>

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#2563EB]">
                    AI Opportunity
                  </p>
                  <p className="text-xs font-semibold text-[#0F172A] mt-0.5">{dept.opportunities}</p>
                </div>

                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                  <p className="text-[10px] font-bold text-[#64748B]">Target Metric</p>
                  <p className="text-xs font-black text-[#0F172A] num mt-0.5">{dept.kpis}</p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Bot className="size-4 text-[#2563EB]" />
                  <span className="text-[11px] font-bold text-[#0F172A]">
                    {dept.agents.length} Connected Agents
                  </span>
                </div>
                <span className="text-xs font-black text-[#059669] num">{dept.roi}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. 11 CHEMICAL PRODUCTION AI AGENTS (5 Cards Displayed + View All Expansion)
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <SectionTitle
          title="Chemical Industry Production AI Agents"
          hint="Specialized autonomous AI agents designed specifically for chemical manufacturing, quality control, SDS safety, and supply chain."
          action={
            ELEVEN_AI_AGENTS.length > 5 && (
              <button
                onClick={() => setShowAllAgents((v) => !v)}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#2563EB] hover:underline cursor-pointer bg-[#EFF6FF] px-3.5 py-1.5 rounded-full border border-[#2563EB]/20 transition-all shrink-0"
              >
                <span>{showAllAgents ? "Show Less" : `View All AI Agents (${ELEVEN_AI_AGENTS.length})`}</span>
                <ChevronDown className={cn("size-3.5 transition-transform duration-200", showAllAgents && "rotate-180")} />
              </button>
            )
          }
        />

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {displayedAgents.map((agent) => (
            <GlassCard key={agent.id} className="p-5 sm:p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="grid size-9 place-items-center rounded-2xl bg-[#2563EB] text-white shrink-0">
                      <Bot className="size-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs font-extrabold text-[#0F172A] truncate">{agent.name}</h3>
                      <p className="text-[9.5px] font-bold text-[#2563EB] truncate">{agent.tagline}</p>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] leading-relaxed text-[#64748B] font-medium">{agent.purpose}</p>

                <div className="rounded-2xl border border-[#059669]/30 bg-[#ECFDF5]/60 p-2.5">
                  <p className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#059669]">
                    Measured Business Value
                  </p>
                  <p className="text-[11px] font-bold text-[#0F172A] mt-0.5">{agent.value}</p>
                </div>

                <div className="text-[10.5px] text-[#64748B] flex items-center justify-between pt-1">
                  <span>Systems:</span>
                  <span className="font-bold text-[#0F172A] truncate max-w-[120px]">{agent.systems}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-[11px] font-black text-[#2563EB] num">⚡ {agent.savings}</span>
                <button
                  onClick={openChat}
                  className="flex items-center gap-1 rounded-full bg-[#2563EB] px-3.5 py-1.5 text-[11px] font-extrabold text-white hover:bg-[#1D4ED8] transition-all cursor-pointer shadow-md shadow-[#2563EB]/20"
                >
                  <span>Launch</span>
                  <ArrowRight className="size-3 text-white" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. CHEMICAL-SPECIFIC AI OPPORTUNITIES (5 Cards Displayed + View All Expansion)
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <SectionTitle
          title="Chemical-Specific AI Opportunities"
          hint="Dedicated domain automations built for specialty chemicals, polymers, pharma intermediates, and process manufacturing."
          action={
            CHEMICAL_AI_OPPORTUNITIES.length > 5 && (
              <button
                onClick={() => setShowAllOpps((v) => !v)}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#2563EB] hover:underline cursor-pointer bg-[#EFF6FF] px-3.5 py-1.5 rounded-full border border-[#2563EB]/20 transition-all shrink-0"
              >
                <span>{showAllOpps ? "Show Less" : `View All Opportunities (${CHEMICAL_AI_OPPORTUNITIES.length})`}</span>
                <ChevronDown className={cn("size-3.5 transition-transform duration-200", showAllOpps && "rotate-180")} />
              </button>
            )
          }
        />

        <div className="grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {displayedOpps.map((opp) => (
            <GlassCard key={opp.title} className="p-4 sm:p-5 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Pill tone="info">{opp.badge}</Pill>
                  <span className="text-[10.5px] font-black text-[#059669] num">⚡ {opp.impact}</span>
                </div>
                <h4 className="text-xs font-extrabold text-[#0F172A] pt-1">{opp.title}</h4>
                <p className="text-[11px] leading-relaxed text-[#64748B] font-medium">{opp.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6. EXECUTIVE RECHARTS VISUALIZATIONS (Cobalt & Emerald Palette)
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <SectionTitle
          title="Executive Performance & Automation Visualizations"
          hint="Clean Recharts analytics showing conversion funnel, department throughput, modality mix, and financial savings."
        />

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
          
          {/* Conversion Funnel */}
          <GlassCard className="p-5 sm:p-6 lg:col-span-7">
            <h3 className="text-xs font-extrabold text-[#2563EB] uppercase tracking-wider mb-4">
              Lead-to-Order Conversion Funnel
            </h3>
            <div className="h-[230px] sm:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={[
                    { stage: "1. Inquiries Received", count: 1240 },
                    { stage: "2. Specs Feasible", count: 1080 },
                    { stage: "3. Quote Drafted", count: 920 },
                    { stage: "4. Approved Quote", count: 740 },
                    { stage: "5. PO Issued to SAP", count: 680 },
                  ]}
                  margin={{ top: 10, right: 20, left: 80, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" {...axisStyle} />
                  <YAxis dataKey="stage" type="category" {...axisStyle} width={130} />
                  <Tooltip {...chartTooltip} />
                  <Bar dataKey="count" radius={[0, 12, 12, 0]} barSize={24}>
                    {[
                      CHART_COLORS.cobalt,
                      CHART_COLORS.indigo,
                      CHART_COLORS.amber,
                      CHART_COLORS.emerald,
                      CHART_COLORS.slate,
                    ].map((c, i) => (
                      <Cell key={i} fill={c} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Department Throughput Bar Chart */}
          <GlassCard className="p-5 sm:p-6 lg:col-span-5">
            <h3 className="text-xs font-extrabold text-[#2563EB] uppercase tracking-wider mb-4">
              Department Automation Maturity (%)
            </h3>
            <div className="h-[230px] sm:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptEfficiency.slice(0, 5)} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="name" {...axisStyle} />
                  <YAxis {...axisStyle} unit="%" />
                  <Tooltip {...chartTooltip} />
                  <Bar dataKey="rate" fill={CHART_COLORS.cobalt} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          7. COMPANY BRAIN EXPERIENCE
         ══════════════════════════════════════════════════════════════════════ */}
      <section id="brain" className="space-y-6">
        <GlassCard className="p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-[#E2E8F0] pb-6 mb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#EFF6FF] px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-[#2563EB]">
                <BrainCircuit className="size-4" /> Company Brain Architecture
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                Unified Enterprise Chemical Knowledge Layer
              </h2>
              <p className="text-xs text-[#64748B] max-w-2xl font-semibold leading-relaxed">
                Connects SAP, LIMS, SharePoint, and plant drive repositories into a single secure RAG vector store with 1.4M indexed document chunks.
              </p>
            </div>

            <button
              onClick={openChat}
              className="flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 py-3.5 text-xs font-extrabold text-white shadow-md shadow-[#2563EB]/25 hover:bg-[#1D4ED8] transition-all cursor-pointer shrink-0 w-full sm:w-auto"
            >
              <Search className="size-4 text-white" />
              <span>Search Enterprise Brain</span>
            </button>
          </div>

          <div className="grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-5 space-y-2">
              <div className="grid size-10 place-items-center rounded-2xl bg-[#0F172A] text-white">
                <FileText className="size-5 text-[#2563EB]" />
              </div>
              <h4 className="text-xs font-extrabold text-[#0F172A]">SOP & Batch Records</h4>
              <p className="text-[11px] text-[#64748B]">Instant retrieval of plant operating procedures and batch execution logs.</p>
              <Pill tone="success">412,800 Files Indexed</Pill>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-5 space-y-2">
              <div className="grid size-10 place-items-center rounded-2xl bg-[#2563EB] text-white">
                <ShieldCheck className="size-5" />
              </div>
              <h4 className="text-xs font-extrabold text-[#0F172A]">SDS / MSDS Search</h4>
              <p className="text-[11px] text-[#64748B]">Hazard safety data sheets mapped to global GHS and REACH guidelines.</p>
              <Pill tone="info">12,480 Substances</Pill>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-5 space-y-2">
              <div className="grid size-10 place-items-center rounded-2xl bg-[#059669] text-white">
                <Database className="size-5" />
              </div>
              <h4 className="text-xs font-extrabold text-[#0F172A]">Material Specifications</h4>
              <p className="text-[11px] text-[#64748B]">Purity grades, viscosity, and chemical specification matching engine.</p>
              <Pill tone="success">8,900 Product Grades</Pill>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-5 space-y-2">
              <div className="grid size-10 place-items-center rounded-2xl bg-[#D97706] text-white">
                <FileCheck2 className="size-5" />
              </div>
              <h4 className="text-xs font-extrabold text-[#0F172A]">COAs & Test Reports</h4>
              <p className="text-[11px] text-[#64748B]">Laboratory certificates of analysis automatically parsed from LIMS.</p>
              <Pill tone="warning">99.6% Recall Rate</Pill>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          8. TRANSFORMATION ROADMAP
         ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <HorizontalRoadmap />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          9. TRUST & GOVERNANCE ARCHITECTURE
         ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <TrustGovernanceSection />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          10. FINAL EXECUTIVE CTA BANNER
         ══════════════════════════════════════════════════════════════════════ */}
      <section className="rounded-[24px] sm:rounded-[32px] border border-[#E2E8F0] bg-white p-6 sm:p-8 md:p-12 text-center shadow-xl space-y-6">
        <div className="mx-auto max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#EFF6FF] px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-[#2563EB]">
            <Sparkles className="size-4" /> Ready for Enterprise AI Transformation?
          </span>
          <h2 className="text-2xl font-black text-[#0F172A] md:text-4xl">
            Book Your Chemical AI Readiness Assessment Today
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed text-[#64748B] font-semibold">
            Join leading specialty chemical, polymer, and pharma intermediate manufacturers in deploying zero-hardware AI operating capabilities across your plant clusters.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
          <button
            onClick={() => openReadiness("assessment")}
            className="flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-8 py-4 text-xs font-extrabold text-white shadow-xl shadow-[#2563EB]/25 hover:bg-[#1D4ED8] transition-all cursor-pointer w-full sm:w-auto"
          >
            <span>Book AI Readiness Assessment</span>
            <ArrowRight className="size-4 text-white" />
          </button>

          <button
            onClick={() => openReadiness("demo")}
            className="flex items-center justify-center gap-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-8 py-4 text-xs font-extrabold text-[#0F172A] hover:bg-white hover:border-[#2563EB]/40 transition-all cursor-pointer w-full sm:w-auto"
          >
            <span>Schedule Executive Demo</span>
          </button>
        </div>
      </section>

    </div>
  );
}
