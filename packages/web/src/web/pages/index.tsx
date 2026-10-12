import { useEffect, useMemo, useState } from "react";
import { ArrowRight, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";
import { improvedTree, proposedTree, countNodes, findNode, flatten } from "@/data/sitemap";
import { briefMapping } from "@/data/audit";
import { NodeTree } from "@/components/node-tree";
import { NodeDetail } from "@/components/node-detail";

type Variant = "proposed" | "improved";

export default function MapPage() {
  const [variant, setVariant] = useState<Variant>("improved");
  const [selected, setSelected] = useState("home");

  const root = variant === "improved" ? improvedTree : proposedTree;

  useEffect(() => {
    setSelected("home");
  }, [variant]);

  const node = useMemo(() => findNode([root], selected) ?? root, [root, selected]);
  const total = countNodes([root]);
  const other = countNodes([variant === "improved" ? proposedTree : improvedTree]);

  const diff = useMemo(() => {
    const before = new Set(flatten([proposedTree]).map((n) => n.id));
    const after = new Set(flatten([improvedTree]).map((n) => n.id));
    return {
      removed: [...before].filter((id) => !after.has(id)).length,
      added: [...after].filter((id) => !before.has(id)).length,
    };
  }, []);

  return (
    <div className="reveal space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-end">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/70 px-3 py-1 text-[11px] font-medium text-ink-soft">
            <GitBranch className="size-3.5" />
            Інформаційна архітектура · {variant === "improved" ? "вдосконалена карта" : "запропонована карта"}
          </span>
          <h1 className="mt-4 font-display text-[34px] leading-[1.12] text-forest-deep lg:text-[44px]">
            Карта сайту Cafe Park Avenue
          </h1>
          <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-ink-soft">
            Клікайте вузли, щоб побачити мету сторінки, обов'язкові блоки, дії та зв'язки. Перемикач показує, що було в
            початковій пропозиції і що змінилось після UX-аудиту.
          </p>
        </div>

        <div className="rounded-2xl border border-hairline bg-white/70 p-5">
          <div className="inline-flex rounded-full border border-hairline bg-parchment/70 p-1">
            {(
              [
                { key: "proposed", label: "Запропонована" },
                { key: "improved", label: "Вдосконалена" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setVariant(tab.key)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-[12.5px] font-semibold transition-colors",
                  variant === tab.key ? "bg-forest text-cream" : "text-ink-soft hover:text-forest-deep",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-4 text-[12px]">
            <div>
              <dt className="text-ink-soft">Сторінок у цій версії</dt>
              <dd className="font-display text-[26px] leading-none text-forest-deep">{total}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">У порівнюваній версії</dt>
              <dd className="font-display text-[26px] leading-none text-ink-soft">{other}</dd>
            </div>
          </dl>
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-hairline pt-3 text-center">
            <div className="rounded-xl bg-[#f9ece4] px-2 py-2">
              <span className="block font-mono text-[15px] font-semibold text-terracotta">−{diff.removed}</span>
              <span className="text-[10px] text-ink-soft">прибрано</span>
            </div>
            <div className="rounded-xl bg-sage-light px-2 py-2">
              <span className="block font-mono text-[15px] font-semibold text-forest-deep">+{diff.added}</span>
              <span className="text-[10px] text-ink-soft">додано</span>
            </div>
            <div className="rounded-xl bg-parchment px-2 py-2">
              <span className="block font-mono text-[15px] font-semibold text-ink">
                +{diff.added - diff.removed}
              </span>
              <span className="text-[10px] text-ink-soft">чистий приріст</span>
            </div>
          </div>
          <p className="mt-3 flex items-start gap-2 text-[12px] leading-relaxed text-ink-soft">
            <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-bark" />
            {variant === "improved"
              ? "Гілка «Послуги» замінена на «Замовлення» з двома реальними послугами, зникли проміжні екрани, з'явились сторінки, без яких сценарії обривались."
              : "Версія до аудиту: 3 паралельні навігації, дубльовані URL і сторінки без власної мети."}
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-2xl border border-hairline bg-white/55 p-5 lg:sticky lg:top-24 lg:self-start">
          <h2 className="mb-4 font-display text-[19px] text-forest-deep">Ієрархія сторінок</h2>
          <NodeTree root={root} selectedId={selected} onSelect={setSelected} variant={variant} />
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <NodeDetail node={node} root={root} variant={variant} onSelect={setSelected} />
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-hairline bg-white/70">
        <div className="border-b border-hairline px-5 py-4">
          <h2 className="font-display text-[19px] text-forest-deep">Відповідність вихідному брифу</h2>
          <p className="mt-1 text-[12.5px] text-ink-soft">
            П'ять заявлених розділів збережено. Два з них переосмислено, три воронки винесено в топ — бо це окремі
            сценарії, а не «послуги».
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-[13px]">
            <thead className="bg-parchment/70 text-[11px] uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="px-5 py-3 font-semibold">Розділ брифу</th>
                <th className="px-5 py-3 font-semibold">У запропонованій карті</th>
                <th className="px-5 py-3 font-semibold">У вдосконаленій</th>
                <th className="px-5 py-3 font-semibold">Рішення</th>
              </tr>
            </thead>
            <tbody>
              {briefMapping.map((row) => (
                <tr key={row.brief} className="border-t border-hairline align-top">
                  <td className="px-5 py-3 font-semibold text-ink">{row.brief}</td>
                  <td className="px-5 py-3 font-mono text-[12px] text-ink-soft">{row.before}</td>
                  <td className="px-5 py-3 font-mono text-[12px] text-forest-deep">{row.after}</td>
                  <td className="px-5 py-3 text-ink-soft">{row.verdict}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-2xl border border-hairline bg-white/70">
          <img src="/images/brand-hero.jpg" alt="Візуальний напрям Cafe Park Avenue" className="w-full" />
          <div className="border-t border-hairline px-5 py-4">
            <h2 className="font-display text-[19px] text-forest-deep">Візуальний напрям карти</h2>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
              Палітра й типографіка зняті з наданих бренд-матеріалів: глибокий зелений, кремовий, какао. Заголовки —
              сериф, інтерфейс — Plus Jakarta Sans. Той самий тон переноситься на сам сайт закладу.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-hairline bg-white/70 p-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">Палітра</h3>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { name: "forest", hex: "#1F5236", cls: "bg-forest" },
                { name: "sage", hex: "#BDC9B7", cls: "bg-sage" },
                { name: "cream", hex: "#FAF9F4", cls: "bg-cream border border-hairline" },
                { name: "parchment", hex: "#F2EDE2", cls: "bg-parchment" },
                { name: "bark", hex: "#694D2C", cls: "bg-bark" },
                { name: "terracotta", hex: "#B96A3C", cls: "bg-terracotta" },
              ].map((c) => (
                <div key={c.name} className="overflow-hidden rounded-xl border border-hairline">
                  <div className={`h-10 ${c.cls}`} />
                  <div className="bg-white/80 px-2 py-1.5">
                    <span className="block text-[10.5px] font-semibold text-ink">{c.name}</span>
                    <span className="block font-mono text-[9.5px] text-ink-soft">{c.hex}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-hairline bg-white/70 p-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
              Що свідомо не використовуємо
            </h3>
            <ul className="mt-3 space-y-2 text-[12.5px] leading-relaxed text-ink-soft">
              {[
                "PDF-меню замість інтерактивного каталогу",
                "Hero-карусель: перший екран має нести одну дію, а не слайдшоу",
                "Autoplay-відео без fallback і важкий parallax",
                "Стокові фото замість власної продукції",
              ].map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-terracotta" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
