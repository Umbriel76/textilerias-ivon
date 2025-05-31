document.addEventListener("DOMContentLoaded", () => {
  const filtro = document.getElementById("filtroTipo");
  const galeria = document.getElementById("galeriaTelas");

  const telas = {
    algodon: "https://via.placeholder.com/200x200?text=Algodón",
    lino: "https://via.placeholder.com/200x200?text=Lino",
    mezclilla: "https://via.placeholder.com/200x200?text=Mezclilla",
    seda: "https://via.placeholder.com/200x200?text=Seda",
  };

  function mostrarTelas(tipo) {
    galeria.innerHTML = "";
    for (const key in telas) {
      if (tipo === "todas" || tipo === key) {
        const img = document.createElement("img");
        img.src = telas[key];
        img.alt = key;
        galeria.appendChild(img);
      }
    }
  }

  filtro.addEventListener("change", () => {
    mostrarTelas(filtro.value);
  });

  mostrarTelas("todas");
});


