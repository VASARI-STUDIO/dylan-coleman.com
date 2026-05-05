import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { Marquee } from "@/components/sections/Marquee";
import { Shop } from "@/components/sections/Shop";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

const marqueeItems = [
  "Helping brands flourish",
  "Brand websites",
  "Landing pages",
  "Premium templates",
  "For founders & studios",
  "Booking late 2026",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <Services />
      <Marquee items={marqueeItems} />
      <Shop />
      <About />
      <Contact />
    </>
  );
}
