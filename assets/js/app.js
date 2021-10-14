// DELETE ALL ROWS
function erase() {
  var item = document.querySelectorAll("ul li");
  for (let x = 0; x < item.length; x++) {
    item[x].remove();
  }
}

//CHECK IF THE DATA IS EXIST
function checkchart(codename) {
  if (sessionStorage[codename]) {
    additem(codename);
  } else {
    inputitem(codename);
  }
}

// ADD ITEM QUANTITY
function additem(codename) {
  var dicti = JSON.parse(sessionStorage[codename]);
  dicti["amount"]++;
  //   console.log(dicti);
  sessionStorage.setItem(codename, JSON.stringify(dicti));
}

// ADD NEW ITEM
function inputitem(codename) {
  for (x in produk) {
    if (produk[x]["iden"] == codename) {
      var dicti = {
        app: produk[x]["app"],
        iden: produk[x]["iden"],
        name: produk[x]["name"],
        price: produk[x]["price"],
        time: produk[x]["time"],
        desc: produk[x]["desc"],
        nett: produk[x]["nett"],
        cutoff: Math.floor(produk[x]["price"] / 3000) * 3000,
        amount: 1,
      };

      sessionStorage.setItem(codename, JSON.stringify(dicti));
    }
  }
}

//HITUNG HARGA ASLI
function totalreal() {
  var total = 0;

  for (x in Object.keys(sessionStorage)) {
    var word = Object.keys(sessionStorage)[x];
    var dicti = JSON.parse(sessionStorage[word]);
    var harga = dicti["price"] * dicti["amount"];
    total = total + harga;
  }
  return total;
}

//HITUNG HARGA POTONGAN
function cutoff() {
  var total = 0;

  for (x in Object.keys(sessionStorage)) {
    var word = Object.keys(sessionStorage)[x];
    var dicti = JSON.parse(sessionStorage[word]);
    var harga = dicti["cutoff"] * dicti["amount"];
    total = total + harga;
  }
  console.log("Harga potongan: " + total);
  return total;
}

//HITUNG MODAL
function totalorigin() {
  var price = totalreal();
  var total = 0;
  var harga = 0;

  for (x in Object.keys(sessionStorage)) {
    var word = Object.keys(sessionStorage)[x];
    var dicti = JSON.parse(sessionStorage[word]);
    var harga = harga + dicti["nett"] * dicti["amount"];
    total = price - harga;
  }
  console.log(harga);
  console.log("Harga Modal: " + total);
  return total;
}

//HITUNG TOTAL OFFER
function totaloffer() {
  var asli = totalreal();
  var potongan = cutoff();
  var origin = totalorigin();
  var nett = potongan - origin;
  console.log("Selisih potongan dan modal: " + nett);
  if (nett > 15000) {
    nett = (nett * 90) / 100;
  } else {
  }
  nett = Math.floor(origin / 1000 + nett / 1000) * 1000;
  console.log("harga jual: " + nett);

  return nett;
}

//DOM OFFERING

function offering() {
  var quantity = 0;

  for (x in Object.keys(sessionStorage)) {
    var word = Object.keys(sessionStorage)[x];
    var dicti = JSON.parse(sessionStorage[word]);
    quantity = quantity + dicti["amount"];
  }
  if (quantity > 1) {
    getoff();
    resetbutt();
    console.log("dapat potongan");
  }
  if (quantity == 1) {
    addmore();
    resetbutt();
    console.log("tidak dapat");
  }
}

var list = document.querySelector(".list-group");
function createl(x) {
  return document.createElement(x);
}
var nameclass = "list-group-item d-flex justify-content-between align-items-center";
var totalclass = "badge bg-primary rounded-pill";

function resetbutt() {
  var word = createl("li");
  word.setAttribute("class", nameclass);
  var anchor = createl("button");
  anchor.setAttribute("id", "reset");
  anchor.setAttribute("class", "btn btn-danger");
  anchor.innerHTML = "RESET";

  word.append(anchor);
  list.append(word);

  var reset = document.getElementById("reset");

  reset.addEventListener("click", function () {
    // this.remove();
    // refreshing();
    erase();
    sessionStorage.clear();

    console.log("done");
  });
}

function addmore() {
  var total = totaloffer();
  var word = createl("li");
  word.setAttribute("class", nameclass + " fw-bold");
  word.innerHTML = "Add one more item, to unlock our offer ";
  var number = createl("div");
  number.setAttribute("class", totalclass);
  number.innerHTML = total;

  // word.append(number);
  list.append(word);
}

function getoff() {
  var total = totaloffer();
  var word = createl("li");
  word.setAttribute("class", nameclass + " fw-bold");
  word.innerHTML = "OUR OFFER";
  var number = createl("div");
  number.setAttribute("class", totalclass);
  number.innerHTML = total;

  word.append(number);
  list.append(word);
}

function realpay() {
  var total = createl("li");
  total.setAttribute("class", nameclass + " fw-bold");
  total.innerHTML = "TOTAL";

  var price = createl("div");
  price.setAttribute("class", totalclass);
  price.innerHTML = totalreal();

  total.append(price);
  list.append(total);
}

function refreshing() {
  for (x in Object.keys(sessionStorage)) {
    var word = Object.keys(sessionStorage)[x];
    var dicti = JSON.parse(sessionStorage[word]);
    var item = createl("li");
    item.setAttribute("class", nameclass);

    var nama = createl("div");
    nama.setAttribute("class", " fw-bold");
    nama.innerHTML = dicti["name"];

    var qty = createl("div");
    qty.innerHTML = `(${dicti["amount"]}) ${dicti["price"]}`;

    var container = createl("div");
    container.append(nama, qty);
    item.append(container);

    var total = createl("div");
    total.setAttribute("class", totalclass);
    total.innerHTML = dicti["amount"] * dicti["price"];

    item.append(total);
    list.append(item);
  }

  realpay();
  offering();
}

if (Boolean(sessionStorage.length)) {
  refreshing();
}
