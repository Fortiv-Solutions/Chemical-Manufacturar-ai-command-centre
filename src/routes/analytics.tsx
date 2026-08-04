import { createFileRoute } from "@tanstack/react-router";
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
import { GlassCard, PageHeader, Pill, StatCard } from "@/components/cc/primitives";
import {
  automationGrowth,
  cycleTime,
  deptEfficiency,
  REPORTS,
  roiTrend,
  savingsTrend,
  usageByModality,
} from "@/lib/command-center-data";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics & ROI — AI Command Center" },
      {
        name: "description",
        content:
          "Enterprise AI analytics: adoption, hours saved, cost avoidance, ROI by department, cycle-time reduction and model usage.",
      },
      { property: "og:title", content: "Analytics & ROI — AI Command Center" },
      {
        property: "og:description",
        content: "Quantified impact of the AI operating layer across every function.",
      },
    ],
  }),
  component: AnalyticsPage,
});

const CHART_COLORS = [
  "#00C2D1",
  "#22C55E",
  "#F59E0B",
  "#3B82F6",
  "#A855F7",
];

const tooltipStyle = {
  background: "#151B24",
  border: "1px solid #232D3A",
  borderRadius: 12,
  fontSize: 12,
  color: "#F5F7FA",
  boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
  padding: "8px 12px",
};

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analytics"
        title="Impact, Adoption & ROI"
        description="The measurement layer: what the AI estate saves, where adoption is strongest, and which functions still have headroom."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <StatCard label="Annualised savings" value="$18.4" suffix="M" delta={22.6} />
        <StatCard label="Hours returned" value="612" suffix="k" delta={18.9} />
        <StatCard label="Blended ROI" value={412} suffix="%" delta={31.4} />
        <StatCard label="Cycle time reduction" value={57} suffix="%" delta={8.2} />
        <StatCard label="Active users" value="3.9" suffix="k" delta={12.7} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard className="p-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-[#7C8899]">Savings trend</h2>
          <div className="mt-4 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={savingsTrend}>
                <defs>
                  <linearGradient id="sv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00C2D1" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#00C2D1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#232D3A" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#7C8899" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#7C8899" fontSize={11} tickLine={false} axisLine={false} width={40} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey={Object.keys(savingsTrend[0] ?? {})[1] ?? "value"} stroke="#00C2D1" strokeWidth={2.5} fill="url(#sv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-[#7C8899]">ROI trajectory</h2>
          <div className="mt-4 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={roiTrend}>
                <CartesianGrid stroke="#232D3A" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#7C8899" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#7C8899" fontSize={11} tickLine={false} axisLine={false} width={40} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey={Object.keys(roiTrend[0] ?? {})[1] ?? "value"} stroke="#22C55E" strokeWidth={2.5} dot={{ fill: "#22C55E", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-[#7C8899]">Automation growth</h2>
          <div className="mt-4 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={automationGrowth}>
                <CartesianGrid stroke="#232D3A" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#7C8899" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#7C8899" fontSize={11} tickLine={false} axisLine={false} width={34} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey={Object.keys(automationGrowth[0] ?? {})[1] ?? "value"} fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-[#7C8899]">Usage by modality</h2>
          <div className="mt-4 flex h-60 items-center">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie data={usageByModality} dataKey="value" nameKey="name" innerRadius={48} outerRadius={78} paddingAngle={4}>
                  {usageByModality.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <ul className="flex-1 space-y-2">
              {usageByModality.map((m, i) => (
                <li key={m.name} className="flex items-center gap-2 text-xs">
                  <span
                    className="size-2 rounded-full"
                    style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
                  />
                  <span className="text-[#B6C2CF]">{m.name}</span>
                  <span className="num ml-auto font-semibold text-[#F5F7FA]">{m.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-5">
        <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-[#7C8899]">Efficiency by department</h2>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deptEfficiency} layout="vertical" margin={{ left: 90 }}>
              <CartesianGrid stroke="#232D3A" strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" stroke="#7C8899" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey={Object.keys(deptEfficiency[0] ?? {})[0] ?? "name"}
                stroke="#7C8899"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                width={90}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey={Object.keys(deptEfficiency[0] ?? {})[1] ?? "value"} fill="#00C2D1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard className="p-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-[#7C8899]">Cycle time reduction</h2>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cycleTime}>
                <CartesianGrid stroke="#232D3A" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#7C8899" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#7C8899" fontSize={11} tickLine={false} axisLine={false} width={34} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey={Object.keys(cycleTime[0] ?? {})[1] ?? "value"} stroke="#3B82F6" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-[#7C8899]">Scheduled reports</h2>
          <ul className="mt-3 space-y-2">
            {REPORTS.map((r) => (
              <li key={r.name} className="flex items-center gap-3 rounded-xl border border-[#232D3A] bg-[#10151C]/60 px-3.5 py-3">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-bold text-[#F5F7FA]">{r.name}</p>
                  <p className="text-[11px] text-[#7C8899]">
                    {r.cadence} · {r.owner} · last run {r.lastRun}
                  </p>
                </div>
                <Pill tone="success" className="ml-auto">
                  {r.format}
                </Pill>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}

