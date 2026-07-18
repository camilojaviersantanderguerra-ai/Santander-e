import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  tone?: "bronze" | "gold" | "outline";
  className?: string;
}

/** Badge minimalista para escasez/urgencia/estado, sin gritar. */
export function Badge({ children, tone = "outline", className }: BadgeProps) {
  const tones = {
    bronze: "bg-bronze-500/15 text-bronze-200 border-bronze-400/30",
    gold: "bg-gold-500/15 text-gold-300 border-gold-400/30",
    outline: "bg-white/[0.03] text-white/70 border-white/15",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-widest2 backdrop-blur-sm",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
