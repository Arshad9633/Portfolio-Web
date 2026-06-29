import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function BrowserMockup({ src, alt = "", url = "", animate = true, maxHeight = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  const frame = (
    <>
      {/* browser top bar */}
      <div className="flex items-center gap-2 border-b border-ink/5 bg-cream/80 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#e06c5a]" />
        <span className="h-3 w-3 rounded-full bg-[#e0b44a]" />
        <span className="h-3 w-3 rounded-full bg-[#6bbf6b]" />
        {url && (
          <div className="ml-3 flex-1">
            <span className="inline-block rounded-md bg-ink/5 px-3 py-1 font-mono text-xs text-muted">
              {url}
            </span>
          </div>
        )}
      </div>
      <div className={maxHeight ? "max-h-[340px] overflow-hidden" : ""}>
        <img src={src} alt={alt} className="block w-full object-top" />
      </div>
    </>
  );

  // static frame — parent controls the motion (used in alternating rows)
  if (!animate) {
    return (
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-card shadow-2xl shadow-ink/20">
        {frame}
      </div>
    );
  }

  // animated frame with tilt + glow + parallax (used for the hero)
  return (
    <div ref={ref} className="relative" style={{ perspective: "1800px" }}>
      <div className="pointer-events-none absolute -inset-10 -z-10">
        <div className="absolute right-1/4 top-0 h-72 w-72 rounded-full bg-clay/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-clay/10 blur-3xl" />
      </div>
      <motion.div
        style={{ y, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 60, rotateX: 14 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 6 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ rotateX: 0, scale: 1.01 }}
        className="overflow-hidden rounded-2xl border border-ink/10 bg-card shadow-2xl shadow-ink/20"
      >
        {frame}
      </motion.div>
    </div>
  );
}