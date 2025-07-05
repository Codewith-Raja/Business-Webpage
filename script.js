// Global Variables
let cart = [];
let cartTotal = 0;

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const cartCountElement = document.querySelector('.cart-count');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    loadCartFromStorage();
    updateCartDisplay();
});

// Initialize website functionality
function initializeWebsite() {
    // Mobile navigation toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            closeCart();
        }
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.product-card, .testimonial-card, .stat').forEach(el => {
        observer.observe(el);
    });

    // Form validation
    setupFormValidation();
}

// Mobile menu toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Handle navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}

// Cart Functions
function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    updateCartTotal();
    updateCartDisplay();
    saveCartToStorage();
    
    // Show success notification
    showNotification(`${productName} added to cart!`, 'success');
    
    // Animate cart icon
    animateCartIcon();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartTotal();
    updateCartDisplay();
    saveCartToStorage();
    showNotification('Item removed from cart!', 'info');
}

function updateQuantity(index, change) {
    const item = cart[index];
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(index);
    } else {
        updateCartTotal();
        updateCartDisplay();
        saveCartToStorage();
    }
}

function updateCartTotal() {
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
    
    // Update cart modal content
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = cart.map((item, index) => `
                <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #e9ecef;">
                    <div>
                        <h4 style="margin: 0; color: #333;">${item.name}</h4>
                        <p style="margin: 5px 0 0 0; color: #666;">₹${item.price} × ${item.quantity}</p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <button onclick="updateQuantity(${index}, -1)" style="background: #e9ecef; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">-</button>
                        <span style="font-weight: 600;">${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)" style="background: #e9ecef; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">+</button>
                        <button onclick="removeFromCart(${index})" style="background: #dc3545; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer; margin-left: 10px;">Remove</button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    // Update total
    if (cartTotalElement) {
        cartTotalElement.textContent = cartTotal;
    }
}

function openCart() {
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    
    // Simulate checkout process
    showNotification('Redirecting to checkout...', 'info');
    
    // In a real application, this would redirect to a payment gateway
    setTimeout(() => {
        showNotification('Thank you for your purchase!', 'success');
        cart = [];
        updateCartTotal();
        updateCartDisplay();
        saveCartToStorage();
        closeCart();
    }, 2000);
}

// Storage Functions
function saveCartToStorage() {
    localStorage.setItem('kdCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('kdCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartTotal();
    }
}

// Navigation Functions
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Form Functions
function setupFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function handleContactSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields!', 'error');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address!', 'error');
        return false;
    }
    
    // Simulate form submission
    const submitButton = event.target.querySelector('.btn-submit');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<div class="loading"></div> Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        event.target.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
    
    return false;
}

function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address!', 'error');
        return false;
    }
    
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    event.target.reset();
    
    return false;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Legacy Functions (for backward compatibility)
function buyNow(productName = 'Product', price = 0) {
    // Add to cart and immediately checkout
    addToCart(productName, price);
    setTimeout(() => {
        openCart();
        setTimeout(() => {
            checkout();
        }, 500);
    }, 300);
}

function submitContact(event) {
    return handleContactSubmit(event);
}

function subscribeNewsletter(event) {
    return handleNewsletterSubmit(event);
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 3000;
            max-width: 300px;
            animation: slideInRight 0.3s ease;
        ">
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        </div>
    `;
    
    // Add styles for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    return colors[type] || colors.info;
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function animateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
    }
}

// Add cart icon click handler
document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            openCart();
        });
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(handleNavbarScroll, 10));

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    // ESC key to close modal
    if (event.key === 'Escape') {
        if (cartModal.style.display === 'block') {
            closeCart();
        }
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - could be used for cart
            if (cartModal.style.display === 'block') {
                closeCart();
            }
        } else {
            // Swipe right - could be used for menu
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    }
}
