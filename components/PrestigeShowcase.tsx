"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import BrandLoader from "@/components/three/BrandLoader";
import { ArrowIcon, InstagramIcon, PhoneIcon } from "@/components/icons";
import { FLEET } from "@/lib/fleet";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/hooks";
import { orbitScroll } from "@/lib/orbit-signal";
import { SITE } from "@/lib/site";

const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas"), {
  ssr: false,
});
const OrbitScene = dynamic(() => import("@/components/three/OrbitScene"), {
  ssr: false,
});

const highlights = [
  {
    label: "Luxury fleet",
    title: "Premium options for arrivals, weekends, and special plans.",
    text: "Choose from Range Rover Sport, Porsche Cayenne, Ford Mustang Convertible, premium SUVs, comfortable sedans, and practical economy cars.",
  },
  {
    label: "Fleet proof",
    title: "A clean category for every kind of trip.",
    text: "Luxury, sport, SUV, sedan, and economy selections make it easy to match the vehicle to the moment, from quick city movement to family travel.",
  },
  {
    label: "Concierge service",
    title: "Airport transfers, host placement, and direct reservations.",
    text: "Prestige supports travelers, local drivers, Airbnb hosts, and visitors who want a smooth handoff without a complicated process.",
  },
];

const experiences = [
  {
    title: "Airport transfers",
    image: "/experiences/airport-transfers.webp",
    text: "Concierge arrival visuals for travelers, visitors, and VIP handoffs.",
  },
  {
    title: "Host placement",
    image: "/experiences/host-placement.webp",
    text: "A ready angle for Airbnb hosts and villas that need car access built into the stay.",
  },
  {
    title: "Powersports",
    image: "/experiences/powersports.webp",
    text: "Adventure inventory and upsell moments for visitors chasing a bigger day.",
  },
];

function inRange(progress: number, min: number, max: number) {
  return progress >= min && progress <= max;
}

