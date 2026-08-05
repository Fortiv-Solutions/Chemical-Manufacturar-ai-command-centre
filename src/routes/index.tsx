import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Activity,
  ArrowUpRight,
  Bot,
  Boxes,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  DollarSign,
  FileCheck2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
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
import { DepartmentSelector } from "@/components/cc/DepartmentSelector";

export const Route = createFileRoute("/")(  {
  head: () => ({
    meta: [
      { title: "Executive Command Center — AI Operating System" },
      {
        name: "description",
        content:
          "Executive control plane across 39 office functions, 208 automation opportunities, AI agents, savings and ROI across chemical manufacturing operations.",
      },
      { property: "og:title", content: "Executive Command Center — AI Operating System" },
      {
        property: "og:description",
        content: "Live KPIs, AI activity and ROI for the enterprise AI operating system.",
      },
    ],
  }),
  component: Dashboard,
});

/* ─── Chart Styling ─── */
const chartTooltip = {
  contentStyle: {
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    borderRadius: 14,
    fontSize: 12,
    color: "#1E293B",
    boxShadow: "0 8px 30px rgba(15,23,42,0.10)",
    padding: "10px 14px",
  },
  labelStyle: { color: "#64748B", fontWeight: 700, marginBottom: 4 },
  cursor: { stroke: "#E2E8F0", strokeWidth: 1 },
} as const;

const axis = {
  stroke: "#94A3B8",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
  fontWeight: 500,
} as const;

const CHART_COLORS = {
  primary: "#0F4C81",
  teal: "#147A7E",
  accent: "#2F80ED",
  success: "#22C55E",
  warning: "#F59E0B",
};

