document.addEventListener('DOMContentLoaded', () => {
    const categoriesDiv = document.getElementById('categories');
    const contentDiv = document.getElementById('content');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const homeLink = document.getElementById('home-link');
    const filterButton = document.getElementById('filter-button');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const ratingSelect = document.getElementById('rating');

    // Map of category to image URL
    const categoryImages = {
        'beauty': 'https://icons.iconarchive.com/icons/atyourservice/service-categories/128/Makeup-icon.png',
        'fragrances': 'https://icons.iconarchive.com/icons/iconarchive/mothers-day/128/Perfume-Bottle-icon.png',
        'furniture': 'https://icons.iconarchive.com/icons/visualpharm/office-space/128/chair-icon.png',
        'groceries': 'https://icons.iconarchive.com/icons/fixicon/market/128/flour-icon.png',
        'home-decoration': 'https://www.iconninja.com/files/37/794/498/lamp-icon.png',
        'kitchen-accessories': 'https://icons.iconarchive.com/icons/julie-henriksen/kitchen/128/Cutlery-Spoon-Fork-Knife-icon.png',
        'laptops': 'https://icons.iconarchive.com/icons/media-design/hydropro-v2/128/Laptop-icon.png',
        'mens-shirts': 'https://icons.iconarchive.com/icons/michael/nike/256/Nike-Shirt-16-icon.png',
        'mens-shoes': 'https://icons.iconarchive.com/icons/mattrich/adidas/128/Adidas-Shoe-icon.png',
        'mobile-accessories': 'https://icons.iconarchive.com/icons/iconshock/dj/128/headset-icon.png',
        'motorcycle': 'https://www.iconninja.com/files/104/763/828/motorcycle-icon.png',
        'skin-care': 'https://icons.iconarchive.com/icons/robinweatherall/cleaning/128/bottles-icon.png',
        'smartphones': 'https://icons.iconarchive.com/icons/kyo-tux/aeon/128/Extras-iPhone-icon.png',
        'sports-accessories': 'https://icons.iconarchive.com/icons/kevin-andersson/sportset/128/Soccer-icon.png',
        'sunglasses': 'https://icons.iconarchive.com/icons/proycontec/beach/128/sunglasses-icon.png',
        'tablets': 'https://www.iconninja.com/files/296/413/283/tablet-icon.png',
        'tops': 'https://icons.iconarchive.com/icons/google/noto-emoji-people-clothing-objects/128/12183-dress-icon.png',





        // Add more categories and their images here
    };

    function loadHomePage() {
        categoriesDiv.innerHTML = '';  // Clear existing categories
        contentDiv.innerHTML = '';     // Clear existing products

        fetch('https://dummyjson.com/products/category-list')
            .then(response => response.json())
            .then(categories => {
                categories.forEach(category => {
                    const categoryCard = document.createElement('div');
                    categoryCard.className = 'category-card';

                    // Check if the category has a corresponding image
                    if (categoryImages[category]) {
                        categoryCard.innerHTML = `
                            <img src="${categoryImages[category]}"  class="category-image">
                            <p>${category}</p>
                        `;
                    } else {
                        categoryCard.textContent = category;
                    }

                    categoryCard.addEventListener('click', () => loadCategory(category));
                    categoriesDiv.appendChild(categoryCard);

                    fetch(`https://dummyjson.com/products/category/${category}`)
                        .then(response => response.json())
                        .then(data => {
                            const products = data.products.slice(0, 1);  // Display only 3 products per category
                            products.forEach(product => {
                                const productCard = document.createElement('div');
                                productCard.className = 'product-card';
                                productCard.innerHTML = `
                                    <img src="${product.thumbnail}" alt="${product.title}">
                                    <h3>${product.title}</h3>
                                    <p>₪${product.price}</p>
                                `;
                                productCard.addEventListener('click', () => loadProduct(product.id));
                                contentDiv.appendChild(productCard);
                            });
                        });
                });
            });
    }

    loadHomePage();

    function loadCategory(category) {
        fetch(`https://dummyjson.com/products/category/${category}`)
            .then(response => response.json())
            .then(data => {
                categoriesDiv.style.display = 'flex';  // Ensure categories are visible
                displayProducts(data.products);
            });
    }

    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        if (query) {
            fetch(`https://dummyjson.com/products/search?q=${query}`)
                .then(response => response.json())
                .then(data => {
                    categoriesDiv.style.display = 'flex';  // Ensure categories are visible
                    displayProducts(data.products);
                });
        }
    });

    filterButton.addEventListener('click', () => {
        const minPrice = minPriceInput.value;
        const maxPrice = maxPriceInput.value;
        const rating = ratingSelect.value;

        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => {
                let filteredProducts = data.products;

                if (minPrice) {
                    filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
                }

                if (maxPrice) {
                    filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
                }

                if (rating) {
                    filteredProducts = filteredProducts.filter(product => product.rating >= rating);
                }

                categoriesDiv.style.display = 'flex';  // Ensure categories are visible
                displayProducts(filteredProducts);
            });
    });

    function displayProducts(products) {
        contentDiv.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>₪${product.price}</p>
            `;
            productCard.addEventListener('click', () => loadProduct(product.id));
            contentDiv.appendChild(productCard);
        });
    }

    function loadProduct(productId) {
        fetch(`https://dummyjson.com/products/${productId}`)
            .then(response => response.json())
            .then(product => {
                let currentImageIndex = 0;
                contentDiv.innerHTML = `
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <p>₪${product.price}</p>
                    <div id="product-images">
                        <img src="${product.images[currentImageIndex]}" alt="${product.title}">
                    </div>
                    <button id="prev-image">תמונה קודמת</button>
                    <button id="next-image">תמונה הבאה</button>
                    <button id="add-to-cart">הוסף לסל קניות</button>
                    <div id="product-reviews">
                        <h3>הערות רוכשים</h3>
                    </div>
                `;

                document.getElementById('add-to-cart').addEventListener('click', () => addToCart(product));
                document.getElementById('prev-image').addEventListener('click', () => {
                    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : product.images.length - 1;
                    document.querySelector('#product-images img').src = product.images[currentImageIndex];
                });
                document.getElementById('next-image').addEventListener('click', () => {
                    currentImageIndex = (currentImageIndex < product.images.length - 1) ? currentImageIndex + 1 : 0;
                    document.querySelector('#product-images img').src = product.images[currentImageIndex];
                });

                const reviewsDiv = document.getElementById('product-reviews');
                product.reviews.forEach(review => {
                    const reviewDiv = document.createElement('div');
                    reviewDiv.className = 'review';
                    reviewDiv.innerHTML = `
                        <p><strong>${review.reviewerName}</strong></p>
                        <p>${review.comment}</p>
                        <p>דירוג: ${review.rating}</p>
                    `;
                    reviewsDiv.appendChild(reviewDiv);
                });
            });
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
        alert(`${product.title} נוסף לסל הקניות!`);
    }

    homeLink.addEventListener('click', (event) => {
        event.preventDefault();
        categoriesDiv.style.display = 'flex';  // Show categories
        loadHomePage();  // Load the homepage content
    });
});
