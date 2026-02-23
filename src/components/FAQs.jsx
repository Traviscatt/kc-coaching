import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What is life coaching?',
    answer:
      'Life coaching is a supportive, collaborative partnership where I help you gain clear insight into your current situation, define meaningful goals, identify what\'s holding you back, and create practical action steps to move forward. Through thoughtful questions, active listening, and accountability, sessions focus on bridging the gap between where you are now and where you want to be—empowering you to make positive changes in areas like career, relationships, health, or personal growth.\n\nGrounded in faith, I incorporate spiritual wisdom and a sense of higher purpose to guide you toward living more authentically, aligning your pursuits with your core values, and advancing with hope, resilience, and deeper direction.',
  },
  {
    question: 'Why Have a Life Coach?',
    answer:
      'Because growth is faster when you\'re not doing it alone.\n\nA life coach helps you:\n\n✔ Get clear on what you actually want\n✔ Turn goals into real plans\n✔ Stay accountable when motivation fades\n✔ Break through mental blocks\n✔ Build confidence and momentum\n\nThink of it like this — athletes, CEOs, and high performers all have coaches… not because they\'re failing, but because they want to win faster.\n\nYou don\'t need to be stuck to benefit from a life coach. You just need to be ready for more.',
  },
  {
    question: 'How long are coaching sessions?',
    answer:
      'Each session typically lasts 50-60 minutes. Sessions are conducted via video call, phone, or in-person depending on your preference and location.',
  },
  {
    question: 'How many sessions will I need?',
    answer:
      'The number of sessions varies based on your goals. Many clients see meaningful progress within 6-12 sessions. We\'ll discuss a recommended plan during your initial consultation.',
  },
  {
    question: 'What can I expect from the first session?',
    answer:
      'During our first session, we\'ll get to know each other, discuss your goals and challenges, and begin mapping out a plan. It\'s a relaxed, judgment-free conversation to see if we\'re a good fit.',
  },
  {
    question: 'Do you offer virtual sessions?',
    answer:
      'Yes! I offer sessions via Zoom, phone, and in-person. Virtual sessions are just as effective and provide greater flexibility for scheduling.',
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden transition-all">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-neutral-50 transition-colors text-left cursor-pointer border-none"
      >
        <span className="text-base sm:text-lg font-medium text-neutral-900 pr-4">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-6 pb-5 text-neutral-700 leading-relaxed whitespace-pre-line">{faq.answer}</p>
      </div>
    </div>
  );
}

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faqs" className="py-20 sm:py-28 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-4" />
          <p className="text-neutral-700 max-w-xl mx-auto">
            Have questions? Here are some of the most common ones I receive.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* FAQ List */}
          <div className="lg:col-span-3 space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>

          {/* Photo */}
          <div className="lg:col-span-2 relative hidden lg:block">
            <div className="rounded-2xl overflow-hidden shadow-xl sticky top-24">
              <img
                src="/faqs-photo.jpg"
                alt="KC Coaching"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
