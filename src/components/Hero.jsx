import React from "react";

const Hero = () => {
  return (
    <header className="relative bg-primary text-white min-h-[90vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden px-4 md:px-0">
      {/* Subtle Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-linear-to-b from-black/10 to-transparent pointer-events-none"></div>
      
      {/* Minimalist Background Detail - Responsive Size */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] md:w-[120%] h-[150%] md:h-[120%] border border-white/5 rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] md:w-[80%] h-[100%] md:h-[80%] border border-white/5 rounded-full pointer-events-none"></div>

      <div className="container mx-auto relative z-10 py-12 md:py-0">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-light tracking-tighter mb-6 md:mb-8 animate-fade-in-down uppercase leading-tight">
            Segens<span className="font-bold">reich</span>
          </h1>
          
          <div className="w-12 md:w-20 h-px bg-white/40 mx-auto mb-8 md:mb-10 animate-fade-in"></div>
          
          <p className="text-base sm:text-lg md:text-2xl leading-relaxed text-white/80 font-light max-w-3xl mx-auto mb-10 md:mb-12 animate-fade-in drop-shadow-sm px-2 md:px-0" style={{ animationDelay: '0.2s' }}>
            Menerima keterbatasan tanpa kehilangan tujuan, bergerak maju tanpa melupakan sumber kekuatan. Makna sejati tidak terletak pada seberapa tinggi kita berdiri, melainkan pada siapa yang menopang kita.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <a href="#products" className="text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium border-b border-white/40 pb-2 hover:border-white transition-all duration-500 cursor-pointer">
              Explore Collection
            </a>
            <a href="#coming-soon" className="text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium border-b border-white/0 pb-2 hover:border-white/40 transition-all duration-500 opacity-60 hover:opacity-100 cursor-pointer">
              Our Vision
            </a>
          </div>
        </div>
      </div>

      {/* Elegant Scroll Indicator - Hidden on smaller screens for cleaner look */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <span className="text-[10px] uppercase tracking-[0.5em] font-medium opacity-40 rotate-90 mb-4 origin-left translate-x-1">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-white/40 to-transparent"></div>
      </div>
    </header>
  );
};

export default Hero;



