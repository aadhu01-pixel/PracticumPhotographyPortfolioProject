export const sessionsData = [
  {
    slug: 'portrait-session',
    title: 'Portrait Session',
    category: 'Portrait',
    description: 'Professional portrait photography in a beautiful natural setting.',
    duration: '1-2 hours',
    deliverables: '30+ edited high-resolution photos, delivered within 1 week',
    priceCents: 25000, // $250
    imageUrl: '/images/products/pexels-petemiller-35045742.jpg',
    imageAlt: 'Portrait Photo',
  },
  {
    slug: 'wedding-coverage',
    title: 'Wedding Coverage',
    category: 'Wedding',
    description: 'Full-day wedding photography to capture all the special moments.',
    duration: 'Up to 10 hours',
    deliverables: '400+ edited high-resolution photos and an online gallery, delivered within 4 weeks',
    priceCents: 250000, // $2,500
    imageUrl: '/images/products/jose-nicdao-I56x7QeaZs8-unsplash.jpg',
    imageAlt: 'Wedding Photo',
  },
  {
    slug: 'event-photography',
    title: 'Event Photography',
    category: 'Event',
    description: 'Capturing the essence of your event with high-quality images.',
    duration: '2-6 hours',
    deliverables: '100+ edited high-resolution photos, delivered within 2 weeks',
    priceCents: 60000, // $600
    imageUrl: '/images/products/pablo-heimplatz-ZODcBkEohk8-unsplash.jpg',
    imageAlt: 'Event Photo',
  },
]

// In gallery order. sessionSlug links a photo to a session (null = gallery only).
export const photosData = [
  {
    url: '/images/gallery/festival.jpg',
    alt: 'Crowd at an outdoor festival lit by the setting sun',
    sessionSlug: 'event-photography',
  },
  {
    url: '/images/gallery/seaside.jpg',
    alt: 'Young woman in a black coat looking out over the sea',
    sessionSlug: 'portrait-session',
  },
  {
    url: '/images/gallery/trench-coat.jpg',
    alt: 'Woman in a beige trench coat beside her shadow on a sunlit wall',
    sessionSlug: 'portrait-session',
  },
  {
    url: '/images/gallery/portrait-man.jpg',
    alt: 'Portrait of a smiling man with curly grey hair',
    sessionSlug: 'portrait-session',
  },
  {
    url: '/images/gallery/valley.jpg',
    alt: 'Misty mountain valley and river at sunrise',
    sessionSlug: null,
  },
  {
    url: '/images/gallery/wedding-toast.jpg',
    alt: 'Wedding guests raising glasses for a toast',
    sessionSlug: 'wedding-coverage',
  },
]
