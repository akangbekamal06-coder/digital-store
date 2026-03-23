// ----------------------------
// PRODUCTS (ALL YOUR PRODUCTS)
// ----------------------------
const products = [
{name:"EXPRESS VPN 1 MONTH", price:45, stock:10, image:"images/express-vpn.jpg", category:"VPN"},
{name:"EXPRESS VPN 3 MONTHS", price:50, stock:10, image:"images/express-vpn.jpg", category:"VPN"},
{name:"EXPRESS VPN 1 YEAR", price:90, stock:10, image:"images/express-vpn.jpg", category:"VPN"},

{name:"PIA VPN 1 MONTH", price:45, stock:10, image:"images/pia-vpn.png", category:"VPN"},
{name:"PIA VPN 3 MONTHS", price:65, stock:10, image:"images/pia-vpn.png", category:"VPN"},
{name:"PIA VPN 1 YEAR", price:90, stock:10, image:"images/pia-vpn.png", category:"VPN"},

{name:"HMA PRO VPN 1 MONTH", price:45, stock:10, image:"images/hma-vpn.jpg", category:"VPN"},
{name:"HMA PRO VPN 1 YEAR", price:90, stock:10, image:"images/hma-vpn.jpg", category:"VPN"},

{name:"IPVANISH VPN 6 MONTHS", price:55, stock:10, image:"images/ipvanish-vpn.jpg", category:"VPN"},
{name:"IPVANISH VPN 1 YEAR", price:90, stock:10, image:"images/ipvanish-vpn.jpg", category:"VPN"},

{name:"NORD VPN 1 MONTH", price:45, stock:10, image:"images/nord-vpn.png", category:"VPN"},
{name:"NORD VPN 1 YEAR", price:90, stock:10, image:"images/nord-vpn.png", category:"VPN"},
{name:"NORD VPN 2 YEARS", price:120, stock:10, image:"images/nord-vpn.png", category:"VPN"},

{name:"CYBER GHOST VPN 1 MONTH", price:45, stock:10, image:"images/cyberghost-vpn.jpg", category:"VPN"},
{name:"CYBER GHOST VPN 6 MONTHS", price:50, stock:10, image:"images/cyberghost-vpn.jpg", category:"VPN"},
{name:"CYBER GHOST VPN 2 YEARS", price:90, stock:10, image:"images/cyberghost-vpn.jpg", category:"VPN"},

{name:"SURFSHARK VPN 1 MONTH", price:45, stock:10, image:"images/surfshark-vpn.jpg", category:"VPN"},

{name:"GMAIL PHONE VERIFIED ACCOUNT", price:25, stock:10, image:"images/gmail.jpg", category:"Accounts"},
{name:"GOOGLE VOICE ACCOUNT", price:40, stock:10, image:"images/google-voice.png", category:"Accounts"},
{name:"NETFLIX 1 MONTH", price:25, stock:10, image:"images/netflix.png", category:"Accounts"},

{name:"1GB MTN DATA BUNDLE", price:5, stock:100, image:"images/data-bundle.png", category:"Data"},
{name:"2GB MTN DATA BUNDLE", price:10, stock:100, image:"images/data-bundle.png", category:"Data"},
{name:"3GB MTN DATA BUNDLE", price:15, stock:100, image:"images/data-bundle.png", category:"Data"},
{name:"4GB MTN DATA BUNDLE", price:20, stock:100, image:"images/data-bundle.png", category:"Data"},
{name:"5GB MTN DATA BUNDLE", price:25, stock:100, image:"images/data-bundle.png", category:"Data"},
{name:"6GB MTN DATA BUNDLE", price:30, stock:100, image:"images/data-bundle.png", category:"Data"},
{name:"8GB MTN DATA BUNDLE", price:40, stock:100, image:"images/data-bundle.png", category:"Data"},
{name:"10GB MTN DATA BUNDLE", price:45, stock:100, image:"images/data-bundle.png", category:"Data"},
{name:"15GB MTN DATA BUNDLE", price:65, stock:100, image:"images/data-bundle.png", category:"Data"},
{name:"10GB TELECEL DATA BUNDLE", price:42, stock:100, image:"images/telecel.jpg", category:"Data"},

{name:"TEXTNOW ACCOUNT", price:25, stock:20, image:"images/textnow.png", category:"Messaging"},
{name:"TEXTFREE ACCOUNT", price:20, stock:20, image:"images/textfree.png", category:"Messaging"},

{name:"9 PROXY REFILLS – 10 IPs", price:30, stock:20, image:"images/proxy.jpg", category:"Proxies"},
{name:"9 PROXY REFILLS – 20 IPs", price:60, stock:20, image:"images/proxy.jpg", category:"Proxies"},
{name:"9 PROXY REFILLS – 50 IPs", price:100, stock:20, image:"images/proxy.jpg", category:"Proxies"},
{name:"9 PROXY REFILLS – 150 IPs", price:300, stock:20, image:"images/proxy.jpg", category:"Proxies"}
];

