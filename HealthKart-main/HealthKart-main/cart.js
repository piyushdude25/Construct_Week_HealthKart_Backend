
let getCart = async() => {
  let res = await fetch("http://localhost:2500/carts/");
  let data = await res.json();
  console.log(data);
  displayItem(data);
}

getCart();


// import logo from './logo/logo.js'
// document.querySelector(#mainlogo).innerHTML=logo()

function togglemenu() {
  document.getElementById("sideBar").classList.toggle("active");
}

function letsChat() {
  document.getElementById("letsChat").classList.toggle("active");
}

//   var cartItem = JSON.parse(localStorage.getItem("BBcartItems"));
//   displayItem(cartItem);
//   console.log(cartItem.length);

function displayItem(showCartaItem) {
  document.querySelector("#displayItem").innerHTML = "";

  showCartaItem.forEach(function (item, index) {
    let img = document.createElement("img");
    img.setAttribute("src", item.imgPrime);
    img.setAttribute("class", "itemImg");

    let h1 = document.createElement("h1");
    h1.textContent = item.name;
    h1.setAttribute("class", "name");

    let h2 = document.createElement("h2");
    h2.textContent = "₹" + item.oriPrice;
    h2.setAttribute("class", "originalPri");

    let h3 = document.createElement("h2");
    h3.textContent = " ₹" + item.curPrice;
    h3.setAttribute("class", "discountPri");

    let divPush = document.createElement("div");
    divPush.setAttribute("class", "divPush");

    let hr = document.createElement("hr");
    hr.setAttribute("class", "itemhr");

    let logo1 = document.createElement("img");
    logo1.setAttribute(
      "src",
      "https://tse3.mm.bing.net/th?id=OIP._2jeUMPAHmeCOTFxDHXu7gHaHa&pid=Api&P=0&w=300&h=300"
    );
    logo1.setAttribute("class", "logo2");

    let logo2 = document.createElement("img");
    logo2.setAttribute(
      "src",
      "https://tse4.mm.bing.net/th?id=OIP.Yi7bOkqscRvsZxr6fknCiwHaHa&pid=Api&P=0&w=300&h=300"
    );
    logo2.setAttribute("class", "logo2");

    logo2.addEventListener('click', function(){
      remove(item, index);
    });
         
    
    async function remove(item){
    fetch(`http://localhost:2500/carts/remove/:id`, {
      "method": "DELETE",
      "headers": {
        "content-type": "application/json"
      },
      "body": JSON.stringify({
        id: item._id
      })
    });
         alert("Are you want to remove this item from your cart?");
        window.location.reload();
      }


    let lDiv = document.createElement("div");

    let mDiv = document.createElement("div");
    mDiv.setAttribute("id", "mDiv");

    let priceLine = document.createElement("div");
    priceLine.setAttribute("id", "priceLine");

    let rDiv = document.createElement("div");

    let qty = document.createElement("select");
    let quantityopt = document.createElement("option");
    quantityopt.innerText = "Quantity";
    qty.append(quantityopt);
    qty.setAttribute("id", "itemQuantityOpt");
    for (let i = 1; i <= 5; i++) {
      let quantityNo = document.createElement("option");
      quantityNo.innerText = [i];
      qty.append(quantityNo);

      qty.addEventListener('change', update);
    }

      function update(){
          let x = item;
        let id = x._id;
        console.log(id);
          // Delete the given item from cart
        fetch("http://localhost:2500/carts/remove/:id", {
          "method": "DELETE",
          "headers": {
            "content-type": "application/json"
          },
          "body": JSON.stringify({
            id: id
          })
        }).then(res => res.json())
        .catch(err => {
          console.log(err);
        });

         let value = qty.value;
        // let user = JSON.parse(localStorage.getItem("user"));
        let  imgPrime = x.imgPrime;
        let  name = x.name;
        let  oriPrice = x.oriPrice;
        let  curPrice = x.curPrice;
        let  quantity = value;
        let  imgSub1 = x.imgSub1;
        let  imgSub2 = x.imgSub2;
        let  imgSub3 = x.imgSub3;
      
      // Posting the updated item in cart collection
      fetch("http://localhost:2500/carts/", {
        "method": "POST",
        "headers": {
          "content-type": "application/json"
        },
        "body": JSON.stringify({
          imgPrime: imgPrime,
          name: name,
          oriPrice: oriPrice,
          curPrice: curPrice,
          quantity: quantity,
           imgSub1: imgSub1,
           imgSub2: imgSub2,
          imgSub3: imgSub3
        })
      }).then(res => res.json())
      .then(res => console.log(res))
      .catch(err => {
        console.log(err);
      });

      alert(` Are you sure to update quantity of this item to ${value} in your cart? `);
      window.location.reload();
}

         priceLine.append(h3, h2);
    lDiv.append(img);
    mDiv.append(h1, priceLine, qty, hr);
    rDiv.append(logo1, logo2);

    divPush.append(lDiv, mDiv, rDiv);

    document.getElementById("displayItem").append(divPush);

    })
    }



    

