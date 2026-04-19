const supabase = require('../config/supabase');

async function getAll(req, res) {
  try {
    const { category, featured, newArrival, search, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase.from('products').select('*', { count: 'exact' });

    if (category) query = query.eq('category', category);
    if (featured === 'true') query = query.eq('is_featured', true);
    if (newArrival === 'true') query = query.eq('is_new_arrival', true);
    if (search) query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,tags.ilike.%${search}%`);

    query = query.range(offset, offset + limit - 1).order('created_at', { ascending: false });

    const { data: products, error, count: total } = await query;
    if (error) throw error;

    res.json({
      success: true,
      data: {
        products,
        pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / limit) }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getById(req, res) {
  try {
    const { data: product, error } = await supabase.from('products').select('*').eq('id', req.params.id).single();
    if (error || !product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: { product } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function create(req, res) {
  try {
    const { name, category, description, price, image_url, is_featured, is_new_arrival, tags, materials, availability } = req.body;
    
    const { data: product, error } = await supabase.from('products').insert([{
      name, category, description: description || '', price: parseFloat(price), image_url: image_url || '',
      is_featured: !!is_featured, is_new_arrival: !!is_new_arrival, tags: tags || '', materials: materials || '', availability: availability || 'in_stock'
    }]).select().single();

    if (error) throw error;
    res.status(201).json({ success: true, message: 'Product created successfully', data: { product } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function update(req, res) {
  try {
    const { name, category, description, price, image_url, is_featured, is_new_arrival, tags, materials, availability } = req.body;
    
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (category !== undefined) updates.category = category;
    if (description !== undefined) updates.description = description;
    if (price !== undefined) updates.price = parseFloat(price);
    if (image_url !== undefined) updates.image_url = image_url;
    if (is_featured !== undefined) updates.is_featured = !!is_featured;
    if (is_new_arrival !== undefined) updates.is_new_arrival = !!is_new_arrival;
    if (tags !== undefined) updates.tags = tags;
    if (materials !== undefined) updates.materials = materials;
    if (availability !== undefined) updates.availability = availability;
    updates.updated_at = new Date().toISOString();

    const { data: product, error } = await supabase.from('products').update(updates).eq('id', req.params.id).select().single();
    if (error || !product) return res.status(404).json({ success: false, message: 'Product not found or update failed' });

    res.json({ success: true, message: 'Product updated successfully', data: { product } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function remove(req, res) {
  try {
    const { error } = await supabase.from('products').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { getAll, getById, create, update, remove };
