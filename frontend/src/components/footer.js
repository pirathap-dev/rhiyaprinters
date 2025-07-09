import { FiFacebook } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-mainBlue px-6 py-6 h-auto lg:h-[543px] lg:px-[80px] lg:py-[30px]">
            <div className="flex flex-col justify-between  h-full w-full ">
                <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-[50px]">
                    <div className="flex flex-col justify-start gap-[20px] lg:gap-[30px]">
                        <a href="/">
                            <img
                                src="/assets/logo.png"
                                alt="Rhiya-Printers Logo"
                                className="h-[80px] w-[124px] object-contain"
                            />
                        </a>
                        <div className="flex flex-col items-start gap-[10px] lg:gap-[20px]">
                            <h1 className="font-slab font-medium text-[22px] text-white">
                                SOCIAL MEDIA
                            </h1>

                            <div className="flex justify-start items-center gap-[14px] lg:gap-[24px]">
                                <FiFacebook className="stroke-subBlue w-[38px] h-[38px] hover:stroke-white hover:cursor-pointer" />
                                <FaYoutube className="text-subBlue w-[40px] h-[40px] hover:text-white hover:cursor-pointer" />
                                <Link to={"https://www.tiktok.com/@rhiya.printers"}><SiTiktok className="text-subBlue w-[36px] h-[36px] hover:text-white hover:cursor-pointer" /></Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-[20px] lg:gap-[30px]">
                        <a href="/shop">
                            <h1 className="font-slab font-medium text-[22px] text-white">
                                SHOP
                            </h1>
                        </a>
                        <div className="flex flex-col items-start gap-[10px] lg:gap-[20px]">
                            <p className="font-slab font-medium text-[22px] text-subBlue hover:text-white hover:cursor-pointer">Products</p>
                            <p className="font-slab font-medium text-[22px] text-subBlue hover:text-white hover:cursor-pointer">Overview</p>
                            <p className="font-slab font-medium text-[22px] text-subBlue hover:text-white hover:cursor-pointer">Pricing</p>
                            <p className="font-slab font-medium text-[22px] text-subBlue hover:text-white hover:cursor-pointer">Releases</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-[20px] lg:gap-[30px]">
                        <h1 className="font-slab font-medium text-[22px] text-white">
                            COMPANY
                        </h1>
                        <div className="flex flex-col items-start gap-[10px] lg:gap-[20px]">
                            <Link to={"/about"}><p className="font-slab font-medium text-[22px] text-subBlue hover:text-white hover:cursor-pointer">About us</p></Link>
                            <Link to={"/contact"}><p className="font-slab font-medium text-[22px] text-subBlue hover:text-white hover:cursor-pointer">Contact</p></Link>
                            <p className="font-slab font-medium text-[22px] text-subBlue hover:text-white hover:cursor-pointer">News</p>
                            <p className="font-slab font-medium text-[22px] text-subBlue hover:text-white hover:cursor-pointer">Support</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-[20px] lg:gap-[30px]">
                        <h1 className="font-slab font-medium text-[22px] text-white">
                            LOCATION
                        </h1>
                        <div className="w-full rounded-lg border-4 border-subBlue overflow-hidden">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1799.1344815703894!2d-78.7306192533813!3d44.35822967785125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d57945fe0b9f27%3A0x980a63cf30281f68!2s57%20King%20St%2C%20Lindsay%2C%20ON%20K9V%201C4%2C%20Canada!5e0!3m2!1sen!2slk!4v1750615313755!5m2!1sen!2slk"
                                style={{ width: '100%', height: '250px' }}
                                className="rounded-md border-0"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row  items-center w-full">
                    {/* White Line (flex-grow to take max space) */}
                    <hr className="flex-grow h-[4px] bg-white border-none hidden lg:block" />
                    <hr className="h-[4px] w-full bg-white my-[20px] border-none lg:hidden" />

                    {/* Link Group (fixed width or auto-shrink) */}
                    <div className="flex items-center space-x-6 ml-4 font-poppins font-medium text-[20px] text-white">
                        <a href="#">Terms</a>
                        <a href="#">Privacy</a>
                        <a href="#">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}