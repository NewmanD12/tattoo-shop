// app/services/page.tsx
import { Scissors, Palette, Sparkles, HeartPulse, Gem, Zap } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    category: 'Tattoo Services',
    icon: Scissors,
    items: [
      {
        name: 'Custom Tattoo Design & Application',
        description: 'Fully custom piece from sketch to skin. Includes consultation, stencil, and full session(s).',
        priceRange: '$150–$800+ (depends on size/complexity)',
        time: '2–8+ hours (may require multiple sessions)',
      },
      {
        name: 'Japanese Irezumi / Large-Scale Work',
        description: 'Specialized full back, chest, sleeve, or leg pieces in traditional Japanese style.',
        priceRange: '$400–$2,000+',
        time: 'Multiple sessions (8–30+ hours total)',
      },
      {
        name: 'Neo-Traditional & Color Realism',
        description: 'Bold outlines with vibrant color packing or hyper-realistic portraits.',
        priceRange: '$200–$1,200+',
        time: '3–12+ hours',
      },
      {
        name: 'Blackwork & Geometric',
        description: 'Clean black ink only – dotwork, linework, sacred geometry, or large solid black pieces.',
        priceRange: '$150–$900+',
        time: '2–10+ hours',
      },
      {
        name: 'Traditional American / Old School',
        description: 'Classic bold outlines, limited color palette – roses, anchors, swallows, etc.',
        priceRange: '$100–$600+',
        time: '1–6 hours',
      },
      {
        name: 'Cover-Ups & Reworks',
        description: 'Transforming old or unwanted tattoos into new artwork.',
        priceRange: '$200–$1,500+ (depends on original tattoo)',
        time: 'Varies',
      },
      {
        name: 'Flash / Small Pieces & Walk-Ins',
        description: 'Pre-drawn designs available for quick sessions.',
        priceRange: '$80–$250',
        time: '30 min – 2 hours',
      },
    ],
  },
  {
    category: 'Piercing Services',
    icon: Gem,
    items: [
      {
        name: 'Ear Piercings (Lobe, Helix, Daith, Rook, Tragus, Conch, etc.)',
        description: 'Single or curated multiple placements. Includes high-quality titanium or gold jewelry.',
        priceRange: '$40–$120 per piercing (jewelry included)',
        time: '15–30 min',
      },
      {
        name: 'Daith & Rook Combination',
        description: 'Curated inner cartilage constellation – perfect stacked look.',
        priceRange: '$100–$180 (two piercings + jewelry)',
        time: '30–45 min',
      },
      {
        name: 'Facial Piercings (Nose, Septum, Lip, Eyebrow, etc.)',
        description: 'Precision placement with implant-grade jewelry.',
        priceRange: '$50–$150',
        time: '15–30 min',
      },
      {
        name: 'Dermal Anchors & Surface Piercings',
        description: 'Microdermal or surface bars for collarbone, chest, wrist, etc.',
        priceRange: '$80–$200 per anchor',
        time: '30–60 min',
      },
      {
        name: 'Body Piercings (Navel, Nipple, etc.)',
        description: 'Professional and hygienic placement.',
        priceRange: '$60–$150',
        time: '20–40 min',
      },
    ],
  },
  {
    category: 'Additional Services',
    icon: HeartPulse,
    items: [
      {
        name: 'Piercing Aftercare Consultation',
        description: 'Follow-up check and advice (free with piercing, $20 standalone).',
        priceRange: 'Free / $20',
        time: '15–30 min',
      },
      {
        name: 'Tattoo Touch-Ups',
        description: 'Refreshing faded lines or color on existing work.',
        priceRange: '$50–$200',
        time: '30 min – 2 hours',
      },
      {
        name: 'Consultation (Tattoo or Piercing)',
        description: 'In-person discussion of ideas, placement, and pricing.',
        priceRange: 'Free',
        time: '30–60 min',
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-200">
      {/* Header */}
      <section className="py-20 md:py-32 px-6 text-center border-b border-amber-900/30 bg-gray-950">
        <h1 className="text-5xl md:text-7xl font-[var(--font-new-rocker)] text-amber-300 tracking-wider mb-6">
          SERVICES
        </h1>
        <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-400">
          Premium custom tattoos and professional piercings in Teays Valley, West Virginia.
          <br className="hidden md:block" />
          Every piece is hand-crafted with respect for the craft and your story.
        </p>
      </section>

      {/* Services Sections */}
      {services.map((category, catIndex) => (
        <section
          key={category.category}
          className={`
            py-16 md:py-24 px-6
            ${catIndex % 2 === 0 ? 'bg-gray-950' : 'bg-gray-900'}
            border-b border-amber-900/30
          `}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <category.icon size={40} className="text-amber-500" />
              <h2 className="text-4xl md:text-5xl font-[var(--font-new-rocker)] text-white tracking-wide">
                {category.category}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((service) => (
                <div
                  key={service.name}
                  className="bg-gray-900/80 border border-gray-800 rounded-xl p-8 shadow-xl shadow-black/50 hover:shadow-amber-900/30 transition-all duration-300"
                >
                  <h3 className="text-2xl font-medium text-amber-300 mb-4">
                    {service.name}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-3 text-sm">
                    <p className="flex items-center gap-2">
                      <span className="text-amber-500 font-bold">Price:</span>
                      <span>{service.priceRange}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-amber-500 font-bold">Time:</span>
                      <span>{service.time}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-gray-950 to-black">
        <h2 className="text-4xl md:text-5xl font-[var(--font-new-rocker)] text-amber-300 mb-8">
          Ready to Get Inked or Pierced?
        </h2>
        <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
          Book a free consultation or walk in for small flash/piercings.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="mailto:bookings@yourstudio.com?subject=Consultation%20Request"
            className="bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-white font-bold py-5 px-12 rounded-full text-lg transition transform hover:scale-105 shadow-xl shadow-amber-900/40"
          >
            Book Consultation
          </Link>
          <Link
            href="/artists"
            className="border-2 border-amber-600 text-amber-400 hover:bg-amber-900/30 font-bold py-5 px-12 rounded-full text-lg transition"
          >
            Meet the Artists
          </Link>
        </div>
      </section>
    </main>
  );
}