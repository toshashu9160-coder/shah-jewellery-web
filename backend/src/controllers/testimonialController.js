const supabase = require('../config/supabase');

async function getAll(req, res) {
  try {
    const { page = 1, limit = 20, approved } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase.from('testimonials').select('*', { count: 'exact' });

    if (approved === 'true') {
      query = query.eq('is_approved', true);
    }

    query = query.range(offset, offset + limit - 1).order('created_at', { ascending: false });

    const { data: testimonials, error, count: total } = await query;
    if (error) throw error;

    res.json({
      success: true,
      data: { testimonials, pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / limit) } }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getById(req, res) {
  try {
    const { data: testimonial, error } = await supabase.from('testimonials').select('*').eq('id', req.params.id).single();
    if (error || !testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.json({ success: true, data: { testimonial } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function create(req, res) {
  try {
    const { name, location, rating, comment, avatar } = req.body;

    const { data: testimonial, error } = await supabase.from('testimonials').insert([{
      name, location: location || '', rating: rating || 5, comment, avatar: avatar || ''
    }]).select().single();

    if (error) throw error;
    res.status(201).json({ success: true, message: 'Testimonial submitted. It will appear after approval.', data: { testimonial } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function approve(req, res) {
  try {
    const { data: testimonial, error } = await supabase.from('testimonials').update({ is_approved: true }).eq('id', req.params.id).select().single();
    if (error || !testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found or update failed' });
    res.json({ success: true, message: 'Testimonial approved' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function remove(req, res) {
  try {
    const { error } = await supabase.from('testimonials').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { getAll, getById, create, approve, remove };
