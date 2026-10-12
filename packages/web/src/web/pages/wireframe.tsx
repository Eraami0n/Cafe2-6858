import { useState } from "react";
import { Check, Download, Grid3x3, LayoutTemplate, Monitor, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { figmaSteps, uxChecklist, wireframeBrief, wireframeSections } from "@/data/wireframe";

const FILES = [
  {
    name: "homepage-desktop.svg",
    href: "/wireframes/homepage-desktop.svg",
    size: "1440 × 3260",
    icon: Monitor,
    label: "Десктоп",
  },
  {
    name: "homepage-mobile.svg",
    href: "/wireframes/homepage-mobile.svg",
    size: "390 × 4140",
    icon: Smartphone,
    label: "Мобільний",
  },
];

export default function WireframePage() {
  const [grid, setGrid] = useState(false);
  const [mobileGrid, setMobileGrid] = useState(false);

  return (
    <div className="reveal space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/70 px-3 py-1 text-[11px] font-medium text-ink-soft">
            <LayoutTemplate className="size-3.5" />
            Lo-fi каркас · головна сторінка · сірі відтінки
          </span>
          <h1 className="mt-4 font-display text-[34px] leading-[1.12] text-forest-deep lg:text-[42px]">
            Каркас головної сторінки
          </h1>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
            Два артборди — десктоп і мобільний — у форматі SVG: вектори з редагованими текстовими шарами, готові до
            перенесення у Figma. Без декоративних кольорів і деталізованих зображень: тільки структура, ієрархія та
            порядок контенту.
          </p>
        </div>

        <dl className="grid gap-3 rounded-2xl border border-hairline bg-white/70 p-5 text-[12.5px]">
          {[
            ["Проєкт", wireframeBrief.project],
            ["Цільова аудиторія", wireframeBrief.audience],
            ["Основна мета", wireframeBrief.goal],
            ["Головний CTA", wireframeBrief.cta],
          ].map(([k, v]) => (
            <div key={k} className="border-b border-hairline pb-3 last:border-b-0 last:pb-0">
              <dt className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-soft">{k}</dt>
              <dd className="mt-1 leading-relaxed text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {FILES.map((f) => (
          <a
            key={f.name}
            href={f.href}
            download={f.name}
            className="group flex items-center gap-4 rounded-2xl border border-hairline bg-white/70 px-5 py-4 transition-colors hover:border-forest/30 hover:bg-white"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sage-light text-forest-deep">
              <f.icon className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] font-semibold text-ink">{f.label}</span>
              <span className="block font-mono text-[11px] text-ink-soft">
                {f.name} · {f.size}
              </span>
            </span>
            <Download className="size-4 shrink-0 text-ink-soft transition-colors group-hover:text-forest-deep" />
          </a>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-[19px] text-forest-deep">Артборд: десктоп 1440</h2>
            <button
              type="button"
              onClick={() => setGrid((v) => !v)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] font-semibold transition-colors",
                grid
                  ? "border-forest bg-forest text-cream"
                  : "border-hairline bg-white/70 text-ink-soft hover:border-forest/30 hover:text-forest-deep",
              )}
            >
              <Grid3x3 className="size-3.5" />
              {grid ? "Сітка увімкнена" : "Показати сітку 12 колонок"}
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-hairline bg-white">
            <div className="relative">
              <img
                src="/wireframes/homepage-desktop.svg"
                alt="Каркас головної сторінки — десктоп"
                className="block w-full"
              />
              {grid && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 flex"
                  style={{ paddingLeft: "6.6667%", paddingRight: "6.6667%", gap: "1.6667%" }}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className="flex-1 bg-[#1F5236]/[0.07] outline outline-[#1F5236]/20" />
                  ))}
                </div>
              )}
            </div>
          </div>
          <p className="text-[11.5px] text-ink-soft">
            Сітка 12 колонок: відступ 96 px, колонка 82 px, жолоб 24 px. Секції тримаються однієї сітки — картки
            завжди кратні трьом або чотирьом колонкам.
          </p>
        </div>

        <div className="lg:w-[420px]">
          <div className="space-y-3">
            <h2 className="font-display text-[19px] text-forest-deep">Артборд: мобільний 390</h2>
            <div className="overflow-hidden rounded-2xl border border-hairline bg-white">
              <div className="relative">
                <img
                  src="/wireframes/homepage-mobile.svg"
                  alt="Каркас головної сторінки — мобільний"
                  className="mx-auto block w-[300px]"
                />
                {mobileGrid && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 mx-auto flex w-[300px]"
                    style={{ paddingLeft: "5.128%", paddingRight: "5.128%", gap: "5.128%" }}
                  >
                    {Array.from({ length: 4 }).map((_, i) => (
                      <span key={i} className="flex-1 bg-[#1F5236]/[0.07] outline outline-[#1F5236]/20" />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileGrid((v) => !v)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] font-semibold transition-colors",
                mobileGrid
                  ? "border-forest bg-forest text-cream"
                  : "border-hairline bg-white/70 text-ink-soft hover:border-forest/30 hover:text-forest-deep",
              )}
            >
              <Grid3x3 className="size-3.5" />
              {mobileGrid ? "Сітка увімкнена" : "Показати сітку 4 колонки"}
            </button>
            <p className="text-[11.5px] leading-relaxed text-ink-soft">
              Мобільний тримає ті самі відступи, але одна колонка: 4 → 1. Унизу артборда окремим станом показана
              фіксована панель, яка живе поза потоком контенту.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-[19px] text-forest-deep">Обов'язкові розділи</h2>
        <p className="mt-1 text-[12.5px] text-ink-soft">
          Вісім блоків у порядку, який веде користувача від питання «що це?» до дії.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {wireframeSections.map((s) => (
            <article key={s.n} className="rounded-2xl border border-hairline bg-white/70 p-5">
              <header className="flex items-baseline gap-3">
                <span className="font-display text-[22px] leading-none text-sage">{s.n}</span>
                <h3 className="font-display text-[18px] leading-tight text-forest-deep">{s.title}</h3>
              </header>
              <p className="mt-2 text-[13px] leading-relaxed text-ink">{s.purpose}</p>

              <ul className="mt-3 space-y-1.5">
                {s.contains.map((c) => (
                  <li key={c} className="flex gap-2 text-[12.5px] leading-snug text-ink-soft">
                    <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-sage" />
                    {c}
                  </li>
                ))}
              </ul>

              <div className="mt-3.5 rounded-xl border border-hairline bg-parchment/50 px-3.5 py-2.5">
                <span className="block text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
                  Поведінка на різних екранах
                </span>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">{s.adaptive}</p>
              </div>

              <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-forest-deep">
                {s.requirement}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-hairline bg-white/70 p-5">
          <h2 className="font-display text-[19px] text-forest-deep">Перевірка вимог UX</h2>
          <div className="mt-4 space-y-3.5">
            {uxChecklist.map((c) => (
              <div key={c.title} className="flex gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-forest" />
                <div>
                  <p className="text-[13.5px] font-semibold text-ink">{c.title}</p>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-soft">{c.how}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-forest/25 bg-sage-light/50 p-5">
          <h2 className="font-display text-[19px] text-forest-deep">Як перенести у Figma</h2>
          <ol className="mt-4 space-y-4">
            {figmaSteps.map((s) => (
              <li key={s.n} className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-forest font-mono text-[11px] font-semibold text-cream">
                  {s.n}
                </span>
                <div>
                  <p className="text-[13.5px] font-semibold text-forest-deep">{s.title}</p>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-forest-deep/80">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-5 rounded-xl border border-forest/25 bg-white/70 px-4 py-3">
            <p className="text-[12px] leading-relaxed text-ink-soft">
              Файли лежать у репозиторії за шляхом{" "}
              <code className="font-mono text-[11px] text-forest-deep">packages/web/public/wireframes/</code> і
              генеруються скриптом <code className="font-mono text-[11px] text-forest-deep">scripts/wireframe.py</code>{" "}
              — правки в геометрії робляться там, а не руками у Figma.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
