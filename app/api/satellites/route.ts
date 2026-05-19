// app/api/satellites/route.ts
// Proxies N2YO API calls so the API key stays server-side.
//
// Required env var: N2YO_API_KEY
// Add to .env.local: N2YO_API_KEY=your_key_here
//
// Endpoints exposed:
//   GET /api/satellites?type=above&lat=45.50&lng=-73.57&alt=50&radius=70&cat=0
//   GET /api/satellites?type=passes&id=25544&lat=45.50&lng=-73.57&alt=50&days=2&minvis=60

import { NextRequest, NextResponse } from "next/server";

const BASE = "https://api.n2yo.com/rest/v1/satellite";
const KEY = process.env.N2YO_API_KEY;

export async function GET(req: NextRequest) {
  if (!KEY) {
    return NextResponse.json({ error: "N2YO_API_KEY not set" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  let url: string;

  if (type === "above") {
    const lat  = searchParams.get("lat")    ?? "45.50";
    const lng  = searchParams.get("lng")    ?? "-73.57";
    const alt  = searchParams.get("alt")    ?? "50";
    const rad  = searchParams.get("radius") ?? "70";
    const cat  = searchParams.get("cat")    ?? "0";
    url = `${BASE}/above/${lat}/${lng}/${alt}/${rad}/${cat}/&apiKey=${KEY}`;

  } else if (type === "passes") {
    const id     = searchParams.get("id")     ?? "25544";
    const lat    = searchParams.get("lat")    ?? "45.50";
    const lng    = searchParams.get("lng")    ?? "-73.57";
    const alt    = searchParams.get("alt")    ?? "50";
    const days   = searchParams.get("days")   ?? "2";
    const minvis = searchParams.get("minvis") ?? "60";
    url = `${BASE}/visualpasses/${id}/${lat}/${lng}/${alt}/${days}/${minvis}/&apiKey=${KEY}`;

  } else {
    return NextResponse.json({ error: "Unknown type" }, { status: 400 });
  }

  const res = await fetch(url, { next: { revalidate: 60 } }); // cache 60s
  if (!res.ok) {
    return NextResponse.json({ error: "N2YO request failed" }, { status: 502 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}