/* Vape CHN storefront interactions: intentionally framework-free and lightweight. */
document.addEventListener('DOMContentLoaded', () => {
  const $ = (s, scope = document) => scope.querySelector(s);
  const $$ = (s, scope = document) => [...scope.querySelectorAll(s)];
  const toast = $('.toast');
  let toastTimer;
  const notify = message => { toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2600); };

  // Mobile navigation
  const menu = $('.menu-toggle'), panel = $('.nav-panel');
  menu.addEventListener('click', () => { const open = panel.classList.toggle('open'); menu.setAttribute('aria-expanded', open); menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); });
  $$('.nav-links a').forEach(link => link.addEventListener('click', () => { panel.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }));

  // Mouse-following ambient light (disabled for touch / reduced motion).
  const glow = $('.cursor-glow');
  if (!matchMedia('(pointer: coarse)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) document.addEventListener('pointermove', e => { glow.style.left = `${e.clientX}px`; glow.style.top = `${e.clientY}px`; });

  // Scroll reveal
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }), { threshold: .12 });
  $$('.reveal').forEach(el => revealObserver.observe(el));

  // Wishlist
  let wishlist = 0;
  $$('.heart').forEach(button => button.addEventListener('click', () => { const liked = button.classList.toggle('liked'); button.textContent = liked ? '♥' : '♡'; wishlist += liked ? 1 : -1; $('.wishlist-count b').textContent = wishlist; notify(liked ? 'Saved to your wishlist.' : 'Removed from your wishlist.'); }));

  // Cart
  const drawer = $('.cart-drawer'), overlay = $('.drawer-overlay'), cartItems = $('.cart-items'), total = $('.cart-total b');
  const cart = [];
  const updateCart = () => { const count = cart.length; $('.cart-count').textContent = count; total.textContent = `₹${cart.reduce((sum, item) => sum + item.price, 0).toLocaleString('en-IN')}`; cartItems.innerHTML = count ? cart.map((item, i) => `<div class="cart-line"><span>${item.name}<br><b>₹${item.price.toLocaleString('en-IN')}</b></span><button data-remove="${i}" aria-label="Remove ${item.name}">×</button></div>`).join('') : '<p class="empty-cart">Your bag is waiting for something special.</p>'; $$('[data-remove]', cartItems).forEach(btn => btn.addEventListener('click', () => { cart.splice(Number(btn.dataset.remove), 1); updateCart(); })); };
  const toggleCart = open => { drawer.classList.toggle('open', open); overlay.classList.toggle('open', open); drawer.setAttribute('aria-hidden', !open); };
  $('.cart-trigger').addEventListener('click', () => toggleCart(true)); $('.drawer-close').addEventListener('click', () => toggleCart(false)); overlay.addEventListener('click', () => toggleCart(false));
  $$('.add-cart').forEach(button => button.addEventListener('click', e => { const card = e.target.closest('.product-card'); cart.push({ name: card.dataset.name, price: Number(card.dataset.price) }); updateCart(); notify(`${card.dataset.name} added to your bag.`); }));
  $('.checkout').addEventListener('click', () => notify('Checkout will be available shortly.'));

  // Quick view gives an accessible, useful product action without a heavy modal.
  $$('.quick-view').forEach(button => button.addEventListener('click', e => { const name = e.target.closest('.product-card').dataset.name; notify(`${name} · Details opening soon.`); }));

  // A dense, image-first top collection. Product data is generated locally so the
  // page stays fast while still providing a full 100-item browsing experience.
  const flavours = ['Arctic Berry', 'Citrus Mango', 'Grape Frost', 'Watermelon Mint', 'Blue Razz Ice', 'Peach Lychee', 'Kiwi Melon', 'Cherry Cola', 'Lemon Lime', 'Blackcurrant Ice', 'Tropical Punch', 'Strawberry Mint', 'Passionfruit Ice', 'Apple Peach', 'Berry Blast', 'Mango Guava', 'Raspberry Ice', 'Coconut Melon', 'Pineapple Citrus', 'Minty Grape'];
  const types = ['disposable', 'pod', 'salt'];
  const defaultCollection = Array.from({ length: 100 }, (_, index) => {
    const type = types[index % types.length];
    return { id: index + 1, type, flavour: flavours[index % flavours.length], name: `Vape CHN ${type === 'pod' ? 'Pulse Pod' : type === 'salt' ? 'Reserve Salt' : 'Aura'} · ${flavours[index % flavours.length]}`, price: type === 'pod' ? 2499 : type === 'salt' ? 899 : 1899, position: ['0% 0%', '100% 0%', '0% 100%', '100% 100%'][index % 4], image: '' };
  });
  let collection;
  try { collection = JSON.parse(localStorage.getItem('vapeChnProducts')) || defaultCollection; } catch { collection = defaultCollection; }
  let storeSettings;
  try { storeSettings = JSON.parse(localStorage.getItem('vapeChnSettings')) || { storeName: 'Vape Shop Chennai', whatsapp: '919000000000', call: '+91 90000 00000' }; } catch { storeSettings = { storeName: 'Vape Shop Chennai', whatsapp: '919000000000', call: '+91 90000 00000' }; }
  const catalogueGrid = $('#catalogue-grid');
  const renderCatalogue = filter => {
    const products = filter === 'all' ? collection : collection.filter(item => item.type === filter);
    catalogueGrid.innerHTML = products.map(item => `<article class="catalogue-item" data-name="${item.name}" data-price="${item.price}"><div class="catalogue-visual ${item.image ? 'custom-product-image' : ''}" style="--image-position:${item.position};${item.image ? `background-image:url('${item.image}')` : ''}"><span class="catalogue-number">#${String(item.id).padStart(3, '0')}</span><button class="catalogue-buy" aria-label="Buy ${item.name}">Buy now</button><button class="catalogue-add" aria-label="Add ${item.name} to cart">+</button></div><h3>${item.name}</h3><div class="catalogue-meta"><span>${item.type} · ${item.flavour}</span><b>₹${item.price.toLocaleString('en-IN')}</b></div></article>`).join('');
    $$('.catalogue-add', catalogueGrid).forEach(button => button.addEventListener('click', event => { const item = event.target.closest('.catalogue-item'); cart.push({ name: item.dataset.name, price: Number(item.dataset.price) }); updateCart(); notify(`${item.dataset.name} added to your bag.`); }));
    $$('.catalogue-buy', catalogueGrid).forEach(button => button.addEventListener('click', event => openOrder(event.target.closest('.catalogue-item').dataset.name, Number(event.target.closest('.catalogue-item').dataset.price))));
  };
  renderCatalogue('all');
  $$('.catalogue-filter').forEach(button => button.addEventListener('click', () => { $$('.catalogue-filter').forEach(item => item.classList.remove('active')); button.classList.add('active'); renderCatalogue(button.dataset.filter); }));

  // Buy-now contact flow, controlled by the numbers stored in the local admin panel.
  const orderModal = $('#order-modal');
  const openOrder = (name, price) => { const message = encodeURIComponent(`Hello ${storeSettings.storeName}, I want to order ${name} (₹${price.toLocaleString('en-IN')}). Please confirm availability.`); $('.order-product-name').textContent = `${name} · ₹${price.toLocaleString('en-IN')}`; $('.whatsapp-order').href = `https://wa.me/${storeSettings.whatsapp}?text=${message}`; $('.call-order').href = `tel:${storeSettings.call.replace(/\s/g, '')}`; orderModal.classList.add('open'); orderModal.setAttribute('aria-hidden', 'false'); };
  $('.order-close').addEventListener('click', () => { orderModal.classList.remove('open'); orderModal.setAttribute('aria-hidden', 'true'); });
  orderModal.addEventListener('click', event => { if (event.target === orderModal) { orderModal.classList.remove('open'); orderModal.setAttribute('aria-hidden', 'true'); } });

  // Search overlay
  const search = $('.search-modal');
  $('.search-trigger').addEventListener('click', () => { search.classList.add('open'); search.setAttribute('aria-hidden', 'false'); $('input', search).focus(); });
  $('.search-close').addEventListener('click', () => { search.classList.remove('open'); search.setAttribute('aria-hidden', 'true'); });
  $('input', search).addEventListener('input', e => { const query = e.target.value.toLowerCase(); $$('.product-card').forEach(card => card.style.display = !query || card.dataset.name.toLowerCase().includes(query) ? '' : 'none'); });

  // Testimonial carousel
  const testimonials = [
    ['The most considered vape store in Chennai. The recommendations are always spot on and delivery is ridiculously quick.', 'Arjun M.', 'Verified customer · Adyar'],
    ['Beautifully packed, authentic products and a genuinely premium experience from first click to doorstep.', 'Sanjana R.', 'Verified customer · Nungambakkam'],
    ['They know their flavours. I found my daily favourite after one very helpful conversation.', 'Vikram K.', 'Verified customer · OMR']
  ];
  $$('.quote-dots button').forEach((dot, index) => dot.addEventListener('click', () => { $('#testimonial-quote').textContent = testimonials[index][0]; $('#testimonial-name').textContent = testimonials[index][1]; $('#testimonial-role').textContent = testimonials[index][2]; $$('.quote-dots button').forEach(d => d.classList.remove('active')); dot.classList.add('active'); }));

  $('#newsletter-form').addEventListener('submit', e => { e.preventDefault(); $('.form-message').textContent = 'You’re on the list. Welcome to the inner circle.'; e.currentTarget.reset(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { toggleCart(false); search.classList.remove('open'); } });
});
