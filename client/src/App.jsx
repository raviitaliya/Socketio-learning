import { useEffect,useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
function App() {
  const socket = io("http://localhost:3000");

  const [message,setMessage]=useState("");


  const formhandler=(e)=>{
    e.preventDefault();
    socket.emit("message",message)
  }

  useEffect(()=>{

    socket.on("connect",()=>{
      console.log(socket.id);
    })

    return ()=>{
      socket.disconnect();
    }
  },[])

  return (
    <>
      <div>
        <form onSubmit={formhandler}>
          <input type="text" value={message} onChange={(e)=>{setMessage(e.target.value)}}/> 
          <button type="submit" >Send</button>
        </form>
      </div>
    </>
  );
}

export default App;
