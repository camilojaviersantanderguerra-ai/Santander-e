import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo recopilamos, usamos y protegemos tus datos personales en Santander E-Shopping.",
  alternates: { canonical: "/legal/privacidad" },
};

const sections = [
  {
    title: "1. Qué datos recopilamos",
    body: "Recopilamos los datos que nos entregas al comprar o contactarnos: nombre, correo electrónico, dirección de envío, teléfono y datos del pedido. No almacenamos números de tarjeta ni datos financieros — esos son gestionados directamente por nuestros proveedores de pago.",
  },
  {
    title: "2. Para qué usamos tus datos",
    body: "Usamos tu información para procesar y despachar tu pedido, responder tus consultas, enviarte actualizaciones sobre tu compra y, si lo autorizas, enviarte novedades y ofertas por correo. Nunca vendemos tus datos a terceros.",
  },
  {
    title: "3. Con quién compartimos tu información",
    body: "Compartimos únicamente los datos necesarios con los proveedores que hacen posible tu compra: la plataforma de comercio electrónico que aloja el catálogo y checkout, las pasarelas de pago (Mercado Pago y PayPal) para procesar tu transacción, y nuestro proveedor logístico para gestionar el despacho de tu pedido.",
  },
  {
    title: "4. Cómo protegemos tus datos",
    body: "Toda la información sensible viaja cifrada de extremo a extremo. El acceso a los datos de nuestros clientes está restringido a lo estrictamente necesario para operar la tienda.",
  },
  {
    title: "5. Tus derechos",
    body: "De acuerdo con la Ley N° 19.628 sobre Protección de la Vida Privada, puedes solicitar en cualquier momento el acceso, rectificación, cancelación o eliminación de tus datos personales, escribiéndonos directamente.",
  },
  {
    title: "6. Cookies",
    body: "Este sitio utiliza cookies para su correcto funcionamiento y para entender cómo se navega en la tienda. Puedes revisar el detalle en nuestra Política de Cookies.",
  },
  {
    title: "7. Cambios a esta política",
    body: "Podemos actualizar esta Política de Privacidad ocasionalmente. Cualquier cambio relevante será publicado en esta misma página.",
  },
  {
    title: "8. Contacto",
    body: `Para cualquier consulta sobre el uso de tus datos, escríbenos a ${siteConfig.contact.email}.`,
  },
];

export default function PrivacidadPage() {
  return (
    <div className="bg-ink-950 pb-28 pt-32">
      <div className="container-brand max-w-3xl">
        <AnimatedSection className="mb-14">
          <span className="text-[11px] uppercase tracking-widest3 text-bronze-300/70">
            Legal
          </span>
          <h1 className="mt-4 font-display text-4xl text-white md:text-5xl">
            Política de privacidad
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
