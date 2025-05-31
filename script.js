document.addEventListener("DOMContentLoaded", function () {
  const filtro = document.getElementById("filtroTelas");
  const lista = document.getElementById("listaTelas");

  const telas = {
    algodon: "https://via.placeholder.com/300x200?text=Algodón",
    lino: "https://via.placeholder.com/300x200?text=Lino",
    mezclilla: "https://via.placeholder.com/300x200?text=Mezclilla",
    seda: "https://via.placeholder.com/300x200?text=Seda",
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

