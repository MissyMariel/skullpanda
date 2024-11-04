let cartCount = 0;
let cartItems = [];

// Search functionality
document.querySelector('.search-bar input').addEventListener('keyup', function(event) {
    const searchTerm = event.target.value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productName = product.querySelector('.product-name').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = button.parentElement;
        const productName = product.querySelector('.product-name').textContent;
        const productPrice = parseFloat(product.querySelector('.product-price').textContent.replace('$', ''));

        cartCount++;
        document.getElementById('cart-count').textContent = cartCount;
        cartItems.push({ name: productName, price: productPrice });
        alert('Item added to cart!');
    });
});

// Cart modal functionality
const cartButton = document.getElementById('cart-button');
const modal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.close');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const checkoutButton = document.getElementById('checkout-button');

// Show cart modal
cartButton.addEventListener('click', function() {
    cartItemsContainer.innerHTML = ''; // Clear previous items
    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        totalPrice += item.price;
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.textContent = `${item.name} - $${item.price.toFixed(2)}`;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Remove';
        deleteButton.onclick = function() {
            cartItems.splice(index, 1); // Remove item from cart
            cartCount--;
            document.getElementById('cart-count').textContent = cartCount;
            alert(`${item.name} removed from cart!`);
            cartButton.click(); // Refresh the cart display
        };

        itemElement.appendChild(deleteButton);
        cartItemsContainer.appendChild(itemElement);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
    modal.style.display = 'block';
});

// Close modal
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Checkout functionality
checkoutButton.addEventListener('click', function() {
    if (cartCount > 0) {
        alert(`Thank you for your purchase! Total: $${totalPriceElement.textContent}`);
        cartItems = []; // Clear the cart
        cartCount = 0;
        document.getElementById('cart-count').textContent = cartCount;
        modal.style.display = 'none'; // Close the modal
    } else {
        alert('Your cart is empty!');
    }
});

// Navigation functionality
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(nav => nav.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        link.classList.add('active');
        const target = document.querySelector(link.getAttribute('href'));
        target.classList.add('active');
    });
});
