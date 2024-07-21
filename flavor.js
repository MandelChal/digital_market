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
});
