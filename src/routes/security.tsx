import { createFileRoute } from "@tanstack/react-router";
import { GlassCard, MeterBar, PageHeader, Pill, StatCard, toneFor } from "@/components/cc/primitives";
import { FilterTable } from "@/components/cc/FilterTable";
import { GUARDRAILS, MODEL_REGISTRY, SECURITY_EVENTS, USERS } from "@/lib/command-center-data";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security & Governance — AI Command Center" },
      {
        name: "description",
        content:
          "AI governance: role-based access, guardrails, model registry, audit logging, data residency and compliance posture.",
      },
      { property: "og:title", content: "Security & Governance — AI Command Center" },
      {
        property: "og:description",
        content: "Enterprise controls that make autonomous AI auditable and safe.",
      },
    ],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Security & Governance"
        title="Trust, Control & Auditability"
        description="Access control, guardrails, model governance and immutable audit trails across every agent action."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Guardrails enforced" value={GUARDRAILS.length} />
        <StatCard label="Policy violations blocked" value={412} delta={-22.4} />
        <StatCard label="Audit events (30d)" value="8.4" suffix="M" delta={12.1} />
        <StatCard label="Compliance posture" value={97} suffix="%" delta={2.6} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Guardrails</h2>
          <ul className="mt-3 space-y-2">
            {GUARDRAILS.map((g) => (
              <li key={g.name} className="rounded-xl border border-border bg-surface/40 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-semibold text-foreground">{g.name}</p>
                  <Pill tone={toneFor(g.state)}>{g.state}</Pill>
                </div>
                <div className="mt-2">
                  <MeterBar value={g.coverage} />
                </div>
                <p className="num mt-1 text-[11px] text-muted-foreground">{g.coverage}% coverage</p>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Compliance frameworks</h2>
          <div className="mt-3 space-y-3">
            {[
              ["ISO 27001", 98],
              ["ISO 9001 / 14001", 96],
              ["GDPR / DPDP", 95],
              ["REACH & GHS reporting", 93],
              ["SOC 2 Type II", 91],
            ].map(([label, v]) => (
              <div key={label as string}>
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>{label}</span>
                  <span className="num">{v}%</span>
                </div>
                <div className="mt-1">
                  <MeterBar value={v as number} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Model registry</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-max text-[13px]">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Model</th>
                <th className="py-2 pr-4 font-medium">Provider</th>
                <th className="py-2 pr-4 font-medium">Primary use</th>
                <th className="py-2 pr-4 font-medium">Requests</th>
                <th className="py-2 pr-4 font-medium">Cost</th>
                <th className="py-2 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {MODEL_REGISTRY.map((m) => (
                <tr key={m.model} className="border-b border-border/60">
                  <td className="py-2.5 pr-4 font-semibold text-foreground">{m.model}</td>
                  <td className="py-2.5 pr-4 text-muted-foreground">{m.provider}</td>
                  <td className="py-2.5 pr-4 text-muted-foreground">{m.use}</td>
                  <td className="num py-2.5 pr-4">{m.requests}</td>
                  <td className="num py-2.5 pr-4">{m.cost}</td>
                  <td className="py-2.5">
                    <Pill tone={m.risk === "Low" ? "success" : "warning"}>{m.risk}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Audit log</h2>
          <ul className="mt-3 space-y-2 font-mono text-[11px]">
            {SECURITY_EVENTS.map((e, i) => (
              <li key={i} className="rounded-lg border border-border bg-surface/40 px-3 py-2">
                <div className="flex items-center gap-2">
                  <Pill tone={toneFor(String(e.severity ?? "info"))}>{String(e.severity ?? "info")}</Pill>
                  <span className="text-muted-foreground">{String(e.actor ?? "system")}</span>
                  <span className="ml-auto text-muted-foreground">{String(e.time ?? "")}</span>
                </div>
                <p className="mt-1.5 text-foreground/90">{e.event}</p>
              </li>
            ))}
          </ul>
        </GlassCard>

        <div className="space-y-4">
          <FilterTable
            rows={USERS}
            pageSize={8}
            searchKeys={["name", "role", "department"]}
            placeholder="Search users & roles…"
            columns={[
              { key: "name", header: "User", render: (u) => <span className="font-semibold text-foreground">{u.name}</span> },
              { key: "role", header: "Role", render: (u) => <Pill tone="neutral">{u.role}</Pill> },
              { key: "dept", header: "Department", render: (u) => <span className="text-muted-foreground">{u.department}</span> },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
