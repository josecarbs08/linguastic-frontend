document.addEventListener('DOMContentLoaded', () => {

    const registroForm = document.getElementById('registro-form');
    const nombreInput = document.getElementById('nombre');
    const horarioSelect = document.getElementById('horario');
    const tuNumeroWhatsapp = "522384018618"; // ¡Cámbialo por tu número!

    registroForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitamos que la página se recargue

        const nombre = nombreInput.value;
        const horario = horarioSelect.value;

        if (nombre.trim() === '' || horario === '') {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }

        // --- INICIO DE LA NUEVA SECCIÓN ---
        // TAREA 1: ENVIAR DATOS AL SERVIDOR SILENCIOSAMENTE

        // Usamos 'fetch' para enviar los datos a nuestro servidor local
        fetch('http://localhost:3000/registrar', {
            method: 'POST', // Le decimos que es una petición de tipo POST
            headers: {
                // Le decimos al servidor que le estamos enviando datos de formulario
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            // Adjuntamos los datos en el cuerpo (body) de la petición
            body: new URLSearchParams({
                'nombre': nombre,
                'horario': horario
            })
        })
        .then(response => response.text()) // Esperamos la respuesta del servidor
        .then(data => {
            // Imprimimos la respuesta del servidor en la consola del NAVEGADOR
            // Esto es útil para saber si el servidor contestó bien.
            console.log('Respuesta del servidor:', data); 
        })
        .catch(error => {
            // Si hay un error de conexión, lo mostramos en la consola del NAVEGADOR
            console.error('Error al contactar al servidor:', error);
        });

        // --- FIN DE LA NUEVA SECCIÓN ---


        // TAREA 2: ABRIR WHATSAPP (esto sigue igual)
        const mensaje = `¡Hola! Mi nombre es ${nombre}, y me interesa registrarme al curso de alemán en el horario de: ${horario}.`;
        const mensajeCodificado = encodeURIComponent(mensaje);
        const urlWhatsapp = `https://wa.me/${tuNumeroWhatsapp}?text=${mensajeCodificado}`;

        window.open(urlWhatsapp, '_blank');
        
        registroForm.reset();
    });
});