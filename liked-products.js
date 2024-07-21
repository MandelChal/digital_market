document.addEventListener('DOMContentLoaded', function () {
    const likedProductsList = document.getElementById('liked-products-list');

    // פונקציה לעדכון רשימת המוצרים האהובים
    function updateLikedProductsList() {
        const likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
        likedProductsList.innerHTML = '';
        likedProducts.forEach(product => {
            const li = document.createElement('li');
            li.classList.add('product-card');
            li.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>₪${product.price}</p>
              
            `;
            likedProductsList.appendChild(li);
        });



    }
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeProductFromList(productId);
        });
    });

    // עדכון רשימת המוצרים האהובים בדף
    updateLikedProductsList();
});
