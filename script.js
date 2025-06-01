document.addEventListener("DOMContentLoaded", () => {
  // ================================
  // 1. DATOS DE TELAS (solo los campos requeridos)
  // ================================
  const telas = [
    {
      nombre: 'Algodón',
      tipo: 'algodon',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREzysF-SGpFsCoeAtJjG5jzwzPiLS767dN8w&s'
    },
    {
      nombre: 'Lino',
      tipo: 'lino',
      imagen: 'https://revuelta.pe/cdn/shop/products/Lino-DMC.jpg?v=1712761380&width=1445'
    },
    {
      nombre: 'Mezclilla',
      tipo: 'mezclilla',
      imagen: 'https://www.hitega.cl/blog/wp-content/uploads/2021/02/telas-de-mezclilla.jpg'
    },
    {
      nombre: 'Seda',
      tipo: 'seda',
      imagen: 'https://m.media-amazon.com/images/I/714XhlWf3nL.jpg'
    },
    {
      nombre: 'Franela',
      tipo: 'franela',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMzJyQnh85FsLLpfFU-TJ1N4yTlfg4GEDzOw&s'
    }
  ];

  // ================================
  // 2. DATOS DE COLORES (ahora con campo "imagen" usando data URIs)
  // ================================
  // Ejemplo de data URI para cuadro rojo 100x100 px:
  // data:image/svg+xml,
  // <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  //   <rect width="100" height="100" fill="red"/>
  // </svg>
  //
  // Lo mismo para otros colores: cambiamos el fill.
  const colores = [
    {
      nombre: 'Rojo',
      valor: 'rojo',
      // Data URI para SVG cuadrado rojo
      imagen: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22red%22%20/%3E%3C/svg%3E'
    },
    {
      nombre: 'Azul',
      valor: 'azul',
      // Data URI para SVG cuadrado azul
      imagen: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22blue%22%20/%3E%3C/svg%3E'
    },
    {
      nombre: 'Negro',
      valor: 'negro',
      // Data URI para SVG cuadrado negro
      imagen: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22black%22%20/%3E%3C/svg%3E'
    },
    {
      nombre: 'Blanco',
      valor: 'blanco',
      // Data URI para SVG cuadrado blanco con borde gris
      imagen: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22white%22%20stroke%3D%22%23ccc%22%20stroke-width%3D%222%22%20/%3E%3C/svg%3E'
    },
    {
      nombre: 'Verde',
      valor: 'verde',
      // Data URI para SVG cuadrado verde
      imagen: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22green%22%20/%3E%3C/svg%3E'
    }
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
        <img src="${tela.imagen}" alt="${tela.nombre}" style="border-radius:8px; max-width:100%; height:auto;" />
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
  // 4. RENDERIZAR SECCIÓN COLORES (ahora con <img> en lugar de fondo CSS)
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
      div.className = "card";
      div.innerHTML = `
        <!-- Mostramos el data URI como imagen/ejemplo -->
        <img src="${color.imagen}" alt="${color.nombre}" style="width:100px; height:100px; border-radius:8px; margin-bottom:0.5rem;" />
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
  const imagenColorElem = document.getElementById("imagenColor");

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
      imagenColorElem.src = seleccionActual.color.imagen;
      imagenColorElem.alt = seleccionActual.color.nombre;
      imagenColorElem.style.display = "block";
    } else {
      nombreColorElem.textContent = "Ningún color seleccionado";
      imagenColorElem.style.display = "none";
    }
  }

  // ================================
  // 6. RENDERIZAR CATÁLOGO DE DISEÑOS
  // ================================
  const catalogo = [
    {
      nombre: "Vestido Floral",
      categoria: "vestido",
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz268yQSi2GNA4O_kb0PbkRFgYKMqhWjVVVA&s'
    },
    {
      nombre: "Vestido Elegante",
      categoria: "vestido",
      img: 'https://img.kwcdn.com/product/fancy/f72115f5-8241-4ff7-8ba5-c46a050ec9ab.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp'
    },
    {
      nombre: "Camisa Casual",
      categoria: "camisa",
      img: "https://www.gap.com.pe/media/catalog/product/7/9/796264_gp00_1.jpg"
    },
    {
      nombre: "Camisa Formal",
      categoria: "camisa",
      img: "https://sc04.alicdn.com/kf/H7d1d87b25ec94cce8cce62e52160c797h/252455369/H7d1d87b25ec94cce8cce62e52160c797h.jpg"
    },
    {
      nombre: "Falda Plisada",
      categoria: "falda",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyg9EVTU57naiPZDxO8j9JwPalE4NIQfKwDw&s"
    },
    {
      nombre: "Falda Denim",
      categoria: "falda",
      img: "https://home.ripley.com.pe/Attachment/WOP_5/2015328374717/2015328374717_2.jpg"
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

  // ================================
  // 7. FORMULARIO EMBEBIDO + “PEDIDO LISTO” + FECHA 5 DÍAS HÁBILES
  // ================================
  const openFormBtn = document.getElementById("openFormBtn");
  const formContainer = document.getElementById("formContainer");

  // Función para sumar 5 días hábiles a la fecha actual
  function sumarDiasHabiles(fechaInicial, diasHabiles) {
    const resultado = new Date(fechaInicial);
    let contador = 0;
    while (contador < diasHabiles) {
      resultado.setDate(resultado.getDate() + 1);
      // Si no es sábado (6) ni domingo (0), cuenta como día hábil
      if (resultado.getDay() !== 0 && resultado.getDay() !== 6) {
        contador++;
      }
    }
    return resultado;
  }

  // Formatear fecha a DD/MM/YYYY
  function formatearFecha(fecha) {
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  openFormBtn.addEventListener("click", () => {
    // Ocultar el botón y mostrar el contenedor
    openFormBtn.style.display = "none";
    formContainer.style.display = "block";

    // ID de tu formulario (ajusta esta URL al ID real de tu Google Form)
    // Para insertar un Formulario de Google en modo “embed”, la URL tiene este formato:
    // https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true
    const formularioEmbedUrl = "https://docs.google.com/forms/d/e/tu-form-id/viewform?embedded=true";

    // Calculamos fecha de 5 días hábiles desde hoy
    const hoy = new Date();
    const fechaAProbar = sumarDiasHabiles(hoy, 5);
    const fechaFormateada = formatearFecha(fechaAProbar);

    // Construimos el contenido del iframe + mensaje
    formContainer.innerHTML = `
      <iframe src="${formularioEmbedUrl}" width="100%" height="800" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
      <p id="pedidoMensaje" style="text-align:center; margin-top:1rem; font-weight:bold; color:#5a3d84;">
        Pedido listo. Podrás probar tu diseño a partir del día <strong>${fechaFormateada}</strong>.
      </p>
    `;
  });
});



