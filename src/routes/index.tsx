import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarHeart,
  Clapperboard,
  Gift,
  MapPin,
  MessageCircleHeart,
  ScrollText,
} from "lucide-react";
import { useEffect, useState } from "react";

import { WeddingLinkCard } from "@/components/wedding-link-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Priya & Rahul — Our Wedding" },
      { name: "description", content: "All the important links for Priya and Rahul's wedding celebration. Pre-wedding film, venue, e-invite, RSVP and more." },
      { property: "og:title", content: "Priya & Rahul — Our Wedding" },
      { property: "og:description", content: "All the important links for Priya and Rahul's wedding celebration." },
      { property: "og:image", content: "/images/wedding-hero.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeddingLinksPage,
});

// Update these with the couple's details and real links.
const COUPLE = {
  partnerOne: "Priya",
  partnerTwo: "Rahul",
  date: new Date("2026-12-18T16:00:00"),
  location: "The Grand Garden, Bengaluru",
};

const WEDDING_LINKS = [
  {
    href: "#pre-wedding-video",
    title: "Pre-Wedding Shoot",
    description: "Watch our pre-wedding film and behind-the-scenes moments.",
    icon: Clapperboard,
    accent: "rose" as const,
  },
  {
    href: "#wedding-location",
    title: "Wedding Venue",
    description: "Directions, parking details and venue map.",
    icon: MapPin,
    accent: "sage" as const,
  },
  {
    href: "#wedding-card",
    title: "E-Invite / Wedding Card",
    description: "View and download our digital wedding invitation.",
    icon: ScrollText,
    accent: "gold" as const,
  },
  {
    href: "#rsvp",
    title: "RSVP",
    description: "Let us know if you can make it by 1 December 2026.",
    icon: CalendarHeart,
    accent: "rose" as const,
  },
  {
    href: "#gifts",
    title: "Gift Registry",
    description: "Your presence is enough, but if you wish to give, see our registry.",
    icon: Gift,
    accent: "sage" as const,
  },
  {
    href: "#contact",
    title: "Questions?",
    description: "Reach out on WhatsApp for any last-minute queries.",
    icon: MessageCircleHeart,
    accent: "gold" as const,
  },
];

function formatCountdown(ms: number) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
}

function Countdown({ target }: { target: Date }) {
  const [remaining, setRemaining] = useState(target.getTime() - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(target.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [target]);

  const { days, hours, minutes, seconds } = formatCountdown(Math.max(0, remaining));

  const units = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-4">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center rounded-xl border border-border bg-card/60 p-3 text-center backdrop-blur-sm"
        >
          <span className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function WeddingLinksPage() {
  const formattedDate = COUPLE.date.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="grain relative min-h-screen overflow-x-hidden bg-background px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-xl">
        {/* Hero image */}
        <div className="relative mb-8 aspect-[3/2] w-full overflow-hidden rounded-3xl shadow-lg">
          <img
            src="/images/wedding-hero.jpg"
            alt="Priya and Rahul wedding invitation hero"
            className="h-full w-full object-cover"
            width={1200}
            height={800}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        </div>

        {/* Names & date */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Save the Date
          </p>
          <h1 className="font-display text-5xl font-semibold leading-none text-foreground sm:text-6xl">
            {COUPLE.partnerOne}
            <span className="mx-3 inline-block align-middle text-rose">&</span>
            {COUPLE.partnerTwo}
          </h1>
          <p className="mt-4 font-display text-lg italic text-muted-foreground">
            {formattedDate} · {COUPLE.location}
          </p>
        </div>

        {/* Countdown */}
        <div className="mb-10">
          <Countdown target={COUPLE.date} />
        </div>

        {/* Link cards */}
        <section aria-label="Wedding links">
          <div className="flex flex-col gap-4">
            {WEDDING_LINKS.map((link) => (
              <WeddingLinkCard
                key={link.title}
                href={link.href}
                title={link.title}
                description={link.description}
                icon={link.icon}
                accent={link.accent}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="font-display text-base italic text-muted-foreground">
            Can't wait to celebrate with you!
          </p>
          <p className="mt-2 text-xs tracking-widest text-muted-foreground/70">
            MADE WITH LOVE
          </p>
        </footer>
      </div>
    </main>
  );
}
