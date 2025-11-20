let cart = JSON.parse(localStorage.getItem('cart')) || [];

async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();
        
        const productsList = document.getElementById('productsList');
        productsList.innerHTML = '';

        if (products.length === 0) {
            productsList.innerHTML = '<p class="text-center">No products available.</p>';
            return;
        }

        products.forEach(product => {
            const productCard = `
                <div class="col-md-4 mb-4">
                    <div class="card product-card h-100">
                        <img src="${product.image || 'https://via.placeholder.com/300x200?text=No+Image'}" 
                             class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text flex-grow-1">${product.description}</p>
                            <div class="mt-auto">
                                <p class="card-text"><strong>$${product.price}</strong></p>
                                <button class="btn btn-primary" onclick="addToCart('${product._id}', '${product.name}', ${product.price})">
                                    🛒 Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            productsList.innerHTML += productCard;
        });
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('productsList').innerHTML = '<p class="text-center text-danger">Error loading products. Make sure the server is running.</p>';
    }
}

function addToCart(productId, productName, productPrice) {
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('✅ ' + productName + ' added to cart!');
}

// Load products when page loads
document.addEventListener('DOMContentLoaded', loadProducts);