// ================  total calculate fumction ========
async function calculations() {
  let res = await fetch("http://localhost:2500/carts/");
  let showCartaItem = await res.json();

var total = showCartaItem.reduce(function (startingValue, currentValue) {
  return startingValue + Number(currentValue.oriPrice * currentValue.quantity);
}, 0);

var actual = showCartaItem.reduce(function (startingValue, currentValue) {
  return startingValue + Number(currentValue.curPrice * currentValue.quantity);
}, 0);
localStorage.setItem("totalHPAmount", JSON.stringify(total));

document.querySelector(
  "#cartCount"
).innerHTML = `<h3 id="totalDisplayDiv">My Cart (${showCartaItem.length} items)</h3>  `;

document.querySelector("#totalMRP").innerHTML = ` ₹${total} `;

var finalPay = showCartaItem.reduce(function (a, b) {
  return a + Number(b.curPrice * b.quantity);
}, 0);
localStorage.setItem("finalPay", JSON.stringify(finalPay));

document.querySelector("#finalPay").innerHTML = `₹${finalPay}`;

document.querySelector("#payButton").innerHTML =
  "Proceed to Pay: " + `  ₹${actual}`;

var discount = total - actual;
localStorage.setItem("discount", JSON.stringify(discount));

document.querySelector("#tatalDis").innerHTML = ` ₹${discount}`;

let prices = {
  total:total,
  payable: finalPay,
  discount:discount
}

localStorage.setItem("priceAmounts", JSON.stringify(prices));
}
calculations();
//   ================finalPay =================


//   let proceedToPay = document.getElementById('payButton');
//  proceedToPay.onclick = function(){
//    window.location.href = "/Address.html";
//  }

// =================  total Dis  ============






function couponClicked(){
  document.querySelector("#afterApplyCoupon").innerHTML = ` <img
  
        
           <img 
           src="https://img10.hkrtcdn.com/react/static/media/cart/perct.svg"
           alt=""
         />
         <p>MDC Applied</p>
         <span>REMOVE</span>
           
          
         `
}

function setColor(e, btn, color) {
  var target = e.target,
      count = +target.dataset.count;
  
   target.style.backgroundColor = count === 1 ? "#7FFF00" : '#FFFFFF';
   target.dataset.count = count === 1 ? 0 : 1;
}

// For payment part

// let prices = {
//   total:total,
//   payable: finalPay,
//   discount:discount
// }

// localStorage.setItem("priceAmounts", JSON.stringify(prices));







// console.log("discount:" ,discount)

// var sum = 0;
// var totalQty = 0;

// sum = 0;
// totalQty = 0;
// cartItem.forEach((item) => {
//       sum += Number(item.qty) * Number(item.price);
//       totalQty += Number(item.length);
//       console.log(totalQty)
//     });

//     calculateTotal(sum, totalQty);

//     function calculateTotal(sum, totalQty) {
//         // cartCount.innerText = "Subtotal (" + totalQty + " item):" + " ₹ " + sum;

// }



// Coupon discount



let btn = document.getElementById('button');

let mid = 0;
let giveDiscount = () => {
  let coupon = document.getElementById('coupon').value;
   
   if(mid == 0 && coupon == "masai30"){

  let total = finalPay;

  total = total - (0.3 *  total);

  alert("Coupon Applied Successfully");

  document.querySelector("#finalPay").innerHTML = `₹${total}`;

  mid++;
  console.log(total);
   }else if(mid > 0 && coupon == "masai30"){
     alert("Coupon Already Applied");
   }
   else{
     alert("Invalid Coupon Code");
   }

}

btn.addEventListener('click', giveDiscount);


// 
document.getElementById('Mlogo').onclick = function(){
  window.location.href = "index.html";
}