import { Accessibility, ArrowRight, Brain, Check, CircleDashed, Compass, Gauge, Layers, ListOrdered, MousePointerClick, Route, ShieldAlert, Smartphone, Sparkles, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  REVIEW_INTRO,
  SCORE_LABEL,
  SEVERITY_MEANING,
  reviewDimensions,
  reviewOrder,
  reviewStats,
  reviewStrengths,
  type ReviewDimension,
} from "@/data/review";
import type { Severity } from "@/data/audit";

const DIM_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  hierarchy: Layers,
  navigation: Compass,
  flow: Route,
  cta: MousePointerClick,
  content: ListOrdered,
  cognitive: Brain,
  mobile: Smartphone,
  a11y: Accessibility,
  states: CircleDashed,
  risks: ShieldAlert,
};

const SEVERITY_TONE: Record<Severity, string> = {
  critical: "bg-forest text-cream",
  high: "bg-terracotta text-cream",
  medium: "bg-parchment text-ink-soft border border-hairline",
};

const SEVERITY_ORDER: Severity[] = ["critical", "high", "medium"];

function scoreTone(score: number) {
  if (score <= 2) return { text: "text-terracotta", bar: "bg-terracotta" };
  if (score === 3) return { text: "text-bark", bar: "bg-bark" };
  return { text: "text-forest-deep", bar: "bg-forest" };
}

function ScoreMeter({ score }: { score: number }) {
  const tone = scoreTone(score);
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={cn("h-4 w-1.5 rounded-full", i < score ? tone.bar : "bg-hairline")}
          />
        ))}
      </span>
      <span className={cn("font-display text-[15px] leading-none", tone.text)}>{score}/5</span>
    </span>
  );
}

function SeverityLegend() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {SEVERITY_ORDER.map((s) => (
        <div key={s} className="flex gap-3 rounded-2xl border border-hairline bg-white/60 px-4 py-3">
          <span className={cn("mt-0.5 inline-flex h-5 shrink-0 items-center rounded-full px-2 text-[10px] font-semibold uppercase tracking-wide", SEVERITY_TONE[s])}>
            {SEVERITY_MEANING[s].label}
          </span>
          <span className="text-[12px] leading-relaxed text-ink-soft">{SEVERITY_MEANING[s].hint}</span>
        </div>
      ))}
    </div>
  );
}

