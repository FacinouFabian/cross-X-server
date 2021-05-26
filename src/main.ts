import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import events from "./core/events";
import { prelude } from "./config/prelude";
import { initDatabase } from "./config/database";

const main = () => {
  // Every things start with a prelude 🙌😎
  try {
    prelude();
    initDatabase();
  } catch (error) {
    console.log(error);
  }

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
    events.map(({ eventName, action }) => {
      socket.on(eventName, (payload) => action(payload, io, socket));
    });
  });



  server.listen(5000, () => {
    console.log("listening on *:5000");
  });
};

main();
