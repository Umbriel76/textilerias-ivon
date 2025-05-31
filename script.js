document.addEventListener("DOMContentLoaded", function () {
  const telas = [
    { nombre: "Algodón Rojo", tipo: "algodon", color: "rojo" },
    { nombre: "Lino Azul", tipo: "lino", color: "azul" },
    { nombre: "Mezclilla Negra", tipo: "mezclilla", color: "negro" },
    { nombre: "Seda Blanca", tipo: "seda", color: "blanco" }
  ];

  const lista = document.getElementById("listaTelas");
  const filtro = document.getElementById("filtroColores");

  function renderTelas(filtroTexto = "") {
    lista.innerHTML = "";
    const filtradas = telas.filter(tela =>
      tela.nombre.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      tela.tipo.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      tela.color.toLowerCase().includes(filtroTexto.toLowerCase())
    );

    filtradas.forEach(tela => {
      const div = document.createElement("div");
      div.innerHTML = `
        <img src="https://via.placeholder.com/200x150?text=${encodeURIComponent(tela.nombre)}" alt="${tela.nombre}" />
        <p>${tela.nombre}</p>
      `;
      lista.appendChild(div);
    });
  }

  filtro.addEventListener("input", () => {
    renderTelas(filtro.value);
  });

  renderTelas(); // inicial
});

