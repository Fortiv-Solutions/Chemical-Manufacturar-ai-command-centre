import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BrainCircuit, FileText, Layers, Library, Search, ShieldCheck } from "lucide-react";
import { GlassCard, PageHeader, Pill, StatCard } from "@/components/cc/primitives";
import { FilterTable } from "@/components/cc/FilterTable";
import { DOCUMENTS, POLICIES_AND_GRAPH } from "@/lib/command-center-data";

export const Route = createFileRoute("/knowledge-documents")({
  component: KnowledgeDocumentsWorkspacePage,
});

const TABS = [
  "Enterprise Search",
  "Company Brain",
  "Documents",
  "Knowledge Base",
  "Document Intelligence",
  "Knowledge Graph",
  "Policies & SOPs",
  "Collections",
] as const;

function getTabMetrics(tab: (typeof TABS)[number]) {
  switch (tab) {
    case "Company Brain":
      return [
        { label: "Vector Chunks Indexed", value: "1.42M", delta: 14.8 },
        { label: "RAG Precision Recall", value: "99.6%", delta: 1.2 },
        { label: "Vector Latency", value: "14ms", delta: -18.0 },
        { label: "Embedding Model", value: "ChemBERTa", delta: 0 },
      ];
    case "Knowledge Base":
      return [
        { label: "Knowledge Base Articles", value: "840", delta: 6.2 },
        { label: "User Article Views 30D", value: "28,400", delta: 15.4 },
        { label: "Search Relevance Score", value: "98.9%", delta: 2.1 },
        { label: "Unanswered Queries", value: "0.2%", delta: -45.0 },
      ];
    case "Document Intelligence":
      return [
        { label: "OCR Document Extraction", value: "1,240", delta: 22.0 },
        { label: "Field Extraction Precision", value: "99.4%", delta: 0.8 },
        { label: "Automated Form Processing", value: "94.2%", delta: 12.0 },
        { label: "Manual Review Queue", value: "12", delta: -30.0 },
      ];
    case "Knowledge Graph":
      return [
        { label: "Entity Relationships", value: "48,200", delta: 18.5 },
        { label: "Connected Chemical Nodes", value: "3,410", delta: 9.4 },
        { label: "Graph Query Latency", value: "28ms", delta: -12.0 },
        { label: "Ontology Completeness", value: "99.1%", delta: 1.5 },
      ];
    case "Policies & SOPs":
      return [
        { label: "Active Regulatory SOPs", value: POLICIES_AND_GRAPH.length, delta: 5.0 },
        { label: "Compliance Audited", value: "100%", delta: 0 },
        { label: "Pending Revision Sign-Offs", value: "2", delta: -50.0 },
        { label: "ISO 9001 / OSHA Clearance", value: "Verified", delta: 0 },
      ];
    case "Collections":
      return [
        { label: "Curated Vault Collections", value: "18", delta: 12.0 },
        { label: "Shared Team Vaults", value: "39", delta: 0 },
        { label: "Vault Access Requests", value: "4", delta: -20.0 },
        { label: "Encrypted Storage", value: "256-Bit", delta: 0 },
      ];
    case "Enterprise Search":
    case "Documents":
    default:
      return [
        { label: "Total Indexed Documents", value: DOCUMENTS.length + POLICIES_AND_GRAPH.length, delta: 4.8 },
        { label: "MSDS & Regulatory Sheets", value: "340", delta: 2.1 },
        { label: "AI Retrieval Accuracy", value: "99.6%", delta: 1.2 },
        { label: "Search Query Latency", value: "14ms", delta: -18.0 },
      ];
  }
}

