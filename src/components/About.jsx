function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-y border-line bg-paper py-14 sm:py-20"
    >
      <div className="mx-auto grid w-[min(1160px,100%-2rem)] gap-7 sm:w-[min(1160px,100%-3rem)] md:grid-cols-[1fr_1.2fr] md:items-start md:gap-16">
        <div>
          <p className="mb-4 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-accent">
            A little about me
          </p>
          <h2 id="about-title" className="font-serif text-3xl font-normal tracking-[-0.035em] sm:text-4xl">
            People, places
            <br />
            and honest moments.
          </h2>
        </div>
        <div className="max-w-[550px]">
          <p className="mb-4 font-serif text-xl leading-snug">
            I’m Thabisa, a photographer drawn to natural light, thoughtful
            details, and images that feel like memories.
          </p>
          <p className="mb-4 text-muted">
            I work with individuals, creatives, and small brands to make
            photographs that feel personal rather than posed. Based in Durban
            and available for projects across South Africa.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 border-b border-accent pb-1.5 text-[0.82rem] font-bold tracking-[0.06em] whitespace-nowrap"
          >
            Let’s make something <span className="text-lg text-accent" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default About
