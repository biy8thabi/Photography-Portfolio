// Sticky site header. Unprefixed classes are the phone layout (stacked);
// sm: switches to one row once the screen is at least 640px wide.
function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg/95">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-[min(1160px,100%-2rem)] flex-col justify-center gap-2 py-3 sm:min-h-[76px] sm:w-[min(1160px,100%-3rem)] sm:flex-row sm:items-center sm:justify-between sm:gap-6"
      >
        <a
          href="#home"
          className="text-sm font-bold uppercase tracking-[0.13em] whitespace-nowrap"
        >
          Thabisa Biyela / Photo
        </a>
        <div className="flex w-full items-center justify-between gap-2 text-[0.68rem] uppercase tracking-[0.08em] sm:w-auto sm:gap-8 sm:text-xs">
          <a href="#work" className="text-muted transition-colors hover:text-accent">
            Selected work
          </a>
          <a href="#about" className="text-muted transition-colors hover:text-accent">
            About
          </a>
          <a
            href="#contact"
            className="border-b border-accent pb-1 text-ink transition-colors hover:text-accent"
          >
            Book a shoot ↗
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Header
