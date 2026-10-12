import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PageNode } from "@/data/sitemap";
import { flatten } from "@/data/sitemap";
import { PriorityBadge, StatusChip, TypeChip } from "./badges";

interface Props {
  root: PageNode;
  selectedId: string;
  onSelect: (id: string) => void;
  variant: "proposed" | "improved";
}

export function NodeTree({ root, selectedId, onSelect, variant }: Props) {
  const flat = useMemo(() => flatten([root]), [root]);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const visible = useMemo(
    () =>
      flat.filter((node) => !node.path.slice(0, -1).some((ancestor) => collapsed.has(ancestor))),
    [flat, collapsed],
  );

  const toggle = (id: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const counts = useMemo(() => {
    const total = flat.length;
    const p0 = flat.filter((n) => n.priority === "P0").length;
    const problem = flat.filter((n) => n.status === "problem").length;
    const added = flat.filter((n) => n.status === "new").length;
    return { total, p0, problem, added };
  }, [flat]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-ink-soft">
        <span>
          Сторінок: <strong className="font-semibold text-forest-deep">{counts.total}</strong>
        </span>
        <span>
          Критичних (P0): <strong className="font-semibold text-forest-deep">{counts.p0}</strong>
        </span>
        {variant === "proposed" ? (
          <span>
            Проблемних: <strong className="font-semibold text-terracotta">{counts.problem}</strong>
          </span>
        ) : (
          <span>
            Нових: <strong className="font-semibold text-forest-deep">{counts.added}</strong>
          </span>
        )}
      </div>

      <div className="scrollbar-slim max-h-[62vh] overflow-y-auto pr-1">
        <ul className="space-y-1">
          {visible.map((node) => {
            const hasChildren = Boolean(node.children?.length);
            const isCollapsed = collapsed.has(node.id);
            const selected = node.id === selectedId;
            const dimmed = node.status === "problem" && variant === "proposed";

            return (
              <li key={node.id} className="relative">
                <div
                  className="flex items-stretch"
                  style={{ paddingLeft: `${node.depth * 20}px` }}
                >
                  {node.depth > 0 && (
                    <span
                      aria-hidden
                      className={cn(
                        "mr-2 w-px shrink-0",
                        dimmed ? "bg-terracotta/40" : "bg-sage/70",
                      )}
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => (hasChildren ? toggle(node.id) : undefined)}
                    aria-label={hasChildren ? "Згорнути гілку" : "Немає підсторінок"}
                    className={cn(
                      "mt-2.5 grid size-4 shrink-0 place-items-center rounded transition-colors",
                      hasChildren ? "text-ink-soft hover:bg-sage-light hover:text-forest-deep" : "opacity-0",
                    )}
                  >
                    <ChevronRight className={cn("size-3.5 transition-transform", !isCollapsed && "rotate-90")} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelect(node.id)}
                    className={cn(
                      "group ml-1.5 flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border px-3 py-2 text-left transition-all",
                      selected
                        ? "border-forest/40 bg-white shadow-[0_1px_0_rgba(31,82,54,0.08),0_8px_24px_-16px_rgba(28,20,9,0.35)]"
                        : "border-transparent hover:border-hairline hover:bg-white/70",
                    )}
                  >
                    <PriorityBadge value={node.priority} />
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block truncate text-[13.5px] font-semibold",
                          dimmed ? "text-terracotta" : "text-ink",
                          selected && "text-forest-deep",
                        )}
                      >
                        {node.title}
                      </span>
                      <span className="mt-0.5 block truncate font-mono text-[11px] text-ink-soft">{node.url}</span>
                    </span>
                    <span className="hidden shrink-0 items-center gap-1.5 xl:flex">
                      <TypeChip value={node.type} />
                      <StatusChip value={node.status} />
                    </span>
                    {hasChildren && (
                      <span className="shrink-0 rounded-full bg-parchment px-1.5 py-0.5 text-[10px] font-semibold text-ink-soft">
                        {node.children?.length}
                      </span>
                    )}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-hairline pt-3 text-[10.5px] text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-forest" /> P0 — критичний шлях
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-sage" /> P1 — важливо
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-hairline" /> P2 — службове
        </span>
      </div>
    </div>
  );
}
