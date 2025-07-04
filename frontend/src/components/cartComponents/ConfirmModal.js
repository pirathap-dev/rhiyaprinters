import { useEffect } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function ConfirmModal({ visible, onConfirm, onCancel, message }) {
    // Optional: fade-in effect by adding/removing CSS classes or controlling opacity
    // Here’s a simple way using CSS transitions and useEffect to trigger

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = "hidden"; // prevent background scroll
        } else {
            document.body.style.overflow = "auto";
        }
        return () => (document.body.style.overflow = "auto");
    }, [visible]);

    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm
        animate-fadeIn"
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 mx-4 text-center
          transform transition-transform duration-300 ease-out scale-100">
                <AiOutlineExclamationCircle
                    className="mx-auto mb-5 text-mainBlue"
                    size={64}
                    aria-hidden="true"
                />

                <h2
                    id="modal-title"
                    className="mb-6 text-3xl font-slab font-semibold text-mainBlue select-none"
                >
                    Confirm Deletion
                </h2>

                <p
                    id="modal-description"
                    className="mb-10 font-poppins text-gray-700 text-lg select-none"
                >
                    {message}
                </p>

                <div className="flex justify-center gap-8">
                    <button
                        onClick={onCancel}
                        className="px-8 py-3 font-semibold text-mainBlue border-2 border-mainBlue rounded-full
              hover:bg-mainBlue hover:text-white transition select-none focus:outline-none focus:ring-2 focus:ring-mainBlue"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-8 py-3 font-semibold text-white bg-red-600 rounded-full shadow-lg
              hover:bg-red-700 transition select-none focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
