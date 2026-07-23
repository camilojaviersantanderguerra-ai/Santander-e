import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Respuestas rápidas sobre envíos, pagos, devoluciones y garantía en Santander E-Shopping.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    q: "¿Cuánto demora en llegar mi pedido?",
    a: "Entre 3 y 5 días hábiles a la mayoría de las comunas de Chile, contados desde que se confirma el pago. Zonas extremas pueden tardar algunos días adicionales.",
  },
  {
    q: "¿Cuánto cuesta el envío?",
    a: "El envío estándar tiene un costo fijo de $4.000 a todo Chile. El valor se muestra en el checkout antes de confirmar tu compra.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Puedes pagar con Mercado Pago (tarjetas de crédito, débito y otros medios disponibles en tu cuenta) o PayPal. Todos los pagos se procesan de forma segura y encriptada.",
  },
  {
    q: "¿Puedo devolver un producto si no me gusta?",
    a: "Sí, tienes 30 días desde que recibes tu pedido para solicitar una devolución. Revisa todos los detalles en nuestra página de Devoluciones.",
  },
  {
    q: "¿Cómo sé que mi compra es segura?",
    a: "Todo el proceso de pago se realiza a través de proveedores certificados (Mercado Pago y PayPal), con cifrado de extremo a extremo. Nunca almacenamos los datos de tu tarjeta en nuestros servidores.",
  },
  {
    q: "¿Cómo puedo hacer seguimiento a mi pedido?",
    a: "Apenas se despacha tu pedido, te llega un correo con el número de seguimiento. También puedes escribirnos directamente si tienes dudas sobre el estado de tu compra.",
  },
  {
    q: "¿Los productos tienen garantía?",
    a: "Sí, cada producto de la colección incluye garantía de satisfacción. Si algo llega con un defecto de fábrica, lo solucionamos sin costo para ti.",
  },
  {
    q: "¿Cómo los contacto si tengo otra duda?",
    a: `Escríbenos a ${siteConfig.contact.email} y te respondemos a la brevedad.`,
  },
];

export default function FaqPage() {
  return (
    <div className="bg-ink-950 pb-28 pt-32">
      <div className="container-brand max-w-3xl">
        <AnimatedSection className="mb-14 text-center">
          <span className="text-[11px] uppercase tracking-widest3 text-bronze-300/70">
            Ayuda
          </span>
          <h1 className="mt-4 font-display text-4xl text-white md:text-5xl">
            Preguntas frecuentes
          </h1>
        </AnimatedSection>

        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {faqs.map((item, i) => (
            <AnimatedSection key={item.q} delay={i * 0.04} className="py-6">
              <h3 className="font-display text-lg text-white">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {item.a}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
