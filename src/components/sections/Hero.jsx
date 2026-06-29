import { motion, useReducedMotion } from "motion/react";
import MediaReveal from "../MediaReveal";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const start = reduce ? "show" : "hidden";

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-cream px-6 pb-16 pt-28 lg:px-20"
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-clay/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-clay/10 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* left column */}
        <motion.div variants={container} initial={start} animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-card px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted"
          >
            <span className="h-2 w-2 rounded-full bg-green-600" />
            Available for work
          </motion.span>

          <motion.p variants={item} className="mt-7 font-mono text-sm uppercase tracking-[0.2em] text-clay sm:text-lg">
            Software Engineer · M.Sc. CS
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-4 font-display text-5xl font-semibold leading-[0.95] text-ink sm:text-7xl lg:text-8xl"
          >
            Arshad
            <br />
            Kunnathodi
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-lg text-xl leading-relaxed text-muted">
            I build and ship full-stack web and mobile applications — React and
            React Native (Expo) front-ends, Spring Boot and Django back-ends,
            secured with JWT and role-based auth and delivered through CI/CD —
            increasingly with AI features built on LLMs and RAG.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-[9px] bg-[#b5532a] text-white px-[32px] py-[18px] rounded-full no-underline font-semibold text-[17px] transition-all duration-200 shadow-[0_8px_24px_rgba(181,83,42,0.22)] hover:-translate-y-[2px] hover:bg-[#9a4422] hover:shadow-[0_12px_30px_rgba(181,83,42,0.3)]"
            >
              View my work →
            </a>
            <a
              href="#contact"
              className="inline-flex items-center bg-transparent text-[#2b241d] px-[32px] py-[18px] rounded-full no-underline font-semibold text-[17px] border border-[rgba(43,36,29,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent,#b5532a)] hover:bg-[#faf6ee]"
            >
              Get in touch
            </a>
          </motion.div>
        </motion.div>

        {/* right column — portrait */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <MediaReveal src="/Profile_Pic.png" alt="Arshad Kunnathodi" aspect="aspect-[4/5]" />

          {/* focus card — hangs off the corner, not clipped */}
          <div className="absolute -bottom-6 -left-6 z-10 rounded-2xl bg-card px-6 py-4 shadow-xl shadow-ink/10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Focus</p>
            <p className="mt-1 text-lg font-medium text-ink">Full-stack · Web · Mobile · AI</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}