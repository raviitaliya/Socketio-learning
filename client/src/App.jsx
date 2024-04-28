import { useEffect,useState,useMemo } from "react";
import "./App.css";
import { io } from "socket.io-client";
function App() {
  const socket = useMemo(()=>io("http://raviws.honeynine.wiki:7474/"),[]);



  const [message,setMessage]=useState("");
  const [room,setroom]=useState("");
  const [socketid,setsocketid]=useState("");
  const [ansMsg, setansMsg] = useState([]); 
  const [joinRoom,setjoinRoom]=useState("");




  const formhandler=(e)=>{
    e.preventDefault();
    socket.emit("message",{message,room})
    setMessage("")
  }

  const joinhandler=(e)=>{
    e.preventDefault();
    socket.emit("join_room",joinRoom)
    console.log(joinRoom);
    setjoinRoom("");
  }



  useEffect(()=>{

    socket.on("connect",()=>{
      console.log(socket.id);
      setsocketid(socket.id);
    })





    socket.on("allmessage",(data)=>{
      setansMsg((ansMsg)=>[...ansMsg,data])
    })






    return ()=>{
      socket.disconnect();
    }
  },[])

  return (
    <>
      <div>

          <h4>{socketid}</h4>

        <form onSubmit={joinhandler}>
        <input type="text" value={joinRoom} onChange={(e)=>{setjoinRoom(e.target.value)}} placeholder="Join room"/> 
          <button type="submit" >join</button> <br/>
          <br/>
        </form>

        <form onSubmit={formhandler}>
          <input type="text" value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder="message"/> <br/>
          <input type="text" value={room} onChange={(e)=>{setroom(e.target.value)}} placeholder="client id"/> 
          <button type="submit" >Send</button>
        </form>

        <p>
          {
            ansMsg.map((item,index)=>{
              return <div key={index}>{item}</div>
            })
          }
        </p>
      </div>
    </>
  );
}

export default App;
