//copy menu for
function copyMenu() {
  //copy insade .dpt-cat to .departments
  var dptCategory = document.querySelector(".dpt-cat");
  var dptPlace = document.querySelector(".departments");
  dptPlace.innerHTML = dptCategory.innerHTML;

  //copy inside nav to nav
  var mainNav = document.querySelector(".header-nav nav");
  var navPlace = document.querySelector(".off-canvas nav");
  navPlace.innerHTML = mainNav.innerHTML;

  //copy .header-top .wrapper to .thetop-nav
  var topNav = document.querySelector(".header-top .wrapper");
  var topPlace = document.querySelector(".off-canvas .thetop-nav");
  topPlace.innerHTML = topNav.innerHTML;
}
copyMenu();

//show mobile menu
const menuButton = document.querySelector(".trigger"),
  closeButton = document.querySelector(".t-close"),
  addclass = document.querySelector(".site");
menuButton.addEventListener("click", function () {
  addclass.classList.toggle("showmenu");
});
closeButton.addEventListener("click", function () {
  addclass.classList.remove("showmenu");
});

//show sub menu on mobile
const submenu = document.querySelectorAll(".has-child .icon-small");
submenu.forEach((menu) => menu.addEventListener("click", toggle));

function toggle(e) {
  e.preventDefault();
  submenu.forEach((item) =>
    item != this ? item.closest(".has-child").classList.remove("expand") : null
  );
  if (this.closest(".has-child").classList != "expand");
  this.closest(".has-child").classList.toggle("expand");
}

//Slider
const swiper = new Swiper(".swiper", {
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    delay: 3000,
  },
});

//show search
const searchButton = document.querySelector(".t-search"),
  tClose = document.querySelector(".search-close"),
  showClass = document.querySelector(".site");
searchButton.addEventListener("click", function () {
  showClass.classList.toggle("showsearch");
});
tClose.addEventListener("click", function () {
  showClass.classList.remove("showsearch");
});

//show dpt menu
const dptButton = document.querySelector(".dpt-cat .dpt-trigger"),
  dptClass = document.querySelector(".site");
dptButton.addEventListener("click", function () {
  dptClass.classList.toggle("showdpt");
});

//product image slider
var productThumb = new Swiper(".small-image", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 3,
  freeMode: true,
  watchSlidesProgress: true,
  breakpoints: {
    481: {
      spaceBetween: 32,
    },
  },
});
var productBig = new Swiper(".big-image", {
  loop: true,
  autoHeight: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: productThumb,
  },
});

//Stock products bar width percentage
var stocks = document.querySelectorAll(".products .stock");
for (let x = 0; x < stocks.length; x++) {
  let stock = stocks[x].dataset.stock,
    available = stocks[x].querySelector(".qty-available").innerHTML,
    sold = stocks[x].querySelector(".qty-sold").innerHTML,
    percent = (sold * 100) / stock;

  stocks[x].querySelector(".available").style.width = percent + "%";
}

//Paginacion
document.querySelectorAll(".page-btn").forEach((button) => {
  button.addEventListener("click", function () {
    document.querySelector(".page-btn.active").classList.remove("active");
    this.classList.add("active");
  });
});

// Variables
let quantity = 1;
const maxQuantity = 99;
const minQuantity = 1;

// Incremento y decremento de cantidad
document.getElementById("increment").addEventListener("click", function () {
  if (quantity < maxQuantity) {
    quantity++;
    document.getElementById("quantity").value = quantity;
  }
});

document.getElementById("decrement").addEventListener("click", function () {
  if (quantity > minQuantity) {
    quantity--;
    document.getElementById("quantity").value = quantity;
  }
});

//Carrito

const listProducts = document.querySelector("#listProducts");

let productsArray = [];

document.addEventListener("DOMContentLoaded", function () {
  eventListeners();
});

function eventListeners() {
  listProducts.addEventListener("click", getDataElements);
}

function getDataElements(e) {
  if (e.target.classList.contains("btn-add")) {
    const elementHtml =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement;
    selectData(elementHtml);
  }
}

function selectData(prod) {
  const productObj = {
    img: prod.querySelector("img").src,
    title: prod.querySelector("h1").textContent,
    price: parseFloat(
      prod.querySelector("#currentPrice").textContent.replace("$", "")
    ),
    id: parseInt(prod.querySelector('button[type="button"]').dataset.id, 10),
    quantity: 1,
  };
  productsArray = [...productsArray, productObj];
  productsHtml();
}

function productsHtml() {
  productsArray.forEach((prod) => {
    const { img, title, price, quantity, id } = prod;

    const tr = document.createElement("tr");

    const tdImg = document.createElement("td");
    const prodImg = document.createElement("img");
    prodImg.src = img;
    prodImg.alt = "img product";
    tdImg.appendChild(prodImg);

    const tdTitle = document.createElement("td");
    const prodTitle = document.createElement("p");
    prodTitle.textContent = title;
    tdTitle.appendChild(prodTitle);

    const tdPrice = document.createElement("td");
    const prodPrice = document.createElement("p");
    prodPrice.textContent = `$${price.toFixed(2)}`;
    tdPrice.appendChild(prodPrice);

    const tdQuantity = document.createElement("td");
    const prodQuantity = document.createElement("input");
    prodQuantity.type = "number";
    prodQuantity.min = "1";
    prodQuantity.value = quantity;
    prodQuantity.dataset.id = id;
    tdQuantity.appendChild(prodQuantity);

    const tdDelete = document.createElement("td");
    const prodDelete = document.createElement("button");
    prodDelete.type = "button";
    prodDelete.textContent = "X";
    tdDelete.appendChild(prodDelete);

    tr.append(tdImg, tdTitle, tdPrice, tdQuantity, tdDelete);

    console.log(tr);
  });
}
