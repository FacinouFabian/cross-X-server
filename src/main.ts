import express from "express";

import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { EventEmitter } from "events";

import events from "./core/events";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.json({ response: "ok" });
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

io.on("yes", () => {
  console.log("hello");
});

events.map(({ eventName, action }) => {
  io.on(eventName, (payload) => action(payload, io));
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
