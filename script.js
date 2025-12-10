//MENÚ HAMBURGUESA***********************************************************

//Declaración de constantes
const menuBtn = document.querySelector(".header__nav-menu-btn");
const nav = document.querySelector(".header__nav");
const navList = document.querySelector(".header__nav-list");
const navLogo = document.querySelector(".header__nav-logo");

//Abrir/cerrar menú
menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
  navLogo.classList.toggle("active");
  menuBtn.classList.toggle("active");
});

// Cerrar menú al clickear un enlace
navList.querySelectorAll(".header__nav-a").forEach(item => {
  item.addEventListener("click", () => {
    nav.classList.remove("active");
    menuBtn.classList.remove("active");
  });
});
//FIN MENÚ HAMBURGUESA*******************************************************************************************





//Productos--------------------------------------------------
let productos = [];//El array está vacío porque los vamos a cargar con el Json que traemos desde 1 servidor o API
let listaProductosCarrito = [];//Creamos un array vacío para el carrito

//FUNCIONES-------------------------------------------------- 

async function cargarProductosApi() {
  console.log("Cargar productos");
  //Try: intentar. Se intenta ejecutar el código entre llaves
  try {
    //petición del archivo JSON a la URL de API
    const respuesta = await fetch("./productos.json");
    //const respuesta = await fetch("https://mocki.io/v1/43fb5b03-d1e0-4156-9859-43891d4db257");
    //verificamos la respuesta
    //console.log(respuesta);

    //manejo de errores de HTTP (ej. 404 Not Found)
    if (!respuesta.ok) {//respuesta.ok es una propiedad booleana: Devuelve true si el status HTTP está entre 200 y 299 (éxito).Devuelve false si es un error (404, 500, 401, etc).
      
      //Throw: Lanzamiento. Se lanza un error, se corta la ejecución, se crea un objeto Error con los datos del error y se envía al bloque Catch
      throw new Error(`Error al obtener los datos: ${respuesta.status} - ${respuesta.statusText}`);
    }
    //si respuesta.ok es true
    // Conversión del JSON a Array
    const productosArray = await respuesta.json();//await va siempre con async
    //console.log(productosArray);
    return productosArray;        
  } 
  catch (error) {//Catch: capturar. Captura el Error y si es necesario se ejecutan instrucciones
    //verificamos el error
    console.error("Fallo grave en la carga:", error);
    // Informar al usuario en la interfaz
    const listaUL = document.querySelector(".carrito__container-ul");
    listaUL.innerHTML = '<li id="mensaje-error">❌ Error al cargar el catálogo.</li>';
    // Devolvemos un array vacío para evitar errores posteriores
    return []; 
  }
}

