import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { shopDataContext } from "../context/ShopContext";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/authContext";

function Checkout() {

    const navigate = useNavigate();

    const {
        products,
        currency,
        delivery_fee,
        cartData,
        getCart
    } = useContext(shopDataContext);

    const { user } = useContext(UserContext);
    const { serverUrl } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: user?.email || "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: ""
    });

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    // Create items from cartData

    const cartItems = [];

    products.forEach((product) => {

        if (cartData[product._id]) {

            Object.entries(cartData[product._id]).forEach(
                ([size, quantity]) => {

                    if (quantity > 0) {

                        cartItems.push({
                            ...product,
                            size,
                            quantity
                        });

                    }

                }
            );

        }

    });


    // Calculate subtotal

    const subtotal = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );


    // Total

    const total = subtotal + delivery_fee;


    // =========================
    // COD ORDER
    // =========================

    const placeCODOrder = async (items) => {

        try {

            const response = await axios.post(
                serverUrl + "/api/order/place",
                {
                    items,
                    amount: total,
                    address: formData
                },
                {
                    withCredentials: true
                }
            );


            if (response.data.success) {

                await getCart();

                alert("Order placed successfully");

                navigate("/");

            }

        } catch (error) {

            console.log("COD ORDER ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Unable to place order"
            );

        }

    };


    // =========================
    // RAZORPAY PAYMENT
    // =========================

    const payWithRazorpay = async (items) => {

        try {

            // Step 1:
            // Create Razorpay order on backend

            const response = await axios.post(

                serverUrl + "/api/order/razorpay/create",

                {
                    amount: total
                },

                {
                    withCredentials: true
                }

            );


            if (!response.data.success) {

                alert("Unable to create Razorpay order");

                setLoading(false);

                return;

            }


            const razorpayOrder = response.data.order;


            // Step 2:
            // Razorpay checkout options

            const options = {

                key: import.meta.env.VITE_RAZORPAY_KEY_ID,

                amount: razorpayOrder.amount,

                currency: razorpayOrder.currency,

                name: "Cartly",

                description: "Cartly Order",

                order_id: razorpayOrder.id,


                prefill: {

                    name:
                        formData.firstName +
                        " " +
                        formData.lastName,

                    email: formData.email,

                    contact: formData.phone

                },


                theme: {
                    color: "#c3f6fa"
                },


                // Step 3:
                // Payment successful

                handler: async function (paymentResponse) {

                    try {

                        // Step 4:
                        // Verify payment on backend

                        const verifyResponse =
                            await axios.post(

                                serverUrl +
                                "/api/order/razorpay/verify",

                                {

                                    razorpay_order_id:
                                        paymentResponse
                                            .razorpay_order_id,

                                    razorpay_payment_id:
                                        paymentResponse
                                            .razorpay_payment_id,

                                    razorpay_signature:
                                        paymentResponse
                                            .razorpay_signature,

                                    items,

                                    amount: total,

                                    address: formData

                                },

                                {
                                    withCredentials: true
                                }

                            );


                        if (verifyResponse.data.success) {

                            await getCart();

                            alert(
                                "Payment successful! Order placed successfully."
                            );

                            navigate("/");

                        } else {

                            alert(
                                "Payment verification failed"
                            );

                        }

                    } catch (error) {

                        console.log(
                            "PAYMENT VERIFICATION ERROR:",
                            error
                        );

                        alert(
                            error.response?.data?.message ||
                            "Payment verification failed"
                        );

                    } finally {

                        setLoading(false);

                    }

                },


                // User closes Razorpay popup

                modal: {

                    ondismiss: function () {

                        setLoading(false);

                    }

                }

            };


            // Step 5:
            // Open Razorpay

            if (!window.Razorpay) {

                alert(
                    "Razorpay SDK not loaded. Please refresh the page."
                );

                setLoading(false);

                return;

            }


            const razorpay =
                new window.Razorpay(options);


            razorpay.open();


        } catch (error) {

            console.log(
                "RAZORPAY ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to start Razorpay payment"
            );

            setLoading(false);

        }

    };


    // =========================
    // PLACE ORDER
    // =========================

    const handlePlaceOrder = async (e) => {

        e.preventDefault();


        if (cartItems.length === 0) {

            alert("Your cart is empty");

            return;

        }


        try {

            setLoading(true);


            // Convert cart items into order items

            const items = cartItems.map((item) => ({

                productId: item._id,

                name: item.name,

                image: item.image1,

                price: item.price,

                size: item.size,

                quantity: item.quantity

            }));


            // COD

            if (paymentMethod === "COD") {

                await placeCODOrder(items);

                setLoading(false);

                return;

            }


            // Razorpay

            if (paymentMethod === "Razorpay") {

                await payWithRazorpay(items);

            }

        } catch (error) {

            console.log(
                "PLACE ORDER ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to place order"
            );

            setLoading(false);

        }

    };


    // =========================
    // LOGIN CHECK
    // =========================

    if (!user) {

        navigate("/login");

        return null;

    }


    return (

        <div className="w-full min-h-screen bg-gradient-to-b from-[#141414] to-[#0c2025] text-white py-[40px] px-[20px] md:px-[50px]">

            <div className="w-full max-w-[1200px] mx-auto">


                {/* HEADING */}

                <div className="flex items-center justify-center gap-[8px] mb-[40px]">

                    <h1 className="text-[28px] md:text-[32px] text-[#c3f6fa]">
                        CHECK
                    </h1>

                    <h1 className="text-[28px] md:text-[32px] text-white">
                        OUT
                    </h1>

                </div>


                <form
                    onSubmit={handlePlaceOrder}
                    className="flex flex-col lg:flex-row gap-[40px]"
                >


                    {/* =========================
                        LEFT SIDE
                    ========================= */}

                    <div className="w-full lg:w-[65%]">


                        {/* DELIVERY */}

                        <div className="border border-[#ffffff30] rounded-lg p-[25px]">

                            <h2 className="text-[22px] text-[#c3f6fa] mb-[25px]">
                                DELIVERY INFORMATION
                            </h2>


                            {/* First + Last Name */}

                            <div className="flex flex-col md:flex-row gap-[15px]">

                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-[#ffffff10] border border-[#ffffff30] rounded-md px-[15px] py-[13px] outline-none focus:border-[#c3f6fa]"
                                />

                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-[#ffffff10] border border-[#ffffff30] rounded-md px-[15px] py-[13px] outline-none focus:border-[#c3f6fa]"
                                />

                            </div>


                            {/* Email */}

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full mt-[15px] bg-[#ffffff10] border border-[#ffffff30] rounded-md px-[15px] py-[13px] outline-none focus:border-[#c3f6fa]"
                            />


                            {/* Phone */}

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full mt-[15px] bg-[#ffffff10] border border-[#ffffff30] rounded-md px-[15px] py-[13px] outline-none focus:border-[#c3f6fa]"
                            />


                            {/* Street */}

                            <input
                                type="text"
                                name="street"
                                placeholder="Street Address"
                                value={formData.street}
                                onChange={handleChange}
                                required
                                className="w-full mt-[15px] bg-[#ffffff10] border border-[#ffffff30] rounded-md px-[15px] py-[13px] outline-none focus:border-[#c3f6fa]"
                            />


                            {/* City + State */}

                            <div className="flex flex-col md:flex-row gap-[15px] mt-[15px]">

                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-[#ffffff10] border border-[#ffffff30] rounded-md px-[15px] py-[13px] outline-none focus:border-[#c3f6fa]"
                                />

                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-[#ffffff10] border border-[#ffffff30] rounded-md px-[15px] py-[13px] outline-none focus:border-[#c3f6fa]"
                                />

                            </div>


                            {/* Pincode */}

                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                required
                                className="w-full mt-[15px] bg-[#ffffff10] border border-[#ffffff30] rounded-md px-[15px] py-[13px] outline-none focus:border-[#c3f6fa]"
                            />

                        </div>


                        {/* =========================
                            PAYMENT
                        ========================= */}

                        <div className="border border-[#ffffff30] rounded-lg p-[25px] mt-[25px]">

                            <h2 className="text-[22px] text-[#c3f6fa] mb-[20px]">
                                PAYMENT METHOD
                            </h2>


                            {/* COD */}

                            <label
                                className={`flex items-center gap-[12px] border rounded-md p-[15px] cursor-pointer mb-[15px] ${
                                    paymentMethod === "COD"
                                        ? "border-[#c3f6fa] bg-[#ffffff10]"
                                        : "border-[#ffffff30]"
                                }`}
                            >

                                <input
                                    type="radio"
                                    name="payment"
                                    value="COD"
                                    checked={
                                        paymentMethod === "COD"
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }
                                />

                                <span>
                                    Cash on Delivery
                                </span>

                            </label>


                            {/* RAZORPAY */}

                            <label
                                className={`flex items-center gap-[12px] border rounded-md p-[15px] cursor-pointer ${
                                    paymentMethod === "Razorpay"
                                        ? "border-[#c3f6fa] bg-[#ffffff10]"
                                        : "border-[#ffffff30]"
                                }`}
                            >

                                <input
                                    type="radio"
                                    name="payment"
                                    value="Razorpay"
                                    checked={
                                        paymentMethod === "Razorpay"
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }
                                />

                                <span>
                                    Razorpay
                                </span>

                            </label>

                        </div>

                    </div>


                    {/* =========================
                        RIGHT SIDE
                    ========================= */}

                    <div className="w-full lg:w-[35%]">

                        <div className="border border-[#ffffff30] rounded-lg p-[25px]">

                            <h2 className="text-[22px] text-[#c3f6fa] mb-[25px]">
                                ORDER SUMMARY
                            </h2>


                            {/* ITEMS */}

                            <div className="max-h-[300px] overflow-y-auto">

                                {cartItems.map((item) => (

                                    <div
                                        key={
                                            item._id +
                                            item.size
                                        }
                                        className="flex gap-[12px] border-b border-[#ffffff20] py-[15px]"
                                    >

                                        <img
                                            src={item.image1}
                                            alt={item.name}
                                            className="w-[60px] h-[70px] object-cover rounded-md bg-white"
                                        />


                                        <div className="flex-1">

                                            <p className="text-white text-[14px]">
                                                {item.name}
                                            </p>

                                            <p className="text-[#b8dfe0] text-[12px] mt-[5px]">
                                                Size: {item.size}
                                            </p>

                                            <p className="text-[#b8dfe0] text-[12px]">
                                                Qty: {item.quantity}
                                            </p>

                                        </div>


                                        <p className="text-[#c3f6fa] text-[14px]">
                                            {currency}{" "}
                                            {item.price *
                                                item.quantity}
                                        </p>

                                    </div>

                                ))}

                            </div>


                            {/* SUBTOTAL */}

                            <div className="flex justify-between text-[#b8dfe0] mt-[20px]">

                                <span>
                                    Subtotal
                                </span>

                                <span>
                                    {currency} {subtotal}
                                </span>

                            </div>


                            {/* DELIVERY */}

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
                                    {currency} {total}
                                </span>

                            </div>


                            {/* PLACE ORDER */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-[25px] w-full py-[14px] bg-[#c3f6fa] text-black rounded-md font-semibold hover:bg-white transition disabled:opacity-50"
                            >

                                {loading
                                    ? paymentMethod === "Razorpay"
                                        ? "PROCESSING PAYMENT..."
                                        : "PLACING ORDER..."
                                    : paymentMethod === "Razorpay"
                                        ? "PAY WITH RAZORPAY"
                                        : "PLACE ORDER"
                                }

                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default Checkout;