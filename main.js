document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('botao-carrinho');
    const modal = document.getElementById('cart-modal');
    const closeButton = document.querySelector('.close-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const finalizeButton = document.querySelector('.checkout-btn');
    let cartItems = [];

    const openModal = () => {
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
        renderCartItems();
    };

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    };

    cartButton.addEventListener('click', openModal);

    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    finalizeButton.addEventListener('click', () => {
        alert('OBRIGADO POR COMPRAR CONOSCO!');
        cartItems = [];
        renderCartItems();
        closeModal();
    });

    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({...item, quantity: 1});
        }

        alert('Item adicionado ao carrinho!');
        renderCartItems();
    };

    const renderCartItems = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="item-info">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <p>${item.name} - R$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button class="remove-btn" data-index="${index}">Remover</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        const totalElement = document.createElement('div');
        totalElement.classList.add('cart-total');
        totalElement.innerHTML = `<p>Total: R$${total.toFixed(2)}</p>`;
        cartItemsContainer.appendChild(totalElement);

        const cartItemImages = document.querySelectorAll('.cart-item-image');
        cartItemImages.forEach(image => {
            image.style.maxWidth = '100px';
            image.style.marginRight = '10px';
            image.style.verticalAlign = 'middle'; 
        });

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const itemIndex = event.target.getAttribute('data-index');
                removeFromCart(itemIndex);
            });
        });
    };

    const removeFromCart = (index) => {
        cartItems.splice(index, 1);
        renderCartItems();
    };

    document.querySelectorAll('.comprar-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemElement = event.target.closest('.product-item');
            const itemName = itemElement.querySelector('p').innerText;
            const itemPrice = parseFloat(event.target.getAttribute('data-preco'));
            const itemImage = itemElement.querySelector('img').getAttribute('src');
            const item = { name: itemName, price: itemPrice, image: itemImage };
            addToCart(item);
        });
    });
});
