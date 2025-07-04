import { useEffect, useState } from "react";

export default function HeroSlider({ heroimg }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % heroimg.length);
        }, 3000); // changes image every 3 seconds

        return () => clearInterval(interval); // cleanup on unmount
    }, [heroimg.length]);

    return (
        <div>
            <div className="flex items-center justify-center bg-subBlue h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] md:h-[450px] md:w-[450px] pt-[10px] m-0 md:ml-[25px] border-2 border-mainBlue rounded-tl-[100px] rounded-tr-[20px] rounded-br-[100px] rounded-bl-[20px] overflow-hidden relative">
                {/* Background image or base */}
                <img
                    src={heroimg[currentIndex]}
                    alt={`Slide ${currentIndex}`}
                    className="h-full w-full object-contain absolute top-0 left-0 transition-opacity duration-1000 opacity-100"
                />
            </div>
        </div>
    );
}

