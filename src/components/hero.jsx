import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'

const hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');
  
  const slides = [
    {
      image: assets.anime_poster,
      title: "Anime Collection",
      subtitle: "Get your",
      buttonText: "Shop Now"
    },
    {
      image: assets.movie_poster,
      title: "Movie Collection",
      subtitle: "New Collection",
      buttonText: "Explore"
    },
    {
      image: assets.model,
      title: "Game Collection",
      subtitle: "Best",
      buttonText: "Discover"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection('right');
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setSlideDirection(index > currentSlide ? 'right' : 'left');
    setCurrentSlide(index);
  };

  return (
    <div className='relative border border-gray-400 overflow-hidden'>
      {/* Slides */}
      <div className='flex flex-col sm:flex-row'>
        {/* Left side - Content */}
        <div className='w-full sm:w-1/2 flex items-center justify-center sm:py-0'>
        <div className='flex flex-col items-center justify-center text-[#414141]'>
            <div className='flex items-center gap-2'>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
              <p className='font-medium text-sm md:text-base'>{slides[currentSlide].subtitle}</p>
            </div>
            <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>{slides[currentSlide].title}</h1>
            <div className='flex items-center gap-2'> 
              <p className='font-semibold text-sm md:text-base'>{slides[currentSlide].buttonText}</p>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            </div>
          </div>
        </div>
        
        {/* Right side - Image */}
        <div className='w-full sm:w-1/2 relative overflow-hidden'>
          <div 
            className={`flex transition-transform duration-500 ease-in-out ${
              slideDirection === 'right' ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className='w-full flex-shrink-0'>
                <img 
                  className='w-full h-[400px] object-cover' 
                  src={slide.image} 
                  alt={slide.title} 
                />
              </div>
            ))}
            </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className='absolute bottom-4 left-0 right-0 flex justify-center gap-2'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-[#414141]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default hero
