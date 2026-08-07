import type { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Building2, Zap, Layers, Lock, Database, FileText, Activity } from "lucide-react";

/* ─── Glass Card (Pure White 28px Rounded Card) ─── */
export function GlassCard({
  className,
  children,
  glow,
  onClick,
}: {
  className?: string | undefined;
  children: ReactNode;
  glow?: boolean | undefined;
  onClick?: (() => void) | undefined;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative rounded-[28px] border border-[#E2E8F0] bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(15,23,42,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2563EB]/40 hover:shadow-[0_14px_35px_-6px_rgba(37,99,235,0.12)]",
        glow && "border-[#2563EB]/40 shadow-[0_0_20px_rgba(37,99,235,0.10)]",
        onClick && "cursor-pointer",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ─── Page Header ─── */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string | undefined;
  title: string;
  description?: string | undefined;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#E2E8F0] pb-6 xl:flex-row xl:items-center xl:justify-between">
      <div className="min-w-0 flex-1">
        {eyebrow && (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#2563EB]">
              {eyebrow}
            </p>
          </div>
        )}
        <h1 className="mt-1.5 text-2xl font-extrabold tracking-tight text-[#0F172A] md:text-3xl">{title}</h1>
        {description && (
          <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-[#64748B] font-medium">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3 shrink-0 pt-2 xl:pt-0">{actions}</div>}
    </div>
  );
}

/* ─── Secondary Horizontal Sub-Module Header (ModuleControlHub) ─── */
export function ModuleControlHub({
  activeTab,
  onTabChange,
  tabs = ["Overview", "AI Agents", "KPIs", "Workflows", "Analytics", "Documents", "Settings"],
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs?: string[];
}) {
  return (
    <div className="rounded-[24px] border border-[#E2E8F0] bg-white p-3.5 shadow-sm">
      <div className="flex items-center gap-1.5 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer",
              activeTab === tab
                ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25"
                : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]",
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Section Title ─── */
export function SectionTitle({
  title,
  hint,
  action,
}: {
  title: string;
  hint?: string | undefined;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#2563EB]">
          {title}
        </h2>
        {hint && <p className="mt-0.5 text-xs text-[#64748B] font-semibold">{hint}</p>}
      </div>
      {action}
    </div>
  );
}

/* ─── Tone System ─── */
const toneMap: Record<string, string> = {
  success: "bg-[#059669]/10 text-[#059669] border-[#059669]/30",
  warning: "bg-[#D97706]/10 text-[#D97706] border-[#D97706]/30",
  danger: "bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/30",
  info: "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/30",
  primary: "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/30",
  secondary: "bg-[#0F172A]/10 text-[#0F172A] border-[#0F172A]/30",
  neutral: "bg-[#F1F5F9] text-[#475569] border-[#CBD5E1]",
};

export type Tone = keyof typeof toneMap;

export function toneFor(value: string): Tone {
  const v = value.toLowerCase();
  if (["active", "live", "healthy", "approved", "connected", "synced", "enforced", "low", "validated", "ready", "passes", "on-time", "audit ready"].includes(v))
    return "success";
  if (["high", "paused", "piloting", "degraded", "pending", "in build", "medium", "monitoring", "indexing", "in progress", "waiting on human", "needs review", "review", "escalated"].includes(v))
    return "warning";
  if (["error", "critical", "rejected", "blocked", "reject", "failed"].includes(v)) return "danger";
  if (["draft", "backlog", "available", "planned", "invited", "inactive"].includes(v)) return "neutral";
  return "primary";
}

/* ─── Pill ─── */
export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone | undefined;
  className?: string | undefined;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-extrabold whitespace-nowrap transition-colors",
        toneMap[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ─── Status Dot ─── */
export function StatusDot({ tone = "success" }: { tone?: Tone }) {
  return (
    <span className="relative flex size-2 shrink-0 items-center justify-center">
      <span
        className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", {
          "bg-[#059669]": tone === "success",
          "bg-[#D97706]": tone === "warning",
          "bg-[#DC2626]": tone === "danger",
          "bg-[#2563EB]": tone === "primary",
          "bg-[#0F172A]": tone === "secondary",
          "bg-[#64748B]": tone === "neutral",
        })}
      />
      <span
        className={cn("relative inline-flex size-1.5 rounded-full", {
          "bg-[#059669]": tone === "success",
          "bg-[#D97706]": tone === "warning",
          "bg-[#DC2626]": tone === "danger",
          "bg-[#2563EB]": tone === "primary",
          "bg-[#0F172A]": tone === "secondary",
          "bg-[#64748B]": tone === "neutral",
        })}
      />
    </span>
  );
}

/* ─── Sparkline ─── */
export function Sparkline({ points, tone = "primary" }: { points: readonly number[]; tone?: Tone }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const d = points
    .map((p, i) => `${(i / (points.length - 1)) * 100},${28 - ((p - min) / span) * 24}`)
    .join(" ");

  const strokeColor =
    tone === "success"
      ? "#059669"
      : tone === "warning"
        ? "#D97706"
        : tone === "danger"
          ? "#DC2626"
          : "#2563EB";

  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-7 w-full overflow-visible">
      <defs>
        <linearGradient id={`sparkGrad-light-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <polygon points={`0,30 ${d} 100,30`} fill={`url(#sparkGrad-light-${tone})`} />
      <polyline
        points={d}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Meter Bar ─── */
export function MeterBar({ value, tone = "primary" }: { value: number; tone?: Tone }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
      <div
        className={cn("h-full rounded-full transition-all duration-500", {
          "bg-[#2563EB]": tone === "primary",
          "bg-[#059669]": tone === "success",
          "bg-[#D97706]": tone === "warning",
          "bg-[#DC2626]": tone === "danger",
          "bg-[#0F172A]": tone === "secondary",
          "bg-[#64748B]": tone === "neutral",
        })}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

/* ─── StatCard — Executive Core Metric Card ─── */
const accentColors: Record<string, string> = {
  cobalt: "#2563EB",
  slate: "#0F172A",
  emerald: "#059669",
  amber: "#D97706",
  red: "#DC2626",
};

export function StatCard({
  label,
  value,
  delta,
  spark,
  suffix,
  prefix,
  icon: Icon,
  supporting,
  size = "md",
  accent = "cobalt",
}: {
  label: string;
  value: string | number;
  delta?: number | undefined;
  spark?: readonly number[] | undefined;
  suffix?: string | undefined;
  prefix?: string | undefined;
  icon?: ElementType | undefined;
  supporting?: string | undefined;
  size?: "lg" | "md" | "sm" | undefined;
  accent?: keyof typeof accentColors | undefined;
}) {
  const up = (delta ?? 0) >= 0;
  const accentColor = accentColors[accent] || accentColors.cobalt;

  const padMap = { lg: "p-6 md:p-8", md: "p-6", sm: "p-5" };
  const metricMap = { lg: "text-[34px]", md: "text-[28px]", sm: "text-[22px]" };
  const iconSizeMap = { lg: "size-12", md: "size-10", sm: "size-8" };

  return (
    <GlassCard className={cn(padMap[size], "relative overflow-hidden")}>
      <div
        className="absolute left-0 top-0 bottom-0 w-[4px] rounded-l-[28px]"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex items-center gap-3">
        {Icon && (
          <div
            className={cn("shrink-0 grid place-items-center rounded-2xl", iconSizeMap[size])}
            style={{ backgroundColor: `${accentColor}12` }}
          >
            <Icon className="size-5" style={{ color: accentColor }} />
          </div>
        )}
        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#64748B] truncate flex-1">{label}</p>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <p className={cn("num font-black tracking-tight text-[#0F172A]", metricMap[size])}>
          {prefix}
          {value}
          {suffix && <span className="ml-1 text-xs font-bold text-[#64748B]">{suffix}</span>}
        </p>
      </div>

      <div className="mt-3 space-y-2">
        {supporting && (
          <p className="text-[11px] font-semibold text-[#64748B] leading-relaxed">{supporting}</p>
        )}

        {delta !== undefined && (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10.5px] font-extrabold num",
                up ? "bg-[#059669]/10 text-[#059669]" : "bg-[#DC2626]/10 text-[#DC2626]",
              )}
            >
              <span>{up ? "▲" : "▼"}</span>
              {Math.abs(delta)}%
            </span>
            <span className="text-[10px] text-[#94A3B8] font-extrabold">vs last quarter</span>
          </div>
        )}

        {spark && (
          <div className="pt-1">
            <Sparkline points={spark} tone={up ? "success" : "danger"} />
          </div>
        )}
      </div>
    </GlassCard>
  );
}

/* ─── Process Comparison Card (Current vs Future Workflow) ─── */
export function ProcessComparisonCard({
  title,
  department,
  currentSteps,
  futureSteps,
  timeSavings,
}: {
  title: string;
  department: string;
  currentSteps: string[];
  futureSteps: string[];
  timeSavings: string;
}) {
  return (
    <GlassCard className="p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4 mb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2563EB]">
            {department} Workflow Transformation
          </span>
          <h3 className="text-base font-extrabold text-[#0F172A]">{title}</h3>
        </div>
        <div className="rounded-full bg-[#059669]/10 px-4 py-1 text-xs font-black text-[#059669] num">
          ⚡ {timeSavings}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Current Manual State */}
        <div className="rounded-2xl border border-[#DC2626]/20 bg-[#FEF2F2]/40 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#DC2626] uppercase tracking-wider">
            <span className="size-2 rounded-full bg-[#DC2626]" />
            Current Manual Process
          </div>
          <ul className="space-y-2">
            {currentSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#64748B]">
                <span className="num font-bold text-[#DC2626] shrink-0">0{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Future AI Automated State */}
        <div className="rounded-2xl border border-[#059669]/30 bg-[#ECFDF5]/60 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#059669] uppercase tracking-wider">
            <span className="size-2 rounded-full bg-[#059669]" />
            Future Fortiv AI Workflow
          </div>
          <ul className="space-y-2">
            {futureSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-[#0F172A]">
                <CheckCircle2 className="size-3.5 text-[#059669] shrink-0 mt-0.5" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GlassCard>
  );
}

/* ─── Horizontal Transformation Roadmap ─── */
export function HorizontalRoadmap() {
  const steps = [
    {
      phase: "Phase 1",
      timeline: "30-Day Discovery",
      title: "Data & Systems Audit",
      desc: "Connect ERP, LIMS, SDS repositories, and SAP tables. Zero hardware requirements.",
      status: "Complete",
    },
    {
      phase: "Phase 2",
      timeline: "90-Day Pilot",
      title: "Priority Department Rollout",
      desc: "Deploy AI Procurement Copilot & Quality Documentation Agents at pilot chemical plant.",
      status: "In Progress",
    },
    {
      phase: "Phase 3",
      timeline: "Month 4-6",
      title: "Multi-Plant Expansion",
      desc: "Scale Company Brain vector search & SDS retrieval across all 43 manufacturing functions.",
      status: "Planned",
    },
    {
      phase: "Phase 4",
      timeline: "Month 7-12",
      title: "Enterprise AI Adoption",
      desc: "Full automated order fulfillment, automated COA extraction, and executive MIS packs.",
      status: "Planned",
    },
    {
      phase: "Phase 5",
      timeline: "Continuous",
      title: "Continuous Value Optimization",
      desc: "Self-learning prompt tuning, autonomous compliance auditing, and supplier risk alerts.",
      status: "Planned",
    },
  ];

  return (
    <div id="roadmap" className="space-y-4">
      <SectionTitle
        title="Chemical Enterprise Transformation Roadmap"
        hint="Proven 5-stage adoption methodology from initial system connection to enterprise-wide AI value creation."
      />
      <div className="grid gap-3 md:grid-cols-5">
        {steps.map((s, idx) => (
          <GlassCard key={s.phase} className="p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider mb-2">
                <span className="text-[#2563EB]">{s.phase}</span>
                <span className="num text-[#64748B]">{s.timeline}</span>
              </div>
              <h4 className="text-xs font-extrabold text-[#0F172A] mb-1.5">{s.title}</h4>
              <p className="text-[11px] leading-relaxed text-[#64748B] font-medium">{s.desc}</p>
            </div>
            <div className="mt-4 pt-2 border-t border-[#E2E8F0] flex items-center justify-between">
              <Pill tone={s.status === "Complete" ? "success" : s.status === "In Progress" ? "primary" : "neutral"}>
                {s.status}
              </Pill>
              <span className="text-[10px] font-black num text-[#94A3B8]">0{idx + 1}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

/* ─── Trust & Governance Section ─── */
export function TrustGovernanceSection() {
  return (
    <div className="rounded-[32px] border border-[#E2E8F0] bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#1E40AF] p-8 md:p-10 text-white shadow-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#60A5FA] backdrop-blur-md border border-white/10">
            <ShieldCheck className="size-4 text-[#059669]" /> Enterprise Security & Zero Hardware Assurance
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
            Software-Only AI. Built for Chemical Enterprise Compliance.
          </h2>
          <p className="text-xs leading-relaxed text-white/80 font-medium">
            Fortiv Chemical AI operates purely in the enterprise software layer. No physical sensors, PLCs, SCADA modifications, cameras, or hardware upgrades required. 100% human-in-the-loop governance for all critical operational approvals.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:w-auto shrink-0">
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-xs font-extrabold text-white">
              <Lock className="size-4 text-[#059669]" /> Role-Based Access (RBAC)
            </div>
            <p className="text-[11px] text-white/70">Granular document & API permissions mapped to SAP/Active Directory.</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-xs font-extrabold text-white">
              <Database className="size-4 text-[#60A5FA]" /> ERP / CRM Integration
            </div>
            <p className="text-[11px] text-white/70">Seamless real-time connectors for SAP S/4HANA, LIMS, and SharePoint.</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-xs font-extrabold text-white">
              <CheckCircle2 className="size-4 text-[#059669]" /> Human Approval Gates
            </div>
            <p className="text-[11px] text-white/70">High-value purchase orders & SDS releases mandate executive sign-off.</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-xs font-extrabold text-white">
              <FileText className="size-4 text-[#D97706]" /> Audit Log Trail
            </div>
            <p className="text-[11px] text-white/70">Immutable log of every prompt, citation, extraction, and decision.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
