let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

function addReview(){

const name=document.getElementById("review-name").value;
const text=document.getElementById("review-text").value;

reviews.push({name,text});

localStorage.setItem("reviews",JSON.stringify(reviews));

displayReviews();

}

function displayReviews(){

const list=document.getElementById("review-list");

if(!list) return;

list.innerHTML="";

reviews.forEach(r=>{

list.innerHTML+=`
<div>
<strong>${r.name}</strong>
<p>${r.text}</p>
</div>
`;

});

}

displayReviews();
