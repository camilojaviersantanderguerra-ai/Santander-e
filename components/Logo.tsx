import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

/**
 * Recreación vectorial del emblema (fénix/águila en bronce cepillado + anillo
 * doble + wordmark). Si el archivo real del logo está disponible, colócalo en
 * /public/logo.svg (o .png) y actualiza `siteConfig.brand.logoPath`: el resto
 * de la marca (Header, Footer, favicon, OG image) lo tomará automáticamente
 * de esa única fuente de verdad.
 */
export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 120 120"
        className="h-9 w-9 shrink-0"
        aria-label={siteConfig.brand.logoAlt}
      >
        <defs>
          <linearGradient id="brushedGoldLogo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8a6a34" />
            <stop offset="25%" stopColor="#e3c690" />
            <stop offset="50%" stopColor="#f4e6bf" />
            <stop offset="75%" stopColor="#b3813f" />
            <stop offset="100%" stopColor="#8a6a34" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="56" fill="none" stroke="url(#brushedGoldLogo)" strokeWidth="1.5" opacity="0.55" />
        <circle cx="60" cy="60" r="49" fill="none" stroke="url(#brushedGoldLogo)" strokeWidth="1" opacity="0.35" />
        <path
          d="M60 34c-4 10-14 16-26 15 7 9 8 21 3 30 9-3 20-1 27 8 7-9 18-11 27-8-5-9-4-21 3-30-12 1-22-5-26-15-2.6-1-5.4-1-8 0z"
          fill="url(#brushedGoldLogo)"
        />
        <circle cx="60" cy="46" r="3.4" fill="#0a0a0c" />
      </svg>
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-[15px] tracking-widest2 text-white">
            SANTANDER
          </span>
          <span className="mt-1 text-[9px] tracking-widest3 text-bronze-300/80">
            E-SHOPPING
          </span>
        </div>
      )}
    </div>
  );
}
