import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import NexusOrbSup from "./ui/oribitCircle";
import { TextGenerateEffectDemo } from "./Texttyping";
import { FlipWordsDemo } from "./Textflipcomp";
import { HoverBorderGradient as CalltoActionButton } from "./ui/hover-border-gradient";
import { FloatingNav } from "./ui/floating-navbar";
import { InboxIcon, TextIcon } from "lucide-react";
import { TypingAnimation } from "./TyperwriterAnimation";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

export function BackgroundLinesDemo() {
  return (
    <BackgroundLines className="flex md:flex-row items-center text-center min-h-screen justify-center w-full flex-col px-4 dark bg-black">
      <div className="flex flex-col justify-center items-center w-1/2 translate-y-20 md:translate-y-0 ">
        <TextGenerateEffectDemo />
        <FlipWordsDemo />
        {/* typing effect will go here */}
        {/* <TypingAnimation /> */}
        <TypewriterEffectSmooth
          words={[
            {
              text: "Building modern web apps with React, Node.js,",
            },
            {
              text: " and MongoDB",
              className: "text-blue-500 dark:text-blue-500",
            },
          ]}
        />
        <div className="flex gap-3 my-3 cta-btn-container min-w-screen md:w-auto items-center justify-center">
          <CalltoActionButton className="text-md">
            <span className="flex gap-2 :hover cursor-pointer">
              Show Projects <TextIcon />
            </span>
          </CalltoActionButton>
          <CalltoActionButton className="text-md ">
            <span className="flex gap-2 :hover cursor-pointer">
              Hire me !<InboxIcon />
            </span>
          </CalltoActionButton>
        </div>
        {/* typewriter effect is going here  */}
      </div>
      <NexusOrbSup />
    </BackgroundLines>
  );
}
