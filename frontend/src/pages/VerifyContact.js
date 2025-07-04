// import { useEffect, useState } from "react";
// import api from '../utils/api';
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Header from "../components/header";
// import Footer from "../components/footer";

// export default function VerifyContact() {
//     const navigate = useNavigate();
//     const [otp, setOtp] = useState("");
//     const [email, setEmail] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [cart, setCart] = useState([]);
//     const [shippingDetails, setShippingDetails] = useState({
//         name: '',
//         house: '',
//         street: '',
//         city: '',
//         postal: '',
//         contact: '',
//     });


//     useEffect(() => {
//         const shippingData = JSON.parse(localStorage.getItem("RhiyaPrintersShippingDetails"));
//         const cartData = JSON.parse(localStorage.getItem("RhiyaPrintersCart"));
//         if (!shippingData || !shippingData.email) {
//             toast.error("No email found. Please fill shipping details.");
//             navigate("/shipping");
//         } else {
//             setEmail(shippingData.email);
//             setCart(cartData || []);
//             setShippingDetails({
//                 name: shippingData.name,
//                 house: shippingData.house,
//                 street: shippingData.street,
//                 city: shippingData.city,
//                 postal: shippingData.postal,
//                 contact: shippingData.contact,
//             });

//             // send OTP with the email directly from localStorage
//             const sendOtp = async () => {
//                 try {
//                     const res = await api.post('/email/send-otp', { email: shippingData.email });
//                     if (res.data.success) {
//                         toast.success(`OTP sent to Email: ${shippingData.email}`);
//                     } else {
//                         toast.error("Failed to send OTP. Please try again.");
//                         navigate("/shipping");
//                     }
//                 } catch {
//                     toast.error("Error sending OTP. Please try again.");
//                     navigate("/shipping");
//                 }
//             };

//             sendOtp();
//         }
//     }, [navigate]);


//     const handleVerify = async () => {
//         if (!/^\d{6}$/.test(otp)) {
//             toast.error("Enter a valid 6-digit OTP.");
//             return;
//         }
//         setLoading(true);
//         try {
//             const res = await api.post('/email/verify-otp', { email, otp, cart, shippingDetails });
//             if (res.data.success) {
//                 toast.success("OTP verified successfully!");
//                 localStorage.removeItem("RhiyaPrintersShippingDetails");
//                 localStorage.removeItem("RhiyaPrintersCart");
//                 navigate("/success");
//             } else {
//                 toast.error("Incorrect OTP. Try again.");
//             }
//         } catch {
//             toast.error("Error verifying OTP. Please try again.");
//         }
//         setLoading(false);
//     };



//     const handleResend = async () => {
//         try {
//             const res = await api.post('/email/send-otp', { email });
//             if (res.data.success) {
//                 toast.success(`OTP sent to Email: ${email}`);
//             } else {
//                 toast.error("Failed to send OTP. Please try again.");
//                 navigate("/shipping");
//             }
//         } catch {
//             toast.error("Error sending OTP. Please try again.");
//             navigate("/shipping");
//         }
//     };

//     return (
//         <>
//             <Header />
//             <div className="flex flex-col items-center justify-center bg-white px-4 py-10 min-h-[600px]">
//                 <div className="w-full max-w-md bg-subGrey border-2 border-mainBlue rounded-md p-6 flex flex-col gap-4 items-center">
//                     <h2 className="text-[24px] md:text-[28px] font-slab text-mainBlue text-center">
//                         Email OTP Verification
//                     </h2>
//                     <p className="text-center text-[16px] text-gray-700">
//                         An OTP has been sent to your Email address:
//                         <br />
//                         <span className="font-bold text-black">{email}</span>
//                     </p>

//                     <input
//                         type="text"
//                         maxLength={6}
//                         placeholder="Enter 6-digit OTP"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//                         className="w-full h-[50px] p-3 text-center border-2 border-subBlue rounded-md text-[18px] tracking-[8px] font-mono"
//                     />

//                     <button
//                         onClick={handleVerify}
//                         disabled={loading}
//                         className={`w-full py-2 rounded-md font-poppins font-medium text-[16px] transition
//                           ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-mainBlue text-white hover:bg-subBlue'}`}
//                     >
//                         {loading ? "Sending OTP..." : "Verify OTP"}
//                     </button>

