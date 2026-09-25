import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Nav from "./component/Nav";
import Cart from "./pages/Cart";

import { UserContext } from "./context/UserContext";

import About from "./pages/About";
import Collections from "./pages/Collections";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

import AI from "./component/AI";

function App() {

    const { user } = useContext(UserContext);

    return (
        <>
            {/* Navbar is visible for everyone */}
            <Nav />

            <Routes>

                {/* ================= PUBLIC ROUTES ================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/collection"
                    element={<Collections />}
                />

                <Route
                    path="/product"
                    element={<Product />}
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                <Route
                    path="/productdetail/:productId"
                    element={<ProductDetail />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                {/* ================= PROTECTED ROUTES ================= */}

                <Route
                    path="/checkout"
                    element={
                        user
                            ? <Checkout />
                            : <Navigate to="/login" replace />
                    }
                />

                <Route
                    path="/orders"
                    element={
                        user
                            ? <Orders />
                            : <Navigate to="/login" replace />
                    }
                />

                {/* ================= AUTH ROUTES ================= */}

                <Route
                    path="/login"
                    element={
                        user
                            ? <Navigate to="/" replace />
                            : <Login />
                    }
                />

                <Route
                    path="/signup"
                    element={
                        user
                            ? <Navigate to="/" replace />
                            : <Register />
                    }
                />

            </Routes>

            <AI />

        </>
    );
}

export default App;