//Conexion
const socket = io();

//Estructura
const msj = document.getElementById('msj');
const nom = document.getElementById('nom');
const env = document.getElementById('env');
const salida = document.getElementById('salida');
const espera = document.getElementById('espera');

//Eventos
env.addEventListener('click', function(){
    socket.emit('chat', {
        mensaje: msj.value,
        nombre: nom.value
    });
    env.disabled = true;
    env.innerHTML = "...";
    setTimeout(function() {
        env.disabled = false;
        env.innerHTML = "Enviar!";
    }, 2000);
});

msj.addEventListener('keypress', function(){
    socket.emit('escribiendo', nom.value);
});

//Escucha
socket.on('chat', function(data){
    salida.innerHTML += '<p><strong>' + data.nombre + ': </strong>' + data.mensaje + '</p>';
    espera.innerHTML = "";
});

socket.on('escribiendo', function(data){
    espera.innerHTML = '<p><em>' + data +' esta escribiendo :D...</em></p>'
});