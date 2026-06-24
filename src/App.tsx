import { MapPin, MessageCircleHeart, ScrollText, X } from "lucide-react";
import { useEffect, useState } from "react";

import { WeddingLinkCard } from "@/components/wedding-link-card";
import invitationAsset from "@/assets/wedding-card.png";

const COUPLE = {
  partnerOne: "Srija Reddy",
  partnerTwo: "Sai Kumar Reddy",
  date: new Date("2026-07-04T10:36:00"),
  location: "@ LPR Convention Hall, Mulugu",
};

const WEDDING_LINKS = [
  {
    href: "https://maps.app.goo.gl/K4N5SKxssjrreb9g9",
    title: "Wedding Venue",
    description: "Venue location, directions and parking details.",
    icon: MapPin,
    accent: "sage" as const,
  },
  {
    href: "https://maps.app.goo.gl/XH8wUQhd51Y4nTca9",
    title: "Reception Venue",
    description: "Reception location and directions.",
    icon: MapPin,
    accent: "sage" as const,
  },
  {
    href: invitationAsset,
    title: "E-Invite / Wedding Card",
    description: "View and download our digital wedding invitation.",
    icon: ScrollText,
    accent: "gold" as const,
  },
  {
    href: "https://www.instagram.com/srija__10/",
    title: "Questions?",
    description: "Reach out on Instagram for any last-minute queries.",
    icon: MessageCircleHeart,
    accent: "rose" as const,
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
  const [remaining, setRemaining] = useState(() => target.getTime() - Date.now());

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
          className="flex flex-col items-center rounded-xl border border-border bg-card p-3 text-center backdrop-blur-sm"
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

function formatWeddingDate(date: Date) {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${weekdays[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function InvitationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation"
    >
      <div
        className="relative max-h-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close invitation"
        >
          <X className="h-4 w-4" />
        </button>
        <img
          src="/images/invitation.png"
          alt="Digital wedding invitation for Srija Reddy and Sai Kumar Reddy"
          className="max-h-[80vh] w-auto object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default function App() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const formattedDate = formatWeddingDate(COUPLE.date);

  return (
    <main className="grain relative min-h-screen overflow-x-hidden bg-background px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-xl">
        <div className="relative mb-8 aspect-[3/2] w-full overflow-hidden rounded-3xl shadow-lg">
          <img
            src="/images/wedding-hero.jpg"
            alt="Srija and Sai Kumar wedding invitation hero"
            className="h-full w-full object-cover"
            width={1200}
            height={800}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>

        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Save the Date
          </p>
          <h1 className="font-display text-5xl font-semibold leading-none text-foreground sm:text-6xl">
            {COUPLE.partnerOne}
            <br/>
            <span className="mx-3 inline-block align-middle text-rose">&</span>
            <br/>
            {COUPLE.partnerTwo}
          </h1>
          <p className="mt-4 font-display text-lg italic text-muted-foreground">
            {formattedDate} · {COUPLE.location}
          </p>
        </div>

        <div className="mb-10">
          <Countdown target={COUPLE.date} />
        </div>

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
                onClick={
                  link.title === "E-Invite / Wedding Card"
                    ? () => setInviteOpen(true)
                    : undefined
                }
              />
            ))}
          </div>
        </section>

        <footer className="mt-12 text-center">
          <p className="font-display text-base italic text-muted-foreground">
            Can't wait to celebrate with you!
          </p>
          <p className="mt-2 text-xs tracking-widest text-muted-foreground/70">MADE WITH LOVE</p>
        </footer>
      </div>

      <InvitationModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </main>
  );
}
