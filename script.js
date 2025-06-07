document.addEventListener("DOMContentLoaded", () => {
  // ================================
  // 1. DATOS DE TELAS (con precio aproximado por metro)
  // ================================
  const telas = [
    {
      nombre: 'Algodón',
      tipo: 'algodon',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREzysF-SGpFsCoeAtJjG5jzwzPiLS767dN8w&s',
      precio: 30 // soles por metro aprox.
    },
    {
      nombre: 'Lino',
      tipo: 'lino',
      imagen: 'https://revuelta.pe/cdn/shop/products/Lino-DMC.jpg?v=1712761380&width=1445',
      precio: 50
    },
    {
      nombre: 'Mezclilla',
      tipo: 'mezclilla',
      imagen: 'https://www.hitega.cl/blog/wp-content/uploads/2021/02/telas-de-mezclilla.jpg',
      precio: 40
    },
    {
      nombre: 'Seda',
      tipo: 'seda',
      imagen: 'https://m.media-amazon.com/images/I/714XhlWf3nL.jpg',
      precio: 100
    },
    {
      nombre: 'Franela',
      tipo: 'franela',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMzJyQnh85FsLLpfFU-TJ1N4yTlfg4GEDzOw&s',
      precio: 35
    }
  ];

  // ================================
  // 2. DATOS DE COLORES (18 colores comunes en hex)
  // ================================
  const colores = [
    { nombre: 'Rojo',        valor: 'rojo',        hex: '#FF0000' },
    { nombre: 'Azul',        valor: 'azul',        hex: '#0000FF' },
    { nombre: 'Negro',       valor: 'negro',       hex: '#000000' },
    { nombre: 'Blanco',      valor: 'blanco',      hex: '#FFFFFF' },
    { nombre: 'Verde',       valor: 'verde',       hex: '#008000' },
    { nombre: 'Camel',       valor: 'camel',       hex: '#C19A6B' },
    { nombre: 'Beige',       valor: 'beige',       hex: '#F5F5DC' },
    { nombre: 'Marrón',      valor: 'marron',      hex: '#A52A2A' },
    { nombre: 'Gris',        valor: 'gris',        hex: '#808080' },
    { nombre: 'Azul Marino', valor: 'azul_marino', hex: '#000080' },
    { nombre: 'Bordó',       valor: 'bordo',       hex: '#800020' },
    { nombre: 'Azul Claro',  valor: 'azul_claro',  hex: '#ADD8E6' },
    { nombre: 'Rosa',        valor: 'rosa',        hex: '#FFC0CB' },
    { nombre: 'Amarillo',    valor: 'amarillo',    hex: '#FFFF00' },
    { nombre: 'Naranja',     valor: 'naranja',     hex: '#FFA500' },
    { nombre: 'Celeste',     valor: 'celeste',     hex: '#87CEEB' },
    { nombre: 'Morado',      valor: 'morado',      hex: '#800080' },
    { nombre: 'Turquesa',    valor: 'turquesa',    hex: '#40E0D0' }
  ];

  // ================================
  // 3. RENDERIZAR SECCIÓN TELAS (con nombre, imagen y precio)
  // ================================
  const listaTelas = document.getElementById("listaTelas");
  const filtroTelas = document.getElementById("filtroTelas");

  function renderTipos(filtroTexto = "") {
    listaTelas.innerHTML = "";

    const filtrados = telas.filter(tela =>
      tela.tipo.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      tela.nombre.toLowerCase().includes(filtroTexto.toLowerCase())
    );

    if (filtrados.length === 0) {
      listaTelas.innerHTML = `<p class="sin-resultados">No se encontraron tipos de tela que coincidan.</p>`;
      return;
    }

    filtrados.forEach(tela => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <img src="${tela.imagen}" alt="${tela.nombre}" />
        <p>${tela.nombre}</p>
        <small>Precio aprox.: ${tela.precio} S/ por metro</small>
      `;
      div.addEventListener("click", () => {
        seleccionarTela(tela);
      });
      listaTelas.appendChild(div);
    });
  }

  filtroTelas.addEventListener("input", () => {
    renderTipos(filtroTelas.value);
  });

  renderTipos(); // Render inicial

  // ================================
  // 4. RENDERIZAR SECCIÓN COLORES (paleta de swatches)
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
      const swatch = document.createElement("div");
      swatch.className = "color-swatch";
      swatch.title = color.nombre;
      swatch.style.backgroundColor = color.hex;
      swatch.addEventListener("click", () => {
        seleccionarColor(color);
      });
      listaColores.appendChild(swatch);
    });
  }

  filtroColores.addEventListener("input", () => {
    renderColores(filtroColores.value);
  });

  renderColores(); // Render inicial

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
  const contenedorColorSeleccionado = document.getElementById("muestraColorSeleccionado");

  function seleccionarTela(tela) {
    seleccionActual.tela = tela;
    actualizarSeleccion();
  }

  function seleccionarColor(color) {
    seleccionActual.color = color;
    actualizarSeleccion();
  }

  function actualizarSeleccion() {
    // ==== Sección Tela ====
    if (seleccionActual.tela) {
      nombreTelaElem.textContent = seleccionActual.tela.nombre;
      imagenTelaElem.src = seleccionActual.tela.imagen;
      imagenTelaElem.alt = seleccionActual.tela.nombre;
      imagenTelaElem.style.display = "block";
    } else {
      nombreTelaElem.textContent = "Ninguna tela seleccionada";
      imagenTelaElem.style.display = "none";
    }

    // ==== Sección Color ====
    if (seleccionActual.color) {
      nombreColorElem.textContent = seleccionActual.color.nombre;
      contenedorColorSeleccionado.style.backgroundColor = seleccionActual.color.hex;
      contenedorColorSeleccionado.style.display = "block";
    } else {
      nombreColorElem.textContent = "Ningún color seleccionado";
      contenedorColorSeleccionado.style.display = "none";
    }
  }

  // ================================
  // 6. RENDERIZAR CATÁLOGO DE DISEÑOS (nuevas categorías y precios)
  // ================================
  const catalogo = [
    {
      nombre: "Vestido Floral",
      categoria: "vestido",
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz268yQSi2GNA4O_kb0PbkRFgYKMqhWjVVVA&s',
      precio: 120
    },
    {
      nombre: "Vestido Elegante",
      categoria: "vestido",
      img: 'https://img.kwcdn.com/product/fancy/f72115f5-8241-4ff7-8ba5-c46a050ec9ab.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp',
      precio: 150
    },
    {
      nombre: "Camisa Casual",
      categoria: "camisa",
      img: "https://www.gap.com.pe/media/catalog/product/7/9/796264_gp00_1.jpg",
      precio: 80
    },
    {
      nombre: "Camisa Formal",
      categoria: "camisa",
      img: "https://sc04.alicdn.com/kf/H7d1d87b25ec94cce8cce62e52160c797h/252455369/H7d1d87b25ec94cce8cce62e52160c797h.jpg",
      precio: 100
    },
    {
      nombre: "Falda Plisada",
      categoria: "falda",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyg9EVTU57naiPZDxO8j9JwPalE4NIQfKwDw&s",
      precio: 70
    },
    {
      nombre: "Falda Denim",
      categoria: "falda",
      img: "https://home.ripley.com.pe/Attachment/WOP_5/2015328374717/2015328374717_2.jpg",
      precio: 90
    },
    {
      nombre: "Abrigo Clásico",
      categoria: "abrigo",
      img: "https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/2658/PMP00003052740/full_image-1.jpeg",
      precio: 250
    },
    {
      nombre: "Saco Deportivo",
      categoria: "saco",
      img: "https://oechsle.vteximg.com.br/arquivos/ids/20487278-800-800/2810672.jpg?v=638749389586430000",
      precio: 180
    },
    {
      nombre: "Blazer Elegante",
      categoria: "blazer",
      img: "https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/3467/PMP20000581150/full_image-2.jpeg",
      precio: 200
    },
    {
      nombre: "Terno Clásico",
      categoria: "terno",
      img: "https://d1fufvy4xao6k9.cloudfront.net/images/blog/posts/2024/03/screenshot_4.jpg",
      precio: 300
    }
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
        <small>Precio aprox.: ${item.precio} S/</small>
      `;
      catalogoContainer.appendChild(div);
    });
  }

  filtroCategoria.addEventListener("change", () => {
    renderCatalogo(filtroCategoria.value);
  });

  renderCatalogo(); // Render inicial

  // ================================
  // 7. FORMULARIO EMBEBIDO + “PEDIDO LISTO” + FECHA 5 DÍAS HÁBILES
  // ================================
  const openFormBtn = document.getElementById("openFormBtn");
  const formContainer = document.getElementById("formContainer");

  function sumarDiasHabiles(fechaInicial, diasHabiles) {
    const resultado = new Date(fechaInicial);
    let contador = 0;
    while (contador < diasHabiles) {
      resultado.setDate(resultado.getDate() + 1);
      if (resultado.getDay() !== 0 && resultado.getDay() !== 6) {
        contador++;
      }
    }
    return resultado;
  }

  function formatearFecha(fecha) {
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  openFormBtn.addEventListener("click", () => {
    openFormBtn.style.display = "none";
    formContainer.style.display = "block";

    // Reemplaza TU_FORM_ID por el ID real de tu Google Form
    const formularioEmbedUrl = "https://docs.google.com/forms/d/e/TU_FORM_ID/viewform?embedded=true";
    const hoy = new Date();
    const fechaAProbar = sumarDiasHabiles(hoy, 5);
    const fechaFormateada = formatearFecha(fechaAProbar);

    formContainer.innerHTML = `
      <iframe src="${formularioEmbedUrl}" width="100%" height="800" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
      <p id="pedidoMensaje" style="text-align:center; margin-top:1rem; font-weight:bold; color:#5a3d84;">
        Pedido listo. Podrás probar tu diseño a partir del día <strong>${fechaFormateada}</strong>.
      </p>
    `;
  });
});
