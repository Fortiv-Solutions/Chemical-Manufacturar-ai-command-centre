import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { GlassCard, PageHeader, Pill, StatCard, toneFor } from "@/components/cc/primitives";
import { FilterTable } from "@/components/cc/FilterTable";
import { AUTOMATIONS, DEPARTMENTS, ROADMAP } from "@/lib/command-center-data";

export const Route = createFileRoute("/automation")({
  head: () => ({
    meta: [
      { title: "Automation Center — 208 Opportunities" },
      {
        name: "description",
        content:
          "All 208 AI automation opportunities with priority, ROI, hours saved, difficulty, phase, owner and business value.",
      },
      { property: "og:title", content: "Automation Center — 208 Opportunities" },
      {
        property: "og:description",
        content: "Prioritised automation portfolio for chemical manufacturing knowledge work.",
      },
    ],
  }),
  component: AutomationPage,
});

function AutomationPage() {
  const live = AUTOMATIONS.filter((a) => a.status === "Live");
  const byPhase = ["Phase 1", "Phase 2", "Phase 3"].map((p) => ({
    phase: p,
    hours: Math.round(
      AUTOMATIONS.filter((a) => a.phase === p).reduce((s, a) => s + a.hoursSaved, 0) / 1000,
    ),
    count: AUTOMATIONS.filter((a) => a.phase === p).length,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Automation Center"
        title="208 Automation Opportunities"
        description="The complete opportunity portfolio from the Enterprise AI Transformation assessment — prioritised by ROI, effort and dependency, and tracked through to live operation."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <StatCard label="Opportunities" value={AUTOMATIONS.length} />
        <StatCard label="Live" value={live.length} delta={9.8} />
        <StatCard label="In build" value={AUTOMATIONS.filter((a) => a.status === "In Build").length} />
        <StatCard
          label="Hours saved potential"
          value={(AUTOMATIONS.reduce((s, a) => s + a.hoursSaved, 0) / 1000).toFixed(0)}
          suffix="k"
        />
        <StatCard
          label="Avg ROI"
          value={Math.round(AUTOMATIONS.reduce((s, a) => s + a.roi, 0) / AUTOMATIONS.length)}
          suffix="%"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Value by phase</h2>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byPhase}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="phase" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} width={34} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border-strong)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="hours" name="Hours saved (k)" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="count" name="Opportunities" fill="var(--color-chart-3)" radius={[4, 4, 0, 0]} opacity={0.6} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Implementation roadmap</h2>
          <ul className="mt-3 space-y-2">
            {ROADMAP.map((p) => (
              <li key={p.phase} className="rounded-xl border border-border bg-surface/40 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-semibold text-foreground">{p.phase}</p>
                  <Pill tone={toneFor(p.status)}>{p.status}</Pill>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">{p.window}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{p.focus}</p>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <FilterTable
        rows={AUTOMATIONS}
        pageSize={16}
        searchKeys={["title", "code", "department", "owner"]}
        placeholder="Search 208 automation opportunities…"
        facets={[
          { label: "departments", key: "department", options: [...DEPARTMENTS] },
          { label: "priority", key: "priority", options: ["P1", "P2", "P3"] },
          { label: "status", key: "status", options: ["Live", "In Build", "Piloting", "Backlog"] },
          { label: "phases", key: "phase", options: ["Phase 1", "Phase 2", "Phase 3"] },
          { label: "difficulty", key: "difficulty", options: ["Low", "Medium", "High"] },
        ]}
        columns={[
          {
            key: "title",
            header: "Opportunity",
            render: (a) => (
              <div>
                <p className="font-semibold text-foreground">{a.title}</p>
                <p className="num text-[11px] text-muted-foreground">
                  {a.code} · {a.value}
                </p>
              </div>
            ),
          },
          { key: "dept", header: "Department", render: (a) => <span className="text-muted-foreground">{a.department}</span> },
          { key: "priority", header: "Priority", render: (a) => <Pill tone={a.priority === "P1" ? "danger" : a.priority === "P2" ? "warning" : "neutral"}>{a.priority}</Pill> },
          { key: "roi", header: "ROI", render: (a) => <span className="num text-success">{a.roi}%</span> },
          { key: "hours", header: "Hours saved", render: (a) => <span className="num">{a.hoursSaved.toLocaleString("en-US")}</span> },
          { key: "difficulty", header: "Difficulty", render: (a) => <Pill tone={toneFor(a.difficulty)}>{a.difficulty}</Pill> },
          { key: "status", header: "Status", render: (a) => <Pill tone={toneFor(a.status)}>{a.status}</Pill> },
          { key: "phase", header: "Phase", render: (a) => <span className="text-muted-foreground">{a.phase}</span> },
          { key: "owner", header: "Owner", render: (a) => <span className="text-muted-foreground">{a.owner}</span> },
        ]}
      />
    </div>
  );
}
