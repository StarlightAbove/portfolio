import Link from "next/link";
import Script from "next/script";
import NowPlaying from "../_components/NowPlaying";
import WhatsOverhead from "../_components/WhatsOverhead";

export default function Page() {
  return (
    <main>
      <div>
        <div className="font-[Menlo]">
          <h2 className="max-w-s text-2xl leading-10 tracking-tight text-black mt-5">
            Random Stuff
        </h2>
      </div>

      <div className="mb-2">
        <p className="max-w-3xl text-md leading-8 text-zinc-400 dark:text-zinc-600">
          I will literally put whatever I want here. Opinions I have, random widgets I make, maybe a few photos if I am feeling creative.  
        </p>
      </div>

        <div className="flex max-w-3xl">
          <div>
            <WhatsOverhead />
          </div> 
          <div className="flex-2 ml-7 bg-[url('@/public/bgSpace.jpg')] rounded-lg">
            <div className="px-4 mt-2">
              <h3 className="font-[Menlo] text-zinc-200 text-lg leading-10 tracking-tight">Opinions on space travel</h3>
              <p className="text-zinc-200 text-sm tracking-tight text-black">I have always been a fan of space. 
                I wear it almost as a point of pride.The first time I saw a rocket rise into the sky, I was in love. One of the best
                trips of my life to this day was to the Kennedy Space Center in Florida, where I got to see the Saturn V up close.
                <br className="mb-2" />

                Humanity is incredible. We rose from the NYT putting out an article saying man would never fly for a million years,
                and in the next few weeks, achieving manned flight, and in a matter of 66 years, we put feet on the moon.
                The Artemis 2 mission, honestly, gave me so much hope and happiness. Seeing those astronauts be the cheery explorers of the universe,
                as embarrassing as it might be, I possibly developed a parasocial relationship with all of them. Also, I do not deny it, Christina Koch 
                might now be my icon. I feel like that giddy 10-yr old again looking up at the stars. 
                <br className="mb-2"/>

                I am a progressive. I believe in the goodness of humanity, and I will argue for the good of humanity against those who posit that humanity&apos;s
                selfishness is what defines us. However, I do have to acknowledge a frustration about space travel.
                The view being that space research and the military-industrial complex are inherently linked, and thus, the ethics of spaceflight are compromised. This is 
                true, and I would either be a charlatan or blind if I said I do not notice that.
                <br className="mb-2"/>

                But I must also disagree that the involvement of the complex means we should stop spaceflight.  Humanity has risen from embracing the power of fire
                to now building skyscrapers, from trying to balance humors to manage disease to being able to modify out own genes. The best quality of being a part of Homo 
                Sapiens is our irreducible quality of curiosity. Curiosity has driven us from mere hunter-gatherers to advanced societies which would look like magic to us a 
                mere 3000 or so years ago. A video that illustrates this progress, albeit dramatically, is this <Link className="text-blue-500" href="https://www.instagram.com/reels/DWTAR73Adwx/">reel</Link>.
                If we choose to ignore spaceflight, we choose to use this industrial base of aeronautics and astronautics to destroy homes and lives, instead of building humanity. 
                <br className="mb-2"/>

                Is space difficult? Yes. Are there ethical issues? Yes. But to ignore progress for a Nirvana solution to our societal problems results in stagnation. NASA exploration 
                has been a net benefit for humanity, and paid for itself <Link className="text-blue-500" href="https://www.jpl.nasa.gov/infographics/20-inventions-we-wouldnt-have-without-space-travel/">multiple times over</Link>.
                To neglect our future dancing amidst the stars is at our own peril. I doubt anyone reading this piece of text wishes to return to a time without a CAT scan, for example.
                <br className="mb-2"/>

                So, I will continue cheering for NASA, the ESA, ISRO, and every other organization strapping a booster onto an advanced life support system all in the dream of developing humanity&apos;s interstellar dreams. I hope 
                you join me in doing the same.
                <br className="mb-2"/>
                <i>NASA is currently facing funding cuts. Support the funding of science by exercising your democratic rights. If you are not American, write to whoever is in-charge of space exploration in your country.</i>
                <br className="mb-2"/>
                <i>Yes, that is a satellite tracker on the side.</i>
              </p>
            </div>
            
          </div>
        </div>

      </div>
      
    </main>
  )
}