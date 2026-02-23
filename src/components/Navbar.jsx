import { useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'FAQs', href: '/#faqs' },
  { label: 'Schedule', href: '/#schedule' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isPortal = location.pathname.startsWith('/portal');

  const handleNavClick = useCallback((e, href) => {
    setMobileOpen(false);
    if (isPortal) {
      e.preventDefault();
      navigate('/');
      setTimeout(() => {
        const id = href.split('#')[1];
        if (id) {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [isPortal, navigate]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="text-2xl font-serif font-bold text-primary">KC</span>
            <span className="text-sm font-medium text-neutral-700 tracking-wide uppercase">Coaching</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-neutral-700 hover:text-primary transition-colors no-underline"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/portal"
              className="ml-2 px-5 py-2 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-light transition-colors no-underline"
            >
              Client Portal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-base font-medium text-neutral-700 hover:text-primary transition-colors no-underline py-2"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/portal"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-5 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-light transition-colors no-underline mt-2"
            >
              Client Portal
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
