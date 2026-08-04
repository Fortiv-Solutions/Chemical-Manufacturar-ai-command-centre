import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GlassCard, PageHeader, Pill, StatCard, toneFor } from "@/components/cc/primitives";
import {
  AGENTS,
  APPROVALS,
  AUTOMATIONS,
  DEPT_PROFILES,
  DOCUMENTS,
  MONTHS,
  TASKS,
} from "@/lib/command-center-data";

export const Route = createFileRoute("/departments/$slug")({
  loader: ({ params }) => {
    const dept = DEPT_PROFILES.find((d) => d.slug === params.slug);
    if (!dept) throw notFound();
    return { dept };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.dept.name ?? "Department";
    return {
      meta: [
        { title: `${name} AI Workspace — AI Command Center` },
        {
          name: "description",
          content: `KPIs, AI agents, automations, approvals, tasks and documents for the ${name} function.`,
        },
        { property: "og:title", content: `${name} AI Workspace` },
        {
          property: "og:description",
          content: `AI operating workspace for ${name} in chemical manufacturing.`,
        },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: DepartmentDetail,
});

const axis = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
} as const;
const tip = {
  contentStyle: {
    background: "var(--color-popover)",
    border: "1px solid var(--color-border-strong)",
    borderRadius: 12,
    fontSize: 12,
  },
} as const;

function DepartmentDetail() {
  const { dept } = Route.useLoaderData();
  const agents = AGENTS.filter((a) => a.department === dept.name);
  const autos = AUTOMATIONS.filter((a) => a.department === dept.name);
  const approvals = APPROVALS.filter((a) => a.department === dept.name);
  const tasks = TASKS.filter((t) => t.department === dept.name);
  const docs = DOCUMENTS.filter((d) => d.department === dept.name);

  const trend = MONTHS.slice(0, 9).map((m, i) => ({
    month: m,
    hours: Math.round(dept.hoursSaved / 20 + i * (dept.hoursSaved / 160)),
    adoption: Math.min(99, Math.round(dept.adoption - 24 + i * 3)),
  }));

  return (
    <div className="space-y-6">
      <Link
        to="/operations"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00B8D9] hover:underline"
      >
        <ArrowLeft className="size-3.5" /> Back to Business Operations Workspace
      </Link>

      <PageHeader
        eyebrow="Department Workspace"
        title={dept.name}
        description={`Automation maturity level ${dept.maturity} of 5 · ${dept.automations} mapped automation opportunities · ${agents.length} AI agents deployed.`}
        actions={<Pill tone="success">{dept.adoption}% adoption</Pill>}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <StatCard label="Hours saved (YTD)" value={(dept.hoursSaved / 1000).toFixed(1)} suffix="k" delta={14.8} />
        <StatCard label="Annual savings" value={`$${(dept.savings / 1_000_000).toFixed(2)}`} suffix="M" delta={12.1} />
        <StatCard label="AI agents" value={agents.length} />
        <StatCard label="Open approvals" value={approvals.filter((a) => a.status === "Pending").length} />
        <StatCard label="Documents processed" value={docs.length * 184} delta={8.9} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Hours saved</h2>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trend}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" {...axis} />
                <YAxis {...axis} width={38} />
                <Tooltip {...tip} />
                <Bar dataKey="hours" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Adoption curve</h2>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" {...axis} />
                <YAxis {...axis} width={30} />
                <Tooltip {...tip} />
                <Line type="monotone" dataKey="adoption" stroke="var(--color-chart-2)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">AI agents</h2>
          <ul className="mt-3 space-y-2">
            {agents.length === 0 && (
              <li className="rounded-xl border border-dashed border-border p-4 text-xs text-muted-foreground">
                Shared-service agents cover this function. Dedicated agents are scheduled in Phase 2.
              </li>
            )}
            {agents.map((a) => (
              <li key={a.id}>
                <Link
                  to="/agents/$agentId"
                  params={{ agentId: a.id }}
                  className="flex items-center justify-between rounded-xl border border-border bg-surface/40 px-3 py-2.5 text-[13px] transition-colors hover:border-primary/40"
                >
                  <span>
                    <span className="font-semibold text-foreground">{a.name}</span>
                    <span className="block text-[11px] text-muted-foreground">{a.purpose}</span>
                  </span>
                  <Pill tone={toneFor(a.status)}>{a.status}</Pill>
                </Link>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Automation backlog</h2>
          <ul className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
            {autos.map((a) => (
              <li key={a.id} className="rounded-xl border border-border bg-surface/40 px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-semibold text-foreground">{a.title}</span>
                  <Pill tone={toneFor(a.status)}>{a.status}</Pill>
                </div>
                <p className="num mt-1 text-[11px] text-muted-foreground">
                  {a.code} · {a.priority} · ROI {a.roi}% · {a.hoursSaved.toLocaleString("en-US")}h · {a.phase}
                </p>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <GlassCard className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Approvals</h2>
          <ul className="mt-3 space-y-2">
            {approvals.slice(0, 5).map((a) => (
              <li key={a.id} className="rounded-xl border border-border bg-surface/40 px-3 py-2.5 text-[13px]">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-foreground">{a.subject}</span>
                  <Pill tone={toneFor(a.status)}>{a.status}</Pill>
                </div>
                <p className="num mt-1 text-[11px] text-muted-foreground">
                  {a.id} · {a.amount} · AI: {a.aiRecommendation} ({a.confidence}%)
                </p>
              </li>
            ))}
            {approvals.length === 0 && (
              <li className="text-xs text-muted-foreground">No approvals in queue.</li>
            )}
          </ul>
        </GlassCard>

        <GlassCard className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Tasks</h2>
          <ul className="mt-3 space-y-2">
            {tasks.slice(0, 5).map((t) => (
              <li key={t.id} className="rounded-xl border border-border bg-surface/40 px-3 py-2.5 text-[13px]">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-foreground">{t.title}</span>
                  <Pill tone={toneFor(t.status)}>{t.status}</Pill>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {t.assignee} · due in {t.due} · via {t.agent}
                </p>
              </li>
            ))}
            {tasks.length === 0 && <li className="text-xs text-muted-foreground">Queue clear.</li>}
          </ul>
        </GlassCard>

        <GlassCard className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Documents</h2>
          <ul className="mt-3 space-y-2">
            {docs.slice(0, 5).map((d) => (
              <li key={d.id} className="rounded-xl border border-border bg-surface/40 px-3 py-2.5 text-[13px]">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-foreground">{d.name}</span>
                  <Pill tone={toneFor(d.state)}>{d.state}</Pill>
                </div>
                <p className="num mt-1 text-[11px] text-muted-foreground">
                  {d.type} · {d.pages} pages · {d.confidence}% confidence
                </p>
              </li>
            ))}
            {docs.length === 0 && <li className="text-xs text-muted-foreground">No documents indexed yet.</li>}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
