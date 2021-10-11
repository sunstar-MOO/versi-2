function checkchart(codename) {
  if (sessionStorage[codename]) {
    additem(codename);
  } else {
    inputitem(codename);
  }
}
//delete all rows
function erase() {
  var tabler = document.querySelectorAll("tbody tr");
  for (let x = 0; x < tabler.length; x++) {
    tabler[x].remove();
  }
}
function additem(codename) {
  var dicti = JSON.parse(sessionStorage[codename]);
  dicti["amount"]++;
  //   console.log(dicti);
  sessionStorage.setItem(codename, JSON.stringify(dicti));
  refreshing();
}

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
      refreshing();
    }
  }
}

function createl(x) {
  return document.createElement(x);
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

//HITUNG POTONGAN
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

function totaloffer() {
  var asli = totalreal();
  var potongan = cutoff();
  var origin = totalorigin();
  var nett = potongan - origin;
  console.log("Selisih potongan dan modal: " + nett);

  // if (nett <= 0) {
  //   nett = ((asli - origin) * 80) / 100;
  // }
  if (nett > 15000) {
    nett = (nett * 90) / 100;
  } else {
  }
  nett = Math.floor(origin / 1000 + nett / 1000) * 1000;
  console.log("harga jual: " + nett);

  return nett;
}

function realpay() {
  var total = totalreal();
  console.log("Harga Asli:" + total);
  var row = createl("tr");
  var row4 = createl("td");
  row4.setAttribute("colspan", 3);
  var rowword = createl("th");
  rowword.innerHTML = "TOTAL";
  var rowtotal = createl("td");
  rowtotal.innerHTML = total;
  row.append(row4, rowword, rowtotal);
  tbod.append(row);
}

//DOM OFFERING
function getoff() {
  var total = totaloffer();
  var row = createl("tr");
  var row4 = createl("td");
  row4.setAttribute("colspan", 3);
  var rowword = createl("th");
  rowword.innerHTML = "OUR OFFER";
  var rowtotal = createl("td");
  rowtotal.innerHTML = total;
  row.append(row4, rowword, rowtotal);
  tbod.append(row);
}

function addmore() {
  var total = totaloffer();
  var row = createl("tr");
  var row4 = createl("td");
  row4.setAttribute("colspan", 1);
  var rowword = createl("td");
  rowword.innerHTML = "ADD MORE ITEM TO GET OFFER";
  var rowtotal = createl("td");
  rowtotal.innerHTML = "";
  row.append(row4, rowword, rowtotal);
  tbod.append(row);
}
function resetbutt() {
  var row = createl("tr");
  var emp = createl("td");
  emp.setAttribute("colspan", 1);

  var button = createl("a");

  button.innerHTML = "RESET OFFER";
  button.setAttribute("class", "link-danger");
  button.setAttribute("id", "reset");

  row.append(emp, button);
  tbod.append(row);
  var reset = document.getElementById("reset");
  if (reset) {
    reset.addEventListener("click", function () {
      // this.remove();
      erase();
      console.log("done");
      sessionStorage.clear();
      refreshing();
    });
  }
}
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
var tbod = document.querySelector("tbody");

function refreshing() {
  var tbod = document.querySelector("tbody");

  for (x in Object.keys(sessionStorage)) {
    var word = Object.keys(sessionStorage)[x];
    // console.log(Object.keys(sessionStorage)[x]);
    var dicti = JSON.parse(sessionStorage[word]);

    var number = createl("th");
    var nomor = x;
    nomor++;

    number.setAttribute("scope", nomor);
    number.innerHTML = nomor;

    var nama = createl("div");
    nama.innerHTML = dicti["name"];

    var durasi = createl("div");
    durasi.innerHTML = dicti["time"];

    var item = createl("td");
    item.append(nama, durasi);

    var qty = createl("td");
    qty.innerHTML = dicti["amount"];

    var price = createl("td");
    price.innerHTML = dicti["price"];

    var total = createl("td");
    total.innerHTML = dicti["price"] * dicti["amount"];

    var row = createl("tr");
    row.append(number, item, qty, price, total);

    // table.append(tbod);
    tbod.append(row);
  }
  realpay();
  offering();
}
var table = document.querySelector("table");

// var tbod = createl("tbody");
// var table = document.querySelector("table");
// table.append(tbod);

if (Object.keys(sessionStorage)) {
  refreshing();
}
