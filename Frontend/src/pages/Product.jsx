import LatestCollection from "../component/LatestCollection";
import BestSeller from "../component/BestSeller";

function Product() {
    return (
        <div className="w-full bg-[#0c2025] flex items-center justify-start flex-col py-[20px]">

            <div className="w-full flex items-center justify-center flex-col">
                <LatestCollection />
            </div>

            <div className="w-full flex items-center justify-center flex-col">
                <BestSeller />
            </div>

        </div>
    );
}

export default Product;