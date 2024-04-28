import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const port = 7474;

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
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
    console.log({room,message});
    io.to(room).emit("allmessage",message)
  });


  socket.on("join_room", (room) => {
    socket.join(room);
    console.log("user joined room:", room);
  })




  socket.on("disconnect", () => {
    console.log("user dissconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