/* ─── Dashboard Component ─── */
function Dashboard() {
  const [selectedDept, setSelectedDept] = useState("Enterprise Overview");
  const [showAllKpis, setShowAllKpis] = useState(false);

  // Filtered data based on selected department
  const filteredData = useMemo(() => {
    if (selectedDept === "Enterprise Overview") {
      return {
        agents: AGENTS,
        automations: AUTOMATIONS,
        approvals: APPROVALS,
        activity: ACTIVITY,
      };
    }
    return {
      agents: AGENTS.filter((a) => a.department === selectedDept),
      automations: AUTOMATIONS.filter((a) => a.department === selectedDept),
      approvals: APPROVALS.filter((a) => a.department === selectedDept),
      activity: ACTIVITY.filter((a) => a.department === selectedDept),
    };
  }, [selectedDept]);

  const isEnterprise = selectedDept === "Enterprise Overview";

  // Dynamic KPI values
  const activeAgents = filteredData.agents.filter((a) => a.status === "active");
  const liveAutomations = filteredData.automations.filter((a) => a.status === "Live");
  const pendingApprovals = filteredData.approvals.filter((a) => a.status === "Pending");
  const totalHoursSaved = filteredData.agents.reduce((s, a) => s + a.hoursSaved, 0);

  return (
    <div className="space-y-10">
      {/* Page Header with Department Selector */}
      <PageHeader
        eyebrow="Executive Command Center"
        title="Chemical Enterprise AI Operating System"
        description={
          isEnterprise
            ? "Unified executive dashboard across 39 office functions, 208 automation opportunities, 58 AI agents and 12 department copilots — grounded in real-time chemical manufacturing telemetry."
            : `Department workspace: ${selectedDept} — ${filteredData.agents.length} agents, ${filteredData.automations.length} automations, ${pendingApprovals.length} pending approvals.`
        }
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Pill tone="success" className="h-10 px-3.5 flex items-center gap-2 rounded-xl text-xs shrink-0">
              <StatusDot tone="success" /> System Operational · 99.98% Uptime
            </Pill>
            <DepartmentSelector selected={selectedDept} onSelect={setSelectedDept} />
          </div>
        }
      />

      {/* ═══════════════════════════════════════════════════════
          EXECUTIVE KPIs — 5 Primary Cards + "View All" Expansion
         ═══════════════════════════════════════════════════════ */}
      <section>
        <SectionTitle
          title="Executive KPIs"
          hint="Rolling 30-day performance versus prior period"
          action={
            <button
              onClick={() => setShowAllKpis((v) => !v)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C81] hover:underline transition-colors"
            >
              {showAllKpis ? "Show Less" : `View All KPIs (12)`}
              <ChevronDown className={`size-3.5 transition-transform duration-200 ${showAllKpis ? "rotate-180" : ""}`} />
            </button>
          }
        />

        {/* Primary KPIs — always visible */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          <StatCard
            icon={DollarSign}
            label="Annualised Savings"
            value={isEnterprise ? "$46.8" : `$${(totalHoursSaved * 0.021).toFixed(1)}`}
            suffix="M"
            delta={19.3}
            spark={[22, 27, 31, 36, 40, 44, 47]}
            supporting="Target: $50M"
            size="sm"
            accent="green"
          />
          <StatCard
            icon={Bot}
            label="AI Agents"
            value={filteredData.agents.length}
            delta={12.4}
            spark={[18, 24, 29, 35, 41, 48, 57]}
            supporting={`${activeAgents.length} healthy`}
            size="sm"
            accent="blue"
          />
          <StatCard
            icon={Boxes}
            label="Automations Live"
            value={liveAutomations.length}
            delta={8.1}
            spark={[22, 28, 34, 39, 44, 51, 58]}
            supporting={`${filteredData.automations.filter(a => a.status === "Piloting").length} piloting`}
            size="sm"
            accent="teal"
          />
          <StatCard
            icon={TrendingUp}
            label="Programme ROI"
            value={isEnterprise ? "412" : Math.round(totalHoursSaved * 0.02 + 80)}
            suffix="%"
            delta={34.5}
            spark={[110, 165, 210, 265, 320, 370, 412]}
            supporting="Target: 350%"
            size="sm"
            accent="accent"
          />
          <StatCard
            icon={Clock}
            label="Hours Saved"
            value={isEnterprise ? "482.4k" : formatNumber(totalHoursSaved)}
            suffix="h"
            delta={21.7}
            spark={[120, 180, 240, 300, 360, 430, 482]}
            supporting="YTD cumulative"
            size="sm"
            accent="green"
          />
        </div>

        {/* Expanded KPIs — shown on "View All" toggle */}
        {showAllKpis && (
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-7 animate-in fade-in-0 slide-in-from-top-2 duration-300">
            <StatCard
              icon={DollarSign}
              label="Monthly Savings"
              value="$3.9"
              suffix="M"
              delta={6.8}
              spark={[1.9, 2.3, 2.6, 3.0, 3.3, 3.6, 3.9]}
              size="sm"
              accent="green"
            />
            <StatCard
              icon={Users}
              label="FTE Redeployed"
              value={246}
              delta={15.2}
              spark={[90, 120, 150, 180, 205, 228, 246]}
              size="sm"
              accent="accent"
            />
            <StatCard
              icon={Building2}
              label="Departments"
              value={isEnterprise ? 39 : 1}
              suffix={isEnterprise ? "/39" : ""}
              delta={4.2}
              spark={[12, 18, 24, 29, 33, 37, 39]}
              size="sm"
              accent="blue"
            />
            <StatCard
              icon={FileCheck2}
              label="Docs Processed"
              value={isEnterprise ? "1.28M" : formatNumber(Math.round(filteredData.agents.length * 22100))}
              delta={11.9}
              spark={[420, 560, 700, 860, 1000, 1150, 1285]}
              size="sm"
              accent="teal"
            />
            <StatCard
              icon={CheckCircle2}
              label="Approvals Done"
              value={isEnterprise ? "92.8k" : filteredData.approvals.filter(a => a.status === "Approved").length}
              delta={7.4}
              spark={[30, 42, 54, 65, 76, 85, 93]}
              size="sm"
              accent="green"
            />
            <StatCard
              icon={ShieldCheck}
              label="AI Accuracy"
              value={isEnterprise ? "97.4" : (activeAgents.reduce((s, a) => s + a.successRate, 0) / (activeAgents.length || 1)).toFixed(1)}
              suffix="%"
              delta={1.6}
              spark={[92, 93, 94, 95, 96, 97, 97.4]}
              size="sm"
              accent="accent"
            />
            <StatCard
              icon={Zap}
              label="Adoption"
              value={78}
              suffix="%"
              delta={9.5}
              spark={[28, 38, 47, 56, 64, 72, 78]}
              size="sm"
              accent="blue"
            />
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: Charts — Automation Growth & AI Modality Mix
         ═══════════════════════════════════════════════════════ */}
      <section className="grid gap-6 xl:grid-cols-3">
        <GlassCard className="p-6 xl:col-span-2">
          <SectionTitle title="Automation Growth & Velocity" hint="Live vs piloting vs remaining backlog" />
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={automationGrowth}>
                <defs>
                  <linearGradient id="gLive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={CHART_COLORS.primary} stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="gPilot" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART_COLORS.warning} stopOpacity={0.18} />
                    <stop offset="100%" stopColor={CHART_COLORS.warning} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#E8EDF3" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" {...axis} />
                <YAxis {...axis} width={30} />
                <Tooltip {...chartTooltip} />
                <Legend
                  wrapperStyle={{ fontSize: 11, fontWeight: 600, paddingTop: 8 }}
                  iconType="circle"
                  iconSize={8}
                />
                <Area
                  type="monotone"
                  dataKey="live"
                  name="Live"
                  stroke={CHART_COLORS.primary}
                  fill="url(#gLive)"
                  strokeWidth={2.5}
                />
                <Area
                  type="monotone"
                  dataKey="piloting"
                  name="Piloting"
                  stroke={CHART_COLORS.warning}
                  fill="url(#gPilot)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <SectionTitle title="AI Modality Mix" hint="Share of platform consumption" />
          <div className="h-48 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={usageByModality}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={4}
                  stroke="none"
                >
                  {usageByModality.map((_, i) => (
                    <Cell key={i} fill={[CHART_COLORS.primary, CHART_COLORS.teal, CHART_COLORS.success, CHART_COLORS.warning, CHART_COLORS.accent][i % 5]} />
                  ))}
                </Pie>
                <Tooltip {...chartTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-4 space-y-2">
            {usageByModality.map((u, i) => (
              <li key={u.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-[#64748B]">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ background: [CHART_COLORS.primary, CHART_COLORS.teal, CHART_COLORS.success, CHART_COLORS.warning, CHART_COLORS.accent][i % 5] }}
                  />
                  {u.name}
                </span>
                <span className="num font-bold text-[#1E293B]">{u.value}%</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5: Financial Charts — Savings, ROI, Dept Efficiency
         ═══════════════════════════════════════════════════════ */}
      <section className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6">
          <SectionTitle title="Monthly Savings ($M)" hint="Realised vs target" />
          <div className="h-52 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={savingsTrend}>
                <CartesianGrid stroke="#E8EDF3" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" {...axis} />
                <YAxis {...axis} width={28} />
                <Tooltip {...chartTooltip} />
                <Legend wrapperStyle={{ fontSize: 11, fontWeight: 600, paddingTop: 8 }} iconType="circle" iconSize={8} />
                <Bar dataKey="savings" name="Realised" fill={CHART_COLORS.primary} radius={[6, 6, 0, 0]} />
                <Bar dataKey="target" name="Target" fill={CHART_COLORS.teal} radius={[6, 6, 0, 0]} opacity={0.35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <SectionTitle title="Cumulative ROI %" hint="Programme return on investment" />
          <div className="h-52 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={roiTrend}>
                <CartesianGrid stroke="#E8EDF3" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" {...axis} />
                <YAxis {...axis} width={32} />
                <Tooltip {...chartTooltip} />
                <Line
                  type="monotone"
                  dataKey="roi"
                  stroke={CHART_COLORS.success}
                  strokeWidth={2.5}
                  dot={{ fill: CHART_COLORS.success, r: 3, strokeWidth: 0 }}
                  activeDot={{ fill: CHART_COLORS.success, r: 5, stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <SectionTitle title="Department Efficiency" hint="Adoption index by top functions" />
          <div className="h-52 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptEfficiency} layout="vertical">
                <CartesianGrid stroke="#E8EDF3" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" {...axis} />
                <YAxis type="category" dataKey="name" {...axis} width={92} />
                <Tooltip {...chartTooltip} />
                <Bar dataKey="efficiency" fill={CHART_COLORS.primary} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6: Pending Approvals & Live AI Activity
         ═══════════════════════════════════════════════════════ */}
      <section className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <SectionTitle
            title="Pending Executive Approvals"
            hint="High-risk AI transactions awaiting human authorization"
            action={<Link to="/approvals" className="text-xs font-bold text-[#0F4C81] hover:underline">View All ({filteredData.approvals.length}) →</Link>}
          />
          <ul className="space-y-3 mt-4">
            {pendingApprovals.slice(0, 4).map((app) => (
              <li
                key={app.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-[#FAFBFC] p-4 transition-all hover:border-[#0F4C81]/30 hover:shadow-sm"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Pill tone={app.type === "Financial" ? "warning" : "info"}>{app.type}</Pill>
                    <p className="text-xs font-bold text-[#1E293B] truncate">{app.subject}</p>
                  </div>
                  <p className="mt-1 text-[11px] text-[#64748B]">
                    Requested by <strong>{app.requester}</strong> · Value: <strong className="text-[#1E293B]">{app.amount}</strong>
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button className="rounded-lg bg-[#22C55E] px-3.5 py-1.5 text-xs font-bold text-[#FFFFFF] hover:bg-[#16A34A] shadow-xs transition-all">
                    Approve
                  </button>
                  <button className="rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-1.5 text-xs font-bold text-[#64748B] hover:bg-[#F0F4F8] transition-all">
                    Review
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-6">
          <SectionTitle
            title="Live AI Agent Activity"
            hint="Real-time execution events across chemical units"
            action={<Link to="/agents" className="text-xs font-bold text-[#0F4C81] hover:underline">Agent Catalog →</Link>}
          />
          <ul className="space-y-3 mt-4">
            {(isEnterprise ? activeAgents : filteredData.agents.filter(a => a.status === "active")).slice(0, 4).map((agent) => (
              <li
                key={agent.id}
                className="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-[#FAFBFC] p-3.5 transition-all hover:border-[#0F4C81]/30 hover:shadow-sm"
              >
                <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#EBF1F8] text-[#0F4C81] font-bold">
                  <Bot className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#1E293B]">{agent.name}</p>
                    <span className="text-[11px] font-semibold text-[#64748B] num">{agent.lastRun}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-[#64748B] truncate">{agent.purpose}</p>
                  <div className="mt-2 flex items-center gap-3 text-[11px]">
                    <span className="text-[#0F4C81] font-bold">{(agent.runs30d ?? 0).toLocaleString()} runs</span>
                    <span className="text-[#22C55E] font-bold">{agent.successRate}% accuracy</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </GlassCard>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7: Quick Action Navigation Cards
         ═══════════════════════════════════════════════════════ */}
      <section className="grid gap-5 md:grid-cols-3">
        {[
          {
            to: "/agents",
            icon: Bot,
            title: "AI Agents Hub",
            body: `${AGENTS.length} active agents across ${DEPT_PROFILES.length} manufacturing functions with health versioning.`,
            color: CHART_COLORS.primary,
          },
          {
            to: "/automation",
            icon: Boxes,
            title: "Automation Center",
            body: `${AUTOMATIONS.filter(a => a.status === "Live").length} live workflows. Prioritised by ROI, difficulty and implementation phase.`,
            color: CHART_COLORS.teal,
          },
          {
            to: "/departments",
            icon: Building2,
            title: "Department Workspaces",
            body: "Every chemical office function gets its own contextual KPIs, agents, workflows and SOPs.",
            color: CHART_COLORS.accent,
          },
        ].map((c) => (
          <Link key={c.to} to={c.to}>
            <GlassCard className="group h-full p-6">
              <div className="flex items-start justify-between">
                <div
                  className="grid size-10 place-items-center rounded-xl"
                  style={{ backgroundColor: `${c.color}10` }}
                >
                  <c.icon className="size-5" style={{ color: c.color }} />
                </div>
                <ArrowUpRight className="size-4 text-[#94A3B8] transition-transform group-hover:-translate-y-0.5 group-hover:text-[#0F4C81]" />
              </div>
              <p className="mt-4 text-base font-extrabold text-[#1E293B]">{c.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#64748B]">{c.body}</p>
              <div className="mt-5">
                <MeterBar value={78} tone="primary" />
              </div>
            </GlassCard>
          </Link>
        ))}
      </section>
    </div>
  );
}
