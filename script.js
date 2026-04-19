/* ============================================================
   SHAH JEWELLERY — script.js
   ============================================================ */

// ===== 0. SUPABASE CONFIGURATION =====
const SUPABASE_URL = 'https://msclesndyxqnzapyijlk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zY2xlc25keXhxbnphcHlpamxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxMzIwOTEsImV4cCI6MjA5MDcwODA5MX0.KoHzcCThcuNMtUCG9mGUR2xUvcWHn2RTaaj0TP893Dc';
const sbClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_URL = isLocal ? 'http://localhost:3000/api' : '/api';

// ===== PRODUCT CATALOGUE DATA =====
const CATEGORIES = [
  {
    slug: 'antique-set',
    name: 'Antique Set',
    description: 'Traditional antique jewellery sets with intricate old-world craftsmanship.',
    imageCount: 91,
    badge: 'Heritage',
    badgeClass: '',
    totalDesigns: 91
  },
  {
    slug: 'bangla-necklace',
    name: 'Bangla Necklace',
    description: 'Authentic Bengali necklace designs that celebrate cultural elegance.',
    imageCount: 40,
    badge: 'Traditional',
    badgeClass: '',
    totalDesigns: 40
  },
  {
    slug: 'chand-bali',
    name: 'Chand Bali',
    description: 'Classic crescent-shaped earrings inspired by Mughal royalty.',
    imageCount: 13,
    badge: 'Popular',
    badgeClass: '',
    totalDesigns: 13
  },
  {
    slug: 'chhata-ring',
    name: 'Chhata Ring',
    description: 'Elegant umbrella-shaped ring designs in gold and precious stones.',
    imageCount: 40,
    badge: '',
    badgeClass: '',
    totalDesigns: 40
  },
  {
    slug: 'chokher',
    name: 'Choker',
    description: 'Stunning choker necklaces that sit gracefully close to the neckline.',
    imageCount: 38,
    badge: 'Trending',
    badgeClass: 'new-badge',
    totalDesigns: 38
  },
  {
    slug: 'f-l-ring',
    name: 'Designer Rings',
    description: 'Exquisite finger rings from classic solitaires to ornate statement pieces.',
    imageCount: 268,
    badge: 'Bestseller',
    badgeClass: '',
    totalDesigns: 268
  },
  {
    slug: 'fancy-necklace',
    name: 'Fancy Necklace',
    description: 'Ornate designer necklaces for weddings, parties, and special occasions.',
    imageCount: 127,
    badge: 'New Arrival',
    badgeClass: 'new-badge',
    totalDesigns: 127
  },
  {
    slug: 'fancy-patla',
    name: 'Fancy Patla',
    description: 'Decorative gold bangles with intricate patterns and gemstone embellishments.',
    imageCount: 18,
    badge: '',
    badgeClass: '',
    totalDesigns: 18
  },
  {
    slug: 'fancy-sl-locket',
    name: 'Designer Locket',
    description: 'Elegant locket pendants with delicate chains for a refined look.',
    imageCount: 23,
    badge: '',
    badgeClass: '',
    totalDesigns: 23
  },
  {
    slug: 'k.jhumka',
    name: 'Jhumka',
    description: 'Traditional bell-shaped jhumka earrings — a timeless Indian classic.',
    imageCount: 74,
    badge: 'Classic',
    badgeClass: '',
    totalDesigns: 74
  },
  {
    slug: 'long_u-set',
    name: 'Bridal Set',
    description: 'Complete bridal jewellery sets with necklace, earrings, and accessories.',
    imageCount: 36,
    badge: 'Bridal',
    badgeClass: '',
    totalDesigns: 36
  },
  {
    slug: 'pendant',
    name: 'Pendant',
    description: 'Beautiful pendant designs in gold and diamonds for everyday luxury.',
    imageCount: 63,
    badge: '',
    badgeClass: '',
    totalDesigns: 63
  },
  {
    slug: 'regular-necklace',
    name: 'Classic Necklace',
    description: 'Timeless necklace designs perfect for daily wear and celebrations alike.',
    imageCount: 50,
    badge: '',
    badgeClass: '',
    totalDesigns: 50
  },
  {
    slug: 'tika',
    name: 'Maang Tika',
    description: 'Traditional head jewellery (maang tika) for brides and festive occasions.',
    imageCount: 31,
    badge: 'Bridal',
    badgeClass: '',
    totalDesigns: 31
  }
];

