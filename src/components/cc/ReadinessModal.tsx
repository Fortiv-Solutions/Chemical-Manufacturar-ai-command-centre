import { useState, useEffect } from "react";
import { X, Sparkles, CheckCircle2, Shield, Calendar, Building2, Send, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ReadinessModal({
  open,
  onClose,
  type = "assessment",
}: {
  open: boolean;
  onClose: () => void;
  type?: "assessment" | "demo";
}) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "R. Venkatesan",
    role: "Chief Digital Officer",
    company: "ChemCorp Specialty Chemicals Ltd.",
    email: "r.venkatesan@chemcorp.com",
    plantLocation: "Vadodara Cluster",
    modules: ["Procurement Copilot", "Quality & Compliance", "SDS/MSDS Retrieval"],
  });

  useEffect(() => {
    if (open) setSubmitted(false);
  }, [open]);

  if (!open) return null;

  const isAssessment = type === "assessment";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B1F4D]/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-6 md:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full p-2 text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0B1F4D] transition-colors"
          >
            <X className="size-5" />
          </button>

          {!submitted ? (
            <div>
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-2xl bg-[#0B1F4D] text-white">
                  {isAssessment ? <Sparkles className="size-6 text-[#147A7E]" /> : <Calendar className="size-6 text-[#10B981]" />}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#147A7E]">
                    Fortiv Executive Experience
                  </span>
                  <h2 className="text-xl font-extrabold tracking-tight text-[#0B1F4D]">
                    {isAssessment ? "Book AI Readiness Assessment" : "Schedule Executive Demo"}
                  </h2>
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-[#64748B]">
                {isAssessment
                  ? "Evaluate your chemical manufacturing plant's automation readiness across procurement, quality, batch records, and compliance in a 45-minute executive briefing."
                  : "Experience a live walkthrough of Fortiv Chemical AI OS with your actual ERP, LIMS, and SDS document structures."}
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="mt-6 space-y-4"
              >
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F4D]">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2 text-xs font-semibold text-[#0B1F4D] outline-none focus:border-[#0B1F4D] focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F4D]">Executive Title</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2 text-xs font-semibold text-[#0B1F4D] outline-none focus:border-[#0B1F4D] focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F4D]">Enterprise Name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2 text-xs font-semibold text-[#0B1F4D] outline-none focus:border-[#0B1F4D] focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#0B1F4D]">Plant Location / Cluster</label>
                    <select
                      value={formData.plantLocation}
                      onChange={(e) => setFormData({ ...formData, plantLocation: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2 text-xs font-semibold text-[#0B1F4D] outline-none focus:border-[#0B1F4D] focus:bg-white cursor-pointer"
                    >
                      <option value="Vadodara Cluster">🏭 Vadodara Specialty Cluster</option>
                      <option value="Dahej Petrochemical Hub">🏭 Dahej Petrochemical Hub</option>
                      <option value="Hazira Polymers Plant">🏭 Hazira Polymers Plant</option>
                      <option value="Ankleshwar Pharma Intermediates">🏭 Ankleshwar Pharma Intermediates</option>
                      <option value="Multi-Plant Enterprise">🏢 Multi-Plant Enterprise</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#0B1F4D]">Executive Priority Areas</label>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    {[
                      "Procurement Cycle Reduction",
                      "SDS/MSDS & Regulatory Filing",
                      "COA & Batch Document Extraction",
                      "Customer Complaint Analysis",
                      "ERP/LIMS Software Integration",
                      "Zero Hardware AI Deployment",
                    ].map((item) => (
                      <label
                        key={item}
                        className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-2.5 hover:border-[#0B1F4D] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          defaultChecked={formData.modules.includes(item) || true}
                          className="rounded border-[#E2E8F0] text-[#0B1F4D] focus:ring-0"
                        />
                        <span className="text-[11px] font-semibold text-[#0B1F4D]">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 flex items-center gap-3">
                  <Shield className="size-5 shrink-0 text-[#147A7E]" />
                  <p className="text-[10.5px] leading-snug text-[#64748B]">
                    <strong>Software-only AI Assurance</strong>: Fortiv solution integrates directly via secure API with SAP, Oracle, LIMS, and Microsoft 365. No IoT, SCADA, or physical sensors required.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#0B1F4D] py-3.5 text-xs font-bold text-white hover:bg-[#071536] shadow-lg transition-all"
                >
                  {isAssessment ? "Confirm Readiness Briefing Request" : "Schedule Live Demo Session"}
                  <ArrowRight className="size-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#10B981]/10 text-[#10B981]">
                <CheckCircle2 className="size-10" />
              </div>
              <h3 className="text-xl font-extrabold text-[#0B1F4D]">Request Confirmed</h3>
              <p className="max-w-md mx-auto text-xs leading-relaxed text-[#64748B]">
                Thank you, {formData.name}. A Fortiv Enterprise AI Specialist has been assigned to prepare the custom Chemical AI Readiness Briefing for <strong>{formData.company}</strong> ({formData.plantLocation}).
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="rounded-xl bg-[#0B1F4D] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#071536] transition-all"
                >
                  Return to AI Command Center
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
