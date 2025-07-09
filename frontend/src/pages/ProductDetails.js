import { useEffect, useState } from "react";
import api from '../utils/api';
import { toast } from 'react-hot-toast';

import Header from '../components/header';
import Footer from '../components/footer';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useParams } from "react-router-dom";

export default function ProductDetails() {
    const [product, setProduct] = useState({});
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true); // loading state
    const [error, setError] = useState(null);     // error state
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setLoading(true);
        setError(null);
        api.get(`/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(() => {
                toast.error("Failed to load product details");
                setError("Failed to load product details");
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <>
                <Header />
                <div className="fixed inset-0 z-[9999] bg-subGrey/100 backdrop-blur-sm flex items-center justify-center">
                    <div className="relative flex flex-col items-center justify-center p-8 bg-white/60 backdrop-blur-lg border border-mainBlue rounded-2xl shadow-xl">
                        {/* Spinner */}
                        <div className="w-16 h-16 border-4 border-mainBlue border-t-transparent rounded-full animate-spin" />

                        {/* Text */}
                        <p className="mt-4 text-mainBlue font-semibold text-lg tracking-wide animate-pulse">
                            Fetching product details...
                        </p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="flex justify-center items-center h-[70vh] text-red-600 text-xl font-semibold">
                    {error}
                </div>
                <Footer />
            </>
        );
    }

    const totalStockAvailable = product?.hasVariants
        ? product?.variants[selectedColor]?.[selectedSize]
        : product?.stock;

    const isSoldOut = product?.hasVariants
        ? Object.values(product?.variants).every(
            (sizes) => Object.values(sizes).every((qty) => qty === 0)
        )
        : product?.stock === 0;

    const displayedImage = product?.hasVariants
        ? (selectedColor && product?.variantImages[selectedColor]
            ? product?.variantImages[selectedColor]
            : product?.image)
        : product?.image;

    const isDisabled = product?.hasVariants
        ? !selectedColor || !selectedSize
        : product?.stock <= 0;

    const increaseQty = () => {
        if (product?.hasVariants) {
            if (selectedColor && selectedSize) {
                const stock = product?.variants[selectedColor]?.[selectedSize] || 0;
                setQuantity((prev) => (prev < stock ? prev + 1 : prev));
            }
        } else {
            if (product?.stock && quantity < product?.stock) {
                setQuantity((prev) => prev + 1);
            }
        }
    };

    const decreaseQty = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    const handleAddToCart = () => {
        if (product?.hasVariants && (!selectedColor || !selectedSize)) {
            toast.error(`Please select a color and size`, {
                icon: '⚠️'
            });
            return;
        }

        const newItem = {
            id: product?._id,
            name: product?.name,
            price: product?.price,
            category: product?.category,
            subcategory: product?.sub,
            description: null,
            image: product?.hasVariants ? product?.variantImages[selectedColor] : product?.image,
            quantity,
            color: product?.hasVariants ? selectedColor : null,
            size: product?.hasVariants ? selectedSize : null,
            isCustom: false,
            totalStockAvailable
        }

        const existingCart = JSON.parse(localStorage.getItem("RhiyaPrintersCart")) || [];

        const existingIndex = existingCart.findIndex(item =>
            item.id === newItem.id &&
            item.color === newItem.color &&
            item.size === newItem.size
        );

        if (existingIndex >= 0) {
            const existingQty = existingCart[existingIndex].quantity;
            const stock = product?.hasVariants
                ? product?.variants[selectedColor][selectedSize]
                : product?.stock;

            const totalQty = existingQty + newItem.quantity;

            if (totalQty > stock) {
                toast.error(`Limit reached: Only ${stock} available`, {
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
            existingCart.push(newItem);
            localStorage.setItem("RhiyaPrintersCart", JSON.stringify(existingCart));
            window.dispatchEvent(new Event("cartUpdated"));
            toast.success("Item added to cart successfully!");
        }
    }

    return (
        <>
            <Header />

            {/* Product details section */}
            <div className='flex flex-col items-center justify-center bg-subGrey px-4 lg:px-[80px] py-[20px]'>
                <div className='flex flex-col items-center justify-center h-full w-full'>
                    <div className='flex flex-col lg:flex-row items-center justify-between w-full h-full'>
                        <div className='flex flex-col items-center text-center lg:text-left justify-center w-full  gap-3 mb-4'>
                            <h1 className='w-full font-slab font-medium text-center md:text-left text-[30px] md:text-[50px] lg:text-[64px] text-mainBlue px-8 lg-px-0 block lg:hidden'>{product?.name}</h1>
                            <img src={displayedImage} alt={product?.name} className='w-[250px] h-[280px] md:h-[300px] md:w-[280px] lg:w-[400px] lg:h-[450px] object-bottom object-contain border-2 border-mainBlue rounded-md mr-0 lg:mr-5' />
                            {product?.hasVariants &&
                                <div className='flex flex-col items-center lg:items-start justify-center w-fit gap-[10px]'>
                                    <h1 className='font-poppins font-semibold text-mainBlue text-[18px] md:text-[20px] lg:text-[24px]'>
                                        Choose Colour
                                    </h1>

                                    <div className='flex flex-wrap justify-center lg:justify-start lg:w-[400px] gap-3'>
                                        {Object.keys(product?.variants).map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => {
                                                    setSelectedColor(color);
                                                    setSelectedSize("");
                                                    setQuantity(1);
                                                }}
                                                className={`h-[50px] w-[40px] md:h-[60px] md:w-[50px] lg:h-[70px] lg:w-[60px] border-4 rounded transition-all duration-200
                                                ${selectedColor === color
                                                        ? "border-mainBlue scale-105"
                                                        : "border-subBlue"
                                                    } 
                                                 ${color === "Red"
                                                        ? "bg-red-800"
                                                        : color === "Green"
                                                            ? "bg-green-900"
                                                            : color === "Blue"
                                                                ? "bg-blue-950"
                                                                : color === "Orange"
                                                                    ? "bg-orange-500"
                                                                    : color === "Black"
                                                                        ? "bg-black"
                                                                        : color === "White"
                                                                            ? "bg-white"
                                                                            : color === "Grey"
                                                                                ? "bg-zinc-600"
                                                                                : color === "Brown"
                                                                                    ? "bg-orange-800"
                                                                                    : color === "Yellow"
                                                                                        ? "bg-yellow-500"
                                                                                        : "bg-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={`flex flex-col items-center lg:items-start justify-center ${product?.hasVariants && "lg:justify-start"} w-full h-full lg:min-h-[650px] ml-0 lg:ml-3`}>
                            <h1 className='font-slab font-medium text-[64px] text-mainBlue pb-3 hidden lg:block'>{product?.name}</h1>
                            <p className='font-poppins font-normal text-[16px] md:text-[18px] lg:text-[22px] text-subBlue text-center lg:text-left my-3 px-3 lg:px-0'>{product?.description}</p>
                            <p className='font-mono font-bold text-[38px] md:text-[44px] lg:text-[48px] text-mainBlue'>$ {product?.price}</p>
                            {product?.hasVariants &&
                                <div className='flex flex-col items-center lg:items-start justify-center gap-[10px] my-3'>
                                    <h2 className='font-poppins font-semibold text-[16px] md:text-[18px] lg:text-[22px] text-mainBlue'>Size</h2>
                                    {selectedColor ?
                                        <div className='flex items-center justify-center gap-[10px] '>
                                            {Object.entries(product?.variants[selectedColor])
                                                .filter(([size]) => size !== "_id")
                                                .map(([size, stock]) => (
                                                    <button
                                                        key={size}
                                                        onClick={() => { setSelectedSize(size); setQuantity(1); }}
                                                        className={`h-[40px] w-[40px] border-2 border-mainBlue rounded-sm font-bold text-center 
                                                                    ${selectedSize === size ? "bg-mainBlue text-white" : "bg-subGrey text-black"} 
                                                                    ${stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                                        disabled={stock === 0}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}

                                        </div>
                                        :
                                        <div className='flex items-center justify-center gap-[10px] w-full border-2 border-red-400 bg-red-300 rounded-sm'>
                                            <p className='font-poppins font-medium text-[16px] md:text-[18px] lg:text-[22px] text-white px-2 py-[6px]'>Please select a color first</p>
                                        </div>
                                    }

                                </div>
                            }
                            <div className='flex flex-col items-center lg:items-start justify-center gap-[10px] my-3'>
                                <h2 className='font-poppins font-semibold text-[16px] md:text-[18px] lg:text-[22px] text-mainBlue'>Quantity</h2>
                                <div className='flex items-center justify-center gap-[10px] w-full'>
                                    <button className='flex items-center justify-center h-[40px] w-[40px] border-2 border-mainBlue bg-red-500 rounded-sm font-bold text-white' onClick={decreaseQty} disabled={loading}><FiMinus /></button>
                                    <button className='flex items-center justify-center h-[40px] w-[60px] border-2 border-mainBlue bg-white rounded-sm font-bold text-mainBlue' disabled>{quantity}</button>
                                    <button className='flex items-center justify-center h-[40px] w-[40px] border-2 border-mainBlue bg-green-800 rounded-sm font-bold text-white' onClick={increaseQty} disabled={loading}><FiPlus /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center w-full'>
                        {!isSoldOut ?
                            <button
                                disabled={isDisabled || loading}
                                className={`inline-block w-4/5 text-center font-poppins font-semibold text-[18px] md:text-[22px] lg:text-[26px] px-6 md:px-8 py-4 border-2 rounded-full shadow-md transition 
                                ${isDisabled || loading
                                        ? "bg-subBlue text-white border-subBlue cursor-not-allowed"
                                        : "bg-mainBlue text-white border-mainBlue hover:bg-white hover:text-mainBlue"
                                    }`}
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                            :
                            <button
                                disabled
                                className="inline-block w-4/5 text-center font-poppins font-semibold text-[18px] md:text-[22px] lg:text-[26px] px-6 md:px-8 py-4 border-2 rounded-full shadow-md transition cursor-not-allowed bg-white border-red-700 text-red-700"
                            >
                                Sold Out
                            </button>
                        }
                    </div>

                </div>
            </div>

            <Footer />
        </>
    )
}
