import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const titleMap = {
    "/": "Dashboard",
    "/products": "Manage Products",
    "/offers": "Manage Offers",
    "/ads-videos": "Manage Ads Videos",
  };

  return (
    <div className="h-16 bg-white shadow flex items-center px-6 sticky top-0 z-10">
      <h1 className="text-xl font-semibold">{titleMap[location.pathname]}</h1>
    </div>
  );
}
