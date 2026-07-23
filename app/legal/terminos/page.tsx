import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Términos de servicio",
  description:
    "Condiciones de uso y compra en Santander E-Shopping: precios, pagos, envíos, devoluciones y responsabilidades.",
  alternates: { canonical: "/legal/terminos" },
};

const sections = [
  {
    title: "1. Quiénes somos",
    body: `${siteConfig.brand.name} es una tienda en línea que opera en Chile, dedicada a la venta al público de productos de tecnología, hogar, fitness, viajes, accesorios y belleza. Al comprar en este sitio aceptas las condiciones descritas a continuación.`,
  },
  {
    title: "2. Aceptación de los términos",
    body: "Al navegar, crear un pedido o usar cualquier función de este sitio, aceptas estos Términos de Servicio junto con nuestra Política de Privacidad y Política de Cookies. Si no estás de acuerdo con alguna condición, te pedimos no continuar con tu compra.",
  },
  {
    title: "3. Productos y precios",
    body: "Todos los precios se muestran en pesos chilenos (CLP) e incluyen los impuestos aplicables, salvo que se indique lo contrario. Nos reservamos el derecho de modificar precios, descripciones o disponibilidad de los productos sin previo aviso, sin que esto afecte pedidos ya confirmados y pagados.",
  },
  {
    title: "4. Proceso de compra y pago",
    body: "Las compras se procesan a través de pasarelas de pago certificadas (Mercado Pago y PayPal). No almacenamos datos de tarjetas en nuestros servidores; esa información es gestionada exclusivamente por el proveedor de pago correspondiente. Un pedido se considera confirmado una vez que recibimos la confirmación de pago exitoso.",
  },
  {
    title: "5. Envíos y plazos",
    body: "Los plazos y costos de envío vigentes están detallados en nuestra página de Envíos y entregas. Los tiempos son estimados y pueden variar por factores fuera de nuestro control, como condiciones logísticas o zonas de entrega extremas.",
  },
  {
    title: "6. Devoluciones y garantías",
    body: "Dispones de 30 días desde la recepción de tu pedido para solicitar una devolución, conforme a lo descrito en nuestra página de Devoluciones. Cada producto cuenta además con garantía de satisfacción frente a defectos de fábrica.",
  },
  {
    title: "7. Propiedad intelectual",
    body: `Todo el contenido de este sitio (textos, imágenes, logotipos y diseño) es propiedad de ${siteConfig.brand.name} o de sus proveedores, y no puede ser reproducido ni utilizado sin autorización previa.`,
  },
  {
    title: "8. Limitación de responsabilidad",
    body: "Hacemos todo lo posible por mantener la información del sitio actualizada y precisa, pero no garantizamos que esté libre de errores en todo momento. No seremos responsables por daños indirectos derivados del uso del sitio, más allá de lo que establece la legislación chilena vigente en materia de protección al consumidor.",
  },
  {
    title: "9. Modificaciones",
    body: "Podemos actualizar estos Términos de Servicio en cualquier momento. Los cambios rigen desde su publicación en esta misma página.",
  },
  {
    title: "10. Ley aplicable y jurisdicción",
    body: "Estos Términos se rigen por las leyes de la República de Chile, incluyendo la Ley N° 19.496 sobre Protección de los Derechos de los Consumidores. Cualquier controversia será sometida a los tribunales competentes de Chile.",
  },
  {
    title: "11. Contacto",
    body: `Si tienes dudas sobre estos Términos, escríbenos a ${siteConfig.contact.email}.`,
  },
];

export default function TerminosPage() {
  return (
    <div className="bg-ink-950 pb-28 pt-32">
      <div className="container-brand max-w-3xl">
        <AnimatedSection className="mb-14">
          <span className="text-[11px] uppercase tracking-widest3 text-bronze-300/70">
            Legal
          </span>
          <h1 className="mt-4 font-display text-4xl text-white md:text-5xl">
            Términos de servicio
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
