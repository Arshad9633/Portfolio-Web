import { motion } from "motion/react";
import Reveal from "../Reveal";
import { Link } from "react-router";
import { projects } from "../../data/projects";

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  hover: { y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

export default function Work() {
  return (
    <section id="work" className="bg-cream px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-clay">
            02 — Selected Work
          </p>
        </Reveal>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal delay={0.05}>
            <h2 className="font-display text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl">
              Things I've built
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-xs text-muted">
              A few projects that show how I work across the stack.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 space-y-8">
          {projects.map((p) => (
            <motion.article
              key={p.n}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              whileHover="hover"
              viewport={{ once: false, amount: 0.3 }}
              className="group grid gap-8 rounded-3xl border border-ink/5 bg-card p-6 shadow-sm shadow-ink/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10 lg:grid-cols-[1fr_1.1fr] lg:p-8"
            >
              <div className="relative flex aspect-[5/3] items-center justify-center overflow-hidden rounded-2xl bg-[repeating-linear-gradient(45deg,#e3dac6_0,#e3dac6_1px,#ece4d5_1px,#ece4d5_15px)]">
                <span className="absolute left-4 top-4 rounded-lg bg-card px-3 py-1 font-mono text-sm font-medium text-ink shadow-sm shadow-ink/5">
                  {p.n}
                </span>
                <p className="font-mono text-muted/70 transition-transform duration-500 group-hover:scale-110">
                  [ {p.placeholder} ]
                </p>
              </div>

              <div className="flex flex-col justify-center">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay">
                  {p.tags.join(" · ")} <span className="mx-1 text-muted">•</span> {p.year}
                </p>

                <h3 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
                  {p.title}
                </h3>

                <p className="mt-4 leading-relaxed text-muted">{p.description}</p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-ink/10 bg-cream px-3 py-1 font-mono text-xs text-ink"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
               <Link
                  to={`/work/${p.slug}`}
                  className="group/link mt-7 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-clay transition-colors hover:text-clay-dark"
                >
                  View case study
                  <span className="transition-transform group-hover/link:translate-x-1">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}