import { Link } from "react-router-dom";

export default function Summary({ totalAmount, totalUnits, shippingFee, tax }) {
  const grandTotal = totalAmount + shippingFee + tax;

  return (
    <div className='flex items-center justify-center lg:justify-end w-full lg:w-[450px] pt-8 lg:pt-0'>
      <div className='flex flex-col bg-white border-[3px] border-mainBlue rounded-md min-h-[450px] w-[300px] md:min-h-[500px] md:w-[400px] p-4'>

        {/* Top Section */}
        <div className='flex flex-col items-center justify-start text-mainBlue gap-3'>

          <h1 className='font-poppins font-bold text-[24px] md:text-[28px] lg:text-[32px] w-full text-center'>
            Summary
          </h1>

          {/* Subtotal */}
          <div className='flex items-center justify-between w-full'>
            <p className='font-poppins font-medium text-[16px] md:text-[18px] lg:text-[20px]'>
              Subtotal:
            </p>
            <p className='font-mono font-bold text-[20px] md:text-[24px] lg:text-[28px]'>
              $ {totalAmount.toFixed(2)}
            </p>
          </div>

          {/* Total Units */}
          <div className='flex items-center justify-between w-full'>
            <p className='font-poppins font-medium text-[16px] md:text-[18px] lg:text-[20px]'>
              Total units:
            </p>
            <p className='font-mono font-bold text-[20px] md:text-[24px] lg:text-[28px]'>
              {totalUnits}
            </p>
          </div>

          {/* Shipping Fee */}
          <div className='flex items-center justify-between w-full'>
            <p className='font-poppins font-medium text-[16px] md:text-[18px] lg:text-[20px]'>
              Shipping fee:
            </p>
            <p className='font-mono font-bold text-[20px] md:text-[24px] lg:text-[28px]'>
              $ {shippingFee.toFixed(2)}
            </p>
          </div>

          {/* Tax */}
          <div className='flex items-center justify-between w-full'>
            <p className='font-poppins font-medium text-[16px] md:text-[18px] lg:text-[20px]'>
              Tax:
            </p>
            <p className='font-mono font-bold text-[20px] md:text-[24px] lg:text-[28px]'>
              $ {tax.toFixed(2)}
            </p>
          </div>

          {/* Grand Total */}
          <div className='flex items-center justify-between w-full border-t border-mainBlue pt-2 mt-2'>
            <p className='font-poppins font-semibold text-[16px] md:text-[18px] lg:text-[20px]'>
              Total:
            </p>
            <p className='font-mono font-extrabold text-[20px] md:text-[24px] lg:text-[28px]'>
              $ {grandTotal.toFixed(2)}
            </p>
          </div>

          {/* Payment Instruction */}
          <p className='font-poppins font-normal text-[12px] md:text-[14px] text-red-500 text-center'>
            Please make an e-transfer to the following email address:
            <br />
            <b>rhiyaprinterspayment@gmail.com</b> after receiving an order placement mail.
          </p>
        </div>

        {/* Button at Bottom */}
        <div className='flex items-center justify-center w-full mt-auto pt-4'>
          <Link
            to={"/shipping"}
            className="inline-block bg-mainBlue text-white font-poppins font-medium text-[18px] md:text-[20px] px-14 md:px-16 py-3 border-2 hover:border-mainBlue rounded-full shadow-md hover:bg-subGrey hover:text-mainBlue transition"
          >
            Proceed
          </Link>
        </div>
      </div>
    </div>
  );
}
