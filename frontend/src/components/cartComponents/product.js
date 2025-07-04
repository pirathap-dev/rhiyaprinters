import { RiDeleteBin5Line } from "react-icons/ri";
import { FiPlus, FiMinus } from 'react-icons/fi';
import { MdOutlineImageNotSupported } from "react-icons/md";

export default function Product({ data, onQuantityChange, onDelete }) {
    return (
        <div className="flex flex-col items-start justify-between w-full gap-2 py-4">
            <div className="flex items-start justify-between w-full px-0 lg:px-3 gap-3">
                <div className="h-[100px] w-[120px] border-2 border-mainBlue rounded-md overflow-hidden">
                    {data.image ? (
                        <img
                            src={data.image ? data.image : ""}
                            alt={data.name}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <span className="flex flex-col items-center justify-center text-xs h-full text-subBlue font-poppins"><MdOutlineImageNotSupported className="h-[65%] w-[65%]" /></span>
                    )}
                </div>
                <div className="flex flex-col items-end justify-center w-full lg:w-[75%] gap-3">
                    <h1 className="font-slab font-medium text-[16px] md:text-[18px] lg:text-[20px] w-full text-start text-mainBlue">
                        {data.name} [{data.color}/{data.size}]
                    </h1>

                    {/* Column-aligned row: Price | Quantity Controls | Delete */}
                    <div className="grid grid-cols-3 items-center w-full gap-4">
                        {/* Price */}
                        <p className="font-mono font-bold text-subBlue text-[18px] md:text-[20px] lg:text-[22px]">
                            ${data.price.toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex gap-2 items-center">
                            <button
                                className="h-7 w-7 px-1 md:px-0 bg-red-500 text-white font-bold rounded border border-mainBlue flex items-center justify-center"
                                onClick={() =>
                                    onQuantityChange(data.id, data.color, data.size, data.name, data.quantity - 1, data.isCustom)
                                }
                                disabled={data.quantity <= 1}
                            >
                                <FiMinus />
                            </button>

                            <div className="h-7 w-10 px-2 md:px-0 flex items-center justify-center border-2 border-mainBlue text-mainBlue font-bold bg-white rounded">
                                {data.quantity}
                            </div>

                            <button
                                className="h-7 w-7 px-1 md:px-0 bg-green-700 text-white font-bold rounded border border-mainBlue flex items-center justify-center"
                                onClick={() =>
                                    onQuantityChange(data.id, data.color, data.size, data.name, data.quantity + 1, data.isCustom)
                                }
                                disabled={data.quantity >= data.totalStockAvailable}
                            >
                                <FiPlus />
                            </button>
                        </div>

                        {/* Delete Button */}
                        <div className="flex justify-end">
                            <RiDeleteBin5Line
                                className="h-[30px] w-[30px] fill-red-600 cursor-pointer"
                                onClick={() =>
                                    onDelete(data.id, data.color, data.size, data.name, data.isCustom)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[2px] bg-mainBlue rounded-full"></div>
        </div>
    )
}