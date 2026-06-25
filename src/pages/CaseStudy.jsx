import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import Reveal from "../components/Reveal";
import MediaReveal from "../components/MediaReveal";
import Coverflow from "../components/Coverflow";

import { projects, getProjectBySlug } from "../data/projects";

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  // 404 state
  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-6 text-center">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-clay">404</p>
        <h1 className="font-display text-4xl text-ink">Project not found</h1>
        <Link to="/#work" className="font-mono text-sm uppercase tracking-[0.2em] text-clay hover:text-clay-dark">
          ← Back to work
        </Link>
      </div>
    );
  }

  // prev / next (wraps around)
  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const stripes =
    "bg-[repeating-linear-gradient(45deg,#e3dac6_0,#e3dac6_1px,#ece4d5_1px,#ece4d5_15px)]";

  return (
    <div className="min-h-screen bg-cream">
      {/* sticky back bar */}
      <div className="sticky top-0 z-50 border-b border-ink/5 bg-cream/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/#work" className="font-mono text-sm uppercase tracking-[0.2em] text-clay transition-colors hover:text-clay-dark">
            ← Back to work
          </Link>
          <Link to="/" className="font-display text-xl font-semibold text-ink">
            Arshad<span className="text-clay">.</span>K
          </Link>
        </div>
      </div>

      {/* header */}
      <header className="relative overflow-hidden px-6 pb-14 pt-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-clay/10 blur-3xl" />
        <div className="relative mx-auto max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-sm uppercase tracking-[0.2em] text-clay"
          >
            {project.n} — {project.tags.join(" · ")} · {project.year}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-display text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl"
          >
            {project.title}
          </motion.h1>
        </div>
      </header>

      {/* hero screenshot */}
      <section className="px-6 pb-8">
        <Reveal className="mx-auto max-w-5xl">
          {project.heroImage ? (
            <MediaReveal src={project.heroImage} alt={`${project.title} screenshot`} />
          ) : (
            <div className={`flex aspect-[16/9] items-center justify-center overflow-hidden rounded-3xl border border-ink/5 ${stripes}`}>
              <p className="font-mono text-muted/70">[ {project.placeholder} — hero shot ]</p>
            </div>
          )}
        </Reveal>
      </section>

      {/* body */}
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* overview + meta card */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <Reveal>
            <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-clay">Overview</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{project.overview}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-ink/5 bg-card p-7 shadow-sm shadow-ink/5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted/60">Role</p>
              <p className="mt-1 font-medium text-ink">{project.role}</p>

              <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-muted/60">Timeline</p>
              <p className="mt-1 font-medium text-ink">{project.timeline}</p>

              <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-muted/60">Stack</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech} className="rounded-md border border-ink/10 bg-cream px-3 py-1 font-mono text-base text-ink">
                    {tech}
                  </li>
                ))}
              </ul>

              {(project.github || project.live) && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="rounded-full bg-clay px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-clay-dark">
                      GitHub →
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5">
                      Live →
                    </a>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* how it's built — numbered card grid */}
        <div className="mt-20">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
              How it's built
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {project.builtSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-ink/5 bg-card p-7 shadow-sm shadow-ink/5"
              >
                <p className="font-display text-3xl font-semibold text-clay">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-sans text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* screens — multiple images */}
        {project.screens.some((s) => s.startsWith("/")) && (
          <Reveal className="mt-20">
            <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-clay">Screens</h2>
            <div className="relative left-1/2 right-1/2 -mx-[50vw] mt-8 w-screen px-6">
              <div className="mx-auto max-w-[800px]">
                <Coverflow
                  images={project.screens.filter((s) => s.startsWith("/"))}
                  title={project.title}
                />
              </div>
            </div>
          </Reveal>
        )}
        {/* demo video — only when youtube id is set */}
        {project.youtube && (
          <Reveal className="mt-20">
            <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-clay">Demo</h2>
            <div className="mt-6 aspect-video overflow-hidden rounded-2xl border border-ink/5 bg-espresso">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${project.youtube}`}
                title={`${project.title} demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Reveal>
        )}

        {/* key features band */}
        <Reveal className="mt-20">
          <div className="rounded-3xl bg-sand px-8 py-10">
            <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-clay">Key features</h2>
            <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {project.keyFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-lg text-ink">
                  <span className="mt-1 text-clay">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* prev / next nav */}
      <nav className="border-t border-ink/5 px-6 py-12">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <Link to={`/work/${prev.slug}`} className="group flex-1">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted/60">← Previous</p>
            <p className="mt-1 font-display text-xl font-semibold text-ink transition-colors group-hover:text-clay">{prev.title}</p>
          </Link>
          <Link to={`/work/${next.slug}`} className="group flex-1 text-right">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted/60">Next →</p>
            <p className="mt-1 font-display text-xl font-semibold text-ink transition-colors group-hover:text-clay">{next.title}</p>
          </Link>
        </div>
      </nav>
    </div>
  );
}