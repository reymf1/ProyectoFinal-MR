//header nav-------------------------------------------------------
const menuBtn = document.querySelector(".header__nav-menu-btn");
const nav = document.querySelector(".header__nav");
const navList = document.querySelector(".header__nav-list");
const navLogo = document.querySelector(".header__nav-logo");

// Abrir/cerrar menú
menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
  navLogo.classList.toggle("active");
  menuBtn.classList.toggle("active");
});

// Cerrar menú al clicar un item
navList.querySelectorAll(".header__nav-a").forEach(item => {
  item.addEventListener("click", () => {
    nav.classList.remove("active");
    menuBtn.classList.remove("active");
  });
});






//Productos--------------------------------------------------
const productos = [
  {
    id: 1,
    img: "./Imágenes/botellas-2.jpg",
    nombre: "Botella de Vidrio con Piedra Energética",
    precio: 56000,
    descripcion: `<p>Hermosas botellas de vidrio con piedras energéticas en su interior, ideales para armonizar tu agua y energía. Tiene una capacidad de 500 ml. Incluye funda de neoprene  y base antideslizante para una mayor protección, ideal para llevar a todos lados.</p>
    <p>Podés elegir entre estas tres piedras:</p>
    <p><span>Piedra Lunar:</span> conectada con la energía femenina. Potencia la intuición, calma las emociones y acompaña en procesos de cambio y renacimiento interior.</p>
    <p><span>Labradorita:</span> piedra de transformación y protección. Eleva la conciencia, fortalece el aura y estimula la creatividad y la confianza en una misma.</p>
    <p><span>Cuarzo Violeta (Amatista):</span> Purificadora y espiritual. Ayuda a calmar la mente, facilita la meditación y protege de energías negativas. Ideal para momentos de introspección.</p>
    <p>¿Cuál te resuena más? Estoy para ayudarte a elegir la que mejor acompañe tu proceso.</p>`
  },
  {
    id: 2,
    img: "./Imágenes/rocio-aurico-1.jpg",
    nombre: "Rocío Áurico",
    precio: 5000,
    descripcion: `<p>Actúa como escudo protector, impidiendo que energías de baja vibracion ingresen en tu campo áurico. Armoniza y despeja el ambiente de energías densas y negativas, generando una limpieza energética en tu espacio áurico.</p>
    <p>Podés elegir el <b>Relax</b>, hecho a base de lavanda, o <b>Amor</b>, realizado a base de pétalos de rosas.</p>`
  },
  {
    id: 3,
    img: "./Imágenes/limpieza-energetica-1.jpg",
    nombre: "Caja de Limpieza Energética",
    precio: 16000,
    descripcion: `<p>Contiene 4 carboncitos y 5 hierbas diferentes para limpiar nuestro hogar, lugar de trabajo o cualquier espacio donde sentimos que la energía es densa. También se utiliza en lugares dónde hay frecuentes pérdidas de agua o problemas con la electricidad ...somos energía, todo es energía...sutil o densa....a limpiar!!!</p>`
  } 
];

//Creamos un array vacío para el carrito
let listaProductosCarrito = [];

// DEFINICION DE FUNCIONES 

function copiaListaProductos(lista) {
    return [...lista];
}

function insertarProductos() {
  //guardo una copia del original de productos
  const listaProductos = copiaListaProductos(productos);
  //obtengo el elemento contenedor de los productos
  const contenedorProductos = document.querySelector(".producto");
  //para verificar el elemento seleccionado
  console.log(contenedorProductos)
  //utilizo un bucle para insertar todos los elementos de la lista
  //uso desestructuración del producto en variables para cada producto de la lista
  for (const {id, img, nombre, precio, descripcion} of listaProductos) {
    //creamos el elemento (en memoria)
    /*const article = document.createElement("article");
    //agregamos al elemento las clases necesarias
    article.className = "producto__card";
    const divImg = document.createElement("div");
    //agregamos al elemento las clases necesarias
    divImg.className = "producto__card-img";
    const imagen = document.createElement("img");
    imagen.src = img;
    imagen.alt = nombre;
    divImg.appendChild(imagen);
    const divProd = document.createElement("div");
    divParr.className = "producto__card-parrafo";*/
    //creamos el contenido del elemento
    //usamos el atributo data del botón para identificar el producto
    const nuevoProducto = document.createElement("div");

    nuevoProducto.innerHTML = `
      <article class="producto__card">
        <div class="producto__card-img">
          <img src="${img}" alt="${nombre}">
        </div>
        <div class="producto__card-parrafo">
          <h3>${nombre}</h3>
          <p class="precio">${precio.toLocaleString("es-AR", {style: "currency", currency: "ARS"})}</p>
          <div class="descripcion">
          </div>
        </div>
        <div class="botones1">
          <button type="button" class="botones1-descripcion" data-descripcion="${descripcion}">Ver descripción</button>
          <button type="button" class="botones1-carrito-pagina botones1-carrito" data-id="${id}">Agregar al carrito</button>
        </div>
      </article>
      `;
      //insertamos el nuevo elemento en el contenedor en el HTML
      contenedorProductos.appendChild(nuevoProducto);
  }
}

