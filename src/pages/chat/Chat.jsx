import React, {useState, useEffect, useRef, useMemo} from 'react'
import styles from "./chat.module.css"
import SockJS from "sockjs-client"
import { Stomp, Client } from "@stomp/stompjs"
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from 'react-router-dom';
import { selectCurrentMessages, selectUser, selectCurrentChat } from "../../service/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getChat, getMessages, getBindings, closeChat, openChat, getTime, getPrompt, changePrompt } from '../../service/slice';
import Timer from '../../components/timer/Timer';
import { Button } from '@mui/material';

function Chat() {
  const [messages, setMess] = useState([]);
  const [client, setStompClient] = useState(null);
  const [accessCode, setAccessCode] = useState(null);
  const [chatName, setChatName] = useState(null);
  const [bindingsCount, setBindingsCount] = useState(null);
  const user = useSelector(selectUser);
  const chat = useSelector(selectCurrentChat);
  const [time, setTime] = useState("");
  const dispatch = useDispatch();
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [isTracking, setIsTracking] = useState(true);
  const location = useLocation()
  const [startTimer, setStartTimer] = useState(false);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  console.log(user)

  const chatEndRef = useRef(null);
  const stompClientRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleExpire = () => {
    console.log('Timer expired!');
    setIsTimerExpired(true); 
  };
    
    
  const handleKeyPress = async (event) => { 
    if(event.key === 'Enter'){
      let mess = document.getElementById("message").value
      console.log(user)

      console.log("Client status:", client);
      if (client && client.connected) {
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

  const socketUrl = `https://collab-chat.com/ws/info`;
  // const socketUrl = `http://localhost:5555/ws/info`;


  useEffect(() => {

    console.log("Initializing WebSocket connection...");
    let str = location.pathname;
    const parts = str.split('/')[2].split('_');
    const part1 = parts[0]; 
    const part2 = parts[1];
    setAccessCode(part1);
    setChatName(decodeURIComponent(part2));

    if (stompClientRef.current) return;

    const stompClient = new Client({
        webSocketFactory: () => new SockJS(socketUrl), 
        reconnectDelay: 5000, 
        debug: (msg) => console.log("STOMP Debug Message:", msg),
    });

    stompClient.onConnect = () => {
        console.log("Connected to WebSocket");

        setStompClient(stompClient);

        stompClient.subscribe("/queue/user_"+user.id+"_group_" + part1, (message) => {
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



    return () => {
        if (stompClient.active) {
            stompClient.deactivate();
            console.log("Disconnected from WebSocket");
        }
    };
  }, [location.pathname, socketUrl, user.id]);

  const handleOpen = async () => {
    setOpen(!open)
    console.log("AI ID " + chat.aiId)
    const dispatchResult = await dispatch(getPrompt(chat.aiId))
    if (getPrompt.fulfilled.match(dispatchResult)) {
      setText(dispatchResult.payload)
    }
  }

  const handleChange = async () => {
    let aiId = chat.aiId;
    let initialSettings = {
      text,
      aiId
    };
    const dispatchResult = await dispatch(changePrompt(initialSettings));

    if (changePrompt.fulfilled.match(dispatchResult)) {
      setText(dispatchResult.payload)
    }
    setOpen(!open)
  }

  const handleChangeText = (e) => {
    const newText = e.target.value;
    setText(newText)
  }

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

    console.log("Client status:", client);
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
  };

  const handleCloseChat = async () => {
    let chatId = chat.id;
    let initialSettings = {
      chatId
    };
    let result = await dispatch(closeChat(initialSettings))
    console.log(result)
  };
  

  useEffect(()=> {
    if (isTimerExpired) {
      console.log("Time out")
      handleCloseChat();
    }
  }, [isTimerExpired])

  useEffect(()=> {
    if (open) {

    }
  }, [open])


  useEffect(() => {
    if (isTracking) {
      const interval = setInterval(async () => {
        try {
          console.log(accessCode)
          const dispatchResult = await dispatch(getBindings(accessCode));
          console.log(dispatchResult)
          if (getBindings.fulfilled.match(dispatchResult)) {
            const data = dispatchResult;
            console.log(data.bindingsNumber)
            console.log(dispatchResult.payload.bindingsNumber)
            setBindingsCount(dispatchResult.payload.bindingsNumber);
            if (dispatchResult.payload.bindingsNumber === chat.participants || dispatchResult.payload.bindingsNumber === chat.participants + 1) {
              clearInterval(interval);
              console.log("Target bindings reached!");
              let chatId = chat.id;
              let initialSettings = {
                chatId
              };
              const newChat = await dispatch(openChat(initialSettings))
              console.log(newChat);
              if (newChat.payload.status === "ACTIVE") {
                let chatId = newChat.payload.id;
                let initialSettings = {
                  chatId
                };
                const result = await dispatch(getTime(initialSettings));
                if (getTime.fulfilled.match(result)) {
                  console.log(result.payload.time)
                  setTime(result.payload.time)
                  setStartTimer(true)
                }
              }
              setIsTracking(false)
            }
          }
        } catch (error) {
          console.error("Error fetching bindings:", error);
        }
      }, 3000);

      return () => clearInterval(interval); 
    }
  }, [accessCode, dispatch, isTracking]);

  const renderedMessages = useMemo(() => (
    messages.map((mess, index) => (
      <div key={index} className={styles.mess_box}>
        {!chat.anonymity && <b className={styles.name}>{mess.name}</b>}
        <p>{mess.text}</p>
      </div>
    ))
  ), [messages, chat.anonymity]);


  return (
    <div className={styles.main_body}>
      {chat? <Timer time={time} onExpire={handleExpire} startTimer={startTimer}/> : <Timer time = {"00:00"} onExpire={handleExpire} startTimer={startTimer}/>}
      {user.id === chat.ownerId && <button onClick={handleOpen}>Edit AI</button>}
        <div className={styles.main_cont}>
            <h2 className={styles.chatHeader}>{chatName}</h2>
            <h2 className={styles.chatHeader}>{chat.topic + " " + "Mode: " + chat.mode}</h2>
            <div className={styles.message_cont}>
              {renderedMessages}
                <div ref={chatEndRef} />
            </div> 
            {open && 
            <div className={styles.modalWin}>
              <h1>Edit AI</h1>
              <div className={styles.auth_input}>
                  <input className={styles.in}  type={"text"} required placeholder='Prompt' onChange={handleChangeText} value={text}></input>
              </div>
              <div className={styles.btnContainer}> 
                <div className={styles.btnCancel} onClick={handleOpen}>Close</div>
                <div className={styles.btnCreate} onClick={handleChange}>Change</div>
              </div>
            </div>
            }
        </div>
        
        { !isTimerExpired && chat.status === "ACTIVE" && <div className={styles.mess_input}>
            <input className={styles.in_mess} id='message' placeholder='Message' onKeyDown={(event) => handleKeyPress(event)}></input>
            <SendIcon onClick={() => sendMessage()}/>
        </div>
        }
    </div>
  )
}

export default Chat