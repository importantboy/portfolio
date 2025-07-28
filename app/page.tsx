import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import NexusOrbSup from "@/components/ui/oribitCircle";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";
import { BackgroundLinesDemo } from "@/components/HeroContainer";
import AboutComp from "@/components/Aboutcomponent/AboutComp";
// import AboutPageComp from "@/components/Aboutcomponent/AboutPage";
export default function Home() {
  return (
    <main>
      <header className="bg_container min-h-screen bg-orange-300">
        <BackgroundLinesDemo />
      </header>
      <section className="min-h-screen bg-black dark">
        <AboutComp />
      </section>
    </main>
  );
}
