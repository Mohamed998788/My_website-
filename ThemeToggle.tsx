import { useEffect, useState } from "react";
import { buttonHoverAnimation } from "@/lib/animations";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  useEffect(() => {
    // Check local storage or system preference for dark mode
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  useEffect(() => {
    const button = document.querySelector('.theme-toggle') as HTMLElement;
    if (button) {
      buttonHoverAnimation(button);
    }
  }, []);
  
  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    
    // Animate the icon
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
      icon.classList.add('rotate-animation');
      setTimeout(() => {
        icon.classList.remove('rotate-animation');
      }, 500);
    }
    
    setDarkMode(!darkMode);
  };
  
  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title={darkMode ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي"}
      data-aos="fade-up"
      data-aos-delay="300"
    >
      <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
    </button>
  );
};

export default ThemeToggle;
