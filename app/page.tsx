import Image from "next/image";
import "@/app/globals.css";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-left px-25 text-left">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-left justify-between py-10 px-16 sm:items-start">
        <div className="flex flex-col items-left gap-6 text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black">
            Hi, my name is Eliza.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            I am currently an undergraduate at McGill University, studying for a Joint major in Computer Science and Biology. 
            I am also currently affiliated with the Burnier Lab at the RI-MUHC as a summer student, and was previously a student 
            at the Przybyl Lab at the RI-MUHC.
          </p>
        </div>
      </main>
    </div>
  );
}
