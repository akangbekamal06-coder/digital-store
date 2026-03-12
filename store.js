// Product data
const productsData = {
  netflix: [
    { name: "1 MONTH NETFLIX ACCOUNT", price: 20, image: "images/netflix.png" }
  ],
  nordvpn: [
    { name: "NORD VPN 1 MONTH ACCOUNT", price: 30, image: "images/nord-vpn.png" },
    { name: "NORD VPN 1 YEAR ACCOUNT", price: 70, image: "images/nord-vpn.png" }
  ],
  piavpn: [
    { name: "PIA VPN 1 MONTH ACCOUNT", price: 40, image: "images/pia-vpn.png" },
    { name: "PIA VPN 3 MONTHS ACCOUNT", price: 55, image: "images/pia-vpn.png" },
    { name: "PIA VPN 1 YEAR ACCOUNT", price: 85, image: "images/pia-vpn.png" }
  ],
  textvoice: [
    { name: "TEXTFREE ACCOUNT", price: 20, image: "images/textfree.png" },
    { name: "TEXTNOW ACCOUNT", price: 30, image: "images/textnow.png" },
    { name: "GOOGLE VOICE ACCOUNT", price: 35, image: "images/google-voice.png" }
  ],
  data: [
    { name: "1GB MTN DATA BUNDLE", price: 5, image: "images/data-bundle.png" },
    { name: "2GB MTN DATA BUNDLE", price: 10, image: "images/data-bundle.png" },
    { name: "3GB MTN DATA BUNDLE", price: 15, image: "images/data-bundle.png" },
    { name: "4GB MTN DATA BUNDLE", price: 20, image: "images/data-bundle.png" },
    { name: "5GB MTN DATA BUNDLE", price: 24, image: "images/data-bundle.png" },
    { name: "6GB MTN DATA BUNDLE", price: 28, image: "images/data-bundle.png" },
    { name: "8GB MTN DATA BUNDLE", price: 37, image: "images/data-bundle.png" }
  ]
};

// DOM elements
const productsDiv = document.getElementById("products");
const headerTitle = document.getElementById("header-title");

// Display products
function selectCategory(category) {
  productsDiv.innerHTML = "";
  headerTitle.textContent = "Products: " + category.toUpperCase();
  productsData[category].forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width:100%;height:200px;object-fit:cover;border-radius:12px;">
      <h3>${product.name}</h3>
      <div class="price">GH₵${product.price}</div>
      <button class="btn buy" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
    `;
    productsDiv.appendChild(card);
  });
}

// Toggle menu
function toggleMenu() { document.getElementById("menu").classList.toggle("show"); }

// Cart
function openCartPage() { window.location.href = "cart.html"; }
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

// Support box
function goSupport() { document.getElementById("supportBox").style.display = "block"; }
function closeSupportBox() { document.getElementById("supportBox").style.display = "none"; }
function sendSupportMessage() {
  const msg = document.getElementById("supportMessage").value;
  if (msg.trim() === "") { alert("Please enter a message."); return; }
  alert("Thank you! Support will contact you soon.\nMessage: " + msg);
  document.getElementById("supportMessage").value = "";
  closeSupportBox();
}

// Default category
window.onload = function() { selectCategory("netflix"); };
