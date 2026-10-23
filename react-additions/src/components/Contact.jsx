function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto w-[min(1160px,100%-2rem)] py-16 sm:w-[min(1160px,100%-3rem)] lg:py-28"
    >
      <div className="grid gap-7 md:grid-cols-2 md:items-end md:gap-10">
        <div>
          <p className="mb-4 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-accent">
            Have a project in mind?
          </p>
          <h2 id="contact-title" className="font-serif text-3xl font-normal tracking-[-0.035em] sm:text-4xl">
            Let’s talk.
          </h2>
          <p className="mt-4 max-w-[390px] text-muted">
            For portraits, collaborations, or bookings, send a note with a
            little about what you have in mind.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3">
          <span className="text-[0.7rem] tracking-[0.14em] text-muted uppercase">
            Bookings &amp; enquiries
          </span>
          <a
            href="mailto:thabisabiyela234@gmail.com?subject=Photography%20enquiry"
            className="font-serif text-xl break-words transition-colors [overflow-wrap:anywhere] hover:text-accent sm:text-2xl lg:text-3xl"
          >
            thabisabiyela234@gmail.com
          </a>
          <a
            href="mailto:thabisabiyela234@gmail.com?subject=Book%20a%20shoot"
            className="inline-flex items-center gap-3 border-b border-accent pb-1.5 text-[0.82rem] font-bold tracking-[0.06em] whitespace-nowrap transition-colors hover:text-accent"
          >
            Book a shoot <span className="text-lg text-accent" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
