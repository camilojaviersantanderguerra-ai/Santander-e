import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: number;
}

/**
 * Logo real del cliente (emblema del fénix en bronce cepillado), servido
 * desde /public/logo-original.jpg. Se enmarca en un círculo (como una
 * medalla/moneda) porque la pieza original ya trae su propio fondo oscuro
 * integrado en el diseño — el marco circular hace que ese fondo se lea
 * como parte intencional del sello, no como un recorte.
 *
 * El wordmark de texto ("SANTANDER E-SHOPPING") se mantiene como HTML real
 * al lado del emblema para que siga siendo nítido en cualquier tamaño y
 * accesible para buscadores/lectores de pantalla.
 */
export function Logo({ className, showWordmark = true, size = 40 }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className="relative shrink-0 overflow-hidden rounded-full ring-1 ring-bronze-400/30"
        style={{ width: size, height: size }}
      >
        <Image
          src={siteConfig.brand.logoPath}
          alt={siteConfig.brand.logoAlt}
          fill
          sizes={`${size}px`}
          className="object-cover scale-[1.35]"
          priority
        />
      </span>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-[15px] tracking-widest2 text-white">SANTANDER</span>
          <span className="mt-1 text-[9px] tracking-widest3 text-bronze-300/80">E-SHOPPING</span>
        </div>
      )}
    </div>
  );
}
