// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// ---- MUTEX y SEMÁFORO ----
const { Mutex, Semaphore } = require('async-mutex');

// Mutex para proteger el acceso a "players"
const playersMutex = new Mutex();

// Semáforo: cantidad máxima de jugadores permitidos
// Puedes cambiar el 50 por el número de jugadores que quieras permitir
const maxPlayers = 50;
const playerSemaphore = new Semaphore(maxPlayers);
// ----------------------------------------------

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('<h1> Bienvenido al Juego Multijugador</h1>');
});

let players = {};

io.on('connection', async (socket) => {

  // ----  SEMÁFORO: intentar adquirir un lugar ----
  const [value, releaseSem] = await playerSemaphore.acquire().catch(() => [null, null]);

  if (value === null) {
    console.log(" Jugador rechazado: sala llena");
    socket.emit("error", "La sala está llena. Intenta más tarde.");
    socket.disconnect();
    return;
  }

  console.log('Jugador conectado:', socket.id);

  // ----  MUTEX: zona crítica para agregar jugador ----
  const releaseMutexAdd = await playersMutex.acquire();
  try {
    players[socket.id] = { x: 0, y: 0 };
  } finally {
    releaseMutexAdd(); // liberar mutex
  }
  // ------------------------------------------------------

  io.emit('state', players);

  // Evento de movimiento
  socket.on('move', async (data) => {

    // ----  MUTEX: asegurar modificación del estado ----
    const releaseMutex = await playersMutex.acquire();
    try {
      players[socket.id] = data;
      io.emit('state', players);
    } finally {
      releaseMutex(); // liberar mutex
    }
    // ------------------------------------------------------
  });

  // Evento de desconexión
  socket.on('disconnect', async () => {

    // ----  MUTEX para eliminar al jugador ----
    const releaseMutexDelete = await playersMutex.acquire();
    try {
      delete players[socket.id];
      io.emit('state', players);
    } finally {
      releaseMutexDelete();
    }
    // -------------------------------------------

    //  Liberar un cupo del semáforo
    releaseSem();
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor del juego en puerto ${PORT}`);
});
