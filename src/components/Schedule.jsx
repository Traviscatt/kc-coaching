import { useEffect, useRef } from 'react';
import { Calendar, Clock, Video } from 'lucide-react';

export default function Schedule() {
  const widgetRef = useRef(null);

  useEffect(() => {
    const initWidget = () => {
      if (window.Calendly && widgetRef.current) {
        widgetRef.current.innerHTML = '';
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/kristi-kristicattcoaching/30min?hide_gdpr_banner=1&background_color=ffffff&text_color=1a1a1a&primary_color=2c5f4a',
          parentElement: widgetRef.current,
        });
      }
    };

    if (window.Calendly) {
      initWidget();
    } else {
      const script = document.querySelector('script[src*="calendly"]');
      if (script) {
        script.addEventListener('load', initWidget);
        return () => script.removeEventListener('load', initWidget);
      }
    }

    const handleMessage = (e) => {
      if (e.data.event === 'calendly.page_height' && widgetRef.current) {
        const iframe = widgetRef.current.querySelector('iframe');
        if (iframe) {
          iframe.style.height = e.data.payload.height + 'px';
          widgetRef.current.style.height = e.data.payload.height + 'px';
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

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

        {/* Calendly Inline Widget */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={widgetRef}
            style={{ minWidth: '320px', height: '1050px', overflow: 'hidden' }}
          />
          <p className="text-center text-sm text-neutral-700 mt-6">
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
