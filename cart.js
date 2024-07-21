document.addEventListener('DOMContentLoaded', () => {
    const cartItemsDiv = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout');
    const totalAmountP = document.getElementById('total-amount');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        totalAmountP.innerHTML = '';
        checkoutButton.style.display = 'none'; // Hide the checkout button if the cart is empty
        return;
    }

    let totalAmount = 0;

    cart.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>₪${product.price}</p>
            <div class="quantity-control">
                <button class="decrease-quantity" data-id="${product.id}">-</button>
                <span class="quantity">&nbsp;&nbsp;&nbsp${product.quantity}&nbsp;&nbsp;&nbsp</span>
                <button class="increase-quantity" data-id="${product.id}">+</button>
            </div>
            <button class="remove-item" data-id="${product.id}">Remove</button>
        `;
        cartItemsDiv.appendChild(productCard);
        totalAmount += product.price * product.quantity;
    });

    totalAmount = roundToTwo(totalAmount);
    totalAmountP.innerHTML = `Total amount: ₪${totalAmount}`;

    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            updateQuantity(productId, 1);
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            updateQuantity(productId, -1);
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });

    checkoutButton.addEventListener('click', checkout);
});

function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(p => p.id === productId);

    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload();
        }
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item removed from cart');
    location.reload();
}

function checkout() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = `
        <div class="checkout-container">
            <h2>טופס הזמנה</h2>
            <form id="checkout-form">
                <div class="form-group">
                    <label for="name">Full name</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="address">Shipping address:</label>
                    <input type="text" id="address" required>
                </div>
                <div class="form-group">
                    <label for="credit-card">Credit card number:</label>
                    <input type="text" id="credit-card" required>
                </div>
                <div class="form-group">
                    <label for="expiry">Expiration date:</label>
                    <input type="text" id="expiry" placeholder="MM/YY" required>
                </div>
                <div class="form-group">
                    <label for="cvv">CVV:</label>
                    <input type="text" id="cvv" required>
                </div>
                <div class="credit-card-icons">
                    <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" alt="Visa">
                    <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" alt="MasterCard">
                    <img src="https://cdn-icons-png.flaticon.com/128/349/349230.png" alt="American Express">
                </div>
                <button type="submit">Payment confirmation</button>
            </form>
        </div>
    `;

    // להסתיר את כפתור "לתשלום" לאחר טעינת הטופס
    document.getElementById('checkout').style.display = 'none';

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Your purchase was successful! The items are on their way to you.');

        localStorage.removeItem('cart');

        // הצגת ה-GIF
        cartItemsDiv.innerHTML = `
            <div class="success-container">
                <h3>Thank you for shopping with us!</h3>
                <h2>Your cart is empty</h2>
                <img src="https://cdn.dribbble.com/users/249246/screenshots/2958948/shopping.gif" alt="Successful Purchase">
            </div>
        `;

        // להסתיר את כפתור "לתשלום"
        document.getElementById('checkout').style.display = 'none';
    });
}

function roundToTwo(num) {
    return Math.round(num * 100) / 100;
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(p => p.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.title} Added to cart`);
}
