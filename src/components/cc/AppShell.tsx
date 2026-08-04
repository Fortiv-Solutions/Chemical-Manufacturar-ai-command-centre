import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Activity,
  Bell,
  Bot,
  Boxes,
  BrainCircuit,
  Building2,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  FileText,
  Gauge,
  KeyRound,
  LayoutDashboard,
  Library,
  ListChecks,
  Menu,
  MessagesSquare,
  Plug,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  X,
  Layers,
  BarChart3,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Pill, StatusDot } from "@/components/cc/primitives";
import { AGENTS, AUTOMATIONS, DEPT_PROFILES } from "@/lib/command-center-data";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const NAV: Array<{ to: string; label: string; icon: typeof Bot; description: string }> = [
  {
    to: "/",
    label: "Executive Command Center",
    icon: LayoutDashboard,
    description: "Enterprise overview, executive KPIs, ROI, health & approvals",
  },
  {
    to: "/operations",
    label: "Business Operations",
    icon: Building2,
    description: "39 Chemical departments, tasks, approvals, SOPs & automation",
  },
  {
    to: "/ai-automation",
    label: "AI & Automation",
    icon: Bot,
    description: "Agents, Copilots, Workflow Builder (n8n), Prompts & Models",
  },
  {
    to: "/knowledge-documents",
    label: "Knowledge & Documents",
    icon: FileText,
    description: "Company AI Brain, Enterprise Search, MSDS, SOPs & Contracts",
  },
  {
    to: "/insights",
    label: "Insights & Reporting",
    icon: Gauge,
    description: "Executive analytics, operational reports, forecasting & MIS",
  },
  {
    to: "/platform",
    label: "Platform Administration",
    icon: ShieldCheck,
    description: "Users, RBAC, SSO, Security Audit, Integrations & Governance",
  },
];


