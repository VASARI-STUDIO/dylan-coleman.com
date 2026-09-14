import type { WorkItem } from "./types";

export const bmsSalesSite: WorkItem = {
  slug: "3d-design",
  index: "W/04",
  title: "Building Management Sales Site",
  client: "Bar-Tech Automation",
  year: "2026",
  location: "Brisbane, Australia",
  summary:
    "A sales website for a Building Management System — re-pointed at mechanical distributors and integrators rather than end users. Custom 3D, technical voice, lead-generation engineered around relationship sales.",
  audience: "b2b-tech",
  cover: "/work/3d-design/01-cover.png",
  hero: "/work/3d-design/02.webp",
  blurb:
    "A re-architected sales site for a Building Management System. The existing site sold to end-buyers; this one sells to the distributors and mechanical integrators who actually move product. The job was to translate a deeply technical product into a story that earned a quote-request, not a checkout.",
  role: "Design · Build · 3D",
  scope: ["Web", "3D modelling", "Sales narrative"],
  status: "Launched 2026",
  duration: "6 weeks",
  collaborators: ["Bar-Tech engineering"],
  salesPoints: [
    {
      heading: "For B2B & industrial SaaS",
      body: "Most product sites in the trade try to sell direct. This one was built to earn a partnership conversation — quote requests, distributor introductions, integrator demos. The whole funnel is relationship-led.",
    },
    {
      heading: "3D as a sales asset, not a flourish",
      body: "Custom Blender models render the product in operational context — so a buyer can see the system on their site without a salesperson on a call.",
    },
    {
      heading: "Technical clarity at marketing pace",
      body: "Engineered to read fluently to a mechanical engineer and a procurement lead in the same scroll. No jargon for jargon&apos;s sake; no marketing fog over the spec.",
    },
    {
      heading: "Six weeks, one designer-developer",
      body: "Strategy, design, build, 3D, copy direction — handled end-to-end on a six-week timeline. No agency overhead, no handoffs to lose meaning across.",
    },
  ],
  gallery: [
    {
      src: "/work/3d-design/01-cover.png",
      alt: "BMS sales site — hero composition",
      ratio: "wide",
    },
    {
      src: "/work/3d-design/02.webp",
      alt: "BMS sales site — 3D product render",
      ratio: "landscape",
    },
    {
      src: "/work/3d-design/03.png",
      alt: "BMS sales site — interface in context",
      ratio: "landscape",
    },
  ],
};
