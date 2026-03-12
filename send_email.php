<?php
$data = json_decode(file_get_contents("php://input"), true);

$accountsFile = "accounts.json";
$ordersFile = "orders.json";

$accounts = json_decode(file_get_contents($accountsFile), true);
$orders = json_decode(file_get_contents($ordersFile), true);

$products = explode(", ", $data['products']);
$delivery = "";

foreach($products as $product){
 if(isset($accounts[$product])){
  foreach($accounts[$product] as &$acc){
   if(!$acc["used"]){
    $delivery .= "$product\nUsername: ".$acc["username"]."\nPassword: ".$acc["password"]."\n\n";
    $acc["used"] = true;
    break;
   }
  }
 }
}

file_put_contents($accountsFile,json_encode($accounts,JSON_PRETTY_PRINT));

$order = [
 "name"=>$data["name"],
 "email"=>$data["email"],
 "phone"=>$data["phone"],
 "products"=>$data["products"],
 "reference"=>$data["reference"]
];

$orders[] = $order;
file_put_contents($ordersFile,json_encode($orders,JSON_PRETTY_PRINT));

$owner = "youremail@gmail.com";
$subjectOwner = "New Order Received";
$msgOwner = "Customer: ".$data["name"]."\nEmail: ".$data["email"]."\nProducts: ".$data["products"]."\nReference: ".$data["reference"]."\n\nDelivered Accounts:\n".$delivery;
mail($owner,$subjectOwner,$msgOwner,"From: noreply@digitalhubstore.com");

$subjectCustomer = "Your Order Delivery";
$msgCustomer = "Hi ".$data["name"].",\n\nThanks for your purchase!\n\n".$delivery."\nEnjoy your products!\nDigital Hub Store";
mail($data["email"],$subjectCustomer,$msgCustomer,"From: noreply@digitalhubstore.com");
?>
