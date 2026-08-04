import { createFileRoute } from "@tanstack/react-router";
import { Activity, Download, FileSpreadsheet } from "lucide-react";
import { GlassCard, PageHeader, Pill, StatCard } from "@/components/cc/primitives";

export const Route = createFileRoute("/reports")({
  component: ReportsPage,
});

function ReportsPage() {
  const reports = [
    { name: "Executive AI ROI & Cost Savings MIS", dept: "Executive", freq: "Monthly", format: "PDF / XLSX" },
    { name: "Plant Automation Efficiency & Downtime Summary", dept: "Engineering", freq: "Weekly", format: "PDF" },
    { name: "MSDS & Regulatory Compliance Audit Report", dept: "Regulatory", freq: "Daily", format: "PDF" },
    { name: "Supply Chain & Procurement Reconciliation Packet", dept: "Supply Chain", freq: "Bi-Weekly", format: "XLSX" },
    { name: "Quality Control & Batch Variance Report", dept: "Quality", freq: "Daily", format: "PDF" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Insights & Analytics"
        title="Operational & MIS Reports"
        description="Automated report generation across executive, operational, financial, and plant compliance domains."
        actions={<Pill tone="primary">5 Active MIS Packs</Pill>}
      />

      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
        <StatCard label="Reports Generated (30d)" value="142" delta={12.4} />
        <StatCard label="Automated Distribution" value="100%" delta={0} />
        <StatCard label="Avg Generation Time" value="1.2s" delta={-30} />
        <StatCard label="Audit Compliance" value="100%" delta={0} />
      </div>

      <GlassCard className="p-6">
        <div className="space-y-3">
          {reports.map((r, i) => (
            <div key={i} className="flex items-center justify-between gap-3 rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] p-4 transition-all hover:border-[#00B8D9]">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-[#00B8D9]/10 text-[#00B8D9]">
                  <FileSpreadsheet className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1E293B]">{r.name}</p>
                  <p className="text-xs text-[#64748B]">{r.dept} · Frequency: {r.freq}</p>
                </div>
              </div>
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#00B8D9] px-3.5 py-1.5 text-xs font-bold text-[#FFFFFF] shadow-sm hover:bg-[#009BB8]">
                <Download className="size-3.5" /> Export {r.format}
              </button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