function MonolithSlide({
  active,
  eyebrow,
  children,
}: {
  active: boolean;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute inset-x-0 bottom-[13%] z-20 px-5 transition-all duration-700 sm:px-10 lg:px-16 ${
        active
          ? "translate-y-0 opacity-100 blur-0"
          : "pointer-events-none translate-y-8 opacity-0 blur-md"
      }`}
    >
      <p className="font-sans text-[11px] uppercase tracking-luxe text-paper/60">
        {eyebrow}
      </p>
      {children}
    </div>
  );
}

function ProgressRail({ progress }: { progress: number }) {
  return (
    <div className="pointer-events-none absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {[0, 1, 2, 3].map((index) => {
        const segment = Math.max(
          0,
          Math.min(1, (progress - index * 0.25) / 0.25)
        );
        return (
          <div key={index} className="h-10 w-0.5 overflow-hidden rounded bg-paper/20">
            <div className="w-full bg-paper" style={{ height: `${segment * 100}%` }} />
          </div>
        );
      })}
    </div>
  );
}

function HeroStage() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const cinematic = !reduced && !isMobile;
  const stageRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    orbitScroll.idle = !cinematic;
    if (!cinematic) {
      orbitScroll.progress = 0;
      setProgress(0);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (!stageRef.current) return;
      ScrollTrigger.create({
        trigger: stageRef.current,
        start: "top top",
        end: "+=420%",
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          orbitScroll.progress = self.progress;
          setProgress(self.progress);
        },
      });
    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 650);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
      orbitScroll.progress = 0;
      setProgress(0);
    };
  }, [cinematic]);

  return (
    <section
      id="top"
      ref={stageRef}
      className="relative h-[100svh] overflow-hidden bg-bg"
    >
      <div className="absolute inset-0">
        <SceneCanvas cameraZ={6.4} bloom={0.95}>
          <OrbitScene />
        </SceneCanvas>
      </div>
      <BrandLoader />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_52%_32%,transparent_24%,rgba(54,51,51,0.34)_58%,#363333_94%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(54,51,51,0.86),transparent_43%,rgba(54,51,51,0.46))]"
        aria-hidden="true"
      />

      <MonolithSlide active={inRange(progress, 0, 0.16)} eyebrow="Prestige Auto Rentals">
        <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.0] text-paper sm:text-7xl lg:text-8xl">
          Premium car rentals for every arrival.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-paper/75 sm:text-lg">
          Luxury SUVs, sport convertibles, sedans, and economy vehicles ready for airport pickups, weekend plans, business trips, and longer stays.
        </p>
        <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
          <a
            href={SITE.phoneHref}
            className="inline-flex min-h-14 items-center gap-2 rounded-full bg-paper px-7 py-4 text-sm font-semibold text-graphite transition hover:bg-smoke"
          >
            <PhoneIcon className="h-4 w-4" />
            {SITE.phoneDisplay}
          </a>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-14 items-center gap-2 rounded-full border border-paper/25 px-7 py-4 text-sm font-semibold text-paper transition hover:border-paper/70 hover:bg-paper/10"
          >
            <InstagramIcon className="h-4 w-4" />
            Instagram
          </a>
        </div>
      </MonolithSlide>

      <MonolithSlide active={inRange(progress, 0.26, 0.44)} eyebrow="01 - The feel">
        <p className="mt-5 max-w-3xl font-display text-3xl font-light leading-snug text-paper sm:text-5xl">
          Arrive in the vehicle that fits the day: a luxury SUV for presence, a convertible for the coast, or a reliable sedan for easy movement.
        </p>
      </MonolithSlide>

      <MonolithSlide active={inRange(progress, 0.54, 0.72)} eyebrow="02 - The offer">
        <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-paper sm:text-6xl">
          Choose by category, comfort, or occasion.
        </h2>
        <ul className="mt-7 max-w-2xl space-y-3">
          {highlights.map((item, index) => (
            <li key={item.label} className="border-t border-paper/20 pt-3">
              <span className="mr-3 text-sm text-paper/45">0{index + 1}</span>
              <span className="text-xl font-medium text-paper/85">{item.label}</span>
            </li>
          ))}
        </ul>
      </MonolithSlide>

      <MonolithSlide active={inRange(progress, 0.82, 1.01)} eyebrow="03 - The proof">
        <h2 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.02] text-paper sm:text-7xl">
          From everyday drives to premium arrivals.
        </h2>
        <p className="mt-5 max-w-xl text-paper/75">
          Explore the categories, compare the fleet, then call or message Prestige to confirm the right vehicle for your dates.
        </p>
        <div className="pointer-events-auto mt-8">
          <a
            href="#fleet"
            className="inline-flex min-h-14 items-center gap-2 rounded-full bg-paper px-8 py-4 text-sm font-semibold text-graphite transition hover:bg-smoke"
          >
            View the fleet
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
      </MonolithSlide>

      <ProgressRail progress={progress} />
      <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 text-[11px] uppercase tracking-luxe text-paper/55 sm:block">
        Scroll to explore
      </div>
    </section>
  );
}

function HighlightSection() {
  return (
    <section className="border-y border-stone/15 bg-paper px-5 py-20 text-graphite sm:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-[11px] uppercase tracking-luxe text-ash">Why Prestige</p>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.06] text-graphite sm:text-5xl">
            A fleet built for travelers, hosts, families, and drivers who want a better handoff.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.label} className="border border-stone/15 bg-[#FAF9FA] p-6 shadow-[0_18px_60px_rgba(54,51,51,0.06)]">
              <p className="text-[11px] uppercase tracking-luxe text-ash">{item.label}</p>
              <h3 className="mt-8 text-2xl font-semibold leading-tight text-graphite">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-stone">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FleetSection() {
  return (
    <section id="fleet" className="scroll-mt-24 bg-[#FAF9FA] px-5 py-20 text-graphite sm:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-luxe text-ash">Fleet gallery</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.06] text-graphite sm:text-6xl">
              Luxury credibility, practical inventory, and easy scanning.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-stone lg:justify-self-end">
            Pick the vehicle that matches the plan: premium comfort, family space, sporty open-air driving, or an efficient daily rental.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FLEET.map((vehicle, index) => (
            <article
              key={vehicle.slug}
              className={`group overflow-hidden border border-stone/15 bg-paper shadow-[0_18px_60px_rgba(54,51,51,0.08)] ${
                index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div className={`relative ${index === 0 ? "aspect-[1.55]" : "aspect-[1.25]"}`}>
                <Image
                  src={`/fleet/${vehicle.slug}.webp`}
                  alt={vehicle.name}
                  fill
                  sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                  className="object-cover transition duration-700 group-hover:scale-105"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/75 via-transparent to-transparent" />
              </div>
              <div className="flex items-end justify-between gap-4 p-4">
                <div>
                  <p className="text-[10px] uppercase tracking-luxe text-ash">{vehicle.category}</p>
                  <h3 className="mt-1 text-lg font-semibold text-graphite">{vehicle.name}</h3>
                </div>
                <span className="text-xs text-ash">{String(index + 1).padStart(2, "0")}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="bg-paper px-5 py-20 text-graphite sm:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden border border-stone/15 shadow-[0_24px_80px_rgba(54,51,51,0.08)]">
          <div className="relative aspect-[1.65] min-h-[420px]">
            <Image
              src="/experiences/luxury-banner.webp"
              alt="Prestige Auto Rentals luxury rental banner"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-graphite/90 via-stone/40 to-transparent" />
          </div>
          <div className="absolute inset-0 flex items-end p-6 sm:p-10 lg:p-14">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-luxe text-paper/70">More than the keys</p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] text-paper sm:text-6xl">
                Airport arrivals, host support, and adventure-ready add-ons.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-paper/75">
                Prestige makes the rental feel simple from the first message: pickup details, vehicle category, trip length, and the right option for the route.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {experiences.map((item) => (
            <article key={item.title} className="overflow-hidden border border-stone/15 bg-paper shadow-[0_18px_60px_rgba(54,51,51,0.06)]">
              <div className="relative aspect-[1.35]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-graphite">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-paper/15 bg-bg px-5 py-20 sm:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-[11px] uppercase tracking-luxe text-paper/60">Reserve your vehicle</p>
          <h2 className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] text-paper sm:text-7xl">
            Ready for your next arrival.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-paper/75">
            Call or message Prestige Auto Rentals to check availability, confirm your dates, and choose the category that fits your trip.
          </p>
        </div>
        <div className="border border-paper/15 bg-stone/45 p-6">
          <p className="text-[11px] uppercase tracking-luxe text-paper/50">Contact</p>
          <a
            href={SITE.phoneHref}
            className="mt-5 flex min-h-14 items-center justify-between border-b border-paper/15 pb-5 text-2xl font-semibold text-paper transition hover:text-smoke"
          >
            {SITE.phoneDisplay}
            <PhoneIcon className="h-5 w-5" />
          </a>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex min-h-14 items-center justify-between text-2xl font-semibold text-paper transition hover:text-smoke"
          >
            {SITE.instagramHandle}
            <InstagramIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function PrestigeShowcase() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-bg text-ink">
        <Nav />
        <main>
          <HeroStage />
          <HighlightSection />
          <FleetSection />
          <ExperienceSection />
          <ContactSection />
        </main>
        <footer className="border-t border-paper/15 bg-bg px-5 py-10 text-center text-xs uppercase tracking-luxe text-paper/50 sm:px-10">
          <p>{SITE.name}</p>
        </footer>
      </div>
    </SmoothScroll>
  );
}
