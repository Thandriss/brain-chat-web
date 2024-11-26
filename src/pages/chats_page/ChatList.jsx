import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./chatList.module.css";
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { selectUserChats, selectUserCreated } from "../../service/selectors";
import { useDispatch, useSelector } from "react-redux";
import { bind, create, getAllChats, join } from '../../service/slice';

function ChatList() {
    const lis = [{chatName: "Best of the best"}, {chatName: "Lohi"}]
    const list = useSelector(selectUserChats);
    const dispatch = useDispatch();
    const [openWindow, setOpenWindow] = useState(false);
    const [chatName, setChatName] = useState(null);
    const accessCode = useSelector(selectUserCreated);
    const [showAccessCode, setShowAccess] = useState(false)
    const navigate = useNavigate();
    const [joinWindow, setJoinWindow] = useState(false);
    const [accessCodeIn, setAccessCodeIn] = useState(null);
    
    const handleChange = (e) => {
      const name = e.target.value;
      setChatName(name);
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
  
    const handleGoInChat = (chatAccessCode, chatId, cchatName) => {
      dispatch(bind(chatAccessCode))
      navigate('/chat/' + chatId + "_" + cchatName); 
    };

    const handleCreate = async () => {
      // navigate('/chat'); 
      const dispatchResult = await dispatch(create(chatName));
      if (create.fulfilled.match(dispatchResult)) {
        setOpenWindow(false)
        setShowAccess(true)
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