import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { KeyRound, Plug, Settings, ShieldCheck, Users } from "lucide-react";
import { GlassCard, PageHeader, Pill, StatCard } from "@/components/cc/primitives";
import { FilterTable } from "@/components/cc/FilterTable";
import { AUDIT_LOGS, INTEGRATIONS, MODELS, USERS_LIST } from "@/lib/command-center-data";

export const Route = createFileRoute("/platform")({
  component: PlatformAdministrationWorkspacePage,
});

const TABS = [
  "Users & RBAC",
  "Security & Audit Logs",
  "Integrations & API Keys",
  "AI Governance & Cost",
  "System Health",
  "Settings",
] as const;

function PlatformAdministrationWorkspacePage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Users & RBAC");

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <PageHeader
        eyebrow="Platform Administration Workspace"
        title="Platform Configuration, Security & Governance"
        description="Manage enterprise users, Single Sign-On (SSO), RBAC permissions, SOC2 audit logs, SAP/ERP integrations, AI cost tracking, and system health."
        actions={<Pill tone="success"><ShieldCheck className="size-3.5" /> SOC2 Type II & ISO 27001 Active</Pill>}
      />

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
        <StatCard label="Enterprise Users" value={USERS_LIST.length * 200} delta={4.2} />
        <StatCard label="Active Integrations" value={INTEGRATIONS.length} delta={0} />
        <StatCard label="Security Compliance" value="100%" delta={0} />
        <StatCard label="Monthly AI Budget Used" value="68%" delta={-5.4} />
      </div>

      {/* Workspace Contextual Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#D9E2EC] pb-3">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
              activeTab === tab
                ? "bg-[#00B8D9] text-[#FFFFFF] shadow-sm"
                : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === "Users & RBAC" && (
        <GlassCard className="p-6">
          <FilterTable
            rows={USERS_LIST as any[]}
            columns={[
              { key: "name", header: "User Name", render: (r) => <span className="font-bold text-[#1E293B]">{r.name}</span> },
              { key: "email", header: "Email Address", render: (r) => <span className="text-[#64748B]">{r.email}</span> },
              { key: "role", header: "Role", render: (r) => <Pill tone="info">{r.role}</Pill> },
              { key: "department", header: "Department", render: (r) => <span className="text-[#0F4C81] font-semibold">{r.department}</span> },
              { key: "status", header: "Status", render: (r) => <Pill tone="success">{r.status}</Pill> },
            ]}
            searchKeys={["name", "email", "role", "department"]}
            placeholder="Search enterprise users & roles…"
          />
        </GlassCard>
      )}

      {activeTab === "Security & Audit Logs" && (
        <GlassCard className="p-6">
          <FilterTable
            rows={AUDIT_LOGS as any[]}
            columns={[
              { key: "id", header: "Log ID", render: (r) => <span className="font-bold text-[#0F4C81]">{r.id}</span> },
              { key: "event", header: "Event Description", render: (r) => <span className="font-bold text-[#1E293B]">{r.event}</span> },
              { key: "actor", header: "Actor / User", render: (r) => <span className="text-[#64748B]">{r.actor}</span> },
              { key: "ip", header: "IP Address", render: (r) => <span className="text-[#64748B] num">{r.ip}</span> },
              { key: "result", header: "Result", render: (r) => <Pill tone={r.result === "Success" ? "success" : "warning"}>{r.result}</Pill> },
            ]}
            searchKeys={["id", "event", "actor"]}
            placeholder="Search security & audit logs…"
          />
        </GlassCard>
      )}

      {activeTab === "Integrations & API Keys" && (
        <GlassCard className="p-6">
          <div className="grid gap-3.5 md:grid-cols-3">
            {INTEGRATIONS.map((sys) => (
              <div key={sys.name} className="rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] p-4">
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

      {activeTab === "AI Governance & Cost" && (
        <GlassCard className="p-6">
          <FilterTable
            rows={MODELS as any[]}
            columns={[
              { key: "name", header: "Model Name", render: (r) => <span className="font-bold text-[#1E293B]">{r.name}</span> },
              { key: "provider", header: "Provider", render: (r) => <span className="text-[#0F4C81] font-semibold">{r.provider}</span> },
              { key: "costPer1kTokens", header: "Cost / 1k Tokens", render: (r) => <span className="font-bold text-[#1E293B] num">{r.costPer1kTokens}</span> },
              { key: "accuracy", header: "Accuracy", render: (r) => <Pill tone="success">{r.accuracy}%</Pill> },
              { key: "status", header: "Status", render: (r) => <Pill tone="success">{r.status}</Pill> },
            ]}
            searchKeys={["name", "provider"]}
            placeholder="Search AI models & cost guardrails…"
          />
        </GlassCard>
      )}

      {(activeTab === "System Health" || activeTab === "Settings") && (
        <GlassCard className="p-6">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#1E293B]">Enterprise System Configuration & Health</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] p-4">
                <p className="text-xs font-bold text-[#0F4C81]">Industrial Light Theme</p>
                <p className="text-xs text-[#64748B] mt-1">Configured for Microsoft Fabric / SAP Fiori Light palette</p>
                <Pill tone="success" className="mt-2">Enforced</Pill>
              </div>
              <div className="rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] p-4">
                <p className="text-xs font-bold text-[#0F4C81]">SOC2 Audit & Compliance</p>
                <p className="text-xs text-[#64748B] mt-1">Full audit logging & prompt guardrails active</p>
                <Pill tone="success" className="mt-2">100% Compliant</Pill>
              </div>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
