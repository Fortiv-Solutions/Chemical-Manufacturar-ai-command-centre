import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bot, Boxes, Cpu, KeyRound, MessagesSquare, Play, Plug, RefreshCw, Workflow } from "lucide-react";
import { GlassCard, PageHeader, Pill, StatCard } from "@/components/cc/primitives";
import { FilterTable } from "@/components/cc/FilterTable";
import { AGENTS, AUTOMATIONS, COPILOTS, INTEGRATIONS, MODELS, PROMPTS, WORKFLOW_EXECUTIONS } from "@/lib/command-center-data";

export const Route = createFileRoute("/ai-automation")({
  component: AIAutomationWorkspacePage,
});

const TABS = [
  "Overview",
  "AI Agents",
  "AI Copilots",
  "Automation Library",
  "Workflow Builder",
  "Executions",
  "Monitoring",
  "Models",
  "Prompts",
  "Integrations",
  "Logs",
] as const;

function getTabMetrics(tab: (typeof TABS)[number]) {
  switch (tab) {
    case "AI Agents":
      return [
        { label: "Autonomous Agents", value: AGENTS.length, delta: 12.4 },
        { label: "Avg Execution Accuracy", value: "99.2%", delta: 1.4 },
        { label: "30-Day Agent Runs", value: "42,890", delta: 18.2 },
        { label: "Healthy Agent Ratio", value: "96.5%", delta: 0.5 },
      ];
    case "AI Copilots":
      return [
        { label: "Active Department Copilots", value: COPILOTS.length, delta: 8.0 },
        { label: "30-Day Conversations", value: "14,250", delta: 22.1 },
        { label: "User Adoption Rate", value: "88.4%", delta: 5.2 },
        { label: "Avg Response Latency", value: "1.2s", delta: -14.0 },
      ];
    case "Automation Library":
      return [
        { label: "Live Automations", value: AUTOMATIONS.filter((a) => a.status === "Live").length, delta: 24.5 },
        { label: "High-ROI Opportunities", value: "34", delta: 15.0 },
        { label: "Annual Hours Saved", value: "142,000h", delta: 28.4 },
        { label: "Backlog Pipeline", value: "155", delta: -6.2 },
      ];
    case "Workflow Builder":
      return [
        { label: "Orchestrated Canvas Nodes", value: "248", delta: 14.2 },
        { label: "Active Canvas Workflows", value: "14", delta: 10.0 },
        { label: "Workflow Pass Rate", value: "99.6%", delta: 0.8 },
        { label: "SAP Webhook Trigger", value: "180ms", delta: -12.0 },
      ];
    case "Executions":
      return [
        { label: "Executions Today", value: "1,420", delta: 16.4 },
        { label: "Execution Pass Rate", value: "99.4%", delta: 0.6 },
        { label: "Avg Execution Duration", value: "1.4s", delta: -8.5 },
        { label: "Auto-Retried Failures", value: "4", delta: -25.0 },
      ];
    case "Monitoring":
      return [
        { label: "System Uptime", value: "99.98%", delta: 0.01 },
        { label: "Real-Time Error Rate", value: "0.02%", delta: -40.0 },
        { label: "P99 Inference Latency", value: "240ms", delta: -15.0 },
        { label: "Cluster Memory Load", value: "34%", delta: -4.0 },
      ];
    case "Models":
      return [
        { label: "Registered AI Models", value: MODELS.length, delta: 20.0 },
        { label: "Active Production LLMs", value: "4", delta: 0 },
        { label: "Avg Model Latency", value: "110ms", delta: -18.0 },
        { label: "Cost per 1k Tokens", value: "$0.0018", delta: -35.0 },
      ];
    case "Prompts":
      return [
        { label: "Prompt Templates", value: PROMPTS.length, delta: 12.0 },
        { label: "Prompt Accuracy", value: "99.4%", delta: 1.2 },
        { label: "Prompt Invocations 30D", value: "14,800", delta: 24.0 },
        { label: "Latest Version", value: "v3.1", delta: 0 },
      ];
    case "Integrations":
      return [
        { label: "Connected Systems", value: INTEGRATIONS.length, delta: 0 },
        { label: "Real-Time Webhooks", value: "42", delta: 8.0 },
        { label: "SAP Connector Latency", value: "45ms", delta: -10.0 },
        { label: "Security Breaches", value: "0", delta: 0 },
      ];
    case "Logs":
      return [
        { label: "Log Event Velocity", value: "140 /s", delta: 12.0 },
        { label: "Daily Ingestion Volume", value: "4.2 GB", delta: 5.0 },
        { label: "Guardrail Intercepts", value: "3", delta: -50.0 },
        { label: "Critical Errors", value: "0", delta: -100 },
      ];
    case "Overview":
    default:
      return [
        { label: "Autonomous Agents", value: AGENTS.length, delta: 12.4 },
        { label: "Department Copilots", value: COPILOTS.length, delta: 8.0 },
        { label: "Live Automations", value: AUTOMATIONS.filter((a) => a.status === "Live").length, delta: 24.5 },
        { label: "Registered Models & Prompts", value: MODELS.length + PROMPTS.length, delta: 14.1 },
      ];
  }
}

