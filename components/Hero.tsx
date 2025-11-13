"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  // {
  //   image: "/hero.jpeg",
  //   title: "Luxury Apartments Await",
  //   subtitle: "Modern living spaces designed for your comfort",
  // },
  {
    image: "/hero2.jpeg",
    title: "Happy Families, Dream Homes",
    subtitle: "Join thousands who found their perfect home",
  },
  // {
  //   image:
  //     "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=600&fit=crop",
  //   title: "Contest Winners Celebration",
  //   subtitle: "Real people, real prizes, real dreams fulfilled",
  // },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-[300px] md:h-[800px]  mx-auto overflow-hidden md:mt-24 mt-16 ">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* <div className="absolute inset-0 bg-linear-to-t from-black/60 via-accent-violet-dark/40 to-transparent"></div> */}

          {/* {index === currentSlide && (
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 transition-all duration-700">
              <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4 animate-fadeInUp">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl animate-fadeInUp delay-100">
                {slide.subtitle}
              </p>
              <button className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-accent-violet-dark to-accent-violet shadow-lg hover:scale-105 transition-transform">
                Join Contest Now
              </button>
            </div>
          )} */}
        </div>
      ))}

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-3 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-3 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all transform ${
                index === currentSlide
                  ? "scale-125 bg-accent-violet"
                  : "bg-white/60 hover:bg-accent-violet-light"
              }`}
            />
          ))}
        </div>
      )}

      {/* Subtle Overlay Accent */}
      <div className="absolute inset-0 bg-linear-to-tr from-accent-violet-light/20 via-transparent to-transparent pointer-events-none"></div>
    </section>
  );
}
