var accordion = document.querySelector("#accordionExample");
var category1 = [];

for (x in produk) {
  category1.push(produk[x]["app"]);
}
var category1 = [...new Set(category1)];

var category = [];

for (let x = 0; x < category1.length; x++) {
  category.push(`suns${x}`);
  // console.log(x);
}

for (x in category) {
  var divcat = document.createElement("div");
  divcat.classList.add(category[x]);
  divcat.classList.add("accordion-item");

  var headercat = document.createElement("div");
  headercat.classList.add("accordion-header");
  headercat.setAttribute("id", `header${category[x]}`);

  var buttoncat = document.createElement("button");
  buttoncat.innerText = category1[x];
  buttoncat.classList.add("accordion-button");
  buttoncat.setAttribute("type", "button");
  buttoncat.setAttribute("data-bs-toggle", "collapse");
  buttoncat.setAttribute("data-bs-target", `#collapse${category[x]}`);
  buttoncat.setAttribute("aria-expanded", "true");
  buttoncat.setAttribute("aria-controls", `collapse${category[x]}`);

  var empdiv = document.createElement("div");
  empdiv.setAttribute("class", "accordion-collapse collapse");
  empdiv.setAttribute("id", `collapse${category[x]}`);
  empdiv.setAttribute("aria-labelledby", `heading${category[x]}`);
  empdiv.setAttribute("data-bs-parent", "#accordionExample");

  var bodyacc = document.createElement("div");
  bodyacc.classList.add("accordion-body");
  //   bodyacc.innerHTML = `TES${category[x]}`;

  var itmcon = document.createElement("div");
  itmcon.classList.add("container");
  var row = document.createElement("div");
  row.classList.add("row");

  for (y in produk) {
    if (produk[y]["app"] == category1[x]) {
      var cards = document.createElement("div");
      cards.classList.add("card");
      cards.classList.add("col-md-6");
      var proddet = document.createElement("div");
      proddet.classList.add("card-body");

      var prodname = document.createElement("div");
      prodname.setAttribute("class", "card-title fw-bold");
      prodname.innerHTML = `${produk[y]["name"]}  (${produk[y]["time"]})`;

      var prodrice = document.createElement("div");
      prodrice.setAttribute("class", "card-subtitle mb-2 text-muted");
      prodrice.innerHTML = `IDR ${produk[y]["price"]}`;

      var prodes = document.createElement("div");
      prodes.classList.add("card-text");
      prodes.innerHTML = produk[y]["desc"];

      var probut = document.createElement("a");
      probut.setAttribute("class", "btn btn-primary");
      probut.setAttribute("id", `${produk[y]["iden"]}`);
      probut.innerHTML = "Add item";
      probut.addEventListener("click", function () {
        if (Boolean(sessionStorage.length)) {
          erase();
        }
        checkchart(this.getAttribute("id"));
        refreshing();
        // checkchart(this.getAttribute("id"));
      });

      proddet.append(prodname, prodrice, prodes, probut);
      cards.append(proddet);
      row.append(cards);
    }
  }
  itmcon.append(row);
  bodyacc.append(itmcon);
  empdiv.append(bodyacc);
  headercat.append(buttoncat);
  divcat.append(headercat, empdiv);
  //   console.log(headercat);
  accordion.append(divcat);
}
