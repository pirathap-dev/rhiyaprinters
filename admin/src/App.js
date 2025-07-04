import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import Dashboard from "./pages//Dashboard";
import Products from "./pages/Products";
import Offers from "./pages/Offers";
import AdsVideos from "./pages/AdsVideo";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          // Global default styles
          style: {
            background: '#f9fafb', // light neutral background (Tailwind gray-50)
            color: '#111827', // gray-900
            padding: '18px 24px',
            borderRadius: '12px',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
            fontSize: '16px',
            fontWeight: '500',
            fontFamily: "'Inter', system-ui, sans-serif",
            border: '1px solid #e5e7eb', // subtle border
          },
          success: {
            iconTheme: {
              primary: '#10b981', // emerald-500
              secondary: '#ECFDF5', // emerald-50
            },
            style: {
              background: '#ECFDF5',
              color: '#065F46',
              border: '1px solid #A7F3D0',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444', // red-500
              secondary: '#FEE2E2', // red-100
            },
            style: {
              background: '#FEF2F2',
              color: '#991B1B',
              border: '1px solid #FECACA',
            },
          },
        }}
        reverseOrder={false}
      />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/ads-videos" element={<AdsVideos />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;

