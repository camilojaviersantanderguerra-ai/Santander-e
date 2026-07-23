"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/data/site-config";
import { Button } from "./ui/Button";
import { Logo } from "./Logo";
import { ChevronDown } from "lucide-react";

/** Hero de impacto: imagen de fondo con parallax muy suave, headline
 * gigante, y el emblema de marca "respirando" detrás del texto. Este es
 * el momento que debe generar "esta empresa parece enorme". */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={ref} className="relative flex h-[100svh] min-h-[720px] w-full items-center justify-center overflow-hidden bg-ink-950">
      {/* Fondo con parallax */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-[1.15]">
        <Image
          src={siteConfig.hero.backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
      </motion.div>
      <div className="absolute inset-0 bg-graphite-radial" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-ink-950/60" />

      {/* Emblema de marca, enorme y tenue, respirando de fondo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[55vmin] w-[55vmin] -translate-x-1/2 -translate-y-1/2 animate-floatSlow opacity-[0.12]">
        <Logo showWordmark={false} fill className="h-full w-full" />
      </div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="container-brand relative z-10 flex flex-col items-center text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 text-[11px] uppercase tracking-widest3 text-bronze-300/80"
        >
          {siteConfig.hero.eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl font-display text-[13vw] leading-[0.98] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          {siteConfig.hero.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-xl text-balance text-base text-white/55 md:text-lg"
        >
          {siteConfig.hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button href="/tienda" size="lg" showArrow>
            {siteConfig.hero.ctaPrimary}
          </Button>
          {/* Antes apuntaba a "#historia", un ancla que no existe en ninguna
              parte de la página — el botón no hacía nada. Ahora va a la
              página real "Nuestra historia" (/nosotros). */}
          <Button href="/nosotros" size="lg" variant="secondary">
            {siteConfig.hero.ctaSecondary}
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/40"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
