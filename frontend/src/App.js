import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import CustomDesign from './pages/CustomDesign';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import VerifyContact from './pages/VerifyContact';
import Success from './pages/Success';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';

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
      />


      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/shop/:id' element={<ProductDetails />} />
          <Route path='/custom' element={<CustomDesign />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/verify' element={<VerifyContact />} />
          <Route path='/success' element={<Success />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<AboutUs />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

