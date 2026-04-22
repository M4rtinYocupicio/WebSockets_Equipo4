// Cliente STOMP
let stompCliente = null;
let usuarioActual = null;

// Conexión al WebSocket
const conectarWS = () => {
    cerrarConexion();

    usuarioActual = document.getElementById('txtNombre').value;

    if (!usuarioActual) {
        alert("Ingresa tu nombre antes de conectar");
        return;
    }

    stompCliente = new StompJs.Client({
        webSocketFactory: () => new WebSocket('ws://localhost:8080/websocket'),
        reconnectDelay: 5000
    });

    stompCliente.onConnect = () => {
        console.log("Conectado");

        // Suscripción a mensajes globales
        stompCliente.subscribe('/tema/mensajes', (mensaje) => {
            mostrarMensaje(JSON.parse(mensaje.body));
        });

        // Lista de usuarios
        stompCliente.subscribe('/tema/usuarios', (usuarios) => {
            mostrarUsuarios(JSON.parse(usuarios.body));
        });

        // Mensajes privados
        stompCliente.subscribe('/user/cola/mensajes', (mensaje) => {
            mostrarMensaje(JSON.parse(mensaje.body));
        });

        // Productos globales
        stompCliente.subscribe('/tema/productos', (producto) => {
            agregarProductoTabla(JSON.parse(producto.body));
        });

        // Productos privados
        stompCliente.subscribe('/user/cola/productos', (producto) => {
            agregarProductoTabla(JSON.parse(producto.body));
        });

        // Registrar usuario
        stompCliente.publish({
            destination: '/app/registro',
            body: usuarioActual
        });
    };

    stompCliente.activate();
};

// Cerrar conexión
const cerrarConexion = () => {
    if (stompCliente !== null) {
        stompCliente.deactivate();
        stompCliente = null;
    }
};

// Enviar mensaje (global o privado)
const enviarMensaje = () => {
    const contenido = document.getElementById('txtMensaje').value;
    const destino = document.getElementById('selectUsuarios').value;

    if (!contenido) return;

    const mensaje = {
        nombre: usuarioActual,
        contenido: contenido,
        destino: destino
    };

    if (destino === "todos") {
        stompCliente.publish({
            destination: '/app/envio',
            body: JSON.stringify(mensaje)
        });
    } else {
        stompCliente.publish({
            destination: '/app/privado',
            body: JSON.stringify(mensaje)
        });
    }
};

// Enviar producto
const enviarProducto = () => {
    const nombre = document.getElementById('txtProductoNombre').value;
    const precio = document.getElementById('txtProductoPrecio').value;
    const destino = document.getElementById('selectUsuarios').value;

    if (!nombre || !precio) return;

    const producto = {
        nombre: nombre,
        precio: parseFloat(precio)
    };

    if (destino === "todos") {
        stompCliente.publish({
            destination: '/app/producto',
            body: JSON.stringify(producto)
        });
    } else {
        stompCliente.publish({
            destination: '/app/productoPrivado',
            body: JSON.stringify(producto),
            headers: { destino: destino }
        });
    }
};

// Mostrar mensaje en pantalla
const mostrarMensaje = (mensaje) => {
    const lista = document.getElementById('ULMensajes');

    const li = document.createElement('li');
    li.classList.add('list-group-item');

    li.innerHTML = `<strong>${mensaje.nombre}</strong>: ${mensaje.contenido}`;

    lista.appendChild(li);
};

// Mostrar usuarios conectados
const mostrarUsuarios = (usuarios) => {
    const select = document.getElementById('selectUsuarios');

    select.innerHTML = '';

    // opción para todos
    const opcionTodos = document.createElement('option');
    opcionTodos.value = "todos";
    opcionTodos.text = "Todos";
    select.appendChild(opcionTodos);

    usuarios.forEach(usuario => {
        const option = document.createElement('option');
        option.value = usuario;
        option.text = usuario;
        select.appendChild(option);
    });
};

// Agregar producto a tabla
const agregarProductoTabla = (producto) => {
    const tabla = document.getElementById('tablaProductos');

    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
    `;

    tabla.appendChild(fila);
};

// Eventos al cargar
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('btnConectar').addEventListener('click', (e) => {
        e.preventDefault();
        conectarWS();
    });

    document.getElementById('btnEnviar').addEventListener('click', (e) => {
        e.preventDefault();
        enviarMensaje();
    });

    document.getElementById('btnEnviarProducto').addEventListener('click', (e) => {
        e.preventDefault();
        enviarProducto();
    });
});