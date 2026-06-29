import { motion } from "motion/react";
import BrowserMockup from "./BrowserMockup";

export default function FeatureRow({ screen, index, url }) {
  const flipped = index % 2 === 1; // odd rows: image on the right

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      {/* image */}
      <motion.div
        initial={{ opacity: 0, x: flipped ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={flipped ? "lg:order-2" : "lg:order-1"}
      >
        <BrowserMockup src={screen.src} alt={screen.title} url={url} animate={false} maxHeight />
      </motion.div>

      {/* text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={flipped ? "lg:order-1" : "lg:order-2"}
      >
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-clay">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
          {screen.title}
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-muted">{screen.body}</p>
      </motion.div>
    </div>
  );
}