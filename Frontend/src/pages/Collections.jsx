import { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch, FiChevronDown, FiX } from "react-icons/fi";

import { shopDataContext } from "../context/ShopContext";
import Card from "../component/card";


function Collections() {

    const { products } = useContext(shopDataContext);

    const [searchParams, setSearchParams] = useSearchParams();

    const [category, setCategory] = useState("All");
    const [subCategory, setSubCategory] = useState("All");
    const [sortType, setSortType] = useState("relevant");

    const [search, setSearch] = useState(
        searchParams.get("search") || ""
    );

    const [filterProducts, setFilterProducts] = useState([]);


    /* ========================================================= */
    /*                    CATEGORY DATA                          */
    /* ========================================================= */

    const categories = useMemo(() => {

        const uniqueCategories = [
            ...new Set(
                products
                    .map((item) => item.category)
                    .filter(Boolean)
            )
        ];

        return ["All", ...uniqueCategories];

    }, [products]);


    /* ========================================================= */
    /*                  SUB-CATEGORY DATA                        */
    /* ========================================================= */

    const subCategories = [
        "All",
        "TopWear",
        "BottomWear",
        "WinterWear"
    ];


    /* ========================================================= */
    /*                  FILTER PRODUCTS                          */
    /* ========================================================= */

    useEffect(() => {

        let productsCopy = [...products];


        /* ---------------- CATEGORY ---------------- */

        if (category !== "All") {

            productsCopy = productsCopy.filter(
                (item) =>
                    item.category?.toLowerCase() ===
                    category.toLowerCase()
            );

        }


        /* ---------------- SUB CATEGORY ---------------- */

        if (subCategory !== "All") {

            productsCopy = productsCopy.filter(
                (item) => {

                    const itemSubCategory =
                        item.subCategory ||
                        item.subcategory;

                    return (
                        itemSubCategory?.toLowerCase() ===
                        subCategory.toLowerCase()
                    );

                }
            );

        }


        /* ---------------- SEARCH ---------------- */

        if (search.trim() !== "") {

            const searchValue =
                search.toLowerCase().trim();

            productsCopy = productsCopy.filter(
                (item) =>
                    item.name
                        ?.toLowerCase()
                        .includes(searchValue)
            );

        }


        /* ---------------- SORT ---------------- */

        if (sortType === "low-high") {

            productsCopy.sort(
                (a, b) => a.price - b.price
            );

        }


        if (sortType === "high-low") {

            productsCopy.sort(
                (a, b) => b.price - a.price
            );

        }


        if (sortType === "newest") {

            productsCopy.reverse();

        }


        setFilterProducts(productsCopy);

    }, [
        products,
        category,
        subCategory,
        search,
        sortType
    ]);


    /* ========================================================= */
    /*                    SEARCH HANDLER                         */
    /* ========================================================= */

    const handleSearch = (e) => {

        const value = e.target.value;

        setSearch(value);

        if (value.trim()) {

            setSearchParams({
                search: value
            });

        } else {

            setSearchParams({});

        }

    };


    /* ========================================================= */
    /*                  CATEGORY CHANGE                          */
    /* ========================================================= */

    const handleCategoryChange = (item) => {

        setCategory(item);

        // Reset sub-category
        setSubCategory("All");

    };


    /* ========================================================= */
    /*                       CLEAR FILTERS                       */
    /* ========================================================= */

    const clearFilters = () => {

        setCategory("All");
        setSubCategory("All");
        setSearch("");
        setSortType("relevant");

        setSearchParams({});

    };


    return (

        <div className="min-h-screen w-full bg-[#0F1B1E] text-white">


            {/* ================================================= */}
            {/*                    PAGE HEADER                     */}
            {/* ================================================= */}

            <section className="
                w-full
                px-5
                md:px-8
                pt-8
                pb-5
            ">

                <div className="
                    max-w-[1400px]
                    mx-auto
                ">

                    <p className="
                        text-[#83D5D7]
                        text-[12px]
                        tracking-[3px]
                        uppercase
                        mb-2
                    ">
                        Explore Cartly
                    </p>


                    <div className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-end
                        md:justify-between
                        gap-5
                    ">

                        <div>

                            <h1 className="
                                text-[32px]
                                md:text-[42px]
                                font-semibold
                                tracking-tight
                            ">

                                All{" "}

                                <span className="text-[#9DE4E6]">
                                    Collections
                                </span>

                            </h1>


                            <p className="
                                mt-2
                                text-[#91A6A9]
                                text-sm
                            ">
                                Discover products that match your style.
                            </p>

                        </div>


                        {/* SEARCH */}

                        <div className="
                            relative
                            w-full
                            md:w-[330px]
                        ">

                            <FiSearch
                                size={18}
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-[#7F9699]
                                "
                            />


                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={handleSearch}
                                className="
                                    w-full
                                    h-[44px]
                                    pl-11
                                    pr-10
                                    rounded-lg
                                    bg-[#172528]
                                    border
                                    border-[#294044]
                                    text-white
                                    placeholder:text-[#718487]
                                    outline-none
                                    focus:border-[#65C7CA]
                                    transition
                                "
                            />


                            {search && (

                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch("");
                                        setSearchParams({});
                                    }}
                                    className="
                                        absolute
                                        right-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-[#82979A]
                                        hover:text-white
                                    "
                                >
                                    <FiX size={17} />
                                </button>

                            )}

                        </div>

                    </div>

                </div>

            </section>


            {/* ================================================= */}
            {/*                     MAIN AREA                      */}
            {/* ================================================= */}

            <section className="
                max-w-[1400px]
                mx-auto
                px-5
                md:px-8
                pb-12
            ">

                <div className="
                    flex
                    flex-col
                    lg:flex-row
                    gap-6
                ">


                    {/* ================================================= */}
                    {/*                     SIDEBAR                        */}
                    {/* ================================================= */}

                    <aside className="
                        w-full
                        lg:w-[225px]
                        shrink-0
                        bg-[#132225]
                        border
                        border-[#263A3E]
                        rounded-xl
                        p-5
                        h-fit
                    ">


                        {/* FILTER HEADER */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            mb-5
                        ">

                            <h2 className="
                                text-[#9DE4E6]
                                text-[14px]
                                font-semibold
                                tracking-[1px]
                                uppercase
                            ">
                                Filters
                            </h2>


                            <button
                                type="button"
                                onClick={clearFilters}
                                className="
                                    text-[11px]
                                    text-[#7FA0A3]
                                    hover:text-[#9DE4E6]
                                    transition
                                "
                            >
                                Clear
                            </button>

                        </div>


                        {/* ================================================= */}
                        {/*                    CATEGORIES                     */}
                        {/* ================================================= */}

                        <div className="mb-7">

                            <h3 className="
                                text-[#D4E2E3]
                                text-[12px]
                                font-medium
                                uppercase
                                tracking-[1px]
                                mb-3
                            ">
                                Categories
                            </h3>


                            <div className="flex flex-col gap-3">

                                {categories.map((item) => (

                                    <label
                                        key={item}
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            cursor-pointer
                                            group
                                        "
                                    >

                                        <input
                                            type="radio"
                                            name="category"
                                            checked={
                                                category === item
                                            }
                                            onChange={() =>
                                                handleCategoryChange(item)
                                            }
                                            className="
                                                accent-[#62C5C8]
                                                cursor-pointer
                                            "
                                        />


                                        <span
                                            className={`
                                                text-sm
                                                transition
                                                ${
                                                    category === item
                                                        ? "text-[#9DE4E6] font-medium"
                                                        : "text-[#9AAEB0] group-hover:text-white"
                                                }
                                            `}
                                        >
                                            {item}
                                        </span>

                                    </label>

                                ))}

                            </div>

                        </div>


                        {/* ================================================= */}
                        {/*                  SUB-CATEGORIES                    */}
                        {/* ================================================= */}

                        <div>

                            <h3 className="
                                text-[#D4E2E3]
                                text-[12px]
                                font-medium
                                uppercase
                                tracking-[1px]
                                mb-3
                            ">
                                Sub-Categories
                            </h3>


                            <div className="flex flex-col gap-3">

                                {subCategories.map((item) => (

                                    <label
                                        key={item}
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            cursor-pointer
                                            group
                                        "
                                    >

                                        <input
                                            type="radio"
                                            name="subcategory"
                                            checked={
                                                subCategory === item
                                            }
                                            onChange={() =>
                                                setSubCategory(item)
                                            }
                                            className="
                                                accent-[#62C5C8]
                                                cursor-pointer
                                            "
                                        />


                                        <span
                                            className={`
                                                text-sm
                                                transition
                                                ${
                                                    subCategory === item
                                                        ? "text-[#9DE4E6] font-medium"
                                                        : "text-[#9AAEB0] group-hover:text-white"
                                                }
                                            `}
                                        >
                                            {item}
                                        </span>

                                    </label>

                                ))}

                            </div>

                        </div>

                    </aside>


                    {/* ================================================= */}
                    {/*                    PRODUCTS                        */}
                    {/* ================================================= */}

                    <main className="flex-1 min-w-0">


                        {/* ================================================= */}
                        {/*                     TOOLBAR                       */}
                        {/* ================================================= */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            mb-5
                            pb-4
                            border-b
                            border-[#263A3E]
                        ">

                            <div>

                                <h2 className="
                                    text-[22px]
                                    font-medium
                                    text-white
                                ">
                                    {category === "All"
                                        ? "All Products"
                                        : category}
                                </h2>


                                <p className="
                                    text-[#71878A]
                                    text-xs
                                    mt-1
                                ">
                                    {filterProducts.length} products
                                </p>

                            </div>


                            {/* SORT */}

                            <div className="relative">

                                <select
                                    value={sortType}
                                    onChange={(e) =>
                                        setSortType(e.target.value)
                                    }
                                    className="
                                        appearance-none
                                        bg-[#172528]
                                        border
                                        border-[#30464A]
                                        text-[#D8E5E6]
                                        text-sm
                                        rounded-lg
                                        pl-4
                                        pr-10
                                        py-2.5
                                        outline-none
                                        cursor-pointer
                                        focus:border-[#65C7CA]
                                    "
                                >

                                    <option value="relevant">
                                        Sort: Relevant
                                    </option>

                                    <option value="newest">
                                        Newest
                                    </option>

                                    <option value="low-high">
                                        Price: Low to High
                                    </option>

                                    <option value="high-low">
                                        Price: High to Low
                                    </option>

                                </select>


                                <FiChevronDown
                                    size={16}
                                    className="
                                        pointer-events-none
                                        absolute
                                        right-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-[#8EA3A5]
                                    "
                                />

                            </div>

                        </div>


                        {/* ================================================= */}
                        {/*                  PRODUCT GRID                      */}
                        {/* ================================================= */}

                        <div className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-3
                            xl:grid-cols-4
                            gap-5
                        ">

                            {filterProducts.map((item) => (

                                <div
                                    key={item._id}
                                    className="
                                        group
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                    "
                                >

                                    <Card
                                        name={item.name}
                                        image={item.image1}
                                        id={item._id}
                                        price={item.price}
                                    />

                                </div>

                            ))}

                        </div>


                        {/* ================================================= */}
                        {/*                    NO PRODUCTS                     */}
                        {/* ================================================= */}

                        {filterProducts.length === 0 && (

                            <div className="
                                min-h-[400px]
                                flex
                                flex-col
                                items-center
                                justify-center
                                text-center
                            ">

                                <div className="
                                    w-16
                                    h-16
                                    rounded-full
                                    bg-[#172A2D]
                                    flex
                                    items-center
                                    justify-center
                                    text-2xl
                                    mb-4
                                ">
                                    🛍️
                                </div>


                                <h2 className="
                                    text-xl
                                    font-semibold
                                    text-white
                                ">
                                    No products found
                                </h2>


                                <p className="
                                    text-[#7F9699]
                                    text-sm
                                    mt-2
                                ">
                                    Try changing your search or filters.
                                </p>


                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="
                                        mt-5
                                        px-5
                                        py-2.5
                                        rounded-lg
                                        bg-[#2DB6C0]
                                        hover:bg-[#229CA5]
                                        text-[#071014]
                                        text-sm
                                        font-semibold
                                        transition
                                    "
                                >
                                    Clear Filters
                                </button>

                            </div>

                        )}

                    </main>

                </div>

            </section>

        </div>
    );
}

export default Collections;
