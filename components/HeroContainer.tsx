import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import NexusOrbSup from "./ui/oribitCircle";
import { TextGenerateEffectDemo } from "./Texttyping";
import { FlipWordsDemo } from "./Textflipcomp";
import { HoverBorderGradient as CalltoActionButton } from "./ui/hover-border-gradient";
import { FloatingNav } from "./ui/floating-navbar";

export function BackgroundLinesDemo() {
  return (
    <BackgroundLines className="flex md:flex-row items-center text-center min-h-screen justify-center w-full flex-col px-4 dark bg-black">
      <div className="flex flex-col justify-center items-center w-1/2 translate-y-20 md:translate-y-0 ">
        <TextGenerateEffectDemo />
        <FlipWordsDemo />
        <div className="flex gap-3 my-3 cta-btn-container min-w-screen md:w-auto items-center justify-center">
          <CalltoActionButton className="text-md">
            Show Projects
          </CalltoActionButton>
          <CalltoActionButton className="text-md">Hire me !</CalltoActionButton>
        </div>

      </div>
      <NexusOrbSup />
    </BackgroundLines>
  );
}
