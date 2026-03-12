// Load cart or products
const productsData = {
  data:[
    { name:"1GB MTN DATA", price:5 },
    { name:"2GB MTN DATA", price:10 },
    { name:"3GB MTN DATA", price:15 },
    { name:"4GB MTN DATA", price:20 },
    { name:"5GB MTN DATA", price:25 }
  ]
};

// Populate product select
const productSelect = document.getElementById("productSelect");
productsData.data.forEach(product=>{
  let option = document.createElement("option");
  option.value = product.price;
  option.textContent = product.name;
  productSelect.appendChild(option);
});

// Update amount when product changes
productSelect.addEventListener("change", ()=>{
  document.getElementById("amount").value = productSelect.value;
});

// Set initial amount
document.getElementById("amount").value = productSelect.value;

// Handle form submit
document.getElementById("checkoutForm").addEventListener("submit", function(e){
  e.preventDefault();
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const productName = productSelect.options[productSelect.selectedIndex].text;
  const amount = productSelect.value;

  // Auto WhatsApp order
  const msg = `Hello, my name is ${fullName}. I want to purchase ${productName} for GH₵${amount}. My email is ${email} and phone is ${phone}.`;
  const whatsappURL = "https://wa.me/233509329683?text=" + encodeURIComponent(msg);
  window.open(whatsappURL, "_blank");

  // Paystack payment
  let handler = PaystackPop.setup({
    key: 'pk_live_76e7df83f71c725b7e10d514b3c935324a97761e', 
    email: email,
    amount: amount * 100,
    currency: "GHS",
    callback: function(){ alert(`${productName} purchased successfully!`); },
    onClose: function(){ alert("Payment cancelled."); }
  });
  handler.openIframe();
});