//función para mostrar la descripción del producto
//la llama el listener y le pasa los datos del evento
function mostrarDescripcion(event) {
  //console.log(event.target.tagName);
  if (!event.target.classList.contains("botones1-descripcion")) return;
  
  //obtener el elemento clicado
  const elementoClickeado = event.target;
  //obtener la descripción del dataset
  //console.log(datosEvento.target.dataset.descripcion)
  const descripcionProducto = elementoClickeado.dataset.descripcion;
  //encontrar la tarjeta contenedora del botón
  const divProductos = elementoClickeado.closest(".producto__card");
  //console.log(divCard);
  //obtener el div de la descripción
  const divDescripcion = divProductos.querySelector(".descripcion");
  //console.log(divDescripcion);
  if (divDescripcion.innerHTML.trim() == "") {
      //insertar el parrafo en el div
      divDescripcion.innerHTML = descripcionProducto;
      //cambiamos el texto del enlace
      elementoClickeado.textContent = "Ocultar descripción";
  }
  else {
      divDescripcion.innerHTML = "";
      elementoClickeado.textContent = "Ver descripción";
  }
}

//Función para buscar el producto en la lista del carrito. La misma retorna el id encontrado o -1 si no se encontró
function buscarEnLista(id, lista) {
  //Verificamos los datos recibidos
  console.log(id, lista);
  
  for(const producto of lista) {
    if(producto.id === id) {
      console.log ("Producto encontrado", producto.id);
      return id;
    }
    console.log(producto.id);
  }
  return -1;
}

//Función para buscar un producto por su id, retorna el producto encontrado
function buscarProductoPorId(id, lista) {
  //verificamos los datos recibidos
  console.log(id, lista);
  for (let i = 0; i < lista.length; i++) {
    //si encontramos el id retornamos el producto
    if (lista[i].id === id) {
      console.log(lista[i]);
      return lista[i];
    }
  }
}

//Función para insertar producto en el html
function insertarProductoHTML(producto) {

  console.log(producto);

  //obtener el contenedor ul
  const listaCarrito = document.querySelector(".carrito__container-ul");

  //verificamos
  console.log(listaCarrito);

  //crear el elemento li
  const liProducto = document.createElement("li");

  //agregar el contenido
  liProducto.textContent = `${producto.nombre} ${producto.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}`;

  //agregar las clases
  liProducto.className = "carrito__container-ul-item";

  //insertar el elemento
  listaCarrito.appendChild(liProducto);
}

//función para actualizar el contador
function actualizarContador() {

  //obtener el contenedor del número
  const contenedorNumero = document.querySelector(".header__nav-carrito-contador");

  //verificamos
  console.log(contenedorNumero);
  
  //usamos la cantidad de productos de la lista
  contenedorNumero.textContent = listaProductosCarrito.length;
}

//función para guardar datos en Local Storage
function guardarCarritoEnStorage(lista) {
    const carritoJSON = JSON.stringify(lista);
    localStorage.setItem("listaCarrito", carritoJSON);
    console.log("producto en Storage");
}

