import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Building2, Search, Star, Clock, ChevronDown, Globe, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEPT_PROFILES } from "@/lib/command-center-data";

/* ─── Department Groups by Business Function ─── */
const DEPT_GROUPS: Record<string, string[]> = {
  "Executive": ["Executive Office"],
  "Operations": ["Production Planning", "Supply Chain", "Warehouse", "Logistics", "Import", "Export", "Planning"],
  "Quality & Regulatory": ["Quality Assurance", "Quality Control", "Regulatory Affairs", "Compliance", "ISO"],
  "Finance & Admin": ["Finance", "Accounts", "Procurement", "Purchase", "Administration"],
  "Commercial": ["Sales", "Marketing", "Customer Service", "Business Development"],
  "HR & Training": ["HR", "Training"],
  "Engineering & R&D": ["Engineering Documentation", "Maintenance Documentation", "Laboratory Documentation", "Technical Services", "R&D"],
  "Legal & Governance": ["Legal", "Internal Audit", "Board & Governance", "Corporate Strategy"],
  "Support & Technology": ["IT", "Knowledge Management", "Document Control", "Shared Services", "Vendor Management", "Project Management"],
};

const STORAGE_KEY_FAV = "dept-favorites";
const STORAGE_KEY_RECENT = "dept-recent";

function loadFromStorage(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(key: string, value: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* noop */
  }
}

interface DepartmentSelectorProps {
  selected: string;
  onSelect: (dept: string) => void;
}