function SidebarContent({
  onNavigate,
  collapsed,
  onToggleCollapse,
}: {
  onNavigate?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex h-full flex-col bg-[#F4F7FA] border-r border-[#D9E2EC]">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-4 py-4.5 border-b border-[#D9E2EC]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#00B8D9] text-[#FFFFFF] shadow-sm">
            <Cpu className="size-5" />
          </div>
          {!collapsed && (
            <div className="leading-tight truncate">
              <p className="text-sm font-extrabold tracking-tight text-[#1E293B]">ChemCorp AI OS</p>
              <p className="text-[11px] font-semibold text-[#0F4C81]">Industrial Intelligence</p>
            </div>
          )}
        </div>
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            className="hidden lg:flex size-7 items-center justify-center rounded-lg border border-[#D9E2EC] bg-[#FFFFFF] text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors"
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </button>
        )}
      </div>

      {/* Nav Menu - 6 Exact Business Capability Workspaces */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-4">
        {!collapsed && (
          <p className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0F4C81]">
            Workspaces
          </p>
        )}
        <ul className="space-y-1">
          {NAV.map((item) => {
            const active =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onNavigate}
                  title={collapsed ? `${item.label} — ${item.description}` : undefined}
                  className={cn(
                    "group relative flex items-center gap-3.5 rounded-xl px-3 py-2.5 text-[13px] font-bold transition-all duration-150",
                    active
                      ? "bg-[#00B8D9] text-[#FFFFFF] shadow-sm"
                      : "text-[#475569] hover:bg-[#EBF8FA] hover:text-[#00B8D9]",
                    collapsed && "justify-center px-0 py-3",
                  )}
                >
                  <item.icon
                    className={cn(
                      "size-5 shrink-0 transition-colors",
                      active ? "text-[#FFFFFF]" : "text-[#64748B] group-hover:text-[#00B8D9]",
                    )}
                  />
                  {!collapsed && (
                    <div className="min-w-0 flex-1 leading-tight">
                      <p className="truncate text-[13px] font-extrabold">{item.label}</p>
                      <p
                        className={cn(
                          "truncate text-[10px] font-medium transition-colors mt-0.5",
                          active ? "text-[#E0F7FA]" : "text-[#94A3B8] group-hover:text-[#00B8D9]/80",
                        )}
                      >
                        {item.description.split(",")[0]}
                      </p>
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>


      {/* System Status Footer */}
      {!collapsed && (
        <div className="mx-3 mb-4 rounded-[12px] border border-[#D9E2EC] bg-[#FFFFFF] p-3.5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1E293B]">
            <StatusDot tone="success" /> Industrial Cluster Healthy
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-[#64748B]">
            {AGENTS.filter((a) => a.status === "active").length} active agents ·{" "}
            {AUTOMATIONS.filter((a) => a.status === "Live").length} live workflows
          </p>
        </div>
      )}
    </div>
  );
}

function GlobalSearch({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search employees, documents, SOPs, invoices, agents, workflows…" />
      <CommandList>
        <CommandEmpty>No enterprise records found matching query.</CommandEmpty>
        <CommandGroup heading="AI Agents">
          {AGENTS.slice(0, 8).map((a) => (
            <CommandItem key={a.id} value={a.name} onSelect={() => setOpen(false)} asChild>
              <Link to="/agents/$agentId" params={{ agentId: a.id }} className="flex items-center gap-2">
                <Bot className="size-4 text-[#00B8D9]" /> {a.name}
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Departments">
          {DEPT_PROFILES.slice(0, 8).map((d) => (
            <CommandItem key={d.slug} value={d.name} onSelect={() => setOpen(false)} asChild>
              <Link to="/departments/$slug" params={{ slug: d.slug }} className="flex items-center gap-2">
                <Building2 className="size-4 text-[#0F4C81]" /> {d.name}
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Automations & Workflows">
          {AUTOMATIONS.slice(0, 6).map((a) => (
            <CommandItem key={a.id} value={a.title} onSelect={() => setOpen(false)} asChild>
              <Link to="/automation" className="flex items-center gap-2">
                <Boxes className="size-4 text-[#22C55E]" /> {a.code} · {a.title}
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#F7F9FC] text-[#1E293B]">
      <GlobalSearch open={searchOpen} setOpen={setSearchOpen} />

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden border-r border-[#D9E2EC] bg-[#F4F7FA] transition-all duration-300 lg:block",
          collapsed ? "w-20" : "w-[280px]",
        )}
      >
        <SidebarContent
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((v) => !v)}
        />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-[280px] border-r border-[#D9E2EC] bg-[#F4F7FA]">
            <button
              aria-label="Close navigation"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 rounded-md p-1.5 text-[#64748B] hover:bg-[#E2E8F0]"
            >
              <X className="size-5" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Content wrapper with dynamic padding */}
      <div className={cn("transition-all duration-300", collapsed ? "lg:pl-20" : "lg:pl-[280px]")}>
        {/* Floating Light Top Navigation Bar */}
        <header className="sticky top-0 z-20 border-b border-[#D9E2EC] bg-[#FFFFFF] shadow-xs">
          <div className="flex h-16 items-center gap-3 px-4 md:px-6">
            <button
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B] lg:hidden"
            >
              <Menu className="size-5" />
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="group flex h-9.5 min-w-0 flex-1 items-center gap-2.5 rounded-full border border-[#D9E2EC] bg-[#F8FAFC] px-4 text-left text-[13px] text-[#64748B] transition-all hover:border-[#00B8D9] hover:bg-[#FFFFFF] hover:shadow-xs md:max-w-md"
            >
              <Search className="size-4 text-[#00B8D9] group-hover:scale-105 transition-transform" />
              <span className="truncate">Search employees, SOPs, invoices, data...</span>
              <kbd className="ml-auto hidden rounded-md border border-[#D9E2EC] bg-[#FFFFFF] px-2 py-0.5 text-[10px] font-bold text-[#64748B] md:inline">
                ⌘K
              </kbd>
            </button>

            {/* Right Top Actions */}
            <div className="ml-auto flex items-center gap-3">
              <Link
                to="/brain"
                className="hidden items-center gap-2 rounded-lg bg-[#00B8D9] px-4 py-2 text-[13px] font-bold text-[#FFFFFF] shadow-xs transition-all hover:bg-[#009BB8] sm:flex"
              >
                <Sparkles className="size-4 text-[#FFFFFF]" /> Ask Company AI
              </Link>
              <Pill tone="success" className="hidden xl:inline-flex">
                <StatusDot tone="success" /> 14 automations live
              </Pill>
              <Pill tone="info" className="hidden xl:inline-flex">
                18 systems connected
              </Pill>
              <button
                aria-label="Notifications"
                className="relative rounded-lg border border-[#D9E2EC] bg-[#FFFFFF] p-2 text-[#64748B] transition-colors hover:bg-[#F1F5F9] hover:text-[#1E293B]"
              >
                <Bell className="size-4" />
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[#00B8D9]" />
              </button>

              {/* User Profile Card */}
              <div className="flex items-center gap-2.5 rounded-full border border-[#D9E2EC] bg-[#FFFFFF] py-1 pl-1 pr-3.5 shadow-xs">
                <span className="grid size-7.5 place-items-center rounded-full bg-[#0F4C81] text-xs font-bold text-[#FFFFFF]">
                  RV
                </span>
                <div className="hidden leading-tight md:block">
                  <p className="text-[12px] font-bold text-[#1E293B]">R. Venkatesan</p>
                  <p className="text-[10px] font-semibold text-[#0F4C81]">Chief Digital Officer</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1600px] space-y-8 px-4 py-8 md:px-6">{children}</main>
      </div>
    </div>
  );
}


