// Variables globales para almacenar datos
let datos = {
    sesionActiva: false,
    usuarioActual: '',
    usuariosRegistrados: [
        { correo: 'admin', contrasena: '1234', nombre: 'Administrador' }
    ],
    dueños: [],
    mascotas: [],
    servicios: [],
    carrito: []
};

// Catálogo de productos con información de imágenes diversificada - RUTAS LOCALES
const catalogo = [
    { 
        id: 1, 
        nombre: "Baño Completo para Perros", 
        precio: 25.00, 
        descripcion: "Baño con shampoo especial para perros",
        imagen: "imagenes/perros/perro-bano.jpg",
        categoria: "servicios"
    },
    { 
        id: 2, 
        nombre: "Baño Completo para Gatos", 
        precio: 20.00, 
        descripcion: "Baño especial para gatos con productos hipoalergénicos",
        imagen: "imagenes/gatos/gato-bano.jpg",
        categoria: "servicios"
    },
    { 
        id: 3, 
        nombre: "Corte de Pelo Estilizado", 
        precio: 30.00, 
        descripcion: "Corte profesional según raza y estilo",
        imagen: "imagenes/perros/perro-corte.jpg",
        categoria: "servicios"
    },
    { 
        id: 4, 
        nombre: "Spa Premium Completo", 
        precio: 60.00, 
        descripcion: "Baño, corte, masaje relajante y aromaterapia",
        imagen: "imagenes/perros/perro-spa.jpg",
        categoria: "servicios"
    },
    { 
        id: 5, 
        nombre: "Comida Premium 5kg", 
        precio: 20.00, 
        descripcion: "Alimento balanceado para razas medianas",
        imagen: "imagenes/productos/comida-premium.jpg",
        categoria: "productos"
    },
    { 
        id: 6, 
        nombre: "Juguete Interactivo", 
        precio: 12.00, 
        descripcion: "Juguete para estimulación mental y ejercicio",
        imagen: "imagenes/productos/juguete-interactivo.jpg",
        categoria: "productos"
    },
    { 
        id: 7, 
        nombre: "Collar Antipulgas 3 meses", 
        precio: 18.00, 
        descripcion: "Protección continua contra pulgas y garrapatas",
        imagen: "imagenes/productos/collar-antipulgas.jpg",
        categoria: "productos"
    },
    { 
        id: 8, 
        nombre: "Cama Ortopédica Grande", 
        precio: 45.00, 
        descripcion: "Cama ergonómica para mascotas mayores",
        imagen: "imagenes/productos/cama-ortopedica.jpg",
        categoria: "productos"
    },
    { 
        id: 9, 
        nombre: "Corte de Uñas y Limpieza", 
        precio: 15.00, 
        descripcion: "Corte cuidadoso y limpieza de oídos",
        imagen: "imagenes/gatos/gato-corte.jpg",
        categoria: "servicios"
    },
    { 
        id: 10, 
        nombre: "Pack Accesorios Premium", 
        precio: 35.00, 
        descripcion: "Collar, correa y placa de identificación",
        imagen: "imagenes/gatos/gato-accesorios.jpg",
        categoria: "productos"
    },
    { 
        id: 11, 
        nombre: "Sesión de Juego Guiado", 
        precio: 18.00, 
        descripcion: "Sesión de juego supervisada por especialistas",
        imagen: "imagenes/perros/perro-jugando.jpg",
        categoria: "servicios"
    },
    { 
        id: 12, 
        nombre: "Kit de Higiene Básico", 
        precio: 22.00, 
        descripcion: "Cepillo, shampoo y cortaúñas básico",
        imagen: "imagenes/gatos/gato-bano.jpg", // Usamos la misma imagen del baño de gatos
        categoria: "productos"
    }
];

