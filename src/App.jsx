import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// --- LAYOUT COMPONENTS ---
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// --- PAGE COMPONENTS ---
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage'; 
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';

// --- GALLERY SUB-PAGES ---
import WeddingGalleryPage from './pages/gallery/WeddingGalleryPage'; // <--- NEW IMPORT

// --- SCROLL TO TOP UTILITY ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    // Global Styles: Cream Background (#FDFBF7), Dark Text (#1a1a1a), Gold Selection
    <div className="bg-[#FDFBF7] min-h-screen text-[#1a1a1a] font-sans antialiased selection:bg-[#A6906E] selection:text-white">
      
      <ScrollToTop /> 
      
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        
        {/* Main Gallery Route */}
        <Route path="/gallery" element={<PortfolioPage />} />
        
        {/* Gallery Sub-Menu Routes */}
        <Route path="/gallery/weddings" element={<WeddingGalleryPage />} /> {/* <--- NEW ROUTE */}
        
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      
      <Footer />
    
    </div>
  );
}

export default App;