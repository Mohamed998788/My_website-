import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcBtDC9lhlIHtepS4WAv0U8lWKm7B_WIE",
  authDomain: "gama-x-cheat.firebaseapp.com",
  projectId: "gama-x-cheat",
  storageBucket: "gama-x-cheat.firebasestorage.app",
  messagingSenderId: "549887400233",
  appId: "1:549887400233:web:84e059527b7dd9db4cff38",
  measurementId: "G-MSYP6Y9TMY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const loadProducts = async (): Promise<Product[]> => {
  const products: Product[] = [];
  const querySnapshot = await getDocs(collection(db, 'products'));
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    products.push({
      id: doc.id,
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image
    });
  });
  
  return products;
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in with email and password', error);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google', error);
    throw error;
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export { db, auth };
