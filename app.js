const cart = [];

function addToCart(name, price) {
  cart.push({ name, price, id: Date.now() });
  updateCartUI();
  showToast(`"${name}" zum Warenkorb hinzugefügt`);
}

function removeFromCart(id) {
  const idx = cart.findIndex(i => i.id === id);
  if (idx !== -1) cart.splice(idx, 1);
  updateCartUI();
}

function updateCartUI() {
  const count = cart.length;
  document.getElementById('cartCount').textContent = count;

  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');

  if (count === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Dein Warenkorb ist leer.</p>';
    footerEl.style.display = 'none';
    return;
  }

  footerEl.style.display = 'block';
  const total = cart.reduce((s, i) => s + i.price, 0);
  document.getElementById('cartTotal').textContent = `€ ${total.toFixed(2).replace('.', ',')}`;

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span class="cart-item__name">${item.name}</span>
      <span class="cart-item__price">€ ${item.price.toFixed(2).replace('.', ',')}</span>
      <button class="cart-item__remove" onclick="removeFromCart(${item.id})">✕</button>
    </div>
  `).join('');
}

function openCart() {
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
}

function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
}

function checkout() {
  showToast('Danke! Zahlung wird simuliert… (Demo)');
  setTimeout(() => {
    cart.length = 0;
    updateCartUI();
    closeCart();
  }, 1500);
}

function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
