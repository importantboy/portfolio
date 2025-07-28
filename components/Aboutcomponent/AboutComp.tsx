import { CardSpotlight } from "../ui/card-spotlight";

export default function AboutComp() {
  return (
    <div className="dark">
      <h2 className="text-3xl md:text-6xl text-gray-600 dark:text-white py-6 text-center">
        About me
      </h2>
      <CardSpotlight>
        <div
          className="w-3/4 m-auto rounded-lg bg-black border-1 border-gray-600 h-[70vh]
      text-gray-600 dark:text-gray-50 shadow-blue-50 p-5 "
        >
          hello everyone
        </div>
      </CardSpotlight>
    </div>
  );
}
