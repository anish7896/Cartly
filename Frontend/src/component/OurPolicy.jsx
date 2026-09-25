import {
    FiRefreshCw,
    FiTruck,
    FiShield,
    FiHeadphones,
} from "react-icons/fi";

function OurPolicy() {
    return (
        <section className="w-full bg-[#0c2025] py-16 md:py-20 px-5 md:px-10">

            <div className="max-w-[1200px] mx-auto">

                {/* Heading */}
                <div className="text-center mb-12">

                    <p className="text-[#83D5D7] text-xs md:text-sm tracking-[3px] uppercase font-medium">
                        OUR POLICY
                    </p>

                    <h2 className="text-2xl md:text-3xl font-semibold text-white mt-3">
                        Customer-Friendly Policies
                    </h2>

                    <p className="text-[#91A6A9] text-sm mt-3 max-w-[600px] mx-auto">
                        Committed to providing you with a simple, secure
                        and satisfying shopping experience.
                    </p>

                </div>


                {/* Policy Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                    {/* Exchange Policy */}
                    <div className="group text-center bg-[#132124] border border-[#26383B] rounded-xl px-6 py-8 hover:border-[#2DB6C0] transition-all duration-300">

                        <div className="w-12 h-12 mx-auto rounded-full bg-[#18383B] flex items-center justify-center text-[#83D5D7] group-hover:bg-[#2DB6C0] group-hover:text-white transition-all duration-300">
                            <FiRefreshCw size={22} />
                        </div>

                        <h3 className="text-white font-semibold text-base mt-5">
                            Easy Exchange Policy
                        </h3>

                        <p className="text-[#91A6A9] text-sm leading-6 mt-3">
                            Exchange made easy with a quick, simple and
                            customer-friendly process.
                        </p>

                    </div>


                    {/* Shipping Policy */}
                    <div className="group text-center bg-[#132124] border border-[#26383B] rounded-xl px-6 py-8 hover:border-[#2DB6C0] transition-all duration-300">

                        <div className="w-12 h-12 mx-auto rounded-full bg-[#18383B] flex items-center justify-center text-[#83D5D7] group-hover:bg-[#2DB6C0] group-hover:text-white transition-all duration-300">
                            <FiTruck size={22} />
                        </div>

                        <h3 className="text-white font-semibold text-base mt-5">
                            Fast & Reliable Shipping
                        </h3>

                        <p className="text-[#91A6A9] text-sm leading-6 mt-3">
                            Reliable delivery with careful packaging and
                            timely order processing.
                        </p>

                    </div>


                    {/* Payment Policy */}
                    <div className="group text-center bg-[#132124] border border-[#26383B] rounded-xl px-6 py-8 hover:border-[#2DB6C0] transition-all duration-300">

                        <div className="w-12 h-12 mx-auto rounded-full bg-[#18383B] flex items-center justify-center text-[#83D5D7] group-hover:bg-[#2DB6C0] group-hover:text-white transition-all duration-300">
                            <FiShield size={22} />
                        </div>

                        <h3 className="text-white font-semibold text-base mt-5">
                            Secure Payments
                        </h3>

                        <p className="text-[#91A6A9] text-sm leading-6 mt-3">
                            Your payment information is handled securely
                            throughout the checkout process.
                        </p>

                    </div>


                    {/* Customer Support */}
                    <div className="group text-center bg-[#132124] border border-[#26383B] rounded-xl px-6 py-8 hover:border-[#2DB6C0] transition-all duration-300">

                        <div className="w-12 h-12 mx-auto rounded-full bg-[#18383B] flex items-center justify-center text-[#83D5D7] group-hover:bg-[#2DB6C0] group-hover:text-white transition-all duration-300">
                            <FiHeadphones size={22} />
                        </div>

                        <h3 className="text-white font-semibold text-base mt-5">
                            Customer Support
                        </h3>

                        <p className="text-[#91A6A9] text-sm leading-6 mt-3">
                            Have a question? Our support team is here
                            to help you with your orders and queries.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default OurPolicy;