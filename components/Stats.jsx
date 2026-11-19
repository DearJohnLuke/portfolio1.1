"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";

// Last known figures, shown only if GitHub cannot be reached.
const FALLBACK = { commits: 1242, projects: 95, technologies: 52 };
const POLL_MS = 60_000;

const Stats = () => {
  const [gh, setGh] = useState(FALLBACK);

  // Live: re-read the totals every minute while the page is open.
  useEffect(() => {
    let alive = true;
    const load = async () => {
      if (document.hidden) return;
      try {
        const res = await fetch("/api/github-stats");
        if (!res.ok) return;
        const data = await res.json();
        if (alive && data.commits)
          setGh({ commits: data.commits, projects: data.projects, technologies: data.technologies });
      } catch {}
    };
    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const stats = [
    { num: 7, text: "Years of experience" },
    { num: gh.projects, text: "GitHub projects", live: true },
    { num: gh.technologies, text: "Technologies in production", live: true },
    { num: gh.commits, text: "Code commits", live: true },
  ];

  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {stats.map((item, index) => {
            return (
              <div
                className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
                key={index}
              >
                <CountUp
                  end={item.num}
                  duration={5}
                  delay={2}
                  preserveValue
                  separator=" "
                  className="text-4xl xl:text-6xl font-extrabold"
                />
                <p
                  className={`${
                    item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                  } leading-snug text-white/80`}
                >
                  {item.text}
                  {item.live && (
                    <span
                      className="ml-2 inline-block w-2 h-2 rounded-full bg-accent animate-pulse align-middle"
                      title="Live from GitHub (DearJohnLuke + RobustCode-Incorporated)"
                    />
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
