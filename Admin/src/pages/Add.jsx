import { useContext, useState } from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

const Add = () => {
    const [images, setImages] = useState([null, null, null, null]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Men",
        subcategory: "Topwear",
        sizes: [],
        bestseller: false,
    });

    const { serverUrl } = useContext(AuthContext);

    // Handle image selection
    const handleImage = (e, index) => {
        const file = e.target.files[0];

        if (!file) return;

        const newImages = [...images];
        newImages[index] = file;

        setImages(newImages);
    };

    // Handle input/select changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle sizes
    const handleSize = (size) => {
        setFormData((prev) => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter((s) => s !== size)
                : [...prev.sizes, size],
        }));
    };

    // Submit product
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();

            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("category", formData.category);
            data.append("subCategory", formData.subcategory);
            data.append("sizes", JSON.stringify(formData.sizes));
            data.append("bestseller", formData.bestseller);

            if (images[0]) data.append("image1", images[0]);
            if (images[1]) data.append("image2", images[1]);
            if (images[2]) data.append("image3", images[2]);
            if (images[3]) data.append("image4", images[3]);

            const response = await axios.post(
                serverUrl + "/api/product/addproduct",
                data,
                {
                    withCredentials: true,
                }
            );

            console.log(response.data);

            alert("Product added successfully!");

            // Reset form
            setFormData({
                name: "",
                description: "",
                price: "",
                category: "Men",
                subcategory: "Topwear",
                sizes: [],
                bestseller: false,
            });

            setImages([null, null, null, null]);
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message || "Failed to add product"
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#0f1518] px-4 py-8 text-gray-200 sm:px-6 lg:px-10">

            {/* ================= HEADER ================= */}

            <div className="mx-auto mb-8 max-w-5xl">

                <div className="flex items-center justify-between">

                    <div>
                        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gray-400">
                            Product Management
                        </p>

                        <h1 className="text-3xl font-semibold text-white">
                            Add Product
                        </h1>

                        <p className="mt-2 text-sm text-gray-400">
                            Add a new product to your Cartly store
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
                                d="M12 4v16m8-8H4"
                            />
                        </svg>

                    </div>

                </div>

            </div>

            {/* ================= FORM ================= */}

            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-5xl"
            >

                <div className="overflow-hidden rounded-2xl border border-gray-700 bg-[#12191d] shadow-2xl">

                    {/* ================= PRODUCT IMAGES ================= */}

                    <div className="border-b border-gray-700 bg-[#131c20] p-6 sm:p-8">

                        <div className="mb-6">

                            <h2 className="text-xl font-semibold text-white">
                                Product Images
                            </h2>

                            <p className="mt-1 text-sm text-gray-400">
                                Upload up to 4 images of your product
                            </p>

                        </div>

                        {/* Upload Boxes */}

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

                            {[0, 1, 2, 3].map((index) => (

                                <label
                                    key={index}
                                    htmlFor={`image${index}`}
                                    className="group cursor-pointer"
                                >

                                    <input
                                        type="file"
                                        id={`image${index}`}
                                        hidden
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleImage(e, index)
                                        }
                                    />

                                    <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-dashed border-gray-600 bg-[#182126] transition duration-200 group-hover:border-gray-400 group-hover:bg-[#1c272c]">

                                        {images[index] ? (

                                            <img
                                                src={URL.createObjectURL(
                                                    images[index]
                                                )}
                                                alt={`Product ${index + 1}`}
                                                className="h-full w-full object-cover"
                                            />

                                        ) : (

                                            <div className="flex h-full flex-col items-center justify-center">

                                                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#263238] text-gray-300">

                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="1.7"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 4v16m8-8H4"
                                                        />
                                                    </svg>

                                                </div>

                                                <p className="text-sm font-medium text-gray-200">
                                                    Add Image
                                                </p>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    PNG, JPG
                                                </p>

                                            </div>

                                        )}

                                    </div>

                                    <p className="mt-2 text-center text-xs font-medium text-gray-400">
                                        Image {index + 1}
                                    </p>

                                </label>

                            ))}

                        </div>

                    </div>

                    {/* ================= PRODUCT INFORMATION ================= */}

                    <div className="p-6 sm:p-8">

                        <div className="mb-7">

                            <h2 className="text-xl font-semibold text-white">
                                Product Information
                            </h2>

                            <p className="mt-1 text-sm text-gray-400">
                                Enter the details of your new product
                            </p>

                        </div>

                        <div className="space-y-6">

                            {/* PRODUCT NAME */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Premium Cotton T-Shirt"
                                    required
                                    className="w-full rounded-lg border border-gray-600 bg-[#182126] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-gray-400 focus:bg-[#1b252a]"
                                />

                            </div>

                            {/* DESCRIPTION */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-300">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe your product..."
                                    rows="5"
                                    required
                                    className="w-full resize-none rounded-lg border border-gray-600 bg-[#182126] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-gray-400 focus:bg-[#1b252a]"
                                />

                            </div>

                            {/* PRICE / CATEGORY / SUBCATEGORY */}

                            <div className="grid gap-5 md:grid-cols-3">

                                {/* PRICE */}

                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-300">
                                        Price
                                    </label>

                                    <div className="relative">

                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                                            ₹
                                        </span>

                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="499"
                                            min="0"
                                            required
                                            className="w-full rounded-lg border border-gray-600 bg-[#182126] py-3 pl-9 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-gray-400"
                                        />

                                    </div>

                                </div>

                                {/* CATEGORY */}

                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-300">
                                        Category
                                    </label>

                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-600 bg-[#182126] px-4 py-3 text-sm text-gray-200 outline-none focus:border-gray-400"
                                    >

                                        <option value="Men">
                                            Men
                                        </option>

                                        <option value="Women">
                                            Women
                                        </option>

                                        <option value="Kids">
                                            Kids
                                        </option>

                                    </select>

                                </div>

                                {/* SUBCATEGORY */}

                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-300">
                                        Subcategory
                                    </label>

                                    <select
                                        name="subcategory"
                                        value={formData.subcategory}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-600 bg-[#182126] px-4 py-3 text-sm text-gray-200 outline-none focus:border-gray-400"
                                    >

                                        <option value="Topwear">
                                            Topwear
                                        </option>

                                        <option value="Bottomwear">
                                            Bottomwear
                                        </option>

                                        <option value="Winterwear">
                                            Winterwear
                                        </option>

                                    </select>

                                </div>

                            </div>

                            {/* ================= SIZES ================= */}

                            <div>

                                <label className="mb-3 block text-sm font-medium text-gray-300">
                                    Available Sizes
                                </label>

                                <div className="flex flex-wrap gap-3">

                                    {["S", "M", "L", "XL", "XXL"].map(
                                        (size) => (

                                            <button
                                                type="button"
                                                key={size}
                                                onClick={() =>
                                                    handleSize(size)
                                                }
                                                className={`min-w-14 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                                                    formData.sizes.includes(
                                                        size
                                                    )
                                                        ? "border border-gray-300 bg-gray-200 text-gray-900"
                                                        : "border border-gray-600 bg-[#182126] text-gray-300 hover:border-gray-400 hover:bg-[#202b30]"
                                                }`}
                                            >
                                                {size}
                                            </button>

                                        )
                                    )}

                                </div>

                            </div>

                            {/* ================= BESTSELLER ================= */}

                            <div className="rounded-xl border border-gray-700 bg-[#182126] p-4">

                                <label className="flex cursor-pointer items-center gap-3">

                                    <input
                                        type="checkbox"
                                        checked={formData.bestseller}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                bestseller:
                                                    e.target.checked,
                                            }))
                                        }
                                        className="h-4 w-4 cursor-pointer rounded border-gray-500 bg-gray-700 text-white focus:ring-gray-500"
                                    />

                                    <div>

                                        <p className="text-sm font-semibold text-gray-200">
                                            Add to Bestseller
                                        </p>

                                        <p className="mt-0.5 text-xs text-gray-500">
                                            Display this product in your
                                            bestseller section
                                        </p>

                                    </div>

                                </label>

                            </div>

                        </div>

                    </div>

                    {/* ================= FOOTER ================= */}

                    <div className="flex flex-col gap-4 border-t border-gray-700 bg-[#10171a] p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">

                        <p className="text-xs text-gray-500">
                            Make sure all product information is correct.
                        </p>

                        <button
                            type="submit"
                            className="rounded-lg bg-gray-200 px-8 py-3 text-sm font-semibold text-gray-900 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Add Product
                        </button>

                    </div>

                </div>

            </form>

        </div>
    );
};

export default Add;