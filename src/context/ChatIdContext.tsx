import React, { createContext, useState } from 'react';

interface ChatIdContextType {
  chatId: number | null;
  setChatId: (id: number | null) => void; // Updated to accept null as well
}

const initialContext: ChatIdContextType = {
  chatId: null, // Start with null until set
  setChatId: () => {},
};

export const ChatIdContext = createContext<ChatIdContextType>(initialContext);

export const ChatIdContextProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {
  const [chatId, setChatId] = useState<number | null>(null);

  const handleSetChatId = (id: number | null) => { // Updated to accept null as well
    setChatId(id);
  };

  return (
    <ChatIdContext.Provider value={{ chatId, setChatId: handleSetChatId }}>
      {children}
    </ChatIdContext.Provider>
  );
};
