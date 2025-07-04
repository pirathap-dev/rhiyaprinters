import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../utils/axios"; // Axios with baseURL set

export default function AdsVideo() {
  const [ads, setAds] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Load ad videos initially
  useEffect(() => {
    fetchAds();
  }, []);

  // Re-fetch when success toggles true
  useEffect(() => {
    if (success) {
      fetchAds();
      setSuccess(false);
    }
  }, [success]);

  const fetchAds = async () => {
    try {
      const res = await axios.get("/ads");
      setAds(res.data);
    } catch (err) {
      toast.error("Failed to fetch ad videos");
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!videoUrl.trim() || !publicId.trim()) {
      toast.error("Video URL and Public ID are required");
      return;
    }

    try {
      setUploading(true);
      const res = await axios.post("/ads", { videoUrl, publicId });
      toast.success("Ad video added");
      setVideoUrl("");
      setPublicId("");
      setSuccess(true); // triggers re-fetch
    } catch (err) {
      toast.error("Failed to add ad video");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this ad video?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/ads/${id}`);
      toast.success("Ad video deleted");
      setSuccess(true); // triggers re-fetch
    } catch (err) {
      toast.error("Failed to delete ad video");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Ad Videos</h2>

      <form onSubmit={handleAddVideo} className="mb-6 space-y-4 max-w-xl">
        <div>
          <label className="block mb-1 font-medium">Video URL</label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="https://res.cloudinary.com/.../video.mp4"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Public ID</label>
          <input
            type="text"
            value={publicId}
            onChange={(e) => setPublicId(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="cloudinary_public_id"
            required
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {uploading ? "Adding..." : "Add Ad Video"}
        </button>
      </form>

      {ads.length === 0 ? (
        <p className="text-gray-500">No ad videos yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div key={ad._id} className="border rounded p-2 relative">
              <video
                controls
                autoPlay
                muted
                loop
                src={ad.videoUrl}
                className="w-full h-48 rounded"
              />
              <p className="text-xs mt-2 text-gray-600">Public ID: {ad.publicId}</p>
              <button
                className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 text-xs rounded"
                onClick={() => handleDelete(ad._id)}
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