function AIAutomationWorkspacePage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Overview");
  const currentMetrics = getTabMetrics(activeTab);

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <PageHeader
        eyebrow="AI & Automation Workspace"
        title="Enterprise AI & Automation Control Center"
        description="Unified control hub for 58 AI Agents, 12 Copilots, 208 Automations, n8n Workflow Builder, Model Registry, and Real-time Execution Logs."
        actions={<Pill tone="primary"><Bot className="size-3.5 text-[#0F4C81]" /> {activeTab} Active</Pill>}
      />

      {/* Dynamic Tab-Specific KPI Cards */}
      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
        {currentMetrics.map((m) => (
          <StatCard key={m.label} label={m.label} value={m.value} delta={m.delta} />
        ))}
      </div>

      {/* Workspace Contextual Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#E2E8F0] pb-3">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
              activeTab === tab
                ? "bg-[#0F4C81] text-[#FFFFFF] shadow-sm"
                : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === "Overview" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard className="p-6">
            <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-2 mb-4">
              <Bot className="size-4.5 text-[#0F4C81]" /> Top Active AI Agents ({AGENTS.length})
            </h3>
            <ul className="space-y-3">
              {AGENTS.slice(0, 5).map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
                  <div>
                    <p className="text-xs font-bold text-[#1E293B]">{a.name}</p>
                    <p className="text-[11px] text-[#64748B]">{a.department} · {a.purpose}</p>
                  </div>
                  <Pill tone="success">{a.successRate}% Success</Pill>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-2 mb-4">
              <Boxes className="size-4.5 text-[#0F4C81]" /> High-ROI Automations ({AUTOMATIONS.length})
            </h3>
            <ul className="space-y-3">
              {AUTOMATIONS.slice(0, 5).map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
                  <div>
                    <p className="text-xs font-bold text-[#1E293B]">{a.code} · {a.title}</p>
                    <p className="text-[11px] text-[#64748B]">{a.department} · ROI: {a.roi}</p>
                  </div>
                  <Pill tone={a.status === "Live" ? "success" : "warning"}>{a.status}</Pill>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      )}

      {activeTab === "AI Agents" && (
        <GlassCard className="p-6">
          <FilterTable
            rows={AGENTS as any[]}
            columns={[
              { key: "name", header: "Agent Name", render: (r) => <span className="font-bold text-[#1E293B]">{r.name}</span> },
              { key: "department", header: "Department", render: (r) => <span className="text-[#64748B] font-semibold">{r.department}</span> },
              { key: "purpose", header: "Purpose", render: (r) => <span className="text-xs text-[#64748B] truncate max-w-xs">{r.purpose}</span> },
              { key: "successRate", header: "Accuracy", render: (r) => <Pill tone="success">{r.successRate}%</Pill> },
              { key: "status", header: "Status", render: (r) => <Pill tone={r.status === "active" ? "success" : "warning"}>{r.status}</Pill> },
            ]}
            searchKeys={["name", "department", "purpose"]}
            placeholder="Search AI agents…"
          />
        </GlassCard>
      )}

      {activeTab === "AI Copilots" && (
        <GlassCard className="p-6">
          <div className="grid gap-3.5 md:grid-cols-3">
            {COPILOTS.map((c) => (
              <div key={c.id} className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <p className="text-sm font-bold text-[#1E293B]">{c.name}</p>
                <p className="text-xs text-[#0F4C81] font-semibold mt-0.5">{c.department}</p>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">{c.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <Pill tone="success">{c.adoption}% adoption</Pill>
                  <span className="text-xs font-bold text-[#0F4C81]">{c.conversations} chats</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {activeTab === "Automation Library" && (
        <GlassCard className="p-6">
          <FilterTable
            rows={AUTOMATIONS as any[]}
            columns={[
              { key: "code", header: "Code", render: (r) => <span className="font-bold text-[#0F4C81]">{r.code}</span> },
              { key: "title", header: "Automation Title", render: (r) => <span className="font-bold text-[#1E293B]">{r.title}</span> },
              { key: "department", header: "Department", render: (r) => <span className="text-[#64748B]">{r.department}</span> },
              { key: "roi", header: "ROI", render: (r) => <span className="font-bold text-[#22C55E]">{r.roi}</span> },
              { key: "status", header: "Status", render: (r) => <Pill tone={r.status === "Live" ? "success" : "warning"}>{r.status}</Pill> },
            ]}
            searchKeys={["code", "title", "department"]}
            placeholder="Search automation opportunities…"
          />
        </GlassCard>
      )}

      {activeTab === "Workflow Builder" && (
        <GlassCard className="p-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-2">
                <Workflow className="size-5 text-[#0F4C81]" /> Visual Canvas — n8n Style Chemical Process Orchestrator
              </h3>
              <p className="text-xs text-[#64748B] mt-1">Configure AI decision nodes, SAP ERP triggers, regulatory approval gates, and automated retries.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg bg-[#0F4C81] px-4 py-2 text-xs font-bold text-[#FFFFFF] shadow-sm hover:bg-[#0A3A63]">
              <Play className="size-3.5" /> Execute Canvas
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              { type: "SAP S/4HANA Trigger", role: "Webhook Event", detail: "Fires when invoice > $10k created", tone: "primary" },
              { type: "AI Extraction Node", role: "Claude 3.5 Sonnet", detail: "Extracts line items & tax Codes", tone: "info" },
              { type: "Decision Gate Node", role: "Tolerance Evaluation", detail: "Checks variance against PO rules", tone: "warning" },
              { type: "Approval / Post Node", role: "Human Escalation", detail: "Posts to SAP or routes to Manager", tone: "success" },
            ].map((node, i) => (
              <div key={i} className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 relative shadow-xs">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F4C81]">Step #{i + 1}</span>
                <p className="text-sm font-extrabold text-[#1E293B] mt-1">{node.type}</p>
                <Pill tone={node.tone as any} className="mt-2">{node.role}</Pill>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">{node.detail}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {activeTab === "Executions" && (
        <GlassCard className="p-6">
          <FilterTable
            rows={WORKFLOW_EXECUTIONS as any[]}
            columns={[
              { key: "id", header: "Execution ID", render: (r) => <span className="font-bold text-[#0F4C81]">{r.id}</span> },
              { key: "workflowName", header: "Workflow Name", render: (r) => <span className="font-bold text-[#1E293B]">{r.workflowName}</span> },
              { key: "trigger", header: "Trigger", render: (r) => <Pill tone="info">{r.trigger}</Pill> },
              { key: "duration", header: "Duration", render: (r) => <span className="text-[#64748B] num">{r.duration}</span> },
              { key: "status", header: "Status", render: (r) => <Pill tone={r.status === "Completed" ? "success" : "warning"}>{r.status}</Pill> },
            ]}
            searchKeys={["id", "workflowName", "trigger"]}
            placeholder="Search execution logs…"
          />
        </GlassCard>
      )}

      {activeTab === "Models" && (
        <GlassCard className="p-6">
          <FilterTable
            rows={MODELS as any[]}
            columns={[
              { key: "name", header: "Model Name", render: (r) => <span className="font-bold text-[#1E293B]">{r.name}</span> },
              { key: "provider", header: "Provider", render: (r) => <span className="text-[#0F4C81] font-semibold">{r.provider}</span> },
              { key: "task", header: "Primary Task", render: (r) => <span className="text-xs text-[#64748B]">{r.task}</span> },
              { key: "latency", header: "Latency", render: (r) => <span className="font-bold text-[#1E293B] num">{r.latency}</span> },
              { key: "accuracy", header: "Accuracy", render: (r) => <Pill tone="success">{r.accuracy}%</Pill> },
            ]}
            searchKeys={["name", "provider", "task"]}
            placeholder="Search model registry…"
          />
        </GlassCard>
      )}

      {activeTab === "Prompts" && (
        <GlassCard className="p-6">
          <FilterTable
            rows={PROMPTS as any[]}
            columns={[
              { key: "name", header: "Prompt Name", render: (r) => <span className="font-bold text-[#1E293B]">{r.name}</span> },
              { key: "category", header: "Category", render: (r) => <Pill tone="info">{r.category}</Pill> },
              { key: "version", header: "Version", render: (r) => <span className="font-bold text-[#0F4C81] num">{r.version}</span> },
              { key: "author", header: "Author", render: (r) => <span className="text-[#64748B]">{r.author}</span> },
              { key: "successRate", header: "Success", render: (r) => <Pill tone="success">{r.successRate}%</Pill> },
            ]}
            searchKeys={["name", "category", "author"]}
            placeholder="Search prompt templates…"
          />
        </GlassCard>
      )}

      {activeTab === "Integrations" && (
        <GlassCard className="p-6">
          <div className="grid gap-3.5 md:grid-cols-3">
            {INTEGRATIONS.map((sys) => (
              <div key={sys.name} className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0F4C81]">{sys.category}</span>
                  <Pill tone={sys.status === "Connected" ? "success" : "warning"}>{sys.status}</Pill>
                </div>
                <p className="mt-2 text-sm font-bold text-[#1E293B]">{sys.name}</p>
                <p className="mt-1 text-xs text-[#64748B]">Latency: {sys.latency} · Sync: Real-Time</p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {(activeTab === "Monitoring" || activeTab === "Logs") && (
        <GlassCard className="p-6">
          <h3 className="text-base font-bold text-[#1E293B] mb-4">Real-Time System Log & Event Stream</h3>
          <div className="space-y-2.5 font-mono text-xs">
            {[
              "[08:14:02] INFO: SAP S/4HANA Webhook event received -> Triggering Invoice Exception Auto-Reconciliation #wf-8910",
              "[08:14:03] SUCCESS: Claude 3.5 Sonnet extracted 14 line items with 99.4% confidence score",
              "[08:14:04] SUCCESS: Decision Gate evaluated variance tolerance (0.2% < 1.0%) -> Auto-Posting to SAP ERP",
              "[08:12:10] WARN: Plant Reactor #4 Sensor telemetry spike (74°C) -> Escalated to On-Call Engineer Dr. Sharma",
              "[08:10:00] CRON: Executed scheduled MSDS compliance scan across 340 active regulatory sheets",
            ].map((log, idx) => (
              <div key={idx} className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-[#1E293B]">
                {log}
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
