import { BackgroundLines } from "@/components/ui/background-lines";
import NexusOrbSup from "./Home/Page";
import { FlipWords } from "@/components/ui/flip-words";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconHome, IconMail, IconUser } from "@tabler/icons-react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function Home() {
  return (
    <div className="h-screen custom_bg dark">
      <div className="absolute z-1 top-20 right-10 text-white">
        <FloatingDock
          items={[
            { title: "Home", icon: <IconHome />, href: "/home" },
            { title: "About", icon: <IconUser />, href: "/user" },
            { title: "Contact", icon: <IconMail />, href: "/contact" },
          ]}
        />
      </div>
      <BackgroundLines>
        <div className="flex items-center container mx-5 h-screen text-center ">
          <div className="w-1/2 text-center flex flex-col items-center">
            <h1 className="text-6xl font-500 text-white tracking-tighter ">
              {" "}
              Hello, i am Rahul{" "}
              <span className="text-nowrap text-4xl tracking-tight">
                {" "}
                <FlipWords words={["Frontend", "Backend"]}></FlipWords>
                Developer
              </span>
            </h1>
            <TypewriterEffectSmooth
              className={"font-medium"}
              words={[
                {
                  text: "Building modern web apps with React, Node.js, and MongoDB",
                },
              ]}
            />

            <HoverBorderGradient
              className={"text-xl  :hover cursor-pointer px-4 py-2"}
              as={"button"}
            >
              Hire me !
            </HoverBorderGradient>
          </div>
          <div className="scale-130 mix-blend-lighten flex justify-end">
            <NexusOrbSup  />
          </div>
        </div>
      </BackgroundLines>
    </div>
  );
}
