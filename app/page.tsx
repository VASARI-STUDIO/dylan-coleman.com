import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Capabilities } from "@/components/sections/Capabilities";
import { Shop } from "@/components/sections/Shop";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Short fade strip — sits between Hero and Services and fades the
          canvas out before the first section lands. Replaces the older long
          Work+Services bridge. */}
      <div
        aria-hidden
        className="pointer-events-none relative h-[35vh] w-full bg-gradient-to-b from-transparent to-background"
        style={{ zIndex: 6 }}
      />

      <Services />
      <Work />
      <Capabilities />
      <Shop />
      <About />
      <Contact />
    </>
  );
}
