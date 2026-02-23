export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto mb-8 sm:mb-12 mt-auto">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight">
            KC <span className="text-accent">Coaching</span>
          </h1>
        </div>

        {/* Quote */}
        <blockquote className="mb-10">
          <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-white/90 leading-relaxed">
            "The only person you are destined to become is the person you decide to be."
          </p>
          <footer className="mt-4 text-sm sm:text-base text-accent-light font-medium tracking-wide uppercase">
            — Ralph Waldo Emerson
          </footer>
        </blockquote>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#schedule"
            className="px-8 py-3.5 bg-primary text-white font-medium rounded-full hover:bg-primary-light transition-colors text-base no-underline shadow-lg"
          >
            Book a Consultation
          </a>
          <a
            href="#about"
            className="px-8 py-3.5 bg-white/15 backdrop-blur-sm text-white font-medium rounded-full hover:bg-white/25 transition-colors text-base no-underline border border-white/30"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
