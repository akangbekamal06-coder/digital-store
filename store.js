body{
margin:0;
font-family:'Poppins',sans-serif;
background:#f4f4f4;
}

/* HEADER */

header{
background:#0f172a;
color:white;
display:flex;
justify-content:space-between;
align-items:center;
padding:18px 20px;
}

.cart-btn{
background:#22c55e;
border:none;
padding:8px 15px;
color:white;
border-radius:6px;
cursor:pointer;
}

/* HERO */

.hero{
text-align:center;
padding:20px;
}

/* PRODUCTS */

.container{
padding:15px;
}

.products{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
gap:20px;
}

.card{
background:white;
border-radius:14px;
padding:15px;
text-align:center;
box-shadow:0 6px 15px rgba(0,0,0,0.1);
position:relative;
}

.card img{
width:100%;
height:150px;
object-fit:contain;
background:#f8fafc;
padding:10px;
border-radius:10px;
}

.price{
font-size:18px;
color:#16a34a;
font-weight:600;
}

.btn{
display:block;
padding:12px;
margin-top:8px;
border:none;
border-radius:8px;
font-size:15px;
color:white;
cursor:pointer;
}

.buy{
background:#2563eb;
}

/* BEST SELLER */

.badge{
position:absolute;
top:10px;
left:10px;
background:#ef4444;
color:white;
padding:4px 8px;
font-size:12px;
border-radius:6px;
}

/* WHATSAPP */

.whatsapp-float{
position:fixed;
bottom:90px;
right:20px;
background:#25D366;
color:white;
padding:14px 18px;
border-radius:50px;
text-decoration:none;
box-shadow:0 4px 10px rgba(0,0,0,0.3);
}

/* CART PANEL */

.cart-panel{
position:fixed;
top:0;
left:-350px;
width:320px;
height:100%;
background:white;
box-shadow:4px 0 15px rgba(0,0,0,0.2);
transition:0.3s;
z-index:2000;
display:flex;
flex-direction:column;
}

.cart-panel.show{
left:0;
}

.cart-header{
background:#0f172a;
color:white;
padding:15px;
display:flex;
justify-content:space-between;
align-items:center;
}

#cartItems{
flex:1;
overflow-y:auto;
padding:15px;
}

.cart-item{
display:flex;
justify-content:space-between;
margin-bottom:10px;
}

.remove-btn{
background:red;
color:white;
border:none;
padding:4px 8px;
border-radius:4px;
cursor:pointer;
}

.cart-total{
padding:10px 15px;
font-weight:bold;
border-top:1px solid #eee;
}

.cart-footer{
padding:15px;
}

.cart-footer button{
width:100%;
padding:12px;
background:#22c55e;
border:none;
color:white;
border-radius:8px;
font-size:16px;
}

/* ABOUT */

.about-section{
background:white;
padding:40px 20px;
margin-top:30px;
margin-bottom:120px;
text-align:center;
}
