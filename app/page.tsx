"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface Service {
  title: string;
  description: string;
  icon: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const SERVICES: Service[] = [
  {
    title: "Interior Painting",
    icon: "🏠",
    description:
      "Transform every room with precision colour application, smooth finishes, and careful preparation that ensures lasting beauty.",
  },
  {
    title: "Exterior Painting",
    icon: "🏡",
    description:
      "Weather-resistant coatings applied with expert care, protecting your home while dramatically lifting its street appeal.",
  },
  {
    title: "Weatherboard Maintenance",
    icon: "🪵",
    description:
      "Specialist care for weatherboard homes — filling, sanding, priming, and painting to prevent rot and restore character.",
  },
  {
    title: "Woodwork & Staining",
    icon: "✨",
    description:
      "Enhance the natural grain of timber with professional staining, varnishing, and sealing for decks, trims, and joinery.",
  },
  {
    title: "Commercial Painting",
    icon: "🏢",
    description:
      "Efficient, low-disruption painting for offices, retail spaces, and commercial properties across metropolitan Melbourne.",
  },
  {
    title: "Free Advice & Quotes",
    icon: "💬",
    description:
      "Not sure where to start? Simon provides free, no-obligation consultations to help you choose the right colours and finishes.",
  },
];

const REVIEWS: Review[] = [
  {
    author: "Michael T.",
    rating: 5,
    text: "He transferred my house to a brighter and cleaner place. Outstanding attention to detail — Simon genuinely cares about the result.",
    date: "March 2024",
  },
  {
    author: "Sarah K.",
    rating: 5,
    text: "He only uses top quality paint and his pricing is competitive. Exactly what you want — premium results without the premium price tag.",
    date: "January 2024",
  },
  {
    author: "James R.",
    rating: 5,
    text: "Fantastic work/results and Simon is a super friendly person to deal with! The exterior looks like a brand new home. Highly recommend.",
    date: "November 2023",
  },
  {
    author: "Linda M.",
    rating: 5,
    text: "Efficient and fast team that delivers wonderful results. Simon showed up on time every day and left the site spotless. Five stars.",
    date: "September 2023",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function Stars({ count = 5 }: { count?: number }) {
  return (
    <span aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="star text-lg">
          ★
        </span>
      ))}
    </span>
  );
}

