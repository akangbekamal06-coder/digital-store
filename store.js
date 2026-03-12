const productsData = {
  data:[
    { name:"1GB MTN DATA", price:5, image:"images/data-bundle.png" },
    { name:"2GB MTN DATA", price:10, image:"images/data-bundle.png" },
    { name:"3GB MTN DATA", price:15, image:"images/data-bundle.png" },
    { name:"4GB MTN DATA", price:20, image:"images/data-bundle.png" },
    { name:"5GB MTN DATA", price:25, image:"images/data-bundle.png", bestseller:true }
  ],
  nordvpn:[
    { name:"NORD VPN 1 MONTH", price:25, image:"images/nord-vpn.png" },
    { name:"NORD VPN 1 YEAR", price:70, image:"images/nord-vpn.png", bestseller:true }
  ],
  piavpn:[
    { name:"PIA VPN 1 MONTH", price:40, image:"images/pia-vpn.png" },
    { name:"PIA VPN 3 MONTHS", price:55, image:"images/pia-vpn.png" },
    { name:"PIA VPN 1 YEAR", price:85, image:"images/pia-vpn.png", bestseller:true }
  ],
  textvoice:[
    { name:"TEXTNOW ACCOUNT", price:30, image:"images/textnow.png" },
    { name:"TEXTFREE ACCOUNT", price:35, image:"images/textfree.png" }
  ],
  netflix:[
    { name:"NETFLIX ACCOUNT", price:20, image:"images/netflix.png" }
  ]
};

const productsDiv = document.getElementById("products");

// Display products
function addProductCard(product){
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    ${product.bestseller ? '<div class="badge">BEST SELLER</div>' : ''}
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <div class="price">GH₵${product.price}</div>
    <button class="btn buy" onclick="addToCart('${product.name}',${product.price})">Add to Cart</button>
    <button class="btn buy-now" onclick="payWithPaystack('${product.name}',${product.price})">Buy Now</button>
  `;
  productsDiv.appendChild(card);
}

// Show all products
function showAllProducts(){
  productsDiv.innerHTML="";
  for(let category in productsData){
    productsData[category].forEach(addProductCard);
  }
}

// FILTER BY CATEGORY
function filterCategory(category){
  productsDiv.innerHTML="";
  if(category==='all'){showAllProducts();return;}
  productsData[category].forEach(addProductCard);
}

// SEARCH
function searchProducts(){
  let input = document.getElementById("searchInput").value.toLowerCase();
  productsDiv.innerHTML="";
  for(let category in productsData){
    productsData[category].forEach(product=>{
      if(product.name.toLowerCase().includes(input)){addProductCard(product);}
    });
  }
}

// CART
function openCart(){document.getElementById("cartPanel").classList.add("show"); loadCart();}
function closeCart(){document.getElementById("cartPanel").classList.remove("show");}
function addToCart(name,price){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({name,price});
  localStorage.setItem("cart",JSON.stringify(cart));
  alert(name+" added to cart");
  loadCart();
}
function loadCart(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItems = document.getElementById("cartItems");
  let total=0;
  cartItems.innerHTML="";
  cart.forEach((item,index)=>{
    total+=item.price;
    cartItems.innerHTML+=`<div class="cart-item">
      <span>${item.name}</span>
      <span>GH₵${item.price}</span>
      <button class="remove-btn" onclick="removeItem(${index})">X</button>
    </div>`;
  });
  document.getElementById("cartTotal").innerText=total;
}
function removeItem(index){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index,1);
  localStorage.setItem("cart",JSON.stringify(cart));
  loadCart();
}

// PAYSTACK WITH RECEIPT
function payWithPaystack(productName,amount){
  let email = prompt("Enter your email");
  if(!email) return;
  let handler = PaystackPop.setup({
    key:'pk_live_76e7df83f71c725b7e10d514b3c935324a97761e',
    email:email,
    amount:amount*100,
    currency:"GHS",
    callback:function(){
      let receipt=`RECEIPT
--------------------------
Product: ${productName}
Amount: GH₵${amount}
Status: PAID
Delivery: Instant
Thank you for buying from Digital Hub Store`;
      alert(receipt);
    },
    onClose:function(){alert("Payment cancelled");}
  });
  handler.openIframe();
}

window.onload=showAllProducts;

// CHECKOUT BUTTON
function checkoutCart(){
  alert("Checkout coming soon. You can Buy Now from product cards.");
}
