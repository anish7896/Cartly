import { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";

function BestSeller() {

    const { products } = useContext(shopDataContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const filterProduct = products.filter(
            (item) => item.bestseller
        );

        setBestSeller(filterProduct.slice(0, 4));
    }, [products]);

    return (
        <div className="w-full py-[60px] bg-gradient-to-b from-[#0b1c20] to-[#102a2f]">

            {/* Heading */}
            <div className="w-full text-center">

                <Title
                    text1="BEST"
                    text2="SELLERS"
                />

                <p className="w-full px-[10px] mt-[-10px] text-[14px] md:text-[18px] text-[#b8dfe0]">
                    Tried, Tested, Loved – Discover Our All-Time Best Sellers.
                </p>

            </div>


            {/* Products */}
            <div className="
                w-full
                mt-[45px]
                px-[20px]
                flex
                items-center
                justify-center
                flex-wrap
                gap-[30px]
            ">

                {bestSeller.map((item) => (
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

export default BestSeller;