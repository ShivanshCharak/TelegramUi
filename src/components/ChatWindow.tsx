import React, { useEffect, useState, useRef, useContext } from "react";
import style from "./chatwindow.module.css";
import { getChatMessages } from "../services/apis/api";
import { ChatWindowProps, Message } from "../types/IChatMessage";
import { ChatMessageContext } from "../context/ChatMessageContext";

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState("");
  const { chatMessages, setChatMessages } = useContext(ChatMessageContext);
  const messageRefs = useRef<Map<number, HTMLDivElement | null>>(new Map()); // Map to store refs for each message
  const unreadMessageRef = useRef<HTMLSpanElement>();
  const [dropdownActive, setDropdownActive] = useState(false);

  useEffect(() => {
    getChatMessages(chatId).then((response) => {
      // Update local state with fetched messages
      const fetchedMessages = response.data.data;
      setMessages(fetchedMessages);

      // Update context state with fetched messages
      setChatMessages(messages);

      // Determine the username from messages
      const uniqueSenders = Array.from(new Set(messages.map((message) => message.sender.name)));
      if (uniqueSenders.length > 0) {
        setUsername(uniqueSenders[0]);
      }
    });
  }, [chatId]);

  const scrollToPinnedMessage = () => {
    const pinnedMessageId = messages[0]?.id;
    if (pinnedMessageId && messageRefs.current.get(pinnedMessageId)) {
      messageRefs.current.get(pinnedMessageId)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  useEffect(() => {
    setChatMessages(messages)
    console.log(messages)
    const uniqueSenders = Array.from(new Set(messages.map((message) => message.sender.name)));
    if (uniqueSenders.length > 0) {
      setUsername(uniqueSenders[0]);
    }
  }, [messages]);
  useEffect(()=>{
    unreadMessageRef.current?.scrollIntoView({behavior:"smooth",block:'center'})
  })
  const handleDropdownToggle = () => {
    setDropdownActive(!dropdownActive);
  };

  const handleItemClick = () => {
    setDropdownActive(false); // Close dropdown when item is clicked
  };

  return (
    <div className={style.chatWindow}>
      <div className={style.topbar}>
        <div className={style.leftContainer}>
          <div className={style.avatarUserInfoWrapper}>
            <div className={style.avatar}></div>
            <div className={style.userInfo}>
              <div className={style.name}>{username ? username : "Anonymous user"}</div>
              <div className={style.lastSeen}>Last seen {Math.floor(Math.random() * 10) + 1} min ago</div>
            </div>
          </div>
        </div>
        <div className={style.rightContainer}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <div className={style.options} onClick={handleDropdownToggle}>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>
          {messages && (
            <div className={`${style.optionsDropdown} ${dropdownActive ? style.active : ""}`}>
              <div className={style.optionItem} onClick={handleItemClick}>
              <i className="fa-solid fa-volume-xmark"></i> Mute
              </div>
              <div className={style.optionItem} onClick={handleItemClick}>
              <i className="fa-solid fa-check"></i>Select Message
              </div>
              <div className={style.optionItem} onClick={handleItemClick}>
              <i className="fa-regular fa-user"></i>Add to contacts
              </div>
              <div className={style.optionItem} onClick={handleItemClick}>
              <i className="fa-solid fa-lock"></i> Block User
              </div>
              <div className={`${style.optionItem} ${style.delete}` } onClick={handleItemClick}>
              <i style={{color:"rgba(231, 7, 7, 0.887)"}} className="fa-solid fa-trash"></i>Delete User
              </div>
            </div>
          )}
          {messages && (
            <div className={style.pinnedMessage} onClick={scrollToPinnedMessage}>
              <div className={style.heading}>Pinned Message #0</div>
              {messages.length > 0 && (
                <div className={style.message}>
                  {messages[0].message.length > 10 ? messages[0].message.slice(0, 20) + "..." : messages[0].message}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={style.chatMessages}>
        <div className={style.messageArea}>
          {messages.map((message, index) => (
            <div key={message.id} ref={(el) => messageRefs.current.set(message.id, el)}>
              {messages.length - Math.ceil(messages.length / 2) === index && (
                <div className={style.unReadMessages}>
                  <span ref={unreadMessageRef}>Unread messages</span>
                </div>
              )}
              <div
                className={`${style.messageContainer} ${
                  message.sender.name === "BeyondChat" ? style.beyondChat : style.otherSender
                }`}
              >
                <div className={style.message}>{message.message}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={style.inputBox}>
          <i className="fa-regular fa-face-smile"></i>
          <input placeholder="Message" type="text" />
          <i className="fa-regular fa-file"></i>
        </div>
        <div className={style.mic}>
          <i className="fa-solid fa-microphone fa-xl"></i>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
