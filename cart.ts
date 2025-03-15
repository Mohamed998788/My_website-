import { Product } from './firebase';

export interface CartItem extends Product {
  quantity: number;
}

export const addToCart = (product: Product): void => {
  // Get current cart from localStorage
  const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  
  // Check if product already in cart
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex >= 0) {
    // Increase quantity if product already in cart
    cart[existingItemIndex].quantity += 1;
  } else {
    // Add new product to cart with quantity 1
    cart.push({ ...product, quantity: 1 });
  }
  
  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const removeFromCart = (productId: string): void => {
  let cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const updateQuantity = (productId: string, quantity: number): void => {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  
  const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex >= 0) {
    cart[itemIndex].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const getCart = (): CartItem[] => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};

export const clearCart = (): void => {
  localStorage.setItem('cart', JSON.stringify([]));
};

export const getCartTotal = (): number => {
  const cart: CartItem[] = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartCount = (): number => {
  const cart: CartItem[] = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};
