import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "../utils/axios"; // make sure axios base URL is configured

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchOffers();
  }, []);

  useEffect(() => {
    if(success) { 
    fetchOffers();
    setSuccess(false);
    }
  }, [success]);

  const fetchOffers = async () => {
    try {
      const res = await axios.get("/offers");
      setOffers(res.data);
    } catch (err) {
      toast.error("Failed to fetch offers");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=11de4658f6b8ca8df0592a631b46a634`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.success) {
        const uploadedUrl = data.data.url;

        // Now save to backend
        const saved = await axios.post("/offers", { imageUrl: uploadedUrl });
        setOffers((prev) => [saved.data, ...prev]);

        toast.success("Offer image uploaded");
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this offer image?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/offers/${id}`);
      setSuccess(true);
      toast.success("Offer deleted");
    } catch (err) {
      toast.error("Failed to delete offer");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Offer Images</h2>

      <div className="mb-4">
        <label className="inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
          {uploading ? "Uploading..." : "Upload Offer Image"}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {offers.length === 0 ? (
        <p className="text-gray-500">No offer images yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {offers.map((offer) => (
            <div key={offer._id} className="relative border rounded overflow-hidden">
              <img
                src={offer.imageUrl}
                alt="Offer"
                className="w-full h-40 object-cover"
              />
              <button
                className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 text-xs rounded"
                onClick={() => handleDelete(offer._id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
