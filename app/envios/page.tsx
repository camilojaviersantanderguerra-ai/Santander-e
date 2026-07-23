import type { Metadata } from "next";
import { Truck, Clock, MapPin, PackageCheck } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Envíos y entregas",
  description:
    "Todo lo que necesitas saber sobre el envío de tu pedido en Santander E-Shopping: costos, tiempos y cobertura.",
  alternates: { canonical: "/envios" },
};

const items = [
  {
    icon: Truck,
    title: "Costo de envío",
    description:
      "Envío estándar a todo Chile: $4.000. El costo se calcula automáticamente en el checkout antes de pagar, sin sorpresas.",
  },
  {
    icon: Clock,
    title: "Tiempo de entrega",
    description:
      "Entre 3 y 5 días hábiles desde que se confirma el pago, dependiendo de tu comuna. Los pedidos se procesan de lunes a viernes.",
  },
  {
    icon: MapPin,
    title: "Cobertura",
    description:
      "Hacemos envíos a todo Chile continental. Si vives en una zona extrema o de difícil acceso, el tiempo de entrega puede extenderse algunos días adicionales.",
  },
  {
    icon: PackageCheck,
    title: "Seguimiento de tu pedido",
    description:
      "Apenas tu pedido sea despachado, vas a recibir un correo de confirmación con el número de seguimiento para rastrearlo en tiempo real.",
  },
];

export default function EnviosPage() {
  return (
    <div className="bg-ink-950 pb-28 pt-32">
      <div className="container-brand max-w-3xl">
        <AnimatedSection className="mb-14 text-center">
          <span className="text-[11px] uppercase tracking-widest3 text-bronze-300/70">
            Ayuda
          </span>
          <h1 className="mt-4 font-display text-4xl text-white md:text-5xl">
            Envíos y entregas
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/55">
            Despachamos tus pedidos con cuidado y a tiempo. Aquí está todo lo
            que necesitas saber antes y después de comprar.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {items.map((item, i) => (
            <AnimatedSection
              key={item.title}
              delay={i * 0.08}
              className="rounded-2xl border border-white/[0.06] bg-ink-850/60 p-6"
            >
              <item.icon className="h-5 w-5 text-bronze-400" />
              <h3 className="mt-4 font-display text-lg text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {item.description}
              </p>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-14 rounded-2xl border border-bronze-400/20 bg-bronze-400/[0.04] p-8 text-center">
          <p className="text-sm text-white/60">
            ¿Tu pedido no ha llegado o tienes una duda puntual? Escríbenos a{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-bronze-300 underline underline-offset-4 hover:text-bronze-200"
            >
              {siteConfig.contact.email}
            </a>{" "}
            y te respondemos a la brevedad.
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}
