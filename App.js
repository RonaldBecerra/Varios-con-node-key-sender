
// Servidor en Node.js
const express = require('express');
var ks = require('node-key-sender');
const WebSocket = require('ws');

// Creamos una instancia del servidor
const app = express();

// Esto permite que nuestra página web se despliegue, para que así pueda ser
// accedida desde varios dispositivos
app.use(express.static('public'));

// Esto es para poder utilizar el Web Socket. Creamos un servidor a partir del
// que ya habíamos creado con Express, y ése es el que ponemos a la escucha.
const server = require('http').createServer(app);
const wss = new WebSocket.Server({server});

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        ks.sendCombination(JSON.parse(message).botones);
    });
});

server.listen(8080, () =>{
    console.log("Servidor funcionando");
})

// ----------------- Versión anterior

// Servidor en Node.js
// var ks = require('node-key-sender');
// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 8080 });

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(message) {
//     message = Buffer.from(message).toString();
//     ks.sendKey(message);
//   });
// });



// ----------------- Cliente en el navegador -------------------------------

// const ws = new WebSocket('ws://localhost:8080');

// ws.onmessage = function(event) {
//   // Recibir código ASCII del servidor
//   // const keyCode = parseInt(event.data);
//   // console.log("keyCode = ", keyCode);

//   const keyCode = 39;

//   // Simular la pulsación de una tecla utilizando el código recibido
//   const event2 = new KeyboardEvent('keydown', { keyCode });
//   document.dispatchEvent(event2);
// };
