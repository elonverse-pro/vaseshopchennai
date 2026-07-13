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
