// A CONTROLLED component: it owns no state of its own.
//   value    -> how many stars are filled (the parent decides)
//   onChange -> a function it calls when a star is clicked (the parent updates)
// Same pattern as QuantityStepper: props down, events up.
function StarRating({ value, onChange, label }) {
  const stars = [1, 2, 3, 4, 5]

  return (
    <div role="group" aria-label={`Rating for ${label}`} className="flex">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          // Clicking the star that is already the current rating clears it back to 0.
          onClick={() => onChange(star === value ? 0 : star)}
          aria-label={`${star} out of 5 stars`}
          aria-pressed={star <= value}
          className={`cursor-pointer px-0.5 text-lg leading-none transition-colors hover:text-accent ${
            star <= value ? 'text-accent' : 'text-line'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default StarRating
