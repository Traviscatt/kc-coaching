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
              Hi Friends! Welcome.
            </h3>
            <p className="text-neutral-700 leading-relaxed mb-6">
              I have been married to my husband, Travis, for 23 years and we have two beautiful boys who are the best gift God could have given us. They both have special needs so that has shaped who I am and how I coach.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-6">
              I have my bachelor's in business marketing and worked with non-profits post college pre kids. I have always been a very relational person so once my boys reached an age where I wanted to have something to pour into outside of the home, coaching seemed to be a very natural fit.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-8">
              I am in the process of becoming a certified life coach through Professional Christian Coaching Institute (which is an ICF certified training institute) but am excited to start seeing a limited number of clients as I finish my training this year!
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-neutral-50 rounded-xl">
                <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">Faith</div>
                <div className="text-xs text-neutral-700 mt-1">Centered</div>
              </div>
              <div className="text-center p-4 bg-neutral-50 rounded-xl">
                <Award className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">ICF</div>
                <div className="text-xs text-neutral-700 mt-1">Certified Training</div>
              </div>
              <div className="text-center p-4 bg-neutral-50 rounded-xl">
                <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">PCCI</div>
                <div className="text-xs text-neutral-700 mt-1">Trained Coach</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
