import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  ArrowRight,
  Bot,
  Boxes,
  Building2,
  CheckSquare,
  ChevronDown,
  Download,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  Gauge,
  Library,
  ListChecks,
  Sparkles,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GlassCard, MeterBar, PageHeader, Pill, StatCard } from "@/components/cc/primitives";
import { FilterTable } from "@/components/cc/FilterTable";
import { APPROVALS, AUTOMATIONS, DEPT_PROFILES, DOCUMENTS, MIS_PACKS, POLICIES_AND_GRAPH, TASKS } from "@/lib/command-center-data";

export const Route = createFileRoute("/operations")({
  component: BusinessOperationsPage,
});

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const ALL_39_DEPARTMENTS = [
  "Executive Office",
  "Finance",
  "Accounts",
  "Procurement",
  "Purchase",
  "Vendor Management",
  "Supply Chain",
  "Warehouse",
  "Planning",
  "Production Planning",
  "Quality Assurance",
  "Quality Control",
  "Regulatory",
  "Compliance",
  "Engineering",
  "Maintenance",
  "Laboratory",
  "R&D",
  "Sales",
  "Marketing",
  "Customer Service",
  "Business Development",
  "HR",
  "Administration",
  "Legal",
  "Internal Audit",
  "Project Management",
  "Training",
  "Import",
  "Export",
  "Logistics",
  "ISO",
  "Technical Services",
  "Knowledge Management",
  "Document Control",
] as const;

const TABS = [
  "Overview",
  "Departments",
  "Dashboard",
  "Tasks",
  "Approvals",
  "Documents",
  "Knowledge",
  "AI Assistant",
  "Automation",
  "Reports",
  "Analytics",
] as const;

const DEPT_PERFORMANCE = [
  { month: "Jan", throughput: 85, efficiency: 91, accuracy: 98.2 },
  { month: "Feb", throughput: 88, efficiency: 94, accuracy: 98.6 },
  { month: "Mar", throughput: 92, efficiency: 96, accuracy: 99.1 },
  { month: "Apr", throughput: 96, efficiency: 98, accuracy: 99.5 },
];

function getTabMetrics(tab: (typeof TABS)[number], selectedDept: string, tasksCount: number, appCount: number, autoCount: number, docsCount: number) {
  switch (tab) {
    case "Departments":
      return [
        { label: "Total Chemical Departments", value: ALL_39_DEPARTMENTS.length, delta: 0 },
        { label: "Active Office Functions", value: "39", delta: 100 },
        { label: "Avg Dept AI Adoption", value: "88.5%", delta: 6.2 },
        { label: "Cross-Dept Automations", value: "208", delta: 24.0 },
      ];
    case "Tasks":
      return [
        { label: `${selectedDept} Open Tasks`, value: tasksCount, delta: 8.4 },
        { label: "High Priority Tasks", value: "3", delta: -12.0 },
        { label: "Completed 30D", value: "142", delta: 18.5 },
        { label: "Avg Task Resolution Time", value: "4.2h", delta: -22.0 },
      ];
    case "Approvals":
      return [
        { label: "Pending Approvals", value: appCount, delta: -4.2 },
        { label: "Capex Under Review", value: "$4.8M", delta: 12.0 },
        { label: "Avg Approval Cycle", value: "1.2h", delta: -35.0 },
        { label: "AI Auto-Approval Rate", value: "94.2%", delta: 4.5 },
      ];
    case "Documents":
      return [
        { label: "Indexed Department Docs", value: docsCount, delta: 5.1 },
        { label: "MSDS & SOP Sheets", value: "48", delta: 2.0 },
        { label: "Vector Search Recall", value: "99.6%", delta: 1.2 },
        { label: "Extraction Accuracy", value: "99.4%", delta: 0.8 },
      ];
    case "Knowledge":
      return [
        { label: "Standard SOPs & Policies", value: "34", delta: 4.0 },
        { label: "Compliance Standard", value: "ISO 9001", delta: 0 },
        { label: "Audit Readiness Score", value: "99.8%", delta: 0.5 },
        { label: "Pending Revision Sign-Offs", value: "1", delta: -50.0 },
      ];
    case "AI Assistant":
      return [
        { label: "AI Copilot Conversations", value: "1,420", delta: 24.0 },
        { label: "User Satisfaction Score", value: "98.9%", delta: 2.1 },
        { label: "Grounded Recall Precision", value: "99.8%", delta: 0.4 },
        { label: "Contextual Latency", value: "280ms", delta: -14.0 },
      ];
    case "Automation":
      return [
        { label: "Live Automations", value: autoCount, delta: 18.0 },
        { label: "High-ROI Opportunities", value: "12", delta: 15.0 },
        { label: "Annual Hours Saved", value: "28,400h", delta: 32.0 },
        { label: "Pipeline Backlog", value: "8", delta: -10.0 },
      ];
    case "Reports":
      return [
        { label: "Generated MIS Packs", value: "24", delta: 12.0 },
        { label: "Automated Report Schedules", value: "8", delta: 0 },
        { label: "Export Formats", value: "PDF & XLSX", delta: 0 },
        { label: "Distribution Recipients", value: "42", delta: 8.0 },
      ];
    case "Analytics":
      return [
        { label: "Operational Throughput", value: "96.0%", delta: 4.5 },
        { label: "Process Yield Accuracy", value: "99.5%", delta: 1.2 },
        { label: "SOP Compliance Rate", value: "99.8%", delta: 0.2 },
        { label: "Process Cycle Time", value: "1.4d", delta: -40.0 },
      ];
    case "Overview":
    case "Dashboard":
    default:
      return [
        { label: `${selectedDept} Tasks`, value: tasksCount, delta: 8.4 },
        { label: "Pending Approvals", value: appCount, delta: -4.2 },
        { label: "Live Automations", value: autoCount, delta: 18.0 },
        { label: "Knowledge Documents", value: docsCount, delta: 5.1 },
      ];
  }
}

