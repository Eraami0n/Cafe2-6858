import { useState } from "react";
import { ArrowDown, CheckCircle2, Flag, MousePointerClick, Sparkles, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { userFlows } from "@/data/flows";
import { SegmentChip } from "@/components/badges";

export default function FlowsPage() {
  const [activeId, setActiveId] = useState(userFlows[0].id);
  const flow = userFlows.find((f) => f.id === activeId)!;

  return (
    <div className="reveal space-y-8">
      <section className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/70 px-3 py-1 text-[11px] font-medium text-ink-soft">
          <Sparkles className="size-3.5 text-bark" />
          Сценарії користувачів
        </span>
        <h1 className="mt-4 font-display text-[34px] leading-[1.12] text-forest-deep lg:text-[42px]">
          Три шляхи, які мусять працювати бездоганно
        </h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
          Два сегменти — два різні типи рішень. Швидка кава вимагає мінімуму кроків, торт на подію — прозорості й
          зняття тривоги. Бронювання обслуговує обидва.
        </p>
      </section>

      <section className="flex flex-wrap gap-2">
        {userFlows.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActiveId(f.id)}
            className={cn(
              "group flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all",
              f.id === activeId
                ? "border-forest/40 bg-white shadow-[0_10px_30px_-22px_rgba(28,20,9,0.5)]"
                : "border-hairline bg-white/55 hover:border-forest/25",
            )}
          >
            <span
              className={cn(
                "font-display text-[20px] leading-none",
                f.id === activeId ? "text-forest" : "text-sage",
              )}
            >
              {f.index}
            </span>
            <span>
              <span className="block text-[13.5px] font-semibold text-ink">{f.title}</span>
              <span className="block text-[11px] text-ink-soft">{f.subtitle}</span>
            </span>
          </button>
        ))}
      </section>

      <section key={flow.id} className="reveal grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <div className="mb-5 rounded-2xl border border-hairline bg-white/70 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <SegmentChip value={flow.segment} />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-parchment px-2.5 py-1 text-[11px] font-semibold text-ink-soft">
                <MousePointerClick className="size-3" />
                {flow.clicks} кліків до завершення
              </span>
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink">{flow.goal}</p>
            <p className="mt-2 flex items-center gap-2 text-[11.5px] text-ink-soft">
              <Flag className="size-3.5 text-bark" />
              Старт: {flow.start}
            </p>
          </div>

          <ol className="relative space-y-3">
            <span aria-hidden className="absolute left-[15px] top-3 bottom-3 w-px bg-sage/70" />
            {flow.steps.map((step, i) => (
              <li key={`${step.screen}-${i}`} className="relative flex gap-4">
                <span className="z-10 mt-3 grid size-[31px] shrink-0 place-items-center rounded-full border border-sage bg-cream font-mono text-[11.5px] font-semibold text-forest-deep">
                  {i + 1}
                </span>
                <div className="flex-1 rounded-2xl border border-hairline bg-white/70 px-4 py-3.5">
                  <div className="flex flex-wrap items-baseline gap-2.5">
                    <h3 className="font-display text-[16px] text-forest-deep">{step.screen}</h3>
                    <code className="rounded-md border border-hairline bg-parchment/60 px-1.5 py-0.5 font-mono text-[11px] text-ink-soft">
                      {step.url}
                    </code>
                  </div>
                  <p className="mt-2 flex gap-2 text-[13px] leading-relaxed text-ink">
                    <ArrowDown className="mt-0.5 size-3.5 shrink-0 text-ink-soft" />
                    {step.action}
                  </p>
                  <p className="mt-1.5 flex gap-2 text-[12.5px] leading-relaxed text-forest-deep">
                    <Sparkles className="mt-0.5 size-3.5 shrink-0 text-forest" />
                    {step.reaction}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-forest/25 bg-sage-light/60 p-5">
            <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-forest-deep">
              <CheckCircle2 className="size-3.5" />
              Стан успіху
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-forest-deep">{flow.success}</p>
          </div>

          <div className="rounded-2xl border border-terracotta/30 bg-[#f9ece4] p-5">
            <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-terracotta">
              <XCircle className="size-3.5" />
              Стан помилки
            </h3>
            <p className="mt-2 text-[11.5px] font-semibold text-terracotta">{flow.errorTrigger}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-terracotta/90">{flow.error}</p>
          </div>

          <div className="rounded-2xl border border-hairline bg-white/70 p-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
              Що змінює вдосконалена карта
            </h3>
            <ul className="mt-3 space-y-2.5">
              {flow.fixes.map((fix) => (
                <li key={fix} className="flex gap-2 text-[12.5px] leading-relaxed text-ink-soft">
                  <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-forest" />
                  {fix}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
