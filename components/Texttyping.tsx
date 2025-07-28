"use client";
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const words = `Hi, i am Rahul`;

export function TextGenerateEffectDemo() {
  return (
    <TextGenerateEffect
      words={words}
      className={cn(
        "text-2xl sm:text-5xl md:text-6xl font-light tracking-wider"
      )}
    />
  );
}
