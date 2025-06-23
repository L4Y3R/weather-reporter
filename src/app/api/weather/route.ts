import { NextResponse, NextRequest } from "next/server";
import { fetchWeather } from "@/app/lib/fetchWeather";


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || "Colombo";
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  const query = lat && lon ? `${lat},${lon}` : city || "Colombo";

  const data = await fetchWeather(query);

  if (!data) {
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 });
  }

  return NextResponse.json(data);
}
