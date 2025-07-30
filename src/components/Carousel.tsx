import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CarouselItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  link: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({ 
  items, 
  autoPlay = true, 
  interval = 5000, 
  className = '' 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto play functionality
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={`relative w-full h-64 md:h-96 lg:h-[500px] overflow-hidden rounded-lg ${className}`}>
      {/* Carousel Images */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={item.id} className="w-full h-full flex-shrink-0 relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
                  {item.title}
                </h2>
                <p className="text-sm md:text-lg lg:text-xl mb-4 md:mb-6">
                  {item.subtitle}
                </p>
                <Link
                  to={item.link}
                  className="inline-block bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
                >
                  立即查看
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-black p-2 rounded-full transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-black p-2 rounded-full transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;