// ----------------------------
// RENDER PRODUCTS
// ----------------------------
function renderProducts(category="all"){
const container=document.querySelector(".products-list");
if(!container) return;

container.innerHTML="";

let filtered = category==="all" ? products : products.filter(p=>p.category===category);

filtered.forEach(p=>{
const div=document.createElement("div");
div.className="product-card";

div.innerHTML=`
<div class="product-info">
  <img src="${p.image}" alt="${p.name}">
  <div class="product-details">
    <span>${p.name}</span>
  </div>
</div>

<div class="product-price-stock">
  <span class="price">${p.price}GHC</span>
  <span class="stock">${p.stock} pcs</span>

  <div style="display:flex;gap:10px;">
    <button onclick="buyNow('${p.name}',${p.price})">Buy Now</button>
    <button onclick="addToCart('${p.name}',${p.price})">Add to Cart</button>
  </div>
</div>
`;

container.appendChild(div);
});
}

// ----------------------------
// CART
// ----------------------------
function addToCart(name,price){
let cart=JSON.parse(localStorage.getItem('cart'))||[];
cart.push({item:name,price:Number(price)});
localStorage.setItem('cart',JSON.stringify(cart));
updateSideCart();
alert(name+" added to cart!");
}

function updateSideCart(){
const cart=JSON.parse(localStorage.getItem('cart'))||[];

document.getElementById('cartCount').textContent=cart.length;

const container=document.getElementById('sideCartItems');
container.innerHTML="";

let total=0;

cart.forEach((item,index)=>{
container.innerHTML+=`
<div style="display:flex;justify-content:space-between;">
<span>${item.item} - GHC ${item.price}</span>
<button onclick="removeFromCart(${index})">Remove</button>
</div>
`;
total+=item.price;
});

document.getElementById('sideCartTotal').textContent=total;
}

function removeFromCart(index){
let cart=JSON.parse(localStorage.getItem('cart'))||[];
cart.splice(index,1);
localStorage.setItem('cart',JSON.stringify(cart));
updateSideCart();
}

// ----------------------------
// PAYSTACK
// ----------------------------
function payWithPaystack(){
let cart=JSON.parse(localStorage.getItem('cart'))||[];

if(cart.length===0){
alert("Cart is empty");
return;
}

let email=document.getElementById("customerEmail").value;
let phone=document.getElementById("customerPhone").value;

if(!email || !phone){
alert("Enter email and phone");
return;
}

let total=0;
cart.forEach(i=> total+=i.price);

let handler = PaystackPop.setup({
key: 'pk_live_76e7df83f71c725b7e10d514b3c935324a97761e',
email: email,
amount: total * 100,
currency: "GHS",

metadata:{
custom_fields:[
{
display_name:"Phone",
variable_name:"phone",
value:phone
}
]
},

callback: function(){
alert("Payment successful!");
localStorage.removeItem('cart');
updateSideCart();
},

onClose: function(){
alert("Payment cancelled");
}
});

handler.openIframe();
}

// ----------------------------
// BUY NOW
// ----------------------------
function buyNow(name,price){
localStorage.setItem('cart', JSON.stringify([{item:name,price:Number(price)}]));
updateSideCart();
payWithPaystack();
}

// ----------------------------
// INIT
// ----------------------------
document.addEventListener("DOMContentLoaded",()=>{

renderProducts("all");
updateSideCart();

document.querySelectorAll('nav a').forEach(link=>{
link.addEventListener('click',e=>{
e.preventDefault();
renderProducts(link.getAttribute('data-category'));
});
});

const sideCart=document.getElementById('sideCart');

document.getElementById('cartIcon').onclick=()=>{
sideCart.style.right='0';
updateSideCart();
};

document.getElementById('closeSideCart').onclick=()=>{
sideCart.style.right='-100%';
};

});
