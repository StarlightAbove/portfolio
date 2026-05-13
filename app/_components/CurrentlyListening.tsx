"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Track {
  title: string;
  artist: string;
  emoji: string;
  bg: string;
}

const tracks: Track[] = [
  { title: "Motion Picture Soundtrack", artist: "Radiohead", emoji: "🌿", bg: "#e8f0e8" },
  { title: "La Lune", artist: "Beirut", emoji: "🌙", bg: "#eae8f0" },
  { title: "Holocene", artist: "Bon Iver", emoji: "❄️", bg: "#e8eef0" },
  { title: "Bloodbuzz Ohio", artist: "The National", emoji: "🌾", bg: "#f0ece8" },
  { title: "White Winter Hymnal", artist: "Fleet Foxes", emoji: "🦢", bg: "#f0f0ea" },
];

const TICK_INTERVAL_MS = 150;
const PROGRESS_INCREMENT = 0.5;

export default function CurrentlyListening() {
  return <p>Randoms Page</p>;
}