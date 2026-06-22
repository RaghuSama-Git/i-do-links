import { Heart, type LucideIcon } from "lucide-react";

interface WeddingLinkCardProps {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent?: "rose" | "sage" | "gold";
}

export function WeddingLinkCard({
  href,
  title,
  description,
  icon: Icon,
  accent = "rose",
}: WeddingLinkCardProps) {
  const accentClasses = {
    rose: "bg-rose/10 text-rose group-hover:bg-rose/20",
    sage: "bg-sage/15 text-sage-foreground group-hover:bg-sage/25",
    gold: "bg-gold/10 text-foreground/80 group-hover:bg-gold/20",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-card hover:shadow-md hover:ring-1 hover:ring-ring/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${accentClasses[accent]}`}
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg font-semibold leading-tight text-card-foreground">
          {title}
        </h3>
        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <Heart
        className="h-4 w-4 shrink-0 fill-rose/20 text-rose/40 transition-transform duration-300 group-hover:scale-110 group-hover:fill-rose/40 group-hover:text-rose/60"
        aria-hidden="true"
      />
    </a>
  );
}
