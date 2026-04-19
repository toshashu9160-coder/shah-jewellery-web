const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

const config = require('./config');
const { errorHandler, notFoundHandler } = require('./middleware/error');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const inquiryRoutes = require('./routes/inquiries');
const testimonialRoutes = require('./routes/testimonials');
const newsletterRoutes = require('./routes/newsletter');

const app = express();

app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

app.use(cors({
  origin: config.cors.origin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan(config.env === 'development' ? 'dev' : 'combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '..', config.upload.dir)));
app.use('/admin', express.static(path.join(__dirname, '..', 'public', 'admin')));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: { success: false, message: 'Too many requests, please try again later' } });
app.use('/api/', limiter);

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: { success: false, message: 'Too many login attempts, please try again later' } });
app.use('/api/auth/login', authLimiter);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Shah Jewellery API is running', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/newsletter', newsletterRoutes);

app.get('/api', (req, res) => {
  res.json({ success: true, message: 'Shah Jewellery API', version: '1.0.0', endpoints: { auth: '/api/auth', products: '/api/products', inquiries: '/api/inquiries', testimonials: '/api/testimonials', newsletter: '/api/newsletter', admin: '/admin' } });
});

app.use(notFoundHandler);
app.use(errorHandler);

async function start() {
  const server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
    console.log(`Environment: ${config.env}`);
    console.log(`API: http://localhost:${config.port}/api`);
    console.log(`Admin: http://localhost:${config.port}/admin`);
  });

  process.on('SIGTERM', () => { console.log('SIGTERM received. Shutting down...'); server.close(() => process.exit(0)); });
  process.on('SIGINT', () => { console.log('SIGINT received. Shutting down...'); server.close(() => process.exit(0)); });
}

if (require.main === module) {
  start().catch(err => { console.error('Failed to start server:', err); process.exit(1); });
}

module.exports = app;
