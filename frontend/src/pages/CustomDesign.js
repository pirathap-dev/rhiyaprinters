// import Header from '../components/header';
// import Footer from '../components/footer';
// import { useEffect, useState } from 'react';
// import { FiPlus, FiMinus } from 'react-icons/fi';
// import CategoryTabs from '../components/shopComponents/CategoryTabs';

// const productData = {
//     "T-Shirts": {
//         "Round Neck T-Shirt": { "image": "/assets/Top-T-shirt1.png", "price": 230 },
//         "Polo T-Shirt": { "image": "/assets/Top-T-shirt2.png", "price": 278 },
//     },
//     "Hoodies": {
//         "Zipper Hoodie": { "image": "/assets/Top-T-shirt3.png", "price": 290 },
//         "Pullover Hoodie": { "image": "/assets/Top-T-shirt2.png", "price": 453 },
//     },
//     "Accessories": {
//         "Keychain": { "image": "/assets/product1.png", "price": 678 },
//         "Cap": { "image": "/assets/Top-T-shirt3.png", "price": 675 },
//     }
// };

// const defaultSubCategory = {
//     "T-Shirts": "Round Neck T-Shirt",
//     "Hoodies": "Zipper Hoodie",
//     "Accessories": "Keychain"
// };

// const coloursAvailable = ["Red", "Green", "Blue", "Orange", "Black", "White"];

// const sizesAvailable = ["S", "M", "L", "XL", "XXL"];

// export default function CustomDesign() {

//     const [selectedCategory, setSelectedCategory] = useState("T-Shirts");
//     const [selectedSubCategory, setSelectedSubCategory] = useState(defaultSubCategory["T-Shirts"]);
//     const [selectedColor, setSelectedColor] = useState("");
//     const [selectedSize, setSelectedSize] = useState("");
//     const [quantity, setQuantity] = useState(1);

//     const [addCustomDesign, setAddCustomDesign] = useState(false);
//     const [designImage, setDesignImage] = useState(null);
//     const [description, setDescription] = useState("");


//     useEffect(() => {
//         const defaultSub = defaultSubCategory[selectedCategory];
//         setSelectedSubCategory(defaultSub);
//     }, [selectedCategory]);


//     const subCategories = Object.keys(productData[selectedCategory]);
//     const imageSrc = productData?.[selectedCategory]?.[selectedSubCategory]?.["image"];
//     const price = productData?.[selectedCategory]?.[selectedSubCategory]?.["price"];

//     const isDisabled = true;

//     const increaseQty = () => {
//         setQuantity(prev => Math.min(5, prev + 1));
//     };

//     const decreaseQty = () => {
//         setQuantity(prev => Math.max(1, prev - 1));
//     };


//     return (
//         <>
//             <Header />

//             {/* Hero section */}
//             <div className='flex flex-col lg:flex-row justify-between px-4 pt-10 lg:pt-16 h-auto lg:h-[600px] bg-subGrey gap-6 lg:gap-[40px] lg:px-[80px] overflow-hidden'>
//                 {/* Left Text Section */}
//                 <div className='relative w-full flex flex-col items-center lg:items-start justify-center gap-[40px]'>
//                     <div className='w-full flex justify-center lg:justify-start'>
//                         <h1 className='font-rufina font-semibold leading-snug text-[20px] md:text-[30px] lg:text-[38px] text-mainBlue text-center lg:text-left w-2/3'>
//                             CREATE YOUR OWN FASHION – BE UNIQUE
//                         </h1>
//                     </div>
//                     <div className='w-full flex justify-center lg:justify-end'>
//                         <p className='font-poppins font-normal leading-relaxed text-[16px] md:text-[20px] lg:text-[22px] text-subBlue text-center lg:text-right w-2/3'>
//                             Feed your creativity and stand out with a fashion sense that's one in a million!
//                         </p>
//                     </div>
//                 </div>

//                 {/* Image Section - Bottom aligned */}
//                 <div className='flex items-end justify-center w-full h-full'>
//                     <img
//                         src='/assets/customLady.png'
//                         alt='Custom Fashion Lady'
//                         className='w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[550px] lg:h-[550px] object-contain object-bottom'
//                     />
//                 </div>
//             </div>



