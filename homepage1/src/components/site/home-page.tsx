import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Mail,
  MapPin,
  Menu,
  MessageCircleQuestion,
  Phone,
  Play,
  Printer,
  Star,
  X,
} from "lucide-react";
import {
  ADDRESS,
  EMAIL,
  GOOGLE_RATING,
  MAP_EMBED,
  MAP_LINK,
  PHONE,
  PHONE_HREF,
  REVIEWS_LINK,
  VIDEO,
  areas,
  brands,
  coupons,
  faqs,
  gallery,
  quoteServices,
  reviews,
  services,
  socials,
} from "@/data/site";

const issues = [
  { n: "01", title: "Door won't open", text: "Find why it stalled — spring, track, or opener." },
  { n: "02", title: "Opener issue", text: "Motor, sensors, remotes, and keypad." },
  { n: "03", title: "Broken spring", text: "Heavy door, or one that won't stay up." },
  { n: "04", title: "Door off track", text: "Bent track, cables, or a door that jumped." },
];

const reasons = [
  { title: "Clear guidance", text: "We explain the problem before anyone starts work." },
  { title: "Skilled technicians", text: "The same local crew, not a call center handoff." },
  { title: "Careful workmanship", text: "Balanced, quiet, and finished the day you call when we can." },
  { title: "Respect for your home", text: "A text when we're on the way, with a photo of the tech." },
];

const flow = [
  { n: "01", title: "Tell us what's wrong", text: "Call or schedule and share what the door is doing — or not doing." },
  { n: "02", title: "We inspect the door", text: "A technician looks at the system, names the issue, and prices it first." },
  { n: "03", title: "Get it moving again", text: "Repair, spring, opener, or a new door — then a clear bill." },
];

const advice = [
  {
    title: "When a spring snaps",
    text: "A door that feels suddenly heavy is not a motor problem. Don't force it. Dual spring changes include tax, labor, and a 10-year warranty.",
    image: "/brand/doorD.webp",
    alt: "Wood garage door set in stone",
  },
  {
    title: "Repair the door or replace it",
    text: "Replace it if it has been unreliable, is badly damaged, or is missing basic safety features. Otherwise a repair is usually the faster fix.",
    image: "/brand/steel.webp",
    alt: "White steel garage doors",
  },
  {
    title: "What a tune-up covers",
    text: "The $125 tune-up is the cheapest way to keep a small noise from becoming a stuck door. Tax and labor are included.",
    image: "/brand/img1402.webp",
    alt: "Carriage garage door with black hardware",
  },
  {
    title: "Why the door stopped",
    text: "Photo eyes, a dead remote, a spring, limits, or a track out of line. Call before you pull on it.",
    image: "/brand/doorB.webp",
    alt: "Pair of wood garage doors",
  },
];

function SocialIcon({ label }: { label: string }) {
  const common = "size-4 fill-current";
  if (label === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden>
        <path d="M14.5 8.5V6.8c0-.7.5-1.1 1.2-1.1H17V3h-2.1C12.4 3 11 4.5 11 6.6v1.9H9v2.7h2V21h3.2v-9.8h2.2l.3-2.7h-2.5z" />
      </svg>
    );
  }
  if (label === "YouTube") {
    return (
      <svg viewBox="0 0 24 24" className={common} aria-hidden>
        <path d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} aria-hidden>
      <path d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.5 7.6 6.1 9.1-.1-.8-.2-2 0-2.8.2-.8 1.3-5.4 1.3-5.4s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.6 0 1-.6 2.4-.9 3.7-.3 1.1.5 2 1.6 2 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.2-3.8-3.1 0-5 2.3-5 4.8 0 .9.3 1.8.7 2.4.1.1.1.2.1.3l-.3 1.1c0 .2-.2.3-.4.2-1.4-.6-2-2.2-2-4 0-3 2.5-6.6 7.5-6.6 4 0 6.6 2.9 6.6 6 0 4.1-2.3 7.2-5.6 7.2-1.1 0-2.2-.6-2.5-1.3l-.7 2.6c-.2.9-.9 2-1.3 2.7.9.3 1.9.4 2.9.4 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
    </svg>
  );
}

