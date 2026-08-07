import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Activity,
  Bell,
  Bot,
  Boxes,
  BrainCircuit,
  Building2,
  ChevronDown,
  FileText,
  Gauge,
  LayoutDashboard,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
  Cpu,
  CheckCircle2,
  Layers,
  TrendingUp,
  FlaskConical,
  Compass,
  ArrowRight,
  Factory,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Pill } from "@/components/cc/primitives";
import { AGENTS, AUTOMATIONS, DEPT_PROFILES } from "@/lib/command-center-data";
import { AIChatDrawer } from "@/components/cc/AIChatDrawer";
import { ReadinessModal } from "@/components/cc/ReadinessModal";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export const FACILITIES = [
  { id: "anand", name: "🧪 Plant: Anand", code: "AND", type: "Specialty Chemicals Site" },
  { id: "vadodara", name: "🏭 Plant: Vadodara", code: "VAD", type: "Petrochemical Cluster" },
  { id: "dahej", name: "🏭 Plant: Dahej", code: "DHJ", type: "Polymers Complex" },
  { id: "hazira", name: "🏭 Plant: Hazira", code: "HZR", type: "Pharma Intermediates" },
  { id: "enterprise", name: "🏢 Enterprise Overview", code: "ALL", type: "43 Departments" },
];

const EXECUTIVE_NAV = [
  { id: "overview", label: "Executive Overview", to: "/", icon: LayoutDashboard },
  { id: "agents", label: "AI Agents", to: "/ai-automation", icon: Bot },
  { id: "departments", label: "Departments", to: "/operations", icon: Building2 },
  { id: "brain", label: "Company Brain", to: "/knowledge-documents", icon: BrainCircuit },
  { id: "workflows", label: "AI Workflows", to: "/automation", icon: Workflow },
  { id: "roi", label: "ROI Dashboard", to: "/insights", icon: Gauge },
  { id: "security", label: "Security", to: "/platform", icon: ShieldCheck },
  { id: "roadmap", label: "Roadmap", to: "#roadmap", icon: Layers },
];

