const supabase = require('../config/supabase');

async function getAll(req, res) {
  try {
    const { page = 1, limit = 20, is_read } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase.from('inquiries').select('*', { count: 'exact' });

    if (is_read !== undefined) query = query.eq('is_read', is_read === 'true');

    query = query.range(offset, offset + limit - 1).order('created_at', { ascending: false });

    const { data: inquiries, error, count: total } = await query;
    if (error) throw error;

    res.json({
      success: true,
      data: { inquiries, pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / limit) } }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getById(req, res) {
  try {
    const { data: inquiry, error } = await supabase.from('inquiries').select('*').eq('id', req.params.id).single();
    if (error || !inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    res.json({ success: true, data: { inquiry } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function create(req, res) {
  try {
    const { first_name, last_name, email, phone, interest, message } = req.body;

    const { data: inquiry, error } = await supabase.from('inquiries').insert([{
      first_name, last_name: last_name || '', email, phone: phone || '', interest: interest || '', message
    }]).select().single();

    if (error) throw error;
    res.status(201).json({ success: true, message: 'Inquiry submitted successfully. We will get back to you soon!', data: { inquiry } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function markAsRead(req, res) {
  try {
    const { data: inquiry, error } = await supabase.from('inquiries').update({ is_read: true }).eq('id', req.params.id).select().single();
    if (error || !inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found or update failed' });
    res.json({ success: true, message: 'Inquiry marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function remove(req, res) {
  try {
    const { error } = await supabase.from('inquiries').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { getAll, getById, create, markAsRead, remove };