function KnowledgeDocumentsWorkspacePage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Enterprise Search");
  const currentMetrics = getTabMetrics(activeTab);

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <PageHeader
        eyebrow="Knowledge & Documents Workspace"
        title="Central Enterprise Knowledge Platform"
        description="Unified vector search and document intelligence across MSDS, TDS, Technical SOPs, Batch Records, Contracts, Invoices, Meeting Notes, and Company AI Brain."
        actions={<Pill tone="primary"><Library className="size-3.5 text-[#00B8D9]" /> {activeTab} Active</Pill>}
      />

      {/* Dynamic Contextual KPI Cards */}
      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
        {currentMetrics.map((m) => (
          <StatCard key={m.label} label={m.label} value={m.value} delta={m.delta} />
        ))}
      </div>

      {/* Workspace Contextual Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#D9E2EC] pb-3">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
              activeTab === tab
                ? "bg-[#00B8D9] text-[#FFFFFF] shadow-sm"
                : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {(activeTab === "Enterprise Search" || activeTab === "Documents" || activeTab === "Knowledge Base") && (
        <GlassCard className="p-6">
          <FilterTable
            rows={DOCUMENTS as any[]}
            columns={[
              { key: "name", header: "Document Title", render: (r) => <span className="font-bold text-[#1E293B]">{r.name}</span> },
              { key: "type", header: "Category / Type", render: (r) => <Pill tone="info">{r.type}</Pill> },
              { key: "department", header: "Department", render: (r) => <span className="text-[#64748B] font-semibold">{r.department}</span> },
              { key: "date", header: "Last Updated", render: (r) => <span className="text-[#64748B] num">{r.date}</span> },
            ]}
            searchKeys={["name", "type", "department"]}
            placeholder="Search MSDS, SOPs, contracts, batch records, invoices..."
          />
        </GlassCard>
      )}

      {activeTab === "Company Brain" && (
        <GlassCard className="p-6">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-2">
              <BrainCircuit className="size-5 text-[#00B8D9]" /> Chemical Enterprise AI Vector Brain
            </h3>
            <p className="text-xs text-[#64748B]">Real-time RAG index containing 1.4M chunks from SAP, LIMS, SharePoint, and plant SOPs.</p>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] p-4">
                <p className="text-xs font-bold text-[#0F4C81]">Vector Index Status</p>
                <p className="text-lg font-extrabold text-[#1E293B] mt-1">1,428,910 Chunks</p>
                <Pill tone="success" className="mt-2">Real-Time Synced</Pill>
              </div>
              <div className="rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] p-4">
                <p className="text-xs font-bold text-[#0F4C81]">Embedding Model</p>
                <p className="text-lg font-extrabold text-[#1E293B] mt-1">ChemBERTa + text-3-large</p>
                <Pill tone="primary" className="mt-2">Hybrid Search</Pill>
              </div>
              <div className="rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] p-4">
                <p className="text-xs font-bold text-[#0F4C81]">Avg Citation Recall</p>
                <p className="text-lg font-extrabold text-[#1E293B] mt-1">99.6% Precision</p>
                <Pill tone="success" className="mt-2">Zero Hallucinations</Pill>
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      {(activeTab === "Policies & SOPs" || activeTab === "Document Intelligence") && (
        <GlassCard className="p-6">
          <FilterTable
            rows={POLICIES_AND_GRAPH as any[]}
            columns={[
              { key: "code", header: "Code", render: (r) => <span className="font-bold text-[#0F4C81]">{r.code}</span> },
              { key: "title", header: "Policy / SOP Title", render: (r) => <span className="font-bold text-[#1E293B]">{r.title}</span> },
              { key: "category", header: "Category", render: (r) => <Pill tone="warning">{r.category}</Pill> },
              { key: "department", header: "Department", render: (r) => <span className="text-[#64748B]">{r.department}</span> },
              { key: "complianceStandard", header: "Standard", render: (r) => <Pill tone="success">{r.complianceStandard}</Pill> },
            ]}
            searchKeys={["code", "title", "department", "complianceStandard"]}
            placeholder="Search policies, SOPs, and compliance standards…"
          />
        </GlassCard>
      )}

      {(activeTab === "Knowledge Graph" || activeTab === "Collections") && (
        <GlassCard className="p-6">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-2">
              <Layers className="size-5 text-[#00B8D9]" /> Chemical Material & Process Knowledge Graph
            </h3>
            <p className="text-xs text-[#64748B]">Connected graph relationships between Raw Solvents, Vendors, Plant Reactors, MSDS Sheets, and Regulatory Approvals.</p>
            <div className="grid gap-3.5 md:grid-cols-3">
              {[
                { title: "Plant Reactor Operations", items: ["Reactor R-402 Manual", "Overheat SOP-ENG-089", "Maintenance Log 2026"] },
                { title: "Hazardous Solvent Logistics", items: ["REACH EHS-042", "Ethylene Glycol MSDS-772", "Global Logistics Contract"] },
                { title: "Quality Assurance Standard", items: ["ISO 9001:2015 SOP", "LIMS Assay Log", "Batch Yield Diagnostic"] },
              ].map((c, i) => (
                <div key={i} className="rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] p-4">
                  <p className="text-sm font-bold text-[#1E293B]">{c.title}</p>
                  <ul className="mt-2 space-y-1.5 text-xs text-[#64748B]">
                    {c.items.map((it) => (
                      <li key={it} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00B8D9]" /> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
