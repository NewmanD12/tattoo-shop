'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

import { galleryImages, type GalleryImage } from '@/data/gallery';

const artists = [
  { name: 'All', photo: '/group.jpg' },
  { name: 'Jax Harlan', photo: '/jax.jpg' },
  { name: 'Riven Cole', photo: '/riven.jpg' },
  { name: 'Silas Crowe', photo: '/silas.jpg' },
  { name: 'Luna Voss', photo: '/luna.jpg' },
];

export default function GalleryPage() {
  const [activeArtist, setActiveArtist] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [coverUpModalImg, setCoverUpModalImg] = useState<GalleryImage | null>(null);
  const [allImages, setAllImages] = useState<any[]>(galleryImages);

  // Load Instagram posts
  useEffect(() => {
    fetch('/api/instagram-posts')
      .then(res => res.json())
      .then(posts => {
        console.log("✅ Loaded from DB:", posts);
        setAllImages([...galleryImages, ...posts]);
      })
      .catch(err => console.error(err));
  }, []);

  const filteredImages = allImages.filter(img => 
    activeArtist === 'All' || img.artist === activeArtist
  );

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/80 to-gray-950 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-[var(--font-new-rocker)] text-amber-300 tracking-[0.08em] mb-16 text-center drop-shadow-2xl">
            GALLERY
          </h1>

          {/* Artist Filters */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10 mb-24">
            {artists.map((artist) => (
              <motion.button
                key={artist.name}
                onClick={() => setActiveArtist(artist.name)}
                className={`group relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-transparent transition-all duration-700 ${
                  activeArtist === artist.name ? 'border-amber-500/70 shadow-2xl shadow-amber-900/60 scale-[1.04] z-10' : 'hover:border-amber-500/30 hover:scale-[1.02]'
                }`}
                whileHover={{ scale: 1.04, rotate: 1 }}
              >
                <Image src={artist.photo} alt={artist.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 p-6 w-full">
                  <h3 className={`text-xl md:text-2xl font-[var(--font-new-rocker)] ${activeArtist === artist.name ? 'text-amber-300' : 'text-white'}`}>
                    {artist.name}
                  </h3>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 md:px-12 lg:px-24 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
            {filteredImages.map((img, index) => (
              <div
                key={img.id}
                className="break-inside-avoid group relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 hover:shadow-amber-900/40 transition-shadow duration-500 cursor-pointer"
                onClick={() => console.log('Clicked:', img)} // temporary
              >
                <div className="relative aspect-[3/4] md:aspect-[4/5]">
                  <Image
                    src={img.media_url || img.mediaUrl || img.src}
                    alt={img.caption || 'Tattoo'}
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                  <p className="text-amber-300 font-medium">{img.artist || 'All'}</p>
                  {img.caption && <p className="text-sm text-gray-300 line-clamp-2 mt-1">{img.caption}</p>}
                  <span className="inline-block mt-3 px-3 py-1 bg-blue-600/80 text-xs rounded-full w-fit">Instagram</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}