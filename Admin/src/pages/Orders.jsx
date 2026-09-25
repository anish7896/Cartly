import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Orders() {
    const { serverUrl } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const statusOptions = [
        "Order Placed",
        "Packing",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled"
    ];

    // GET ALL ORDERS
    const fetchOrders = async () => {
        try {
            const result = await axios.get(
                serverUrl + "/api/order/all",
                {
                    withCredentials: true
                }
            );

            if (result.data.success) {
                setOrders(result.data.orders);
            }
        } catch (error) {
            console.log("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    // UPDATE ORDER STATUS
    const updateStatus = async (orderId, status) => {
        try {
            const result = await axios.put(
                serverUrl + "/api/order/status",
                {
                    orderId,
                    status
                },
                {
                    withCredentials: true
                }
            );

            if (result.data.success) {
                // Update the order in frontend immediately
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId
                            ? {
                                ...order,
                                status: status
                            }
                            : order
                    )
                );

                alert("Order status updated successfully");
            }
        } catch (error) {
            console.log("UPDATE STATUS ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Unable to update order status"
            );
        }
    };

    useEffect(() => {
        if (serverUrl) {
            fetchOrders();
        }
    }, [serverUrl]);

    // FORMAT DATE
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "numeric",
            year: "numeric"
        });
    };

    // LOADING
    if (loading) {
        return (
            <div className="w-full min-h-screen bg-[#111827] flex items-center justify-center text-white">
                <p className="text-xl">
                    Loading orders...
                </p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#111827] text-white p-5 md:p-8">

            {/* HEADING */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold">
                    View Orders
                </h1>

                <p className="text-gray-400 mt-2">
                    Manage all customer orders
                </p>
            </div>

            {/* NO ORDERS */}
            {orders.length === 0 ? (

                <div className="w-full bg-[#334155] rounded-xl p-10 text-center">
                    <p className="text-gray-300 text-lg">
                        No orders found
                    </p>
                </div>

            ) : (

                <div className="flex flex-col gap-6">

                    {orders.map((order) => (

                        <div
                            key={order._id}
                            className="w-full bg-[#475569] rounded-xl p-5 md:p-6 shadow-lg"
                        >

                            <div className="flex flex-col lg:flex-row gap-6">

                                {/* ================= PRODUCT SECTION ================= */}

                                <div className="flex-1">

                                    {order.items.map((item, index) => (

                                        <div
                                            key={index}
                                            className="flex gap-4 mb-5 last:mb-0"
                                        >

                                            {/* PRODUCT IMAGE */}

                                            <div className="w-[80px] h-[90px] bg-white rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">

                                                <img
                                                    src={
                                                        item.image ||
                                                        "/placeholder.png"
                                                    }
                                                    alt={item.name}
                                                    className="w-full h-full object-contain"
                                                />

                                            </div>

                                            {/* PRODUCT DETAILS */}

                                            <div className="flex flex-col justify-center">

                                                <h2 className="text-lg font-semibold text-white">
                                                    {item.name}
                                                </h2>

                                                <p className="text-gray-300 mt-1">
                                                    Size: {item.size}
                                                </p>

                                                <p className="text-gray-300">
                                                    Quantity: {item.quantity}
                                                </p>

                                                <p className="text-gray-200 mt-1">
                                                    ₹ {item.price}
                                                </p>

                                            </div>

                                        </div>

                                    ))}

                                </div>


                                {/* ================= CUSTOMER DETAILS ================= */}

                                <div className="flex-1 lg:border-l lg:border-gray-500 lg:pl-6">

                                    <h3 className="text-lg font-semibold mb-3">
                                        Customer Details
                                    </h3>

                                    <p className="text-gray-200">
                                        {order.address?.firstName}{" "}
                                        {order.address?.lastName}
                                    </p>

                                    <p className="text-gray-300">
                                        {order.address?.street}
                                    </p>

                                    <p className="text-gray-300">
                                        {order.address?.city},{" "}
                                        {order.address?.state}
                                    </p>

                                    <p className="text-gray-300">
                                        {order.address?.pincode}
                                    </p>

                                    <p className="text-gray-300 mt-1">
                                        {order.address?.phone}
                                    </p>

                                </div>


                                {/* ================= ORDER INFORMATION ================= */}

                                <div className="lg:w-[220px] lg:border-l lg:border-gray-500 lg:pl-6">

                                    {/* ITEMS */}

                                    <div className="mb-3">

                                        <p className="text-gray-300 text-sm">
                                            Items
                                        </p>

                                        <p className="font-semibold">
                                            {order.items.reduce(
                                                (total, item) =>
                                                    total + Number(item.quantity),
                                                0
                                            )}
                                        </p>

                                    </div>


                                    {/* PAYMENT METHOD */}

                                    <div className="mb-3">

                                        <p className="text-gray-300 text-sm">
                                            Method
                                        </p>

                                        <p className="font-semibold">
                                            {order.paymentMethod}
                                        </p>

                                    </div>


                                    {/* PAYMENT STATUS */}

                                    <div className="mb-3">

                                        <p className="text-gray-300 text-sm">
                                            Payment
                                        </p>

                                        <p
                                            className={
                                                order.payment
                                                    ? "text-green-400 font-semibold"
                                                    : "text-yellow-300 font-semibold"
                                            }
                                        >
                                            {order.payment
                                                ? "Paid"
                                                : "Pending"}
                                        </p>

                                    </div>


                                    {/* DATE */}

                                    <div className="mb-3">

                                        <p className="text-gray-300 text-sm">
                                            Date
                                        </p>

                                        <p className="font-semibold">
                                            {formatDate(order.date)}
                                        </p>

                                    </div>


                                    {/* TOTAL */}

                                    <div>

                                        <p className="text-gray-300 text-sm">
                                            Total
                                        </p>

                                        <p className="text-xl font-bold">
                                            ₹ {order.amount}
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* ================= BOTTOM SECTION ================= */}

                            <div className="border-t border-gray-500 mt-5 pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">

                                {/* ORDER ID */}

                                <div>

                                    <p className="text-gray-400 text-xs">
                                        Order ID
                                    </p>

                                    <p className="text-gray-200 text-sm break-all">
                                        #{order._id}
                                    </p>

                                </div>


                                {/* STATUS DROPDOWN */}

                                <select
                                    value={order.status || "Order Placed"}
                                    onChange={(e) =>
                                        updateStatus(
                                            order._id,
                                            e.target.value
                                        )
                                    }
                                    className="bg-[#64748b] border border-gray-400 rounded-lg px-4 py-2 text-white outline-none cursor-pointer"
                                >

                                    {statusOptions.map((status) => (

                                        <option
                                            key={status}
                                            value={status}
                                            className="bg-[#334155]"
                                        >
                                            {status}
                                        </option>

                                    ))}

                                </select>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Orders;