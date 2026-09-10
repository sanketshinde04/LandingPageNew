import { manifesto } from "@/lib/content";

/* ------------------------------------------------------------------ *
   A paired ledger. Every row puts the usual way and our way on the same
   line, so nothing is hidden behind a handle or an animation: the reader
   sees both at once and the contrast does the work.

   Wide screens: index | usual way | how we work, with the right column on
   a faint surface and a hairline between the two. Small screens: one
   legend line at the top, then each row stacks the pair with the marks
   telling them apart — no index column and no repeated labels, so the
   narrow width goes to the words.
 * ------------------------------------------------------------------ */

const pairs = manifesto.oldWay.items.map((old, i) => ({
  old,
  ship: manifesto.shipWay.items[i] ?? "",
}));

const mono = "font-mono text-[11px] uppercase tracking-[0.18em]";

export default function ManifestoSplit() {
  return (
    <div className="-mx-5 mt-12 text-left sm:-mx-8 md:mx-auto md:mt-14 md:max-w-[960px]">
      {/* ---------- small screens: a legend ---------- */}
      <div className={`${mono} flex flex-wrap gap-x-6 gap-y-2 px-5 pb-4 sm:px-8 md:hidden`}>
        <span className="flex items-center gap-2.5 text-white/40">
          <span className="text-[13px] text-white/30" aria-hidden="true">
            ✗
          </span>
          {manifesto.oldWay.heading}
        </span>
        <span className="flex items-center gap-2.5 text-accent">
          <span className="text-[13px]" aria-hidden="true">
            →
          </span>
          {manifesto.shipWay.heading}
        </span>
      </div>

      {/* ---------- wide screens: column heads ---------- */}
      <div className="hidden md:grid md:grid-cols-[56px_1fr_1fr]">
        <span aria-hidden="true" />
        <p className={`${mono} px-5 pb-4 text-white/40`}>
          {manifesto.oldWay.heading}
        </p>
        <p className={`${mono} px-5 pb-4 text-accent`}>
          {manifesto.shipWay.heading}
        </p>
      </div>

      <ol className="border-y hairline">
        {pairs.map((row, i) => (
          <li
            key={i}
            className="group border-t hairline first:border-t-0 md:grid md:grid-cols-[56px_1fr_1fr]"
          >
            <span
              className={`${mono} hidden items-center pl-1 text-white/30 md:flex`}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="flex items-start gap-3.5 px-5 pt-5 pb-3 text-[15px] leading-snug text-white/45 sm:px-8 md:min-h-[72px] md:items-center md:px-5 md:py-5 md:text-[16px]">
              <span className="w-4 shrink-0 font-mono text-[13px] text-white/30" aria-hidden="true">
                ✗
              </span>
              <span className="decoration-white/25 decoration-[1px] underline-offset-[3px] group-hover:line-through">
                {row.old}
              </span>
            </div>

            <div className="hairline md:border-l md:bg-surface/60 md:transition-colors md:duration-300 md:group-hover:bg-surface">
              <div className="flex items-start gap-3.5 px-5 pb-5 text-[15px] leading-snug text-bone sm:px-8 md:min-h-[72px] md:items-center md:px-5 md:py-5 md:text-[16px]">
                <span className="w-4 shrink-0 font-mono text-[13px] text-accent" aria-hidden="true">
                  →
                </span>
                <span className="font-medium">{row.ship}</span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
