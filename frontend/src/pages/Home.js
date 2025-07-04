import { useEffect, useState } from "react";
import api from '../utils/api';
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import VideoCarousel from "../components/VideoCarousel";
import ImageCarousel from "../components/ImageCarousel";
import { FiArrowRight } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Home() {

    const [activeTab, setActiveTab] = useState("Key Chains");
    const [topTshirts, setTopTshirts] = useState([]);
    const [topHoodies, setTopHoodies] = useState([]);
    const [accessories, setAccessories] = useState([]);
    const [videos, setVideos] = useState([]);
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        api.get('/products/top/tshirts')
            .then(r => setTopTshirts(r.data))
            .catch(err => {
                console.error("Failed to load top tshirts:", err);
                toast.error("Failed to load top tshirts");
            });

        api.get('/products/top/hoodies')
            .then(r => setTopHoodies(r.data))
            .catch(err => {
                console.error("Failed to load top hoodies:", err);
                toast.error("Failed to load top hoodies");
            });

        api.get('/products/top/accessories')
            .then(r => {
                setAccessories(r.data);
                if (r.data.length > 0) {
                    setActiveTab(r.data[0].sub !== "Others" ? r.data[0].sub : r.data[1]?.sub || "Key Chains");
                }
            })
            .catch(err => {
                console.error("Failed to load accessories:", err);
                toast.error("Failed to load accessories");
            });

        api.get('/offers')
            .then(r => setOffers(r.data))
            .catch(err => {
                console.error("Failed to load offers:", err);
                toast.error("Failed to load offers");
            });

        api.get('/ads')
            .then(r => setVideos(r.data))
            .catch(err => {
                console.error("Failed to load ads:", err);
                toast.error("Failed to load ads");
            });
    }, []);



    const accessorySubcategories = Array.isArray(accessories)
        ? [
            ...new Set(
                accessories
                    .map(item => item?.sub)
                    .filter(sub => sub !== "Others")
            ),
            ...(accessories.some(item => item?.sub === "Others") ? ["Others"] : []),
        ]
        : [];


    const accessoryProducts =
        Array.isArray(accessories)
            ? accessories.find((item) => item?.sub === activeTab)?.topProducts
            : [];

    const adsVideos = Array.isArray(videos)
        ? [...new Set(videos.map(item => item?.videoUrl))]
        : ["/assets/2.mov"];

    const images = Array.isArray(offers)
        ? [...new Set(offers.map(item => item?.imageUrl))]
        : ["/assets/ic1.png"];




    return (
        <>
            <Header />


            {/* Hero secction */}
            <div className="flex items-center justify-center min-h-[550px] h-auto bg-subGrey px-4 py-8 lg:px-[80px] lg:py-[20px]">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full  h-full max-w-[1200px] px-[20px] gap-[40px] lg:gap-0">
                    <div className="flex flex-col items-center lg:items-start justify-center gap-6 text-center lg:text-left h-full mr-0 lg:mr-[25px]">
                        <h1 className="font-rufina text-mainBlue font-bold text-[42px] sm:text-[50px] md:text-[60px] lg:text-[70px] leading-tight" >Discover And Find Your Own Fashion</h1>
                        <p className="font-poppins text-subBlue font-medium text-[15px] sm:text-[15px] md:text-[18px] lg:text-[20px] max-w-[600px]">Find matching fashion for you from hundrends of new trending collections exclusive on our store</p>
                        <a href="/shop"
                            className="inline-block bg-mainBlue text-white font-poppins font-medium text-[18px] md:text-[20px] px-6 md:px-8 py-3 border-2 hover:border-mainBlue rounded-md shadow-md hover:bg-white hover:text-mainBlue transition"
                        >Explore now</a>
                    </div>

                    <div>
                        <div className="flex items-center justify-center bg-subBlue h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] md:h-[450px] md:w-[450px] pt-[10px] m-0 md:ml-[25px] border-2 border-mainBlue rounded-tl-[100px] rounded-tr-[20px] rounded-br-[100px] rounded-bl-[20px] overflow-hidden">
                            <img src="/assets/homeHero.png" className="h-full w-full object-contain" alt="Hero" />
                        </div>
                    </div>
                </div>
            </div >

            {/* Video carousel section */}
            <VideoCarousel videos={adsVideos} />

            {/* Top wearable section */}
            <div className="flex flex-col items-center justify-center bg-white h-auto min-h-[1024px] px-4 lg:px-[80px] py-[20px]">
                <div className="flex flex-col items-center justify-between h-full w-full gap-[10px]">
                    <div className="flex flex-col items-center justify-between gap-[20px] text-center">
                        <h1 className="font-slab font-medium text-[40px] md:text-[50px] lg:text-[64px] text-mainBlue">Top Wearables</h1>
                        <p className="font-poppins font-medium text-[18px] md:text-[20px] lg:text-[22px] text-mainBlue max-w-[800px]">Get in on with the trend with our curated selection of best selling styles</p>
                    </div>
                    <div className="flex flex-col items-start justify-between w-full mt-6">
                        <h1 className="font-slab font-medium text-[32px] md:text-[36px] lg:text-[42px] text-mainBlue mb-4">Printed T-Shirts</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full">
                            {topTshirts.map((product) => (
                                <div key={product?._id} className="flex flex-col items-center justify-center gap-4 w-full  max-w-[400px] mx-auto">
                                    <div className="flex flex-col items-center justify-center gap-[10px] w-full max-w-[400px]">
                                        <div className="relative w-full aspect-[400/475] bg-subGrey border-2 border-mainBlue rounded-sm overflow-hidden">
                                            <img
                                                src={product?.image}
                                                alt={product?.name}
                                                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 object-contain max-h-full"
                                            />
                                        </div>
                                        <div className="flex flex-col items-center justify-center w-full gap-[10px]">
                                            <Link to={`/shop/${product?._id}`}>
                                                <h2 className="font-poppins font-medium text-[18px] md:text-[20px] lg:text-[22px] text-gray-700 text-center hover:text-black hover:underline">
                                                    {product?.name}
                                                </h2>
                                            </Link>
                                            <p className="font-poppins font-semibold text-[18px] md:text-[20px] lg:text-[22px] text-black">${product?.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Link
                        to="/shop" state={{ scrollToProducts: true, category: "T-Shirts" }}
                        className="mt-10 flex items-center gap-2 bg-white text-mainBlue text-[18px] md:text-[20px] font-slab font-medium px-6 py-3 md:px-[88px] md:py-[32px] rounded-md border-[3px] border-mainBlue hover:bg-mainBlue hover:text-white transition"
                    >
                        See More
                        <FiArrowRight className="w-[24px] h-[24px]" />
                    </Link>
                </div>
            </div>

            {/* Hoodie section */}
            <div className="flex flex-col items-center justify-center bg-white h-auto min-h-[900px] px-4 lg:px-[80px] py-[20px]">
                <div className="flex flex-col items-center justify-between h-full w-full gap-[10px]">
                    <div className="flex flex-col items-start justify-between w-full mt-6">
                        <h1 className="font-slab font-medium text-[32px] md:text-[36px] lg:text-[42px] text-mainBlue mb-4">Printed Hoodies</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full">
                            {topHoodies.map((product) => (
                                <div key={product?._id} className="flex flex-col items-center justify-center gap-4 w-full  max-w-[400px] mx-auto">
                                    <div className="flex flex-col items-center justify-center gap-[10px] w-full max-w-[400px]">
                                        <div className="relative w-full aspect-[400/475] bg-subGrey border-2 border-mainBlue rounded-sm overflow-hidden">
                                            <img
                                                src={product?.image}
                                                alt={product?.name}
                                                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 object-contain max-h-full"
                                            />
                                        </div>
                                        <div className="flex flex-col items-center justify-center w-full gap-[10px]">
                                            <Link to={`/shop/${product?._id}`}>
                                                <h2 className="font-poppins font-medium text-[18px] md:text-[20px] lg:text-[22px] text-gray-700 text-center hover:text-black hover:underline">
                                                    {product?.name}
                                                </h2>
                                            </Link>
                                            <p className="font-poppins font-semibold text-[18px] md:text-[20px] lg:text-[22px] text-black">${product?.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Link
                        to="/shop" state={{ scrollToProducts: true, category: "Hoodies" }}
                        className="mt-10 flex items-center gap-2 bg-white text-mainBlue text-[18px] md:text-[20px] font-slab font-medium px-6 py-3 md:px-[88px] md:py-[32px] rounded-md border-[3px] border-mainBlue hover:bg-mainBlue hover:text-white transition"
                    >
                        See More
                        <FiArrowRight className="w-[24px] h-[24px]" />
                    </Link>
                </div>
            </div>

            {/* Accesories section */}
            <div className="flex flex-col items-center justify-center bg-white h-auto min-h-[1024px] px-4 lg:px-[80px] py-[20px]">
                <div className="flex flex-col items-center justify-between h-full w-full gap-[42px]">
                    <div className="flex flex-col items-center justify-between gap-[20px] text-center">
                        <h1 className="font-slab font-medium text-[40px] md:text-[50px] lg:text-[64px] text-mainBlue">Accessories</h1>
                        <p className="font-poppins font-medium text-[18px] md:text-[20px] lg:text-[22px] text-mainBlue max-w-[800px]">Get in on with the trend with our curated selection of best selling styles</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-[20px] md:gap-[30px] lg:gap-[40px]">
                        {accessorySubcategories.map((sub) => (
                            <button
                                key={sub}
                                onClick={() => setActiveTab(sub)}
                                className={`font-poppins font-medium text-[13px] md:text-[18px] lg:text-[22px] ${activeTab === sub ? "border-b-2 border-mainBlue text-mainBlue" : "text-subBlue"
                                    }`}
                            >
                                {sub}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[24px] w-full">
                        {accessoryProducts?.length > 0 ? (
                            accessoryProducts.map((product) => (
                                <div key={product?._id} className="flex flex-col items-center justify-center gap-4 w-full  max-w-[225] mx-auto">
                                    <div className="flex flex-col items-center justify-center gap-[10px] w-full max-w-[225]">
                                        <div className="relative w-full aspect-[225/270] bg-subGrey border-2 border-mainBlue rounded-sm overflow-hidden">
                                            <img
                                                src={product?.image} alt={product?.name}
                                                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 object-contain max-h-full"
                                            />
                                        </div>
                                        <div className="flex flex-col items-center justify-center w-full gap-[10px]">
                                            <Link to={`/shop/${product?._id}`}>
                                                <h2 className="font-poppins font-medium text-[18px] md:text-[20px] lg:text-[22px] text-gray-700 text-center hover:text-black hover:underline">
                                                    {product?.name}
                                                </h2>
                                            </Link>
                                            <p className="font-poppins font-semibold text-[18px] md:text-[20px] lg:text-[22px] text-black">${product?.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-gray-500">No products available.</p>
                        )}
                    </div>
                    <Link
                        to="/shop" state={{ scrollToProducts: true, category: "Accessories" }}
                        className="mt-5 lg:mt-10 flex items-center gap-2 bg-white text-mainBlue text-[18px] md:text-[20px] font-slab font-medium px-6 py-3 md:px-[88px] md:py-[32px] rounded-md border-[3px] border-mainBlue hover:bg-mainBlue hover:text-white transition"
                    >
                        See More
                        <FiArrowRight className="w-[24px] h-[24px]" />
                    </Link>
                </div>
            </div>

            {/* Custom design section */}
            <div className="flex flex-col items-center justify-center bg-subGrey h-auto min-h-[630px] px-4 lg:px-[80px] py-[20px]">
                <div className="flex flex-col items-center justify-between h-full w-full gap-[25px]">
                    <h1 className="font-slab font-medium text-center text-[30px] md:text-[50px] lg:text-[64px] text-mainBlue">Make your Own fashion</h1>
                    <div className="flex flex-col lg:flex-row items-center justify-between w-full">
                        <img src="/assets/homeCustom.png" className="w-[400px] sm:w-[500px] lg:w-1/2 object-contain" alt="Hero" />
                        <div className="flex flex-col items-center lg:items-start justify-center w-3/4 lg:w-1/2 gap-[25px]">
                            <p className="font-poppins font-medium text-[15px] md:text-[18px] text-center lg:text-left lg:text-[22px] text-mainBlue max-w-1/2">Make it truly yours! Upload your own image, logo, or artwork to create a one-of-a-kind T-shirt, mug, keychain, cap, or any other item. Our platform supports high-resolution prints, so your custom design will look crisp and vibrant on your chosen product.</p>
                            <Link
                                to={"/custom"}
                                className="mt-5 lg:mt-10 flex items-center gap-2 bg-mainBlue text-center text-white text-[18px] md:text-[20px] font-slab font-medium px-3 py-2 md:px-[50px] md:py-[15px] rounded-md border-[3px] w-fit border-mainBlue hover:bg-white hover:text-mainBlue transition"
                            >
                                Create custom design
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image carousel section */}
            <ImageCarousel images={images} />

            <Footer />
        </>
    )
}