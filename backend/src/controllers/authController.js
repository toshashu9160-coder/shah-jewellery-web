const bcrypt = require('bcryptjs');
const supabase = require('../config/supabase');
const { generateToken } = require('../utils/jwt');

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .or(`username.eq.${username},email.eq.${username}`)
      .single();

    if (error || !admin) {
      if (!admin) {
        // As a fallback in case the database is completely empty (no admin user yet)
        if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
          const hashedPassword = bcrypt.hashSync(password, 10);
          const { data: newAdmin } = await supabase.from('admins').insert([{
            username: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL,
            password_hash: hashedPassword,
            role: 'admin'
          }]).select().single();
          
          if (newAdmin) {
            const token = generateToken({ id: newAdmin.id, username: newAdmin.username, role: newAdmin.role });
            return res.json({ success: true, message: 'Login successful', data: { token, admin: { id: newAdmin.id, username: newAdmin.username, email: newAdmin.email, role: newAdmin.role } } });
          }
        }
      }
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isPasswordValid = bcrypt.compareSync(password, admin.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken({ id: admin.id, username: admin.username, role: admin.role });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        admin: { id: admin.id, username: admin.username, email: admin.email, role: admin.role }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getProfile(req, res) {
  res.json({ success: true, data: { admin: req.admin } });
}

async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;

    const { data: admin, error } = await supabase.from('admins').select('*').eq('id', req.admin.id).single();

    if (error || !admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    const isPasswordValid = bcrypt.compareSync(currentPassword, admin.password_hash);

    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const { error: updateError } = await supabase.from('admins').update({ password_hash: hashedPassword, updated_at: new Date().toISOString() }).eq('id', req.admin.id);

    if (updateError) throw updateError;

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { login, getProfile, changePassword };
