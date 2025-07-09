import Header from '../components/header';
import Footer from '../components/footer';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FiPlus, FiMinus } from 'react-icons/fi';
import CategoryTabs from '../components/shopComponents/CategoryTabs';
import axios from "axios";
import Slider from "react-slick";

const productData = {
    "T-Shirts": {
        "Round Neck T-Shirt": { image: ["/assets/CDIMAGES/CDRT3.png", "/assets/CDIMAGES/CDRT2.png", "/assets/CDIMAGES/CDRT1.png", "/assets/CDIMAGES/CDRT4.png", "/assets/CDIMAGES/CDRT5.png",], price: 20 },
    },
    "Hoodies": {
        "Zipped Hoodies": { image: ["/assets/CDIMAGES/CDUZH.png"], price: 20 },
        "Unzipped Hoodies": { image: ["/assets/CDIMAGES/CDZH.png"], price: 20 },
    },
    "Accessories": {
        "Key Chains": { image: ["/assets/CDIMAGES/CDKC1.png", "/assets/CDIMAGES/CDKC2.png", "/assets/CDIMAGES/CDKC3.png"], price: 10 },
        "Caps": { image: ["/assets/CDIMAGES/CDC.png"], price: 25 },
        "Mugs": { image: ["/assets/CDIMAGES/CDM.png"], price: 25 },
        "Bottles": { image: ["/assets/CDIMAGES/CDB.png"], price: 25 },
    }
};

const defaultSubCategory = {
    "T-Shirts": "Round Neck T-Shirt",
    "Hoodies": "Zipped Hoodies",
    "Accessories": "Key Chains"
};

const coloursAvailable = {
    "T-Shirts": {
        "Round Neck T-Shirt": ["Red", "Yellow", "Blue", "Grey", "Black", "White", "Brown"],
    },
    "Hoodies": {
        "Zipped Hoodies": ["Black"],
        "Unzipped Hoodies": ["Red", "Blue", "Black"],
    },
};

const sizesAvailable = ["S", "M", "L", "XL", "XXL"];

