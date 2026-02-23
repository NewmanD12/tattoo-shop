// data/gallery.ts

export type GalleryImage = {
  id: string;                    // unique identifier (e.g. 'jax-dragon-01')
  src: string;                   // path to image, e.g. '/gallery/jax-dragon-back.jpg'
  alt: string;                   // descriptive alt text for accessibility + SEO
  artist: string;                // must exactly match one of the artist names
  style?: string;                // optional: helps with future filtering
  description?: string;          // optional: short caption or story
  date?: string;                 // optional: e.g. '2025-11' for sorting later
  featured?: boolean;            // optional: mark images to show in hero/featured section
};

export const galleryImages: GalleryImage[] = [
  // Jax Harlan
  {
    id: 'jax-01',
    src: '/japaneseBackPiece.jpg',
    alt: 'Massive Japanese dragon full back piece by Jax Harlan',
    artist: 'Jax Harlan',
    style: 'Japanese Irezumi',
    description: 'Full back dragon with waves and cherry blossoms – 18-hour session',
    date: '2025-10',
    featured: true,
  },
  {
    id: 'jax-02',
    src: '/chestPiece.jpg',
    alt: 'Bold blackwork chest panel by Jax Harlan',
    artist: 'Jax Harlan',
    style: 'Blackwork',
    description: 'Geometric mountain-inspired chest piece',
    date: '2025-09',
  },
  // {
  //   id: 'jax-03',
  //   src: '/japaneseBackPiece.jpg',
  //   alt: 'Massive Japanese dragon full back piece by Jax Harlan',
  //   artist: 'Jax Harlan',
  //   style: 'Japanese Irezumi',
  //   description: 'Full back dragon with waves and cherry blossoms – 18-hour session',
  //   date: '2025-10',
  //   featured: true,
  // },
  // {
  //   id: 'jax-04',
  //   src: '/chestPiece.jpg',
  //   alt: 'Bold blackwork chest panel by Jax Harlan',
  //   artist: 'Jax Harlan',
  //   style: 'Blackwork',
  //   description: 'Geometric mountain-inspired chest piece',
  //   date: '2025-09',
  // },
  // {
  //   id: 'jax-05',
  //   src: '/japaneseBackPiece.jpg',
  //   alt: 'Massive Japanese dragon full back piece by Jax Harlan',
  //   artist: 'Jax Harlan',
  //   style: 'Japanese Irezumi',
  //   description: 'Full back dragon with waves and cherry blossoms – 18-hour session',
  //   date: '2025-10',
  //   featured: true,
  // },
  // {
  //   id: 'jax-06',
  //   src: '/chestPiece.jpg',
  //   alt: 'Bold blackwork chest panel by Jax Harlan',
  //   artist: 'Jax Harlan',
  //   style: 'Blackwork',
  //   description: 'Geometric mountain-inspired chest piece',
  //   date: '2025-09',
  // },
  // {
  //   id: 'jax-07',
  //   src: '/japaneseBackPiece.jpg',
  //   alt: 'Massive Japanese dragon full back piece by Jax Harlan',
  //   artist: 'Jax Harlan',
  //   style: 'Japanese Irezumi',
  //   description: 'Full back dragon with waves and cherry blossoms – 18-hour session',
  //   date: '2025-10',
  //   featured: true,
  // },
  // {
  //   id: 'jax-08',
  //   src: '/chestPiece.jpg',
  //   alt: 'Bold blackwork chest panel by Jax Harlan',
  //   artist: 'Jax Harlan',
  //   style: 'Blackwork',
  //   description: 'Geometric mountain-inspired chest piece',
  //   date: '2025-09',
  // },

  // Riven Cole
  {
    id: 'riven-01',
    src: '/colorRealism.jpg',
    alt: 'Vibrant color realism portrait tattoo by Riven Cole',
    artist: 'Riven Cole',
    style: 'Color Realism',
    description: 'Custom portrait of client’s late grandmother – healed 6 months',
    date: '2025-11',
    featured: true,
  },
  {
    id: 'riven-02',
    src: '/neotrad.jpg',
    alt: 'Neo-traditional floral sleeve by Riven Cole',
    artist: 'Riven Cole',
    style: 'Neo-Traditional',
    description: 'Bright neo-traditional flowers and birds sleeve',
    date: '2025-08',
  },

  // Silas Crowe
  {
    id: 'silas-01',
    src: '/roseAnchor.jpg',
    alt: 'Classic American traditional rose and anchor by Silas Crowe',
    artist: 'Silas Crowe',
    style: 'Traditional American',
    description: 'Old-school sailor style forearm piece',
    date: '2025-10',
  },
  {
    id: 'silas-02',
    src: '/blackGrey1.jpg',
    alt: 'Hyper-detailed black and gray portrait by Silas Crowe',
    artist: 'Silas Crowe',
    style: 'Black & Gray Portraits',
    description: 'Portrait of client’s dog in fine black & gray',
    date: '2025-07',
    featured: true,
  },

  // Luna Voss (piercings – you can include healed piercing photos or jewelry shots)
  {
    id: 'luna-01',
    src: '/piercings1.jpg',
    alt: 'Custom dermal anchors and surface piercings by Luna Voss',
    artist: 'Luna Voss',
    style: 'Dermal Anchors',
    description: 'Stacked dermal anchors on collarbone – fresh + healed shots',
    date: '2025-11',
  },
  {
    id: 'luna-02',
    src: '/daith-rook.jpg',
    alt: 'Daith and rook combination piercing by Luna Voss',
    artist: 'Luna Voss',
    style: 'Ear Piercings',
    description: 'Curated ear constellation with custom jewelry',
    date: '2025-09',
  },

  // Add more images here – aim for 12–30 total to start
];