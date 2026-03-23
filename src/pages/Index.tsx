import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const PORTFOLIO_ITEMS = [
  {
    img: "https://cdn.poehali.dev/projects/f7362bed-824b-41bb-a54c-d0c724826ed8/files/8783e11f-e4b0-4695-9a82-9e906c1ad028.jpg",
    title: "Световой короб",
    category: "Торговый центр",
  },
  {
    img: "https://cdn.poehali.dev/projects/f7362bed-824b-41bb-a54c-d0c724826ed8/files/4f869fa1-b481-4856-b72b-f1657d207fc9.jpg",
    title: "Объёмные буквы",
    category: "Офисный центр",
  },
  {
    img: "https://cdn.poehali.dev/projects/f7362bed-824b-41bb-a54c-d0c724826ed8/files/21a2f0a0-9bed-4fc1-b205-86bd7ce03d52.jpg",
    title: "Входная группа",
    category: "Ресторан",
  },
  {
    img: "https://cdn.poehali.dev/projects/f7362bed-824b-41bb-a54c-d0c724826ed8/files/17abe765-2e0a-4e55-bef1-816488ad7afb.jpg",
    title: "Декоративные элементы",
    category: "Фасад здания",
  },
];

const SERVICES = [
  { icon: "Square", title: "Световые короба", desc: "Классические лайтбоксы с равномерной подсветкой. Долговечность, яркость, защита от любых погодных условий." },
  { icon: "Type", title: "Объёмные буквы", desc: "Индивидуальные буквы с боковой или обратной подсветкой. Идеальны для фасадов и витрин." },
  { icon: "LayoutPanelLeft", title: "Панель-кронштейны", desc: "Двусторонние вывески на консольном кронштейне — привлекают внимание с обеих сторон улицы." },
  { icon: "SunMedium", title: "Световые панели", desc: "Ультратонкие LED-панели с равномерной подсветкой. Подходят для интерьеров и витрин." },
  { icon: "DoorOpen", title: "Входные группы", desc: "Комплексное оформление входа: козырёк, буквы, декор. Создаём первое впечатление о бизнесе." },
  { icon: "Sparkles", title: "Декоративные элементы", desc: "Светящиеся логотипы, формы, арт-объекты. Уникальный визуальный акцент для вашего пространства." },
];

const PRICE_ITEMS = [
  { name: "Световой короб (1 кв.м)", price: "от 8 500 ₽", note: "внутренняя подсветка LED" },
  { name: "Объёмные буквы (1 пог.м)", price: "от 4 200 ₽", note: "высота буквы до 30 см" },
  { name: "Панель-кронштейн", price: "от 12 000 ₽", note: "двусторонний, с монтажом" },
  { name: "Световая панель (1 кв.м)", price: "от 6 800 ₽", note: "толщина от 20 мм" },
  { name: "Входная группа", price: "от 45 000 ₽", note: "комплексный проект" },
  { name: "Декоративные элементы", price: "от 3 500 ₽", note: "в зависимости от сложности" },
  { name: "Световой фасад (1 кв.м)", price: "от 14 000 ₽", note: "архитектурная подсветка" },
];

const SIGN_TYPES = [
  { id: "box", label: "Световой короб", base: 8500 },
  { id: "letters", label: "Объёмные буквы", base: 4200 },
  { id: "panel", label: "Световая панель", base: 6800 },
  { id: "entrance", label: "Входная группа", base: 45000 },
  { id: "facade", label: "Световой фасад", base: 14000 },
];

