"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { InstagramIcon, PhoneIcon } from "./icons";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-paper/15 bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-paper/35 font-display text-lg font-semibold text-paper">
            P
          </span>
          <span className="hidden font-display text-base font-semibold tracking-wide text-paper sm:block">
            {SITE.name}
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="grid h-10 w-10 place-items-center rounded-full border border-paper/25 text-paper transition-colors hover:border-paper/60 hover:bg-paper/10"
          >
            <InstagramIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2.5 text-xs font-semibold text-graphite transition-transform hover:-translate-y-0.5 hover:bg-smoke sm:px-5 sm:text-sm"
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp {SITE.phoneDisplay}</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
