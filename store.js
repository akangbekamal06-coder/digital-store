// ----------------------------
// PRODUCTS
// ----------------------------
const products = [

{name:"EXPRESS VPN 1 MONTH", price:45, image:"images/express-vpn.jpg", category:"VPN"},
{name:"EXPRESS VPN 3 MONTHS", price:50, image:"images/express-vpn.jpg", category:"VPN"},
{name:"EXPRESS VPN 1 YEAR", price:90, image:"images/express-vpn.jpg", category:"VPN"},

{name:"PIA VPN 1 MONTH", price:45, image:"images/pia-vpn.png", category:"VPN"},
{name:"PIA VPN 3 MONTHS", price:65, image:"images/pia-vpn.png", category:"VPN"},
{name:"PIA VPN 1 YEAR", price:90, image:"images/pia-vpn.png", category:"VPN"},

{name:"HMA PRO VPN 1 MONTH", price:45, image:"images/hma-vpn.jpg", category:"VPN"},
{name:"HMA PRO VPN 1 YEAR", price:90, image:"images/hma-vpn.jpg", category:"VPN"},

{name:"IPVANISH VPN 6 MONTHS", price:55, image:"images/ipvanish-vpn.jpg", category:"VPN"},
{name:"IPVANISH VPN 1 YEAR", price:90, image:"images/ipvanish-vpn.jpg", category:"VPN"},

{name:"NORD VPN 1 MONTH", price:45, image:"images/nord-vpn.png", category:"VPN"},
{name:"NORD VPN 1 YEAR", price:90, image:"images/nord-vpn.png", category:"VPN"},
{name:"NORD VPN 2 YEARS", price:120, image:"images/nord-vpn.png", category:"VPN"},

{name:"CYBER GHOST VPN 1 MONTH", price:45, image:"images/cyberghost-vpn.jpg", category:"VPN"},
{name:"CYBER GHOST VPN 6 MONTHS", price:50, image:"images/cyberghost-vpn.jpg", category:"VPN"},
{name:"CYBER GHOST VPN 2 YEARS", price:90, image:"images/cyberghost-vpn.jpg", category:"VPN"},

{name:"SURFSHARK VPN 1 MONTH", price:45, image:"images/surfshark-vpn.jpg", category:"VPN"},

{name:"GMAIL PHONE VERIFIED ACCOUNT", price:25, image:"images/gmail.jpg", category:"Accounts"},
{name:"GOOGLE VOICE ACCOUNT", price:40, image:"images/google-voice.png", category:"Accounts"},
{name:"NETFLIX 1 MONTH", price:25, image:"images/netflix.png", category:"Accounts"},

{name:"1GB MTN DATA BUNDLE", price:5, image:"images/data-bundle.png", category:"Data"},
{name:"2GB MTN DATA BUNDLE", price:10, image:"images/data-bundle.png", category:"Data"},
{name:"3GB MTN DATA BUNDLE", price:15, image:"images/data-bundle.png", category:"Data"},
{name:"4GB MTN DATA BUNDLE", price:20, image:"images/data-bundle.png", category:"Data"},
{name:"5GB MTN DATA BUNDLE", price:25, image:"images/data-bundle.png", category:"Data"},
{name:"6GB MTN DATA BUNDLE", price:30, image:"images/data-bundle.png", category:"Data"},
{name:"8GB MTN DATA BUNDLE", price:40, image:"images/data-bundle.png", category:"Data"},
{name:"10GB MTN DATA BUNDLE", price:45, image:"images/data-bundle.png", category:"Data"},
{name:"15GB MTN DATA BUNDLE", price:65, image:"images/data-bundle.png", category:"Data"},
{name:"10GB TELECEL DATA BUNDLE", price:42, image:"images/telecel.jpg", category:"Data"},

{name:"TEXTNOW ACCOUNT", price:25, image:"images/textnow.png", category:"Messaging"},
{name:"TEXTFREE ACCOUNT", price:20, image:"images/textfree.png", category:"Messaging"},

{name:"9 PROXY REFILLS – 10 IPs", price:30, image:"images/proxy.jpg", category:"Proxies"},
{name:"9 PROXY REFILLS – 20 IPs", price:60, image:"images/proxy.jpg", category:"Proxies"},
{name:"9 PROXY REFILLS – 50 IPs", price:100, image:"images/proxy.jpg", category:"Proxies"},
{name:"9 PROXY REFILLS – 150 IPs", price:300, image:"images/proxy.jpg", category:"Proxies"}

];

