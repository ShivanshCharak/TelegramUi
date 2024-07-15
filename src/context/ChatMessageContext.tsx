import { createContext, useState, ReactNode, FC } from 'react';
import { Message } from '../types/IChatMessage';

interface ChatMessageContextType {
  chatMessages: Message[] | null;
  setChatMessages: (messages: Message[]) => void;
}

const initialContext: ChatMessageContextType = {
  chatMessages: null,
  setChatMessages: () => {},
};

export const ChatMessageContext = createContext<ChatMessageContextType>(initialContext);

export const ChatMessageContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [chatMessages, setChatMessages] = useState<Message[] | null>(null);

  return (
    <ChatMessageContext.Provider value={{ chatMessages, setChatMessages }}>
      {children}
    </ChatMessageContext.Provider>
  );
};
