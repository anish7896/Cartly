import Logo from "../assets/Logo.png";

import { useNavigate } from "react-router-dom";

import { IoEye, IoEyeOff } from "react-icons/io5";

import { useState, useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import axios from "axios";

import { AdminContext } from "../context/AdminContext";


function AdminLogin() {

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { getAdmin } = useContext(AdminContext);
    const { serverUrl } = useContext(AuthContext);

    const navigate = useNavigate();


    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const result = await axios.post(
                serverUrl + "/api/auth/adminlogin",
                {
                    email,
                    password
                },
                {
                    withCredentials: true
                }
            );

            console.log(result.data);

            await getAdmin();

            navigate("/");

        } catch (error) {

            console.log(error);

        }
    };


    return (

        <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-[#0F1115] via-[#14171D] to-[#1B2028] text-[#F5F7FA]">

            {/* ================================================= */}
            {/*                      HEADER                       */}
            {/* ================================================= */}

            <header className="absolute top-0 left-0 z-30 w-full h-[72px] px-6 md:px-10 flex items-center">

                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate("/")}
                >

                    <img
                        src={Logo}
                        alt="Cartly"
                        className="w-[38px] h-[38px] object-contain"
                    />

                    <span className="text-[22px] font-semibold tracking-tight">
                        Cartly Admin
                    </span>

                </div>

            </header>


            {/* ================================================= */}
            {/*                    MAIN CONTENT                   */}
            {/* ================================================= */}

            <main className="h-full w-full flex items-center justify-center px-5">

                {/* ================================================= */}
                {/*                     LOGIN CARD                    */}
                {/* ================================================= */}

                <div className="w-full max-w-[560px] h-[430px] bg-[#171A21]/95 border border-[#2A303A] rounded-xl shadow-2xl flex items-center justify-center backdrop-blur-xl">

                    <form
                        onSubmit={handleLogin}
                        className="w-[88%] h-[90%] flex flex-col items-center justify-start"
                    >

                        {/* ================================================= */}
                        {/*                      HEADING                      */}
                        {/* ================================================= */}

                        <div className="w-full text-center mb-5">

                            <h1 className="text-[36px] font-bold tracking-tight text-[#F5F7FA]">
                                Admin Login
                            </h1>

                            <p className="text-[#9AA4B2] text-sm mt-2">
                                Sign in to access your Cartly admin dashboard.
                            </p>

                        </div>


                        {/* ================================================= */}
                        {/*                     FORM FIELDS                   */}
                        {/* ================================================= */}

                        <div className="w-[92%] flex flex-col gap-4">

                            {/* EMAIL */}

                            <input
                                type="email"
                                placeholder="Admin Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full h-[50px] px-5 rounded-lg bg-[#101217] border border-[#303641] text-[#F5F7FA] placeholder:text-[#697383] outline-none transition-all duration-200 focus:border-[#2DB6C0] focus:ring-2 focus:ring-[#2DB6C0]/20"
                            />


                            {/* PASSWORD */}

                            <div className="relative w-full">

                                <input
                                    type={show ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full h-[50px] px-5 pr-12 rounded-lg bg-[#101217] border border-[#303641] text-[#F5F7FA] placeholder:text-[#697383] outline-none transition-all duration-200 focus:border-[#2DB6C0] focus:ring-2 focus:ring-[#2DB6C0]/20"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShow((prev) => !prev)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7D8795] hover:text-[#2DB6C0] transition-colors"
                                >

                                    {show ? (
                                        <IoEyeOff size={20} />
                                    ) : (
                                        <IoEye size={20} />
                                    )}

                                </button>

                            </div>


                            {/* SIGN IN */}

                            <button
                                type="submit"
                                className="w-full h-[50px] rounded-lg bg-[#2DB6C0] hover:bg-[#229CA5] active:scale-[0.98] transition-all duration-200 text-[#071014] text-[16px] font-semibold shadow-lg shadow-[#2DB6C0]/10"
                            >
                                Sign In
                            </button>

                        </div>


                        {/* ================================================= */}
                        {/*                   ADMIN NOTICE                    */}
                        {/* ================================================= */}

                        <p className="text-[#7D8795] text-xs mt-5 text-center">
                            Authorized personnel only
                        </p>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default AdminLogin;