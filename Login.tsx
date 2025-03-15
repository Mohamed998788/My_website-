import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { signInWithEmail, signInWithGoogle } from "@/lib/firebase";
import { fadeInAnimation, buttonHoverAnimation, initializeGSAP } from "@/lib/animations";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  
  const formRef = useRef<HTMLFormElement>(null);
  const googleButtonRef = useRef<HTMLButtonElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    if (formRef.current) {
      fadeInAnimation(formRef.current);
    }
    
    if (googleButtonRef.current) {
      buttonHoverAnimation(googleButtonRef.current);
    }
    
    if (submitButtonRef.current) {
      buttonHoverAnimation(submitButtonRef.current);
    }
    
    // Add animation for lottie container
    const lottieContainer = document.getElementById('lottie-container');
    if (lottieContainer && initializeGSAP()) {
      const gsap = initializeGSAP();
      gsap.fromTo(
        lottieContainer,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
      );
    }
  }, []);
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      await signInWithEmail(email, password);
      
      // Navigate to home page
      setLocation('/');
    } catch (err: any) {
      console.error("Login error:", err);
      setError("فشل تسجيل الدخول. يرجى التحقق من البريد الإلكتروني وكلمة المرور.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await signInWithGoogle();
      
      // Navigate to home page
      setLocation('/');
    } catch (err: any) {
      console.error("Google login error:", err);
      setError("فشل تسجيل الدخول باستخدام Google. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mt-5 pt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 text-center d-none d-md-block" data-aos="fade-right">
          <div 
            id="lottie-container"
            className="lottie-animation" 
            style={{ width: '90%', height: '300px', margin: '0 auto' }}
          ></div>
          <h3 className="mt-3">مرحباً بك مجدداً!</h3>
          <p className="text-muted">قم بتسجيل الدخول للوصول إلى حسابك</p>
        </div>
        
        <div className="col-md-6 col-lg-5" data-aos="fade-left">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">تسجيل الدخول</h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  <i className="fas fa-exclamation-circle me-2"></i>
                  {error}
                </div>
              )}
              
              <form ref={formRef} onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">البريد الإلكتروني</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="أدخل بريدك الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">كلمة المرور</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="أدخل كلمة المرور"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      تذكرني
                    </label>
                  </div>
                  <a href="#" className="text-decoration-none">نسيت كلمة المرور؟</a>
                </div>
                
                <button
                  ref={submitButtonRef}
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      جاري تسجيل الدخول...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt me-2"></i> تسجيل الدخول
                    </>
                  )}
                </button>
                
                <button
                  ref={googleButtonRef}
                  type="button"
                  className="btn btn-google w-100"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  <i className="fab fa-google me-2"></i> تسجيل الدخول عبر Google
                </button>
              </form>
              
              <div className="mt-4 text-center">
                <p>ليس لديك حساب؟ <a href="#" className="text-decoration-none">إنشاء حساب جديد</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
