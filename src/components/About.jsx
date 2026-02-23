import { Heart, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mb-4">
            About Me
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/about-photo.jpg"
                alt="KC Coaching"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-neutral-900 mb-6">
              Empowering You to Live Your Best Life
            </h3>
            <p className="text-neutral-700 leading-relaxed mb-6">
              Welcome! I'm a certified life coach dedicated to helping individuals unlock their
              full potential and create meaningful, lasting change. With years of experience in
              personal development and coaching, I provide a supportive, judgment-free space
              where you can explore your goals and overcome obstacles.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-8">
              My approach combines evidence-based coaching techniques with genuine compassion.
              Whether you're navigating a career transition, improving relationships, or seeking
              greater clarity in life, I'm here to guide you every step of the way.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-neutral-50 rounded-xl">
                <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-xs text-neutral-700 mt-1">Clients Helped</div>
              </div>
              <div className="text-center p-4 bg-neutral-50 rounded-xl">
                <Award className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">10+</div>
                <div className="text-xs text-neutral-700 mt-1">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-neutral-50 rounded-xl">
                <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-xs text-neutral-700 mt-1">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
