import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// "/screenshots/ai-visual-search.png" -> "AI Visual Search"
function labelFromPath(path) {
  const file = path.split("/").pop().replace(/\.[^.]+$/, ""); // strip folder + extension
  return file
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bAi\b/g, "AI"); // keep AI uppercase
}

export default function Coverflow({ images = [], title = "" }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const count = images.length;

  const go = (dir) => setActive((prev) => (prev + dir + count) % count);

  const onDragEnd = (_, info) => {
    const threshold = 60;
    if (info.offset.x < -threshold) go(1);
    else if (info.offset.x > threshold) go(-1);
  };

  // close lightbox on Esc, arrow keys to navigate inside it
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom, count]);

  if (count === 0) return null;

  return (
    <div className="relative">
      {/* stage — wider + taller so cards fill the space */}
      <div
        className="relative mx-auto flex h-[400px] items-center justify-center sm:h-[560px]"
        style={{ perspective: "1400px" }}
      >
        <motion.div
          className="relative h-full w-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
          style={{ touchAction: "pan-y" }}
        >
          {images.map((src, i) => {
            let offset = i - active;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;

            const isActive = offset === 0;
            const abs = Math.abs(offset);

            return (
              <motion.div
                key={i}
                className={`absolute left-1/2 top-1/2 h-full w-[92%] overflow-hidden rounded-3xl border border-ink/5 bg-card shadow-2xl shadow-ink/15 sm:w-[80%] ${
                  isActive ? "cursor-zoom-in" : "cursor-pointer"
                }`}
                animate={{
                  x: `calc(-58% + ${offset * 58}%)`,
                  y: "-50%",
                  rotateY: offset * -40,
                  scale: isActive ? 1 : 0.88,
                  opacity: abs > 2 ? 0 : 1,
                  zIndex: 10 - abs,
                  filter: isActive ? "blur(0px)" : "blur(1.5px)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                onClick={() => (isActive ? setZoom(true) : setActive(i))}
                style={{ transformStyle: "preserve-3d" }}
              >
                <img
                  src={src}
                  alt={labelFromPath(src)}
                  className="pointer-events-none h-full w-full object-cover"
                  draggable={false}
                />
                {!isActive && <div className="absolute inset-0 bg-espresso/25" />}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* active caption */}
      <p className="mt-6 text-center font-display text-2xl font-semibold text-ink">
        {labelFromPath(images[active])}
      </p>

      {/* dots */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to screen ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-clay" : "w-2 bg-ink/20 hover:bg-ink/40"
            }`}
          />
        ))}
      </div>

      <p className="mt-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted/50">
        ← drag · click to enlarge · →
      </p>

      {/* lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso/90 p-4 backdrop-blur-sm sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
          >
            {/* close */}
            <button
              onClick={() => setZoom(false)}
              aria-label="Close"
              className="absolute right-5 top-5 font-mono text-sm uppercase tracking-[0.2em] text-cream/70 transition-colors hover:text-cream"
            >
              Close ✕
            </button>

            <motion.img
              key={active}
              src={images[active]}
              alt={labelFromPath(images[active])}
              className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* prev / next inside lightbox */}
            <button
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              aria-label="Previous"
              className="absolute left-5 top-1/2 -translate-y-1/2 text-3xl text-cream/60 transition-colors hover:text-cream"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go(1); }}
              aria-label="Next"
              className="absolute right-5 top-1/2 -translate-y-1/2 text-3xl text-cream/60 transition-colors hover:text-cream"
            >
              ›
            </button>

            <p className="absolute bottom-6 left-0 right-0 text-center font-display text-xl text-cream">
              {labelFromPath(images[active])}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}