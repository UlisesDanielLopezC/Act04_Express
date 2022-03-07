const express = require('express')
const socket = require('socket.io')

const app = express()
const port = 3000
const server = app.listen(port, function(){
  console.log(`Aplicacion a la escucha del puerto ${port}`);
});

//Para el index
app.use(express.static('recursos'));

//Para el socket
const io = socket(server);

io.on('connection', function(socket){
  console.log("Hay conexion de un socket");

  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });

  socket.on('escribiendo', function(data){
    socket.broadcast.emit('escribiendo', data);
  });
});