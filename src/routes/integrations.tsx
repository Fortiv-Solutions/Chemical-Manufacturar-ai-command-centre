import { createFileRoute } from "@tanstack/react-router";
import { GlassCard, PageHeader, Pill, StatCard, toneFor } from "@/components/cc/primitives";
import { FilterTable } from "@/components/cc/FilterTable";
import { INTEGRATIONS } from "@/lib/command-center-data";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations Hub — AI Command Center" },
      {
        name: "description",
        content:
          "Connect SAP, Oracle, Salesforce, Microsoft 365, Teams, Power BI, PostgreSQL, vector databases and REST APIs to the AI operating layer.",
      },
      { property: "og:title", content: "Integrations Hub — AI Command Center" },
      {
        property: "og:description",
        content: "Every enterprise system wired into one governed AI layer.",
      },
    ],
  }),
  component: IntegrationsPage,
});

function IntegrationsPage() {
  const categories = [...new Set(INTEGRATIONS.map((i) => i.category))];
  const connected = INTEGRATIONS.filter((i) => i.status === "Connected");

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Integrations"
        title="Systems & Data Connectivity"
        description="The AI layer reads and writes through governed connectors — no shadow copies, no manual bridges."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Connectors available" value={INTEGRATIONS.length} />
        <StatCard label="Connected" value={connected.length} delta={14.2} />
        <StatCard label="API calls / month" value="76.4" suffix="M" delta={21.7} />
        <StatCard label="Sync health" value={99.4} suffix="%" delta={0.4} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {INTEGRATIONS.slice(0, 8).map((i) => (
          <GlassCard key={i.name} className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[13px] font-semibold text-foreground">{i.name}</p>
                <p className="text-[11px] text-muted-foreground">{i.category}</p>
              </div>
              <Pill tone={i.status === "Connected" ? "success" : "neutral"}>{i.status}</Pill>
            </div>
            <p className="num mt-3 text-[11px] text-muted-foreground">{i.calls}</p>
          </GlassCard>
        ))}
      </div>

      <FilterTable
        rows={INTEGRATIONS}
        searchKeys={["name", "category"]}
        placeholder="Search connectors…"
        facets={[
          { label: "status", key: "status", options: ["Connected", "Available"] },
          { label: "categories", key: "category", options: categories },
        ]}
        columns={[
          { key: "name", header: "System", render: (i) => <span className="font-semibold text-foreground">{i.name}</span> },
          { key: "category", header: "Category", render: (i) => <Pill tone="neutral">{i.category}</Pill> },
          { key: "status", header: "Status", render: (i) => <Pill tone={toneFor(i.status)}>{i.status}</Pill> },
          { key: "calls", header: "Volume", render: (i) => <span className="num text-muted-foreground">{i.calls}</span> },
          {
            key: "action",
            header: "",
            render: (i) => (
              <button className="rounded-md border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                {i.status === "Connected" ? "Configure" : "Connect"}
              </button>
            ),
          },
        ]}
      />
    </div>
  );
}
