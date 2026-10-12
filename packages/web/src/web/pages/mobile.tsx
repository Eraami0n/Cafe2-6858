import { useState } from "react";
import { CalendarCheck, Menu as MenuIcon, MapPin, ShoppingBag, Smartphone, X } from "lucide-react";
import { cn } from "@/lib/utils";

const BOTTOM = [
  { icon: MenuIcon, label: "Меню", primary: false },
  { icon: ShoppingBag, label: "Замовити", primary: true },
  { icon: MapPin, label: "Маршрут", primary: false },
];

const DRAWER = [
  { label: "Меню", url: "/menu", note: "Кава, десерти, випічка, сніданки" },
  { label: "Замовлення", url: "/orders", note: "Торти на замовлення, святкові набори", group: true },
  { label: "Бронювання", url: "/reservation", note: "Столик на дату й час" },
  { label: "Про нас", url: "/about", note: "Історія, команда, атмосфера" },
  { label: "Контакти", url: "/contacts", note: "Адреса, графік, маршрут" },
];

const RULES = [
  {
    title: "Одна головна система",
    before: "Нижня панель + бургер + хаб «Послуги» — три рівноцінні навігації.",
    after: "Нижня панель на три дії — єдина постійна навігація. Бургер лише для довідкових розділів.",
  },
  {
    title: "Дії замість розділів",
    before: "У панелі змішувались дії («Замовити») і розділи («Меню»).",
    after: "Три найчастіші дії: Меню, Замовити, Маршрут. Довідка — у бургері.",
  },
  {
    title: "Хаб не плодить рівні",
    before: "«Послуги» додавали четвертий рівень вкладеності на мобільному.",
    after: "«Замовлення» на мобільному — акордеон із двох пунктів, обидва доступні одним тапом.",
  },
  {
    title: "Статус завжди видно",
    before: "Live-статус жив лише в Hero — при скролі зникав.",
    after: "Статус закріплений у шапці й лишається видимим на всіх сторінках.",
  },
  {
    title: "Картка товару не вибиває зі списку",
    before: "Повноекранна сторінка товару скидала скрол меню.",
    after: "Модалка знизу екрана: кошик оновлюється, меню лишається на місці.",
  },
];

