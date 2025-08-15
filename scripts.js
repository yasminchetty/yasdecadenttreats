// ==== MENU MODAL & CART FUNCTIONALITY ====
const cards = document.querySelectorAll('.card');
const modal = document.getElementById('product-modal');
const modalImg = document.getElementById('modal-img');
const modalName = document.getElementById('modal-name');
const modalFlavors = document.getElementById('modal-flavors');
const modalPrice = document.getElementById('modal-price');
const modalQty = document.getElementById('modal-qty');
const modalAddCart = document.getElementById('modal-add-cart');
const closeModal = document.querySelector('.modal .close');

let cart = [];

// OPEN MODAL WHEN CARD CLICKED
cards.forEach(card => {
  card.addEventListener('click', () => {
    modalName.textContent = card.dataset.name;
    modalFlavors.textContent = "Flavors: " + card.dataset.flavors;
    modalPrice.textContent = card.dataset.price;
    modalImg.src = card.dataset.img;
    modalQty.value = 1;
    modal.style.display = 'flex';
  });
});

// CLOSE MODAL
closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => { if(e.target === modal) modal.style.display='none'; });

// ==== CART SIDEBAR ====
const cartToggle = document.getElementById('cart-toggle');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsList = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');

// OPEN CART
cartToggle.addEventListener('click', () => {
  cartSidebar.classList.add('active');
  updateCart(); // Always update to show empty message if no items
});

// CLOSE CART
closeCartBtn.addEventListener('click', () => cartSidebar.classList.remove('active'));

// ADD ITEM TO CART
modalAddCart.addEventListener('click', () => {
  const name = modalName.textContent;
  const price = parseFloat(modalPrice.textContent);
  const qty = parseInt(modalQty.value);

  const existing = cart.find(item => item.name === name);
  if(existing) existing.qty += qty;
  else cart.push({ name, price, qty });

  updateCart();
  modal.style.display = 'none';
});

// UPDATE CART DISPLAY
function updateCart() {
  cartItemsList.innerHTML = '';
  let total = 0;

  if(cart.length === 0){
    const li = document.createElement('li');
    li.textContent = "Your cart is empty.";
    li.style.fontStyle = "italic";
    li.style.color = "#6B4226";
    cartItemsList.appendChild(li);
  }

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.qty} - R${(item.price * item.qty).toFixed(2)}`;
    cartItemsList.appendChild(li);
    total += item.price * item.qty;
  });

  cartTotalEl.textContent = total.toFixed(2);
}
