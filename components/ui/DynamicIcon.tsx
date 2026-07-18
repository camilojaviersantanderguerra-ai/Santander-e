"use client";

import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

/** Resuelve un ícono de lucide-react a partir de su nombre (string),
 * para que los datos en /data puedan referenciar íconos sin importar
 * código de React directamente. */
export function DynamicIcon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name];
  if (!IconComponent) return null;
  return <IconComponent {...props} />;
}
