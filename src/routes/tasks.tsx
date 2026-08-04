import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Pill, StatCard, toneFor, GlassCard } from "@/components/cc/primitives";
import { FilterTable } from "@/components/cc/FilterTable";
import { DEPARTMENTS, TASKS } from "@/lib/command-center-data";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Task Center — AI Command Center" },
      {
        name: "description",
        content: "AI-generated and human tasks across departments with owners, priorities, agents and due dates.",
      },
      { property: "og:title", content: "Task Center — AI Command Center" },
      {
        property: "og:description",
        content: "Work queue where autonomous agents hand off to people and back.",
      },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Tasks"
        title="Human ↔ Agent Work Queue"
        description="Tasks created by agents for people, and by people for agents — with clear ownership, priority and SLA."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Open tasks" value={TASKS.length} />
        <StatCard label="Waiting on human" value={TASKS.filter((t) => t.status === "Waiting on human").length} />
        <StatCard label="Blocked" value={TASKS.filter((t) => t.status === "Blocked").length} delta={-18.2} />
        <StatCard label="Automated closures (30d)" value="12.4" suffix="k" delta={24.1} />
      </div>

      <FilterTable
        rows={TASKS}
        searchKeys={["title", "assignee", "agent", "department"]}
        placeholder="Search tasks…"
        facets={[
          { label: "status", key: "status", options: ["In progress", "Waiting on human", "Blocked", "Ready"] },
          { label: "priority", key: "priority", options: ["High", "Medium", "Low"] },
          { label: "departments", key: "department", options: [...DEPARTMENTS] },
        ]}
        columns={[
          {
            key: "title",
            header: "Task",
            render: (t) => (
              <div>
                <p className="font-semibold text-foreground">{t.title}</p>
                <p className="num text-[11px] text-muted-foreground">
                  {t.id} · via {t.agent}
                </p>
              </div>
            ),
          },
          { key: "dept", header: "Department", render: (t) => <span className="text-muted-foreground">{t.department}</span> },
          { key: "assignee", header: "Assignee", render: (t) => <span className="text-muted-foreground">{t.assignee}</span> },
          { key: "priority", header: "Priority", render: (t) => <Pill tone={toneFor(t.priority)}>{t.priority}</Pill> },
          { key: "status", header: "Status", render: (t) => <Pill tone={toneFor(t.status)}>{t.status}</Pill> },
          { key: "due", header: "Due", render: (t) => <span className="num text-muted-foreground">{t.due}</span> },
        ]}
      />

      <GlassCard className="p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">SLA policy</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            ["High priority", "Respond within 4 business hours"],
            ["Medium priority", "Respond within 1 business day"],
            ["Low priority", "Respond within 3 business days"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-border bg-surface/40 p-4">
              <p className="text-[13px] font-semibold text-foreground">{k}</p>
              <p className="mt-1 text-xs text-muted-foreground">{v}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
