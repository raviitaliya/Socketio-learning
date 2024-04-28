import { useEffect,useState,useMemo } from "react";
import "./App.css";
import { io } from "socket.io-client";
function App() {
  const socket = useMemo(()=>io("http://localhost:3000"),[]);



  const [message,setMessage]=useState("");
  const [room,setroom]=useState("");
  const [socketid,setsocketid]=useState("");
  const [ansMsg, setansMsg] = useState([]); 


  console.log(ansMsg);
  const formhandler=(e)=>{
    e.preventDefault();
    socket.emit("message",{message,room})
    
  }



  useEffect(()=>{

    socket.on("connect",()=>{
      console.log(socket.id);
      setsocketid(socket.id);
    })





    socket.on("allmessage",(data)=>{
      setansMsg(data);
    })






    return ()=>{
      socket.disconnect();
    }
  },[])

  return (
    <>
      <div>

          <h4>{socketid}</h4>

        <form onSubmit={formhandler}>
          <input type="text" value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder="message"/> <br/>
          <input type="text" value={room} onChange={(e)=>{setroom(e.target.value)}} placeholder="Room"/> 
          <button type="submit" >Send</button>
        </form>

        {/* <p>{ansMsg.map((m,i)=>(
          <p key={i}>{m.ansMsg}</p>
        ))}
        </p> */}
      </div>
    </>
  );
}

export default App;
