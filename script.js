document.addEventListener("DOMContentLoaded", function () {
  const telas = [
    { nombre: 'Algodón', tipo: 'algodon', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREzysF-SGpFsCoeAtJjG5jzwzPiLS767dN8w&s' },
    { nombre: 'Lino', tipo: 'lino', imagen: 'https://revuelta.pe/cdn/shop/products/Lino-DMC.jpg?v=1712761380&width=1445' },
    { nombre: 'Mezclilla', tipo: 'mezclilla', imagen: 'https://www.hitega.cl/blog/wp-content/uploads/2021/02/telas-de-mezclilla.jpg' },
    { nombre: 'Seda', tipo: 'seda', imagen: 'https://m.media-amazon.com/images/I/714XhlWf3nL.jpg' },
    { nombre: 'Franela', tipo: 'franela', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMzJyQnh85FsLLpfFU-TJ1N4yTlfg4GEDzOw&s' }
  ];

  const contenedor = document.getElementById('listaTelas');
  const filtroTexto = document.getElementById('filtroTelas');

  // Crear el filtro desplegable
  const filtroLabel = document.createElement("label");
  filtroLabel.textContent = "Filtrar por tipo: ";
  filtroLabel.style.fontWeight = "bold";
  filtroLabel.style.marginRight = "10px";

  const filtroTipo = document.createElement("select");
  filtroTipo.innerHTML = `
    <option value="todas">Todas</option>
    <option value="algodon">Algodón</option>
    <option value="lino">Lino</option>
    <option value="mezclilla">Mezclilla</option>
    <option value="seda">Seda</option>
    <option value="franela">Franela</option>
  `;
  filtroTipo.style.marginBottom = "1rem";

  const sectionTelas = document.getElementById('telas');
  sectionTelas.insertBefore(filtroLabel, contenedor);
  sectionTelas.insertBefore(filtroTipo, contenedor);

  function mostrarTelas(lista) {
    contenedor.innerHTML = '';
    lista.forEach(tela => {
      const div = document.createElement('div');
      div.classList.add('tela-item');
      div.innerHTML = `
        <img src="${tela.imagen}" alt="${tela.nombre}" style="width:150px;height:150px;border-radius:10px;">
        <p>${tela.nombre}</p>
      `;
      contenedor.appendChild(div);
    });
  }

  function aplicarFiltros() {
    const texto = filtroTexto.value.toLowerCase();
    const tipo = filtroTipo.value;

    const filtradas = telas.filter(tela => {
      const coincideTexto = tela.nombre.toLowerCase().includes(texto);
      const coincideTipo = tipo === 'todas' || tela.tipo === tipo;
      return coincideTexto && coincideTipo;
    });

    mostrarTelas(filtradas);
  }

  filtroTexto.addEventListener('input', aplicarFiltros);
  filtroTipo.addEventListener('change', aplicarFiltros);

  // Mostrar todas las telas al cargar
  mostrarTelas(telas);
});