//                     <button
//                         onClick={handleResend}
//                         disabled={loading}
//                         className={`text-mainBlue text-[14px] underline mt-2 ${loading ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer'}`}
//                     >
//                         Resend OTP
//                     </button>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }

import { useEffect, useState } from "react";
import api from '../utils/api';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/header";
import Footer from "../components/footer";

export default function VerifyContact() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    house: '',
    street: '',
    city: '',
    postal: '',
    contact: '',
  });

  useEffect(() => {
    try {
      const shippingData = JSON.parse(localStorage.getItem("RhiyaPrintersShippingDetails"));
      const cartData = JSON.parse(localStorage.getItem("RhiyaPrintersCart")) || [];

      if (!shippingData || !shippingData.email) {
        toast.error("No email found. Please fill shipping details.");
        navigate("/shipping");
        return;
      }

      setEmail(shippingData.email);
      setCart(Array.isArray(cartData) ? cartData : []);
      setShippingDetails({
        name: shippingData.name || '',
        house: shippingData.house || '',
        street: shippingData.street || '',
        city: shippingData.city || '',
        postal: shippingData.postal || '',
        contact: shippingData.contact || '',
      });

      // send OTP with the email directly from localStorage
      const sendOtp = async () => {
        try {
          const res = await api.post('/email/send-otp', { email: shippingData.email });
          if (res.data.success) {
            toast.success(`OTP sent to Email: ${shippingData.email}`);
          } else {
            toast.error("Failed to send OTP. Please try again.");
            navigate("/shipping");
          }
        } catch (error) {
          toast.error(`Error sending OTP: ${error?.message || 'Please try again.'}`);
          navigate("/shipping");
        }
      };

      sendOtp();
    } catch (error) {
      toast.error("Corrupted shipping data. Please fill shipping details again.");
      navigate("/shipping");
    }
  }, [navigate]);

  const handleVerify = async () => {
    if (loading) return; // prevent multiple clicks
    if (!/^\d{6}$/.test(otp)) {
      toast.error("Enter a valid 6-digit OTP.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/email/verify-otp', { email, otp, cart, shippingDetails });
      if (res.data.success) {
        toast.success("OTP verified successfully!");
        localStorage.removeItem("RhiyaPrintersShippingDetails");
        localStorage.removeItem("RhiyaPrintersCart");
        navigate("/success");
      } else {
        toast.error("Incorrect OTP. Try again.");
      }
    } catch (error) {
      toast.error(`Error verifying OTP: ${error?.message || 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (loading) return; // prevent multiple clicks
    setLoading(true);
    try {
      const res = await api.post('/email/send-otp', { email });
      if (res.data.success) {
        toast.success(`OTP sent to Email: ${email}`);
      } else {
        toast.error("Failed to send OTP. Please try again.");
        navigate("/shipping");
      }
    } catch (error) {
      toast.error(`Error sending OTP: ${error?.message || 'Please try again.'}`);
      navigate("/shipping");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center bg-white px-4 py-10 min-h-[600px]">
        <div className="w-full max-w-md bg-subGrey border-2 border-mainBlue rounded-md p-6 flex flex-col gap-4 items-center">
          <h2 className="text-[24px] md:text-[28px] font-slab text-mainBlue text-center">
            Email OTP Verification
          </h2>
          <p className="text-center text-[16px] text-gray-700">
            An OTP has been sent to your Email address:
            <br />
            <span className="font-bold text-black">{email}</span>
          </p>

          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full h-[50px] p-3 text-center border-2 border-subBlue rounded-md text-[18px] tracking-[8px] font-mono"
            disabled={loading}
          />

          <button
            onClick={handleVerify}
            disabled={loading}
            className={`w-full py-2 rounded-md font-poppins font-medium text-[16px] transition
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-mainBlue text-white hover:bg-subBlue'}`}
          >
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>

          <button
            onClick={handleResend}
            disabled={loading}
            className={`text-mainBlue text-[14px] underline mt-2 ${loading ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer'}`}
          >
            Resend OTP
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
