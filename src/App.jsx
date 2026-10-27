import Header from './components/Header'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

// App only arranges the pieces. <main> holds the page content;
// the header and footer sit outside it as landmarks.
function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-bg font-sans text-ink antialiased">
      <Header />
      <main>
        <Hero />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
