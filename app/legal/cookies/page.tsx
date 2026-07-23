import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Qué cookies utiliza Santander E-Shopping y cómo puedes gestionarlas.",
  alternates: { canonical: "/legal/cookies" },
};

const sections = [
  {
    title: "1. Qué son las cookies",
    body: "Las cookies son pequeños archivos que se guardan en tu navegador cuando visitas un sitio web. Nos ayudan a que la tienda funcione correctamente y a entender cómo se navega en ella.",
  },
  {
    title: "2. Qué cookies usamos",
    body: "Usamos cookies estrictamente necesarias (para que funcione el carrito de compra y el checkout), cookies de preferencia (para recordar tu sesión y configuración) y cookies analíticas (para entender qué páginas y productos visitan más nuestros clientes, de forma agregada y anónima).",
  },
  {
    title: "3. Cookies de terceros",
    body: "Nuestras pasarelas de pago (Mercado Pago y PayPal) pueden establecer sus propias cookies durante el proceso de pago, necesarias para completar tu transacción de forma segura.",
  },
  {
    title: "4. Cómo desactivar las cookies",
    body: "Puedes bloquear o eliminar las cookies desde la configuración de tu navegador en cualquier momento. Ten en cuenta que desactivar las cookies necesarias puede afectar el funcionamiento del carrito de compra y el checkout.",
  },
  {
    title: "5. Contacto",
    body: `Si tienes dudas sobre el uso de cookies en este sitio, escríbenos a ${siteConfig.contact.email}.`,
  },
];

export default function CookiesPage() {
  return (
    <div className="bg-ink-950 pb-28 pt-32">
      <div className="container-brand max-w-3xl">
        <AnimatedSection className="mb-14">
          <span className="text-[11px] uppercase tracking-widest3 text-bronze-300/70">
            Legal
          </span>
          <h1 className="mt-4 font-display text-4xl text-white md:text-5xl">
            Política de cookies
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
            Última actualización: julio de 2026.
          </p>
        </AnimatedSection>

        <div className="space-y-10">
          {sections.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.03}>
              <h2 className="font-display text-lg text-white">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{s.body}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
