// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">

      {/* Hero Section - West Virginia grounded feel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background image - replace with your own WV-inspired tattoo photo or mountain scene */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/tattooHero.jpg"  // ← Your large Japanese back piece in natural/outdoor setting
            alt="Japanese back piece in Appalachian light"
            fill
            className="object-cover brightness-75 contrast-110"
            priority
          />
          {/* Natural foggy fade from bottom - earthy instead of neon */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6 leading-none text-white">
            <span className="block">INK OF THE</span>
            <span className="block text-amber-300">MOUNTAINS</span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-light text-gray-300 mb-10 max-w-3xl mx-auto">
            Custom tattoos rooted in Beckley, West Virginia.
            <br className="hidden sm:block" />
            Where stories meet skin under Appalachian skies.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="#gallery"  // or /gallery later
              className="bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-white font-bold py-5 px-12 rounded-full text-lg transition transform hover:scale-105 shadow-xl shadow-black/50"
            >
              See the Work
            </Link>

            <Link
              href="mailto:bookings@yourstudio.com?subject=Consultation%20Request"
              className="border-2 border-amber-600 text-amber-400 hover:bg-amber-900/30 font-bold py-5 px-12 rounded-full text-lg transition"
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        {/* Scroll indicator - subtle mountain fog feel */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Teaser Section - earthy WV tone */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Hand-Crafted. <span className="text-amber-500">Mountain-Born.</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Specializing in Japanese irezumi, American traditional, realism, and custom cover-ups. 
              Every line is drawn with respect for the craft and the hills we call home — right here in Beckley.
            </p>

            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="text-amber-500 text-2xl">✓</span> Walk-ins for small flash pieces
              </li>
              <li className="flex items-center gap-3">
                <span className="text-amber-500 text-2xl">✓</span> Free consultations, no pressure
              </li>
              <li className="flex items-center gap-3">
                <span className="text-amber-500 text-2xl">✓</span> Clean, private studio — WV standards
              </li>
            </ul>
          </div>

          {/* Right side image - use a strong tattoo or WV nature shot */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-gray-800">
            <Image
              src="/tattoo1.png"
              alt="Jurrasic Park Arm Sleeve"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}