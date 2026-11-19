import { NextResponse } from "next/server";
import { getGithubStats } from "@/lib/github-stats";

// Dynamic route: the response is cached 30 s at the CDN; each repo's facts are
// cached until its next push, so a request only re-reads repos that changed.
export const dynamic = "force-dynamic";
// The very first run reads every repo; later runs only re-read pushed repos.
export const maxDuration = 60;

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
