import {
    FiShoppingBag,
    FiShield,
    FiHeart,
    FiUsers,
} from "react-icons/fi";

function About() {
    return (
        <div className="w-full bg-[#0C2025] text-white">

            {/* ================= HERO ================= */}
            <section className="px-6 md:px-10 py-20 md:py-28">
                <div className="max-w-[1100px] mx-auto text-center">

                    <p className="text-[#83D5D7] text-xs md:text-sm tracking-[4px] uppercase font-medium">
                        ABOUT CARTLY
                    </p>

                    <h1 className="text-4xl md:text-6xl font-semibold mt-4">
                        Shopping Made
                        <span className="text-[#83D5D7]"> Simple.</span>
                    </h1>

                    <p className="text-[#91A6A9] text-sm md:text-base leading-7 max-w-[700px] mx-auto mt-6">
                        Cartly is an e-commerce platform designed to make
                        online shopping simple, convenient and enjoyable.
                        Discover products, explore collections and shop
                        everything you need in one place.
                    </p>

                </div>
            </section>


            {/* ================= WHO WE ARE ================= */}
            <section className="px-6 md:px-10 py-16 bg-[#101C20]">

                <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    <div>

                        <p className="text-[#83D5D7] text-xs tracking-[3px] uppercase">
                            WHO WE ARE
                        </p>

                        <h2 className="text-3xl md:text-4xl font-semibold mt-3">
                            Welcome to Cartly
                        </h2>

                        <p className="text-[#91A6A9] leading-7 text-sm md:text-base mt-6">
                            Cartly is built with the idea of bringing a
                            smooth and user-friendly shopping experience
                            to everyone. Our platform allows customers to
                            discover products, explore different categories
                            and easily manage their shopping journey.
                        </p>

                        <p className="text-[#91A6A9] leading-7 text-sm md:text-base mt-4">
                            From browsing products to placing an order,
                            we focus on keeping the experience simple,
                            intuitive and convenient.
                        </p>

                    </div>


                    {/* Visual Card */}
                    <div className="flex justify-center">

                        <div className="w-full max-w-[420px] h-[300px] rounded-2xl bg-[#152A2D] border border-[#26383B] flex items-center justify-center">

                            <div className="text-center">

                                <div className="w-20 h-20 mx-auto rounded-full bg-[#1B4145] flex items-center justify-center">
                                    <FiShoppingBag
                                        size={36}
                                        className="text-[#83D5D7]"
                                    />
                                </div>

                                <h3 className="text-2xl font-semibold mt-6">
                                    Cartly
                                </h3>

                                <p className="text-[#91A6A9] text-sm mt-2">
                                    Your shopping destination
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= OUR VALUES ================= */}
            <section className="px-6 md:px-10 py-20">

                <div className="max-w-[1100px] mx-auto">

                    <div className="text-center mb-12">

                        <p className="text-[#83D5D7] text-xs tracking-[3px] uppercase">
                            OUR VALUES
                        </p>

                        <h2 className="text-3xl md:text-4xl font-semibold mt-3">
                            What We Focus On
                        </h2>

                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                        {/* Value 1 */}
                        <div className="bg-[#132124] border border-[#26383B] rounded-xl p-7 text-center hover:border-[#2DB6C0] transition">

                            <div className="w-12 h-12 mx-auto rounded-full bg-[#18383B] flex items-center justify-center">
                                <FiShoppingBag
                                    size={22}
                                    className="text-[#83D5D7]"
                                />
                            </div>

                            <h3 className="font-semibold mt-5">
                                Easy Shopping
                            </h3>

                            <p className="text-[#91A6A9] text-sm leading-6 mt-3">
                                A simple and intuitive shopping experience.
                            </p>

                        </div>


                        {/* Value 2 */}
                        <div className="bg-[#132124] border border-[#26383B] rounded-xl p-7 text-center hover:border-[#2DB6C0] transition">

                            <div className="w-12 h-12 mx-auto rounded-full bg-[#18383B] flex items-center justify-center">
                                <FiShield
                                    size={22}
                                    className="text-[#83D5D7]"
                                />
                            </div>

                            <h3 className="font-semibold mt-5">
                                Secure Experience
                            </h3>

                            <p className="text-[#91A6A9] text-sm leading-6 mt-3">
                                We focus on keeping your shopping experience
                                safe and reliable.
                            </p>

                        </div>


                        {/* Value 3 */}
                        <div className="bg-[#132124] border border-[#26383B] rounded-xl p-7 text-center hover:border-[#2DB6C0] transition">

                            <div className="w-12 h-12 mx-auto rounded-full bg-[#18383B] flex items-center justify-center">
                                <FiHeart
                                    size={22}
                                    className="text-[#83D5D7]"
                                />
                            </div>

                            <h3 className="font-semibold mt-5">
                                Customer First
                            </h3>

                            <p className="text-[#91A6A9] text-sm leading-6 mt-3">
                                Designed around a convenient customer
                                experience.
                            </p>

                        </div>


                        {/* Value 4 */}
                        <div className="bg-[#132124] border border-[#26383B] rounded-xl p-7 text-center hover:border-[#2DB6C0] transition">

                            <div className="w-12 h-12 mx-auto rounded-full bg-[#18383B] flex items-center justify-center">
                                <FiUsers
                                    size={22}
                                    className="text-[#83D5D7]"
                                />
                            </div>

                            <h3 className="font-semibold mt-5">
                                Built for Everyone
                            </h3>

                            <p className="text-[#91A6A9] text-sm leading-6 mt-3">
                                A platform created to make online shopping
                                accessible and convenient.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= BOTTOM CTA ================= */}
            <section className="px-6 md:px-10 py-16 bg-[#101C20]">

                <div className="max-w-[800px] mx-auto text-center">

                    <h2 className="text-3xl md:text-4xl font-semibold">
                        Discover Your Next Favorite Product
                    </h2>

                    <p className="text-[#91A6A9] text-sm md:text-base mt-4">
                        Explore our collections and find something you'll love.
                    </p>

                </div>

            </section>

        </div>
    );
}

export default About;