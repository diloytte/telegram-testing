import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
//@ts-ignore
import input from "input"; // For CLI input (only needed if first-time login requires a code)
import { getAllChats, saveChatsToFile } from "./getDialogs";
import { config } from "dotenv";
import { markAllChatsAsRead } from "./markAllChatsAsRead";
config(); 

const apiId = Number(process.env.API_ID!); 
const apiHash = process.env.API_HASH!; 
const phoneNumber = process.env.PHONE_NUMBER!; 
const password = process.env.PASSWORD!;

//TODO: Read session from file
const stringSession = new StringSession(""); 

const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
});

async function start() {
  console.log("Connecting to Telegram...");

  await client.start({
    phoneNumber: async () => phoneNumber,
    password: async () => password,
    phoneCode: async () => await input.text("Enter the OTP code: "),
    onError: (err) => console.log("Login Error:", err),
  });

  console.log("Connected!");
  console.log("Session:", client.session.save());

  const chats = await getAllChats(client);

  saveChatsToFile(chats);

  markAllChatsAsRead(client,chats)

  // client.addEventHandler((update) => {
  //   console.log("New message received:", update);
  // }, new (require("telegram/events").NewMessage)());

  // console.log("Listening for new messages...");
}

start().catch(console.error);

(async()=>{
})()