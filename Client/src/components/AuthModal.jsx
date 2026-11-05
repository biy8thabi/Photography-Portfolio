import { useEffect, useState } from 'react'
import { authClient } from '../lib/auth-client'

// A pop-up with one form that works as either "Sign in" or "Create account".
// Props: onClose is a function from the parent (App) that hides the pop-up.
function AuthModal({ onClose }) {
  // Which version of the form is showing.
  const [mode, setMode] = useState('signin') // 'signin' or 'signup'

  // The form fields. These inputs are CONTROLLED: React state holds the value,
  // value={...} shows it, and onChange updates it on every keystroke.
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Feedback for the user.
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const isSignUp = mode === 'signup'

  // Close the pop-up when the Escape key is pressed.
  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey) // clean up when it closes
  }, [onClose])

  async function handleSubmit(event) {
    event.preventDefault() // stop the browser reloading the page
    setError('')
    setSubmitting(true)

    // Better Auth returns { data, error } instead of throwing.
    const result = isSignUp
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password })

    setSubmitting(false)

    if (result.error) {
      setError(result.error.message || 'Something went wrong. Please try again.')
      return
    }
    onClose() // success: the header updates by itself because the session changed
  }

  const inputClass =
    'w-full border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-accent'

  return (
    // The dark backdrop. Clicking it closes the pop-up.
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-ink/50 p-4"
      onClick={onClose}
    >
      {/* stopPropagation: clicks inside the box must not reach the backdrop. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className="w-full max-w-sm border border-line bg-paper p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-baseline justify-between">
          <h2 id="auth-title" className="font-serif text-2xl tracking-[-0.03em]">
            {isSignUp ? 'Create account' : 'Sign in'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer text-xl leading-none text-muted hover:text-accent"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {isSignUp && (
            <label className="flex flex-col gap-1 text-xs text-muted">
              Name
              <input
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={inputClass}
              />
            </label>
          )}

          <label className="flex flex-col gap-1 text-xs text-muted">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1 text-xs text-muted">
            Password
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClass}
            />
          </label>

          {error && <p className="text-sm text-accent">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 cursor-pointer bg-ink px-4 py-2.5 text-xs font-bold tracking-[0.08em] text-bg uppercase transition-colors hover:bg-accent disabled:opacity-60"
          >
            {submitting ? 'Please wait…' : isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <p className="mt-4 text-xs text-muted">
          {isSignUp ? 'Already have an account?' : 'New here?'}{' '}
          <button
            type="button"
            onClick={() => {
              setMode(isSignUp ? 'signin' : 'signup')
              setError('')
            }}
            className="cursor-pointer text-ink underline hover:text-accent"
          >
            {isSignUp ? 'Sign in' : 'Create an account'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default AuthModal