function insertarProductos(lista) {
  //obtengo el elemento contenedor de los productos
  const contenedorProductos = document.querySelector(".producto");
  //para verificar el elemento seleccionado
  //console.log(contenedorProductos);

  //Utilizo un bucle para insertar todos los elementos de la lista
  //Uso desestructuración del producto en variables para cada producto de la lista
  for (const {id, img, nombre, precio, descripcion} of lista) {
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
          <button type="button" class="botones1-carrito" data-id="${id}">Agregar al carrito</button>
        </div>
      </article>
      `;
      //insertamos el nuevo elemento en el contenedor en el HTML
      contenedorProductos.appendChild(nuevoProducto);
  }
}

//Función para mostrar la descripción del producto. La llama el listener y le pasa los datos del evento
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
  //console.log(id, lista);
  
  for(const producto of lista) {
    if(producto.id === id) {
      //console.log ("Producto encontrado", producto.id);
      return true;
    }
    console.log(producto.id);
  }
  return false;
}

//Función para buscar un producto por su id, retorna el producto encontrado
function buscarProductoPorId(id, lista) {
  //verificamos los datos recibidos
  //console.log(id, lista);

  for (let i = 0; i < lista.length; i++) {
    //si encontramos el id retornamos el producto
    if (lista[i].id === id) {
      //console.log(lista[i]);
      return lista[i];
    }
  }
}

//Función para insertar producto en el html
function insertarProductoHTML(producto) {

  //console.log(producto);

  //obtener el contenedor ul
  const listaCarrito = document.querySelector(".carrito__container-ul");
  if (!listaCarrito) return;

  //verificamos
  //console.log(listaCarrito);

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
  //console.log(contenedorNumero);
  //usamos la cantidad de productos de la lista
  if(contenedorNumero) contenedorNumero.textContent = listaProductosCarrito.length;
}

//función para guardar datos en Local Storage
function guardarCarritoEnStorage(lista) {
    const carritoJSON = JSON.stringify(lista);
    localStorage.setItem("listaCarrito", carritoJSON);
    //console.log("producto en Storage");
}

// Función para recibir los datos del evento "agregar al carrito"
function agregarAlCarrito(event) {
  //Veo los datos del evento
  //console.log(event.target.classList);

  //Si button no tiene la clase seleccionada, sale de la función
  if(!event.target.classList.contains("botones1-carrito")) return;
  
  //Verificamos el data-id del botón
  /*console.log(event.target.classList);
  console.log(event.target.dataset);
  console.log(event.target.dataset.id);
  console.log(typeof(event.target.dataset.id));*/

  //Guardo el id como number ya que el dataset lo devuelve como string
  const idProducto = parseInt(event.target.dataset.id);
  //console.log(listaProductosCarrito);

  //buscamos el id en la lista del carrito y guardamos el resultado
  const idEncontrado = buscarEnLista(idProducto, listaProductosCarrito);
  console.log(idEncontrado);
  //si el id no está en la lista (-1) lo agregamos
  if (idEncontrado) {
    //console.log("El producto ya está en el carrito");
    return;
  }
  
  //Buscar el producto en la lista de productos por el idProducto y lo guardamos
  const productoEncontrado = buscarProductoPorId(idProducto, productos);
  //console.log(productoEncontrado);

  //agregar el productoEncontrado a la lista del carrito
  listaProductosCarrito.push(productoEncontrado)
  //console.log("Producto agregado a lista carrito");
  //console.log(listaProductosCarrito);

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


//Función que inicia la carga de productos y luego ejecuta las instrucciones del programa.Las instrucciones del programa deben estar dentro de una función asicrónica,ya que la carga de productos es una función asincrónica
async function main() {
  // Declaración de constantes-Selección global de elementos del carrito
  const iconCarrito = document.querySelectorAll(".header__nav-carrito-icon");
  const iconClose = document.querySelector(".carrito__container-btn-icon-close");
  const carritoContainer = document.querySelector(".carrito__container");
  const listaCarritoUL = document.querySelector(".carrito__container-ul");

  //seleccionar el contenedor de los productos
  const contenedorProductos = document.querySelector(".producto");
  //console.log(contenedorProductos);

  //Pongo esta condición porque la clase ".producto" sólo está en index.html (no está en index1, 2 y 3)
  if(contenedorProductos) {
    //console.log("Iniciando la carga de productos");
    //guardamos en productos la lista obtenida de la api
    productos = await cargarProductosApi();

    //instrucciones del programa que dependen de la carga Insertar los productos en la página
    insertarProductos(productos);

    //Agregar el listener al botón Ver descripción
    contenedorProductos.addEventListener("click", mostrarDescripcion);

    //Agregar el listener al botón Agregar al carrito
    document.addEventListener("click", agregarAlCarrito);

    //Abrir carrito de compras desde el botón de cualquier producto
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("botones1-carrito")) {
      carritoContainer.classList.add("active");
      iconClose.classList.add("active");
      }
    });
  }
  
  //Agregar el listener al botón Vaciar Carrito
  const botonVaciarCarrito = document.querySelector(".carrito__container-btn-vaciar");
  botonVaciarCarrito.addEventListener("click", eliminarCarrito);

  //Cargar el carrito desde local storage
  listaProductosCarrito = cargarCarritoDeStorage();
  //console.log(listaProductosCarrito);

  //Si el storage no está vacío
  if (listaCarritoUL && listaProductosCarrito.length != 0) {
      //insertar los productos
      for (const producto of listaProductosCarrito) {
          insertarProductoHTML(producto);
      }
      //actualizar el contador
      actualizarContador();
  }

  //Apertura y cierre de Carrito de Compras
  

  //Abrir página carrito de compras
  iconCarrito.forEach(btn => {
    btn.addEventListener("click", () => {
      carritoContainer.classList.add("active");
      iconClose.classList.add("active");
    });
  });

  //Cerrar página carrito de compras desde el ícono "x"
  iconClose.addEventListener("click", () => {
    carritoContainer.classList.remove("active");
    iconClose.classList.remove("active");
  });
}

// Instrucciones de mi programa

main();




