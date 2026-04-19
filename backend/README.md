# Shah Jewellery Backend

Complete REST API backend for the Shah Jewellery website built with Node.js, Express.js, and SQLite (sql.js).

## Features

- **JWT Authentication** — Secure admin login with bcrypt password hashing
- **Product Management** — Full CRUD for jewellery products with filtering
- **Contact Inquiries** — Handle customer contact form submissions
- **Testimonials** — Customer review system with approval workflow
- **Newsletter** — Email subscription management
- **Admin Dashboard** — Built-in web-based admin panel at `/admin`
- **Rate Limiting** — Protection against brute force and abuse
- **Input Validation** — Request validation on all endpoints
- **Security Headers** — Helmet.js for HTTP security

## Quick Start

```bash
# Install dependencies
npm install

# Seed database with sample data
npm run seed

# Start server
npm start
# or for development with auto-reload:
npm run dev
```

Server runs at `http://localhost:3000`

## Default Admin Credentials

- **Username:** `admin`
- **Email:** `admin@shahjewellery.com`
- **Password:** `Admin@123`

> Change these in `.env` before deploying to production.

## Admin Dashboard

Access the admin panel at: `http://localhost:3000/admin`

The dashboard provides:
- Overview with stats
- Product management (add/edit/delete)
- Inquiry management (view/mark read/delete)
- Testimonial moderation (approve/delete)
- Newsletter subscriber management

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/products` | List products (with filtering) |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/inquiries` | Submit contact form |
| GET | `/api/testimonials` | Get testimonials (approved by default) |
| POST | `/api/testimonials` | Submit testimonial |
| POST | `/api/newsletter` | Subscribe to newsletter |

### Admin Endpoints (Require JWT Token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/auth/profile` | Get admin profile |
| PUT | `/api/auth/change-password` | Change admin password |
| GET | `/api/products` | List all products |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/inquiries` | List all inquiries |
| GET | `/api/inquiries/:id` | Get single inquiry |
| PUT | `/api/inquiries/:id/read` | Mark inquiry as read |
| DELETE | `/api/inquiries/:id` | Delete inquiry |
| GET | `/api/testimonials` | List all testimonials |
| PUT | `/api/testimonials/:id/approve` | Approve testimonial |
| DELETE | `/api/testimonials/:id` | Delete testimonial |
| GET | `/api/newsletter` | List subscribers |
| DELETE | `/api/newsletter/:id` | Remove subscriber |

## API Examples

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@123"}'
```

### Get Products
```bash
curl http://localhost:3000/api/products
curl "http://localhost:3000/api/products?category=Rings&featured=true"
```

### Create Product (requires token)
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"Gold Ring","category":"Rings","price":15000,"description":"Beautiful gold ring"}'
```

### Submit Inquiry
```bash
curl -X POST http://localhost:3000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{"first_name":"John","email":"john@example.com","message":"Interested in bridal sets"}'
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── index.js          # App configuration
│   │   └── database.js       # SQLite database setup
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── inquiryController.js
│   │   ├── testimonialController.js
│   │   └── newsletterController.js
│   ├── middleware/
│   │   ├── auth.js           # JWT authentication
│   │   ├── validation.js     # Input validation
│   │   └── error.js          # Error handling
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── inquiries.js
│   │   ├── testimonials.js
│   │   └── newsletter.js
│   ├── utils/
│   │   ├── jwt.js            # JWT helpers
│   │   └── seed.js           # Database seeder
│   └── server.js             # Express app entry point
├── public/
│   └── admin/
│       └── index.html        # Admin dashboard
├── data/
│   └── shah-jewellery.db     # SQLite database (auto-created)
├── uploads/                   # File uploads directory
├── .env                       # Environment variables
├── .env.example               # Environment template
├── .gitignore
└── package.json
```

## Frontend Integration

The frontend (`script.js`) is configured to:
1. Submit the contact form to `POST /api/inquiries`
2. Load testimonials from `GET /api/testimonials?approved=true`
3. Fall back to static content if the API is unavailable

To connect the frontend to a different API URL, change `API_URL` in `script.js`.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `development` |
| `PORT` | Server port | `3000` |
| `JWT_SECRET` | JWT signing secret | (change in production) |
| `JWT_EXPIRES_IN` | Token expiry | `7d` |
| `ADMIN_USERNAME` | Default admin username | `admin` |
| `ADMIN_EMAIL` | Default admin email | `admin@shahjewellery.com` |
| `ADMIN_PASSWORD` | Default admin password | `Admin@123` |
| `DB_PATH` | SQLite database path | `./data/shah-jewellery.db` |
| `CORS_ORIGIN` | Allowed origins | `http://localhost:3000` |

## Security Notes

- JWT tokens expire after 7 days (configurable)
- Login attempts are rate-limited (10 per 15 minutes)
- All API routes are rate-limited (100 per 15 minutes)
- Passwords are hashed with bcrypt (10 rounds)
- Input validation on all endpoints
- Helmet.js adds security headers
- CORS is configured for specific origins

## Database

Uses `sql.js` — a pure JavaScript SQLite implementation. No native compilation required. The database is stored as a file and persisted automatically on every write.

For production, consider migrating to PostgreSQL or MySQL for better performance and concurrent access.
