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

// --- NEW GALLERY PAGES ---
// 1. The List of Couples
import WeddingPortfolioPage from './pages/gallery/WeddingPortfolioPage';
// 2. The Individual Album (Dynamic)
import WeddingDetailsPage from './pages/gallery/WeddingDetailsPage';

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
        
        {/* Main Portfolio Landing Page (The Categories) */}
        <Route path="/gallery" element={<PortfolioPage />} />
        
        {/* --- NEW WEDDING ROUTES --- */}
        {/* 1. The List of Couples */}
        <Route path="/gallery/weddings" element={<WeddingPortfolioPage />} />
        
        {/* 2. The Specific Album (Dynamic ID) */}
        <Route path="/gallery/weddings/:id" element={<WeddingDetailsPage />} />
        
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      
      <Footer />
    
    </div>
  );
}

export default App;