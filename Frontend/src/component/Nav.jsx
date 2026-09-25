import { useContext, useEffect, useRef, useState } from "react";
import {
    useNavigate,
    useLocation
} from "react-router-dom";

import axios from "axios";

import { AuthContext } from "../context/authContext";
import { useUser } from "../context/UserContext";
import { shopDataContext } from "../context/ShopContext";

import {
    FiSearch,
    FiShoppingCart,
    FiUser,
    FiPackage,
    FiLogOut,
    FiHome,
    FiGrid,
    FiInfo,
    FiMail,
    FiX,
} from "react-icons/fi";

import Logo from "../assets/Logo.png";


function Nav() {

    const navigate = useNavigate();
    const location = useLocation();

    const { serverUrl } = useContext(AuthContext);
    const { user, setUser } = useUser();

    const { getCartCount } = useContext(shopDataContext);

    const [showSearch, setShowSearch] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [search, setSearch] = useState("");

    const profileRef = useRef(null);


    // =========================================================
    // ACTIVE NAVIGATION
    // =========================================================

    const isActive = (path) => {

        if (path === "/") {
            return location.pathname === "/";
        }

        return location.pathname === path;
    };


    // =========================================================
    // CLOSE PROFILE WHEN CLICKING OUTSIDE
    // =========================================================

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setShowProfile(false);
            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    // =========================================================
    // LOGOUT
    // =========================================================

    const handleLogout = async () => {

        try {

            await axios.get(
                `${serverUrl}/api/auth/logout`,
                {
                    withCredentials: true,
                }
            );

            setUser(null);
            setShowProfile(false);
            setShowSearch(false);

            navigate("/login");

        } catch (error) {

            console.error(
                "Logout error:",
                error
            );

        }

    };


    // =========================================================
    // SEARCH
    // =========================================================

    const handleSearch = (e) => {

        e.preventDefault();

        const searchValue = search.trim();

        if (!searchValue) {
            return;
        }

        navigate(
            `/collection?search=${encodeURIComponent(searchValue)}`
        );

        setShowSearch(false);
    };


    // =========================================================
    // PROFILE NAVIGATION
    // =========================================================

    const handleProfileNavigation = (path) => {

        navigate(path);
        setShowProfile(false);

    };


    // =========================================================
    // CART NAVIGATION
    // =========================================================

    const handleCartNavigation = () => {

        if (user) {

            // Logged in
            navigate("/cart");

        } else {

            // Not logged in
            navigate("/login", {
                state: {
                    from: "/cart"
                }
            });

        }

    };


    return (
        <>

            {/* ================================================= */}
            {/*                    TOP NAVBAR                     */}
            {/* ================================================= */}

            <nav className="sticky top-0 left-0 z-50 w-full bg-white">

                <div className="
                    w-full
                    h-[68px]
                    px-4
                    md:px-6
                    bg-white
                    shadow-[0_5px_25px_rgba(15,23,42,0.08)]
                    flex
                    items-center
                    gap-4
                ">


                    {/* ================================================= */}
                    {/*                         LOGO                       */}
                    {/* ================================================= */}

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            cursor-pointer
                            shrink-0
                        "
                        onClick={() => navigate("/")}
                    >

                        <img
                            src={Logo}
                            alt="Cartly"
                            className="
                                w-[38px]
                                h-[38px]
                                object-contain
                            "
                        />

                        <h1 className="
                            text-[21px]
                            md:text-[23px]
                            font-bold
                            text-[#17363A]
                        ">
                            Cartly
                        </h1>

                    </div>


                    {/* ================================================= */}
                    {/*                DESKTOP NAVIGATION                 */}
                    {/* ================================================= */}

                    <div className="
                        hidden
                        lg:flex
                        items-center
                        gap-1
                        ml-3
                    ">


                        {/* ================= HOME ================= */}

                        <button
                            onClick={() => navigate("/")}
                            className={`
                                px-4
                                py-2
                                rounded-full
                                text-[12px]
                                font-semibold
                                transition

                                ${
                                    isActive("/")
                                        ? "bg-[#173D41] text-white"
                                        : "text-[#26383A] hover:bg-[#E7F1EF]"
                                }
                            `}
                        >
                            HOME
                        </button>


                        {/* ================ COLLECTIONS ================ */}

                        <button
                            onClick={() =>
                                navigate("/collection")
                            }
                            className={`
                                px-4
                                py-2
                                rounded-full
                                text-[12px]
                                font-semibold
                                transition

                                ${
                                    isActive("/collection")
                                        ? "bg-[#173D41] text-white"
                                        : "text-[#26383A] hover:bg-[#E7F1EF]"
                                }
                            `}
                        >
                            COLLECTIONS
                        </button>


                        {/* ================= ABOUT ================= */}

                        <button
                            onClick={() =>
                                navigate("/about")
                            }
                            className={`
                                px-4
                                py-2
                                rounded-full
                                text-[12px]
                                font-semibold
                                transition

                                ${
                                    isActive("/about")
                                        ? "bg-[#173D41] text-white"
                                        : "text-[#26383A] hover:bg-[#E7F1EF]"
                                }
                            `}
                        >
                            ABOUT
                        </button>


                        {/* ================= CONTACT ================= */}

                        <button
                            onClick={() =>
                                navigate("/contact")
                            }
                            className={`
                                px-4
                                py-2
                                rounded-full
                                text-[12px]
                                font-semibold
                                transition

                                ${
                                    isActive("/contact")
                                        ? "bg-[#173D41] text-white"
                                        : "text-[#26383A] hover:bg-[#E7F1EF]"
                                }
                            `}
                        >
                            CONTACT
                        </button>

                    </div>


                    {/* ================================================= */}
                    {/*                  DESKTOP SEARCH                  */}
                    {/* ================================================= */}

                    <form
                        onSubmit={handleSearch}
                        className="
                            hidden
                            md:flex
                            flex-1
                            max-w-[360px]
                            ml-auto
                            relative
                        "
                    >

                        <FiSearch
                            size={18}
                            className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-[#8A999A]
                            "
                        />

                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="
                                w-full
                                h-[42px]
                                pl-11
                                pr-4
                                rounded-full
                                bg-[#F1F5F4]
                                text-[#17363A]
                                text-sm
                                outline-none
                                border
                                border-transparent
                                focus:border-[#7AB8B0]
                                focus:bg-white
                                transition
                            "
                        />

                    </form>


                    {/* ================================================= */}
                    {/*                     RIGHT SIDE                   */}
                    {/* ================================================= */}

                    <div className="
                        flex
                        items-center
                        gap-2
                        ml-auto
                        md:ml-0
                    ">


                        {/* ================= MOBILE SEARCH ================= */}

                        <button
                            onClick={() =>
                                setShowSearch(
                                    (prev) => !prev
                                )
                            }
                            className="
                                md:hidden
                                w-10
                                h-10
                                rounded-full
                                flex
                                items-center
                                justify-center
                                text-[#17363A]
                                hover:bg-[#E7F1EF]
                                transition
                            "
                            aria-label="Search"
                        >

                            {showSearch ? (
                                <FiX size={21} />
                            ) : (
                                <FiSearch size={21} />
                            )}

                        </button>


                        {/* ================================================= */}
                        {/*                       PROFILE                     */}
                        {/* ================================================= */}

                        {user ? (

                            <div
                                className="relative"
                                ref={profileRef}
                            >

                                {/* PROFILE BUTTON */}

                                <button
                                    onClick={() =>
                                        setShowProfile(
                                            (prev) => !prev
                                        )
                                    }
                                    className="
                                        w-10
                                        h-10
                                        rounded-full
                                        bg-[#173D41]
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        font-semibold
                                        text-sm
                                        hover:bg-[#21565A]
                                        transition
                                    "
                                    aria-label="User profile"
                                >

                                    {user.name
                                        ?.charAt(0)
                                        .toUpperCase()}

                                </button>


                                {/* ================================================= */}
                                {/*                  PROFILE DROPDOWN                 */}
                                {/* ================================================= */}

                                {showProfile && (

                                    <div className="
                                        absolute
                                        right-0
                                        top-[52px]
                                        w-[245px]
                                        bg-white
                                        rounded-xl
                                        shadow-[0_12px_35px_rgba(0,0,0,0.15)]
                                        border
                                        border-[#E6ECEB]
                                        overflow-hidden
                                        z-[100]
                                    ">


                                        {/* USER INFORMATION */}

                                        <div className="
                                            px-5
                                            py-4
                                            bg-[#F7FAF9]
                                            border-b
                                            border-[#E6ECEB]
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                gap-3
                                            ">

                                                <div className="
                                                    w-11
                                                    h-11
                                                    rounded-full
                                                    bg-[#173D41]
                                                    text-white
                                                    flex
                                                    items-center
                                                    justify-center
                                                    font-semibold
                                                ">

                                                    {user.name
                                                        ?.charAt(0)
                                                        .toUpperCase()}

                                                </div>


                                                <div className="
                                                    min-w-0
                                                ">

                                                    <p className="
                                                        font-semibold
                                                        text-[#17363A]
                                                        truncate
                                                    ">
                                                        {user.name}
                                                    </p>

                                                    <p className="
                                                        text-xs
                                                        text-gray-500
                                                        truncate
                                                    ">
                                                        {user.email}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>


                                        {/* MY PROFILE */}

                                        <button
                                            onClick={() =>
                                                handleProfileNavigation(
                                                    "/profile"
                                                )
                                            }
                                            className="
                                                w-full
                                                flex
                                                items-center
                                                gap-3
                                                px-5
                                                py-3
                                                text-sm
                                                text-[#26383A]
                                                hover:bg-[#F1F6F5]
                                                transition
                                            "
                                        >

                                            <FiUser size={17} />

                                            My Profile

                                        </button>


                                        {/* MY ORDERS */}

                                        <button
                                            onClick={() =>
                                                handleProfileNavigation(
                                                    "/orders"
                                                )
                                            }
                                            className="
                                                w-full
                                                flex
                                                items-center
                                                gap-3
                                                px-5
                                                py-3
                                                text-sm
                                                text-[#26383A]
                                                hover:bg-[#F1F6F5]
                                                transition
                                            "
                                        >

                                            <FiPackage size={17} />

                                            My Orders

                                        </button>


                                        {/* LOGOUT */}

                                        <button
                                            onClick={handleLogout}
                                            className="
                                                w-full
                                                flex
                                                items-center
                                                gap-3
                                                px-5
                                                py-3
                                                text-sm
                                                text-red-500
                                                hover:bg-red-50
                                                transition
                                                border-t
                                                border-[#E6ECEB]
                                            "
                                        >

                                            <FiLogOut size={17} />

                                            Logout

                                        </button>

                                    </div>

                                )}

                            </div>

                        ) : (

                            /* ================= LOGIN BUTTON ================= */

                            <button
                                onClick={() =>
                                    navigate("/login")
                                }
                                className="
                                    w-10
                                    h-10
                                    rounded-full
                                    border
                                    border-[#D8E2E0]
                                    flex
                                    items-center
                                    justify-center
                                    text-[#17363A]
                                    hover:bg-[#E7F1EF]
                                    transition
                                "
                                aria-label="Login"
                            >

                                <FiUser size={19} />

                            </button>

                        )}


                        {/* ================================================= */}
                        {/*                         CART                    */}
                        {/* ================================================= */}

                        <button
                            onClick={handleCartNavigation}
                            className="
                                relative
                                w-10
                                h-10
                                rounded-full
                                bg-[#173D41]
                                text-white
                                flex
                                items-center
                                justify-center
                                hover:bg-[#21565A]
                                transition
                            "
                            aria-label="Shopping cart"
                        >

                            <FiShoppingCart size={18} />

                            {/* REAL CART COUNT */}

                            {getCartCount() > 0 && (

                                <span className="
                                    absolute
                                    -top-1
                                    -right-1
                                    min-w-[18px]
                                    h-[18px]
                                    px-1
                                    rounded-full
                                    bg-[#E57C61]
                                    text-white
                                    text-[10px]
                                    font-bold
                                    flex
                                    items-center
                                    justify-center
                                ">
                                    {getCartCount()}
                                </span>

                            )}

                        </button>

                    </div>

                </div>


                {/* ================================================= */}
                {/*                   MOBILE SEARCH                  */}
                {/* ================================================= */}

                {showSearch && (

                    <form
                        onSubmit={handleSearch}
                        className="
                            md:hidden
                            absolute
                            left-0
                            top-full
                            w-full
                            px-4
                            py-3
                            bg-[#F5F8F7]
                            shadow-md
                        "
                    >

                        <div className="relative">

                            <FiSearch
                                size={19}
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                "
                            />

                            <input
                                autoFocus
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="
                                    w-full
                                    h-[45px]
                                    pl-11
                                    pr-4
                                    rounded-full
                                    bg-white
                                    border
                                    border-[#DCE6E4]
                                    outline-none
                                    text-sm
                                "
                            />

                        </div>

                    </form>

                )}

            </nav>


            {/* ================================================= */}
            {/*                MOBILE BOTTOM NAV                 */}
            {/* ================================================= */}

            <div className="
                md:hidden
                fixed
                bottom-0
                left-0
                z-50
                w-full
                h-[68px]
                bg-[#173D41]
                flex
                items-center
                justify-around
                shadow-[0_-5px_20px_rgba(0,0,0,0.12)]
            ">


                {/* HOME */}

                <button
                    onClick={() => navigate("/")}
                    className={`
                        flex
                        flex-col
                        items-center
                        gap-1
                        text-[10px]

                        ${
                            isActive("/")
                                ? "text-white"
                                : "text-[#C9D9D7]"
                        }
                    `}
                >

                    <FiHome size={21} />

                    Home

                </button>


                {/* COLLECTIONS */}

                <button
                    onClick={() =>
                        navigate("/collection")
                    }
                    className={`
                        flex
                        flex-col
                        items-center
                        gap-1
                        text-[10px]

                        ${
                            isActive("/collection")
                                ? "text-white"
                                : "text-[#C9D9D7]"
                        }
                    `}
                >

                    <FiGrid size={21} />

                    Collections

                </button>


                {/* ABOUT */}

                <button
                    onClick={() =>
                        navigate("/about")
                    }
                    className={`
                        flex
                        flex-col
                        items-center
                        gap-1
                        text-[10px]

                        ${
                            isActive("/about")
                                ? "text-white"
                                : "text-[#C9D9D7]"
                        }
                    `}
                >

                    <FiInfo size={21} />

                    About

                </button>


                {/* CONTACT */}

                <button
                    onClick={() =>
                        navigate("/contact")
                    }
                    className={`
                        flex
                        flex-col
                        items-center
                        gap-1
                        text-[10px]

                        ${
                            isActive("/contact")
                                ? "text-white"
                                : "text-[#C9D9D7]"
                        }
                    `}
                >

                    <FiMail size={21} />

                    Contact

                </button>


                {/* CART */}

                <button
                    onClick={handleCartNavigation}
                    className="
                        relative
                        flex
                        flex-col
                        items-center
                        gap-1
                        text-[#C9D9D7]
                        text-[10px]
                    "
                >

                    <FiShoppingCart size={21} />

                    <span>
                        Cart
                    </span>

                    {/* REAL CART COUNT */}

                    {getCartCount() > 0 && (

                        <span className="
                            absolute
                            -top-1
                            right-[-7px]
                            w-[16px]
                            h-[16px]
                            rounded-full
                            bg-[#E57C61]
                            text-white
                            text-[9px]
                            flex
                            items-center
                            justify-center
                        ">
                            {getCartCount()}
                        </span>

                    )}

                </button>

            </div>

        </>
    );
}

export default Nav;