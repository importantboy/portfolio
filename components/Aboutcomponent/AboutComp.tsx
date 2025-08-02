import Image from "next/image";
import { CardSpotlight } from "../ui/card-spotlight";
import { HeroHighlight } from "../ui/hero-highlight";

export default function AboutComp() {
  return (
    <div className="dark min-h-screen" id="about">
      <HeroHighlight>
         
        <h2 className="text-3xl md:text-6xl text-gray-600 dark:text-white py-4 text-center">
          About Me
        </h2>

        <div className="w-[80vw] md:w-[70vw] h-[70vh] rounded-xl flex flex-col md:flex-row gap-4  ">
          <div className="card-left md:w-[35%]  h-[50%] md:h-full overflow-hidden rounded-md">
            <Image
              src={"/linkedinProfilepicture.png"}
              alt="profile image"
              width={500}
              height={600}
              // height={undefined}
              className="rounded-ss-[70%]"
            />
          </div>
          <div
            className="relative card-right md:w-[70%] overflow-hidden  h-[70%]
            md:h-full text-white p-5 flex flex-col justify-center
            "
          >
            <div className="absolute w-full h-full -z-1"></div>
            <h2 className="text-4xl font-light md:text-5xl my-6 capitalize ">
              who am i ?
            </h2>
            <p className="text-xl">
              Hi, I’m <b>Rahul</b> — a software engineer passionate about
              crafting modern and scalable web applications. With a background
              in BCA at SVIET, I specialize in React, Node.js, MongoDB, and
              Tailwind CSS to create seamless user experiences and efficient
              backend systems. My goal is to join a dynamic team where I can
              contribute to impactful projects, enhance my skills, and grow as a
              full-stack developer while solving real-world problems.
            </p>
          </div>
        </div>
      </HeroHighlight>
    </div>
  );
}
