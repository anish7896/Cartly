import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    FiPlusSquare,
    FiList,
    FiCheckCircle,
    FiMenu,
    FiX
} from "react-icons/fi";

function Sidebar() {
    const [open, setOpen] = useState(false);

    const links = [
        {
            name: "Add Items",
            path: "/add",
            icon: <FiPlusSquare />
        },
        {
            name: "List Items",
            path: "/lists",
            icon: <FiList />
        },
        {
            name: "View Orders",
            path: "/orders",
            icon: <FiCheckCircle />
        }
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setOpen(true)}
                className="
                    md:hidden
                    fixed
                    left-4
                    top-[88px]
                    z-40
                    w-10 h-10
                    flex items-center justify-center
                    rounded-lg
                    bg-[#111c20]
                    border border-gray-700
                    text-white
                    shadow-lg
                "
            >
                <FiMenu size={21} />
            </button>


            {/* Overlay - Mobile */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="
                        md:hidden
                        fixed inset-0
                        bg-black/50
                        z-40
                    "
                />
            )}


            {/* Sidebar */}
            <aside
                className={`
                    fixed md:static
                    top-0 md:top-auto
                    left-0
                    z-50 md:z-auto

                    w-[240px]
                    min-h-screen md:min-h-[calc(100vh-72px)]

                    bg-[#111c20]
                    border-r border-gray-700

                    transition-transform duration-300 ease-in-out

                    ${open
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                    }
                `}
            >

                {/* Mobile Header */}
                <div className="md:hidden h-[72px] flex items-center justify-between px-5 border-b border-gray-700">

                    <span className="text-white font-semibold">
                        Admin Menu
                    </span>

                    <button
                        onClick={() => setOpen(false)}
                        className="text-gray-400 hover:text-white transition"
                    >
                        <FiX size={22} />
                    </button>

                </div>


                {/* Links */}
                <div className="flex flex-col">

                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `
                                w-full
                                h-[52px]
                                flex
                                items-center
                                gap-3
                                px-5
                                border-b
                                border-gray-700
                                text-sm
                                transition-all

                                ${
                                    isActive
                                        ? "bg-[#1f3035] text-white border-l-4 border-l-cyan-400"
                                        : "text-gray-400 hover:bg-[#1a292d] hover:text-white"
                                }
                                `
                            }
                        >
                            <span className="text-[18px]">
                                {link.icon}
                            </span>

                            <span>
                                {link.name}
                            </span>
                        </NavLink>
                    ))}

                </div>

            </aside>
        </>
    );
}

export default Sidebar;