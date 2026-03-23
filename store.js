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

// ----------------------------
// RENDER PRODUCTS
// ----------------------------
function renderProducts(category="all"){
const container = document.querySelector(".products-list");
container.innerHTML = "";

let filtered = category === "all" ? products : products.filter(p => p.category === category);

filtered.forEach(p=>{
container.innerHTML += `
<div class="product-card">
  <div class="product-info">
    <img src="${p.image}">
    <div class="product-details">
      <span>${p.name}</span>
    </div>
  </div>

  <div class="product-price-stock">
    <span class="price">${p.price}GHC</span>

    <button class="purchase-btn" onclick="addToCart('${p.name}',${p.price})">
      Add to Cart
    </button>
  </div>
</div>`;
});
}

// ----------------------------
// CART
// ----------------------------
function addToCart(name,price){
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cart.push({item:name, price:Number(price)});
localStorage.setItem("cart", JSON.stringify(cart));
updateCart();
alert(name + " added to cart");
}

function updateCart(){
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.getElementById("cartCount").textContent = cart.length;

let total = 0;
const container = document.getElementById("sideCartItems");
container.innerHTML = "";

if(cart.length === 0){
container.innerHTML = "<p>Your cart is empty</p>";
}

cart.forEach((item,i)=>{
total += item.price;

container.innerHTML += `
<div style="display:flex;justify-content:space-between;margin-bottom:8px;">
<span>${item.item} - GHC ${item.price}</span>
<button onclick="removeItem(${i})">X</button>
</div>`;
});

document.getElementById("sideCartTotal").textContent = total;
}

function removeItem(i){
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cart.splice(i,1);
localStorage.setItem("cart", JSON.stringify(cart));
updateCart();
}

// ----------------------------
// PAYSTACK
// ----------------------------
function payWithPaystack(){

let email = document.getElementById("customerEmail").value;
let phone = document.getElementById("customerPhone").value;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

if(!email || !phone){
alert("Enter email and phone");
return;
}

if(cart.length === 0){
alert("Cart is empty");
return;
}

let total = 0;
cart.forEach(i => total += i.price);

let handler = PaystackPop.setup({
key: "pk_live_76e7df83f71c725b7e10d514b3c935324a97761e",
email: email,
amount: total * 100,
currency: "GHS",

callback: function(res){
localStorage.setItem("receipt", JSON.stringify({
email,
phone,
cart,
total,
ref: res.reference
}));

localStorage.removeItem("cart");

window.location.href = "receipt.html";
},

onClose: function(){
alert("Payment cancelled");
}
});

handler.openIframe();
}

// ----------------------------
// INIT
// ----------------------------
document.addEventListener("DOMContentLoaded",()=>{

renderProducts();
updateCart();

// OPEN CART
const sideCart = document.getElementById("sideCart");
const cartIcon = document.getElementById("cartIcon");
const closeBtn = document.getElementById("closeSideCart");

cartIcon.onclick = ()=>{
sideCart.style.display = "block";
sideCart.style.right = "0";
};

closeBtn.onclick = ()=>{
sideCart.style.right = "-100%";
};

// CATEGORY FILTER
document.querySelectorAll("nav a").forEach(link=>{
link.onclick = (e)=>{
e.preventDefault();
renderProducts(link.dataset.category);
};
});

});
