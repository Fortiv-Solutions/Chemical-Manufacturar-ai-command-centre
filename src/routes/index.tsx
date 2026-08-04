import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowUpRight,
  Bot,
  Boxes,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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

export const Route = createFileRoute("/")({
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

const chartTooltip = {
  contentStyle: {
    background: "#FFFFFF",
    border: "1px solid #D9E2EC",
    borderRadius: 12,
    fontSize: 12,
    color: "#1E293B",
    boxShadow: "0 4px 20px rgba(15,23,42,0.08)",
    padding: "8px 12px",
  },
  labelStyle: { color: "#64748B", fontWeight: 700, marginBottom: 4 },
} as const;

const axis = {
  stroke: "#64748B",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
} as const;

function Dashboard() {
  const liveCount = AUTOMATIONS.filter((a) => a.status === "Live").length;
  const activeAgents = AGENTS.filter((a) => a.status === "active");
  const pendingApprovals = APPROVALS.filter((a) => a.status === "Pending");

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        eyebrow="Executive Command Center"
        title="Chemical Enterprise AI Operating System"
        description="Unified executive dashboard across 39 office functions, 208 automation opportunities, 58 AI agents and 12 department copilots — grounded in real-time chemical manufacturing telemetry."
        actions={
          <>
            <Pill tone="success">
              <StatusDot tone="success" /> System Operational · 99.98% Uptime
            </Pill>
            <Link
              to="/brain"
              className="inline-flex items-center gap-2 rounded-lg bg-[#00B8D9] px-4 py-2 text-xs font-bold text-[#FFFFFF] shadow-sm hover:bg-[#009BB8]"
            >
              <Sparkles className="size-4" /> Ask Company AI
            </Link>
          </>
        }
      />

      {/* KPI Cards Grid */}
      <section>
        <SectionTitle title="Executive KPIs" hint="Rolling 30-day performance versus prior period" />
        <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 xl:grid-cols-6">
          {KPIS.map((k) => (
            <StatCard
              key={k.label}
              label={k.label}
              value={typeof k.value === "number" && k.value > 9999 ? formatNumber(k.value) : k.value}
              suffix={k.suffix}
              prefix={"prefix" in k ? (k.prefix as string) : undefined}
              delta={k.delta}
              spark={k.spark}
            />
          ))}
        </div>
      </section>

      {/* Automation Growth & Usage Mix */}
      <section className="grid gap-6 xl:grid-cols-3">
        <GlassCard className="p-6 xl:col-span-2">
          <SectionTitle title="Automation Growth & Velocity" hint="Live vs piloting vs remaining backlog" />
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={automationGrowth}>
                <defs>
                  <linearGradient id="gLive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00B8D9" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#00B8D9" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="gPilot" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#E8EDF3" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" {...axis} />
                <YAxis {...axis} width={30} />
                <Tooltip {...chartTooltip} />
                <Area
                  type="monotone"
                  dataKey="live"
                  stroke="#00B8D9"
                  fill="url(#gLive)"
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="piloting"
                  stroke="#F59E0B"
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
                    <Cell key={i} fill={["#00B8D9", "#0F4C81", "#22C55E", "#F59E0B", "#3B82F6"][i % 5]} />
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
                    style={{ background: ["#00B8D9", "#0F4C81", "#22C55E", "#F59E0B", "#3B82F6"][i % 5] }}
                  />
                  {u.name}
                </span>
                <span className="num font-bold text-[#1E293B]">{u.value}%</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </section>

      {/* Financial Savings & ROI */}
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
                <Bar dataKey="savings" fill="#00B8D9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#0F4C81" radius={[4, 4, 0, 0]} opacity={0.35} />
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
                  stroke="#22C55E"
                  strokeWidth={3}
                  dot={{ fill: "#22C55E", r: 4 }}
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
                <Bar dataKey="efficiency" fill="#00B8D9" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </section>

      {/* Pending Approvals & AI Stream */}
      <section className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <SectionTitle
            title="Pending Executive Approvals"
            hint="High-risk AI transactions awaiting human authorization"
            action={<Link to="/approvals" className="text-xs font-bold text-[#00B8D9] hover:underline">View All ({APPROVALS.length}) →</Link>}
          />
          <ul className="space-y-3 mt-4">
            {pendingApprovals.slice(0, 4).map((app) => (
              <li
                key={app.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] p-4 transition-all hover:border-[#00B8D9]"
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
                  <button className="rounded-lg bg-[#22C55E] px-3.5 py-1.5 text-xs font-bold text-[#FFFFFF] hover:bg-[#16A34A] shadow-xs">
                    Approve
                  </button>
                  <button className="rounded-lg border border-[#D9E2EC] bg-[#FFFFFF] px-3.5 py-1.5 text-xs font-bold text-[#64748B] hover:bg-[#F1F5F9]">
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
            action={<Link to="/agents" className="text-xs font-bold text-[#00B8D9] hover:underline">Agent Catalog →</Link>}
          />
          <ul className="space-y-3 mt-4">
            {activeAgents.slice(0, 4).map((agent) => (
              <li
                key={agent.id}
                className="flex items-start gap-3 rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] p-3.5 transition-all hover:border-[#00B8D9]"
              >
                <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#00B8D9]/10 text-[#00B8D9] font-bold">
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

      {/* Quick Action Navigation Cards */}
      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            to: "/agents",
            icon: Bot,
            title: "AI Agents Hub",
            body: `${AGENTS.length} active agents across ${DEPT_PROFILES.length} manufacturing functions with health versioning.`,
          },
          {
            to: "/automation",
            icon: Boxes,
            title: "Automation Center",
            body: `${liveCount} live workflows. Prioritised by ROI, difficulty and implementation phase.`,
          },
          {
            to: "/departments",
            icon: Building2,
            title: "Department Workspaces",
            body: "Every chemical office function gets its own contextual KPIs, agents, workflows and SOPs.",
          },
        ].map((c) => (
          <Link key={c.to} to={c.to}>
            <GlassCard className="group h-full p-6">
              <div className="flex items-start justify-between">
                <div className="grid size-10 place-items-center rounded-xl bg-[#00B8D9]/10 text-[#00B8D9]">
                  <c.icon className="size-5" />
                </div>
                <ArrowUpRight className="size-4 text-[#64748B] transition-transform group-hover:-translate-y-0.5 group-hover:text-[#00B8D9]" />
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
