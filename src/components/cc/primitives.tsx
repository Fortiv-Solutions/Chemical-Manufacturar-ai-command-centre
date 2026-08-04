import type { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";

/* ─── Glass Card ─── */
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
        "group relative rounded-[16px] border border-[#E2E8F0] bg-[#FFFFFF] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0F4C81]/30 hover:shadow-[0_8px_25px_-5px_rgba(15,76,129,0.10)]",
        glow && "border-[#0F4C81]/40 shadow-[0_0_15px_rgba(15,76,129,0.10)]",
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
            <span className="h-2 w-2 rounded-full bg-[#0F4C81]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0F4C81]">
              {eyebrow}
            </p>
          </div>
        )}
        <h1 className="mt-1.5 text-2xl font-extrabold tracking-tight text-[#1E293B] md:text-3xl">{title}</h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-[#64748B]">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3 shrink-0 pt-2 xl:pt-0">{actions}</div>}
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
        <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#0F4C81]">
          {title}
        </h2>
        {hint && <p className="mt-0.5 text-xs text-[#64748B]">{hint}</p>}
      </div>
      {action}
    </div>
  );
}

/* ─── Tone System ─── */
const toneMap: Record<string, string> = {
  success: "bg-[#22C55E]/10 text-[#15803D] border-[#22C55E]/30",
  warning: "bg-[#F59E0B]/10 text-[#B45309] border-[#F59E0B]/30",
  danger: "bg-[#EF4444]/10 text-[#B91C1C] border-[#EF4444]/30",
  info: "bg-[#3B82F6]/10 text-[#1D4ED8] border-[#3B82F6]/30",
  primary: "bg-[#0F4C81]/10 text-[#0F4C81] border-[#0F4C81]/30",
  neutral: "bg-[#F1F5F9] text-[#475569] border-[#CBD5E1]",
};

export type Tone = keyof typeof toneMap;

export function toneFor(value: string): Tone {
  const v = value.toLowerCase();
  if (
    ["active", "live", "healthy", "approved", "connected", "synced", "enforced", "low", "validated", "ready"].includes(
      v,
    )
  )
    return "success";
  if (["high"].includes(v)) return "warning";
  if (["paused", "piloting", "degraded", "pending", "in build", "medium", "monitoring", "indexing", "in progress", "waiting on human", "needs review", "review", "escalated"].includes(v))
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
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap transition-colors",
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
          "bg-[#22C55E]": tone === "success",
          "bg-[#F59E0B]": tone === "warning",
          "bg-[#EF4444]": tone === "danger",
          "bg-[#0F4C81]": tone === "primary",
          "bg-[#3B82F6]": tone === "info",
          "bg-[#64748B]": tone === "neutral",
        })}
      />
      <span
        className={cn("relative inline-flex size-1.5 rounded-full", {
          "bg-[#22C55E]": tone === "success",
          "bg-[#F59E0B]": tone === "warning",
          "bg-[#EF4444]": tone === "danger",
          "bg-[#0F4C81]": tone === "primary",
          "bg-[#3B82F6]": tone === "info",
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
      ? "#22C55E"
      : tone === "warning"
        ? "#F59E0B"
        : tone === "danger"
          ? "#EF4444"
          : "#2F80ED";

  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-7 w-full overflow-visible">
      <defs>
        <linearGradient id={`sparkGrad-light-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.18" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,30 ${d} 100,30`}
        fill={`url(#sparkGrad-light-${tone})`}
      />
      <polyline
        points={d}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── StatCard — Redesigned Enterprise KPI Card ─── */

const accentColors: Record<string, string> = {
  blue: "#0F4C81",
  teal: "#147A7E",
  accent: "#2F80ED",
  green: "#22C55E",
  amber: "#F59E0B",
  red: "#EF4444",
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
  accent = "blue",
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
  const accentColor = accentColors[accent] || accentColors.blue;

  const padMap = { lg: "p-6", md: "p-5", sm: "p-4" };
  const metricMap = { lg: "text-[32px]", md: "text-[28px]", sm: "text-[22px]" };
  const iconSizeMap = { lg: "size-10", md: "size-9", sm: "size-8" };
  const iconInnerMap = { lg: "size-5", md: "size-[18px]", sm: "size-4" };

  return (
    <GlassCard className={cn(padMap[size], "overflow-hidden")}>
      {/* Left accent border */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[16px]"
        style={{ backgroundColor: accentColor }}
      />

      {/* Top: Icon + Title */}
      <div className="flex items-center gap-3">
        {Icon && (
          <div
            className={cn("shrink-0 grid place-items-center rounded-xl", iconSizeMap[size])}
            style={{ backgroundColor: `${accentColor}10` }}
          >
            <Icon className={cn(iconInnerMap[size])} style={{ color: accentColor }} />
          </div>
        )}
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] truncate flex-1">{label}</p>
      </div>

      {/* Middle: Big Number */}
      <div className="mt-3 flex items-baseline gap-2">
        <p className={cn("num font-extrabold tracking-tight text-[#1E293B]", metricMap[size])}>
          {prefix}
          {value}
          {suffix && <span className="ml-1 text-sm font-semibold text-[#64748B]">{suffix}</span>}
        </p>
      </div>

      {/* Bottom: Supporting + Trend + Sparkline */}
      <div className="mt-3 space-y-2">
        {/* Supporting text */}
        {supporting && (
          <p className="text-[11px] font-medium text-[#64748B] leading-relaxed">{supporting}</p>
        )}

        {/* Trend indicator */}
        {delta !== undefined && (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[11px] font-bold num",
                up ? "text-[#15803D]" : "text-[#B91C1C]",
              )}
            >
              <span className="text-[10px]">{up ? "▲" : "▼"}</span>
              {Math.abs(delta)}%
            </span>
            <span className="text-[10px] text-[#94A3B8] font-medium">vs last period</span>
          </div>
        )}

        {/* Sparkline */}
        {spark && (
          <div className="pt-0.5">
            <Sparkline points={spark} tone={up ? "primary" : "danger"} />
          </div>
        )}
      </div>
    </GlassCard>
  );
}

/* ─── Meter Bar ─── */
export function MeterBar({ value, tone = "primary" }: { value: number; tone?: Tone }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
      <div
        className={cn("h-full rounded-full transition-all duration-500", {
          "bg-[#0F4C81]": tone === "primary",
          "bg-[#22C55E]": tone === "success",
          "bg-[#F59E0B]": tone === "warning",
          "bg-[#EF4444]": tone === "danger",
          "bg-[#3B82F6]": tone === "info",
          "bg-[#64748B]": tone === "neutral",
        })}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

/* ─── Empty Hint ─── */
export function EmptyHint({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[16px] border border-dashed border-[#E2E8F0] bg-[#F8FAFC] p-8 text-center text-sm font-medium text-[#64748B]">
      {children}
    </div>
  );
}
