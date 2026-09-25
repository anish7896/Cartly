import {
    createContext,
    useState,
    useContext,
    useEffect
} from "react";

import { AuthContext } from "./authContext";
import { UserContext } from "./UserContext";

import axios from "axios";

export const shopDataContext = createContext();

function ShopContext({ children }) {

    const [products, setProducts] = useState([]);

    const [cartData, setCartData] = useState({});

    const { serverUrl } = useContext(AuthContext);
    const { user } = useContext(UserContext);

    const currency = "₹";
    const delivery_fee = 40;


    // ================= GET PRODUCTS =================

    const getProducts = async () => {

        try {

            const result = await axios.get(
                serverUrl + "/api/product/list"
            );

            console.log(result.data);

            setProducts(result.data);

        } catch (error) {

            console.log(error);

        }
    };


    // ================= GET CART =================

    const getCart = async () => {

        if (!user) {
            setCartData({});
            return;
        }

        try {

            const response = await axios.get(
                serverUrl + "/api/user/cart",
                {
                    withCredentials: true
                }
            );

            setCartData(
                response.data.cartData || {}
            );

        } catch (error) {

            console.log(
                "GET CART ERROR:",
                error
            );

        }
    };


    // ================= ADD TO CART =================

    const addToCart = async (
        productId,
        size
    ) => {

        if (!user) {

            return {
                success: false,
                loginRequired: true
            };

        }

        if (!size) {

            return {
                success: false,
                message: "Please select a size"
            };

        }

        try {

            const response = await axios.post(
                serverUrl + "/api/user/addcart",
                {
                    productId,
                    size
                },
                {
                    withCredentials: true
                }
            );

            setCartData(
                response.data.cartData || {}
            );

            return {
                success: true,
                message: "Product added to cart"
            };

        } catch (error) {

            console.log(
                "ADD TO CART ERROR:",
                error
            );

            if (
                error.response?.status === 401
            ) {

                return {
                    success: false,
                    loginRequired: true
                };

            }

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Unable to add product to cart"
            };
        }
    };


    // ================= UPDATE CART =================

    const updateCart = async (
        productId,
        size,
        quantity
    ) => {

        try {

            const response = await axios.post(
                serverUrl + "/api/user/updatecart",
                {
                    productId,
                    size,
                    quantity
                },
                {
                    withCredentials: true
                }
            );

            setCartData(
                response.data.cartData || {}
            );

            return true;

        } catch (error) {

            console.log(
                "UPDATE CART ERROR:",
                error
            );

            return false;
        }
    };


    // ================= REMOVE FROM CART =================

    const removeFromCart = async (
        productId,
        size
    ) => {

        try {

            const response = await axios.post(
                serverUrl + "/api/user/removefromcart",
                {
                    productId,
                    size
                },
                {
                    withCredentials: true
                }
            );

            setCartData(
                response.data.cartData || {}
            );

            return true;

        } catch (error) {

            console.log(
                "REMOVE CART ERROR:",
                error
            );

            return false;
        }
    };


    // ================= CART COUNT =================

    const getCartCount = () => {

        let totalCount = 0;

        for (const productId in cartData) {

            for (const size in cartData[productId]) {

                totalCount +=
                    cartData[productId][size];

            }

        }

        return totalCount;
    };


    // ================= EFFECTS =================

    useEffect(() => {

        getProducts();

    }, []);


    useEffect(() => {

        getCart();

    }, [user]);


    const value = {

        products,
        currency,
        delivery_fee,

        cartData,

        getProducts,
        getCart,

        addToCart,
        updateCart,
        removeFromCart,

        getCartCount
    };


    return (

        <div>

            <shopDataContext.Provider value={value}>

                {children}

            </shopDataContext.Provider>

        </div>

    );
}

export default ShopContext;