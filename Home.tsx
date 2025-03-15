import { useState, useEffect, useRef } from "react";
import ProductCard from "@/components/ProductCard";
import { loadProducts, Product } from "@/lib/firebase";
import { staggeredFadeIn, initializeParticles } from "@/lib/animations";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const productContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize particles
    initializeParticles("particles-js");
    
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await loadProducts();
        setProducts(productsData);
        setLoading(false);
        
        // Apply staggered animation to product cards after loading
        if (productContainerRef.current) {
          const productCards = productContainerRef.current.querySelectorAll('.product-card');
          if (productCards.length) {
            staggeredFadeIn(Array.from(productCards) as HTMLElement[], 0.1);
          }
        }
      } catch (err) {
        console.error("Error loading products:", err);
        setError("حدث خطأ أثناء تحميل المنتجات. يرجى المحاولة مرة أخرى.");
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  return (
    <div className="container mt-5 pt-5">
      <section className="hero-section py-5 mb-5">
        <div className="row align-items-center">
          <div className="col-md-6" data-aos="fade-right">
            <h1 className="display-4 fw-bold">اكتشف منتجاتنا المميزة</h1>
            <p className="lead">نحن نقدم أفضل المنتجات الحصرية بأفضل الأسعار</p>
            <div className="d-flex gap-3 mt-4">
              <button className="btn btn-primary btn-lg">تسوق الآن</button>
              <button className="btn btn-outline-secondary btn-lg">معرفة المزيد</button>
            </div>
          </div>
          <div className="col-md-6 text-center" data-aos="fade-left">
            <lottie-player
              src="https://assets3.lottiefiles.com/packages/lf20_rjn0esjh.json"
              background="transparent"
              speed="1"
              style={{ width: '100%', height: '300px' }}
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      </section>
      
      <section className="products-section py-4">
        <div className="section-header text-center mb-5">
          <h2 className="fw-bold" data-aos="fade-down">المنتجات</h2>
          <div className="separator mx-auto my-3" data-aos="zoom-in"></div>
          <p className="text-muted" data-aos="fade-up">اكتشف مجموعتنا المميزة من المنتجات عالية الجودة</p>
        </div>
        
        {loading ? (
          <div className="text-center py-5">
            <div className="loading-spinner mb-3"></div>
            <p>جاري تحميل المنتجات...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center" role="alert">
            <i className="fas fa-exclamation-circle me-2"></i>
            {error}
          </div>
        ) : (
          <div ref={productContainerRef} className="row">
            {products.length > 0 ? (
              products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <i className="fas fa-box-open fa-3x mb-3 text-muted"></i>
                <h3>لا توجد منتجات متاحة حالياً</h3>
                <p className="text-muted">يرجى التحقق مرة أخرى لاحقاً</p>
              </div>
            )}
          </div>
        )}
      </section>
      
      <section className="features-section py-5 my-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4" data-aos="fade-up">
            <div className="feature-card p-4 rounded shadow-sm">
              <i className="fas fa-shipping-fast fa-3x mb-3 text-primary"></i>
              <h4>شحن سريع</h4>
              <p className="text-muted">توصيل سريع لجميع المنتجات في أسرع وقت</p>
            </div>
          </div>
          <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="100">
            <div className="feature-card p-4 rounded shadow-sm">
              <i className="fas fa-lock fa-3x mb-3 text-primary"></i>
              <h4>دفع آمن</h4>
              <p className="text-muted">طرق دفع آمنة ومضمونة لجميع المعاملات</p>
            </div>
          </div>
          <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="200">
            <div className="feature-card p-4 rounded shadow-sm">
              <i className="fas fa-headset fa-3x mb-3 text-primary"></i>
              <h4>دعم فني 24/7</h4>
              <p className="text-muted">فريق دعم متاح على مدار الساعة لمساعدتك</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="testimonials-section py-5 my-5 bg-light rounded">
        <div className="section-header text-center mb-5">
          <h2 className="fw-bold" data-aos="fade-down">آراء العملاء</h2>
          <div className="separator mx-auto my-3" data-aos="zoom-in"></div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-4" data-aos="fade-up">
            <div className="testimonial-card p-4 rounded shadow-sm bg-white">
              <div className="d-flex align-items-center mb-3">
                <div className="testimonial-avatar me-3">
                  <i className="fas fa-user-circle fa-3x text-primary"></i>
                </div>
                <div>
                  <h5 className="mb-0">أحمد محمد</h5>
                  <small className="text-muted">عميل</small>
                </div>
              </div>
              <p className="mb-0">تجربة ممتازة مع هذا الموقع! المنتجات عالية الجودة والتوصيل سريع جداً.</p>
              <div className="rating mt-2">
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="100">
            <div className="testimonial-card p-4 rounded shadow-sm bg-white">
              <div className="d-flex align-items-center mb-3">
                <div className="testimonial-avatar me-3">
                  <i className="fas fa-user-circle fa-3x text-primary"></i>
                </div>
                <div>
                  <h5 className="mb-0">سارة علي</h5>
                  <small className="text-muted">عميلة</small>
                </div>
              </div>
              <p className="mb-0">خدمة عملاء رائعة وتعامل ممتاز. سأعود للشراء مرة أخرى بالتأكيد!</p>
              <div className="rating mt-2">
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star-half-alt text-warning"></i>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="200">
            <div className="testimonial-card p-4 rounded shadow-sm bg-white">
              <div className="d-flex align-items-center mb-3">
                <div className="testimonial-avatar me-3">
                  <i className="fas fa-user-circle fa-3x text-primary"></i>
                </div>
                <div>
                  <h5 className="mb-0">محمد خالد</h5>
                  <small className="text-muted">عميل</small>
                </div>
              </div>
              <p className="mb-0">منتجات ممتازة وسعر مناسب جداً. سعيد بتجربتي معكم وأنصح الجميع بالتعامل معكم.</p>
              <div className="rating mt-2">
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
                <i className="fas fa-star text-warning"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
