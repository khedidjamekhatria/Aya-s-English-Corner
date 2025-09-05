// Enhanced JavaScript for Aya's English Corner - Mobile Responsive Features

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const cta = document.querySelector('.cta');
    
    // Insert menu toggle before CTA
    if (cta && navbar) {
        navbar.insertBefore(menuToggle, cta);
    }
    
    // Mobile menu functionality
    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        this.setAttribute('aria-expanded', !isExpanded);
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on links
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe service items and course items for animations
    document.querySelectorAll('.service-item, .course-item').forEach(item => {
        item.classList.add('animate-on-scroll');
        observer.observe(item);
    });
    
    // Lazy loading for images
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    // Apply lazy loading to images (modify HTML to use data-src)
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
    
    // Enhanced video controls for mobile
    document.querySelectorAll('video').forEach(video => {
        // Add play/pause on tap for mobile
        video.addEventListener('click', function() {
            if (this.paused) {
                this.play();
            } else {
                this.pause();
            }
        });
        
        // Prevent video from playing automatically on mobile
        if (window.innerWidth <= 768) {
            video.removeAttribute('autoplay');
        }
    });
    
    // Optimize images for different screen sizes
    function optimizeImages() {
        const images = document.querySelectorAll('img');
        const devicePixelRatio = window.devicePixelRatio || 1;
        const screenWidth = window.innerWidth * devicePixelRatio;
        
        images.forEach(img => {
            if (img.dataset.responsive) {
                let optimalSrc = img.dataset.responsive;
                
                if (screenWidth <= 480) {
                    optimalSrc = img.dataset.small || optimalSrc;
                } else if (screenWidth <= 768) {
                    optimalSrc = img.dataset.medium || optimalSrc;
                } else if (screenWidth <= 1200) {
                    optimalSrc = img.dataset.large || optimalSrc;
                }
                
                if (img.src !== optimalSrc) {
                    img.src = optimalSrc;
                }
            }
        });
    }
    
    // Call on load and resize
    optimizeImages();
    window.addEventListener('resize', optimizeImages);
    
    // Touch gestures for testimonials carousel (if needed)
    const testimonialsSection = document.querySelector('#testimonials');
    if (testimonialsSection) {
        let startX = 0;
        let currentIndex = 0;
        
        testimonialsSection.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });
        
        testimonialsSection.addEventListener('touchend', function(e) {
            const endX = e.changedTouches[0].clientX;
            const difference = startX - endX;
            
            if (Math.abs(difference) > 50) {
                if (difference > 0) {
                    // Swipe left - next testimonial
                    console.log('Next testimonial');
                } else {
                    // Swipe right - previous testimonial
                    console.log('Previous testimonial');
                }
            }
        });
    }
    
    // Performance monitoring
    function measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', function() {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    
                    if (loadTime > 3000) {
                        console.warn('Page load time is high:', loadTime + 'ms');
                        // You could send this data to analytics
                    }
                }, 0);
            });
        }
    }
    
    measurePerformance();
    
    // Accessibility improvements
    function enhanceAccessibility() {
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main landmark if it doesn't exist
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main';
        }
        
        // Improve focus management
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                menuToggle.click();
                menuToggle.focus();
            }
        });
    }
    
    enhanceAccessibility();
    
    // Progressive Web App features
    function initPWA() {
        // Register service worker if available
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log('SW registered'))
                .catch(err => console.log('SW registration failed'));
        }
        
        // Handle install prompt
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Show install button
            const installBtn = document.createElement('button');
            installBtn.textContent = 'Install App';
            installBtn.className = 'btn btn-primary install-btn';
            installBtn.style.position = 'fixed';
            installBtn.style.bottom = '20px';
            installBtn.style.right = '20px';
            installBtn.style.zIndex = '1000';
            
            installBtn.addEventListener('click', async () => {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    const result = await deferredPrompt.userChoice;
                    deferredPrompt = null;
                    installBtn.remove();
                }
            });
            
            document.body.appendChild(installBtn);
            
            // Auto-hide after 10 seconds
            setTimeout(() => {
                if (installBtn.parentNode) {
                    installBtn.remove();
                }
            }, 10000);
        });
    }
    
    // Only initialize PWA features if on HTTPS
    if (location.protocol === 'https:') {
        initPWA();
    }
    
    // Handle form submissions (if any forms are added)
    document.addEventListener('submit', function(e) {
        const form = e.target;
        if (form.tagName === 'FORM') {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }
        }
    });
    
    // Dynamic viewport height fix for mobile browsers
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
});

// Utility functions
const utils = {
    // Debounce function for performance
    debounce: function(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { utils };
}
  // Sections and nav links
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links li a");

  window.addEventListener("scroll", () => {
        let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // padding for navbar
    const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
