import { footer, site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t hairline pb-12 pt-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 sm:grid-cols-2 md:px-10 lg:grid-cols-[1.5fr_0.8fr_1.1fr_0.8fr] lg:gap-12">
        <div>
          <a href="#top" className="flex items-baseline gap-2.5">
            <span className="flex items-baseline text-2xl font-semibold leading-none tracking-[-0.045em] text-bone">
              deploy
              <span className="hero-stop" aria-hidden="true" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
              by {site.name}
            </span>
          </a>
          <p className="mt-5 max-w-[320px] text-[15px] leading-[1.6] text-[#9a9eac]">
            {footer.blurb}
          </p>
          <a
            href={`mailto:${site.contactEmail}`}
            className="mt-6 inline-flex items-center gap-3 border-t hairline pt-5 text-[15px] text-bone/85 transition-colors duration-300 hover:text-accent"
          >
            <span
              className="h-[7px] w-[7px] rounded-[1.5px] bg-accent"
              aria-hidden="true"
            />
            {site.contactEmail}
          </a>
        </div>

        {footer.columns.map((col) => (
          <div key={col.heading}>
            {/* a paragraph, not a heading: the global heading rule would take
                the mono face away from it */}
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
              <span
                className="h-[7px] w-[7px] rounded-[1.5px] bg-white/20"
                aria-hidden="true"
              />
              {col.heading}
            </p>
            <ul className="mt-5 space-y-3.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[15px] text-bone/75 transition-colors duration-300 hover:text-accent"
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-[1200px] border-t hairline px-6 pt-7 md:px-10">
        <p className="font-mono text-[11px] tracking-[0.06em] text-white/40">{footer.legal}</p>
      </div>
    </footer>
  );
}