// Array de imágenes para la galería - RUTAS LOCALES
const imagenesDisponibles = [
    { nombre: "Perro en el baño", ruta: "imagenes/perros/perro-bano.jpg", categoria: "perros" },
    { nombre: "Perro con corte de pelo", ruta: "imagenes/perros/perro-corte.jpg", categoria: "perros" },
    { nombre: "Perro en tratamiento spa", ruta: "imagenes/perros/perro-spa.jpg", categoria: "perros" },
    { nombre: "Perro jugando", ruta: "imagenes/perros/perro-jugando.jpg", categoria: "perros" },
    { nombre: "Gato en el baño", ruta: "imagenes/gatos/gato-bano.jpg", categoria: "gatos" },
    { nombre: "Gato con corte profesional", ruta: "imagenes/gatos/gato-corte.jpg", categoria: "gatos" },
    { nombre: "Accesorios para gatos", ruta: "imagenes/gatos/gato-accesorios.jpg", categoria: "gatos" },
    { nombre: "Comida premium para mascotas", ruta: "imagenes/productos/comida-premium.jpg", categoria: "productos" },
    { nombre: "Juguetes interactivos", ruta: "imagenes/productos/juguete-interactivo.jpg", categoria: "productos" },
    { nombre: "Collares antipulgas", ruta: "imagenes/productos/collar-antipulgas.jpg", categoria: "productos" },
    { nombre: "Camas ortopédicas", ruta: "imagenes/productos/cama-ortopedica.jpg", categoria: "productos" },
    { nombre: "Área de espera del spa", ruta: "imagenes/perros/perro-spa.jpg", categoria: "instalaciones" }
];

// DOM Elements
const navbar = document.getElementById('navbar');
const loginModule = document.getElementById('login-module');
const registroUsuarioModule = document.getElementById('registro-usuario-module');
const registroModule = document.getElementById('registro-module');
const agendaModule = document.getElementById('agenda-module');
const carritoModule = document.getElementById('carrito-module');
const logoutBtn = document.getElementById('logout-btn');
const loginForm = document.getElementById('login-form');
const formRegistroUsuario = document.getElementById('form-registro-usuario');
const formDueno = document.getElementById('form-dueno');
const formMascota = document.getElementById('form-mascota');
const formAgenda = document.getElementById('form-agenda');
const catalogoDiv = document.getElementById('catalogo');
const carritoItems = document.getElementById('carrito-items');
const subtotalSpan = document.getElementById('subtotal');
const totalSpan = document.getElementById('total');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const finalizarCompraBtn = document.getElementById('finalizar-compra');
const linkRegistro = document.getElementById('link-registro');
const linkLogin = document.getElementById('link-login');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si hay sesión activa
    checkSesion();
    
    // Configurar eventos
    setupEventListeners();
    
    // Generar catálogo
    generarCatalogo();
    
    // Inicializar fecha actual en agenda
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        fechaInput.valueAsDate = new Date();
    }
    
    // Crear modal para imágenes
    crearModalImagenes();
    
    // Generar galería de imágenes
    generarGaleriaImagenes();
});

// Verificar sesión
function checkSesion() {
    if (datos.sesionActiva) {
        mostrarSistema();
    } else {
        mostrarLogin();
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Login
    loginForm.addEventListener('submit', handleLogin);
    
    // Logout
    logoutBtn.addEventListener('click', handleLogout);
    
    // Navegación
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (e.target.dataset.module) {
                e.preventDefault();
                mostrarModulo(e.target.dataset.module);
            }
        });
    });
    
    // Registro de usuario
    formRegistroUsuario.addEventListener('submit', handleRegistroUsuario);
    
    // Enlaces entre login y registro
    if (linkRegistro) {
        linkRegistro.addEventListener('click', (e) => {
            e.preventDefault();
            mostrarModulo('registro-usuario');
        });
    }
    
    if (linkLogin) {
        linkLogin.addEventListener('click', (e) => {
            e.preventDefault();
            mostrarModulo('login');
        });
    }
    
    // Registro dueño
    formDueno.addEventListener('submit', (e) => {
        e.preventDefault();
        registrarDueño();
    });
    
    // Registro mascota
    formMascota.addEventListener('submit', (e) => {
        e.preventDefault();
        registrarMascota();
    });
    
    // Agenda servicio
    formAgenda.addEventListener('submit', (e) => {
        e.preventDefault();
        agendarServicio();
    });
    
    // Carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    finalizarCompraBtn.addEventListener('click', finalizarCompra);
}

