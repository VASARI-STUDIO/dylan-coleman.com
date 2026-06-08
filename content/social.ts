import { Instagram, Linkedin, type LucideIcon } from "lucide-react";

// Single source of truth for off-site links shared across the nav, hero and
// footer — so a handle or profile URL only ever changes in one place.

export const BUY_ME_A_COFFEE = "https://buymeacoffee.com/dylan.coleman";

export type SocialLink = {
  label: string;
  href: string;
  Icon: LucideIcon;
};

export const SOCIALS: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/dc.wrld/",
    Icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dylan-coleman-7667282b1/",
    Icon: Linkedin,
  },
];
