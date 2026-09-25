import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { shopDataContext } from "../context/ShopContext";
import { UserContext } from "../context/UserContext";

import RelatedProduct from "../component/RelatedProduct";

function ProductDetail() {

    const { productId } = useParams();
    const navigate = useNavigate();

    const {
        products,
        currency,
        addToCart
    } = useContext(shopDataContext);

    const { user } = useContext(UserContext);

    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState("");
    const [size, setSize] = useState("");
    const [activeTab, setActiveTab] = useState("description");


    useEffect(() => {

        const product = products.find(
            (item) => item._id === productId
        );

        if (product) {
            setProductData(product);
            setImage(product.image1);
        }

    }, [productId, products]);


    if (!productData) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-b from-[#141414] to-[#0c2025] flex items-center justify-center text-white">
                Loading...
            </div>
        );
    }


    return (

        <div className="w-full min-h-screen bg-gradient-to-b from-[#141414] to-[#0c2025] text-white py-[40px] px-[20px] md:px-[50px]">


            {/* ================= PRODUCT SECTION ================= */}

            <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row gap-[40px]">


                {/* ================= LEFT SIDE ================= */}

                <div className="w-full md:w-[55%] flex flex-col-reverse md:flex-row gap-[15px]">


                    {/* THUMBNAILS */}

                    <div className="flex md:flex-col gap-[10px]">

                        {[
                            productData.image1,
                            productData.image2,
                            productData.image3,
                            productData.image4
                        ].map((img, index) => (

                            img && (

                                <img
                                    key={index}
                                    src={img}
                                    alt={productData.name}
                                    onClick={() => setImage(img)}
                                    className={`w-[70px] h-[70px] object-cover rounded-md cursor-pointer border-[1px] ${
                                        image === img
                                            ? "border-[#c3f6fa]"
                                            : "border-[#ffffff30]"
                                    }`}
                                />

                            )

                        ))}

                    </div>


                    {/* MAIN IMAGE */}

                    <div className="w-full h-[550px] flex items-center justify-center bg-white rounded-lg overflow-hidden">

                        <img
                            src={image}
                            alt={productData.name}
                            className="w-full h-full object-contain"
                        />

                    </div>

                </div>


                {/* ================= RIGHT SIDE ================= */}

                <div className="w-full md:w-[45%] flex flex-col justify-center">


                    {/* PRODUCT NAME */}

                    <h1 className="text-[28px] md:text-[36px] font-semibold text-[#c3f6fa]">
                        {productData.name}
                    </h1>


                    {/* RATING */}

                    <div className="flex items-center gap-[8px] mt-[12px]">

                        <span className="text-yellow-400 text-[20px]">
                            ★★★★★
                        </span>

                        <span className="text-[#b8dfe0] text-[14px]">
                            (124 Reviews)
                        </span>

                    </div>


                    {/* PRICE */}

                    <p className="mt-[15px] text-[24px] text-white">
                        {currency} {productData.price}
                    </p>


                    {/* SHORT DESCRIPTION */}

                    <p className="mt-[20px] text-[15px] leading-[1.8] text-[#b8dfe0]">
                        {productData.description}
                    </p>


                    {/* CATEGORY */}

                    <div className="mt-[20px] text-[14px] text-[#b8dfe0]">

                        <p>
                            <span className="text-white">
                                Category:
                            </span>{" "}
                            {productData.category}
                        </p>

                        <p className="mt-[5px]">
                            <span className="text-white">
                                Sub Category:
                            </span>{" "}
                            {productData.subCategory}
                        </p>

                    </div>


                    {/* SIZE */}

                    <div className="mt-[25px]">

                        <p className="text-[16px] mb-[12px]">
                            Select Size
                        </p>

                        <div className="flex flex-wrap gap-[10px]">

                            {productData.sizes.map((item, index) => (

                                <button
                                    key={index}
                                    onClick={() => setSize(item)}
                                    className={`px-[20px] py-[10px] rounded-md border-[1px] ${
                                        size === item
                                            ? "bg-[#c3f6fa] text-black border-[#c3f6fa]"
                                            : "border-[#ffffff40] text-white"
                                    }`}
                                >
                                    {item}
                                </button>

                            ))}

                        </div>

                    </div>


                    {/* ADD TO CART */}

                    <button
                        onClick={async () => {

                            // User is not logged in
                            if (!user) {
                                navigate("/login");
                                return;
                            }

                            // Size is not selected
                            if (!size) {
                                alert("Please select a size");
                                return;
                            }

                            // Add product to cart
                            const result = await addToCart(
                                productData._id,
                                size
                            );

                            // Token expired / authentication problem
                            if (result.loginRequired) {
                                navigate("/login");
                                return;
                            }

                            // Some other error
                            if (!result.success) {
                                alert(result.message);
                                return;
                            }

                            // Successfully added
                            alert("Product added to cart");

                        }}
                        className="mt-[30px] w-full md:w-[250px] py-[14px] bg-[#c3f6fa] text-black rounded-md font-semibold hover:bg-white transition"
                    >
                        ADD TO CART
                    </button>


                    {/* PRODUCT BENEFITS */}

                    <div className="mt-[25px] text-[13px] text-[#b8dfe0] space-y-[5px]">

                        <p>
                            ✓ 100% Original Product
                        </p>

                        <p>
                            ✓ Cash on delivery available
                        </p>

                        <p>
                            ✓ Easy return within 7 days
                        </p>

                    </div>

                </div>

            </div>


            {/* ================= DESCRIPTION / REVIEWS ================= */}

            <div className="w-full max-w-[1200px] mx-auto mt-[60px]">


                {/* TABS */}

                <div className="flex">

                    <button
                        onClick={() => setActiveTab("description")}
                        className={`px-[25px] py-[12px] border-[1px] border-[#ffffff30] ${
                            activeTab === "description"
                                ? "bg-[#c3f6fa] text-black"
                                : "text-white"
                        }`}
                    >
                        Description
                    </button>


                    <button
                        onClick={() => setActiveTab("reviews")}
                        className={`px-[25px] py-[12px] border-[1px] border-[#ffffff30] ${
                            activeTab === "reviews"
                                ? "bg-[#c3f6fa] text-black"
                                : "text-white"
                        }`}
                    >
                        Reviews
                    </button>

                </div>


                {/* TAB CONTENT */}

                <div className="border-[1px] border-[#ffffff30] p-[25px]">


                    {/* ================= DESCRIPTION ================= */}

                    {activeTab === "description" && (

                        <div className="text-[#b8dfe0]">

                            <p className="leading-[1.8]">
                                {productData.description}
                            </p>

                            <div className="mt-[20px]">

                                <p>
                                    This product is designed with quality,
                                    comfort and style in mind.
                                </p>

                                <p className="mt-[8px]">
                                    Category: {productData.category}
                                </p>

                                <p className="mt-[8px]">
                                    Sub Category: {productData.subCategory}
                                </p>

                            </div>

                        </div>

                    )}


                    {/* ================= REVIEWS ================= */}

                    {activeTab === "reviews" && (

                        <div>

                            <h3 className="text-white text-[20px] mb-[20px]">
                                Customer Reviews
                            </h3>


                            {/* REVIEW 1 */}

                            <div className="border-b border-[#ffffff20] pb-[20px] mb-[20px]">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-white font-medium">
                                            Rahul Sharma
                                        </p>

                                        <div className="text-yellow-400 text-[16px] mt-[5px]">
                                            ★★★★★
                                        </div>

                                    </div>

                                    <p className="text-[#8fa8aa] text-[12px]">
                                        2 days ago
                                    </p>

                                </div>

                                <p className="text-[#b8dfe0] mt-[10px] leading-[1.6]">
                                    Really good quality product. The material
                                    is comfortable and the fitting is perfect.
                                    Very happy with the purchase.
                                </p>

                            </div>


                            {/* REVIEW 2 */}

                            <div className="border-b border-[#ffffff20] pb-[20px] mb-[20px]">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-white font-medium">
                                            Priya Singh
                                        </p>

                                        <div className="text-yellow-400 text-[16px] mt-[5px]">
                                            ★★★★☆
                                        </div>

                                    </div>

                                    <p className="text-[#8fa8aa] text-[12px]">
                                        5 days ago
                                    </p>

                                </div>

                                <p className="text-[#b8dfe0] mt-[10px] leading-[1.6]">
                                    The product looks exactly like the pictures.
                                    Good quality and comfortable to wear.
                                    Delivery was also quick.
                                </p>

                            </div>


                            {/* REVIEW 3 */}

                            <div>

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-white font-medium">
                                            Aman Kumar
                                        </p>

                                        <div className="text-yellow-400 text-[16px] mt-[5px]">
                                            ★★★★★
                                        </div>

                                    </div>

                                    <p className="text-[#8fa8aa] text-[12px]">
                                        1 week ago
                                    </p>

                                </div>

                                <p className="text-[#b8dfe0] mt-[10px] leading-[1.6]">
                                    Excellent product for the price. The fabric
                                    feels good and the size was exactly as
                                    expected.
                                </p>

                            </div>


                            {/* DISABLED REVIEW BUTTON */}

                            <button
                                disabled
                                className="mt-[30px] px-[25px] py-[12px] bg-[#ffffff20] text-[#718789] rounded-md cursor-not-allowed"
                            >
                                Write a Review
                            </button>

                        </div>

                    )}

                </div>

            </div>


            {/* ================= RELATED PRODUCTS ================= */}

            <div className="w-full max-w-[1200px] mx-auto">

                <RelatedProduct
                    productData={productData}
                />

            </div>

        </div>
    );
}

export default ProductDetail;