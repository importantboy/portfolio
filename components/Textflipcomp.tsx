import React from "react";
import { FlipWords } from "./ui/flip-words";
import { cn } from "@/lib/utils";

export function FlipWordsDemo() {
  const words = ["Faster", "Reliable", "Frontend", "Backend"];

  return (
    <div className="text-3xl text-white py-5 leading-1">
      <span className="whitespace-nowrap font-semibold">
        <FlipWords words={words} className="font-bold"/>
        {"Developer"}
      </span>
    </div>
  );
}
