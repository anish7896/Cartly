import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { shopDataContext } from "../context/ShopContext";
import { UserContext } from "../context/UserContext";

function Cart() {

    const navigate = useNavigate();

    const {
        products,
        currency,
        delivery_fee,
        cartData,
        getCart,
        updateCart,
        removeFromCart
    } = useContext(shopDataContext);

    const { user } = useContext(UserContext);


    // ================= GET CART =================

    useEffect(() => {

        if (!user) {
            navigate("/login");
            return;
        }

        getCart();

    }, [user]);


    // ================= CONVERT CART DATA =================

    const cartItems = [];

    products.forEach((product) => {

        if (cartData[product._id]) {

            Object.entries(
                cartData[product._id]
            ).forEach(([size, quantity]) => {

                if (quantity > 0) {

                    cartItems.push({
                        ...product,
                        size,
                        quantity
                    });

                }

            });

        }

    });


    // ================= SUBTOTAL =================

    const subtotal = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );


    // ================= TOTAL =================

    const total =
        subtotal +
        (cartItems.length > 0
            ? delivery_fee
            : 0);


    return (

        <div className="w-full min-h-screen bg-gradient-to-b from-[#141414] to-[#0c2025] text-white py-[40px] px-[20px] md:px-[50px]">

            <div className="w-full max-w-[1200px] mx-auto">


                {/* ================= TITLE ================= */}

                <div className="flex items-center justify-center gap-[8px] mb-[40px]">

                    <h1 className="text-[28px] md:text-[32px] text-[#c3f6fa]">
                        YOUR
                    </h1>

                    <h1 className="text-[28px] md:text-[32px] text-white">
                        CART
                    </h1>

                </div>


                {/* ================= EMPTY CART ================= */}

                {cartItems.length === 0 && (

                    <div className="w-full flex flex-col items-center justify-center py-[100px]">

                        <p className="text-[#b8dfe0] text-[18px]">
                            Your cart is empty
                        </p>

                        <button
                            onClick={() =>
                                navigate("/collection")
                            }
                            className="mt-[25px] px-[25px] py-[12px] bg-[#c3f6fa] text-black rounded-md font-semibold hover:bg-white transition"
                        >
                            CONTINUE SHOPPING
                        </button>

                    </div>

                )}


                {/* ================= CART ITEMS ================= */}

                {cartItems.length > 0 && (

                    <div className="flex flex-col lg:flex-row gap-[40px]">


                        {/* ================= LEFT SIDE ================= */}

                        <div className="w-full lg:w-[70%]">

                            {cartItems.map((item) => (

                                <div
                                    key={
                                        item._id +
                                        item.size
                                    }
                                    className="w-full border-b border-[#ffffff30] py-[20px] flex gap-[20px]"
                                >


                                    {/* IMAGE */}

                                    <img
                                        src={item.image1}
                                        alt={item.name}
                                        className="w-[110px] h-[130px] object-cover rounded-md bg-white"
                                    />


                                    {/* DETAILS */}

                                    <div className="flex-1">

                                        <h2 className="text-white text-[18px] font-medium">
                                            {item.name}
                                        </h2>


                                        <p className="text-[#c3f6fa] mt-[8px]">
                                            {currency}{" "}
                                            {item.price}
                                        </p>


                                        <p className="text-[#b8dfe0] text-[14px] mt-[8px]">
                                            Size: {item.size}
                                        </p>


                                        {/* ================= QUANTITY ================= */}

                                        <div className="flex items-center gap-[10px] mt-[15px]">

                                            {/* MINUS */}

                                            <button
                                                onClick={() =>
                                                    updateCart(
                                                        item._id,
                                                        item.size,
                                                        item.quantity - 1
                                                    )
                                                }
                                                className="w-[32px] h-[32px] border border-[#ffffff40] rounded-md hover:bg-[#ffffff20]"
                                            >
                                                -
                                            </button>


                                            {/* QUANTITY */}

                                            <span className="w-[30px] text-center">
                                                {item.quantity}
                                            </span>


                                            {/* PLUS */}

                                            <button
                                                onClick={() =>
                                                    updateCart(
                                                        item._id,
                                                        item.size,
                                                        item.quantity + 1
                                                    )
                                                }
                                                className="w-[32px] h-[32px] border border-[#ffffff40] rounded-md hover:bg-[#ffffff20]"
                                            >
                                                +
                                            </button>

                                        </div>

                                    </div>


                                    {/* ================= REMOVE ================= */}

                                    <button
                                        onClick={() =>
                                            removeFromCart(
                                                item._id,
                                                item.size
                                            )
                                        }
                                        className="text-[#ff7b7b] text-[14px] self-start hover:text-red-400"
                                    >
                                        Remove
                                    </button>

                                </div>

                            ))}

                        </div>


                        {/* ================= CART SUMMARY ================= */}

                        <div className="w-full lg:w-[30%]">

                            <div className="border border-[#ffffff30] rounded-lg p-[25px]">

                                <h2 className="text-[22px] text-[#c3f6fa] mb-[25px]">
                                    CART TOTAL
                                </h2>


                                {/* SUBTOTAL */}

                                <div className="flex justify-between text-[#b8dfe0]">

                                    <span>
                                        Subtotal
                                    </span>

                                    <span>
                                        {currency}{" "}
                                        {subtotal}
                                    </span>

                                </div>


                                {/* DELIVERY FEE */}

                                <div className="flex justify-between text-[#b8dfe0] mt-[15px]">

                                    <span>
                                        Delivery Fee
                                    </span>

                                    <span>
                                        {currency}{" "}
                                        {delivery_fee}
                                    </span>

                                </div>


                                {/* TOTAL */}

                                <div className="border-t border-[#ffffff30] mt-[20px] pt-[20px] flex justify-between">

                                    <span className="text-white font-semibold">
                                        Total
                                    </span>

                                    <span className="text-[#c3f6fa] font-semibold">
                                        {currency}{" "}
                                        {total}
                                    </span>

                                </div>


                                {/* CHECKOUT */}

                                <button
                                    onClick={() =>
                                        navigate("/checkout")
                                    }
                                    className="mt-[25px] w-full py-[14px] bg-[#c3f6fa] text-black rounded-md font-semibold hover:bg-white transition"
                                >
                                    PROCEED TO CHECKOUT
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Cart;