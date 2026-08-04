import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  Bot,
  Clock,
  Database,
  Filter,
  GitBranch,
  Globe,
  Mail,
  RefreshCw,
  ShieldCheck,
  UserCheck,
  Zap,
} from "lucide-react";
import { GlassCard, PageHeader, Pill, StatCard, toneFor } from "@/components/cc/primitives";

export const Route = createFileRoute("/workflows")({
  head: () => ({
    meta: [
      { title: "Workflow Center — AI Command Center" },
      {
        name: "description",
        content:
          "Visual workflow orchestration with triggers, conditions, AI nodes, human approval, ERP/CRM connectors, retries and monitoring.",
      },
      { property: "og:title", content: "Workflow Center — AI Command Center" },
      {
        property: "og:description",
        content: "Design, run and monitor enterprise automations across SAP, CRM, email and databases.",
      },
    ],
  }),
  component: WorkflowsPage,
});

const NODE_PALETTE = [
  { icon: Zap, label: "Trigger", tone: "primary" as const },
  { icon: Clock, label: "Schedule", tone: "primary" as const },
  { icon: Filter, label: "Condition", tone: "info" as const },
  { icon: Bot, label: "AI node", tone: "primary" as const },
  { icon: GitBranch, label: "AI decision", tone: "info" as const },
  { icon: UserCheck, label: "Human approval", tone: "warning" as const },
  { icon: Mail, label: "Email / Teams / Slack", tone: "neutral" as const },
  { icon: Database, label: "SAP / ERP / CRM", tone: "neutral" as const },
  { icon: Globe, label: "HTTP request", tone: "neutral" as const },
  { icon: RefreshCw, label: "Loop / retry", tone: "warning" as const },
  { icon: ShieldCheck, label: "Guardrail check", tone: "success" as const },
  { icon: AlertTriangle, label: "Escalation", tone: "danger" as const },
];

const WORKFLOWS = [
  {
    name: "Invoice to payment (straight-through)",
    status: "active",
    runs: "18.4k",
    success: 98.7,
    nodes: 14,
    steps: [
      "Email trigger · AP inbox",
      "Document Intelligence · extract invoice",
      "SAP lookup · PO + GRN match",
      "Condition · variance under 2%",
      "AI decision · post or escalate",
      "Human approval · above $50k",
      "SAP posting · park & post",
      "Teams notification",
    ],
  },
  {
    name: "RFQ to quotation",
    status: "active",
    runs: "6.2k",
    success: 96.4,
    nodes: 11,
    steps: [
      "CRM trigger · new enquiry",
      "AI node · parse requirement",
      "Knowledge retrieval · grade specs",
      "Pricing engine · cost build-up",
      "Human approval · margin below floor",
      "Quotation generator · PDF",
      "Email dispatch + CRM update",
    ],
  },
  {
    name: "Deviation to CAPA closure",
    status: "paused",
    runs: "1.9k",
    success: 94.1,
    nodes: 16,
    steps: [
      "LIMS trigger · out-of-spec result",
      "AI node · classify deviation",
      "Retrieval · similar historical cases",
      "AI drafting · root cause & CAPA",
      "Human approval · QA head",
      "QMS write-back",
      "Effectiveness check schedule",
    ],
  },
  {
    name: "Export documentation set",
    status: "active",
    runs: "4.7k",
    success: 99.2,
    nodes: 12,
    steps: [
      "SAP trigger · sales order released",
      "Doc generation · invoice, packing list",
      "Compliance check · DG & COO rules",
      "AI validation · consignee data",
      "Human approval · exceptions only",
      "SharePoint archive + customer email",
    ],
  },
];

function WorkflowsPage() {
  const [selected, setSelected] = useState(0);
  const wf = WORKFLOWS[selected]!;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Workflow Center"
        title="Visual Workflow Orchestration"
        description="Compose triggers, conditions, AI nodes, human approvals and system connectors into monitored end-to-end automations."
        actions={
          <button className="rounded-lg bg-primary px-3.5 py-2 text-[13px] font-semibold text-primary-foreground">
            New workflow
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Workflows deployed" value={142} delta={11.2} />
        <StatCard label="Executions (30d)" value="86.4" suffix="k" delta={19.6} />
        <StatCard label="Avg success rate" value={97.6} suffix="%" delta={1.1} />
        <StatCard label="Human touchpoints" value="6.8" suffix="%" delta={-12.4} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[260px_1fr]">
        <GlassCard className="p-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Node palette
          </h2>
          <ul className="mt-3 space-y-1.5">
            {NODE_PALETTE.map((n) => (
              <li
                key={n.label}
                className="flex items-center gap-2.5 rounded-lg border border-border bg-surface/40 px-2.5 py-2 text-xs text-foreground transition-colors hover:border-primary/40"
              >
                <n.icon className="size-3.5 text-primary" />
                {n.label}
              </li>
            ))}
          </ul>
        </GlassCard>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {WORKFLOWS.map((w, i) => (
              <button
                key={w.name}
                onClick={() => setSelected(i)}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                  i === selected
                    ? "border-primary/40 bg-primary/12 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {w.name}
              </button>
            ))}
          </div>

          <GlassCard className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-foreground">{wf.name}</h2>
                <p className="num mt-1 text-xs text-muted-foreground">
                  {wf.nodes} nodes · {wf.runs} runs · {wf.success}% success
                </p>
              </div>
              <Pill tone={toneFor(wf.status)}>{wf.status}</Pill>
            </div>

            <div className="mt-5 overflow-x-auto">
              <div className="flex min-w-max items-stretch gap-3 pb-2">
                {wf.steps.map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className="w-52 rounded-xl border border-border bg-surface/60 p-3 shadow-elevated">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                        Step {i + 1}
                      </p>
                      <p className="mt-1.5 text-[13px] leading-snug text-foreground">{s}</p>
                    </div>
                    {i < wf.steps.length - 1 && (
                      <span className="h-px w-6 shrink-0 bg-border-strong" aria-hidden />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <div className="grid gap-4 md:grid-cols-2">
            <GlassCard className="p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Run monitor</h2>
              <ul className="mt-3 space-y-2 font-mono text-[11px]">
                {Array.from({ length: 7 }, (_, i) => (
                  <li key={i} className="flex items-center gap-3 rounded-lg border border-border bg-surface/40 px-3 py-2">
                    <span className="text-muted-foreground">run#{7100 + i}</span>
                    <Pill tone={i === 2 ? "warning" : i === 5 ? "danger" : "success"}>
                      {i === 2 ? "retried" : i === 5 ? "failed" : "completed"}
                    </Pill>
                    <span className="ml-auto text-muted-foreground">{(1.4 + i * 0.6).toFixed(1)}s</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
            <GlassCard className="p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Reliability controls</h2>
              <ul className="mt-3 space-y-2 text-[13px]">
                {[
                  ["Retry policy", "3 attempts, exponential backoff"],
                  ["Idempotency", "Keyed on document hash"],
                  ["Timeout", "120s per node"],
                  ["Fallback", "Route to human queue"],
                  ["Audit", "Every node input/output retained 7 years"],
                ].map(([k, v]) => (
                  <li key={k} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface/40 px-3 py-2">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="text-right text-foreground">{v}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
