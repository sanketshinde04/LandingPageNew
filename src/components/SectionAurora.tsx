export type AuroraVariant = "blue" | "cyan" | "ice" | "deep" | "steel";

/** A quiet, section-local light field. It stays behind the section copy. */
export default function SectionAurora({
  variant = "blue",
}: {
  variant?: AuroraVariant;
}) {
  return (
    <div
      className={`section-aurora section-aurora-${variant}`}
      aria-hidden="true"
    />
  );
}