// ─── Hook: Scroll-reveal ──────────────────────────────────────────────────────
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy-950/95 backdrop-blur-md shadow-xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg">
            <span className="text-navy-950 font-bold text-lg" style={{ fontFamily: "var(--font-playfair)" }}>
              S
            </span>
          </div>
          <span
            className="text-cream text-xl font-semibold tracking-wide"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Shine Painting
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {["Services", "About", "Reviews", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-cream/70 hover:text-gold-400 transition-colors text-sm tracking-widest uppercase font-light"
            >
              {item}
            </a>
          ))}
          <a
            href="tel:0409961638"
            className="px-5 py-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm rounded transition-all"
          >
            Call Now
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-cream"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-900/98 backdrop-blur-md border-t border-gold-500/20 px-6 py-4 flex flex-col gap-4">
          {["Services", "About", "Reviews", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-cream/80 hover:text-gold-400 text-sm tracking-widest uppercase"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="tel:0409961638"
            className="px-5 py-2 bg-gold-500 text-navy-950 font-bold text-sm rounded text-center"
            onClick={() => setMenuOpen(false)}
          >
            Call 0409 961 638
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, #1A2D5A 0%, #0A0F1E 60%)",
      }}
    >
      {/* Decorative paint drips */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, #E8B020, #F0C040, #C8940A, #E8B020)" }}
      />

      {/* Background geometry */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #E8B020, transparent)" }}
        />
        <div
          className="absolute bottom-20 -left-20 w-64 h-64 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #E8B020, transparent)" }}
        />
        {/* Grid lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#E8B020" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-400 text-xs tracking-widest uppercase mb-8 font-light">
          <Stars count={5} />
          <span>32 Five-Star Reviews · Over 20 Years Experience</span>
        </div>

        <h1
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          <span className="text-cream">Where Quality</span>
          <br />
          <span className="gold-text italic">Meets Craft</span>
        </h1>

        <p className="text-cream/60 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
          Melbourne&apos;s trusted family painting service — residential &amp; commercial
          transformations delivered with precision, care, and 100% satisfaction
          guaranteed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold rounded transition-all shadow-lg hover:shadow-gold-500/30 hover:shadow-xl text-sm tracking-wider uppercase"
          >
            Get a Free Quote
          </a>
          <a
            href="#services"
            className="px-8 py-4 border border-cream/20 hover:border-gold-500/60 text-cream/80 hover:text-gold-400 rounded transition-all text-sm tracking-wider uppercase"
          >
            Our Services
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/30 text-xs tracking-widest uppercase">
        <span>Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold-500/50 to-transparent" />
      </div>
    </section>
  );
}

function Stats() {
  const ref = useFadeUp();
  return (
    <section ref={ref} className="fade-up py-16 bg-navy-900 border-y border-gold-500/10">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { num: "20+", label: "Years Experience" },
          { num: "5.0", label: "Google Rating" },
          { num: "32", label: "Five-Star Reviews" },
          { num: "100%", label: "Satisfaction Guarantee" },
        ].map(({ num, label }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <span
              className="text-4xl md:text-5xl font-bold gold-text"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {num}
            </span>
            <span className="text-cream/50 text-xs tracking-widest uppercase">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const ref = useFadeUp();
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="fade-up text-center mb-16">
          <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">What We Do</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-cream"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Services
          </h2>
          <div className="divider-gold mt-6 max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, delay }: { service: Service; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="fade-up card-hover bg-navy-900 border border-navy-800 hover:border-gold-500/30 rounded-xl p-8 group"
    >
      <div className="text-4xl mb-4">{service.icon}</div>
      <h3
        className="text-cream text-xl font-semibold mb-3 group-hover:text-gold-400 transition-colors"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {service.title}
      </h3>
      <p className="text-cream/50 text-sm leading-relaxed">{service.description}</p>
    </div>
  );
}

function About() {
  const ref = useFadeUp();
  return (
    <section
      id="about"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0D1526 0%, #142040 100%)" }}
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-5 pointer-events-none">
        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <circle cx="150" cy="150" r="140" stroke="#E8B020" strokeWidth="1" fill="none" />
          <circle cx="150" cy="150" r="100" stroke="#E8B020" strokeWidth="0.5" fill="none" />
          <circle cx="150" cy="150" r="60" stroke="#E8B020" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto">
        <div ref={ref} className="fade-up grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">Our Story</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-cream mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Family Run.<br />
              <em className="gold-text">Craft Driven.</em>
            </h2>
            <div className="divider-gold mb-8 max-w-[80px]" />
            <div className="space-y-4 text-cream/60 leading-relaxed font-light">
              <p>
                Shine Painting Service is a family-run business operating across metropolitan
                and regional Melbourne for over two decades. Founded on the belief that
                every home deserves to be treated with care, we&apos;ve built our reputation
                one wall at a time.
              </p>
              <p>
                Simon and his team bring genuine enthusiasm and meticulous craft to every
                project — from a single feature wall to a full exterior repaint of a
                heritage weatherboard home. No job is too small, and no detail is overlooked.
              </p>
              <p>
                We use only top-quality paints and materials, because we know the
                difference shows — both on day one and five years later.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: "🏅", title: "Top Quality Materials", body: "Only premium paints and materials sourced from trusted Australian suppliers." },
              { icon: "📍", title: "All of Melbourne", body: "Servicing metropolitan and regional Victoria — we come to you." },
              { icon: "🤝", title: "100% Satisfaction", body: "We don't consider a job finished until you're completely happy with the result." },
              { icon: "⏰", title: "Available 24 Hours", body: "Flexible scheduling to minimise disruption to your home or business." },
            ].map(({ icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 p-5 bg-navy-950/60 rounded-lg border border-navy-800 hover:border-gold-500/20 transition-colors"
              >
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <div>
                  <h4 className="text-cream font-semibold mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                    {title}
                  </h4>
                  <p className="text-cream/50 text-sm">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const ref = useFadeUp();
  return (
    <section id="reviews" className="py-24 px-6 bg-navy-950">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="fade-up text-center mb-16">
          <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">Client Feedback</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-cream"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            What Our Clients Say
          </h2>
          <div className="flex justify-center items-center gap-3 mt-6">
            <Stars count={5} />
            <span className="text-cream/60 text-sm">5.0 average across 32 Google reviews</span>
          </div>
          <div className="divider-gold mt-4 max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((r, i) => (
            <ReviewCard key={r.author} review={r} delay={i * 120} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://g.co/kgs/shine-painting-service"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm transition-colors border-b border-gold-500/30 hover:border-gold-400/60 pb-0.5"
          >
            Read all 32 reviews on Google
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review, delay }: { review: Review; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="fade-up card-hover bg-navy-900 border border-navy-800 hover:border-gold-500/20 rounded-xl p-8"
    >
      <div className="flex items-center justify-between mb-4">
        <Stars count={review.rating} />
        <span className="text-cream/30 text-xs">{review.date}</span>
      </div>
      <p className="text-cream/70 leading-relaxed italic mb-6 text-sm">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 font-bold text-sm">
          {review.author[0]}
        </div>
        <span className="text-cream font-semibold text-sm">{review.author}</span>
      </div>
    </div>
  );
}

function Contact() {
  const ref = useFadeUp();
  return (
    <section
      id="contact"
      className="py-24 px-6"
      style={{ background: "radial-gradient(ellipse at 80% 50%, #1A2D5A 0%, #0A0F1E 70%)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className="fade-up text-center mb-16">
          <p className="text-gold-400 text-xs tracking-widest uppercase mb-3">Get in Touch</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-cream"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Request a Free Quote
          </h2>
          <div className="divider-gold mt-6 max-w-xs mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact details */}
          <div className="space-y-6">
            <p className="text-cream/60 leading-relaxed">
              Ready to transform your space? Contact Simon directly for a free, no-obligation
              quote. We service all of metropolitan and regional Melbourne.
            </p>

            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                label: "Phone",
                value: "0409 961 638",
                href: "tel:0409961638",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                label: "Address",
                value: "6 Laurel St, Preston VIC 3072",
                href: "https://maps.google.com/?q=6+Laurel+St+Preston+VIC+3072",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                label: "Hours",
                value: "Open 24 Hours",
                href: null,
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                ),
                label: "Areas Served",
                value: "All of Victoria — Metro & Regional",
                href: null,
              },
            ].map(({ icon, label, value, href }) => (
              <div key={label} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-gold-500/15 border border-gold-500/20 flex items-center justify-center text-gold-400 flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-cream/40 text-xs uppercase tracking-widest mb-1">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-cream hover:text-gold-400 transition-colors font-medium"
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-cream font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <a
              href="tel:0409961638"
              className="inline-flex items-center gap-3 mt-4 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold rounded transition-all shadow-lg hover:shadow-gold-500/30 hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call 0409 961 638
            </a>
          </div>

          {/* Quote form */}
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-navy-900 border border-gold-500/30 rounded-xl p-10 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-cream text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
          Thank You!
        </h3>
        <p className="text-cream/60">Simon will be in touch shortly with your free quote.</p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-navy-950/80 border border-navy-800 focus:border-gold-500/50 rounded-lg px-4 py-3 text-cream placeholder-cream/25 outline-none transition-colors text-sm";

  return (
    <div className="bg-navy-900 border border-navy-800 rounded-xl p-8 space-y-4">
      <h3 className="text-cream text-xl font-semibold mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
        Free Quote Request
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name *" className={inputClass} />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number *" className={inputClass} />
      </div>
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className={`${inputClass}`} />
      <select name="service" value={form.service} onChange={handleChange} className={inputClass}>
        <option value="" disabled>Select a Service</option>
        {SERVICES.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
      </select>
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Tell us about your project…"
        rows={4}
        className={`${inputClass} resize-none`}
      />
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold rounded transition-all text-sm tracking-wider uppercase"
      >
        Request Free Quote
      </button>
      <p className="text-cream/30 text-xs text-center">We&apos;ll respond within 24 hours.</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-gold-500/10 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <span className="text-navy-950 font-bold" style={{ fontFamily: "var(--font-playfair)" }}>S</span>
              </div>
              <span className="text-cream font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>Shine Painting Service</span>
            </div>
            <p className="text-cream/40 text-sm max-w-xs">
              Family-run painting specialists serving Melbourne for over 20 years.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-sm">
            {["Services", "About", "Reviews", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-cream/50 hover:text-gold-400 transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="text-sm space-y-2">
            <a href="tel:0409961638" className="block text-cream/70 hover:text-gold-400 transition-colors">📞 0409 961 638</a>
            <p className="text-cream/40">6 Laurel St, Preston VIC 3072</p>
            <p className="text-cream/40">Open 24 Hours</p>
          </div>
        </div>

        <div className="divider-gold mb-6" />

        <p className="text-center text-cream/25 text-xs">
          © {new Date().getFullYear()} Shine Painting Service. All rights reserved. ABN available on request.
        </p>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Stats />
      <Services />
      <About />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
