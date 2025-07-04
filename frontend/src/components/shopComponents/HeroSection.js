import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function HeroSection({ searchQuery, onSearch }) {
    const [keyword, setKeyword] = useState("");

    return (
        <div className="flex flex-col lg:flex-row-reverse items-end justify-start w-full h-auto lg:h-[650px] bg-subGrey px-0 py-0">
            {/* Text + Search */}
            <div className="flex flex-col items-center justify-center w-full h-full lg:w-3/5 gap-10 lg:gap-[100px] px-3 py-[40px]">
                {/* Title & Subtitle */}
                <div className="flex flex-col items-center text-center gap-4 lg:gap-[20px]">
                    <h1 className="font-rufina font-bold text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] text-mainBlue leading-tight">
                        FIND YOUR PERFECT FIT
                    </h1>
                    <p className="font-poppins font-medium text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-subBlue">
                        Search your style, size, or favorite design instantly.
                    </p>
                </div>

                {/* Search Box */}
                <div className="flex items-center w-full max-w-[500px] h-[54px] sm:h-[60px] border-[2px] sm:border-[3px] bg-mainBlue border-mainBlue rounded-md overflow-hidden">
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search products..."
                        className="w-full px-4 py-2 h-full outline-none font-poppins text-sm sm:text-base"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onSearch(e.target.value);
                            }
                        }}
                    />
                    <button
                        onClick={() => onSearch(keyword)}
                        className="px-4 text-white text-xl sm:text-2xl"
                    >
                        <FiSearch />
                    </button>
                </div>
            </div>

            {/* Image */}
            <div className="w-full lg:w-2/5 mb-0">
                <img src="/assets/shopHero.png" className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-full" alt="Hero" />
            </div>
        </div>
    );
}
