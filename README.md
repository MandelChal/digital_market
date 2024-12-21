# Digital Market

A responsive e-commerce web application for browsing and purchasing a wide variety of products across diverse categories.

## Features

- **Search**: Effortlessly search for products using the intuitive search bar.
- **Filter by Price and Rating**: Refine search results by setting minimum and maximum price ranges or selecting a rating.
- **Product Categories**: Explore a curated selection of categories such as beauty, fragrances, furniture, groceries, home decoration, kitchen accessories, laptops, men's shirts, and men's shoes.
- **Product Listing**: Each product is displayed with its name, price, and an accompanying image.
- **Shopping Cart and Wishlist**: Add products to your cart or wishlist for convenient future purchases.
- **Responsive Design**: Optimized for seamless use on both desktop and mobile devices.
- **Contact Information**: Easily access support details for any inquiries or assistance.

## Technologies Utilized

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Leveraging the DummyJSON API for dynamic data retrieval.
- **Database**: No local database required as the API provides mock data for all functionalities.

## Utilizing the DummyJSON API

This application employs the DummyJSON API to fetch mock data for products, categories, and other related content, enabling thorough application testing prior to transitioning to live data.

### Examples of API Usage:

- **Loading Categories**:
  ```javascript
  const response = await fetch('https://dummyjson.com/products/category-list');

  Fetching Single Product Details:

javascript
Copy code
const response = await fetch(`https://dummyjson.com/products/${id}`);
Fetches detailed information about a specific product based on its ID.

Product Search:

javascript
Copy code
const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
Executes a search query to retrieve matching products.

Loading All Products:

javascript
Copy code
const response = await fetch('https://dummyjson.com/products');
Retrieves a comprehensive list of all products.

The DummyJSON API provides mock data for products, categories, and more, facilitating application development and testing before live deployment.

Getting Started
Prerequisites
Ensure your system meets the following requirements:

A modern web browser
Active internet connection (for API requests)
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/your-username/digital-market.git
Navigate to the project directory:
bash
Copy code
cd digital-market
Open the index.html file in your web browser.
Project Structure
bash
Copy code
digital-market/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # CSS for styling
├── js/
│   └── script.js       # JavaScript for interactivity
├── images/
│   └── [Product images and icons]
└── README.md           # Project documentation

Future Enhancements
* Implement user authentication and profile management.
* Integrate secure payment gateways for transactions.
* Add user reviews and ratings for products.
* Optimize performance to enhance loading speeds.
