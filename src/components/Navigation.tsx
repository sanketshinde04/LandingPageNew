"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BookingDialog from "@/components/BookingDialog";
import Magnetic from "@/components/Magnetic";
import { nav, site } from "@/lib/content";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] transition-colors duration-700 ${
        scrolled ? "bg-base/70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          aria-label={`${site.product} by ${site.name}`}
          className="flex items-baseline text-[1.35rem] font-semibold leading-none tracking-[-0.045em] text-white"
        >
          {site.product.split(" ").slice(-1)[0].toLowerCase()}
          <span className="hero-stop" aria-hidden="true" />
        </Link>

        <nav className="glass hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex" aria-label="Main Navigation">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-colors duration-300 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Magnetic strength={0.1}>
          <BookingDialog
            triggerClassName="btn btn-solid !px-4 !py-2 text-[13px] sm:!px-6 sm:!py-2.5 sm:text-sm"
            label={nav.cta.label}
          />
        </Magnetic>
      </div>
    </header>
  );
}
