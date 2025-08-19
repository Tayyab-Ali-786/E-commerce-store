import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

function Slider() {
  const slides = [
    {
      url: "https://m.media-amazon.com/images/I/619geyiQI5L._SX3000_.jpg",
    },
    {
      url: "https://m.media-amazon.com/images/I/81hIlE5xocL._SX3000_.jpg",
    },
    {
      url: "https://m.media-amazon.com/images/I/61Yx5-N155L._SX3000_.jpg",
    },
    {
      url: "https://m.media-amazon.com/images/I/71qcoYgEhzL._SX3000_.jpg",
    },
    {
      url: "https://images-eu.ssl-images-amazon.com/images/G/31/img21/MA2025/GW/BAU/Unrec/PC/934044815._CB551384116_.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="h-150 w-full m-auto relative group overflow-hidden shadow-md">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full bg-center bg-cover duration-500"
      ></div>

      {/* Left Arrow */}
      <div
        onClick={prevSlide}
        className="hidden group-hover:flex items-center justify-center absolute top-1/2 left-3 -translate-y-1/2 bg-black/30 p-1 rounded-full cursor-pointer"
      >
        <BsChevronCompactLeft size={24} className="text-white" />
      </div>

      {/* Right Arrow */}
      <div
        onClick={nextSlide}
        className="hidden group-hover:flex items-center justify-center absolute top-1/2 right-3 -translate-y-1/2 bg-black/30 p-1 rounded-full cursor-pointer"
      >
        <BsChevronCompactRight size={24} className="text-white" />
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 absolute bottom-3 w-full">
        {slides.map((_, index) => (
          <RxDotFilled
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer text-xl ${
              index === currentIndex ? "text-white" : "text-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
