import { Calendar, Clock, Video } from 'lucide-react';

export default function Schedule() {
  return (
    <section id="schedule" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mb-4">
            Schedule a Consultation
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-4" />
          <p className="text-neutral-700 max-w-xl mx-auto">
            Ready to take the first step? Book a free discovery call and let's talk about how
            coaching can help you reach your goals.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 bg-neutral-50 rounded-xl">
            <Calendar className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-neutral-900 mb-1">Pick a Date</h3>
            <p className="text-sm text-neutral-700">Choose a time that works for your schedule</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-neutral-50 rounded-xl">
            <Clock className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-neutral-900 mb-1">30 Minutes</h3>
            <p className="text-sm text-neutral-700">Free introductory consultation call</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-neutral-50 rounded-xl">
            <Video className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold text-neutral-900 mb-1">Virtual Meeting</h3>
            <p className="text-sm text-neutral-700">Meet via Zoom from anywhere</p>
          </div>
        </div>

        {/* Calendly Embed */}
        <div className="max-w-4xl mx-auto bg-neutral-50 rounded-2xl p-4 sm:p-8 shadow-sm border border-neutral-200">
          <div className="bg-white rounded-xl overflow-hidden min-h-[600px] flex items-center justify-center">
            <iframe
              src="https://calendly.com/kristi-kristicattcoaching/30min"
              width="100%"
              height="700"
              frameBorder="0"
              title="Schedule a consultation"
              className="w-full border-0"
              style={{ minHeight: '600px' }}
            />
          </div>
          <p className="text-center text-sm text-neutral-700 mt-4">
            Don't see a time that works?{' '}
            <a href="#contact" className="text-primary hover:text-primary-light font-medium no-underline">
              Contact me directly
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
