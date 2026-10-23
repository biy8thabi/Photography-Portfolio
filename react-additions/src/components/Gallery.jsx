import { useState } from 'react'
import photos from '../data/photos'
import PhotoCard from './PhotoCard'

// Build the filter buttons from the data itself: "All" plus each unique category.
const categories = ['All', ...new Set(photos.map((photo) => photo.category))]

function Gallery() {
  // STATE 1 — which filter is active. Changing it re-renders Gallery.
  const [activeCategory, setActiveCategory] = useState('All')

  // STATE 2 — the ratings, as an object keyed by photo id, e.g. { 1: 5, 4: 3 }.
  // It lives HERE (not inside each card) so a rating survives when a card
  // disappears from the grid because of the filter.
  const [ratings, setRatings] = useState({})

  // Derived data: not state, just recalculated on every render from the state above.
  const visiblePhotos =
    activeCategory === 'All'
      ? photos
      : photos.filter((photo) => photo.category === activeCategory)

  // Pass the previous object through the updater form so we never mutate state directly.
  function handleRate(photoId, newRating) {
    setRatings((previous) => ({ ...previous, [photoId]: newRating }))
  }

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="mx-auto w-[min(1160px,100%-2rem)] pt-6 pb-16 sm:w-[min(1160px,100%-3rem)] lg:pb-28"
    >
      <div className="mb-6 flex flex-col items-start gap-1 border-b border-line pb-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-5">
        <h2 id="work-title" className="font-serif text-3xl font-normal tracking-[-0.035em] sm:text-4xl">
          Selected work
        </h2>
        <p className="text-xs text-muted">A collection of moments, 2023—2026</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter photos by category">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            aria-pressed={category === activeCategory}
            className={`cursor-pointer border px-4 py-1.5 text-xs tracking-[0.06em] uppercase transition-colors ${
              category === activeCategory
                ? 'border-ink bg-ink text-bg'
                : 'border-line text-muted hover:border-accent hover:text-accent'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Mobile-first grid: 2 columns by default, 3 from md (768px), 4 from lg (1024px). */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-4 lg:grid-cols-4">
        {visiblePhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            rating={ratings[photo.id] ?? 0}
            onRate={(newRating) => handleRate(photo.id, newRating)}
          />
        ))}
      </div>
    </section>
  )
}

export default Gallery
