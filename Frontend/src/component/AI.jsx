import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AI() {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [listening, setListening] = useState(false);
    const [text, setText] = useState("");

    const startListening = () => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert(
                "Voice recognition is not supported in this browser. Please use Google Chrome."
            );
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-IN";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            setListening(true);
            setText("Listening...");
        };

        recognition.onresult = (event) => {

            const spokenText =
                event.results[0][0].transcript.toLowerCase();

            console.log("User said:", spokenText);

            setText(spokenText);

            handleCommand(spokenText);
        };

        recognition.onerror = (event) => {

            console.log("Speech recognition error:", event.error);

            setListening(false);
            setText("Could not understand. Try again.");
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognition.start();
    };


    const handleCommand = (command) => {

        // HOME

        if (
            command.includes("home") ||
            command.includes("homepage") ||
            command.includes("go home")
        ) {
            navigate("/");
            return;
        }


        // COLLECTION

        if (
            command.includes("collection") ||
            command.includes("collections") ||
            command.includes("shop")
        ) {
            navigate("/collection");
            return;
        }


        // PRODUCTS

        if (
            command.includes("product") ||
            command.includes("products")
        ) {
            navigate("/product");
            return;
        }


        // CART

        if (
            command.includes("cart") ||
            command.includes("my cart")
        ) {
            navigate("/cart");
            return;
        }


        // ORDERS

        if (
            command.includes("order") ||
            command.includes("orders") ||
            command.includes("my orders")
        ) {
            navigate("/orders");
            return;
        }


        // ABOUT

        if (command.includes("about")) {
            navigate("/about");
            return;
        }


        // CONTACT

        if (
            command.includes("contact") ||
            command.includes("support")
        ) {
            navigate("/contact");
            return;
        }


        // LOGIN

        if (
            command.includes("login") ||
            command.includes("log in")
        ) {
            navigate("/login");
            return;
        }


        // CHECKOUT

        if (
            command.includes("checkout") ||
            command.includes("check out")
        ) {
            navigate("/checkout");
            return;
        }


        // UNKNOWN COMMAND

        setText(
            "I didn't understand. Try saying: Go to orders, open cart, go home, or show products."
        );
    };


    return (
        <>
            {/* AI BUTTON */}

            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 z-[100] w-16 h-16 rounded-full bg-cyan-400 text-black text-2xl shadow-xl hover:scale-110 transition-all"
                >
                    🤖
                </button>
            )}


            {/* AI WINDOW */}

            {open && (
                <div className="fixed bottom-6 right-6 z-[100] w-[350px] bg-[#111827] border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">

                    {/* HEADER */}

                    <div className="bg-[#1f2937] px-5 py-4 flex items-center justify-between">

                        <div>

                            <h2 className="text-white font-semibold">
                                Cartly AI
                            </h2>

                            <p className="text-gray-400 text-xs">
                                Voice Shopping Assistant
                            </p>

                        </div>

                        <button
                            onClick={() => setOpen(false)}
                            className="text-gray-400 hover:text-white text-xl"
                        >
                            ×
                        </button>

                    </div>


                    {/* BODY */}

                    <div className="p-6 flex flex-col items-center">

                        {/* MICROPHONE */}

                        <button
                            onClick={startListening}
                            className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl transition-all ${
                                listening
                                    ? "bg-red-500 animate-pulse"
                                    : "bg-cyan-400 hover:scale-105"
                            }`}
                        >
                            🎤
                        </button>


                        {/* STATUS */}

                        <p className="text-white mt-5 text-center">

                            {listening
                                ? "Listening..."
                                : "Tap the microphone and speak"}

                        </p>


                        {/* SPOKEN TEXT */}

                        {text && (
                            <div className="mt-5 w-full bg-[#1f2937] rounded-xl p-4">

                                <p className="text-gray-400 text-xs mb-1">
                                    You said:
                                </p>

                                <p className="text-white">
                                    {text}
                                </p>

                            </div>
                        )}


                        {/* EXAMPLES */}

                        <div className="mt-5 w-full">

                            <p className="text-gray-400 text-xs mb-2">
                                Try saying:
                            </p>

                            <p className="text-gray-300 text-sm">
                                • "Go to my orders"
                            </p>

                            <p className="text-gray-300 text-sm">
                                • "Open my cart"
                            </p>

                            <p className="text-gray-300 text-sm">
                                • "Show products"
                            </p>

                            <p className="text-gray-300 text-sm">
                                • "Go home"
                            </p>

                        </div>

                    </div>

                </div>
            )}
        </>
    );
}

export default AI;