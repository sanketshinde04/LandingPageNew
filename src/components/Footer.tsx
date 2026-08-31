import { footer, site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t hairline pb-12 pt-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 sm:grid-cols-2 md:px-10 lg:grid-cols-[1.5fr_0.8fr_1.1fr_0.8fr] lg:gap-12">
        <div>
          <a href="#top" className="flex items-baseline gap-2">
            <span className="serif-accent text-2xl leading-none text-white">
              deploy
            </span>
            <span className="eyebrow !text-[10px] text-white/50">
              by {site.name}
            </span>
          </a>
          <p className="mt-5 max-w-[320px] text-[15px] leading-relaxed text-white/55">
            {footer.blurb}
          </p>
        </div>

        {footer.columns.map((col) => (
          <div key={col.heading}>
            <h4 className="eyebrow">{col.heading}</h4>
            <ul className="mt-5 space-y-3.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[15px] text-white/70 transition-colors duration-300 hover:text-accent"
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

      <div className="mx-auto mt-16 max-w-[1200px] border-t border-white/10 px-6 pt-7 md:px-10">
        <p className="font-mono text-xs text-white/40">{footer.legal}</p>
      </div>
    </footer>
  );
}
