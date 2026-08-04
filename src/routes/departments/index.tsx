import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard, MeterBar, PageHeader, Pill, StatCard } from "@/components/cc/primitives";
import { AUTOMATIONS, DEPT_PROFILES } from "@/lib/command-center-data";

export const Route = createFileRoute("/departments/")({
  head: () => ({
    meta: [
      { title: "Department Workspaces — AI Command Center" },
      {
        name: "description",
        content:
          "Dedicated AI workspaces for 39 office functions with KPIs, agents, tasks, workflows, approvals, documents and analytics.",
      },
      { property: "og:title", content: "Department Workspaces — AI Command Center" },
      {
        property: "og:description",
        content: "Every chemical manufacturing office function operating with its own AI workspace.",
      },
    ],
  }),
  component: DepartmentsPage,
});

function DepartmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Department Center"
        title="39 Function Workspaces"
        description="Each department runs its own AI workspace: KPIs, agents, tasks, workflows, approvals, reports, documents, automation, knowledge and analytics."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Office functions" value={DEPT_PROFILES.length} />
        <StatCard label="Automations mapped" value={AUTOMATIONS.length} delta={6.4} />
        <StatCard
          label="Avg adoption"
          value={Math.round(DEPT_PROFILES.reduce((s, d) => s + d.adoption, 0) / DEPT_PROFILES.length)}
          suffix="%"
          delta={10.2}
        />
        <StatCard
          label="Annual savings"
          value={`$${(DEPT_PROFILES.reduce((s, d) => s + d.savings, 0) / 1_000_000).toFixed(1)}`}
          suffix="M"
          delta={18.7}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {DEPT_PROFILES.map((d) => (
          <Link key={d.slug} to="/departments/$slug" params={{ slug: d.slug }}>
            <GlassCard className="h-full p-4 transition-all hover:border-primary/40 hover:shadow-glow">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[15px] font-semibold text-foreground">{d.name}</p>
                <Pill tone={d.maturity >= 4 ? "success" : d.maturity >= 3 ? "warning" : "neutral"}>
                  L{d.maturity}
                </Pill>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[
                  ["Agents", d.agents],
                  ["Automations", d.automations],
                  ["Hours", `${(d.hoursSaved / 1000).toFixed(1)}k`],
                ].map(([l, v]) => (
                  <div key={l as string} className="rounded-lg border border-border bg-surface/40 py-2">
                    <p className="num text-sm font-semibold text-foreground">{v}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
                  <span>Adoption</span>
                  <span className="num">{d.adoption}%</span>
                </div>
                <MeterBar value={d.adoption} tone={d.adoption > 70 ? "success" : "warning"} />
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
