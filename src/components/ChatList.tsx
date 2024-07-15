import React, { useEffect, useState } from 'react';
import style from './chatlist.module.css';
import { getAllChats, getChatMessages } from '../services/apis/api';
import { useContext } from 'react';
import { ChatIdContext } from '../context/ChatIdContext';

interface Creator {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: Country;
}

interface Country {
  id: number;
  name: string;
  code: string;
  phone_code: string;
}

interface Chat {
  id: number;
  name: string;
  creator: Creator;
  msg_count:number;
  trimmedMessage?: string; // Add trimmedMessage field to Chat interface
}

const ChatList: React.FC = React.memo(() => {
  const [chats, setChats] = useState<Chat[]>([]);
  const { setChatId } = useContext(ChatIdContext);
  const [activeChatId,setActiveChatId] = useState<number|null>(null)

  useEffect(() => {
    getAllChats()
      .then((response) => {
        if (response.data && Array.isArray(response.data.data.data)) {
          const initialChats = response.data.data.data;
          fetchLastMessages(initialChats); // Fetch last messages after setting initial chats
        } else {
          console.error('Unexpected response format', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching chats', error);
      });
  }, []);

  // Function to fetch last message for each chat
  const fetchLastMessages = async (chatsData: Chat[]) => {
    const updatedChats = await Promise.all(
      chatsData.map(async (chat) => {
        try {
          const response = await getChatMessages(chat.id);
          const messages = response.data.data;
          if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1].message;
            const trimmedMessage = lastMessage.length > 10 ? `${lastMessage.slice(0, 35)}...` : lastMessage;
            return { ...chat, trimmedMessage };
          }
          return chat; // Return chat without trimmedMessage if no messages exist
        } catch (error) {
          console.error(`Error fetching messages for chat ${chat.id}`, error);
          return chat; // Return chat without trimmedMessage in case of error
        }
      })
    );
    setChats(updatedChats);
  };

  return (
    <div className={style.chatListContainer}>
      {chats.map((chat) => (
        <div onClick={() =>{
          setChatId(chat.id)
          setActiveChatId(chat.id)
        }
           
      } className={`${style.chatDiv} ${activeChatId===chat.id?style.active:""} `} key={chat.id}>
          <span className={style.avatar}></span>
          <div className={style.creatorTimeContainer}>
           
            <div className={style.nameMessageContainer}>
              <div>{chat.creator.name ? chat.creator.name : 'Anonymous User'}</div>
              <div className={style.time}>{`${Math.floor(Math.random() * 24)}:${Math.floor(
                Math.random() * 60
              )}`}</div>
            </div>
            <div className={style.messageCountContainer}>
              {chat.trimmedMessage && <div className={style.lastMessage}>{chat.trimmedMessage}</div>}
              {chat.msg_count && (Math.random() < 0.5 ? <span className={style.count}>{chat.msg_count}</span> : null)}

            </div>

          </div>
        </div>
      ))}
    </div>
  );
});

export default ChatList;
