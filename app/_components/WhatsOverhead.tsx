// components/WhatsOverhead.tsx
// Drop into your curiosities/random page.
//
// Props:
//   lat / lng / alt — observer coords (default: Montréal)
//   radius         — sky search radius in degrees (0–90, default 70)
//
// Requires:
//   app/api/satellites/route.ts   (included separately)
//   N2YO_API_KEY in .env.local

"use client";

import { useEffect, useState, useCallback } from "react";

const NOTABLE_IDS = [25544, 20580]; // ISS, Hubble

// N2YO /above returns satelevation and satazimuth (not elevation/azimuth)
interface SatAbove {
  satid: number;
  satname: string;
  satlat: number;
  satlng: number;
  satalt: number;
  satelevation: number;
  satazimuth: number;
}

interface VisPass {
  satid?: number;
  satname?: string;
  startAz: number;
  startEl: number;
  startUTC: number;
  maxEl: number;
  endUTC: number;
}

interface AboveResponse {
  above: SatAbove[];
  info: { satcount: number };
}

interface PassesResponse {
  passes: VisPass[];
  info: { satname: string; satid: number };
}

function azToDir(az: number) {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(az / 45) % 8];
}

function calcElevationAzimuth(
  obsLat: number, obsLng: number, obsAltKm: number,
  satLat: number, satLng: number, satAltKm: number
): { elevation: number; azimuth: number } {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;

  const obsLat_r = toRad(obsLat);
  const obsLng_r = toRad(obsLng);
  const satLat_r = toRad(satLat);
  const satLng_r = toRad(satLng);

  const obsR = R + obsAltKm;
  const satR = R + satAltKm;

  // Cartesian coords for observer and satellite
  const ox = obsR * Math.cos(obsLat_r) * Math.cos(obsLng_r);
  const oy = obsR * Math.cos(obsLat_r) * Math.sin(obsLng_r);
  const oz = obsR * Math.sin(obsLat_r);

  const sx = satR * Math.cos(satLat_r) * Math.cos(satLng_r);
  const sy = satR * Math.cos(satLat_r) * Math.sin(satLng_r);
  const sz = satR * Math.sin(satLat_r);

  // Vector from observer to satellite
  const dx = sx - ox;
  const dy = sy - oy;
  const dz = sz - oz;

  // Observer's local up vector (unit normal at observer position)
  const ux = Math.cos(obsLat_r) * Math.cos(obsLng_r);
  const uy = Math.cos(obsLat_r) * Math.sin(obsLng_r);
  const uz = Math.sin(obsLat_r);

  // Observer's local north vector
  const nx = -Math.sin(obsLat_r) * Math.cos(obsLng_r);
  const ny = -Math.sin(obsLat_r) * Math.sin(obsLng_r);
  const nz =  Math.cos(obsLat_r);

  // Observer's local east vector
  const ex = -Math.sin(obsLng_r);
  const ey =  Math.cos(obsLng_r);
  const ez =  0;

  const range = Math.sqrt(dx * dx + dy * dy + dz * dz);

  // Project diff vector onto local up/north/east
  const up    = (dx * ux + dy * uy + dz * uz) / range;
  const north = (dx * nx + dy * ny + dz * nz) / range;
  const east  = (dx * ex + dy * ey + dz * ez) / range;

  const elevation = Math.round(toDeg(Math.asin(up)));
  const azimuth   = Math.round((toDeg(Math.atan2(east, north)) + 360) % 360);

  return { elevation, azimuth };
}

function fmtLocal(utc: number) {
  return new Date(utc * 1000).toLocaleTimeString("en-CA", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Toronto",
  });
}

const NOTABLE_NAMES: Record<number, string> = {
  25544: "ISS",
  20580: "Hubble",
};

