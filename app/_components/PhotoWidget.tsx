'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

type Photo = {
  src: string;
  alt: string;
  caption?: string;
  description?: string;
};

// Add your photos here — files should live in /public/photos/
const photos: Photo[] = [
  { src: '/photos/me.png', alt: 'Me!', caption: "That's me!", description: "If you see me in any professional website, this is typically my headshot. Thank you so much to the person who took this (you know who you are)!" },
  { src: '/photos/2.png', alt: 'The Western Ghats, India', caption: "The Western Ghats, India", description: 'Took this photo from a viewpoint in the Western Ghats in India while visiting family.' },
  { src: '/photos/3.png', alt: 'Neotokyo, Montréal', caption: 'Neotokyo, Montréal', description: 'One of my favorite Japanese restaurants in Montréal, the best mazumen I have had.' },
  { src: '/photos/4.png', alt: 'Concert', caption: 'Sofia Isella - Concert', description: 'Absolutely electric. I think I paid $40 for tix, and it was worth well above 5x that.' },
  { src: '/photos/5.png', alt: 'Kinda cool photo', caption: 'The Lake!', description: 'A photo from a retreat for the MBSU. Not sure who is in that photo, but aesthetic nonetheless.' },
];

// Deterministic rotations and offsets so they don't shift on re-render
const transforms = [
  { rotate: -4.5, x: 0,  y: 0  },
  { rotate:  3.2, x: 8,  y: -6 },
  { rotate: -1.8, x: -6, y: 10 },
  { rotate:  5.5, x: 4,  y: -4 },
  { rotate: -3.1, x: -4, y: 6  },
  { rotate:  2.4, x: 6,  y: 8  },
  { rotate: -5.0, x: -8, y: -2 },
];

export default function PhotoWidget() {
  const [selected, setSelected] = useState<Photo | null>(null);

  return (
    <>
      {/* Polaroid scatter */}
      <div
        className="relative flex flex-wrap gap-0 justify-start items-end"
        style={{ minHeight: '220px' }}
      >
        {photos.map((photo, i) => {
          const t = transforms[i % transforms.length];
          return (
            <motion.div
              key={photo.src}
              initial={{ rotate: t.rotate, x: t.x, y: t.y }}
              whileHover={{
                rotate: 0,
                x: 0,
                y: -12,
                scale: 1.08,
                zIndex: 10,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              style={{ rotate: t.rotate, x: t.x, y: t.y, zIndex: i }}
              className="relative cursor-pointer"
              onClick={() => setSelected(photo)}
            >
              {/* Polaroid frame */}
              <div className="bg-white p-2 pb-7 shadow-md w-[160px]">
                <div className="w-full aspect-square overflow-hidden bg-zinc-100">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={110}
                    height={110}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
                {photo.caption && (
                  <p className="mt-1 font-mono text-[9px] text-zinc-400 text-center truncate px-1">
                    {photo.caption}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelected(null)}
            />

            {/* Expanded polaroid */}
            <motion.div
              key="lightbox"
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
              <motion.div
                className="bg-white p-4 pb-10 shadow-2xl w-[min(80vw,340px)] pointer-events-auto relative"
                initial={{ scale: 0.7, opacity: 0, rotate: -3 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.7, opacity: 0, rotate: 3 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-2 right-2 text-zinc-300 hover:text-zinc-600 transition-colors z-10"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>

                {/* Image */}
                <div className="w-full aspect-square overflow-hidden bg-zinc-100">
                  <Image
                    src={selected.src}
                    alt={selected.alt}
                    width={340}
                    height={340}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>

                {/* Caption + description */}
                <div className="mt-3 px-1 flex flex-col gap-1">
                  {selected.caption && (
                    <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-green-dark)] opacity-70">
                      {selected.caption}
                    </p>
                  )}
                  {selected.description && (
                    <p className="font-serif text-[13px] text-zinc-600 leading-snug">
                      {selected.description}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}