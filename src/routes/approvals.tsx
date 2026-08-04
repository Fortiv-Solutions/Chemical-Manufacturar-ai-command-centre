import { createFileRoute } from "@tanstack/react-router";
import { GlassCard, PageHeader, Pill, StatCard, toneFor } from "@/components/cc/primitives";
import { FilterTable } from "@/components/cc/FilterTable";
import { APPROVALS, DEPARTMENTS } from "@/lib/command-center-data";

export const Route = createFileRoute("/approvals")({
  head: () => ({
    meta: [
      { title: "Approval Center — AI Command Center" },
      {
        name: "description",
        content:
          "Approval queue with AI recommendations, confidence scores, escalations, digital signature and full audit trail.",
      },
      { property: "og:title", content: "Approval Center — AI Command Center" },
      {
        property: "og:description",
        content: "Human-in-the-loop approvals for financial, quality and compliance decisions.",
      },
    ],
  }),
  component: ApprovalsPage,
});

function ApprovalsPage() {
  const count = (s: string) => APPROVALS.filter((a) => a.status === s).length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Approval Center"
        title="Human-in-the-Loop Approvals"
        description="Every AI-prepared decision packet with recommendation, confidence, supporting evidence, signature and audit trail."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <StatCard label="Pending" value={count("Pending")} delta={-6.2} />
        <StatCard label="Approved (30d)" value={count("Approved") * 214} delta={9.4} />
        <StatCard label="Escalated" value={count("Escalated")} delta={-14.8} />
        <StatCard label="Avg cycle time" value="4.2" suffix="h" delta={-38.6} />
        <StatCard label="AI recommendation accepted" value={91.4} suffix="%" delta={3.2} />
      </div>

      <FilterTable
        rows={APPROVALS}
        searchKeys={["subject", "id", "requester", "department"]}
        placeholder="Search approvals…"
        facets={[
          { label: "status", key: "status", options: ["Pending", "Approved", "Rejected", "Escalated"] },
          { label: "types", key: "type", options: ["Financial", "Quality", "Commercial", "Compliance", "HR"] },
          { label: "departments", key: "department", options: [...DEPARTMENTS] },
        ]}
        columns={[
          {
            key: "subject",
            header: "Approval",
            render: (a) => (
              <div>
                <p className="font-semibold text-foreground">{a.subject}</p>
                <p className="num text-[11px] text-muted-foreground">
                  {a.id} · {a.department}
                </p>
              </div>
            ),
          },
          { key: "type", header: "Type", render: (a) => <Pill tone="neutral">{a.type}</Pill> },
          { key: "amount", header: "Value", render: (a) => <span className="num">{a.amount}</span> },
          { key: "req", header: "Requester", render: (a) => <span className="text-muted-foreground">{a.requester}</span> },
          {
            key: "ai",
            header: "AI recommendation",
            render: (a) => (
              <div className="flex items-center gap-2">
                <Pill tone={toneFor(a.aiRecommendation)}>{a.aiRecommendation}</Pill>
                <span className="num text-[11px] text-muted-foreground">{a.confidence}%</span>
              </div>
            ),
          },
          { key: "status", header: "Status", render: (a) => <Pill tone={toneFor(a.status)}>{a.status}</Pill> },
          { key: "age", header: "Age", render: (a) => <span className="num text-muted-foreground">{a.age}</span> },
          {
            key: "actions",
            header: "",
            render: () => (
              <div className="flex gap-1.5">
                <button className="rounded-md bg-success/15 px-2.5 py-1 text-[11px] font-semibold text-success">
                  Approve
                </button>
                <button className="rounded-md border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                  Review
                </button>
              </div>
            ),
          },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <GlassCard className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Delegation matrix</h2>
          <ul className="mt-3 space-y-2 text-[13px]">
            {[
              ["Up to $10k", "Process owner"],
              ["$10k – $50k", "Function head"],
              ["$50k – $250k", "CFO"],
              ["Above $250k", "Board committee"],
            ].map(([k, v]) => (
              <li key={k} className="flex justify-between rounded-lg border border-border bg-surface/40 px-3 py-2">
                <span className="text-muted-foreground">{k}</span>
                <span className="text-foreground">{v}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
        <GlassCard className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Digital signature</h2>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Every approval is signed with the approver&apos;s enterprise identity, timestamped, and hashed into
            an append-only ledger. Signature packets are exportable for statutory and ISO audits.
          </p>
          <div className="mt-4 space-y-2">
            {["21 CFR Part 11 compatible", "eIDAS advanced signature", "Immutable hash chain"].map((s) => (
              <Pill key={s} tone="success" className="mr-1.5">
                {s}
              </Pill>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Audit trail</h2>
          <ul className="mt-3 space-y-2 font-mono text-[11px]">
            {APPROVALS.slice(0, 6).map((a, i) => (
              <li key={a.id} className="rounded-lg border border-border bg-surface/40 px-3 py-2 text-muted-foreground">
                {a.id} · {i % 2 === 0 ? "signed" : "escalated"} · {a.requester} · {a.age} ago
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
