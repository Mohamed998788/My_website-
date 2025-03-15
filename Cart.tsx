import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { getCart, clearCart, removeFromCart, updateQuantity, getCartTotal, CartItem } from "@/lib/cart";
import { fadeInAnimation, initializeGSAP } from "@/lib/animations";

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const cartContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize animations
    if (cartContainerRef.current) {
      fadeInAnimation(cartContainerRef.current);
    }
    
    // Load cart data
    setCart(getCart());
    
    // Add event listener for cart updates
    const handleCartUpdate = () => {
      setCart(getCart());
    };
    
    window.addEventListener('storage', handleCartUpdate);
    document.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('storage', handleCartUpdate);
      document.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);
  
  const handleRemoveItem = (productId: string) => {
    const gsap = initializeGSAP();
    const itemElement = document.querySelector(`[data-product-id="${productId}"]`);
    
    if (gsap && itemElement) {
      // Animate removal
      gsap.to(itemElement, {
        height: 0,
        opacity: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 0,
        duration: 0.3,
        onComplete: () => {
          removeFromCart(productId);
          setCart(getCart());
          
          // Dispatch event to update cart count in navbar
          const event = new Event('cartUpdated');
          document.dispatchEvent(event);
        }
      });
    } else {
      removeFromCart(productId);
      setCart(getCart());
      
      // Dispatch event to update cart count in navbar
      const event = new Event('cartUpdated');
      document.dispatchEvent(event);
    }
  };
  
  const handleQuantityChange = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
    setCart(getCart());
    
    // Dispatch event to update cart count in navbar
    const event = new Event('cartUpdated');
    document.dispatchEvent(event);
  };
  
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('السلة فارغة!');
      return;
    }
    
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      const total = getCartTotal().toFixed(2);
      alert(`تم إتمام الشراء بقيمة ${total} $`);
      clearCart();
      setCart([]);
      setIsCheckingOut(false);
      
      // Dispatch event to update cart count in navbar
      const event = new Event('cartUpdated');
      document.dispatchEvent(event);
    }, 2000);
  };
  
  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4 text-center" data-aos="fade-down">سلة التسوق</h2>
        </div>
      </div>
      
      <div ref={cartContainerRef} className="row">
        {cart.length > 0 ? (
          <>
            <div className="col-md-8">
              <div className="card shadow-sm">
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush">
                    {cart.map((item, index) => (
                      <li 
                        key={`${item.id}-${index}`}
                        className="list-group-item cart-item p-3"
                        data-product-id={item.id}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                      >
                        <div className="d-flex align-items-center">
                          <div className="cart-item-image me-3">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="rounded" 
                              width="80" 
                              height="80"
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                          
                          <div className="cart-item-details flex-grow-1">
                            <h5 className="mb-1">{item.name}</h5>
                            <p className="text-muted mb-1">{item.price.toFixed(2)} $ × {item.quantity}</p>
                            <p className="item-total fw-bold">المجموع: {(item.price * item.quantity).toFixed(2)} $</p>
                          </div>
                          
                          <div className="cart-item-actions d-flex flex-column align-items-end">
                            <div className="quantity-control d-flex align-items-center mb-2">
                              <button 
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                              
                              <span className="mx-2 fw-bold">{item.quantity}</span>
                              
                              <button 
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                            
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <i className="fas fa-trash-alt me-1"></i> حذف
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mt-4 mt-md-0">
              <div className="card shadow-sm" data-aos="fade-left">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">ملخص الطلب</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span>عدد المنتجات:</span>
                    <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>المجموع الفرعي:</span>
                    <span>{getCartTotal().toFixed(2)} $</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>الشحن:</span>
                    <span>مجاني</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3 fw-bold">
                    <span>الإجمالي:</span>
                    <span className="text-primary">{getCartTotal().toFixed(2)} $</span>
                  </div>
                  
                  <button 
                    className="btn btn-success w-100"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        جاري إتمام الشراء...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-credit-card me-2"></i> إتمام الشراء
                      </>
                    )}
                  </button>
                  
                  <div className="text-center mt-3">
                    <Link href="/">
                      <a className="text-decoration-none">
                        <i className="fas fa-arrow-right me-1"></i> متابعة التسوق
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="card mt-3 shadow-sm" data-aos="fade-up" data-aos-delay="100">
                <div className="card-body">
                  <h5 className="card-title mb-3">طرق الدفع المتاحة</h5>
                  <div className="payment-methods">
                    <i className="fab fa-cc-visa fa-2x me-2 text-primary"></i>
                    <i className="fab fa-cc-mastercard fa-2x me-2 text-danger"></i>
                    <i className="fab fa-cc-paypal fa-2x me-2 text-info"></i>
                    <i className="fas fa-money-bill-wave fa-2x text-success"></i>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="col-12 text-center py-5" data-aos="fade-up">
            <div className="empty-cart-container">
              <i className="fas fa-shopping-cart fa-5x mb-3 text-muted"></i>
              <h3>سلة التسوق فارغة</h3>
              <p className="text-muted mb-4">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد.</p>
              <Link href="/">
                <a className="btn btn-primary">
                  <i className="fas fa-shopping-bag me-2"></i> تصفح المنتجات
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
