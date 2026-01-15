import React, { useState, useEffect } from 'react';
import { ThreeScene } from './components/ThreeScene';
import { Chatbot } from './components/Chatbot';
import { BookingModal } from './components/BookingModal';
import { Moon, Sun, Menu, ArrowRight, Star, Wifi, Droplets, Dumbbell, Utensils } from 'lucide-react';

const SECTIONS = ['home', 'rooms', 'amenities', 'contact'];

function App() {
  const [isNight, setIsNight] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Simple scroll spy logic
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const sections = SECTIONS.map(id => document.getElementById(id));
      
      sections.forEach((section) => {
        if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
           setActiveSection(section.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDayNight = () => setIsNight(!isNight);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    }
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-1000 ${isNight ? 'text-white' : 'text-gray-900'}`}>
      
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ThreeScene isNight={isNight} section={activeSection} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
             <div className="w-8 h-8 bg-amber-500 rounded-sm rotate-45 flex items-center justify-center">
                <span className="text-black font-serif font-bold text-lg -rotate-45">A</span>
             </div>
             <span className={`font-serif text-xl tracking-[0.2em] font-bold ${isNight || scrolled ? 'text-white' : 'text-black'}`}>AURA</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {SECTIONS.map((item) => (
                <button 
                    key={item} 
                    onClick={() => scrollTo(item)}
                    className={`text-xs uppercase tracking-widest hover:text-amber-500 transition-colors ${activeSection === item ? 'text-amber-500' : (isNight || scrolled ? 'text-white/70' : 'text-black/70')}`}
                >
                    {item}
                </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
             <button onClick={toggleDayNight} className={`p-2 rounded-full transition-colors ${isNight || scrolled ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'}`}>
                {isNight ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <button 
                onClick={() => setIsBookingOpen(true)}
                className="hidden md:block px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors"
             >
                Book Now
             </button>
             <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu size={24} className={isNight || scrolled ? 'text-white' : 'text-black'} />
             </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center space-y-8 animate-fade-in">
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 text-white">
                  <Menu size={24} />
              </button>
              {SECTIONS.map((item) => (
                <button 
                    key={item} 
                    onClick={() => scrollTo(item)}
                    className="text-2xl font-serif text-white uppercase tracking-widest hover:text-amber-500"
                >
                    {item}
                </button>
            ))}
          </div>
      )}

      {/* Main Content Sections (Scrollable) */}
      <main className="relative z-10 w-full">
        
        {/* HERO */}
        <section id="home" className="h-screen w-full flex items-center justify-center px-6 relative">
           <div className="max-w-4xl w-full text-center">
               <h2 className="text-amber-500 text-sm md:text-base tracking-[0.5em] uppercase mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>The Future of Luxury</h2>
               <h1 className={`font-serif text-5xl md:text-8xl mb-8 leading-tight ${isNight ? 'text-white text-glow' : 'text-black'} animate-fade-in-up`} style={{ animationDelay: '0.4s' }}>
                  ELEVATE YOUR <br/> REALITY
               </h1>
               <p className={`max-w-lg mx-auto mb-10 text-sm md:text-base leading-relaxed ${isNight ? 'text-white/60' : 'text-gray-600'} animate-fade-in-up`} style={{ animationDelay: '0.6s' }}>
                  Experience architectural perfection powered by sustainable fusion energy. 
                  Aura Heights offers an escape beyond the stratosphere.
               </p>
               <button 
                onClick={() => setIsBookingOpen(true)}
                className="group relative px-8 py-4 bg-transparent border border-amber-500 text-amber-500 text-sm uppercase tracking-widest overflow-hidden hover:text-black transition-colors animate-fade-in-up" 
                style={{ animationDelay: '0.8s' }}
               >
                   <span className="absolute inset-0 w-full h-full bg-amber-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
                   <span className="relative z-10 flex items-center gap-2">Reserve Suite <ArrowRight size={16} /></span>
               </button>
           </div>
           
           {/* Scroll Indicator */}
           <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce ${isNight ? 'text-white' : 'text-black'}`}>
               <span className="text-[10px] uppercase tracking-widest">Scroll</span>
               <div className="w-px h-10 bg-current"></div>
           </div>
        </section>

        {/* ROOMS */}
        <section id="rooms" className="min-h-screen w-full flex items-center px-6 py-20 relative">
             <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
                 <div className={`glass-panel p-8 md:p-12 rounded-3xl ${isNight ? 'bg-black/40' : 'bg-white/60'} backdrop-blur-xl border border-white/10 shadow-2xl md:translate-x-12`}>
                     <div className="flex items-center gap-2 text-amber-500 mb-4">
                         <Star size={16} fill="currentColor" />
                         <Star size={16} fill="currentColor" />
                         <Star size={16} fill="currentColor" />
                         <Star size={16} fill="currentColor" />
                         <Star size={16} fill="currentColor" />
                     </div>
                     <h2 className={`font-serif text-4xl mb-6 ${isNight ? 'text-white' : 'text-black'}`}>Orbital Penthouse</h2>
                     <p className={`mb-8 leading-relaxed ${isNight ? 'text-white/70' : 'text-gray-700'}`}>
                         Suspended in the clouds, our signature penthouse offers 360-degree panoramic views of the neon metropolis below. 
                         Featuring smart-glass privacy walls, zero-gravity sleep pods, and a private holographic cinema.
                     </p>
                     <ul className="space-y-4 mb-8">
                         {['360° City View', 'AI Butler Service', 'Private Infinity Pool', 'Holographic Cinema'].map((feature) => (
                             <li key={feature} className="flex items-center gap-3 text-sm">
                                 <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                                 <span className={isNight ? 'text-white/80' : 'text-gray-800'}>{feature}</span>
                             </li>
                         ))}
                     </ul>
                     <div className="flex items-end justify-between border-t border-white/10 pt-6">
                         <div>
                             <span className="text-xs uppercase text-amber-500 tracking-wider block mb-1">Starting from</span>
                             <span className={`text-3xl font-serif ${isNight ? 'text-white' : 'text-black'}`}>$5,000</span>
                             <span className="text-xs opacity-50">/night</span>
                         </div>
                         <button className="text-sm font-bold uppercase tracking-wider underline decoration-amber-500 underline-offset-4 hover:text-amber-500 transition-colors">
                             View Details
                         </button>
                     </div>
                 </div>
                 {/* The 3D camera moves to right side, leaving this empty for the view */}
                 <div className="hidden md:block"></div> 
             </div>
        </section>

        {/* AMENITIES */}
        <section id="amenities" className="min-h-screen w-full px-6 py-20 flex flex-col justify-center">
            <div className="container mx-auto">
                <div className="mb-16 max-w-xl">
                    <h2 className="text-amber-500 text-xs tracking-[0.2em] uppercase mb-4">World Class Amenities</h2>
                    <h3 className={`font-serif text-4xl md:text-5xl ${isNight ? 'text-white' : 'text-black'}`}>DESIGNED FOR <br/> THE EXTRAORDINARY</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: <Droplets size={32}/>, title: 'Infinity Sky Pool', desc: 'Swim among the clouds in our climate-controlled edge pool.' },
                        { icon: <Dumbbell size={32}/>, title: 'Quantum Gym', desc: 'State-of-the-art bio-feedback equipment for peak performance.' },
                        { icon: <Utensils size={32}/>, title: 'Nebula Dining', desc: 'Molecular gastronomy prepared by world-renowned robotic chefs.' },
                        { icon: <Wifi size={32}/>, title: 'Hyper-Link Lounge', desc: 'Ultra-high-speed connectivity in a soundproof luxury environment.' },
                    ].map((item, idx) => (
                        <div key={idx} className={`group p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2 ${isNight ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/80 border-black/5 hover:bg-white hover:shadow-xl'}`}>
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                                {item.icon}
                            </div>
                            <h4 className={`font-serif text-xl mb-3 ${isNight ? 'text-white' : 'text-black'}`}>{item.title}</h4>
                            <p className={`text-sm leading-relaxed ${isNight ? 'text-white/60' : 'text-gray-600'}`}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* CONTACT / FOOTER */}
        <section id="contact" className={`py-20 px-6 ${isNight ? 'bg-black/90' : 'bg-gray-100'} border-t border-white/5`}>
             <div className="container mx-auto grid md:grid-cols-4 gap-12">
                 <div className="col-span-1 md:col-span-2">
                     <div className="flex items-center gap-2 mb-6">
                        <div className="w-6 h-6 bg-amber-500 rounded-sm rotate-45 flex items-center justify-center">
                            <span className="text-black font-serif font-bold text-xs -rotate-45">A</span>
                        </div>
                        <span className={`font-serif text-xl tracking-[0.2em] font-bold ${isNight ? 'text-white' : 'text-black'}`}>AURA</span>
                     </div>
                     <p className={`max-w-sm text-sm leading-relaxed mb-8 ${isNight ? 'text-white/50' : 'text-gray-500'}`}>
                         Aura Heights redefines luxury hospitality through technology and design. 
                         Located in the heart of the Innovation District.
                     </p>
                 </div>
                 
                 <div>
                     <h4 className={`font-bold uppercase tracking-wider mb-6 text-xs ${isNight ? 'text-white' : 'text-black'}`}>Contact</h4>
                     <ul className={`space-y-4 text-sm ${isNight ? 'text-white/60' : 'text-gray-600'}`}>
                         <li>101 Future Blvd, Neo-City</li>
                         <li>+1 (800) AURA-LUX</li>
                         <li>concierge@auraheights.com</li>
                     </ul>
                 </div>

                 <div>
                     <h4 className={`font-bold uppercase tracking-wider mb-6 text-xs ${isNight ? 'text-white' : 'text-black'}`}>Links</h4>
                     <ul className={`space-y-4 text-sm ${isNight ? 'text-white/60' : 'text-gray-600'}`}>
                         <li><a href="#" className="hover:text-amber-500">Press</a></li>
                         <li><a href="#" className="hover:text-amber-500">Careers</a></li>
                         <li><a href="#" className="hover:text-amber-500">Privacy Policy</a></li>
                         <li><a href="#" className="hover:text-amber-500">Terms of Service</a></li>
                     </ul>
                 </div>
             </div>
             <div className={`mt-20 pt-8 border-t ${isNight ? 'border-white/5 text-white/30' : 'border-black/5 text-black/30'} text-xs text-center uppercase tracking-widest`}>
                 © 2024 Aura Heights. All rights reserved.
             </div>
        </section>
      </main>

      <Chatbot />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      
    </div>
  );
}

export default App;