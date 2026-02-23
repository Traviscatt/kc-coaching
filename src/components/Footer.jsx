import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-serif font-bold text-accent">KC</span>
              <span className="text-sm font-medium text-neutral-300 tracking-wide uppercase">Coaching</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Empowering you to live your best life through personalized coaching and support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 list-none p-0 m-0">
              {['About', 'FAQs', 'Schedule', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-neutral-400 hover:text-accent transition-colors text-sm no-underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-2 text-neutral-400 text-sm">
              <p className="m-0">kristi@kristicattcoaching.com</p>
              <p className="m-0">(989) 214-3125</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm m-0">
            &copy; {currentYear} KC Coaching. All rights reserved.
          </p>
          <p className="text-neutral-500 text-sm flex items-center gap-1 m-0">
            Made with <Heart className="w-3.5 h-3.5 text-accent fill-accent" /> and purpose
          </p>
        </div>
      </div>
    </footer>
  );
}
