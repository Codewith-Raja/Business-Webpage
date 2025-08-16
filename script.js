// Product Data
const products = [
    {
        id: 1,
        name: "Garam Masala",
        description: "Traditional blend of warming spices perfect for curries and meat dishes",
        price: 150,
        originalPrice: 180,
        weight: "200 gm",
        rating: 150,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "spices"
    },
    {
        id: 2,
        name: "Tandoori Masala",
        description: "Aromatic spice mix for authentic tandoori dishes and grilled meats",
        price: 180,
        originalPrice: 200,
        weight: "200 gm",
        rating: 120,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "spices"
    },
    {
        id: 3,
        name: "Chaat Masala",
        description: "Tangy and spicy blend perfect for street food and snacks",
        price: 120,
        originalPrice: 150,
        weight: "200 gm",
        rating: 180,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "spices"
    },
    {
        id: 4,
        name: "Kashmiri Red Chili Powder",
        description: "Mild and vibrant red chili powder for color and flavor",
        price: 200,
        originalPrice: 250,
        weight: "200 gm",
        rating: 95,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "powders"
    },
    {
        id: 5,
        name: "Turmeric Powder",
        description: "Pure ground turmeric with anti-inflammatory properties",
        price: 100,
        originalPrice: 120,
        weight: "200 gm",
        rating: 140,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "powders"
    },
    {
        id: 6,
        name: "Cumin Seeds",
        description: "Whole cumin seeds for tempering and flavoring dishes",
        price: 140,
        originalPrice: 160,
        weight: "200 gm",
        rating: 110,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "seeds"
    },
    {
        id: 7,
        name: "Black Pepper",
        description: "Premium whole black peppercorns for grinding",
        price: 160,
        originalPrice: 180,
        weight: "200 gm",
        rating: 125,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "spices"
    },
    {
        id: 8,
        name: "Cardamom Pods",
        description: "Green cardamom pods for sweet and savory dishes",
        price: 220,
        originalPrice: 250,
        weight: "200 gm",
        rating: 88,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "spices"
    },
    {
        id: 9,
        name: "Cinnamon Sticks",
        description: "Aromatic cinnamon sticks for warm and sweet flavors",
        price: 180,
        originalPrice: 200,
        weight: "200 gm",
        rating: 95,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "spices"
    },
    {
        id: 10,
        name: "Bay Leaves",
        description: "Dried bay leaves for aromatic rice and curry dishes",
        price: 90,
        originalPrice: 110,
        weight: "200 gm",
        rating: 75,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "spices"
    },
    {
        id: 11,
        name: "Mustard Seeds",
        description: "Yellow mustard seeds for tempering and pickling",
        price: 110,
        originalPrice: 130,
        weight: "250 gm",
        rating: 92,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "seeds"
    },
    {
        id: 12,
        name: "Fenugreek Seeds",
        description: "Bitter fenugreek seeds for traditional Indian dishes",
        price: 130,
        originalPrice: 150,
        weight: "250 gm",
        rating: 85,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        category: "seeds"
    }
];

// Shopping Cart
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutModal = document.getElementById('checkoutModal');
const checkoutForm = document.getElementById('checkoutForm');
const orderSummary = document.getElementById('orderSummary');
const orderTotal = document.getElementById('orderTotal');
const mobileMenu = document.getElementById('mobileMenu');
const hamburger = document.querySelector('.hamburger');

// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY"); // You'll need to replace this with your actual EmailJS public key

// User Authentication Variables
let currentUser = null;
let otpTimer = null;
let otpCountdown = 60;
let generatedOTP = null;
let userPhoneNumber = null;
let isRegistrationMode = false;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    updateCartDisplay();
    setupCategoryFilters();
    setupSorting();
    setupSearch();
    checkUserLoginStatus();
    setupMobileMenu();
    setupSmoothScrolling();
    setupHeaderScroll();
});

// Setup Mobile Menu
function setupMobileMenu() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    if (mobileMenu.classList.contains('open')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

// Open Mobile Menu
function openMobileMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Mobile Menu
function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Setup Header Scroll Effect
function setupHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }

        lastScrollTop = scrollTop;
    });
}

// Setup Search Functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const mobileSearchInput = document.querySelector('.mobile-search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            searchProducts(query);
        });
    }
    
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            searchProducts(query);
        });
    }
}

// Search Products
function searchProducts(query) {
    if (!query) {
        displayProducts();
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    
    displayProducts(filteredProducts);
}

// Setup Category Filters
function setupCategoryFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });
}

// Filter Products by Category
function filterProducts(category) {
    let filteredProducts;
    if (category === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    displayProducts(filteredProducts);
}

// Setup Sorting
function setupSorting() {
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', function() {
        const sortBy = this.value;
        sortProducts(sortBy);
    });
}

