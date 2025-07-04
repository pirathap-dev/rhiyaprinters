import { useEffect, useState } from 'react';
import { FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { Link } from 'react-router-dom';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const [cartCount, setCartCount] = useState(0);

    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem("RhiyaPrintersCart")) || [];
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        setCartCount(totalItems);
    };

    useEffect(() => {
        updateCartCount();

        // Listen for custom event to update cart count
        window.addEventListener("cartUpdated", updateCartCount);

        // Cleanup listener on unmount
        return () => window.removeEventListener("cartUpdated", updateCartCount);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const handleLinkClick = () => setMenuOpen(false); // Auto-close mobile menu

    return (
        <nav className="bg-mainBlue px-6 lg:px-[80px] py-[20px]">
            {/* Main navbar row */}
            <div className="flex justify-between items-center h-[40px] relative">
                {/* Logo */}
                <a href='/'><img
                    src="/assets/logo.png"
                    alt="Rhiya-Printers Logo"
                    className="h-[80px] w-[124px] object-contain"
                /></a>

                {/* Right-side wrapper: nav links + cart + hamburger */}
                <div className="flex items-center space-x-6">
                    {/* Nav Links (desktop only) */}
                    <div className="hidden lg:flex space-x-10 text-white font-poppins text-[24px]">
                        {navLinks.map((item, i) => (
                            <a
                                key={i}
                                href={item.href}
                                className="border-b-2 border-transparent hover:border-subBlue hover:border-b-[3px] hover:text-subBlue transition duration-200"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Cart + Hamburger (always visible) */}
                    <div className="flex items-center space-x-4">
                        {/* Cart Icon */}
                        <Link to={"/cart"}>
                            <div className="relative group">
                                <FiShoppingBag className="stroke-white fill-transparent w-[32px] h-[32px] text-white  group-hover:stroke-subBlue" />
                                {cartCount > 0 && (
                                    <div className="absolute -bottom-2 -right-2 w-[22px] h-[22px] rounded-full bg-green-500 text-white text-xs flex items-center justify-center group-hover:bg-subBlue">
                                        {cartCount}
                                    </div>
                                )}
                            </div>
                        </Link>


                        {/* Hamburger Button (mobile only) */}
                        <button
                            className="lg:hidden text-white text-3xl"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Links (visible only when menu is open) */}
            {menuOpen && (
                <div className="flex flex-col items-start space-y-4 mt-4 animate-slideDown lg:hidden">
                    <hr className="bg-subBlue mt-[20px] h-[2px] border-none w-full mb-2" />
                    {navLinks.map((item, i) => (
                        <a
                            key={i}
                            href={item.href}
                            onClick={handleLinkClick}
                            className="text-white font-poppins text-[20px] pl-2 border-l-4 border-transparent hover:border-subBlue hover:text-subBlue transition duration-200"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            )}

        </nav>
    );
}
