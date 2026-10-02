import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Menu,
  Phone,
  Plus,
  Star,
  X,
} from "lucide-react";
import {
  ADDRESS,
  brands,
  cities,
  coupons,
  doors,
  EMAIL,
  faqs,
  MAP_SRC,
  PHONE_DISPLAY,
  PHONE_TEL,
  reviews,
  serviceOptions,
  slides,
  symptoms,
  zips,
} from "@/data/site";

type FormState = {
  name: string;
  phone: string;
  city: string;
  service: string;
  notes: string;
  discount: boolean;
};

const emptyForm: FormState = {
  name: "",
  phone: "",
  city: "Boise",
  service: "Repair",
  notes: "",
  discount: true,
};

const trust = [
  { title: "A closer look.", text: "On-site door assessment" },
  { title: "Local people.", text: "Family owned and operated" },
  { title: "A clear plan.", text: "Set price confirmed before work starts" },
  { title: "Your say. Always.", text: "You approve the price before any work starts" },
];

function lookupPlace(raw: string): { status: "yes" | "maybe" | "empty"; city?: string; message: string } {
  const q = raw.trim();
  if (!q) return { status: "empty", message: "Enter a city or ZIP." };
  const digits = q.replace(/\D/g, "");
  if (digits.length === 5 && zips[digits]) {
    return { status: "yes", city: zips[digits], message: `Yes. We serve ${zips[digits]} (${digits}).` };
  }
  const exact = cities.find((city) => city.toLowerCase() === q.toLowerCase());
  if (exact) return { status: "yes", city: exact, message: `Yes. We serve ${exact}.` };
  if (digits.length === 5) {
    return {
      status: "maybe",
      message: "That ZIP isn’t on the published list. Call and we’ll confirm the address.",
    };
  }
  return {
    status: "maybe",
    message: "We cover Boise and the Treasure Valley. Call and we’ll check the address.",
  };
}

