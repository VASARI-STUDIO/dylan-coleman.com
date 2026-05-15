import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { Capabilities } from "@/components/sections/Capabilities";
import { Shop } from "@/components/sections/Shop";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Bridge: Work + Services live inside a relative wrapper with an
          absolute gradient overlay. Gradient goes transparent at the top
          (so the bloom is still fully visible at the start of Work) →
          opaque at the bottom (the hero canvas is gone by the end of
          Services). Sections after this point are solidly opaque. */}
      <div className="hero-bridge relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-transparent to-background"
        />
        <Work />
        <Services />
      </div>

      <Capabilities />
      <Shop />
      <About />
      <Contact />
    </>
  );
}
