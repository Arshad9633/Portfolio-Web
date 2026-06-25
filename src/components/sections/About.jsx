import { motion } from "motion/react";
import Reveal from "../Reveal";

const headline = "Engineering software that's scalable, secure, and genuinely useful.";

const pillars = [
  { title: "Full-stack", sub: "web & mobile" },
  { title: "AI-native",  sub: "LLM · RAG" },
  { title: "M.Sc.",      sub: "computer science" },
];

export default function About() {
  const words = headline.split(" ");

  return (
    <section id="about" className="border-y border-ink/[0.07] bg-sand px-8 py-[108px]">
      <div className="mx-auto max-w-[1180px]">
        {/* eyebrow — sits above the grid, full width */}
        <Reveal>
          <p className="mb-3.5 font-mono text-[20px] uppercase tracking-[0.2em] text-clay">
            01 — About
          </p>
        </Reveal>

        {/* two columns: headline | content */}
        <div className="grid items-start gap-[60px] lg:grid-cols-2">
          {/* left — headline, revealed word by word */}
          <h2
            aria-label={headline}
            className="font-display text-5xl font-medium leading-[1.12] tracking-[-0.02em] text-ink"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                className="mr-[0.25em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          {/* right — paragraphs + pillars */}
          <div>
            <Reveal delay={0.08}>
              <p className="text-lg leading-[1.7] text-muted">
                I'm a Software Engineer and M.Sc. Computer Science student with
                hands-on experience building and deploying production web and
                mobile applications using React, React Native (Expo), and Spring Boot.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-[18px] text-lg leading-[1.7] text-muted">
                My work spans RESTful API design, JWT and 2FA authentication,
                role-based access control, containerization, and CI/CD pipelines
                — increasingly alongside AI-powered features built on LLMs, prompt
                engineering, model APIs, and Retrieval-Augmented Generation.
              </p>
            </Reveal>

            {/* pillars — horizontal row */}
            <div className="mt-6 flex flex-wrap gap-7">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-display text-4xl font-semibold text-clay">
                    {p.title}
                  </p>
                  <p className="mt-1 font-mono text-lg text-muted">{p.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}