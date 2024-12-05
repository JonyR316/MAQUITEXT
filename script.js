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

//Tiempo cronometro
document.addEventListener("DOMContentLoaded", () => {
  const countdownElement = document.getElementById("countdown");
  const timeUnits = Array.from(countdownElement.children);

  // Inicializar valores: horas, minutos, segundos
  let hours = parseInt(timeUnits[0].textContent);
  let minutes = parseInt(timeUnits[1].textContent);
  let seconds = parseInt(timeUnits[2].textContent);
  let millis = parseInt(timeUnits[3].textContent);

  function updateCountdown() {
    millis--;
    if (millis < 0) {
      millis = 99;
      seconds--;
    }
    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }
    if (minutes < 0) {
      minutes = 59;
      hours--;
    }
    if (hours < 0) {
      clearInterval(countdownTimer);
      alert("¡La oferta ha terminado!");
      return;
    }

    // Actualizar el DOM
    timeUnits[0].textContent = hours.toString().padStart(2, "0");
    timeUnits[1].textContent = minutes.toString().padStart(2, "0");
    timeUnits[2].textContent = seconds.toString().padStart(2, "0");
    timeUnits[3].textContent = millis.toString().padStart(2, "0");
  }

  const countdownTimer = setInterval(updateCountdown, 10); // Actualizar cada 10ms para incluir milisegundos
});

// FAVORITOS

// Elemento del contador en el encabezado
const heartCounter = document.querySelector(".fly-item .item-number");

// Selección de los íconos de corazón en los productos
const heartIcons = document.querySelectorAll(".ri-heart-line");

// Recuperar los estados guardados de localStorage
const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Restaurar los estados iniciales de los corazones
heartIcons.forEach((icon, index) => {
  if (savedFavorites.includes(index)) {
    icon.classList.add("ri-heart-fill", "heartbeat");
    icon.classList.remove("ri-heart-line");
  }

  // Agregar evento de clic
  icon.parentElement.addEventListener("click", function (event) {
    event.preventDefault();

    // Alternar las clases del ícono
    const isFavorited = icon.classList.toggle("ri-heart-fill");
    icon.classList.toggle("ri-heart-line");
    icon.classList.toggle("heartbeat", isFavorited);

    // Actualizar los estados en localStorage
    if (isFavorited) {
      savedFavorites.push(index); // Agregar el índice del ícono marcado
    } else {
      const removeIndex = savedFavorites.indexOf(index);
      savedFavorites.splice(removeIndex, 1); // Quitar el índice del ícono desmarcado
    }
    localStorage.setItem("favorites", JSON.stringify(savedFavorites));

    // Actualizar el contador en el encabezado
    updateHeartCounter();
  });
});

// Actualizar contador de favoritos
function updateHeartCounter() {
  const favoriteCount = savedFavorites.length;
  heartCounter.textContent = favoriteCount;
}

// Inicializar contador al cargar la página
updateHeartCounter();

// Seleccionar el enlace que envuelve el corazón al lado del carrito
const heartLink = document.querySelector(".inactive-link");

// Desactivar completamente el clic
if (heartLink) {
  heartLink.addEventListener("click", function (event) {
    event.preventDefault(); // Cancela cualquier acción predeterminada
    event.stopPropagation(); // Detiene la propagación del evento
  });
}

//Compra a Carrito
document.querySelectorAll(".buy-button").forEach((button) => {
  button.addEventListener("click", function () {
    const productElement = this.closest(".item"); // Contenedor del producto
    const currentPriceElement = productElement.querySelector(".price .current"); // Precio unitario
    const quantityElement = productElement.querySelector("#quantity"); // Cantidad seleccionada
    const productTitleElement = document.querySelector("h1.title"); // Título del producto
    const productId = this.dataset.id; // ID único del producto

    if (
      currentPriceElement &&
      quantityElement &&
      productTitleElement &&
      productId
    ) {
      const price = parseFloat(
        currentPriceElement.textContent.trim().replace("$", "")
      ); // Obtener el precio como número
      const quantity = parseInt(quantityElement.value.trim(), 10); // Obtener la cantidad como número
      const title = productTitleElement.textContent.trim(); // Obtener el título del producto

      // Validar que la cantidad sea válida
      if (isNaN(quantity) || quantity < 1) {
        alert("Por favor, selecciona una cantidad válida (mínimo 1).");
        return;
      }

      // Recuperar el carrito desde localStorage
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Verificar si el producto ya está en el carrito
      const existingProduct = cart.find((item) => item.id === productId);
      if (existingProduct) {
        alert("Este producto ya está en el carrito.");
        return;
      }

      // Calcular el precio total del producto
      const totalPrice = price * quantity;

      // Agregar el producto al carrito con título, cantidad, precio unitario y precio total
      cart.push({
        id: productId,
        title: title,
        price: `$${price.toFixed(2)}`, // Guardar el precio unitario formateado
        quantity: quantity,
        totalPrice: `$${totalPrice.toFixed(2)}`, // Guardar el precio total formateado
      });

      // Guardar el carrito actualizado en localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Producto agregado al carrito");
    } else {
      console.error(
        "Error al agregar el producto al carrito. Verifica los datos."
      );
    }
  });
});

document.querySelectorAll(".qty-control").forEach((control) => {
  const decrementButton = control.querySelector("#decrement");
  const incrementButton = control.querySelector("#increment");
  const quantityInput = control.querySelector("#quantity");

  decrementButton.addEventListener("click", () => {
    let currentValue = parseInt(quantityInput.value, 10);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  incrementButton.addEventListener("click", () => {
    let currentValue = parseInt(quantityInput.value, 10);
    quantityInput.value = currentValue + 1;
  });
});
