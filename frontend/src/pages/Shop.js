import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import api from '../utils/api';
import toast from "react-hot-toast";
import Footer from "../components/footer";
import Header from "../components/header";
import FilterPanel from "../components/shopComponents/FilterPannel";
import CategoryTabs from "../components/shopComponents/CategoryTabs";
import ProductSection from "../components/shopComponents/ProductSection";
import HeroSection from "../components/shopComponents/HeroSection";





export default function Shop() {

    const location = useLocation();
    const productRef = useRef(null);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(
        location.state?.category || "T-Shirts"
    );
    const [filters, setFilters] = useState({
        price: [0, 100],
        subcategories: [
            { name: "Round Neck T-Shirt", checked: false },
            { name: "Collar T-shirt", checked: false },
            { name: "Zipped Hoodies", checked: false },
            { name: "Unzipped Hoodies", checked: false },
            { name: "Caps", checked: false },
            { name: "Mugs", checked: false },
            { name: "Key Chains", checked: false },
            { name: "Bottles", checked: false },
            { name: "Others", checked: false },
        ],
    });
    const [filtered, setFiltered] = useState("");
    const [loading, setLoading] = useState(false);

    const checkedSubs = filters.subcategories.filter(sub => sub.checked).map(sub => sub.name);

    const fetchFiltered = async () => {
        try {
            setLoading(true);
            const params = {};

            if (category) params.category = category;
            if (checkedSubs.length > 0) params.sub = checkedSubs;
            if (filters.price[0] > 0) params.minPrice = filters.price[0];
            if (filters.price[1] < 1000) params.maxPrice = filters.price[1];
            if (search.trim()) params.search = search.trim();

            const res = await api.get('/products', { params });
            setFiltered(res.data);
        } catch (err) {
            console.error("Failed to fetch filtered products:", err);
            toast.error("Error fetching products. Please try again.");
        } finally {
            setLoading(false);
        }
    };




    useEffect(() => {
        if (location.state?.scrollToProducts && productRef.current) {
            // Scroll to product section
            productRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
            // Scroll to top for normal /shop entry
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, []);

    useEffect(() => {
        fetchFiltered();
    }, [category, filters, search]);


    return (
        <>
            <Header />

            {/* Hero section */}
            <HeroSection searchQuery={search} onSearch={setSearch} />

            {/* Filter section */}
            <FilterPanel filters={filters} setFilters={setFilters} />

            {/* Category Tabs */}
            <div ref={productRef}>
                <CategoryTabs selected={category} onSelect={setCategory} />
            </div>

            {/* Product section */}
            {loading ?
                <div className="fixed inset-0 z-[9999] bg-subGrey/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="relative flex flex-col items-center justify-center p-8 bg-white/60 backdrop-blur-lg border border-mainBlue rounded-2xl shadow-xl">
                        {/* Spinner */}
                        <div className="w-16 h-16 border-4 border-mainBlue border-t-transparent rounded-full animate-spin" />

                        {/* Text */}
                        <p className="mt-4 text-mainBlue font-semibold text-lg tracking-wide animate-pulse">
                            Fetching products...
                        </p>
                    </div>
                </div>
                :
                <ProductSection title={category} products={filtered || []} />}

            <Footer />
        </>
    )
}