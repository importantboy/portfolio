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
      <div className="flex flex-col justify-center items-center ">
        <TextGenerateEffectDemo />
        <FlipWordsDemo />
        <div className="flex gap-3 my-3 cta-btn-container">
          <CalltoActionButton className="text-md">
            Show Projects
          </CalltoActionButton>
          <CalltoActionButton className="text-md">Hire me !</CalltoActionButton>
        </div>
        <div className="menu-bar-container">
          <FloatingNav
            navItems={[
              { name: "Home", link: "#" },
              { name: "About", link: "#" },
              { name: "Contact us", link: "#" },
            ]}
            className=""
          />
        </div>
      </div>
      <NexusOrbSup />
    </BackgroundLines>
  );
}
