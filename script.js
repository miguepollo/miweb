function showTab(tabId) {
    // Ocultar todos los contenidos de las pestañas
    var tabContents = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }

    if (tabId === 'bitcoin') {
        fetchBitcoinPrice();
        fetchBitcoinFee();
        
    }
    // Mostrar el contenido de la pestaña seleccionada
    document.getElementById(tabId).classList.add('active');

    // Actualizar el estado activo de los botones de las pestañas
    var tabButtons = document.getElementsByClassName('tab-button');
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    event.currentTarget.classList.add('active');
}
function fetchBitcoinPrice() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur')
        .then(response => response.json())
        .then(data => {
            document.getElementById('bitcoin-price').textContent = `El precio actual del Bitcoin es: €${data.bitcoin.eur}`;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('bitcoin-price').textContent = 'No se pudo cargar el precio del Bitcoin.Revisa conexion al internet';
        });
}
function fetchBitcoinFee() {
    fetch('https://api.blockchain.info/mempool/fees')
        .then(response => response.json())
        .then(data => {
            const feeSatoshiPerByte = data.regular;
            const feeUSD = (feeSatoshiPerByte * 226 * 1e-8 * document.getElementById('bitcoin-price').textContent.split('$')[1]).toFixed(2);
            document.getElementById('bitcoin-fee').textContent = `La comisión media actual es: ${feeSatoshiPerByte} sats/byte `;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('No se pudo cargar la comisión media de Bitcoin. Revisa conexion al internet');
            document.getElementById('bitcoin-fee').textContent = 'No se pudo cargar la comisión media de Bitcoin. Revisa conexion al internet';
        });
}
function updateMadridTime() {
    const madridTime = document.getElementById('madrid-time');
    const options = { 
        timeZone: 'Europe/Madrid',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    madridTime.textContent = new Date().toLocaleString('es-ES', options);
}
setInterval(updateMadridTime, 10000);

// Llama a la función una vez para mostrar la hora inmediatamente
updateMadridTime();


function enlace_1() {
    window.location.href = "/documentacion-directo.pdf";
    alert("Esta es informacion de un directo");
}
function enlace_2() {
    window.location.href = "/presentacion.pdf";
    alert("Esta en un presentacion");
}


function dibujarReloj() {
    console.log('Iniciando dibujarReloj');
    const canvas = document.getElementById('reloj-canvas');
    if (!canvas) {
        console.error('No se pudo encontrar el elemento canvas');
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('No se pudo obtener el contexto 2D del canvas');
        return;
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    console.log('Canvas y contexto obtenidos correctamente');

    function dibujarCaraReloj() {
        console.log('Dibujando cara del reloj');
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
    }

    function dibujarNumeros() {
        console.log('Dibujando números');
        // Aumentamos el tamaño de la fuente aquí
        ctx.font = radius * 0.20 + "px Arial"; // Cambiado de 0.15 a 0.20
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        for (let num = 1; num <= 12; num++) {
            const ang = num * Math.PI / 6;
            // Ajustamos ligeramente la posición de los números
            const x = centerX + Math.sin(ang) * (radius * 0.80); // Cambiado de 0.85 a 0.80
            const y = centerY - Math.cos(ang) * (radius * 0.80); // Cambiado de 0.85 a 0.80
            ctx.fillText(num.toString(), x, y);
        }
    }

    function dibujarAgujas() {
        console.log('Dibujando agujas');
        const ahora = new Date();
        const horas = ahora.getHours() % 12;
        const minutos = ahora.getMinutes();
        const segundos = ahora.getSeconds();

        // Aguja de las horas
        const anguloHoras = (horas + minutos / 60) * (Math.PI * 2) / 12;
        dibujarAguja(radius * 0.5, 6, anguloHoras);

        // Aguja de los minutos
        const anguloMinutos = (minutos + segundos / 60) * (Math.PI * 2) / 60;
        dibujarAguja(radius * 0.7, 4, anguloMinutos);

        // Aguja de los segundos
        const anguloSegundos = segundos * (Math.PI * 2) / 60;
        ctx.strokeStyle = 'red';
        dibujarAguja(radius * 0.9, 2, anguloSegundos);
        ctx.strokeStyle = 'black';
    }

    function dibujarAguja(longitud, ancho, angulo) {
        ctx.beginPath();
        ctx.lineWidth = ancho;
        ctx.lineCap = 'round';
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
            centerX + longitud * Math.cos(angulo - Math.PI / 2),
            centerY + longitud * Math.sin(angulo - Math.PI / 2)
        );
        ctx.stroke();
    }

    function actualizarReloj() {
        console.log('Actualizando reloj');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujarCaraReloj();
        dibujarNumeros();
        dibujarAgujas();
        requestAnimationFrame(actualizarReloj);
    }

    actualizarReloj();
}

// Asegúrate de que esta función se llame cuando se muestre la pestaña del reloj
function showTab(tabId) {
    console.log('Mostrando pestaña:', tabId);
    // Ocultar todos los contenidos de las pestañas
    var tabContents = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }

    // Mostrar el contenido de la pestaña seleccionada
    document.getElementById(tabId).classList.add('active');

    // Si es la pestaña del reloj, dibuja el reloj
    if (tabId === 'reloj-madrid') {
        console.log('Llamando a dibujarReloj');
        dibujarReloj();
    }

    // Actualizar el estado activo de los botones de las pestañas
    var tabButtons = document.getElementsByClassName('tab-button');
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    event.currentTarget.classList.add('active');
}

// Inicializa el reloj cuando se carga la página
window.onload = function() {
    console.log('Página cargada');
    const relojTab = document.getElementById('reloj-madrid');
    if (relojTab && relojTab.classList.contains('active')) {
        console.log('Pestaña del reloj visible, dibujando reloj');
        dibujarReloj();
    }
};
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Mensaje enviado con éxito!');
                    form.reset();
                } else {
                    alert('Error al enviar el mensaje: ' + data.error);
                }
            })
            .catch((error) => {
                alert('Error al enviar el mensaje: ' + error);
            });
        });
    }
});
