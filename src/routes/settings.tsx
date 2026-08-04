import { createFileRoute } from "@tanstack/react-router";
import { Settings, Sliders, Shield } from "lucide-react";
import { GlassCard, PageHeader, Pill } from "@/components/cc/primitives";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform & Governance"
        title="Platform Settings & Preferences"
        description="Configure system preferences, enterprise theme settings, notification webhooks, and chemical plant parameters."
        actions={<Pill tone="neutral">v4.2.0-enterprise</Pill>}
      />

      <GlassCard className="p-6">
        <div className="max-w-2xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-[#1E293B]">Enterprise Theme</h3>
            <p className="mt-1 text-xs text-[#64748B]">Active System Theme: Industrial Light Enterprise Theme</p>
          </div>
          <div className="space-y-4 pt-4 border-t border-[#E8EDF3]">
            <h3 className="text-base font-bold text-[#1E293B]">Notification Webhooks</h3>
            <div className="flex items-center justify-between rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] p-4">
              <div>
                <p className="text-sm font-bold text-[#1E293B]">Slack / Teams High-Risk Approvals</p>
                <p className="text-xs text-[#64748B]">Sends instant notifications for pending plant approvals &gt; $50k</p>
              </div>
              <Pill tone="success">Connected</Pill>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
