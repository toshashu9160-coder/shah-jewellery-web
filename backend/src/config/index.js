const path = require('path');
const fs = require('fs');

require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-change-me',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  db: {
    path: path.join(__dirname, '..', process.env.DB_PATH || './data/shah-jewellery.db')
  },
  upload: {
    dir: path.join(__dirname, '..', process.env.UPLOAD_DIR || './uploads'),
    maxSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 5242880
  },
  admin: {
    username: process.env.ADMIN_USERNAME || 'admin',
    email: process.env.ADMIN_EMAIL || 'admin@shahjewellery.com',
    password: process.env.ADMIN_PASSWORD || 'Admin@123'
  },
  cors: {
    origin: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(',')
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY
  }
};


if (!fs.existsSync(config.upload.dir)) {
  fs.mkdirSync(config.upload.dir, { recursive: true });
}

module.exports = config;
