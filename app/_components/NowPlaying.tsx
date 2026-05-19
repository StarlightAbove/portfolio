'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type NowPlaying =
  | { isPlaying: true; title: string; artist: string; album: string; albumArt: string | null; url: string }
  | { isPlaying: false; title?: string; artist?: string; album?: string; albumArt?: string | null; url?: string };

export default function NowPlaying() {
  const [data, setData] = useState<NowPlaying | null>(null);

  useEffect(() => {
    async function fetchNowPlaying() {
      try {
        const res = await fetch('/api/now-playing');
        const json = await res.json();
        setData(json);
      } catch {
        setData({ isPlaying: false });
      }
    }

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30_000);
    return () => clearInterval(interval);
  }, []);

  const hasTrack = data && (data.isPlaying || data.title);
  const label = data?.isPlaying ? 'now playing' : 'recently played';

  return (
    <AnimatePresence mode="wait">
      {data === null ? null : hasTrack ? (
        <motion.a
          key="playing"
          href={data.url ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="group flex items-center gap-3 w-fit"
          aria-label={`${label}: ${data.title} by ${data.artist}`}
        >
          {/* Album art */}
          <div className="relative shrink-0 w-8 h-8 rounded overflow-hidden bg-zinc-100">
            {data.albumArt && data.albumArt !== '' ? (
              <img
                src={data.albumArt}
                alt={data.album ?? ''}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[var(--color-green)] opacity-30" />
            )}
            {/* Pulsing dot — only when actually playing */}
            {data.isPlaying && (
              <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-[var(--color-green-dark)]">
                <span className="absolute inset-0 rounded-full bg-[var(--color-green-dark)] animate-ping opacity-75" />
              </span>
            )}
          </div>

          {/* Text */}
          <div className="flex flex-col leading-tight overflow-hidden">
            <span className="font-mono text-[11px] tracking-widest uppercase text-[var(--color-green-dark)] opacity-60 mb-0.5">
              {label}
            </span>
            <span className="font-serif text-[13px] text-zinc-700 group-hover:text-[var(--color-green-dark)] transition-colors truncate max-w-[180px]">
              {data.title}
            </span>
            <span className="font-mono text-[11px] text-zinc-400 truncate max-w-[180px]">
              {data.artist}
            </span>
          </div>
        </motion.a>
      ) : (
        <motion.div
          key="silent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
          aria-label="Not currently playing anything"
        >
          <span className="w-8 h-8 rounded bg-zinc-100 shrink-0" />
          <div className="flex flex-col leading-tight">
            <span className="font-mono text-[11px] tracking-widest uppercase text-zinc-300 mb-0.5">
              recently played
            </span>
            <span className="font-mono text-[11px] text-zinc-300">
              silence, apparently
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}