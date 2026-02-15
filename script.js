
// --- DATA ---
const ICE_CREAMS = [
  {
    id: '1',
    name: 'Madagascar Vanilla Bean',
    price: 8.50,
    description: 'Double-churned with organic vanilla beans.',
    fullDescription: 'Our signature Madagascar Vanilla Bean is crafted using premium beans sourced directly from fair-trade farms. We double-churn our cream to achieve a silkiness that is unmatched.',
    ingredients: ['Heavy Cream', 'Organic Sugar', 'Vanilla Beans', 'Egg Yolks'],
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    category: 'Classic'
  },
  {
    id: '2',
    name: 'Himalayan Salted Caramel',
    price: 9.00,
    description: 'Buttery caramel with a hint of mountain salt.',
    fullDescription: 'The perfect balance of sweet and savory. Hand-cooked caramel finished with pink Himalayan salt.',
    ingredients: ['Cream', 'Cane Sugar', 'Butter', 'Pink Salt'],
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    category: 'Classic'
  },
  {
    id: '3',
    name: 'Wild Lavender Honey',
    price: 10.25,
    description: 'Floral lavender infused with wildflower honey.',
    fullDescription: 'Delicate floral lavender buds steeped in cream and swirled with thick local honey.',
    ingredients: ['Cream', 'Local Honey', 'Culinary Lavender', 'Sugar'],
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
    category: 'Seasonal'
  },
  {
    id: '4',
    name: 'vanilla',
    price: 11.00,
    description: 'creamy, smooth white scoops, vanilla bean specks',
    fullDescription: 'Rich and vibrant. 100% pure Bronte pistachios create an earthy flavor capturing the essence of Italy.',
    ingredients: ['Cream', 'Bronte Pistachios', 'Sugar', 'Sea Salt'],
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=800&auto=format&fit=crop',
    rating: 5.0,
    category: 'Classic'
  },
  {
    id: '5',
    name: 'Dark Chocolate Forest',
    price: 9.50,
    description: '70% Dark chocolate with cherry compote.',
    fullDescription: 'Intense dark chocolate ice cream layered with tart homemade black cherry compote.',
    ingredients: ['70% Cacao', 'Heavy Cream', 'Black Cherries', 'Sugar'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUX0o8ftZUuL--dl5enzyTptVxxcjx6d5s8w&s',
    rating: 4.9,
    category: 'Classic'
  },
  {
    id: '6',
    name: 'Summer Peach Sorbet',
    price: 8.00,
    description: 'Fresh peaches turned into light delight.',
    fullDescription: 'Dairy-free celebration of summer. Ripest peaches ensuring a naturally sweet texture.',
    ingredients: ['Fresh Peaches', 'Filtered Water', 'Lemon Juice'],
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
    category: 'Vegan'
  }
];

let REVIEWS = [
  { id: 'r1', user: 'Eleanor Vance', comment: 'The Lavender Honey is a revelation.', rating: 5, date: 'Oct 2024' },
  { id: 'r2', user: 'Julian Thorne', comment: 'Best pistachio outside of Italy.', rating: 5, date: 'Nov 2024' }
];

// --- STATE ---
let cart = [];
let currentCategory = 'All';
let searchQuery = '';

// --- DOM ELEMENTS ---
const menuGrid = document.getElementById('menu-grid');
const productDetailContainer = document.getElementById('product-detail-container');
const cartItemsContainer = document.getElementById('cart-items');
const cartFooter = document.getElementById('cart-footer');
const cartTotalEl = document.getElementById('cart-total');
const cartBadge = document.getElementById('cart-badge');
const reviewsGrid = document.getElementById('reviews-grid');
const searchInput = document.getElementById('search-input');
const categoryBtns = document.querySelectorAll('.filter-btn');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const toast = document.getElementById('toast');

// --- INITIALIZATION ---


// --- RENDER FUNCTIONS ---

function renderMenu() {
  const filtered = ICE_CREAMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = currentCategory === 'All' || item.category === currentCategory;
    return matchesSearch && matchesCat;
  });

  menuGrid.innerHTML = filtered.map(product => `
    <div class="bg-white rounded-[32px] overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-50 cursor-pointer" onclick="selectProduct('${product.id}')">
      <div class="aspect-[4/3] relative overflow-hidden">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
        <div class="absolute top-4 right-4 bg-white/70 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-stone-700">$${product.price.toFixed(2)}</div>
      </div>
      <div class="p-8 text-center">
        <h3 class="font-serif text-xl text-stone-800 mb-2">${product.name}</h3>
        <p class="text-stone-500 text-sm mb-4 line-clamp-2">${product.description}</p>
        <span class="text-xs font-bold uppercase tracking-widest text-stone-400">View Details</span>
      </div>
    </div>
  `).join('');

  if (filtered.length === 0) {
    menuGrid.innerHTML = `<p class="col-span-full text-center py-20 text-stone-400 italic">No flavors found.</p>`;
  }
}

