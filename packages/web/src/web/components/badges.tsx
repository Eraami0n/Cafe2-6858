import { cn } from "@/lib/utils";
import type { NodeStatus, PageType, Priority } from "@/data/sitemap";
import { STATUS_LABEL, TYPE_LABEL } from "@/data/sitemap";
import type { Severity } from "@/data/audit";
import { SEVERITY_LABEL } from "@/data/audit";

export function PriorityBadge({ value, className }: { value: Priority; className?: string }) {
  const tone =
    value === "P0"
      ? "bg-forest text-cream"
      : value === "P1"
        ? "bg-sage text-forest-deep"
        : "bg-parchment text-ink-soft border border-hairline";
  return (
    <span
      className={cn(
        "inline-flex h-5 shrink-0 items-center rounded-full px-2 text-[10px] font-semibold tracking-[0.08em]",
        tone,
        className,
      )}
    >
      {value}
    </span>
  );
}

export function TypeChip({ value, className }: { value: PageType; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-full border border-hairline bg-white/70 px-2 text-[10px] font-medium text-ink-soft",
        className,
      )}
    >
      {TYPE_LABEL[value]}
    </span>
  );
}

export function StatusChip({ value }: { value: NodeStatus }) {
  const tone: Record<NodeStatus, string> = {
    kept: "text-ink-soft bg-parchment",
    new: "text-forest-deep bg-sage-light",
    changed: "text-bark bg-[#f3e6d5]",
    problem: "text-terracotta bg-[#f7e4d8]",
    removed: "text-ink-soft bg-parchment line-through",
  };
  return (
    <span className={cn("inline-flex h-5 items-center rounded-full px-2 text-[10px] font-semibold", tone[value])}>
      {STATUS_LABEL[value]}
    </span>
  );
}

export function SeverityChip({ value }: { value: Severity }) {
  const tone: Record<Severity, string> = {
    critical: "bg-forest text-cream",
    high: "bg-terracotta text-cream",
    medium: "bg-parchment text-ink-soft border border-hairline",
  };
  return (
    <span className={cn("inline-flex h-5 items-center rounded-full px-2 text-[10px] font-semibold uppercase tracking-wide", tone[value])}>
      {SEVERITY_LABEL[value]}
    </span>
  );
}

export function SegmentChip({ value }: { value: string }) {
  const map: Record<string, { label: string; tone: string }> = {
    daily: { label: "Daily Regular", tone: "border-forest/25 text-forest-deep bg-white/70" },
    occasion: { label: "Occasion Buyer", tone: "border-bark/30 text-bark bg-white/70" },
    all: { label: "Усі сегменти", tone: "border-hairline text-ink-soft bg-white/60" },
  };
  const item = map[value] ?? { label: value, tone: "border-hairline text-ink-soft bg-white/60" };
  return (
    <span className={cn("inline-flex h-5 items-center rounded-full border px-2 text-[10px] font-medium", item.tone)}>
      {item.label}
    </span>
  );
}

export function Url({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <code
      className={cn(
        "rounded-md border border-hairline bg-white/80 px-1.5 py-0.5 font-mono text-[11px] text-forest-deep",
        className,
      )}
    >
      {children}
    </code>
  );
}
