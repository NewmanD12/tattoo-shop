// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Assuming you installed lucide-react

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#gallery', label: 'Gallery' },
    { href: '/artists', label: 'Artists' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Studio Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-2xl md:text-3xl font-black tracking-tight text-white">
              <span className="text-amber-500">INK</span>MOUNTAIN
            </span>
            {/* Optional small tagline or icon */}
            {/* <span className="text-xs text-gray-500 hidden md:block">Teays Valley, WV</span> */}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-amber-400 font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="mailto:bookings@yourstudio.com?subject=Consultation%20Request"
              className="bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-white font-semibold py-3 px-8 rounded-full transition transform hover:scale-105 shadow-md shadow-black/40"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-amber-400 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-950 border-b border-gray-800">
          <div className="px-6 py-5 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg text-gray-300 hover:text-amber-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="mailto:bookings@yourstudio.com?subject=Consultation%20Request"
              className="bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-white font-semibold py-4 px-8 rounded-full text-center transition transform hover:scale-105 shadow-md shadow-black/40"
              onClick={() => setIsOpen(false)}
            >
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}