function Pill({
  children,
  href,
  onClick,
  dark = false,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  dark?: boolean;
}) {
  const className = `tap inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 font-display text-sm uppercase tracking-wider text-white ${dark ? "bg-ink hover:bg-ink-soft" : "bg-red hover:bg-red-deep"}`;
  const inner = (
    <>
      {children}
      <span className={`grid size-8 place-items-center rounded-full ${dark ? "bg-red text-white" : "bg-white text-ink"}`}>
        <ArrowRight className="size-4" aria-hidden />
      </span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {inner}
    </button>
  );
}

function GoogleMark() {
  const letters = [
    ["G", "#4285F4"],
    ["o", "#EA4335"],
    ["o", "#FBBC05"],
    ["g", "#4285F4"],
    ["l", "#34A853"],
    ["e", "#EA4335"],
  ];
  return (
    <span className="text-base font-medium tracking-tight" aria-label="Google">
      {letters.map(([letter, color]) => (
        <span key={letter + color} style={{ color }}>
          {letter}
        </span>
      ))}
    </span>
  );
}

function GoldStars() {
  return (
    <span className="flex text-[#fbbc04]" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-[#fbbc04]" />
      ))}
    </span>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(to);
      return;
    }
    let start: number | null = null;
    let frame = 0;
    const duration = 1400;
    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * to));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const done = window.setTimeout(() => setN(to), duration + 100);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(done);
    };
  }, [to]);
  return (
    <>
      {n}
      {suffix}
    </>
  );
}

