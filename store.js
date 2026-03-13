// RENDER PRODUCTS + CART
const products=[ /* your products array */ ];

function renderProducts(){
  const container=document.querySelector(".products-list");
  container.innerHTML="";
  products.forEach(p=>{
    const div=document.createElement("div");
    div.className="product-card";
    div.innerHTML=`
      <div class="product-info">
        <img src="${p.image}" alt="${p.name}">
        <div class="product-details"><span>${p.name}</span><a href="#">View details</a></div>
      </div>
      <div class="product-price-stock">
        <span class="price">${p.price}GHC</span>
        <span class="stock">${p.stock} pcs</span>
        <div style="display:flex;gap:10px;">
          <button class="purchase-btn" onclick="buyNow('${p.name}',${p.price})">Buy Now</button>
          <button class="purchase-btn add-cart-btn" onclick="addToCart('${p.name}',${p.price})">Add to Cart</button>
        </div>
      </div>`;
    container.appendChild(div);
  });
}

// ADD TO CART
function addToCart(name,price){
  let cart=JSON.parse(localStorage.getItem('cart'))||[];
  cart.push({item:name,price:price});
  localStorage.setItem('cart',JSON.stringify(cart));
  updateSideCart();
  alert(`${name} added to cart!`);
}

// SIDE CART
const sideCart=document.getElementById('sideCart');
document.getElementById('cartIcon').addEventListener('click',()=>{sideCart.style.right='0'; updateSideCart();});
document.getElementById('closeSideCart').addEventListener('click',()=>{sideCart.style.right='-100%';});

function updateSideCart(){
  const cart=JSON.parse(localStorage.getItem('cart'))||[];
  document.getElementById('cartCount').textContent=cart.length;
  const container=document.getElementById('sideCartItems');
  container.innerHTML="";
  let total=0;

  cart.forEach((item,index)=>{
    const div=document.createElement('div');
    const itemText=document.createElement('span');
    itemText.textContent=`${item.item} - GHC ${item.price}`;
    const removeBtn=document.createElement('button');
    removeBtn.textContent='Remove';
    removeBtn.className='remove-btn';
    removeBtn.addEventListener('click',()=>{removeFromCart(index);updateSideCart();});
    div.appendChild(itemText);
    div.appendChild(removeBtn);
    container.appendChild(div);
    total+=item.price;
  });

  document.getElementById('sideCartTotal').textContent=total;
}

// REMOVE
function removeFromCart(index){
  let cart=JSON.parse(localStorage.getItem('cart'))||[];
  cart.splice(index,1);
  localStorage.setItem('cart',JSON.stringify(cart));
}

// BUY NOW
function buyNow(name,price){
  const cart=[{item:name,price:price}];
  localStorage.setItem('cart',JSON.stringify(cart));
  updateSideCart();
  window.location.href='checkout.html';
}

function goToCheckout(){window.location.href='checkout.html';}

// INITIALIZE
document.addEventListener("DOMContentLoaded",()=>{
  renderProducts();
  updateSideCart();
});
