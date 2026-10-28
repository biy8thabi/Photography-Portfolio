// The photos are the ones already in the repo's images/ folder.
// All gallery content lives here, as one array of objects.
// Gallery.jsx loops over this array, so adding a photo means adding one object —
// no copy-pasted JSX.
import photo1 from '../../images/WhatsApp Image 2026-10-14 at 19.01.31 (1).jpeg'
import photo2 from '../../images/WhatsApp Image 2026-10-14 at 19.01.31.jpeg'
import photo3 from '../../images/WhatsApp Image 2026-10-14 at 19.01.32 (1).jpeg'
import photo4 from '../../images/WhatsApp Image 2026-10-14 at 19.01.32 (3).jpeg'
import photo5 from '../../images/WhatsApp Image 2026-10-14 at 19.01.32.jpeg'
import photo6 from '../../images/WhatsApp Image 2026-10-14 at 19.01.33 (1).jpeg'
import photo7 from '../../images/WhatsApp Image 2026-10-14 at 19.01.33.jpeg'

// `position` is the object-position used with object-cover, so faces stay in
// frame when a photo is cropped into a 4:5 tile.
const photos = [
  {
    id: 1,
    src: photo1,
    alt: 'Woman with long black hair resting her chin on her hand, looking into the camera',
    title: 'Soft light, portrait study',
    category: 'Portraits',
    position: '50% 40%',
  },
  {
    id: 2,
    src: photo2,
    alt: 'Smiling woman with a full afro in warm sunlight, wearing a white ribbed top',
    title: 'Golden hour',
    category: 'Natural hair',
    position: '50% 25%',
  },
  {
    id: 3,
    src: photo3,
    alt: 'Woman with a large afro and gold choker in a houndstooth coat on a city street',
    title: 'City in motion',
    category: 'Editorial',
    position: '50% 15%',
  },
  {
    id: 4,
    src: photo4,
    alt: 'Close-up beauty portrait of a woman in a white hooded wrap with blue eyeshadow, against a peach background',
    title: 'First light',
    category: 'Editorial',
    position: '50% 50%',
  },
  {
    id: 5,
    src: photo5,
    alt: 'Woman with voluminous curly natural hair in front of a brick wall',
    title: 'Small things',
    category: 'Natural hair',
    position: '50% 45%',
  },
  {
    id: 6,
    src: photo6,
    alt: 'Woman with an afro and a yellow flower in her hair, wearing a brown and cream striped sweater',
    title: 'At ease',
    category: 'Natural hair',
    position: '50% 25%',
  },
  {
    id: 7,
    src: photo7,
    alt: 'Profile portrait of a woman with locs piled in a high bun against a soft beige background',
    title: 'Crown',
    category: 'Portraits',
    position: '50% 65%',
  },
]

export default photos
