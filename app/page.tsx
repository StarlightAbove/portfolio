import Image from "next/image";
import "@/app/globals.css";
import TypedLogo from "@/app/_components/logo"
import LatestPosts from "./_components/LatestPosts";
import CurrentlyListening from "./_components/NowPlaying";
import LatestProjects from "./_components/LatestProjects";
import { Courier_Prime } from "next/font/google";
import PhotoWidget from "./_components/PhotoWidget";

const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'], // Choose required weights
  variable: '--font-courier', // Define CSS variable
});

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex flex-1 w-full flex-col justify-between py-10 sm:items-start">
        <div className="flex flex-col gap-6 text-left max-w-3xl">
          <h1 className="max-w-s text-3xl font-semibold leading-10 tracking-tight text-black">
            <TypedLogo />
          </h1>
          <h4 className="max-w-s italic font-[Menlo] text-zinc-400 dark:text-zinc-800"> Leaky space blob, in orbit around Sol tinkering with a portable Earth thinking machine. </h4>
          <p className="max-w-s text-lg leading-8 text-zinc-400 dark:text-zinc-600">
            I am a student bioinformatician and CS/Biology student at McGill, currently affiliated with the Burnier Lab. 
            I spend my time chasing signals in genomes, building tools to wrangle human genetics on thinking sand, and learning more
            about the world. 
            Outside of a lab, you will see me spending a few hours in a kitchen, looking up at the 
            night sky, perusing racks at St Laurent friperies, and plotting a cyberdeck... which I will definitely complete.
          </p>
        </div>
        
        <PhotoWidget />

        <div className="font-[Menlo]">
          <h2 className="max-w-s text-2xl leading-10 tracking-tight text-black mt-5">
            Things I&apos;m building
        </h2>
        </div>
        
        <LatestProjects />
        
        <h2 className=" font-[Menlo] max-w-3xl text-2xl leading-10 tracking-tight text-black mt-5 text-[Courier_Prime]">
            My Synapses Say
        </h2>
        <LatestPosts />

        <div className="mt-3">
          <CurrentlyListening />
        </div>
        

      </main>
    </div>
  );
}
