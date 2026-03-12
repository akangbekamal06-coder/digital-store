const adminPassword="admin123";

function login(){

const input=document.getElementById("password").value;

if(input===adminPassword){

document.getElementById("adminPanel").style.display="block";

loadOrders();

}else{

alert("Wrong password");

}

}

function loadOrders(){

const orders=JSON.parse(localStorage.getItem("cart"))||[];

const container=document.getElementById("orders");

container.innerHTML="";

orders.forEach(o=>{

container.innerHTML+=`<p>${o.name} - $${o.price}</p>`;

});

}

function clearOrders(){

localStorage.removeItem("cart");

alert("Orders cleared");

}