function BusinessOperationsPage() {
  const [selectedDept, setSelectedDept] = useState<string>("Production Planning");
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Dashboard");
  const [deptSearch, setDeptSearch] = useState("");

  const deptTasks = TASKS.filter((t) => t.department === selectedDept || true).slice(0, 8);
  const deptApprovals = APPROVALS.filter((a) => a.department === selectedDept || true).slice(0, 6);
  const deptDocs = DOCUMENTS.filter((d) => d.department === selectedDept || true).slice(0, 8);
  const deptAutomations = AUTOMATIONS.filter((a) => a.department === selectedDept || true).slice(0, 6);
  const deptPolicies = POLICIES_AND_GRAPH.filter((p) => p.department === selectedDept || true).slice(0, 6);
  const deptMIS = MIS_PACKS.filter((m) => m.department === selectedDept || true).slice(0, 4);

  const currentMetrics = getTabMetrics(activeTab, selectedDept, deptTasks.length, deptApprovals.length, deptAutomations.length, deptDocs.length);

  const filteredDepts = ALL_39_DEPARTMENTS.filter((d) => d.toLowerCase().includes(deptSearch.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Workspace Header */}
      <PageHeader
        eyebrow="Business Operations Workspace"
        title="Departmental Operations Control Hub"
        description="Unified operational center across 39 chemical manufacturing office functions — seamlessly managing tasks, approvals, AI, documents, and workflows."
        actions={
          <div className="flex items-center gap-2">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="h-10 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 text-xs font-bold text-[#1E293B] shadow-xs outline-none focus:border-[#0F4C81]"
            >
              {ALL_39_DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d} Department
                </option>
              ))}
            </select>
            <Pill tone="primary"><Building2 className="size-3.5" /> 39 Departments Active</Pill>
          </div>
        }
      />

      {/* Dynamic Tab-Specific KPI Overview Cards */}
      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
        {currentMetrics.map((m) => (
          <StatCard key={m.label} label={m.label} value={m.value} delta={m.delta} />
        ))}
      </div>

      {/* Contextual Workspace Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#E2E8F0] pb-3">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
              activeTab === tab
                ? "bg-[#0F4C81] text-[#FFFFFF] shadow-sm"
                : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === "Departments" && (
        <GlassCard className="p-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-2">
                <Building2 className="size-5 text-[#0F4C81]" /> 39 Chemical Manufacturing Department Directory
              </h3>
              <p className="text-xs text-[#64748B] mt-1">Launch any department&apos;s full dedicated workspace or set it as the active operational context.</p>
            </div>
            <input
              type="text"
              value={deptSearch}
              onChange={(e) => setDeptSearch(e.target.value)}
              placeholder="Search 39 departments…"
              className="h-10 w-64 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 text-xs text-[#1E293B] outline-none focus:border-[#0F4C81]"
            />
          </div>

          <div className="grid gap-3.5 md:grid-cols-3 xl:grid-cols-4">
            {filteredDepts.map((d, i) => {
              const slug = slugify(d);
              return (
                <div
                  key={d}
                  className={`rounded-xl border p-4 transition-all hover:border-[#0F4C81] ${
                    selectedDept === d ? "border-[#0F4C81] bg-[#EBF1F8]" : "border-[#E2E8F0] bg-[#F8FAFC]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F4C81]">Dept #{i + 1}</span>
                    <Pill tone="success">Active</Pill>
                  </div>
                  <p className="mt-2 text-sm font-extrabold text-[#1E293B]">{d}</p>
                  <p className="mt-1 text-[11px] text-[#64748B]">Chemical Office Function</p>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-[#64748B]">
                    <span>AI Agents: <strong className="text-[#1E293B]">{(i % 4) + 2}</strong></span>
                    <span>Automations: <strong className="text-[#1E293B]">{(i % 6) + 4}</strong></span>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Link
                      to="/departments/$slug"
                      params={{ slug }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0F4C81] py-2 text-xs font-bold text-[#FFFFFF] hover:bg-[#0A3A63] transition-colors shadow-xs"
                    >
                      Workspace <ExternalLink className="size-3" />
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedDept(d);
                        setActiveTab("Dashboard");
                      }}
                      className="rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-xs font-bold text-[#0F4C81] hover:bg-[#F1F5F9]"
                    >
                      Select
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      )}

      {activeTab === "Overview" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard className="p-6">
            <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-2">
              <ListChecks className="size-4.5 text-[#0F4C81]" /> Operational Tasks ({deptTasks.length})
            </h3>
            <ul className="mt-4 space-y-3">
              {deptTasks.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#1E293B] truncate">{t.task}</p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">Assigned: {t.assignee} · Due: {t.dueDate}</p>
                  </div>
                  <Pill tone={t.status === "Done" ? "success" : "warning"}>{t.status}</Pill>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-2">
              <CheckSquare className="size-4.5 text-[#0F4C81]" /> Pending Department Approvals ({deptApprovals.length})
            </h3>
            <ul className="mt-4 space-y-3">
              {deptApprovals.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#1E293B] truncate">{a.subject}</p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">Requested by {a.requester} · Value: {a.amount}</p>
                  </div>
                  <button className="rounded-lg bg-[#22C55E] px-3 py-1.5 text-xs font-bold text-[#FFFFFF] shadow-xs hover:bg-[#16A34A]">
                    Approve
                  </button>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      )}

      {activeTab === "Dashboard" && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard className="p-6">
              <h3 className="text-base font-bold text-[#1E293B] mb-4">{selectedDept} — Throughput & Operational Efficiency</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DEPT_PERFORMANCE}>
                    <CartesianGrid stroke="#E8EDF3" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                    <YAxis stroke="#64748B" fontSize={11} width={28} />
                    <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 12, color: "#1E293B" }} />
                    <Bar dataKey="throughput" fill="#0F4C81" radius={[4, 4, 0, 0]} name="Throughput %" />
                    <Bar dataKey="efficiency" fill="#0F4C81" radius={[4, 4, 0, 0]} name="Efficiency %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-base font-bold text-[#1E293B] mb-4">{selectedDept} — Department Status & AI Health</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#1E293B] mb-1.5">
                    <span>Task Completion Index</span>
                    <span className="text-[#0F4C81] font-extrabold num">94.2%</span>
                  </div>
                  <MeterBar value={94.2} tone="primary" />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#1E293B] mb-1.5">
                    <span>SOP & Regulatory Compliance</span>
                    <span className="text-[#22C55E] font-extrabold num">99.8%</span>
                  </div>
                  <MeterBar value={99.8} tone="success" />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#1E293B] mb-1.5">
                    <span>AI Copilot Adoption Rate</span>
                    <span className="text-[#0F4C81] font-extrabold num">86.5%</span>
                  </div>
                  <MeterBar value={86.5} tone="info" />
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {activeTab === "Tasks" && (
        <GlassCard className="p-6">
          <FilterTable
            rows={deptTasks as any[]}
            columns={[
              { key: "id", header: "ID", render: (r) => <span className="font-bold text-[#0F4C81]">{r.id}</span> },
              { key: "task", header: "Task Description", render: (r) => <span className="font-bold text-[#1E293B]">{r.task}</span> },
              { key: "assignee", header: "Assignee", render: (r) => <span className="text-[#64748B]">{r.assignee}</span> },
              { key: "priority", header: "Priority", render: (r) => <Pill tone={r.priority === "High" ? "danger" : "info"}>{r.priority}</Pill> },
              { key: "status", header: "Status", render: (r) => <Pill tone={r.status === "Done" ? "success" : "warning"}>{r.status}</Pill> },
            ]}
            searchKeys={["task", "assignee", "status"]}
            placeholder="Search operational tasks…"
          />
        </GlassCard>
      )}

      {activeTab === "Approvals" && (
        <GlassCard className="p-6">
          <FilterTable
            rows={deptApprovals as any[]}
            columns={[
              { key: "id", header: "ID", render: (r) => <span className="font-bold text-[#0F4C81]">{r.id}</span> },
              { key: "subject", header: "Subject", render: (r) => <span className="font-bold text-[#1E293B]">{r.subject}</span> },
              { key: "requester", header: "Requester", render: (r) => <span className="text-[#64748B]">{r.requester}</span> },
              { key: "amount", header: "Amount", render: (r) => <span className="font-bold text-[#1E293B]">{r.amount}</span> },
              { key: "status", header: "Status", render: (r) => <Pill tone="warning">{r.status}</Pill> },
            ]}
            searchKeys={["subject", "requester", "status"]}
            placeholder="Search pending approvals…"
          />
        </GlassCard>
      )}

      {activeTab === "Documents" && (
        <GlassCard className="p-6">
          <FilterTable
            rows={deptDocs as any[]}
            columns={[
              { key: "name", header: "Document Name", render: (r) => <span className="font-bold text-[#1E293B]">{r.name}</span> },
              { key: "type", header: "Type", render: (r) => <Pill tone="info">{r.type}</Pill> },
              { key: "updated", header: "Last Updated", render: (r) => <span className="text-[#64748B] num">{r.updated || r.effectiveDate || r.lastUpdated || "2 hours ago"}</span> },
            ]}
            searchKeys={["name", "type"]}
            placeholder="Search department documents…"
          />
        </GlassCard>
      )}

      {activeTab === "Knowledge" && (
        <GlassCard className="p-6">
          <FilterTable
            rows={deptPolicies as any[]}
            columns={[
              { key: "code", header: "SOP Code", render: (r) => <span className="font-bold text-[#0F4C81]">{r.code}</span> },
              { key: "title", header: "Document / Standard Title", render: (r) => <span className="font-bold text-[#1E293B]">{r.title}</span> },
              { key: "category", header: "Category", render: (r) => <Pill tone="warning">{r.category}</Pill> },
              { key: "complianceStandard", header: "Standard", render: (r) => <Pill tone="success">{r.complianceStandard}</Pill> },
            ]}
            searchKeys={["code", "title", "complianceStandard"]}
            placeholder={`Search ${selectedDept} SOPs, MSDS and policies…`}
          />
        </GlassCard>
      )}

      {activeTab === "Automation" && (
        <GlassCard className="p-6">
          <div className="grid gap-3.5 md:grid-cols-2">
            {deptAutomations.map((a) => (
              <div key={a.id} className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0F4C81]">{a.code}</span>
                  <Pill tone="success">{a.status}</Pill>
                </div>
                <p className="mt-2 text-sm font-bold text-[#1E293B]">{a.title}</p>
                <p className="mt-1 text-xs text-[#64748B]">{a.category} · ROI: {a.roi}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {activeTab === "AI Assistant" && (
        <GlassCard className="p-6">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-2">
              <Sparkles className="size-4.5 text-[#0F4C81]" /> {selectedDept} AI Assistant
            </h3>
            <p className="text-xs text-[#64748B]">Contextually grounded in {selectedDept}&apos;s KPIs, documents, SOPs, and open approvals.</p>
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs font-bold text-[#1E293B]">
              Ask any question or trigger operational workflows for the {selectedDept} department.
            </div>
          </div>
        </GlassCard>
      )}

      {activeTab === "Reports" && (
        <GlassCard className="p-6">
          <div className="space-y-3">
            {deptMIS.map((r, i) => (
              <div key={i} className="flex items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="size-5 text-[#0F4C81]" />
                  <div>
                    <p className="text-sm font-bold text-[#1E293B]">{r.title}</p>
                    <p className="text-xs text-[#64748B]">Department: {selectedDept} · Frequency: {r.frequency}</p>
                  </div>
                </div>
                <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#0F4C81] px-3.5 py-1.5 text-xs font-bold text-[#FFFFFF] shadow-sm hover:bg-[#0A3A63]">
                  <Download className="size-3.5" /> Export PDF
                </button>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {activeTab === "Analytics" && (
        <GlassCard className="p-6">
          <h3 className="text-base font-bold text-[#1E293B] mb-4">{selectedDept} — Operational Analytics & Yield Accuracy</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DEPT_PERFORMANCE}>
                <defs>
                  <linearGradient id="cyanGradOpt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F4C81" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#0F4C81" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#E8EDF3" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} width={32} />
                <Tooltip contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 12, color: "#1E293B" }} />
                <Area type="monotone" dataKey="accuracy" name="Accuracy %" stroke="#0F4C81" strokeWidth={3} fill="url(#cyanGradOpt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
