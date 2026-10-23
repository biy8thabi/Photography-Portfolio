import StarRating from './StarRating'

// One gallery tile. It is "dumb": everything it shows comes in as props,
// and the rating it displays is owned by Gallery.
function PhotoCard({ photo, rating, onRate }) {
  return (
    <figure className="m-0 min-w-0">
      {/* aspect-[4/5] gives every tile a definite shape, so object-cover can crop to fill it. */}
      <div className="aspect-[4/5] overflow-hidden bg-line">
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          style={{ objectPosition: photo.position }}
          className="h-full w-full object-cover transition-transform duration-500 motion-safe:hover:scale-[1.035]"
        />
      </div>
      <figcaption className="flex flex-col gap-1 pt-2.5 text-xs sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div>
          <p>{photo.title}</p>
          <p className="text-muted">{photo.category}</p>
        </div>
        <StarRating value={rating} onChange={onRate} label={photo.title} />
      </figcaption>
    </figure>
  )
}

export default PhotoCard
