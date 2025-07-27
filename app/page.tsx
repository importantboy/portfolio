import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import NexusOrbSup from "@/components/ui/oribitCircle";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";
import { BackgroundLinesDemo } from "@/components/HeroContainer";
export default function Home() {
  return (
    <header className="flex flex-col">
      <div className="bg_container min-h-screen bg-orange-600">
            <BackgroundLinesDemo />
      </div>
    </header>
  );
}
