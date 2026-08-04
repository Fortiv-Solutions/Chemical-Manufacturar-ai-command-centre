import { createFileRoute } from "@tanstack/react-router";
import { KeyRound, ShieldAlert, Cpu } from "lucide-react";
import { GlassCard, PageHeader, Pill, StatCard } from "@/components/cc/primitives";

export const Route = createFileRoute("/governance")({
  component: GovernancePage,
});

function GovernancePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform & Governance"
        title="AI Governance, Prompt & Model Registry"
        description="Model safety guardrails, prompt versioning, inference cost tracking, and SOC2 compliance monitoring."
        actions={<Pill tone="success">Zero Policy Violations</Pill>}
      />

      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
        <StatCard label="Registered Models" value="12" delta={0} />
        <StatCard label="Active Prompt Templates" value="184" delta={14.2} />
        <StatCard label="Monthly Inference Cost" value="$14.2k" delta={-8.4} />
        <StatCard label="Guardrail Intercepts" value="0.02%" delta={-50} />
      </div>

      <GlassCard className="p-6">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#1E293B]">Model Registry & Inference Health</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { name: "Claude 3.5 Sonnet", provider: "Anthropic", task: "Reasoning & SOP Synthesis", latency: "240ms", status: "Active" },
              { name: "GPT-4o", provider: "OpenAI", task: "Complex Code & Workflow Logic", latency: "310ms", status: "Active" },
              { name: "Gemini 1.5 Pro", provider: "Google", task: "Large Document Intelligence", latency: "280ms", status: "Active" },
              { name: "Llama 3.1 70B", provider: "Meta / On-Prem", task: "Plant Safety Guardrails", latency: "95ms", status: "Active" },
            ].map((m, i) => (
              <div key={i} className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-[#1E293B]">{m.name}</p>
                  <Pill tone="success">{m.status}</Pill>
                </div>
                <p className="mt-1 text-xs text-[#64748B]">{m.provider} · {m.task}</p>
                <p className="mt-2 text-xs font-semibold text-[#0F4C81]">Latency: {m.latency}</p>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
