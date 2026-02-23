// app/contact/page.tsx
'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    artist: 'Any',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate sending (replace with real API/email service later)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (formData.name && formData.email && formData.message) {
      setStatus('success');
      setFormData({ name: '', email: '', artist: 'Any', message: '' });
    } else {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-200">
      {/* Header */}
      <section className="py-20 md:py-32 px-6 text-center border-b border-amber-900/30 bg-gray-950">
        <h1 className="text-5xl md:text-7xl font-[var(--font-new-rocker)] text-amber-300 tracking-wider mb-6">
          GET IN TOUCH
        </h1>
        <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-400">
          Ready to start your next piece? Drop us a line for a free consultation, walk-in info, or questions.
          <br className="hidden md:block" />
          We're here in Beckley, WV — let's make some art.
        </p>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Info & Map */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-[var(--font-new-rocker)] text-white mb-8">
                Find Us
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin size={28} className="text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-lg font-medium">Beckley, West Virginia</p>
                    <p className="text-gray-400">(Exact address provided after consultation)</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone size={28} className="text-amber-500" />
                  <a href="tel:+13045551234" className="text-lg hover:text-amber-300 transition">
                    (304) 555-1234
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <Mail size={28} className="text-amber-500" />
                  <a href="mailto:bookings@inkofthemountains.com" className="text-lg hover:text-amber-300 transition">
                    bookings@inkofthemountains.com
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <Instagram size={28} className="text-amber-500" />
                  <a
                    href="https://instagram.com/inkofthemountains"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg hover:text-amber-300 transition"
                  >
                    @inkofthemountains
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps Embed – updated to Beckley, WV */}
            <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/60 border border-gray-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d-81.1884!3d37.7782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8844e0f0b0f0b0f1%3A0x1b0f0b0f0b0f0b0f!2sBeckley%2C%20WV!5e0!3m2!1sen!2sus!4v1690000000000"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/60">
            <h2 className="text-3xl md:text-4xl font-[var(--font-new-rocker)] text-white mb-10 text-center md:text-left">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-amber-300 mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-amber-300 mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="artist" className="block text-amber-300 mb-2 font-medium">
                  Interested in
                </label>
                <select
                  id="artist"
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition"
                >
                  <option value="Any">Any artist</option>
                  <option value="Jax Harlan">Jax "Mountain" Harlan</option>
                  <option value="Riven Cole">Riven Cole</option>
                  <option value="Silas Crowe">Silas Crowe</option>
                  <option value="Luna Voss">Luna Voss (Piercings)</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-amber-300 mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition resize-none"
                  placeholder="Tell us about your idea..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`
                  w-full py-4 px-8 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-3
                  ${
                    status === 'sending'
                      ? 'bg-gray-700 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-700 to-amber-950 hover:from-amber-600 hover:to-amber-800 shadow-lg shadow-amber-900/40 hover:shadow-amber-900/60'
                  }
                `}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
                {status !== 'sending' && <Send size={20} />}
              </button>

              {/* Status Messages */}
              {status === 'success' && (
                <p className="text-center text-green-400 mt-4">
                  Message sent! We'll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-center text-red-400 mt-4">
                  Please fill out all fields.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-gray-950 to-black">
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Walk-ins welcome for small flash pieces and piercings.<br />
          Appointments highly recommended for custom work in Beckley, WV.
        </p>
      </section>
    </main>
  );
}