function GlobalSearch({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search chemical SOPs, batch records, MSDS, contracts, agents, automations..." />
      <CommandList>
        <CommandEmpty>No enterprise records found matching query.</CommandEmpty>
        <CommandGroup heading="AI Agents">
          {AGENTS.slice(0, 8).map((a) => (
            <CommandItem key={a.id} value={a.name} onSelect={() => setOpen(false)} asChild>
              <Link to="/agents/$agentId" params={{ agentId: a.id }} className="flex items-center gap-2">
                <Bot className="size-4 text-[#2563EB]" /> {a.name}
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Departments">
          {DEPT_PROFILES.slice(0, 8).map((d) => (
            <CommandItem key={d.slug} value={d.name} onSelect={() => setOpen(false)} asChild>
              <Link to="/departments/$slug" params={{ slug: d.slug }} className="flex items-center gap-2">
                <Building2 className="size-4 text-[#059669]" /> {d.name}
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [readinessModalOpen, setReadinessModalOpen] = useState(false);
  const [readinessType, setReadinessType] = useState<"assessment" | "demo">("assessment");
  const [selectedFacility, setSelectedFacility] = useState(FACILITIES[0]!);
  const [facilityDropdownOpen, setFacilityDropdownOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    const onOpenAiChat = () => setAiChatOpen(true);
    const onOpenReadiness = (e: Event) => {
      const customEvent = e as CustomEvent<{ type?: "assessment" | "demo" }>;
      if (customEvent.detail?.type) {
        setReadinessType(customEvent.detail.type);
      } else {
        setReadinessType("assessment");
      }
      setReadinessModalOpen(true);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("open-ai-chat", onOpenAiChat);
    window.addEventListener("open-readiness-modal", onOpenReadiness);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-ai-chat", onOpenAiChat);
      window.removeEventListener("open-readiness-modal", onOpenReadiness);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] text-[#0F172A] antialiased">
      <GlobalSearch open={searchOpen} setOpen={setSearchOpen} />
      <AIChatDrawer open={aiChatOpen} onClose={() => setAiChatOpen(false)} />
      <ReadinessModal
        open={readinessModalOpen}
        type={readinessType}
        onClose={() => setReadinessModalOpen(false)}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          FLOATING 3-CARD TOP NAVIGATION HEADER
          3 independent floating cards on desktop, compact responsive bar on mobile.
         ══════════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-2 sm:top-3.5 z-40 mx-auto w-full max-w-[1800px] px-2.5 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between gap-2 sm:gap-3">

          {/* CARD 1: Left Brand Card — Mobile: hamburger + logo icon only. Desktop: full brand text */}
          <div className="h-12 sm:h-13 rounded-[20px] sm:rounded-[24px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-md px-2.5 sm:px-4 flex items-center shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {/* Logo always first / leftmost */}
              <img src="/logo.png" alt="Chemical AI OS Logo" className="size-7 sm:size-8 rounded-full object-contain shrink-0" />

              {/* Mobile-only hamburger immediately after logo */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="grid size-7 place-items-center rounded-full text-[#0F172A] md:hidden cursor-pointer hover:bg-[#F1F5F9] shrink-0"
                title="Open Navigation Menu"
              >
                <Menu className="size-4" />
              </button>

              <div className="min-w-0 leading-tight hidden sm:block">
                <p className="text-[12px] font-bold tracking-tight text-[#0F172A] uppercase truncate">CHEMICAL AI OS</p>
                <p className="truncate text-[10px] font-medium text-[#64748B]">Fortiv Solutions · Enterprise AI Platform</p>
              </div>
            </div>
          </div>

          {/* CARD 2: Center Navigation Pill (Desktop/Tablet) */}
          <nav className="hidden h-13 rounded-full bg-[#FFFFFF] border border-[#E2E8F0] shadow-md px-2 flex items-center shrink min-w-0 overflow-x-auto md:flex">
            <ul className="flex items-center gap-1">
              {EXECUTIVE_NAV.map((item) => {
                const isHash = item.to.startsWith("#");
                const active = !isHash && (item.to === "/" ? pathname === "/" : pathname.startsWith(item.to));

                return (
                  <li key={item.id}>
                    {isHash ? (
                      <a
                        href={item.to}
                        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-[#475569] transition-all hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                      >
                        <span>{item.label}</span>
                      </a>
                    ) : (
                      <Link
                        to={item.to}
                        className={cn(
                          "flex items-center gap-1.5 transition-all text-xs font-bold",
                          active
                            ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25 rounded-full px-3.5 h-9"
                            : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A] rounded-full px-3.5 py-1.5 font-semibold",
                        )}
                      >
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CARD 3: Right Utilities Card */}
          <div className="h-12 sm:h-13 rounded-full bg-[#FFFFFF] border border-[#E2E8F0] shadow-md px-2 sm:px-3 flex items-center gap-1.5 sm:gap-2 shrink-0">

            {/* Ask AI Primary Button */}
            <button
              onClick={() => setAiChatOpen(true)}
              className="flex h-8 sm:h-9 items-center gap-1 sm:gap-1.5 rounded-full bg-[#2563EB] px-3 sm:px-4 text-[11px] sm:text-xs font-extrabold text-white transition-all hover:bg-[#1D4ED8] shadow-md shadow-[#2563EB]/20 cursor-pointer"
            >
              <Sparkles className="size-3 sm:size-3.5 text-white" />
              <span>Ask AI</span>
            </button>

            {/* ROI Button — visible on mobile + desktop */}
            <Link
              to="/insights"
              className="flex h-8 sm:h-9 items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 sm:px-3.5 text-[11px] sm:text-xs font-extrabold text-[#0F172A] hover:bg-[#EFF6FF] hover:border-[#2563EB]/40 transition-all"
            >
              <TrendingUp className="size-3 sm:size-3.5 text-[#059669]" />
              <span className="num font-black">ROI</span>
            </Link>

            {/* Compact Facility Selector (🧪 Plant: Anand) — desktop only */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setFacilityDropdownOpen((v) => !v)}
                className="flex h-9 items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 text-xs font-bold text-[#0F172A] hover:border-[#2563EB]/40 transition-all cursor-pointer max-w-[140px]"
              >
                <span className="truncate">{selectedFacility.name}</span>
                <ChevronDown className="size-3.5 text-[#64748B] shrink-0" />
              </button>

              {facilityDropdownOpen && (
                <div className="absolute right-0 top-11 z-50 w-64 rounded-2xl border border-[#E2E8F0] bg-white p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                  <p className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#64748B]">
                    Select Chemical Plant Site
                  </p>
                  <div className="space-y-1">
                    {FACILITIES.map((facility) => (
                      <button
                        key={facility.id}
                        onClick={() => {
                          setSelectedFacility(facility);
                          setFacilityDropdownOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold transition-all",
                          selectedFacility.id === facility.id
                            ? "bg-[#EFF6FF] text-[#2563EB] font-extrabold"
                            : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]",
                        )}
                      >
                        <div>
                          <p>{facility.name}</p>
                          <p className="text-[10px] text-[#94A3B8]">{facility.type}</p>
                        </div>
                        {selectedFacility.id === facility.id && (
                          <CheckCircle2 className="size-4 text-[#059669]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell — desktop only */}
            <button
              onClick={() => setSearchOpen(true)}
              title="Search Command Palette (⌘K)"
              className="hidden sm:grid size-8 place-items-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] hover:bg-[#EFF6FF] hover:text-[#2563EB] transition-colors"
            >
              <Bell className="size-4" />
            </button>

            {/* User Avatar — visible on mobile + desktop */}
            <div className="flex size-7 sm:size-8 place-items-center justify-center rounded-full bg-[#0F172A] text-[10px] sm:text-[11px] font-black text-white shrink-0">
              AV
            </div>
          </div>

        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE LEFT-SIDE SLIDING DRAWER SHEET (Matching attached reference UI)
         ══════════════════════════════════════════════════════════════════════ */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Left Drawer Container */}
          <div className="relative z-50 flex h-full w-[280px] max-w-[85vw] flex-col justify-between bg-white p-5 shadow-2xl animate-in slide-in-from-left duration-300">
            
            {/* Header: Logo, Title & Close Button */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="Chemical AI OS Logo" className="size-8 rounded-full object-contain shrink-0" />
                  <div className="leading-tight">
                    <p className="text-sm font-extrabold text-[#0F172A]">Chemical AI OS</p>
                    <p className="text-[11px] font-bold text-[#94A3B8]">Fortiv Solutions</p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="grid size-7 place-items-center rounded-full text-[#64748B] hover:bg-[#F1F5F9] cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Vertical Navigation Items */}
              <nav className="space-y-1.5">
                {EXECUTIVE_NAV.map((item) => {
                  const isHash = item.to.startsWith("#");
                  const active = !isHash && (item.to === "/" ? pathname === "/" : pathname.startsWith(item.to));

                  return (
                    <div key={item.id}>
                      {isHash ? (
                        <a
                          href={item.to}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3.5 rounded-xl px-4 py-3 text-xs font-bold text-[#475569] transition-all hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                        >
                          <item.icon className="size-4 text-[#64748B]" />
                          <span>{item.label}</span>
                        </a>
                      ) : (
                        <Link
                          to={item.to}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3.5 transition-all text-xs font-extrabold rounded-xl px-4 py-3",
                            active
                              ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25"
                              : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]",
                          )}
                        >
                          <item.icon className={cn("size-4", active ? "text-white" : "text-[#64748B]")} />
                          <span>{item.label}</span>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Action Area (Exact match with reference screenshot) */}
            <div className="space-y-2.5 pt-4 border-t border-[#E2E8F0]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAiChatOpen(true);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2563EB] py-3.5 text-xs font-extrabold text-white shadow-lg shadow-[#2563EB]/30 hover:bg-[#1D4ED8] transition-all cursor-pointer"
              >
                <Sparkles className="size-4 text-white" />
                <span>Ask Enterprise AI</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setReadinessType("assessment");
                  setReadinessModalOpen(true);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#E2E8F0] bg-white py-3.5 text-xs font-bold text-[#0F172A] hover:bg-[#F8FAFC] transition-all cursor-pointer"
              >
                <Calendar className="size-4 text-[#64748B]" />
                <span>Book Readiness Assessment</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MAIN LAYOUT CONTAINER (Full Width max-w-[1800px] mx-auto px-3 sm:px-4 lg:px-6)
         ══════════════════════════════════════════════════════════════════════ */}
      <main className="mx-auto w-full max-w-[1800px] space-y-8 sm:space-y-10 px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {children}
      </main>
    </div>
  );
}
