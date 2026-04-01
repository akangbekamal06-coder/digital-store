const modal = document.getElementById("requestModal");
const btn = document.getElementById("requestBtn");
const close = document.querySelector(".close");
const form = document.getElementById("requestForm");
const submitBtn = document.getElementById("submitBtn");

// OPEN
btn.onclick = () => modal.style.display = "block";

// CLOSE
close.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
  if (e.target == modal) modal.style.display = "none";
};

// SUBMIT
form.onsubmit = function(e) {
  e.preventDefault();

  submitBtn.classList.add("loading");
  submitBtn.innerText = "Sending...";

  const inputs = form.querySelectorAll("input, textarea");

  const message = `Hello Digital Hub Store,%0A%0A
I would like to request a product:%0A
Name: ${inputs[0].value}%0A
Contact: ${inputs[1].value}%0A
Product: ${inputs[2].value}%0A
Details: ${inputs[3].value}%0A%0A
Thank you.`;

  setTimeout(() => {
    window.open(`https://wa.me/233509329683?text=${message}`, "_blank");

    submitBtn.innerText = "Sent ✅";

    setTimeout(() => {
      submitBtn.innerText = "Send Request";
      submitBtn.classList.remove("loading");
      form.reset();
      modal.style.display = "none";
    }, 2000);

  }, 1000);
};