window.selectProduct = function(id) {
  const product = ICE_CREAMS.find(p => p.id === id);
  if (!product) return;

  productDetailContainer.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div class="rounded-[48px] overflow-hidden shadow-2xl aspect-[5/6]">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
      </div>
      <div>
        <span class="inline-block px-4 py-1.5 rounded-full bg-rose-50 text-rose-500 text-xs font-bold uppercase tracking-widest mb-6">${product.category}</span>
        <h2 class="text-5xl font-serif text-stone-800 mb-4 leading-tight">${product.name}</h2>
        <div class="text-3xl font-medium text-stone-800 mb-8">$${product.price.toFixed(2)}</div>
        <p class="text-stone-600 leading-relaxed mb-10 text-lg">${product.fullDescription}</p>
        <div class="mb-10">
          <h4 class="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">Ingredients</h4>
          <div class="flex flex-wrap gap-2">
            ${product.ingredients.map(ing => `<span class="px-4 py-2 bg-stone-50 rounded-xl text-stone-600 text-sm">${ing}</span>`).join('')}
          </div>
        </div>
        <button onclick="addToCart('${product.id}')" class="bg-stone-800 text-white px-10 py-5 rounded-full font-serif font-bold hover:bg-stone-900 transition-all shadow-lg active:scale-95">
          Add to Cart
        </button>
      </div>
    </div>
  `;
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
};

function updateCart() {
  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const count = cart.reduce((acc, item) => acc + item.qty, 0);

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="text-center text-stone-400 py-10">Your bag is currently empty.</p>`;
    cartFooter.classList.add('hidden');
    cartBadge.classList.add('hidden');
  } else {
    cartBadge.textContent = count;
    cartBadge.classList.remove('hidden');
    cartFooter.classList.remove('hidden');
    cartTotalEl.textContent = `$${total.toFixed(2)}`;
    
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="flex space-x-6">
        <img src="${item.image}" class="w-20 h-20 rounded-2xl object-cover shadow-sm">
        <div class="flex-1">
          <div class="flex justify-between">
            <h4 class="font-serif text-lg text-stone-800">${item.name}</h4>
            <button onclick="removeFromCart('${item.id}')" class="text-stone-300 hover:text-rose-400">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <p class="text-stone-400 text-sm">Qty: ${item.qty} &times; $${item.price.toFixed(2)}</p>
        </div>
      </div>
    `).join('');
  }
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.remove('opacity-0', 'translate-y-8');
  toast.classList.add('opacity-100', 'translate-y-0');
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-8');
    toast.classList.remove('opacity-100', 'translate-y-0');
  }, 3000);
}

window.addToCart = function(id) {
  const product = ICE_CREAMS.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
  showToast(`Added ${product.name}!`);
};

window.removeFromCart = function(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
};

function renderReviews() {
  reviewsGrid.innerHTML = REVIEWS.map(rev => `
    <div class="p-10 rounded-[40px] bg-[#FFFDF5] border border-stone-50 hover:shadow-xl transition-shadow relative">
      <div class="flex items-center space-x-1 mb-6">
        ${Array(5).fill(0).map((_, i) => `
          <svg class="h-4 w-4 ${i < rev.rating ? 'text-amber-400' : 'text-stone-200'}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        `).join('')}
      </div>
      <p class="text-stone-700 italic mb-8">"${rev.comment}"</p>
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center font-serif text-rose-400 font-bold">${rev.user.charAt(0)}</div>
        <div>
          <h4 class="font-serif text-sm text-stone-800">${rev.user}</h4>
          <p class="text-[10px] text-stone-400 uppercase tracking-widest">${rev.date}</p>
        </div>
      </div>
    </div>
  `).join('');
}
window.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  renderReviews();
  // Animation for hero
  setTimeout(() => {
    document.getElementById('hero-title').classList.remove('opacity-0', 'translate-y-8');
  }, 100);
});

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderMenu();
});

categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryBtns.forEach(b => b.className = 'filter-btn px-6 py-2 rounded-full text-sm font-medium bg-stone-50 text-stone-500 hover:bg-stone-100');
    btn.className = 'filter-btn px-6 py-2 rounded-full text-sm font-medium bg-rose-100 text-rose-700 shadow-sm';
    currentCategory = btn.dataset.cat;
    renderMenu();
  });
});


document.getElementById('review-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('rev-name').value;
  const rating = parseInt(document.getElementById('rev-rating').value);
  const comment = document.getElementById('rev-comment').value;

  REVIEWS.unshift({
    id: 'r' + Date.now(),
    user: name,
    rating,
    comment,
    date: 'Just Now'
  });

  renderReviews();
  e.target.reset();
  showToast('Review submitted. Thank you!');
});

document.getElementById('signin-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  showToast(`Welcome back, ${email.split('@')[0]}!`);
});

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

