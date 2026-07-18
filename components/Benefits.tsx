import { benefits } from "@/data/benefits";
import { DynamicIcon } from "./ui/DynamicIcon";
import { AnimatedSection } from "./AnimatedSection";

/** Barra de confianza/garantías. Íconos minimalistas, cero saturación.
 * Diseñada para neutralizar objeciones (seguridad, envío, devoluciones)
 * sin sonar como un banner de venta agresiva. */
export function Benefits() {
  return (
    <section className="border-y border-white/[0.06] bg-ink-950 py-16">
      <div className="container-brand grid grid-cols-2 gap-10 md:grid-cols-4">
        {benefits.map((b, i) => (
          <AnimatedSection key={b.id} delay={i * 0.08} className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-bronze-400/25 bg-bronze-500/[0.06] text-bronze-300">
              <DynamicIcon name={b.icon} className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-medium text-white/85">{b.title}</h3>
            <p className="text-xs leading-relaxed text-white/40">{b.description}</p>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
