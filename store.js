const productsData={
  netflix:[{name:"1 MONTH NETFLIX ACCOUNT",price:20},{name:"SPOTIFY SUBSCRIPTION",price:35}],
  nordvpn:[{name:"NORD VPN 1 MONTH ACCOUNT",price:30},{name:"NORD VPN 1 YEAR ACCOUNT",price:70}],
  piavpn:[{name:"PIA VPN 1 MONTH ACCOUNT",price:40},{name:"PIA VPN 3 MONTHS ACCOUNT",price:55},{name:"PIA VPN 1 YEAR ACCOUNT",price:85}],
  textvoice:[{name:"TEXTFREE ACCOUNT",price:20},{name:"TEXTNOW ACCOUNT",price:30},{name:"GOOGLE VOICE ACCOUNT",price:35}],
  data:[{name:"1GB MTN DATA BUNDLE",price:5},{name:"2GB MTN DATA BUNDLE",price:10},{name:"3GB MTN DATA BUNDLE",price:15},{name:"4GB MTN DATA BUNDLE",price:20},{name:"5GB MTN DATA BUNDLE",price:24},{name:"6GB MTN DATA BUNDLE",price:28},{name:"8GB MTN DATA BUNDLE",price:37}]
};
const productsDiv=document.getElementById("products");const headerTitle=document.getElementById("header-title");
function selectCategory(category){productsDiv.innerHTML="";headerTitle.textContent=category.toUpperCase();productsData[category].forEach(product=>{const card=document.createElement("div");card.classList.add("card");card.innerHTML=`<h3>${product.name}</h3><div class="price">GH₵${product.price}</div><button class="btn buy" onclick="addToCart('${product.name}',${product.price})">Add to Cart</button>`;productsDiv.appendChild(card)})}
function toggleMenu(){document.getElementById("menu").classList.toggle("show")}
function openCartPage(){window.location.href="cart.html"}
function addToCart(name,price){let cart=JSON.parse(localStorage.getItem("cart"))||[];cart.push({name,price});localStorage.setItem("cart",JSON.stringify(cart));alert(name+" added to cart!")}
function goSupport(){document.getElementById("supportBox").style.display="block"}
function closeSupportBox(){document.getElementById("supportBox").style.display="none"}
function sendSupportMessage(){const msg=document.getElementById("supportMessage").value;if(msg.trim()===""){alert("Please enter a message.");return}alert("Thank you! Support will contact you soon.\nMessage: "+msg);document.getElementById("supportMessage").value="";closeSupportBox()}
