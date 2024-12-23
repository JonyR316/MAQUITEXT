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

// Función para actualizar cantidad y total en el ícono del carrito
function updateCartIcon() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []; // Recuperar carrito
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0); // Sumar cantidades
  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + parseFloat(item.price.replace("$", "")) * item.quantity,
    0
  ); // Calcular precio total

  // Actualizar cantidad de productos en el ícono del carrito
  const cartNumberElement = document.querySelector(".cart-number");
  if (cartNumberElement) {
    cartNumberElement.textContent = totalItems;
  }

  // Actualizar precio total en el ícono del carrito
  const cartTotalElement = document.querySelector(".cart-total");
  if (cartTotalElement) {
    cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
  }
}

// Compra a Carrito
document.querySelectorAll(".buy-button").forEach((button) => {
  button.addEventListener("click", function () {
    const productElement = this.closest(".item"); // Contenedor del producto
    const currentPriceElement = productElement.querySelector(".price .current"); // Precio unitario
    const quantityElement = productElement.querySelector("#quantity"); // Cantidad seleccionada
    const productTitleElement = document.querySelector("h1.title"); // Título del producto
    const productImageElement = document.querySelector(".big-image img"); // Primera imagen del producto
    const productId = this.dataset.id; // ID único del producto

    if (
      currentPriceElement &&
      quantityElement &&
      productTitleElement &&
      productImageElement &&
      productId
    ) {
      const price = parseFloat(
        currentPriceElement.textContent.trim().replace("$", "")
      ); // Obtener el precio como número
      const quantity = parseInt(quantityElement.value.trim(), 10); // Obtener la cantidad como número
      const title = productTitleElement.textContent.trim(); // Obtener el título del producto
      const imageUrl = productImageElement ? productImageElement.src : null; // Capturar la URL de la imagen

      if (!imageUrl) {
        console.error(
          "No se pudo capturar la URL de la imagen. Verifica el selector."
        );
        return;
      }

      // Validar que la cantidad sea válida
      if (isNaN(quantity) || quantity < 1) {
        alert("Por favor, selecciona una cantidad válida (mínimo 1).");
        return;
      }

      const productUrl = window.location.href; // Capturar la URL actual
      console.log("URL capturada:", productUrl); // Verificar URL

      // Recuperar el carrito desde localStorage
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Verificar si el producto ya está en el carrito
      const existingProduct = cart.find((item) => item.id === productId);
      if (existingProduct) {
        console.log("Este producto ya está en el carrito.");
        return;
      }

      // Calcular el precio total del producto
      const totalPrice = price * quantity;

      // Agregar el producto al carrito con imagen, título, cantidad y precios
      cart.push({
        id: productId,
        title: title,
        price: `$${price.toFixed(2)}`, // Guardar el precio unitario formateado
        quantity: quantity,
        totalPrice: `$${totalPrice.toFixed(2)}`, // Guardar el precio total formateado
        imageUrl: imageUrl, // Guardar la URL de la imagen
        url: productUrl, // Guardar la URL actual
      });

      // Guardar el carrito actualizado en localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Actualizar el ícono del carrito
      updateCartIcon();

      aconsole.log("Producto agregado al carrito");
    } else {
      console.error(
        "Error al agregar el producto al carrito. Verifica los datos."
      );
    }
  });
});

// Actualizar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  updateCartIcon();
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

// BUSCADOR

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchResults = document.createElement("div");
  searchResults.className = "search-results";
  searchInput.parentElement.appendChild(searchResults);

  const productPaths = [
    //sigma
    "/maquinas/domesticas/Sigma/individuales/sigma1/sigma1.html",
    "/maquinas/domesticas/Sigma/individuales/sigma2/sigma2.html",
    "/maquinas/domesticas/Sigma/individuales/sigma3/sigma3.html",
    //offertas
    "/ofertas/individuales/oferta1/offer1.html",
  ];

  let products = [];

  // Cargar los títulos dinámicamente
  const loadProducts = async () => {
    const promises = productPaths.map(async (path) => {
      try {
        const response = await fetch(path);
        const text = await response.text();
        const doc = new DOMParser().parseFromString(text, "text/html");
        const titleElement = doc.querySelector("h1.title");
        if (titleElement) {
          return { name: titleElement.textContent.trim(), url: path };
        }
      } catch (error) {
        console.error(`Error al cargar ${path}:`, error);
        return null;
      }
    });

    const results = await Promise.all(promises);
    products = results.filter((product) => product !== null);
  };

  // Mostrar resultados en el buscador
  const showResults = (query) => {
    searchResults.innerHTML = "";
    if (!query) {
      searchResults.style.display = "none";
      return;
    }

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredProducts.length === 0) {
      searchResults.innerHTML = "<p>No se encontraron resultados.</p>";
      searchResults.style.display = "block";
      return;
    }

    filteredProducts.forEach((product) => {
      const link = document.createElement("a");
      link.href = product.url;
      link.textContent = product.name;
      link.className = "search-result-item";
      searchResults.appendChild(link);
    });

    searchResults.style.display = "block";
  };

  // Eventos del buscador
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    showResults(query);
  });

  document.addEventListener("click", (e) => {
    if (!searchResults.contains(e.target) && e.target !== searchInput) {
      searchResults.style.display = "none";
    }
  });

  loadProducts(); // Cargar los productos al inicio
});

document.querySelectorAll(".buy-button").forEach((button) => {
  button.addEventListener("click", function () {
    // Seleccionamos el ícono del carrito en el header
    const topCartIcon = document.querySelector(".iscart .icon-large i");

    // Seleccionamos el ícono del carrito junto al botón
    const buttonCartIcon = this.querySelector("i");

    // Obtenemos las posiciones inicial y final del ícono
    const startRect = buttonCartIcon.getBoundingClientRect();
    const targetRect = topCartIcon.getBoundingClientRect();

    // Creamos un clon del ícono
    const cloneIcon = buttonCartIcon.cloneNode(true);
    document.body.appendChild(cloneIcon);

    // Estilo inicial del clon
    cloneIcon.style.position = "fixed";
    cloneIcon.style.left = `${startRect.left}px`;
    cloneIcon.style.top = `${startRect.top}px`;
    cloneIcon.style.fontSize = "24px";
    cloneIcon.style.color = "#000";
    cloneIcon.classList.add("moving-cart");

    // Variables de la animación
    cloneIcon.style.setProperty("--start-x", `${startRect.left}px`);
    cloneIcon.style.setProperty("--start-y", `${startRect.top}px`);
    cloneIcon.style.setProperty("--target-x", `${targetRect.left}px`);
    cloneIcon.style.setProperty("--target-y", `${targetRect.top}px`);

    // Eliminamos el clon al terminar la animación
    cloneIcon.addEventListener("animationend", () => {
      cloneIcon.remove();
    });
  });
});
