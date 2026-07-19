"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingBag } from "lucide-react";
import { Logo } from "./Logo";

const navLinks = [
  { label: "Colección", href: "/tienda" },
  { label: "Categorías", href: "#categorias" },
  { label: "Santander Privé", href: "#premium" },
  { label: "Historia", href: "#historia" },
];

interface HeaderProps {
  /** Categorías dinámicas del catálogo real, calculadas server-side en
   * app/layout.tsx (este componente es "use client", no puede hacer fetch
   * async por su cuenta) y pasadas aquí como prop. */
  categories?: string[];
}

/** Header flotante con fondo que se solidifica al hacer scroll. Mobile-first:
 * el menú completo colapsa a un panel de pantalla completa en móvil. */
export function Header({ categories = [] }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium ${
        scrolled ? "bg-ink-950/80 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"
      }`}
    >
      <div className="container-brand flex h-20 items-center justify-between">
        <a href="/" aria-label="Santander E-Shopping — inicio">
          <Logo />
        </a>

        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] uppercase tracking-widest2 text-white/70 transition-colors duration-300 hover:text-bronze-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            aria-label="Buscar"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors duration-300 hover:bg-white/5 hover:text-bronze-200 sm:flex"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <button
            aria-label="Carrito"
            className="relative hidden h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors duration-300 hover:bg-white/5 hover:text-bronze-200 sm:flex"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
          </button>
          <button
            aria-label="Abrir menú"
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-ink-950/98 backdrop-blur-2xl lg:hidden"
          >
            <div className="container-brand flex h-20 items-center justify-between">
              <Logo />
              <button
                aria-label="Cerrar menú"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white/80"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="container-brand flex flex-1 flex-col justify-center gap-8 pb-24">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-4xl text-white/90"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-6 flex flex-wrap gap-3">
                {categories.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/10 px-4 py-1.5 text-xs uppercase tracking-widest2 text-white/50"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