export function HomePage() {
  const [menu, setMenu] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [place, setPlace] = useState("");
  const [placeResult, setPlaceResult] = useState<ReturnType<typeof lookupPlace> | null>(null);
  const [symptom, setSymptom] = useState<string | null>(null);
  const [slide, setSlide] = useState(0);
  const [reviewPage, setReviewPage] = useState(0);
  const [faqOpen, setFaqOpen] = useState(0);
  const [showFaqs, setShowFaqs] = useState(false);
  const [doorFilter, setDoorFilter] = useState<(typeof doors)[number]["style"] | "All">("All");
  const [doorIndex, setDoorIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [mapCity, setMapCity] = useState("Boise");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");
  const [sent, setSent] = useState<FormState | null>(null);

  const filtered = useMemo(
    () => (doorFilter === "All" ? [...doors] : doors.filter((door) => door.style === doorFilter)),
    [doorFilter],
  );
  const activeDoor = filtered[Math.min(doorIndex, Math.max(filtered.length - 1, 0))] ?? doors[0];
  const reviewPages = Math.ceil(reviews.length / 3);
  const reviewSlice = reviews.slice(reviewPage * 3, reviewPage * 3 + 3);
  const current = slides[slide];
  const mapSrc =
    mapCity === "Boise"
      ? MAP_SRC
      : `https://maps.google.com/maps?q=${encodeURIComponent(`${mapCity}, Idaho`)}&z=12&output=embed`;

  function goEstimate(next: Partial<FormState>) {
    setForm((currentForm) => ({ ...currentForm, ...next, discount: true }));
    setSent(null);
    document.getElementById("estimate")?.scrollIntoView({ behavior: "smooth" });
  }

  function checkPlace(event: FormEvent) {
    event.preventDefault();
    const result = lookupPlace(place);
    setPlaceResult(result);
    if (result.city) {
      setForm((currentForm) => ({ ...currentForm, city: result.city as string }));
      setMapCity(result.city);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (form.name.trim().length < 2 || form.phone.replace(/\D/g, "").length < 7) {
      setError("Add your name and a real phone number so a technician can call you back.");
      return;
    }
    const next = { ...form, name: form.name.trim(), phone: form.phone.trim(), notes: form.notes.trim() };
    localStorage.setItem("gds-estimate", JSON.stringify(next));
    setError("");
    setSent(next);
  }

  const mailto = sent
    ? `mailto:${EMAIL}?subject=${encodeURIComponent("Free estimate — Garage Door Store Boise")}&body=${encodeURIComponent(
        `Name: ${sent.name}\nPhone: ${sent.phone}\nCity: ${sent.city}\nNeed: ${sent.service}\n10% off: ${sent.discount ? "yes" : "no"}\nNotes: ${sent.notes || "—"}`,
      )}`
    : `mailto:${EMAIL}`;

  return (
    <div className="bg-paper text-fg">
      <header className="sticky top-0 z-40">
        <div className="bg-red text-ink">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
            <a href="#top" className="shrink-0" aria-label="Garage Door Store Boise, home">
              <img src="/media/logo.png" alt="" className="h-12 w-auto lg:h-14" />
            </a>
            <div className="ml-auto hidden items-center gap-2 lg:flex">
              <nav className="flex items-center gap-2" aria-label="Primary">
                <a href="#help" className="nav-pill shine">
                  Repair Services
                </a>
                <a href="#doors" className="nav-pill shine">
                  Garage Doors
                </a>
                <a href="#family" className="nav-pill shine">
                  Why Boise
                </a>
                <button
                  type="button"
                  className="nav-pill shine inline-flex items-center gap-1"
                  aria-expanded={areaOpen}
                  onClick={() => setAreaOpen((open) => !open)}
                >
                  Service Area <ChevronDown className="size-4" aria-hidden />
                </button>
              </nav>
              <a href={PHONE_TEL} className="nav-cta shine press inline-flex items-center gap-2">
                <Phone className="size-4 text-red" aria-hidden />
                {PHONE_DISPLAY}
              </a>
              <a href="#estimate" className="nav-cta shine press">
                Book Online
              </a>
            </div>
            <button
              type="button"
              className="press ml-auto inline-flex size-11 items-center justify-center rounded-full border-2 border-ink lg:hidden"
              aria-expanded={menu}
              onClick={() => setMenu((open) => !open)}
            >
              {menu ? <X aria-hidden /> : <Menu aria-hidden />}
              <span className="sr-only">{menu ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>
        {areaOpen && (
          <div className="hidden border-t border-line-dark bg-ink text-cream lg:block">
            <ul className="mx-auto grid max-w-7xl grid-cols-4 gap-1 px-4 py-3 text-sm">
              {cities.map((city) => (
                <li key={city}>
                  <a
                    href="#areas"
                    className="block rounded-lg px-3 py-2 hover:bg-panel"
                    onClick={() => {
                      setMapCity(city);
                      setAreaOpen(false);
                      setForm((currentForm) => ({ ...currentForm, city }));
                    }}
                  >
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {menu && (
          <nav className="space-y-2 border-t border-red-deep bg-red px-4 py-3 text-ink lg:hidden" aria-label="Mobile">
            {[
              ["Repair Services", "#help"],
              ["Garage Doors", "#doors"],
              ["Why Boise", "#family"],
              ["Service Area", "#areas"],
              ["Reviews", "#reviews"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="block rounded-full border-2 border-ink px-4 py-2.5 font-semibold"
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
            <a href={PHONE_TEL} className="mt-2 block rounded-full bg-ink px-4 py-2.5 text-center font-semibold text-cream">
              {PHONE_DISPLAY}
            </a>
          </nav>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-1 bg-ink px-4 py-2.5 text-sm font-semibold text-cream">
          <button
            type="button"
            className="inline-flex items-center gap-1"
            aria-expanded={areaOpen}
            onClick={() => setAreaOpen((open) => !open)}
          >
            Choose Your Service Area
            <ChevronDown className={`size-4 transition ${areaOpen ? "rotate-180" : ""}`} aria-hidden />
          </button>
          <p className="font-medium text-cream/80">Serving Boise, Meridian, Eagle, Nampa & the Treasure Valley</p>
        </div>
      </header>

      <main id="top">
        <section className="bg-ink text-cream">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-16">
            <div>
              <p
                className="burst shine inline-flex rounded-full bg-red px-4 py-2 text-sm font-bold tracking-wide text-cream uppercase"
                style={{ animationDelay: "40ms" }}
              >
                Same-day service call with repair
              </p>
              <p
                className="burst mt-6 flex items-center gap-3 text-sm font-bold tracking-[0.16em] text-red uppercase"
                style={{ animationDelay: "110ms" }}
              >
                <span className="h-0.5 w-8 bg-red" aria-hidden />
                Local garage door repair & installation
              </p>
              <h1 className="display mt-4 text-[2.7rem] leading-[0.88] text-cream uppercase sm:text-6xl lg:text-7xl">
                <span className="burst block" style={{ animationDelay: "160ms" }}>
                  Garage door
                </span>
                <span className="burst block" style={{ animationDelay: "230ms" }}>
                  trouble?
                </span>
                <span className="burst block text-red" style={{ animationDelay: "310ms" }}>
                  Call the store.
                </span>
              </h1>
              <p className="burst mt-5 max-w-lg text-lg text-cream/80" style={{ animationDelay: "400ms" }}>
                Family-owned garage door repair across Boise and the Treasure Valley. Real local
                techs your neighbors know by name, and a set price you approve before any work starts.
              </p>
              <div className="burst mt-7 flex flex-wrap gap-3" style={{ animationDelay: "480ms" }}>
                <a
                  href="#estimate"
                  className="press shine inline-flex items-center gap-3 rounded-full bg-red py-2 pr-2 pl-5 font-semibold text-cream hover:bg-red-deep"
                >
                  Request a Free Estimate Visit
                  <span className="inline-flex size-9 items-center justify-center rounded-full border border-cream/50">
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                </a>
                <a
                  href={PHONE_TEL}
                  className="press shine inline-flex items-center rounded-full border-2 border-red px-6 py-3 font-semibold"
                >
                  Call {PHONE_DISPLAY}
                </a>
              </div>
              <a
                href="#reviews"
                className="burst mt-5 inline-block text-sm text-cream/80 underline decoration-red underline-offset-4"
                style={{ animationDelay: "560ms" }}
              >
                Read our customer reviews
              </a>
            </div>
            <figure
              className="frame-shine burst rounded-[1.7rem] p-[3px]"
              style={{ animationDelay: "220ms" }}
            >
              <div className="overflow-hidden rounded-[1.45rem] bg-ink">
                <img
                  src="/media/team.webp"
                  alt="The Garage Door Store Boise crew lined up with red service trucks"
                  className="aspect-[16/11] w-full object-cover"
                />
                <div className="flex items-end justify-between gap-3 px-5 py-4 text-sm">
                  <span>
                    <span className="block font-bold tracking-wide uppercase">Real people. Local service.</span>
                    <a href="#family" className="mt-1 inline-block text-cream/75 underline decoration-red underline-offset-4">
                      Meet the crew behind the trucks
                    </a>
                  </span>
                  <img src="/media/badge-30.webp" alt="30 years experience" className="h-14 w-14" />
                </div>
              </div>
            </figure>
          </div>
        </section>

        <section className="border-b border-line bg-cream">
          <ul className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((item) => (
              <li key={item.title} className="flex gap-3">
                <Check className="mt-1 size-4 shrink-0 text-red" aria-hidden />
                <span>
                  <span className="block font-semibold">{item.title}</span>
                  <span className="text-sm text-muted">{item.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-ink text-cream">
          <form onSubmit={checkPlace} className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4">
            <p className="font-display text-xl font-extrabold text-red">Do we serve your ZIP?</p>
            <p className="text-sm text-cream/70">City or ZIP. We’ll match the Treasure Valley list.</p>
            <label className="sr-only" htmlFor="place">
              City or ZIP
            </label>
            <input
              id="place"
              value={place}
              onChange={(event) => setPlace(event.target.value)}
              placeholder="Boise or 83709"
              className="min-w-48 flex-1 rounded-full bg-cream px-4 py-2 text-fg outline-none focus:ring-2 focus:ring-red"
            />
            <button type="submit" className="press rounded-full bg-red px-5 py-2 font-semibold text-cream">
              Check my ZIP
            </button>
            {placeResult && (
              <p className="w-full text-sm" role="status">
                {placeResult.message}{" "}
                {placeResult.status === "yes" && (
                  <button type="button" className="underline" onClick={() => goEstimate({ city: placeResult.city })}>
                    Request the visit
                  </button>
                )}
              </p>
            )}
          </form>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-red">Start with the symptom</p>
            <h2 className="display mt-3 text-4xl">What is your door doing?</h2>
            <p className="mt-3 text-muted">
              Choose what you notice. We’ll set the estimate to the right job, and a technician
              confirms the cause in person.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:col-span-8">
            {symptoms.map((item) => {
              const active = symptom === item.label;
              return (
                <button
                  key={item.n}
                  type="button"
                  aria-pressed={active}
                  className={`press flex items-center justify-between rounded-2xl border px-4 py-3 text-left ${
                    active ? "border-red bg-cream" : "border-line bg-cream"
                  }`}
                  onClick={() => {
                    setSymptom(item.label);
                    goEstimate({ service: item.service, notes: item.label });
                  }}
                >
                  <span>
                    <span className="text-xs font-semibold text-red">{item.n}</span>{" "}
                    <span className="font-semibold">{item.label}</span>
                  </span>
                  <Plus className="size-4 text-red" aria-hidden />
                </button>
              );
            })}
          </div>
        </section>

        <section className="siding border-y border-line py-16">
          <div className="mx-auto max-w-7xl px-4">
            <p className="eyebrow text-red">What to expect when you call</p>
            <h2 className="display mt-3 text-5xl">Here is how it goes.</h2>
            <div className="mt-10 grid items-center gap-6 md:grid-cols-2">
              <article className="offset-card rounded-3xl bg-cream p-6">
                <p className="text-sm font-semibold">Tell us what happened</p>
                <p className="display mt-2 text-4xl text-red">01</p>
                <p className="mt-2 text-muted">
                  Call {PHONE_DISPLAY} or send the estimate. We quote a set price on the phone — no
                  add-ons — and book the visit.
                </p>
              </article>
              <img
                src="/media/g4.webp"
                alt="Matched carriage garage doors on a Treasure Valley home"
                className="h-72 w-full rounded-3xl object-cover"
              />
            </div>
            <div className="mt-8 grid items-center gap-6 md:grid-cols-2">
              <img
                src="/media/wood-house.webp"
                alt="Wood-look double garage doors installed on a Boise home"
                className="h-72 w-full rounded-3xl object-cover"
              />
              <article className="offset-card rounded-3xl bg-cream p-6">
                <p className="text-sm font-semibold">Meet your tech</p>
                <p className="display mt-2 text-4xl text-red">02</p>
                <p className="mt-2 text-muted">
                  You get a text when the technician is on the way, with a photo of who’s coming.
                  They assess the door, explain the options, and wait for your yes.
                </p>
              </article>
            </div>
            <div className="mt-8 grid items-center gap-6 md:grid-cols-2">
              <article className="offset-card rounded-3xl bg-cream p-6">
                <p className="text-sm font-semibold">Check it together</p>
                <p className="display mt-2 text-4xl text-red">03</p>
                <p className="mt-2 text-muted">
                  We fix it, test the safety eyes, run the door, and walk you through the result.
                  Dual spring changes include a 10-year warranty.
                </p>
              </article>
              <img
                src="/media/g7.webp"
                alt="Three modern wood plank garage doors"
                className="h-72 w-full rounded-3xl object-cover"
              />
            </div>
          </div>
        </section>

        <section id="help" className="bg-ink py-16 text-cream">
          <div className="mx-auto max-w-7xl px-4">
            <p className="eyebrow text-red">Services we offer</p>
            <h2 className="display mt-3 text-5xl">The right help for your door.</h2>
            <div className="mt-8 overflow-hidden rounded-3xl border border-line-dark bg-panel">
              <div className="grid lg:grid-cols-12">
                <div className="flex gap-2 overflow-x-auto p-3 lg:flex-col lg:col-span-3">
                  {slides.map((item, index) => (
                    <button
                      key={item.label}
                      type="button"
                      className={`press shrink-0 rounded-2xl px-4 py-3 text-left text-sm font-semibold ${
                        index === slide ? "bg-red text-cream" : "bg-ink text-cream/80"
                      }`}
                      onClick={() => setSlide(index)}
                    >
                      <span className="mr-2 text-xs">{String(index + 1).padStart(2, "0")}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="relative min-h-64 lg:col-span-5">
                  <img src={current.image} alt={current.alt} className="h-full min-h-64 w-full object-cover" />
                </div>
                <div className="flex flex-col justify-center p-6 lg:col-span-4">
                  <p className="text-sm text-cream/60">
                    {String(slide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                  </p>
                  <h3 className="display mt-2 text-3xl">{current.title}</h3>
                  <p className="mt-3 text-cream/80">{current.text}</p>
                  <button
                    type="button"
                    className="press mt-5 inline-flex w-fit rounded-full bg-red px-4 py-2 text-sm font-semibold"
                    onClick={() => goEstimate({ service: current.service })}
                  >
                    Start this estimate
                  </button>
                  <a href={PHONE_TEL} className="mt-3 text-sm text-cream/70">
                    Call {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 bg-red py-2 text-sm font-semibold">
                <button
                  type="button"
                  className="inline-flex size-8 items-center justify-center rounded-full bg-ink"
                  aria-label="Previous service"
                  onClick={() => setSlide((n) => (n - 1 + slides.length) % slides.length)}
                >
                  <ChevronLeft className="size-4" aria-hidden />
                </button>
                {slide + 1} of {slides.length}
                <button
                  type="button"
                  className="inline-flex size-8 items-center justify-center rounded-full bg-ink"
                  aria-label="Next service"
                  onClick={() => setSlide((n) => (n + 1) % slides.length)}
                >
                  <ChevronRight className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="family" className="bg-ink pb-16 text-cream">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 md:grid-cols-2">
            <div>
              <p className="eyebrow text-red">Meet the crew</p>
              <h2 className="display mt-3 text-5xl">A family company.</h2>
              <p className="mt-4 text-lg text-cream/80">
                Garage Door Store Boise is family owned and operated, with more than 30 years on
                Treasure Valley doors. Customers keep mentioning Corbin, Kevin, and Jay by name.
              </p>
              <a href="#reviews" className="press mt-6 inline-flex rounded-full bg-cream px-5 py-3 font-semibold text-ink">
                Read the reviews
              </a>
              <dl className="mt-8 grid grid-cols-3 gap-3 text-sm">
                <div>
                  <dt className="font-semibold text-red">On site</dt>
                  <dd className="text-cream/70">Your technician assesses the door</dd>
                </div>
                <div>
                  <dt className="font-semibold text-red">Your options</dt>
                  <dd className="text-cream/70">Explained before you decide</dd>
                </div>
                <div>
                  <dt className="font-semibold text-red">Set price</dt>
                  <dd className="text-cream/70">Approved before any work starts</dd>
                </div>
              </dl>
            </div>
            <figure className="overflow-hidden rounded-3xl">
              <img
                src="/media/team.webp"
                alt="Garage Door Store technicians standing with the red fleet"
                className="aspect-video w-full object-cover object-center"
              />
              <figcaption className="flex items-center justify-between gap-3 bg-panel px-4 py-3 text-sm text-cream/80">
                <span>The people behind the work. Licensed, bonded, and insured. Shop at {ADDRESS}.</span>
                <img src="/media/badge-2026.png" alt="Best of 2026, Garage Door Store Boise" className="h-16 w-auto" />
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="reviews" className="bg-ink py-16 text-cream">
          <div className="mx-auto max-w-7xl px-4">
            <p className="eyebrow text-red">Verified customer stories</p>
            <h2 className="display mt-3 text-4xl uppercase md:text-5xl">The reviews name names.</h2>
            <p className="mt-2 text-cream/70">Google reviews from real Garage Door Store customers.</p>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {reviewSlice.map((review) => (
                <li key={review.name} className="rounded-3xl bg-cream p-5 text-fg">
                  <p className="flex gap-1 text-red" aria-label="5 star Google review">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} className="size-4 fill-red" aria-hidden />
                    ))}
                  </p>
                  <p className="mt-3">{review.text}</p>
                  <p className="mt-6 flex items-end justify-between text-sm">
                    <span className="font-semibold">
                      {review.name}
                      {"place" in review && review.place ? ` · ${review.place}` : ""}
                    </span>
                    <span className="text-muted">Google</span>
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between">
              <a
                href="https://www.google.com/search?q=Garage+Door+Store+Boise+reviews"
                className="text-sm font-semibold text-red underline-offset-4 hover:underline"
              >
                Read all reviews
              </a>
              <div className="flex items-center gap-3 text-sm">
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center rounded-full border border-cream/30"
                  aria-label="Previous reviews"
                  onClick={() => setReviewPage((page) => (page - 1 + reviewPages) % reviewPages)}
                >
                  <ChevronLeft className="size-4" aria-hidden />
                </button>
                {reviewPage + 1} of {reviewPages}
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center rounded-full bg-red"
                  aria-label="Next reviews"
                  onClick={() => setReviewPage((page) => (page + 1) % reviewPages)}
                >
                  <ChevronRight className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-paper py-16">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-ink text-cream md:grid-cols-2">
            <img
              src="/media/photo5.webp"
              alt="Stone-framed wood carriage door installed by the shop"
              className="h-72 w-full object-cover md:h-full"
            />
            <div className="p-6 md:p-10">
              <p className="eyebrow text-red">Repair or replace</p>
              <h2 className="display mt-3 text-4xl">Fix it or replace it? Straight answer.</h2>
              <p className="mt-4 text-cream/80">
                <span className="font-semibold text-cream">Start with a closer look.</span> We
                inspect the door, say what can be repaired, and give you a price before work
                starts. If a new door makes more sense, we explain why. You decide.
              </p>
              <p className="mt-3 text-cream/80">
                Replace it when it hasn’t run right for a while, it’s old, it lacks child-safety
                features, or the panels are badly damaged. Don’t force a broken door.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#estimate" className="press rounded-full bg-red px-5 py-3 font-semibold">
                  Claim 10% off
                </a>
                <a href="#doors" className="press rounded-full border border-cream/40 px-5 py-3 font-semibold">
                  Explore garage doors
                </a>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-6 grid max-w-7xl items-center gap-6 rounded-3xl border border-line bg-cream p-6 md:grid-cols-2">
            <div>
              <p className="eyebrow text-red">Free estimate & 10% off</p>
              <h3 className="display mt-2 text-4xl">A new door. A number first.</h3>
            </div>
            <div>
              <p className="text-muted">
                Carriage, wood, steel, standard, and commercial doors from Wayne Dalton, Clopay,
                Genie, and LiftMaster. The in-home consultation is free, and the 10% offer is
                marked on the request.
              </p>
              <button
                type="button"
                className="press mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-cream"
                onClick={() => goEstimate({ service: "New door" })}
              >
                Request the estimate <ArrowRight className="size-4" aria-hidden />
              </button>
            </div>
          </div>

          <div id="doors" className="mx-auto mt-8 max-w-7xl px-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h3 className="display text-3xl">Doors on real houses.</h3>
              <div className="flex flex-wrap gap-2">
                {(["All", "Carriage", "Modern", "Wood", "Steel"] as const).map((style) => (
                  <button
                    key={style}
                    type="button"
                    className={`press rounded-full px-3 py-1 text-sm ${
                      doorFilter === style ? "bg-ink text-cream" : "bg-cream"
                    }`}
                    onClick={() => {
                      setDoorFilter(style);
                      setDoorIndex(0);
                    }}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
            <button type="button" className="mt-4 block w-full" onClick={() => setLightbox(doorIndex)}>
              <img src={activeDoor.src} alt={activeDoor.alt} className="aspect-video w-full rounded-3xl object-cover" />
            </button>
            <p className="mt-2 text-sm text-muted">
              {activeDoor.title} · {activeDoor.place}
            </p>
            <ul className="mt-3 flex gap-2 overflow-x-auto pb-2">
              {filtered.map((door, index) => (
                <li key={door.src}>
                  <button
                    type="button"
                    className={`block h-16 w-24 overflow-hidden rounded-xl border-2 ${
                      activeDoor.src === door.src ? "border-red" : "border-transparent"
                    }`}
                    onClick={() => setDoorIndex(index)}
                    aria-label={door.title}
                  >
                    <img src={door.src} alt="" className="h-full w-full object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto mt-6 flex max-w-7xl flex-wrap items-center justify-between gap-4 rounded-full bg-red px-5 py-3 text-cream">
            <p className="text-sm font-semibold">Brands installed by the store</p>
            <ul className="flex flex-wrap items-center gap-4">
              {brands.map((brand) => (
                <li key={brand.alt} className="rounded-full bg-cream px-3 py-1">
                  <img src={brand.src} alt={brand.alt} className="h-8 w-auto" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-red py-16 text-ink">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <p className="eyebrow">Here for the next chapter, too</p>
            <h2 className="display mt-3 text-5xl text-cream">
              Keep your door.
              <span className="block">Keep your day moving.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-cream/90">
              A repair gets you moving today. The tune-up keeps the moving parts and safety features
              in check.
            </p>
            <div className="mt-8 grid gap-4 text-left md:grid-cols-2">
              <article className="rounded-3xl bg-ink p-6 text-cream">
                <p className="eyebrow text-red">A plan for the long run</p>
                <h3 className="display mt-3 text-3xl">Set pricing. 10-year springs.</h3>
                <p className="mt-3 text-cream/75">
                  Dual spring changes are $350 with tax, labor, and a 10-year warranty. Torque tubes
                  are $450. No surprise add-ons after the truck arrives.
                </p>
                <button
                  type="button"
                  className="press mt-5 rounded-full bg-cream px-5 py-3 font-semibold text-ink"
                  onClick={() => goEstimate({ service: "Spring replacement" })}
                >
                  Price a spring change
                </button>
              </article>
              <article className="rounded-3xl bg-cream p-6">
                <div className="flex items-start justify-between gap-3">
                  <p className="eyebrow text-red">Current tune-up offer</p>
                  <p className="display text-5xl text-red">{coupons[0].price}</p>
                </div>
                <h3 className="display mt-3 text-3xl">A little attention. A better-running door.</h3>
                <p className="mt-3 text-muted">{coupons[0].detail} The posted full tune-up.</p>
                <button
                  type="button"
                  className="press mt-5 rounded-full border border-ink px-5 py-3 font-semibold"
                  onClick={() => goEstimate({ service: "Tune-up" })}
                >
                  Claim the $125 tune-up
                </button>
              </article>
            </div>
            <div className="mt-4 rounded-3xl bg-cream p-5 text-left md:flex md:items-center md:justify-between">
              <div>
                <p className="eyebrow text-red">Already a Garage Door Store customer?</p>
                <h3 className="display mt-2 text-3xl">A question after your visit?</h3>
                <p className="mt-2 text-muted">
                  Call or write {EMAIL}. Have the service address handy so we can find the right job.
                </p>
              </div>
              <div className="mt-4 flex gap-3 md:mt-0">
                <a href={PHONE_TEL} className="press rounded-full bg-ink px-5 py-3 font-semibold text-cream">
                  Call the team
                </a>
                <a href={`mailto:${EMAIL}`} className="press rounded-full bg-red px-5 py-3 font-semibold text-cream">
                  Contact the store
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="estimate" className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-2">
          <div>
            <p className="eyebrow text-red">Free in-home consultation</p>
            <h2 className="display mt-3 text-5xl">10% off, and a real callback.</h2>
            <p className="mt-4 text-lg text-muted">
              This page keeps the request on your device and can email {EMAIL}. Or call{" "}
              {PHONE_DISPLAY}. A technician answers 24/7.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {coupons.map((coupon) => (
                <li key={coupon.id}>
                  <button type="button" className="font-semibold text-red" onClick={() => goEstimate({ service: coupon.service })}>
                    {coupon.price} {coupon.title}
                  </button>
                  <span className="text-muted"> — {coupon.detail}</span>
                </li>
              ))}
            </ul>
          </div>
          {sent ? (
            <div className="rounded-3xl bg-ink p-6 text-cream" role="status">
              <p className="eyebrow text-red">Request ready</p>
              <h3 className="display mt-2 text-4xl">We’ll take it from here, {sent.name.split(" ")[0]}.</h3>
              <p className="mt-3 text-cream/80">
                {sent.service} in {sent.city}. {sent.discount ? "10% off is marked on the note." : ""}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={PHONE_TEL} className="press rounded-full bg-red px-5 py-3 font-semibold">
                  Call {PHONE_DISPLAY}
                </a>
                <a href={mailto} className="press rounded-full border border-cream/40 px-5 py-3 font-semibold">
                  Email the shop
                </a>
                <button type="button" className="px-3 py-3 text-cream/70" onClick={() => setSent(null)}>
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-3 rounded-3xl bg-cream p-5" noValidate>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-sm">
                  Name
                  <input
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-red"
                    autoComplete="name"
                  />
                </label>
                <label className="text-sm">
                  Phone
                  <input
                    value={form.phone}
                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                    className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-red"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </label>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-sm">
                  City
                  <select
                    value={form.city}
                    onChange={(event) => setForm({ ...form, city: event.target.value })}
                    className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3"
                  >
                    {cities.map((city) => (
                      <option key={city}>{city}</option>
                    ))}
                  </select>
                </label>
                <label className="text-sm">
                  What do you need?
                  <select
                    value={form.service}
                    onChange={(event) => setForm({ ...form, service: event.target.value })}
                    className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3"
                  >
                    {serviceOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="text-sm">
                What’s going on with the door?
                <textarea
                  value={form.notes}
                  onChange={(event) => setForm({ ...form, notes: event.target.value })}
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-line bg-paper px-3 py-3 outline-none focus:border-red"
                />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.discount}
                  onChange={(event) => setForm({ ...form, discount: event.target.checked })}
                  className="size-4 accent-red"
                />
                Claim 10% off with the free estimate
              </label>
              {error && (
                <p className="text-sm text-red" role="alert">
                  {error}
                </p>
              )}
              <button type="submit" className="press rounded-full bg-red px-5 py-3 font-semibold text-cream">
                Hold my estimate
              </button>
            </form>
          )}
        </section>

        <section id="areas" className="bg-ink py-16 text-cream">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-red">Before your visit</p>
              <h2 className="display mt-3 text-5xl">Quick answers.</h2>
              <div className="mt-6 divide-y divide-line-dark border-y border-line-dark">
                {(showFaqs ? faqs : faqs.slice(0, 4)).map((faq, index) => {
                  const open = faqOpen === index;
                  return (
                    <div key={faq.q}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-4 py-4 text-left"
                        aria-expanded={open}
                        onClick={() => setFaqOpen(open ? -1 : index)}
                      >
                        <span className="font-semibold">{faq.q}</span>
                        <ChevronDown className={`size-4 shrink-0 ${open ? "rotate-180" : ""}`} aria-hidden />
                      </button>
                      {open && <p className="pb-4 text-sm text-cream/75">{faq.a}</p>}
                    </div>
                  );
                })}
              </div>
              {!showFaqs && (
                <button
                  type="button"
                  className="press mt-4 rounded-full bg-red px-4 py-2 text-sm font-semibold"
                  onClick={() => setShowFaqs(true)}
                >
                  Read all FAQs
                </button>
              )}
            </div>
            <div>
              <p className="eyebrow text-red">Garage Door Store Boise</p>
              <h2 className="display mt-3 text-5xl">Garage door service near you.</h2>
              <label className="mt-4 block text-sm text-cream/70">
                Choose your service area
                <select
                  value={mapCity}
                  onChange={(event) => setMapCity(event.target.value)}
                  className="mt-2 w-full rounded-2xl bg-panel px-4 py-3 text-cream"
                >
                  {cities.map((city) => (
                    <option key={city}>{city}</option>
                  ))}
                </select>
              </label>
              <div className="mt-4 overflow-hidden rounded-3xl">
                <iframe
                  title={`Map of Garage Door Store service near ${mapCity}`}
                  src={mapSrc}
                  className="h-72 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-3 flex items-start gap-2 text-sm text-cream/70">
                <MapPin className="mt-0.5 size-4 shrink-0 text-red" aria-hidden />
                Shop: {ADDRESS}
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 flex max-w-7xl flex-wrap items-end justify-between gap-4 border-t border-line-dark px-4 pt-8">
            <h2 className="display max-w-xl text-4xl md:text-5xl">
              Let’s get your garage door back to normal.
            </h2>
            <div className="flex gap-3">
              <a href={PHONE_TEL} className="press rounded-full border border-cream/40 px-5 py-3 font-semibold">
                Call now
              </a>
              <a href="#estimate" className="press inline-flex items-center gap-2 rounded-full bg-red px-5 py-3 font-semibold">
                Request a free estimate visit <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink pb-24 text-cream md:pb-10">
        <div className="mx-auto grid max-w-7xl gap-8 border-t border-line-dark px-4 py-10 md:grid-cols-4">
          <div>
            <img src="/media/logo.png" alt="Garage Door Store Boise" className="h-14 w-auto" />
            <p className="mt-3 text-sm text-cream/70">
              Local crews, upfront pricing, and the exact cost before any work starts.
            </p>
            <a href={PHONE_TEL} className="mt-3 inline-flex rounded-full border border-cream/30 px-3 py-1 text-sm">
              {PHONE_DISPLAY}
            </a>
            <p className="mt-3 text-sm text-cream/70">{ADDRESS}</p>
            <a href={`mailto:${EMAIL}`} className="mt-1 inline-flex items-center gap-2 text-sm">
              <Mail className="size-4 text-red" aria-hidden /> {EMAIL}
            </a>
          </div>
          <div>
            <p className="eyebrow text-red">Priority services</p>
            <ul className="mt-3 space-y-2 text-sm">
              {slides.map((item) => (
                <li key={item.label}>
                  <button type="button" className="hover:text-red" onClick={() => goEstimate({ service: item.service })}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-red">Service area</p>
            <ul className="mt-3 grid grid-cols-2 gap-y-1 text-sm">
              {cities.map((city) => (
                <li key={city}>
                  <a
                    href="#areas"
                    className="hover:text-red"
                    onClick={() => setMapCity(city)}
                  >
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-red">Help & company</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#family" className="hover:text-red">Why Boise</a></li>
              <li><a href="#reviews" className="hover:text-red">Reviews</a></li>
              <li><a href="#doors" className="hover:text-red">Garage doors</a></li>
              <li><a href="#estimate" className="hover:text-red">Free estimate</a></li>
              <li>
                <a href="https://www.facebook.com/garagedoorstoreboise" className="hover:text-red">Facebook</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="px-4 text-center text-xs text-cream/50">
          © {new Date().getFullYear()} Garage Door Store Boise. Prices are the shop’s posted specials.
        </p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line-dark bg-ink md:hidden">
        <a href={PHONE_TEL} className="inline-flex items-center justify-center gap-2 py-3 font-semibold">
          <Phone className="size-4 text-red" aria-hidden /> Call
        </a>
        <a href="#estimate" className="inline-flex items-center justify-center bg-red py-3 font-semibold">
          Estimate
        </a>
      </div>

      {lightbox !== null && filtered[lightbox] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={filtered[lightbox].title}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 inline-flex size-11 items-center justify-center"
            aria-label="Close photo"
            onClick={() => setLightbox(null)}
          >
            <X aria-hidden />
          </button>
          <img
            src={filtered[lightbox].src}
            alt={filtered[lightbox].alt}
            className="max-h-[80svh] max-w-[90vw] object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
