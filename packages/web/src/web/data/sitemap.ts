export type Priority = "P0" | "P1" | "P2";

export type PageType =
  | "entry"
  | "catalog"
  | "catalog-detail"
  | "service-hub"
  | "service"
  | "funnel"
  | "info"
  | "transactional"
  | "legal"
  | "system";

export type NodeStatus = "kept" | "new" | "changed" | "problem" | "removed";

export interface PageNode {
  id: string;
  title: string;
  url: string;
  type: PageType;
  priority: Priority;
  status: NodeStatus;
  segments: string[];
  goal: string;
  purpose: string;
  blocks: string[];
  primaryCta: string;
  secondaryCta?: string;
  from: string[];
  to: string[];
  note?: string;
  children?: PageNode[];
}

export const TYPE_LABEL: Record<PageType, string> = {
  entry: "Вхід",
  catalog: "Каталог",
  "catalog-detail": "Картка товару",
  "service-hub": "Хаб послуг",
  service: "Послуга",
  funnel: "Воронка",
  info: "Інформація",
  transactional: "Транзакційна",
  legal: "Правова",
  system: "Службова",
};

export const STATUS_LABEL: Record<NodeStatus, string> = {
  kept: "без змін",
  new: "нова",
  changed: "переосмислена",
  problem: "проблемна",
  removed: "прибрана",
};

export const SEGMENT_LABEL: Record<string, string> = {
  daily: "Daily Regular",
  occasion: "Occasion Buyer",
  all: "Усі",
};

/* ─────────────────────────── 1. ЗАПРОПОНОВАНА КАРТА ─────────────────────────── */