// Función para recibir los datos del evento "agregar al carrito"
function agregarAlCarrito(event) {
  //Veo los datos del evento
  console.log(event.target.classList);

  //Si button no tiene la clase seleccionada, sale de la función
  if(!event.target.classList.contains("botones1-carrito")) return;
  
  //Verificamos el data-id del botón
  console.log(event.target.classList);
  console.log(event.target.dataset);
  console.log(event.target.dataset.id);
  console.log(typeof(event.target.dataset.id));

  //Guardo el id como number ya que el dataset lo devuelve como string
  const idProducto = parseInt(event.target.dataset.id);
  console.log(listaProductosCarrito);

  //buscamos el id en la lista del carrito y guardamos el resultado
  const idEncontrado = buscarEnLista(idProducto, listaProductosCarrito);
  console.log(idEncontrado);
  //si el id no está en la lista (-1) lo agregamos
  if (idEncontrado !== -1) {
    console.log("El producto ya está en el carrito");
    return;
  }
  
  //Buscar el producto en la lista de productos por el idProducto y lo guardamos
  const productoEncontrado = buscarProductoPorId(idProducto, productos);
  console.log(productoEncontrado);

  //agregar el productoEncontrado a la lista del carrito
  listaProductosCarrito.push(productoEncontrado)
  console.log("Producto agregado a lista carrito");
  console.log(listaProductosCarrito);

  //insertar el producto en el HTML
  insertarProductoHTML(productoEncontrado);

  //actualizar el contador de productos del carrito
  actualizarContador();

  //agregar producto al storage
  guardarCarritoEnStorage(listaProductosCarrito);
}

//función para cargar datos desde el Local Storage
function cargarCarritoDeStorage() {
    const carritoJSON = localStorage.getItem("listaCarrito");
    if (carritoJSON) {//Si la variable tiene contenido es verdadero
        return JSON.parse(carritoJSON);//Se covierte a lista de objetos
    }
    else {
        return [];
    }
}

//función para vaciar el carrito en la página
function vaciarCarrito() {
    const listaCarrito = document.querySelector(".carrito__container-ul");
    
    //Borramos todos los elementos del contenedor
    listaCarrito.innerHTML = "";
}

//función para eliminar el carrito en Local Storage
function eliminarCarrito() {

    //Eliminar el JSON del Local Storage
    localStorage.removeItem("listaCarrito");

    //Eliminar el contenido de la lista de productos del carrito
    listaProductosCarrito = [];

    actualizarContador();

    //Eliminar los elementos del html
    vaciarCarrito();
}




// Instrucciones de mi programa

insertarProductos();

//Cargar el carrito desde local storage
listaProductosCarrito = cargarCarritoDeStorage();
console.log(listaProductosCarrito);

//Si el Local Storage no está vacío
if (listaProductosCarrito.length != 0) {
    //insertar los productos
    for (const producto of listaProductosCarrito) {
        insertarProductoHTML(producto);
    }
    //actualizar el contador
    actualizarContador();
}

const contenedorProductos = document.querySelector(".producto");
console.log(contenedorProductos);

contenedorProductos.addEventListener("click", mostrarDescripcion);

//Agregar el listener al botón Agregar al carrito
contenedorProductos.addEventListener("click", agregarAlCarrito);

//Agregar el listener al botón Vaciar Carrito
const botonVaciarCarrito = document.querySelector(".carrito__container-btn-vaciar");
botonVaciarCarrito.addEventListener("click", eliminarCarrito);





//Apertura y cierre de Carrito de Compras

// Declaración de constantes
const iconCarrito = document.querySelector(".header__nav-carrito-icon");
const iconClose = document.querySelector(".carrito__container-btn-icon-close");
const carritoContainer = document.querySelector(".carrito__container");

function toggleCarrito () {
  console.log("click");
  if(carritoContainer.classList.contains("active")) return;
  carritoContainer.classList.toggle("active");
  iconClose.classList.toggle("active");
  console.log(carritoContainer);
};

iconCarrito.addEventListener("click", toggleCarrito);

contenedorProductos.addEventListener("click", (event) => {
  if (event.target.classList.contains("botones1-carrito-pagina")) {
    toggleCarrito();
  }
});


// Cerrar menú al clicar un item

  iconClose.addEventListener("click", () => {
    carritoContainer.classList.remove("active");
    iconClose.classList.remove("active");
  });
