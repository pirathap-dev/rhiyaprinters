// import { useEffect, useState } from "react";

// export default function Carousel({images}) {
//     const [current, setCurrent] = useState(0);

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setCurrent((prev) => (prev + 1) % images.length);
//         }, 5000); 

//         return () => clearInterval(timer);
//     }, []);

//     return (
//         <div className="w-full max-w-full h-[250px] sm:h-[350px] lg:h-[500px] border-2 border-mainBlue overflow-hidden relative">
//             {images.map((img, index) => (
//                 <img
//                     key={index}
//                     src={img}
//                     alt={`Slide ${index}`}
//                     className={`w-full h-full object-fill absolute top-0 left-0 transition-opacity duration-1000 ${current === index ? "opacity-100" : "opacity-0"
//                         }`}
//                 />
//             ))}
//             {/* Optional: dark overlay for better visibility */}
//                 <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"></div>
//         </div>
//     );
// }

import { useEffect, useState } from "react";

export default function Carousel({ images }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="w-full h-[250px] sm:h-[350px] lg:h-[500px] relative overflow-hidden border-2 border-mainBlue">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            current === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={img}
            alt={`Slide ${index}`}
            className="w-full h-full object-fill"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"></div>
        </div>
      ))}
    </div>
  );
}

