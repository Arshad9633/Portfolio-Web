import { motion, useReducedMotion } from "motion/react";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Activity", href: "#activity" },
  { label: "Experience", href: "#experience" },
];

export default function Navbar() {
  const reduce = useReducedMotion();

  return (
    <motion.header
      initial={reduce ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-ink/5 bg-cream/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#hero" className="font-display text-3xl font-semibold text-ink">
          Arshad<span className="text-clay">.</span>K
        </a>
        <div className="flex items-center gap-10">
          <ul className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-lg text-muted transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="rounded-full bg-clay px-6 py-3 text-base font-medium text-cream transition-colors hover:bg-clay-dark">
            Get in touch
          </a>
        </div>
      </nav>
    </motion.header>
  );
}