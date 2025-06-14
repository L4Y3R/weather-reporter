import { NextResponse } from "next/server";
import { fetchWeather } from "@/app/lib/fetchWeather";

export async function GET() {
  const data = await fetchWeather("Colombo");

  if (!data) {
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 });
  }

  return NextResponse.json(data);
}