export const proposedTree: PageNode = {
  id: "home",
  title: "Головна",
  url: "/",
  type: "entry",
  priority: "P0",
  status: "kept",
  segments: ["all"],
  goal: "Зрозуміти, що це за заклад, і обрати подальший шлях",
  purpose: "Вхідна точка з сегментацією, Hero-блоком, вітриною меню, блоками довіри та контактами.",
  blocks: [
    "Sticky header з кошиком і перемикачем UA/EN",
    "Hero + live-статус + подвійне CTA",
    "Блок переваг (4 картки)",
    "Прев'ю меню з табами",
    "Історія, соціальний доказ, email-захоплення",
    "Футер з картою та формою зворотного зв'язку",
  ],
  primaryCta: "Переглянути меню",
  secondaryCta: "Замовити торт",
  from: ["Зовнішній трафік"],
  to: ["/menu", "/custom-cakes", "/reservation", "/services", "/about", "/contacts"],
  note: "Одна сторінка відповідає і за експрес-каву, і за святковий торт — без явної сегментації першого екрана.",
  children: [
    {
      id: "menu",
      title: "Меню",
      url: "/menu",
      type: "catalog",
      priority: "P0",
      status: "kept",
      segments: ["daily"],
      goal: "Знайти позицію, перевірити склад і ціну",
      purpose: "Інтерактивна каталожна сітка з категоріями, пошуком і дієтичними тегами.",
      blocks: ["Категорійні таби", "Дієтичні фільтри", "Сітка позицій"],
      primaryCta: "Додати в кошик",
      from: ["/"],
      to: ["/menu/:slug", "/cart"],
      children: [
        {
          id: "menu-item",
          title: "Картка товару",
          url: "/menu/:slug",
          type: "catalog-detail",
          priority: "P1",
          status: "problem",
          segments: ["daily"],
          goal: "Налаштувати модифікатори й додати в кошик",
          purpose: "Повноекранна сторінка товару з модифікаторами.",
          blocks: ["Фото", "Склад і алергени", "Модифікатори", "Кнопка «Додати в кошик»"],
          primaryCta: "Додати в кошик",
          from: ["/menu"],
          to: ["/cart"],
          note: "Повноекранний перехід вибиває користувача з меню: після додавання він втрачає позицію списку.",
        },
      ],
    },
    {
      id: "custom-cakes",
      title: "Замовити торт",
      url: "/custom-cakes",
      type: "service",
      priority: "P0",
      status: "kept",
      segments: ["occasion"],
      goal: "Побачити приклади робіт і сконструювати торт",
      purpose: "Портфоліо виконаних робіт, конфігуратор, Lead Time та оплата завдатку.",
      blocks: ["Галерея робіт", "Покроковий конфігуратор", "Плаваючий розрахунок Lead Time"],
      primaryCta: "Сконструювати торт",
      from: ["/", "/services/:slug"],
      to: ["/custom-cakes/portfolio", "/custom-cakes/build"],
      children: [
        {
          id: "portfolio",
          title: "Портфоліо робіт",
          url: "/custom-cakes/portfolio",
          type: "info",
          priority: "P2",
          status: "problem",
          segments: ["occasion"],
          goal: "Переконатися, що заклад уміє робити торт потрібного рівня",
          purpose: "Окрема сторінка галереї з lightbox.",
          blocks: ["Галерея виконаних робіт", "Lightbox"],
          primaryCta: "Сконструювати торт",
          from: ["/custom-cakes"],
          to: ["/custom-cakes/build"],
          note: "Той самий контент, що й блок галереї на /custom-cakes. Проміжний екран без самостійної мети.",
        },
        {
          id: "cake-builder",
          title: "Конфігуратор тортів",
          url: "/custom-cakes/build",
          type: "funnel",
          priority: "P0",
          status: "kept",
          segments: ["occasion"],
          goal: "Розрахувати вартість, перевірити дату та внести завдаток",
          purpose: "4 кроки: параметри → начинка → декор і фото → календар Lead Time → оплата завдатку 30%.",
          blocks: ["Кроки 1–4", "Завантаження фото-референсу", "Календар із блоком < 48 год", "Оплата завдатку"],
          primaryCta: "Сплатити завдаток 30%",
          from: ["/custom-cakes", "/custom-cakes/portfolio", "/services/cakes"],
          to: ["/checkout", "/order/:id"],
        },
      ],
    },
    {
      id: "reservation",
      title: "Бронювання столика",
      url: "/reservation",
      type: "funnel",
      priority: "P0",
      status: "kept",
      segments: ["all"],
      goal: "Зарезервувати столик без дзвінка",
      purpose: "Календар, 30-хвилинні слоти, зони закладу, форма підтвердження.",
      blocks: ["Календар", "Слоти по 30 хв", "Вибір зони", "Форма контактів"],
      primaryCta: "Підтвердити бронювання",
      from: ["/", "/services/reservation"],
      to: ["/"],
      note: "Доступна і як топ-рівневий пункт шапки, і як підсторінка «Послуг» — два входи, один екран.",
    },
    {
      id: "about",
      title: "Про нас",
      url: "/about",
      type: "info",
      priority: "P1",
      status: "kept",
      segments: ["all"],
      goal: "Переконатися в якості продукту й довіряти закладу",
      purpose: "Бренд-наратив: свіже обсмаження кави, натуральні інгредієнти, команда.",
      blocks: ["Історія", "Команда", "Процес обсмаження", "Галерея атмосфери"],
      primaryCta: "Переглянути меню",
      from: ["/"],
      to: ["/menu", "/contacts"],
    },
    {
      id: "services",
      title: "Послуги",
      url: "/services",
      type: "service-hub",
      priority: "P1",
      status: "problem",
      segments: ["all"],
      goal: "—",
      purpose: "Хаб-сторінка з переліком послуг закладу.",
      blocks: ["Перелік послуг"],
      primaryCta: "Дізнатися більше",
      from: ["/"],
      to: ["/services/:slug"],
      note: "Хаб заради хаба: 4 підпункти, з яких два вже мають власні входи в шапці.",
      children: [
        {
          id: "service-detail",
          title: "Деталі послуги",
          url: "/services/:slug",
          type: "service",
          priority: "P1",
          status: "problem",
          segments: ["all"],
          goal: "—",
          purpose: "Шаблонна сторінка послуги.",
          blocks: ["Опис", "CTA"],
          primaryCta: "—",
          from: ["/services"],
          to: ["/custom-cakes", "/reservation"],
          note: "Один шаблон на 4 різні сутності. Інстанси: кастомні торти, святкові набори й кейтеринг, бронювання столика, воркшопи.",
        },
      ],
    },
    {
      id: "contacts",
      title: "Контакти",
      url: "/contacts",
      type: "info",
      priority: "P0",
      status: "kept",
      segments: ["all"],
      goal: "Знайти адресу, години роботи та прокласти маршрут",
      purpose: "Графік, адреса, Google Maps, парковка, форма зворотного зв'язку.",
      blocks: ["Графік", "Карта", "Парковка", "Форма зворотного зв'язку"],
      primaryCta: "Прокласти маршрут",
      from: ["/", "футер"],
      to: ["/"],
      note: "Футер дублює 100% цієї сторінки — карту, години, форму та соцмережі.",
    },
    {
      id: "cart",
      title: "Кошик / Checkout",
      url: "/cart → /checkout",
      type: "transactional",
      priority: "P0",
      status: "kept",
      segments: ["daily"],
      goal: "Оформити замовлення на винос або доставку",
      purpose: "Список позицій, вибір Pickup/Delivery, контакти, оплата.",
      blocks: ["Список позицій", "Pickup / Delivery", "Контакти", "Оплата"],
      primaryCta: "Підтвердити замовлення",
      from: ["/menu", "/menu/:slug"],
      to: ["/order/:id"],
      note: "Delivery згадано як опція, але на сайті немає жодної інформації про зони, час і вартість доставки.",
    },
    {
      id: "order-status",
      title: "Статус замовлення",
      url: "/order/:id",
      type: "transactional",
      priority: "P2",
      status: "kept",
      segments: ["daily"],
      goal: "Забрати замовлення без черги",
      purpose: "Номер замовлення, таймер готовності, QR-код.",
      blocks: ["Номер", "Таймер", "QR-код", "Маршрут"],
      primaryCta: "Прокласти маршрут",
      from: ["/checkout"],
      to: ["/"],
    },
    {
      id: "legal",
      title: "Службові сторінки",
      url: "/oferta, /privacy, /404",
      type: "legal",
      priority: "P2",
      status: "problem",
      segments: ["all"],
      goal: "—",
      purpose: "Публічна оферта, політика конфіденційності, 404.",
      blocks: ["Юридичні тексти"],
      primaryCta: "—",
      from: ["футер"],
      to: ["/"],
      note: "Немає умов передзамовлення тортів, хоча клієнт сплачує завдаток 30% і мусить погодитись із правилами.",
    },
  ],
};

