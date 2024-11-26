import React, {useState, useEffect} from 'react'
import styles from "./chat.module.css"
import SockJS from "sockjs-client"
import { Stomp, Client } from "@stomp/stompjs"
import SendIcon from '@mui/icons-material/Send';

function Chat() {
    const [messages, setMess] = useState([{name: "Iana", text: "blablabla"}, {name: "Iana1", text: "blablabla1"}, {name: "Iana1", text: "blablabla1"}, {name: "Iana1", text: "blablabla1"}, {name: "Iana1", text: "blablabla1"}, {name: "Iana1", text: "blablabla1blablabla1blablabla1blablabla1blablabla1blablabla1blablabla1blablabla1vvvblablabla1blablabla1blablabla1blablabla1blablabla1blablabla1"}, {name: "Iana1", text: "blablabla1"}, {name: "Iana1", text: "blablabla1"}, {name: "Iana1", text: "blablabla1"}, {name: "Iana1", text: "blablabla1"}, {name: "Iana1", text: "blablabla1"}, {name: "Iana1", text: "blablabla1"}])
    // const [client, setStompClient] = useState(null);
    let client = null;
    
  const handleKeyPress = async (event) => { 
    if(event.key === 'Enter'){
      let mess = document.getElementById("message").value
      if (client && client.connected) {
        client.publish({
          destination: "/app/send",
          body: JSON.stringify(mess),
        });
        // setMessage("");
      }
      document.getElementById("message").value = ""
      console.log(mess); 
    }
  }

  const socketUrl = "http://localhost:5555/ws";



  useEffect(() => {
    client = new Client({
      brokerURL: "ws://localhost:5555/ws",
      webSocketFactory: () => new SockJS("http://localhost:5555/ws"),
      onConnect: () => {
        console.log("Connected");
        client.subscribe("/topic/messages", (msg) => {
          setMess((prev) => [...prev, JSON.parse(msg.body)]);
        });
      },
      onDisconnect: () => console.log("Disconnected"),
    });

    client.activate();
    return () => client.deactivate();
  }, []);

  const sendMessage = () => {
    let mess = document.getElementById("message").value
      if (client && client.connected) {
        client.publish({
          destination: "/app/send",
          body: JSON.stringify(mess),
        });
        // setMessage("");
      }
      document.getElementById("message").value = ""
      console.log(mess);
  };



  return (
    <div>
        <div className={styles.main_cont}>
            <h2 className={styles.chatHeader}>Chat Name</h2>
            <div className={styles.message_cont}>
                {messages.map((mess)=> 
                <div className={styles.mess_box}>
                  <b className={styles.name}>{mess.name}</b>
                  <p>{mess.text}</p>
                </div>)}
            </div>
            
        </div>
        <div className={styles.mess_input}>
            <input className={styles.in_mess} id='message' placeholder='Message' onKeyDown={(event) => handleKeyPress(event)}></input>
            <SendIcon onClick={() => sendMessage()}/>
        </div>
    </div>
  )
}

export default Chat