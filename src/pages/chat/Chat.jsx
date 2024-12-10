import React, {useState, useEffect} from 'react'
import styles from "./chat.module.css"
import SockJS from "sockjs-client"
import { Stomp, Client } from "@stomp/stompjs"
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from 'react-router-dom';
import { selectCurrentMessages, selectUser } from "../../service/selectors";
import { useDispatch,useSelector } from "react-redux";
import { getMessages } from '../../service/slice';

function Chat() {
  const [messages, setMess] = useState([]);
  const [client, setStompClient] = useState(null);
  const [accessCode, setAccessCode] = useState(null);
  const [chatName, setChatName] = useState(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  
    // let client = null;
  console.log(user)
  const location = useLocation()
  // console.log(location.path)
    
    
  const handleKeyPress = async (event) => { 
    if(event.key === 'Enter'){
      let mess = document.getElementById("message").value
      if (client && client.active) {
        client.publish({
          destination: "/app/send",
          body: JSON.stringify({
              message: mess,
              chatName: accessCode,
              id: user.id,
              name: user.name,
          }),
      });
        document.getElementById("message").value = ""
      }
    }
  }

  const socketUrl = "http://localhost:5555/ws/info";

  

  useEffect(() => {
    console.log("Initializing WebSocket connection...");
    let str = location.pathname;
    const parts = str.split('/')[2].split('_');
    const part1 = parts[0]; 
    const part2 = parts[1];
    setAccessCode(part1);
    setChatName(part2);

    const stompClient = new Client({
        webSocketFactory: () => new SockJS(socketUrl), 
        reconnectDelay: 5000, 
        debug: (msg) => console.log("STOMP Debug Message:", msg),
    });

    stompClient.onConnect = () => {
        console.log("Connected to WebSocket");

        stompClient.subscribe("/queue/user_1_group_" + part1, (message) => {
          // /topic/group-messages
            console.log("Full message received:", message);
            console.log("Message body:", message.body);
            try {
              const parsedMessage = JSON.parse(message.body);
              const { name, content } = parsedMessage;
              setMess((prev) => [...prev, { name, text: content }]);
            } catch (error) {
                console.error("Error parsing message body:", error);
            }
        });
    };

    stompClient.onStompError = (frame) => {
        console.error("Broker reported error:", frame.headers["message"]);
        console.error("Additional details:", frame.body);
    };

    stompClient.activate(); 

    setStompClient(stompClient);

    return () => {
        if (stompClient.active) {
            stompClient.deactivate();
            console.log("Disconnected from WebSocket");
        }
    };
  }, []);

  const handleGettingMessages = async () => {
    const dispatchResult = await dispatch(getMessages(accessCode));
    if (getMessages.fulfilled.match(dispatchResult)) {
      setMess(dispatchResult.payload)
    }
  }

  useEffect(() => {
    if (accessCode != null) {
      handleGettingMessages();
    }
    
  }, [accessCode])

  const sendMessage = () => {
    let mess = document.getElementById("message").value
    if (client && client.active) {
      client.publish({
        destination: "/app/send",
        body: JSON.stringify({
            message: mess,
            chatName: accessCode,
            id: user.id,
            name: user.name,
        }),
    });
      }
      document.getElementById("message").value = ""
      console.log(mess);
  };



  return (
    <div>
        <div className={styles.main_cont}>
            <h2 className={styles.chatHeader}>{chatName}</h2>
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