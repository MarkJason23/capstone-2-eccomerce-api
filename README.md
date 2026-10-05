# Capstone 2 – E-Commerce REST API

A REST API for managing e-commerce products using Node.js, Express, MongoDB, and Mongoose.

## Features

- Product CRUD
- Category filtering
- Keyword search
- Input validation
- Consistent JSON error responses

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman

## Installation

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_connection_string
```

Run the application:

```bash
npm run dev
```

or:

```bash
npm start
```

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/products` | Create product |
| GET | `/api/products` | List/search/filter products |
| GET | `/api/products/:id` | Get product |
| PATCH | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

## Search & Filter

```text
GET /api/products?category=Accessories
GET /api/products?search=mouse
GET /api/products?category=Accessories&search=wireless
```

## Status Codes

- **200** – Success
- **201** – Created
- **400** – Bad Request
- **404** – Not Found
- **500** – Server Error

## Testing

Import the Postman collection:

`postman/MSTCONNECT_Capstone_2_API.postman_collection.json`

The collection includes CRUD, search/filter, and error test cases.

## Security

Never commit your real `.env` file or `MONGO_URI`.

Make sure `.env` is included in `.gitignore`.