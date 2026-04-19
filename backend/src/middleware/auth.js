const { verifyToken } = require('../utils/jwt');
const supabase = require('../config/supabase');

async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Access token required' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }

    const { data: admin, error } = await supabase.from('admins').select('id, username, email, role').eq('id', decoded.id).single();
    
    if (error || !admin) {
      return res.status(403).json({ success: false, message: 'Admin not found' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        const { data: admin } = await supabase.from('admins').select('id, username, email, role').eq('id', decoded.id).single();
        if (admin) {
           req.admin = admin;
        }
      }
    }
  } catch (error) {
    // Ignore error for optional auth
  }

  next();
}

module.exports = { authenticateToken, optionalAuth };
