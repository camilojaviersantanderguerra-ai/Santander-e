"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site-config";
import { AnimatedSection } from "./AnimatedSection";
import { Button } from "./ui/Button";
import { Check } from "lucide-react";

/** Captura de correo. El submit real (Klaviyo/Mailchimp/ESP propio) se
 * conecta aquí sin tocar el resto de la UI — ver el TODO en handleSubmit. */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: conectar a proveedor de email marketing (Klaviyo / Mailchimp / ESP propio).
    setSubmitted(true);
  }

  return (
    <section className="relative bg-ink-900 py-24 md:py-32">
      <div className="container-brand">
        <AnimatedSection className="glass-panel mx-auto flex max-w-3xl flex-col items-center rounded-3xl px-8 py-16 text-center">
          <h2 className="font-display text-3xl text-white md:text-4xl">
            {siteConfig.newsletter.title}
          </h2>
          <p className="mt-4 max-w-md text-sm text-white/50">
            {siteConfig.newsletter.description}
          </p>

          {submitted ? (
            <div className="mt-8 flex items-center gap-2 text-bronze-200">
              <Check className="h-5 w-5" />
              Listo. Revisa tu correo pronto.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={siteConfig.newsletter.placeholder}
                className="w-full flex-1 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors duration-300 focus:border-bronze-400/50"
              />
              <Button type="submit">{siteConfig.newsletter.cta}</Button>
            </form>
          )}

          <p className="mt-5 text-[11px] text-white/30">{siteConfig.newsletter.disclaimer}</p>
        </AnimatedSection>
      </div>
    </section>
  );
}
