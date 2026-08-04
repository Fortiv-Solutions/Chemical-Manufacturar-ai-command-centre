import { createFileRoute } from "@tanstack/react-router";
import { GlassCard, MeterBar, PageHeader, Pill, StatCard, toneFor } from "@/components/cc/primitives";
import { FilterTable } from "@/components/cc/FilterTable";
import { DEPARTMENTS, DOCUMENTS } from "@/lib/command-center-data";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Document Intelligence — AI Command Center" },
      {
        name: "description",
        content:
          "AI document extraction, validation and routing for invoices, COAs, MSDS, batch records, contracts and shipping documents.",
      },
      { property: "og:title", content: "Document Intelligence — AI Command Center" },
      {
        property: "og:description",
        content: "Every incoming document parsed, validated against systems, and routed without manual entry.",
      },
    ],
  }),
  component: DocumentsPage,
});

function DocumentsPage() {
  const types = [...new Set(DOCUMENTS.map((d) => d.type))];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Documents"
        title="Document Intelligence Center"
        description="Ingestion, extraction, validation and routing of every operational document — with confidence scoring and exception queues."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Processed (30d)" value="94.2" suffix="k" delta={17.3} />
        <StatCard label="Straight-through rate" value={88.4} suffix="%" delta={5.6} />
        <StatCard label="Avg extraction confidence" value={95.1} suffix="%" delta={1.8} />
        <StatCard label="Needs review" value={DOCUMENTS.filter((d) => d.state === "Needs review").length} delta={-9.2} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Processing pipeline</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-5">
            {[
              ["Ingest", "Email, SFTP, portal, scan"],
              ["Classify", "Type + language detection"],
              ["Extract", "Fields, tables, signatures"],
              ["Validate", "SAP / CRM / spec cross-check"],
              ["Route", "Post, approve or escalate"],
            ].map(([k, v], i) => (
              <div key={k} className="rounded-xl border border-border bg-surface/40 p-3">
                <p className="num text-[10px] font-semibold text-primary">0{i + 1}</p>
                <p className="mt-1 text-[13px] font-semibold text-foreground">{k}</p>
                <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{v}</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Accuracy by type</h2>
          <div className="mt-3 space-y-3">
            {["Invoice", "COA", "MSDS", "Contract", "Batch Record"].map((t, i) => (
              <div key={t}>
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>{t}</span>
                  <span className="num">{[98, 96, 94, 90, 93][i]}%</span>
                </div>
                <div className="mt-1">
                  <MeterBar value={[98, 96, 94, 90, 93][i]!} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <FilterTable
        rows={DOCUMENTS}
        searchKeys={["name", "id", "type", "department"]}
        placeholder="Search documents…"
        facets={[
          { label: "types", key: "type", options: types },
          { label: "state", key: "state", options: ["Extracted", "Validated", "Routed", "Needs review"] },
          { label: "departments", key: "department", options: [...DEPARTMENTS] },
        ]}
        columns={[
          {
            key: "name",
            header: "Document",
            render: (d) => (
              <div>
                <p className="font-medium text-foreground">{d.name}</p>
                <p className="num text-[11px] text-muted-foreground">
                  {d.id} · {d.pages} pages
                </p>
              </div>
            ),
          },
          { key: "type", header: "Type", render: (d) => <Pill tone="neutral">{d.type}</Pill> },
          { key: "dept", header: "Department", render: (d) => <span className="text-muted-foreground">{d.department}</span> },
          { key: "conf", header: "Confidence", render: (d) => <span className="num text-success">{d.confidence}%</span> },
          { key: "state", header: "State", render: (d) => <Pill tone={toneFor(d.state)}>{d.state}</Pill> },
          { key: "updated", header: "Updated", render: (d) => <span className="num text-muted-foreground">{d.updated}</span> },
        ]}
      />
    </div>
  );
}