function DimensionSection({ dim }: { dim: ReviewDimension }) {
  const Icon = DIM_ICON[dim.id] ?? Layers;
  const counts = SEVERITY_ORDER.map((s) => ({ s, n: dim.findings.filter((f) => f.severity === s).length }));

  return (
    <section id={dim.id} className="scroll-mt-28 space-y-4">
      <div className="overflow-hidden rounded-2xl border border-hairline bg-white/70">
        <div className="flex flex-wrap items-start gap-x-5 gap-y-4 border-b border-hairline px-5 py-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sage-light text-forest-deep">
            <Icon className="size-5" />
          </span>
          <div className="min-w-[220px] flex-1">
            <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-soft">
              {dim.order} / 10
            </span>
            <h2 className="mt-1 font-display text-[24px] leading-tight text-forest-deep">{dim.title}</h2>
            <p className="mt-1 text-[13px] text-ink-soft">{dim.question}</p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <ScoreMeter score={dim.score} />
            <span className="text-[11.5px] text-ink-soft">{SCORE_LABEL[dim.score]}</span>
            <span className="flex flex-wrap gap-1.5">
              {counts.map(({ s, n }) =>
                n > 0 ? (
                  <span
                    key={s}
                    className={cn("inline-flex h-5 items-center rounded-full px-2 text-[10px] font-semibold", SEVERITY_TONE[s])}
                  >
                    {n} {SEVERITY_MEANING[s].label}
                  </span>
                ) : null,
              )}
            </span>
          </div>
        </div>

        <div className="flex gap-3 px-5 py-4">
          <Gauge className="mt-0.5 size-4 shrink-0 text-bark" />
          <p className="text-[13.5px] leading-relaxed text-ink">{dim.verdict}</p>
        </div>
      </div>

      <div className="space-y-4">
        {dim.findings.map((f) => (
          <article key={f.id} className="overflow-hidden rounded-2xl border border-hairline bg-white/70">
            <header className="flex flex-wrap items-center gap-2.5 border-b border-hairline px-5 py-3.5">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-parchment font-mono text-[11px] font-semibold text-forest-deep">
                {f.id}
              </span>
              <h3 className="flex-1 font-display text-[17px] leading-snug text-forest-deep">{f.title}</h3>
              <span
                className={cn(
                  "inline-flex h-5 items-center rounded-full px-2 text-[10px] font-semibold uppercase tracking-wide",
                  SEVERITY_TONE[f.severity],
                )}
              >
                {SEVERITY_MEANING[f.severity].label}
              </span>
            </header>

            <div className="space-y-3 px-5 py-4">
              <p className="flex flex-wrap items-center gap-2 text-[11.5px] text-ink-soft">
                <span className="font-semibold uppercase tracking-[0.12em]">Де саме</span>
                <span className="rounded-md border border-hairline bg-parchment/60 px-2 py-0.5 text-bark">{f.where}</span>
              </p>

              <div className="grid gap-3 lg:grid-cols-3">
                <div className="rounded-xl border border-hairline bg-parchment/40 px-4 py-3">
                  <span className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
                    <TriangleAlert className="size-3.5 text-terracotta" />
                    Проблема
                  </span>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink">{f.problem}</p>
                </div>
                <div className="rounded-xl border border-bark/25 bg-[#f7efe3] px-4 py-3">
                  <span className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-bark">
                    <ShieldAlert className="size-3.5" />
                    Чому це важливо
                  </span>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-bark">{f.why}</p>
                </div>
                <div className="rounded-xl border border-forest/25 bg-sage-light/60 px-4 py-3">
                  <span className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-forest-deep">
                    <Check className="size-3.5" />
                    Покращення
                  </span>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-forest-deep">{f.fix}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function ReviewPage() {
  const s = reviewStats;

  return (
    <div className="reveal space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/70 px-3 py-1 text-[11px] font-medium text-ink-soft">
            <ShieldAlert className="size-3.5 text-terracotta" />
            UX-ревізія каркаса · 10 вимірів
          </span>
          <h1 className="mt-4 font-display text-[34px] leading-[1.12] text-forest-deep lg:text-[42px]">
            UX-аналіз каркаса головної
          </h1>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
            Оцінка за десятьма вимірами: ієрархія, навігація, шлях користувача, видимість CTA, пріоритетність контенту,
            когнітивне навантаження, мобільна зручність, доступність, відсутні стани й потенційні ризики. Для кожної
            проблеми — де саме вона в каркасі, чому це важливо для гостя і що конкретно змінити.
          </p>
          <div className="mt-4 flex gap-3 rounded-2xl border border-hairline bg-white/60 px-4 py-3">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-forest-deep" />
            <p className="text-[12.5px] leading-relaxed text-ink-soft">{REVIEW_INTRO.disclaimer}</p>
          </div>
        </div>

        <dl className="grid gap-3 rounded-2xl border border-hairline bg-white/70 p-5 text-[12.5px]">
          <div>
            <dt className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-soft">Об'єкт ревізії</dt>
            <dd className="mt-1 leading-relaxed text-ink">{REVIEW_INTRO.subject}</dd>
          </div>
          <div className="border-t border-hairline pt-3">
            <dt className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-soft">Метод</dt>
            <dd className="mt-1 leading-relaxed text-ink">{REVIEW_INTRO.method}</dd>
          </div>
        </dl>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { value: s.findings, label: "знахідок", note: "з конкретним виправленням для кожної" },
          { value: s.critical, label: "критичних", note: "виправити до початку верстки" },
          { value: `${s.averageScore}/5`, label: "середня оцінка", note: `найслабший вимір — ${s.weakest.title.toLowerCase()}` },
          { value: s.dimensions, label: "вимірів", note: "від ієрархії до потенційних ризиків" },
        ].map((tile) => (
          <div key={tile.label} className="rounded-2xl border border-hairline bg-white/70 px-5 py-4">
            <span className="font-display text-[30px] leading-none text-forest-deep">{tile.value}</span>
            <span className="mt-2 block text-[13px] font-semibold text-ink">{tile.label}</span>
            <span className="mt-0.5 block text-[11.5px] leading-snug text-ink-soft">{tile.note}</span>
          </div>
        ))}
      </section>

      <SeverityLegend />

      <nav className="sticky top-[68px] z-20 -mx-5 overflow-x-auto border-y border-hairline bg-cream/90 px-5 py-2.5 backdrop-blur-md lg:-mx-8 lg:px-8">
        <div className="flex gap-1.5">
          {reviewDimensions.map((d) => (
            <a
              key={d.id}
              href={`#${d.id}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-medium text-ink-soft transition-colors hover:bg-sage-light hover:text-forest-deep"
            >
              <span className="font-mono text-[10.5px] text-ink-soft/70">{d.order}</span>
              {d.title}
              <span
                className={cn(
                  "font-mono text-[10.5px]",
                  d.score <= 2 ? "text-terracotta" : d.score === 3 ? "text-bark" : "text-forest-deep",
                )}
              >
                {d.score}
              </span>
            </a>
          ))}
        </div>
      </nav>

      {reviewDimensions.map((dim) => (
        <DimensionSection key={dim.id} dim={dim} />
      ))}

      <section className="overflow-hidden rounded-2xl border border-hairline bg-white/70">
        <div className="flex flex-wrap items-center gap-3 border-b border-hairline px-5 py-4">
          <Check className="size-4 text-forest-deep" />
          <h2 className="font-display text-[19px] text-forest-deep">Що в каркасі вже працює</h2>
          <span className="text-[11.5px] text-ink-soft">рішення, які варто зберегти під час правок</span>
        </div>
        <div className="grid gap-4 px-5 py-5 md:grid-cols-2 xl:grid-cols-3">
          {reviewStrengths.map((item) => (
            <div key={item.title} className="rounded-xl border border-forest/20 bg-sage-light/40 px-4 py-3">
              <p className="text-[13.5px] font-semibold text-forest-deep">{item.title}</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-hairline bg-white/70">
        <div className="flex flex-wrap items-center gap-3 border-b border-hairline px-5 py-4">
          <ListOrdered className="size-4 text-bark" />
          <h2 className="font-display text-[19px] text-forest-deep">Порядок виправлень</h2>
          <span className="text-[11.5px] text-ink-soft">усі {s.findings} знахідок, згруповані за терміновістю</span>
        </div>
        <div className="grid gap-4 px-5 py-5 lg:grid-cols-3">
          {reviewOrder.map((group) => (
            <div key={group.tier} className="rounded-xl border border-hairline bg-parchment/30 px-4 py-4">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex h-5 items-center rounded-full px-2 text-[10px] font-semibold",
                    group.tier === "P0"
                      ? "bg-forest text-cream"
                      : group.tier === "P1"
                        ? "bg-sage text-forest-deep"
                        : "bg-parchment text-ink-soft border border-hairline",
                  )}
                >
                  {group.tier}
                </span>
                <span className="text-[13px] font-semibold text-ink">{group.label}</span>
                <span className="ml-auto font-mono text-[11px] text-ink-soft">{group.ids.length}</span>
              </div>
              <p className="mt-2 text-[11.5px] leading-relaxed text-ink-soft">{group.note}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.ids.map((id) => (
                  <span
                    key={id}
                    className="rounded-md border border-hairline bg-white/70 px-1.5 py-0.5 font-mono text-[10.5px] font-semibold text-forest-deep"
                  >
                    {id}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-4 rounded-2xl border border-forest/25 bg-forest px-5 py-5 text-cream">
        <ArrowRight className="size-5 shrink-0 text-cream/80" />
        <p className="min-w-[240px] flex-1 text-[13.5px] leading-relaxed text-cream/90">
          Наступний крок — не редизайн, а правки в межах наявної структури: закрити вісім критичних знахідок, узгодити
          вагу CTA й додати відсутні стани. Після цього каркас можна передавати у візуальний дизайн без ризику
          переробляти транзакційну частину.
        </p>
      </section>
    </div>
  );
}
