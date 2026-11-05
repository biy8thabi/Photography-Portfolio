import { authClient } from '../lib/auth-client'

// Sticky site header. Unprefixed classes are the phone layout;
// sm: switches to one row once the screen is at least 640px wide.
// onSignInClick comes from App and opens the sign-in pop-up.
function Header({ onSignInClick }) {
  // useSession is a hook: it re-renders this component whenever the login state changes.
  // data is the session (or null when signed out); isPending is true while it is checked.
  const { data: session, isPending } = authClient.useSession()

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg/95">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-[min(1160px,100%-2rem)] flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3 sm:min-h-[76px] sm:w-[min(1160px,100%-3rem)] sm:flex-nowrap sm:gap-8"
      >
        <a
          href="#home"
          className="order-1 text-sm font-bold uppercase tracking-[0.13em] whitespace-nowrap"
        >
          Thabisa Biyela / Photo
        </a>

        {/* On a phone the links drop to their own row (w-full, order-3). */}
        <div className="order-3 flex w-full items-center justify-between gap-2 text-[0.68rem] uppercase tracking-[0.08em] sm:order-2 sm:ml-auto sm:w-auto sm:gap-8 sm:text-xs">
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

        {/* Signed-in state: shows "Sign out" when there is a session, "Sign in" when not. */}
        <div className="order-2 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.08em] sm:order-3 sm:text-xs">
          {isPending ? null : session ? (
            <>
              <span className="max-w-[9rem] truncate normal-case tracking-normal text-muted">
                Hi, {session.user.name}
              </span>
              <button
                type="button"
                onClick={() => authClient.signOut()}
                className="cursor-pointer border border-line px-3 py-1.5 transition-colors hover:border-accent hover:text-accent"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onSignInClick}
              className="cursor-pointer border border-ink bg-ink px-3 py-1.5 text-bg transition-colors hover:border-accent hover:bg-accent"
            >
              Sign in
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
