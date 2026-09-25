import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";

import Logo from "../assets/Logo.png";
import { AdminContext } from "../context/AdminContext";
import { AuthContext } from "../context/AuthContext";

function Nav() {
    const { setAdmin } = useContext(AdminContext);
    const { serverUrl } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const result = await axios.get(
                `${serverUrl}/api/auth/logout`,
                {
                    withCredentials: true
                }
            );

            console.log(result.data);

            setAdmin(null);
            navigate("/login");

        } catch (error) {
            console.log("Logout error:", error);
        }
    };

    return (
        <nav className="w-full h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-6 md:px-8 sticky top-0 z-50 shadow-sm">

            {/* LEFT - LOGO */}
            <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => navigate("/")}
            >
                <img
                    src={Logo}
                    alt="Cartly"
                    className="w-11 h-11 object-contain"
                />

                <div>
                    <h1 className="text-[22px] font-semibold text-gray-800 leading-5">
                        Cartly
                    </h1>

                    <p className="text-[11px] text-gray-400 mt-1">
                        Admin Panel
                    </p>
                </div>
            </div>


            {/* RIGHT - LOGOUT */}
            <button
                onClick={logout}
                className="
                    flex items-center gap-2
                    px-4 py-2.5
                    rounded-lg
                    bg-red-50
                    border border-red-200
                    text-red-600
                    font-medium
                    text-sm
                    hover:bg-red-500
                    hover:border-red-500
                    hover:text-white
                    active:scale-95
                    transition-all duration-200
                "
            >
                <FiLogOut size={17} />

                <span>
                    Logout
                </span>
            </button>

        </nav>
    );
}

export default Nav;