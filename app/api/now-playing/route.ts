// app/api/now-playing/route.ts
import { NextResponse } from 'next/server';

const LASTFM_API = 'https://ws.audioscrobbler.com/2.0/';

export async function GET() {
  const apiKey = process.env.LASTFM_API_KEY;
  const username = process.env.LASTFM_USERNAME;

  if (!apiKey || !username) {
    return NextResponse.json({ error: 'Missing Last.fm credentials' }, { status: 500 });
  }

  const url = `${LASTFM_API}?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

  const res = await fetch(url, { next: { revalidate: 30 } });
  if (!res.ok) {
    return NextResponse.json({ error: 'Last.fm fetch failed' }, { status: 502 });
  }

  const data = await res.json();
  const track = data?.recenttracks?.track?.[0];

  if (!track) {
    return NextResponse.json({ isPlaying: false });
  }

  const isPlaying = track['@attr']?.nowplaying === 'true';

  return NextResponse.json({
    isPlaying,
    title: track.name ?? null,
    artist: track.artist['#text'] ?? null,
    album: track.album['#text'] ?? null,
    albumArt: track.image?.find((img: { size: string }) => img.size === 'medium')?.['#text'] ?? null,
    url: track.url ?? null,
  });
}