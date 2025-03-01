import { TelegramClient } from "telegram";
import { promises as fs } from "fs";

export async function getAllChats(client: TelegramClient) {
  if (!client.connected) {
    await client.connect();
  }

  console.log("Fetching all chats...");
  
  const dialogs = await client.getDialogs();
  
  const chatList = dialogs
  .map(dialog => ({
    id: dialog.id ? BigInt(dialog.id.toString()) : 0,
    title: dialog.title || 0,
    isGroup: dialog.isGroup,
    isChannel: dialog.isChannel,
    isUser: dialog.isUser,
  }));

  
  console.log("Fetched chats:", chatList);
  
  return chatList;
}


export async function saveChatsToFile(chats: any[], filePath: string = "chats.json") {
  const serializedChats = JSON.stringify(
    chats.map(chat => ({ ...chat, id: chat.id.toString() })), 
    null, 
    2
  );

  await fs.writeFile(filePath, serializedChats);
  console.log(`Chats saved to ${filePath}`);
}
  