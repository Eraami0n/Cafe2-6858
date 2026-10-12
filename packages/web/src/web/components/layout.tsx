import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Карта сайту", hint: "Ієрархія та навігація" },
  { href: "/audit", label: "UX-аудит", hint: "Що не працює і чому" },
  { href: "/flows", label: "Сценарії", hint: "Три user flows" },
  { href: "/mobile", label: "Мобільна навігація", hint: "Як стискається меню" },
  { href: "/wireframe", label: "Каркас головної", hint: "Lo-fi макет під Figma" },
  { href: "/review", label: "UX-ревізія", hint: "10 вимірів аналізу каркаса" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-cream grain">
      <header className="sticky top-0 z-30 border-b border-hairline/80 bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/logo-mark.png" alt="Cafe Park Avenue" className="h-11 w-auto" />
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-[17px] text-forest-deep">Cafe Park Avenue</span>
              <span className="block text-[11px] tracking-wide text-ink-soft">Карта сайту та UX-аудит · Монастирище</span>
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-forest/20 bg-white/70 px-3 py-1 text-[11px] font-medium text-forest-deep md:inline-flex">
              <span className="size-1.5 rounded-full bg-forest" />
              Відкрито до 20:00
            </span>
          </div>

          <nav className="order-last flex w-full gap-1 overflow-x-auto pb-1 lg:order-none lg:w-auto lg:pb-0">
            {NAV.map((item) => {
              const active = item.href === "/" ? location === "/" : location.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                    active ? "bg-forest text-cream" : "text-ink-soft hover:bg-sage-light hover:text-forest-deep",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-5 py-8 lg:px-8 lg:py-10">{children}</main>

      <footer className="mt-10 border-t border-hairline bg-parchment/60">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-5 py-6 text-[12px] text-ink-soft lg:px-8">
          <span>
            Cafe Park Avenue · вул. Соборна, Монастирище · карта сайту підготовлена для проєктування
          </span>
          <span>Структура: 5 розділів у шапці, 3 воронки, 4 транзакційні сторінки</span>
        </div>
      </footer>
    </div>
  );
}
