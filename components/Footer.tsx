import { Logo } from "./Logo";
import { siteConfig } from "@/data/site-config";
import { ShieldCheck, Instagram, Facebook, Youtube } from "lucide-react";

/** Footer minimalista: mucho aire, jerarquía clara, cero saturación visual. */
export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink-950 pt-20">
      <div className="container-brand">
        <div className="grid grid-cols-1 gap-14 pb-16 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-6 text-sm leading-relaxed text-white/50">
              {siteConfig.footer.description}
            </p>
            <div className="mt-8 flex items-center gap-4">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Red social"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors duration-300 hover:border-bronze-400/50 hover:text-bronze-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {siteConfig.footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-widest2 text-bronze-300/80">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/55 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline" />

        <div className="flex flex-col items-center justify-between gap-6 py-8 sm:flex-row">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} {siteConfig.brand.name}. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {siteConfig.footer.legalLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-xs text-white/35 hover:text-white/60">
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-white/35">
            <ShieldCheck className="h-3.5 w-3.5 text-bronze-400" />
            Pago 100% seguro y cifrado
          </div>
        </div>
      </div>
    </footer>
  );
}
