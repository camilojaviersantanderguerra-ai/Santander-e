import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Prensa",
  description: "Información de contacto para consultas de prensa y medios.",
  alternates: { canonical: "/prensa" },
};

export default function PrensaPage() {
  return (
    <div className="bg-ink-950 pb-28 pt-32">
      <div className="container-brand max-w-2xl text-center">
        <AnimatedSection>
          <span className="text-[11px] uppercase tracking-widest3 text-bronze-300/70">
            Compañía
          </span>
          <h1 className="mt-4 font-display text-4xl text-white md:text-5xl">
            Prensa
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/55">
            {siteConfig.brand.name} es una tienda online chilena que nació
            para ofrecer variedad de productos a precios justos, con atención
            cercana y de persona a persona. Si eres periodista o medio de
            comunicación y quieres más información, material gráfico o
            coordinar una entrevista, escríbenos directamente.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mt-10">
          <Button href={`mailto:${siteConfig.contact.email}`} showArrow>
            <Mail className="h-4 w-4" />
            Contactar para prensa
          </Button>
        </AnimatedSection>
      </div>
    </div>
  );
}
