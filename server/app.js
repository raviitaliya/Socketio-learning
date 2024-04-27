import express from "express";
import { Server } from "socket.io";
import {createServer} from "http";

const port = 3000;

const app = express();
const server = createServer(app);

const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection",(Socket) =>{
    console.log("user created");
    console.log("id", Socket.id);
})

app.listen(port, () => {
  console.log(`server is runing on ${port}`);
});
