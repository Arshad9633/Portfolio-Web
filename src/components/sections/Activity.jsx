import Reveal from "../Reveal";

export default function Activity() {
  return (
    <section id="activity" className="bg-cream px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-clay">
            Activity
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
            What I've been building
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 overflow-x-auto rounded-3xl border border-ink/5 bg-card p-7 shadow-sm shadow-ink/5">
            <img
              src="https://ghchart.rshah.org/b5532b/Arshad9633"
              alt="Arshad's GitHub contribution graph"
              className="w-full min-w-[700px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}