export function HomePage() {
  const [menu, setMenu] = useState(false);
  const [pages, setPages] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [faq, setFaq] = useState(0);
  const [shot, setShot] = useState<number | null>(null);
  const [quote, setQuote] = useState(false);
  const [video, setVideo] = useState(false);
  const [service, setService] = useState("Garage Door Repair");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [ask, setAsk] = useState(false);
  const [askItem, setAskItem] = useState<number | null>(null);
  const [openReview, setOpenReview] = useState<string | null>(null);
  const reviewRow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = document.querySelectorAll("main section, footer");
    if (reduce) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -32px 0px" },
    );
    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) return;
      node.classList.add("fade-section");
      io.observe(node);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu || quote || video || shot !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu, quote, video, shot]);

  function openQuote(next?: string) {
    if (next) setService(next);
    setSent(false);
    setError("");
    setQuote(true);
    setMenu(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    if (name.length < 2 || phone.replace(/\D/g, "").length < 7) {
      setError("Add your name and a phone number we can reach.");
      setSent(false);
      return;
    }
    setError("");
    setSent(true);
    event.currentTarget.reset();
  }

  const pageLinks = [
    ["Pricing", "#coupons"],
    ["Reviews", "#reviews"],
    ["FAQ", "#faq"],
    ["Contact", "#contact"],
  ] as const;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-card focus:px-4 focus:py-2">
        Skip to content
      </a>

      <header className={`sticky top-0 z-40 bg-card/95 backdrop-blur ${scrolled ? "shadow-md" : ""}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-5">
          <a href="#top" className="shrink-0" aria-label="Garage Door Store Boise home">
            <img src="/brand/logo.png" alt="Garage Door Store Boise" className="h-12 w-auto sm:h-14" />
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            <a href="#top" className="navlink text-sm font-medium">Home</a>
            <a href="#about" className="navlink text-sm font-medium">About</a>
            <a href="#services" className="navlink text-sm font-medium">Services</a>
            <a href="#projects" className="navlink text-sm font-medium">Projects</a>
            <div className="relative" onMouseEnter={() => setPages(true)} onMouseLeave={() => setPages(false)}>
              <button type="button" className="navlink inline-flex items-center gap-1 text-sm font-medium" aria-expanded={pages} onClick={() => setPages((open) => !open)}>
                Pages
                <ChevronDown className="size-4" aria-hidden />
              </button>
              {pages ? (
                <div className="absolute left-0 top-full z-20 w-44 rounded-2xl border border-line bg-card p-2 shadow-xl">
                  {pageLinks.map(([label, href]) => (
                    <a key={label} href={href} className="block rounded-xl px-3 py-2 text-sm hover:bg-paper" onClick={() => setPages(false)}>
                      {label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </nav>
          <div className="flex items-center gap-2">
            <a href={PHONE_HREF} className="tap hidden items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium sm:inline-flex">
              <Phone className="size-4 text-red" aria-hidden />
              {PHONE}
            </a>
            <div className="hidden sm:block">
              <Pill onClick={() => openQuote()}>Schedule now</Pill>
            </div>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-line lg:hidden"
              aria-expanded={menu}
              aria-label={menu ? "Close menu" : "Open menu"}
              onClick={() => setMenu((open) => !open)}
            >
              {menu ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {menu ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-ink text-white lg:hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <img src="/brand/logo.png" alt="" className="h-12 w-auto" />
            <button type="button" className="grid size-11 place-items-center rounded-full border border-white/20" aria-label="Close menu" onClick={() => setMenu(false)}>
              <X className="size-5" />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-6" aria-label="Mobile">
            {[
              ["Home", "#top"],
              ["About", "#about"],
              ["Services", "#services"],
              ["Projects", "#projects"],
              ...pageLinks,
            ].map(([label, href]) => (
              <a key={label} href={href} className="border-b border-white/10 py-4 font-display text-3xl uppercase" onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
            <a href={PHONE_HREF} className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-red py-3 font-display uppercase tracking-wider">
              <Phone className="size-4" aria-hidden />
              {PHONE}
            </a>
          </nav>
        </div>
      ) : null}

      <main id="content">
        <section id="top" className="px-3 pt-3 sm:px-4">
          <div className="relative min-h-[640px] overflow-hidden rounded-[1.75rem] sm:min-h-[700px]">
            <img src="/brand/img3839.webp" alt="Three-car garage on a Boise-area home" className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/15" />
            <div className="relative z-10 flex min-h-[640px] flex-col justify-between p-6 sm:min-h-[700px] sm:p-10 lg:p-14">
              <div className="max-w-xl pt-4 lg:pt-8">
                <p className="mb-5 flex items-center gap-2 text-sm text-white/85">
                  <span className="flex text-red" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-red" />
                    ))}
                  </span>
                  Reviewed on Google
                </p>
                <h1 className="font-display text-5xl uppercase leading-[0.9] text-white sm:text-6xl lg:text-7xl">
                  Doors that
                  <br />
                  open. Crews
                  <br />
                  that show.
                </h1>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
                  Broken springs, stuck doors, and openers — repaired or replaced the same day across Boise and the Treasure Valley.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Pill onClick={() => openQuote()}>Get free estimate</Pill>
                  <a href="#projects" className="tap inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-3 text-sm font-medium text-white hover:bg-white hover:text-ink">
                    View projects
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </div>
              </div>
              <dl className="mx-auto mt-10 flex w-full max-w-4xl flex-wrap justify-center gap-x-14 gap-y-6 border-t border-white/20 pt-6 text-center">
                <div className="min-w-32">
                  <dt className="font-display text-4xl uppercase text-white sm:text-5xl">
                    <CountUp to={30} suffix="+" />
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-white/70">Years of experience</dd>
                </div>
                <div className="min-w-32">
                  <dt className="font-display text-4xl uppercase text-white sm:text-5xl">
                    <CountUp to={24} suffix="/7" />
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-white/70">Technicians on call</dd>
                </div>
                <div className="min-w-32">
                  <dt className="font-display text-4xl uppercase text-white sm:text-5xl">
                    <CountUp to={10} suffix=" yr" />
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-white/70">Spring warranty</dd>
                </div>
                <div className="min-w-32">
                  <dt className="font-display text-4xl uppercase text-white sm:text-5xl">Same day</dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-white/70">When the door is stuck</dd>
                </div>
              </dl>
            </div>
            <button
              type="button"
              onClick={() => setVideo(true)}
              className="tap absolute right-6 top-1/3 z-10 grid size-16 place-items-center rounded-full bg-white/90 text-ink shadow-xl hover:bg-white sm:right-10 sm:size-20"
              aria-label="Play Garage Door Store Boise video"
            >
              <Play className="size-7 fill-ink" aria-hidden />
            </button>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-5 py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-md font-display text-4xl uppercase leading-none sm:text-5xl">What's happening with your garage door?</h2>
            <p className="max-w-sm text-sm leading-relaxed text-muted">Choose the issue that sounds closest and we'll tell you what it usually takes to get the door moving.</p>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <div className="grid gap-4">
              {issues.slice(0, 2).map((item) => (
                <button key={item.n} type="button" onClick={() => openQuote("Garage Door Repair")} className="tap rounded-3xl border border-line bg-card p-6 text-left hover:border-ink">
                  <p className="font-display text-sm text-red">{item.n}</p>
                  <h3 className="mt-6 font-display text-2xl uppercase">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.text}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium">
                    Get repair help <ArrowRight className="size-4" aria-hidden />
                  </span>
                </button>
              ))}
            </div>
            <img src="/brand/doorE.webp" alt="Garage Door Store Boise technicians with their service trucks" className="h-72 w-full rounded-3xl object-cover object-bottom lg:h-full" />
            <div className="grid gap-4">
              {issues.slice(2).map((item) => (
                <button key={item.n} type="button" onClick={() => openQuote(item.n === "03" ? "Spring Replacement" : "Garage Door Repair")} className="tap rounded-3xl border border-line bg-card p-6 text-left hover:border-ink">
                  <p className="font-display text-sm text-red">{item.n}</p>
                  <h3 className="mt-6 font-display text-2xl uppercase">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.text}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium">
                    Get repair help <ArrowRight className="size-4" aria-hidden />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="bg-card py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="max-w-xl font-display text-4xl uppercase leading-none sm:text-5xl">Solutions built to keep your garage door moving</h2>
              <Pill dark onClick={() => openQuote()}>View all services</Pill>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((item, index) => (
                <article key={item.title} className="card-zoom group relative h-80 overflow-hidden rounded-3xl">
                  <img src={item.image} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
                  <p className="absolute left-5 top-5 text-xs uppercase tracking-[0.18em] text-white/75">Service {String(index + 1).padStart(2, "0")}</p>
                  <div className="absolute inset-x-5 bottom-5 text-white">
                    <h3 className="font-display text-2xl uppercase">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/80">{item.text}</p>
                    <button type="button" onClick={() => openQuote(item.quote)} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white">
                      Explore service <ArrowRight className="size-4" aria-hidden />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="coupons" className="mx-auto max-w-7xl px-5 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-red">Posted prices</p>
              <h2 className="mt-2 font-display text-3xl uppercase sm:text-4xl">Popular jobs, in writing</h2>
            </div>
            <button type="button" onClick={() => window.print()} className="tap inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium">
              <Printer className="size-4" aria-hidden />
              Print coupons
            </button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {coupons.map((item) => (
              <button key={item.name} type="button" onClick={() => openQuote(item.name)} className={`tap rounded-3xl p-6 text-left ${item.featured ? "bg-ink text-white" : "border border-line bg-card"}`}>
                <p className={`text-xs uppercase tracking-wider ${item.featured ? "text-white/60" : "text-muted"}`}>Coupon</p>
                <p className="mt-3 font-display text-4xl text-red">{item.price}</p>
                <h3 className="mt-2 font-display text-xl uppercase">{item.name}</h3>
                <p className={`mt-2 text-sm ${item.featured ? "text-white/75" : "text-muted"}`}>{item.note}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <h2 className="font-display text-4xl uppercase leading-none sm:text-5xl">Clear answers before the work begins.</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              A stuck door can stop the whole day. We name the issue, price it, and fix it with the same local crew — family owned in Boise for more than 30 years.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {reasons.map((item) => (
                <div key={item.title} className="rounded-2xl border border-line bg-card p-4">
                  <h3 className="font-display text-lg uppercase">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.text}</p>
                </div>
              ))}
            </div>
            <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
              Why choose us <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
          <img src="/brand/house.webp" alt="Carriage-style wood garage doors on a navy house" className="aspect-[4/5] w-full rounded-[1.75rem] object-cover" />
        </section>

        <section className="px-3 sm:px-4">
          <div className="rounded-[1.75rem] bg-ink px-6 py-16 text-white sm:px-10 lg:px-14 lg:py-20">
            <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4">
              <h2 className="max-w-md font-display text-4xl uppercase leading-none sm:text-5xl">From garage door problem to working door.</h2>
              <p className="max-w-xs text-sm text-white/70">Three steps from the first call to a door that opens.</p>
            </div>
            <ol className="mx-auto mt-10 grid max-w-6xl gap-4 lg:grid-cols-3">
              {flow.map((step) => (
                <li key={step.n} className="rounded-3xl bg-white p-6 text-ink">
                  <p className="text-right font-display text-sm text-red">{step.n}</p>
                  <h3 className="mt-8 font-display text-2xl uppercase">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-5 py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-xl font-display text-4xl uppercase leading-none sm:text-5xl">Work that changes how the whole home feels.</h2>
            <a href="#gallery" className="tap inline-flex items-center gap-3 rounded-full bg-ink py-1.5 pl-5 pr-1.5 font-display text-sm uppercase tracking-wider text-white">
              View all projects
              <span className="grid size-8 place-items-center rounded-full bg-red text-white">
                <ArrowRight className="size-4" aria-hidden />
              </span>
            </a>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {gallery.slice(0, 3).map((item, index) => (
              <button key={item.src} type="button" onClick={() => setShot(index)} className="card-zoom group relative h-80 overflow-hidden rounded-3xl text-left">
                <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
                <span className="absolute bottom-4 left-4 rounded-full bg-ink/85 px-4 py-2 font-display text-sm uppercase tracking-wider text-white">{item.caption}</span>
              </button>
            ))}
          </div>
          <div id="gallery" className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
            {gallery.slice(3).map((item, index) => (
              <button key={item.src} type="button" onClick={() => setShot(index + 3)} className="card-zoom relative h-36 overflow-hidden rounded-2xl sm:h-44">
                <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </section>

        <section id="reviews" className="bg-paper py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#f4f4f4] px-5 py-4">
              <div>
                <h2 className="font-display text-2xl uppercase leading-none sm:text-3xl">Top rated in Boise</h2>
                <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-ink">
                  <GoogleMark />
                  <GoldStars />
                  <span className="font-semibold">{GOOGLE_RATING}</span>
                  <a href={REVIEWS_LINK} target="_blank" rel="noreferrer" className="text-muted underline-offset-4 hover:underline">
                    Google reviews
                  </a>
                </p>
              </div>
              <a href={REVIEWS_LINK} target="_blank" rel="noreferrer" className="tap rounded-lg bg-red px-4 py-2.5 text-sm font-medium text-white hover:bg-red-deep">
                Write a review
              </a>
            </div>
            <div className="relative mt-4">
              <div ref={reviewRow} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none]">
                <article className="flex w-[86%] shrink-0 snap-start flex-col rounded-2xl border border-line bg-gradient-to-br from-white to-[#fde8e6] p-5 sm:w-[46%] lg:w-[calc(33.333%-0.75rem)]">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-full bg-red font-display text-sm text-white">G</span>
                    <span>
                      <span className="block font-semibold">Review summary</span>
                      <span className="text-sm text-muted">From Google reviews</span>
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink">
                    Neighbors mention same-day spring repairs, fair prices, and a text before the technician arrives. Calls come back quickly, and the door is usually working again in one visit.
                  </p>
                </article>
                {reviews.map((item) => {
                  const open = openReview === item.name;
                  return (
                    <article key={item.name} className="hover-lift flex w-[86%] shrink-0 snap-start flex-col rounded-2xl border border-line bg-[#f7f7f7] p-5 sm:w-[46%] lg:w-[calc(33.333%-0.75rem)]">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="grid size-11 place-items-center rounded-full bg-ink font-display text-sm text-white" aria-hidden>
                            {item.name.slice(0, 1)}
                          </span>
                          <span>
                            <span className="block font-semibold">{item.name}</span>
                            <span className="text-sm text-muted">{item.place}</span>
                          </span>
                        </div>
                        <GoogleMark />
                      </div>
                      <div className="mt-3">
                        <GoldStars />
                      </div>
                      <p className={`mt-3 text-sm leading-relaxed text-ink ${open ? "" : "line-clamp-5"}`}>“{item.quote}”</p>
                      <button type="button" className="mt-3 w-fit text-sm font-medium text-ink underline-offset-4 hover:underline" onClick={() => setOpenReview(open ? null : item.name)}>
                        {open ? "Show less" : "Read more"}
                      </button>
                    </article>
                  );
                })}
              </div>
              <button
                type="button"
                aria-label="Next reviews"
                className="tap absolute -right-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white shadow-md"
                onClick={() => {
                  const row = reviewRow.current;
                  if (!row) return;
                  const card = row.querySelector("article");
                  const width = card ? card.getBoundingClientRect().width + 16 : 360;
                  const end = row.scrollLeft + width >= row.scrollWidth - row.clientWidth - 8;
                  row.scrollTo({ left: end ? 0 : row.scrollLeft + width, behavior: "smooth" });
                }}
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
          <div>
            <h2 className="font-display text-4xl uppercase leading-none sm:text-5xl">Before you book a service call.</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">Straight answers about repairs, replacements, and what a tune-up includes.</p>
            <div className="mt-6 flex gap-3 text-ink">
              {socials.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label} className="grid size-10 place-items-center rounded-full border border-line hover:bg-card">
                  <SocialIcon label={item.label} />
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {faqs.map((item, index) => {
              const open = faq === index;
              return (
                <div key={item.q} className={`overflow-hidden rounded-2xl ${open ? "bg-ink text-white" : "border border-line bg-card"}`}>
                  <button type="button" className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left" aria-expanded={open} onClick={() => setFaq(open ? -1 : index)}>
                    <span className="font-medium">{item.q}</span>
                    <ChevronDown className={`size-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
                  </button>
                  <div className={`acc-panel ${open ? "open" : ""}`}>
                    <div>
                      <p className={`px-5 pb-5 text-sm leading-relaxed ${open ? "text-white/80" : "text-muted"}`}>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="px-3 pb-4 sm:px-4">
          <div className="relative overflow-hidden rounded-[1.75rem] px-6 py-20 text-center text-white sm:py-28">
            <img src="/brand/doorC.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-ink/75" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-4xl uppercase leading-none sm:text-6xl">Garage door stuck or refusing to open?</h2>
              <p className="mt-4 text-white/80">Request a free estimate, or call and talk to a technician now. Someone answers 24/7.</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Pill onClick={() => openQuote()}>Schedule service</Pill>
                <a href={PHONE_HREF} className="tap inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-3 text-sm text-white hover:bg-white hover:text-ink">
                  <Phone className="size-4" aria-hidden />
                  Call {PHONE}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-md font-display text-4xl uppercase leading-none sm:text-5xl">Helpful advice for a safer, better-working door</h2>
            <p className="max-w-sm text-sm leading-relaxed text-muted">Practical signs, what a tune-up covers, and when to stop pulling on the door.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {advice.map((item) => (
              <article key={item.title} className="grid gap-4 sm:grid-cols-[180px_1fr] sm:items-center">
                <img src={item.image} alt={item.alt} className="h-36 w-full rounded-2xl object-cover sm:h-32" />
                <div>
                  <h3 className="font-display text-xl uppercase leading-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                  <button type="button" onClick={() => openQuote()} className="mt-3 inline-flex items-center gap-1 text-sm font-medium">
                    Ask a technician <ArrowRight className="size-4" aria-hidden />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="bg-card py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-stretch gap-8 px-5 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-red">Find the shop</p>
              <h2 className="mt-2 font-display text-4xl uppercase leading-none sm:text-5xl">9075 W Hackamore Dr</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">Boise, ID 83709. Free in-home estimates across the Treasure Valley. Call if the door is stuck — a technician answers.</p>
              <a href={PHONE_HREF} className="mt-5 font-display text-2xl text-red">{PHONE}</a>
              <a href={MAP_LINK} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
                <MapPin className="size-4 text-red" aria-hidden />
                Open this pin in Google Maps
              </a>
              <div className="mt-6">
                <Pill onClick={() => openQuote()}>Get a free estimate</Pill>
              </div>
            </div>
            <iframe title="Map to Garage Door Store Boise" src={MAP_EMBED} className="min-h-80 w-full rounded-[1.75rem] border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="mt-16 overflow-hidden border-y border-line py-6">
            <div className="marquee-track flex w-max items-center gap-14 px-8">
              {[...brands, ...brands].map((brand, index) => (
                <img key={`${brand.src}-${index}`} src={brand.src} alt={brand.alt} className="h-10 w-auto object-contain sm:h-12" />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink px-5 pb-24 pt-16 text-white lg:pb-12">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <h2 className="font-display text-lg uppercase">About the store</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">Family-owned garage door repair and installation in Boise. Licensed and insured. Over 30 years in the Treasure Valley.</p>
            <div className="mt-4 flex gap-3">
              {socials.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label} className="grid size-9 place-items-center rounded-full border border-white/20 hover:bg-white hover:text-ink">
                  <SocialIcon label={item.label} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-lg uppercase">Quick links</h2>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              {[
                ["About", "#about"],
                ["Services", "#services"],
                ["Projects", "#projects"],
                ["Reviews", "#reviews"],
                ["FAQ", "#faq"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="hover:text-white">{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-lg uppercase">Our services</h2>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              {services.map((item) => (
                <li key={item.title}>
                  <button type="button" className="text-left hover:text-white" onClick={() => openQuote(item.quote)}>
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-lg uppercase">Locations</h2>
            <ul className="mt-3 space-y-1 text-sm text-white/75">
              {areas.slice(0, 8).map((city) => (
                <li key={city}>{city}, ID</li>
              ))}
            </ul>
          </div>
          <div id="visit">
            <h2 className="font-display text-lg uppercase">Need service?</h2>
            <p className="mt-3 text-sm text-white/70">Stuck door, broken spring, or a new door. Call — someone answers.</p>
            <a href={PHONE_HREF} className="mt-3 block font-display text-xl text-red">{PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="mt-2 flex items-center gap-2 text-sm text-white/75">
              <Mail className="size-4" aria-hidden />
              {EMAIL}
            </a>
            <p className="mt-3 flex items-start gap-2 text-sm text-white/75">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              <a href={MAP_LINK} target="_blank" rel="noreferrer">
                {ADDRESS[0]}
                <br />
                {ADDRESS[1]}
              </a>
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-white/75">
              <Check className="size-4 text-red" aria-hidden />
              Mon–Sun, technicians on call
            </p>
          </div>
        </div>
        <p className="mx-auto mt-14 max-w-7xl select-none text-center font-display text-[18vw] uppercase leading-none text-white/10">Boise</p>
        <div className="mx-auto mt-6 flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Garage Door Store Boise. Licensed and insured.</p>
          <a href="#top" className="hover:text-white">Back to top</a>
        </div>
      </footer>

      <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end lg:bottom-6">
        {ask ? (
          <div className="mb-3 w-[min(22rem,calc(100vw-2rem))] rounded-3xl border border-line bg-card p-4 shadow-2xl" role="dialog" aria-label="Ask a question">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-xl uppercase">Ask</p>
                <p className="text-sm text-muted">Tap a question. A person still answers the phone.</p>
              </div>
              <button type="button" className="grid size-9 place-items-center rounded-full border border-line" aria-label="Close questions" onClick={() => setAsk(false)}>
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-3 max-h-72 space-y-2 overflow-y-auto">
              {faqs.map((item, index) => (
                <div key={item.q} className="rounded-xl bg-paper">
                  <button type="button" className="w-full px-3 py-2.5 text-left text-sm font-medium" aria-expanded={askItem === index} onClick={() => setAskItem(askItem === index ? null : index)}>
                    {item.q}
                  </button>
                  {askItem === index ? <p className="px-3 pb-3 text-sm leading-relaxed text-muted">{item.a}</p> : null}
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a href={PHONE_HREF} className="rounded-full bg-red py-2.5 text-center text-sm font-medium text-white">Call</a>
              <button type="button" className="rounded-full bg-ink py-2.5 text-sm font-medium text-white" onClick={() => { setAsk(false); openQuote(); }}>
                Estimate
              </button>
            </div>
          </div>
        ) : null}
        <button
          type="button"
          className="tap grid size-14 place-items-center rounded-full bg-red text-white shadow-lg hover:bg-red-deep"
          aria-expanded={ask}
          aria-label={ask ? "Close ask" : "Ask a question"}
          onClick={() => setAsk((open) => !open)}
        >
          {ask ? <X className="size-6" /> : <MessageCircleQuestion className="size-7" />}
        </button>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-px bg-line lg:hidden">
        <a href={PHONE_HREF} className="flex items-center justify-center gap-2 bg-red py-3.5 font-display text-sm uppercase tracking-wider text-white">
          <Phone className="size-4" aria-hidden />
          Call
        </a>
        <button type="button" onClick={() => openQuote()} className="bg-ink py-3.5 font-display text-sm uppercase tracking-wider text-white">
          Schedule
        </button>
      </div>

      {quote ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/70 p-3 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="quote-title">
          <div className="max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-3xl bg-card p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-red">Free estimate</p>
                <h2 id="quote-title" className="mt-1 font-display text-3xl uppercase">Schedule service</h2>
              </div>
              <button type="button" className="grid size-10 place-items-center rounded-full border border-line" aria-label="Close" onClick={() => setQuote(false)}>
                <X className="size-5" />
              </button>
            </div>
            {sent ? (
              <div className="mt-6">
                <h3 className="font-display text-2xl uppercase">We'll call you shortly.</h3>
                <p className="mt-2 text-sm text-muted">A technician follows up on {service} requests. If the door is stuck right now, call {PHONE}.</p>
                <a href={PHONE_HREF} className="mt-5 inline-flex items-center gap-2 rounded-full bg-red px-5 py-3 font-display text-sm uppercase tracking-wider text-white">
                  <Phone className="size-4" aria-hidden />
                  Call now
                </a>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="mt-6 space-y-3">
                <p className="text-sm text-muted">Tell us the door and the best number. A person calls you back — this form stays on your device.</p>
                {error ? <p className="text-sm text-red">{error}</p> : null}
                <label className="block text-sm">
                  Name
                  <input name="name" required autoComplete="name" className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-ink" />
                </label>
                <label className="block text-sm">
                  Phone
                  <input name="phone" required type="tel" autoComplete="tel" className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-ink" />
                </label>
                <label className="block text-sm">
                  Email <span className="text-muted">(optional)</span>
                  <input name="email" type="email" autoComplete="email" className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-ink" />
                </label>
                <label className="block text-sm">
                  Service
                  <select name="service" value={service} onChange={(event) => setService(event.target.value)} className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-ink">
                    {quoteServices.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm">
                  What's going on
                  <textarea name="message" rows={3} className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-ink" placeholder="Spring snapped, door off track, want a new look…" />
                </label>
                <button type="submit" className="tap w-full rounded-full bg-red py-3.5 font-display uppercase tracking-wider text-white hover:bg-red-deep">
                  Get your free estimate
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}

      {video ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4" role="dialog" aria-modal="true" aria-label="Company video">
          <button type="button" className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white text-ink" aria-label="Close video" onClick={() => setVideo(false)}>
            <X className="size-5" />
          </button>
          <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-black">
            <iframe title="Garage Door Store Boise video" src={`${VIDEO}?autoplay=1`} className="h-full w-full" allow="autoplay; encrypted-media" allowFullScreen />
          </div>
        </div>
      ) : null}

      {shot !== null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4" role="dialog" aria-modal="true" aria-label={gallery[shot]?.caption}>
          <button type="button" className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white text-ink" aria-label="Close photo" onClick={() => setShot(null)}>
            <X className="size-5" />
          </button>
          <figure className="max-w-5xl">
            <img src={gallery[shot]?.src} alt={gallery[shot]?.alt} className="max-h-[80svh] w-auto rounded-2xl" />
            <figcaption className="mt-3 text-center font-display uppercase tracking-wider text-white">{gallery[shot]?.caption}</figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}
