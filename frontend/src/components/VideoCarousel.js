import { useState } from "react";


export default function VideoCarousel({videos}) {
    const [current, setCurrent] = useState(0);

    const handleEnded = () => {
        // Go to next video after current ends
        setCurrent((prev) => (prev + 1) % videos.length);
    };

    const prev = () => {
        setCurrent((prev) => (prev - 1 + videos.length) % videos.length);
    };

    const next = () => {
        setCurrent((prev) => (prev + 1) % videos.length);
    };

    return (
        <div className="relative w-full max-w-full overflow-hidden shadow-lg">
            <div className="relative">
                <video
                    key={current} // re-trigger video load
                    src={videos[current]}
                    autoPlay
                    onEnded={handleEnded}
                    muted
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-fill"
                />

                {/* Optional: dark overlay for better visibility */}
                <div className="absolute inset-0 bg-black bg-opacity-80 pointer-events-none"></div>

                {/* Navigation buttons (optional) */}
                <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition"
                >
                    ❮
                </button>
                <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition"
                >
                    ❯
                </button>
            </div>
        </div>
    );
}
