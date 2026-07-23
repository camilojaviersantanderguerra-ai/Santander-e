import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Heart, Users, Wallet } from "lucide-react";

export const metadata: Metadata = {
  title: "Nuestra historia",
  description:
    "Por qué existe Santander E-Shopping: variedad real, precios justos y atención de persona a persona.",
  alternates: { canonical: "/nosotros" },
};

const pillars = [
  {
    icon: Wallet,
    title: "Precios justos",
    description:
      "El mismo tipo de producto, la misma calidad — sin el sobreprecio que cobran las tiendas grandes solo por ser grandes.",
  },
  {
    icon: Users,
    title: "Atención de persona a persona",
    description:
      "Aquí no hablas con un call center. Hablas con alguien que realmente quiere que tu pedido llegue bien y que quede resuelto si algo falla.",
  },
  {
    icon: Heart,
    title: "Lo que la gente realmente busca",
    description:
      "Cada producto de la colección se elige pensando en lo que la gente pide de verdad, no en lo que sobra por bodega.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="bg-ink-950 pb-28 pt-32">
      <div className="container-brand max-w-3xl">
        <AnimatedSection className="mb-14 text-center">
          <span className="text-[11px] uppercase tracking-widest3 text-bronze-300/70">
            Compañía
          </span>
          <h1 className="mt-4 font-display text-4xl text-white md:text-5xl">
            Nuestra historia
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.05} className="space-y-6 text-base leading-relaxed text-white/60">
          <p>
            Santander E-Shopping nació de una necesidad simple: la gente
            quiere variedad de productos buenos, sin tener que pagar el doble
            solo por comprarlos en una tienda reconocida.
          </p>
          <p>
            Vimos que muchas veces el mismo producto, con la misma calidad,
            se vende a precios completamente distintos según dónde lo
            compres — y que detrás de esa diferencia casi nunca hay una razón
            real. Decidimos armar una tienda que ofreciera eso mismo que
            buscan las tiendas grandes, pero con precios justos y con algo
            que ellas casi nunca logran: atención de persona a persona.
          </p>
          <p>
            Cada consulta, cada pedido y cada duda pasa por alguien que de
            verdad está pendiente de que todo llegue bien — no por un sistema
            automatizado ni un formulario que nadie lee. Si algo no sale como
            esperabas, lo conversamos y lo resolvemos como corresponde.
          </p>
          <p>
            Así seguimos creciendo: escuchando lo que la gente realmente pide
            y trayéndolo, sin vueltas ni sobreprecios.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <AnimatedSection
              key={p.title}
              delay={0.1 + i * 0.08}
              className="rounded-2xl border border-white/[0.06] bg-ink-850/60 p-6"
            >
              <p.icon className="h-5 w-5 text-bronze-400" />
              <h3 className="mt-4 font-display text-base text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {p.description}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
