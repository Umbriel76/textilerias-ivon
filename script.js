// script.js

document.addEventListener("DOMContentLoaded", () => {
  // ================================
  // 1. DATOS DE TELAS (completa lista)
  // ================================
  const telas = [
    { nombre: "Algodón Rojo", tipo: "algodón", color: "rojo", img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREzysF-SGpFsCoeAtJjG5jzwzPiLS767dN8w&s' },
    { nombre: "Lino Azul", tipo: "lino", color: "azul", img: 'https://revuelta.pe/cdn/shop/products/Lino-DMC.jpg?v=1712761380&width=1445' },
    { nombre: "Mezclilla Negra", tipo: "mezclilla", color: "negro", img: 'https://www.hitega.cl/blog/wp-content/uploads/2021/02/telas-de-mezclilla.jpg' },
    { nombre: "Seda Blanca", tipo: "seda", color: "blanco", img: 'https://m.media-amazon.com/images/I/714XhlWf3nL.jpg' },
    { nombre: "Franela Verde", tipo: "franela", color: "verde", img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMzJyQnh85FsLLpfFU-TJ1N4yTlfg4GEDzOw&s' }
  ];

  // ================================
  // 2. RENDERIZAR SECCIÓN TELAS
  // ================================
  const listaTelas = document.getElementById("listaTelas");
  const filtroTelas = document.getElementById("filtroTelas");

  function renderTelas(filtroTexto = "") {
    listaTelas.innerHTML = "";

    // Filtrar por nombre o tipo
    const filtradas = telas.filter(tela =>
      tela.nombre.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      tela.tipo.toLowerCase().includes(filtroTexto.toLowerCase())
    );

    if (filtradas.length === 0) {
      listaTelas.innerHTML = `<p class="sin-resultados">No se encontraron telas que coincidan.</p>`;
      return;
    }

    filtradas.forEach(tela => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <img src="${tela.img}" alt="${tela.nombre}" />
        <p>${tela.nombre}</p>
        <small>Tipo: ${tela.tipo}</small>
      `;
      listaTelas.appendChild(div);
    });
  }

  filtroTelas.addEventListener("input", () => {
    renderTelas(filtroTelas.value);
  });

  // Render inicial de TELAS (sin filtro)
  renderTelas();

  // ================================
  // 3. RENDERIZAR SECCIÓN COLORES
  // ================================
  const listaColores = document.getElementById("listaColores");
  const filtroColores = document.getElementById("filtroColores");

  // Obtener todos los colores únicos del array de telas
  const coloresUnicos = [...new Set(telas.map(t => t.color))];

  function renderColores(filtroColor = "") {
    listaColores.innerHTML = "";

    // Filtrar la lista de colores según el texto ingresado
    const filtrados = coloresUnicos.filter(c =>
      c.toLowerCase().includes(filtroColor.toLowerCase())
    );

    if (filtrados.length === 0) {
      listaColores.innerHTML = `<p class="sin-resultados">No se encontraron colores que coincidan.</p>`;
      return;
    }

    // Por cada color, mostrar una tarjeta con un ejemplo de tela de ese color
    filtrados.forEach(color => {
      // Buscar la primera tela que tenga ese color (para mostrar imagen de referencia)
      const telaReferencia = telas.find(t => t.color === color);

      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <img src="${telaReferencia.img}" alt="Ejemplo de color ${color}" />
        <p>${color.charAt(0).toUpperCase() + color.slice(1)}</p>
        <small>Color</small>
      `;
      listaColores.appendChild(div);
    });
  }

  filtroColores.addEventListener("input", () => {
    renderColores(filtroColores.value);
  });

  // Render inicial de COLORES (sin filtro)
  renderColores();

  // ================================
  // 4. RENDERIZAR CATÁLOGO DE DISEÑOS
  // ================================
  const catalogo = [
    { nombre: "Vestido Floral", categoria: "vestido", img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz268yQSi2GNA4O_kb0PbkRFgYKMqhWjVVVA&s' },
    { nombre: "Vestido Elegante", categoria: "vestido", img: 'https://img.kwcdn.com/product/fancy/f72115f5-8241-4ff7-8ba5-c46a050ec9ab.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp' },
    { nombre: "Camisa Casual", categoria: "camisa", img: "https://www.gap.com.pe/media/catalog/product/7/9/796264_gp00_1.jpg" },
    { nombre: "Camisa Formal", categoria: "camisa", img: "https://sc04.alicdn.com/kf/H7d1d87b25ec94cce8cce62e52160c797h/252455369/H7d1d87b25ec94cce8cce62e52160c797h.jpg" },
    { nombre: "Falda Plisada", categoria: "falda", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyg9EVTU57naiPZDxO8j9JwPalE4NIQfKwDw&s" },
    { nombre: "Falda Denim", categoria: "falda", img: "https://home.ripley.com.pe/Attachment/WOP_5/2015328374717/2015328374717_2.jpg" }
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

