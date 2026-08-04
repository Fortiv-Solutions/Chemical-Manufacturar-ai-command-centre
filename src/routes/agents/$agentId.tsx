import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowLeft } from "lucide-react";
import { GlassCard, MeterBar, PageHeader, Pill, StatCard, toneFor } from "@/components/cc/primitives";
import { AGENTS, MONTHS, slugify } from "@/lib/command-center-data";

export const Route = createFileRoute("/agents/$agentId")({
  loader: ({ params }) => {
    const agent = AGENTS.find((a) => a.id === params.agentId);
    if (!agent) throw notFound();
    return { agent };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.agent.name ?? "AI Agent";
    return {
      meta: [
        { title: `${name} — AI Agent Detail` },
        {
          name: "description",
          content: loaderData?.agent.purpose ?? "AI agent execution history, health and permissions.",
        },
        { property: "og:title", content: `${name} — AI Command Center` },
        {
          property: "og:description",
          content: loaderData?.agent.purpose ?? "AI agent detail in the enterprise command center.",
        },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: AgentDetail,
});

function AgentDetail() {
  const { agent } = Route.useLoaderData();
  const history = MONTHS.slice(0, 9).map((m, i) => ({
    month: m,
    runs: Math.round(agent.runs30d / 12 + i * (agent.runs30d / 90)),
    failures: Math.max(0, Math.round((100 - agent.successRate) * (3 - i * 0.2))),
  }));

  return (
    <div className="space-y-6">
      <Link
        to="/agents"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-3.5" /> All agents
      </Link>

      <PageHeader
        eyebrow={agent.department}
        title={agent.name}
        description={agent.purpose}
        actions={
          <>
            <Pill tone={toneFor(agent.status)}>{agent.status}</Pill>
            <Pill tone={toneFor(agent.health)}>{agent.health}</Pill>
            <Pill tone="neutral">{agent.version}</Pill>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <StatCard label="Success rate" value={agent.successRate} suffix="%" delta={1.2} />
        <StatCard label="Avg runtime" value={agent.avgRuntime} suffix="s" delta={-4.6} />
        <StatCard label="Executions (30d)" value={agent.runs30d.toLocaleString("en-US")} delta={9.4} />
        <StatCard label="Hours saved" value={agent.hoursSaved.toLocaleString("en-US")} delta={18.1} />
        <StatCard label="Owner" value={agent.owner.split(" ")[1] ?? agent.owner} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Execution history</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="agentRuns" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} width={38} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border-strong)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="runs" stroke="var(--color-chart-1)" fill="url(#agentRuns)" strokeWidth={2} />
                <Area type="monotone" dataKey="failures" stroke="var(--color-chart-5)" fill="var(--color-chart-5)" fillOpacity={0.12} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Connections</h2>
            <ul className="mt-3 space-y-2">
              {agent.connections.map((c: string) => (
                <li key={c} className="flex items-center justify-between rounded-lg border border-border bg-surface/40 px-3 py-2 text-xs">
                  <span className="text-foreground">{c}</span>
                  <Pill tone="success">connected</Pill>
                </li>
              ))}
            </ul>
            <h2 className="mt-5 text-sm font-semibold uppercase tracking-[0.14em]">Permissions</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {agent.permissions.map((p: string) => (
                <Pill key={p} tone="primary">
                  {p}
                </Pill>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Health signals</h2>
            <div className="mt-4 space-y-3">
              {[
                ["Guardrail compliance", 100],
                ["Citation coverage", 94],
                ["Latency budget", 78],
                ["Cost budget", 62],
              ].map(([label, v]) => (
                <div key={label as string}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="num text-foreground">{v}%</span>
                  </div>
                  <MeterBar value={v as number} tone={(v as number) > 80 ? "success" : "warning"} />
                </div>
              ))}
            </div>
            <Link
              to="/departments/$slug"
              params={{ slug: slugify(agent.department) }}
              className="mt-5 inline-block text-xs font-semibold text-primary hover:underline"
            >
              Open {agent.department} workspace →
            </Link>
          </GlassCard>
        </div>
      </div>

      <GlassCard className="p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Recent execution log</h2>
        <ul className="mt-3 space-y-2 font-mono text-[11px]">
          {Array.from({ length: 8 }, (_, i) => (
            <li key={i} className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface/40 px-3 py-2">
              <span className="text-muted-foreground">2026-08-03 0{i + 1}:1{i}:22Z</span>
              <Pill tone={i === 3 ? "warning" : "success"}>{i === 3 ? "retry" : "ok"}</Pill>
              <span className="text-foreground">task#{9100 + i} completed in {(agent.avgRuntime + i).toFixed(1)}s</span>
              <span className="ml-auto text-muted-foreground">{agent.version}</span>
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  );
}
