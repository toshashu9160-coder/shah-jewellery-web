const supabase = require('../config/supabase');

async function subscribe(req, res) {
  try {
    const { email } = req.body;

    const { data: existing, error: existError } = await supabase.from('newsletter_subscribers').select('id').eq('email', email).maybeSingle();
    
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already subscribed' });
    }

    const { error } = await supabase.from('newsletter_subscribers').insert([{ email }]);
    if (error) throw error;
    
    res.status(201).json({ success: true, message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getAll(req, res) {
  try {
    const { page = 1, limit = 50, active } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase.from('newsletter_subscribers').select('*', { count: 'exact' });

    if (active !== undefined) {
      query = query.eq('is_active', active === 'true');
    }

    query = query.range(offset, offset + limit - 1).order('subscribed_at', { ascending: false });

    const { data: subscribers, error, count: total } = await query;
    if (error) throw error;

    res.json({
      success: true,
      data: { subscribers, pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / limit) } }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function remove(req, res) {
  try {
    const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true, message: 'Subscriber removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { subscribe, getAll, remove };