export default function WhatsOverhead({
  lat = 45.5017,
  lng = -73.5673,
  alt = 50,
  radius = 50,
}: {
  lat?: number;
  lng?: number;
  alt?: number;
  radius?: number;
}) {
  const [overhead, setOverhead] = useState<SatAbove[]>([]);
  const [passes, setPasses] = useState<{ name: string; time: string; maxEl: number; soon: boolean }[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);


    

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch all satellites above
      const aboveRes = await fetch(
        `/api/satellites?type=above&lat=${lat}&lng=${lng}&alt=${alt}&radius=${radius}&cat=0`
      );
      if (!aboveRes.ok) throw new Error("above fetch failed");
      
      const aboveData: AboveResponse = await aboveRes.json();

      // Sort by elevation descending using correct N2YO field name
      const sorted = [...(aboveData.above ?? [])].sort(
        (a, b) => b.satelevation - a.satelevation
      );
      setOverhead(sorted.slice(0, 12));
      setTotal(aboveData.info?.satcount ?? sorted.length);

      // 2. Fetch upcoming visible passes for notable sats
      const now = Date.now() / 1000;
      const passResults = await Promise.allSettled(
        NOTABLE_IDS.map((id) =>
          fetch(
            `/api/satellites?type=passes&id=${id}&lat=${lat}&lng=${lng}&alt=${alt}&days=2&minvis=60`
          ).then((r) => r.json() as Promise<PassesResponse>)
        )
      );

      const allPasses: { name: string; time: string; maxEl: number; soon: boolean }[] = [];
      passResults.forEach((result, i) => {
        if (result.status === "fulfilled" && result.value.passes?.length) {
          const next = result.value.passes[0];
          const name = result.value.info?.satname ?? NOTABLE_NAMES[NOTABLE_IDS[i]] ?? `SAT-${NOTABLE_IDS[i]}`;
          allPasses.push({
            name,
            time: fmtLocal(next.startUTC),
            maxEl: Math.round(next.maxEl),
            soon: next.startUTC - now < 30 * 60,
          });
        }
      });
      allPasses.sort((a, b) => a.time.localeCompare(b.time));
      setPasses(allPasses);
      setUpdatedAt(
        new Date().toLocaleTimeString("en-CA", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );

    } catch (e) {
      setError("couldn't reach orbital data. try again.");
    } finally {
      setLoading(false);
    }
  }, [lat, lng, alt, radius]);

  useEffect(() => {
    // Defer the call to load() to avoid synchronous setState
    Promise.resolve().then(load);
  }, [load]);

  useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);
    if (!mounted) return null;

  return (
    <div className="font-mono text-sm">
      {/* Header */}
      <div className="flex items-baseline mb-0.5">
        <div className="flex items-baseline gap-2">
          <span className="text-xs uppercase text-neutral-500">
            spacecraft overhead right now
          </span>
          {total != null && (
            <span className="text-xs border border-[#6b8f71] text-[#6b8f71] rounded-full px-2 py-0.5">
              {total}
            </span>
          )}
        </div> 
      </div>
      <div className="text-xs text-neutral-400 mb-4">
          {lat.toFixed(2)}°N {Math.abs(lng).toFixed(2)}°W · Montréal
        </div>

      {/* Overhead list */}
      {loading ? (
        <p className="text-neutral-400 py-2">loading orbital data…</p>
      ) : error ? (
        <p className="text-red-400 py-2">{error}</p>
      ) : (
        <div className="flex flex-col gap-2">
          {overhead.map((s) => {
            const isNotable = NOTABLE_IDS.includes(s.satid);
            console.log(s.satelevation);
            console.log(s.satazimuth);
            return (
              <div
                key={s.satid}
                className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg border text-xs transition-colors ${
                  isNotable
                    ? "border-[#6b8f71]/40 bg-[#6b8f71]/5"
                    : "border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/40"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                    {s.satname}
                  </div>
                </div>
                <div className="text-right text-neutral-500 shrink-0 tabular-nums">
  {(() => {
    const { elevation, azimuth } = calcElevationAzimuth(
      lat, lng, alt / 1000,
      s.satlat, s.satlng, s.satalt
    );
    return <>
      <div>{elevation}° el</div>
      <div>{azToDir(azimuth)}</div>
    </>;
  })()}
</div>
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    isNotable ? "bg-[#6b8f71]" : "bg-neutral-300 dark:bg-neutral-600"
                  }`}
                />
              </div>
            );
          })}
          {total != null && total > 12 && (
            <p className="text-xs text-neutral-400 pt-1">
              + {total - 12} more within {radius}° of zenith
            </p>
          )}
        </div>
      )}

      <div className="h-px bg-neutral-200 dark:bg-neutral-700 my-5" />

      {/* Upcoming visible passes */}
      <div>
        <p className="text-xs tracking-widest uppercase text-neutral-600 mb-3">
          upcoming visible passes
        </p>
        {passes.length === 0 && !loading ? (
          <p className="text-neutral-600">no passes predicted</p>
        ) : (
          <div className="flex flex-col gap-1.5">
            {passes.map((p, i) => (
              <div
                key={i}
                className={`flex justify-between items-center px-3.5 py-2.5 border-l-2 ${
                  p.soon ? "border-[#6b8f71]" : "border-neutral-200 dark:border-neutral-600"
                }`}
              >
                <div>
                  <div className="text-slate-100 dark:text-slate-700">{p.name}</div>
                  <div className="text-xs text-neutral-600 mt-0.5">
                    {p.time} local · {p.soon ? "soon" : "upcoming"}
                  </div>
                </div>
                <div className="text-neutral-500 tabular-nums">{p.maxEl}° max</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-5">
        <span className="text-xs text-neutral-400">
          {updatedAt ? `updated ${updatedAt}` : "—"}
        </span>
        <button
          onClick={load}
          disabled={loading}
          className="font-mono text-xs text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-1 hover:border-neutral-400 hover:text-neutral-600 transition-colors disabled:opacity-40"
        >
          ↻ refresh
        </button>
      </div>
    </div>
  );
}