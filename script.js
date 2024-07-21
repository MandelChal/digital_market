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
    // פונקציה להוספת מוצר לרשימת הלייקים
    function toggleFavorite(productId) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favorites.includes(productId)) {
            favorites = favorites.filter(id => id !== productId);
        } else {
            favorites.push(productId);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        loadFavorites();
    }

    // פונקציה לטעינת המוצרים שסומנו בלייק
    function loadFavorites() {
        const favoritesContent = document.getElementById('favorites-content');
        if (favoritesContent) {
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            fetch('https://dummyjson.com/products')
                .then(response => response.json())
                .then(data => {
                    const favoriteProducts = data.products.filter(product => favorites.includes(product.id));
                    displayFavoriteProducts(favoriteProducts);
                });
        }
    }

    // פונקציה להצגת המוצרים שסומנו בלייק
    function displayFavoriteProducts(products) {
        const favoritesItems = document.getElementById('favorites-items');
        favoritesItems.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>₪${product.price}</p>
        `;
            favoritesItems.appendChild(productCard);
        });
    }

    // הוספת אירוע לחיצה על כפתור הלייק
    document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains('toggle-favorite')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            toggleFavorite(productId);
            e.target.classList.toggle('favorited');
        }
    });

    // הצגת מוצרים
    function displayProducts(products) {
        contentDiv.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>₪${product.price}</p>
            <button class="toggle-favorite" data-id="${product.id}">&#9825;</button>
        `;
            contentDiv.appendChild(productCard);
        });
    }

    // קריאה לפונקציה לטעינת לייקים כשהדף נטען
    loadFavorites();



    // Map of category to image URL
    const categoryImages = {
        'beauty': 'https://icons.iconarchive.com/icons/atyourservice/service-categories/128/Makeup-icon.png',
        'fragrances': 'https://icons.iconarchive.com/icons/iconarchive/mothers-day/128/Perfume-Bottle-icon.png',
        'furniture': 'https://icons.iconarchive.com/icons/visualpharm/office-space/128/chair-icon.png',
        'groceries': 'https://icons.iconarchive.com/icons/fixicon/market/128/flour-icon.png',
        'home-decoration': '                                                        ',
        'kitchen-accessories': 'https://icons.iconarchive.com/icons/julie-henriksen/kitchen/128/Cutlery-Spoon-Fork-Knife-icon.png',
        'laptops': 'https://icons.iconarchive.com/icons/media-design/hydropro-v2/128/Laptop-icon.png',
        'mens-shirts': '                                                        ',
        'mens-shoes': 'https://icons.iconarchive.com/icons/mattrich/adidas/128/Adidas-Shoe-icon.png',
        'tops': 'https://icons.iconarchive.com/icons/google/noto-emoji-people-clothing-objects/128/12183-dress-icon.png',
        'mobile-accessories': 'https://icons.iconarchive.com/icons/iconshock/dj/128/headset-icon.png',
        'motorcycle': '                                                               ',
        'skin-care': 'https://icons.iconarchive.com/icons/robinweatherall/cleaning/128/bottles-icon.png',
        'smartphones': 'https://icons.iconarchive.com/icons/kyo-tux/aeon/128/Extras-iPhone-icon.png',
        'sports-accessories': 'https://icons.iconarchive.com/icons/kevin-andersson/sportset/128/Soccer-icon.png',
        'sunglasses': 'https://icons.iconarchive.com/icons/proycontec/beach/128/sunglasses-icon.png',
        'tablets': '                                                           ',
        'mens-watches': 'https://icons.iconarchive.com/icons/r34n1m4ted/chanel/128/WATCH-icon.png',
        'vehicle': 'https://icons.iconarchive.com/icons/cemagraphics/classic-cars/128/vw-beetle-icon.png',
        'womens-bags': '                                                       ',
        'womens-jewellery': '                                                            ',
        'womens-dresses': '                                                          ',
        'womens-shoes': 'https://icons.iconarchive.com/icons/google/noto-emoji-people-clothing-objects/128/12197-high-heeled-shoe-icon.png',
        'womens-watches': '                                                                  '






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
                            <img src="${categoryImages[category]}"  class="category-image"><ar\>
                            
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
                    <div class="product-page">
                        <div class="product-image-section">
                            <h2>${product.title}</h2>
                            <p>${product.description}</p>
                            <p>₪${product.price}</p>
                            <div id="product-image-container">
                                <button id="prev-image"> < </button>
                                <div id="product-images">
                                    <img src="${product.images[currentImageIndex]}" alt="${product.title}">
                                </div>
                                <button id="next-image"> > </button>
                            </div>
                        </div>
                        <div class="product-info-section">
                            <button id="add-to-cart">הוסף לסל קניות</button>
                            <div id="product-reviews">
                                <h3>הערות רוכשים</h3>
                            </div>
                        </div>
                    </div>
                `;

                const productImage = document.querySelector('#product-images img');

                document.getElementById('add-to-cart').addEventListener('click', () => addToCart(product));
                document.getElementById('prev-image').addEventListener('click', () => {
                    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : product.images.length - 1;
                    productImage.src = product.images[currentImageIndex];
                });
                document.getElementById('next-image').addEventListener('click', () => {
                    currentImageIndex = (currentImageIndex < product.images.length - 1) ? currentImageIndex + 1 : 0;
                    productImage.src = product.images[currentImageIndex];
                });

                const reviewsDiv = document.getElementById('product-reviews');
                if (product.reviews && product.reviews.length > 0) {
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
                } else {
                    reviewsDiv.innerHTML += '<p>אין ביקורות זמינות לפריט זה.</p>';
                }
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