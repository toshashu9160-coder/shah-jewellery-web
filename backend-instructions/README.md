# Backend Instructions for Shah Jewellery Website

This folder contains all the necessary instructions, plans, and guidelines for creating a backend for the Shah Jewellery website.

## Contents

### 1. [BACKEND_PLAN.md](BACKEND_PLAN.md)
Comprehensive backend development plan covering:
- Technology stack recommendations
- Core features to implement (contact form, product catalog, testimonials, etc.)
- Database schema design
- API endpoints summary
- Security considerations
- Development setup instructions
- Deployment considerations
- Next steps

### 2. [TECH_STACK_COMPARISON.md](TECH_STACK_COMPARISON.md)
Detailed comparison of different technology stack options:
- Node.js + Express.js + PostgreSQL
- Python + Django + PostgreSQL  
- Python + FastAPI + PostgreSQL
- Recommendation: Python + FastAPI + PostgreSQL
- Project structure recommendation
- Estimated development timeline
- Cost considerations
- Risks and mitigation strategies

## How to Use These Instructions

1. **Review the Technology Stack Comparison** to choose the appropriate technology for your team's expertise and project requirements.

2. **Follow the Backend Plan** to implement the backend features systematically:
   - Start with setting up the development environment
   - Implement database models and migrations
   - Build core API endpoints
   - Add authentication and security measures
   - Implement file upload and email services
   - Create admin dashboard functionality
   - Write tests and prepare for deployment

3. **Refer to the API endpoints** in both documents to understand what needs to be built to support the frontend functionality.

## Frontend-Backend Integration

The current frontend (index.html, script.js, style.css) makes the following interactions that will need backend support:

1. **Contact Form** (lines 382-421 in index.html):
   - Form submission to `/api/contact` endpoint
   - Will need to handle form validation, storage, and email notifications

2. **Product Collections** (lines 103-183 in index.html):
   - Currently static images and data
   - Will need to fetch from `/api/products` endpoint
   - Will need admin interface to manage products

3. **Testimonials** (lines 267-328 in index.html):
   - Currently static testimonials
   - Will need to fetch approved testimonials from `/api/testimonials` endpoint
   - Will need admin interface to approve new testimonials

4. **Custom Design Requests**:
   - Not currently implemented in frontend but mentioned in services section
   - Will need `/api/custom-design` endpoint with file upload capability

5. **Newsletter Subscription**:
   - Not currently implemented but could be added
   - Will need `/api/newsletter` endpoint

## Database Design Overview

The backend will need to manage these core entities:
- **Admins**: For admin dashboard authentication
- **Products**: Jewelry items with categories, prices, images, etc.
- **Inquiries**: Contact form submissions
- **Testimonials**: Customer reviews with approval workflow
- **Newsletter Subscribers**: Email marketing list

## Security Considerations

Important security aspects to implement:
- Input validation and sanitization on all endpoints
- Password hashing using bcrypt for admin accounts
- JWT-based authentication for admin routes
- Rate limiting on authentication endpoints
- CORS configuration to allow frontend domain
- Security headers using Helmet.js (Node.js) or equivalent
- Environment variables for storing secrets
- HTTPS enforcement in production
- SQL injection prevention through ORM/parameterized queries
- File upload validation (type, size, virus scanning)

## Next Steps

1. Choose a technology stack based on TECH_STACK_COMPARISON.md
2. Set up development environment following instructions in BACKEND_PLAN.md
3. Implement database schema and migrations
4. Build core API endpoints for products, inquiries, and testimonials
5. Add authentication system for admin access
6. Implement file upload and email services
7. Create admin dashboard interfaces
8. Write tests and deploy to production

For any questions or clarification on implementing specific features, refer to the detailed documents in this folder.