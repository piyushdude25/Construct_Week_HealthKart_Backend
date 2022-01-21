
window.onscroll = function(){
    makeSticky();
};

var navbar = document.querySelector('.navbar2');
var sticky = navbar.offsetTop;

function makeSticky() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}



let cartIcon = document.getElementById('drop');
let dropdown = document.getElementById('cartDropDown');
cartIcon.onmouseover = () => {
  document.querySelector('.firstItemBox').innerHTML = "";
    
    async function get() {
  document.querySelector('.firstItemBox').innerHTML = "";

   let cartItems = await getCartData();

 dropdown.style.display = "block";
 dropdown.style.overflowY = "hidden";


 let div = document.createElement("div");

let img = document.createElement("img");
img.src = cartItems[0].imgPrime;

let name = document.createElement("p");
name.textContent = cartItems[0].name;

let quantity = document.createElement("p");
quantity.textContent = `Quantity: ${cartItems[0].quantity}`;

let curPrice = document.createElement("p");
curPrice.textContent = `Price: ₹${cartItems[0].curPrice}`

let dropDown = document.querySelector('.firstItemBox');

let div2 = document.createElement("div");
div2.append(quantity, curPrice);

div.append(img, name);
dropDown.append(div, div2);
div.setAttribute('class',"lastFlex");
div2.setAttribute('class',"lastFlex");
dropDown.removeChilds();
    }
    get();
}


// let data = {imgPrime:`https://img4.hkrtcdn.com/12525/prd_1252433-Strauss-Foam-Hand-Grip-Blue_o.jpg`,
//     name:`Strauss Foam Hand Grip, Blue`,
//     oriPrice: 499,
//     curPrice: 249,
//     quantity: 1,
//     imgSub1:`https://img8.hkrtcdn.com/12525/prd_1252427-Strauss-Foam-Hand-Grip-Blue_o.jpg`,
//     imgSub2:`https://img4.hkrtcdn.com/7700/prd_769953-Strauss-Foam-Hand-Grip-Blue_o.jpg`,
//     imgSub3:`https://img6.hkrtcdn.com/12525/prd_1252425-Strauss-Foam-Hand-Grip-Blue_o.jpg`
//     }

// localStorage.setItem("product", JSON.stringify(data));
// Local Storage data Fetching Part

let product = JSON.parse(localStorage.getItem("product"));


let primeImg = document.getElementById('itemImage');
primeImg.src = product.imgPrime;


let subImg1 = document.getElementById("subImg1");
subImg1.src = product.imgPrime;
subImg1.onclick = function(){
  change1();
};
function change1(){
  document.getElementById('itemImage').src = product.imgPrime;
}

let subImg2 = document.getElementById("subImg2");
subImg2.src = product.imgSub1;
subImg2.onclick = function(){
  change2();
};

function change2(){
  document.getElementById('itemImage').src = product.imgSub1;
}

let subImg3 = document.getElementById("subImg3");
subImg3.src = product.imgSub2;
subImg3.onclick = function(){
  change3();
}; 
function change3(){
  document.getElementById('itemImage').src = product.imgSub2;
}

let subImg4 = document.getElementById("subImg4");
subImg4.src = product.imgSub3;
subImg4.onclick = function(){
  change4();
};
 function change4(){
  document.getElementById('itemImage').src = product.imgSub3;
}

let itemName = document.getElementById('itemName');
itemName.textContent = product.name;

let currentPrice = document.getElementById('price');
currentPrice.textContent = product.curPrice;


let originalPrice = document.getElementById('oriPrice');
originalPrice.textContent = product.oriPrice;






// quantity updation part

let quant = document.getElementById('quantity');

let increase = document.getElementById('increase');


let increment = () => {
    let value = product.quantity + 1;
    if(value > 1){
    reduce.style.color = "teal";
  }
    product.quantity = value;
    localStorage.setItem("product", JSON.stringify(product));
    document.getElementById('quantity').textContent = product.quantity;
}

increase.addEventListener('click', increment);

let reduce = document.getElementById('reduce');
reduce.style.color = "lightgrey";

let decrement = () => {
  let value = product.quantity - 1;
  if(value <= 1){
    reduce.style.color = "lightgrey";
  }
  if(value > 1){
    reduce.style.color = "teal";
  }
  if(value <= 1){
    product.quantity = 1;
        localStorage.setItem("product", JSON.stringify(product));
     document.getElementById('quantity').textContent = product.quantity;
  }else{
    product.quantity = value;
        localStorage.setItem("product", JSON.stringify(product));
     document.getElementById('quantity').textContent = product.quantity;
  }
}

reduce.addEventListener('click', decrement);

// Adding to cart part

let addTocart = document.getElementById('addTocart');



let getCartData = async() => {
  let res = await fetch("http://localhost:2500/carts/");
  let data = await res.json();
  return data;
}




let addingToCart = async() => {
  let count = 0;
  let cartItems = await getCartData();
  console.log(cartItems);
  cartItems.forEach((el) => {
   if(el.name == product.name){
     count++;
   }
  });
  let user = JSON.parse(localStorage.getItem("user"));
  // let product = JSON.parse(localStorage.getItem("product"));
let  imgPrime = product.imgPrime;
let  name = product.name;
let  oriPrice = product.oriPrice;
let  curPrice = product.curPrice;
let  quantity = product.quantity;
let  imgSub1 = product.imgSub1;
let  imgSub2 = product.imgSub2;
let  imgSub3 = product.imgSub3;
console.log(product);
  if(count == 0){  
   fetch("http://localhost:2500/carts/", {
                 "method": "POST",
                 "headers": {
                     "content-type": "application/json"
                 },
                 "body": JSON.stringify({
                  user : user,
                 imgPrime: imgPrime,
                 name: name,
                 oriPrice: oriPrice,
                 curPrice: curPrice,
                 quantity: quantity,
                 imgSub1: imgSub1,
                 imgSub2: imgSub2,
                 imgSub3: imgSub3
                 })
         }).then(response => response.json())
      .then(result => {
          alert("Item Added To Cart Successfully!");
      });
  }
  else{
  alert("This Product Has Already Added To Your Cart!");
  }
}

addTocart.addEventListener('click', addingToCart);








