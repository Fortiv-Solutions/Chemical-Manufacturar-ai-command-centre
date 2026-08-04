import { useState, useEffect, useRef } from "react";
import { Sparkles, X, Send, Bot, User, Trash2, ArrowRight, CornerDownLeft, RefreshCw, CheckCircle2, FileText, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { Pill } from "@/components/cc/primitives";

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  citations?: string[];
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "m-1",
    sender: "ai",
    text: "Hello R. Venkatesan! I'm your ChemCorp AI Assistant, grounded in real-time telemetry across 39 chemical manufacturing office functions, 58 AI agents, and 1.4M indexed SOP/LIMS documents. How can I assist you today?",
    timestamp: "Just now",
    citations: ["SAP S/4HANA", "Company Brain Vector Store"],
  },
];

const SUGGESTED_PROMPTS = [
  "Summarise active CAPA deviations for Q3",
  "Check Ethylene Glycol reactor inventory",
  "What is our annualised cost savings rate?",
  "Draft supplier RFQ for High-Purity Solvents",
];

export function AIChatDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      }, 100);
    }
  }, [messages, open, isTyping]);

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || input).trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: q,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Simulate intelligent AI response
    setTimeout(() => {
      let responseText = "";
      let citations: string[] = [];

      const lower = q.toLowerCase();
      if (lower.includes("capa") || lower.includes("deviation")) {
        responseText = "Current CAPA status across units:\n• **CAPA-402 (Quality)**: Root-cause identified for reactor R-102 temperature overshoot. CAPA closure sign-off pending.\n• **CAPA-408 (Regulatory)**: REACH SDS hazard classification update completed.\n• **Total Open CAPAs**: 4 (down from 12 last month).";
        citations = ["LIMS System", "SOP-QUAL-001", "QMS Portal"];
      } else if (lower.includes("ethylene") || lower.includes("inventory") || lower.includes("stock")) {
        responseText = "Real-time Ethylene Glycol telemetry:\n• **Current Stock**: 42,800 Litres (84% tank capacity)\n• **Reorder Threshold**: 15,000 Litres\n• **Consumable Rate**: 2,100 L/day\n• **Estimated Run-out**: 20.4 Days\n• **Supplier PO**: PO-8902 in transit (expected Thursday).";
        citations = ["SAP Inventory Module", "IoT Reactor Tank Gauge"];
      } else if (lower.includes("saving") || lower.includes("roi") || lower.includes("cost")) {
        responseText = "Programme Financial Telemetry (YTD FY26):\n• **Annualised Savings**: $46.8M (Target: $50M)\n• **Cumulative ROI**: 412%\n• **Hours Saved YTD**: 482,400 hours across 39 departments\n• **FTE Equivalent Redeployed**: 246 staff members.";
        citations = ["Executive MIS Cube", "ERP Financial Ledger"];
      } else if (lower.includes("rfq") || lower.includes("solvent") || lower.includes("supplier")) {
        responseText = "Drafted Supplier RFQ Packet for **High-Purity Solvents (Grade A)**:\n• **Specification**: ASTM E300 Purity >= 99.8%\n• **Volume**: 12,000 MT per annum\n• **Target Vendor List**: 5 REACH-compliant suppliers identified by Vendor Agent.\n• Ready to dispatch to Procurement approval queue.";
        citations = ["TDS-PROD-304", "Vendor Intelligence DB"];
      } else {
        responseText = `Understood. Analyzing "${q}" across ChemCorp enterprise data...\n\nBased on index scan across 39 departments:\n• **Relevant SOPs**: Found 3 matching control procedures\n• **Workflow Status**: No active blocking exceptions detected\n• **Recommendation**: Proceed with standard operational protocol.`;
        citations = ["Company Brain Vector Index", "REST API Telemetry"];
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: responseText,
        timestamp: "Just now",
        citations,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-[#E2E8F0] bg-white shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-[#F8FAFC] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-xl bg-[#0F4C81] text-white">
              <Sparkles className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-extrabold text-[#1E293B]">Company AI Assistant</h2>
                <span className="flex size-2 rounded-full bg-[#22C55E]" />
              </div>
              <p className="text-[11px] font-semibold text-[#147A7E]">
                39 Departments · Telemetry Synced
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setMessages(INITIAL_MESSAGES)}
              title="Clear Chat History"
              className="rounded-lg p-2 text-[#64748B] hover:bg-[#F0F4F8] hover:text-[#1E293B] transition-colors"
            >
              <Trash2 className="size-4" />
            </button>
            <button
              onClick={onClose}
              title="Close Assistant"
              className="rounded-lg p-2 text-[#64748B] hover:bg-[#F0F4F8] hover:text-[#1E293B] transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#F5F7FA]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3 max-w-[90%]",
                msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto",
              )}
            >
              <div
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold",
                  msg.sender === "user"
                    ? "bg-[#0F4C81] text-white"
                    : "bg-[#147A7E] text-white",
                )}
              >
                {msg.sender === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
              </div>
              <div
                className={cn(
                  "rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs",
                  msg.sender === "user"
                    ? "bg-[#0F4C81] text-white rounded-tr-none"
                    : "bg-white text-[#1E293B] border border-[#E2E8F0] rounded-tl-none",
                )}
              >
                <div className="whitespace-pre-wrap font-medium">{msg.text}</div>
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-[#E2E8F0] flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase">Citations:</span>
                    {msg.citations.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-1 rounded-md bg-[#EBF1F8] px-2 py-0.5 text-[10px] font-bold text-[#0F4C81]"
                      >
                        <Database className="size-2.5" /> {c}
                      </span>
                    ))}
                  </div>
                )}
                <span
                  className={cn(
                    "mt-1.5 block text-[10px] opacity-70 num text-right",
                    msg.sender === "user" ? "text-white" : "text-[#64748B]",
                  )}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 mr-auto items-center">
              <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#147A7E] text-white">
                <Bot className="size-4" />
              </div>
              <div className="rounded-2xl bg-white border border-[#E2E8F0] px-4 py-3 text-xs text-[#64748B] flex items-center gap-2">
                <RefreshCw className="size-3.5 animate-spin text-[#0F4C81]" />
                <span className="font-semibold">Querying ChemCorp telemetry & vector brain…</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        {messages.length < 4 && (
          <div className="border-t border-[#E2E8F0] bg-white p-3">
            <p className="px-1 text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-2">
              Suggested Questions
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSend(p)}
                  className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1.5 text-[11px] font-semibold text-[#1E293B] hover:border-[#0F4C81] hover:bg-[#EBF1F8] hover:text-[#0F4C81] transition-all text-left"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-[#E2E8F0] bg-white p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about plant ops, SOPs, SAP data…"
              className="flex-1 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-xs text-[#1E293B] outline-none focus:border-[#0F4C81] focus:bg-white focus:ring-1 focus:ring-[#0F4C81]/30 transition-all placeholder:text-[#94A3B8]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="grid size-10 place-items-center rounded-xl bg-[#0F4C81] text-white transition-all hover:bg-[#0A3A63] disabled:opacity-40 shrink-0"
            >
              <Send className="size-4" />
            </button>
          </form>
          <p className="mt-2 text-center text-[10px] text-[#94A3B8]">
            Grounded in ISO 9001, REACH protocols & live plant IoT telemetry
          </p>
        </div>
      </div>
    </div>
  );
}
