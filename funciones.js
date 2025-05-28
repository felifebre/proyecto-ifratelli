// FUNCIONA EN TODAS LAS PÁGINAS: Agregar al carrito
document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll("button");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", () => {
            const productoElemento = boton.closest(".producto");
            if (!productoElemento) return;

            const nombre = productoElemento.querySelectorAll("h2")[0]?.textContent || "Producto";
            const precioTexto = productoElemento.querySelectorAll("h2")[1]?.textContent || "$0";
            const precio = parseFloat(precioTexto.replace("$", "").replace(".", ""));

            const cantidad = prompt(`¿Cuántos querés de: ${nombre}?`);

            if (cantidad !== null && !isNaN(cantidad) && cantidad > 0) {
                agregarAlCarrito({
                    nombre,
                    cantidad: parseInt(cantidad),
                    precio
                });
                alert("Producto agregado al carrito.");
            } else {
                alert("Por favor ingresá una cantidad válida.");
            }
        });
    });

    // Si estamos en Pedido.html, mostramos el carrito
    if (window.location.pathname.includes("Pedido.html")) {
        mostrarPedido();
    }
});

// Función para guardar en localStorage
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para mostrar el pedido en Pedido.html
function mostrarPedido() {
    const contenedor = document.getElementById("pedido-contenedor");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (!contenedor) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>No agregaste ningún producto.</p>";
        return;
    }

    let html = "<ul>";
    carrito.forEach(item => {
        html += `<li>${item.cantidad} x ${item.nombre} - $${item.precio * item.cantidad}</li>`;
    });
    html += "</ul>";

    contenedor.innerHTML = html;
}

// Función para generar mensaje y abrir WhatsApp
function enviarPedidoPorWhatsApp() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let mensaje = "Hola! Quiero hacer un pedido:\n";
    let total = 0;

    carrito.forEach(item => {
        mensaje += `- ${item.cantidad} x ${item.nombre} = $${item.precio * item.cantidad}\n`;
        total += item.precio * item.cantidad;
    });

    mensaje += `\nTOTAL: $${total}`;
    const mensajeCodificado = encodeURIComponent(mensaje);
    const numero = "3516228749"; // Número de iFratelli
    const url = `https://wa.me/${numero}?text=${mensajeCodificado}`;
    window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", function () {
    const submenu = document.querySelector(".submenu > button");

    submenu.addEventListener("click", function (e) {
        // Previene que el enlace se active directamente
        e.preventDefault();
        
        // Alterna la visibilidad del submenú
        const lista = this.nextElementSibling;
        if (lista.style.display === "block") {
            lista.style.display = "none";
        } else {
            lista.style.display = "block";
        }
    });
});
function filtrarProductos(categoria) {
    const todosLosProductos = document.querySelectorAll(".producto");

    todosLosProductos.forEach(producto => {
        if (categoria === "todos") {
            producto.style.display = "block";
        } else {
            const divInterno = producto.querySelector("div");
            const productoCategoria = divInterno.getAttribute("data-categoria");

            if (productoCategoria === categoria) {
                producto.style.display = "block";
            } else {
                producto.style.display = "none";
            }
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
  const iconoMenu = document.getElementById("menu");
  const menu = document.getElementById("menu-principal");

  iconoMenu.addEventListener("click", function () {
    menu.classList.toggle("oculto");
  });
});

const params = new URLSearchParams(window.location.search);

// Verifica si existe el parámetro 'producto'
if (params.has('q')) {
    const producto = params.get('q');
    console.log("El producto es:", producto);
    filtrarProductos(producto)

    // Podés hacer algo con ese dato, como mostrarlo
   // document.getElementById("resultado").textContent = `Producto seleccionado: ${producto}`;
}