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
    if (window.location.pathname.includes("Pedido.html")) {
        mostrarPedido();
    }
});
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
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
    const numero = "3516228749"; 
    const url = `https://wa.me/${numero}?text=${mensajeCodificado}`;
    window.open(url, "_blank");
}
document.addEventListener("DOMContentLoaded", function () {
    const submenu = document.querySelector(".submenu > button");
    submenu.addEventListener("click", function (e) {
        e.preventDefault();
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
              if(producto.style && producto.style.display != "flex") {
                producto.style.display = "flex";
              } 
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
if (params.has('q')) {
    const producto = params.get('q');
    console.log("El producto es:", producto);
    filtrarProductos(producto)
}
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('q');
    if (categoria) {
        filtrarProductos(categoria);
    }
});
window.addEventListener("DOMContentLoaded", function () {
    const prev = sessionStorage.getItem("paginaActual");
    if (prev !== window.location.href) {
        sessionStorage.setItem("paginaAnterior", prev);
        sessionStorage.setItem("paginaActual", window.location.href);
    }
});
function volverAtras() {
    const anterior = sessionStorage.getItem("paginaAnterior");
    if (anterior) {
        window.location.href = anterior;
    } else {
        window.location.href = "index.html"; 
    }
}
