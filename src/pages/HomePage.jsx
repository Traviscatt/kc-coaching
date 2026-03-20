import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import FAQs from '../components/FAQs';
import Schedule from '../components/Schedule';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <About />
      <FAQs />
      <Schedule />
      <Contact />
      <Footer />
    </>
  );
}
