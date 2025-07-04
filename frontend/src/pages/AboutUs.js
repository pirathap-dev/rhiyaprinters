import Header from '../components/header';
import Footer from '../components/footer';
import { FaAward, FaHandHoldingUsd, FaTruck, FaWhatsapp } from "react-icons/fa";
import { useEffect } from 'react';



export default function AboutUs() {

    useEffect(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, []);


    return (
        <>
            <Header />

            {/* Hero section */}
            <div className='flex flex-col lg:flex-row items-center justify-center min-h-[500px] bg-subGrey px-4 py-8 lg:px-[100px] gap-[40px]'>

                {/* Left: Image Container */}
                <div className='flex items-center justify-center w-[95%] max-w-[350px] md:w-[60%] md:max-w-[500px] lg:w-[45%] lg:max-w-[500px] lg:min-w-[450px] h-[200px] md:h-[350px] lg:[400px] bg-subBlue border-[3px] border-mainBlue rounded-tr-[120px] md:rounded-tr-[200px] rounded-bl-[120px] md:rounded-bl-[200px] overflow-hidden shadow-md'>
                    <div>
                        <img
                            src="/assets/about.png"
                            alt="About Rhiya Printers"
                            className="px-14 object-contain object-bottom"
                        />
                    </div>
                </div>

                {/* Right: Text Content */}
                <div className='flex flex-col items-center justify-center w-[90%] lg:w-[45%] gap-6 text-center'>
                    <h1 className='font-rufina font-medium text-[28px] md:text-[40px] lg:text-[55px] text-mainBlue leading-tight'>
                        About Rhiya Printers
                    </h1>
                    <p className='font-poppins font-normal text-[16px] md:text-[20px] lg:text-[24px] text-mainBlue max-w-[600px]'>
                        Turning your ideas into reality with premium custom printing solutions.
                    </p>
                </div>
            </div>

            {/* Our story */}
            <div className='flex flex-col-reverse lg:flex-row items-center justify-center bg-white h-auto lg:min-h-[500px] px-4 py-8 lg:px-[80px] gap-5 lg:gap-[80px]'>
                <div className='flex flex-col items-center justify-center w-[90%] lg:w-[40%] gap-[20px]'>
                    <h1 className='font-slab font-medium text-[24px] md:text-[30px] lg:text-[36px] text-mainBlue text-center'>Our Story</h1>
                    <p className='font-poppins font-medium text-[16px] md:text-[20px] lg:text-[22px] text-subBlue text-justify'>Founded with a passion for creativity and craftsmanship, Rhiya Printers was established to bring custom printing services to individuals and businesses who value quality and uniqueness. From t-shirts to mugs, we help you make a statement with every print.</p>
                </div>
                <img src='/assets/about1.jpg' className='w-[340px] md:[60%] lg:w-[35%] border-[3px] border-mainBlue' />
            </div>

            {/* What we do section */}
            <div className='flex flex-col items-center justify-center bg-subGrey h-auto lg:min-h-[500px] px-4 py-8 lg:px-[80px] gap-5 lg:gap-[80px]'>

                <h1 className='font-slab font-medium text-[24px] md:text-[30px] lg:text-[36px] text-mainBlue text-center w-[90%] lg:w-[40%]'>
                    What We Do
                </h1>

                <div className='flex flex-col lg:flex-row items-stretch justify-center lg:justify-between w-full gap-12'>

                    {/* Card 1 */}
                    <div className='flex flex-col items-center justify-start w-full lg:w-[30%] gap-4'>
                        <div className='w-[300px] h-[300px] overflow-hidden border-[3px] border-mainBlue rounded-md'>
                            <img
                                src='/assets/about2.jpg'
                                className='w-full h-full object-cover'
                                alt="T-Shirt Printing"
                            />
                        </div>
                        <h2 className='font-slab font-medium text-[20px] md:text-[24px] lg:text-[28px] text-mainBlue text-center'>
                            T-Shirt Printing
                        </h2>
                        <p className='font-poppins font-medium text-[16px] md:text-[18px] lg:text-[20px] text-subBlue text-center'>
                            Custom t-shirts for every occasion.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className='flex flex-col items-center justify-start w-full lg:w-[30%] gap-4'>
                        <div className='w-[300px] h-[300px] overflow-hidden border-[3px] border-mainBlue rounded-md'>
                            <img
                                src='/assets/about3.jpg'
                                className='w-full h-full object-cover'
                                alt="Mug & Gift Printing"
                            />
                        </div>
                        <h2 className='font-slab font-medium text-[20px] md:text-[24px] lg:text-[28px] text-mainBlue text-center'>
                            Mug & Gift Printing
                        </h2>
                        <p className='font-poppins font-medium text-[16px] md:text-[18px] lg:text-[20px] text-subBlue text-center'>
                            Perfect for gifts and branding.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className='flex flex-col items-center justify-start w-full lg:w-[30%] gap-4'>
                        <div className='w-[300px] h-[300px] overflow-hidden border-[3px] border-mainBlue rounded-md'>
                            <img
                                src='/assets/about4.jpg'
                                className='w-full h-full object-cover'
                                alt="Corporate Branding"
                            />
                        </div>
                        <h2 className='font-slab font-medium text-[20px] md:text-[24px] lg:text-[28px] text-mainBlue text-center'>
                            Corporate Branding
                        </h2>
                        <p className='font-poppins font-medium text-[16px] md:text-[18px] lg:text-[20px] text-subBlue text-center'>
                            Professional print solutions for businesses.
                        </p>
                    </div>

                </div>
            </div>

            {/* Why choose rhiya printers section */}
            <div className="flex flex-col items-center justify-center px-4 py-10 bg-white text-center">
                <h2 className="text-2xl md:text-3xl lg:text-[36px] font-semibold text-gray-800 mb-10">
                    Why Choose Rhiya Printers?
                </h2>

                <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md">

                    {/* Feature Row */}
                    <div className="flex items-center justify-center w-full gap-4">
                        <div className="w-14 md:w-18 md:h-18 lg:w-20 lg:h-20 h-14 border-2 border-black rounded-full flex items-center justify-center p-2">
                            <FaAward className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-black" />
                        </div>
                        <p className="text-start text-[14px] md:text-[16px] lg:text-[18px] text-gray-700 w-[50%]">High-Quality Materials</p>
                    </div>

                    <div className="flex items-center justify-center w-full gap-4">
                        <div className="w-14 md:w-18 md:h-18 lg:w-20 lg:h-20 h-14 border-2 border-black rounded-full flex items-center justify-center p-2">
                            <FaHandHoldingUsd className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-black" />
                        </div>
                        <p className="text-start text-[14px] md:text-[16px] lg:text-[18px] text-gray-700 w-[50%]">Affordable Customization</p>
                    </div>

                    <div className="flex items-center justify-center w-full gap-4">
                        <div className="w-14 md:w-18 md:h-18 lg:w-20 lg:h-20 h-14 border-2 border-black rounded-full flex items-center justify-center p-2">
                            <FaTruck className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-black" />
                        </div>
                        <p className="text-start text-[14px] md:text-[16px] lg:text-[18px] text-gray-700 w-[50%]">Fast & Reliable Delivery</p>
                    </div>

                    <div className="flex items-center justify-center w-full gap-4">
                        <div className="w-14 md:w-18 md:h-18 lg:w-20 lg:h-20 h-14 border-2 border-black rounded-full flex items-center justify-center p-2">
                            <FaWhatsapp className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-black" />
                        </div>
                        <p className="text-start text-[14px] md:text-[16px] lg:text-[18px] text-gray-700 w-[50%]">Support via WhatsApp</p>
                    </div>
                </div>

            </div>



            <Footer />
        </>
    )
}