import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { getCartCount } from "@/lib/cart";
import { navbarAnimation } from "@/lib/animations";

const Navbar = () => {
  const [location] = useLocation();
  const navbarRef = useRef<HTMLElement>(null);
  const [cartCount, setCartCount] = useState(0);
  
  useEffect(() => {
    // Apply GSAP animation to navbar
    if (navbarRef.current) {
      navbarAnimation(navbarRef.current);
    }
    
    // Update cart count
    setCartCount(getCartCount());
    
    // Listen for storage events to update cart count when it changes
    const handleStorageChange = () => {
      setCartCount(getCartCount());
    };
    
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('cartUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, []);
  
  // Shrink navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        if (window.scrollY > 50) {
          navbarRef.current.classList.add('navbar-shrink');
          navbarRef.current.style.padding = '0.5rem 1rem';
        } else {
          navbarRef.current.classList.remove('navbar-shrink');
          navbarRef.current.style.padding = '1rem';
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path: string) => {
    return location === path ? 'active' : '';
  };
  
  return (
    <nav ref={navbarRef} className="navbar navbar-expand-lg navbar-dark fixed-top" data-aos="fade-down" data-aos-duration="800">
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <span className="ms-2 fw-bold">GAMA X CHEAT</span>
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className={`nav-link ${isActive('/')}`}>
                <i className="fas fa-home me-1"></i> المنتجات
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/cart" className={`nav-link ${isActive('/cart')}`} data-aos="zoom-in" data-aos-delay="100">
                <i className="fas fa-shopping-cart me-1"></i> سلة التسوق
                {cartCount > 0 && (
                  <span className="badge rounded-pill bg-warning text-dark ms-1">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/login" className={`nav-link ${isActive('/login')}`} data-aos="zoom-in" data-aos-delay="200">
                <i className="fas fa-user me-1"></i> تسجيل الدخول
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