// Manejar login
function handleLogin(e) {
    e.preventDefault();
    
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;
    
    // Limpiar mensajes de error
    limpiarErrores();
    
    // Validar campos vacíos
    if (!usuario || !contrasena) {
        mostrarError('login', 'Por favor completa todos los campos');
        return;
    }
    
    // Buscar usuario en los registrados
    const usuarioEncontrado = datos.usuariosRegistrados.find(
        u => u.correo === usuario && u.contrasena === contrasena
    );
    
    if (usuarioEncontrado) {
        datos.sesionActiva = true;
        datos.usuarioActual = usuarioEncontrado.nombre;
        mostrarSistema();
        mostrarModulo('registro');
        mostrarMensaje('success', `¡Bienvenido ${usuarioEncontrado.nombre}!`);
    } else {
        mostrarError('login', 'Usuario o contraseña incorrectos');
    }
}

// Manejar registro de usuario
function handleRegistroUsuario(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre-completo').value;
    const correo = document.getElementById('correo-registro').value;
    const contrasena = document.getElementById('contrasena-registro').value;
    const confirmarContrasena = document.getElementById('confirmar-contrasena').value;
    
    // Limpiar errores previos
    limpiarErrores();
    
    // Validaciones
    let hayError = false;
    
    if (!nombre || !correo || !contrasena || !confirmarContrasena) {
        mostrarError('registro', 'Por favor completa todos los campos');
        hayError = true;
    }
    
    if (contrasena !== confirmarContrasena) {
        mostrarError('registro', 'Las contraseñas no coinciden');
        hayError = true;
    }
    
    if (contrasena.length < 4) {
        mostrarError('registro', 'La contraseña debe tener al menos 4 caracteres');
        hayError = true;
    }
    
    // Verificar si el correo ya está registrado
    const correoExistente = datos.usuariosRegistrados.find(u => u.correo === correo);
    if (correoExistente) {
        mostrarError('registro', 'Este correo ya está registrado');
        hayError = true;
    }
    
    if (hayError) return;
    
    // Registrar nuevo usuario
    const nuevoUsuario = {
        nombre,
        correo,
        contrasena,
        fechaRegistro: new Date().toLocaleDateString()
    };
    
    datos.usuariosRegistrados.push(nuevoUsuario);
    
    // Mostrar mensaje de éxito
    mostrarMensaje('success', '¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
    
    // Limpiar formulario
    formRegistroUsuario.reset();
    
    // Volver al login después de 2 segundos
    setTimeout(() => {
        mostrarModulo('login');
        // Pre-llenar el campo de usuario
        document.getElementById('usuario').value = correo;
        document.getElementById('contrasena').focus();
    }, 2000);
}

// Manejar logout
function handleLogout() {
    datos.sesionActiva = false;
    datos.usuarioActual = '';
    mostrarLogin();
    mostrarMensaje('info', 'Sesión cerrada correctamente');
}

// Mostrar sistema completo
function mostrarSistema() {
    navbar.classList.remove('hidden');
    loginModule.classList.remove('active');
    loginModule.classList.add('hidden');
    if (registroUsuarioModule) {
        registroUsuarioModule.classList.add('hidden');
    }
}

// Mostrar login
function mostrarLogin() {
    navbar.classList.add('hidden');
    loginModule.classList.remove('hidden');
    loginModule.classList.add('active');
    
    // Ocultar todos los demás módulos
    [registroUsuarioModule, registroModule, agendaModule, carritoModule].forEach(module => {
        if (module) {
            module.classList.add('hidden');
            module.classList.remove('active');
        }
    });
}

// Mostrar módulo específico
function mostrarModulo(nombreModulo) {
    // Ocultar todos los módulos
    [loginModule, registroUsuarioModule, registroModule, agendaModule, carritoModule].forEach(module => {
        if (module) {
            module.classList.add('hidden');
            module.classList.remove('active');
        }
    });
    
    // Mostrar módulo seleccionado
    const modulo = document.getElementById(`${nombreModulo}-module`);
    if (modulo) {
        modulo.classList.remove('hidden');
        modulo.classList.add('active');
    }
    
    // Actualizar datos según el módulo
    switch(nombreModulo) {
        case 'registro':
            actualizarListaDueños();
            actualizarListaMascotas();
            break;
        case 'agenda':
            actualizarSelectMascotas();
            actualizarListaServicios();
            break;
        case 'carrito':
            actualizarCarrito();
            break;
    }
}

// Registrar dueño
function registrarDueño() {
    const nombre = document.getElementById('nombre-dueno').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    
    if (nombre && telefono && correo) {
        const dueño = {
            id: Date.now(),
            nombre,
            telefono,
            correo,
            fechaRegistro: new Date().toLocaleDateString()
        };
        
        datos.dueños.push(dueño);
        formDueno.reset();
        actualizarListaDueños();
        mostrarMensaje('success', 'Dueño registrado exitosamente');
    } else {
        mostrarMensaje('error', 'Por favor complete todos los campos');
    }
}

// Registrar mascota
function registrarMascota() {
    const nombre = document.getElementById('nombre-mascota').value;
    const especie = document.getElementById('especie').value;
    const raza = document.getElementById('raza').value;
    
    if (nombre && especie && raza) {
        const mascota = {
            id: Date.now(),
            nombre,
            especie,
            raza,
            fechaRegistro: new Date().toLocaleDateString()
        };
        
        datos.mascotas.push(mascota);
        formMascota.reset();
        actualizarListaMascotas();
        mostrarMensaje('success', 'Mascota registrada exitosamente');
    } else {
        mostrarMensaje('error', 'Por favor complete todos los campos');
    }
}

// Agendar servicio
function agendarServicio() {
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const mascotaSelect = document.getElementById('mascota-agenda');
    const mascotaId = mascotaSelect.value;
    const servicio = document.getElementById('servicio').value;
    
    if (fecha && hora && mascotaId && servicio) {
        const mascota = datos.mascotas.find(m => m.id == mascotaId);
        
        if (mascota) {
            const servicioObj = {
                id: Date.now(),
                fecha,
                hora,
                mascota: mascota.nombre,
                especie: mascota.especie,
                servicio,
                estado: 'pendiente'
            };
            
            datos.servicios.push(servicioObj);
            formAgenda.reset();
            actualizarListaServicios();
            mostrarMensaje('success', 'Servicio agendado exitosamente');
        }
    } else {
        mostrarMensaje('error', 'Por favor complete todos los campos');
    }
}

// Actualizar lista de dueños
function actualizarListaDueños() {
    const lista = document.getElementById('lista-duenos');
    if (!lista) return;
    
    lista.innerHTML = '';
    
    if (datos.dueños.length === 0) {
        lista.innerHTML = '<p class="empty-cart">No hay dueños registrados</p>';
        return;
    }
    
    datos.dueños.forEach(dueño => {
        const div = document.createElement('div');
        div.className = 'registro-item';
        div.innerHTML = `
            <div>
                <strong>${dueño.nombre}</strong>
                <p>${dueño.telefono} | ${dueño.correo}</p>
            </div>
            <small>${dueño.fechaRegistro}</small>
        `;
        lista.appendChild(div);
    });
}

// Actualizar lista de mascotas
function actualizarListaMascotas() {
    const lista = document.getElementById('lista-mascotas');
    if (!lista) return;
    
    lista.innerHTML = '';
    
    if (datos.mascotas.length === 0) {
        lista.innerHTML = '<p class="empty-cart">No hay mascotas registradas</p>';
        return;
    }
    
    datos.mascotas.forEach(mascota => {
        const div = document.createElement('div');
        div.className = 'registro-item';
        div.innerHTML = `
            <div>
                <strong>${mascota.nombre}</strong>
                <p>${mascota.especie} | ${mascota.raza}</p>
            </div>
            <small>${mascota.fechaRegistro}</small>
        `;
        lista.appendChild(div);
    });
}

// Actualizar select de mascotas en agenda
function actualizarSelectMascotas() {
    const select = document.getElementById('mascota-agenda');
    if (!select) return;
    
    select.innerHTML = '<option value="">Seleccionar mascota...</option>';
    
    datos.mascotas.forEach(mascota => {
        const option = document.createElement('option');
        option.value = mascota.id;
        option.textContent = `${mascota.nombre} (${mascota.especie})`;
        select.appendChild(option);
    });
}

// Actualizar lista de servicios
function actualizarListaServicios() {
    const lista = document.getElementById('lista-agenda');
    if (!lista) return;
    
    lista.innerHTML = '';
    
    if (datos.servicios.length === 0) {
        lista.innerHTML = '<p class="empty-cart">No hay servicios agendados</p>';
        return;
    }
    
    datos.servicios.forEach(servicio => {
        const div = document.createElement('div');
        div.className = 'servicio-item';
        div.innerHTML = `
            <div class="servicio-info">
                <h4>${servicio.servicio}</h4>
                <p>${servicio.mascota} (${servicio.especie})</p>
                <p>${servicio.fecha} a las ${servicio.hora}</p>
            </div>
            <span class="estado">${servicio.estado}</span>
        `;
        lista.appendChild(div);
    });
}

// Función para generar el catálogo con filtros
function generarCatalogo() {
    if (!catalogoDiv) return;
    
    catalogoDiv.innerHTML = '';
    
    // Agregar filtros
    const filtrosHTML = `
        <div class="filtros-catalogo">
            <button class="filtro-btn active" data-categoria="todos">Todos</button>
            <button class="filtro-btn" data-categoria="servicios">Servicios</button>
            <button class="filtro-btn" data-categoria="productos">Productos</button>
            <button class="filtro-btn" data-categoria="perros">Para Perros</button>
            <button class="filtro-btn" data-categoria="gatos">Para Gatos</button>
        </div>
    `;
    
    catalogoDiv.innerHTML = filtrosHTML + '<div class="catalogo-grid-interno" id="catalogo-grid"></div>';
    
    const catalogoGrid = document.getElementById('catalogo-grid');
    
    // Mostrar todos los productos inicialmente
    mostrarProductosFiltrados('todos', catalogoGrid);
    
    // Agregar event listeners a los filtros
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remover clase active de todos los botones
            document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            e.target.classList.add('active');
            
            const categoria = e.target.dataset.categoria;
            mostrarProductosFiltrados(categoria, catalogoGrid);
        });
    });
}

