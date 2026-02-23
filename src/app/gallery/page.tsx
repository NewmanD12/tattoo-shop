// app/gallery/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'; // ← this is the slider
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

  const filteredImages = galleryImages.filter(
    (img) => activeArtist === 'All' || img.artist === activeArtist
  );

  // Slides for normal lightbox (non-cover-ups)
  const lightboxSlides = filteredImages
    .filter((img) => img.type !== 'cover-up')
    .map((img) => ({
      src: img.src,
      alt: img.alt,
      title: `${img.artist}${img.style ? ` • ${img.style}` : ''}`,
      description: img.description,
    }));

  // Handle image click: cover-up → slider modal, regular → lightbox
  const handleImageClick = (img: GalleryImage, index: number) => {
    if (img.type === 'cover-up' && 'beforeSrc' in img && img.beforeSrc) {
      setCoverUpModalImg(img);
    } else {
      setLightboxIndex(index);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Hero / Filter Section */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/80 to-gray-950 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-[var(--font-new-rocker)] text-amber-300 tracking-[0.08em] mb-16 text-center drop-shadow-2xl">
            GALLERY
          </h1>

          {/* Artist Filter Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10 mb-24">
            {artists.map((artist) => (
              <motion.button
                key={artist.name}
                onClick={() => setActiveArtist(artist.name)}
                className={`
                  group relative aspect-[3/4] rounded-2xl overflow-hidden
                  border-2 border-transparent transition-all duration-700
                  ${
                    activeArtist === artist.name
                      ? 'border-amber-500/70 shadow-2xl shadow-amber-900/60 scale-[1.04] z-10'
                      : 'hover:border-amber-500/30 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-950/40'
                  }
                `}
                whileHover={{ scale: 1.04, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Image
                  src={artist.photo}
                  alt={artist.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3
                    className={`
                      text-xl md:text-2xl font-[var(--font-new-rocker)] tracking-wider transition-colors
                      ${activeArtist === artist.name ? 'text-amber-300' : 'text-white group-hover:text-amber-300'}
                    `}
                  >
                    {artist.name}
                  </h3>
                </div>

                <div
                  className={`
                    absolute inset-0 rounded-2xl border-2 border-amber-500/0 transition-all duration-700 pointer-events-none
                    ${activeArtist === artist.name ? 'border-amber-500/60 shadow-[0_0_40px_8px] shadow-amber-600/30' : ''}
                  `}
                />
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
                onClick={() => handleImageClick(img, index)}
              >
                <div className="relative aspect-[3/4] md:aspect-[4/5]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <p className="text-amber-300 font-medium text-lg mb-1">
                    {img.artist}
                  </p>
                  {img.style && <p className="text-gray-400 text-sm">{img.style}</p>}
                  {img.type === 'cover-up' && (
                    <span className="inline-block mt-2 px-3 py-1 bg-amber-600/80 text-white text-xs rounded-full">
                      Cover-Up
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-32 text-gray-500 text-xl">
              No artwork uploaded for this artist yet.
            </div>
          )}
        </div>
      </section>

      {/* Normal Lightbox for regular images */}
      <Lightbox
        open={lightboxIndex !== null}
        close={() => setLightboxIndex(null)}
        slides={lightboxSlides}
        index={lightboxIndex ?? 0}
        controller={{ closeOnBackdropClick: true }}
        carousel={{ finite: false }}
      />

      {/* Cover-Up Slider Modal (draggable before/after) */}
      {coverUpModalImg && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm"
          onClick={() => setCoverUpModalImg(null)}
        >
          <div className="relative max-w-5xl w-full p-6 md:p-12" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white text-5xl hover:text-amber-300 transition-colors"
              onClick={() => setCoverUpModalImg(null)}
            >
              ×
            </button>

            <h3 className="text-3xl md:text-4xl font-[var(--font-new-rocker)] text-amber-300 mb-8 text-center">
              Cover-Up Transformation
            </h3>

            <ReactCompareSlider
              itemOne={
                <ReactCompareSliderImage
                  src={coverUpModalImg.beforeSrc || ''}
                  alt="Before"
                  width={1200}
                  height={1200}
                  style={{ objectFit: 'cover' }}
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src={coverUpModalImg.src}
                  alt="After"
                  width={1200}
                  height={1200}
                  style={{ objectFit: 'cover' }}
                />
              }
              position={50} // Starts centered
              handle={
                <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                  <span className="text-black text-2xl font-bold">↔</span>
                </div>
              }
              style={{ height: '70vh', width: '100%' }}
            />

            {/* Caption */}
            <p className="text-center mt-8 text-gray-300 text-xl">
              {coverUpModalImg.description}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}