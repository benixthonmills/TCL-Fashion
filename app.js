// ============================================
// TCL FASHION — APP LOGIC
// ============================================

const state = {
  filter: "all",
  cart: [], // { id, qty }
};

const els = {
  grid: document.getElementById("productGrid"),
  filterRow: document.getElementById("filterRow"),
  bagBtn: document.getElementById("bagBtn"),
  bagCount: document.getElementById("bagCount"),
  drawer: document.getElementById("bagDrawer"),
  drawerOverlay: document.getElementById("drawerOverlay"),
  drawerClose: document.getElementById("drawerClose"),
  drawerItems: document.getElementById("drawerItems"),
  drawerTotal: document.getElementById("drawerTotal"),
  navToggle: document.getElementById("navToggle"),
  mainNav: document.getElementById("mainNav"),
  signupForm: document.getElementById("signupForm"),
  signupNote: document.getElementById("signupNote"),
};

// ---------- Rendering products ----------
function categoryLabel(cat) {
  const labels = {
    prom: "Prom",
    wedding: "Wedding Guest",
    graduation: "Graduation",
    party: "Party",
  };
  return labels[cat] || cat;
}

function formatPrice(n) {
  return `€${n.toFixed(2)}`;
}

function renderProducts() {
  const list =
    state.filter === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === state.filter);

  els.grid.innerHTML = list
    .map((p) => {
      const tagHtml = p.tag
        ? `<span class="product-card__tag">${p.tag}</span>`
        : "";
      const priceHtml = p.wasPrice
        ? `<span class="was">${formatPrice(p.wasPrice)}</span><span class="now">${formatPrice(p.price)}</span>`
        : `<span class="now">${formatPrice(p.price)}</span>`;

      return `
        <article class="product-card">
          <div class="product-card__media" data-id="${p.id}">
            ${tagHtml}
            <button class="product-card__wish" aria-label="Save to wishlist">
              <svg viewBox="0 0 24 24" fill="none"><path d="M12 21s-7.5-4.6-10-9.2C0.3 8.5 1.6 5 5 4c2.2-.6 4.3.4 5.5 2.2C11.7 4.4 13.8 3.4 16 4c3.4 1 4.7 4.5 3 7.8C19.5 16.4 12 21 12 21Z" stroke="#2B2230" stroke-width="1.6"/></svg>
            </button>
            <div class="product-card__face product-card__face--main" style="background:${p.mainColor}"></div>
            <div class="product-card__face product-card__face--alt" style="background:${p.altColor}"></div>
            <div class="product-card__quickadd" data-add="${p.id}">+ Quick Add</div>
          </div>
          <div class="product-card__info">
            <div class="product-card__name">${p.name}</div>
            <div class="product-card__category">${categoryLabel(p.category)}</div>
            <div class="product-card__price">${priceHtml}</div>
          </div>
        </article>
      `;
    })
    .join("");
}

// ---------- Filtering ----------
function setFilter(filter) {
  state.filter = filter;
  document.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.classList.toggle("is-active", chip.dataset.filter === filter);
  });
  renderProducts();
}

els.filterRow.addEventListener("click", (e) => {
  const chip = e.target.closest(".filter-chip");
  if (!chip) return;
  setFilter(chip.dataset.filter);
});

document.querySelectorAll(".occasion-card").forEach((card) => {
  card.addEventListener("click", () => {
    setFilter(card.dataset.filter);
    document.getElementById("new-in").scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll(".main-nav a[data-tag]").forEach((link) => {
  link.addEventListener("click", (e) => {
    setFilter(link.dataset.tag);
  });
});

// ---------- Cart ----------
function addToCart(id) {
  const existing = state.cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ id, qty: 1 });
  }
  renderCart();
  openDrawer();
}

function removeFromCart(id) {
  state.cart = state.cart.filter((item) => item.id !== id);
  renderCart();
}

function cartCount() {
  return state.cart.reduce((sum, item) => sum + item.qty, 0);
}

function cartTotal() {
  return state.cart.reduce((sum, item) => {
    const product = PRODUCTS.find((p) => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

function renderCart() {
  els.bagCount.textContent = cartCount();

  if (state.cart.length === 0) {
    els.drawerItems.innerHTML = `<p class="drawer__empty">Your bag is empty. Let's fix that.</p>`;
  } else {
    els.drawerItems.innerHTML = state.cart
      .map((item) => {
        const p = PRODUCTS.find((prod) => prod.id === item.id);
        if (!p) return "";
        return `
          <div class="drawer-item">
            <div class="drawer-item__swatch" style="background:${p.mainColor}"></div>
            <div class="drawer-item__info">
              <div class="drawer-item__name">${p.name}</div>
              <div class="drawer-item__meta">Qty ${item.qty} · ${categoryLabel(p.category)}</div>
              <div class="drawer-item__price">${formatPrice(p.price * item.qty)}</div>
              <button class="drawer-item__remove" data-remove="${p.id}">Remove</button>
            </div>
          </div>
        `;
      })
      .join("");
  }

  els.drawerTotal.textContent = formatPrice(cartTotal());
}

els.grid.addEventListener("click", (e) => {
  const addBtn = e.target.closest("[data-add]");
  if (addBtn) {
    addToCart(addBtn.dataset.add);
    return;
  }
  const media = e.target.closest(".product-card__media");
  if (media && !e.target.closest(".product-card__wish")) {
    addToCart(media.dataset.id);
  }
});

els.drawerItems.addEventListener("click", (e) => {
  const removeBtn = e.target.closest("[data-remove]");
  if (removeBtn) removeFromCart(removeBtn.dataset.remove);
});

function openDrawer() {
  els.drawer.classList.add("is-open");
  els.drawer.setAttribute("aria-hidden", "false");
}
function closeDrawer() {
  els.drawer.classList.remove("is-open");
  els.drawer.setAttribute("aria-hidden", "true");
}
els.bagBtn.addEventListener("click", openDrawer);
els.drawerClose.addEventListener("click", closeDrawer);
els.drawerOverlay.addEventListener("click", closeDrawer);

// ---------- Mobile nav ----------
els.navToggle.addEventListener("click", () => {
  const isOpen = els.mainNav.classList.toggle("is-open");
  els.navToggle.setAttribute("aria-expanded", String(isOpen));
});

// ---------- Newsletter ----------
els.signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  els.signupNote.textContent = "You're on the list! Welcome to TCL Fashion 💌";
  els.signupForm.reset();
});

// ---------- Init ----------
renderProducts();
renderCart();
