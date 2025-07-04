import Header from '../components/header';
import Footer from '../components/footer';
import { FiPhone } from "react-icons/fi";
import { TfiLocationPin } from "react-icons/tfi";
import { HiOutlineMail } from "react-icons/hi";
import { useEffect } from 'react';


export default function Contact() {

    useEffect(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, []);

    return (
        <>
            <Header />

            <div className='flex flex-col lg:flex-row items-center lg:items-end justify-center lg:min-h-[600px] bg-subGrey px-4 pt-8 lg:px-[80px] overflow-hidden gap-[40px] lg:gap-[20px]'>

                {/* Left Content */}
                <div className='flex flex-col items-center justify-center w-[70%] lg:w-1/2 h-full text-center animate-fade-in'>
                    <div className='flex flex-col items-center justify-center h-full lg:min-h-[600px] gap-[14px]'>
                        <h1 className="font-rufina font-medium text-[30px] md:text-[40px] lg:text-[55px] text-mainBlue">Contact Us</h1>
                        <p className="font-poppins font-normal text-[16px] md:text-[20px] lg:text-[22px] text-subBlue">
                            We’re here to help! Reach out to us whenever you need our service 24/7.
                        </p>
                    </div>
                </div>

                {/* Image */}
                <img
                    src='/assets/contact.png'
                    className='w-[60%] lg:w-1/2 max-w-[500px] object-contain object-bottom animate-slide-in-right'
                    alt='Contact illustration'
                />
            </div>

            <div className='flex flex-col lg:flex-row justify-between lg:justify-center items-start lg:items-center lg:min-h-[600px] bg-white px-4 py-8 lg:px-[80px] overflow-hidden gap-[40px] lg:gap-[60px]'>

                {/* Google Map Section */}
                <div className="w-full lg:w-auto h-[300px] md:h-[400px] lg:h-auto rounded-lg border-4 border-subBlue overflow-hidden flex items-center justify-center">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1799.1344815703894!2d-78.7306192533813!3d44.35822967785125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d57945fe0b9f27%3A0x980a63cf30281f68!2s57%20King%20St%2C%20Lindsay%2C%20ON%20K9V%201C4%2C%20Canada!5e0!3m2!1sen!2slk!4v1750615313755!5m2!1sen!2slk"
                        className="w-full h-full lg:w-[500px] lg:h-[450px] rounded-md border-0"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                {/* Right Side - Contact Info */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 h-auto">
                    {/* Phone */}
                    <div className='flex items-start gap-4'>
                        <FiPhone className='h-[48px] w-[48px] text-mainBlue' />
                        <p className='font-poppins font-medium text-[20px] md:text-[24px] lg:text-[28px] text-gray-800'>+1 (705) 307-8500</p>
                    </div>

                    {/* Location */}
                    <div className='flex items-start gap-4'>
                        <TfiLocationPin className='h-[48px] w-[48px] text-mainBlue' />
                        <div className='text-gray-800'>
                            <p className='font-poppins font-medium text-[20px] md:text-[24px] lg:text-[28px]'>57, King St</p>
                            <p className='font-poppins font-medium text-[20px] md:text-[24px] lg:text-[28px]'>Lindsay</p>
                            <p className='font-poppins font-medium text-[20px] md:text-[24px] lg:text-[28px]'>K9V 1C4</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className='flex flex-wrap items-start gap-4'>
                        <HiOutlineMail className='h-[48px] w-[48px] text-mainBlue' />
                        <p className='font-poppins font-medium text-[20px] md:text-[24px] lg:text-[28px] text-gray-800'>rhiyaprinters@gmail.com</p>
                    </div>
                </div>

            </div>




            <Footer />
        </>
    )
}