import Image from "next/image";
import "@/app/globals.css";
import TypedLogo from "@/app/_components/logo"
import LatestPosts from "./_components/LatestPosts";
import CurrentlyListening from "./_components/CurrentlyListening";
import LatestProjects from "./_components/LatestProjects";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex flex-1 w-full max-w-3xl flex-col justify-between py-10 px-16 sm:items-start">
        <div className="flex flex-col gap-6 text-left">
          <h1 className="max-w-s text-3xl font-semibold leading-10 tracking-tight text-black">
            <TypedLogo />
          </h1>
          <h4 className="max-w-s italic font-[Menlo] text-zinc-400 dark:text-zinc-800"> Leaky space blob, in orbit around Sol tinkering with a portable Earth thinking machine. </h4>
          <p className="max-w-s text-lg leading-8 text-zinc-400 dark:text-zinc-600">
            I am a student bioinformatician and CS/Biology student at McGill, currently affiliated with the Burnier Lab. 
            I spend my time writing pipelines, chasing signals in genomes, and building tools to wrangle human genetics 
            on thinking sand. Outside of a lab, you will see me spending a few hours in a kitchen, looking up at the 
            night sky, perusing racks at St Laurent friperies, and plotting a cyberdeck... which I will definitely complete.
          </p>
        </div>

        <h2 className="max-w-s text-2xl leading-10 tracking-tight text-black mt-5">
            Featured Projects
        </h2>
        <LatestProjects />
        
        <h2 className="max-w-s text-2xl leading-10 tracking-tight text-black mt-5">
            My Synapses Say
        </h2>
        <LatestPosts />

        <h2 className="max-w-s text-2xl leading-10 tracking-tight text-black mt-5">
            Currently listening to...
            <CurrentlyListening />
        </h2>

      </main>
    </div>
  );
}
