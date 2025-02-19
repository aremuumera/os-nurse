import  { useState, useEffect } from 'react'
import Header from '../../components/header'
import AboutSection from '../../components/Home/AboutSection'
import Hero from '../../components/Home/Hero'
import Features from '../../components/Home/Features'
import YoutubeSection from '../../components/Home/YoutubeSection'
import FromBlog from '../../components/Home/FromBlog'
import Newsletter from '../../components/Home/Newsletter'
import Testimonials from '../../components/Home/Testimonials'
import Appointment from '../../components/Home/Appointment'
import Footer from '../../components/footer'
import { ArrowUp } from 'lucide-react';

const Home = () => {
  const [showButton, setShowButton] = useState(false);

  // This function handles the button visibility based on scroll position
  const handleScroll = () => {
    // Show button after scrolling down 300px (you can adjust this value)
    const scrollThreshold = 300;
    if (window.scrollY > scrollThreshold) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // Add scroll event listener when component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="font-urbanist relative">
        <Header />
        <Hero />
        <YoutubeSection />
        <Features />
        <AboutSection />
        <FromBlog />
        <Newsletter />
        <Testimonials />
        <Appointment />
        <Footer />
        {showButton && (
          <button
            onClick={scrollToTop}
            className="fixed !z-[8999000] bottom-8 right-2 hover:bg-pink-600 bg-primary-mainPink text-white rounded-full p-4 transition-colors flex items-center gap-2"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
    </div>
  )
}

export default Home