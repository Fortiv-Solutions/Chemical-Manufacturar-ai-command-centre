import { createFileRoute } from "@tanstack/react-router";
import { UserCheck, Shield, Users as UsersIcon } from "lucide-react";
import { GlassCard, PageHeader, Pill, StatCard } from "@/components/cc/primitives";

export const Route = createFileRoute("/users")({
  component: UsersPage,
});

function UsersPage() {
  const users = [
    { name: "R. Venkatesan", email: "r.venkatesan@chemcorp.com", role: "Chief Digital Officer", status: "Active" },
    { name: "Dr. Ananya Sharma", email: "a.sharma@chemcorp.com", role: "VP of Plant Operations", status: "Active" },
    { name: "Marcus Chen", email: "m.chen@chemcorp.com", role: "Lead Process Automation Engineer", status: "Active" },
    { name: "Sarah Jenkins", email: "s.jenkins@chemcorp.com", role: "Regulatory Compliance Director", status: "Active" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform & Governance"
        title="User Management & RBAC"
        description="Role-based access control, Single Sign-On (SSO), and Multi-Factor Authentication (MFA) enforcement."
        actions={<Pill tone="success">SSO & MFA Enforced</Pill>}
      />

      <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
        <StatCard label="Total Enterprise Users" value="1,240" delta={4.2} />
        <StatCard label="Active Sessions" value="382" delta={8.1} />
        <StatCard label="MFA Compliance" value="100%" delta={0} />
        <StatCard label="Security Roles" value="18" delta={0} />
      </div>

      <GlassCard className="p-6">
        <div className="space-y-3">
          {users.map((u, i) => (
            <div key={i} className="flex items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-full bg-[#0F4C81] text-[#FFFFFF] text-xs font-bold">
                  {u.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1E293B]">{u.name}</p>
                  <p className="text-xs text-[#64748B]">{u.email} · {u.role}</p>
                </div>
              </div>
              <Pill tone="success">{u.status}</Pill>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
