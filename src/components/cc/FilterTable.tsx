import { useMemo, useState, type ReactNode } from "react";
import { Search } from "lucide-react";
import { GlassCard } from "@/components/cc/primitives";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string | undefined;
}

export function FilterTable<T extends object>({
  rows,
  columns,
  searchKeys,
  facets,
  placeholder = "Search enterprise records…",
  pageSize = 14,
  toolbar,
}: {
  rows: T[];
  columns: Column<T>[];
  searchKeys: Array<keyof T>;
  facets?: Array<{ label: string; key: keyof T; options: string[] }> | undefined;
  placeholder?: string;
  pageSize?: number;
  toolbar?: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchQ =
        !q ||
        searchKeys.some((k) =>
          String(row[k] ?? "")
            .toLowerCase()
            .includes(q),
        );
      const matchF = Object.entries(filters).every(
        ([k, v]) => !v || String(row[k as keyof T] ?? "") === v,
      );
      return matchQ && matchF;
    });
  }, [rows, query, filters, searchKeys]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages - 1);
  const slice = filtered.slice(current * pageSize, current * pageSize + pageSize);

  return (
    <GlassCard className="p-0 overflow-hidden border border-[#D9E2EC] bg-[#FFFFFF] shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
      <div className="flex flex-wrap items-center gap-3 border-b border-[#D9E2EC] bg-[#F8FAFC] p-3.5">
        <div className="flex h-9.5 min-w-56 flex-1 items-center gap-2.5 rounded-full border border-[#D9E2EC] bg-[#FFFFFF] px-3.5 focus-within:border-[#00B8D9] focus-within:ring-1 focus-within:ring-[#00B8D9]/30">
          <Search className="size-4 text-[#00B8D9]" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder={placeholder}
            className="w-full bg-transparent text-[13px] text-[#1E293B] outline-none placeholder:text-[#64748B]"
          />
        </div>
        {facets?.map((f) => (
          <select
            key={String(f.key)}
            aria-label={f.label}
            value={filters[String(f.key)] ?? ""}
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, [String(f.key)]: e.target.value }));
              setPage(0);
            }}
            className="h-9.5 rounded-lg border border-[#D9E2EC] bg-[#FFFFFF] px-3 text-[13px] font-bold text-[#1E293B] outline-none hover:border-[#00B8D9] cursor-pointer"
          >
            <option value="" className="bg-[#FFFFFF]">All {f.label}</option>
            {f.options.map((o) => (
              <option key={o} value={o} className="bg-[#FFFFFF]">
                {o}
              </option>
            ))}
          </select>
        ))}
        {toolbar}
        <span className="num ml-auto text-xs font-bold text-[#64748B]">
          {filtered.length.toLocaleString("en-US")} items
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-[13px]">
          <thead className="sticky top-0 z-10 bg-[#F8FAFC] border-b border-[#D9E2EC]">
            <tr className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#0F4C81]">
              {columns.map((c) => (
                <th key={c.key} className={cn("px-5 py-3.5 font-bold", c.className)}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8EDF3]">
            {slice.map((row, i) => (
              <tr
                key={i}
                className="transition-colors hover:bg-[#EBF8FA]"
              >
                {columns.map((c) => (
                  <td key={c.key} className={cn("px-5 py-3.5 align-middle text-[#1E293B] font-medium", c.className)}>
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))}
            {slice.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-[#64748B] font-semibold">
                  No records found matching current query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-between gap-3 border-t border-[#D9E2EC] bg-[#F8FAFC] p-3.5 text-xs text-[#64748B]">
          <span className="num font-bold">
            Page {current + 1} of {pages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(0, current - 1))}
              disabled={current === 0}
              className="rounded-lg border border-[#D9E2EC] bg-[#FFFFFF] px-3 py-1.5 font-bold text-[#1E293B] transition-colors hover:bg-[#F1F5F9] disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(Math.min(pages - 1, current + 1))}
              disabled={current >= pages - 1}
              className="rounded-lg border border-[#D9E2EC] bg-[#FFFFFF] px-3 py-1.5 font-bold text-[#1E293B] transition-colors hover:bg-[#F1F5F9] disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
