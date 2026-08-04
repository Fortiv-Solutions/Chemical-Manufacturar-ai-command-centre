import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Activity, Download, FileSpreadsheet, Gauge, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GlassCard, PageHeader, Pill, StatCard } from "@/components/cc/primitives";
import { FilterTable } from "@/components/cc/FilterTable";
import { MIS_PACKS, roiTrend, savingsTrend } from "@/lib/command-center-data";

export const Route = createFileRoute("/insights")({
  component: InsightsReportingWorkspacePage,
});

const TABS = [
  "Executive",
  "Operations",
  "Finance",
  "Departments",
  "Automation",
  "AI",
  "Forecasting",
  "MIS Reports",
] as const;

function InsightsReportingWorkspacePage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Executive");

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <PageHeader
        eyebrow="Insights & Reporting Workspace"
        title="Business Intelligence & MIS Center"
        description="Interactive analytics, operational reporting, financial ROI forecasting, and automated executive board packs."
        actions={<Pill tone="primary"><Gauge className="size-3.5 text-[#0F4C81]" /> Live BI Cube Connected</Pill>}
      />

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
        <StatCard label="Annual ROI Realised" value="480%" delta={18.4} />
        <StatCard label="Monthly Net Savings" value="$4.8M" delta={12.0} />
        <StatCard label="Forecast Accuracy" value="98.2%" delta={1.4} />
        <StatCard label="MIS Packs Generated" value="142" delta={8.5} />
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
      {(activeTab === "Executive" || activeTab === "Finance" || activeTab === "Forecasting") && (
        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard className="p-6">
            <h3 className="text-base font-bold text-[#1E293B] mb-4">Monthly Financial Savings ($M)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={savingsTrend}>
                  <CartesianGrid stroke="#E8EDF3" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} width={28} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E2E8F0",
                      borderRadius: "12px",
                      color: "#1E293B",
                    }}
                  />
                  <Bar dataKey="savings" fill="#0F4C81" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" fill="#0F4C81" radius={[4, 4, 0, 0]} opacity={0.35} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-base font-bold text-[#1E293B] mb-4">Cumulative Programme ROI (%)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={roiTrend}>
                  <defs>
                    <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#E8EDF3" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} width={32} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E2E8F0",
                      borderRadius: "12px",
                      color: "#1E293B",
                    }}
                  />
                  <Area type="monotone" dataKey="roi" stroke="#22C55E" strokeWidth={3} fill="url(#emeraldGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      )}

      {(activeTab === "Operations" || activeTab === "Departments" || activeTab === "Automation" || activeTab === "AI") && (
        <GlassCard className="p-6">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#1E293B]">Operational Performance & Automation Telemetry</h3>
            <div className="grid gap-3.5 md:grid-cols-3">
              <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <p className="text-xs font-bold text-[#0F4C81]">Plant Downtime Avoided</p>
                <p className="text-lg font-extrabold text-[#1E293B] mt-1">428 Hours</p>
                <Pill tone="success" className="mt-2">+$1.2M Saved</Pill>
              </div>
              <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <p className="text-xs font-bold text-[#0F4C81]">Batch Yield Optimization</p>
                <p className="text-lg font-extrabold text-[#1E293B] mt-1">+4.2% Yield</p>
                <Pill tone="primary" className="mt-2">Quality Control Verified</Pill>
              </div>
              <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <p className="text-xs font-bold text-[#0F4C81]">Invoice Cycle Time</p>
                <p className="text-lg font-extrabold text-[#1E293B] mt-1">1.4 Days (was 18 days)</p>
                <Pill tone="success" className="mt-2">-92% Faster</Pill>
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      {activeTab === "MIS Reports" && (
        <GlassCard className="p-6">
          <FilterTable
            rows={MIS_PACKS as any[]}
            columns={[
              { key: "id", header: "Report ID", render: (r) => <span className="font-bold text-[#0F4C81]">{r.id}</span> },
              { key: "title", header: "MIS Report Title", render: (r) => <span className="font-bold text-[#1E293B]">{r.title}</span> },
              { key: "department", header: "Department", render: (r) => <span className="text-[#64748B]">{r.department}</span> },
              { key: "frequency", header: "Frequency", render: (r) => <Pill tone="info">{r.frequency}</Pill> },
              { key: "format", header: "Format", render: (r) => <Pill tone="primary">{r.format}</Pill> },
            ]}
            searchKeys={["id", "title", "department"]}
            placeholder="Search MIS report packs…"
          />
        </GlassCard>
      )}
    </div>
  );
}
