export const initializeGSAP = () => {
  if (typeof window !== 'undefined' && (window as any).gsap) {
    const gsap = (window as any).gsap;
    
    // Register plugins if needed
    // gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    return gsap;
  }
  return null;
};

export const fadeInAnimation = (element: HTMLElement, delay: number = 0) => {
  const gsap = initializeGSAP();
  if (!gsap) return;
  
  gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      delay, 
      ease: "power2.out" 
    }
  );
};

export const staggeredFadeIn = (elements: HTMLElement[], staggerDelay: number = 0.1) => {
  const gsap = initializeGSAP();
  if (!gsap) return;
  
  gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.6, 
      stagger: staggerDelay, 
      ease: "power2.out" 
    }
  );
};

export const navbarAnimation = (navbar: HTMLElement) => {
  const gsap = initializeGSAP();
  if (!gsap) return;
  
  gsap.fromTo(
    navbar,
    { y: -100, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      ease: "power3.out" 
    }
  );
  
  // Animate navbar links
  const links = navbar.querySelectorAll('.nav-link');
  gsap.fromTo(
    links,
    { y: -20, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.6, 
      stagger: 0.1,
      delay: 0.3,
      ease: "power2.out" 
    }
  );
};

export const buttonHoverAnimation = (button: HTMLElement) => {
  const gsap = initializeGSAP();
  if (!gsap) return;
  
  button.addEventListener('mouseenter', () => {
    gsap.to(button, { 
      scale: 1.05, 
      duration: 0.3, 
      ease: "power2.out" 
    });
  });
  
  button.addEventListener('mouseleave', () => {
    gsap.to(button, { 
      scale: 1, 
      duration: 0.3, 
      ease: "power2.out" 
    });
  });
};

export const productCardAnimation = (card: HTMLElement) => {
  const gsap = initializeGSAP();
  if (!gsap) return;
  
  // Add perspective to parent for 3D effect
  card.style.transformStyle = 'preserve-3d';
  card.style.perspective = '1000px';
  
  // Track mouse position for 3D tilt effect
  let bounds: DOMRect;
  let mouseX = 0;
  let mouseY = 0;
  
  const resetTilt = () => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "power3.out"
    });
  };
  
  const calculateTilt = (e: MouseEvent) => {
    if (!bounds) bounds = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    mouseX = e.clientX - bounds.left - bounds.width / 2;
    mouseY = e.clientY - bounds.top - bounds.height / 2;
    
    // Calculate rotation values (max 10 degrees)
    const rotateY = mouseX * 10 / bounds.width;
    const rotateX = -mouseY * 10 / bounds.height;
    
    // Apply rotation
    gsap.to(card, {
      rotateY: rotateY,
      rotateX: rotateX,
      duration: 0.3,
      ease: "power2.out"
    });
  };
  
  card.addEventListener('mouseenter', (e) => {
    bounds = card.getBoundingClientRect();
    
    // Apply initial elevation and scaling
    gsap.to(card, { 
      y: -15, 
      scale: 1.03,
      z: 20,
      boxShadow: "0 15px 30px rgba(0,0,0,0.15)", 
      duration: 0.4, 
      ease: "back.out(1.5)" 
    });
    
    // Add shine effect overlay
    let shine = card.querySelector<HTMLDivElement>('.shine-effect');
    if (!shine) {
      shine = document.createElement('div');
      shine.className = 'shine-effect';
      shine.style.position = 'absolute';
      shine.style.top = '0';
      shine.style.left = '0';
      shine.style.width = '100%';
      shine.style.height = '100%';
      shine.style.backgroundImage = 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)';
      shine.style.opacity = '0';
      shine.style.pointerEvents = 'none';
      shine.style.zIndex = '1';
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(shine);
    }
    
    gsap.to(shine, {
      opacity: 0.7,
      duration: 0.5
    });
    
    // Enhance image zoom
    const image = card.querySelector('img');
    if (image) {
      gsap.to(image, { 
        scale: 1.12, 
        duration: 0.5, 
        ease: "power2.out" 
      });
    }
    
    // Enhanced card body effect
    const cardBody = card.querySelector('.card-body');
    if (cardBody) {
      gsap.to(cardBody, { 
        backgroundColor: "rgba(0, 123, 255, 0.08)", 
        duration: 0.3,
        y: 5 // Slight shift for depth
      });
    }
    
    // Enhance button
    const button = card.querySelector('button.btn-primary');
    if (button) {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        background: '#0069d9',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
      });
    }
    
    // Start tracking mouse for tilt effect
    card.addEventListener('mousemove', calculateTilt);
  });
  
  card.addEventListener('mouseleave', () => {
    // Remove mouse tracking
    card.removeEventListener('mousemove', calculateTilt);
    
    // Reset all effects
    gsap.to(card, { 
      y: 0, 
      scale: 1,
      z: 0,
      rotateY: 0,
      rotateX: 0,
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)", 
      duration: 0.5, 
      ease: "power3.out" 
    });
    
    // Reset shine effect
    const shine = card.querySelector<HTMLDivElement>('.shine-effect');
    if (shine) {
      gsap.to(shine, {
        opacity: 0,
        duration: 0.3
      });
    }
    
    // Reset image
    const image = card.querySelector<HTMLImageElement>('img');
    if (image) {
      gsap.to(image, { 
        scale: 1, 
        duration: 0.5, 
        ease: "power2.out" 
      });
    }
    
    // Reset card body
    const cardBody = card.querySelector<HTMLDivElement>('.card-body');
    if (cardBody) {
      gsap.to(cardBody, { 
        backgroundColor: "white", 
        duration: 0.3,
        y: 0
      });
    }
    
    // Reset button
    const button = card.querySelector<HTMLButtonElement>('button.btn-primary');
    if (button) {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        boxShadow: 'none'
      });
    }
  });
};

