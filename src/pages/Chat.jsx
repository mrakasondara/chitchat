import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import ChatHeader from "../components/Chat/ChatHeader";
import SendMessage from "../components/Chat/SendMessage";
import { getUserData, getUserThumbData } from "../firebase/user/user";
import ChatField from "../components/Chat/ChatField";
import { getImageFromStorage } from "../firebase/storage";

const ENDPOINT = "http://localhost:3000/";
let socket;

const Chat = ({ userId }) => {
  const { id } = useParams();
  const [displayName, setDisplayName] = useState("jane");
  const [targetId, setTargetId] = useState("");
  const [chatId, setChatId] = useState("");
  const [thumb, setThumb] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserData(userId);
      if (response) {
        const chats = Object.values(response.chats);
        const getChat = chats.filter((chat) => chat.id == id)[0];
        const displayName = getChat.displayName;
        const targetId = getChat.targetId;
        setDisplayName(displayName);
        setTargetId(targetId);
        const thumb = await getUserThumbData(targetId);
        if (thumb == "none") {
          setThumb("none");
        } else {
          const getThumb = await getImageFromStorage(targetId);
          setThumb(getThumb);
        }
      }
    };
    setChatId(id);

    socket = io(ENDPOINT);

    socket.emit("join", { userId, targetId, chatId: id }, (error) => {
      if (error) {
        alert(error);
      }
      fetchData().catch();
    });
  }, [ENDPOINT, userId, targetId]);

  useEffect(() => {
    socket.on("messageData", ({ message }) => {
      const getMessages = [message];
      if (getMessages[0] != null) {
        setMessages(...getMessages);
      } else {
        setMessages([]);
      }
    });
  }, [ENDPOINT]);

  const onSubmit = ({ e, message }) => {
    e.preventDefault();
    socket.emit(
      "sendMessage",
      { message, chatId: id, userId, targetId },
      (err) => {
        if (err) {
          Alert(err);
        }
      }
    );
  };
  const propsChatField = { messages, userId, targetId };

  return (
    <div className="w-full flex flex-col h-screen  bg-red-100">
      <ChatHeader displayName={displayName} thumb={thumb} />
      <ChatField {...propsChatField} />
      <SendMessage onSubmit={onSubmit} />
    </div>
  );
};
export default Chat;
