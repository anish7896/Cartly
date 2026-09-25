import Hero from "../component/Hero";
import { useState, useEffect } from "react";
import Product from "./Product";
import OurPolicy from "../component/OurPolicy";
import Footer from "../component/Footer";

function Home() {

    const [heroCount, setHeroCount] = useState(0);

    const heroData = [
        {
            text1: "Discover Your",
            text2: "Perfect Style",
        },
        {
            text1: "Shop Smarter",
            text2: "Live Better",
        },
        {
            text1: "Everything You",
            text2: "Need In One Place",
        },
        {
            text1: "Great Products",
            text2: "Great Prices",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setHeroCount((prev) => (prev + 1) % heroData.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full">

            <Hero
                heroData={heroData[heroCount]}
                heroCount={heroCount}
                setHeroCount={setHeroCount}
            />

            <Product />
            <OurPolicy/>
            <Footer/>

        </div>
    );
}

export default Home;