// Función para mostrar productos filtrados
function mostrarProductosFiltrados(categoria, contenedor) {
    if (!contenedor) return;
    
    contenedor.innerHTML = '';
    
    const productosFiltrados = categoria === 'todos' 
        ? catalogo 
        : catalogo.filter(producto => {
            if (categoria === 'perros' || categoria === 'gatos') {
                return producto.nombre.toLowerCase().includes(categoria.slice(0, -1));
            }
            return producto.categoria === categoria;
        });
    
    productosFiltrados.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.innerHTML = `
            <div class="producto-img">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto" 
                     onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200/4ecdc4/ffffff?text=${encodeURIComponent(producto.nombre.substring(0, 20))}'">
                <span class="categoria-badge ${producto.categoria}">${producto.categoria}</span>
            </div>
            <div class="producto-info">
                <h4>${producto.nombre}</h4>
                <p>${producto.descripcion}</p>
                <div class="producto-precio">$${producto.precio.toFixed(2)}</div>
                <button class="btn-comprar" data-id="${producto.id}">
                    <i class="fas fa-cart-plus"></i> Agregar al Carrito
                </button>
            </div>
        `;
        contenedor.appendChild(card);
    });
    
    // Agregar event listeners a los botones de compra
    document.querySelectorAll('.btn-comprar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('.btn-comprar').dataset.id);
            agregarAlCarrito(id);
        });
    });
    
    // Agregar event listeners para hacer clic en las imágenes
    document.querySelectorAll('.imagen-producto').forEach(img => {
        img.addEventListener('click', (e) => {
            mostrarImagenModal(e.target.src, e.target.alt);
        });
    });
}

