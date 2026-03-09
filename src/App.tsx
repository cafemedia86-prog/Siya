import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { WholesaleInquiry } from './components/WholesaleInquiry';
import { AnimatePresence } from 'motion/react';
import { AdminProvider } from './context/AdminContext';

// Admin Imports
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminInquiries } from './pages/admin/AdminInquiries';
import { AdminSettings } from './pages/admin/AdminSettings';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const WholesalePage = () => (
  <div className="pt-20">
    <WholesaleInquiry />
  </div>
);

export default function App() {
  return (
    <Router>
      <AdminProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/*" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/products" element={<ProductsPage />} />
                      <Route path="/wholesale" element={<WholesalePage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                    </Routes>
                  </AnimatePresence>
                </main>
                <Footer />
              </>
            } />

            {/* Admin Routes */}
            <Route path="/admin/*" element={
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/products" element={<AdminProducts />} />
                  <Route path="/inquiries" element={<AdminInquiries />} />
                  <Route path="/settings" element={<AdminSettings />} />
                </Routes>
              </AdminLayout>
            } />
          </Routes>
        </div>
      </AdminProvider>
    </Router>
  );
}
