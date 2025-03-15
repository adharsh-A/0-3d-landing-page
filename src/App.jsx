import { useEffect, useState, useRef } from 'react';
import Animation from "./three.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionsRef = useRef([]);
  
  // Register ScrollTrigger with GSAP
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Handle scroll for progress indicator
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // GSAP animations for section reveals
    sectionsRef.current.forEach((section) => {
      if (!section) return;
      
      gsap.fromTo(
        section.querySelectorAll('.reveal-item'),
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">

      {/* Scroll Progress Indicator */}
      <div className="fixed right-0 top-0 h-full w-1 bg-gray-800 z-50">
        <div
          className="bg-red-600 h-full transition-all duration-300 ease-out"
          style={{ height: `${scrollProgress}%` }}
        />
        
        <div className="fixed right-4 top-2 text-sm font-medium text-red-500">
          {Math.round(scrollProgress)}%
        </div>

        <a href="https://github.com/adharsh-a" target="_blank" rel="noopener noreferrer" className="fixed right-4 top-10 text-red-500 hover:text-red-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
      
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 right-4 z-50 md:hidden bg-black/70 p-2 rounded-full backdrop-blur-md"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
      </button>
      
      {/* Navigation - Side Menu with Glowing Effect */}
      <nav className={`hidden fixed top-0 ${isMenuOpen ? 'left-0' : '-left-full md:left-0'} h-screen w-64 md:w-24 bg-black/80 backdrop-blur-xl z-50 transition-all duration-500 border-r border-red-900/30 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.2)] overflow-y-auto`}>
      {/* <nav className={`fixed top-0 ${isMenuOpen ? 'left-0' : '-left-full md:left-0'} h-full w-64 md:w-24 bg-black/80 backdrop-blur-xl z-40 transition-all duration-500 border-r border-red-900/30 absolute flex flex-col items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.2)]`}> */}
        <div className="text-xl font-bold text-white mb-12 md:mb-16 relative">
          <span className="text-red-600">✅</span>
          <span className="text-white">👍</span>
          <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        </div>
        
        <div className="flex flex-col gap-10 items-center relative">
          {/* Navigation Links */}
          <a href="#home" className="group relative">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 group-hover:bg-red-900/30 transition-all duration-300">
              {/* HOME ICON */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <span className="absolute left-full ml-2 text-sm text-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity md:block">Home</span>
          </a>
          
          <a href="#features" className="group relative">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 group-hover:bg-red-900/30 transition-all duration-300">
              {/* FEATURES ICON */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
            </div>
            <span className="absolute left-full ml-2 text-sm text-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Features</span>
          </a>
          
          <a href="#about" className="group relative">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 group-hover:bg-red-900/30 transition-all duration-300">
              {/* ABOUT ICON */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="absolute left-full ml-2 text-sm text-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">About</span>
          </a>
          
          <a href="#contact" className="group relative">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 group-hover:bg-red-900/30 transition-all duration-300">
              {/* CONTACT ICON */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <span className="absolute left-full ml-2 text-sm text-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Contact</span>
          </a>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-px h-16 bg-gradient-to-b from-red-600/10 to-red-600/50"></div>
          <div className="mt-2 text-xs text-red-600 font-light tracking-widest">SCROLL</div>
        </div>
      </nav>
      
      {/* Main Content - with extra margin to accommodate side nav */}
      <main className="ml-64 md:ml-24 p-8 relative">
        {/* Hero Section with 3D Model as Main Focus */}
        <section
          id="home"
          ref={el => sectionsRef.current[0] = el}
          className="relative w-screen h-screen flex items-center overflow-hidden bg-gradient-to-b from-black to-gray-900"
        >
          {/* 3D Animation takes center stage */}
          <div className="absolute inset-0 z-0">
            <Animation />
          </div>
          
          {/* Content positioned strategically to avoid 3D model */}
          <div className="relative z-10 ml-6 md:ml-12 max-w-md reveal-item">
            <div className="bg-black/40 backdrop-blur-md p-6 rounded-lg border border-gray-800 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
              <div className="w-20 h-1 bg-red-600 mb-6"></div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">
                <span className="inline-block">Lorem.</span>
                <span className="inline-block ml-3 text-red-600">Lorem, ipsum.</span>
              </h1>
              <p className="text-base md:text-lg text-gray-300 mb-8 reveal-item">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, sunt.
              </p>
              <div className="flex gap-4 reveal-item">
                <button className="px-6 py-3 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-md relative overflow-hidden group">
                  <span className="relative z-10">Begin Journey</span>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-red-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </button>
                <button className="px-6 py-3 bg-transparent border border-red-700 text-white rounded-md hover:bg-red-900/20 transition-colors">
                  Our Legacy
                </button>
              </div>
            </div>
            
            {/* Floating stats */}
            <div className="absolute top-0 right-0 translate-x-full mt-8 space-y-4 reveal-item">
              <div className="bg-black/70 backdrop-blur-md p-3 rounded-lg border border-red-900/30 shadow-[0_0_15px_rgba(0,0,0,0.3)]">
                <div className="text-xs text-gray-400 uppercase tracking-widest">Strength</div>
                <div className="text-xl font-bold text-white">100<span className="text-red-500">+</span></div>
              </div>
              <div className="bg-black/70 backdrop-blur-md p-3 rounded-lg border border-red-900/30 shadow-[0_0_15px_rgba(0,0,0,0.3)]">
                <div className="text-xs text-gray-400 uppercase tracking-widest">Honor</div>
                <div className="text-xl font-bold text-white">95<span className="text-red-500">%</span></div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-12 right-12 z-10 hidden md:block">
            <div className="text-red-600 opacity-30 text-6xl font-bold tracking-widest rotate-90 origin-bottom-right">MMXXV</div>
          </div>
        </section>
        
        {/* Features Section - Armory */}
        <section
          id="features"
          ref={el => sectionsRef.current[1] = el}
          className="relative w-screen min-h-screen flex items-center bg-black px-6 py-24"
        >
          {/* Glow effects */}
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-red-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-red-900/5 rounded-full blur-3xl"></div>
          
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-16 reveal-item">
              <div className="inline-block px-3 py-1 bg-red-900/20 text-red-500 text-xs uppercase tracking-widest rounded-full mb-3">The Armory</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Legendary <span className="text-red-600">Weaponry</span></h2>
              <p className="text-gray-400 max-w-lg mx-auto">
                Our arsenal of digital weapons forged in the fires of innovation, designed to conquer the modern battlefield.
              </p>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mt-8"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature Cards */}
              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gray-800 hover:border-red-900/50 transition-all duration-300 group reveal-item">
                <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-red-900/20 mb-6 group-hover:bg-red-900/30 transition-colors">
                  {/* FIRE ICON */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-500 transition-colors">Flaming Responsiveness</h3>
                <p className="text-gray-400 mb-6">
                  Interfaces that adapt to any battlefield size with the speed and fury of dragonfire.
                </p>
                <div className="flex justify-between items-center">
                  <div className="h-1 w-12 bg-red-900/50 rounded-full overflow-hidden">
                    <div className="h-full w-10 bg-red-600"></div>
                  </div>
                  <span className="text-xs text-gray-500">98%</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gray-800 hover:border-red-900/50 transition-all duration-300 group reveal-item">
                <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-red-900/20 mb-6 group-hover:bg-red-900/30 transition-colors">
                  {/* LIGHTNING ICON */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-500 transition-colors">Lightning Performance</h3>
                <p className="text-gray-400 mb-6">
                  Strike your enemies with the speed of lightning - our sites load faster than a knight's charge.
                </p>
                <div className="flex justify-between items-center">
                  <div className="h-1 w-12 bg-red-900/50 rounded-full overflow-hidden">
                    <div className="h-full w-11 bg-red-600"></div>
                  </div>
                  <span className="text-xs text-gray-500">99%</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gray-800 hover:border-red-900/50 transition-all duration-300 group reveal-item">
                <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-red-900/20 mb-6 group-hover:bg-red-900/30 transition-colors">
                  {/* SHIELD ICON */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-.257-.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-500 transition-colors">Impenetrable Security</h3>
                <p className="text-gray-400 mb-6">
                  Armored protection for your digital realm, keeping invaders at bay with castle-like fortifications.
                </p>
                <div className="flex justify-between items-center">
                  <div className="h-1 w-12 bg-red-900/50 rounded-full overflow-hidden">
                    <div className="h-full w-10 bg-red-600"></div>
                  </div>
                  <span className="text-xs text-gray-500">97%</span>
                </div>
              </div>
            </div>
            
            {/* Additional Feature Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gray-800 hover:border-red-900/50 transition-all duration-300 group flex gap-6 reveal-item">
                <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-red-900/20 group-hover:bg-red-900/30 transition-colors">
                  {/* PUZZLE ICON */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-500 transition-colors">Tactical Optimization</h3>
                  <p className="text-gray-400">
                    Strategic SEO planning to elevate your presence on the battlefield of search engines.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gray-800 hover:border-red-900/50 transition-all duration-300 group flex gap-6 reveal-item">
                <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-red-900/20 group-hover:bg-red-900/30 transition-colors">
                  {/* LAYOUT ICON */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-500 transition-colors">Strategic Layouts</h3>
                  <p className="text-gray-400">
                    Command the attention of your visitors with expertly planned interface formations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Testimonials Section - War Stories */}
<section
  id="testimonials"
  className="relative w-screen min-h-screen flex items-center bg-black px-6 py-24"
>
  {/* Glow effects */}
  <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-red-600/10 rounded-full blur-3xl"></div>
  <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-red-900/5 rounded-full blur-3xl"></div>
  
  <div className="max-w-6xl mx-auto w-full">
    <div className="text-center mb-16 reveal-item">
      <div className="inline-block px-3 py-1 bg-red-900/20 text-red-500 text-xs uppercase tracking-widest rounded-full mb-3">War Stories</div>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Battle-Tested <span className="text-red-600">Victories</span></h2>
      <p className="text-gray-400 max-w-lg mx-auto">
        Hear from commanders who conquered their digital challenges with our legendary arsenal.
      </p>
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mt-8"></div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Testimonial Cards */}
      <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gray-800 hover:border-red-900/50 transition-all duration-300 group reveal-item">
        <div className="flex items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-red-900/20 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.352-.035-.696-.1-1.028a5 5 0 00-4.9-2.972z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">Commander Alex</h3>
            <p className="text-gray-500 text-sm">Retail Battalion Chief</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="text-gray-400 mb-6">
          "Their strategic approach to our e-commerce site was like watching a masterful battle plan unfold. Sales increased by 70% within three months of launch. A legendary victory indeed."
        </p>
        <div className="flex justify-between items-center">
          <div className="h-1 w-12 bg-red-900/50 rounded-full overflow-hidden">
            <div className="h-full w-11 bg-red-600"></div>
          </div>
          <span className="text-xs text-gray-500">ROI +320%</span>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gray-800 hover:border-red-900/50 transition-all duration-300 group reveal-item">
        <div className="flex items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-red-900/20 flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.352-.035-.696-.1-1.028a5 5 0 00-4.9-2.972z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">Lady Samantha</h3>
            <p className="text-gray-500 text-sm">SaaS Realm Queen</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="text-gray-400 mb-6">
          "The impenetrable security systems they implemented saved our kingdom from countless attacks. Their lightning-fast response time turned potential disasters into tales of triumph."
        </p>
        <div className="flex justify-between items-center">
          <div className="h-1 w-12 bg-red-900/50 rounded-full overflow-hidden">
            <div className="h-full w-10 bg-red-600"></div>
          </div>
          <span className="text-xs text-gray-500">Uptime 99.9%</span>
        </div>
      </div>
    </div>
    
    {/* Featured Testimonial */}
    <div className="mt-8 bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-gray-800 hover:border-red-900/50 transition-all duration-300 group reveal-item">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <div className="w-20 h-20 rounded-full bg-red-900/20 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.352-.035-.696-.1-1.028a5 5 0 00-4.9-2.972z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors">Lord Marcus</h3>
          <p className="text-gray-500 text-sm mb-3">Tech Empire Sovereign</p>
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div className="h-1 w-16 bg-red-900/50 rounded-full overflow-hidden">
              <div className="h-full w-16 bg-red-600"></div>
            </div>
            <span className="text-xs text-gray-500">Traffic +250%</span>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <svg className="h-8 w-8 text-red-900/50 mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.017 21V14.25C14.017 10.24 17.258 7 21.267 7V13.75C21.267 17.76 18.026 21 14.017 21ZM7.267 21V14.25C7.267 10.24 10.508 7 14.517 7V13.75C14.517 17.76 11.276 21 7.267 21Z" fill="currentColor"/>
          </svg>
          <p className="text-gray-400 text-lg mb-6">
            "When our digital kingdom faced threats from all sides, these warriors stepped in with tactical brilliance. Their responsive design conquered every screen size, their lightning performance outmaneuvered competitors, and their strategic SEO planning elevated our position on the battlefield."
          </p>
          <p className="text-gray-400 text-lg">
            "In my decades commanding tech empires, I've never witnessed such a decisive victory. Our conversion rates doubled, bounce rates plummeted, and customer loyalty soared. These aren't mere developers – they're digital battle strategists of the highest order."
          </p>
        </div>
      </div>
    </div>
    
    {/* Call to Action */}
    <div className="mt-12 text-center reveal-item">
      <a href="#contact" className="inline-block px-8 py-4 bg-gradient-to-r from-red-700 to-red-900 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-900/20">
        Share Your Battle Story
      </a>
    </div>
  </div>
        </section>
        {/* Contact Section - The War Room */}
<section
  id="contact"
  className="relative w-screen min-h-screen flex items-center bg-black px-6 py-24"
>
  {/* Glow effects */}
  <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-red-600/10 rounded-full blur-3xl"></div>
  <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-red-900/5 rounded-full blur-3xl"></div>
  
  <div className="max-w-6xl mx-auto w-full">
    <div className="text-center mb-16 reveal-item">
      <div className="inline-block px-3 py-1 bg-red-900/20 text-red-500 text-xs uppercase tracking-widest rounded-full mb-3">The War Room</div>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Plan Your <span className="text-red-600">Conquest</span></h2>
      <p className="text-gray-400 max-w-lg mx-auto">
        Send your battle plans and request a strategic consultation with our elite commanders.
      </p>
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mt-8"></div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      {/* Form Section */}
      <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gray-800 reveal-item">
        <h3 className="text-xl font-bold text-white mb-6">Deploy Your Message</h3>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Your Name (Commander)</label>
            <input 
              type="text" 
              id="name" 
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 text-white"
              placeholder="Enter your name" 
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Communication Channel (Email)</label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 text-white"
              placeholder="Enter your email" 
            />
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">Battle Subject</label>
            <select 
              id="subject" 
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 text-white"
            >
              <option value="">Select your objective</option>
              <option value="website">Website Conquest</option>
              <option value="ecommerce">E-commerce Empire</option>
              <option value="seo">SEO Dominance</option>
              <option value="branding">Brand Reinforcement</option>
              <option value="other">Other Battle</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Your Battle Plan</label>
            <textarea 
              id="message" 
              rows="5" 
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 text-white"
              placeholder="Describe your objectives and challenges..."
            ></textarea>
          </div>
          
          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full px-6 py-4 bg-gradient-to-r from-red-700 to-red-900 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-900/20"
            >
              Send Battle Plans
            </button>
          </div>
        </form>
      </div>
      
      {/* Info Section */}
      <div className="space-y-6 reveal-item">
        <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gray-800 hover:border-red-900/50 transition-all duration-300 group">
          <div className="flex gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-red-900/20 group-hover:bg-red-900/30 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors">Messenger Ravens</h3>
              <p className="text-gray-400">contact@digitalbattleforge.com</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gray-800 hover:border-red-900/50 transition-all duration-300 group">
          <div className="flex gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-red-900/20 group-hover:bg-red-900/30 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors">War Horns</h3>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gray-800 hover:border-red-900/50 transition-all duration-300 group">
          <div className="flex gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-red-900/20 group-hover:bg-red-900/30 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors">Stronghold Location</h3>
              <p className="text-gray-400">123 Digital Fortress, Tech Kingdom, CA 94107</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gray-800">
          <h3 className="text-lg font-bold text-white mb-4">Battle Hours</h3>
          <ul className="space-y-2">
            <li className="flex justify-between text-gray-400">
              <span>Monday - Friday:</span>
              <span>9:00 AM - 6:00 PM</span>
            </li>
            <li className="flex justify-between text-gray-400">
              <span>Saturday:</span>
              <span>10:00 AM - 4:00 PM</span>
            </li>
            <li className="flex justify-between text-gray-400">
              <span>Sunday:</span>
              <span>Closed (Troops Resting)</span>
            </li>
          </ul>
        </div>
        
        <div className="flex space-x-4 justify-center md:justify-start">
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-red-900/20 text-red-500 hover:bg-red-900/40 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-red-900/20 text-red-500 hover:bg-red-900/40 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-red-900/20 text-red-500 hover:bg-red-900/40 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-red-900/20 text-red-500 hover:bg-red-900/40 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
    
    {/* Map Area */}
    <div className="bg-gradient-to-br from-gray-900 to-black p-4 rounded-lg border border-gray-800 h-72 flex items-center justify-center reveal-item">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Battle Map</h3>
        <p className="text-gray-400">Interactive map coming soon to this strategic location</p>
      </div>
    </div>
  </div>
        </section>
        
      </main>

      {/* Footer Section - Digital Battle Forge */}
<footer className="relative w-screen bg-black px-6 py-16">
  {/* Glow effects */}
  <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
  <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-red-900/5 rounded-full blur-3xl"></div>
  
  <div className="max-w-6xl mx-auto w-full">
    {/* Top section with logo and navigation */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 reveal-item">
      {/* Logo and intro */}
      <div className="md:col-span-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-900/30 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Digital Battle Forge</h2>
        </div>
        <p className="text-gray-400 mb-6">
          Forging digital conquests and dominating the online battlefield since 2020.
        </p>
        <div className="flex space-x-3">
          <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-red-900/20 text-red-500 hover:bg-red-900/40 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
          </a>
          <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-red-900/20 text-red-500 hover:bg-red-900/40 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-red-900/20 text-red-500 hover:bg-red-900/40 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
          <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-red-900/20 text-red-500 hover:bg-red-900/40 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Navigation columns */}
      <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* First column */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Battle Plans</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Web Development</a></li>
            <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">E-commerce Solutions</a></li>
            <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">SEO Strategies</a></li>
            <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Brand Reinforcement</a></li>
            <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Digital Marketing</a></li>
          </ul>
        </div>
        
        {/* Second column */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">War Council</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Our Commanders</a></li>
            <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Client Victories</a></li>
            <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Battle Updates</a></li>
            <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Careers</a></li>
          </ul>
        </div>
        
        {/* Third column */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Command Center</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Contact Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Support</a></li>
            <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">FAQ</a></li>
            <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
    </div>
    
    {/* Newsletter Subscription */}
    <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg border border-gray-800 mb-12 reveal-item">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2">
          <h3 className="text-xl font-bold text-white mb-2">Join Our Legion</h3>
          <p className="text-gray-400">Receive battle tactics, digital warfare strategies, and exclusive offers.</p>
        </div>
        <div className="md:col-span-1">
          <div className="flex">
            <input 
              type="email" 
              className="flex-grow px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-l-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 text-white"
              placeholder="Your email" 
            />
            <button 
              type="submit" 
              className="px-4 py-3 bg-gradient-to-r from-red-700 to-red-900 text-white font-bold rounded-r-lg hover:from-red-600 hover:to-red-800 transition-all duration-300"
            >
              Enlist
            </button>
          </div>
        </div>
      </div>
    </div>
    
    {/* Bottom section with copyright and links */}
    <div className="border-t border-gray-800 pt-8 pb-4 reveal-item">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-500 text-sm mb-4 md:mb-0">
          © 2025 Digital Battle Forge. All rights reserved. Forged in the digital fires.
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-500 text-sm hover:text-red-500 transition-colors">Privacy</a>
          <a href="#" className="text-gray-500 text-sm hover:text-red-500 transition-colors">Terms</a>
          <a href="#" className="text-gray-500 text-sm hover:text-red-500 transition-colors">Cookies</a>
          <a href="#" className="text-gray-500 text-sm hover:text-red-500 transition-colors">Sitemap</a>
        </div>
      </div>
    </div>
  </div>
</footer>

      
    </div>
  )
}
export default App;