// ===== 1. LOADER & INITIALIZATION =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 150 + 200);
    });
  }, 1200);

  renderCollectionCards();
  loadTestimonials();
});

// ===== 2. RENDER COLLECTION CARDS =====
function renderCollectionCards() {
  const grid = document.getElementById('collectionsGrid');
  if (!grid) return;

  grid.innerHTML = CATEGORIES.map((cat, i) => `
    <div class="collection-card reveal-card" style="--i:${i % 4}" data-category="${cat.slug}" onclick="openGallery('${cat.slug}')">
      <div class="card-image-wrap">
        <img src="images/products/${cat.slug}/1.jpg" alt="${cat.name} Collection" loading="lazy" />
        <div class="card-overlay">
          <button class="view-btn">View Collection</button>
        </div>
        ${cat.badge ? `<span class="card-badge ${cat.badgeClass}">${cat.badge}</span>` : ''}
      </div>
      <div class="card-body">
        <span class="card-tag">${cat.name}</span>
        <h3>${cat.name}</h3>
        <p>${cat.description}</p>
        <div class="card-footer">
          <div class="card-count"><span>${cat.totalDesigns}</span> Designs</div>
          <button class="icon-btn" title="View Collection">→</button>
        </div>
      </div>
    </div>
  `).join('');

  // Re-observe for animations
  grid.querySelectorAll('.reveal-card').forEach((card, i) => {
    card.style.setProperty('--i', i % 4);
    revealObserver.observe(card);
  });
}

// ===== 3. PRODUCT GALLERY =====
let currentGalleryImages = [];

