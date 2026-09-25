import { useNavigate } from "react-router-dom";
import {
    FiInstagram,
    FiFacebook,
    FiTwitter,
    FiMail,
    FiPhone,
    FiMapPin,
} from "react-icons/fi";

function Footer() {

    const navigate = useNavigate();

    return (
        <footer className="w-full bg-[#081316] text-white">

            {/* Main Footer */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-14">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>

                        <h2 className="text-2xl font-bold text-[#83D5D7]">
                            Cartly
                        </h2>

                        <p className="text-[#91A6A9] text-sm leading-6 mt-4 max-w-[280px]">
                            Discover products you'll love. Shop smart,
                            shop simple and enjoy a better shopping
                            experience with Cartly.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 mt-6">

                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-[#14272A] flex items-center justify-center text-[#91A6A9] hover:bg-[#2DB6C0] hover:text-white transition"
                            >
                                <FiInstagram size={17} />
                            </a>

                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-[#14272A] flex items-center justify-center text-[#91A6A9] hover:bg-[#2DB6C0] hover:text-white transition"
                            >
                                <FiFacebook size={17} />
                            </a>

                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-[#14272A] flex items-center justify-center text-[#91A6A9] hover:bg-[#2DB6C0] hover:text-white transition"
                            >
                                <FiTwitter size={17} />
                            </a>

                        </div>

                    </div>


                    {/* Quick Links */}
                    <div>

                        <h3 className="text-white font-semibold text-base mb-5">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-3">

                            <button
                                onClick={() => navigate("/")}
                                className="text-left text-sm text-[#91A6A9] hover:text-[#83D5D7] transition"
                            >
                                Home
                            </button>

                            <button
                                onClick={() => navigate("/collection")}
                                className="text-left text-sm text-[#91A6A9] hover:text-[#83D5D7] transition"
                            >
                                Collections
                            </button>

                            <button
                                onClick={() => navigate("/about")}
                                className="text-left text-sm text-[#91A6A9] hover:text-[#83D5D7] transition"
                            >
                                About Us
                            </button>

                            <button
                                onClick={() => navigate("/contact")}
                                className="text-left text-sm text-[#91A6A9] hover:text-[#83D5D7] transition"
                            >
                                Contact Us
                            </button>

                        </div>

                    </div>


                    {/* Customer Service */}
                    <div>

                        <h3 className="text-white font-semibold text-base mb-5">
                            Customer Service
                        </h3>

                        <div className="flex flex-col gap-3">

                            <button
                                onClick={() => navigate("/")}
                                className="text-left text-sm text-[#91A6A9] hover:text-[#83D5D7] transition"
                            >
                                Shipping Information
                            </button>

                            <button
                                onClick={() => navigate("/")}
                                className="text-left text-sm text-[#91A6A9] hover:text-[#83D5D7] transition"
                            >
                                Return & Exchange
                            </button>

                            <button
                                onClick={() => navigate("/")}
                                className="text-left text-sm text-[#91A6A9] hover:text-[#83D5D7] transition"
                            >
                                Privacy Policy
                            </button>

                            <button
                                onClick={() => navigate("/")}
                                className="text-left text-sm text-[#91A6A9] hover:text-[#83D5D7] transition"
                            >
                                Terms & Conditions
                            </button>

                        </div>

                    </div>


                    {/* Contact */}
                    <div>

                        <h3 className="text-white font-semibold text-base mb-5">
                            Contact Us
                        </h3>

                        <div className="flex flex-col gap-4">

                            <div className="flex items-start gap-3">
                                <FiMail
                                    size={17}
                                    className="text-[#83D5D7] mt-1 shrink-0"
                                />

                                <span className="text-sm text-[#91A6A9]">
                                    support@cartly.com
                                </span>
                            </div>

                            <div className="flex items-start gap-3">
                                <FiPhone
                                    size={17}
                                    className="text-[#83D5D7] mt-1 shrink-0"
                                />

                                <span className="text-sm text-[#91A6A9]">
                                    +91 XXXXX XXXXX
                                </span>
                            </div>

                            <div className="flex items-start gap-3">
                                <FiMapPin
                                    size={17}
                                    className="text-[#83D5D7] mt-1 shrink-0"
                                />

                                <span className="text-sm text-[#91A6A9]">
                                    India
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* Bottom Bar */}
            <div className="border-t border-[#1B2C2F]">

                <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">

                    <p className="text-xs text-[#687B7E]">
                        © {new Date().getFullYear()} Cartly. All rights reserved.
                    </p>

                    <p className="text-xs text-[#687B7E]">
                        Made with ❤️ for a better shopping experience.
                    </p>

                </div>

            </div>

        </footer>
    );
}

export default Footer;