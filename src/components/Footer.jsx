export default function Footer() {
  return (
    <footer className="bg-espresso px-6 pb-10 pt-6 text-cream/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 sm:flex-row">
        <a href="#hero" className="font-display text-xl font-semibold text-cream">
          Arshad<span className="text-clay">.</span>K
        </a>

        <p className="font-mono text-xs uppercase tracking-[0.2em]">
          © 2026 Arshad Kunnathodi — Built and Deployed.
        </p>

        <div className="flex gap-6 font-mono text-xs uppercase tracking-[0.2em]">
          <a
            href="https://github.com/Arshad9633"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-clay"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/arshad-kunnathodi"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-clay"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}