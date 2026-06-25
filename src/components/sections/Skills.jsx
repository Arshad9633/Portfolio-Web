import { motion, useReducedMotion } from "motion/react";
import Reveal from "../Reveal";
import { skillCategories } from "../../data/skills";

export default function Skills() {
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="bg-sand px-6 py-28">
      <div className="mx-auto max-w-6xl">
        {/* heading */}
        <Reveal>
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-clay">
            03 — Toolkit
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl">
            Skills &amp; technologies
          </h2>
        </Reveal>

        {/* category cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: 0.1 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reduce ? {} : { y: -4 }}
              className="rounded-2xl border border-ink/5 bg-card p-7 shadow-sm shadow-ink/5 transition-shadow hover:shadow-md hover:shadow-ink/5"
            >
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rotate-45 bg-clay" />
                <h3 className="font-sans font-semibold text-ink">{cat.title}</h3>
              </div>

              <ul className="mt-5 space-y-2.5">
                {cat.items.map((item) => (
                  <li key={item} className="text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}