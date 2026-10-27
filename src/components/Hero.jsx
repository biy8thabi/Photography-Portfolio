function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="page-title"
      className="mx-auto w-[min(1160px,100%-2rem)] pt-16 pb-12 sm:w-[min(1160px,100%-3rem)] sm:pt-24 lg:pt-32"
    >
      <p className="mb-4 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-accent">
        Independent photographer · Durban, South Africa
      </p>
      <h1
        id="page-title"
        className="max-w-[850px] font-serif text-4xl leading-[0.98] font-normal tracking-[-0.06em] break-words sm:text-6xl lg:text-8xl"
      >
        Finding beauty
        <br />
        in the in-between.
      </h1>
      <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <p className="max-w-[430px] text-muted">
          Portraits, places, and passing moments — photographed with a little
          patience and a lot of feeling.
        </p>
        <a
          href="#work"
          className="inline-flex items-center gap-3 border-b border-accent pb-1.5 text-[0.82rem] font-bold tracking-[0.06em] whitespace-nowrap"
        >
          Explore selected work <span className="text-lg text-accent" aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  )
}

export default Hero
