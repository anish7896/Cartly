import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiSend,
} from "react-icons/fi";

function Contact() {
    return (
        <div className="w-full bg-[#0C2025] text-white">

            {/* ================= HERO ================= */}
            <section className="px-6 md:px-10 py-20 md:py-24">

                <div className="max-w-[900px] mx-auto text-center">

                    <p className="text-[#83D5D7] text-xs md:text-sm tracking-[4px] uppercase font-medium">
                        CONTACT US
                    </p>

                    <h1 className="text-4xl md:text-5xl font-semibold mt-4">
                        We'd Love to
                        <span className="text-[#83D5D7]"> Hear From You</span>
                    </h1>

                    <p className="text-[#91A6A9] text-sm md:text-base leading-7 max-w-[650px] mx-auto mt-6">
                        Have a question about a product, your order, or
                        anything else? Send us a message and we'll be happy
                        to help.
                    </p>

                </div>

            </section>


            {/* ================= CONTACT CONTENT ================= */}
            <section className="px-6 md:px-10 pb-20">

                <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* ================= CONTACT INFO ================= */}
                    <div className="bg-[#132124] border border-[#26383B] rounded-2xl p-7 md:p-9">

                        <p className="text-[#83D5D7] text-xs tracking-[3px] uppercase">
                            GET IN TOUCH
                        </p>

                        <h2 className="text-2xl md:text-3xl font-semibold mt-3">
                            Contact Information
                        </h2>

                        <p className="text-[#91A6A9] text-sm leading-6 mt-4">
                            Reach out to us using any of the contact details
                            below. We're happy to assist you with your
                            shopping experience.
                        </p>


                        {/* Email */}
                        <div className="flex items-start gap-4 mt-8">

                            <div className="w-11 h-11 shrink-0 rounded-full bg-[#18383B] flex items-center justify-center">
                                <FiMail
                                    size={19}
                                    className="text-[#83D5D7]"
                                />
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    Email
                                </h3>

                                <p className="text-[#91A6A9] text-sm mt-1">
                                    support@cartly.com
                                </p>
                            </div>

                        </div>


                        {/* Phone */}
                        <div className="flex items-start gap-4 mt-6">

                            <div className="w-11 h-11 shrink-0 rounded-full bg-[#18383B] flex items-center justify-center">
                                <FiPhone
                                    size={19}
                                    className="text-[#83D5D7]"
                                />
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    Phone
                                </h3>

                                <p className="text-[#91A6A9] text-sm mt-1">
                                    +91 XXXXX XXXXX
                                </p>
                            </div>

                        </div>


                        {/* Location */}
                        <div className="flex items-start gap-4 mt-6">

                            <div className="w-11 h-11 shrink-0 rounded-full bg-[#18383B] flex items-center justify-center">
                                <FiMapPin
                                    size={19}
                                    className="text-[#83D5D7]"
                                />
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    Location
                                </h3>

                                <p className="text-[#91A6A9] text-sm mt-1">
                                    India
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* ================= CONTACT FORM ================= */}
                    <div className="bg-[#132124] border border-[#26383B] rounded-2xl p-7 md:p-9">

                        <p className="text-[#83D5D7] text-xs tracking-[3px] uppercase">
                            SEND A MESSAGE
                        </p>

                        <h2 className="text-2xl md:text-3xl font-semibold mt-3">
                            How Can We Help?
                        </h2>


                        <form className="mt-7">

                            {/* Name */}
                            <div>
                                <label className="block text-sm text-[#C5D0D2] mb-2">
                                    Your Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full h-12 px-4 rounded-lg bg-[#0D191C] border border-[#26383B] text-white text-sm outline-none placeholder:text-[#647477] focus:border-[#2DB6C0] transition"
                                />
                            </div>


                            {/* Email */}
                            <div className="mt-5">

                                <label className="block text-sm text-[#C5D0D2] mb-2">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full h-12 px-4 rounded-lg bg-[#0D191C] border border-[#26383B] text-white text-sm outline-none placeholder:text-[#647477] focus:border-[#2DB6C0] transition"
                                />

                            </div>


                            {/* Subject */}
                            <div className="mt-5">

                                <label className="block text-sm text-[#C5D0D2] mb-2">
                                    Subject
                                </label>

                                <input
                                    type="text"
                                    placeholder="What is this regarding?"
                                    className="w-full h-12 px-4 rounded-lg bg-[#0D191C] border border-[#26383B] text-white text-sm outline-none placeholder:text-[#647477] focus:border-[#2DB6C0] transition"
                                />

                            </div>


                            {/* Message */}
                            <div className="mt-5">

                                <label className="block text-sm text-[#C5D0D2] mb-2">
                                    Message
                                </label>

                                <textarea
                                    rows="5"
                                    placeholder="Write your message..."
                                    className="w-full px-4 py-3 rounded-lg bg-[#0D191C] border border-[#26383B] text-white text-sm outline-none resize-none placeholder:text-[#647477] focus:border-[#2DB6C0] transition"
                                />

                            </div>


                            {/* Button */}
                            <button
                                type="submit"
                                className="w-full h-12 mt-6 rounded-lg bg-[#2DB6C0] hover:bg-[#229CA5] text-white font-semibold text-sm flex items-center justify-center gap-2 transition"
                            >
                                <FiSend size={17} />
                                Send Message
                            </button>

                        </form>

                    </div>

                </div>

            </section>


            {/* ================= BOTTOM MESSAGE ================= */}
            <section className="border-t border-[#1B2C2F] px-6 py-12">

                <div className="max-w-[700px] mx-auto text-center">

                    <h2 className="text-xl md:text-2xl font-semibold">
                        Thank you for choosing Cartly
                    </h2>

                    <p className="text-[#91A6A9] text-sm mt-3">
                        Your feedback and questions help us improve your
                        shopping experience.
                    </p>

                </div>

            </section>

        </div>
    );
}

export default Contact;