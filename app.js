const products = {
  mat: {
    name: 'Merino Desk Mat XL',
    price: 49,
    tag: 'Bestseller',
    img: 'https://images.unsplash.com/photo-1518118014377-ce94f3eae7af?w=720&h=480&fit=crop&auto=format&q=85',
    desc: 'Die Merino Desk Mat XL ist aus hochwertigem Wollfilz gefertigt und schützt deinen Schreibtisch vor Kratzern. Die XL-Größe von 80×40 cm bietet genug Platz für Tastatur, Maus und Notizbuch — auch für Dual-Monitor-Setups ideal.',
    details: [
      'Maße: 80 × 40 cm, 5 mm stark',
      'Material: 100% Merinowolle, pflanzlich gefärbt',
      'Rutschfeste Unterseite aus Naturkautschuk',
      'Wasserabweisende Oberfläche, wischbar',
      'Erhältlich in 5 Farben: Sand, Schiefer, Olive, Burgundy, Anthrazit',
    ],
  },
  stand: {
    name: 'Oak Monitor Stand',
    price: 89,
    tag: 'Neu',
    img: 'https://images.unsplash.com/photo-1639244734551-c8ff9ffe500e?w=720&h=480&fit=crop&auto=format&q=85',
    desc: 'Der Oak Monitor Stand hebt deinen Bildschirm auf ergonomische Augenhöhe und schafft darunter ordentlich Platz für Tastatur, Festplatten oder Kabelboxen. Der integrierte USB-C Hub macht Kabelsalat überflüssig.',
    details: [
      'Material: FSC-zertifiziertes Massivholz (Eiche)',
      'Integrierter USB-C Hub: 3× USB-A, 1× USB-C PD, 1× HDMI',
      'Versteckter Kabelkanal an der Rückseite',
      'Trägt bis zu 25 kg',
      'Maße: 60 × 25 × 10 cm',
    ],
  },
  lamp: {
    name: 'Arc Desk Lamp',
    price: 69,
    tag: 'Top bewertet',
    img: 'https://images.unsplash.com/photo-1766524555120-9c2e886c72f5?w=720&h=480&fit=crop&auto=format&q=85',
    desc: 'Die Arc Desk Lamp kombiniert warmes, augenschonendes LED-Licht mit einem modernen Bogendesign. Stufenlos dimmbar per Touch, mit Memoryfunktion und integriertem USB-A Ladeport für Smartphone oder Kopfhörer.',
    details: [
      '3 Farbtemperaturen: 2700K / 4000K / 6500K',
      'Stufenlose Dimmung per Touch (10%–100%)',
      'Integrierter USB-A Ladeport (5W)',
      'Energieverbrauch: max. 12W, Lebensdauer 30.000h',
      'Schwenkbarer Arm, 360° drehbarer Kopf',
    ],
  },
  notebook: {
    name: 'Leather Notebook Holder',
    price: 35,
    tag: 'Klassiker',
    img: 'https://images.unsplash.com/photo-1761322572550-967ea8c0bfd9?w=720&h=480&fit=crop&auto=format&q=85',
    desc: 'Der Leather Notebook Holder hält dein A5-Notizbuch griffbereit auf dem Schreibtisch und gibt ihm einen festen Platz neben dem Laptop. Das pflanzlich gegerbte Leder entwickelt über die Jahre eine schöne Patina.',
    details: [
      'Material: Vegetabil gegerbtes Vollnarbenleder, 2 mm stark',
      'Passend für alle A5-Notizbücher (max. 15 mm Dicke)',
      'Stiftschlaufe für 1 Stift / Marker inklusive',
      'Farben: Cognac, Schwarz, Dunkelbraun',
      'Handgefertigt in Wien, Österreich',
    ],
  },
  pen: {
    name: 'Bamboo Pen Holder',
    price: 24,
    tag: 'Nachhaltig',
    img: 'https://images.unsplash.com/photo-1751107807635-a2ac6035e8dd?w=720&h=480&fit=crop&auto=format&q=85',
    desc: 'Der Bamboo Pen Holder hält deinen Schreibtisch aufgeräumt und sieht dabei noch gut aus. Fünf Fächer für Stifte, Scheren, Lineale und Kleinkram — aus schnell nachwachsendem FSC-zertifiziertem Bambus gefertigt.',
    details: [
      'Material: FSC-zertifizierter Bambus',
      '5 Fächer: 3 rund (Ø 4 cm) + 2 eckig (6×4 cm)',
      'Rutschfeste Unterseite, wasserabweisend lackiert',
      'Maße: 18 × 9 × 10 cm',
      'Vollständig kompostierbar / recycelbar',
    ],
  },
  cable: {
    name: 'Cable Clip Set (12er)',
    price: 19,
    tag: 'Set',
    img: 'https://images.unsplash.com/photo-1644463589256-02679b9c0767?w=720&h=480&fit=crop&auto=format&q=85',
    desc: 'Das Cable Clip Set hält bis zu 12 Kabel sauber an Ort und Stelle — am Schreibtisch, unter dem Tisch oder an der Wand. Der starke 3M-Kleber hält auch schwere Ladekabel, ohne zu verrutschen oder Farbe zu beschädigen.',
    details: [
      '12 Clips aus recyceltem Aluminium',
      '3M-Klebepad — rückstandsfrei entfernbar',
      'Kabelstärke: kompatibel mit 3–12 mm Durchmesser',
      'Haftkraft: bis zu 500g pro Clip',
      'Farbe: Space Grey / Silver / Black (Set gemischt)',
    ],
  },
};

/* --- Cart --- */
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

  footerEl.style.display = 'flex';
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
  setTimeout(() => { cart.length = 0; updateCartUI(); closeCart(); }, 1500);
}

/* --- Product Modal --- */
function openProduct(id) {
  const p = products[id];
  if (!p) return;

  // Fill text immediately
  document.getElementById('modalTag').textContent = p.tag;
  document.getElementById('modalName').textContent = p.name;
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('modalPrice').textContent = `€ ${p.price.toFixed(2).replace('.', ',')}`;
  document.getElementById('modalDetails').innerHTML = p.details.map(d => `<li>${d}</li>`).join('');
  document.getElementById('modalCartBtn').onclick = () => {
    addToCart(p.name, p.price);
    closeProduct();
  };

  // Reset image: hide old image immediately, load new one in background
  const modalImg = document.getElementById('modalImg');
  modalImg.classList.remove('loaded');
  modalImg.src = '';
  modalImg.alt = p.name;

  const tmp = new Image();
  tmp.onload = () => {
    modalImg.src = tmp.src;
    // Force reflow so transition fires
    requestAnimationFrame(() => requestAnimationFrame(() => modalImg.classList.add('loaded')));
  };
  tmp.src = p.img;

  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProduct() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeProduct(); closeCart(); }
});

/* Fade in card images once loaded */
document.querySelectorAll('.product-card__img img').forEach(img => {
  if (img.complete) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => img.classList.add('loaded'));
  }
});

/* --- Toast --- */
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}
