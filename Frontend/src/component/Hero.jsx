import Background from "./Background";
import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Hero({ heroData, heroCount, setHeroCount }) {

    const navigate = useNavigate();

    return (
        <section className="relative w-full h-[calc(100vh-95px)] min-h-[500px] overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0">
                <Background heroCount={heroCount} />
            </div>


            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#173D41]/95 via-[#173D41]/60 to-[#173D41]/10">
            </div>


            {/* Content */}
            <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto flex items-center">

                <div className="w-full md:w-[52%] px-7 sm:px-10 md:px-12 lg:px-20">

                    {/* Small heading */}
                    <p className="text-[#B9E2DD] text-xs sm:text-sm font-semibold tracking-[3px] uppercase mb-4">
                        Welcome to Cartly
                    </p>


                    {/* Main heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">
                        {heroData.text1}
                    </h1>


                    {/* Second heading */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#D9EEEB] mt-2">
                        {heroData.text2}
                    </h2>


                    {/* Description */}
                    <p className="mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-[500px]">
                        Discover amazing products, great deals and everything
                        you need in one place.
                    </p>


                    {/* Shop Now */}
                    <button
                        onClick={() => navigate("/collection")}
                        className="mt-6 md:mt-8 px-6 sm:px-7 py-3 sm:py-3.5 bg-white text-[#173D41] rounded-full font-semibold text-sm sm:text-base hover:bg-[#E7F1EF] hover:scale-105 transition-all duration-300"
                    >
                        Shop Now
                    </button>

                </div>

            </div>


            {/* Slider dots */}
            <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">

                <FaCircle
                    size={9}
                    className={`cursor-pointer transition ${
                        heroCount === 0
                            ? "text-[#E57C61] scale-125"
                            : "text-white/60"
                    }`}
                    onClick={() => setHeroCount(0)}
                />

                <FaCircle
                    size={9}
                    className={`cursor-pointer transition ${
                        heroCount === 1
                            ? "text-[#E57C61] scale-125"
                            : "text-white/60"
                    }`}
                    onClick={() => setHeroCount(1)}
                />

                <FaCircle
                    size={9}
                    className={`cursor-pointer transition ${
                        heroCount === 2
                            ? "text-[#E57C61] scale-125"
                            : "text-white/60"
                    }`}
                    onClick={() => setHeroCount(2)}
                />

                <FaCircle
                    size={9}
                    className={`cursor-pointer transition ${
                        heroCount === 3
                            ? "text-[#E57C61] scale-125"
                            : "text-white/60"
                    }`}
                    onClick={() => setHeroCount(3)}
                />

            </div>

        </section>
    );
}

export default Hero;