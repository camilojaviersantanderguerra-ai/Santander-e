import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Leaf, Package, Recycle } from "lucide-react";

export const metadata: Metadata = {
  title: "Sostenibilidad",
  description:
    "Nuestro compromiso con hacer las cosas mejor: menos desperdicio, decisiones más conscientes.",
  alternates: { canonical: "/sostenibilidad" },
};

const commitments = [
  {
    icon: Package,
    title: "Menos empaque, menos desperdicio",
    description:
      "Buscamos activamente proveedores y empaques que reduzcan el material innecesario, sin sacrificar que tu producto llegue protegido.",
  },
  {
    icon: Recycle,
    title: "Productos hechos para durar",
    description:
      "Preferimos seleccionar productos duraderos por sobre artículos desechables — comprar menos veces algo bueno, en vez de reemplazar seguido algo débil.",
  },
  {
    icon: Leaf,
    title: "Un compromiso en construcción",
    description:
      "Somos una tienda joven y estamos siendo honestos: no tenemos todas las certificaciones de una gran empresa todavía. Pero cada decisión de proveedor y empaque la tomamos pensando en mejorar, no solo en vender más rápido.",
  },
];

export default function SostenibilidadPage() {
  return (
    <div className="bg-ink-950 pb-28 pt-32">
      <div className="container-brand max-w-3xl">
        <AnimatedSection className="mb-14 text-center">
          <span className="text-[11px] uppercase tracking-widest3 text-bronze-300/70">
            Compañía
          </span>
          <h1 className="mt-4 font-display text-4xl text-white md:text-5xl">
            Sostenibilidad
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/55">
            No pretendemos tener todas las respuestas todavía, pero sí
            queremos ser transparentes sobre hacia dónde vamos.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {commitments.map((c, i) => (
            <AnimatedSection
              key={c.title}
              delay={i * 0.08}
              className="rounded-2xl border border-white/[0.06] bg-ink-850/60 p-6"
            >
              <c.icon className="h-5 w-5 text-bronze-400" />
              <h3 className="mt-4 font-display text-base text-white">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {c.description}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
