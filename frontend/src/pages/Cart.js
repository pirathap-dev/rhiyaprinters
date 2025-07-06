import { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Product from '../components/cartComponents/product';
import ConfirmModal from '../components/cartComponents/ConfirmModal';
import Summary from '../components/cartComponents/summary';

export default function Cart() {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("RhiyaPrintersCart")) || []);
    const [modalVisible, setModalVisible] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const shippingFees = (10.00 * totalUnits);
    const tax = ((totalAmount + parseFloat(shippingFees)) * 0.13);

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
                        <Summary
                            totalAmount={totalAmount}
                            totalUnits={totalUnits}
                            shippingFee={shippingFees}
                            tax={tax}
                        />

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