// Sort Products
function sortProducts(sortBy) {
    let sortedProducts = [...products];
    
    switch(sortBy) {
        case 'name-asc':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        default:
            // Default order (by ID)
            sortedProducts.sort((a, b) => a.id - b.id);
    }
    
    displayProducts(sortedProducts);
}

// Display Products
function displayProducts(filteredProducts = products) {
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #d97706; margin-bottom: 1rem;"></i>
                <h3 style="color: #1a1a1a; margin-bottom: 0.5rem;">No products found</h3>
                <p style="color: #6b7280;">Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
        const saveAmount = product.originalPrice - product.price;
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-rating">${product.rating} reviews</div>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    <span class="price-current">₹${product.price}</span>
                    <span class="price-original">₹${product.originalPrice}</span>
                    ${saveAmount > 0 ? `<span class="price-save">Save ₹${saveAmount}</span>` : ''}
                </div>
                <div class="product-weight">${product.weight}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showNotification(`${product.name} added to cart!`, 'success');
    
    // Add animation to cart icon
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    showNotification('Item removed from cart', 'info');
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
        }
    }
}

// Update Cart Display
function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #6b7280;">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>Your cart is empty</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Add some products to get started!</p>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)" title="Decrease quantity">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)" title="Increase quantity">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})" title="Remove item">Remove</button>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `₹${total}`;
}

