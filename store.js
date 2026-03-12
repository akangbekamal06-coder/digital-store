body {
  margin:0;
  font-family:Arial, sans-serif;
  background:#f4f4f4;
}

header {
  background:#0f172a;
  color:white;
  text-align:center;
  padding:20px;
  font-size:24px;
  font-weight:bold;
}

.cart-btn {
  background:#22c55e;
  border:none;
  padding:8px 15px;
  color:white;
  border-radius:5px;
  cursor:pointer;
}

.container { padding:15px; }

.products {
  display:grid;
  grid-template-columns: repeat(auto-fill,minmax(250px,1fr));
  gap:25px;
}

.card {
  background:white;
  border-radius:14px;
  padding:15px;
  text-align:center;
  box-shadow:0 6px 15px rgba(0,0,0,0.15);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius:12px;
}

.card h3 { font-size:22px; margin:10px 0; }

.card .price { font-size:20px; color:#16a34a; font-weight:bold; margin:10px 0; }

.btn {
  display:block;
  padding:14px;
  margin-top:10px;
  border:none;
  border-radius:8px;
  font-size:16px;
  color:white;
  cursor:pointer;
}

.buy { background:#2563eb; }

.whatsapp-float {
  position:fixed;
  bottom:20px;
  right:20px;
  background:#25D366;
  color:white;
  padding:15px 18px;
  border-radius:50px;
  font-size:16px;
  text-decoration:none;
  box-shadow:0 4px 10px rgba(0,0,0,0.3);
  z-index:1000;
}

.support-box {
  position:fixed;
  bottom:80px;
  right:20px;
  width:300px;
  background:#0f172a;
  color:white;
  border-radius:12px;
  box-shadow:0 4px 15px rgba(0,0,0,0.3);
  display:none;
  z-index:1000;
  font-family:Arial, sans-serif;
}

.support-header {
  padding:10px;
  font-weight:bold;
  background:#2563eb;
  border-top-left-radius:12px;
  border-top-right-radius:12px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  cursor:pointer;
}

.support-content { padding:10px; }

.support-content p { margin:5px 0; font-size:14px; }

.support-content textarea {
  width:100%;
  height:60px;
  margin-top:5px;
  border-radius:8px;
  border:none;
  padding:5px;
}

.support-content button {
  margin-top:5px;
  width:100%;
  padding:8px;
  background:#16a34a;
  border:none;
  border-radius:8px;
  color:white;
  font-weight:bold;
  cursor:pointer;
  }
