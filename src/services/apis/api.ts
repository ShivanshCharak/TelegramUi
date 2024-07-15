// src/services/api.js
import axios from 'axios';

const BASE_URL = 'https://devapi.beyondchats.com/api';

export const getAllChats = (page = 1) => axios.get(`${BASE_URL}/get_all_chats?page=${page}`);
export const getChatMessages = (chatId:number) => axios.get(`${BASE_URL}/get_chat_messages?chat_id=${chatId}`);
