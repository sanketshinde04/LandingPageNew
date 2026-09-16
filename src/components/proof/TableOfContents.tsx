"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  text: string;
  index: number;
}

interface TableOfContentsProps {
  headings: TocItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id || "");
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-90px 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const yOffset = -90;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActiveId(id);
    setIsOpenMobile(false);
  };

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="w-full rounded-2xl border border-white/15 bg-[#090e1b] shadow-md"
    >
      {/* Mobile Accordion Header */}
      <button
        type="button"
        onClick={() => setIsOpenMobile((prev) => !prev)}
        className="flex w-full items-center justify-between px-5 py-4 text-left font-mono text-xs uppercase tracking-[0.16em] text-zinc-300 hover:text-white lg:hidden"
      >
        <span className="font-semibold">Contents ({headings.length})</span>
        <svg
          className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${isOpenMobile ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Desktop Header */}
      <div className="hidden border-b border-white/10 px-5 py-4 lg:block">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-300 font-semibold">
            Table of Contents
          </span>
          <span className="font-mono text-xs text-zinc-300 font-medium">
            {headings.length} sections
          </span>
        </div>
      </div>

      {/* List Container */}
      <div
        className={`max-h-[65vh] overflow-y-auto px-4 py-3 lg:block ${
          isOpenMobile ? "block" : "hidden"
        }`}
      >
        <ul className="space-y-1">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <li key={heading.id}>
                <button
                  type="button"
                  onClick={() => scrollToHeading(heading.id)}
                  className={`group flex w-full items-start gap-3 py-2 pl-3 pr-2 text-left text-sm leading-[1.5] transition-all border-l-2 ${
                    isActive
                      ? "border-accent font-semibold text-white"
                      : "border-transparent text-zinc-300 hover:text-white"
                  }`}
                >
                  <span className="font-mono text-xs text-zinc-400 group-hover:text-accent font-medium">
                    {String(heading.index).padStart(2, "0")}
                  </span>
                  <span className="flex-1 truncate">{heading.text}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
