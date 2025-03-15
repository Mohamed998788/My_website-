import { useEffect, useRef } from "react";
import { initializeGSAP } from "@/lib/animations";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Animate footer on mount
    const gsap = initializeGSAP();
    if (gsap && footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);
  
  const openWhatsApp = () => {
    window.open("https://wa.me/+123456789", "_blank");
  };
  
  return (
    <footer ref={footerRef} className="footer text-white py-4">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4">
            <h5 className="mb-3" data-aos="fade-up">GAMA X CHEAT</h5>
            <p className="small" data-aos="fade-up" data-aos-delay="100">
              نقدم أفضل المنتجات والخدمات لعملائنا الكرام
            </p>
          </div>
          
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
            <h5 className="mb-3">روابط سريعة</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">المنتجات</a></li>
              <li><a href="/cart" className="text-white text-decoration-none">سلة التسوق</a></li>
              <li><a href="/login" className="text-white text-decoration-none">تسجيل الدخول</a></li>
            </ul>
          </div>
          
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
            <h5 className="mb-3">تواصل معنا</h5>
            <button 
              className="btn btn-whatsapp"
              onClick={openWhatsApp}
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <i className="fab fa-whatsapp me-2"></i> تواصل عبر الواتساب
            </button>
            
            <div className="social-icons mt-3">
              <a href="#" className="social-icon bg-primary text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon bg-info text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon bg-danger text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        
        <hr className="my-3 bg-light" />
        
        <p className="mb-0" data-aos="fade-up" data-aos-delay="100">
          &copy; {new Date().getFullYear()} GAMA X CHEAT. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