const BACKLIGHT_OPTIONS = [
  { id: "standard", label: "Стандартная LED", mult: 1 },
  { id: "rgb", label: "RGB динамическая", mult: 1.4 },
  { id: "neon", label: "Неон-эффект", mult: 1.6 },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signType, setSignType] = useState(SIGN_TYPES[0]);
  const [area, setArea] = useState(2);
  const [backlight, setBacklight] = useState(BACKLIGHT_OPTIONS[0]);
  const [installation, setInstallation] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", comment: "" });
  const [formSent, setFormSent] = useState(false);

  const calcPrice = () => {
    const base = signType.id === "entrance" ? signType.base : signType.base * area;
    const withLight = base * backlight.mult;
    const withInstall = installation ? withLight * 1.2 : withLight;
    return Math.round(withInstall / 100) * 100;
  };

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handler = () => {
      const sections = ["home", "services", "portfolio", "price", "calculator", "about", "contacts"];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) { setActiveSection(s); break; }
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const rangeStyle = (val: number, min: number, max: number) => ({
    background: `linear-gradient(to right, hsl(38, 92%, 55%) ${((val - min) / (max - min)) * 100}%, hsl(0, 0%, 20%) ${((val - min) / (max - min)) * 100}%)`
  });

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f5f0e8]">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-[#f5c842] flex items-center justify-center">
              <Icon name="Zap" size={16} className="text-[#0d0d0d]" />
            </div>
            <span className="font-['Oswald'] text-xl font-bold tracking-widest uppercase text-white">
              ПРЕЗЕНТАЛ<span className="text-[#f5c842]"> 2.0</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {[
              ["home", "Главная"],
              ["services", "Услуги"],
              ["portfolio", "Портфолио"],
              ["price", "Прайс"],
              ["calculator", "Калькулятор"],
              ["about", "О нас"],
              ["contacts", "Контакты"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`nav-link text-sm font-['Montserrat'] font-medium tracking-wide ${activeSection === id ? "text-[#f5c842]" : "text-white/60"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <button onClick={() => scrollTo("contacts")} className="hidden md:block btn-gold px-5 py-2 text-sm rounded-sm">
            Заказать
          </button>

          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-[#0d0d0d] border-t border-white/[0.06] px-6 py-4 flex flex-col gap-4">
            {[
              ["home", "Главная"],
              ["services", "Услуги"],
              ["portfolio", "Портфолио"],
              ["price", "Прайс"],
              ["calculator", "Калькулятор"],
              ["about", "О нас"],
              ["contacts", "Контакты"],
            ].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left text-white/80 font-medium py-1 font-['Montserrat']">
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-16">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(245, 200, 66, 0.07) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px gold-line opacity-30" />

        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            <div className="animate-fade-up-delay-1 inline-flex items-center gap-2 border border-[#f5c842]/30 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#f5c842] animate-pulse" />
              <span className="text-xs font-['Montserrat'] tracking-widest text-[#f5c842] uppercase">Производство в Иркутске</span>
            </div>

            <h1 className="animate-fade-up-delay-2 font-['Oswald'] text-5xl md:text-7xl font-bold uppercase leading-none mb-6 text-white">
              Световые<br />
              <span className="text-shimmer">вывески</span><br />
              для бизнеса
            </h1>

            <p className="animate-fade-up-delay-3 text-white/50 text-lg leading-relaxed mb-10 max-w-lg font-['Montserrat'] font-light">
              Изготовляем световые короба, объёмные буквы, панели и входные группы. Проектирование, производство и монтаж под ключ.
            </p>

            <div className="animate-fade-up-delay-4 flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo("calculator")} className="btn-gold px-8 py-4 text-base rounded-sm">
                Рассчитать стоимость
              </button>
              <button onClick={() => scrollTo("portfolio")} className="btn-outline-gold px-8 py-4 text-base rounded-sm">
                Смотреть работы
              </button>
            </div>

            <div className="animate-fade-up-delay-5 flex gap-10 mt-14 pt-8 border-t border-white/[0.05]">
              {[["500+", "проектов"], ["12", "лет опыта"], ["48ч", "от макета"]].map(([val, label]) => (
                <div key={label}>
                  <div className="font-['Oswald'] text-3xl font-bold text-[#f5c842]">{val}</div>
                  <div className="text-xs text-white/30 uppercase tracking-widest font-['Montserrat']">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block animate-fade-up">
            <div className="aspect-square rounded-sm overflow-hidden border border-[#f5c842]/20 relative">
              <img
                src="https://cdn.poehali.dev/projects/f7362bed-824b-41bb-a54c-d0c724826ed8/files/3e514d85-4ae5-470d-939a-37a65744964d.jpg"
                alt="Световая вывеска"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#141414] border border-white/[0.08] rounded-sm p-4 shadow-2xl">
              <div className="text-xs text-white/30 uppercase tracking-widest mb-1 font-['Montserrat']">Срок изготовления</div>
              <div className="font-['Oswald'] text-2xl font-bold text-[#f5c842]">3–7 дней</div>
            </div>
          </div>
        </div>

        <button onClick={() => scrollTo("services")} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 hover:text-[#f5c842] transition-colors">
          <span className="text-xs tracking-widest uppercase font-['Montserrat']">Далее</span>
          <Icon name="ChevronDown" size={20} />
        </button>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="text-xs tracking-widest text-[#f5c842] uppercase font-['Montserrat'] mb-3">Что мы делаем</div>
            <h2 className="font-['Oswald'] text-4xl md:text-5xl font-bold uppercase text-white">Наши услуги</h2>
            <div className="mt-4 w-16 h-0.5 bg-[#f5c842]" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card bg-[#111111] border border-white/[0.06] rounded-sm p-6 cursor-default">
                <div className="w-11 h-11 rounded-sm bg-[#f5c842]/10 border border-[#f5c842]/20 flex items-center justify-center mb-5">
                  <Icon name={s.icon} size={20} className="text-[#f5c842]" />
                </div>
                <h3 className="font-['Oswald'] text-lg font-medium text-white mb-2 uppercase tracking-wide">{s.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-['Montserrat'] font-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-xs tracking-widest text-[#f5c842] uppercase font-['Montserrat'] mb-3">Наши объекты</div>
              <h2 className="font-['Oswald'] text-4xl md:text-5xl font-bold uppercase text-white">Примеры работ</h2>
              <div className="mt-4 w-16 h-0.5 bg-[#f5c842]" />
            </div>
            <p className="text-white/30 max-w-sm text-sm font-['Montserrat'] font-light leading-relaxed">
              Каждый проект — уникальное решение. Работаем с любым масштабом бизнеса.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTFOLIO_ITEMS.map((item, i) => (
              <div key={i} className="portfolio-card rounded-sm overflow-hidden border border-white/[0.06] cursor-pointer">
                <div className="relative aspect-square">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  <div className="portfolio-overlay" />
                </div>
                <div className="p-4 bg-[#111111]">
                  <div className="text-xs text-[#f5c842] uppercase tracking-wider font-['Montserrat'] mb-1">{item.category}</div>
                  <div className="font-['Oswald'] text-lg text-white uppercase">{item.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section id="price" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="text-xs tracking-widest text-[#f5c842] uppercase font-['Montserrat'] mb-3">Прозрачное ценообразование</div>
            <h2 className="font-['Oswald'] text-4xl md:text-5xl font-bold uppercase text-white">Прайс-лист</h2>
            <div className="mt-4 w-16 h-0.5 bg-[#f5c842]" />
          </div>

          <div className="bg-[#111111] rounded-sm border border-white/[0.06] overflow-hidden">
            <div className="hidden md:grid grid-cols-3 px-6 py-3 border-b border-white/[0.04] bg-[#0d0d0d]">
              <span className="text-xs uppercase tracking-widest text-white/20 font-['Montserrat']">Изделие</span>
              <span className="text-xs uppercase tracking-widest text-white/20 font-['Montserrat']">Стоимость</span>
              <span className="text-xs uppercase tracking-widest text-white/20 font-['Montserrat']">Примечание</span>
            </div>

            {PRICE_ITEMS.map((item, i) => (
              <div key={i} className="grid md:grid-cols-3 gap-2 md:gap-0 px-6 py-5 border-b border-white/[0.03] last:border-0 hover:bg-[#f5c842]/[0.02] transition-colors">
                <div className="font-['Montserrat'] text-white/80 font-medium">{item.name}</div>
                <div className="font-['Oswald'] text-xl text-[#f5c842] font-semibold">{item.price}</div>
                <div className="text-sm text-white/30 font-['Montserrat'] font-light">{item.note}</div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-white/20 font-['Montserrat'] font-light">
            * Цены указаны без монтажа. Точную стоимость рассчитайте в калькуляторе ниже или оставьте заявку.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="text-xs tracking-widest text-[#f5c842] uppercase font-['Montserrat'] mb-3">Быстрый расчёт</div>
            <h2 className="font-['Oswald'] text-4xl md:text-5xl font-bold uppercase text-white">Калькулятор</h2>
            <div className="mt-4 w-16 h-0.5 bg-[#f5c842]" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div>
                <label className="text-xs uppercase tracking-widest text-white/30 font-['Montserrat'] block mb-4">Тип вывески</label>
                <div className="grid grid-cols-1 gap-2">
                  {SIGN_TYPES.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setSignType(type)}
                      className={`text-left px-5 py-3.5 rounded-sm border transition-all font-['Montserrat'] text-sm font-medium ${
                        signType.id === type.id
                          ? "border-[#f5c842] bg-[#f5c842]/10 text-[#f5c842]"
                          : "border-white/[0.06] bg-[#111111] text-white/50 hover:border-white/[0.15]"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {signType.id !== "entrance" && (
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/30 font-['Montserrat'] block mb-4">
                    Площадь: <span className="text-[#f5c842] font-semibold">{area} кв.м</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={area}
                    onChange={e => setArea(Number(e.target.value))}
                    className="calculator-range w-full"
                    style={rangeStyle(area, 1, 20)}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-white/20 font-['Montserrat']">1 кв.м</span>
                    <span className="text-xs text-white/20 font-['Montserrat']">20 кв.м</span>
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs uppercase tracking-widest text-white/30 font-['Montserrat'] block mb-4">Тип подсветки</label>
                <div className="flex flex-col gap-2">
                  {BACKLIGHT_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setBacklight(opt)}
                      className={`text-left px-5 py-3.5 rounded-sm border transition-all font-['Montserrat'] text-sm flex justify-between items-center ${
                        backlight.id === opt.id
                          ? "border-[#f5c842] bg-[#f5c842]/10 text-[#f5c842]"
                          : "border-white/[0.06] bg-[#111111] text-white/50 hover:border-white/[0.15]"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {opt.mult > 1 && <span className="text-xs opacity-60">×{opt.mult}</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-white/30 font-['Montserrat'] block mb-4">Монтаж</label>
                <button
                  onClick={() => setInstallation(!installation)}
                  className={`flex items-center gap-3 px-5 py-3.5 rounded-sm border transition-all font-['Montserrat'] text-sm ${
                    installation
                      ? "border-[#f5c842] bg-[#f5c842]/10 text-[#f5c842]"
                      : "border-white/[0.06] bg-[#111111] text-white/50 hover:border-white/[0.15]"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-all ${installation ? "bg-[#f5c842] border-[#f5c842]" : "border-white/20"}`}>
                    {installation && <Icon name="Check" size={10} className="text-[#0d0d0d]" />}
                  </div>
                  Включить монтаж (+20%)
                </button>
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <div className="bg-[#111111] rounded-sm p-8 border border-[#f5c842]/20 glow-gold">
                <div className="text-xs uppercase tracking-widest text-white/20 font-['Montserrat'] mb-2">Предварительная стоимость</div>
                <div className="font-['Oswald'] text-5xl md:text-6xl font-bold text-[#f5c842] mb-1">
                  {calcPrice().toLocaleString("ru-RU")} ₽
                </div>
                <div className="text-sm text-white/20 font-['Montserrat'] font-light mb-8">
                  Без НДС. Точный расчёт — после замеров.
                </div>

                <div className="space-y-3 mb-8 pb-8 border-b border-white/[0.05]">
                  <div className="flex justify-between text-sm font-['Montserrat']">
                    <span className="text-white/30">Тип</span>
                    <span className="text-white/70">{signType.label}</span>
                  </div>
                  {signType.id !== "entrance" && (
                    <div className="flex justify-between text-sm font-['Montserrat']">
                      <span className="text-white/30">Площадь</span>
                      <span className="text-white/70">{area} кв.м</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-['Montserrat']">
                    <span className="text-white/30">Подсветка</span>
                    <span className="text-white/70">{backlight.label}</span>
                  </div>
                  <div className="flex justify-between text-sm font-['Montserrat']">
                    <span className="text-white/30">Монтаж</span>
                    <span className="text-white/70">{installation ? "Включён" : "Не включён"}</span>
                  </div>
                </div>

                <button onClick={() => scrollTo("contacts")} className="btn-gold w-full py-4 text-sm rounded-sm text-center block">
                  Получить точный расчёт
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs tracking-widest text-[#f5c842] uppercase font-['Montserrat'] mb-3">Кто мы</div>
              <h2 className="font-['Oswald'] text-4xl md:text-5xl font-bold uppercase text-white mb-6">О компании</h2>
              <div className="w-16 h-0.5 bg-[#f5c842] mb-8" />

              <p className="text-white/50 leading-relaxed mb-6 font-['Montserrat'] font-light">
                Мы — производственная компания с 12-летним опытом в изготовлении световой рекламы. Наш завод оснащён современным оборудованием и позволяет выполнять заказы любой сложности.
              </p>
              <p className="text-white/50 leading-relaxed mb-10 font-['Montserrat'] font-light">
                Работаем полного цикла: от разработки дизайна и 3D-визуализации до производства, доставки и монтажа. Предоставляем гарантию на все изделия.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: "Award", title: "Гарантия 3 года", desc: "На все изделия и работы" },
                  { icon: "Truck", title: "Доставка по России", desc: "Транспортные компании" },
                  { icon: "Pencil", title: "3D-визуализация", desc: "Бесплатно при заказе" },
                  { icon: "Headphones", title: "Поддержка 24/7", desc: "Всегда на связи" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-9 h-9 rounded-sm bg-[#f5c842]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name={item.icon} size={16} className="text-[#f5c842]" />
                    </div>
                    <div>
                      <div className="font-['Oswald'] text-sm font-medium text-white uppercase tracking-wide">{item.title}</div>
                      <div className="text-xs text-white/30 font-['Montserrat'] mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { val: "500+", label: "Проектов выполнено" },
                { val: "12", label: "Лет на рынке" },
                { val: "48ч", label: "До первого макета" },
                { val: "98%", label: "Довольных клиентов" },
              ].map((s, i) => (
                <div key={i} className="bg-[#111111] rounded-sm p-8 border border-white/[0.06] text-center hover:border-[#f5c842]/30 transition-colors">
                  <div className="font-['Oswald'] text-5xl font-bold text-[#f5c842] mb-2">{s.val}</div>
                  <div className="text-xs text-white/30 uppercase tracking-widest font-['Montserrat']">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="text-xs tracking-widest text-[#f5c842] uppercase font-['Montserrat'] mb-3">Обратная связь</div>
            <h2 className="font-['Oswald'] text-4xl md:text-5xl font-bold uppercase text-white">Контакты</h2>
            <div className="mt-4 w-16 h-0.5 bg-[#f5c842]" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              {formSent ? (
                <div className="bg-[#111111] rounded-sm border border-white/[0.06] p-12 text-center h-full flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#f5c842]/15 flex items-center justify-center">
                    <Icon name="Check" size={32} className="text-[#f5c842]" />
                  </div>
                  <h3 className="font-['Oswald'] text-2xl font-bold text-white uppercase">Заявка отправлена!</h3>
                  <p className="text-white/40 font-['Montserrat'] font-light text-sm">Мы свяжемся с вами в течение 1 рабочего часа</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/20 font-['Montserrat'] block mb-2">Ваше имя</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="w-full px-4 py-3.5 rounded-sm text-sm font-['Montserrat'] bg-[#111111] border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-[#f5c842]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/20 font-['Montserrat'] block mb-2">Телефон</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full px-4 py-3.5 rounded-sm text-sm font-['Montserrat'] bg-[#111111] border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-[#f5c842]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/20 font-['Montserrat'] block mb-2">Комментарий</label>
                    <textarea
                      rows={4}
                      value={formData.comment}
                      onChange={e => setFormData({ ...formData, comment: e.target.value })}
                      placeholder="Опишите задачу: тип вывески, размеры, срочность..."
                      className="w-full px-4 py-3.5 rounded-sm text-sm font-['Montserrat'] bg-[#111111] border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-[#f5c842]/50 transition-colors resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-gold w-full py-4 text-sm rounded-sm">
                    Отправить заявку
                  </button>
                  <p className="text-xs text-white/15 font-['Montserrat'] text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </div>

            <div className="space-y-4">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                { icon: "Mail", label: "Email", value: "info@lightsign.ru" },
                { icon: "MapPin", label: "Адрес", value: "Москва, ул. Производственная, 1" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00–18:00" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-[#111111] rounded-sm border border-white/[0.06] hover:border-[#f5c842]/30 transition-colors">
                  <div className="w-10 h-10 rounded-sm bg-[#f5c842]/10 flex items-center justify-center shrink-0">
                    <Icon name={item.icon} size={18} className="text-[#f5c842]" />
                  </div>
                  <div>
                    <div className="text-xs text-white/25 uppercase tracking-widest font-['Montserrat'] mb-1">{item.label}</div>
                    <div className="font-['Montserrat'] font-medium text-white/80">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm bg-[#f5c842] flex items-center justify-center">
              <Icon name="Zap" size={12} className="text-[#0d0d0d]" />
            </div>
            <span className="font-['Oswald'] text-base font-bold tracking-widest uppercase text-white">
              ПРЕЗЕНТАЛ<span className="text-[#f5c842]"> 2.0</span>
            </span>
          </div>
          <p className="text-xs text-white/15 font-['Montserrat']">
            © 2024 ПРЕЗЕНТАЛ 2.0. Производство световой рекламы
          </p>
          <div className="flex gap-6">
            {[["services", "Услуги"], ["price", "Прайс"], ["contacts", "Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-xs text-white/20 hover:text-[#f5c842] transition-colors font-['Montserrat'] tracking-wide uppercase">
                {label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}