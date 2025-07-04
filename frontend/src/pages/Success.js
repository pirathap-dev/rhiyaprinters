import { MdVerifiedUser } from "react-icons/md";
import Header from '../components/header';
import Footer from '../components/footer';

export default function Success() {
    return (
        <>
            <Header />
            <div className='flex flex-col items-center justify-center bg-subGrey h-auto lg:h-[600px] px-4 py-[150px] md:py-8 lg:px-[100px] lg:py-[30px] gap-[10px] md:gap-[20px]'>
                <MdVerifiedUser className="h-[100px] w-[100px] md:h-[250px] md:w-[250px] fill-green-800 stroke-white drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] hover:drop-shadow-[0_0_8px_rgba(59,130,246,1.8)] transition-transform hover:scale-110" />
                <h1 className="font-slab font-medium text-[20px] md:text-[38px] lg:text-[48px] text-center text-mainBlue w-full md:w-[70%]">Your order has been successfully placed</h1>
                <p className="font-poppins font-normal text-[12px] md:text-[18px] lg:text-[20px] text-center text-green-800 w-full md:w-2/3">Your will receive a confirmation through Email again with the final amount. Orders which are not confirmed through email for a week after final billing will subject to <span className="text-red-800">cancellation</span></p>
            </div>
            <Footer />
        </>
    )
}