/* ─────────────────────────── 2. ВДОСКОНАЛЕНА КАРТА ─────────────────────────── */

export const improvedTree: PageNode = {
  id: "home",
  title: "Головна",
  url: "/",
  type: "entry",
  priority: "P0",
  status: "changed",
  segments: ["all"],
  goal: "За 5 секунд зрозуміти, чи заклад відкритий, і обрати свій шлях: їсти зараз чи замовити на подію",
  purpose:
    "Розводить два грошові сценарії на першому екрані. Не продає, а маршрутизує: ліва дія — швидка кава, права — торт на подію.",
  blocks: [
    "Sticky header: логотип, live-статус «🟢 Відкрито до 20:00», кошик, кнопка «Замовити»",
    "Hero: подвійне CTA — «Переглянути меню» / «Замовити торт»",
    "Блок переваг: власне обсмаження, без консервантів, свіжа випічка, локальні інгредієнти",
    "Прев'ю меню: 6–8 позицій з табами + дієтичні фільтри",
    "Блок «Наша історія» з командою і процесом",
    "Соціальний доказ: UGC-галерея + Google Reviews",
    "Email-захоплення з бонусом на перше замовлення",
    "Футер: адреса, години, маршрут, соцмережі, юридичні посилання",
  ],
  primaryCta: "Переглянути меню → /menu",
  secondaryCta: "Замовити торт → /orders/cakes",
  from: ["Пошук, Google Maps, Instagram, прямі заходи"],
  to: ["/menu", "/orders/cakes", "/reservation", "/about", "/contacts"],
  note: "Сегментація винесена в Hero: обидва сегменти бачать свою дію до скролу.",
  children: [
    {
      id: "menu",
      title: "Меню",
      url: "/menu",
      type: "catalog",
      priority: "P0",
      status: "kept",
      segments: ["daily"],
      goal: "Побачити актуальний асортимент із цінами, складом і алергенами та додати позицію за 2 тапи",
      purpose:
        "Інтерактивне меню замість PDF. Категорії, дієтичні фільтри та пошук — стани однієї сторінки, а не окремі URL.",
      blocks: [
        "Категорійні таби: Кава, Чай та напої, Десерти, Випічка, Сніданки",
        "Дієтичні фільтри: vegan / gluten-free / lactose-free",
        "Пошук по меню",
        "Сітка позицій зі швидким «+» у кошик",
        "Live-статус закладу та орієнтовний час готовності",
        "Slide-in кошик без переходу зі сторінки",
      ],
      primaryCta: "Додати в кошик",
      secondaryCta: "Перейти в кошик",
      from: ["/", "Sticky bottom bar", "/orders/cakes"],
      to: ["/menu/:slug (модалка)", "/cart"],
      children: [
        {
          id: "menu-item",
          title: "Картка товару",
          url: "/menu/:slug",
          type: "catalog-detail",
          priority: "P1",
          status: "changed",
          segments: ["daily"],
          goal: "Налаштувати позицію — об'єм, молоко, топінги — і перевірити склад та алергени",
          purpose:
            "Модальне вікно з власною URL: не вибиває користувача з меню, але позицію можна зашарити посиланням.",
          blocks: [
            "Фото продукту",
            "Склад і алергени",
            "Каскадні модифікатори з динамічним перерахунком ціни",
            "«Додати в кошик»",
            "Fallback стоп-листа: пропозиція альтернативи замість деактивації",
          ],
          primaryCta: "Додати в кошик",
          from: ["/menu"],
          to: ["/cart"],
          note: "Було повноекранною сторінкою → стало модалкою. Мінус 1 клік, збережений скрол меню.",
        },
      ],
    },
    {
      id: "orders",
      title: "Замовлення",
      url: "/orders",
      type: "service-hub",
      priority: "P1",
      status: "changed",
      segments: ["occasion"],
      goal: "Зрозуміти, що взагалі можна замовити заздалегідь, за які гроші й за скільки днів",
      purpose:
        "Не меню-меню, а лендинг-розвилка: дві картки послуг із ціною «від», Lead Time і кнопкою. Об'єднує послуги одного типу — замовлення заздалегідь.",
      blocks: [
        "Дві картки послуг: «Кастомні торти» та «Святкові набори й кейтеринг»",
        "Ціна «від», мінімальний Lead Time, орієнтовна кількість порцій",
        "Короткі правила: завдаток 30%, зміни за 48 год",
        "FAQ із 4 питань",
      ],
      primaryCta: "Замовити торт",
      secondaryCta: "Святкові набори",
      from: ["/", "Шапка (dropdown)", "Пошук"],
      to: ["/orders/cakes", "/orders/sets", "/cake-terms"],
      note: "Виправлений «Послуги»: названий за інтентом користувача, містить лише реальні послуги, головний CTA з головної його обходить.",
      children: [
        {
          id: "cakes",
          title: "Кастомні торти",
          url: "/orders/cakes",
          type: "service",
          priority: "P0",
          status: "changed",
          segments: ["occasion"],
          goal: "Переконатися, що заклад зробить потрібний торт, і зрозуміти ціну та найближчу дату",
          purpose:
            "Повноцінна сторінка послуги: портфоліо, варіанти начинок, формула ціни, Lead Time і правила завдатку — усе до входу в конфігуратор.",
          blocks: [
            "Галерея виконаних робіт з lightbox",
            "Варіанти начинок із фото розрізу",
            "Формула ціни: вага × начинка × декор, «від N грн»",
            "Видима найближча доступна дата (Lead Time ≥ 48 год)",
            "Умови: завдаток 30%, політика скасування",
            "Відгуки на замовлення тортів",
          ],
          primaryCta: "Сконструювати торт",
          secondaryCta: "Порахувати вартість",
          from: ["Hero головної", "/orders", "Шапка (dropdown)", "Пошук"],
          to: ["/orders/cakes/build", "/cake-terms"],
          note: "Забирає контент колишніх /services/cakes і /custom-cakes/portfolio — одна сутність, одна URL.",
          children: [
            {
              id: "cake-builder",
              title: "Конфігуратор тортів",
              url: "/orders/cakes/build",
              type: "funnel",
              priority: "P0",
              status: "changed",
              segments: ["occasion"],
              goal: "Розрахувати вартість, обрати дату й внести завдаток онлайн",
              purpose:
                "4 кроки з прогресом, автозбереженням чернетки та видимим Lead Time. Чернетка відновлюється після повернення на сайт.",
              blocks: [
                "Крок 1: тип і вага (з підказкою «≈ N порцій»)",
                "Крок 2: начинка з фото розрізу",
                "Крок 3: декор, напис, фото-референс до 10 МБ",
                "Крок 4: календар, де дати < 48 год недоступні з поясненням",
                "Підсумок із деталізацією ціни та розміром завдатку 30%",
                "Оплата завдатку та підтвердження заявки",
              ],
              primaryCta: "Сплатити завдаток 30%",
              secondaryCta: "Зберегти чернетку",
              from: ["/orders/cakes"],
              to: ["/checkout", "/order/:id"],
            },
          ],
        },
        {
          id: "sets",
          title: "Святкові набори та кейтеринг",
          url: "/orders/sets",
          type: "service",
          priority: "P1",
          status: "new",
          segments: ["occasion"],
          goal: "Замовити набір на корпоратив, день народження чи іншу подію",
          purpose:
            "Друга реальна послуга з тим самим типом замовлення, але іншою формою: без конфігуратора, зате з розрахунком на кількість гостей.",
          blocks: [
            "Готові набори з ціною за особу",
            "Калькулятор кількості гостей",
            "Lead Time і умови доставки на подію",
            "Форма заявки на індивідуальний розрахунок",
          ],
          primaryCta: "Отримати розрахунок",
          from: ["/orders", "Шапка (dropdown)"],
          to: ["/cake-terms", "/contacts"],
        },
      ],
    },
    {
      id: "reservation",
      title: "Бронювання столика",
      url: "/reservation",
      type: "funnel",
      priority: "P0",
      status: "kept",
      segments: ["all"],
      goal: "Зарезервувати столик на потрібний час без дзвінка",
      purpose: "Календар, 30-хвилинні слоти, зони закладу, контакти. Одна сторінка — один вхід.",
      blocks: [
        "Календар (минулі дати та вихідні недоступні)",
        "Слоти по 30 хв із перевіркою ємності",
        "Вибір зони закладу та кількості гостей",
        "Коментар до бронювання",
        "Контакти та підтвердження",
      ],
      primaryCta: "Підтвердити бронювання",
      from: ["/", "Шапка", "Sticky bottom bar"],
      to: ["/reservation/:id"],
      note: "Прибрано дублюючий вхід через /services/reservation.",
    },
    {
      id: "about",
      title: "Про нас",
      url: "/about",
      type: "info",
      priority: "P1",
      status: "kept",
      segments: ["all"],
      goal: "Переконатися, що закладу можна довіряти, і відчути атмосферу",
      purpose:
        "Бренд-наратив: обсмаження, інгредієнти, команда. Сюди ж переїхали події та воркшопи — поки їх немає, окремої сторінки не існує.",
      blocks: [
        "Історія закладу",
        "Команда та процес",
        "Галерея атмосфери й інтер'єру",
        "Події та дегустації — секція, що з'являється лише за наявності афіші",
      ],
      primaryCta: "Переглянути меню",
      from: ["/", "Футер"],
      to: ["/menu", "/contacts"],
    },
    {
      id: "contacts",
      title: "Контакти",
      url: "/contacts",
      type: "info",
      priority: "P0",
      status: "changed",
      segments: ["all"],
      goal: "Знайти адресу, години, маршрут і спосіб зв'язку",
      purpose:
        "Одна повна сторінка контактів. Футер більше не дублює її — лише адреса, години та кнопка маршруту.",
      blocks: [
        "Адреса, live-статус і повний графік",
        "Google Maps і кнопка «Прокласти маршрут»",
        "Парковка та як знайти вхід",
        "Зони та умови доставки",
        "Телефон, соцмережі, форма зворотного зв'язку",
      ],
      primaryCta: "Прокласти маршрут",
      secondaryCta: "Написати нам",
      from: ["/", "Футер", "Шапка"],
      to: ["/menu", "/reservation"],
    },
    {
      id: "cart",
      title: "Кошик",
      url: "/cart",
      type: "transactional",
      priority: "P0",
      status: "changed",
      segments: ["daily"],
      goal: "Перевірити замовлення й перейти до оплати",
      purpose: "Slide-in панель, а не окремий розділ навігації. Повноекранна версія — лише як fallback.",
      blocks: ["Позиції та модифікатори", "Сума", "Орієнтовний час готовності", "Перехід до оформлення"],
      primaryCta: "Оформити замовлення",
      from: ["/menu", "/menu/:slug"],
      to: ["/checkout"],
    },
    {
      id: "checkout",
      title: "Оформлення",
      url: "/checkout",
      type: "transactional",
      priority: "P0",
      status: "changed",
      segments: ["daily"],
      goal: "Оплатити й отримати час готовності",
      purpose:
        "Один екран: спосіб отримання, контакти, оплата. Тут же — зони, час і вартість доставки, яких раніше не було ніде.",
      blocks: [
        "Pickup / Delivery із зонами, часом і вартістю",
        "Час отримання або слот доставки",
        "Контакти з валідацією телефону",
        "Apple Pay / Google Pay / картка",
        "Згода з умовами",
      ],
      primaryCta: "Оплатити",
      from: ["/cart", "/orders/cakes/build"],
      to: ["/order/:id"],
    },
    {
      id: "order-status",
      title: "Замовлення прийнято",
      url: "/order/:id",
      type: "transactional",
      priority: "P0",
      status: "new",
      segments: ["daily", "occasion"],
      goal: "Зрозуміти, коли й як забрати замовлення",
      purpose:
        "Спільна сторінка підтвердження для pickup і передзамовлення торта. Номер, таймер або дата, QR-код, маршрут.",
      blocks: [
        "Номер замовлення",
        "Таймер готовності (pickup) або дата отримання (торт)",
        "QR-код для стійки",
        "Прокласти маршрут",
        "Деталі замовлення",
      ],
      primaryCta: "Прокласти маршрут",
      from: ["/checkout"],
      to: ["/", "/contacts"],
      note: "У запропонованій карті існувала як «розділ», але сторінки підтвердження для неї не було — тобто сценарій обривався.",
    },
    {
      id: "reservation-confirm",
      title: "Бронювання підтверджено",
      url: "/reservation/:id",
      type: "transactional",
      priority: "P1",
      status: "new",
      segments: ["all"],
      goal: "Перевірити, змінити або скасувати бронювання",
      purpose:
        "Сторінка, на яку веде посилання з SMS. Без неї обіцянка «посилання на скасування» не працює.",
      blocks: ["Деталі бронювання", "Календарна подія", "Змінити час", "Скасувати бронювання"],
      primaryCta: "Змінити бронювання",
      secondaryCta: "Скасувати",
      from: ["/reservation", "SMS/Email"],
      to: ["/reservation"],
    },
    {
      id: "cake-terms",
      title: "Умови передзамовлення",
      url: "/cake-terms",
      type: "legal",
      priority: "P1",
      status: "new",
      segments: ["occasion"],
      goal: "Зрозуміти правила до того, як платити завдаток",
      purpose:
        "Lead Time ≥ 48 год, розмір завдатку 30%, правила зміни та скасування, повернення. Знімає головну тривогу перед оплатою.",
      blocks: ["Терміни виготовлення", "Завдаток і повернення", "Зміни та скасування", "Відповідальність сторін"],
      primaryCta: "Повернутися до конфігуратора",
      from: ["/orders", "/orders/cakes", "/orders/cakes/build", "/checkout"],
      to: ["/orders/cakes/build"],
    },
    {
      id: "legal",
      title: "Правові та службові",
      url: "/oferta, /privacy, /404",
      type: "legal",
      priority: "P2",
      status: "kept",
      segments: ["all"],
      goal: "Отримати юридичну інформацію",
      purpose: "Публічна оферта, політика конфіденційності, сторінка 404 з підказками куди йти.",
      blocks: ["Юридичні тексти", "404 з посиланнями на меню, замовлення і контакти"],
      primaryCta: "На головну",
      from: ["Футер"],
      to: ["/"],
    },
  ],
};

/* ─────────────────────────── Допоміжні ─────────────────────────── */

export interface FlatNode extends PageNode {
  depth: number;
  parentId: string | null;
  path: string[];
}

export function flatten(nodes: PageNode[], depth = 0, parentId: string | null = null, path: string[] = []): FlatNode[] {
  return nodes.flatMap((n) => {
    const chain = [...path, n.id];
    const self: FlatNode = { ...n, depth, parentId, path: chain };
    return [self, ...(n.children ? flatten(n.children, depth + 1, n.id, chain) : [])];
  });
}

export function findNode(nodes: PageNode[], id: string): PageNode | undefined {
  for (const n of nodes) {
    if (n.id === id) return n;
    const hit = n.children ? findNode(n.children, id) : undefined;
    if (hit) return hit;
  }
  return undefined;
}

export function countNodes(nodes: PageNode[]): number {
  return flatten(nodes).length;
}

export function depthOf(nodes: PageNode[], id: string): number {
  return flatten(nodes).find((n) => n.id === id)?.depth ?? 0;
}
