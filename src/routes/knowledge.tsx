import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, FileText, Search, ShieldCheck } from "lucide-react";
import { GlassCard, PageHeader, Pill, StatCard } from "@/components/cc/primitives";
import { FilterTable } from "@/components/cc/FilterTable";
import { DOCUMENTS } from "@/lib/command-center-data";

export const Route = createFileRoute("/knowledge")({
  component: KnowledgePage,
});

function KnowledgePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Knowledge Hub"
        title="Enterprise Knowledge Base & SOPs"
        description="Unified search and document intelligence across MSDS, TDS, contracts, batch records, and chemical manufacturing standard operating procedures."
        actions={<Pill tone="primary">{DOCUMENTS.length} Documents Indexed</Pill>}
      />

      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
        <StatCard label="Total SOPs & Docs" value={DOCUMENTS.length} delta={5.2} />
        <StatCard label="MSDS Compliance Rate" value="100%" delta={0} />
        <StatCard label="Search Query Latency" value="12ms" delta={-15} />
        <StatCard label="Knowledge Accuracy" value="99.6%" delta={1.2} />
      </div>

      <GlassCard className="p-6">
        <FilterTable
          rows={DOCUMENTS as any[]}
          columns={[
            { key: "name", header: "Document Name", render: (r) => <span className="font-bold text-[#1E293B]">{r.name}</span> },
            { key: "type", header: "Category", render: (r) => <Pill tone="info">{r.type}</Pill> },
            { key: "department", header: "Department", render: (r) => <span className="text-[#64748B] font-semibold">{r.department}</span> },
            { key: "updated", header: "Last Updated", render: (r) => <span className="text-[#64748B] num">{r.updated || r.effectiveDate || r.lastUpdated || "2 hours ago"}</span> },
          ]}
          searchKeys={["name", "type", "department"]}
          placeholder="Search SOPs, contracts, MSDS, batch records…"
        />
      </GlassCard>
    </div>
  );
}
