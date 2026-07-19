import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: number;
  /** Si es true, el ícono llena el 100% de su contenedor (ignora `size`). */
  fill?: boolean;
}

/**
 * Emblema del fénix en dorado/bronce, dibujado en SVG con fondo 100%
 * transparente (sin recuadro gris) — pensado para "flotar" sobre el fondo
 * negro grafito del sitio.
 *
 * Es una interpretación vectorial inspirada en el logo real del cliente
 * (public/logo-original.jpg), no un recorte de esa foto: para lograr
 * transparencia real a partir de la foto original se necesita una
 * herramienta de remoción de fondo (remove.bg, Photoshop, etc.) que no
 * está disponible en este entorno. Si en algún momento se consigue esa
 * versión ya recortada en PNG con transparencia, se puede reemplazar este
 * SVG por un <Image src="/logo-cutout.png" .../> sin tocar nada más.
 */
export function Logo({ className, showWordmark = true, size = 40, fill = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 120 120"
        style={fill ? undefined : { width: size, height: size }}
        className={fill ? "h-full w-full shrink-0" : "shrink-0"}
        aria-label={siteConfig.brand.logoAlt}
      >
        <defs>
          <linearGradient id="brushedGoldLogo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8a6a34" />
            <stop offset="22%" stopColor="#c99a4e" />
            <stop offset="45%" stopColor="#f0dcae" />
            <stop offset="60%" stopColor="#b3813f" />
            <stop offset="80%" stopColor="#dcb975" />
            <stop offset="100%" stopColor="#8a6a34" />
          </linearGradient>
          <linearGradient id="brushedBronzeLogo" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#6e4d26" />
            <stop offset="35%" stopColor="#a9743f" />
            <stop offset="55%" stopColor="#d9b06a" />
            <stop offset="75%" stopColor="#8a5c30" />
            <stop offset="100%" stopColor="#5c3d1e" />
          </linearGradient>
        </defs>

        {/* Anillo doble, sin ningún fondo detrás */}
        <circle cx="60" cy="60" r="55" fill="none" stroke="url(#brushedGoldLogo)" strokeWidth="1.4" opacity="0.6" />
        <circle cx="60" cy="60" r="49" fill="none" stroke="url(#brushedGoldLogo)" strokeWidth="1" opacity="0.4" />

        {/* Fénix: cuerpo central */}
        <path
          d="M56 50 C58 44 62 44 64 50 C65 62 64 78 60 88 C56 78 55 62 56 50 Z"
          fill="url(#brushedBronzeLogo)"
        />

        {/* Ala derecha */}
        <g>
          <path d="M60 52 C68 42 78 38 88 40 C80 50 72 56 64 58 Z" fill="url(#brushedBronzeLogo)" opacity="0.95" />
          <path d="M60 56 C70 48 82 46 94 50 C84 60 74 64 64 63 Z" fill="url(#brushedBronzeLogo)" />
          <path d="M60 60 C72 54 86 54 100 60 C88 70 76 72 64 68 Z" fill="url(#brushedBronzeLogo)" opacity="0.92" />
        </g>

        {/* Ala izquierda: espejo de la derecha */}
        <g transform="scale(-1,1) translate(-120,0)">
          <path d="M60 52 C68 42 78 38 88 40 C80 50 72 56 64 58 Z" fill="url(#brushedBronzeLogo)" opacity="0.95" />
          <path d="M60 56 C70 48 82 46 94 50 C84 60 74 64 64 63 Z" fill="url(#brushedBronzeLogo)" />
          <path d="M60 60 C72 54 86 54 100 60 C88 70 76 72 64 68 Z" fill="url(#brushedBronzeLogo)" opacity="0.92" />
        </g>

        {/* Cabeza + pico */}
        <ellipse cx="60" cy="45" rx="4.4" ry="5.2" fill="url(#brushedGoldLogo)" />
        <path d="M56.5 46 L60 52 L63.5 46 Z" fill="#0a0a0c" opacity="0.55" />
      </svg>

      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-[15px] tracking-widest2 text-white">SANTANDER</span>
          <span className="mt-1 text-[9px] tracking-widest3 text-bronze-300/80">E-SHOPPING</span>
        </div>
      )}
    </div>
  );
}
