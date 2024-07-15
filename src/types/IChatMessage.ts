

interface Sender {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    email_verified_at: string | null;
    password_updated: number;
    created_at: string | null;
    updated_at: string;
    device: string | null;
    browser: string | null;
    os: string | null;
    city: string | null;
    country: string | null;
  }
  
  export interface Message {
    id: number;
    sender_id: number;
    role_id: number;
    message: string;
    unanswered: number;
    vote: any; // You may want to define a specific type for vote if it's structured
    chat_id: number;
    action_id: any; // Define specific type if action_id has a known structure
    is_corrected: number;
    created_at: string;
    updated_at: string;
    sender: Sender;
  }
  
  export interface ChatWindowProps {
    chatId: number;
  }
  