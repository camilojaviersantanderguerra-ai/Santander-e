import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Devoluciones",
  description:
    "Política de devoluciones de Santander E-Shopping: 30 días para cambiar de opinión, sin preguntas incómodas.",
  alternates: { canonical: "/devoluciones" },
};

const steps = [
  {
    step: "1",
    title: "Escríbenos",
    description: `Contáctanos a ${siteConfig.contact.email} dentro de los 30 días desde que recibiste tu pedido, indicando tu número de orden y el motivo.`,
  },
  {
    step: "2",
    title: "Confirmamos la devolución",
    description:
      "Te confirmamos por correo si tu producto cumple las condiciones y te indicamos cómo y adónde enviarlo.",
  },
  {
    step: "3",
    title: "Recibimos el producto",
    description:
      "Debe volver en su empaque original, sin uso y con todos sus accesorios. El costo de envío de vuelta corre por cuenta del cliente, salvo que el producto haya llegado con un defecto.",
  },
  {
    step: "4",
    title: "Reembolso",
    description:
      "Una vez que verificamos el estado del producto, procesamos el reembolso al mismo método de pago original en un plazo de hasta 5 días hábiles.",
  },
];

export default function DevolucionesPage() {
  return (
    <div className="bg-ink-950 pb-28 pt-32">
      <div className="container-brand max-w-3xl">
        <AnimatedSection className="mb-14 text-center">
          <span className="text-[11px] uppercase tracking-widest3 text-bronze-300/70">
            Ayuda
          </span>
          <h1 className="mt-4 font-display text-4xl text-white md:text-5xl">
            Devoluciones
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/55">
            Tienes 30 días desde que recibes tu pedido para decidir si es para
            ti. Si no es perfecto, lo resolvemos sin preguntas incómodas.
          </p>
        </AnimatedSection>

        <div className="space-y-6">
          {steps.map((s) => (
            <AnimatedSection
              key={s.step}
              className="flex gap-5 rounded-2xl border border-white/[0.06] bg-ink-850/60 p-6"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bronze-400/40 font-display text-sm text-bronze-300">
                {s.step}
              </span>
              <div>
                <h3 className="font-display text-lg text-white">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                  {s.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-14 text-center">
          <p className="text-sm text-white/50">
            ¿Tu producto llegó con algún defecto o problema? Contáctanos y lo
            resolvemos sin costo para ti.
          </p>
          <div className="mt-6">
            <Button href={`mailto:${siteConfig.contact.email}`} showArrow>
              Iniciar una devolución
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
