import { useEffect } from "react";
import "./App.css";
import { io } from "socket.io-client";
function App() {
  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("connect",
      () => {
        console.log(socket.id);
      },
      []
    );
  });

  return (
    <>
      <h1>app</h1>
    </>
  );
}

export default App;
