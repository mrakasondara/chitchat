import { Suspense, useContext, useState, useEffect } from "react";
import TargetMessage from "./TargetMessage";
import MyMessage from "./MyMessage";
import { getUserData } from "../../firebase/user/user";
import { checkIsMessageExist, getChat } from "../../firebase/chat/chat";
import { UserContext } from "../../UserContext";

const ChatField = ({ userId, id }) => {
  const { userInfo } = useContext(UserContext);
  const [targetId, setTargetId] = useState("0");
  const [myMessages, setMyMessages] = useState(null);
  const [targetMessages, setTargetMessages] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserData(userInfo.uid);
      if (response) {
        const chats = Object.values(response.chats);
        const getChat = chats.filter((chat) => chat.id == id)[0];
        const targetId = getChat.targetId;
        setTargetId(targetId);
      }
    };

    const getMyMessages = async () => {
      const isExist = await checkIsMessageExist({
        chatId: id,
        userId: userInfo.uid,
      });
      if (isExist) {
        const response = await getChat({ chatId: id, userId: userInfo.uid });
        setMyMessages(response);
      } else {
        setMyMessages(null);
      }
    };

    const getTargetMessages = async () => {
      const isExist = await checkIsMessageExist({
        chatId: id,
        userId: targetId,
      });
      if (isExist) {
        const response = await getChat({ chatId: id, userId: targetId });
        setTargetMessages(response);
      } else {
        setTargetMessages(null);
      }
    };
    if (targetId) {
      fetchData().catch();
      getMyMessages().catch();
      getTargetMessages().catch();
      console.log({ myMessages, targetMessages });
    }
  }, [targetId, userId]);
  return (
    <div className="grid mt-5 px-2">
      {targetMessages != null &&
        targetMessages.map((messages) => (
          <TargetMessage key={messages.messageId} {...messages} />
        ))}
      {myMessages != null &&
        myMessages.map((messages) => (
          <MyMessage key={messages.messageId} {...messages} />
        ))}
    </div>
  );
};
export default ChatField;
