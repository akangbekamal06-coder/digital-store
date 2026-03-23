// ----------------------------
// ORDER ID FUNCTIONS
// ----------------------------
function generateOrderID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 8; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

function storeOrderID() {
    const orderID = generateOrderID();
    localStorage.setItem('orderID', orderID);
    return orderID;
}

function getOrderID() {
    return localStorage.getItem('orderID') || storeOrderID();
}

// ----------------------------
// PRODUCTS
// ----------------------------
const products = [
  {name:"EXPRESS VPN 1 MONTH", price:35, stock:10, image:"images/express-vpn.jpg", category:"VPN"},
  {name:"EXPRESS VPN 3 MONTHS", price:50, stock:10, image:"images/express-vpn.jpg", category:"VPN"},
  {name:"EXPRESS VPN 1 YEAR", price:70, stock:10, image:"images/express-vpn.jpg", category:"VPN"},
  {name:"PIA VPN 1 MONTH", price:45, stock:10, image:"images/pia-vpn.png", category:"VPN"},
  {name:"NORD VPN 1 MONTH", price:35, stock:10, image:"images/nord-vpn.png", category:"VPN"},

  {name:"NETFLIX 1 MONTH", price:25, stock:10, image:"images/netflix.png", category:"Accounts"},
  {name:"GMAIL ACCOUNT", price:25, stock:10, image:"images/gmail.jpg", category:"Accounts"},

  {name:"1GB MTN DATA", price:5, stock:100, image:"images/data-bundle.png", category:"Data"},
  {name:"5GB MTN DATA", price:25, stock:100, image:"images/data-bundle.png", category:"Data"},

  {name:"TEXTNOW ACCOUNT", price:25, stock:20, image:"images/textnow.png", category:"Messaging"}
];

// ----------------------------
// RENDER PRODUCTS
// ----------------------------
function renderProducts(category="all"){
  const container=document.querySelector(".products-list");
  container.innerHTML="";
  let filtered=products;

  if(category!=="all"){
    filtered=products.filter(p=>p.category===category);
  }

  filtered.forEach(p=>{
    const div=document.createElement("div");
    div.className="product-card";

    div.innerHTML=`
      <div>
        <img src="${p.image}" style="width:60px">
        <h4>${p.name}</h4>
      </div>

      <p>${p.price} GHC</p>

      <button onclick="addToCart('${p.name}', ${p.price})">
        Add to Cart
      </button>

      <button onclick="buyNow('${p.name}', ${p.price})">
        Buy Now
      </button>
    `;

    container.appendChild(div);
  });
}

// ----------------------------
// CART FUNCTIONS
// ----------------------------
function addToCart(name, price){
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.push({item:name, price:Number(price)});

  localStorage.setItem('cart', JSON.stringify(cart));

  updateSideCart();

  alert(name + " added to cart");
}

function updateSideCart(){
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  document.getElementById('cartCount').textContent = cart.length;

  const container = document.getElementById('sideCartItems');
  container.innerHTML = "";

  let total = 0;

  if(cart.length === 0){
    container.innerHTML = "<p>Your cart is empty</p>";
  }

  cart.forEach((item, index)=>{
    const div = document.createElement('div');

    div.style.display='flex';
    div.style.justifyContent='space-between';
    div.style.marginBottom='10px';

    div.innerHTML = `
      <span>${item.item} - GHC ${item.price}</span>
      <button onclick="removeFromCart(${index})">X</button>
    `;

    container.appendChild(div);

    total += Number(item.price);
  });

  document.getElementById('sideCartTotal').textContent = total;
}

function removeFromCart(index){
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.splice(index, 1);

  localStorage.setItem('cart', JSON.stringify(cart));

  updateSideCart();
}

// ----------------------------
// BUY NOW + CHECKOUT
// ----------------------------
function buyNow(name, price){
  const cart = [{item:name, price:Number(price)}];

  localStorage.setItem('cart', JSON.stringify(cart));

  updateSideCart();

  storeOrderID();

  window.location.href = 'checkout.html';
}

function goToCheckout(){
  window.location.href = 'checkout.html';
}

// ----------------------------
// CART OPEN / CLOSE
// ----------------------------
document.addEventListener("DOMContentLoaded", ()=>{

  renderProducts("all");
  updateSideCart();

  const sideCart = document.getElementById('sideCart');
  const cartIcon = document.getElementById('cartIcon');
  const closeBtn = document.getElementById('closeSideCart');

  cartIcon.addEventListener('click', ()=>{
    sideCart.style.right = '0';
    updateSideCart();
  });

  closeBtn.addEventListener('click', ()=>{
    sideCart.style.right = '-100%';
  });

  document.querySelectorAll('nav a').forEach(link=>{
    link.addEventListener('click', e=>{
      e.preventDefault();
      renderProducts(link.getAttribute('data-category'));
    });
  });

});
