// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render cart items
function renderCart() {
  const checkoutItems = document.getElementById('checkoutItems');
  checkoutItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.justifyContent = 'space-between';
    div.style.alignItems = 'center';
    div.style.marginBottom = '10px';

    // Item name
    const itemName = document.createElement('span');
    itemName.textContent = item.item;

    // Quantity input
    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.min = 1;
    qtyInput.value = item.quantity || 1;
    qtyInput.style.width = '50px';
    qtyInput.style.margin = '0 10px';
    qtyInput.addEventListener('change', () => {
      const val = parseInt(qtyInput.value);
      if(val < 1){ qtyInput.value = 1; return; }
      item.quantity = val;
      updateTotal();
      saveCart();
    });

    // Price
    const priceSpan = document.createElement('span');
    priceSpan.textContent = `GHC ${item.price}`;

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.style.padding = '3px 7px';
    removeBtn.style.fontSize = '12px';
    removeBtn.addEventListener('click', () => {
      cart.splice(index, 1);
      saveCart();
      renderCart();
    });

    div.appendChild(itemName);
    div.appendChild(qtyInput);
    div.appendChild(priceSpan);
    div.appendChild(removeBtn);

    checkoutItems.appendChild(div);

    total += item.price * (item.quantity || 1);
  });

  document.getElementById('checkoutTotal').textContent = total;
}

function updateTotal() {
  let total = 0;
  cart.forEach(item => total += item.price * (item.quantity || 1));
  document.getElementById('checkoutTotal').textContent = total;
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Paystack integration
const payBtn = document.getElementById('payBtn');
payBtn.addEventListener('click', () => {
  const custName = document.getElementById('custName').value;
  const custPhone = document.getElementById('custPhone').value;
  const custEmail = document.getElementById('custEmail').value;

  if(!custName || !custPhone || !custEmail){
    alert('Please fill all fields.');
    return;
  }

  let totalAmount = 0;
  cart.forEach(item => totalAmount += item.price * (item.quantity || 1));

  let handler = PaystackPop.setup({
    key: 'pk_live_76e7df83f71c725b7e10d514b3c935324a97761e',
    email: custEmail,
    amount: totalAmount * 100,
    currency: "GHS",
    metadata: {
      custom_fields: [
        {display_name: "Full Name", value: custName},
        {display_name: "WhatsApp", value: custPhone}
      ]
    },
    callback: function(response){
      alert('Payment successful! Reference: ' + response.reference);
      localStorage.removeItem('cart');
      window.location.href = 'index.html';
    },
    onClose: function(){
      alert('Payment cancelled.');
    }
  });
  handler.openIframe();
});

// INITIALIZE
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
