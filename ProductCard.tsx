import { useEffect, useRef } from "react";
import { Product } from "@/lib/firebase";
import { addToCart } from "@/lib/cart";
import { buttonHoverAnimation, productCardAnimation, addToCartAnimation } from "@/lib/animations";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    if (cardRef.current) {
      productCardAnimation(cardRef.current);
    }
    
    if (buttonRef.current) {
      buttonHoverAnimation(buttonRef.current);
    }
  }, []);
  
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart(product);
    
    // Dispatch event to update cart count in navbar
    const event = new Event('cartUpdated');
    document.dispatchEvent(event);
    
    if (buttonRef.current) {
      addToCartAnimation(buttonRef.current);
    }
    
    // Show toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <div class="toast-content">
        <i class="fas fa-check-circle toast-icon"></i>
        <div class="toast-message">تمت إضافة ${product.name} إلى السلة</div>
      </div>
    `;
    document.body.appendChild(toast);
    
    // Animate toast in and out
    setTimeout(() => {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 2000);
    }, 100);
  };
  
  return (
    <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay={index * 100}>
      <div ref={cardRef} className="card product-card h-100">
        <div className="product-image-container overflow-hidden">
          <img 
            src={product.image} 
            className="card-img-top" 
            alt={product.name} 
            loading="lazy"
          />
          <div className="product-overlay">
            <button 
              className="btn btn-sm btn-light quick-view-btn"
              onClick={() => alert(`Quick view for ${product.name}`)}
            >
              <i className="fas fa-eye"></i> عرض سريع
            </button>
          </div>
        </div>
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text flex-grow-1">{product.description}</p>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="price-tag">{product.price.toFixed(2)} $</span>
            <div className="rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <i key={star} className="fas fa-star text-warning"></i>
              ))}
            </div>
          </div>
          <button
            ref={buttonRef}
            className="btn btn-primary w-100 mt-3"
            onClick={handleAddToCart}
          >
            <i className="fas fa-cart-plus me-2"></i> إضافة إلى السلة
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
