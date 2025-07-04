import {
  CubeIcon,
  FilmIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import axios from "../utils/axios"; // Make sure axios is pre-configured

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    offers: 0,
    ads: 0,
  });
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, [recentProducts]);

  const fetchDashboardData = async () => {
    try {
      const [productRes, offerRes, adRes] = await Promise.all([
        axios.get("/products"),
        axios.get("/offers"),
        axios.get("/ads"),
      ]);

      const allProducts = productRes.data;

      setStats({
        products: allProducts.length,
        offers: offerRes.data.length,
        ads: adRes.data.length,
      });

      // Sort by most recent (if you want to show last added ones)
      const recent = [...allProducts]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);

      setRecentProducts(recent);
    } catch (err) {
      console.error("Dashboard fetch failed", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Total Products"
          value={stats.products}
          icon={<CubeIcon className="h-8 w-8 text-white" />}
          bg="bg-blue-500"
        />
        <StatCard
          title="Total Offers"
          value={stats.offers}
          icon={<TagIcon className="h-8 w-8 text-white" />}
          bg="bg-green-500"
        />
        <StatCard
          title="Total Ads Videos"
          value={stats.ads}
          icon={<FilmIcon className="h-8 w-8 text-white" />}
          bg="bg-purple-500"
        />
      </div>

      {/* Recent Products */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Recently Added Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProducts.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            recentProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-contain rounded"
                />
                <div>
                  <h4 className="font-semibold text-md">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <p className="text-sm font-bold text-gray-800">Rs. {product.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Extra Section (Tip Box) */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white p-6 rounded-xl shadow">
        <h4 className="text-xl font-bold mb-2">Tip: Manage your stock regularly!</h4>
        <p className="text-sm">Keep your product inventory updated to avoid selling out-of-stock items.</p>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, bg }) {
  return (
    <div className={`p-6 rounded-xl shadow-md text-white flex items-center justify-between ${bg}`}>
      <div>
        <h3 className="text-md">{title}</h3>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      {icon}
    </div>
  );
}
