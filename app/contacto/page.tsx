import type { Metadata } from "next";
import { Mail, Clock, HelpCircle } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbenos, te respondemos directamente y a la brevedad.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <div className="bg-ink-950 pb-28 pt-32">
      <div className="container-brand max-w-2xl text-center">
        <AnimatedSection>
          <span className="text-[11px] uppercase tracking-widest3 text-bronze-300/70">
            Compañía
          </span>
          <h1 className="mt-4 font-display text-4xl text-white md:text-5xl">
            Contacto
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/55">
            ¿Dudas sobre un producto, tu pedido o cualquier otra cosa? Escríbenos
            directamente — no hay call center ni respuestas automáticas, te
            responde una persona real.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mt-10">
          <Button href={`mailto:${siteConfig.contact.email}`} showArrow>
            <Mail className="h-4 w-4" />
            Escribir por correo
          </Button>
        </AnimatedSection>

        <AnimatedSection
          delay={0.15}
          className="mt-14 grid grid-cols-1 gap-6 text-left sm:grid-cols-2"
        >
          <div className="rounded-2xl border border-white/[0.06] bg-ink-850/60 p-6">
            <Clock className="h-5 w-5 text-bronze-400" />
            <h3 className="mt-4 font-display text-base text-white">
              Tiempo de respuesta
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              Respondemos todos los correos dentro de 24 a 48 horas hábiles.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-ink-850/60 p-6">
            <HelpCircle className="h-5 w-5 text-bronze-400" />
            <h3 className="mt-4 font-display text-base text-white">
              ¿Pregunta frecuente?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              Puede que ya esté resuelta en nuestra sección de{" "}
              <a
                href="/faq"
                className="text-bronze-300 underline underline-offset-4 hover:text-bronze-200"
              >
                Preguntas frecuentes
              </a>
              .
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
