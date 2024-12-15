import React, {useState, useEffect} from 'react'
import styles from "./chat.module.css"
import SockJS from "sockjs-client"
import { Stomp, Client } from "@stomp/stompjs"
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from 'react-router-dom';
import { selectCurrentMessages, selectUser, selectCurrentChat } from "../../service/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getChat, getMessages, getBindings } from '../../service/slice';
import Timer from '../../components/timer/Timer';

function Chat() {
  const [messages, setMess] = useState([]);
  const [client, setStompClient] = useState(null);
  const [accessCode, setAccessCode] = useState(null);
  const [chatName, setChatName] = useState(null);
  const [bindingsCount, setBindingsCount] = useState(null);
  const targetBindings = 5;
  const user = useSelector(selectUser);
  const chat = useSelector(selectCurrentChat);
  const dispatch = useDispatch();
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [isTracking, setIsTracking] = useState(true);
  console.log(chat)
  const location = useLocation()
  const [startTimer, setStartTimer] = useState(false);

  console.log(user)

  const handleExpire = () => {
    console.log('Timer expired!');
    setIsTimerExpired(true); 
  };
    
    
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



  useEffect(() => {
    if (isTracking) {
      const interval = setInterval(async () => {
        try {
          const dispatchResult = await dispatch(getBindings(accessCode));
          if (getBindings.fulfilled.match(dispatchResult)) {
            const data = await dispatchResult.json();
            setBindingsCount(data.bindingsNumber);
            if (data.bindingsNumber === targetBindings) {
              clearInterval(interval);
              console.log("Target bindings reached!");
              setStartTimer(true)
              setIsTracking(false)
            }
          }
        } catch (error) {
          console.error("Error fetching bindings:", error);
        }
      }, 3000);

      return () => clearInterval(interval); 
    }
  }, [isTracking]);


  return (
    <div>
      {chat? <Timer time={chat.time} onExpire={handleExpire} startTimer={startTimer}/> : <Timer time = {"00:00"} onExpire={handleExpire} startTimer={startTimer}/>}
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