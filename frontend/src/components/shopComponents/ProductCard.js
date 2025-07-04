// import { Link } from "react-router-dom";

// export default function ProductCard({ product }) {
//     return (
//         <div className="flex flex-col items-center justify-center gap-4 w-full  max-w-[225] mx-auto">
//             <div key={product.id} className="flex flex-col items-center justify-center gap-[10px] w-full max-w-[225px]">
//                     <div className="relative w-full aspect-[225/270] bg-subGrey border-2 border-mainBlue rounded-sm overflow-hidden">
//                         <img
//                             src={product.image} alt={product.name}
//                             className="absolute bottom-0 left-1/2 transform -translate-x-1/2 object-contain max-h-full"
//                         />
//                     </div>

//                 <div className="flex flex-col items-center justify-center w-full gap-[10px]">
//                     <Link to={`/shop/${product.id}`}>
//                         <h2 className="flex items-center justify-center font-poppins font-medium h-[60px] text-[14px] md:text-[20px] lg:text-[22px] text-gray-700 text-center hover:text-black hover:underline">{product.name}</h2>
//                     </Link>
//                     <p className="font-poppins font-semibold text-[15px] md:text-[20px] lg:text-[22px] text-black">${product.price.toFixed(2)}</p>
//                 </div>

//             </div>
//         </div >
//     );
// }
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[225px] mx-auto">
            <div
                key={product?._id}
                className="flex flex-col items-center justify-center gap-[10px] w-full max-w-[225px]"
            >
                {/* Image Container with hover effect */}
                <div className="relative w-full aspect-[225/270] overflow-hidden border-2 border-mainBlue rounded-sm group">

                    {/* Image */}
                    <img
                        src={product?.image}
                        alt={product?.name}
                        loading="lazy"
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 object-bottom"
                    />

                    {/* Frosted Glass Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Link
                            to={`/shop/${product?._id}`}
                            className="px-4 py-2 bg-mainBlue text-white text-sm font-semibold rounded hover:bg-white hover:text-mainBlue border border-mainBlue transition"
                        >
                            View Details
                        </Link>
                    </div>
                </div>


                {/* Name & Price */}
                <div className="flex flex-col items-center justify-center w-full gap-[10px]">
                    <Link to={`/shop/${product?._id}`}>
                        <h2 className="flex items-center justify-center font-poppins font-medium h-[60px] text-[14px] md:text-[20px] lg:text-[22px] text-gray-700 text-center hover:text-black hover:underline">
                            {product?.name}
                        </h2>
                    </Link>
                    <p className="font-poppins font-semibold text-[15px] md:text-[20px] lg:text-[22px] text-black">
                        $ {product?.price.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
}
