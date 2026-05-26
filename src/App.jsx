import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import WhyTechLenz from './components/WhyTechLenz';
import Process from './components/Process';
import Services from './components/Services';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import PitchYourStartup from './components/PitchYourStartup';
import Footer from './components/Footer';
import ExploreEvents from './components/ExploreEvents';
import JoinTechLenz from './components/JoinTechLenz';
import EnquiryModal from './components/EnquiryModal';
import Chatbot from './components/Chatbot';

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'pitch', or 'join'

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1800);

    const unmountTimer = setTimeout(() => {
      setLoading(false);
    }, 2400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  // Hash-based simple SPA routing
  const scrollToHashTarget = (hash) => {
    if (!hash || hash === '#' || hash === '#pitch') return;

    const targetElement = document.querySelector(hash);
    if (!targetElement) return;

    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 80;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerHeight - 20;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#pitch') {
        setCurrentView('pitch');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (window.location.hash === '#join') {
        setCurrentView('join');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setCurrentView('home');
        setTimeout(() => {
          scrollToHashTarget(window.location.hash);
        }, 100);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    /* ==========================================================================
       Scroll Animations with Intersection Observer
       ========================================================================== */
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    let lastScrollY = window.scrollY;

    const observer = new IntersectionObserver((entries) => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;

      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          // Adjust class based on scroll direction
          if (isScrollingDown) {
            el.classList.remove('animate-slide-down');
            el.classList.add('animate-slide-up');
          } else {
            el.classList.remove('animate-slide-up');
            el.classList.add('animate-slide-down');
          }
          el.classList.add('is-visible');
        } else {
          el.classList.remove('is-visible');
        }
      });
    }, observerOptions);

    // Give a short delay to allow components to mount
    const animTimeout = setTimeout(() => {
      const animateElements = document.querySelectorAll('[class*="animate-"], .step-card, .cta-box, .portfolio-item');
      
      animateElements.forEach((el, index) => {
        // Add a base animate class if they don't have one
        if (!Array.from(el.classList).some(c => c.startsWith('animate-'))) {
          el.classList.add('animate-slide-up');
          el.style.transitionDelay = `${(index % 3) * 0.1}s`;
        }
        observer.observe(el);
      });
    }, 100);

    /* ==========================================================================
       Smooth Scrolling for Anchor Links (with offset)
       ========================================================================== */
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        const targetId = target.getAttribute('href');
        if (targetId === '#') return;

        if (targetId === '#pitch' || targetId === '#join') {
          e.preventDefault();
          window.location.hash = targetId;
          return;
        }
        
        // If the current view is 'pitch' and the user clicks another anchor, switch back to home first
        if (currentView === 'pitch' && targetId !== '#pitch') {
          window.location.hash = targetId;
          return;
        }

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const header = document.querySelector('.header');
          const headerHeight = header ? header.offsetHeight : 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerHeight - 20;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      clearTimeout(animTimeout);
      observer.disconnect();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [currentView]);

  return (
    <>
      {loading && (
        <div className={`preloader-overlay ${fadeOut ? 'fade-out' : ''}`}>
          <div className="preloader-content">
            <img src="/logo1.png?v=1" alt="TechLenz Logo" className="preloader-logo" />
            <div className="preloader-progress-bar">
              <div className="preloader-progress-fill"></div>
            </div>
          </div>
        </div>
      )}

      <Header />
      
      {currentView === 'pitch' ? (
        <main style={{ minHeight: '80vh', paddingTop: '80px' }}>
          <PitchYourStartup />
        </main>
      ) : currentView === 'join' ? (
        <main style={{ minHeight: '80vh', paddingTop: '80px' }}>
          <JoinTechLenz />
        </main>
      ) : (
        <main>
          <Hero />
          <WhyTechLenz />
          <Process />
          <Services />
          <ExploreEvents />
          <FAQ />
          <CTA />
        </main>
      )}

      <Footer />
      <section className="escape-banner">
        <div className="escape-logo-container">
          <img src="/logo3.png?v=1" alt="TechLenz Logo" className="escape-logo-img" />
        </div>
      </section>
      <EnquiryModal />
      <Chatbot />
    </>
  );
}

export default App;