//             <div className='felx flex-col lg:flex-row bg-white px-4 py-8 lg:px-[80px] h-auto overflow-hidden'>
//                 <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />

//                 <div className='flex flex-col items-center justify-center h-full w-full pt-3'>
//                     <div className='flex flex-col lg:flex-row items-center justify-between w-full h-full'>
//                         <div className='flex flex-col items-center text-center lg:text-left justify-center w-full  gap-3 mb-4'>
//                             <h1 className='w-full font-slab font-medium text-center md:text-left text-[30px] md:text-[50px] lg:text-[64px] text-mainBlue px-8 lg-px-0 block lg:hidden'>{selectedSubCategory}</h1>
//                             <img src={imageSrc} alt={selectedSubCategory} className='w-[250px] h-[280px] md:h-[300px] md:w-[280px] lg:w-[400px] lg:h-[450px] object-bottom object-contain border-2 border-mainBlue rounded-md mr-0 lg:mr-5' />
//                             {(selectedCategory === "T-Shirts" || selectedCategory === "Hoodies") &&
//                                 <div className='flex flex-col items-center lg:items-start justify-center w-fit gap-[10px]'>
//                                     <h1 className='font-poppins font-semibold text-mainBlue text-[18px] md:text-[20px] lg:text-[24px]'>
//                                         Choose Colour
//                                     </h1>

//                                     <div className='flex flex-wrap justify-center lg:justify-start lg:w-[400px] gap-3'>
//                                         {coloursAvailable.map((color) => (
//                                             <button
//                                                 key={color}
//                                                 onClick={() => {
//                                                     setSelectedColor(color);
//                                                     setSelectedSize("");
//                                                     setQuantity(1);
//                                                 }}
//                                                 className={`h-[50px] w-[40px] md:h-[60px] md:w-[50px] lg:h-[70px] lg:w-[60px] border-4 rounded transition-all duration-200
//                                                                 ${selectedColor === color
//                                                         ? "border-mainBlue scale-105"
//                                                         : "border-subBlue"
//                                                     } 
//                                                                  ${color === "Red"
//                                                         ? "bg-red-500"
//                                                         : color === "Green"
//                                                             ? "bg-green-500"
//                                                             : color === "Blue"
//                                                                 ? "bg-blue-500"
//                                                                 : color === "Orange"
//                                                                     ? "bg-orange-500"
//                                                                     : color === "Black"
//                                                                         ? "bg-black"
//                                                                         : color === "White"
//                                                                             ? "bg-white"
//                                                                             : "bg-gray-300"
//                                                     }`}
//                                             />
//                                         ))}
//                                     </div>
//                                 </div>
//                             }
//                         </div>
//                         <div className={`flex flex-col items-center lg:items-start justify-center ${(selectedCategory === "Accessories") && "lg:gap-[20px]"} ${(selectedCategory === "T-Shirts" || selectedCategory === "Hoodies") && "lg:justify-start"} w-full h-full lg:min-h-[650px] ml-0 lg:ml-3`}>
//                             <h1 className='font-slab font-medium text-[64px] text-mainBlue hidden lg:block'>{selectedSubCategory}</h1>
//                             <select
//                                 className="w-full max-w-[300px] px-4 py-2 rounded-lg border border-mainBlue bg-white text-mainBlue font-poppins font-medium text-[18px] shadow-md focus:outline-none focus:ring-2 focus:ring-mainBlue transition duration-200"
//                                 value={selectedSubCategory}
//                                 onChange={(e) => setSelectedSubCategory(e.target.value)}
//                             >
//                                 {subCategories.map((sub) => (
//                                     <option key={sub} value={sub} className="text-mainBlue">
//                                         {sub}
//                                     </option>
//                                 ))}
//                             </select>


