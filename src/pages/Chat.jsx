import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import ChatHeader from "../components/Chat/ChatHeader";
import SendMessage from "../components/Chat/SendMessage";
import { sendMessage } from "../firebase/chat/chat";
import { getUserData } from "../firebase/user/user";
import ChatField from "../components/Chat/ChatField";

const Chat = ({ userId }) => {
  const { id } = useParams();
  const [displayName, setDisplayName] = useState("jane");
  const [targetId, setTargetId] = useState(0);

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
      }
    };
    fetchData().catch();
  }, [userId]);

  const onSubmit = ({ e, message }) => {
    e.preventDefault();
    sendMessage({ chatId: id, myId: userId, targetId, message });
  };
  return (
    <div className="w-full min-h-[50rem]">
      <ChatHeader displayName={displayName} />
      <ChatField id={id} userId={userId} />
      <SendMessage onSubmit={onSubmit} />
    </div>
  );
};
export default Chat;
