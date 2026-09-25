import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const List = () => {
    const { serverUrl } = useContext(AuthContext);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products
    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                serverUrl + "/api/product/list",
                {
                    withCredentials: true,
                }
            );

            setProducts(response.data);
        } catch (error) {
            console.log("Fetch products error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Remove product
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            await axios.post(
                serverUrl + `/api/product/remove/${id}`,
                {},
                {
                    withCredentials: true,
                }
            );

            setProducts((prev) =>
                prev.filter((product) => product._id !== id)
            );

            alert("Product deleted successfully!");
        } catch (error) {
            console.log("Delete product error:", error);
            alert(
                error.response?.data?.message ||
                    "Failed to delete product"
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#0f1518] px-4 py-8 text-gray-200 sm:px-6 lg:px-10">

            <div className="mx-auto max-w-6xl">

                {/* HEADER */}

                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gray-400">
                            Product Management
                        </p>

                        <h1 className="text-3xl font-semibold text-white">
                            Product List
                        </h1>

                        <p className="mt-2 text-sm text-gray-400">
                            Manage all products in your Cartly store
                        </p>
                    </div>

                    <div className="hidden h-12 w-12 items-center justify-center rounded-lg border border-gray-600 bg-[#182126] text-gray-300 sm:flex">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>

                    </div>

                </div>

                {/* PRODUCT COUNT */}

                <div className="mb-6 rounded-xl border border-gray-700 bg-[#12191d] px-5 py-4">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-gray-400">
                                Total Products
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-white">
                                {products.length}
                            </p>
                        </div>

                        <button
                            onClick={fetchProducts}
                            className="rounded-lg border border-gray-600 bg-[#182126] px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-gray-400 hover:bg-[#202b30]"
                        >
                            Refresh
                        </button>

                    </div>

                </div>

                {/* PRODUCT TABLE */}

                <div className="overflow-hidden rounded-2xl border border-gray-700 bg-[#12191d] shadow-2xl">

                    {/* TABLE HEADER */}

                    <div className="hidden grid-cols-[80px_1fr_130px_130px_100px_70px] gap-4 border-b border-gray-700 bg-[#131c20] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-400 md:grid">

                        <p>Image</p>
                        <p>Product</p>
                        <p>Category</p>
                        <p>Subcategory</p>
                        <p>Price</p>
                        <p>Action</p>

                    </div>

                    {/* LOADING */}

                    {loading ? (

                        <div className="flex min-h-[300px] items-center justify-center">

                            <div className="text-center">

                                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-600 border-t-gray-200" />

                                <p className="text-sm text-gray-400">
                                    Loading products...
                                </p>

                            </div>

                        </div>

                    ) : products.length === 0 ? (

                        /* EMPTY STATE */

                        <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#182126] text-gray-400">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-7"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                    />
                                </svg>

                            </div>

                            <h3 className="text-lg font-semibold text-white">
                                No products found
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Add your first product to see it here.
                            </p>

                        </div>

                    ) : (

                        <div>

                            {products.map((product) => (

                                <div
                                    key={product._id}
                                    className="border-b border-gray-700 px-4 py-5 transition hover:bg-[#151e22] last:border-b-0 sm:px-6"
                                >

                                    {/* DESKTOP */}

                                    <div className="hidden grid-cols-[80px_1fr_130px_130px_100px_70px] items-center gap-4 md:grid">

                                        {/* IMAGE */}

                                        <div className="h-16 w-16 overflow-hidden rounded-lg border border-gray-700 bg-[#182126]">

                                            <img
                                                src={product.image1}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />

                                        </div>

                                        {/* PRODUCT */}

                                        <div className="min-w-0">

                                            <p className="truncate text-sm font-semibold text-white">
                                                {product.name}
                                            </p>

                                            <p className="mt-1 line-clamp-1 text-xs text-gray-500">
                                                {product.description}
                                            </p>

                                            {product.bestseller && (
                                                <span className="mt-2 inline-block rounded-full border border-gray-600 bg-[#1c272c] px-2 py-0.5 text-[10px] font-medium text-gray-300">
                                                    Bestseller
                                                </span>
                                            )}

                                        </div>

                                        {/* CATEGORY */}

                                        <p className="text-sm text-gray-300">
                                            {product.category}
                                        </p>

                                        {/* SUBCATEGORY */}

                                        <p className="text-sm text-gray-400">
                                            {product.subCategory}
                                        </p>

                                        {/* PRICE */}

                                        <p className="text-sm font-semibold text-gray-200">
                                            ₹{product.price}
                                        </p>

                                        {/* DELETE */}

                                        <button
                                            onClick={() =>
                                                handleDelete(product._id)
                                            }
                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 bg-[#182126] text-gray-400 transition hover:border-gray-500 hover:bg-[#222c31] hover:text-white"
                                            title="Delete product"
                                        >

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 7h12M10 11v6M14 11v6M9 7V4h6v3m-8 0 1 13h8l1-13"
                                                />
                                            </svg>

                                        </button>

                                    </div>

                                    {/* MOBILE */}

                                    <div className="flex gap-4 md:hidden">

                                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-700 bg-[#182126]">

                                            <img
                                                src={product.image1}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />

                                        </div>

                                        <div className="min-w-0 flex-1">

                                            <div className="flex items-start justify-between gap-3">

                                                <div className="min-w-0">

                                                    <h3 className="truncate text-sm font-semibold text-white">
                                                        {product.name}
                                                    </h3>

                                                    <p className="mt-1 text-xs text-gray-500">
                                                        {product.category} ·{" "}
                                                        {product.subCategory}
                                                    </p>

                                                </div>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            product._id
                                                        )
                                                    }
                                                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-[#182126] text-gray-400 hover:text-white"
                                                >

                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6 7h12M10 11v6M14 11v6M9 7V4h6v3m-8 0 1 13h8l1-13"
                                                        />
                                                    </svg>

                                                </button>

                                            </div>

                                            <p className="mt-3 text-sm font-semibold text-gray-200">
                                                ₹{product.price}
                                            </p>

                                            {product.bestseller && (
                                                <span className="mt-2 inline-block rounded-full border border-gray-600 bg-[#1c272c] px-2 py-0.5 text-[10px] text-gray-300">
                                                    Bestseller
                                                </span>
                                            )}

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default List;