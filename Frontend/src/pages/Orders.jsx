import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/authContext";
import { UserContext } from "../context/UserContext";

function Orders() {

    const navigate = useNavigate();

    const { serverUrl } = useContext(AuthContext);
    const { user } = useContext(UserContext);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const getOrders = async () => {

        try {

            const response = await axios.get(
                serverUrl + "/api/order/myorders",
                {
                    withCredentials: true
                }
            );

            setOrders(response.data.orders || []);

        } catch (error) {

            console.log("GET ORDERS ERROR:", error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        if (!user) {
            navigate("/login");
            return;
        }

        getOrders();

    }, [user]);


    if (loading) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-b from-[#141414] to-[#0c2025] text-white flex items-center justify-center">

                <p className="text-[#c3f6fa] text-[18px]">
                    Loading orders...
                </p>

            </div>
        );
    }


    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-[#141414] to-[#0c2025] text-white py-[40px] px-[20px] md:px-[50px]">

            <div className="w-full max-w-[1200px] mx-auto">

                {/* Heading */}

                <div className="flex items-center justify-center gap-[8px] mb-[40px]">

                    <h1 className="text-[28px] md:text-[32px] text-[#c3f6fa]">
                        MY
                    </h1>

                    <h1 className="text-[28px] md:text-[32px] text-white">
                        ORDERS
                    </h1>

                </div>


                {/* No Orders */}

                {orders.length === 0 && (

                    <div className="w-full flex flex-col items-center justify-center py-[100px]">

                        <p className="text-[#b8dfe0] text-[18px]">
                            You have no orders yet
                        </p>

                        <button
                            onClick={() => navigate("/collection")}
                            className="mt-[25px] px-[25px] py-[12px] bg-[#c3f6fa] text-black rounded-md font-semibold hover:bg-white transition"
                        >
                            START SHOPPING
                        </button>

                    </div>

                )}


                {/* Orders */}

                {orders.length > 0 && (

                    <div className="flex flex-col gap-[25px]">

                        {orders.map((order) => (

                            <div
                                key={order._id}
                                className="w-full border border-[#ffffff30] rounded-lg p-[20px] md:p-[25px]"
                            >

                                {/* Order Header */}

                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[10px] border-b border-[#ffffff20] pb-[15px]">

                                    <div>

                                        <p className="text-[#b8dfe0] text-[13px]">
                                            Order ID
                                        </p>

                                        <p className="text-white text-[14px] mt-[4px] break-all">
                                            {order._id}
                                        </p>

                                    </div>


                                    <div className="flex items-center gap-[15px]">

                                        <span className="px-[12px] py-[6px] rounded-md bg-[#c3f6fa20] text-[#c3f6fa] text-[13px]">
                                            {order.status}
                                        </span>

                                    </div>

                                </div>


                                {/* Order Items */}

                                <div className="mt-[20px]">

                                    {order.items.map((item, index) => (

                                        <div
                                            key={index}
                                            className="flex gap-[15px] py-[15px] border-b border-[#ffffff15]"
                                        >

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-[80px] h-[90px] object-cover rounded-md bg-white"
                                            />


                                            <div className="flex-1">

                                                <h2 className="text-white text-[16px] md:text-[18px]">
                                                    {item.name}
                                                </h2>

                                                <p className="text-[#b8dfe0] text-[13px] mt-[5px]">
                                                    Size: {item.size}
                                                </p>

                                                <p className="text-[#b8dfe0] text-[13px]">
                                                    Quantity: {item.quantity}
                                                </p>

                                                <p className="text-[#c3f6fa] text-[14px] mt-[5px]">
                                                    ₹ {item.price}
                                                </p>

                                            </div>

                                        </div>

                                    ))}

                                </div>


                                {/* Order Footer */}

                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[15px] mt-[20px]">

                                    <div>

                                        <p className="text-[#b8dfe0] text-[13px]">
                                            Payment Method
                                        </p>

                                        <p className="text-white text-[14px] mt-[3px]">
                                            {order.paymentMethod}
                                        </p>

                                    </div>


                                    <div>

                                        <p className="text-[#b8dfe0] text-[13px]">
                                            Order Date
                                        </p>

                                        <p className="text-white text-[14px] mt-[3px]">
                                            {new Date(order.date).toLocaleDateString()}
                                        </p>

                                    </div>


                                    <div>

                                        <p className="text-[#b8dfe0] text-[13px]">
                                            Total Amount
                                        </p>

                                        <p className="text-[#c3f6fa] text-[18px] font-semibold mt-[3px]">
                                            ₹ {order.amount}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Orders;