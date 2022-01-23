
// Debit card selection

document.getElementById("db").addEventListener("click", tealBorder);

function tealBorder(){
    var debitCard= document.getElementById("db");
    debitCard.style.borderRight = "5px solid rgb(0, 211, 211)";
}


// Debit Card payment button

document.getElementById("in1").addEventListener("click", createButton);
var count =0;

function createButton(event){
    
    if(count==0){
    var payButton = document.createElement("button");
    payButton.setAttribute("id","payButton");
    payButton.textContent = "Pay securely";

    payButton.addEventListener("click", successfulPayment);

    var rightSide= document.getElementById("right");
    rightSide.append(payButton);
    count++;
    }
}

let deleteCartItems = () => {
  fetch("http://localhost:2500/carts/removeAll/", {
      "method": "DELETE",
      "headers": {
          "content-type": "application/json"
      }
  }).then(res => res.json)
  .then(result => console.log(result))
  .catch(err => console.log(err))
}


function successfulPayment(event){
    
    var body = document.getElementById("grid");

    body.remove();

    var image11 = document.createElement("img");
    image11.setAttribute("src","https://cdn.dribbble.com/users/2121936/screenshots/4814257/media/a9ba072da5d4bca2f595420a52ea1b09.gif");
    image11.setAttribute("id","image11");

    var container = document.getElementById("cont");
    container.append(image11);

    deleteCartItems();

    alert("Payment Completed Successfully");
 
}


// / Price details

let price = JSON.parse(localStorage.getItem("priceAmounts"));

document.getElementById('oriPrice').textContent = `₹ ${price.total}`;

document.getElementById('discount').textContent = `₹ ${price.discount}`;

document.getElementById('curPrice').textContent =  `₹ ${price.payable}`;

// address details fetching

let addressData = JSON.parse(localStorage.getItem("datavalue"));

document.getElementById('div12').textContent = 
addressData.name;

document.getElementById('div22').textContent = 
addressData.address;

document.getElementById('div32').textContent = 
addressData.mobile;