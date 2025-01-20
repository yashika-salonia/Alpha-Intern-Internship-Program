// Store cart items in localStorage with quantity
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
cartItems = [];
localStorage.setItem('cartItems', JSON.stringify(cartItems));

// Update bag count based on total quantities
const updateBagCount = () => {
    const countElement = document.querySelector('.bag-item-count');
    const totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    countElement.innerText = totalQuantity;
};

// Format price to Indian Rupees
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price).replace('₹', 'Rs. ');
};

// Calculate total price considering quantities
const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
        const validPrice = item.price && !isNaN(item.price) ? item.price : 0;
        const validQuantity = item.quantity && !isNaN(item.quantity) ? item.quantity : 1;
        return total + validPrice * validQuantity;
    }, 0);
};

// Create quantity selector modal
const createQuantityModal = (currentQty = 1, onSelect) => {
    const modal = document.createElement('div');
    modal.className = 'quantity-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Select Quantity</h3>
                <button class="close-modal">×</button>
            </div>
            <div class="quantity-grid">
                ${Array.from({length: 10}, (_, i) => i + 1).map(num => `
                    <button class="qty-btn ${num === currentQty ? 'selected' : ''}">${num}</button>
                `).join('')}
            </div>
            <button class="done-btn">DONE</button>
        </div>
    `;

    // Add styles for quantity modal
    const styles = document.createElement('style');
    styles.textContent = `
        .quantity-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
        }
        .modal-overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
        }
        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 4px;
            width: 300px;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .close-modal {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }
        .quantity-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            margin-bottom: 20px;
        }
        .qty-btn {
            padding: 10px;
            border: 1px solid #ddd;
            background: white;
            border-radius: 50%;
            cursor: pointer;
        }
        .qty-btn.selected {
            background: #ff3f6c;
            color: white;
            border-color: #ff3f6c;
        }
        .done-btn {
            width: 100%;
            padding: 15px;
            background: #ff3f6c;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(styles);

    let selectedQty = currentQty;
    modal.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            modal.querySelectorAll('.qty-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedQty = parseInt(btn.textContent);
        });
    });

    modal.querySelector('.done-btn').addEventListener('click', () => {
        onSelect(selectedQty);
        document.body.removeChild(modal);
    });

    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    document.body.appendChild(modal);
};

// Show cart page
const showCartPage = () => {
    const cartPage = document.createElement('div');
    cartPage.className = 'cart-page';
    cartPage.innerHTML = `
        <div class="cart-overlay"></div>
        <div class="cart-container">
            <div class="cart-header">
                <h2>Shopping Bag (${cartItems.reduce((total, item) => total + (item.quantity || 1), 0)} Items)</h2>
                <button class="close-cart">×</button>
            </div>
            <div class="cart-items"></div>
            <div class="cart-footer">
                <div class="delivery-details">
                    <h3>Delivery Details</h3>
                    <div class="delivery-address">
                        <input type="text" placeholder="Enter delivery address" class="address-input">
                        <input type="text" placeholder="Pincode" class="pincode-input">
                    </div>
                </div>
                <div class="price-details">
                    <h3>Price Details</h3>
                    <div class="price-breakdown">
                        <div class="subtotal">
                            <span>Total MRP</span>
                            <span>${formatPrice(calculateTotal())}</span>
                        </div>
                        <div class="delivery">
                            <span>Delivery Charges</span>
                            <span>FREE</span>
                        </div>
                        <div class="total">
                            <span>Total Amount</span>
                            <span>${formatPrice(calculateTotal())}</span>
                        </div>
                    </div>
                    <button class="place-order">Place Order</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(cartPage);

    const styles = document.createElement('style');
    styles.textContent = `
        .cart-page {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
        }
        .cart-overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
        }
        .cart-container {
            position: absolute;
            right: 0;
            top: 0;
            width: 40%;
            height: 100%;
            background: white;
            padding: 20px;
            overflow-y: auto;
        }
        .cart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        .close-cart {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }
        .cart-item {
            display: flex;
            padding: 20px 0;
            border-bottom: 1px solid #eee;
        }
        .cart-item img {
            width: 100px;
            height: 120px;
            object-fit: cover;
        }
        .item-details {
            padding-left: 20px;
            flex-grow: 1;
        }
        .remove-item {
            background: none;
            border: none;
            color: red;
            cursor: pointer;
        }
        .cart-footer {
            margin-top: 20px;
        }
        .delivery-details, .price-details {
            padding: 20px;
            background: #f9f9f9;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        .delivery-address input {
            width: 100%;
            padding: 8px;
            margin: 5px 0;
        }
        .price-breakdown > div {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
        }
        .total {
            font-weight: bold;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
        .place-order {
            width: 100%;
            padding: 15px;
            background: #ff3f6c;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 20px;
        }
    `;
    document.head.appendChild(styles);

    // Render cart items
    const cartItemsContainer = cartPage.querySelector('.cart-items');
    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.brand}</h3>
                <p>${item.name}</p>
                <p>${formatPrice(item.price * (item.quantity || 1))}</p>
                <div class="quantity-selector">
                    <span>Qty: </span>
                    <button class="qty-toggle">${item.quantity || 1}</button>
                </div>
            </div>
            <button class="remove-item" data-index="${index}">×</button>
        `;
        cartItemsContainer.appendChild(itemElement);

        // Add quantity selector functionality
        itemElement.querySelector('.qty-toggle').addEventListener('click', () => {
            createQuantityModal(item.quantity || 1, (newQty) => {
                item.quantity = newQty;
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                updateBagCount();
                document.body.removeChild(cartPage);
                showCartPage();
            });
        });
        
        // Remove item on cross (×) click
        itemElement.querySelector('.remove-item').addEventListener('click', () => {
            cartItems.splice(index, 1); // Remove the item from the array
            localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
            updateBagCount(); // Update the bag count
            document.body.removeChild(cartPage); // Refresh the cart page
            showCartPage(); // Rebuild the cart view
        });
    });

    // Close cart logic
    cartPage.querySelector('.close-cart').addEventListener('click', () => {
        document.body.removeChild(cartPage);
    });

    // Event listeners for cart page...
    // document.body.appendChild(cartPage);
};

// Add to bag functionality
document.querySelectorAll('.btn-add-bag').forEach(button => {
    button.addEventListener('click', function() {
        const itemContainer = this.closest('.item-container');
        const priceText = itemContainer.querySelector('.current-price').textContent;
        const parsedPrice = parseInt(priceText.replace(/[^0-9]/g, ''));

        const newItem = {
            image: itemContainer.querySelector('.item-image').src,
            brand: itemContainer.querySelector('.company').textContent,
            name: itemContainer.querySelector('.item-name').textContent,
            price: !isNaN(parsedPrice) ? parsedPrice : 0, // Ensure price is valid
            quantity: 1
        };
        
        // Check if item already exists in cart
        const existingItemIndex = cartItems.findIndex(item => 
            item.name === newItem.name && 
            item.brand === newItem.brand
        );

        if (existingItemIndex !== -1) {
            // Increment quantity if item exists
            cartItems[existingItemIndex].quantity = (cartItems[existingItemIndex].quantity || 1) + 1;
        } else {
            // Add new item if it doesn't exist
            cartItems.push(newItem);
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateBagCount();
    });
});

// Initialize other event listeners...
document.querySelector('#shopping-bag').addEventListener('click', (e) => {
    e.preventDefault();
    showCartPage();
});

// Initialize bag count on page load
updateBagCount();