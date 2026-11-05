import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'

// App arranges the pieces. <main> holds the page content;
// the header and footer sit outside it as landmarks.
function App() {
  // Is the sign-in pop-up open? App owns this, so Header can open it
  // and AuthModal can close it, via props.
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <div className="min-h-screen overflow-x-clip bg-bg font-sans text-ink antialiased">
      <Header onSignInClick={() => setAuthOpen(true)} />
      <main>
        <Hero />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </div>
  )
}

export default App