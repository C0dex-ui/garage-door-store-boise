import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  ADDRESS_CITY,
  ADDRESS_LINE,
  brands,
  MAPS_EMBED,
  offers,
  PHONE_DISPLAY,
  PHONE_TEL,
  residentialStyles,
  reviews,
  serviceAreas,
  services,
  symptoms,
} from "@/data/site";

const quotes = [
  {
    name: "Lauri T.",
    place: "Boise",
    text: "My garage door spring snapped late Thursday night. I called the next morning and my call was returned within the hour. I wasn’t able to be there Friday afternoon because of Dr. appointments, so they came out Saturday morning first thing. The team replaced the spring and added another spring on my double door. They were done in less than 30 minutes. Fast, efficient, courteous service.",
  },
  ...reviews.map((review) => ({
    name: review.name,
    place: "place" in review ? review.place : undefined,
    text: review.text,
  })),
];

const shots = [
  { src: "/media/wood-4.webp", alt: "Wood grain sectional garage door from the company gallery", label: "Wood and stone", group: "wood", span: "tall" },
  { src: "/media/carriage-2.webp", alt: "Carriage garage door with decorative windows, company gallery", label: "Carriage pair", group: "carriage" },
  { src: "/media/wood-3.webp", alt: "Wood grain garage doors on a residence in the company gallery", label: "Gallery wood", group: "wood" },
  { src: "/media/carriage-1.webp", alt: "Carriage-style garage door from the company gallery", label: "Carriage hardware", group: "carriage" },
  { src: "/media/wood-2.webp", alt: "Second wood grain garage door from the company gallery", label: "Winter wood", group: "wood" },
  { src: "/media/steel.webp", alt: "White carriage-style garage doors from the company gallery", label: "Arched steel", group: "traditional", span: "wide" },
  { src: "/media/trad-1.webp", alt: "Traditional raised-panel garage door from the company gallery", label: "Matched pair", group: "traditional" },
  { src: "/media/truck.webp", alt: "Garage Door Store Boise service trucks", label: "The crew", group: "shop" },
  { src: "/media/comm-1.webp", alt: "Commercial garage door from the Garage Door Store Boise gallery", label: "Commercial bay", group: "commercial" },
  { src: "/media/comm-2.webp", alt: "Commercial bay door from the company gallery", label: "Shop door", group: "commercial" },
];

const filters = [
  { id: "all", label: "All" },
  { id: "wood", label: "Wood" },
  { id: "carriage", label: "Carriage" },
  { id: "traditional", label: "Traditional" },
  { id: "commercial", label: "Commercial" },
] as const;

const faqs = [
  {
    q: "When should I replace a garage door with a new one?",
    a: "When panels are badly damaged, the door sits twisted, or a repair is the wrong fix for the opening. The shop looks at the door before recommending repair or replacement. A free estimate is how they ask you to start.",
  },
  {
    q: "How do I choose a good company for garage door repair in Boise?",
    a: "Garage Door Store Boise publishes that it is family-owned, licensed, bonded, and insured, and that a technician is available to take the call 24/7. Ask for the price before anyone is scheduled.",
  },
  {
    q: "Can I install a garage door myself?",
    a: "The company installs the door. Springs and cables stay under high tension even when the door is down. Do not wind, adjust, or disconnect them yourself.",
  },
  {
    q: "What is a garage door tune-up?",
    a: "The current site lists a full tune-up at $125, including tax and labor. It is meant to keep a working door working. It is not a substitute for a broken spring or a door that is off its track. Confirm the figure before you book.",
  },
  {
    q: "Why did my garage door stop working?",
    a: "It can be a spring, an opener, a track, the photo eyes, or a lock. Picking a symptom on this page is a starting point, not a diagnosis. A technician still has to see the door.",
  },
];

const areaPills = ["Kuna", "Meridian", "Eagle", "Nampa", "Star", "Caldwell", "Middleton", "Homedale"];

export function HomePage() {
  return (
    <main className="home">
      <Hero />
      <Collection />
      <Services />
      <Symptoms />
      <Compare />
      <Shop />
      <Reviews />
      <Portfolio />
      <Area />
      <Prices />
      <About />
      <Finale />
      <Questions />
    </main>
  );
}

