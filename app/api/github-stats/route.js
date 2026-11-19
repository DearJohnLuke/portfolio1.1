import { NextResponse } from "next/server";
import { getGithubStats } from "@/lib/github-stats";

// Recomputed at most every 30 s; a repo's commit count is refetched only after a push.
export const revalidate = 30;

export async function GET() {
  try {
    const stats = await getGithubStats();
    return NextResponse.json(stats, {
      headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=300" },
    });
  } catch (err) {
    return NextResponse.json({ error: "github_unavailable" }, { status: 503 });
  }
}
