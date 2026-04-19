# Shah Jewellery Website - Backend Development Plan

## Overview
This document outlines the backend architecture and features needed to transform the static Shah Jewellery website into a dynamic web application.

## Technology Stack Recommendations
- **Runtime**: Node.js (v18+) or Python (v3.9+)
- **Framework**: Express.js (Node.js) or Django/FastAPI (Python)
- **Database**: PostgreSQL or MongoDB
- **Authentication**: JWT or Session-based
- **Email Service**: SendGrid, Mailgun, or SMTP
- **File Storage**: AWS S3 or local storage (for development)
- **API Documentation**: Swagger/OpenAPI

## Core Features to Implement

### 1. Contact Form Handler
- **Endpoint**: POST /api/contact
- **Functionality**: 
  - Validate form data (name, email, phone, interest, message)
  - Store inquiry in database
  - Send email notification to admin
  - Send auto-reply to user
  - Return appropriate success/error responses

### 2. Product Catalog Management
- **Endpoints**:
  - GET /api/products - List all products
  - GET /api/products/:id - Get single product
  - POST /api/products - Create new product (admin)
  - PUT /api/products/:id - Update product (admin)
  - DELETE /api/products/:id - Delete product (admin)
- **Product Schema**:
  - id, name, category, description, price, imageUrl, isFeatured, isNewArrival, tags, materials, availability

### 3. Testimonials System
- **Endpoints**:
  - GET /api/testimonials - Get approved testimonials
  - POST /api/testimonials - Submit new testimonial
  - PUT /api/testimonials/:id/approve - Approve testimonial (admin)
  - DELETE /api/testimonials/:id - Delete testimonial (admin)
- **Testimonial Schema**:
  - id, name, location, rating, comment, date, isApproved, avatar

### 4. Admin Dashboard
- **Authentication**:
  - POST /api/auth/login - Admin login
  - POST /api/auth/logout - Admin logout
  - GET /api/auth/profile - Get admin profile
- **Dashboard Features**:
  - View/manage inquiries
  - View/manage testimonials
  - View/manage products
  - Site analytics (basic)

### 5. Custom Design Requests
- **Endpoint**: POST /api/custom-design
- **Functionality**:
  - Handle custom design inquiries
  - File upload capability for reference images
  - Store in database
  - Notify admin via email

### 6. Newsletter Subscription
- **Endpoint**: POST /api/newsletter
- **Functionality**:
  - Email validation
  - Store subscription
  - Send welcome email
  - Integrate with email marketing service (Mailchimp, etc.)

## Database Schema Design

### Users/Admin Table
```sql
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(255),
  is_featured BOOLEAN DEFAULT FALSE,
  is_new_arrival BOOLEAN DEFAULT FALSE,
  tags VARCHAR(255),
  materials TEXT,
  availability VARCHAR(20) DEFAULT 'in_stock',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Contact Inquiries Table
```sql
CREATE TABLE inquiries (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50),
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  interest VARCHAR(100),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_read BOOLEAN DEFAULT FALSE
);
```

### Testimonials Table
```sql
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  avatar VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_approved BOOLEAN DEFAULT FALSE
);
```

### Newsletter Subscribers Table
```sql
CREATE TABLE newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);
```

## API Endpoints Summary

### Public Endpoints
- GET /api/products
- GET /api/products/:id
- GET /api/testimonials
- POST /api/contact
- POST /api/custom-design
- POST /api/newsletter

### Admin Endpoints (Require Authentication)
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/profile
- GET /api/products (admin view)
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id
- GET /api/testimonials (all, including unapproved)
- PUT /api/testimonials/:id/approve
- DELETE /api/testimonials/:id
- GET /api/inquiries
- PUT /api/inquiries/:id/read
- DELETE /api/inquiries/:id
- GET /api/newsletter/subscribers
- DELETE /api/newsletter/subscribers/:id

## Security Considerations
1. Input validation and sanitization
2. Password hashing (bcrypt)
3. Rate limiting on auth endpoints
4. CORS configuration
5. Helmet.js for security headers
6. Environment variables for secrets
7. HTTPS enforcement in production
8. SQL injection prevention (use ORM/parameterized queries)
9. File upload validation (type, size, virus scanning)
10. Admin authentication middleware

## Development Setup Instructions
1. Clone repository
2. Install dependencies: `npm install` or `pip install -r requirements.txt`
3. Set up environment variables (.env file)
4. Run database migrations
5. Start development server: `npm run dev` or `uvicorn main:app --reload`
6. Run tests: `npm test` or `pytest`

## Deployment Considerations
1. Use process manager (PM2 for Node.js, Gunicorn for Python)
2. Set up reverse proxy (Nginx)
3. Configure SSL certificates
4. Set up automated backups
5. Implement monitoring and logging
6. Use environment-specific configs
7. Consider containerization (Docker)

## Next Steps
1. Choose technology stack
2. Set up project structure
3. Implement database and models
4. Build API endpoints
5. Add authentication
6. Implement file upload handling
7. Add email integration
8. Create admin dashboard
9. Write tests
10. Deploy to production