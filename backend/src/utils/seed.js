const bcrypt = require('bcryptjs');
const { initDatabase, closeDatabase, get, run, all } = require('../config/database');

async function seed() {
  console.log('Initializing database...');
  await initDatabase();

  console.log('Seeding database...');

  const existingProducts = get('SELECT COUNT(*) as count FROM products');
  if (existingProducts.count === 0) {
    const products = [
      { name: 'Royal Necklace Set', category: 'Necklaces', description: 'Handcrafted gold and diamond necklaces for every occasion.', price: 45000, image_url: '/images/necklace.png', is_featured: 1, is_new_arrival: 0, tags: 'gold,diamond,wedding', materials: '22K Gold, Diamond', availability: 'in_stock' },
      { name: 'Solitaire Diamond Ring', category: 'Rings', description: 'From solitaire engagement rings to ornate bridal sets.', price: 18000, image_url: '/images/ring.png', is_featured: 0, is_new_arrival: 1, tags: 'diamond,engagement,solitaire', materials: '18K Gold, Diamond', availability: 'in_stock' },
      { name: 'Elegant Drop Earrings', category: 'Earrings', description: 'Graceful gold and gemstone earrings that complement every look.', price: 8500, image_url: '/images/earring.png', is_featured: 0, is_new_arrival: 0, tags: 'gold,gemstone,drop', materials: '22K Gold, Ruby', availability: 'in_stock' },
      { name: 'Diamond Tennis Bracelet', category: 'Bracelets', description: 'Dazzling diamond bracelets and gold bangles for a timeless finish.', price: 22000, image_url: '/images/bracelet.png', is_featured: 1, is_new_arrival: 0, tags: 'diamond,tennis,bracelet', materials: '18K Gold, Diamond', availability: 'in_stock' },
      { name: 'Kundan Bridal Necklace', category: 'Necklaces', description: 'Traditional Kundan bridal necklace set with matching earrings.', price: 85000, image_url: '/images/necklace.png', is_featured: 1, is_new_arrival: 1, tags: 'kundan,bridal,traditional', materials: '22K Gold, Kundan', availability: 'in_stock' },
      { name: 'Platinum Wedding Band', category: 'Rings', description: 'Classic platinum wedding band with polished finish.', price: 35000, image_url: '/images/ring.png', is_featured: 0, is_new_arrival: 0, tags: 'platinum,wedding,band', materials: 'Platinum', availability: 'in_stock' },
      { name: 'Jhumka Earrings', category: 'Earrings', description: 'Traditional gold jhumka earrings with intricate detailing.', price: 12000, image_url: '/images/earring.png', is_featured: 0, is_new_arrival: 1, tags: 'jhumka,traditional,gold', materials: '22K Gold', availability: 'in_stock' },
      { name: 'Gold Chain Bracelet', category: 'Bracelets', description: 'Elegant gold chain bracelet with secure clasp.', price: 15000, image_url: '/images/bracelet.png', is_featured: 0, is_new_arrival: 0, tags: 'gold,chain,bracelet', materials: '22K Gold', availability: 'in_stock' }
    ];

    for (const p of products) {
      run(
        'INSERT INTO products (name, category, description, price, image_url, is_featured, is_new_arrival, tags, materials, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [p.name, p.category, p.description, p.price, p.image_url, p.is_featured, p.is_new_arrival, p.tags, p.materials, p.availability]
      );
    }
    console.log('Seeded 8 products');
  } else {
    console.log('Products already exist, skipping');
  }

  const existingTestimonials = get('SELECT COUNT(*) as count FROM testimonials');
  if (existingTestimonials.count === 0) {
    const testimonials = [
      { name: 'Priya Sharma', location: 'Mumbai', rating: 5, comment: 'I got my engagement ring from Shah Jewellery and it was absolutely breathtaking. The craftsmanship and the personal attention we received was unmatched. Highly recommended!', avatar: 'P', is_approved: 1 },
      { name: 'Rajan Mehta', location: 'Surat', rating: 5, comment: 'Shah Jewellery has been our family\'s first choice for over two decades. The quality and trust they offer is truly unmatched. Every piece is a work of art.', avatar: 'R', is_approved: 1 },
      { name: 'Anjali Patel', location: 'Ahmedabad', rating: 5, comment: 'I had a custom necklace designed for my mother\'s anniversary. The team was so patient and creative. The final piece exceeded all expectations!', avatar: 'A', is_approved: 1 },
      { name: 'Neha Kapoor', location: 'Delhi', rating: 5, comment: 'The bridal jewellery I purchased from Shah Jewellery was the highlight of my wedding. Every guest complimented me and the quality is simply outstanding.', avatar: 'N', is_approved: 1 },
      { name: 'Kavita Desai', location: 'Pune', rating: 5, comment: 'Excellent service, certified diamonds, and gorgeous designs. Shah Jewellery truly lives up to its reputation. My go-to jeweller for life!', avatar: 'K', is_approved: 1 }
    ];

    for (const t of testimonials) {
      run(
        'INSERT INTO testimonials (name, location, rating, comment, avatar, is_approved) VALUES (?, ?, ?, ?, ?, ?)',
        [t.name, t.location, t.rating, t.comment, t.avatar, t.is_approved]
      );
    }
    console.log('Seeded 5 testimonials');
  } else {
    console.log('Testimonials already exist, skipping');
  }

  console.log('Seeding complete!');
  closeDatabase();
}

seed().catch(err => { console.error(err); process.exit(1); });
