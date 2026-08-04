import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { GlassCard, MeterBar, PageHeader, Pill, StatCard } from "@/components/cc/primitives";
import { COPILOTS } from "@/lib/command-center-data";

export const Route = createFileRoute("/copilots")({
  head: () => ({
    meta: [
      { title: "AI Copilot Center — AI Command Center" },
      {
        name: "description",
        content:
          "Department copilots with chat, actions, connected data, context awareness, documents, workflows and approvals.",
      },
      { property: "og:title", content: "AI Copilot Center — AI Command Center" },
      {
        property: "og:description",
        content: "Twelve department copilots grounded in the enterprise knowledge platform.",
      },
    ],
  }),
  component: CopilotsPage,
});

const TABS = ["Chat", "Actions", "Connected data", "Workflows", "History"] as const;

function CopilotsPage() {
  const [selectedId, setSelectedId] = useState(COPILOTS[0]!.id);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Chat");
  const [draft, setDraft] = useState("");
  const [thread, setThread] = useState<Array<{ role: "user" | "ai"; text: string }>>([
    {
      role: "ai",
      text: "I have context on this department's KPIs, open approvals, live agents and the last 90 days of documents. What would you like to work on?",
    },
  ]);
  const copilot = COPILOTS.find((c) => c.id === selectedId)!;

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setThread((t) => [
      ...t,
      { role: "user", text },
      {
        role: "ai",
        text: `Working on “${text}”. I reviewed ${copilot.connectedData.join(", ")} and the Company Brain, and drafted a response with 7 cited sources. Two items need a human approver before I can execute.`,
      },
    ]);
    setDraft("");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="AI Copilot Center"
        title="Department Copilots"
        description="Context-aware copilots for every function — each grounded in its own data, documents, workflows and approval rules."
        actions={<Pill tone="primary"><Sparkles className="size-3 text-[#00C2D1]" /> {COPILOTS.length} copilots deployed</Pill>}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Copilots live" value={COPILOTS.length} delta={9.1} />
        <StatCard
          label="Conversations (30d)"
          value={(COPILOTS.reduce((s, c) => s + c.conversations, 0) / 1000).toFixed(1)}
          suffix="k"
          delta={26.4}
        />
        <StatCard
          label="Avg adoption"
          value={Math.round(COPILOTS.reduce((s, c) => s + c.adoption, 0) / COPILOTS.length)}
          suffix="%"
          delta={11.7}
        />
        <StatCard label="Grounded answer rate" value={96.2} suffix="%" delta={2.3} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <GlassCard className="p-3">
          <ul className="space-y-1">
            {COPILOTS.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setSelectedId(c.id)}
                  className={`w-full rounded-xl px-3 py-2.5 text-left transition-all ${
                    c.id === selectedId
                      ? "bg-[#00C2D1]/12 text-[#F5F7FA] border-l-2 border-[#00C2D1] shadow-[0_0_12px_rgba(0,194,209,0.12)]"
                      : "text-[#B6C2CF] hover:bg-[#1B2330] hover:text-[#F5F7FA]"
                  }`}
                >
                  <p className="text-[13px] font-bold text-[#F5F7FA]">{c.name}</p>
                  <p className="truncate text-[11px] text-[#7C8899]">{c.department}</p>
                  <div className="mt-2">
                    <MeterBar value={c.adoption} tone={c.adoption > 70 ? "success" : "warning"} />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </GlassCard>

        <div className="space-y-4">
          <GlassCard className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[#F5F7FA]">{copilot.name}</h2>
                <p className="mt-1 text-sm text-[#B6C2CF]">{copilot.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Pill tone="success">{copilot.adoption}% adoption</Pill>
                <Pill tone="neutral">{copilot.conversations.toLocaleString("en-US")} chats</Pill>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5 border-b border-[#232D3A] pb-3">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                    tab === t ? "bg-[#00C2D1] text-[#090C10] shadow-[0_0_12px_rgba(0,194,209,0.25)]" : "text-[#7C8899] hover:text-[#F5F7FA] hover:bg-[#1B2330]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === "Chat" && (
              <div className="mt-4">
                <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
                  {thread.map((m, i) => (
                    <div
                      key={i}
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                        m.role === "user"
                          ? "ml-auto bg-[#00C2D1]/15 text-[#F5F7FA] border border-[#00C2D1]/30 shadow-[0_0_15px_rgba(0,194,209,0.12)]"
                          : "border border-[#232D3A] bg-[#10151C]/80 text-[#B6C2CF]"
                      }`}
                    >
                      {m.text}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {copilot.suggestedTasks.map((s) => (
                    <button
                      key={s}
                      onClick={() => setDraft(s)}
                      className="rounded-full border border-[#232D3A] bg-[#10151C] px-3.5 py-1.5 text-[11px] font-medium text-[#7C8899] transition-all hover:border-[#00C2D1]/40 hover:text-[#00C2D1]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="mt-3.5 flex items-center gap-2.5 rounded-full border border-[#232D3A] bg-[#10151C] p-2 focus-within:border-[#00C2D1]/40">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder={`Ask ${copilot.name}…`}
                    className="h-9 flex-1 bg-transparent px-3 text-[13px] text-[#F5F7FA] outline-none placeholder:text-[#7C8899]"
                  />
                  <button
                    onClick={send}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#00C2D1] px-4 py-2 text-xs font-bold text-[#090C10] shadow-[0_0_12px_rgba(0,194,209,0.25)] hover:bg-[#00E5F7]"
                  >
                    <Send className="size-3.5" /> Send
                  </button>
                </div>
              </div>
            )}

            {tab === "Actions" && (
              <ul className="mt-4 grid gap-2.5 md:grid-cols-2">
                {[
                  "Generate department MIS pack",
                  "Draft response to open exceptions",
                  "Create approval packet",
                  "Trigger reconciliation workflow",
                  "Summarise last 30 days of documents",
                  "Escalate ageing items to head of function",
                ].map((a) => (
                  <li
                    key={a}
                    className="flex items-center justify-between rounded-xl border border-[#232D3A] bg-[#10151C]/60 px-3.5 py-3 text-[13px]"
                  >
                    <span className="font-semibold text-[#F5F7FA]">{a}</span>
                    <Pill tone="primary">Run</Pill>
                  </li>
                ))}
              </ul>
            )}

            {tab === "Connected data" && (
              <div className="mt-4 grid gap-2.5 md:grid-cols-2">
                {[...copilot.connectedData, "Approvals ledger", "Document vault", "KPI cube"].map((d) => (
                  <div key={d} className="rounded-xl border border-[#232D3A] bg-[#10151C]/60 px-3.5 py-3 text-[13px]">
                    <p className="font-bold text-[#F5F7FA]">{d}</p>
                    <p className="text-[11px] text-[#7C8899]">Read scope · row-level security applied</p>
                  </div>
                ))}
              </div>
            )}

            {tab === "Workflows" && (
              <ul className="mt-4 space-y-2">
                {["Invoice exception handling", "Approval routing", "Document publication", "Escalation ladder"].map(
                  (w, i) => (
                    <li key={w} className="flex items-center justify-between rounded-xl border border-[#232D3A] bg-[#10151C]/60 px-3.5 py-3 text-[13px]">
                      <span className="font-semibold text-[#F5F7FA]">{w}</span>
                      <Pill tone={i === 2 ? "warning" : "success"}>{i === 2 ? "paused" : "active"}</Pill>
                    </li>
                  ),
                )}
              </ul>
            )}

            {tab === "History" && (
              <ul className="mt-4 space-y-2 text-[13px]">
                {Array.from({ length: 6 }, (_, i) => (
                  <li key={i} className="flex items-center justify-between rounded-xl border border-[#232D3A] bg-[#10151C]/60 px-3.5 py-3">
                    <span className="font-semibold text-[#F5F7FA]">Session #{4820 + i} · 12 turns · 9 citations</span>
                    <span className="num text-xs text-[#7C8899]">{i + 1}d ago</span>
                  </li>
                ))}
              </ul>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