//                             <p className='font-mono font-bold text-[38px] md:text-[44px] lg:text-[48px] text-mainBlue'>$ {price}</p>
//                             {(selectedCategory === "T-Shirts" || selectedCategory === "Hoodies") &&
//                                 <div className='flex flex-col items-center lg:items-start justify-center gap-[10px] my-3'>
//                                     <h2 className='font-poppins font-semibold text-[16px] md:text-[18px] lg:text-[22px] text-mainBlue'>Size</h2>
//                                     {selectedColor ?
//                                         <div className='flex items-center justify-center gap-[10px] '>
//                                             {sizesAvailable.map(
//                                                 (size) => (
//                                                     <button
//                                                         key={size}
//                                                         onClick={() => { setSelectedSize(size); setQuantity(1); }}
//                                                         className={`h-[40px] w-[40px] border-2 border-mainBlue rounded-sm font-bold text-center ${selectedSize === size ? "bg-mainBlue text-white" : "bg-subGrey text-black"} `} >
//                                                         {size}
//                                                     </button>
//                                                 )
//                                             )}
//                                         </div>
//                                         :
//                                         <div className='flex items-center justify-center gap-[10px] w-full border-2 border-red-400 bg-red-300 rounded-sm'>
//                                             <p className='font-poppins font-medium text-[16px] md:text-[18px] lg:text-[22px] text-white px-2 py-[6px]'>Please select a color first</p>
//                                         </div>
//                                     }

//                                 </div>
//                             }
//                             <div className='flex flex-col items-center lg:items-start justify-center gap-[10px] my-3'>
//                                 <h2 className='font-poppins font-semibold text-[16px] md:text-[18px] lg:text-[22px] text-mainBlue'>Quantity</h2>
//                                 <div className='flex items-center justify-center gap-[10px] w-full'>
//                                     <button className='flex items-center justify-center h-[40px] w-[40px] border-2 border-mainBlue bg-red-500 rounded-sm font-bold text-white' onClick={decreaseQty}><FiMinus /></button>
//                                     <button className='flex items-center justify-center h-[40px] w-[60px] border-2 border-mainBlue bg-white rounded-sm font-bold text-mainBlue' disabled={true}>{quantity}</button>
//                                     <button className='flex items-center justify-center h-[40px] w-[40px] border-2 border-mainBlue bg-green-800 rounded-sm font-bold text-white' onClick={increaseQty}><FiPlus /></button>
//                                 </div>
//                             </div>

//                             {/* Custom Design Upload Section */}
//                             <div className="w-full mt-10 space-y-6">

//                                 {/* Upload Checkbox */}
//                                 <label className="flex items-center gap-3 cursor-pointer">
//                                     <input
//                                         type="checkbox"
//                                         checked={addCustomDesign}
//                                         onChange={() => {
//                                             setAddCustomDesign(prev => !prev);
//                                             if (!addCustomDesign) setDesignImage(null);
//                                         }}
//                                         className="w-5 h-5 accent-mainBlue"
//                                     />
//                                     <span className="text-lg font-semibold text-mainBlue font-poppins">
//                                         Upload My Custom Design
//                                     </span>
//                                 </label>

//                                 {/* Upload Input + Preview inline */}
//                                 {addCustomDesign && (
//                                     <div className="flex items-center gap-6 bg-[#f9f9f9] px-5 py-4 rounded-xl shadow border border-mainBlue max-w-[450px]">

//                                         {/* Preview */}
//                                         <div className="w-[70px] h-[70px] border border-subBlue rounded-md shadow-sm flex items-center justify-center overflow-hidden bg-white">
//                                             {designImage ? (
//                                                 <img
//                                                     src={designImage}
//                                                     alt="Design Preview"
//                                                     className="w-full h-full object-contain"
//                                                 />
//                                             ) : (
//                                                 <span className="text-xs text-subBlue font-poppins">No image</span>
//                                             )}
//                                         </div>

