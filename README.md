# Thabisa Biyela — Photography Portfolio (Assignment 2)

Vite + React + Tailwind rebuild of the Assignment 1 site. No TypeScript, no extra libraries, data hardcoded.

## Run it

```bash
npm install
npm run dev      # development
npm run build    # production build into dist/
```

## Structure

```
src/
  data/photos.js          the array of photo objects (single source of truth)
  components/
    Header.jsx  Hero.jsx  Gallery.jsx  About.jsx  Contact.jsx  Footer.jsx
    PhotoCard.jsx         one tile (props only)
    StarRating.jsx        the controlled component
  App.jsx                 arranges the components
  index.css               @import "tailwindcss" + theme colours (replaces styles.css)
images/                   the photos (imported by src/data/photos.js)
```

## How the state works (assessment notes)

**`useState` in `Gallery.jsx`**
- `const [activeCategory, setActiveCategory] = useState('All')` — a value React remembers between renders, plus a function to change it.
- Clicking a filter button calls `setActiveCategory(category)`. React re-runs `Gallery`, `activeCategory` has the new value, and `photos.filter(...)` produces a different `visiblePhotos` list.
- `visiblePhotos` is not state. It is derived from state + data on every render, so it can never get out of sync.
- `ratings` is a second piece of state: an object like `{ 1: 4, 6: 2 }` keyed by photo id.
- It lives in `Gallery`, not in each card, because filtered-out cards are unmounted and would lose their own state. Keeping it in the parent means ratings survive filtering.
- `setRatings(previous => ({ ...previous, [id]: value }))` copies the old object and changes one key. State must never be mutated directly, or React wouldn't notice the change.

**Controlled component: `StarRating.jsx`**
- It has no `useState`. It is told what to show (`value`) and told what to call when clicked (`onChange`).
- Flow: click star → `onChange(n)` → `Gallery.handleRate` → `setRatings` → `Gallery` re-renders → new `value` flows down as a prop → stars repaint.
- The parent is the single source of truth. This is the same pattern as `QuantityStepper`.
- It is reused once per photo, each with its own `value` and `onChange`.

## Mobile-first Tailwind
Unprefixed classes are the phone layout. `sm:` (640px), `md:` (768px) and `lg:` (1024px) only add changes as the screen gets wider. Example from the gallery: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`.

## Suggested commit sequence
Commit as you go with messages like these:
1. `Scaffold Vite + React project`
2. `Add Tailwind and remove default styles`
3. `Add photos data file that imports from images/`
4. `Extract Header, Hero and Footer components`
5. `Build Gallery rendering from photos array`
6. `Add category filter with useState`
7. `Add StarRating controlled component and wire up ratings`
8. `Add About and Contact sections`
9. `Mobile-first responsive pass and overflow check`

## Notes
- The photos are stand-ins from reference images. Get permission or use your own before publishing publicly.
- The contact links are `mailto:` links.
