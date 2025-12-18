import React, { useState, useEffect } from "react";

const images = [
  "https://bookyourvenue.co.in/_next/image?url=/_next/static/media/bg.c8baead7.png&w=3840&q=80",
];

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds

  return (
    <div className="relative w-full h-screen overflow-hidden font-serif">
      {/* Carousel Images */}
      <div className="absolute inset-0">
        <img
          src={images[currentIndex]}
          alt="Hotel Hero"
          className="object-cover w-full h-full transform scale-105 transition-opacity duration-1000"
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-16"></div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              idx === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
