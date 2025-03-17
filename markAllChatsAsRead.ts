import { TelegramClient } from "telegram"

export const markAllChatsAsRead = (telegramClient:TelegramClient,chats:any[])=>{
    chats.forEach((chat)=>{
        telegramClient.markAsRead(chat.id)
    })
}