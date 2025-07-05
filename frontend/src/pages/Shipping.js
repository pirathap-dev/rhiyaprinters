import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../components/footer";
import Header from "../components/header";
import { FiDelete } from "react-icons/fi";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import toast from 'react-hot-toast';

export default function Shipping() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        house: '',
        street: '',
        city: '',
        province: '',
        postal: '',
        email: '',
        contact: '',
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!/^\d{10}$/.test(formData.contact)) {
            toast.error("Please enter a valid 10-digit WhatsApp number.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }


        // Store or send data
        localStorage.setItem('RhiyaPrintersShippingDetails', JSON.stringify(formData));
        navigate('/verify');
    };

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem("RhiyaPrintersCart")) || [];
        if (cartData.length === 0 || cartData === null) {
            toast.error("No cart items found. Please add items to your cart before proceeding.");
            navigate("/shop");
        }
    }, [navigate]);

    return (
        <>
            <Header />

            <div className="flex flex-col items-center justify-center bg-white px-4 py-8 lg:px-[80px]">
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-start bg-subGrey border-2 border-mainBlue rounded-md px-5 py-8 h-full w-full md:w-2/3 lg:w-[800px] mb-4 gap-4">
                    <h1 className="font-slab font-medium text-[24px] md:text-[28px] lg:text-[32px] text-mainBlue text-center">Shipping Details</h1>
                    <div className="flex flex-col items-start justify-center w-full gap-3">
                        <div className="flex flex-col w-full gap-2">
                            {/* Name */}
                            <label className="block mb-1 font-poppins font-medium text-[18px] md:text-[20px] lg:text-[24px]">Name</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter Name"
                                className="w-full p-2 h-[50px] mb-4 border-2 border-subBlue rounded"
                                required
                            />
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            {/* Shipping Address */}
                            <label className="block mb-1 font-poppins font-medium text-[18px] md:text-[20px] lg:text-[24px]">Shipping address</label>
                            <div>
                                <div className="flex gap-2">
                                    <input
                                        name="house"
                                        value={formData.house}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const allowed = /^[A-Za-z0-9\s\/\-]*$/;
                                            if (value === '' || allowed.test(value)) {
                                                setFormData({ ...formData, house: value });
                                            }
                                        }}
                                        placeholder="No"
                                        className="w-1/4 p-2 h-[50px] mb-4 border-2 border-subBlue rounded"
                                        required
                                    />
                                    <input
                                        name="street"
                                        value={formData.street}
                                        onChange={handleChange}
                                        placeholder="Street name"
                                        className="w-3/4 p-2 h-[50px] mb-4 border-2 border-subBlue rounded"
                                        required
                                    />
                                </div>
                                <input
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="City name"
                                    className="w-full p-2 h-[50px] mb-4 border-2 border-subBlue rounded"
                                    required
                                />
                                <select
                                    name="province"
                                    value={formData.province || ""}
                                    onChange={handleChange}
                                    className="w-full p-2 h-[50px] mb-4 border-2 border-subBlue rounded"
                                    required
                                >
                                    <option value="">Select Province</option>
                                    <option value="AB">Alberta</option>
                                    <option value="BC">British Columbia</option>
                                    <option value="MB">Manitoba</option>
                                    <option value="NB">New Brunswick</option>
                                    <option value="NL">Newfoundland and Labrador</option>
                                    <option value="NS">Nova Scotia</option>
                                    <option value="ON">Ontario</option>
                                    <option value="PE">Prince Edward Island</option>
                                    <option value="QC">Quebec</option>
                                    <option value="SK">Saskatchewan</option>
                                    <option value="NT">Northwest Territories</option>
                                    <option value="NU">Nunavut</option>
                                    <option value="YT">Yukon</option>
                                </select>
                                <input
                                    name="postal"
                                    value={formData.postal}
                                    onChange={handleChange}
                                    placeholder="Postal code"
                                    className="w-full p-2 h-[50px] mb-4 border-2 border-subBlue rounded"
                                />
                            </div>

                        </div>
                        <div className="flex flex-col w-full gap-2">
                            {/* Contact Number */}
                            <label className="block mb-1 font-poppins font-medium text-[18px] md:text-[20px] lg:text-[24px]">Email</label>
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Please enter email"
                                className="w-full p-2 h-[50px] mb-1 border-2 border-subBlue rounded"
                                required
                            />
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            {/* Contact Number */}
                            <label className="block mb-1 font-poppins font-medium text-[18px] md:text-[20px] lg:text-[24px]">Contact Number</label>
                            <input
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                placeholder="Please enter contact No"
                                className="w-full p-2 h-[50px] mb-1 border-2 border-subBlue rounded"
                                required
                            />
                            <p className="text-[12px] md:text-[14px] lg:text[16px] text-justify text-red-600 mb-4">
                                Please remember that orders confirmed through Email only. So please enter a valid email address to get your order without any delays or cancellation.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-[30px] w-full max-w-md mx-auto">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 flex items-center justify-center gap-2 px-[20px] py-[10px] bg-red-700 border-2 border-red-900 rounded-md font-poppins font-medium text-white"
                        >
                            Cancel <FiDelete />
                        </button>

                        <button
                            type="submit"
                            className="flex-1 flex items-center justify-center gap-2 px-[20px] py-[10px] bg-mainBlue border border-subBlue rounded-md font-poppins font-medium text-white"
                        >
                            Next <IoArrowForwardCircleOutline />
                        </button>
                    </div>

                </form>
            </div>

            <Footer />
        </>
    )
}