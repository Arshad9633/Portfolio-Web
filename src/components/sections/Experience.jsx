import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import Reveal from "../Reveal";
import { timeline } from "../../data/timeline";

export default function Experience() {
  const reduce = useReducedMotion();
  const trackRef = useRef(null);

  // measure scroll progress across the timeline track
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 60%"],
  });

  // scale the line from 0 → 1 as the track passes through the viewport
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="bg-cream px-6 py-28">
      <div className="mx-auto max-w-6xl">
        {/* heading */}
        <Reveal>
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-clay">
            04 — Path
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl">
            Experience &amp; education
          </h2>
        </Reveal>

        {/* timeline track */}
        <div ref={trackRef} className="relative mt-20 pl-10">
          {/* faint guide rail (full height) */}
          <span
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-ink/10"
          />
          {/* drawn-on-scroll line (terracotta, scales vertically) */}
          <motion.span
            aria-hidden
            style={reduce ? undefined : { scaleY: lineScale }}
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-clay"
          />

          <ol className="space-y-16">
            {timeline.map((entry, i) => (
              <motion.li
                key={entry.role}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.5,
                  delay: 0.05 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                {/* marker dot */}
                <span
                  aria-hidden
                  className="absolute -left-10 top-2 grid h-4 w-4 place-items-center"
                >
                  <span className="h-4 w-4 rounded-full border-2 border-clay bg-cream" />
                </span>

                {/* role + period */}
                <div className="flex flex-wrap items-baseline gap-x-4">
                  <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                    {entry.role}
                  </h3>
                  <span className="font-mono text-sm uppercase tracking-[0.2em] text-clay">
                    {entry.period}
                  </span>
                </div>

                <p className="mt-2 font-medium text-ink">{entry.org}</p>
                <p className="mt-3 max-w-3xl leading-relaxed text-muted">
                  {entry.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}