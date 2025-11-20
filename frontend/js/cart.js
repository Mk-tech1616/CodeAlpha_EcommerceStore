let cart = JSON.parse(localStorage.getItem('cart')) || [];

function loadCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center">Your cart is empty.</p>';
        cartTotal.textContent = '0.00';
        return;
    }

    let total = 0;
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item row align-items-center">
                <div class="col-md-6">
                    <h5>${item.name}</h5>
                    <p>$${item.price} each</p>
                </div>
                <div class="col-md-3">
                    <div class="input-group">
                        <button class="btn btn-outline-secondary" onclick="updateQuantity(${index}, -1)">-</button>
                        <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                        <button class="btn btn-outline-secondary" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="col-md-2">
                    <strong>$${itemTotal.toFixed(2)}</strong>
                </div>
                <div class="col-md-1">
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">×</button>
                </div>
            </div>
        `;
    });

    cartTotal.textContent = total.toFixed(2);
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

async function checkout() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        alert('❌ Please login to checkout');
        window.location.href = 'login.html';
        return;
    }

    if (cart.length === 0) {
        alert('❌ Your cart is empty');
        return;
    }

    try {
        const orderItems = cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            product: item.productId
        }));

        const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                orderItems,
                totalPrice
            })
        });

        if (response.ok) {
            alert('✅ Order placed successfully!');
            localStorage.removeItem('cart');
            cart = [];
            loadCart();
        } else {
            const error = await response.json();
            alert('❌ ' + error.message);
        }
    } catch (error) {
        alert('❌ Checkout failed: ' + error.message);
    }
}

// Load cart when page loads
document.addEventListener('DOMContentLoaded', loadCart);