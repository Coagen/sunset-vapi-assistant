import React, { useState, useEffect } from 'react';

const images = [
  "https://bookyourvenue.co.in/_next/image?url=/_next/static/media/bg.c8baead7.png&w=3840&q=80",
  "https://images.trvl-media.com/lodging/8000000/7070000/7069800/7069724/ff3f7225.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  "https://images.trvl-media.com/lodging/8000000/7070000/7069800/7069724/dcc24f74.jpg?impolicy=resizecrop&rw=1200&ra=fit"
];

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden font-serif">
      {/* Carousel Images */}
      <div className="absolute inset-0">
        <img
          src={images[currentIndex]}
          alt="Hotel Hero"
          className="object-cover w-full h-full transform scale-105 transition-all duration-1000 ease-in-out"
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-16">
        <h1 className="text-white text-6xl md:text-8xl mb-8 tracking-tight drop-shadow-2xl font-normal animate-in slide-in-from-bottom-5 duration-700">
          Welcome to paradise.
        </h1>
        <p className="text-white/90 text-xl md:text-2xl mb-12 max-w-2xl font-light drop-shadow-md animate-in slide-in-from-bottom-5 duration-1000 delay-100">
          Experience the pinnacle of luxury and serenity at our exclusive oceanfront resort.
        </p>
        <button className="px-10 py-4 bg-[#C89D6C] text-brand-navy font-semibold text-lg rounded-sm hover:bg-[#b0885a] hover:text-white transition-all duration-300 shadow-xl transform hover:-translate-y-1 animate-in zoom-in duration-500 delay-200">
          Explore Luxury Rooms
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              idx === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;