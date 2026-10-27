import { NextRequest, NextResponse } from "next/server";
import { getProjects } from "@/lib/github";
import { profile } from "@/lib/profile";

export async function GET(request: NextRequest) {
  const rawLimit = request.nextUrl.searchParams.get("limit") ?? "3";
  const limit = Number(rawLimit);
  if (!/^\d+$/.test(rawLimit) || !Number.isInteger(limit) || limit < 1 || limit > 6) {
    return NextResponse.json({ error: "limit must be an integer between 1 and 6" }, { status: 400 });
  }
  const data = await getProjects();
  const featured = [...data.projects].sort((a, b) => Number(b.featured) - Number(a.featured));
  return NextResponse.json({ developer: profile.name, total: data.projects.length, source: data.source, projects: featured.slice(0, limit).map(project => ({ name: project.title, language: project.language })) }, { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}
