import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./chatList.module.css";
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { selectUserChats, selectUserCreated} from "../../service/selectors";
import { useDispatch, useSelector } from "react-redux";
import { bind, create, getAllChats, join, getChat } from '../../service/slice';

function ChatList() {
    const modes = [ "brainstorming", "6 thinking hat", "SCAMPER", "none" ];
    const modesAnonymity = [ "yes", "no"];
    const list = useSelector(selectUserChats);
    const dispatch = useDispatch();
    const [openWindow, setOpenWindow] = useState(false);
    const [chatName, setChatName] = useState(null);
    const [topic, setTopic] = useState(null);
    const accessCode = useSelector(selectUserCreated);
    const [showAccessCode, setShowAccess] = useState(false)
    const navigate = useNavigate();
    const [joinWindow, setJoinWindow] = useState(false);
    const [accessCodeIn, setAccessCodeIn] = useState(null);
    const [mode, setSelectedValues] = useState("none");
    const [prompt, setPrompt] = useState("");
    const [time, setTime] = useState('');
    const [numberParticipants, setNumber] = useState('');
    const [aiName, setAiName] = useState("");
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');
    const [anonymitySt, setAnon] = useState("no");
    const [anonymity, setAnonFinal] = useState("no");

    const handleMinutesChange = (e) => {
      const value = Math.max(0, Math.min(59, parseInt(e.target.value) || 0)); 
      setMinutes(value.toString().padStart(2, '0')); 
      const formattedTime = `${minutes}:${seconds}`;
      setTime(formattedTime)
    };

    const handleSecondsChange = (e) => {
      const value = Math.max(0, Math.min(59, parseInt(e.target.value) || 0)); 
      setSeconds(value.toString().padStart(2, '0'));
      const formattedTime = `${minutes}:${seconds}`; 
      // const formattedTime = `${minutes}:${seconds}`;
      setTime(formattedTime)
    };
    const formattedTime = `${minutes}:${seconds}`;

    const handleCheckboxChange = (value) => {
      setSelectedValues(value);
    };

    const handleCheckboxChangeAnonymity = (value) => {
      if (value === "yes") {
        setAnon(value)
        setAnonFinal(true);
      } else {
        setAnon(value)
        setAnonFinal(false);
      }
    };

    const handleNumber = (e) => {
      const numericValue = e.target.value.replace(/[^0-9]/g, '');
      setNumber(numericValue);
    };

    const handleChange = (e) => {
      const name = e.target.value;
      setChatName(name);
    };

    const handleTopic = (e) => {
      const topicIn = e.target.value;
      setTopic(topicIn);
    };

    const handlePrompt = (e) => {
      const promptIn = e.target.value;
      setPrompt(promptIn);
    };

    const handleAiName = (e) => {
      const aiNameIn = e.target.value;
      setAiName(aiNameIn);
    };

    const handleChangeJoin = (e) => {
      const access = e.target.value;
      setAccessCodeIn(access);
    };

    const handleClick = () => {
      setOpenWindow(!openWindow);
    }

    const handleJoinWindow = () => {
      setJoinWindow(!joinWindow);
    }

    const handleJoin = () => {
      dispatch(join(accessCodeIn))
      setJoinWindow(!joinWindow);
    }

    const handleCopy = () => {
      navigator.clipboard
        .writeText(
          accessCode
        )
        .then(() => {})
        .catch((err) => {
          console.error("Copy error: ", err);
        });
    };
  
    const handleGoInChat = async (chatAccessCode, chatId, cchatName) => {
      let initialSettings = {
        chatId
      };
      await dispatch(getChat(initialSettings))
      await dispatch(bind(chatAccessCode))
      navigate('/chat/' + chatAccessCode + "_" + cchatName + "_" + chatId); 
    };

    const handleCreate = async () => {
      let initialSettings = {
        chatName,
        topic,
        prompt,
        aiName,
        time,
        numberParticipants,
        mode,
        anonymity
      };
      const dispatchResult = await dispatch(create(initialSettings));
      if (create.fulfilled.match(dispatchResult)) {
        setOpenWindow(false)
        setShowAccess(true)
        setChatName(null)
        setTopic(null)
      }
    }

    useEffect(() => {
      dispatch(getAllChats())
    }, [dispatch])

  return (
    <div>
        <div className={styles.mainBack}>
            <div className={styles.listContainer}>
              {list.map((i) => {
                return (
                  <div className={styles.chatBox} onClick={() => handleGoInChat(i.accessCode, i.id, i.chatName)}>
                    {i.chatName}
                  </div>  
                )
              })}
            </div>
            <div className={styles.btnContainerCJ}>
              <div className={styles.btnCreateChat} onClick={handleClick}>Create chat <AddIcon/></div>
              <div className={styles.btnCreateChat} onClick={handleJoinWindow}>Join chat <AddIcon/></div>
            </div>
            {openWindow && 
            <div className={styles.modalWin}>
              <h1>Chat creation</h1>
              <div className={styles.auth_input}>
                  <input className={styles.in}  type={"text"} required placeholder='Chat name' onChange={handleChange} value={chatName}></input>
                  <div className={styles.combine}>
                    <div className={styles.textBold}>Topic for discussion</div>
                    <input className={styles.in}  type={"text"} required placeholder='Question' onChange={handleTopic} value={topic}></input>
                  </div>
                  <div className={styles.combine}>
                    <div className={styles.textBold}>Mode of chat</div>
                    <div className={styles.options}>
                    {modes.map((option, index) => {
                      return (
                        <label key={index}>
                          <input
                          type="radio"
                          value={option}
                          onChange={() => handleCheckboxChange(option)}
                          checked={mode === option}
                          />
                          {option}
                        </label>
                      )
                    })}
                    </div>
                  </div>
                  <div className={styles.combine}>
                    <div className={styles.textBold}>Anonymity</div>
                    <div className={styles.options}>
                    {modesAnonymity.map((option, index) => {
                      return (
                        <label key={index}>
                          <input
                          type="radio"
                          value={option}
                          onChange={() => handleCheckboxChangeAnonymity(option)}
                          checked={anonymitySt === option}
                          />
                          {option}
                        </label>
                      )
                    })}
                    </div>
                  </div>
                  <div className={styles.combine}>
                    <div className={styles.textBold}>AI setting</div>
                    <input className={styles.in}  type={"text"} required placeholder='Prompt' onChange={handlePrompt} value={prompt}></input>
                  </div>
                  <div className={styles.combine}>
                    <div className={styles.textBold}>AI name</div>
                    <input className={styles.in}  type={"text"} required placeholder='Prompt' onChange={handleAiName} value={aiName}></input>
                  </div>
                  <div className={styles.combine}>
                  <div className={styles.textBold}>Chat Session Time (mm/ss, 24h):</div>
                  <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <input
                  type="number"
                  value={minutes}
                  onChange={handleMinutesChange}
                  min="0"
                  max="59"
                  placeholder="MM"
                  style={{ width: '50px', textAlign: 'center' }}
                  />
                  :
                  <input
                  type="number"
                  value={seconds}
                  onChange={handleSecondsChange}
                  min="0"
                  max="59"
                  placeholder="SS"
                  style={{ width: '50px', textAlign: 'center' }}
                  />
                </div>
                <p>Formatted Time: {formattedTime}</p>
                  </div>
                  <div className={styles.combine}>
                    <div className={styles.textBold}>Number of participants</div>
                    <input className={styles.in}  type={"text"} required placeholder="Only numbers" onChange={handleNumber} value={numberParticipants}></input>
                  </div>
              </div>
              <div className={styles.btnContainer}> 
                <div className={styles.btnCancel} onClick={() => setOpenWindow(!openWindow)}>Cancel</div>
                <div className={styles.btnCreate} onClick={handleCreate}>Create</div>
              </div>
            </div>
            }
            {showAccessCode && 
            <div className={styles.modalWin}>
              <h1>Access Code</h1>
              <h2>{accessCode} <ContentCopyIcon onClick={handleCopy}/> </h2>
              <div className={styles.btnContainer}> 
                <div className={styles.btnCancel} onClick={() => setShowAccess(false)}>Close</div>
              </div>
            </div>
            }
            {joinWindow && 
            <div className={styles.modalWin}>
              <h1>Join</h1>
              <div className={styles.auth_input}>
                  <input className={styles.in}  type={"text"} required placeholder='Access code' onChange={handleChangeJoin} value={accessCodeIn}></input>
              </div>
              <div className={styles.btnContainer}> 
                <div className={styles.btnCancel} onClick={handleJoinWindow}>Close</div>
                <div className={styles.btnCreate} onClick={handleJoin}>Join</div>
              </div>
            </div>
            }
        </div>
    </div>
  )
}

export default ChatList