// script.js

document.addEventListener("DOMContentLoaded", () => {
  // ================================
  // 1. DATOS DE TELAS (solo los campos requeridos)
  // ================================
  const telas = [
    { nombre: 'Algodón', tipo: 'algodon', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREzysF-SGpFsCoeAtJjG5jzwzPiLS767dN8w&s' },
    { nombre: 'Lino', tipo: 'lino', imagen: 'https://revuelta.pe/cdn/shop/products/Lino-DMC.jpg?v=1712761380&width=1445' },
    { nombre: 'Mezclilla', tipo: 'mezclilla', imagen: 'https://www.hitega.cl/blog/wp-content/uploads/2021/02/telas-de-mezclilla.jpg' },
    { nombre: 'Seda', tipo: 'seda', imagen: 'https://m.media-amazon.com/images/I/714XhlWf3nL.jpg' },
    { nombre: 'Franela', tipo: 'franela', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMzJyQnh85FsLLpfFU-TJ1N4yTlfg4GEDzOw&s' }
  ];

  // ================================
  // 2. DATOS DE COLORES (solo nombre y valor en CSS)
  // ================================
  const colores = [
    { nombre: 'Rojo', valor: 'rojo' },
    { nombre: 'Azul', valor: 'azul' },
    { nombre: 'Negro', valor: 'negro' },
    { nombre: 'Blanco', valor: 'blanco' },
    { nombre: 'Verde', valor: 'verde' }
  ];

  // ================================
  // 3. RENDERIZAR SECCIÓN TELAS (solo TIPOS)
  // ================================
  const listaTelas = document.getElementById("listaTelas");
  const filtroTelas = document.getElementById("filtroTelas");

  function renderTipos(filtroTexto = "") {
    listaTelas.innerHTML = "";

    // Filtrar por tipo o nombre de tela
    const filtrados = telas.filter(tela =>
      tela.tipo.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      tela.nombre.toLowerCase().includes(filtroTexto.toLowerCase())
    );

    if (filtrados.length === 0) {
      listaTelas.innerHTML = `<p class="sin-resultados">No se encontraron tipos de tela que coincidan.</p>`;
      return;
    }

    // Crear tarjeta por cada tipo filtrado
    filtrados.forEach(tela => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <p>${tela.nombre}</p>
        <small>Tipo de tela</small>
      `;
      // Al hacer clic, seleccionar esta tela
      div.addEventListener("click", () => {
        seleccionarTela(tela);
      });
      listaTelas.appendChild(div);
    });
  }

  filtroTelas.addEventListener("input", () => {
    renderTipos(filtroTelas.value);
  });

  // Render inicial de TIPOS
  renderTipos();

  // ================================
  // 4. RENDERIZAR SECCIÓN COLORES
  // ================================
  const listaColores = document.getElementById("listaColores");
  const filtroColores = document.getElementById("filtroColores");

  function renderColores(filtroTexto = "") {
    listaColores.innerHTML = "";

    const filtrados = colores.filter(c =>
      c.nombre.toLowerCase().includes(filtroTexto.toLowerCase())
    );

    if (filtrados.length === 0) {
      listaColores.innerHTML = `<p class="sin-resultados">No se encontraron colores que coincidan.</p>`;
      return;
    }

    filtrados.forEach(color => {
      const div = document.createElement("div");
      const claseExtra = color.valor === "blanco" ? "blanco" : "";
      div.className = `card color-card ${claseExtra}`;
      div.style.backgroundColor = color.valor;
      div.innerHTML = `
        <p>${color.nombre}</p>
        <small>Color</small>
      `;
      // Al hacer clic, seleccionar este color
      div.addEventListener("click", () => {
        seleccionarColor(color);
      });
      listaColores.appendChild(div);
    });
  }

  filtroColores.addEventListener("input", () => {
    renderColores(filtroColores.value);
  });

  // Render inicial de COLORES
  renderColores();

  // ================================
  // 5. FUNCIONES DE SELECCIÓN Y ACTUALIZAR SECCIÓN
  // ================================
  let seleccionActual = {
    tela: null,
    color: null
  };

  const nombreTelaElem = document.getElementById("nombreTela");
  const imagenTelaElem = document.getElementById("imagenTela");
  const nombreColorElem = document.getElementById("nombreColor");
  const muestraColorElem = document.getElementById("muestraColor");

  function seleccionarTela(tela) {
    seleccionActual.tela = tela;
    actualizarSeleccion();
  }

  function seleccionarColor(color) {
    seleccionActual.color = color;
    actualizarSeleccion();
  }

  function actualizarSeleccion() {
    // Actualizar sección de tela
    if (seleccionActual.tela) {
      nombreTelaElem.textContent = seleccionActual.tela.nombre;
      imagenTelaElem.src = seleccionActual.tela.imagen;
      imagenTelaElem.alt = seleccionActual.tela.nombre;
      imagenTelaElem.style.display = "block";
    } else {
      nombreTelaElem.textContent = "Ninguna tela seleccionada";
      imagenTelaElem.style.display = "none";
    }

    // Actualizar sección de color
    if (seleccionActual.color) {
      nombreColorElem.textContent = seleccionActual.color.nombre;
      muestraColorElem.style.backgroundColor = seleccionActual.color.valor;
      muestraColorElem.style.display = "block";
    } else {
      nombreColorElem.textContent = "Ningún color seleccionado";
      muestraColorElem.style.display = "none";
    }
  }

  // ================================
  // 6. RENDERIZAR CATÁLOGO DE DISEÑOS
  // ================================
  const catalogo = [
    { nombre: "Vestido Floral", categoria: "vestido", img: "https://via.placeholder.com/200x200?text=Vestido+Floral" },
    { nombre: "Vestido Elegante", categoria: "vestido", img: "https://via.placeholder.com/200x200?text=Vestido+Elegante" },
    { nombre: "Camisa Casual", categoria: "camisa", img: "https://via.placeholder.com/200x200?text=Camisa+Casual" },
    { nombre: "Camisa Formal", categoria: "camisa", img: "https://via.placeholder.com/200x200?text=Camisa+Formal" },
    { nombre: "Falda Plisada", categoria: "falda", img: "https://via.placeholder.com/200x200?text=Falda+Plisada" },
    { nombre: "Falda Denim", categoria: "falda", img: "https://via.placeholder.com/200x200?text=Falda+Denim" }
  ];

  const catalogoContainer = document.getElementById("catalogoContainer");
  const filtroCategoria = document.getElementById("filtroCategoria");

  function renderCatalogo(categoriaSeleccionada = "todas") {
    catalogoContainer.innerHTML = "";

    const filtrados = (categoriaSeleccionada === "todas")
      ? catalogo
      : catalogo.filter(item => item.categoria === categoriaSeleccionada);

    if (filtrados.length === 0) {
      catalogoContainer.innerHTML = `<p class="sin-resultados">No se encontraron diseños en esta categoría.</p>`;
      return;
    }

    filtrados.forEach(item => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <img src="${item.img}" alt="${item.nombre}" />
        <p>${item.nombre}</p>
        <small>Categoría: ${item.categoria.charAt(0).toUpperCase() + item.categoria.slice(1)}</small>
      `;
      catalogoContainer.appendChild(div);
    });
  }

  filtroCategoria.addEventListener("change", () => {
    renderCatalogo(filtroCategoria.value);
  });

  // Render inicial de Catálogo
  renderCatalogo();
});


