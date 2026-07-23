import type { Metadata } from "next";
import { Mail, PackageSearch } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Rastrear pedido",
  description: "Cómo hacer seguimiento a tu pedido de Santander E-Shopping.",
  alternates: { canonical: "/rastreo" },
};

export default function RastreoPage() {
  return (
    <div className="bg-ink-950 pb-28 pt-32">
      <div className="container-brand max-w-2xl text-center">
        <AnimatedSection>
          <PackageSearch className="mx-auto h-8 w-8 text-bronze-400" />
          <span className="mt-6 block text-[11px] uppercase tracking-widest3 text-bronze-300/70">
            Ayuda
          </span>
          <h1 className="mt-4 font-display text-4xl text-white md:text-5xl">
            Rastrear pedido
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/55">
            Apenas confirmamos y despachamos tu pedido, te enviamos un correo
            con el número de seguimiento para que puedas ver exactamente
            dónde está tu paquete en tiempo real.
          </p>
        </AnimatedSection>

        <AnimatedSection
          delay={0.1}
          className="mt-12 rounded-2xl border border-white/[0.06] bg-ink-850/60 p-8 text-left"
        >
          <h2 className="font-display text-lg text-white">
            ¿No encuentras el correo de seguimiento?
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-white/55">
            <li>• Revisa tu carpeta de spam o promociones.</li>
            <li>
              • Si compraste hace menos de 5 días hábiles, tu pedido todavía
              puede estar en preparación.
            </li>
            <li>
              • Confirma que el correo con el que compraste sea el correcto.
            </li>
          </ul>
        </AnimatedSection>

        <AnimatedSection delay={0.15} className="mt-10">
          <p className="text-sm text-white/50">
            Si necesitas ayuda directa con tu pedido, escríbenos indicando tu
            número de orden.
          </p>
          <div className="mt-6">
            <Button href={`mailto:${siteConfig.contact.email}`} showArrow>
              <Mail className="h-4 w-4" />
              Escribir por correo
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