export default function CustomDesign() {
    const [selectedCategory, setSelectedCategory] = useState("T-Shirts");
    const [selectedSubCategory, setSelectedSubCategory] = useState(defaultSubCategory["T-Shirts"]);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [addCustomDesign, setAddCustomDesign] = useState(false);
    const [designImage, setDesignImage] = useState(null);
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async () => {
        if (!designImage) return null;

        const formData = new FormData();
        formData.append("image", designImage);

        const apiKey = process.env.REACT_APP_IMGBB_API_KEY;
        const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

        try {
            setUploading(true);
            const response = await axios.post(url, formData);
            setUploading(false);
            return response.data.data.url;
        } catch (err) {
            setUploading(false);
            toast.error("Image upload failed.");
            return null;
        }
    };


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const defaultSub = defaultSubCategory[selectedCategory];
        setSelectedSubCategory(defaultSub);
    }, [selectedCategory]);

    const subCategories = Object.keys(productData[selectedCategory]);
    const imageSrc = productData?.[selectedCategory]?.[selectedSubCategory]?.image;
    const price = productData?.[selectedCategory]?.[selectedSubCategory]?.price;
    const isDisabled = (selectedCategory === "T-Shirts" || selectedCategory === "Hoodies") && (!selectedColor || !selectedSize) ? true : false;
    const totalStockAvailable = 5;

    const increaseQty = () => {
        setQuantity((prev) => Math.min(totalStockAvailable, prev + 1));
    };
    const decreaseQty = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const handleAddToCart = async () => {

        if ((selectedCategory === "T-Shirts" || selectedCategory === "Hoodies") && (!selectedColor || !selectedSize)) {
            toast.error(`Please select a color and size`, {
                icon: '⚠️'
            });
            return;
        }


        const newItem = {
            id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            name: `Custom ${selectedSubCategory}`,
            price: price,
            category: selectedCategory,
            subcategory: selectedSubCategory,
            description,
            image: addCustomDesign ? await handleImageUpload() : null,
            quantity,
            color: (selectedCategory === "T-Shirts" || selectedCategory === "Hoodies") ? selectedColor : null,
            size: (selectedCategory === "T-Shirts" || selectedCategory === "Hoodies") ? selectedSize : null,
            isCustom: true,
            totalStockAvailable
        }

        const existingCart = JSON.parse(localStorage.getItem("RhiyaPrintersCart")) || [];

        const existingIndex = existingCart.findIndex(item =>
            item.name === newItem.name &&
            item.color === newItem.color &&
            item.size === newItem.size
        );

        if (existingIndex >= 0) {
            const existingQty = existingCart[existingIndex].quantity;
            const stock = 5;

            const totalQty = existingQty + newItem.quantity;

            if (totalQty > stock) {
                toast.error(`Limit reached: Only ${stock} available`, {
                    icon: '⚠️'
                });
                return;
            }

            if (addCustomDesign && newItem.image === null) {
                toast.error(`Please upload custom design for custom t-shirts`, {
                    icon: '⚠️'
                });
                return;
            }

            existingCart[existingIndex].quantity = totalQty;
            localStorage.setItem("RhiyaPrintersCart", JSON.stringify(existingCart));

            window.dispatchEvent(new Event("cartUpdated"));

            if (totalQty === stock) {
                toast.success(`Updated! Max quantity (${stock}) reached.`, {
                    icon: '✅'
                });
            } else {
                toast.success("Cart quantity updated.");
            }
            return;
        } else {
            if (addCustomDesign && newItem.image === null) {
                toast.error(`Please upload custom design for custom t-shirts`, {
                    icon: '⚠️'
                });
                return;
            }

            existingCart.push(newItem);
            localStorage.setItem("RhiyaPrintersCart", JSON.stringify(existingCart));
            window.dispatchEvent(new Event("cartUpdated"));
            toast.success("Item added to cart successfully!");
        }

        setSelectedColor("");
        setSelectedSize("");
        setQuantity(1);
        setAddCustomDesign(false);
        setDesignImage(null);
        setDescription("");

    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    const fixedImageSrc =
        imageSrc && imageSrc.length === 1
            ? [imageSrc[0], imageSrc[0],] // fake duplication for proper slick rendering
            : imageSrc;



    return (
        <>
            <Header />
            {uploading && (
                <div className="fixed inset-0 z-[9999] bg-white/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="relative flex flex-col items-center justify-center p-8 bg-white/60 backdrop-blur-lg border border-mainBlue rounded-2xl shadow-xl">
                        {/* Spinner */}
                        <div className="w-16 h-16 border-4 border-mainBlue border-t-transparent rounded-full animate-spin" />

                        {/* Text */}
                        <p className="mt-4 text-mainBlue font-semibold text-lg tracking-wide animate-pulse">
                            Uploading your design...
                        </p>
                    </div>
                </div>
            )}



            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row justify-between px-4 pt-10 lg:pt-16 h-auto lg:h-[600px] bg-subGrey gap-6 lg:gap-[40px] lg:px-[80px] overflow-hidden">
                {/* Left Text Section */}
                <div className="relative w-full flex flex-col items-center lg:items-start justify-center gap-[40px]">
                    <div className="w-full flex justify-center lg:justify-start">
                        <h1 className="font-rufina font-semibold leading-snug text-[20px] md:text-[30px] lg:text-[38px] text-mainBlue text-center lg:text-left w-2/3">
                            CREATE YOUR OWN FASHION – BE UNIQUE
                        </h1>
                    </div>
                    <div className="w-full flex justify-center lg:justify-end">
                        <p className="font-poppins font-normal leading-relaxed text-[16px] md:text-[20px] lg:text-[22px] text-subBlue text-center lg:text-right w-2/3">
                            Feed your creativity and stand out with a fashion sense that's one in a million!
                        </p>
                    </div>
                </div>

                {/* Right Image Section */}
                <div className="flex items-end justify-center w-full h-full">
                    <img
                        src="/assets/customLady.png"
                        alt="Custom Fashion Lady"
                        className="w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[550px] lg:h-[550px] object-contain object-bottom"
                    />
                </div>
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col bg-white px-4 py-8 lg:px-[80px] h-auto overflow-hidden">
                <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />

                <div className="flex flex-col items-center justify-center w-full pt-3">
                    <div className="flex flex-col lg:flex-row items-start justify-center w-full gap-10">
                        {/* Left Column: Product Image & Colours */}
                        <div className="flex flex-col items-center lg:items-start w-full max-w-[1024px] gap-4">
                            {/* For mobile, show sub-category name */}
                            <h1 className="font-slab font-medium text-[30px] md:text-[50px] lg:text-[64px] text-mainBlue text-center lg:text-left block lg:hidden">
                                {selectedSubCategory}
                            </h1>
                            <div className="w-full flex justify-center items-center lg:justify-start">
                                {fixedImageSrc && fixedImageSrc.length > 0 && (
                                    <div className="w-full max-w-[450px]">
                                        <Slider {...settings}>
                                            {fixedImageSrc.map((src, index) => (
                                                <div key={index} className="flex justify-center items-center">
                                                    <img
                                                        src={src}
                                                        alt={selectedSubCategory}
                                                        className="w-[250px] h-[280px] md:h-[300px] md:w-[280px] lg:w-[400px] lg:h-[450px] object-contain border-2 border-mainBlue rounded-md mx-auto"
                                                    />
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                )}
                            </div>


                            {(selectedCategory === "T-Shirts" || selectedCategory === "Hoodies") && (
                                <div className="w-full flex flex-col items-center lg:items-start gap-2">
                                    <h2 className="font-poppins font-semibold text-mainBlue text-lg lg:text-xl">
                                        Choose Colour
                                    </h2>
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                                        {coloursAvailable?.[selectedCategory]?.[selectedSubCategory]?.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => {
                                                    setSelectedColor(color);
                                                    setSelectedSize("");
                                                    setQuantity(1);
                                                }}
                                                className={`h-12 w-10 border-4 rounded transition-all duration-200 
                                                ${selectedColor === color ? "border-mainBlue scale-105" : "border-subBlue"}
                                                ${color === "Red"
                                                        ? "bg-red-800"
                                                        : color === "Grey"
                                                            ? "bg-zinc-600"
                                                            : color === "Blue"
                                                                ? "bg-blue-950"
                                                                : color === "Brown"
                                                                    ? "bg-orange-800"
                                                                    : color === "Black"
                                                                        ? "bg-black"
                                                                        : color === "White"
                                                                            ? "bg-white"
                                                                            : color === "Yellow"
                                                                                ? "bg-yellow-500"
                                                                                : "bg-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Product Details */}
                        <div className="flex flex-col items-start justify-start gap-6 w-full max-w-[1024px]">
                            {/* For desktop, show sub-category name */}
                            <h1 className="font-slab font-medium text-[40px] text-mainBlue hidden lg:block">
                                {selectedSubCategory}
                            </h1>

                            <select
                                className="w-full px-4 py-2 rounded-lg border border-mainBlue bg-white text-mainBlue font-poppins font-medium text-[18px] shadow-sm focus:outline-none focus:ring-2 focus:ring-mainBlue transition duration-200"
                                value={selectedSubCategory}
                                onChange={(e) => setSelectedSubCategory(e.target.value)}
                            >
                                {subCategories.map((sub) => (
                                    <option key={sub} value={sub}>
                                        {sub}
                                    </option>
                                ))}
                            </select>

                            <p className="font-mono font-bold text-[38px] text-mainBlue">$ {price}</p>

                            {(selectedCategory === "T-Shirts" || selectedCategory === "Hoodies") && (
                                <div className="flex flex-col gap-2 w-full">
                                    <h2 className="font-poppins font-semibold text-mainBlue text-lg">Size</h2>
                                    {selectedColor ? (
                                        <div className="flex gap-2">
                                            {sizesAvailable.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => {
                                                        setSelectedSize(size);
                                                        setQuantity(1);
                                                    }}
                                                    className={`h-10 w-10 border-2 rounded font-bold 
                                                        ${selectedSize === size
                                                            ? "bg-mainBlue text-white"
                                                            : "bg-subGrey text-black border-mainBlue"
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-red-500 font-medium bg-red-100 px-3 py-2 rounded border border-red-300">
                                            Please select a color first
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="flex flex-col gap-2">
                                <h2 className="font-poppins font-semibold text-mainBlue text-lg">Quantity</h2>
                                <div className="flex gap-3 items-center">
                                    <button
                                        onClick={decreaseQty}
                                        className="flex flex-col items-center justify-center h-10 w-10 bg-red-500 text-white font-bold rounded border border-mainBlue"
                                    >
                                        <FiMinus />
                                    </button>
                                    <div className="h-10 w-14 flex items-center justify-center border-2 border-mainBlue text-mainBlue font-bold bg-white rounded">
                                        {quantity}
                                    </div>
                                    <button
                                        onClick={increaseQty}
                                        className="flex flex-col items-center justify-center h-10 w-10 bg-green-700 text-white font-bold rounded border border-mainBlue"
                                    >
                                        <FiPlus />
                                    </button>
                                </div>
                            </div>

                            {/* Custom Design Upload & Description Section */}
                            <div className="w-full mt-6 space-y-6">
                                {/* Checkbox */}
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={addCustomDesign}
                                        onChange={() => {
                                            setAddCustomDesign((prev) => !prev);
                                            if (!addCustomDesign) setDesignImage(null);
                                        }}
                                        className="w-5 h-5 accent-mainBlue"
                                    />
                                    <span className="text-lg font-semibold text-mainBlue font-poppins">
                                        Upload My Custom Design
                                    </span>
                                </label>

                                {/* Upload Input & Inline Preview */}
                                {addCustomDesign && (
                                    <div className="flex items-center gap-6 bg-[#f9f9f9] px-5 py-4 rounded-xl shadow border border-mainBlue max-w-[450px] overflow-hidden">
                                        {/* Preview */}
                                        <div className="w-[70px] h-[70px] min-w-[70px] border border-subBlue rounded-md shadow-sm flex items-center justify-center overflow-hidden bg-white">
                                            {designImage ? (
                                                <img
                                                    src={designImage ? URL.createObjectURL(designImage) : ""}
                                                    alt="Design Preview"
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : (
                                                <span className="text-xs text-subBlue font-poppins">No image</span>
                                            )}
                                        </div>

                                        {/* File Input */}
                                        <div className="flex flex-col">
                                            <label className="text-sm text-subBlue mb-1 font-medium">
                                                Choose Image
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) setDesignImage(file);
                                                }}
                                                className="block text-sm text-subBlue file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-mainBlue file:text-white file:font-medium hover:file:brightness-110 transition"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Description Box */}
                                <div className="flex flex-col max-w-[450px]">
                                    <label className="text-sm font-semibold text-mainBlue mb-1">
                                        Description (Optional)
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={4}
                                        placeholder={(selectedCategory==="T-Shirts" || selectedCategory==="Hoodies" ) ? `Describe where to print your design ( logo / center front / center back ) ...` : (selectedSubCategory === "Key Chains") ? 'Please enter the shape of the keychain and any printing advices...' : 'Describe your custom design requirements...'}
                                        className="w-full rounded-lg border border-subBlue p-3 text-sm placeholder-subBlue text-mainBlue font-poppins shadow-sm focus:outline-none focus:ring-2 focus:ring-mainBlue transition"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="mt-10 flex items-center justify-center w-full">
                        <button
                            disabled={isDisabled}
                            className={`w-4/5 max-w-[400px] text-center font-poppins font-semibold text-[20px] px-8 py-4 border-2 rounded-full shadow-md transition 
                            ${isDisabled ? "bg-subBlue text-white border-subBlue cursor-not-allowed" : "bg-mainBlue text-white border-mainBlue hover:bg-white hover:text-mainBlue"}`}
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
