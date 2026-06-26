import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Reveal from "../Reveal";

const contactLinks = [
  { label: "Email",    value: "arshadk000@gmail.com",            href: "mailto:arshadk000@gmail.com" },
  { label: "GitHub",   value: "github.com/Arshad9633",           href: "https://github.com/Arshad9633" },
  { label: "LinkedIn", value: "linkedin.com/in/arshad-kunnathodi", href: "https://linkedin.com/in/arshad-kunnathodi" },
];

export default function Contact() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(import.meta.env.VITE_FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-cream/10 bg-espresso-card px-4 py-3 text-cream placeholder:text-cream/30 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/30 transition-colors";

  return (
    <section id="contact" className="bg-espresso px-6 py-28 text-cream">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
        {/* left column */}
        <div>
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-clay">
              05 — Contact
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">
              Let's build something together.
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-cream/70">
              Open to software engineering roles, freelance projects, and
              collaborations — full-stack, mobile, or AI. Drop a message or
              reach me directly.
            </p>
          </Reveal>

          <ul className="mt-12 space-y-4">
            {contactLinks.map((link, i) => (
              <motion.li
                key={link.label}
                initial={reduce ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-[100px_1fr] items-baseline gap-4"
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-cream/50">
                  {link.label}
                </span>
                <a
                  href={link.href}
                  target={link.label === "Email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="text-cream transition-colors hover:text-clay"
                >
                  {link.value}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* right column — form */}
        <motion.form
          onSubmit={onSubmit}
          initial={reduce ? false : { opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-cream/5 bg-espresso-card/60 p-7 sm:p-10"
        >
          <div>
            <label htmlFor="name" className="font-mono text-xs uppercase tracking-[0.2em] text-cream/60">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={update("name")}
              placeholder="Enter your name"
              className={`${inputClass} mt-2`}
            />
          </div>

          <div className="mt-6">
            <label htmlFor="email" className="font-mono text-xs uppercase tracking-[0.2em] text-cream/60">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={update("email")}
              placeholder="Enter your email"
              className={`${inputClass} mt-2`}
            />
          </div>

          <div className="mt-6">
            <label htmlFor="message" className="font-mono text-xs uppercase tracking-[0.2em] text-cream/60">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              required
              value={form.message}
              onChange={update("message")}
              placeholder="Please enter your message"
              className={`${inputClass} mt-2 resize-y`}
            />
          </div>

          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileHover={reduce ? {} : { scale: 1.01 }}
            whileTap={reduce ? {} : { scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="mt-8 w-full rounded-full bg-clay py-4 font-medium text-cream transition-colors hover:bg-clay-dark disabled:opacity-60"
          >
            {status === "sending" && "Sending…"}
            {status === "sent" && "Message sent ✓"}
            {status === "error" && "Something went wrong — try again"}
            {status === "idle" && "Send message →"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}