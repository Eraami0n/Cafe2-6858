import { useState } from "react";
import { Check, MousePointerClick, Quote, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { auditCategories, clickDepth, type AuditCategoryId } from "@/data/audit";
import { SeverityChip } from "@/components/badges";

export default function AuditPage() {
  const [active, setActive] = useState<AuditCategoryId>("extra");
  const category = auditCategories.find((c) => c.id === active)!;
  const maxClicks = Math.max(...clickDepth.map((r) => r.before));

  return (
    <div className="reveal space-y-8">
      <section className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/70 px-3 py-1 text-[11px] font-medium text-ink-soft">
          <TriangleAlert className="size-3.5 text-terracotta" />
          UX-аудит запропонованої карти
        </span>
        <h1 className="mt-4 font-display text-[34px] leading-[1.12] text-forest-deep lg:text-[42px]">
          Що заважає користувачу дійти до мети
        </h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
          25 знахідок за п'ятьма питаннями: зайві сторінки, відсутні сторінки, заплутана навігація, дубльований контент і
          глибина кліків. Кожна знахідка містить наслідок для користувача та конкретне виправлення в карті.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {auditCategories.map((cat) => {
          const critical = cat.findings.filter((f) => f.severity === "critical").length;
          const isActive = cat.id === active;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              className={cn(
                "rounded-2xl border p-4 text-left transition-all",
                isActive
                  ? "border-forest/40 bg-white shadow-[0_10px_30px_-22px_rgba(28,20,9,0.5)]"
                  : "border-hairline bg-white/55 hover:border-forest/25 hover:bg-white/80",
              )}
            >
              <span className="flex items-baseline justify-between">
                <span className="font-display text-[26px] leading-none text-forest-deep">{cat.findings.length}</span>
                {critical > 0 && (
                  <span className="rounded-full bg-terracotta px-2 py-0.5 text-[10px] font-semibold text-cream">
                    {critical} критичн.
                  </span>
                )}
              </span>
              <span className="mt-2 block text-[13.5px] font-semibold text-ink">{cat.label}</span>
              <span className="mt-1 block text-[11.5px] leading-snug text-ink-soft">{cat.question}</span>
            </button>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-hairline bg-forest px-5 py-5 text-cream">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cream/70">
              Категорія {auditCategories.findIndex((c) => c.id === active) + 1} з 5
            </span>
            <h2 className="mt-2 font-display text-[24px] leading-tight">{category.label}</h2>
            <p className="mt-3 text-[13px] leading-relaxed text-cream/85">{category.summary}</p>
          </div>
        </div>

        <div className="space-y-4">
          {category.findings.map((f) => (
            <article key={f.id} className="reveal overflow-hidden rounded-2xl border border-hairline bg-white/70">
              <header className="flex flex-wrap items-center gap-2.5 border-b border-hairline px-5 py-3.5">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-parchment font-mono text-[11px] font-semibold text-forest-deep">
                  {f.id}
                </span>
                <h3 className="flex-1 font-display text-[17px] leading-snug text-forest-deep">{f.title}</h3>
                <SeverityChip value={f.severity} />
              </header>

              <div className="space-y-3 px-5 py-4">
                <code className="inline-block rounded-md border border-hairline bg-parchment/60 px-2 py-0.5 font-mono text-[11.5px] text-bark">
                  {f.target}
                </code>
                <p className="text-[13.5px] leading-relaxed text-ink">{f.problem}</p>
                <div className="flex gap-2.5 rounded-xl border border-terracotta/25 bg-[#f9ece4] px-3.5 py-2.5">
                  <Quote className="mt-0.5 size-3.5 shrink-0 text-terracotta" />
                  <p className="text-[12.5px] leading-relaxed text-terracotta">{f.impact}</p>
                </div>
                <div className="flex gap-2.5 rounded-xl border border-forest/25 bg-sage-light/60 px-3.5 py-2.5">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-forest-deep" />
                  <p className="text-[12.5px] leading-relaxed text-forest-deep">{f.fix}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-hairline bg-white/70">
        <div className="flex flex-wrap items-center gap-3 border-b border-hairline px-5 py-4">
          <MousePointerClick className="size-4 text-bark" />
          <h2 className="font-display text-[19px] text-forest-deep">Кліків до мети: було і стало</h2>
          <span className="text-[11.5px] text-ink-soft">
            рахунок від головної сторінки до завершення дії
          </span>
        </div>
        <div className="divide-y divide-hairline">
          {clickDepth.map((row) => {
            const delta = row.before - row.after;
            return (
              <div key={row.goal} className="grid gap-3 px-5 py-4 md:grid-cols-[1.1fr_1fr_auto] md:items-center">
                <div>
                  <p className="text-[13.5px] font-semibold text-ink">{row.goal}</p>
                  <p className="mt-0.5 text-[11.5px] text-ink-soft">{row.note}</p>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-10 shrink-0 text-[10.5px] font-semibold uppercase text-ink-soft">було</span>
                    <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-parchment">
                      <span
                        className="block h-full rounded-full bg-terracotta/70"
                        style={{ width: `${(row.before / maxClicks) * 100}%` }}
                      />
                    </span>
                    <span className="w-5 text-right font-mono text-[11.5px] text-ink-soft">{row.before}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-10 shrink-0 text-[10.5px] font-semibold uppercase text-ink-soft">стало</span>
                    <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-parchment">
                      <span
                        className="block h-full rounded-full bg-forest"
                        style={{ width: `${(row.after / maxClicks) * 100}%` }}
                      />
                    </span>
                    <span className="w-5 text-right font-mono text-[11.5px] font-semibold text-forest-deep">
                      {row.after}
                    </span>
                  </div>
                </div>
                <span
                  className={cn(
                    "justify-self-start rounded-full px-2.5 py-1 text-[11px] font-semibold md:justify-self-end",
                    delta > 0 ? "bg-sage-light text-forest-deep" : "bg-parchment text-ink-soft",
                  )}
                >
                  {delta > 0 ? `−${delta} клік${delta === 1 ? "" : "и"}` : "без змін"}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
