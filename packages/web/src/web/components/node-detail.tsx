import { AlertTriangle, ArrowDownRight, ArrowUpRight, Info, Layers, Target, User } from "lucide-react";
import type { PageNode } from "@/data/sitemap";
import { TYPE_LABEL, flatten } from "@/data/sitemap";
import { PriorityBadge, SegmentChip, StatusChip, TypeChip } from "./badges";

interface Props {
  node: PageNode;
  root: PageNode;
  variant: "proposed" | "improved";
  onSelect: (id: string) => void;
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-hairline px-5 py-4 first:border-t-0">
      <h4 className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
        {icon}
        {title}
      </h4>
      {children}
    </section>
  );
}

export function NodeDetail({ node, root, variant, onSelect }: Props) {
  const flat = flatten([root]);
  const self = flat.find((n) => n.id === node.id);
  const depth = self?.depth ?? 0;
  const chain = self?.path.map((id) => flat.find((n) => n.id === id)?.title ?? id) ?? [];

  return (
    <div key={node.id} className="reveal overflow-hidden rounded-2xl border border-hairline bg-white/70">
      <div className="bg-forest px-5 py-4 text-cream">
        <div className="mb-2 flex items-center gap-2">
          <PriorityBadge value={node.priority} className="bg-cream/20 text-cream" />
          <TypeChip value={node.type} className="border-cream/25 bg-cream/10 text-cream/90" />
          <StatusChip value={node.status} />
        </div>
        <h3 className="font-display text-[22px] leading-tight text-cream">{node.title}</h3>
        <code className="mt-1 block font-mono text-[12px] text-cream/75">{node.url}</code>
        <p className="mt-3 text-[11px] text-cream/70">
          {chain.join(" → ")} · рівень {depth}
        </p>
      </div>

      <Section icon={<Target className="size-3.5" />} title="Мета користувача">
        <p className="text-[13.5px] leading-relaxed text-ink">{node.goal}</p>
      </Section>

      <Section icon={<Info className="size-3.5" />} title="Призначення сторінки">
        <p className="text-[13px] leading-relaxed text-ink-soft">{node.purpose}</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {node.segments.map((s) => (
            <SegmentChip key={s} value={s} />
          ))}
        </div>
      </Section>

      <Section icon={<Layers className="size-3.5" />} title="Обов'язкові блоки">
        <ul className="space-y-1.5">
          {node.blocks.map((b) => (
            <li key={b} className="flex gap-2 text-[13px] leading-snug text-ink-soft">
              <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-sage" />
              {b}
            </li>
          ))}
        </ul>
      </Section>

      <Section icon={<User className="size-3.5" />} title="Дії (CTA)">
        <div className="space-y-2">
          <div className="rounded-xl border border-forest/25 bg-sage-light/60 px-3 py-2">
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-forest-deep">
              Головна дія
            </span>
            <span className="text-[13px] font-semibold text-forest-deep">{node.primaryCta}</span>
          </div>
          {node.secondaryCta && (
            <div className="rounded-xl border border-hairline bg-parchment/60 px-3 py-2">
              <span className="block text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
                Другорядна
              </span>
              <span className="text-[13px] text-ink">{node.secondaryCta}</span>
            </div>
          )}
        </div>
      </Section>

      <Section icon={<ArrowUpRight className="size-3.5" />} title="Звідки приходять">
        <div className="flex flex-wrap gap-1.5">
          {node.from.map((f) => (
            <span key={f} className="rounded-md border border-hairline bg-white/70 px-2 py-1 font-mono text-[11px] text-ink-soft">
              {f}
            </span>
          ))}
        </div>
      </Section>

      <Section icon={<ArrowDownRight className="size-3.5" />} title="Куди ведуть">
        <div className="flex flex-wrap gap-1.5">
          {node.to.map((t) => {
            const target = flat.find((n) => n.url.split(" ")[0] === t.split(" ")[0]);
            const label = t.replace(/\s*\(.*?\)\s*/g, "");
            return target && target.id !== node.id ? (
              <button
                key={t}
                type="button"
                onClick={() => onSelect(target.id)}
                className="rounded-md border border-forest/25 bg-white px-2 py-1 font-mono text-[11px] text-forest-deep transition-colors hover:bg-sage-light"
              >
                {label}
              </button>
            ) : (
              <span key={t} className="rounded-md border border-hairline bg-white/70 px-2 py-1 font-mono text-[11px] text-ink-soft">
                {label}
              </span>
            );
          })}
        </div>
      </Section>

      {node.note && (
        <Section
          icon={<AlertTriangle className="size-3.5" />}
          title={variant === "proposed" ? "Що не так" : "Ключове рішення"}
        >
          <p
            className={
              variant === "proposed"
                ? "rounded-xl border border-terracotta/30 bg-[#f9ece4] px-3 py-2 text-[13px] leading-relaxed text-terracotta"
                : "rounded-xl border border-forest/25 bg-sage-light/60 px-3 py-2 text-[13px] leading-relaxed text-forest-deep"
            }
          >
            {node.note}
          </p>
        </Section>
      )}

      <Section icon={<Layers className="size-3.5" />} title="Тип і пріоритет">
        <p className="text-[13px] leading-relaxed text-ink-soft">
          {TYPE_LABEL[node.type]}.{" "}
          {node.priority === "P0"
            ? "P0 — входить у критичний шлях запуску: без цієї сторінки сценарій не завершується."
            : node.priority === "P1"
              ? "P1 — важливо для повноти сервісу, запускається наступною хвилею."
              : "P2 — службове або підтримувальне, не впливає на конверсію."}
        </p>
      </Section>
    </div>
  );
}
