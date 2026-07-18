import type { Benefit } from "@/types";

// El nombre de "icon" corresponde 1:1 a un componente de lucide-react.
// Ver components/ui/DynamicIcon.tsx para la resolución dinámica.
export const benefits: Benefit[] = [
  {
    id: "b-01",
    icon: "ShieldCheck",
    title: "Pago 100% seguro",
    description: "Cifrado de extremo a extremo en cada transacción, verificado y auditado.",
  },
  {
    id: "b-02",
    icon: "Truck",
    title: "Envío express",
    description: "Entrega promedio en 48 horas con rastreo en tiempo real.",
  },
  {
    id: "b-03",
    icon: "RotateCcw",
    title: "30 días de devolución",
    description: "Si no es perfecto para ti, lo resolvemos sin preguntas incómodas.",
  },
  {
    id: "b-04",
    icon: "BadgeCheck",
    title: "Garantía extendida",
    description: "Cada producto de la colección incluye garantía de satisfacción.",
  },
];
