import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const port = 3000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});



io.on("connection", (socket) => {
  console.log("User connected:", socket.id);





  socket.on("message", ({room,message}) => {
    io.to(room).emit("allmessage",message)
  });







  socket.on("disconnect", () => {
    console.log("user dissconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