function Hero() {
  return (
    <section className="hm-hero" aria-label="Introduction">
      <div className="hm-hero-copy">
        <p className="hm-kicker">Home · Treasure Valley · Project 01</p>
        <h1>
          Your home.
          <br />
          Your statement.
          <br />
          Your garage door.
        </h1>
        <p className="hm-lead">
          Thoughtfully selected garage doors, dependable repairs, and professional installation for Boise and the Treasure Valley.
        </p>
        <div className="hm-actions">
          <Link to="/contact" className="hm-btn hm-btn-signal">
            Get a free estimate
          </Link>
          <a className="hm-btn hm-btn-ghost" href="#collection">
            Explore the collection
          </a>
        </div>
      </div>
      <figure className="hm-hero-photo">
        <img
          src="/media/hero-blue-house.webp"
          alt="Wood-tone garage doors on a blue home from the company gallery"
        />
        <figcaption>Carriage wood · Local install</figcaption>
      </figure>
    </section>
  );
}

function Collection() {
  return (
    <section className="hm-band" id="collection" aria-labelledby="collection-title">
      <div className="hm-wrap">
        <div className="hm-split-head">
          <div>
            <p className="hm-kicker">The collection</p>
            <h2 id="collection-title">Not just a door. The finishing touch.</h2>
          </div>
          <p className="hm-note">
            Six looks from the shop’s own gallery. Tap a style to see the photographs and ask for that door.
          </p>
        </div>
        <div className="hm-styles">
          {residentialStyles.map((style) => (
            <Link key={style.slug} to="/doors/$slug" params={{ slug: style.slug }} className="hm-style">
              <img src={style.images[0].src} alt={style.images[0].alt} />
              <span className="hm-style-no">{style.number}</span>
              <span className="hm-style-meta">
                <strong>{style.title}</strong>
                <em>View style</em>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [index, setIndex] = useState(0);
  const current = services[index];
  return (
    <section className="hm-band hm-dark" id="services" aria-labelledby="services-title">
      <div className="hm-wrap hm-two">
        <div>
          <p className="hm-kicker">Services</p>
          <h2 id="services-title">When something’s wrong, we get to work.</h2>
          <div className="hm-slist" role="tablist" aria-label="Services">
            {services.map((service, i) => (
              <button
                key={service.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
              >
                <span>{service.number}</span>
                {service.title}
              </button>
            ))}
          </div>
        </div>
        <figure className="hm-service-photo">
          <img src={current.image} alt={current.imageAlt} />
          <figcaption>
            <p>{current.summary}</p>
            <a href={current.href} className="hm-btn hm-btn-signal">
              {current.id === "repair" ? "Request a repair visit" : current.cta}
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Symptoms() {
  const [index, setIndex] = useState(0);
  const current = symptoms[index];
  return (
    <section className="hm-band" aria-labelledby="symptom-title">
      <div className="hm-wrap hm-sym">
        <div>
          <p className="hm-kicker">Repair</p>
          <h2 id="symptom-title">What’s your garage door doing?</h2>
          <p className="hm-note">
            Pick the closest symptom. It is a starting point, not a diagnosis. A technician still has to see the door.
          </p>
        </div>
        <div className="hm-radios" role="radiogroup" aria-label="Door symptoms">
          {symptoms.map((item, i) => (
            <button key={item.id} type="button" role="radio" aria-checked={i === index} onClick={() => setIndex(i)}>
              <i />
              {item.title.replace(/\.$/, "")}
            </button>
          ))}
        </div>
        <article className="hm-guide" aria-live="polite">
          <p className="hm-kicker">General guidance</p>
          <h3>{current.title.replace(/\.$/, "")}</h3>
          <p>{current.guidance}</p>
          <div className="hm-actions">
            <Link to="/contact" className="hm-btn hm-btn-signal">
              Request an estimate
            </Link>
            <a className="hm-btn hm-btn-line" href={PHONE_TEL}>
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

function Compare() {
  const [pos, setPos] = useState(56);
  const frame = useRef<HTMLDivElement>(null);

  function move(clientX: number) {
    const box = frame.current?.getBoundingClientRect();
    if (!box) return;
    const next = ((clientX - box.left) / box.width) * 100;
    setPos(Math.min(90, Math.max(10, next)));
  }

  return (
    <section className="hm-band hm-dark" aria-labelledby="compare-title">
      <div className="hm-wrap hm-two hm-compare">
        <div>
          <p className="hm-kicker">Architecture</p>
          <h2 id="compare-title">The right door changes everything.</h2>
          <p className="hm-note hm-note-light">
            Drag between two different Treasure Valley installs. These are not a before-and-after of the same house.
          </p>
          <p className="hm-note hm-note-light">
            Left: carriage wood on a navy house. Right: another residential door from the gallery.
          </p>
        </div>
        <div
          className="cmp"
          ref={frame}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            move(event.clientX);
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) move(event.clientX);
          }}
        >
          <img src="/media/wood-3.webp" alt="Wood grain garage doors on a residence in the company gallery" />
          <img
            className="cmp-top"
            src="/media/hero-blue-house.webp"
            alt="Wood-tone garage doors on a blue home from the company gallery"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          />
          <span className="cmp-bar" style={{ left: `${pos}%` }} aria-hidden="true" />
          <input
            type="range"
            min={10}
            max={90}
            value={pos}
            aria-label="Compare two gallery installations"
            onChange={(event) => setPos(Number(event.target.value))}
            suppressHydrationWarning
          />
        </div>
      </div>
    </section>
  );
}

function Shop() {
  const facts = [
    { strong: "30+", label: "Years in the Treasure Valley" },
    { strong: "24/7", label: "Phone answered, as published by the shop" },
    { strong: "Free", label: "In-home estimate" },
    { strong: "Local", label: "Family-owned, Boise" },
    { strong: "Both", label: "Homes and commercial openings" },
    { strong: "Valley", label: "Boise, Meridian, Eagle, Nampa" },
  ];
  return (
    <section className="hm-band" aria-labelledby="shop-title">
      <div className="hm-wrap hm-shop">
        <div>
          <p className="hm-kicker">The shop</p>
          <h2 id="shop-title">Local know-how. Over 30 years of experience.</h2>
          <p className="hm-note">
            Family-owned and operated in Boise. The shop publishes a free in-home estimate, residential and commercial work, and a crew you can call.
          </p>
          <img src="/media/truck.webp" alt="Garage Door Store Boise service trucks" />
        </div>
        <ul className="hm-facts">
          {facts.map((fact) => (
            <li key={fact.strong}>
              <strong>{fact.strong}</strong>
              <span>{fact.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Reviews() {
  const [index, setIndex] = useState(0);
  const quote = quotes[index];
  return (
    <section className="hm-band" id="reviews" aria-labelledby="reviews-title">
      <div className="hm-wrap">
        <div className="hm-split-head">
          <div>
            <p className="hm-kicker">Reviews</p>
            <h2 id="reviews-title">Trust built one visit at a time.</h2>
          </div>
          <a className="hm-quiet" href="https://www.google.com/search?q=Garage+Door+Store+Boise+reviews">
            Google · published reviews
          </a>
        </div>
        <blockquote className="hm-quote">{quote.text}</blockquote>
        <div className="hm-quote-bar">
          <p>
            {quote.name}
            {quote.place ? ` · ${quote.place}` : ""}
          </p>
          <div>
            <button type="button" aria-label="Previous review" onClick={() => setIndex((i) => (i - 1 + quotes.length) % quotes.length)}>
              ←
            </button>
            <button type="button" aria-label="Next review" onClick={() => setIndex((i) => (i + 1) % quotes.length)}>
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const visible = shots.filter((shot) => filter === "all" || shot.group === filter);
  return (
    <section className="hm-band" id="work" aria-labelledby="work-title">
      <div className="hm-wrap">
        <div className="hm-split-head">
          <div>
            <p className="hm-kicker">Portfolio</p>
            <h2 id="work-title">Built around your home.</h2>
          </div>
          <div className="hm-filters" role="tablist" aria-label="Gallery filters">
            {filters.map((item) => (
              <button key={item.id} type="button" role="tab" aria-selected={filter === item.id} onClick={() => setFilter(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className={filter === "all" ? "hm-folio" : "hm-folio is-filtered"}>
          {visible.map((shot) => (
            <figure key={shot.src} className={filter === "all" && shot.span ? `is-${shot.span}` : undefined}>
              <img src={shot.src} alt={shot.alt} />
              <figcaption>{shot.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Area() {
  const shown = areaPills.filter((city) => (serviceAreas as readonly string[]).includes(city));
  return (
    <section className="hm-band hm-dark" aria-labelledby="area-title">
      <div className="hm-wrap hm-two">
        <div>
          <p className="hm-kicker">Service area</p>
          <h2 id="area-title">Proud to serve the Treasure Valley.</h2>
          <p className="hm-note hm-note-light">
            {ADDRESS_LINE}, {ADDRESS_CITY}. The shop lists these communities. Call if you are nearby and not sure.
          </p>
          <ul className="hm-pills">
            {shown.map((city) => (
              <li key={city}>{city}</li>
            ))}
          </ul>
          <p className="hm-count">{shown.length} directions</p>
          <Link to="/contact" className="hm-btn hm-btn-signal">
            Ask if you live in the area
          </Link>
        </div>
        <div className="hm-map">
          <iframe title="Map showing Garage Door Store Boise" src={MAPS_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}

function Prices() {
  const notes = [
    "Includes tax and labor. Full tune-up.",
    "Includes tax and labor. 10-year warranty.",
    "Torque tube replacement.",
    "7' Genie 2028 belt drive, 2 remotes, and keypad.",
  ];
  return (
    <section className="hm-band" id="prices" aria-labelledby="prices-title">
      <div className="hm-wrap">
        <p className="hm-kicker">Published prices</p>
        <h2 id="prices-title">What the shop has in writing.</h2>
        <p className="hm-note">
          These amounts are the ones published on the current site. Call to confirm before you book. Anything else is an estimate, not a price.
        </p>
        <ul className="hm-prices">
          {offers.map((offer, i) => (
            <li key={offer.name}>
              <span>{offer.price}</span>
              <strong>{offer.name}</strong>
              <em>{notes[i]}</em>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="hm-band hm-about" aria-labelledby="about-title">
      <div className="hm-wrap hm-two">
        <figure>
          <img src="/media/truck.webp" alt="Garage Door Store Boise trucks at a local job" />
          <div className="hm-brands">
            {brands.map((brand) => (
              <img key={brand.name} src={brand.src} alt={brand.name} />
            ))}
          </div>
        </figure>
        <div>
          <p className="hm-kicker">About</p>
          <h2 id="about-title">Good work. Local people. Built on experience.</h2>
          <p className="hm-note">
            The same local crew. A text when the technician is on the way, with a photo, is something customers mention by name.
          </p>
          <div className="hm-video">
            <iframe
              title="Garage Door Store Boise on YouTube"
              src="https://www.youtube.com/embed/bSldLJXGTGU"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <a className="hm-quiet" href="https://www.youtube.com/watch?v=bSldLJXGTGU">
            Watch on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}

function Finale() {
  return (
    <section className="hm-finale" aria-labelledby="finale-title">
      <img src="/media/trad-1.webp" alt="" />
      <div>
        <h2 id="finale-title">Ready for a better garage door?</h2>
        <p>Let’s find the right solution for your home or business.</p>
        <div className="hm-actions">
          <Link to="/contact" className="hm-btn hm-btn-signal">
            Get your free estimate
          </Link>
          <a className="hm-btn hm-btn-ghost" href={PHONE_TEL}>
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}

function Questions() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="hm-band" id="questions" aria-labelledby="faq-title">
      <div className="hm-wrap hm-faq">
        <h2 id="faq-title">Questions, answered briefly</h2>
        {faqs.map((item, i) => {
          const on = open === i;
          return (
            <div key={item.q} className={on ? "is-open" : undefined}>
              <button type="button" aria-expanded={on} onClick={() => setOpen(on ? null : i)}>
                {item.q}
              </button>
              {on && <p>{item.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
