import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './components/Layout/TopBar';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import ScrollToTop from './components/Utils/ScrollToTop';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Toaster position="top-center" />
      <ScrollToTop />
      <div className="sticky-header-wrapper">
        <TopBar isMenuOpen={isMenuOpen} />
        <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
