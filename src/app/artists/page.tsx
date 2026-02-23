// app/artists/page.tsx
import Image from 'next/image';
import Link from 'next/link';

const team = [
  {
    name: 'Jax "Mountain" Harlan',
    role: 'Tattoo Artist',
    specialties: ['Japanese Irezumi', 'Blackwork', 'Large-Scale Realism'],
    bio: 'Born and raised in the hills of West Virginia, Jax brings raw mountain energy to every piece. Specializes in massive back and chest work that tells epic stories. 12+ years inking.',
    photo: '/jax.jpg',
    instagram: 'https://instagram.com/jaxmountainink',
  },
  {
    name: 'Riven Cole',
    role: 'Tattoo Artist',
    specialties: ['Neo-Traditional', 'Color Realism', 'Custom Cover-Ups'],
    bio: 'Riven turns chaos into beauty with bold lines and vibrant palettes. Loves turning scars into art. Beckley local, always down for walk-in consultations.',
    photo: '/riven.jpg',
    instagram: 'https://instagram.com/rivencoleink',
  },
  {
    name: 'Silas Crowe',
    role: 'Tattoo Artist',
    specialties: ['Traditional American', 'Black & Gray Portraits', 'Fine Line'],
    bio: 'Old-school roots with a modern edge. Silas is your guy for timeless sailor-style tattoos or hyper-detailed portraits. 10 years in the chair, zero compromises on quality.',
    photo: '/silas.jpg',
    instagram: 'https://instagram.com/silascrowetattoo',
  },
  {
    name: 'Luna Voss',
    role: 'Professional Piercer',
    specialties: ['Ear & Facial Piercings', 'Dermal Anchors', 'Body Mods'],
    bio: 'Luna brings precision and care to every piercing. Certified in advanced techniques, focuses on safe, hygienic placements. Also offers aftercare consultations.',
    photo: '/luna.jpg',
    instagram: 'https://instagram.com/lunavoss_piercing',
  },
];

export default function ArtistsPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-200">
      {/* Page Header with Background Image */}
      <section className="relative py-32 md:py-40 px-6 text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/group.jpg"
            alt="Tattoo shop crew at the counter"
            fill
            className="object-cover object-top brightness-90"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-[var(--font-new-rocker)] text-amber-300 tracking-wider mb-6 drop-shadow-lg">
            THE CREW
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 drop-shadow-md">
            Four skilled hands turning vision into permanent art and metal in Beckley, West Virginia.
          </p>
        </div>
      </section>

      {/* Individual Artist Sections – alternating backgrounds */}
      {team.map((member, index) => {
        const isEven = index % 2 === 0;
        return (
          <section
            key={member.name}
            className={`
              py-20 md:py-28 px-6
              border-t border-amber-900/30 border-b border-gray-800
              ${isEven ? 'bg-gray-950' : 'bg-gray-900'}
              transition-colors duration-500
            `}
          >
            <div className="max-w-6xl mx-auto">
              <div
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20`}
              >
                {/* Photo Column */}
                <div className="w-full md:w-5/12 relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl shadow-black/70 group">
                  <Image
                    src={member.photo}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Text Column */}
                <div className="w-full md:w-7/12 space-y-8">
                  <div>
                    <h2 className="text-4xl md:text-6xl font-[var(--font-new-rocker)] text-white mb-3 tracking-wide">
                      {member.name}
                    </h2>
                    <p className="text-2xl md:text-3xl text-amber-400 font-medium">{member.role}</p>
                  </div>

                  <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                    {member.bio}
                  </p>

                  <div>
                    <h3 className="text-xl md:text-2xl font-medium text-amber-500 mb-4">Specialties</h3>
                    <ul className="space-y-3 text-gray-300 text-base md:text-lg">
                      {member.specialties.map((spec) => (
                        <li key={spec} className="flex items-center gap-4">
                          <span className="text-amber-500 text-xl">•</span> {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-6 pt-6">
                    <Link
                      href={`mailto:bookings@yourstudio.com?subject=Book%20with%20${encodeURIComponent(member.name)}`}
                      className="bg-gradient-to-r from-amber-800 to-amber-950 hover:from-amber-700 hover:to-amber-900 text-white font-medium py-4 px-10 rounded-lg transition shadow-lg shadow-black/50 hover:shadow-amber-900/30"
                    >
                      Book with {member.name.split(' ')[0]}
                    </Link>

                    {member.instagram && (
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-amber-700 text-amber-400 hover:bg-amber-950 hover:border-amber-500 font-medium py-4 px-10 rounded-lg transition"
                      >
                        View on Instagram
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}