export function DepartmentSelector({ selected, onSelect }: DepartmentSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [focusIndex, setFocusIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Load persisted data
  useEffect(() => {
    setFavorites(loadFromStorage(STORAGE_KEY_FAV));
    setRecent(loadFromStorage(STORAGE_KEY_RECENT));
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Focus search on open
  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 50);
      setFocusIndex(-1);
      setSearch("");
    }
  }, [open]);

  const toggleFavorite = useCallback((dept: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept];
      saveToStorage(STORAGE_KEY_FAV, next);
      return next;
    });
  }, []);

  const handleSelect = useCallback((dept: string) => {
    onSelect(dept);
    setOpen(false);
    if (dept !== "Enterprise Overview") {
      setRecent((prev) => {
        const next = [dept, ...prev.filter((d) => d !== dept)].slice(0, 5);
        saveToStorage(STORAGE_KEY_RECENT, next);
        return next;
      });
    }
  }, [onSelect]);

  // Filter departments
  const filteredGroups = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return DEPT_GROUPS;
    const result: Record<string, string[]> = {};
    for (const [group, depts] of Object.entries(DEPT_GROUPS)) {
      const matched = depts.filter((d) => d.toLowerCase().includes(q));
      if (matched.length > 0) result[group] = matched;
    }
    return result;
  }, [search]);

  // Build flat list for keyboard navigation
  const flatItems = useMemo(() => {
    const items: string[] = ["Enterprise Overview"];
    if (search) {
      for (const depts of Object.values(filteredGroups)) items.push(...depts);
    } else {
      // Favorites first
      const favDepts = favorites.filter((f) =>
        DEPT_PROFILES.some((d) => d.name === f)
      );
      items.push(...favDepts);
      // Recent
      const recentDepts = recent.filter(
        (r) => !favDepts.includes(r) && DEPT_PROFILES.some((d) => d.name === r)
      );
      items.push(...recentDepts);
      // All groups
      for (const depts of Object.values(DEPT_GROUPS)) {
        items.push(...depts.filter((d) => !items.includes(d)));
      }
    }
    return items;
  }, [search, filteredGroups, favorites, recent]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusIndex((i) => Math.min(i + 1, flatItems.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && focusIndex >= 0 && focusIndex < flatItems.length) {
        e.preventDefault();
        handleSelect(flatItems[focusIndex]);
      }
    },
    [open, focusIndex, flatItems, handleSelect],
  );

  const deptAgentCount = useCallback((name: string) => {
    return DEPT_PROFILES.find((d) => d.name === name)?.agents ?? 0;
  }, []);

  const isEnterprise = selected === "Enterprise Overview";

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2.5 rounded-xl border bg-white px-4 py-2.5 text-left transition-all duration-200",
          open
            ? "border-[#0F4C81] shadow-[0_0_0_3px_rgba(15,76,129,0.1)]"
            : "border-[#E2E8F0] hover:border-[#0F4C81]/40 hover:shadow-sm",
        )}
      >
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#EBF1F8]">
          {isEnterprise ? (
            <Globe className="size-3.5 text-[#0F4C81]" />
          ) : (
            <Building2 className="size-3.5 text-[#0F4C81]" />
          )}
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-bold text-[#1E293B] truncate max-w-[180px]">{selected}</p>
          <p className="text-[10px] font-medium text-[#64748B]">{DEPT_PROFILES.length} Departments</p>
        </div>
        <ChevronDown
          className={cn(
            "size-4 text-[#64748B] transition-transform duration-200 ml-1",
            open && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 top-full mt-2 z-50 w-[340px] rounded-[14px] border border-[#E2E8F0] bg-white shadow-[0_10px_40px_-8px_rgba(15,23,42,0.12),0_4px_12px_rgba(15,23,42,0.05)] animate-in fade-in-0 slide-in-from-top-2 duration-200"
        >
          {/* Sticky Search */}
          <div className="sticky top-0 z-10 border-b border-[#E2E8F0] bg-white rounded-t-[14px] px-3 py-2.5">
            <div className="flex items-center gap-2 rounded-lg bg-[#F5F7FA] px-3 py-2">
              <Search className="size-3.5 text-[#64748B] shrink-0" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search departments..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setFocusIndex(-1);
                }}
                className="flex-1 bg-transparent text-[13px] text-[#1E293B] placeholder:text-[#94A3B8] outline-none"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-[#94A3B8] hover:text-[#64748B]">
                  <X className="size-3" />
                </button>
              )}
            </div>
          </div>

          {/* Scrollable List */}
          <div ref={listRef} className="max-h-[420px] overflow-y-auto py-2">
            {/* Enterprise Overview */}
            <div className="px-2 mb-1">
              <button
                onClick={() => handleSelect("Enterprise Overview")}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                  selected === "Enterprise Overview"
                    ? "bg-[#EBF1F8] text-[#0F4C81]"
                    : "hover:bg-[#F0F4F8]",
                  focusIndex === 0 && "ring-2 ring-[#0F4C81]/20",
                )}
              >
                <Globe className="size-4 text-[#0F4C81]" />
                <span className="text-[13px] font-bold">Enterprise Overview</span>
                <span className="ml-auto text-[10px] font-semibold text-[#64748B]">All</span>
              </button>
            </div>

            {/* Favorites Section */}
            {!search && favorites.length > 0 && (
              <>
                <div className="px-5 pt-2 pb-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#F59E0B] flex items-center gap-1.5">
                    <Star className="size-3 fill-[#F59E0B]" /> Favorites
                  </p>
                </div>
                <div className="px-2">
                  {favorites
                    .filter((f) => DEPT_PROFILES.some((d) => d.name === f))
                    .map((dept) => (
                      <DeptItem
                        key={`fav-${dept}`}
                        name={dept}
                        agents={deptAgentCount(dept)}
                        isSelected={selected === dept}
                        isFavorite={true}
                        isFocused={flatItems[focusIndex] === dept}
                        onSelect={() => handleSelect(dept)}
                        onToggleFavorite={(e) => toggleFavorite(dept, e)}
                      />
                    ))}
                </div>
              </>
            )}

            {/* Recent Section */}
            {!search && recent.length > 0 && (
              <>
                <div className="px-5 pt-3 pb-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
                    <Clock className="size-3" /> Recently Viewed
                  </p>
                </div>
                <div className="px-2">
                  {recent
                    .filter(
                      (r) =>
                        !favorites.includes(r) &&
                        DEPT_PROFILES.some((d) => d.name === r),
                    )
                    .map((dept) => (
                      <DeptItem
                        key={`recent-${dept}`}
                        name={dept}
                        agents={deptAgentCount(dept)}
                        isSelected={selected === dept}
                        isFavorite={favorites.includes(dept)}
                        isFocused={flatItems[focusIndex] === dept}
                        onSelect={() => handleSelect(dept)}
                        onToggleFavorite={(e) => toggleFavorite(dept, e)}
                      />
                    ))}
                </div>
              </>
            )}

            {/* Grouped Departments */}
            {Object.entries(filteredGroups).map(([group, depts]) => (
              <div key={group}>
                <div className="px-5 pt-3 pb-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    {group}
                  </p>
                </div>
                <div className="px-2">
                  {depts.map((dept) => (
                    <DeptItem
                      key={dept}
                      name={dept}
                      agents={deptAgentCount(dept)}
                      isSelected={selected === dept}
                      isFavorite={favorites.includes(dept)}
                      isFocused={flatItems[focusIndex] === dept}
                      onSelect={() => handleSelect(dept)}
                      onToggleFavorite={(e) => toggleFavorite(dept, e)}
                    />
                  ))}
                </div>
              </div>
            ))}

            {Object.keys(filteredGroups).length === 0 && search && (
              <p className="px-5 py-6 text-center text-[13px] text-[#94A3B8]">
                No departments matching "{search}"
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Department Item ─── */
function DeptItem({
  name,
  agents,
  isSelected,
  isFavorite,
  isFocused,
  onSelect,
  onToggleFavorite,
}: {
  name: string;
  agents: number;
  isSelected: boolean;
  isFavorite: boolean;
  isFocused: boolean;
  onSelect: () => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-all duration-150 group",
        isSelected
          ? "bg-[#EBF1F8] text-[#0F4C81]"
          : "text-[#1E293B] hover:bg-[#F0F4F8]",
        isFocused && "ring-2 ring-[#0F4C81]/20",
      )}
    >
      <Building2
        className={cn(
          "size-3.5 shrink-0",
          isSelected ? "text-[#0F4C81]" : "text-[#94A3B8]",
        )}
      />
      <span className="flex-1 truncate text-[13px] font-medium">{name}</span>
      {agents > 0 && (
        <span className="text-[10px] font-semibold bg-[#EBF1F8] text-[#0F4C81] rounded-full px-2 py-0.5">
          {agents}
        </span>
      )}
      <button
        onClick={onToggleFavorite}
        className={cn(
          "shrink-0 opacity-0 group-hover:opacity-100 transition-opacity",
          isFavorite && "opacity-100",
        )}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Star
          className={cn(
            "size-3.5 transition-colors",
            isFavorite
              ? "text-[#F59E0B] fill-[#F59E0B]"
              : "text-[#CBD5E1] hover:text-[#F59E0B]",
          )}
        />
      </button>
    </button>
  );
}

export default DepartmentSelector;
