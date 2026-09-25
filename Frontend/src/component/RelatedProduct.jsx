import { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";

function RelatedProduct({ productData }) {

    const { products } = useContext(shopDataContext);

    const relatedProducts = products
        .filter(
            (item) =>
                item._id !== productData._id &&
                (
                    item.category === productData.category ||
                    item.subCategory === productData.subCategory
                )
        )
        .slice(0, 4);

    return (
        <div className="w-full mt-[60px]">

            <div className="w-full flex items-center justify-center gap-[8px] mb-[30px]">

                <h2 className="text-[24px] md:text-[30px] text-[#c3f6fa]">
                    RELATED
                </h2>

                <h2 className="text-[24px] md:text-[30px] text-white">
                    PRODUCTS
                </h2>

            </div>

            <div className="w-full flex flex-wrap justify-center gap-[25px]">

                {relatedProducts.map((item) => (

                    <Card
                        key={item._id}
                        name={item.name}
                        id={item._id}
                        price={item.price}
                        image={item.image1}
                    />

                ))}

            </div>

        </div>
    );
}

export default RelatedProduct;