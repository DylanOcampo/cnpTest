import { HeroParallax } from "@/components/ui/hero-parallax";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Section1 from "@/components/ui/Section1";
import Section2 from "@/components/ui/Section2";
import Section3 from "@/components/ui/Section3";
import Section4 from "@/components/ui/Section4";
import Section5 from "@/components/ui/Section5";
import Section6 from "@/components/ui/Section6";
import Section7 from "@/components/ui/Section7";
import Section8 from "@/components/ui/Section8";
import { Section9 } from "@/components/ui/Section9";

const products = [
  { title: "Moonbeam", link: "#", thumbnail: "https://aceternity.com/images/products/thumbnails/new/moonbeam.png" },
  { title: "Cursor", link: "#", thumbnail: "https://aceternity.com/images/products/thumbnails/new/cursor.png" },
  { title: "Rogue", link: "#", thumbnail: "https://aceternity.com/images/products/thumbnails/new/rogue.png" },
  { title: "Editorially", link: "#", thumbnail: "https://aceternity.com/images/products/thumbnails/new/editorially.png" },
  { title: "Editrix AI", link: "#", thumbnail: "https://aceternity.com/images/products/thumbnails/new/editrix.png" },
  { title: "Pixel Perfect", link: "#", thumbnail: "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png" },
  { title: "Algochurn", link: "#", thumbnail: "https://aceternity.com/images/products/thumbnails/new/algochurn.png" },
  { title: "Aceternity UI", link: "#", thumbnail: "https://aceternity.com/images/products/thumbnails/new/aceternityui.png" },
  { title: "Tailwind Master Kit", link: "#", thumbnail: "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png" },
  { title: "SmartBridge", link: "#", thumbnail: "https://aceternity.com/images/products/thumbnails/new/smartbridge.png" },
  { title: "Renderwork Studio", link: "#", thumbnail: "https://aceternity.com/images/products/thumbnails/new/renderwork.png" },
  { title: "Creme Digital", link: "#", thumbnail: "https://aceternity.com/images/products/thumbnails/new/cremedigital.png" },
  { title: "Golden Bells Academy", link: "#", thumbnail: "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png" },
  { title: "Invoker Labs", link: "#", thumbnail: "https://aceternity.com/images/products/thumbnails/new/invoker.png" },
  { title: "E Free Invoice", link: "#", thumbnail: "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png" },
];

const scrollContent = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team. Our collaborative editing feature allows multiple users to make changes simultaneously, ensuring seamless teamwork.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-cyan-500 to-emerald-500 text-white text-2xl font-bold">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-pink-500 to-indigo-500 text-white text-2xl font-bold">
        Real time changes
      </div>
    ),
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-orange-500 to-yellow-500 text-white text-2xl font-bold">
        Version control
      </div>
    ),
  },
  {
    title: "Running out of content",
    description:
      "No more running out of ideas. Our AI-powered tools help you generate content, brainstorm, and iterate faster than ever before.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-violet-500 to-fuchsia-500 text-white text-2xl font-bold">
        AI Content
      </div>
    ),
  },
];

export default function Home() {
  return (
    <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black">
      <HeroParallax products={products} />
      <div className="mx-auto w-full pb-6">
        <StickyScroll content={scrollContent} />
      </div>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8 />
    </div>
  );
}