// Función para generar galería con categorías
function generarGaleriaImagenes() {
    const carritoModule = document.getElementById('carrito-module');
    if (!carritoModule) return;
    
    // Verificar si ya existe la galería para no duplicar
    let galeriaSection = document.querySelector('.galeria-container');
    if (!galeriaSection) {
        galeriaSection = document.createElement('div');
        galeriaSection.className = 'galeria-container';
        galeriaSection.innerHTML = `
            <h3><i class="fas fa-images"></i> Galería de Nuestro Spa</h3>
            <div class="filtros-galeria">
                <button class="filtro-galeria-btn active" data-categoria="todos">Todas</button>
                <button class="filtro-galeria-btn" data-categoria="perros">Perros</button>
                <button class="filtro-galeria-btn" data-categoria="gatos">Gatos</button>
                <button class="filtro-galeria-btn" data-categoria="productos">Productos</button>
                <button class="filtro-galeria-btn" data-categoria="instalaciones">Instalaciones</button>
            </div>
            <div class="galeria-imagenes" id="galeria-imagenes"></div>
        `;
        
        const carritoContainer = document.querySelector('.carrito-container');
        if (carritoContainer) {
            carritoModule.insertBefore(galeriaSection, carritoContainer);
        } else {
            carritoModule.appendChild(galeriaSection);
        }
    }
    
    // Mostrar todas las imágenes inicialmente
    mostrarGaleriaFiltrada('todos');
    
    // Configurar filtros de galería
    document.querySelectorAll('.filtro-galeria-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filtro-galeria-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const categoria = e.target.dataset.categoria;
            mostrarGaleriaFiltrada(categoria);
        });
    });
}

