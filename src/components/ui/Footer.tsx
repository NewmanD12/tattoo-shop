// src/components/Footer.tsx
import Link from 'next/link';
import { Instagram } from 'lucide-react'; // Assuming lucide-react is installed

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-amber-900/30 text-gray-400">
      {/* Top Divider - subtle mountain/metal line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-amber-900/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center md:text-left">
          {/* Left: Brand & Tagline */}
          <div>
            <Link href="/" className="inline-block">
              <h3 className="text-3xl md:text-4xl font-[var(--font-new-rocker)] text-amber-300 tracking-wider mb-3">
                INK OF THE MOUNTAINS
              </h3>
            </Link>
            <p className="text-sm md:text-base text-gray-500">
              Custom tattoos & piercing in Teays Valley, West Virginia.<br />
              Where stories meet skin under Appalachian skies.
            </p>
          </div>

          {/* Middle: Quick Links */}
          <div>
            <h4 className="text-lg font-medium text-amber-400 mb-6 md:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm md:text-base">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/artists" className="hover:text-amber-300 transition-colors">
                  Artists
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-300 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-300 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Right: Social & Contact */}
          <div>
            <h4 className="text-lg font-medium text-amber-400 mb-6 md:mb-4">
              Connect
            </h4>
            <div className="flex justify-center md:justify-start gap-6 mb-6">
              <a
                href="https://instagram.com/yourstudiohandle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-300 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={28} />
              </a>
              {/* Add more socials if needed */}
              {/* <a href="#" className="text-gray-400 hover:text-amber-300"><Facebook size={28} /></a> */}
            </div>

            <p className="text-sm">
              Email: bookings@yourstudio.com<br />
              Walk-ins welcome • Appointments preferred
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} Ink of the Mountains Tattoo Studio • Teays Valley, West Virginia
          </p>
          <p className="mt-2">
            All artwork © respective artists • No reproduction without permission
          </p>
        </div>
      </div>
    </footer>
  );
}