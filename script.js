document.addEventListener("DOMContentLoaded", function () {
  const filtro = document.getElementById("filtroTelas");
  const lista = document.getElementById("listaTelas");

  const telas = {
    algodon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREzysF-SGpFsCoeAtJjG5jzwzPiLS767dN8w&s",
    lino: "'https://revuelta.pe/cdn/shop/products/Lino-DMC.jpg?v=1712761380&width=1445",
    mezclilla: "https://www.hitega.cl/blog/wp-content/uploads/2021/02/telas-de-mezclilla.jpg",
    seda: "https://m.media-amazon.com/images/I/714XhlWf3nL.jpg",
    franela:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMzJyQnh85FsLLpfFU-TJ1N4yTlfg4GEDzOw&s",
  };

  function mostrarTelas(tipo) {
    lista.innerHTML = "";
    for (let clave in telas) {
      if (tipo === "todas" || clave === tipo) {
        const img = document.createElement("img");
        img.src = telas[clave];
        img.alt = clave;
        lista.appendChild(img);
      }
    }
  }

  filtro.addEventListener("change", () => {
    mostrarTelas(filtro.value);
  });

  mostrarTelas("todas");

  // Catálogo básico
  const catalogo = document.getElementById("catalogoContainer");
  ["Vestido", "Camisa", "Falda"].forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `<img src="https://via.placeholder.com/200x200?text=${item}" alt="${item}"><p>${item}</p>`;
    catalogo.appendChild(div);
  });
});

// Mostrar/Ocultar formulario
function toggleFormulario() {
  const form = document.getElementById("formulario");
  form.classList.toggle("mostrar");
}

