import { motion } from "motion/react";
import PhoneMockup from "./PhoneMockup";

export default function PhoneGrid({ screens = [] }) {
  return (
    <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
      {screens.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <PhoneMockup src={s.src} alt={s.title || ""} />
          {(s.title || s.label) && (
            <p className="mt-4 text-center font-mono text-xs uppercase tracking-[0.15em] text-muted">
              {s.title || s.label}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}