// ------------------ RENDER ------------------
function renderProducts(category="all"){
const container=document.querySelector(".products-list");
container.innerHTML="";

let filtered = category==="all" ? products : products.filter(p=>p.category===category);

filtered.forEach(p=>{
container.innerHTML+=`
<div class="product-card">
<div class="product-info">
<img src="${p.image}">
<div class="product-details">
<span>${p.name}</span>
</div>
</div>

<div class="product-price-stock">
<span class="price">GHC ${p.price}</span>

<div class="btns">
<button class="add-cart-btn" onclick="addToCart('${p.name}',${p.price})">Add to Cart</button>
<button class="purchase-btn" onclick="buyNow('${p.name}',${p.price})">Buy Now</button>
</div>
</div>
</div>`;
});
}

// ------------------ CART ------------------
function addToCart(name,price){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
cart.push({item:name,price:Number(price)});
localStorage.setItem("cart",JSON.stringify(cart));
updateCart();
}

function buyNow(name,price){
localStorage.setItem("cart",JSON.stringify([{item:name,price:Number(price)}]));
updateCart();
openCart();
}

function updateCart(){
let cart=JSON.parse(localStorage.getItem("cart"))||[];
document.getElementById("cartCount").textContent=cart.length;

let total=0;
const container=document.getElementById("sideCartItems");
container.innerHTML="";

cart.forEach((item,i)=>{
total+=item.price;

container.innerHTML+=`
<div class="cart-item">
<span>${item.item}</span>
<span>GHC ${item.price}</span>
<button onclick="removeItem(${i})">×</button>
</div>`;
});

document.getElementById("sideCartTotal").textContent=total;
}

function removeItem(i){
let cart=JSON.parse(localStorage.getItem("cart"));
cart.splice(i,1);
localStorage.setItem("cart",JSON.stringify(cart));
updateCart();
}

// ------------------ WHATSAPP CHECKOUT ------------------
function sendToWhatsApp(){
  let email = document.getElementById("customerEmail").value;
  let phone = document.getElementById("customerPhone").value;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if(cart.length === 0){
    alert("Cart is empty");
    return;
  }

  if(!email || !phone){
    alert("Enter email and phone");
    return;
  }

  let message = "🛒 *NEW ORDER* %0A%0A";
  let total = 0;

  cart.forEach((item, i) => {
    message += `${i+1}. ${item.item} - GHC ${item.price}%0A`;
    total += item.price;
  });

  message += `%0A💰 Total: GHC ${total}%0A`;
  message += `📧 Email: ${email}%0A`;
  message += `📱 Phone: ${phone}%0A`;
  message += `%0A✅ Paid to MoMo (MUDA)`;

  let url = `https://wa.me/233509329683?text=${message}`;

  window.open(url, "_blank");

  localStorage.removeItem("cart");
  updateCart();
}

// ------------------ UI CONTROL ------------------
function openCart(){
sideCart.style.display="block";
sideCart.style.right="0";
}

function closeCart(){
sideCart.style.right="-100%";
}

// ------------------ INIT ------------------
document.addEventListener("DOMContentLoaded",()=>{
renderProducts();
updateCart();

cartIcon.onclick=openCart;
closeSideCart.onclick=closeCart;

document.querySelectorAll("nav a").forEach(link=>{
link.onclick=(e)=>{
e.preventDefault();
renderProducts(link.dataset.category);
};
});
});
