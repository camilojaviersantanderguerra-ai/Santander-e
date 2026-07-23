"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  showArrow?: boolean;
  type?: "button" | "submit";
}

/** Botón de marca con efecto premium: brillo sutil en hover, nunca "plástico". */
export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  showArrow = false,
  type = "button",
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-500 ease-premium overflow-hidden";

  const sizes = {
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary:
      "bg-gradient-to-br from-bronze-300 via-gold-400 to-bronze-500 text-ink-950 shadow-glow hover:shadow-[0_0_60px_-6px_rgba(212,172,112,0.55)] hover:scale-[1.02] active:scale-[0.98]",
    secondary:
      "border border-bronze-400/40 text-bronze-100 hover:border-bronze-300/80 hover:bg-bronze-400/5",
    ghost: "text-bronze-200 hover:text-bronze-50",
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1" />
      )}
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-premium group-hover:translate-x-full" />
      )}
    </>
  );

  const classes = cn(base, sizes[size], variants[variant], className);

  if (href) {
    // Antes no se reenviaba `onClick` a `Link` cuando se pasaba `href` —
    // cualquier botón que necesitara cerrar un modal/drawer Y navegar a la
    // vez (ej. "Ver la colección" dentro del carrito) simplemente no
    // ejecutaba ese onClick. Ahora sí se reenvía.
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
