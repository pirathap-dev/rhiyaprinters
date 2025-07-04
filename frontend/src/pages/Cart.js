import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from '../components/header';
import Footer from '../components/footer';
import Product from '../components/cartComponents/product';
import ConfirmModal from '../components/cartComponents/ConfirmModal';

export default function Cart() {

    useEffect(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, []);

    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("RhiyaPrintersCart")) || []);
    const [modalVisible, setModalVisible] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleQuantityChange = (id, color, size, name, newQty, isCustom) => {
        const updatedItems = cartItems.map(item => {
            const isMatch = isCustom
                ? (item.name === name && item.color === color && item.size === size)
                : (item.id === id && item.color === color && item.size === size);

            if (!isMatch) return item;

            const maxQty = item.totalStockAvailable;

            if (newQty < 1 || newQty > maxQty) return item;

            return { ...item, quantity: newQty };
        });

        setCartItems(updatedItems);
        localStorage.setItem("RhiyaPrintersCart", JSON.stringify(updatedItems));
        window.dispatchEvent(new Event("cartUpdated"));
    };



    const requestDelete = (id, color, size, name, isCustom) => {
        setItemToDelete({ id, color, size, name, isCustom });
        setModalVisible(true);
    };

    const confirmDelete = () => {
        if (!itemToDelete) return;
        const { id, color, size, name, isCustom } = itemToDelete;

        const updatedItems = cartItems.filter(item => {
            if (isCustom) {
                return !(item.name === name && item.color === color && item.size === size);
            } else {
                return !(item.id === id && item.color === color && item.size === size);
            }
        });

        setCartItems(updatedItems);
        localStorage.setItem("RhiyaPrintersCart", JSON.stringify(updatedItems));
        window.dispatchEvent(new Event("cartUpdated"));
        setModalVisible(false);
        setItemToDelete(null);
    };

    const cancelDelete = () => {
        setModalVisible(false);
        setItemToDelete(null);
    };




    return (
        <>
            <Header />

            {/* Cart section */}
            <div className='flex flex-col items-start justify-start min-h-[600px] bg-subGrey px-4 py-8 lg:px-[80px] gap-3'>
                <h1 className='font-slab font-semibold text-[28px] md:text-[38px] lg:text-[48px] text-mainBlue'>Your Cart</h1>

                {cartItems.length > 0 ?
                    <div className='flex flex-col lg:flex-row items-start justify-between w-full'>
                        <div className='flex flex-col items-start justify-between w-full lg:w-1/2 gap-[12px]'>
                            {
                                cartItems.map((item, index) => (
                                    <Product key={index} data={item} onQuantityChange={handleQuantityChange} onDelete={requestDelete} />
                                ))
                            }

                        </div>
                        <div className='flex items-center justify-center lg:justify-end w-full lg:w-[450px] pt-8 lg:pt-0'>
                            <div className='flex flex-col items-center justify-between bg-white border-[3px] border-mainBlue rounded-md h-[350px] w-[300px] md:h-[450px] md:w-[400px] p-4'>
                                <div className='flex flex-col items-center justify-between h-2/3'>
                                    <div className='flex flex-col items-center justify-center w-full gap-3 text-mainBlue'>
                                        <h1 className='font-poppins font-bold text-[24px] md:text-[28px] lg:text-[32px] w-full text-center'>Summary</h1>
                                        <div className='flex items-center justify-center w-full'>
                                            <p className='font-poppins font-medium text-[16px] md:text-[18px] lg:text-[20px] w-1/2 text-start'>Total amount:</p>
                                            <p className='font-mono font-bold text-[20px] md:text-[24px] lg:text-[28px] w-1/2 text-start'>$ {totalAmount.toFixed(2)}</p>
                                        </div>
                                        <div className='flex items-center justify-center w-full'>
                                            <p className='font-poppins font-medium text-[16px] md:text-[18px] lg:text-[20px] w-1/2 text-start'>Total unit:</p>
                                            <p className='font-mono font-bold text-[20px] md:text-[24px] lg:text-[28px] w-1/2 text-start'>{totalUnits}</p>
                                        </div>
                                    </div>
                                    <p className='font-poppins font-normal text-[12px] md:text-[16px] text-red-500 text-justify'>You will receive the total amount including shipping fees and taxes through WhatsApp after order is placed.</p>
                                </div>
                                <div>
                                    <Link to={"/shipping"}
                                        className="inline-block bg-mainBlue text-white font-poppins font-medium text-[18px] md:text-[20px] px-14 md:px-16 py-3 border-2 hover:border-mainBlue rounded-full shadow-md hover:bg-subGrey hover:text-mainBlue transition"
                                    >
                                        Proceed
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    : (
                        <p className="text-gray-500 font-poppins">Your cart is empty.</p>
                    )}
            </div>

            <Footer />

            <ConfirmModal
                visible={modalVisible}
                message="Are you sure you want to delete this item from your cart?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </>
    )
}