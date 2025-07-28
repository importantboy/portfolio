"use client";
import { cn } from "@/lib/utils";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function TypingAnimation() {
  const words = [
     {
        text : "Building modern web apps with React, Node.js,"
     },
    {
      text: "and MongoDB",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="text-white z-100">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
