
"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-900">
      {/* Image Wrapper with Background Color */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-contain rounded-sm"
        />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}


// for blur img bg

// "use client";
// import React, { useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface ImageSliderProps {
//   images: string[];
// }

// export default function ImageSlider({ images }: ImageSliderProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div className="relative w-full h-full overflow-hidden">
//       {/* Blurred Background */}
//       <div
//         className="absolute inset-0 bg-cover bg-center blur-2xl scale-110"
//         style={{
//           backgroundImage: `url(${images[currentIndex]})`,
//         }}
//       ></div>

//       {/* Main Image */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <img
//           src={images[currentIndex]}
//           alt={`Slide ${currentIndex + 1}`}
//           className="w-full h-full object-contain relative rounded-sm"
//         />
//       </div>

//       {/* Navigation Buttons */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
//       >
//         <ChevronLeft className="w-6 h-6" />
//       </button>

//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
//       >
//         <ChevronRight className="w-6 h-6" />
//       </button>

//       {/* Dots Indicator */}
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-2 h-2 rounded-full transition-colors ${
//               index === currentIndex ? "bg-white" : "bg-white/50"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
