import express from 'express'

import http from 'http'
import { Server } from 'socket.io'
import { EventEmitter } from "events"


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.json({ response: "ok" })
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
