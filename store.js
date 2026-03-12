  // Products Data
const productsData = {
  data:[
    { name:"1GB MTN DATA", price:5, image:"images/data-bundle.png" },
    { name:"2GB MTN DATA", price:10, image:"images/data-bundle.png" },
    { name:"3GB MTN DATA", price:15, image:"images/data-bundle.png" },
    { name:"4GB MTN DATA", price:20, image:"images/data-bundle.png" },
    { name:"5GB MTN DATA", price:25, image:"images/data-bundle.png" }
  ],
  nordvpn:[
    { name:"NORD VPN 1 MONTH", price:25, image:"images/nord-vpn.png" },
    { name:"NORD VPN 1 YEAR", price:70, image:"images/nord-vpn.png" }
  ],
  piavpn:[
    { name:"PIA VPN 1 MONTH", price:40, image:"images/pia-vpn.png" },
    { name:"PIA VPN 3 MONTHS", price:55, image:"images/pia-vpn.png" },
    { name:"PIA VPN 1 YEAR", price:85, image:"images/pia-vpn.png" }
  ],
  textvoice:[
    { name:"TEXTNOW ACCOUNT", price:25, image:"images/textnow.png" },
    { name:"TEXTFREE ACCOUNT", price:20, image:"images/textfree.png" }
  ],
  netflix:[
    { name:"1 Month Netflix Account", price:20, image:"images/netflix.png" }
  ]
};

// Elements
const productsDiv = document.getElementById("products");
const toastContainer = document.getElementById("toastContainer");

// Toast Notification
function showToast(msg){
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = msg;
  toastContainer.appendChild(toast);
  setTimeout(()=>{ toast.remove(); }, 3000);
}

// Display Products
function addProductCard(product){
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <div class="price">GH₵${product.price}</div>
    <button class="btn buy" onclick="addToCart('${product.name}',${product.price})">Add to Cart</button>
    <button class="btn buy-now" onclick="payWithPaystack('${product.name}',${product.price})">Buy Now</button>
  `;
  productsDiv.appendChild(card);
}

function showAllProducts(){ productsDiv.innerHTML=""; for(let cat in productsData) productsData[cat].forEach(addProductCard); }
window.onload = showAllProducts;

// Filter
function filterCategory(category){
  productsDiv.innerHTML="";
  if(category==='all'){ showAllProducts(); return; }
  productsData[category].forEach(addProductCard);
}

// Search
function searchProducts(){
  let input = document.getElementById("searchInput").value.toLowerCase();
  productsDiv.innerHTML="";
  for(let cat in productsData){
    productsData[cat].forEach(p=>{ if(p.name.toLowerCase().includes(input)) addProductCard(p); });
  }
}

// Cart
function openCart(){ document.getElementById("cartPanel").classList.add("show"); loadCart(); }
function closeCart(){ document.getElementById("cartPanel").classList.remove("show"); }

function addToCart(name,price){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({name,price});
  localStorage.setItem("cart",JSON.stringify(cart));
  loadCart();
  showToast(`${name} added to cart`);
}

function loadCart(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cartItems");
  let total=0; cartItems.innerHTML="";
  cart.forEach((item,index)=>{ total+=item.price;
    cartItems.innerHTML+=`<div class="cart-item">
      <span>${item.name}</span>
      <span>GH₵${item.price}</span>
      <button class="remove-btn" onclick="removeItem(${index})">X</button>
    </div>`;
  });
  document.getElementById("cartTotal").innerText = total;
}

function removeItem(index){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index,1); localStorage.setItem("cart",JSON.stringify(cart)); loadCart();
}

function checkoutCart(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if(cart.length===0){ showToast("Your cart is empty."); return; }
  let total = cart.reduce((sum,item)=>sum+item.price,0);
  showToast(`Total: GH₵${total}. Use Buy Now buttons to pay.`);
}

// Paystack
function payWithPaystack(name,amount){
  let email = prompt("Enter your email");
  if(!email) return;
  let handler = PaystackPop.setup({
    key:'pk_live_76e7df83f71c725b7e10d514b3c935324a97761e',
    email: email,
    amount: amount*100,
    currency:"GHS",
    callback: function(){ showToast(`${name} purchased successfully!`); },
    onClose: function(){ showToast("Payment cancelled."); }
  });
  handler.openIframe();
}

// Slide-in Menu
function openMenu(){ document.getElementById("sideMenu").classList.add("show"); document.getElementById("menuOverlay").classList.add("show"); if(window.innerWidth>768) document.querySelector(".container").style.marginLeft="260px"; }
function closeMenu(){ document.getElementById("sideMenu").classList.remove("show"); document.getElementById("menuOverlay").classList.remove("show"); document.querySelector(".container").style.marginLeft="0"; }

// Live Support Panel
function openLiveSupport(){ document.getElementById("liveSupportPanel").classList.add("show"); }
function closeLiveSupport(){ document.getElementById("liveSupportPanel").classList.remove("show"); }