// Función para mostrar galería filtrada
function mostrarGaleriaFiltrada(categoria) {
    const galeriaDiv = document.getElementById('galeria-imagenes');
    if (!galeriaDiv) return;
    
    galeriaDiv.innerHTML = '';
    
    const imagenesFiltradas = categoria === 'todos' 
        ? imagenesDisponibles 
        : imagenesDisponibles.filter(img => img.categoria === categoria);
    
    imagenesFiltradas.forEach(imagen => {
        const item = document.createElement('div');
        item.className = 'galeria-item';
        item.innerHTML = `
            <img src="${imagen.ruta}" alt="${imagen.nombre}" 
                 onerror="this.onerror=null; this.src='https://via.placeholder.com/200x150/4ecdc4/ffffff?text=${encodeURIComponent(imagen.nombre.substring(0, 15))}'">
            <div class="galeria-overlay">
                <div>${imagen.nombre}</div>
                <small>${imagen.categoria.charAt(0).toUpperCase() + imagen.categoria.slice(1)}</small>
            </div>
        `;
        
        item.addEventListener('click', () => {
            mostrarImagenModal(imagen.ruta, imagen.nombre);
        });
        
        galeriaDiv.appendChild(item);
    });
}

// Crear modal para ver imágenes
function crearModalImagenes() {
    const modalHTML = `
        <div id="modal-imagen" class="modal">
            <span class="cerrar-modal">&times;</span>
            <div class="modal-contenido">
                <img id="imagen-modal" src="" alt="">
                <p id="titulo-imagen"></p>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Configurar eventos del modal
    const modal = document.getElementById('modal-imagen');
    const cerrarModal = document.querySelector('.cerrar-modal');
    const imagenModal = document.getElementById('imagen-modal');
    
    if (cerrarModal) {
        cerrarModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    // Cerrar al hacer clic fuera de la imagen
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Mostrar imagen en modal
function mostrarImagenModal(src, titulo) {
    const modal = document.getElementById('modal-imagen');
    const imagenModal = document.getElementById('imagen-modal');
    const tituloImagen = document.getElementById('titulo-imagen');
    
    if (!modal || !imagenModal || !tituloImagen) return;
    
    imagenModal.src = src;
    tituloImagen.textContent = titulo;
    modal.style.display = 'flex';
}

// Agregar producto al carrito
function agregarAlCarrito(idProducto) {
    const producto = catalogo.find(p => p.id === idProducto);
    
    if (!producto) return;
    
    // Verificar si el producto ya está en el carrito
    const itemExistente = datos.carrito.find(item => item.id === idProducto);
    
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        datos.carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    actualizarCarrito();
    mostrarMensaje('success', `${producto.nombre} agregado al carrito`);
}

// Actualizar carrito
function actualizarCarrito() {
    if (!carritoItems || !subtotalSpan || !totalSpan) return;
    
    carritoItems.innerHTML = '';
    
    if (datos.carrito.length === 0) {
        carritoItems.innerHTML = '<p class="empty-cart">El carrito está vacío</p>';
        subtotalSpan.textContent = '0.00';
        totalSpan.textContent = '0.00';
        return;
    }
    
    let subtotal = 0;
    
    datos.carrito.forEach((item, index) => {
        const itemTotal = item.precio * item.cantidad;
        subtotal += itemTotal;
        
        const div = document.createElement('div');
        div.className = 'carrito-item';
        div.innerHTML = `
            <div class="carrito-item-info">
                <h4>${item.nombre}</h4>
                <p>$${item.precio.toFixed(2)} c/u</p>
            </div>
            <div class="carrito-item-cantidad">
                <button onclick="cambiarCantidad(${index}, -1)">-</button>
                <span>${item.cantidad}</span>
                <button onclick="cambiarCantidad(${index}, 1)">+</button>
            </div>
            <div class="carrito-item-total">
                $${itemTotal.toFixed(2)}
            </div>
        `;
        carritoItems.appendChild(div);
    });
    
    subtotalSpan.textContent = subtotal.toFixed(2);
    totalSpan.textContent = subtotal.toFixed(2);
}

// Cambiar cantidad de producto en carrito
function cambiarCantidad(index, cambio) {
    if (datos.carrito[index]) {
        datos.carrito[index].cantidad += cambio;
        
        if (datos.carrito[index].cantidad <= 0) {
            datos.carrito.splice(index, 1);
        }
        
        actualizarCarrito();
    }
}

// Vaciar carrito
function vaciarCarrito() {
    if (datos.carrito.length === 0) {
        mostrarMensaje('info', 'El carrito ya está vacío');
        return;
    }
    
    if (confirm('¿Está seguro de vaciar el carrito?')) {
        datos.carrito = [];
        actualizarCarrito();
        mostrarMensaje('success', 'Carrito vaciado correctamente');
    }
}

// Finalizar compra
function finalizarCompra() {
    if (datos.carrito.length === 0) {
        mostrarMensaje('error', 'El carrito está vacío');
        return;
    }
    
    const total = datos.carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    // Mostrar resumen de compra
    let resumen = 'Resumen de compra:\n\n';
    datos.carrito.forEach(item => {
        resumen += `${item.nombre} x${item.cantidad}: $${(item.precio * item.cantidad).toFixed(2)}\n`;
    });
    resumen += `\nTotal: $${total.toFixed(2)}`;
    
    if (confirm(`${resumen}\n\n¿Confirmar compra?`)) {
        datos.carrito = [];
        actualizarCarrito();
        mostrarMensaje('success', '¡Compra realizada con éxito! Gracias por su compra.');
    }
}

// Mostrar mensajes
function mostrarMensaje(tipo, texto) {
    // Crear elemento de mensaje
    const mensaje = document.createElement('div');
    mensaje.className = `mensaje mensaje-${tipo}`;
    mensaje.innerHTML = `
        <span>${texto}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Estilos para el mensaje
    mensaje.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Colores según tipo
    const colores = {
        success: '#2ecc71',
        error: '#e74c3c',
        info: '#3498db',
        warning: '#f39c12'
    };
    
    mensaje.style.backgroundColor = colores[tipo] || colores.info;
    
    // Agregar al documento
    document.body.appendChild(mensaje);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (mensaje.parentElement) {
            mensaje.remove();
        }
    }, 5000);
}

// Mostrar error
function mostrarError(tipo, mensaje) {
    let elemento;
    
    if (tipo === 'login') {
        elemento = loginForm;
    } else if (tipo === 'registro') {
        elemento = formRegistroUsuario;
    } else {
        return;
    }
    
    if (!elemento) return;
    
    // Crear elemento de error si no existe
    let errorDiv = elemento.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        elemento.appendChild(errorDiv);
    }
    
    errorDiv.textContent = mensaje;
    
    // Resaltar campos con error
    elemento.querySelectorAll('input').forEach(input => {
        if (!input.value) {
            input.parentElement.classList.add('error');
        }
    });
}

// Limpiar errores
function limpiarErrores() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));
}

// Añadir estilos de animación para mensajes
const estiloMensajes = document.createElement('style');
estiloMensajes.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .mensaje button {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 15px;
    }
`;
document.head.appendChild(estiloMensajes);

// Hacer funciones disponibles globalmente para los eventos onclick
window.cambiarCantidad = cambiarCantidad;