function openGallery(categorySlug) {
  const category = CATEGORIES.find(c => c.slug === categorySlug);
  if (!category) return;

  const modal = document.getElementById('galleryModal');
  const grid = document.getElementById('galleryGrid');
  const title = document.getElementById('galleryTitle');
  const tag = document.getElementById('galleryTag');

  title.textContent = category.name;
  tag.textContent = `${category.totalDesigns} Designs Available`;

  // Build gallery images
  currentGalleryImages = [];
  grid.innerHTML = '';

  for (let i = 1; i <= category.imageCount; i++) {
    const imgPath = `images/products/${category.slug}/${i}.jpg`;
    currentGalleryImages.push({
      src: imgPath,
      caption: `${category.name} — Design ${i}`
    });

    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
      <img src="${imgPath}" alt="${category.name} Design ${i}" loading="lazy" />
      <div class="gallery-item-overlay">
        <span>Design ${i}</span>
      </div>
    `;
    item.addEventListener('click', () => openLightbox(i - 1));
    grid.appendChild(item);
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeGallery() {
  const modal = document.getElementById('galleryModal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('galleryClose').addEventListener('click', closeGallery);

// Close gallery on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('open')) {
      closeLightbox();
    } else {
      closeGallery();
    }
  }
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});

// ===== 4. IMAGE LIGHTBOX =====
let currentLightboxIndex = 0;

function openLightbox(index) {
  currentLightboxIndex = index;
  const lightbox = document.getElementById('lightbox');
  updateLightbox();
  lightbox.classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

function updateLightbox() {
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  const counter = document.getElementById('lightboxCounter');
  const data = currentGalleryImages[currentLightboxIndex];
  if (!data) return;

  img.src = data.src;
  caption.textContent = data.caption;
  counter.textContent = `${currentLightboxIndex + 1} / ${currentGalleryImages.length}`;
}

function navigateLightbox(direction) {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  currentLightboxIndex = (currentLightboxIndex + direction + currentGalleryImages.length) % currentGalleryImages.length;
  updateLightbox();
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => navigateLightbox(-1));
document.getElementById('lightboxNext').addEventListener('click', () => navigateLightbox(1));

// Swipe support for lightbox on mobile
let touchStartX = 0;
document.getElementById('lightbox').addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});
document.getElementById('lightbox').addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    navigateLightbox(diff > 0 ? 1 : -1);
  }
});

// ===== 5. NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== 6. MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu  = document.getElementById('closeMenu');

hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// Close mobile menu when Book Appointment button is clicked
document.querySelector('.mob-cta').addEventListener('click', () => {
  mobileMenu.classList.remove('open');
});

// ===== 7. SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// Stagger for cards
document.querySelectorAll('.reveal-card').forEach((card, i) => {
  card.style.setProperty('--i', i % 4);
  revealObserver.observe(card);
});

// ===== 8. COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ===== 9. TESTIMONIALS SLIDER =====
const cards   = document.querySelectorAll('.testimonial-card');
const dotsWrap = document.getElementById('tDots');
const tPrev   = document.getElementById('tPrev');
const tNext   = document.getElementById('tNext');
let currentTestimonial = 0;

if (cards.length > 0 && dotsWrap.children.length === 0) {
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 't-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToTestimonial(i));
    dotsWrap.appendChild(dot);
  });

  function goToTestimonial(idx) {
    if (!cards[currentTestimonial]) return;
    cards[currentTestimonial].classList.remove('active');
    if (dotsWrap.children[currentTestimonial]) dotsWrap.children[currentTestimonial].classList.remove('active');
    currentTestimonial = (idx + cards.length) % cards.length;
    cards[currentTestimonial].classList.add('active');
    if (dotsWrap.children[currentTestimonial]) dotsWrap.children[currentTestimonial].classList.add('active');
  }

  cards[0].classList.add('active');
  tPrev.addEventListener('click', () => goToTestimonial(currentTestimonial - 1));
  tNext.addEventListener('click', () => goToTestimonial(currentTestimonial + 1));

  let autoSlide = setInterval(() => goToTestimonial(currentTestimonial + 1), 3000);
  [tPrev, tNext].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => goToTestimonial(currentTestimonial + 1), 3000);
      });
    }
  });
}


// ===== 11. LOAD TESTIMONIALS FROM SUPABASE =====
async function loadTestimonials() {
  try {
    const { data: testimonials, error } = await sbClient
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;

    if (testimonials && testimonials.length > 0) {
      const track = document.getElementById('testimonialsTrack');
      const dotsWrap = document.getElementById('tDots');
      const tPrev = document.getElementById('tPrev');
      const tNext = document.getElementById('tNext');

      if (!track || !dotsWrap) return;

      track.innerHTML = '';
      dotsWrap.innerHTML = '';

      testimonials.forEach((t, i) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
          <div class="stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
          <p>"${t.comment}"</p>
          <div class="client-info">
            <div class="client-avatar">${t.avatar || t.name.charAt(0)}</div>
            <div><strong>${t.name}</strong><span>${t.location || ''}</span></div>
          </div>
        `;
        track.appendChild(card);

        const dot = document.createElement('div');
        dot.className = 't-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      });

      const newCards = track.querySelectorAll('.testimonial-card');
      let current = 0;

      function goTo(idx) {
        if (!newCards[current]) return;
        newCards[current].classList.remove('active');
        if (dotsWrap.children[current]) dotsWrap.children[current].classList.remove('active');
        current = (idx + newCards.length) % newCards.length;
        newCards[current].classList.add('active');
        if (dotsWrap.children[current]) dotsWrap.children[current].classList.add('active');
      }

      if (newCards[0]) newCards[0].classList.add('active');
      if (tPrev) tPrev.addEventListener('click', () => goTo(current - 1));
      if (tNext) tNext.addEventListener('click', () => goTo(current + 1));

      let autoSlide = setInterval(() => goTo(current + 1), 3000);
      [tPrev, tNext].forEach(btn => {
        if (btn) {
          btn.addEventListener('click', () => {
            clearInterval(autoSlide);
            autoSlide = setInterval(() => goTo(current + 1), 3000);
          });
        }
      });
    }
  } catch (err) {
    console.log('Using static testimonials or error:', err.message);
  }
}

// ===== 12. SMOOTH NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== 13. ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
