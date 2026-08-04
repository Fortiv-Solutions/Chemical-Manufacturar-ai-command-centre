import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard, PageHeader, Pill, StatCard, StatusDot, toneFor } from "@/components/cc/primitives";
import { FilterTable } from "@/components/cc/FilterTable";
import { AGENTS, DEPARTMENTS } from "@/lib/command-center-data";

export const Route = createFileRoute("/agents/")({
  head: () => ({
    meta: [
      { title: "AI Agent Catalog — AI Command Center" },
      {
        name: "description",
        content:
          "Enterprise catalog of AI agents with owners, health, versions, success rates, runtimes, connections and permissions.",
      },
      { property: "og:title", content: "AI Agent Catalog — AI Command Center" },
      {
        property: "og:description",
        content: "Every AI agent across finance, quality, supply chain, HR and regulatory operations.",
      },
    ],
  }),
  component: AgentsPage,
});

function AgentsPage() {
  const active = AGENTS.filter((a) => a.status === "active").length;
  const avgSuccess = (AGENTS.reduce((s, a) => s + a.successRate, 0) / AGENTS.length).toFixed(1);
  const runs = AGENTS.reduce((s, a) => s + a.runs30d, 0);
  const hours = AGENTS.reduce((s, a) => s + a.hoursSaved, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="AI Agents Center"
        title="Enterprise AI Agent Catalog"
        description="Every autonomous agent deployed across the organisation, with ownership, health, versioning, execution history and system permissions."
        actions={<Pill tone="success"><StatusDot /> {active} online</Pill>}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Registered agents" value={AGENTS.length} delta={12.4} />
        <StatCard label="Avg success rate" value={avgSuccess} suffix="%" delta={1.8} />
        <StatCard label="Executions (30d)" value={(runs / 1000).toFixed(1)} suffix="k" delta={16.2} />
        <StatCard label="Hours saved" value={(hours / 1000).toFixed(1)} suffix="k" delta={22.9} />
      </div>

      <FilterTable
        rows={AGENTS}
        searchKeys={["name", "purpose", "owner", "department"]}
        placeholder="Search agents by name, purpose or owner…"
        facets={[
          { label: "departments", key: "department", options: [...DEPARTMENTS] },
          { label: "status", key: "status", options: ["active", "paused", "draft", "error"] },
          { label: "health", key: "health", options: ["healthy", "degraded", "critical"] },
        ]}
        columns={[
          {
            key: "name",
            header: "Agent",
            render: (a) => (
              <Link to="/agents/$agentId" params={{ agentId: a.id }} className="group block">
                <span className="font-semibold text-foreground group-hover:text-primary">{a.name}</span>
                <span className="block max-w-md truncate text-xs text-muted-foreground">{a.purpose}</span>
              </Link>
            ),
          },
          {
            key: "department",
            header: "Department",
            render: (a) => (
              <Link
                to="/departments/$slug"
                params={{ slug: a.department.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-") }}
                className="text-muted-foreground hover:text-primary"
              >
                {a.department}
              </Link>
            ),
          },
          { key: "owner", header: "Owner", render: (a) => <span className="text-muted-foreground">{a.owner}</span> },
          { key: "status", header: "Status", render: (a) => <Pill tone={toneFor(a.status)}>{a.status}</Pill> },
          { key: "health", header: "Health", render: (a) => <Pill tone={toneFor(a.health)}>{a.health}</Pill> },
          { key: "version", header: "Version", render: (a) => <span className="num text-muted-foreground">{a.version}</span> },
          { key: "success", header: "Success", render: (a) => <span className="num">{a.successRate}%</span> },
          { key: "runtime", header: "Avg runtime", render: (a) => <span className="num text-muted-foreground">{a.avgRuntime}s</span> },
          { key: "last", header: "Last run", render: (a) => <span className="text-muted-foreground">{a.lastRun}</span> },
        ]}
      />

      <GlassCard className="p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Agent operating model</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            ["Supervised autonomy", "Agents act within scoped permissions; financial and quality actions always route to a human approver."],
            ["Versioned prompts", "Every agent version pins a prompt revision, model and evaluation suite before promotion."],
            ["Full observability", "Execution history, token cost, latency and citation trails are retained for audit."],
          ].map(([t, b]) => (
            <div key={t} className="rounded-xl border border-border bg-surface/40 p-4">
              <p className="text-[13px] font-semibold text-foreground">{t}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
