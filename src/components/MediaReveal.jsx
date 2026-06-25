import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function MediaReveal({
  src,
  alt = "",
  className = "",
  aspect = "aspect-[16/9]",
  rounded = "rounded-3xl",
}) {
  const ref = useRef(null);

  // scroll parallax: image drifts as the section moves through the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden border border-ink/5 ${aspect} ${rounded} ${className}`}
      initial={{ opacity: 0, scale: 1.15, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="h-[112%] w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </motion.div>
  );
}