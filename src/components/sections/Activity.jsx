import { useState, useEffect } from "react";
import Reveal from "../Reveal";

const theme = ["#eae2d1", "#e0b9a3", "#cf8a63", "#c06a3e", "#b5532b"];

// pick a color bucket based on the day's count
function levelColor(count) {
  if (count === 0) return theme[0];
  if (count < 3) return theme[1];
  if (count < 6) return theme[2];
  if (count < 9) return theme[3];
  return theme[4];
}

export default function Activity() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => (d.error ? setError(true) : setData(d)))
      .catch(() => setError(true));
  }, []);

  return (
    <section id="activity" className="bg-cream px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-clay">Activity</p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
            What I've been building
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 overflow-x-auto rounded-3xl border border-ink/5 bg-card p-7 shadow-sm shadow-ink/5">
            {error && (
              <p className="font-mono text-sm text-muted">Couldn't load activity right now.</p>
            )}

            {!error && !data && (
              <p className="font-mono text-sm text-muted/60">Loading activity…</p>
            )}

            {data && (
              <>
                <div
                  className="grid min-w-[700px] grid-flow-col gap-[3px]"
                  style={{ gridTemplateRows: "repeat(7, 1fr)" }}
                >
                  {data.days.map((day) => (
                    <div
                      key={day.date}
                      title={`${day.contributionCount} contributions on ${day.date}`}
                      className="aspect-square w-[12px] rounded-[2px]"
                      style={{ backgroundColor: levelColor(day.contributionCount) }}
                    />
                  ))}
                </div>
                <p className="mt-4 font-mono text-xs text-muted">
                  {data.total} contributions in the last year
                </p>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}