// Toggle Cart Sidebar
function toggleCart() {
    cartSidebar.classList.toggle('open');
    if (cartSidebar.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Show Checkout Modal
function showCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Update order summary
    orderSummary.innerHTML = '';
    cart.forEach(item => {
        const summaryItem = document.createElement('div');
        summaryItem.style.display = 'flex';
        summaryItem.style.justifyContent = 'space-between';
        summaryItem.style.marginBottom = '0.5rem';
        summaryItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>₹${item.price * item.quantity}</span>
        `;
        orderSummary.appendChild(summaryItem);
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    orderTotal.textContent = `₹${total}`;
    
    checkoutModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close Checkout Modal
function closeCheckout() {
    checkoutModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Handle Order Submission
checkoutForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(checkoutForm);
    const orderData = {
        customer: {
            name: formData.get('customerName'),
            phone: formData.get('customerPhone'),
            email: formData.get('customerEmail'),
            address: formData.get('customerAddress'),
            city: formData.get('customerCity'),
            pincode: formData.get('customerPincode')
        },
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        orderDate: new Date().toLocaleString()
    };
    
    // Send order notification
    sendOrderNotification(orderData);
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    
    // Close modal
    closeCheckout();
    
    // Show success message
    showNotification('Order placed successfully! We will contact you soon.', 'success');
    
    // Reset form
    checkoutForm.reset();
});

// Send Order Notification
function sendOrderNotification(orderData) {
    // Prepare order details for notification
    const orderDetails = `
🛒 NEW ORDER - KDP Masala

👤 Customer Details:
Name: ${orderData.customer.name}
Phone: ${orderData.customer.phone}
Email: ${orderData.customer.email}
Address: ${orderData.customer.address}
City: ${orderData.customer.city}
Pincode: ${orderData.customer.pincode}

📦 Order Items:
${orderData.items.map(item => `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`).join('\n')}

💰 Total Amount: ₹${orderData.total}

📅 Order Date: ${orderData.orderDate}
    `;
    
    // Send email using EmailJS
    const templateParams = {
        to_email: 'kdpkitchen.masala@gmail.com',
        to_name: 'Admin',
        from_name: 'KDP Masala Website',
        message: orderDetails,
        subject: 'New Order - KDP Masala'
    };
    
    emailjs.send('service_7x7hwkc', 'template_wdcld68', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showNotification('Order placed successfully! Admin notified.', 'success');
        }, function(error) {
            console.log('FAILED...', error);
            showNotification('Order placed but notification failed. Please check manually.', 'error');
        });
    
    // Also show order details in a modal for easy copying
    showOrderDetailsModal(orderData);
}

// Show Order Details Modal
function showOrderDetailsModal(orderData) {
    const orderDetails = `
🛒 NEW ORDER - KDP Masala

👤 Customer Details:
Name: ${orderData.customer.name}
Phone: ${orderData.customer.phone}
Email: ${orderData.customer.email}
Address: ${orderData.customer.address}
City: ${orderData.customer.city}
Pincode: ${orderData.customer.pincode}

📦 Order Items:
${orderData.items.map(item => `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`).join('\n')}

💰 Total Amount: ₹${orderData.total}

📅 Order Date: ${orderData.orderDate}
    `;
    
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.style.zIndex = '1003';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>Order Details Sent to Admin</h3>
                <button class="close-modal" onclick="this.parentElement.parentElement.parentElement.remove()" aria-label="Close modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="padding: 2rem;">
                <p style="margin-bottom: 1rem; color: #10b981; font-weight: 600;">
                    ✅ Order details have been automatically sent to admin email!
                </p>
                <div style="background: #f9fafb; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                    <h4 style="color: #1a1a1a; margin-bottom: 1rem;">Order Summary:</h4>
                    <pre style="white-space: pre-wrap; font-family: monospace; font-size: 0.9rem;">${orderDetails}</pre>
                </div>
                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button onclick="copyToClipboard(\`${orderDetails}\`)" style="flex: 1; background: #d97706; color: white; border: none; padding: 0.8rem; border-radius: 8px; cursor: pointer;">
                        <i class="fas fa-copy"></i> Copy Details
                    </button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" style="flex: 1; background: #6c757d; color: white; border: none; padding: 0.8rem; border-radius: 8px; cursor: pointer;">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Copy to Clipboard Function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Order details copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy to clipboard', 'error');
    });
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'info' ? '#3b82f6' : '#f59e0b'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        z-index: 1004;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .product-card {
        animation: fadeIn 0.6s ease;
    }
`;
document.head.appendChild(style);

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Setup Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== LOGIN/SIGNUP FUNCTIONS =====

// Show Login Modal
function showLoginModal() {
    if (currentUser) {
        // User is logged in, show logout option
        if (confirm('Do you want to logout?')) {
            logoutUser();
        }
        return;
    }
    
    const loginModal = document.getElementById('loginModal');
    loginModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    resetLoginForm();
}

// Close Login Modal
function closeLoginModal() {
    const loginModal = document.getElementById('loginModal');
    loginModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    resetLoginForm();
    clearOTPTimer();
}

// Reset Login Form
function resetLoginForm() {
    document.getElementById('phoneStep').style.display = 'block';
    document.getElementById('otpStep').style.display = 'none';
    document.getElementById('detailsStep').style.display = 'none';
    document.getElementById('phoneNumber').value = '';
    document.getElementById('otpInput').value = '';
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
    document.getElementById('userAddress').value = '';
    document.getElementById('loginModalTitle').textContent = 'Welcome Back';
    isRegistrationMode = false;
}

// Send OTP
async function sendOTP() {
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    
    // Validate phone number
    if (!phoneNumber || phoneNumber.length !== 10 || !phoneNumber.startsWith('98')) {
        showNotification('Please enter a valid Nepal mobile number starting with 98', 'error');
        return;
    }
    
    userPhoneNumber = phoneNumber;
    
    // Check if user exists
    const existingUser = localStorage.getItem(`user_${userPhoneNumber}`);
    
    if (existingUser) {
        // User exists - this is a login
        isRegistrationMode = false;
        document.getElementById('loginModalTitle').textContent = 'Welcome Back';
    } else {
        // New user - this is a registration
        isRegistrationMode = true;
        document.getElementById('loginModalTitle').textContent = 'Create Account';
    }
    
    try {
        // Show loading state
        const sendButton = document.querySelector('.login-btn');
        const originalText = sendButton.innerHTML;
        sendButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        sendButton.disabled = true;
        
        // Send OTP using a real SMS service
        const response = await sendSMSOTP(phoneNumber);
        
        if (response.success) {
            // Show OTP step
            document.getElementById('phoneStep').style.display = 'none';
            document.getElementById('otpStep').style.display = 'block';
            
            // Start OTP timer
            startOTPTimer();
            
            showNotification(`Verification code sent to +977 ${phoneNumber}`, 'success');
        } else {
            showNotification(response.message || 'Failed to send verification code', 'error');
        }
    } catch (error) {
        console.error('Error sending OTP:', error);
        showNotification('Failed to send verification code. Please try again.', 'error');
    } finally {
        // Reset button state
        const sendButton = document.querySelector('.login-btn');
        sendButton.innerHTML = originalText;
        sendButton.disabled = false;
    }
}

// Send SMS OTP using secure backend API
async function sendSMSOTP(phoneNumber) {
    try {
        // Call our secure backend API
        const response = await fetch('/api/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('SMS sent successfully:', result);
            return {
                success: true,
                message: result.message
            };
        } else {
            console.error('Failed to send SMS:', result.message);
            return {
                success: false,
                message: result.message
            };
        }
        
    } catch (error) {
        console.error('Error sending SMS:', error);
        
        // Fallback for network errors
        return {
            success: false,
            message: 'Network error. Please try again.'
        };
    }
}

// Start OTP Timer
function startOTPTimer() {
    otpCountdown = 60;
    const timerElement = document.getElementById('timerCount');
    const timerText = document.getElementById('otpTimer');
    const resendButton = document.getElementById('resendOTP');
    
    timerText.style.display = 'inline';
    resendButton.style.display = 'none';
    
    otpTimer = setInterval(() => {
        otpCountdown--;
        timerElement.textContent = otpCountdown;
        
        if (otpCountdown <= 0) {
            clearOTPTimer();
            timerText.style.display = 'none';
            resendButton.style.display = 'inline';
        }
    }, 1000);
}

// Clear OTP Timer
function clearOTPTimer() {
    if (otpTimer) {
        clearInterval(otpTimer);
        otpTimer = null;
    }
}

// Resend OTP
async function resendOTP() {
    try {
        const sendButton = document.getElementById('resendOTP');
        const originalText = sendButton.textContent;
        sendButton.textContent = 'Sending...';
        sendButton.disabled = true;
        
        const response = await sendSMSOTP(userPhoneNumber);
        
        if (response.success) {
            generatedOTP = response.otp;
            startOTPTimer();
            showNotification('Verification code resent successfully', 'success');
        } else {
            showNotification(response.message || 'Failed to resend verification code', 'error');
        }
    } catch (error) {
        console.error('Error resending OTP:', error);
        showNotification('Failed to resend verification code. Please try again.', 'error');
    } finally {
        const sendButton = document.getElementById('resendOTP');
        sendButton.textContent = originalText;
        sendButton.disabled = false;
    }
}

// Verify OTP
async function verifyOTP() {
    const enteredOTP = document.getElementById('otpInput').value.trim();
    
    if (!enteredOTP || enteredOTP.length !== 6) {
        showNotification('Please enter a valid 6-digit verification code', 'error');
        return;
    }
    
    try {
        // Call backend to verify OTP
        const response = await fetch('/api/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: userPhoneNumber,
                otp: enteredOTP
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            if (isRegistrationMode) {
                // New user - show registration form
                document.getElementById('otpStep').style.display = 'none';
                document.getElementById('detailsStep').style.display = 'block';
                document.getElementById('loginModalTitle').textContent = 'Complete Registration';
            } else {
                // Existing user - login directly
                const existingUser = JSON.parse(localStorage.getItem(`user_${userPhoneNumber}`));
                loginUser(existingUser);
            }
            
            clearOTPTimer();
        } else {
            showNotification(result.message || 'Invalid verification code. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        showNotification('Network error. Please try again.', 'error');
    }
}

// Complete Registration
function completeRegistration() {
    const userName = document.getElementById('userName').value.trim();
    const userEmail = document.getElementById('userEmail').value.trim();
    const userAddress = document.getElementById('userAddress').value.trim();
    
    if (!userName || !userAddress) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        phone: userPhoneNumber,
        name: userName,
        email: userEmail,
        address: userAddress,
        registeredAt: new Date().toISOString()
    };
    
    // Save user to localStorage
    localStorage.setItem(`user_${userPhoneNumber}`, JSON.stringify(newUser));
    
    // Login user
    currentUser = newUser;
    loginUser(newUser);
}

// Login User
function loginUser(user) {
    currentUser = user;
    document.getElementById('userStatus').textContent = user.name;
    closeLoginModal();
    showNotification(`Welcome back, ${user.name}!`, 'success');
    
    // Update checkout form with user details
    updateCheckoutForm();
}

// Logout User
function logoutUser() {
    currentUser = null;
    document.getElementById('userStatus').textContent = 'Login';
    showNotification('Logged out successfully', 'info');
    
    // Clear checkout form
    clearCheckoutForm();
}

// Check User Login Status
function checkUserLoginStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        document.getElementById('userStatus').textContent = currentUser.name;
    }
}

// Update Checkout Form with User Details
function updateCheckoutForm() {
    if (currentUser) {
        document.getElementById('customerName').value = currentUser.name;
        document.getElementById('customerPhone').value = currentUser.phone;
        document.getElementById('customerEmail').value = currentUser.email || '';
        document.getElementById('customerAddress').value = currentUser.address;
    }
}

// Clear Checkout Form
function clearCheckoutForm() {
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('customerEmail').value = '';
    document.getElementById('customerAddress').value = '';
    document.getElementById('customerCity').value = '';
    document.getElementById('customerPincode').value = '';
}

// Navigation Functions
function backToPhone() {
    document.getElementById('otpStep').style.display = 'none';
    document.getElementById('phoneStep').style.display = 'block';
    clearOTPTimer();
}

function backToOTP() {
    document.getElementById('detailsStep').style.display = 'none';
    document.getElementById('otpStep').style.display = 'block';
    startOTPTimer();
} 