export default function MobilePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="reveal space-y-8">
      <section className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/70 px-3 py-1 text-[11px] font-medium text-ink-soft">
          <Smartphone className="size-3.5 text-bark" />
          Мобільна навігація · 75–82% трафіку
        </span>
        <h1 className="mt-4 font-display text-[34px] leading-[1.12] text-forest-deep lg:text-[42px]">
          Як карта стискається до одного екрана
        </h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
          П'ять розділів шапки на телефоні не працюють. Структура перевіряється на мобільному макеті: три постійні дії
          внизу, довідкові розділи в бургері, жодного зайвого рівня вкладеності.
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[auto_1fr]">
        <div className="flex flex-wrap items-start justify-center gap-6">
          <PhoneState title="Стан 1 — закрита панель" caption="Дії завжди під великим пальцем">
            <PhoneChrome drawerOpen={false} onToggle={() => setDrawerOpen(false)} />
          </PhoneState>

          <PhoneState title="Стан 2 — відкрите меню" caption="Довідкові розділи, акордеон замість нового рівня">
            <PhoneChrome drawerOpen onToggle={() => setDrawerOpen(true)} />
          </PhoneState>

          <div className="w-full max-w-[300px] self-center rounded-2xl border border-hairline bg-white/70 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">Керуйте макетом</p>
            <button
              type="button"
              onClick={() => setDrawerOpen((v) => !v)}
              className="mt-3 flex w-full items-center justify-between rounded-xl border border-forest/25 bg-white px-3.5 py-2.5 text-[13px] font-semibold text-forest-deep transition-colors hover:bg-sage-light"
            >
              {drawerOpen ? "Закрити меню" : "Відкрити меню"}
              {drawerOpen ? <X className="size-4" /> : <MenuIcon className="size-4" />}
            </button>
            <p className="mt-3 text-[12px] leading-relaxed text-ink-soft">
              Обидва стани показують один і той самий набір розділів — різниця лише в тому, як вони згруповані.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {RULES.map((rule) => (
            <article key={rule.title} className="rounded-2xl border border-hairline bg-white/70 p-5">
              <h3 className="font-display text-[17px] text-forest-deep">{rule.title}</h3>
              <div className="mt-3 grid gap-2.5 md:grid-cols-2">
                <div className="rounded-xl border border-terracotta/25 bg-[#f9ece4] px-3.5 py-2.5">
                  <span className="block text-[10px] font-semibold uppercase tracking-wide text-terracotta">Було</span>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-terracotta/90">{rule.before}</p>
                </div>
                <div className="rounded-xl border border-forest/25 bg-sage-light/60 px-3.5 py-2.5">
                  <span className="block text-[10px] font-semibold uppercase tracking-wide text-forest-deep">Стало</span>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-forest-deep">{rule.after}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function PhoneState({
  title,
  caption,
  children,
}: {
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-[268px]">
      <p className="mb-2 text-[12px] font-semibold text-forest-deep">{title}</p>
      {children}
      <p className="mt-2 text-[11px] leading-snug text-ink-soft">{caption}</p>
    </div>
  );
}

function PhoneChrome({ drawerOpen, onToggle }: { drawerOpen: boolean; onToggle: () => void }) {
  return (
    <div className="relative h-[520px] overflow-hidden rounded-[28px] border border-hairline bg-cream shadow-[0_30px_60px_-40px_rgba(28,20,9,0.6)]">
      <div className="flex items-center justify-between border-b border-hairline bg-cream/90 px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <img src="/images/logo-mark.png" alt="" className="h-6 w-auto" />
          <span className="font-display text-[12px] leading-none text-forest-deep">Cafe Park Avenue</span>
        </div>
        <button type="button" onClick={onToggle} className="grid size-7 place-items-center rounded-lg bg-parchment">
          {drawerOpen ? <X className="size-3.5 text-forest-deep" /> : <MenuIcon className="size-3.5 text-forest-deep" />}
        </button>
      </div>

      <div className="flex items-center gap-1.5 border-b border-hairline bg-white/60 px-3.5 py-1.5">
        <span className="size-1.5 rounded-full bg-forest" />
        <span className="text-[10px] font-medium text-forest-deep">Відкрито зараз до 20:00</span>
      </div>

      <div className={cn("px-3.5 py-4 transition-opacity", drawerOpen && "pointer-events-none opacity-25")}>
        <div className="h-24 rounded-2xl bg-sage-light" />
        <div className="mt-3 h-2.5 w-3/4 rounded-full bg-parchment" />
        <div className="mt-2 h-2.5 w-1/2 rounded-full bg-parchment" />
        <div className="mt-4 flex gap-2">
          <span className="h-7 flex-1 rounded-full bg-forest" />
          <span className="h-7 flex-1 rounded-full border border-forest/30" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="h-16 rounded-xl bg-white/80" />
          <div className="h-16 rounded-xl bg-white/80" />
        </div>
      </div>

      {drawerOpen && (
        <div className="reveal absolute inset-x-0 top-[86px] bottom-[52px] overflow-y-auto border-t border-hairline bg-white/95 px-3.5 py-3 backdrop-blur">
          {DRAWER.map((item) => (
            <div key={item.label} className="border-b border-hairline/70 py-2.5 last:border-b-0">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-ink">{item.label}</span>
                {item.group && (
                  <span className="rounded-full bg-sage-light px-2 py-0.5 text-[9.5px] font-semibold text-forest-deep">
                    2 підпункти
                  </span>
                )}
              </div>
              <span className="mt-0.5 block font-mono text-[10px] text-ink-soft">{item.url}</span>
              <span className="mt-0.5 block text-[10.5px] text-ink-soft">{item.note}</span>
            </div>
          ))}
          <div className="mt-3 rounded-xl border border-forest/25 bg-sage-light/60 px-3 py-2">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-forest-deep">
              <CalendarCheck className="size-3" />
              Швидка дія
            </span>
            <span className="mt-1 block text-[11.5px] text-forest-deep">
              «Забронювати столик» лишається окремим пунктом — це найчастіша дія після замовлення кави.
            </span>
          </div>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 border-t border-hairline bg-cream/95 backdrop-blur">
        {BOTTOM.map((item) => (
          <div
            key={item.label}
            className={cn(
              "flex flex-col items-center gap-1 py-2.5",
              item.primary && "text-forest-deep",
            )}
          >
            <span
              className={cn(
                "grid size-7 place-items-center rounded-full",
                item.primary ? "bg-forest text-cream" : "bg-parchment text-ink-soft",
              )}
            >
              <item.icon className="size-3.5" />
            </span>
            <span className={cn("text-[10px] font-medium", item.primary ? "text-forest-deep" : "text-ink-soft")}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
