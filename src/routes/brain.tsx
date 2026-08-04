import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Search, Sparkles } from "lucide-react";
import { GlassCard, MeterBar, PageHeader, Pill, StatCard, toneFor } from "@/components/cc/primitives";
import { KNOWLEDGE_SOURCES } from "@/lib/command-center-data";

export const Route = createFileRoute("/brain")({
  head: () => ({
    meta: [
      { title: "Company Brain — Enterprise Knowledge Graph" },
      {
        name: "description",
        content:
          "Retrieval-augmented company knowledge across SOPs, batch records, MSDS, contracts, email and SAP master data with cited answers.",
      },
      { property: "og:title", content: "Company Brain — Enterprise Knowledge Graph" },
      {
        property: "og:description",
        content: "Ask anything about the company and get cited answers from every connected system.",
      },
    ],
  }),
  component: BrainPage,
});

const SAMPLE_QUERIES = [
  "What is the approved re-work procedure for off-spec resin batches?",
  "Which customers had more than two quality complaints this quarter?",
  "Summarise the price escalation clauses in our top 10 supply contracts.",
  "What were the root causes of the last five reactor downtime events?",
];

const ANSWER = {
  text: "Off-spec resin batches may be re-worked once, under QA-approved deviation, provided viscosity is within 8% of specification and colour index is below 4.0. Re-worked material must be blended at a maximum 20% ratio into a conforming batch, re-tested for full specification, and traceability recorded in the batch genealogy. Two consecutive re-work failures require CAPA initiation and customer notification where material was already dispatched.",
  citations: [
    { doc: "SOP-QC-0142 Rework of Non-Conforming Resin", page: "p. 4–6", score: 0.94 },
    { doc: "QMS Deviation Handling Manual Rev 7", page: "p. 22", score: 0.89 },
    { doc: "Batch Record BR-2026-01184", page: "genealogy", score: 0.81 },
    { doc: "Customer Notification Policy CN-03", page: "p. 2", score: 0.77 },
  ],
};

function BrainPage() {
  const [query, setQuery] = useState(SAMPLE_QUERIES[0]!);
  const [asked, setAsked] = useState(true);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Company Brain"
        title="Enterprise Knowledge, Retrievable"
        description="A governed RAG layer over every document, record and system of the company — answering with citations, permissions and confidence."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Documents indexed" value="842" suffix="k" delta={6.4} />
        <StatCard label="Vector embeddings" value="36.2" suffix="M" delta={8.1} />
        <StatCard label="Answer groundedness" value={96.8} suffix="%" delta={2.2} />
        <StatCard label="Queries (30d)" value="128" suffix="k" delta={31.5} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-surface/60 px-3 py-2.5">
              <Search className="size-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setAsked(true)}
                placeholder="Ask the Company Brain…"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={() => setAsked(true)}
                className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
              >
                <Sparkles className="size-3.5" /> Ask
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {SAMPLE_QUERIES.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setQuery(q);
                    setAsked(true);
                  }}
                  className="rounded-full border border-border px-3 py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {q.length > 52 ? `${q.slice(0, 52)}…` : q}
                </button>
              ))}
            </div>
          </GlassCard>

          {asked && (
            <GlassCard className="p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Grounded answer</h2>
                <Pill tone="success">confidence 94%</Pill>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">{ANSWER.text}</p>
              <h3 className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Citations
              </h3>
              <ul className="mt-2 space-y-2">
                {ANSWER.citations.map((c) => (
                  <li
                    key={c.doc}
                    className="flex items-center gap-3 rounded-xl border border-border bg-surface/40 px-3 py-2.5"
                  >
                    <FileText className="size-4 shrink-0 text-primary" />
                    <div className="min-w-0">
                      <p className="truncate text-[13px] text-foreground">{c.doc}</p>
                      <p className="num text-[11px] text-muted-foreground">{c.page}</p>
                    </div>
                    <span className="num ml-auto text-[11px] text-success">{c.score.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          )}
        </div>

        <div className="space-y-4">
          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Knowledge sources</h2>
            <ul className="mt-3 space-y-2">
              {KNOWLEDGE_SOURCES.map((s) => (
                <li key={s.name} className="rounded-xl border border-border bg-surface/40 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-medium text-foreground">{s.name}</p>
                    <Pill tone={toneFor(s.status)}>{s.status}</Pill>
                  </div>
                  <p className="num mt-1 text-[11px] text-muted-foreground">
                    {s.docs.toLocaleString("en-US")} docs · {s.vectors} vectors
                  </p>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Retrieval quality</h2>
            <div className="mt-3 space-y-3">
              {[
                ["Recall@10", 94],
                ["Precision", 91],
                ["Citation coverage", 97],
                ["Permission accuracy", 100],
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
      </div>
    </div>
  );
}