export const addToCartAnimation = (button: HTMLElement) => {
  const gsap = initializeGSAP();
  if (!gsap) return;
  
  gsap.to(button, { 
    scale: 1.2, 
    duration: 0.2, 
    ease: "back.out(3)" 
  });
  
  gsap.to(button, { 
    scale: 1, 
    duration: 0.3, 
    delay: 0.2, 
    ease: "power2.out" 
  });
  
  // Optional: Create a flying element to the cart icon
  const createFlyingElement = (startX: number, startY: number, endX: number, endY: number) => {
    const element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.zIndex = '9999';
    element.style.width = '20px';
    element.style.height = '20px';
    element.style.backgroundColor = '#007bff';
    element.style.borderRadius = '50%';
    element.style.pointerEvents = 'none';
    element.style.left = `${startX}px`;
    element.style.top = `${startY}px`;
    
    document.body.appendChild(element);
    
    gsap.to(element, {
      x: endX - startX,
      y: endY - startY,
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        document.body.removeChild(element);
      }
    });
  };
  
  // Example usage (would need actual coordinates in real implementation):
  // const cartIcon = document.querySelector('.cart-icon');
  // if (cartIcon) {
  //   const cartRect = cartIcon.getBoundingClientRect();
  //   const buttonRect = button.getBoundingClientRect();
  //   createFlyingElement(
  //     buttonRect.left + buttonRect.width / 2,
  //     buttonRect.top + buttonRect.height / 2,
  //     cartRect.left + cartRect.width / 2,
  //     cartRect.top + cartRect.height / 2
  //   );
  // }
};

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }
};

export const initializeParticles = (containerId: string): void => {
  if (typeof window !== 'undefined' && (window as any).particlesJS) {
    try {
      (window as any).particlesJS(containerId, {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#007bff'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            },
            polygon: {
              nb_sides: 5
            }
          },
          opacity: {
            value: 0.3,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#007bff',
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    } catch (error) {
      console.error('Error initializing particles.js:', error);
    }
  }
};
