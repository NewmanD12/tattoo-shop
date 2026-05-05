// app/contact/page.tsx
'use client';
import { useState } from 'react';
import { Send, Mail, Phone, MapPin, Instagram } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const formData = new FormData(e.currentTarget);

    // Basic client-side check (files are optional)
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const messageText = formData.get('message') as string;

    if (!name || !email || !messageText) {
      setStatus('error');
      setMessage('Please fill in all required fields.');
      return;
    }

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        body: formData, // sends text fields + files automatically
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage("Message & photos sent! We'll get back to you soon.");
        e.currentTarget.reset(); // clears form + files
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please check your connection.');
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-200">
      {/* Header Section */}
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
          {/* Left: Info & Contact Details */}
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
          </div>

          {/* Right: Contact Form */}
          <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/60">
            <h2 className="text-3xl md:text-4xl font-[var(--font-new-rocker)] text-white mb-10 text-center md:text-left">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-amber-300 mb-2 font-medium">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-amber-300 mb-2 font-medium">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div>
                <label htmlFor="artist" className="block text-amber-300 mb-2 font-medium">
                  Interested in
                </label>
                <select
                  id="artist"
                  name="artist"
                  defaultValue="Any"
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
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell us about your idea..."
                  className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition resize-none"
                />
              </div>

              <div>
                <label htmlFor="files" className="block text-amber-300 mb-2 font-medium">
                  Reference Photos (optional – jpg, png, pdf)
                </label>
                <input
                  type="file"
                  id="files"
                  name="files"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  multiple
                  className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-900/50 file:text-amber-300 hover:file:bg-amber-800/50 transition cursor-pointer"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full py-4 px-8 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-3
                  ${status === 'loading'
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-700 to-amber-950 hover:from-amber-600 hover:to-amber-800 shadow-lg shadow-amber-900/40 hover:shadow-amber-900/60'
                  }`}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
                {status !== 'loading' && <Send size={20} />}
              </button>
            </form>

            {status !== 'idle' && (
              <div className="mt-6 text-center">
                {status === 'success' ? (
                  <p className="text-green-400 font-semibold">{message}</p>
                ) : (
                  <p className="text-red-400 font-semibold">{message}</p>
                )}
              </div>
            )}
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