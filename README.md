# E-Commerce Backend API

This is a Node.js + Express backend API for an e-commerce platform built with MongoDB and Mongoose. It handles core e-commerce features including product management, cart handling, order placement, and order history tracking.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Design Decisions](#design-decisions)
- [Future Plans](#future-plans)

---

## Features

- **Product CRUD:** Add, update, or fetch products with stock control.
- **Cart System:** Add items to cart with quantity management. Each user has one cart.
- **Order (Buy Now):** Place a single-item order directly, with stock checks.
- **Order from Cart:** Place an order for multiple items in the cart after validating product existence and stock availability.
- **Order History:** Track what a user has ordered and the status of each item (pending, delivered, etc.).
- **Race Condition Handling:** Prevent issues like double-decrementing stock or outdated stock reads.
- **Basic Error Handling:** Errors are reported clearly (e.g. "Product not found", "Not enough stock").

---

## Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** (Assumes `req.user` is set by middleware — to be implemented)  
- **Version Control:** Git

---

## Setup & Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/ecommerce-backend.git
   cd ecommerce-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add `.env` file for DB connection:
   ```
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## API Endpoints (Work In Progress)

### Product Routes
- `GET /products`
- `POST /products` (admin only)

### Cart Routes
- `POST /cart/add` – Add item to user’s cart
- `GET /cart/:userId`

### Order Routes
- `POST /order/single` – "Buy now" for single item
- `POST /order/cart` – Order all items from cart
- `GET /order/history/:userId` – View order history

---

## Data Models

### Product
```js
{
  name: String,
  stock: Number,
  price: Number
}
```

### Cart
```js
{
  user: ObjectId,
  items: [{ product: ObjectId, quantity: Number }]
}
```

### Order (History)
```js
{
  user: ObjectId,
  orderItem: [{ product: ObjectId, quantity: Number }],
  orderStatus: "pending" | "shipped" | "delivered",
  createdAt: Date
}
```

---

## Design Decisions

- **Separation of cart vs. order:** Ordering from cart mimics real-world user behavior. Cart is only a draft — order is final.
- **"Buy Now" vs. Cart-Based Checkout:** The project supports both. Cart checkout is more realistic for batch purchasing.
- **Stock Validation:** Before placing an order, every product is verified for existence and sufficient stock. Stock is only reduced if all checks pass.
- **Race Conditions:** Handled by using `findOneAndUpdate` with condition-based matching and `$inc` atomic updates.
- **No silent failures:** The system clearly notifies if a product is missing or has insufficient stock — the order is aborted if anything is invalid.

---

## Future Plans

- [ ] Implement JWT-based authentication
- [ ] Add user registration/login
- [ ] Implement Mongoose transaction support for full ACID compliance
- [ ] Add admin role for managing products and orders
- [ ] Add shipping/billing address handling
- [ ] Add Stripe or PayPal integration for real payments
- [ ] Paginated product search and filtering

---

## Contributing

If you're learning or want to improve this project, feel free to fork it, play with the code, and make suggestions.

---

## License

MIT License – free to use and modify.