//                                         {/* File Input */}
//                                         <div className="flex flex-col">
//                                             <label className="text-sm text-subBlue mb-1 font-medium">Choose Image</label>
//                                             <input
//                                                 type="file"
//                                                 accept="image/*"
//                                                 onChange={(e) => {
//                                                     const file = e.target.files[0];
//                                                     if (file) setDesignImage(URL.createObjectURL(file));
//                                                 }}
//                                                 className="block text-sm text-subBlue file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-mainBlue file:text-white file:font-medium hover:file:brightness-110 transition"
//                                             />
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Description TextArea */}
//                                 <div className="flex flex-col max-w-[450px]">
//                                     <label className="text-sm font-semibold text-mainBlue mb-1">Description (Optional)</label>
//                                     <textarea
//                                         value={description}
//                                         onChange={(e) => setDescription(e.target.value)}
//                                         rows={4}
//                                         placeholder="Describe your design..."
//                                         className="w-full rounded-lg border border-subBlue p-3 text-sm placeholder-subBlue text-mainBlue font-poppins shadow-sm focus:outline-none focus:ring-2 focus:ring-mainBlue transition"
//                                     />
//                                 </div>

//                             </div>


//                         </div>
//                     </div>
//                     <div className='flex flex-col items-center justify-center w-full'>
//                         <button
//                             disabled={isDisabled}
//                             className={`inline-block w-4/5 text-center font-poppins font-semibold text-[18px] md:text-[22px] lg:text-[26px] px-6 md:px-8 py-4 border-2 rounded-full shadow-md transition 
//                                                 ${isDisabled
//                                     ? "bg-subBlue text-white border-subBlue cursor-not-allowed"
//                                     : "bg-mainBlue text-white border-mainBlue hover:bg-white hover:text-mainBlue"
//                                 }`}
//                         >
//                             Add to Cart
//                         </button>
//                     </div>

//                 </div>

//             </div>

//             <Footer />
//         </>
//     )
// }

import Header from '../components/header';
import Footer from '../components/footer';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FiPlus, FiMinus } from 'react-icons/fi';
import CategoryTabs from '../components/shopComponents/CategoryTabs';
import axios from "axios";

const productData = {
    "T-Shirts": {
        "Round Neck T-Shirt": { image: "/assets/Top-T-shirt1.png", price: 230 },
        "Collar T-shirt": { image: "/assets/Top-T-shirt2.png", price: 278 },
    },
    "Hoodies": {
        "Zipped Hoodies": { image: "/assets/Top-T-shirt3.png", price: 290 },
        "Unzipped Hoodies": { image: "/assets/Top-T-shirt2.png", price: 453 },
    },
    "Accessories": {
        "Key Chains": { image: "/assets/product1.png", price: 678 },
        "Caps": { image: "/assets/Top-T-shirt2.png", price: 675 },
        "Mugs": { image: "/assets/Top-T-shirt3.png", price: 676 },
        "Bottles": { image: "/assets/product1.png", price: 677 },
    }
};

const defaultSubCategory = {
    "T-Shirts": "Round Neck T-Shirt",
    "Hoodies": "Zipped Hoodies",
    "Accessories": "Key Chains"
};

const coloursAvailable = ["Red", "Green", "Blue", "Orange", "Black", "White"];
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

        const apiKey = process.env.REACT_APP_API_BASE_URL;
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
                            <img
                                src={imageSrc}
                                alt={selectedSubCategory}
                                className="w-[250px] h-[280px] md:h-[300px] md:w-[280px] lg:w-[400px] lg:h-[450px] object-contain object-bottom border-2 border-mainBlue rounded-md"
                            />

                            {(selectedCategory === "T-Shirts" || selectedCategory === "Hoodies") && (
                                <div className="w-full flex flex-col items-center lg:items-start gap-2">
                                    <h2 className="font-poppins font-semibold text-mainBlue text-lg lg:text-xl">
                                        Choose Colour
                                    </h2>
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                                        {coloursAvailable.map((color) => (
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
                                                        ? "bg-red-500"
                                                        : color === "Green"
                                                            ? "bg-green-500"
                                                            : color === "Blue"
                                                                ? "bg-blue-500"
                                                                : color === "Orange"
                                                                    ? "bg-orange-500"
                                                                    : color === "Black"
                                                                        ? "bg-black"
                                                                        : color === "White"
                                                                            ? "bg-white"
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
                                        placeholder="Describe your design..."
                                        className="w-full rounded-lg border border-subBlue p-3 text-sm placeholder-subBlue text-mainBlue font-poppins shadow-sm focus:outline-none focus:ring-2 focus:ring-mainBlue transition"
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
